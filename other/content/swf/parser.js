/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil -*- */

for (var tag in tagHandler) {
  var handler = tagHandler[tag];
  if (typeof handler === 'object')
    tagHandler[tag] = generateParser(handler, 'swfVersion', 'tagCode');
}

var readHeader = generateParser(MOVIE_HEADER);

function readTags(context, stream, swfVersion, onprogress) {
  var tags = context.tags;
  var bytes = stream.bytes;
  var lastSuccessfulPosition;
  try {
    do {
      lastSuccessfulPosition = stream.pos;

      stream.ensure(2);
      var tagCodeAndLength = readUi16(bytes, stream);
      var tagCode = tagCodeAndLength >> 6;
      var length = tagCodeAndLength & 0x3f;
      if (length === 0x3f) {
        stream.ensure(4);
        length = readUi32(bytes, stream);
      }
      stream.ensure(length);

      var substream = stream.substream(stream.pos, stream.pos += length);
      var subbytes = substream.bytes;
      var tag = { code: tagCode };

      if (tagCode === 39) {
        tag.type = 'sprite';
        tag.id = readUi16(subbytes, substream);
        tag.frameCount = readUi16(subbytes, substream);
        tag.tags = [];
        readTags(tag, substream, swfVersion);
      } else {
        var handler = tagHandler[tagCode];
        if (handler)
          handler(subbytes, substream, tag, swfVersion, tagCode);
      }
      tags.push(tag);

      if (tagCode === 1) {
        while (stream.pos + 2 <= stream.end && stream.getUint16(stream.pos, true) >> 6 === 1) {
          tags.push(tag);
          stream.pos += 2;
        }
        if (onprogress)
          onprogress(context);
      } else if (onprogress && 'id' in tag) {
        onprogress(context);
      }
    } while (tagCode && stream.pos < stream.end);
  } catch (e) {
    if (e !== StreamNoDataError) throw e;
    stream.pos = lastSuccessfulPosition;
  }
}

function HeadTailBuffer(defaultSize) {
  this.bufferSize = defaultSize || 16;
  this.buffer = new Uint8Array(this.bufferSize);
  this.pos = 0;
}
HeadTailBuffer.prototype = {
  push: function (data, need) {
    var bufferLengthNeed = this.pos + data.length;
    if (this.bufferSize < bufferLengthNeed) {
      var newBufferSize = this.bufferSize;
      while (newBufferSize < bufferLengthNeed) {
        newBufferSize <<= 1;
      }
      var newBuffer = new Uint8Array(newBufferSize);
      if (this.bufferSize > 0) {
        newBuffer.set(this.buffer);
      }
      this.buffer = newBuffer;
      this.bufferSize = newBufferSize;
    }
    this.buffer.set(data, this.pos);
    this.pos += data.length;
    if (need)
      return this.pos >= need;
  },
  getHead: function (size) {
    return this.buffer.subarray(0, size);
  },
  getTail: function (offset) {
    return this.buffer.subarray(offset, this.pos);
  },
  removeHead: function (size) {
    var tail = this.getTail(size);
    this.buffer = new Uint8Array(this.bufferSize);
    this.buffer.set(tail);
    this.pos = tail.length;
  },
  get arrayBuffer() {
    return this.buffer.buffer;
  },
  get length() {
    return this.pos;
  },
  createStream: function () {
    return new Stream(this.arrayBuffer, 0, this.length);
  }
};

function CompressedPipe(target, length) {
  this.target = target;
  this.length = length;
  this.initialize = true;
  this.buffer = new HeadTailBuffer(8096);
  this.state = { bitBuffer: 0, bitLength : 0, compression: {} };
  this.output = {
    data: new Uint8Array(length),
    available: 0,
    completed: false
  };
}
CompressedPipe.prototype = {
  push: function (data, progressInfo) {
    var buffer = this.buffer;
    if (this.initialize) {
      if (!buffer.push(data, 2))
        return;
      var headerBytes = buffer.getHead(2);
      verifyDeflateHeader(headerBytes);
      buffer.removeHead(2);
      this.initialize = false;
    } else {
      buffer.push(data);
    }
    var stream = buffer.createStream();
    stream.bitBuffer = this.state.bitBuffer;
    stream.bitLength = this.state.bitLength;
    var output = this.output;
    var lastAvailable = output.available;
    try {
      do {
        inflateBlock(stream, output, this.state.compression);
      } while (stream.pos < buffer.length && !output.completed);
    } catch (e) {
      if (e !== InflateNoDataError) throw e; // re-throw non data errors
    } finally {
      this.state.bitBuffer = stream.bitBuffer;
      this.state.bitLength = stream.bitLength;
    }
    buffer.removeHead(stream.pos);

    // push data downstream
    this.target.push(output.data.subarray(lastAvailable, output.available),
                     progressInfo);
  }
};

function BodyParser(swfVersion, length, options) {
  this.swf = { swfVersion: swfVersion };
  this.buffer = new HeadTailBuffer(32768);
  this.initialize = true;
  this.totalRead = 0;
  this.length = length;
  this.options = options;
}
BodyParser.prototype = {
  push: function (data, progressInfo) {
    if (data.length === 0)
      return;

    var swf = this.swf;
    var buffer = this.buffer;
    var options = this.options;
    var stream;
    if (this.initialize) {
      var PREFETCH_SIZE = 17 /* RECT */ +
                          4  /* Frames rate and count */ +
                          6  /* FileAttributes */;
      if (!buffer.push(data, PREFETCH_SIZE))
        return;

      stream = buffer.createStream();
      var bytes = stream.bytes;
      readHeader(bytes, stream, swf);

      // reading FileAttributes tag, this tag shall be first in the file
      var nextTagHeader = readUi16(bytes, stream);
      var FILE_ATTRIBUTES_LENGTH = 4;
      if (nextTagHeader == ((SWF_TAG_CODE_FILE_ATTRIBUTES << 6) | FILE_ATTRIBUTES_LENGTH)) {
        stream.ensure(FILE_ATTRIBUTES_LENGTH);
        var substream = stream.substream(stream.pos, stream.pos += FILE_ATTRIBUTES_LENGTH);
        var handler = tagHandler[SWF_TAG_CODE_FILE_ATTRIBUTES];
        var fileAttributesTag = {code: SWF_TAG_CODE_FILE_ATTRIBUTES};
        handler(substream.bytes, substream, fileAttributesTag, swfVersion, SWF_TAG_CODE_FILE_ATTRIBUTES);
        swf.fileAttributes = fileAttributesTag;
      } else {
        stream.pos -= 2; // FileAttributes tag was not found -- re-winding
        swf.fileAttributes = {}; // using empty object here, defaults all attributes to false
      }

      if (options.onstart)
        options.onstart(swf);

      swf.tags = [];

      this.initialize = false;
    } else {
      buffer.push(data);
      stream = buffer.createStream();
    }

    if (progressInfo) {
      swf.bytesLoaded = progressInfo.loaded;
      swf.bytesTotal = progressInfo.total;
    }

    var swfVersion = swf.swfVersion;
    readTags(swf, stream, swfVersion, options.onprogress);

    var read = stream.pos;
    buffer.removeHead(read);
    this.totalRead += read;

    if (this.totalRead >= this.length && options.oncomplete) {
     options.oncomplete(swf);
    }
  }
};

SWF.parseAsync = function swf_parseAsync(options) {
  var buffer = new HeadTailBuffer();
  var pipe = {
    push: function (data, progressInfo) {
      if ('target' in this)
        return this.target.push(data, progressInfo);

      if (!buffer.push(data, 8))
        return;
      var bytes = buffer.getHead(8);
      var magic1 = bytes[0];
      var magic2 = bytes[1];
      var magic3 = bytes[2];
      var compressed = magic1 === 67;
      assert((magic1 === 70 || compressed) && magic2 === 87 && magic3 === 83,
             'unsupported file format', 'parse');

      var swfVersion = bytes[3];
      var stream = buffer.createStream();
      stream.pos += 4;
      var fileLength = readUi32(bytes, stream);
      var bodyLength = fileLength - 8;

      var target = new BodyParser(swfVersion, bodyLength, options);
      if (compressed) {
        target = new CompressedPipe(target, bodyLength);
      }
      target.push(buffer.getTail(8), progressInfo);
      this.target = target;

      buffer = null; // cleanup
    }
  };
  return pipe;
};

SWF.parse = function(buffer, options) {
  if (!options)
    options = { };

  var pipe = SWF.parseAsync(options);
  var bytes = new Uint8Array(buffer);
  var progressInfo = { loaded: bytes.length, total: bytes.length };
  pipe.push(bytes, progressInfo);
};
