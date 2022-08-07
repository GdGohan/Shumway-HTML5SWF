(function (global) {
  if (global.DataView)
    return;
  if (!global.ArrayBuffer)
    fail('ArrayBuffer not supported');
  if (!Object.defineProperties)
    fail('This module requires ECMAScript 5');
  var nativele = new Int8Array(new Int32Array([
      1
    ]).buffer)[0] === 1;
  var temp = new Uint8Array(8);
  global.DataView = function DataView(buffer, offset, length) {
    if (!(buffer instanceof ArrayBuffer))
      fail('Bad ArrayBuffer');
    offset = offset || 0;
    length = length || buffer.byteLength - offset;
    if (offset < 0 || length < 0 || offset + length > buffer.byteLength)
      fail('Illegal offset and/or length');
    Object.defineProperties(this, {
      buffer: {
        value: buffer,
        enumerable: false,
        writable: false,
        configurable: false
      },
      byteOffset: {
        value: offset,
        enumerable: false,
        writable: false,
        configurable: false
      },
      byteLength: {
        value: length,
        enumerable: false,
        writable: false,
        configurable: false
      },
      _bytes: {
        value: new Uint8Array(buffer, offset, length),
        enumerable: false,
        writable: false,
        configurable: false
      }
    });
  };
  global.DataView.prototype = {
    constructor: DataView,
    getInt8: function getInt8(offset) {
      return get(this, Int8Array, 1, offset);
    },
    getUint8: function getUint8(offset) {
      return get(this, Uint8Array, 1, offset);
    },
    getInt16: function getInt16(offset, le) {
      return get(this, Int16Array, 2, offset, le);
    },
    getUint16: function getUint16(offset, le) {
      return get(this, Uint16Array, 2, offset, le);
    },
    getInt32: function getInt32(offset, le) {
      return get(this, Int32Array, 4, offset, le);
    },
    getUint32: function getUint32(offset, le) {
      return get(this, Uint32Array, 4, offset, le);
    },
    getFloat32: function getFloat32(offset, le) {
      return get(this, Float32Array, 4, offset, le);
    },
    getFloat64: function getFloat32(offset, le) {
      return get(this, Float64Array, 8, offset, le);
    },
    setInt8: function setInt8(offset, value) {
      set(this, Int8Array, 1, offset, value);
    },
    setUint8: function setUint8(offset, value) {
      set(this, Uint8Array, 1, offset, value);
    },
    setInt16: function setInt16(offset, value, le) {
      set(this, Int16Array, 2, offset, value, le);
    },
    setUint16: function setUint16(offset, value, le) {
      set(this, Uint16Array, 2, offset, value, le);
    },
    setInt32: function setInt32(offset, value, le) {
      set(this, Int32Array, 4, offset, value, le);
    },
    setUint32: function setUint32(offset, value, le) {
      set(this, Uint32Array, 4, offset, value, le);
    },
    setFloat32: function setFloat32(offset, value, le) {
      set(this, Float32Array, 4, offset, value, le);
    },
    setFloat64: function setFloat64(offset, value, le) {
      set(this, Float64Array, 8, offset, value, le);
    }
  };
  function get(view, type, size, offset, le) {
    if (offset === undefined)
      fail('Missing required offset argument');
    if (offset < 0 || offset + size > view.byteLength)
      fail('Invalid index: ' + offset);
    if (size === 1 || !(!le) === nativele) {
      if ((view.byteOffset + offset) % size === 0)
        return new type(view.buffer, view.byteOffset + offset, 1)[0];
      else {
        for (var i = 0; i < size; i++)
          temp[i] = view._bytes[offset + i];
        return new type(temp.buffer)[0];
      }
    } else {
      for (var i = 0; i < size; i++)
        temp[size - i - 1] = view._bytes[offset + i];
      return new type(temp.buffer)[0];
    }
  }
  function set(view, type, size, offset, value, le) {
    if (offset === undefined)
      fail('Missing required offset argument');
    if (value === undefined)
      fail('Missing required value argument');
    if (offset < 0 || offset + size > view.byteLength)
      fail('Invalid index: ' + offset);
    if (size === 1 || !(!le) === nativele) {
      if ((view.byteOffset + offset) % size === 0) {
        new type(view.buffer, view.byteOffset + offset, 1)[0] = value;
      } else {
        new type(temp.buffer)[0] = value;
        for (var i = 0; i < size; i++)
          view._bytes[i + offset] = temp[i];
      }
    } else {
      new type(temp.buffer)[0] = value;
      for (var i = 0; i < size; i++)
        view._bytes[offset + i] = temp[size - 1 - i];
    }
  }
  function fail(msg) {
    throw new Error(msg);
  }
}(this));
var create = Object.create;
var defineProperty = Object.defineProperty;
var keys = Object.keys;
var isArray = Array.isArray;
var fromCharCode = String.fromCharCode;
var log = Math.log;
var max = Math.max;
var min = Math.min;
var pow = Math.pow;
var push = [].push;
var slice = [].slice;
var splice = [].splice;
function fail(msg, context) {
  throw new Error((context ? context + ': ' : '') + msg);
}
function assert(cond, msg, context) {
  if (!cond)
    fail(msg, context);
}
function toStringRgba(color) {
  return 'rgba(' + [
    color.red,
    color.green,
    color.blue,
    color.alpha / 255
  ].join(',') + ')';
}
function toString16(val) {
  return fromCharCode(val >> 8 & 255, val & 255);
}
function toString16Le(val) {
  return fromCharCode(val & 255, val >> 8 & 255);
}
function toString32(val) {
  return toString16(val >> 16) + toString16(val);
}
var crcTable = [];
for (var i = 0; i < 256; i++) {
  var c = i;
  for (var h = 0; h < 8; h++) {
    if (c & 1)
      c = 3988292384 ^ c >> 1 & 2147483647;
    else
      c = c >> 1 & 2147483647;
  }
  crcTable[i] = c;
}
function crc32(data) {
  var crc = -1;
  for (var i = 0, n = data.length; i < n; ++i) {
    var a = (crc ^ data.charCodeAt(i)) & 255;
    var b = crcTable[a];
    crc = crc >>> 8 ^ b;
  }
  return crc ^ -1;
}
function createPngChunk(type, data) {
  var body = type + data;
  return toString32(data.length) + body + toString32(crc32(body));
}
function adler32(data) {
  var a = 1;
  var b = 0;
  for (var i = 0, n = data.length; i < n; ++i) {
    a = (a + (data.charCodeAt(i) & 255)) % 65521;
    b = (b + a) % 65521;
  }
  return b << 16 | a;
}
(function functionNameSupport() {
  if (eval('function t() {} t.name === \'t\'')) {
    return;
  }
  Object.defineProperty(Function.prototype, 'name', {
    get: function () {
      if (this.__name)
        return this.__name;
      var m = /function\s([^\(]+)/.exec(this.toString());
      var name = m && m[1] !== 'anonymous' ? m[1] : null;
      return this.__name = name;
    },
    configurable: true,
    enumerable: false
  });
}());
var create = Object.create;
var defineProperty = Object.defineProperty;
var keys = Object.keys;
var isArray = Array.isArray;
var fromCharCode = String.fromCharCode;
var log = Math.log;
var max = Math.max;
var min = Math.min;
var pow = Math.pow;
var push = [].push;
var slice = [].slice;
var splice = [].splice;
function fail(msg, context) {
  throw new Error((context ? context + ': ' : '') + msg);
}
function assert(cond, msg, context) {
  if (!cond)
    fail(msg, context);
}
function toStringRgba(color) {
  return 'rgba(' + [
    color.red,
    color.green,
    color.blue,
    color.alpha / 255
  ].join(',') + ')';
}
function toString16(val) {
  return fromCharCode(val >> 8 & 255, val & 255);
}
function toString16Le(val) {
  return fromCharCode(val & 255, val >> 8 & 255);
}
function toString32(val) {
  return toString16(val >> 16) + toString16(val);
}
var crcTable = [];
for (var i = 0; i < 256; i++) {
  var c = i;
  for (var h = 0; h < 8; h++) {
    if (c & 1)
      c = 3988292384 ^ c >> 1 & 2147483647;
    else
      c = c >> 1 & 2147483647;
  }
  crcTable[i] = c;
}
function crc32(data) {
  var crc = -1;
  for (var i = 0, n = data.length; i < n; ++i) {
    var a = (crc ^ data.charCodeAt(i)) & 255;
    var b = crcTable[a];
    crc = crc >>> 8 ^ b;
  }
  return crc ^ -1;
}
function createPngChunk(type, data) {
  var body = type + data;
  return toString32(data.length) + body + toString32(crc32(body));
}
function adler32(data) {
  var a = 1;
  var b = 0;
  for (var i = 0, n = data.length; i < n; ++i) {
    a = (a + (data.charCodeAt(i) & 255)) % 65521;
    b = (b + a) % 65521;
  }
  return b << 16 | a;
}
(function functionNameSupport() {
  if (eval('function t() {} t.name === \'t\'')) {
    return;
  }
  Object.defineProperty(Function.prototype, 'name', {
    get: function () {
      if (this.__name)
        return this.__name;
      var m = /function\s([^\(]+)/.exec(this.toString());
      var name = m && m[1] !== 'anonymous' ? m[1] : null;
      return this.__name = name;
    },
    configurable: true,
    enumerable: false
  });
}());
var SWF_TAG_CODE_CSM_TEXT_SETTINGS = 74;
var SWF_TAG_CODE_DEFINE_BINARY_DATA = 87;
var SWF_TAG_CODE_DEFINE_BITS = 6;
var SWF_TAG_CODE_DEFINE_BITS_JPEG2 = 21;
var SWF_TAG_CODE_DEFINE_BITS_JPEG3 = 35;
var SWF_TAG_CODE_DEFINE_BITS_JPEG4 = 90;
var SWF_TAG_CODE_DEFINE_BITS_LOSSLESS = 20;
var SWF_TAG_CODE_DEFINE_BITS_LOSSLESS2 = 36;
var SWF_TAG_CODE_DEFINE_BUTTON = 7;
var SWF_TAG_CODE_DEFINE_BUTTON2 = 34;
var SWF_TAG_CODE_DEFINE_BUTTON_CXFORM = 23;
var SWF_TAG_CODE_DEFINE_BUTTON_SOUND = 17;
var SWF_TAG_CODE_DEFINE_EDIT_TEXT = 37;
var SWF_TAG_CODE_DEFINE_FONT = 10;
var SWF_TAG_CODE_DEFINE_FONT2 = 48;
var SWF_TAG_CODE_DEFINE_FONT3 = 75;
var SWF_TAG_CODE_DEFINE_FONT4 = 91;
var SWF_TAG_CODE_DEFINE_FONT_ALIGN_ZONES = 73;
var SWF_TAG_CODE_DEFINE_FONT_INFO = 13;
var SWF_TAG_CODE_DEFINE_FONT_INFO2 = 62;
var SWF_TAG_CODE_DEFINE_FONT_NAME = 88;
var SWF_TAG_CODE_DEFINE_MORPH_SHAPE = 46;
var SWF_TAG_CODE_DEFINE_MORPH_SHAPE2 = 84;
var SWF_TAG_CODE_DEFINE_SCALING_GRID = 78;
var SWF_TAG_CODE_DEFINE_SCENE_AND_FRAME_LABEL_DATA = 86;
var SWF_TAG_CODE_DEFINE_SHAPE = 2;
var SWF_TAG_CODE_DEFINE_SHAPE2 = 22;
var SWF_TAG_CODE_DEFINE_SHAPE3 = 32;
var SWF_TAG_CODE_DEFINE_SHAPE4 = 83;
var SWF_TAG_CODE_DEFINE_SOUND = 14;
var SWF_TAG_CODE_DEFINE_SPRITE = 39;
var SWF_TAG_CODE_DEFINE_TEXT = 11;
var SWF_TAG_CODE_DEFINE_TEXT2 = 33;
var SWF_TAG_CODE_DEFINE_VIDEO_STREAM = 60;
var SWF_TAG_CODE_DO_ABC = 82;
var SWF_TAG_CODE_DO_ACTION = 12;
var SWF_TAG_CODE_DO_INIT_ACTION = 59;
var SWF_TAG_CODE_ENABLE_DEBUGGER = 58;
var SWF_TAG_CODE_ENABLE_DEBUGGER2 = 64;
var SWF_TAG_CODE_END = 0;
var SWF_TAG_CODE_EXPORT_ASSETS = 56;
var SWF_TAG_CODE_FILE_ATTRIBUTES = 69;
var SWF_TAG_CODE_FRAME_LABEL = 43;
var SWF_TAG_CODE_IMPORT_ASSETS = 57;
var SWF_TAG_CODE_IMPORT_ASSETS2 = 71;
var SWF_TAG_CODE_JPEG_TABLES = 8;
var SWF_TAG_CODE_METADATA = 77;
var SWF_TAG_CODE_PLACE_OBJECT = 4;
var SWF_TAG_CODE_PLACE_OBJECT2 = 26;
var SWF_TAG_CODE_PLACE_OBJECT3 = 70;
var SWF_TAG_CODE_PROTECT = 24;
var SWF_TAG_CODE_REMOVE_OBJECT = 5;
var SWF_TAG_CODE_REMOVE_OBJECT2 = 28;
var SWF_TAG_CODE_SCRIPT_LIMITS = 65;
var SWF_TAG_CODE_SET_BACKGROUND_COLOR = 9;
var SWF_TAG_CODE_SET_TAB_INDEX = 66;
var SWF_TAG_CODE_SHOW_FRAME = 1;
var SWF_TAG_CODE_SOUND_STREAM_BLOCK = 19;
var SWF_TAG_CODE_SOUND_STREAM_HEAD = 18;
var SWF_TAG_CODE_SOUND_STREAM_HEAD2 = 45;
var SWF_TAG_CODE_START_SOUND = 15;
var SWF_TAG_CODE_START_SOUND2 = 89;
var SWF_TAG_CODE_SYMBOL_CLASS = 76;
var SWF_TAG_CODE_VIDEO_FRAME = 61;
self.SWF = {};
var SI8 = 0;
var SI16 = 1;
var SI32 = 2;
var UI8 = 3;
var UI16 = 4;
var UI32 = 5;
var FIXED = 6;
var FIXED8 = 7;
var FLOAT16 = 8;
var FLOAT = 9;
var DOUBLE = 10;
var EncodedU32 = 11;
var BOOL = 12;
var ALIGN = 13;
function createFlexibleType(id) {
  var factory = function () {
    return {
      $: id,
      args: slice.call(arguments)
    };
  };
  factory.valueOf = function () {
    return id;
  };
  return factory;
}
var SB = createFlexibleType(14);
var UB = createFlexibleType(15);
var FB = createFlexibleType(16);
var STRING = createFlexibleType(17);
var BINARY = createFlexibleType(18);
var RGB = {
    red: UI8,
    green: UI8,
    blue: UI8,
    alpha: '255'
  };
var RGBA = {
    red: UI8,
    green: UI8,
    blue: UI8,
    alpha: UI8
  };
var ARGB = {
    alpha: UI8,
    red: UI8,
    green: UI8,
    blue: UI8
  };
var RECT = {
    $$0: ALIGN,
    $$bits: UB(5),
    $$xMin: SB('bits'),
    $$xMax: SB('bits'),
    $$yMin: SB('bits'),
    $$yMax: SB('bits'),
    left: 'xMin/20',
    right: 'xMax/20',
    top: 'yMin/20',
    bottom: 'yMax/20',
    $$1: ALIGN
  };
var MATRIX = {
    $$0: ALIGN,
    $$hasScale: UB(1),
    $0: [
      'hasScale',
      [
        {
          $$bits: UB(5),
          a: FB('bits'),
          d: FB('bits')
        },
        {
          a: '1',
          d: '1'
        }
      ]
    ],
    $$hasRotate: UB(1),
    $1: [
      'hasRotate',
      [
        {
          $$bits: UB(5),
          b: FB('bits'),
          c: FB('bits')
        },
        {
          b: '0',
          c: '0'
        }
      ]
    ],
    $$bits: UB(5),
    $$e: SB('bits'),
    $$f: SB('bits'),
    tx: 'e/20',
    ty: 'f/20',
    $$1: ALIGN
  };
var CXFORM = {
    $$0: ALIGN,
    $$hasOffsets: UB(1),
    $$hasMultipliers: UB(1),
    $$bits: UB(4),
    $0: [
      'hasMultipliers',
      [
        {
          redMultiplier: SB('bits'),
          greenMultiplier: SB('bits'),
          blueMultiplier: SB('bits'),
          alphaMultiplier: [
            'tagCode>4',
            [
              SB('bits'),
              '256'
            ]
          ]
        },
        {
          redMultiplier: '256',
          greenMultiplier: '256',
          blueMultiplier: '256',
          alphaMultiplier: '256'
        }
      ]
    ],
    $1: [
      'hasOffsets',
      [
        {
          redOffset: SB('bits'),
          greenOffset: SB('bits'),
          blueOffset: SB('bits'),
          alphaOffset: [
            'tagCode>4',
            [
              SB('bits'),
              '0'
            ]
          ]
        },
        {
          redOffset: '0',
          greenOffset: '0',
          blueOffset: '0',
          alphaOffset: '0'
        }
      ]
    ],
    $$1: ALIGN
  };
var MOVIE_HEADER = {
    bbox: RECT,
    $$reserved: UI8,
    frameRate: UI8,
    frameCount: UI16
  };
var EVENT = {
    $$flags: [
      'swfVersion>=6',
      [
        UI32,
        UI16
      ]
    ],
    $eoe: '!flags',
    onKeyUp: 'flags>>7&1',
    onKeyDown: 'flags>>6&1',
    onMouseUp: 'flags>>5&1',
    onMouseDown: 'flags>>4&1',
    onMouseMove: 'flags>>3&1',
    onUnload: 'flags>>2&1',
    onEnterFrame: 'flags>>1&1',
    onLoad: 'flags&1',
    $0: [
      'swfVersion>=6',
      [
        {
          onDragOver: 'flags>>15&1',
          onRollOut: 'flags>>14&1',
          onRollOver: 'flags>>13&1',
          onReleaseOutside: 'flags>>12&1',
          onRelease: 'flags>>11&1',
          onPress: 'flags>>10&1',
          onInitialize: 'flags>>9&1',
          onData: 'flags>>8&1',
          onConstruct: [
            'swfVersion>=7',
            [
              'flags>>18&1',
              '0'
            ]
          ],
          $keyPress: 'flags>>17&1',
          onDragOut: 'flags>>16&1'
        }
      ]
    ],
    $1: [
      '!eoe',
      [
        {
          $length: UI32,
          keyCode: [
            'keyPress',
            [
              UI8,
              null
            ]
          ],
          actionsData: BINARY('length - (keyPress ? 1 : 0)')
        }
      ]
    ]
  };
var FILTER_GLOW = {
    $$count: [
      'type===4||type===7',
      [
        UI8,
        '1'
      ]
    ],
    colors: {
      $: RGBA,
      count: 'count'
    },
    higlightColor: [
      'type===3',
      [
        RGBA
      ]
    ],
    $0: [
      'type===4||type===7',
      [
        {
          ratios: {
            $: UI8,
            count: 'count'
          }
        }
      ]
    ],
    blurX: FIXED,
    blurY: FIXED,
    $1: [
      'type!==2',
      [
        {
          angle: FIXED,
          distance: FIXED
        }
      ]
    ],
    strength: FIXED8,
    innerShadow: UB(1),
    knockout: UB(1),
    compositeSource: UB(1),
    $3: [
      'type===3',
      [
        {
          onTop: UB(1)
        },
        {
          $$reserved: UB(1)
        }
      ]
    ],
    $4: [
      'type===4||type===7',
      [
        {
          passes: UB(4)
        },
        {
          $$reserved: UB(4)
        }
      ]
    ]
  };
var FILTER_BLUR = {
    blurX: FIXED,
    blurY: FIXED,
    passes: UB(5),
    $$reserved: UB(3)
  };
var FILTER_CONVOLUTION = {
    columns: UI8,
    rows: UI8,
    divisor: FLOAT,
    bias: FLOAT,
    weights: {
      $: FLOAT,
      count: 'columns*rows'
    },
    defaultColor: RGBA,
    $$reserved: UB(6),
    clamp: UB(1),
    preserveAlpha: UB(1)
  };
var FILTER_COLORMATRIX = {
    matrix: {
      $: FLOAT,
      count: 20
    }
  };
var ANY_FILTER = {
    $type: UI8,
    $0: [
      'type',
      {
        0: FILTER_GLOW,
        1: FILTER_BLUR,
        2: FILTER_GLOW,
        3: FILTER_GLOW,
        4: FILTER_GLOW,
        5: FILTER_CONVOLUTION,
        6: FILTER_COLORMATRIX,
        7: FILTER_GLOW
      }
    ]
  };
var FILL_SOLID = {
    color: [
      'tagCode>22||isMorph',
      [
        RGBA,
        RGB
      ]
    ],
    colorMorph: [
      'isMorph',
      [
        RGBA
      ]
    ]
  };
var GRADIENT_RECORD = {
    ratio: UI8,
    color: [
      'tagCode>22',
      [
        RGBA,
        RGB
      ]
    ],
    $0: [
      'isMorph',
      [
        {
          ratioMorph: UI8,
          colorMorph: RGBA
        }
      ]
    ]
  };
var GRADIENT = {
    $0: [
      'tagCode===83',
      [
        {
          spreadMode: UB(2),
          interpolationMode: UB(2)
        },
        {
          $$pad: UB(4)
        }
      ]
    ],
    $count: UB(4),
    records: {
      $: GRADIENT_RECORD,
      count: 'count'
    },
    $1: [
      'type===19',
      [
        {
          focalPoint: FIXED8,
          focalPointMorph: [
            'isMorph',
            [
              FIXED8
            ]
          ]
        }
      ]
    ]
  };
var FILL_GRADIENT = {
    matrix: MATRIX,
    matrixMorph: [
      'isMorph',
      [
        MATRIX
      ]
    ],
    $0: GRADIENT
  };
var FILL_BITMAP = {
    bitmapId: UI16,
    matrix: MATRIX,
    matrixMorph: [
      'isMorph',
      [
        MATRIX
      ]
    ],
    condition: 'type===64||type===67'
  };
var FILL_STYLE = {
    $type: UI8,
    $0: [
      'type',
      {
        0: FILL_SOLID,
        16: FILL_GRADIENT,
        18: FILL_GRADIENT,
        19: FILL_GRADIENT,
        64: FILL_BITMAP,
        65: FILL_BITMAP,
        66: FILL_BITMAP,
        67: FILL_BITMAP
      }
    ]
  };
var FILL_STYLE_ARRAY = {
    $$tmp: UI8,
    $$count: [
      'tagCode>2&&tmp===255',
      [
        UI16,
        'tmp'
      ]
    ],
    fillStyles: {
      $: FILL_STYLE,
      count: 'count'
    }
  };
var LINE_STYLE = {
    width: UI16,
    widthMorph: [
      'isMorph',
      [
        UI16
      ]
    ],
    $0: [
      'hasStrokes',
      [
        {
          $$: ALIGN,
          startCapStyle: UB(2),
          $joinStyle: UB(2),
          $hasFill: UB(1),
          noHscale: UB(1),
          noVscale: UB(1),
          pixelHinting: UB(1),
          $$reserved: UB(5),
          noClose: UB(1),
          endCapStyle: UB(2),
          miterLimitFactor: [
            'joinStyle===2',
            [
              FIXED8
            ]
          ],
          $1: [
            'hasFill',
            [
              {
                fillStyle: FILL_STYLE
              },
              {
                color: RGBA,
                colorMorph: [
                  'isMorph',
                  [
                    RGBA
                  ]
                ]
              }
            ]
          ]
        },
        {
          color: [
            'tagCode>22',
            [
              RGBA,
              RGB
            ]
          ],
          colorMorph: [
            'isMorph',
            [
              RGBA
            ]
          ]
        }
      ]
    ]
  };
var LINE_STYLE_ARRAY = {
    $$tmp: UI8,
    $$count: [
      'tagCode>2&&tmp===255',
      [
        UI16,
        'tmp'
      ]
    ],
    lineStyles: {
      $: LINE_STYLE,
      count: 'count'
    }
  };
var STYLE_BITS = {
    $$: ALIGN,
    $$fillBits: UB(4),
    $$lineBits: UB(4)
  };
var STYLES = {
    $0: FILL_STYLE_ARRAY,
    $1: LINE_STYLE_ARRAY,
    $2: STYLE_BITS
  };
var SHAPE_RECORD_SETUP = {
    $hasNewStyles: [
      'tagCode>2',
      [
        'flags>>4',
        '0'
      ]
    ],
    $hasLineStyle: 'flags>>3&1',
    $hasFillStyle1: 'flags>>2&1',
    $hasFillStyle0: 'flags>>1&1',
    $move: 'flags&1',
    $0: [
      'move',
      [
        {
          $$bits: UB(5),
          moveX: SB('bits'),
          moveY: SB('bits')
        }
      ]
    ],
    fillStyle0: [
      'hasFillStyle0',
      [
        UB('fillBits')
      ]
    ],
    fillStyle1: [
      'hasFillStyle1',
      [
        UB('fillBits')
      ]
    ],
    lineStyle: [
      'hasLineStyle',
      [
        UB('lineBits')
      ]
    ],
    $1: [
      'hasNewStyles',
      [
        STYLES
      ]
    ]
  };
var SHAPE_RECORD_EDGE = {
    $isStraight: 'flags>>4',
    $$tmp: 'flags&0x0f',
    $$bits: 'tmp+2',
    $0: [
      'isStraight',
      [
        {
          $isGeneral: UB(1),
          $1: [
            'isGeneral',
            [
              {
                deltaX: SB('bits'),
                deltaY: SB('bits')
              },
              {
                $isVertical: UB(1),
                $2: [
                  'isVertical',
                  [
                    {
                      deltaY: SB('bits')
                    },
                    {
                      deltaX: SB('bits')
                    }
                  ]
                ]
              }
            ]
          ]
        },
        {
          controlDeltaX: SB('bits'),
          controlDeltaY: SB('bits'),
          anchorDeltaX: SB('bits'),
          anchorDeltaY: SB('bits')
        }
      ]
    ]
  };
var SHAPE_RECORD = {
    $type: UB(1),
    $$flags: UB(5),
    $eos: '!(type||flags)',
    $0: [
      'type',
      [
        SHAPE_RECORD_EDGE,
        SHAPE_RECORD_SETUP
      ]
    ]
  };
var SHAPE = {
    $0: STYLE_BITS,
    records: {
      $: SHAPE_RECORD,
      condition: '!eos'
    }
  };
var SHAPE_WITH_STYLE = {
    $0: STYLES,
    records: {
      $: SHAPE_RECORD,
      condition: '!eos'
    }
  };
var MORPH_SHAPE_WITH_STYLE = {
    $0: STYLES,
    records: {
      $: SHAPE_RECORD,
      condition: '!eos'
    },
    $1: STYLE_BITS,
    recordsMorph: {
      $: SHAPE_RECORD,
      condition: '!eos'
    }
  };
var KERNING = {
    $0: [
      'wide',
      [
        {
          code1: UI16,
          code2: UI16
        },
        {
          code1: UI8,
          code2: UI8
        }
      ]
    ],
    adjustment: UI16
  };
var TEXT_ENTRY = {
    glyphIndex: UB('glyphBits'),
    advance: SB('advanceBits')
  };
var TEXT_RECORD_SETUP = {
    $hasFont: 'flags>>3&1',
    $hasColor: 'flags>>2&1',
    $hasMoveY: 'flags>>1&1',
    $hasMoveX: 'flags&1',
    fontId: [
      'hasFont',
      [
        UI16
      ]
    ],
    $0: [
      'hasColor',
      [
        {
          color: [
            'tagCode===33',
            [
              RGBA,
              RGB
            ]
          ]
        }
      ]
    ],
    moveX: [
      'hasMoveX',
      [
        SI16
      ]
    ],
    moveY: [
      'hasMoveY',
      [
        SI16
      ]
    ],
    fontHeight: [
      'hasFont',
      [
        UI16
      ]
    ]
  };
var TEXT_RECORD = {
    $$: ALIGN,
    $$flags: UB(8),
    $eot: '!flags',
    $0: TEXT_RECORD_SETUP,
    $1: [
      '!eot',
      [
        {
          $$tmp: UI8,
          $glyphCount: [
            'swfVersion>6',
            [
              'tmp',
              'tmp&0x7f'
            ]
          ],
          entries: {
            $: TEXT_ENTRY,
            count: 'glyphCount'
          }
        }
      ]
    ]
  };
var SOUND_ENVELOPE = {
    pos44: UI32,
    volumeLeft: UI16,
    volumeRight: UI16
  };
var SOUND_INFO = {
    $$reserved: UB(2),
    stop: UB(1),
    noMultiple: UB(1),
    $hasEnvelope: UB(1),
    $hasLoops: UB(1),
    $hasOutPoint: UB(1),
    $hasInPoint: UB(1),
    inPoint: [
      'hasInPoint',
      [
        UI32
      ]
    ],
    outPoint: [
      'hasOutPoint',
      [
        UI32
      ]
    ],
    loopCount: [
      'hasLoops',
      [
        UI16
      ]
    ],
    $0: [
      'hasEnvelope',
      [
        {
          $envelopeCount: UI8,
          envelopes: {
            $: SOUND_ENVELOPE,
            count: 'envelopeCount'
          }
        }
      ]
    ]
  };
var BUTTON = {
    $$flags: UI8,
    $eob: '!flags',
    $0: [
      'swfVersion>=8',
      [
        {
          $blend: 'flags>>5&1',
          $hasFilters: 'flags>>4&1'
        },
        {
          $blend: '0',
          $hasFilters: '0'
        }
      ]
    ],
    stateHitTest: 'flags>>3&1',
    stateDown: 'flags>>2&1',
    stateOver: 'flags>>1&1',
    stateUp: 'flags&1',
    $1: [
      '!eob',
      [
        {
          symbolId: UI16,
          depth: UI16,
          matrix: MATRIX,
          cxform: [
            'tagCode===34',
            [
              CXFORM
            ]
          ],
          $2: [
            'hasFilters',
            [
              {
                filterCount: UI8,
                filters: ANY_FILTER
              }
            ]
          ],
          blendMode: [
            'blend',
            [
              UI8
            ]
          ]
        }
      ]
    ]
  };
var BUTTONCONDACTION = {
    $$buttonCondSize: UI16,
    $$buttonConditions: UI16,
    idleToOverDown: 'buttonConditions>>7&1',
    outDownToIdle: 'buttonConditions>>6&1',
    outDownToOverDown: 'buttonConditions>>5&1',
    overDownToOutDown: 'buttonConditions>>4&1',
    overDownToOverUp: 'buttonConditions>>3&1',
    overUpToOverDown: 'buttonConditions>>2&1',
    overUpToIdle: 'buttonConditions>>1&1',
    idleToOverUp: 'buttonConditions&1',
    mouseEventFlags: 'buttonConditions&511',
    keyPress: 'buttonConditions>>9&127',
    overDownToIdle: 'buttonConditions>>8&1',
    actionsData: [
      '!buttonCondSize',
      [
        BINARY(0),
        BINARY('buttonCondSize - 4')
      ]
    ]
  };
var DEFINE_BITMAP = {
    id: UI16,
    $format: UI8,
    width: UI16,
    height: UI16,
    hasAlpha: 'tagCode===36',
    colorTableSize: [
      'format===3',
      [
        UI8
      ]
    ],
    bmpData: BINARY(0)
  };
var DEFINE_FONT = {
    id: UI16,
    $$firstOffset: UI16,
    $glyphCount: 'firstOffset/2',
    $$restOffsets: {
      $: UI16,
      count: 'glyphCount-1'
    },
    offsets: '[firstOffset].concat(restOffsets)',
    glyphs: {
      $: SHAPE,
      count: 'glyphCount'
    }
  };
var DEFINE_FONT2 = {
    id: UI16,
    $hasLayout: UB(1),
    $0: [
      'swfVersion>5',
      [
        {
          shiftJis: UB(1)
        },
        {
          $$reserved: UB(1)
        }
      ]
    ],
    smallText: UB(1),
    ansi: UB(1),
    $wideOffset: UB(1),
    $wide: UB(1),
    italic: UB(1),
    bold: UB(1),
    $1: [
      'swfVersion>5',
      [
        {
          language: UI8
        },
        {
          $$reserved: UI8,
          language: '0'
        }
      ]
    ],
    $$nameLength: UI8,
    name: STRING('nameLength'),
    resolution: [
      'tagCode===75',
      [
        '20'
      ]
    ],
    $glyphCount: UI16,
    $2: [
      'wideOffset',
      [
        {
          offsets: {
            $: UI32,
            count: 'glyphCount'
          },
          mapOffset: UI32
        },
        {
          offsets: {
            $: UI16,
            count: 'glyphCount'
          },
          mapOffset: UI16
        }
      ]
    ],
    glyphs: {
      $: SHAPE,
      count: 'glyphCount'
    },
    $3: [
      'wide',
      [
        {
          codes: {
            $: UI16,
            count: 'glyphCount'
          }
        },
        {
          codes: {
            $: UI8,
            count: 'glyphCount'
          }
        }
      ]
    ],
    $4: [
      'hasLayout',
      [
        {
          ascent: UI16,
          descent: UI16,
          leading: SI16,
          advance: {
            $: SI16,
            count: 'glyphCount'
          },
          bbox: {
            $: RECT,
            count: 'glyphCount'
          },
          $$kerningCount: UI16,
          kerning: {
            $: KERNING,
            count: 'kerningCount'
          }
        }
      ]
    ]
  };
var DEFINE_IMAGE = {
    id: UI16,
    $0: [
      'tagCode>21',
      [
        {
          $$alphaDataOffset: UI32,
          deblock: [
            'tagCode===90',
            [
              FIXED8
            ]
          ],
          $imgData: BINARY('alphaDataOffset'),
          alphaData: BINARY(0)
        },
        {
          $imgData: BINARY(0)
        }
      ]
    ],
    mimeType: [
      'imgData[0]<<8|imgData[1]',
      {
        65496: '"image/jpeg"',
        65497: '"image/jpeg"',
        35152: '"image/png"',
        18249: '"image/gif"',
        unknown: '"application/octet-stream"'
      }
    ],
    incomplete: [
      'tagCode===6',
      [
        '1'
      ]
    ]
  };
var DEFINE_JPEG_TABLES = {
    id: '0',
    imgData: BINARY(0),
    mimeType: '"application/octet-stream"'
  };
var DEFINE_LABEL = {
    id: UI16,
    bbox: RECT,
    matrix: MATRIX,
    $glyphBits: UI8,
    $advanceBits: UI8,
    records: {
      $: TEXT_RECORD,
      condition: '!eot'
    }
  };
var DEFINE_SHAPE = {
    id: UI16,
    bbox: RECT,
    $isMorph: 'tagCode===46||tagCode===84',
    bboxMorph: [
      'isMorph',
      [
        RECT
      ]
    ],
    $hasStrokes: 'tagCode===83||tagCode===84',
    $0: [
      'hasStrokes',
      [
        {
          strokeBbox: RECT,
          strokeBboxMorph: [
            'isMorph',
            [
              RECT
            ]
          ],
          $$reserved: UB(5),
          fillWinding: UB(1),
          nonScalingStrokes: UB(1),
          scalingStrokes: UB(1)
        }
      ]
    ],
    $1: [
      'isMorph',
      [
        {
          offsetMorph: UI32,
          $2: MORPH_SHAPE_WITH_STYLE
        },
        {
          $2: SHAPE_WITH_STYLE
        }
      ]
    ]
  };
var DEFINE_TEXT = {
    id: UI16,
    bbox: RECT,
    $$flags: UI16,
    $hasText: 'flags>>7&1',
    wordWrap: 'flags>>6&1',
    multiline: 'flags>>5&1',
    password: 'flags>>4&1',
    readonly: 'flags>>3&1',
    $hasColor: 'flags>>2&1',
    $hasMaxLength: 'flags>>1&1',
    $hasFont: 'flags&1',
    $hasFontClass: 'flags>>15&1',
    autoSize: 'flags>>14&1',
    $hasLayout: 'flags>>13&1',
    noSelect: 'flags>>12&1',
    border: 'flags>>11&1',
    wasStatic: 'flags>>10&1',
    html: 'flags>>9&1',
    useOutlines: 'flags>>8&1',
    fontId: [
      'hasFont',
      [
        UI16
      ]
    ],
    fontClass: [
      'hasFontClass',
      [
        STRING(0)
      ]
    ],
    fontHeight: [
      'hasFont',
      [
        UI16
      ]
    ],
    color: [
      'hasColor',
      [
        RGBA
      ]
    ],
    maxLength: [
      'hasMaxLength',
      [
        UI16
      ]
    ],
    $0: [
      'hasLayout',
      [
        {
          align: UI8,
          leftMargin: UI16,
          rightMargin: UI16,
          indent: SI16,
          leading: SI16
        }
      ]
    ],
    variableName: STRING(0),
    initialText: [
      'hasText',
      [
        STRING(0)
      ]
    ]
  };
var DEFINE_BUTTON = {
    id: UI16,
    $0: [
      'tagCode==7',
      [
        {
          characters: {
            $: BUTTON,
            condition: '!eob'
          },
          actionsData: BINARY(0)
        },
        {
          $$trackFlags: UI8,
          trackAsMenu: 'trackFlags>>7&1',
          $$actionOffset: UI16,
          characters: {
            $: BUTTON,
            condition: '!eob'
          },
          $1: [
            '!!actionOffset',
            [
              {
                buttonActions: {
                  $: BUTTONCONDACTION,
                  condition: '$stream.remaining() > 0'
                }
              }
            ]
          ]
        }
      ]
    ]
  };
var DO_ABC = {
    flags: UI32,
    name: STRING(0),
    data: BINARY(0)
  };
var DO_ACTION = {
    spriteId: [
      'tagCode===59',
      [
        UI16
      ]
    ],
    actionsData: BINARY(0)
  };
var FILE_ATTRIBUTES = {
    $$reserved: UB(1),
    useDirectBlit: UB(1),
    useGpu: UB(1),
    hasMetadata: UB(1),
    doAbc: UB(1),
    noCrossDomainCaching: UB(1),
    relativeUrls: UB(1),
    network: UB(1),
    $$pad: UB(24)
  };
var PLACE_OBJECT = {
    $0: [
      'tagCode>4',
      [
        {
          $$flags: [
            'tagCode>26',
            [
              UI16,
              UI8
            ]
          ],
          $hasEvents: 'flags>>7&1',
          $clip: 'flags>>6&1',
          $hasName: 'flags>>5&1',
          $hasRatio: 'flags>>4&1',
          $hasCxform: 'flags>>3&1',
          $hasMatrix: 'flags>>2&1',
          $place: 'flags>>1&1',
          $move: 'flags&1',
          $1: [
            'tagCode===70',
            [
              {
                $hasBackgroundColor: 'flags>>15&1',
                $hasVisibility: 'flags>>14&1',
                $hasImage: 'flags>>12&1',
                $hasClassName: 'flags>>11&1',
                $cache: 'flags>>10&1',
                $blend: 'flags>>9&1',
                $hasFilters: 'flags>>8&1'
              },
              {
                $cache: '0',
                $blend: '0',
                $hasFilters: '0'
              }
            ]
          ],
          depth: UI16,
          className: [
            'hasClassName',
            [
              STRING(0)
            ]
          ],
          symbolId: [
            'place',
            [
              UI16
            ]
          ],
          matrix: [
            'hasMatrix',
            [
              MATRIX
            ]
          ],
          cxform: [
            'hasCxform',
            [
              CXFORM
            ]
          ],
          ratio: [
            'hasRatio',
            [
              UI16
            ]
          ],
          name: [
            'hasName',
            [
              STRING(0)
            ]
          ],
          clipDepth: [
            'clip',
            [
              UI16
            ]
          ],
          $2: [
            'hasFilters',
            [
              {
                $$count: UI8,
                filters: {
                  $: ANY_FILTER,
                  count: 'count'
                }
              }
            ]
          ],
          blendMode: [
            'blend',
            [
              UI8
            ]
          ],
          bmpCache: [
            'cache',
            [
              UI8
            ]
          ],
          $3: [
            'hasEvents',
            [
              {
                $$reserved: UI16,
                $$allFlags: [
                  'swfVersion>=6',
                  [
                    UI32,
                    UI16
                  ]
                ],
                events: {
                  $: EVENT,
                  condition: '!eoe'
                }
              }
            ]
          ],
          backgroundColor: [
            'hasBackgroundColor',
            [
              'ARGB'
            ]
          ],
          visibility: [
            'hasVisibility',
            [
              UI8
            ]
          ]
        },
        {
          place: '1',
          symbolId: UI16,
          depth: UI16,
          hasMatrix: '1',
          matrix: MATRIX,
          $1: [
            '$stream.remaining()',
            [
              {
                hasCxform: '1',
                cxform: CXFORM
              }
            ]
          ]
        }
      ]
    ]
  };
var REMOVE_OBJECT = {
    symbolId: [
      'tagCode===5',
      [
        UI16
      ]
    ],
    depth: UI16
  };
var SET_BACKGROUND_COLOR = {
    color: RGB
  };
var SYMBOL_CLASS = {
    $$symbolCount: UI16,
    exports: {
      $: {
        symbolId: UI16,
        className: STRING(0)
      },
      count: 'symbolCount'
    }
  };
var FRAME_LABEL = {
    name: STRING(0)
  };
var DEFINE_SOUND = {
    id: UI16,
    $$soundFlags: UI8,
    soundFormat: 'soundFlags>>4&15',
    soundRate: 'soundFlags>>2&3',
    soundSize: 'soundFlags>>1&1',
    soundType: 'soundFlags&1',
    samplesCount: UI32,
    soundData: BINARY(0)
  };
var START_SOUND = {
    soundId: [
      'tagCode == 15',
      [
        UI16
      ]
    ],
    soundClassName: [
      'tagCode == 89',
      [
        STRING(0)
      ]
    ],
    soundInfo: SOUND_INFO
  };
var SOUND_STREAM_HEAD = {
    $$playbackFlags: UI8,
    playbackRate: 'playbackFlags>>2&3',
    playbackSize: 'playbackFlags>>1&1',
    playbackType: 'playbackFlags&1',
    $$streamFlags: UI8,
    $streamCompression: 'streamFlags>>4&15',
    streamRate: 'streamFlags>>2&3',
    streamSize: 'streamFlags>>1&1',
    streamType: 'streamFlags&1',
    samplesCount: UI32,
    latencySeek: [
      'streamCompression == 2',
      [
        SI16
      ]
    ]
  };
var SOUND_STREAM_BLOCK = {
    data: BINARY(0)
  };
var codeLengthOrder = [
    16,
    17,
    18,
    0,
    8,
    7,
    9,
    6,
    10,
    5,
    11,
    4,
    12,
    3,
    13,
    2,
    14,
    1,
    15
  ];
var distanceCodes = [];
var distanceExtraBits = [];
for (var i = 0, j = 0, code = 1; i < 30; ++i) {
  distanceCodes[i] = code;
  code += 1 << (distanceExtraBits[i] = ~(~((j += i > 2 ? 1 : 0) / 2)));
}
var bitLengths = [];
for (var i = 0; i < 32; ++i)
  bitLengths[i] = 5;
var fixedDistanceTable = makeHuffmanTable(bitLengths);
var lengthCodes = [];
var lengthExtraBits = [];
for (var i = 0, j = 0, code = 3; i < 29; ++i) {
  lengthCodes[i] = code - (i == 28 ? 1 : 0);
  code += 1 << (lengthExtraBits[i] = ~(~((j += i > 4 ? 1 : 0) / 4 % 6)));
}
for (var i = 0; i < 288; ++i)
  bitLengths[i] = i < 144 || i > 279 ? 8 : i < 256 ? 9 : 7;
var fixedLiteralTable = makeHuffmanTable(bitLengths);
function makeHuffmanTable(bitLengths) {
  var maxBits = max.apply(null, bitLengths);
  var numLengths = bitLengths.length;
  var size = 1 << maxBits;
  var codes = new Uint32Array(size);
  for (var code = 0, len = 1, skip = 2; len <= maxBits; code <<= 1, ++len, skip <<= 1) {
    for (var val = 0; val < numLengths; ++val) {
      if (bitLengths[val] === len) {
        var lsb = 0;
        for (var i = 0; i < len; ++i)
          lsb = lsb * 2 + (code >> i & 1);
        for (var i = lsb; i < size; i += skip)
          codes[i] = len << 16 | val;
        ++code;
      }
    }
  }
  return {
    codes: codes,
    maxBits: maxBits
  };
}
function verifyDeflateHeader(bytes) {
  var header = bytes[0] << 8 | bytes[1];
}
function createInflatedStream(bytes, outputLength) {
  verifyDeflateHeader(bytes);
  var stream = new Stream(bytes, 2);
  var output = {
      data: new Uint8Array(outputLength),
      available: 0,
      completed: false
    };
  var state = {};
  do {
    inflateBlock(stream, output, state);
  } while (!output.completed && stream.pos < stream.end);
  return new Stream(output.data, 0, output.available);
}
var InflateNoDataError = {};
function inflateBlock(stream, output, state) {
  var header = 'header' in state ? state.header : state.header = readBits(stream.bytes, stream, 3);
  switch (header >> 1) {
  case 0:
    stream.align();
    var pos = stream.pos;
    if (stream.end - pos < 4) {
      throw InflateNoDataError;
    }
    var len = stream.getUint16(pos, true);
    var nlen = stream.getUint16(pos + 2, true);
    if (stream.end - pos < 4 + len) {
      throw InflateNoDataError;
    }
    var begin = pos + 4;
    var end = stream.pos = begin + len;
    var sbytes = stream.bytes, dbytes = output.data;
    splice.apply(dbytes, [
      output.available,
      len
    ].concat(slice.call(sbytes, begin, end)));
    output.available += len;
    break;
  case 1:
    inflate(stream, output, fixedLiteralTable, fixedDistanceTable, state);
    break;
  case 2:
    var distanceTable, literalTable;
    if ('distanceTable' in state) {
      distanceTable = state.distanceTable;
      literalTable = state.literalTable;
    } else {
      var sbytes = stream.bytes;
      var savedBufferPos = stream.pos;
      var savedBitBuffer = stream.bitBuffer;
      var savedBitLength = stream.bitLength;
      try {
        var bitLengths = [];
        var numLiteralCodes = readBits(sbytes, stream, 5) + 257;
        var numDistanceCodes = readBits(sbytes, stream, 5) + 1;
        var numCodes = numLiteralCodes + numDistanceCodes;
        var numLengthCodes = readBits(sbytes, stream, 4) + 4;
        for (var i = 0; i < 19; ++i)
          bitLengths[codeLengthOrder[i]] = i < numLengthCodes ? readBits(sbytes, stream, 3) : 0;
        var codeLengthTable = makeHuffmanTable(bitLengths);
        bitLengths = [];
        var i = 0;
        var prev = 0;
        while (i < numCodes) {
          var j = 1;
          var sym = readCode(sbytes, stream, codeLengthTable);
          switch (sym) {
          case 16:
            j = readBits(sbytes, stream, 2) + 3;
            sym = prev;
            break;
          case 17:
            j = readBits(sbytes, stream, 3) + 3;
            sym = 0;
            break;
          case 18:
            j = readBits(sbytes, stream, 7) + 11;
            sym = 0;
            break;
          default:
            prev = sym;
          }
          while (j--)
            bitLengths[i++] = sym;
        }
      } catch (e) {
        stream.pos = savedBufferPos;
        stream.bitBuffer = savedBitBuffer;
        stream.bitLength = savedBitLength;
        throw e;
      }
      distanceTable = state.distanceTable = makeHuffmanTable(bitLengths.splice(numLiteralCodes, numDistanceCodes));
      literalTable = state.literalTable = makeHuffmanTable(bitLengths);
    }
    inflate(stream, output, literalTable, distanceTable, state);
    delete state.distanceTable;
    delete state.literalTable;
    break;
  default:
    fail('unknown block type', 'inflate');
  }
  delete state.header;
  output.completed = !(!(header & 1));
}
function readBits(bytes, stream, size) {
  var bitBuffer = stream.bitBuffer;
  var bitLength = stream.bitLength;
  if (size > bitLength) {
    var pos = stream.pos;
    var end = stream.end;
    do {
      if (pos >= end) {
        stream.pos = pos;
        stream.bitBuffer = bitBuffer;
        stream.bitLength = bitLength;
        throw InflateNoDataError;
      }
      bitBuffer |= bytes[pos++] << bitLength;
      bitLength += 8;
    } while (size > bitLength);
    stream.pos = pos;
  }
  stream.bitBuffer = bitBuffer >>> size;
  stream.bitLength = bitLength - size;
  return bitBuffer & (1 << size) - 1;
}
function inflate(stream, output, literalTable, distanceTable, state) {
  var pos = output.available;
  var dbytes = output.data;
  var sbytes = stream.bytes;
  var sym = 'sym' in state ? state.sym : readCode(sbytes, stream, literalTable);
  while (sym !== 256) {
    if (sym < 256) {
      dbytes[pos++] = sym;
    } else {
      state.sym = sym;
      sym -= 257;
      var len = 'len' in state ? state.len : state.len = lengthCodes[sym] + readBits(sbytes, stream, lengthExtraBits[sym]);
      var sym2 = 'sym2' in state ? state.sym2 : state.sym2 = readCode(sbytes, stream, distanceTable);
      var distance = distanceCodes[sym2] + readBits(sbytes, stream, distanceExtraBits[sym2]);
      var i = pos - distance;
      while (len--)
        dbytes[pos++] = dbytes[i++];
      delete state.sym2;
      delete state.len;
      delete state.sym;
    }
    output.available = pos;
    sym = readCode(sbytes, stream, literalTable);
  }
}
function readCode(bytes, stream, codeTable) {
  var bitBuffer = stream.bitBuffer;
  var bitLength = stream.bitLength;
  var maxBits = codeTable.maxBits;
  if (maxBits > bitLength) {
    var pos = stream.pos;
    var end = stream.end;
    do {
      if (pos >= end) {
        stream.pos = pos;
        stream.bitBuffer = bitBuffer;
        stream.bitLength = bitLength;
        throw InflateNoDataError;
      }
      bitBuffer |= bytes[pos++] << bitLength;
      bitLength += 8;
    } while (maxBits > bitLength);
    stream.pos = pos;
  }
  var code = codeTable.codes[bitBuffer & (1 << maxBits) - 1];
  var len = code >> 16;
  stream.bitBuffer = bitBuffer >>> len;
  stream.bitLength = bitLength - len;
  return code & 65535;
}
var StreamNoDataError = {};
var Stream = function StreamClosure() {
    function Stream_align() {
      this.bitBuffer = this.bitLength = 0;
    }
    function Stream_ensure(size) {
      if (this.pos + size > this.end) {
        throw StreamNoDataError;
      }
    }
    function Stream_remaining() {
      return this.end - this.pos;
    }
    function Stream_substream(begin, end) {
      var stream = new Stream(this.bytes);
      stream.pos = begin;
      stream.end = end;
      return stream;
    }
    function Stream_push(data) {
      var bytes = this.bytes;
      var newBytesLength = this.end + data.length;
      if (newBytesLength > bytes.length) {
        throw 'stream buffer overfow';
      }
      bytes.set(data, this.end);
      this.end = newBytesLength;
    }
    function Stream(buffer, offset, length, maxLength) {
      if (offset === undefined)
        offset = 0;
      if (buffer.buffer instanceof ArrayBuffer) {
        offset += buffer.byteOffset;
        buffer = buffer.buffer;
      }
      if (length === undefined)
        length = buffer.byteLength - offset;
      if (maxLength === undefined)
        maxLength = length;
      var bytes = new Uint8Array(buffer, offset, maxLength);
      var stream = new DataView(buffer, offset, maxLength);
      stream.bytes = bytes;
      stream.pos = 0;
      stream.end = length;
      stream.bitBuffer = 0;
      stream.bitLength = 0;
      stream.align = Stream_align;
      stream.ensure = Stream_ensure;
      stream.remaining = Stream_remaining;
      stream.substream = Stream_substream;
      stream.push = Stream_push;
      return stream;
    }
    return Stream;
  }();
function readSi8($bytes, $stream) {
  return $stream.getInt8($stream.pos++);
}
function readSi16($bytes, $stream) {
  return $stream.getInt16($stream.pos, $stream.pos += 2);
}
function readSi32($bytes, $stream) {
  return $stream.getInt32($stream.pos, $stream.pos += 4);
}
function readUi8($bytes, $stream) {
  return $bytes[$stream.pos++];
}
function readUi16($bytes, $stream) {
  return $stream.getUint16($stream.pos, $stream.pos += 2);
}
function readUi32($bytes, $stream) {
  return $stream.getUint32($stream.pos, $stream.pos += 4);
}
function readFixed($bytes, $stream) {
  return $stream.getInt32($stream.pos, $stream.pos += 4) / 65536;
}
function readFixed8($bytes, $stream) {
  return $stream.getInt16($stream.pos, $stream.pos += 2) / 256;
}
function readFloat16($bytes, $stream) {
  var ui16 = $stream.getUint16($stream.pos);
  $stream.pos += 2;
  var sign = ui16 >> 15 ? -1 : 1;
  var exponent = (ui16 & 31744) >> 10;
  var fraction = ui16 & 1023;
  if (!exponent)
    return sign * pow(2, -14) * (fraction / 1024);
  if (exponent === 31)
    return fraction ? NaN : sign * Infinity;
  return sign * pow(2, exponent - 15) * (1 + fraction / 1024);
}
function readFloat($bytes, $stream) {
  return $stream.getFloat32($stream.pos, $stream.pos += 4);
}
function readDouble($bytes, $stream) {
  return $stream.getFloat64($stream.pos, $stream.pos += 8);
}
function readEncodedU32($bytes, $stream) {
  var val = $bytes[$stream.pos++];
  if (!(val & 128))
    return val;
  val |= $bytes[$stream.pos++] << 7;
  if (!(val & 16384))
    return val;
  val |= $bytes[$stream.pos++] << 14;
  if (!(val & 2097152))
    return val;
  val |= $bytes[$stream.pos++] << 21;
  if (!(val & 268435456))
    return val;
  return val | $bytes[$stream.pos++] << 28;
}
function readBool($bytes, $stream) {
  return !(!$bytes[$stream.pos++]);
}
function align($bytes, $stream) {
  $stream.align();
}
function readSb($bytes, $stream, size) {
  return readUb($bytes, $stream, size) << 32 - size >> 32 - size;
}
var masks = new Uint32Array(33);
for (var i = 1, mask = 0; i <= 32; ++i)
  masks[i] = mask = mask << 1 | 1;
function readUb($bytes, $stream, size) {
  var buffer = $stream.bitBuffer;
  var bitlen = $stream.bitLength;
  while (size > bitlen) {
    buffer = buffer << 8 | $bytes[$stream.pos++];
    bitlen += 8;
  }
  bitlen -= size;
  var val = buffer >>> bitlen & masks[size];
  $stream.bitBuffer = buffer;
  $stream.bitLength = bitlen;
  return val;
}
function readFb($bytes, $stream, size) {
  return readSb($bytes, $stream, size) / 65536;
}
function readString($bytes, $stream, length) {
  var codes = [];
  var pos = $stream.pos;
  if (length) {
    codes = slice.call($bytes, pos, pos += length);
  } else {
    length = 0;
    for (var code; code = $bytes[pos++]; length++)
      codes[length] = code;
  }
  $stream.pos = pos;
  var numChunks = length / 65536;
  var str = '';
  for (var i = 0; i < numChunks; ++i) {
    var begin = i * 65536;
    var end = begin + 65536;
    var chunk = codes.slice(begin, end);
    str += fromCharCode.apply(null, chunk);
  }
  return decodeURIComponent(escape(str.replace('\0', '', 'g')));
}
function readBinary($bytes, $stream, size) {
  return $bytes.subarray($stream.pos, $stream.pos = size ? $stream.pos + size : $stream.end);
}
var defaultTemplateSet = [
    readSi8,
    readSi16,
    readSi32,
    readUi8,
    readUi16,
    readUi32,
    readFixed,
    readFixed8,
    readFloat16,
    readFloat,
    readDouble,
    readEncodedU32,
    readBool,
    align,
    readSb,
    readUb,
    readFb,
    readString,
    readBinary
  ];
var rtemplate = /^function\s*(.*)\s*\(([^)]*)\)\s*{\s*([\s\S]*.)\s*}$/;
var rinlinable = /^return\s*([^;]*)$/;
function generateParser(_struct) {
  var productions = [];
  var varCount = 0;
  (function produce(_struct, context) {
    if (typeof _struct !== 'object' || '$' in _struct) {
      _struct = {
        $$: _struct
      };
      context = undefined;
    } else if (!context) {
      context = '$' + varCount++;
    }
    var production = [];
    for (var field in _struct) {
      var type = _struct[field];
      if (typeof type === 'object' && type.$ != undefined) {
        var options = type;
        type = options.$;
      } else {
        var options = {};
      }
      var merge = false;
      var hide = false;
      var refer = false;
      if (field[0] === '$') {
        if (+field[1] == field[1]) {
          merge = true;
          hide = true;
        } else {
          refer = true;
          if (field[1] === '$')
            hide = true;
        }
        field = field.replace(/^\$\$?\d*/, '');
      }
      var segment = [];
      if (field) {
        if (refer)
          segment.push('var ' + field + '=');
        if (!hide)
          segment.push(context + '.' + field + '=');
      }
      if (options.count || 'length' in options || options.condition) {
        if (refer) {
          var listVar = field;
        } else {
          var listVar = '$' + varCount++;
          segment.unshift('var ' + listVar + '=');
        }
        segment.push('[]');
        if (options.count) {
          var countVar = '$' + varCount++;
          segment.push('var ' + countVar + '=' + options.count);
          segment.push('while(' + countVar + '--){');
        } else if ('length' in options) {
          var endVar = '$' + varCount++;
          var length = options.length;
          if (length <= 0)
            length = '$stream.remaining()+' + length;
          segment.push('var ' + endVar + '=$stream.pos+' + length + '');
          segment.push('while($stream.pos<' + endVar + '){');
        } else {
          segment.push('do{');
        }
        var obj = produce(type);
        if (obj) {
          segment.push('var ' + obj + '={}');
          segment.push(productions.pop());
          segment.push(listVar + '.push(' + obj + ')}');
        } else {
          segment.push(listVar + '.push(');
          segment.push(productions.pop());
          segment.push(')}');
        }
        if (options.condition)
          segment.push('while(' + options.condition + ')');
      } else {
        switch (typeof type) {
        case 'number':
          var template = defaultTemplateSet[type];
          if (typeof template === 'function') {
            var terms = rtemplate.exec(template);
            var name = terms[1];
            var params = terms[2].split(', ');
            var body = terms[3].split('\n');
            var inline = true;
            var argc = params.length - 2;
            if (argc) {
              var args = options.args;
              params.splice(2, args.length, args);
              inline = false;
            }
            if (inline && rinlinable.test(body))
              type = RegExp.$1;
            else
              type = name + '(' + params.join(',') + ')';
          } else {
            type = template;
          }
        case 'string':
          segment.push(type);
          break;
        case 'object':
          var shared = segment.splice(0).join('');
          function branch(_struct) {
            var obj = produce(_struct, merge ? context : refer && field);
            var init = shared;
            if (!merge && obj) {
              if (!(refer || hide))
                init = 'var ' + obj + '=' + init;
              init += '{}';
            }
            segment.push(init);
            segment.push(productions.pop());
          }
          if (isArray(type)) {
            var expr = type[0];
            var branches = type[1];
            if (isArray(branches)) {
              segment.push('if(' + expr + '){');
              branch(branches[0]);
              segment.push('}');
              if (branches[1]) {
                segment.push('else{');
                branch(branches[1]);
                segment.push('}');
              }
            } else {
              var values = keys(branches);
              segment.push('switch(' + expr + '){');
              var val;
              var i = 0;
              while (val = values[i++]) {
                if (val !== 'unknown') {
                  segment.push('case ' + val + ':');
                  if (branches[val] != branches[values[i]]) {
                    branch(branches[val]);
                    segment.push('break');
                  }
                }
              }
              segment.push('default:');
              if ('unknown' in branches)
                branch(branches.unknown);
              segment.push('}');
            }
          } else {
            branch(type);
          }
          break;
        default:
          fail('invalid type', 'generate');
        }
      }
      push.apply(production, segment);
    }
    productions.push(production.join('\n'));
    return context;
  }(_struct, '$'));
  var args = [
      '$bytes',
      '$stream',
      '$'
    ];
  if (arguments.length > 1)
    push.apply(args, slice.call(arguments, 1));
  return (1, eval)('(function(' + args.join(',') + '){\n' + '$||($={})\n' + productions.join('\n') + '\n' + 'return $\n' + '})');
}
var tagHandler = {
    2: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var $0 = $.bbox = {};
      align($bytes, $stream);
      var bits = readUb($bytes, $stream, 5);
      var xMin = readSb($bytes, $stream, bits);
      var xMax = readSb($bytes, $stream, bits);
      var yMin = readSb($bytes, $stream, bits);
      var yMax = readSb($bytes, $stream, bits);
      $0.left = xMin / 20;
      $0.right = xMax / 20;
      $0.top = yMin / 20;
      $0.bottom = yMax / 20;
      align($bytes, $stream);
      var isMorph = $.isMorph = tagCode === 46 || tagCode === 84;
      if (isMorph) {
        var $1 = $.bboxMorph = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $1.left = xMin / 20;
        $1.right = xMax / 20;
        $1.top = yMin / 20;
        $1.bottom = yMax / 20;
        align($bytes, $stream);
      }
      var hasStrokes = $.hasStrokes = tagCode === 83 || tagCode === 84;
      if (hasStrokes) {
        var $2 = $.strokeBbox = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $2.left = xMin / 20;
        $2.right = xMax / 20;
        $2.top = yMin / 20;
        $2.bottom = yMax / 20;
        align($bytes, $stream);
        if (isMorph) {
          var $3 = $.strokeBboxMorph = {};
          align($bytes, $stream);
          var bits = readUb($bytes, $stream, 5);
          var xMin = readSb($bytes, $stream, bits);
          var xMax = readSb($bytes, $stream, bits);
          var yMin = readSb($bytes, $stream, bits);
          var yMax = readSb($bytes, $stream, bits);
          $3.left = xMin / 20;
          $3.right = xMax / 20;
          $3.top = yMin / 20;
          $3.bottom = yMax / 20;
          align($bytes, $stream);
        }
        var reserved = readUb($bytes, $stream, 5);
        $.fillWinding = readUb($bytes, $stream, 1);
        $.nonScalingStrokes = readUb($bytes, $stream, 1);
        $.scalingStrokes = readUb($bytes, $stream, 1);
      }
      if (isMorph) {
        $.offsetMorph = readUi32($bytes, $stream);
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $4 = $.fillStyles = [];
        var $5 = count;
        while ($5--) {
          var $6 = {};
          var type = $6.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $7 = $6.color = {};
              $7.red = readUi8($bytes, $stream);
              $7.green = readUi8($bytes, $stream);
              $7.blue = readUi8($bytes, $stream);
              $7.alpha = readUi8($bytes, $stream);
            } else {
              var $8 = $6.color = {};
              $8.red = readUi8($bytes, $stream);
              $8.green = readUi8($bytes, $stream);
              $8.blue = readUi8($bytes, $stream);
              $8.alpha = 255;
            }
            if (isMorph) {
              var $9 = $6.colorMorph = {};
              $9.red = readUi8($bytes, $stream);
              $9.green = readUi8($bytes, $stream);
              $9.blue = readUi8($bytes, $stream);
              $9.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $10 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $10.a = readFb($bytes, $stream, bits);
              $10.d = readFb($bytes, $stream, bits);
            } else {
              $10.a = 1;
              $10.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $10.b = readFb($bytes, $stream, bits);
              $10.c = readFb($bytes, $stream, bits);
            } else {
              $10.b = 0;
              $10.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $10.tx = e / 20;
            $10.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $11 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $11.a = readFb($bytes, $stream, bits);
                $11.d = readFb($bytes, $stream, bits);
              } else {
                $11.a = 1;
                $11.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $11.b = readFb($bytes, $stream, bits);
                $11.c = readFb($bytes, $stream, bits);
              } else {
                $11.b = 0;
                $11.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $11.tx = e / 20;
              $11.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $6.spreadMode = readUb($bytes, $stream, 2);
              $6.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $6.count = readUb($bytes, $stream, 4);
            var $12 = $6.records = [];
            var $13 = count;
            while ($13--) {
              var $14 = {};
              $14.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $15 = $14.color = {};
                $15.red = readUi8($bytes, $stream);
                $15.green = readUi8($bytes, $stream);
                $15.blue = readUi8($bytes, $stream);
                $15.alpha = readUi8($bytes, $stream);
              } else {
                var $16 = $14.color = {};
                $16.red = readUi8($bytes, $stream);
                $16.green = readUi8($bytes, $stream);
                $16.blue = readUi8($bytes, $stream);
                $16.alpha = 255;
              }
              if (isMorph) {
                $14.ratioMorph = readUi8($bytes, $stream);
                var $17 = $14.colorMorph = {};
                $17.red = readUi8($bytes, $stream);
                $17.green = readUi8($bytes, $stream);
                $17.blue = readUi8($bytes, $stream);
                $17.alpha = readUi8($bytes, $stream);
              }
              $12.push($14);
            }
            if (type === 19) {
              $6.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $6.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $6.bitmapId = readUi16($bytes, $stream);
            var $18 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $18.a = readFb($bytes, $stream, bits);
              $18.d = readFb($bytes, $stream, bits);
            } else {
              $18.a = 1;
              $18.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $18.b = readFb($bytes, $stream, bits);
              $18.c = readFb($bytes, $stream, bits);
            } else {
              $18.b = 0;
              $18.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $18.tx = e / 20;
            $18.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $19 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $19.a = readFb($bytes, $stream, bits);
                $19.d = readFb($bytes, $stream, bits);
              } else {
                $19.a = 1;
                $19.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $19.b = readFb($bytes, $stream, bits);
                $19.c = readFb($bytes, $stream, bits);
              } else {
                $19.b = 0;
                $19.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $19.tx = e / 20;
              $19.ty = f / 20;
              align($bytes, $stream);
            }
            $6.condition = type === 64 || type === 67;
            break;
          default:
          }
          $4.push($6);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $20 = $.lineStyles = [];
        var $21 = count;
        while ($21--) {
          var $22 = {};
          $22.width = readUi16($bytes, $stream);
          if (isMorph) {
            $22.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $22.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $22.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $22.hasFill = readUb($bytes, $stream, 1);
            $22.noHscale = readUb($bytes, $stream, 1);
            $22.noVscale = readUb($bytes, $stream, 1);
            $22.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $22.noClose = readUb($bytes, $stream, 1);
            $22.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $22.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $23 = $22.fillStyle = {};
              var type = $23.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $24 = $23.color = {};
                  $24.red = readUi8($bytes, $stream);
                  $24.green = readUi8($bytes, $stream);
                  $24.blue = readUi8($bytes, $stream);
                  $24.alpha = readUi8($bytes, $stream);
                } else {
                  var $25 = $23.color = {};
                  $25.red = readUi8($bytes, $stream);
                  $25.green = readUi8($bytes, $stream);
                  $25.blue = readUi8($bytes, $stream);
                  $25.alpha = 255;
                }
                if (isMorph) {
                  var $26 = $23.colorMorph = {};
                  $26.red = readUi8($bytes, $stream);
                  $26.green = readUi8($bytes, $stream);
                  $26.blue = readUi8($bytes, $stream);
                  $26.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $27 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.a = readFb($bytes, $stream, bits);
                  $27.d = readFb($bytes, $stream, bits);
                } else {
                  $27.a = 1;
                  $27.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.b = readFb($bytes, $stream, bits);
                  $27.c = readFb($bytes, $stream, bits);
                } else {
                  $27.b = 0;
                  $27.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $27.tx = e / 20;
                $27.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $28 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.a = readFb($bytes, $stream, bits);
                    $28.d = readFb($bytes, $stream, bits);
                  } else {
                    $28.a = 1;
                    $28.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.b = readFb($bytes, $stream, bits);
                    $28.c = readFb($bytes, $stream, bits);
                  } else {
                    $28.b = 0;
                    $28.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $28.tx = e / 20;
                  $28.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $23.spreadMode = readUb($bytes, $stream, 2);
                  $23.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $23.count = readUb($bytes, $stream, 4);
                var $29 = $23.records = [];
                var $30 = count;
                while ($30--) {
                  var $31 = {};
                  $31.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $32 = $31.color = {};
                    $32.red = readUi8($bytes, $stream);
                    $32.green = readUi8($bytes, $stream);
                    $32.blue = readUi8($bytes, $stream);
                    $32.alpha = readUi8($bytes, $stream);
                  } else {
                    var $33 = $31.color = {};
                    $33.red = readUi8($bytes, $stream);
                    $33.green = readUi8($bytes, $stream);
                    $33.blue = readUi8($bytes, $stream);
                    $33.alpha = 255;
                  }
                  if (isMorph) {
                    $31.ratioMorph = readUi8($bytes, $stream);
                    var $34 = $31.colorMorph = {};
                    $34.red = readUi8($bytes, $stream);
                    $34.green = readUi8($bytes, $stream);
                    $34.blue = readUi8($bytes, $stream);
                    $34.alpha = readUi8($bytes, $stream);
                  }
                  $29.push($31);
                }
                if (type === 19) {
                  $23.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $23.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $23.bitmapId = readUi16($bytes, $stream);
                var $35 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.a = readFb($bytes, $stream, bits);
                  $35.d = readFb($bytes, $stream, bits);
                } else {
                  $35.a = 1;
                  $35.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.b = readFb($bytes, $stream, bits);
                  $35.c = readFb($bytes, $stream, bits);
                } else {
                  $35.b = 0;
                  $35.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $35.tx = e / 20;
                $35.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $36 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.a = readFb($bytes, $stream, bits);
                    $36.d = readFb($bytes, $stream, bits);
                  } else {
                    $36.a = 1;
                    $36.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.b = readFb($bytes, $stream, bits);
                    $36.c = readFb($bytes, $stream, bits);
                  } else {
                    $36.b = 0;
                    $36.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $36.tx = e / 20;
                  $36.ty = f / 20;
                  align($bytes, $stream);
                }
                $23.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $37 = $22.color = {};
              $37.red = readUi8($bytes, $stream);
              $37.green = readUi8($bytes, $stream);
              $37.blue = readUi8($bytes, $stream);
              $37.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $38 = $22.colorMorph = {};
                $38.red = readUi8($bytes, $stream);
                $38.green = readUi8($bytes, $stream);
                $38.blue = readUi8($bytes, $stream);
                $38.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $39 = $22.color = {};
              $39.red = readUi8($bytes, $stream);
              $39.green = readUi8($bytes, $stream);
              $39.blue = readUi8($bytes, $stream);
              $39.alpha = readUi8($bytes, $stream);
            } else {
              var $40 = $22.color = {};
              $40.red = readUi8($bytes, $stream);
              $40.green = readUi8($bytes, $stream);
              $40.blue = readUi8($bytes, $stream);
              $40.alpha = 255;
            }
            if (isMorph) {
              var $41 = $22.colorMorph = {};
              $41.red = readUi8($bytes, $stream);
              $41.green = readUi8($bytes, $stream);
              $41.blue = readUi8($bytes, $stream);
              $41.alpha = readUi8($bytes, $stream);
            }
          }
          $20.push($22);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $42 = $.records = [];
        do {
          var $43 = {};
          var type = $43.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $43.eos = !(type || flags);
          if (type) {
            var isStraight = $43.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $43.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $43.deltaX = readSb($bytes, $stream, bits);
                $43.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $43.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $43.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $43.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $43.controlDeltaX = readSb($bytes, $stream, bits);
              $43.controlDeltaY = readSb($bytes, $stream, bits);
              $43.anchorDeltaX = readSb($bytes, $stream, bits);
              $43.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $43.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $43.hasNewStyles = 0;
            }
            var hasLineStyle = $43.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $43.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $43.hasFillStyle0 = flags >> 1 & 1;
            var move = $43.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $43.moveX = readSb($bytes, $stream, bits);
              $43.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $43.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $43.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $43.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $44 = $43.fillStyles = [];
              var $45 = count;
              while ($45--) {
                var $46 = {};
                var type = $46.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $47 = $46.color = {};
                    $47.red = readUi8($bytes, $stream);
                    $47.green = readUi8($bytes, $stream);
                    $47.blue = readUi8($bytes, $stream);
                    $47.alpha = readUi8($bytes, $stream);
                  } else {
                    var $48 = $46.color = {};
                    $48.red = readUi8($bytes, $stream);
                    $48.green = readUi8($bytes, $stream);
                    $48.blue = readUi8($bytes, $stream);
                    $48.alpha = 255;
                  }
                  if (isMorph) {
                    var $49 = $46.colorMorph = {};
                    $49.red = readUi8($bytes, $stream);
                    $49.green = readUi8($bytes, $stream);
                    $49.blue = readUi8($bytes, $stream);
                    $49.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $50 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.a = readFb($bytes, $stream, bits);
                    $50.d = readFb($bytes, $stream, bits);
                  } else {
                    $50.a = 1;
                    $50.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.b = readFb($bytes, $stream, bits);
                    $50.c = readFb($bytes, $stream, bits);
                  } else {
                    $50.b = 0;
                    $50.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $50.tx = e / 20;
                  $50.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $51 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.a = readFb($bytes, $stream, bits);
                      $51.d = readFb($bytes, $stream, bits);
                    } else {
                      $51.a = 1;
                      $51.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.b = readFb($bytes, $stream, bits);
                      $51.c = readFb($bytes, $stream, bits);
                    } else {
                      $51.b = 0;
                      $51.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $51.tx = e / 20;
                    $51.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $46.spreadMode = readUb($bytes, $stream, 2);
                    $46.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $46.count = readUb($bytes, $stream, 4);
                  var $52 = $46.records = [];
                  var $53 = count;
                  while ($53--) {
                    var $54 = {};
                    $54.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $55 = $54.color = {};
                      $55.red = readUi8($bytes, $stream);
                      $55.green = readUi8($bytes, $stream);
                      $55.blue = readUi8($bytes, $stream);
                      $55.alpha = readUi8($bytes, $stream);
                    } else {
                      var $56 = $54.color = {};
                      $56.red = readUi8($bytes, $stream);
                      $56.green = readUi8($bytes, $stream);
                      $56.blue = readUi8($bytes, $stream);
                      $56.alpha = 255;
                    }
                    if (isMorph) {
                      $54.ratioMorph = readUi8($bytes, $stream);
                      var $57 = $54.colorMorph = {};
                      $57.red = readUi8($bytes, $stream);
                      $57.green = readUi8($bytes, $stream);
                      $57.blue = readUi8($bytes, $stream);
                      $57.alpha = readUi8($bytes, $stream);
                    }
                    $52.push($54);
                  }
                  if (type === 19) {
                    $46.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $46.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $46.bitmapId = readUi16($bytes, $stream);
                  var $58 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.a = readFb($bytes, $stream, bits);
                    $58.d = readFb($bytes, $stream, bits);
                  } else {
                    $58.a = 1;
                    $58.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.b = readFb($bytes, $stream, bits);
                    $58.c = readFb($bytes, $stream, bits);
                  } else {
                    $58.b = 0;
                    $58.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $58.tx = e / 20;
                  $58.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $59 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.a = readFb($bytes, $stream, bits);
                      $59.d = readFb($bytes, $stream, bits);
                    } else {
                      $59.a = 1;
                      $59.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.b = readFb($bytes, $stream, bits);
                      $59.c = readFb($bytes, $stream, bits);
                    } else {
                      $59.b = 0;
                      $59.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $59.tx = e / 20;
                    $59.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $46.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $44.push($46);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $60 = $43.lineStyles = [];
              var $61 = count;
              while ($61--) {
                var $62 = {};
                $62.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $62.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $62.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $62.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $62.hasFill = readUb($bytes, $stream, 1);
                  $62.noHscale = readUb($bytes, $stream, 1);
                  $62.noVscale = readUb($bytes, $stream, 1);
                  $62.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $62.noClose = readUb($bytes, $stream, 1);
                  $62.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $62.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $63 = $62.fillStyle = {};
                    var type = $63.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $64 = $63.color = {};
                        $64.red = readUi8($bytes, $stream);
                        $64.green = readUi8($bytes, $stream);
                        $64.blue = readUi8($bytes, $stream);
                        $64.alpha = readUi8($bytes, $stream);
                      } else {
                        var $65 = $63.color = {};
                        $65.red = readUi8($bytes, $stream);
                        $65.green = readUi8($bytes, $stream);
                        $65.blue = readUi8($bytes, $stream);
                        $65.alpha = 255;
                      }
                      if (isMorph) {
                        var $66 = $63.colorMorph = {};
                        $66.red = readUi8($bytes, $stream);
                        $66.green = readUi8($bytes, $stream);
                        $66.blue = readUi8($bytes, $stream);
                        $66.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $67 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.a = readFb($bytes, $stream, bits);
                        $67.d = readFb($bytes, $stream, bits);
                      } else {
                        $67.a = 1;
                        $67.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.b = readFb($bytes, $stream, bits);
                        $67.c = readFb($bytes, $stream, bits);
                      } else {
                        $67.b = 0;
                        $67.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $67.tx = e / 20;
                      $67.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $68 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.a = readFb($bytes, $stream, bits);
                          $68.d = readFb($bytes, $stream, bits);
                        } else {
                          $68.a = 1;
                          $68.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.b = readFb($bytes, $stream, bits);
                          $68.c = readFb($bytes, $stream, bits);
                        } else {
                          $68.b = 0;
                          $68.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $68.tx = e / 20;
                        $68.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $63.spreadMode = readUb($bytes, $stream, 2);
                        $63.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $63.count = readUb($bytes, $stream, 4);
                      var $69 = $63.records = [];
                      var $70 = count;
                      while ($70--) {
                        var $71 = {};
                        $71.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $72 = $71.color = {};
                          $72.red = readUi8($bytes, $stream);
                          $72.green = readUi8($bytes, $stream);
                          $72.blue = readUi8($bytes, $stream);
                          $72.alpha = readUi8($bytes, $stream);
                        } else {
                          var $73 = $71.color = {};
                          $73.red = readUi8($bytes, $stream);
                          $73.green = readUi8($bytes, $stream);
                          $73.blue = readUi8($bytes, $stream);
                          $73.alpha = 255;
                        }
                        if (isMorph) {
                          $71.ratioMorph = readUi8($bytes, $stream);
                          var $74 = $71.colorMorph = {};
                          $74.red = readUi8($bytes, $stream);
                          $74.green = readUi8($bytes, $stream);
                          $74.blue = readUi8($bytes, $stream);
                          $74.alpha = readUi8($bytes, $stream);
                        }
                        $69.push($71);
                      }
                      if (type === 19) {
                        $63.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $63.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $63.bitmapId = readUi16($bytes, $stream);
                      var $75 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.a = readFb($bytes, $stream, bits);
                        $75.d = readFb($bytes, $stream, bits);
                      } else {
                        $75.a = 1;
                        $75.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.b = readFb($bytes, $stream, bits);
                        $75.c = readFb($bytes, $stream, bits);
                      } else {
                        $75.b = 0;
                        $75.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $75.tx = e / 20;
                      $75.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $76 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.a = readFb($bytes, $stream, bits);
                          $76.d = readFb($bytes, $stream, bits);
                        } else {
                          $76.a = 1;
                          $76.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.b = readFb($bytes, $stream, bits);
                          $76.c = readFb($bytes, $stream, bits);
                        } else {
                          $76.b = 0;
                          $76.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $76.tx = e / 20;
                        $76.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $63.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $77 = $62.color = {};
                    $77.red = readUi8($bytes, $stream);
                    $77.green = readUi8($bytes, $stream);
                    $77.blue = readUi8($bytes, $stream);
                    $77.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $78 = $62.colorMorph = {};
                      $78.red = readUi8($bytes, $stream);
                      $78.green = readUi8($bytes, $stream);
                      $78.blue = readUi8($bytes, $stream);
                      $78.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $79 = $62.color = {};
                    $79.red = readUi8($bytes, $stream);
                    $79.green = readUi8($bytes, $stream);
                    $79.blue = readUi8($bytes, $stream);
                    $79.alpha = readUi8($bytes, $stream);
                  } else {
                    var $80 = $62.color = {};
                    $80.red = readUi8($bytes, $stream);
                    $80.green = readUi8($bytes, $stream);
                    $80.blue = readUi8($bytes, $stream);
                    $80.alpha = 255;
                  }
                  if (isMorph) {
                    var $81 = $62.colorMorph = {};
                    $81.red = readUi8($bytes, $stream);
                    $81.green = readUi8($bytes, $stream);
                    $81.blue = readUi8($bytes, $stream);
                    $81.alpha = readUi8($bytes, $stream);
                  }
                }
                $60.push($62);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $42.push($43);
        } while (!eos);
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $82 = $.recordsMorph = [];
        do {
          var $83 = {};
          var type = $83.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $83.eos = !(type || flags);
          if (type) {
            var isStraight = $83.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $83.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $83.deltaX = readSb($bytes, $stream, bits);
                $83.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $83.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $83.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $83.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $83.controlDeltaX = readSb($bytes, $stream, bits);
              $83.controlDeltaY = readSb($bytes, $stream, bits);
              $83.anchorDeltaX = readSb($bytes, $stream, bits);
              $83.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $83.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $83.hasNewStyles = 0;
            }
            var hasLineStyle = $83.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $83.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $83.hasFillStyle0 = flags >> 1 & 1;
            var move = $83.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $83.moveX = readSb($bytes, $stream, bits);
              $83.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $83.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $83.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $83.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $84 = $83.fillStyles = [];
              var $85 = count;
              while ($85--) {
                var $86 = {};
                var type = $86.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $87 = $86.color = {};
                    $87.red = readUi8($bytes, $stream);
                    $87.green = readUi8($bytes, $stream);
                    $87.blue = readUi8($bytes, $stream);
                    $87.alpha = readUi8($bytes, $stream);
                  } else {
                    var $88 = $86.color = {};
                    $88.red = readUi8($bytes, $stream);
                    $88.green = readUi8($bytes, $stream);
                    $88.blue = readUi8($bytes, $stream);
                    $88.alpha = 255;
                  }
                  if (isMorph) {
                    var $89 = $86.colorMorph = {};
                    $89.red = readUi8($bytes, $stream);
                    $89.green = readUi8($bytes, $stream);
                    $89.blue = readUi8($bytes, $stream);
                    $89.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $90 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.a = readFb($bytes, $stream, bits);
                    $90.d = readFb($bytes, $stream, bits);
                  } else {
                    $90.a = 1;
                    $90.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.b = readFb($bytes, $stream, bits);
                    $90.c = readFb($bytes, $stream, bits);
                  } else {
                    $90.b = 0;
                    $90.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $90.tx = e / 20;
                  $90.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $91 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.a = readFb($bytes, $stream, bits);
                      $91.d = readFb($bytes, $stream, bits);
                    } else {
                      $91.a = 1;
                      $91.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.b = readFb($bytes, $stream, bits);
                      $91.c = readFb($bytes, $stream, bits);
                    } else {
                      $91.b = 0;
                      $91.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $91.tx = e / 20;
                    $91.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $86.spreadMode = readUb($bytes, $stream, 2);
                    $86.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $86.count = readUb($bytes, $stream, 4);
                  var $92 = $86.records = [];
                  var $93 = count;
                  while ($93--) {
                    var $94 = {};
                    $94.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $95 = $94.color = {};
                      $95.red = readUi8($bytes, $stream);
                      $95.green = readUi8($bytes, $stream);
                      $95.blue = readUi8($bytes, $stream);
                      $95.alpha = readUi8($bytes, $stream);
                    } else {
                      var $96 = $94.color = {};
                      $96.red = readUi8($bytes, $stream);
                      $96.green = readUi8($bytes, $stream);
                      $96.blue = readUi8($bytes, $stream);
                      $96.alpha = 255;
                    }
                    if (isMorph) {
                      $94.ratioMorph = readUi8($bytes, $stream);
                      var $97 = $94.colorMorph = {};
                      $97.red = readUi8($bytes, $stream);
                      $97.green = readUi8($bytes, $stream);
                      $97.blue = readUi8($bytes, $stream);
                      $97.alpha = readUi8($bytes, $stream);
                    }
                    $92.push($94);
                  }
                  if (type === 19) {
                    $86.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $86.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $86.bitmapId = readUi16($bytes, $stream);
                  var $98 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.a = readFb($bytes, $stream, bits);
                    $98.d = readFb($bytes, $stream, bits);
                  } else {
                    $98.a = 1;
                    $98.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.b = readFb($bytes, $stream, bits);
                    $98.c = readFb($bytes, $stream, bits);
                  } else {
                    $98.b = 0;
                    $98.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $98.tx = e / 20;
                  $98.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $99 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.a = readFb($bytes, $stream, bits);
                      $99.d = readFb($bytes, $stream, bits);
                    } else {
                      $99.a = 1;
                      $99.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.b = readFb($bytes, $stream, bits);
                      $99.c = readFb($bytes, $stream, bits);
                    } else {
                      $99.b = 0;
                      $99.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $99.tx = e / 20;
                    $99.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $86.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $84.push($86);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $100 = $83.lineStyles = [];
              var $101 = count;
              while ($101--) {
                var $102 = {};
                $102.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $102.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $102.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $102.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $102.hasFill = readUb($bytes, $stream, 1);
                  $102.noHscale = readUb($bytes, $stream, 1);
                  $102.noVscale = readUb($bytes, $stream, 1);
                  $102.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $102.noClose = readUb($bytes, $stream, 1);
                  $102.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $102.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $103 = $102.fillStyle = {};
                    var type = $103.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $104 = $103.color = {};
                        $104.red = readUi8($bytes, $stream);
                        $104.green = readUi8($bytes, $stream);
                        $104.blue = readUi8($bytes, $stream);
                        $104.alpha = readUi8($bytes, $stream);
                      } else {
                        var $105 = $103.color = {};
                        $105.red = readUi8($bytes, $stream);
                        $105.green = readUi8($bytes, $stream);
                        $105.blue = readUi8($bytes, $stream);
                        $105.alpha = 255;
                      }
                      if (isMorph) {
                        var $106 = $103.colorMorph = {};
                        $106.red = readUi8($bytes, $stream);
                        $106.green = readUi8($bytes, $stream);
                        $106.blue = readUi8($bytes, $stream);
                        $106.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $107 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.a = readFb($bytes, $stream, bits);
                        $107.d = readFb($bytes, $stream, bits);
                      } else {
                        $107.a = 1;
                        $107.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.b = readFb($bytes, $stream, bits);
                        $107.c = readFb($bytes, $stream, bits);
                      } else {
                        $107.b = 0;
                        $107.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $107.tx = e / 20;
                      $107.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $108 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.a = readFb($bytes, $stream, bits);
                          $108.d = readFb($bytes, $stream, bits);
                        } else {
                          $108.a = 1;
                          $108.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.b = readFb($bytes, $stream, bits);
                          $108.c = readFb($bytes, $stream, bits);
                        } else {
                          $108.b = 0;
                          $108.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $108.tx = e / 20;
                        $108.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $103.spreadMode = readUb($bytes, $stream, 2);
                        $103.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $103.count = readUb($bytes, $stream, 4);
                      var $109 = $103.records = [];
                      var $110 = count;
                      while ($110--) {
                        var $111 = {};
                        $111.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $112 = $111.color = {};
                          $112.red = readUi8($bytes, $stream);
                          $112.green = readUi8($bytes, $stream);
                          $112.blue = readUi8($bytes, $stream);
                          $112.alpha = readUi8($bytes, $stream);
                        } else {
                          var $113 = $111.color = {};
                          $113.red = readUi8($bytes, $stream);
                          $113.green = readUi8($bytes, $stream);
                          $113.blue = readUi8($bytes, $stream);
                          $113.alpha = 255;
                        }
                        if (isMorph) {
                          $111.ratioMorph = readUi8($bytes, $stream);
                          var $114 = $111.colorMorph = {};
                          $114.red = readUi8($bytes, $stream);
                          $114.green = readUi8($bytes, $stream);
                          $114.blue = readUi8($bytes, $stream);
                          $114.alpha = readUi8($bytes, $stream);
                        }
                        $109.push($111);
                      }
                      if (type === 19) {
                        $103.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $103.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $103.bitmapId = readUi16($bytes, $stream);
                      var $115 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.a = readFb($bytes, $stream, bits);
                        $115.d = readFb($bytes, $stream, bits);
                      } else {
                        $115.a = 1;
                        $115.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.b = readFb($bytes, $stream, bits);
                        $115.c = readFb($bytes, $stream, bits);
                      } else {
                        $115.b = 0;
                        $115.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $115.tx = e / 20;
                      $115.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $116 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.a = readFb($bytes, $stream, bits);
                          $116.d = readFb($bytes, $stream, bits);
                        } else {
                          $116.a = 1;
                          $116.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.b = readFb($bytes, $stream, bits);
                          $116.c = readFb($bytes, $stream, bits);
                        } else {
                          $116.b = 0;
                          $116.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $116.tx = e / 20;
                        $116.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $103.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $117 = $102.color = {};
                    $117.red = readUi8($bytes, $stream);
                    $117.green = readUi8($bytes, $stream);
                    $117.blue = readUi8($bytes, $stream);
                    $117.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $118 = $102.colorMorph = {};
                      $118.red = readUi8($bytes, $stream);
                      $118.green = readUi8($bytes, $stream);
                      $118.blue = readUi8($bytes, $stream);
                      $118.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $119 = $102.color = {};
                    $119.red = readUi8($bytes, $stream);
                    $119.green = readUi8($bytes, $stream);
                    $119.blue = readUi8($bytes, $stream);
                    $119.alpha = readUi8($bytes, $stream);
                  } else {
                    var $120 = $102.color = {};
                    $120.red = readUi8($bytes, $stream);
                    $120.green = readUi8($bytes, $stream);
                    $120.blue = readUi8($bytes, $stream);
                    $120.alpha = 255;
                  }
                  if (isMorph) {
                    var $121 = $102.colorMorph = {};
                    $121.red = readUi8($bytes, $stream);
                    $121.green = readUi8($bytes, $stream);
                    $121.blue = readUi8($bytes, $stream);
                    $121.alpha = readUi8($bytes, $stream);
                  }
                }
                $100.push($102);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $82.push($83);
        } while (!eos);
      } else {
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $122 = $.fillStyles = [];
        var $123 = count;
        while ($123--) {
          var $124 = {};
          var type = $124.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $125 = $124.color = {};
              $125.red = readUi8($bytes, $stream);
              $125.green = readUi8($bytes, $stream);
              $125.blue = readUi8($bytes, $stream);
              $125.alpha = readUi8($bytes, $stream);
            } else {
              var $126 = $124.color = {};
              $126.red = readUi8($bytes, $stream);
              $126.green = readUi8($bytes, $stream);
              $126.blue = readUi8($bytes, $stream);
              $126.alpha = 255;
            }
            if (isMorph) {
              var $127 = $124.colorMorph = {};
              $127.red = readUi8($bytes, $stream);
              $127.green = readUi8($bytes, $stream);
              $127.blue = readUi8($bytes, $stream);
              $127.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $128 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $128.a = readFb($bytes, $stream, bits);
              $128.d = readFb($bytes, $stream, bits);
            } else {
              $128.a = 1;
              $128.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $128.b = readFb($bytes, $stream, bits);
              $128.c = readFb($bytes, $stream, bits);
            } else {
              $128.b = 0;
              $128.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $128.tx = e / 20;
            $128.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $129 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $129.a = readFb($bytes, $stream, bits);
                $129.d = readFb($bytes, $stream, bits);
              } else {
                $129.a = 1;
                $129.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $129.b = readFb($bytes, $stream, bits);
                $129.c = readFb($bytes, $stream, bits);
              } else {
                $129.b = 0;
                $129.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $129.tx = e / 20;
              $129.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $124.spreadMode = readUb($bytes, $stream, 2);
              $124.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $124.count = readUb($bytes, $stream, 4);
            var $130 = $124.records = [];
            var $131 = count;
            while ($131--) {
              var $132 = {};
              $132.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $133 = $132.color = {};
                $133.red = readUi8($bytes, $stream);
                $133.green = readUi8($bytes, $stream);
                $133.blue = readUi8($bytes, $stream);
                $133.alpha = readUi8($bytes, $stream);
              } else {
                var $134 = $132.color = {};
                $134.red = readUi8($bytes, $stream);
                $134.green = readUi8($bytes, $stream);
                $134.blue = readUi8($bytes, $stream);
                $134.alpha = 255;
              }
              if (isMorph) {
                $132.ratioMorph = readUi8($bytes, $stream);
                var $135 = $132.colorMorph = {};
                $135.red = readUi8($bytes, $stream);
                $135.green = readUi8($bytes, $stream);
                $135.blue = readUi8($bytes, $stream);
                $135.alpha = readUi8($bytes, $stream);
              }
              $130.push($132);
            }
            if (type === 19) {
              $124.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $124.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $124.bitmapId = readUi16($bytes, $stream);
            var $136 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $136.a = readFb($bytes, $stream, bits);
              $136.d = readFb($bytes, $stream, bits);
            } else {
              $136.a = 1;
              $136.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $136.b = readFb($bytes, $stream, bits);
              $136.c = readFb($bytes, $stream, bits);
            } else {
              $136.b = 0;
              $136.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $136.tx = e / 20;
            $136.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $137 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $137.a = readFb($bytes, $stream, bits);
                $137.d = readFb($bytes, $stream, bits);
              } else {
                $137.a = 1;
                $137.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $137.b = readFb($bytes, $stream, bits);
                $137.c = readFb($bytes, $stream, bits);
              } else {
                $137.b = 0;
                $137.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $137.tx = e / 20;
              $137.ty = f / 20;
              align($bytes, $stream);
            }
            $124.condition = type === 64 || type === 67;
            break;
          default:
          }
          $122.push($124);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $138 = $.lineStyles = [];
        var $139 = count;
        while ($139--) {
          var $140 = {};
          $140.width = readUi16($bytes, $stream);
          if (isMorph) {
            $140.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $140.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $140.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $140.hasFill = readUb($bytes, $stream, 1);
            $140.noHscale = readUb($bytes, $stream, 1);
            $140.noVscale = readUb($bytes, $stream, 1);
            $140.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $140.noClose = readUb($bytes, $stream, 1);
            $140.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $140.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $141 = $140.fillStyle = {};
              var type = $141.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $142 = $141.color = {};
                  $142.red = readUi8($bytes, $stream);
                  $142.green = readUi8($bytes, $stream);
                  $142.blue = readUi8($bytes, $stream);
                  $142.alpha = readUi8($bytes, $stream);
                } else {
                  var $143 = $141.color = {};
                  $143.red = readUi8($bytes, $stream);
                  $143.green = readUi8($bytes, $stream);
                  $143.blue = readUi8($bytes, $stream);
                  $143.alpha = 255;
                }
                if (isMorph) {
                  var $144 = $141.colorMorph = {};
                  $144.red = readUi8($bytes, $stream);
                  $144.green = readUi8($bytes, $stream);
                  $144.blue = readUi8($bytes, $stream);
                  $144.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $145 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.a = readFb($bytes, $stream, bits);
                  $145.d = readFb($bytes, $stream, bits);
                } else {
                  $145.a = 1;
                  $145.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.b = readFb($bytes, $stream, bits);
                  $145.c = readFb($bytes, $stream, bits);
                } else {
                  $145.b = 0;
                  $145.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $145.tx = e / 20;
                $145.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $146 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.a = readFb($bytes, $stream, bits);
                    $146.d = readFb($bytes, $stream, bits);
                  } else {
                    $146.a = 1;
                    $146.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.b = readFb($bytes, $stream, bits);
                    $146.c = readFb($bytes, $stream, bits);
                  } else {
                    $146.b = 0;
                    $146.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $146.tx = e / 20;
                  $146.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $141.spreadMode = readUb($bytes, $stream, 2);
                  $141.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $141.count = readUb($bytes, $stream, 4);
                var $147 = $141.records = [];
                var $148 = count;
                while ($148--) {
                  var $149 = {};
                  $149.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $150 = $149.color = {};
                    $150.red = readUi8($bytes, $stream);
                    $150.green = readUi8($bytes, $stream);
                    $150.blue = readUi8($bytes, $stream);
                    $150.alpha = readUi8($bytes, $stream);
                  } else {
                    var $151 = $149.color = {};
                    $151.red = readUi8($bytes, $stream);
                    $151.green = readUi8($bytes, $stream);
                    $151.blue = readUi8($bytes, $stream);
                    $151.alpha = 255;
                  }
                  if (isMorph) {
                    $149.ratioMorph = readUi8($bytes, $stream);
                    var $152 = $149.colorMorph = {};
                    $152.red = readUi8($bytes, $stream);
                    $152.green = readUi8($bytes, $stream);
                    $152.blue = readUi8($bytes, $stream);
                    $152.alpha = readUi8($bytes, $stream);
                  }
                  $147.push($149);
                }
                if (type === 19) {
                  $141.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $141.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $141.bitmapId = readUi16($bytes, $stream);
                var $153 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.a = readFb($bytes, $stream, bits);
                  $153.d = readFb($bytes, $stream, bits);
                } else {
                  $153.a = 1;
                  $153.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.b = readFb($bytes, $stream, bits);
                  $153.c = readFb($bytes, $stream, bits);
                } else {
                  $153.b = 0;
                  $153.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $153.tx = e / 20;
                $153.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $154 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.a = readFb($bytes, $stream, bits);
                    $154.d = readFb($bytes, $stream, bits);
                  } else {
                    $154.a = 1;
                    $154.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.b = readFb($bytes, $stream, bits);
                    $154.c = readFb($bytes, $stream, bits);
                  } else {
                    $154.b = 0;
                    $154.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $154.tx = e / 20;
                  $154.ty = f / 20;
                  align($bytes, $stream);
                }
                $141.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $155 = $140.color = {};
              $155.red = readUi8($bytes, $stream);
              $155.green = readUi8($bytes, $stream);
              $155.blue = readUi8($bytes, $stream);
              $155.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $156 = $140.colorMorph = {};
                $156.red = readUi8($bytes, $stream);
                $156.green = readUi8($bytes, $stream);
                $156.blue = readUi8($bytes, $stream);
                $156.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $157 = $140.color = {};
              $157.red = readUi8($bytes, $stream);
              $157.green = readUi8($bytes, $stream);
              $157.blue = readUi8($bytes, $stream);
              $157.alpha = readUi8($bytes, $stream);
            } else {
              var $158 = $140.color = {};
              $158.red = readUi8($bytes, $stream);
              $158.green = readUi8($bytes, $stream);
              $158.blue = readUi8($bytes, $stream);
              $158.alpha = 255;
            }
            if (isMorph) {
              var $159 = $140.colorMorph = {};
              $159.red = readUi8($bytes, $stream);
              $159.green = readUi8($bytes, $stream);
              $159.blue = readUi8($bytes, $stream);
              $159.alpha = readUi8($bytes, $stream);
            }
          }
          $138.push($140);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $160 = $.records = [];
        do {
          var $161 = {};
          var type = $161.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $161.eos = !(type || flags);
          if (type) {
            var isStraight = $161.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $161.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $161.deltaX = readSb($bytes, $stream, bits);
                $161.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $161.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $161.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $161.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $161.controlDeltaX = readSb($bytes, $stream, bits);
              $161.controlDeltaY = readSb($bytes, $stream, bits);
              $161.anchorDeltaX = readSb($bytes, $stream, bits);
              $161.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $161.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $161.hasNewStyles = 0;
            }
            var hasLineStyle = $161.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $161.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $161.hasFillStyle0 = flags >> 1 & 1;
            var move = $161.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $161.moveX = readSb($bytes, $stream, bits);
              $161.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $161.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $161.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $161.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $162 = $161.fillStyles = [];
              var $163 = count;
              while ($163--) {
                var $164 = {};
                var type = $164.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $165 = $164.color = {};
                    $165.red = readUi8($bytes, $stream);
                    $165.green = readUi8($bytes, $stream);
                    $165.blue = readUi8($bytes, $stream);
                    $165.alpha = readUi8($bytes, $stream);
                  } else {
                    var $166 = $164.color = {};
                    $166.red = readUi8($bytes, $stream);
                    $166.green = readUi8($bytes, $stream);
                    $166.blue = readUi8($bytes, $stream);
                    $166.alpha = 255;
                  }
                  if (isMorph) {
                    var $167 = $164.colorMorph = {};
                    $167.red = readUi8($bytes, $stream);
                    $167.green = readUi8($bytes, $stream);
                    $167.blue = readUi8($bytes, $stream);
                    $167.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $168 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.a = readFb($bytes, $stream, bits);
                    $168.d = readFb($bytes, $stream, bits);
                  } else {
                    $168.a = 1;
                    $168.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.b = readFb($bytes, $stream, bits);
                    $168.c = readFb($bytes, $stream, bits);
                  } else {
                    $168.b = 0;
                    $168.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $168.tx = e / 20;
                  $168.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $169 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.a = readFb($bytes, $stream, bits);
                      $169.d = readFb($bytes, $stream, bits);
                    } else {
                      $169.a = 1;
                      $169.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.b = readFb($bytes, $stream, bits);
                      $169.c = readFb($bytes, $stream, bits);
                    } else {
                      $169.b = 0;
                      $169.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $169.tx = e / 20;
                    $169.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $164.spreadMode = readUb($bytes, $stream, 2);
                    $164.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $164.count = readUb($bytes, $stream, 4);
                  var $170 = $164.records = [];
                  var $171 = count;
                  while ($171--) {
                    var $172 = {};
                    $172.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $173 = $172.color = {};
                      $173.red = readUi8($bytes, $stream);
                      $173.green = readUi8($bytes, $stream);
                      $173.blue = readUi8($bytes, $stream);
                      $173.alpha = readUi8($bytes, $stream);
                    } else {
                      var $174 = $172.color = {};
                      $174.red = readUi8($bytes, $stream);
                      $174.green = readUi8($bytes, $stream);
                      $174.blue = readUi8($bytes, $stream);
                      $174.alpha = 255;
                    }
                    if (isMorph) {
                      $172.ratioMorph = readUi8($bytes, $stream);
                      var $175 = $172.colorMorph = {};
                      $175.red = readUi8($bytes, $stream);
                      $175.green = readUi8($bytes, $stream);
                      $175.blue = readUi8($bytes, $stream);
                      $175.alpha = readUi8($bytes, $stream);
                    }
                    $170.push($172);
                  }
                  if (type === 19) {
                    $164.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $164.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $164.bitmapId = readUi16($bytes, $stream);
                  var $176 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.a = readFb($bytes, $stream, bits);
                    $176.d = readFb($bytes, $stream, bits);
                  } else {
                    $176.a = 1;
                    $176.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.b = readFb($bytes, $stream, bits);
                    $176.c = readFb($bytes, $stream, bits);
                  } else {
                    $176.b = 0;
                    $176.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $176.tx = e / 20;
                  $176.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $177 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.a = readFb($bytes, $stream, bits);
                      $177.d = readFb($bytes, $stream, bits);
                    } else {
                      $177.a = 1;
                      $177.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.b = readFb($bytes, $stream, bits);
                      $177.c = readFb($bytes, $stream, bits);
                    } else {
                      $177.b = 0;
                      $177.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $177.tx = e / 20;
                    $177.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $164.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $162.push($164);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $178 = $161.lineStyles = [];
              var $179 = count;
              while ($179--) {
                var $180 = {};
                $180.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $180.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $180.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $180.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $180.hasFill = readUb($bytes, $stream, 1);
                  $180.noHscale = readUb($bytes, $stream, 1);
                  $180.noVscale = readUb($bytes, $stream, 1);
                  $180.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $180.noClose = readUb($bytes, $stream, 1);
                  $180.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $180.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $181 = $180.fillStyle = {};
                    var type = $181.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $182 = $181.color = {};
                        $182.red = readUi8($bytes, $stream);
                        $182.green = readUi8($bytes, $stream);
                        $182.blue = readUi8($bytes, $stream);
                        $182.alpha = readUi8($bytes, $stream);
                      } else {
                        var $183 = $181.color = {};
                        $183.red = readUi8($bytes, $stream);
                        $183.green = readUi8($bytes, $stream);
                        $183.blue = readUi8($bytes, $stream);
                        $183.alpha = 255;
                      }
                      if (isMorph) {
                        var $184 = $181.colorMorph = {};
                        $184.red = readUi8($bytes, $stream);
                        $184.green = readUi8($bytes, $stream);
                        $184.blue = readUi8($bytes, $stream);
                        $184.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $185 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.a = readFb($bytes, $stream, bits);
                        $185.d = readFb($bytes, $stream, bits);
                      } else {
                        $185.a = 1;
                        $185.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.b = readFb($bytes, $stream, bits);
                        $185.c = readFb($bytes, $stream, bits);
                      } else {
                        $185.b = 0;
                        $185.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $185.tx = e / 20;
                      $185.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $186 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.a = readFb($bytes, $stream, bits);
                          $186.d = readFb($bytes, $stream, bits);
                        } else {
                          $186.a = 1;
                          $186.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.b = readFb($bytes, $stream, bits);
                          $186.c = readFb($bytes, $stream, bits);
                        } else {
                          $186.b = 0;
                          $186.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $186.tx = e / 20;
                        $186.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $181.spreadMode = readUb($bytes, $stream, 2);
                        $181.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $181.count = readUb($bytes, $stream, 4);
                      var $187 = $181.records = [];
                      var $188 = count;
                      while ($188--) {
                        var $189 = {};
                        $189.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $190 = $189.color = {};
                          $190.red = readUi8($bytes, $stream);
                          $190.green = readUi8($bytes, $stream);
                          $190.blue = readUi8($bytes, $stream);
                          $190.alpha = readUi8($bytes, $stream);
                        } else {
                          var $191 = $189.color = {};
                          $191.red = readUi8($bytes, $stream);
                          $191.green = readUi8($bytes, $stream);
                          $191.blue = readUi8($bytes, $stream);
                          $191.alpha = 255;
                        }
                        if (isMorph) {
                          $189.ratioMorph = readUi8($bytes, $stream);
                          var $192 = $189.colorMorph = {};
                          $192.red = readUi8($bytes, $stream);
                          $192.green = readUi8($bytes, $stream);
                          $192.blue = readUi8($bytes, $stream);
                          $192.alpha = readUi8($bytes, $stream);
                        }
                        $187.push($189);
                      }
                      if (type === 19) {
                        $181.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $181.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $181.bitmapId = readUi16($bytes, $stream);
                      var $193 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.a = readFb($bytes, $stream, bits);
                        $193.d = readFb($bytes, $stream, bits);
                      } else {
                        $193.a = 1;
                        $193.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.b = readFb($bytes, $stream, bits);
                        $193.c = readFb($bytes, $stream, bits);
                      } else {
                        $193.b = 0;
                        $193.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $193.tx = e / 20;
                      $193.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $194 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.a = readFb($bytes, $stream, bits);
                          $194.d = readFb($bytes, $stream, bits);
                        } else {
                          $194.a = 1;
                          $194.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.b = readFb($bytes, $stream, bits);
                          $194.c = readFb($bytes, $stream, bits);
                        } else {
                          $194.b = 0;
                          $194.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $194.tx = e / 20;
                        $194.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $181.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $195 = $180.color = {};
                    $195.red = readUi8($bytes, $stream);
                    $195.green = readUi8($bytes, $stream);
                    $195.blue = readUi8($bytes, $stream);
                    $195.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $196 = $180.colorMorph = {};
                      $196.red = readUi8($bytes, $stream);
                      $196.green = readUi8($bytes, $stream);
                      $196.blue = readUi8($bytes, $stream);
                      $196.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $197 = $180.color = {};
                    $197.red = readUi8($bytes, $stream);
                    $197.green = readUi8($bytes, $stream);
                    $197.blue = readUi8($bytes, $stream);
                    $197.alpha = readUi8($bytes, $stream);
                  } else {
                    var $198 = $180.color = {};
                    $198.red = readUi8($bytes, $stream);
                    $198.green = readUi8($bytes, $stream);
                    $198.blue = readUi8($bytes, $stream);
                    $198.alpha = 255;
                  }
                  if (isMorph) {
                    var $199 = $180.colorMorph = {};
                    $199.red = readUi8($bytes, $stream);
                    $199.green = readUi8($bytes, $stream);
                    $199.blue = readUi8($bytes, $stream);
                    $199.alpha = readUi8($bytes, $stream);
                  }
                }
                $178.push($180);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $160.push($161);
        } while (!eos);
      }
      return $;
    },
    4: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      if (tagCode > 4) {
        if (tagCode > 26) {
          var flags = readUi16($bytes, $stream);
        } else {
          var flags = readUi8($bytes, $stream);
        }
        var hasEvents = $.hasEvents = flags >> 7 & 1;
        var clip = $.clip = flags >> 6 & 1;
        var hasName = $.hasName = flags >> 5 & 1;
        var hasRatio = $.hasRatio = flags >> 4 & 1;
        var hasCxform = $.hasCxform = flags >> 3 & 1;
        var hasMatrix = $.hasMatrix = flags >> 2 & 1;
        var place = $.place = flags >> 1 & 1;
        var move = $.move = flags & 1;
        if (tagCode === 70) {
          var hasBackgroundColor = $.hasBackgroundColor = flags >> 15 & 1;
          var hasVisibility = $.hasVisibility = flags >> 14 & 1;
          var hasImage = $.hasImage = flags >> 12 & 1;
          var hasClassName = $.hasClassName = flags >> 11 & 1;
          var cache = $.cache = flags >> 10 & 1;
          var blend = $.blend = flags >> 9 & 1;
          var hasFilters = $.hasFilters = flags >> 8 & 1;
        } else {
          var cache = $.cache = 0;
          var blend = $.blend = 0;
          var hasFilters = $.hasFilters = 0;
        }
        $.depth = readUi16($bytes, $stream);
        if (hasClassName) {
          $.className = readString($bytes, $stream, 0);
        }
        if (place) {
          $.symbolId = readUi16($bytes, $stream);
        }
        if (hasMatrix) {
          var $0 = $.matrix = {};
          align($bytes, $stream);
          var hasScale = readUb($bytes, $stream, 1);
          if (hasScale) {
            var bits = readUb($bytes, $stream, 5);
            $0.a = readFb($bytes, $stream, bits);
            $0.d = readFb($bytes, $stream, bits);
          } else {
            $0.a = 1;
            $0.d = 1;
          }
          var hasRotate = readUb($bytes, $stream, 1);
          if (hasRotate) {
            var bits = readUb($bytes, $stream, 5);
            $0.b = readFb($bytes, $stream, bits);
            $0.c = readFb($bytes, $stream, bits);
          } else {
            $0.b = 0;
            $0.c = 0;
          }
          var bits = readUb($bytes, $stream, 5);
          var e = readSb($bytes, $stream, bits);
          var f = readSb($bytes, $stream, bits);
          $0.tx = e / 20;
          $0.ty = f / 20;
          align($bytes, $stream);
        }
        if (hasCxform) {
          var $1 = $.cxform = {};
          align($bytes, $stream);
          var hasOffsets = readUb($bytes, $stream, 1);
          var hasMultipliers = readUb($bytes, $stream, 1);
          var bits = readUb($bytes, $stream, 4);
          if (hasMultipliers) {
            $1.redMultiplier = readSb($bytes, $stream, bits);
            $1.greenMultiplier = readSb($bytes, $stream, bits);
            $1.blueMultiplier = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $1.alphaMultiplier = readSb($bytes, $stream, bits);
            } else {
              $1.alphaMultiplier = 256;
            }
          } else {
            $1.redMultiplier = 256;
            $1.greenMultiplier = 256;
            $1.blueMultiplier = 256;
            $1.alphaMultiplier = 256;
          }
          if (hasOffsets) {
            $1.redOffset = readSb($bytes, $stream, bits);
            $1.greenOffset = readSb($bytes, $stream, bits);
            $1.blueOffset = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $1.alphaOffset = readSb($bytes, $stream, bits);
            } else {
              $1.alphaOffset = 0;
            }
          } else {
            $1.redOffset = 0;
            $1.greenOffset = 0;
            $1.blueOffset = 0;
            $1.alphaOffset = 0;
          }
          align($bytes, $stream);
        }
        if (hasRatio) {
          $.ratio = readUi16($bytes, $stream);
        }
        if (hasName) {
          $.name = readString($bytes, $stream, 0);
        }
        if (clip) {
          $.clipDepth = readUi16($bytes, $stream);
        }
        if (hasFilters) {
          var count = readUi8($bytes, $stream);
          var $2 = $.filters = [];
          var $3 = count;
          while ($3--) {
            var $4 = {};
            var type = $4.type = readUi8($bytes, $stream);
            switch (type) {
            case 0:
              if (type === 4 || type === 7) {
                var count = readUi8($bytes, $stream);
              } else {
                var count = 1;
              }
              var $5 = $4.colors = [];
              var $6 = count;
              while ($6--) {
                var $7 = {};
                $7.red = readUi8($bytes, $stream);
                $7.green = readUi8($bytes, $stream);
                $7.blue = readUi8($bytes, $stream);
                $7.alpha = readUi8($bytes, $stream);
                $5.push($7);
              }
              if (type === 3) {
                var $8 = $4.higlightColor = {};
                $8.red = readUi8($bytes, $stream);
                $8.green = readUi8($bytes, $stream);
                $8.blue = readUi8($bytes, $stream);
                $8.alpha = readUi8($bytes, $stream);
              }
              if (type === 4 || type === 7) {
                var $9 = $4.ratios = [];
                var $10 = count;
                while ($10--) {
                  $9.push(readUi8($bytes, $stream));
                }
              }
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              if (type !== 2) {
                $4.angle = readFixed($bytes, $stream);
                $4.distance = readFixed($bytes, $stream);
              }
              $4.strength = readFixed8($bytes, $stream);
              $4.innerShadow = readUb($bytes, $stream, 1);
              $4.knockout = readUb($bytes, $stream, 1);
              $4.compositeSource = readUb($bytes, $stream, 1);
              if (type === 3) {
                $4.onTop = readUb($bytes, $stream, 1);
              } else {
                var reserved = readUb($bytes, $stream, 1);
              }
              if (type === 4 || type === 7) {
                $4.passes = readUb($bytes, $stream, 4);
              } else {
                var reserved = readUb($bytes, $stream, 4);
              }
              break;
            case 1:
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              $4.passes = readUb($bytes, $stream, 5);
              var reserved = readUb($bytes, $stream, 3);
              break;
            case 2:
            case 3:
            case 4:
              if (type === 4 || type === 7) {
                var count = readUi8($bytes, $stream);
              } else {
                var count = 1;
              }
              var $11 = $4.colors = [];
              var $12 = count;
              while ($12--) {
                var $13 = {};
                $13.red = readUi8($bytes, $stream);
                $13.green = readUi8($bytes, $stream);
                $13.blue = readUi8($bytes, $stream);
                $13.alpha = readUi8($bytes, $stream);
                $11.push($13);
              }
              if (type === 3) {
                var $14 = $4.higlightColor = {};
                $14.red = readUi8($bytes, $stream);
                $14.green = readUi8($bytes, $stream);
                $14.blue = readUi8($bytes, $stream);
                $14.alpha = readUi8($bytes, $stream);
              }
              if (type === 4 || type === 7) {
                var $15 = $4.ratios = [];
                var $16 = count;
                while ($16--) {
                  $15.push(readUi8($bytes, $stream));
                }
              }
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              if (type !== 2) {
                $4.angle = readFixed($bytes, $stream);
                $4.distance = readFixed($bytes, $stream);
              }
              $4.strength = readFixed8($bytes, $stream);
              $4.innerShadow = readUb($bytes, $stream, 1);
              $4.knockout = readUb($bytes, $stream, 1);
              $4.compositeSource = readUb($bytes, $stream, 1);
              if (type === 3) {
                $4.onTop = readUb($bytes, $stream, 1);
              } else {
                var reserved = readUb($bytes, $stream, 1);
              }
              if (type === 4 || type === 7) {
                $4.passes = readUb($bytes, $stream, 4);
              } else {
                var reserved = readUb($bytes, $stream, 4);
              }
              break;
            case 5:
              $4.columns = readUi8($bytes, $stream);
              $4.rows = readUi8($bytes, $stream);
              $4.divisor = readFloat($bytes, $stream);
              $4.bias = readFloat($bytes, $stream);
              var $17 = $4.weights = [];
              var $18 = columns * rows;
              while ($18--) {
                $17.push(readFloat($bytes, $stream));
              }
              var $19 = $4.defaultColor = {};
              $19.red = readUi8($bytes, $stream);
              $19.green = readUi8($bytes, $stream);
              $19.blue = readUi8($bytes, $stream);
              $19.alpha = readUi8($bytes, $stream);
              var reserved = readUb($bytes, $stream, 6);
              $4.clamp = readUb($bytes, $stream, 1);
              $4.preserveAlpha = readUb($bytes, $stream, 1);
              break;
            case 6:
              var $20 = $4.matrix = [];
              var $21 = 20;
              while ($21--) {
                $20.push(readFloat($bytes, $stream));
              }
              break;
            case 7:
              if (type === 4 || type === 7) {
                var count = readUi8($bytes, $stream);
              } else {
                var count = 1;
              }
              var $22 = $4.colors = [];
              var $23 = count;
              while ($23--) {
                var $24 = {};
                $24.red = readUi8($bytes, $stream);
                $24.green = readUi8($bytes, $stream);
                $24.blue = readUi8($bytes, $stream);
                $24.alpha = readUi8($bytes, $stream);
                $22.push($24);
              }
              if (type === 3) {
                var $25 = $4.higlightColor = {};
                $25.red = readUi8($bytes, $stream);
                $25.green = readUi8($bytes, $stream);
                $25.blue = readUi8($bytes, $stream);
                $25.alpha = readUi8($bytes, $stream);
              }
              if (type === 4 || type === 7) {
                var $26 = $4.ratios = [];
                var $27 = count;
                while ($27--) {
                  $26.push(readUi8($bytes, $stream));
                }
              }
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              if (type !== 2) {
                $4.angle = readFixed($bytes, $stream);
                $4.distance = readFixed($bytes, $stream);
              }
              $4.strength = readFixed8($bytes, $stream);
              $4.innerShadow = readUb($bytes, $stream, 1);
              $4.knockout = readUb($bytes, $stream, 1);
              $4.compositeSource = readUb($bytes, $stream, 1);
              if (type === 3) {
                $4.onTop = readUb($bytes, $stream, 1);
              } else {
                var reserved = readUb($bytes, $stream, 1);
              }
              if (type === 4 || type === 7) {
                $4.passes = readUb($bytes, $stream, 4);
              } else {
                var reserved = readUb($bytes, $stream, 4);
              }
              break;
            default:
            }
            $2.push($4);
          }
        }
        if (blend) {
          $.blendMode = readUi8($bytes, $stream);
        }
        if (cache) {
          $.bmpCache = readUi8($bytes, $stream);
        }
        if (hasEvents) {
          var reserved = readUi16($bytes, $stream);
          if (swfVersion >= 6) {
            var allFlags = readUi32($bytes, $stream);
          } else {
            var allFlags = readUi16($bytes, $stream);
          }
          var $28 = $.events = [];
          do {
            var $29 = {};
            if (swfVersion >= 6) {
              var flags = readUi32($bytes, $stream);
            } else {
              var flags = readUi16($bytes, $stream);
            }
            var eoe = $29.eoe = !flags;
            $29.onKeyUp = flags >> 7 & 1;
            $29.onKeyDown = flags >> 6 & 1;
            $29.onMouseUp = flags >> 5 & 1;
            $29.onMouseDown = flags >> 4 & 1;
            $29.onMouseMove = flags >> 3 & 1;
            $29.onUnload = flags >> 2 & 1;
            $29.onEnterFrame = flags >> 1 & 1;
            $29.onLoad = flags & 1;
            if (swfVersion >= 6) {
              $29.onDragOver = flags >> 15 & 1;
              $29.onRollOut = flags >> 14 & 1;
              $29.onRollOver = flags >> 13 & 1;
              $29.onReleaseOutside = flags >> 12 & 1;
              $29.onRelease = flags >> 11 & 1;
              $29.onPress = flags >> 10 & 1;
              $29.onInitialize = flags >> 9 & 1;
              $29.onData = flags >> 8 & 1;
              if (swfVersion >= 7) {
                $29.onConstruct = flags >> 18 & 1;
              } else {
                $29.onConstruct = 0;
              }
              var keyPress = $29.keyPress = flags >> 17 & 1;
              $29.onDragOut = flags >> 16 & 1;
            }
            if (!eoe) {
              var length = $29.length = readUi32($bytes, $stream);
              if (keyPress) {
                $29.keyCode = readUi8($bytes, $stream);
              }
              $29.actionsData = readBinary($bytes, $stream, length - (keyPress ? 1 : 0));
            }
            $28.push($29);
          } while (!eoe);
        }
        if (hasBackgroundColor) {
          $.backgroundColor = ARGB;
        }
        if (hasVisibility) {
          $.visibility = readUi8($bytes, $stream);
        }
      } else {
        $.place = 1;
        $.symbolId = readUi16($bytes, $stream);
        $.depth = readUi16($bytes, $stream);
        $.hasMatrix = 1;
        var $30 = $.matrix = {};
        align($bytes, $stream);
        var hasScale = readUb($bytes, $stream, 1);
        if (hasScale) {
          var bits = readUb($bytes, $stream, 5);
          $30.a = readFb($bytes, $stream, bits);
          $30.d = readFb($bytes, $stream, bits);
        } else {
          $30.a = 1;
          $30.d = 1;
        }
        var hasRotate = readUb($bytes, $stream, 1);
        if (hasRotate) {
          var bits = readUb($bytes, $stream, 5);
          $30.b = readFb($bytes, $stream, bits);
          $30.c = readFb($bytes, $stream, bits);
        } else {
          $30.b = 0;
          $30.c = 0;
        }
        var bits = readUb($bytes, $stream, 5);
        var e = readSb($bytes, $stream, bits);
        var f = readSb($bytes, $stream, bits);
        $30.tx = e / 20;
        $30.ty = f / 20;
        align($bytes, $stream);
        if ($stream.remaining()) {
          $.hasCxform = 1;
          var $31 = $.cxform = {};
          align($bytes, $stream);
          var hasOffsets = readUb($bytes, $stream, 1);
          var hasMultipliers = readUb($bytes, $stream, 1);
          var bits = readUb($bytes, $stream, 4);
          if (hasMultipliers) {
            $31.redMultiplier = readSb($bytes, $stream, bits);
            $31.greenMultiplier = readSb($bytes, $stream, bits);
            $31.blueMultiplier = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $31.alphaMultiplier = readSb($bytes, $stream, bits);
            } else {
              $31.alphaMultiplier = 256;
            }
          } else {
            $31.redMultiplier = 256;
            $31.greenMultiplier = 256;
            $31.blueMultiplier = 256;
            $31.alphaMultiplier = 256;
          }
          if (hasOffsets) {
            $31.redOffset = readSb($bytes, $stream, bits);
            $31.greenOffset = readSb($bytes, $stream, bits);
            $31.blueOffset = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $31.alphaOffset = readSb($bytes, $stream, bits);
            } else {
              $31.alphaOffset = 0;
            }
          } else {
            $31.redOffset = 0;
            $31.greenOffset = 0;
            $31.blueOffset = 0;
            $31.alphaOffset = 0;
          }
          align($bytes, $stream);
        }
      }
      return $;
    },
    5: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      if (tagCode === 5) {
        $.symbolId = readUi16($bytes, $stream);
      }
      $.depth = readUi16($bytes, $stream);
      return $;
    },
    6: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      if (tagCode > 21) {
        var alphaDataOffset = readUi32($bytes, $stream);
        if (tagCode === 90) {
          $.deblock = readFixed8($bytes, $stream);
        }
        var imgData = $.imgData = readBinary($bytes, $stream, alphaDataOffset);
        $.alphaData = readBinary($bytes, $stream, 0);
      } else {
        var imgData = $.imgData = readBinary($bytes, $stream, 0);
      }
      switch (imgData[0] << 8 | imgData[1]) {
      case 65496:
      case 65497:
        $.mimeType = 'image/jpeg';
        break;
      case 35152:
        $.mimeType = 'image/png';
        break;
      case 18249:
        $.mimeType = 'image/gif';
        break;
      default:
        $.mimeType = 'application/octet-stream';
      }
      if (tagCode === 6) {
        $.incomplete = 1;
      }
      return $;
    },
    7: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      if (tagCode == 7) {
        var $0 = $.characters = [];
        do {
          var $1 = {};
          var flags = readUi8($bytes, $stream);
          var eob = $1.eob = !flags;
          if (swfVersion >= 8) {
            var blend = $1.blend = flags >> 5 & 1;
            var hasFilters = $1.hasFilters = flags >> 4 & 1;
          } else {
            var blend = $1.blend = 0;
            var hasFilters = $1.hasFilters = 0;
          }
          $1.stateHitTest = flags >> 3 & 1;
          $1.stateDown = flags >> 2 & 1;
          $1.stateOver = flags >> 1 & 1;
          $1.stateUp = flags & 1;
          if (!eob) {
            $1.symbolId = readUi16($bytes, $stream);
            $1.depth = readUi16($bytes, $stream);
            var $2 = $1.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $2.a = readFb($bytes, $stream, bits);
              $2.d = readFb($bytes, $stream, bits);
            } else {
              $2.a = 1;
              $2.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $2.b = readFb($bytes, $stream, bits);
              $2.c = readFb($bytes, $stream, bits);
            } else {
              $2.b = 0;
              $2.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $2.tx = e / 20;
            $2.ty = f / 20;
            align($bytes, $stream);
            if (tagCode === 34) {
              var $3 = $1.cxform = {};
              align($bytes, $stream);
              var hasOffsets = readUb($bytes, $stream, 1);
              var hasMultipliers = readUb($bytes, $stream, 1);
              var bits = readUb($bytes, $stream, 4);
              if (hasMultipliers) {
                $3.redMultiplier = readSb($bytes, $stream, bits);
                $3.greenMultiplier = readSb($bytes, $stream, bits);
                $3.blueMultiplier = readSb($bytes, $stream, bits);
                if (tagCode > 4) {
                  $3.alphaMultiplier = readSb($bytes, $stream, bits);
                } else {
                  $3.alphaMultiplier = 256;
                }
              } else {
                $3.redMultiplier = 256;
                $3.greenMultiplier = 256;
                $3.blueMultiplier = 256;
                $3.alphaMultiplier = 256;
              }
              if (hasOffsets) {
                $3.redOffset = readSb($bytes, $stream, bits);
                $3.greenOffset = readSb($bytes, $stream, bits);
                $3.blueOffset = readSb($bytes, $stream, bits);
                if (tagCode > 4) {
                  $3.alphaOffset = readSb($bytes, $stream, bits);
                } else {
                  $3.alphaOffset = 0;
                }
              } else {
                $3.redOffset = 0;
                $3.greenOffset = 0;
                $3.blueOffset = 0;
                $3.alphaOffset = 0;
              }
              align($bytes, $stream);
            }
            if (hasFilters) {
              $1.filterCount = readUi8($bytes, $stream);
              var $4 = $1.filters = {};
              var type = $4.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $5 = $4.colors = [];
                var $6 = count;
                while ($6--) {
                  var $7 = {};
                  $7.red = readUi8($bytes, $stream);
                  $7.green = readUi8($bytes, $stream);
                  $7.blue = readUi8($bytes, $stream);
                  $7.alpha = readUi8($bytes, $stream);
                  $5.push($7);
                }
                if (type === 3) {
                  var $8 = $4.higlightColor = {};
                  $8.red = readUi8($bytes, $stream);
                  $8.green = readUi8($bytes, $stream);
                  $8.blue = readUi8($bytes, $stream);
                  $8.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $9 = $4.ratios = [];
                  var $10 = count;
                  while ($10--) {
                    $9.push(readUi8($bytes, $stream));
                  }
                }
                $4.blurX = readFixed($bytes, $stream);
                $4.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $4.angle = readFixed($bytes, $stream);
                  $4.distance = readFixed($bytes, $stream);
                }
                $4.strength = readFixed8($bytes, $stream);
                $4.innerShadow = readUb($bytes, $stream, 1);
                $4.knockout = readUb($bytes, $stream, 1);
                $4.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $4.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $4.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              case 1:
                $4.blurX = readFixed($bytes, $stream);
                $4.blurY = readFixed($bytes, $stream);
                $4.passes = readUb($bytes, $stream, 5);
                var reserved = readUb($bytes, $stream, 3);
                break;
              case 2:
              case 3:
              case 4:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $11 = $4.colors = [];
                var $12 = count;
                while ($12--) {
                  var $13 = {};
                  $13.red = readUi8($bytes, $stream);
                  $13.green = readUi8($bytes, $stream);
                  $13.blue = readUi8($bytes, $stream);
                  $13.alpha = readUi8($bytes, $stream);
                  $11.push($13);
                }
                if (type === 3) {
                  var $14 = $4.higlightColor = {};
                  $14.red = readUi8($bytes, $stream);
                  $14.green = readUi8($bytes, $stream);
                  $14.blue = readUi8($bytes, $stream);
                  $14.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $15 = $4.ratios = [];
                  var $16 = count;
                  while ($16--) {
                    $15.push(readUi8($bytes, $stream));
                  }
                }
                $4.blurX = readFixed($bytes, $stream);
                $4.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $4.angle = readFixed($bytes, $stream);
                  $4.distance = readFixed($bytes, $stream);
                }
                $4.strength = readFixed8($bytes, $stream);
                $4.innerShadow = readUb($bytes, $stream, 1);
                $4.knockout = readUb($bytes, $stream, 1);
                $4.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $4.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $4.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              case 5:
                $4.columns = readUi8($bytes, $stream);
                $4.rows = readUi8($bytes, $stream);
                $4.divisor = readFloat($bytes, $stream);
                $4.bias = readFloat($bytes, $stream);
                var $17 = $4.weights = [];
                var $18 = columns * rows;
                while ($18--) {
                  $17.push(readFloat($bytes, $stream));
                }
                var $19 = $4.defaultColor = {};
                $19.red = readUi8($bytes, $stream);
                $19.green = readUi8($bytes, $stream);
                $19.blue = readUi8($bytes, $stream);
                $19.alpha = readUi8($bytes, $stream);
                var reserved = readUb($bytes, $stream, 6);
                $4.clamp = readUb($bytes, $stream, 1);
                $4.preserveAlpha = readUb($bytes, $stream, 1);
                break;
              case 6:
                var $20 = $4.matrix = [];
                var $21 = 20;
                while ($21--) {
                  $20.push(readFloat($bytes, $stream));
                }
                break;
              case 7:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $22 = $4.colors = [];
                var $23 = count;
                while ($23--) {
                  var $24 = {};
                  $24.red = readUi8($bytes, $stream);
                  $24.green = readUi8($bytes, $stream);
                  $24.blue = readUi8($bytes, $stream);
                  $24.alpha = readUi8($bytes, $stream);
                  $22.push($24);
                }
                if (type === 3) {
                  var $25 = $4.higlightColor = {};
                  $25.red = readUi8($bytes, $stream);
                  $25.green = readUi8($bytes, $stream);
                  $25.blue = readUi8($bytes, $stream);
                  $25.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $26 = $4.ratios = [];
                  var $27 = count;
                  while ($27--) {
                    $26.push(readUi8($bytes, $stream));
                  }
                }
                $4.blurX = readFixed($bytes, $stream);
                $4.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $4.angle = readFixed($bytes, $stream);
                  $4.distance = readFixed($bytes, $stream);
                }
                $4.strength = readFixed8($bytes, $stream);
                $4.innerShadow = readUb($bytes, $stream, 1);
                $4.knockout = readUb($bytes, $stream, 1);
                $4.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $4.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $4.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              default:
              }
            }
            if (blend) {
              $1.blendMode = readUi8($bytes, $stream);
            }
          }
          $0.push($1);
        } while (!eob);
        $.actionsData = readBinary($bytes, $stream, 0);
      } else {
        var trackFlags = readUi8($bytes, $stream);
        $.trackAsMenu = trackFlags >> 7 & 1;
        var actionOffset = readUi16($bytes, $stream);
        var $28 = $.characters = [];
        do {
          var $29 = {};
          var flags = readUi8($bytes, $stream);
          var eob = $29.eob = !flags;
          if (swfVersion >= 8) {
            var blend = $29.blend = flags >> 5 & 1;
            var hasFilters = $29.hasFilters = flags >> 4 & 1;
          } else {
            var blend = $29.blend = 0;
            var hasFilters = $29.hasFilters = 0;
          }
          $29.stateHitTest = flags >> 3 & 1;
          $29.stateDown = flags >> 2 & 1;
          $29.stateOver = flags >> 1 & 1;
          $29.stateUp = flags & 1;
          if (!eob) {
            $29.symbolId = readUi16($bytes, $stream);
            $29.depth = readUi16($bytes, $stream);
            var $30 = $29.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $30.a = readFb($bytes, $stream, bits);
              $30.d = readFb($bytes, $stream, bits);
            } else {
              $30.a = 1;
              $30.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $30.b = readFb($bytes, $stream, bits);
              $30.c = readFb($bytes, $stream, bits);
            } else {
              $30.b = 0;
              $30.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $30.tx = e / 20;
            $30.ty = f / 20;
            align($bytes, $stream);
            if (tagCode === 34) {
              var $31 = $29.cxform = {};
              align($bytes, $stream);
              var hasOffsets = readUb($bytes, $stream, 1);
              var hasMultipliers = readUb($bytes, $stream, 1);
              var bits = readUb($bytes, $stream, 4);
              if (hasMultipliers) {
                $31.redMultiplier = readSb($bytes, $stream, bits);
                $31.greenMultiplier = readSb($bytes, $stream, bits);
                $31.blueMultiplier = readSb($bytes, $stream, bits);
                if (tagCode > 4) {
                  $31.alphaMultiplier = readSb($bytes, $stream, bits);
                } else {
                  $31.alphaMultiplier = 256;
                }
              } else {
                $31.redMultiplier = 256;
                $31.greenMultiplier = 256;
                $31.blueMultiplier = 256;
                $31.alphaMultiplier = 256;
              }
              if (hasOffsets) {
                $31.redOffset = readSb($bytes, $stream, bits);
                $31.greenOffset = readSb($bytes, $stream, bits);
                $31.blueOffset = readSb($bytes, $stream, bits);
                if (tagCode > 4) {
                  $31.alphaOffset = readSb($bytes, $stream, bits);
                } else {
                  $31.alphaOffset = 0;
                }
              } else {
                $31.redOffset = 0;
                $31.greenOffset = 0;
                $31.blueOffset = 0;
                $31.alphaOffset = 0;
              }
              align($bytes, $stream);
            }
            if (hasFilters) {
              $29.filterCount = readUi8($bytes, $stream);
              var $32 = $29.filters = {};
              var type = $32.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $33 = $32.colors = [];
                var $34 = count;
                while ($34--) {
                  var $35 = {};
                  $35.red = readUi8($bytes, $stream);
                  $35.green = readUi8($bytes, $stream);
                  $35.blue = readUi8($bytes, $stream);
                  $35.alpha = readUi8($bytes, $stream);
                  $33.push($35);
                }
                if (type === 3) {
                  var $36 = $32.higlightColor = {};
                  $36.red = readUi8($bytes, $stream);
                  $36.green = readUi8($bytes, $stream);
                  $36.blue = readUi8($bytes, $stream);
                  $36.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $37 = $32.ratios = [];
                  var $38 = count;
                  while ($38--) {
                    $37.push(readUi8($bytes, $stream));
                  }
                }
                $32.blurX = readFixed($bytes, $stream);
                $32.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $32.angle = readFixed($bytes, $stream);
                  $32.distance = readFixed($bytes, $stream);
                }
                $32.strength = readFixed8($bytes, $stream);
                $32.innerShadow = readUb($bytes, $stream, 1);
                $32.knockout = readUb($bytes, $stream, 1);
                $32.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $32.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $32.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              case 1:
                $32.blurX = readFixed($bytes, $stream);
                $32.blurY = readFixed($bytes, $stream);
                $32.passes = readUb($bytes, $stream, 5);
                var reserved = readUb($bytes, $stream, 3);
                break;
              case 2:
              case 3:
              case 4:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $39 = $32.colors = [];
                var $40 = count;
                while ($40--) {
                  var $41 = {};
                  $41.red = readUi8($bytes, $stream);
                  $41.green = readUi8($bytes, $stream);
                  $41.blue = readUi8($bytes, $stream);
                  $41.alpha = readUi8($bytes, $stream);
                  $39.push($41);
                }
                if (type === 3) {
                  var $42 = $32.higlightColor = {};
                  $42.red = readUi8($bytes, $stream);
                  $42.green = readUi8($bytes, $stream);
                  $42.blue = readUi8($bytes, $stream);
                  $42.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $43 = $32.ratios = [];
                  var $44 = count;
                  while ($44--) {
                    $43.push(readUi8($bytes, $stream));
                  }
                }
                $32.blurX = readFixed($bytes, $stream);
                $32.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $32.angle = readFixed($bytes, $stream);
                  $32.distance = readFixed($bytes, $stream);
                }
                $32.strength = readFixed8($bytes, $stream);
                $32.innerShadow = readUb($bytes, $stream, 1);
                $32.knockout = readUb($bytes, $stream, 1);
                $32.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $32.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $32.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              case 5:
                $32.columns = readUi8($bytes, $stream);
                $32.rows = readUi8($bytes, $stream);
                $32.divisor = readFloat($bytes, $stream);
                $32.bias = readFloat($bytes, $stream);
                var $45 = $32.weights = [];
                var $46 = columns * rows;
                while ($46--) {
                  $45.push(readFloat($bytes, $stream));
                }
                var $47 = $32.defaultColor = {};
                $47.red = readUi8($bytes, $stream);
                $47.green = readUi8($bytes, $stream);
                $47.blue = readUi8($bytes, $stream);
                $47.alpha = readUi8($bytes, $stream);
                var reserved = readUb($bytes, $stream, 6);
                $32.clamp = readUb($bytes, $stream, 1);
                $32.preserveAlpha = readUb($bytes, $stream, 1);
                break;
              case 6:
                var $48 = $32.matrix = [];
                var $49 = 20;
                while ($49--) {
                  $48.push(readFloat($bytes, $stream));
                }
                break;
              case 7:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $50 = $32.colors = [];
                var $51 = count;
                while ($51--) {
                  var $52 = {};
                  $52.red = readUi8($bytes, $stream);
                  $52.green = readUi8($bytes, $stream);
                  $52.blue = readUi8($bytes, $stream);
                  $52.alpha = readUi8($bytes, $stream);
                  $50.push($52);
                }
                if (type === 3) {
                  var $53 = $32.higlightColor = {};
                  $53.red = readUi8($bytes, $stream);
                  $53.green = readUi8($bytes, $stream);
                  $53.blue = readUi8($bytes, $stream);
                  $53.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $54 = $32.ratios = [];
                  var $55 = count;
                  while ($55--) {
                    $54.push(readUi8($bytes, $stream));
                  }
                }
                $32.blurX = readFixed($bytes, $stream);
                $32.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $32.angle = readFixed($bytes, $stream);
                  $32.distance = readFixed($bytes, $stream);
                }
                $32.strength = readFixed8($bytes, $stream);
                $32.innerShadow = readUb($bytes, $stream, 1);
                $32.knockout = readUb($bytes, $stream, 1);
                $32.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $32.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $32.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              default:
              }
            }
            if (blend) {
              $29.blendMode = readUi8($bytes, $stream);
            }
          }
          $28.push($29);
        } while (!eob);
        if (!(!actionOffset)) {
          var $56 = $.buttonActions = [];
          do {
            var $57 = {};
            var buttonCondSize = readUi16($bytes, $stream);
            var buttonConditions = readUi16($bytes, $stream);
            $57.idleToOverDown = buttonConditions >> 7 & 1;
            $57.outDownToIdle = buttonConditions >> 6 & 1;
            $57.outDownToOverDown = buttonConditions >> 5 & 1;
            $57.overDownToOutDown = buttonConditions >> 4 & 1;
            $57.overDownToOverUp = buttonConditions >> 3 & 1;
            $57.overUpToOverDown = buttonConditions >> 2 & 1;
            $57.overUpToIdle = buttonConditions >> 1 & 1;
            $57.idleToOverUp = buttonConditions & 1;
            $57.mouseEventFlags = buttonConditions & 511;
            $57.keyPress = buttonConditions >> 9 & 127;
            $57.overDownToIdle = buttonConditions >> 8 & 1;
            if (!buttonCondSize) {
              $57.actionsData = readBinary($bytes, $stream, 0);
            } else {
              $57.actionsData = readBinary($bytes, $stream, buttonCondSize - 4);
            }
            $56.push($57);
          } while ($stream.remaining() > 0);
        }
      }
      return $;
    },
    8: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = 0;
      $.imgData = readBinary($bytes, $stream, 0);
      $.mimeType = 'application/octet-stream';
      return $;
    },
    9: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      var $0 = $.color = {};
      $0.red = readUi8($bytes, $stream);
      $0.green = readUi8($bytes, $stream);
      $0.blue = readUi8($bytes, $stream);
      $0.alpha = 255;
      return $;
    },
    10: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var firstOffset = readUi16($bytes, $stream);
      var glyphCount = $.glyphCount = firstOffset / 2;
      var restOffsets = [];
      var $0 = glyphCount - 1;
      while ($0--) {
        restOffsets.push(readUi16($bytes, $stream));
      }
      $.offsets = [
        firstOffset
      ].concat(restOffsets);
      var $1 = $.glyphs = [];
      var $2 = glyphCount;
      while ($2--) {
        var $3 = {};
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $4 = $3.records = [];
        do {
          var $5 = {};
          var type = $5.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $5.eos = !(type || flags);
          if (type) {
            var isStraight = $5.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $5.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $5.deltaX = readSb($bytes, $stream, bits);
                $5.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $5.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $5.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $5.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $5.controlDeltaX = readSb($bytes, $stream, bits);
              $5.controlDeltaY = readSb($bytes, $stream, bits);
              $5.anchorDeltaX = readSb($bytes, $stream, bits);
              $5.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $5.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $5.hasNewStyles = 0;
            }
            var hasLineStyle = $5.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $5.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $5.hasFillStyle0 = flags >> 1 & 1;
            var move = $5.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $5.moveX = readSb($bytes, $stream, bits);
              $5.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $5.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $5.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $5.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $6 = $5.fillStyles = [];
              var $7 = count;
              while ($7--) {
                var $8 = {};
                var type = $8.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $9 = $8.color = {};
                    $9.red = readUi8($bytes, $stream);
                    $9.green = readUi8($bytes, $stream);
                    $9.blue = readUi8($bytes, $stream);
                    $9.alpha = readUi8($bytes, $stream);
                  } else {
                    var $10 = $8.color = {};
                    $10.red = readUi8($bytes, $stream);
                    $10.green = readUi8($bytes, $stream);
                    $10.blue = readUi8($bytes, $stream);
                    $10.alpha = 255;
                  }
                  if (isMorph) {
                    var $11 = $8.colorMorph = {};
                    $11.red = readUi8($bytes, $stream);
                    $11.green = readUi8($bytes, $stream);
                    $11.blue = readUi8($bytes, $stream);
                    $11.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $12 = $8.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $12.a = readFb($bytes, $stream, bits);
                    $12.d = readFb($bytes, $stream, bits);
                  } else {
                    $12.a = 1;
                    $12.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $12.b = readFb($bytes, $stream, bits);
                    $12.c = readFb($bytes, $stream, bits);
                  } else {
                    $12.b = 0;
                    $12.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $12.tx = e / 20;
                  $12.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $13 = $8.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $13.a = readFb($bytes, $stream, bits);
                      $13.d = readFb($bytes, $stream, bits);
                    } else {
                      $13.a = 1;
                      $13.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $13.b = readFb($bytes, $stream, bits);
                      $13.c = readFb($bytes, $stream, bits);
                    } else {
                      $13.b = 0;
                      $13.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $13.tx = e / 20;
                    $13.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $8.spreadMode = readUb($bytes, $stream, 2);
                    $8.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $8.count = readUb($bytes, $stream, 4);
                  var $14 = $8.records = [];
                  var $15 = count;
                  while ($15--) {
                    var $16 = {};
                    $16.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $17 = $16.color = {};
                      $17.red = readUi8($bytes, $stream);
                      $17.green = readUi8($bytes, $stream);
                      $17.blue = readUi8($bytes, $stream);
                      $17.alpha = readUi8($bytes, $stream);
                    } else {
                      var $18 = $16.color = {};
                      $18.red = readUi8($bytes, $stream);
                      $18.green = readUi8($bytes, $stream);
                      $18.blue = readUi8($bytes, $stream);
                      $18.alpha = 255;
                    }
                    if (isMorph) {
                      $16.ratioMorph = readUi8($bytes, $stream);
                      var $19 = $16.colorMorph = {};
                      $19.red = readUi8($bytes, $stream);
                      $19.green = readUi8($bytes, $stream);
                      $19.blue = readUi8($bytes, $stream);
                      $19.alpha = readUi8($bytes, $stream);
                    }
                    $14.push($16);
                  }
                  if (type === 19) {
                    $8.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $8.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $8.bitmapId = readUi16($bytes, $stream);
                  var $20 = $8.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $20.a = readFb($bytes, $stream, bits);
                    $20.d = readFb($bytes, $stream, bits);
                  } else {
                    $20.a = 1;
                    $20.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $20.b = readFb($bytes, $stream, bits);
                    $20.c = readFb($bytes, $stream, bits);
                  } else {
                    $20.b = 0;
                    $20.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $20.tx = e / 20;
                  $20.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $21 = $8.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $21.a = readFb($bytes, $stream, bits);
                      $21.d = readFb($bytes, $stream, bits);
                    } else {
                      $21.a = 1;
                      $21.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $21.b = readFb($bytes, $stream, bits);
                      $21.c = readFb($bytes, $stream, bits);
                    } else {
                      $21.b = 0;
                      $21.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $21.tx = e / 20;
                    $21.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $8.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $6.push($8);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $22 = $5.lineStyles = [];
              var $23 = count;
              while ($23--) {
                var $24 = {};
                $24.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $24.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $24.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $24.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $24.hasFill = readUb($bytes, $stream, 1);
                  $24.noHscale = readUb($bytes, $stream, 1);
                  $24.noVscale = readUb($bytes, $stream, 1);
                  $24.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $24.noClose = readUb($bytes, $stream, 1);
                  $24.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $24.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $25 = $24.fillStyle = {};
                    var type = $25.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $26 = $25.color = {};
                        $26.red = readUi8($bytes, $stream);
                        $26.green = readUi8($bytes, $stream);
                        $26.blue = readUi8($bytes, $stream);
                        $26.alpha = readUi8($bytes, $stream);
                      } else {
                        var $27 = $25.color = {};
                        $27.red = readUi8($bytes, $stream);
                        $27.green = readUi8($bytes, $stream);
                        $27.blue = readUi8($bytes, $stream);
                        $27.alpha = 255;
                      }
                      if (isMorph) {
                        var $28 = $25.colorMorph = {};
                        $28.red = readUi8($bytes, $stream);
                        $28.green = readUi8($bytes, $stream);
                        $28.blue = readUi8($bytes, $stream);
                        $28.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $29 = $25.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $29.a = readFb($bytes, $stream, bits);
                        $29.d = readFb($bytes, $stream, bits);
                      } else {
                        $29.a = 1;
                        $29.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $29.b = readFb($bytes, $stream, bits);
                        $29.c = readFb($bytes, $stream, bits);
                      } else {
                        $29.b = 0;
                        $29.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $29.tx = e / 20;
                      $29.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $30 = $25.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $30.a = readFb($bytes, $stream, bits);
                          $30.d = readFb($bytes, $stream, bits);
                        } else {
                          $30.a = 1;
                          $30.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $30.b = readFb($bytes, $stream, bits);
                          $30.c = readFb($bytes, $stream, bits);
                        } else {
                          $30.b = 0;
                          $30.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $30.tx = e / 20;
                        $30.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $25.spreadMode = readUb($bytes, $stream, 2);
                        $25.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $25.count = readUb($bytes, $stream, 4);
                      var $31 = $25.records = [];
                      var $32 = count;
                      while ($32--) {
                        var $33 = {};
                        $33.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $34 = $33.color = {};
                          $34.red = readUi8($bytes, $stream);
                          $34.green = readUi8($bytes, $stream);
                          $34.blue = readUi8($bytes, $stream);
                          $34.alpha = readUi8($bytes, $stream);
                        } else {
                          var $35 = $33.color = {};
                          $35.red = readUi8($bytes, $stream);
                          $35.green = readUi8($bytes, $stream);
                          $35.blue = readUi8($bytes, $stream);
                          $35.alpha = 255;
                        }
                        if (isMorph) {
                          $33.ratioMorph = readUi8($bytes, $stream);
                          var $36 = $33.colorMorph = {};
                          $36.red = readUi8($bytes, $stream);
                          $36.green = readUi8($bytes, $stream);
                          $36.blue = readUi8($bytes, $stream);
                          $36.alpha = readUi8($bytes, $stream);
                        }
                        $31.push($33);
                      }
                      if (type === 19) {
                        $25.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $25.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $25.bitmapId = readUi16($bytes, $stream);
                      var $37 = $25.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $37.a = readFb($bytes, $stream, bits);
                        $37.d = readFb($bytes, $stream, bits);
                      } else {
                        $37.a = 1;
                        $37.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $37.b = readFb($bytes, $stream, bits);
                        $37.c = readFb($bytes, $stream, bits);
                      } else {
                        $37.b = 0;
                        $37.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $37.tx = e / 20;
                      $37.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $38 = $25.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $38.a = readFb($bytes, $stream, bits);
                          $38.d = readFb($bytes, $stream, bits);
                        } else {
                          $38.a = 1;
                          $38.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $38.b = readFb($bytes, $stream, bits);
                          $38.c = readFb($bytes, $stream, bits);
                        } else {
                          $38.b = 0;
                          $38.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $38.tx = e / 20;
                        $38.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $25.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $39 = $24.color = {};
                    $39.red = readUi8($bytes, $stream);
                    $39.green = readUi8($bytes, $stream);
                    $39.blue = readUi8($bytes, $stream);
                    $39.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $40 = $24.colorMorph = {};
                      $40.red = readUi8($bytes, $stream);
                      $40.green = readUi8($bytes, $stream);
                      $40.blue = readUi8($bytes, $stream);
                      $40.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $41 = $24.color = {};
                    $41.red = readUi8($bytes, $stream);
                    $41.green = readUi8($bytes, $stream);
                    $41.blue = readUi8($bytes, $stream);
                    $41.alpha = readUi8($bytes, $stream);
                  } else {
                    var $42 = $24.color = {};
                    $42.red = readUi8($bytes, $stream);
                    $42.green = readUi8($bytes, $stream);
                    $42.blue = readUi8($bytes, $stream);
                    $42.alpha = 255;
                  }
                  if (isMorph) {
                    var $43 = $24.colorMorph = {};
                    $43.red = readUi8($bytes, $stream);
                    $43.green = readUi8($bytes, $stream);
                    $43.blue = readUi8($bytes, $stream);
                    $43.alpha = readUi8($bytes, $stream);
                  }
                }
                $22.push($24);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $4.push($5);
        } while (!eos);
        $1.push($3);
      }
      return $;
    },
    11: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var $0 = $.bbox = {};
      align($bytes, $stream);
      var bits = readUb($bytes, $stream, 5);
      var xMin = readSb($bytes, $stream, bits);
      var xMax = readSb($bytes, $stream, bits);
      var yMin = readSb($bytes, $stream, bits);
      var yMax = readSb($bytes, $stream, bits);
      $0.left = xMin / 20;
      $0.right = xMax / 20;
      $0.top = yMin / 20;
      $0.bottom = yMax / 20;
      align($bytes, $stream);
      var $1 = $.matrix = {};
      align($bytes, $stream);
      var hasScale = readUb($bytes, $stream, 1);
      if (hasScale) {
        var bits = readUb($bytes, $stream, 5);
        $1.a = readFb($bytes, $stream, bits);
        $1.d = readFb($bytes, $stream, bits);
      } else {
        $1.a = 1;
        $1.d = 1;
      }
      var hasRotate = readUb($bytes, $stream, 1);
      if (hasRotate) {
        var bits = readUb($bytes, $stream, 5);
        $1.b = readFb($bytes, $stream, bits);
        $1.c = readFb($bytes, $stream, bits);
      } else {
        $1.b = 0;
        $1.c = 0;
      }
      var bits = readUb($bytes, $stream, 5);
      var e = readSb($bytes, $stream, bits);
      var f = readSb($bytes, $stream, bits);
      $1.tx = e / 20;
      $1.ty = f / 20;
      align($bytes, $stream);
      var glyphBits = $.glyphBits = readUi8($bytes, $stream);
      var advanceBits = $.advanceBits = readUi8($bytes, $stream);
      var $2 = $.records = [];
      do {
        var $3 = {};
        align($bytes, $stream);
        var flags = readUb($bytes, $stream, 8);
        var eot = $3.eot = !flags;
        var hasFont = $3.hasFont = flags >> 3 & 1;
        var hasColor = $3.hasColor = flags >> 2 & 1;
        var hasMoveY = $3.hasMoveY = flags >> 1 & 1;
        var hasMoveX = $3.hasMoveX = flags & 1;
        if (hasFont) {
          $3.fontId = readUi16($bytes, $stream);
        }
        if (hasColor) {
          if (tagCode === 33) {
            var $4 = $3.color = {};
            $4.red = readUi8($bytes, $stream);
            $4.green = readUi8($bytes, $stream);
            $4.blue = readUi8($bytes, $stream);
            $4.alpha = readUi8($bytes, $stream);
          } else {
            var $5 = $3.color = {};
            $5.red = readUi8($bytes, $stream);
            $5.green = readUi8($bytes, $stream);
            $5.blue = readUi8($bytes, $stream);
            $5.alpha = 255;
          }
        }
        if (hasMoveX) {
          $3.moveX = readSi16($bytes, $stream);
        }
        if (hasMoveY) {
          $3.moveY = readSi16($bytes, $stream);
        }
        if (hasFont) {
          $3.fontHeight = readUi16($bytes, $stream);
        }
        if (!eot) {
          var tmp = readUi8($bytes, $stream);
          if (swfVersion > 6) {
            var glyphCount = $3.glyphCount = tmp;
          } else {
            var glyphCount = $3.glyphCount = tmp & 127;
          }
          var $6 = $3.entries = [];
          var $7 = glyphCount;
          while ($7--) {
            var $8 = {};
            $8.glyphIndex = readUb($bytes, $stream, glyphBits);
            $8.advance = readSb($bytes, $stream, advanceBits);
            $6.push($8);
          }
        }
        $2.push($3);
      } while (!eot);
      return $;
    },
    12: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      if (tagCode === 59) {
        $.spriteId = readUi16($bytes, $stream);
      }
      $.actionsData = readBinary($bytes, $stream, 0);
      return $;
    },
    14: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var soundFlags = readUi8($bytes, $stream);
      $.soundFormat = soundFlags >> 4 & 15;
      $.soundRate = soundFlags >> 2 & 3;
      $.soundSize = soundFlags >> 1 & 1;
      $.soundType = soundFlags & 1;
      $.samplesCount = readUi32($bytes, $stream);
      $.soundData = readBinary($bytes, $stream, 0);
      return $;
    },
    15: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      if (tagCode == 15) {
        $.soundId = readUi16($bytes, $stream);
      }
      if (tagCode == 89) {
        $.soundClassName = readString($bytes, $stream, 0);
      }
      var $0 = $.soundInfo = {};
      var reserved = readUb($bytes, $stream, 2);
      $0.stop = readUb($bytes, $stream, 1);
      $0.noMultiple = readUb($bytes, $stream, 1);
      var hasEnvelope = $0.hasEnvelope = readUb($bytes, $stream, 1);
      var hasLoops = $0.hasLoops = readUb($bytes, $stream, 1);
      var hasOutPoint = $0.hasOutPoint = readUb($bytes, $stream, 1);
      var hasInPoint = $0.hasInPoint = readUb($bytes, $stream, 1);
      if (hasInPoint) {
        $0.inPoint = readUi32($bytes, $stream);
      }
      if (hasOutPoint) {
        $0.outPoint = readUi32($bytes, $stream);
      }
      if (hasLoops) {
        $0.loopCount = readUi16($bytes, $stream);
      }
      if (hasEnvelope) {
        var envelopeCount = $0.envelopeCount = readUi8($bytes, $stream);
        var $1 = $0.envelopes = [];
        var $2 = envelopeCount;
        while ($2--) {
          var $3 = {};
          $3.pos44 = readUi32($bytes, $stream);
          $3.volumeLeft = readUi16($bytes, $stream);
          $3.volumeRight = readUi16($bytes, $stream);
          $1.push($3);
        }
      }
      return $;
    },
    18: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      var playbackFlags = readUi8($bytes, $stream);
      $.playbackRate = playbackFlags >> 2 & 3;
      $.playbackSize = playbackFlags >> 1 & 1;
      $.playbackType = playbackFlags & 1;
      var streamFlags = readUi8($bytes, $stream);
      var streamCompression = $.streamCompression = streamFlags >> 4 & 15;
      $.streamRate = streamFlags >> 2 & 3;
      $.streamSize = streamFlags >> 1 & 1;
      $.streamType = streamFlags & 1;
      $.samplesCount = readUi32($bytes, $stream);
      if (streamCompression == 2) {
        $.latencySeek = readSi16($bytes, $stream);
      }
      return $;
    },
    19: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.data = readBinary($bytes, $stream, 0);
      return $;
    },
    20: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var format = $.format = readUi8($bytes, $stream);
      $.width = readUi16($bytes, $stream);
      $.height = readUi16($bytes, $stream);
      $.hasAlpha = tagCode === 36;
      if (format === 3) {
        $.colorTableSize = readUi8($bytes, $stream);
      }
      $.bmpData = readBinary($bytes, $stream, 0);
      return $;
    },
    21: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      if (tagCode > 21) {
        var alphaDataOffset = readUi32($bytes, $stream);
        if (tagCode === 90) {
          $.deblock = readFixed8($bytes, $stream);
        }
        var imgData = $.imgData = readBinary($bytes, $stream, alphaDataOffset);
        $.alphaData = readBinary($bytes, $stream, 0);
      } else {
        var imgData = $.imgData = readBinary($bytes, $stream, 0);
      }
      switch (imgData[0] << 8 | imgData[1]) {
      case 65496:
      case 65497:
        $.mimeType = 'image/jpeg';
        break;
      case 35152:
        $.mimeType = 'image/png';
        break;
      case 18249:
        $.mimeType = 'image/gif';
        break;
      default:
        $.mimeType = 'application/octet-stream';
      }
      if (tagCode === 6) {
        $.incomplete = 1;
      }
      return $;
    },
    22: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var $0 = $.bbox = {};
      align($bytes, $stream);
      var bits = readUb($bytes, $stream, 5);
      var xMin = readSb($bytes, $stream, bits);
      var xMax = readSb($bytes, $stream, bits);
      var yMin = readSb($bytes, $stream, bits);
      var yMax = readSb($bytes, $stream, bits);
      $0.left = xMin / 20;
      $0.right = xMax / 20;
      $0.top = yMin / 20;
      $0.bottom = yMax / 20;
      align($bytes, $stream);
      var isMorph = $.isMorph = tagCode === 46 || tagCode === 84;
      if (isMorph) {
        var $1 = $.bboxMorph = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $1.left = xMin / 20;
        $1.right = xMax / 20;
        $1.top = yMin / 20;
        $1.bottom = yMax / 20;
        align($bytes, $stream);
      }
      var hasStrokes = $.hasStrokes = tagCode === 83 || tagCode === 84;
      if (hasStrokes) {
        var $2 = $.strokeBbox = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $2.left = xMin / 20;
        $2.right = xMax / 20;
        $2.top = yMin / 20;
        $2.bottom = yMax / 20;
        align($bytes, $stream);
        if (isMorph) {
          var $3 = $.strokeBboxMorph = {};
          align($bytes, $stream);
          var bits = readUb($bytes, $stream, 5);
          var xMin = readSb($bytes, $stream, bits);
          var xMax = readSb($bytes, $stream, bits);
          var yMin = readSb($bytes, $stream, bits);
          var yMax = readSb($bytes, $stream, bits);
          $3.left = xMin / 20;
          $3.right = xMax / 20;
          $3.top = yMin / 20;
          $3.bottom = yMax / 20;
          align($bytes, $stream);
        }
        var reserved = readUb($bytes, $stream, 5);
        $.fillWinding = readUb($bytes, $stream, 1);
        $.nonScalingStrokes = readUb($bytes, $stream, 1);
        $.scalingStrokes = readUb($bytes, $stream, 1);
      }
      if (isMorph) {
        $.offsetMorph = readUi32($bytes, $stream);
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $4 = $.fillStyles = [];
        var $5 = count;
        while ($5--) {
          var $6 = {};
          var type = $6.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $7 = $6.color = {};
              $7.red = readUi8($bytes, $stream);
              $7.green = readUi8($bytes, $stream);
              $7.blue = readUi8($bytes, $stream);
              $7.alpha = readUi8($bytes, $stream);
            } else {
              var $8 = $6.color = {};
              $8.red = readUi8($bytes, $stream);
              $8.green = readUi8($bytes, $stream);
              $8.blue = readUi8($bytes, $stream);
              $8.alpha = 255;
            }
            if (isMorph) {
              var $9 = $6.colorMorph = {};
              $9.red = readUi8($bytes, $stream);
              $9.green = readUi8($bytes, $stream);
              $9.blue = readUi8($bytes, $stream);
              $9.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $10 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $10.a = readFb($bytes, $stream, bits);
              $10.d = readFb($bytes, $stream, bits);
            } else {
              $10.a = 1;
              $10.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $10.b = readFb($bytes, $stream, bits);
              $10.c = readFb($bytes, $stream, bits);
            } else {
              $10.b = 0;
              $10.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $10.tx = e / 20;
            $10.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $11 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $11.a = readFb($bytes, $stream, bits);
                $11.d = readFb($bytes, $stream, bits);
              } else {
                $11.a = 1;
                $11.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $11.b = readFb($bytes, $stream, bits);
                $11.c = readFb($bytes, $stream, bits);
              } else {
                $11.b = 0;
                $11.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $11.tx = e / 20;
              $11.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $6.spreadMode = readUb($bytes, $stream, 2);
              $6.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $6.count = readUb($bytes, $stream, 4);
            var $12 = $6.records = [];
            var $13 = count;
            while ($13--) {
              var $14 = {};
              $14.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $15 = $14.color = {};
                $15.red = readUi8($bytes, $stream);
                $15.green = readUi8($bytes, $stream);
                $15.blue = readUi8($bytes, $stream);
                $15.alpha = readUi8($bytes, $stream);
              } else {
                var $16 = $14.color = {};
                $16.red = readUi8($bytes, $stream);
                $16.green = readUi8($bytes, $stream);
                $16.blue = readUi8($bytes, $stream);
                $16.alpha = 255;
              }
              if (isMorph) {
                $14.ratioMorph = readUi8($bytes, $stream);
                var $17 = $14.colorMorph = {};
                $17.red = readUi8($bytes, $stream);
                $17.green = readUi8($bytes, $stream);
                $17.blue = readUi8($bytes, $stream);
                $17.alpha = readUi8($bytes, $stream);
              }
              $12.push($14);
            }
            if (type === 19) {
              $6.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $6.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $6.bitmapId = readUi16($bytes, $stream);
            var $18 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $18.a = readFb($bytes, $stream, bits);
              $18.d = readFb($bytes, $stream, bits);
            } else {
              $18.a = 1;
              $18.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $18.b = readFb($bytes, $stream, bits);
              $18.c = readFb($bytes, $stream, bits);
            } else {
              $18.b = 0;
              $18.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $18.tx = e / 20;
            $18.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $19 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $19.a = readFb($bytes, $stream, bits);
                $19.d = readFb($bytes, $stream, bits);
              } else {
                $19.a = 1;
                $19.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $19.b = readFb($bytes, $stream, bits);
                $19.c = readFb($bytes, $stream, bits);
              } else {
                $19.b = 0;
                $19.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $19.tx = e / 20;
              $19.ty = f / 20;
              align($bytes, $stream);
            }
            $6.condition = type === 64 || type === 67;
            break;
          default:
          }
          $4.push($6);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $20 = $.lineStyles = [];
        var $21 = count;
        while ($21--) {
          var $22 = {};
          $22.width = readUi16($bytes, $stream);
          if (isMorph) {
            $22.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $22.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $22.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $22.hasFill = readUb($bytes, $stream, 1);
            $22.noHscale = readUb($bytes, $stream, 1);
            $22.noVscale = readUb($bytes, $stream, 1);
            $22.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $22.noClose = readUb($bytes, $stream, 1);
            $22.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $22.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $23 = $22.fillStyle = {};
              var type = $23.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $24 = $23.color = {};
                  $24.red = readUi8($bytes, $stream);
                  $24.green = readUi8($bytes, $stream);
                  $24.blue = readUi8($bytes, $stream);
                  $24.alpha = readUi8($bytes, $stream);
                } else {
                  var $25 = $23.color = {};
                  $25.red = readUi8($bytes, $stream);
                  $25.green = readUi8($bytes, $stream);
                  $25.blue = readUi8($bytes, $stream);
                  $25.alpha = 255;
                }
                if (isMorph) {
                  var $26 = $23.colorMorph = {};
                  $26.red = readUi8($bytes, $stream);
                  $26.green = readUi8($bytes, $stream);
                  $26.blue = readUi8($bytes, $stream);
                  $26.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $27 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.a = readFb($bytes, $stream, bits);
                  $27.d = readFb($bytes, $stream, bits);
                } else {
                  $27.a = 1;
                  $27.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.b = readFb($bytes, $stream, bits);
                  $27.c = readFb($bytes, $stream, bits);
                } else {
                  $27.b = 0;
                  $27.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $27.tx = e / 20;
                $27.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $28 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.a = readFb($bytes, $stream, bits);
                    $28.d = readFb($bytes, $stream, bits);
                  } else {
                    $28.a = 1;
                    $28.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.b = readFb($bytes, $stream, bits);
                    $28.c = readFb($bytes, $stream, bits);
                  } else {
                    $28.b = 0;
                    $28.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $28.tx = e / 20;
                  $28.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $23.spreadMode = readUb($bytes, $stream, 2);
                  $23.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $23.count = readUb($bytes, $stream, 4);
                var $29 = $23.records = [];
                var $30 = count;
                while ($30--) {
                  var $31 = {};
                  $31.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $32 = $31.color = {};
                    $32.red = readUi8($bytes, $stream);
                    $32.green = readUi8($bytes, $stream);
                    $32.blue = readUi8($bytes, $stream);
                    $32.alpha = readUi8($bytes, $stream);
                  } else {
                    var $33 = $31.color = {};
                    $33.red = readUi8($bytes, $stream);
                    $33.green = readUi8($bytes, $stream);
                    $33.blue = readUi8($bytes, $stream);
                    $33.alpha = 255;
                  }
                  if (isMorph) {
                    $31.ratioMorph = readUi8($bytes, $stream);
                    var $34 = $31.colorMorph = {};
                    $34.red = readUi8($bytes, $stream);
                    $34.green = readUi8($bytes, $stream);
                    $34.blue = readUi8($bytes, $stream);
                    $34.alpha = readUi8($bytes, $stream);
                  }
                  $29.push($31);
                }
                if (type === 19) {
                  $23.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $23.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $23.bitmapId = readUi16($bytes, $stream);
                var $35 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.a = readFb($bytes, $stream, bits);
                  $35.d = readFb($bytes, $stream, bits);
                } else {
                  $35.a = 1;
                  $35.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.b = readFb($bytes, $stream, bits);
                  $35.c = readFb($bytes, $stream, bits);
                } else {
                  $35.b = 0;
                  $35.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $35.tx = e / 20;
                $35.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $36 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.a = readFb($bytes, $stream, bits);
                    $36.d = readFb($bytes, $stream, bits);
                  } else {
                    $36.a = 1;
                    $36.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.b = readFb($bytes, $stream, bits);
                    $36.c = readFb($bytes, $stream, bits);
                  } else {
                    $36.b = 0;
                    $36.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $36.tx = e / 20;
                  $36.ty = f / 20;
                  align($bytes, $stream);
                }
                $23.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $37 = $22.color = {};
              $37.red = readUi8($bytes, $stream);
              $37.green = readUi8($bytes, $stream);
              $37.blue = readUi8($bytes, $stream);
              $37.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $38 = $22.colorMorph = {};
                $38.red = readUi8($bytes, $stream);
                $38.green = readUi8($bytes, $stream);
                $38.blue = readUi8($bytes, $stream);
                $38.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $39 = $22.color = {};
              $39.red = readUi8($bytes, $stream);
              $39.green = readUi8($bytes, $stream);
              $39.blue = readUi8($bytes, $stream);
              $39.alpha = readUi8($bytes, $stream);
            } else {
              var $40 = $22.color = {};
              $40.red = readUi8($bytes, $stream);
              $40.green = readUi8($bytes, $stream);
              $40.blue = readUi8($bytes, $stream);
              $40.alpha = 255;
            }
            if (isMorph) {
              var $41 = $22.colorMorph = {};
              $41.red = readUi8($bytes, $stream);
              $41.green = readUi8($bytes, $stream);
              $41.blue = readUi8($bytes, $stream);
              $41.alpha = readUi8($bytes, $stream);
            }
          }
          $20.push($22);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $42 = $.records = [];
        do {
          var $43 = {};
          var type = $43.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $43.eos = !(type || flags);
          if (type) {
            var isStraight = $43.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $43.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $43.deltaX = readSb($bytes, $stream, bits);
                $43.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $43.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $43.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $43.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $43.controlDeltaX = readSb($bytes, $stream, bits);
              $43.controlDeltaY = readSb($bytes, $stream, bits);
              $43.anchorDeltaX = readSb($bytes, $stream, bits);
              $43.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $43.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $43.hasNewStyles = 0;
            }
            var hasLineStyle = $43.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $43.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $43.hasFillStyle0 = flags >> 1 & 1;
            var move = $43.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $43.moveX = readSb($bytes, $stream, bits);
              $43.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $43.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $43.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $43.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $44 = $43.fillStyles = [];
              var $45 = count;
              while ($45--) {
                var $46 = {};
                var type = $46.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $47 = $46.color = {};
                    $47.red = readUi8($bytes, $stream);
                    $47.green = readUi8($bytes, $stream);
                    $47.blue = readUi8($bytes, $stream);
                    $47.alpha = readUi8($bytes, $stream);
                  } else {
                    var $48 = $46.color = {};
                    $48.red = readUi8($bytes, $stream);
                    $48.green = readUi8($bytes, $stream);
                    $48.blue = readUi8($bytes, $stream);
                    $48.alpha = 255;
                  }
                  if (isMorph) {
                    var $49 = $46.colorMorph = {};
                    $49.red = readUi8($bytes, $stream);
                    $49.green = readUi8($bytes, $stream);
                    $49.blue = readUi8($bytes, $stream);
                    $49.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $50 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.a = readFb($bytes, $stream, bits);
                    $50.d = readFb($bytes, $stream, bits);
                  } else {
                    $50.a = 1;
                    $50.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.b = readFb($bytes, $stream, bits);
                    $50.c = readFb($bytes, $stream, bits);
                  } else {
                    $50.b = 0;
                    $50.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $50.tx = e / 20;
                  $50.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $51 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.a = readFb($bytes, $stream, bits);
                      $51.d = readFb($bytes, $stream, bits);
                    } else {
                      $51.a = 1;
                      $51.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.b = readFb($bytes, $stream, bits);
                      $51.c = readFb($bytes, $stream, bits);
                    } else {
                      $51.b = 0;
                      $51.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $51.tx = e / 20;
                    $51.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $46.spreadMode = readUb($bytes, $stream, 2);
                    $46.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $46.count = readUb($bytes, $stream, 4);
                  var $52 = $46.records = [];
                  var $53 = count;
                  while ($53--) {
                    var $54 = {};
                    $54.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $55 = $54.color = {};
                      $55.red = readUi8($bytes, $stream);
                      $55.green = readUi8($bytes, $stream);
                      $55.blue = readUi8($bytes, $stream);
                      $55.alpha = readUi8($bytes, $stream);
                    } else {
                      var $56 = $54.color = {};
                      $56.red = readUi8($bytes, $stream);
                      $56.green = readUi8($bytes, $stream);
                      $56.blue = readUi8($bytes, $stream);
                      $56.alpha = 255;
                    }
                    if (isMorph) {
                      $54.ratioMorph = readUi8($bytes, $stream);
                      var $57 = $54.colorMorph = {};
                      $57.red = readUi8($bytes, $stream);
                      $57.green = readUi8($bytes, $stream);
                      $57.blue = readUi8($bytes, $stream);
                      $57.alpha = readUi8($bytes, $stream);
                    }
                    $52.push($54);
                  }
                  if (type === 19) {
                    $46.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $46.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $46.bitmapId = readUi16($bytes, $stream);
                  var $58 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.a = readFb($bytes, $stream, bits);
                    $58.d = readFb($bytes, $stream, bits);
                  } else {
                    $58.a = 1;
                    $58.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.b = readFb($bytes, $stream, bits);
                    $58.c = readFb($bytes, $stream, bits);
                  } else {
                    $58.b = 0;
                    $58.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $58.tx = e / 20;
                  $58.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $59 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.a = readFb($bytes, $stream, bits);
                      $59.d = readFb($bytes, $stream, bits);
                    } else {
                      $59.a = 1;
                      $59.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.b = readFb($bytes, $stream, bits);
                      $59.c = readFb($bytes, $stream, bits);
                    } else {
                      $59.b = 0;
                      $59.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $59.tx = e / 20;
                    $59.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $46.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $44.push($46);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $60 = $43.lineStyles = [];
              var $61 = count;
              while ($61--) {
                var $62 = {};
                $62.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $62.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $62.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $62.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $62.hasFill = readUb($bytes, $stream, 1);
                  $62.noHscale = readUb($bytes, $stream, 1);
                  $62.noVscale = readUb($bytes, $stream, 1);
                  $62.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $62.noClose = readUb($bytes, $stream, 1);
                  $62.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $62.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $63 = $62.fillStyle = {};
                    var type = $63.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $64 = $63.color = {};
                        $64.red = readUi8($bytes, $stream);
                        $64.green = readUi8($bytes, $stream);
                        $64.blue = readUi8($bytes, $stream);
                        $64.alpha = readUi8($bytes, $stream);
                      } else {
                        var $65 = $63.color = {};
                        $65.red = readUi8($bytes, $stream);
                        $65.green = readUi8($bytes, $stream);
                        $65.blue = readUi8($bytes, $stream);
                        $65.alpha = 255;
                      }
                      if (isMorph) {
                        var $66 = $63.colorMorph = {};
                        $66.red = readUi8($bytes, $stream);
                        $66.green = readUi8($bytes, $stream);
                        $66.blue = readUi8($bytes, $stream);
                        $66.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $67 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.a = readFb($bytes, $stream, bits);
                        $67.d = readFb($bytes, $stream, bits);
                      } else {
                        $67.a = 1;
                        $67.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.b = readFb($bytes, $stream, bits);
                        $67.c = readFb($bytes, $stream, bits);
                      } else {
                        $67.b = 0;
                        $67.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $67.tx = e / 20;
                      $67.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $68 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.a = readFb($bytes, $stream, bits);
                          $68.d = readFb($bytes, $stream, bits);
                        } else {
                          $68.a = 1;
                          $68.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.b = readFb($bytes, $stream, bits);
                          $68.c = readFb($bytes, $stream, bits);
                        } else {
                          $68.b = 0;
                          $68.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $68.tx = e / 20;
                        $68.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $63.spreadMode = readUb($bytes, $stream, 2);
                        $63.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $63.count = readUb($bytes, $stream, 4);
                      var $69 = $63.records = [];
                      var $70 = count;
                      while ($70--) {
                        var $71 = {};
                        $71.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $72 = $71.color = {};
                          $72.red = readUi8($bytes, $stream);
                          $72.green = readUi8($bytes, $stream);
                          $72.blue = readUi8($bytes, $stream);
                          $72.alpha = readUi8($bytes, $stream);
                        } else {
                          var $73 = $71.color = {};
                          $73.red = readUi8($bytes, $stream);
                          $73.green = readUi8($bytes, $stream);
                          $73.blue = readUi8($bytes, $stream);
                          $73.alpha = 255;
                        }
                        if (isMorph) {
                          $71.ratioMorph = readUi8($bytes, $stream);
                          var $74 = $71.colorMorph = {};
                          $74.red = readUi8($bytes, $stream);
                          $74.green = readUi8($bytes, $stream);
                          $74.blue = readUi8($bytes, $stream);
                          $74.alpha = readUi8($bytes, $stream);
                        }
                        $69.push($71);
                      }
                      if (type === 19) {
                        $63.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $63.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $63.bitmapId = readUi16($bytes, $stream);
                      var $75 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.a = readFb($bytes, $stream, bits);
                        $75.d = readFb($bytes, $stream, bits);
                      } else {
                        $75.a = 1;
                        $75.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.b = readFb($bytes, $stream, bits);
                        $75.c = readFb($bytes, $stream, bits);
                      } else {
                        $75.b = 0;
                        $75.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $75.tx = e / 20;
                      $75.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $76 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.a = readFb($bytes, $stream, bits);
                          $76.d = readFb($bytes, $stream, bits);
                        } else {
                          $76.a = 1;
                          $76.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.b = readFb($bytes, $stream, bits);
                          $76.c = readFb($bytes, $stream, bits);
                        } else {
                          $76.b = 0;
                          $76.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $76.tx = e / 20;
                        $76.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $63.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $77 = $62.color = {};
                    $77.red = readUi8($bytes, $stream);
                    $77.green = readUi8($bytes, $stream);
                    $77.blue = readUi8($bytes, $stream);
                    $77.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $78 = $62.colorMorph = {};
                      $78.red = readUi8($bytes, $stream);
                      $78.green = readUi8($bytes, $stream);
                      $78.blue = readUi8($bytes, $stream);
                      $78.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $79 = $62.color = {};
                    $79.red = readUi8($bytes, $stream);
                    $79.green = readUi8($bytes, $stream);
                    $79.blue = readUi8($bytes, $stream);
                    $79.alpha = readUi8($bytes, $stream);
                  } else {
                    var $80 = $62.color = {};
                    $80.red = readUi8($bytes, $stream);
                    $80.green = readUi8($bytes, $stream);
                    $80.blue = readUi8($bytes, $stream);
                    $80.alpha = 255;
                  }
                  if (isMorph) {
                    var $81 = $62.colorMorph = {};
                    $81.red = readUi8($bytes, $stream);
                    $81.green = readUi8($bytes, $stream);
                    $81.blue = readUi8($bytes, $stream);
                    $81.alpha = readUi8($bytes, $stream);
                  }
                }
                $60.push($62);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $42.push($43);
        } while (!eos);
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $82 = $.recordsMorph = [];
        do {
          var $83 = {};
          var type = $83.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $83.eos = !(type || flags);
          if (type) {
            var isStraight = $83.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $83.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $83.deltaX = readSb($bytes, $stream, bits);
                $83.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $83.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $83.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $83.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $83.controlDeltaX = readSb($bytes, $stream, bits);
              $83.controlDeltaY = readSb($bytes, $stream, bits);
              $83.anchorDeltaX = readSb($bytes, $stream, bits);
              $83.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $83.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $83.hasNewStyles = 0;
            }
            var hasLineStyle = $83.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $83.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $83.hasFillStyle0 = flags >> 1 & 1;
            var move = $83.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $83.moveX = readSb($bytes, $stream, bits);
              $83.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $83.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $83.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $83.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $84 = $83.fillStyles = [];
              var $85 = count;
              while ($85--) {
                var $86 = {};
                var type = $86.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $87 = $86.color = {};
                    $87.red = readUi8($bytes, $stream);
                    $87.green = readUi8($bytes, $stream);
                    $87.blue = readUi8($bytes, $stream);
                    $87.alpha = readUi8($bytes, $stream);
                  } else {
                    var $88 = $86.color = {};
                    $88.red = readUi8($bytes, $stream);
                    $88.green = readUi8($bytes, $stream);
                    $88.blue = readUi8($bytes, $stream);
                    $88.alpha = 255;
                  }
                  if (isMorph) {
                    var $89 = $86.colorMorph = {};
                    $89.red = readUi8($bytes, $stream);
                    $89.green = readUi8($bytes, $stream);
                    $89.blue = readUi8($bytes, $stream);
                    $89.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $90 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.a = readFb($bytes, $stream, bits);
                    $90.d = readFb($bytes, $stream, bits);
                  } else {
                    $90.a = 1;
                    $90.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.b = readFb($bytes, $stream, bits);
                    $90.c = readFb($bytes, $stream, bits);
                  } else {
                    $90.b = 0;
                    $90.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $90.tx = e / 20;
                  $90.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $91 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.a = readFb($bytes, $stream, bits);
                      $91.d = readFb($bytes, $stream, bits);
                    } else {
                      $91.a = 1;
                      $91.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.b = readFb($bytes, $stream, bits);
                      $91.c = readFb($bytes, $stream, bits);
                    } else {
                      $91.b = 0;
                      $91.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $91.tx = e / 20;
                    $91.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $86.spreadMode = readUb($bytes, $stream, 2);
                    $86.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $86.count = readUb($bytes, $stream, 4);
                  var $92 = $86.records = [];
                  var $93 = count;
                  while ($93--) {
                    var $94 = {};
                    $94.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $95 = $94.color = {};
                      $95.red = readUi8($bytes, $stream);
                      $95.green = readUi8($bytes, $stream);
                      $95.blue = readUi8($bytes, $stream);
                      $95.alpha = readUi8($bytes, $stream);
                    } else {
                      var $96 = $94.color = {};
                      $96.red = readUi8($bytes, $stream);
                      $96.green = readUi8($bytes, $stream);
                      $96.blue = readUi8($bytes, $stream);
                      $96.alpha = 255;
                    }
                    if (isMorph) {
                      $94.ratioMorph = readUi8($bytes, $stream);
                      var $97 = $94.colorMorph = {};
                      $97.red = readUi8($bytes, $stream);
                      $97.green = readUi8($bytes, $stream);
                      $97.blue = readUi8($bytes, $stream);
                      $97.alpha = readUi8($bytes, $stream);
                    }
                    $92.push($94);
                  }
                  if (type === 19) {
                    $86.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $86.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $86.bitmapId = readUi16($bytes, $stream);
                  var $98 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.a = readFb($bytes, $stream, bits);
                    $98.d = readFb($bytes, $stream, bits);
                  } else {
                    $98.a = 1;
                    $98.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.b = readFb($bytes, $stream, bits);
                    $98.c = readFb($bytes, $stream, bits);
                  } else {
                    $98.b = 0;
                    $98.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $98.tx = e / 20;
                  $98.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $99 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.a = readFb($bytes, $stream, bits);
                      $99.d = readFb($bytes, $stream, bits);
                    } else {
                      $99.a = 1;
                      $99.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.b = readFb($bytes, $stream, bits);
                      $99.c = readFb($bytes, $stream, bits);
                    } else {
                      $99.b = 0;
                      $99.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $99.tx = e / 20;
                    $99.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $86.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $84.push($86);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $100 = $83.lineStyles = [];
              var $101 = count;
              while ($101--) {
                var $102 = {};
                $102.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $102.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $102.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $102.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $102.hasFill = readUb($bytes, $stream, 1);
                  $102.noHscale = readUb($bytes, $stream, 1);
                  $102.noVscale = readUb($bytes, $stream, 1);
                  $102.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $102.noClose = readUb($bytes, $stream, 1);
                  $102.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $102.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $103 = $102.fillStyle = {};
                    var type = $103.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $104 = $103.color = {};
                        $104.red = readUi8($bytes, $stream);
                        $104.green = readUi8($bytes, $stream);
                        $104.blue = readUi8($bytes, $stream);
                        $104.alpha = readUi8($bytes, $stream);
                      } else {
                        var $105 = $103.color = {};
                        $105.red = readUi8($bytes, $stream);
                        $105.green = readUi8($bytes, $stream);
                        $105.blue = readUi8($bytes, $stream);
                        $105.alpha = 255;
                      }
                      if (isMorph) {
                        var $106 = $103.colorMorph = {};
                        $106.red = readUi8($bytes, $stream);
                        $106.green = readUi8($bytes, $stream);
                        $106.blue = readUi8($bytes, $stream);
                        $106.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $107 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.a = readFb($bytes, $stream, bits);
                        $107.d = readFb($bytes, $stream, bits);
                      } else {
                        $107.a = 1;
                        $107.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.b = readFb($bytes, $stream, bits);
                        $107.c = readFb($bytes, $stream, bits);
                      } else {
                        $107.b = 0;
                        $107.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $107.tx = e / 20;
                      $107.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $108 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.a = readFb($bytes, $stream, bits);
                          $108.d = readFb($bytes, $stream, bits);
                        } else {
                          $108.a = 1;
                          $108.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.b = readFb($bytes, $stream, bits);
                          $108.c = readFb($bytes, $stream, bits);
                        } else {
                          $108.b = 0;
                          $108.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $108.tx = e / 20;
                        $108.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $103.spreadMode = readUb($bytes, $stream, 2);
                        $103.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $103.count = readUb($bytes, $stream, 4);
                      var $109 = $103.records = [];
                      var $110 = count;
                      while ($110--) {
                        var $111 = {};
                        $111.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $112 = $111.color = {};
                          $112.red = readUi8($bytes, $stream);
                          $112.green = readUi8($bytes, $stream);
                          $112.blue = readUi8($bytes, $stream);
                          $112.alpha = readUi8($bytes, $stream);
                        } else {
                          var $113 = $111.color = {};
                          $113.red = readUi8($bytes, $stream);
                          $113.green = readUi8($bytes, $stream);
                          $113.blue = readUi8($bytes, $stream);
                          $113.alpha = 255;
                        }
                        if (isMorph) {
                          $111.ratioMorph = readUi8($bytes, $stream);
                          var $114 = $111.colorMorph = {};
                          $114.red = readUi8($bytes, $stream);
                          $114.green = readUi8($bytes, $stream);
                          $114.blue = readUi8($bytes, $stream);
                          $114.alpha = readUi8($bytes, $stream);
                        }
                        $109.push($111);
                      }
                      if (type === 19) {
                        $103.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $103.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $103.bitmapId = readUi16($bytes, $stream);
                      var $115 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.a = readFb($bytes, $stream, bits);
                        $115.d = readFb($bytes, $stream, bits);
                      } else {
                        $115.a = 1;
                        $115.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.b = readFb($bytes, $stream, bits);
                        $115.c = readFb($bytes, $stream, bits);
                      } else {
                        $115.b = 0;
                        $115.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $115.tx = e / 20;
                      $115.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $116 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.a = readFb($bytes, $stream, bits);
                          $116.d = readFb($bytes, $stream, bits);
                        } else {
                          $116.a = 1;
                          $116.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.b = readFb($bytes, $stream, bits);
                          $116.c = readFb($bytes, $stream, bits);
                        } else {
                          $116.b = 0;
                          $116.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $116.tx = e / 20;
                        $116.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $103.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $117 = $102.color = {};
                    $117.red = readUi8($bytes, $stream);
                    $117.green = readUi8($bytes, $stream);
                    $117.blue = readUi8($bytes, $stream);
                    $117.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $118 = $102.colorMorph = {};
                      $118.red = readUi8($bytes, $stream);
                      $118.green = readUi8($bytes, $stream);
                      $118.blue = readUi8($bytes, $stream);
                      $118.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $119 = $102.color = {};
                    $119.red = readUi8($bytes, $stream);
                    $119.green = readUi8($bytes, $stream);
                    $119.blue = readUi8($bytes, $stream);
                    $119.alpha = readUi8($bytes, $stream);
                  } else {
                    var $120 = $102.color = {};
                    $120.red = readUi8($bytes, $stream);
                    $120.green = readUi8($bytes, $stream);
                    $120.blue = readUi8($bytes, $stream);
                    $120.alpha = 255;
                  }
                  if (isMorph) {
                    var $121 = $102.colorMorph = {};
                    $121.red = readUi8($bytes, $stream);
                    $121.green = readUi8($bytes, $stream);
                    $121.blue = readUi8($bytes, $stream);
                    $121.alpha = readUi8($bytes, $stream);
                  }
                }
                $100.push($102);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $82.push($83);
        } while (!eos);
      } else {
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $122 = $.fillStyles = [];
        var $123 = count;
        while ($123--) {
          var $124 = {};
          var type = $124.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $125 = $124.color = {};
              $125.red = readUi8($bytes, $stream);
              $125.green = readUi8($bytes, $stream);
              $125.blue = readUi8($bytes, $stream);
              $125.alpha = readUi8($bytes, $stream);
            } else {
              var $126 = $124.color = {};
              $126.red = readUi8($bytes, $stream);
              $126.green = readUi8($bytes, $stream);
              $126.blue = readUi8($bytes, $stream);
              $126.alpha = 255;
            }
            if (isMorph) {
              var $127 = $124.colorMorph = {};
              $127.red = readUi8($bytes, $stream);
              $127.green = readUi8($bytes, $stream);
              $127.blue = readUi8($bytes, $stream);
              $127.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $128 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $128.a = readFb($bytes, $stream, bits);
              $128.d = readFb($bytes, $stream, bits);
            } else {
              $128.a = 1;
              $128.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $128.b = readFb($bytes, $stream, bits);
              $128.c = readFb($bytes, $stream, bits);
            } else {
              $128.b = 0;
              $128.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $128.tx = e / 20;
            $128.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $129 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $129.a = readFb($bytes, $stream, bits);
                $129.d = readFb($bytes, $stream, bits);
              } else {
                $129.a = 1;
                $129.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $129.b = readFb($bytes, $stream, bits);
                $129.c = readFb($bytes, $stream, bits);
              } else {
                $129.b = 0;
                $129.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $129.tx = e / 20;
              $129.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $124.spreadMode = readUb($bytes, $stream, 2);
              $124.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $124.count = readUb($bytes, $stream, 4);
            var $130 = $124.records = [];
            var $131 = count;
            while ($131--) {
              var $132 = {};
              $132.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $133 = $132.color = {};
                $133.red = readUi8($bytes, $stream);
                $133.green = readUi8($bytes, $stream);
                $133.blue = readUi8($bytes, $stream);
                $133.alpha = readUi8($bytes, $stream);
              } else {
                var $134 = $132.color = {};
                $134.red = readUi8($bytes, $stream);
                $134.green = readUi8($bytes, $stream);
                $134.blue = readUi8($bytes, $stream);
                $134.alpha = 255;
              }
              if (isMorph) {
                $132.ratioMorph = readUi8($bytes, $stream);
                var $135 = $132.colorMorph = {};
                $135.red = readUi8($bytes, $stream);
                $135.green = readUi8($bytes, $stream);
                $135.blue = readUi8($bytes, $stream);
                $135.alpha = readUi8($bytes, $stream);
              }
              $130.push($132);
            }
            if (type === 19) {
              $124.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $124.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $124.bitmapId = readUi16($bytes, $stream);
            var $136 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $136.a = readFb($bytes, $stream, bits);
              $136.d = readFb($bytes, $stream, bits);
            } else {
              $136.a = 1;
              $136.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $136.b = readFb($bytes, $stream, bits);
              $136.c = readFb($bytes, $stream, bits);
            } else {
              $136.b = 0;
              $136.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $136.tx = e / 20;
            $136.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $137 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $137.a = readFb($bytes, $stream, bits);
                $137.d = readFb($bytes, $stream, bits);
              } else {
                $137.a = 1;
                $137.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $137.b = readFb($bytes, $stream, bits);
                $137.c = readFb($bytes, $stream, bits);
              } else {
                $137.b = 0;
                $137.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $137.tx = e / 20;
              $137.ty = f / 20;
              align($bytes, $stream);
            }
            $124.condition = type === 64 || type === 67;
            break;
          default:
          }
          $122.push($124);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $138 = $.lineStyles = [];
        var $139 = count;
        while ($139--) {
          var $140 = {};
          $140.width = readUi16($bytes, $stream);
          if (isMorph) {
            $140.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $140.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $140.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $140.hasFill = readUb($bytes, $stream, 1);
            $140.noHscale = readUb($bytes, $stream, 1);
            $140.noVscale = readUb($bytes, $stream, 1);
            $140.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $140.noClose = readUb($bytes, $stream, 1);
            $140.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $140.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $141 = $140.fillStyle = {};
              var type = $141.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $142 = $141.color = {};
                  $142.red = readUi8($bytes, $stream);
                  $142.green = readUi8($bytes, $stream);
                  $142.blue = readUi8($bytes, $stream);
                  $142.alpha = readUi8($bytes, $stream);
                } else {
                  var $143 = $141.color = {};
                  $143.red = readUi8($bytes, $stream);
                  $143.green = readUi8($bytes, $stream);
                  $143.blue = readUi8($bytes, $stream);
                  $143.alpha = 255;
                }
                if (isMorph) {
                  var $144 = $141.colorMorph = {};
                  $144.red = readUi8($bytes, $stream);
                  $144.green = readUi8($bytes, $stream);
                  $144.blue = readUi8($bytes, $stream);
                  $144.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $145 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.a = readFb($bytes, $stream, bits);
                  $145.d = readFb($bytes, $stream, bits);
                } else {
                  $145.a = 1;
                  $145.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.b = readFb($bytes, $stream, bits);
                  $145.c = readFb($bytes, $stream, bits);
                } else {
                  $145.b = 0;
                  $145.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $145.tx = e / 20;
                $145.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $146 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.a = readFb($bytes, $stream, bits);
                    $146.d = readFb($bytes, $stream, bits);
                  } else {
                    $146.a = 1;
                    $146.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.b = readFb($bytes, $stream, bits);
                    $146.c = readFb($bytes, $stream, bits);
                  } else {
                    $146.b = 0;
                    $146.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $146.tx = e / 20;
                  $146.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $141.spreadMode = readUb($bytes, $stream, 2);
                  $141.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $141.count = readUb($bytes, $stream, 4);
                var $147 = $141.records = [];
                var $148 = count;
                while ($148--) {
                  var $149 = {};
                  $149.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $150 = $149.color = {};
                    $150.red = readUi8($bytes, $stream);
                    $150.green = readUi8($bytes, $stream);
                    $150.blue = readUi8($bytes, $stream);
                    $150.alpha = readUi8($bytes, $stream);
                  } else {
                    var $151 = $149.color = {};
                    $151.red = readUi8($bytes, $stream);
                    $151.green = readUi8($bytes, $stream);
                    $151.blue = readUi8($bytes, $stream);
                    $151.alpha = 255;
                  }
                  if (isMorph) {
                    $149.ratioMorph = readUi8($bytes, $stream);
                    var $152 = $149.colorMorph = {};
                    $152.red = readUi8($bytes, $stream);
                    $152.green = readUi8($bytes, $stream);
                    $152.blue = readUi8($bytes, $stream);
                    $152.alpha = readUi8($bytes, $stream);
                  }
                  $147.push($149);
                }
                if (type === 19) {
                  $141.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $141.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $141.bitmapId = readUi16($bytes, $stream);
                var $153 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.a = readFb($bytes, $stream, bits);
                  $153.d = readFb($bytes, $stream, bits);
                } else {
                  $153.a = 1;
                  $153.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.b = readFb($bytes, $stream, bits);
                  $153.c = readFb($bytes, $stream, bits);
                } else {
                  $153.b = 0;
                  $153.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $153.tx = e / 20;
                $153.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $154 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.a = readFb($bytes, $stream, bits);
                    $154.d = readFb($bytes, $stream, bits);
                  } else {
                    $154.a = 1;
                    $154.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.b = readFb($bytes, $stream, bits);
                    $154.c = readFb($bytes, $stream, bits);
                  } else {
                    $154.b = 0;
                    $154.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $154.tx = e / 20;
                  $154.ty = f / 20;
                  align($bytes, $stream);
                }
                $141.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $155 = $140.color = {};
              $155.red = readUi8($bytes, $stream);
              $155.green = readUi8($bytes, $stream);
              $155.blue = readUi8($bytes, $stream);
              $155.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $156 = $140.colorMorph = {};
                $156.red = readUi8($bytes, $stream);
                $156.green = readUi8($bytes, $stream);
                $156.blue = readUi8($bytes, $stream);
                $156.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $157 = $140.color = {};
              $157.red = readUi8($bytes, $stream);
              $157.green = readUi8($bytes, $stream);
              $157.blue = readUi8($bytes, $stream);
              $157.alpha = readUi8($bytes, $stream);
            } else {
              var $158 = $140.color = {};
              $158.red = readUi8($bytes, $stream);
              $158.green = readUi8($bytes, $stream);
              $158.blue = readUi8($bytes, $stream);
              $158.alpha = 255;
            }
            if (isMorph) {
              var $159 = $140.colorMorph = {};
              $159.red = readUi8($bytes, $stream);
              $159.green = readUi8($bytes, $stream);
              $159.blue = readUi8($bytes, $stream);
              $159.alpha = readUi8($bytes, $stream);
            }
          }
          $138.push($140);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $160 = $.records = [];
        do {
          var $161 = {};
          var type = $161.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $161.eos = !(type || flags);
          if (type) {
            var isStraight = $161.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $161.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $161.deltaX = readSb($bytes, $stream, bits);
                $161.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $161.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $161.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $161.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $161.controlDeltaX = readSb($bytes, $stream, bits);
              $161.controlDeltaY = readSb($bytes, $stream, bits);
              $161.anchorDeltaX = readSb($bytes, $stream, bits);
              $161.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $161.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $161.hasNewStyles = 0;
            }
            var hasLineStyle = $161.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $161.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $161.hasFillStyle0 = flags >> 1 & 1;
            var move = $161.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $161.moveX = readSb($bytes, $stream, bits);
              $161.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $161.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $161.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $161.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $162 = $161.fillStyles = [];
              var $163 = count;
              while ($163--) {
                var $164 = {};
                var type = $164.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $165 = $164.color = {};
                    $165.red = readUi8($bytes, $stream);
                    $165.green = readUi8($bytes, $stream);
                    $165.blue = readUi8($bytes, $stream);
                    $165.alpha = readUi8($bytes, $stream);
                  } else {
                    var $166 = $164.color = {};
                    $166.red = readUi8($bytes, $stream);
                    $166.green = readUi8($bytes, $stream);
                    $166.blue = readUi8($bytes, $stream);
                    $166.alpha = 255;
                  }
                  if (isMorph) {
                    var $167 = $164.colorMorph = {};
                    $167.red = readUi8($bytes, $stream);
                    $167.green = readUi8($bytes, $stream);
                    $167.blue = readUi8($bytes, $stream);
                    $167.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $168 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.a = readFb($bytes, $stream, bits);
                    $168.d = readFb($bytes, $stream, bits);
                  } else {
                    $168.a = 1;
                    $168.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.b = readFb($bytes, $stream, bits);
                    $168.c = readFb($bytes, $stream, bits);
                  } else {
                    $168.b = 0;
                    $168.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $168.tx = e / 20;
                  $168.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $169 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.a = readFb($bytes, $stream, bits);
                      $169.d = readFb($bytes, $stream, bits);
                    } else {
                      $169.a = 1;
                      $169.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.b = readFb($bytes, $stream, bits);
                      $169.c = readFb($bytes, $stream, bits);
                    } else {
                      $169.b = 0;
                      $169.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $169.tx = e / 20;
                    $169.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $164.spreadMode = readUb($bytes, $stream, 2);
                    $164.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $164.count = readUb($bytes, $stream, 4);
                  var $170 = $164.records = [];
                  var $171 = count;
                  while ($171--) {
                    var $172 = {};
                    $172.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $173 = $172.color = {};
                      $173.red = readUi8($bytes, $stream);
                      $173.green = readUi8($bytes, $stream);
                      $173.blue = readUi8($bytes, $stream);
                      $173.alpha = readUi8($bytes, $stream);
                    } else {
                      var $174 = $172.color = {};
                      $174.red = readUi8($bytes, $stream);
                      $174.green = readUi8($bytes, $stream);
                      $174.blue = readUi8($bytes, $stream);
                      $174.alpha = 255;
                    }
                    if (isMorph) {
                      $172.ratioMorph = readUi8($bytes, $stream);
                      var $175 = $172.colorMorph = {};
                      $175.red = readUi8($bytes, $stream);
                      $175.green = readUi8($bytes, $stream);
                      $175.blue = readUi8($bytes, $stream);
                      $175.alpha = readUi8($bytes, $stream);
                    }
                    $170.push($172);
                  }
                  if (type === 19) {
                    $164.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $164.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $164.bitmapId = readUi16($bytes, $stream);
                  var $176 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.a = readFb($bytes, $stream, bits);
                    $176.d = readFb($bytes, $stream, bits);
                  } else {
                    $176.a = 1;
                    $176.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.b = readFb($bytes, $stream, bits);
                    $176.c = readFb($bytes, $stream, bits);
                  } else {
                    $176.b = 0;
                    $176.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $176.tx = e / 20;
                  $176.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $177 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.a = readFb($bytes, $stream, bits);
                      $177.d = readFb($bytes, $stream, bits);
                    } else {
                      $177.a = 1;
                      $177.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.b = readFb($bytes, $stream, bits);
                      $177.c = readFb($bytes, $stream, bits);
                    } else {
                      $177.b = 0;
                      $177.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $177.tx = e / 20;
                    $177.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $164.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $162.push($164);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $178 = $161.lineStyles = [];
              var $179 = count;
              while ($179--) {
                var $180 = {};
                $180.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $180.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $180.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $180.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $180.hasFill = readUb($bytes, $stream, 1);
                  $180.noHscale = readUb($bytes, $stream, 1);
                  $180.noVscale = readUb($bytes, $stream, 1);
                  $180.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $180.noClose = readUb($bytes, $stream, 1);
                  $180.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $180.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $181 = $180.fillStyle = {};
                    var type = $181.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $182 = $181.color = {};
                        $182.red = readUi8($bytes, $stream);
                        $182.green = readUi8($bytes, $stream);
                        $182.blue = readUi8($bytes, $stream);
                        $182.alpha = readUi8($bytes, $stream);
                      } else {
                        var $183 = $181.color = {};
                        $183.red = readUi8($bytes, $stream);
                        $183.green = readUi8($bytes, $stream);
                        $183.blue = readUi8($bytes, $stream);
                        $183.alpha = 255;
                      }
                      if (isMorph) {
                        var $184 = $181.colorMorph = {};
                        $184.red = readUi8($bytes, $stream);
                        $184.green = readUi8($bytes, $stream);
                        $184.blue = readUi8($bytes, $stream);
                        $184.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $185 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.a = readFb($bytes, $stream, bits);
                        $185.d = readFb($bytes, $stream, bits);
                      } else {
                        $185.a = 1;
                        $185.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.b = readFb($bytes, $stream, bits);
                        $185.c = readFb($bytes, $stream, bits);
                      } else {
                        $185.b = 0;
                        $185.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $185.tx = e / 20;
                      $185.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $186 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.a = readFb($bytes, $stream, bits);
                          $186.d = readFb($bytes, $stream, bits);
                        } else {
                          $186.a = 1;
                          $186.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.b = readFb($bytes, $stream, bits);
                          $186.c = readFb($bytes, $stream, bits);
                        } else {
                          $186.b = 0;
                          $186.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $186.tx = e / 20;
                        $186.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $181.spreadMode = readUb($bytes, $stream, 2);
                        $181.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $181.count = readUb($bytes, $stream, 4);
                      var $187 = $181.records = [];
                      var $188 = count;
                      while ($188--) {
                        var $189 = {};
                        $189.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $190 = $189.color = {};
                          $190.red = readUi8($bytes, $stream);
                          $190.green = readUi8($bytes, $stream);
                          $190.blue = readUi8($bytes, $stream);
                          $190.alpha = readUi8($bytes, $stream);
                        } else {
                          var $191 = $189.color = {};
                          $191.red = readUi8($bytes, $stream);
                          $191.green = readUi8($bytes, $stream);
                          $191.blue = readUi8($bytes, $stream);
                          $191.alpha = 255;
                        }
                        if (isMorph) {
                          $189.ratioMorph = readUi8($bytes, $stream);
                          var $192 = $189.colorMorph = {};
                          $192.red = readUi8($bytes, $stream);
                          $192.green = readUi8($bytes, $stream);
                          $192.blue = readUi8($bytes, $stream);
                          $192.alpha = readUi8($bytes, $stream);
                        }
                        $187.push($189);
                      }
                      if (type === 19) {
                        $181.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $181.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $181.bitmapId = readUi16($bytes, $stream);
                      var $193 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.a = readFb($bytes, $stream, bits);
                        $193.d = readFb($bytes, $stream, bits);
                      } else {
                        $193.a = 1;
                        $193.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.b = readFb($bytes, $stream, bits);
                        $193.c = readFb($bytes, $stream, bits);
                      } else {
                        $193.b = 0;
                        $193.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $193.tx = e / 20;
                      $193.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $194 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.a = readFb($bytes, $stream, bits);
                          $194.d = readFb($bytes, $stream, bits);
                        } else {
                          $194.a = 1;
                          $194.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.b = readFb($bytes, $stream, bits);
                          $194.c = readFb($bytes, $stream, bits);
                        } else {
                          $194.b = 0;
                          $194.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $194.tx = e / 20;
                        $194.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $181.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $195 = $180.color = {};
                    $195.red = readUi8($bytes, $stream);
                    $195.green = readUi8($bytes, $stream);
                    $195.blue = readUi8($bytes, $stream);
                    $195.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $196 = $180.colorMorph = {};
                      $196.red = readUi8($bytes, $stream);
                      $196.green = readUi8($bytes, $stream);
                      $196.blue = readUi8($bytes, $stream);
                      $196.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $197 = $180.color = {};
                    $197.red = readUi8($bytes, $stream);
                    $197.green = readUi8($bytes, $stream);
                    $197.blue = readUi8($bytes, $stream);
                    $197.alpha = readUi8($bytes, $stream);
                  } else {
                    var $198 = $180.color = {};
                    $198.red = readUi8($bytes, $stream);
                    $198.green = readUi8($bytes, $stream);
                    $198.blue = readUi8($bytes, $stream);
                    $198.alpha = 255;
                  }
                  if (isMorph) {
                    var $199 = $180.colorMorph = {};
                    $199.red = readUi8($bytes, $stream);
                    $199.green = readUi8($bytes, $stream);
                    $199.blue = readUi8($bytes, $stream);
                    $199.alpha = readUi8($bytes, $stream);
                  }
                }
                $178.push($180);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $160.push($161);
        } while (!eos);
      }
      return $;
    },
    26: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      if (tagCode > 4) {
        if (tagCode > 26) {
          var flags = readUi16($bytes, $stream);
        } else {
          var flags = readUi8($bytes, $stream);
        }
        var hasEvents = $.hasEvents = flags >> 7 & 1;
        var clip = $.clip = flags >> 6 & 1;
        var hasName = $.hasName = flags >> 5 & 1;
        var hasRatio = $.hasRatio = flags >> 4 & 1;
        var hasCxform = $.hasCxform = flags >> 3 & 1;
        var hasMatrix = $.hasMatrix = flags >> 2 & 1;
        var place = $.place = flags >> 1 & 1;
        var move = $.move = flags & 1;
        if (tagCode === 70) {
          var hasBackgroundColor = $.hasBackgroundColor = flags >> 15 & 1;
          var hasVisibility = $.hasVisibility = flags >> 14 & 1;
          var hasImage = $.hasImage = flags >> 12 & 1;
          var hasClassName = $.hasClassName = flags >> 11 & 1;
          var cache = $.cache = flags >> 10 & 1;
          var blend = $.blend = flags >> 9 & 1;
          var hasFilters = $.hasFilters = flags >> 8 & 1;
        } else {
          var cache = $.cache = 0;
          var blend = $.blend = 0;
          var hasFilters = $.hasFilters = 0;
        }
        $.depth = readUi16($bytes, $stream);
        if (hasClassName) {
          $.className = readString($bytes, $stream, 0);
        }
        if (place) {
          $.symbolId = readUi16($bytes, $stream);
        }
        if (hasMatrix) {
          var $0 = $.matrix = {};
          align($bytes, $stream);
          var hasScale = readUb($bytes, $stream, 1);
          if (hasScale) {
            var bits = readUb($bytes, $stream, 5);
            $0.a = readFb($bytes, $stream, bits);
            $0.d = readFb($bytes, $stream, bits);
          } else {
            $0.a = 1;
            $0.d = 1;
          }
          var hasRotate = readUb($bytes, $stream, 1);
          if (hasRotate) {
            var bits = readUb($bytes, $stream, 5);
            $0.b = readFb($bytes, $stream, bits);
            $0.c = readFb($bytes, $stream, bits);
          } else {
            $0.b = 0;
            $0.c = 0;
          }
          var bits = readUb($bytes, $stream, 5);
          var e = readSb($bytes, $stream, bits);
          var f = readSb($bytes, $stream, bits);
          $0.tx = e / 20;
          $0.ty = f / 20;
          align($bytes, $stream);
        }
        if (hasCxform) {
          var $1 = $.cxform = {};
          align($bytes, $stream);
          var hasOffsets = readUb($bytes, $stream, 1);
          var hasMultipliers = readUb($bytes, $stream, 1);
          var bits = readUb($bytes, $stream, 4);
          if (hasMultipliers) {
            $1.redMultiplier = readSb($bytes, $stream, bits);
            $1.greenMultiplier = readSb($bytes, $stream, bits);
            $1.blueMultiplier = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $1.alphaMultiplier = readSb($bytes, $stream, bits);
            } else {
              $1.alphaMultiplier = 256;
            }
          } else {
            $1.redMultiplier = 256;
            $1.greenMultiplier = 256;
            $1.blueMultiplier = 256;
            $1.alphaMultiplier = 256;
          }
          if (hasOffsets) {
            $1.redOffset = readSb($bytes, $stream, bits);
            $1.greenOffset = readSb($bytes, $stream, bits);
            $1.blueOffset = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $1.alphaOffset = readSb($bytes, $stream, bits);
            } else {
              $1.alphaOffset = 0;
            }
          } else {
            $1.redOffset = 0;
            $1.greenOffset = 0;
            $1.blueOffset = 0;
            $1.alphaOffset = 0;
          }
          align($bytes, $stream);
        }
        if (hasRatio) {
          $.ratio = readUi16($bytes, $stream);
        }
        if (hasName) {
          $.name = readString($bytes, $stream, 0);
        }
        if (clip) {
          $.clipDepth = readUi16($bytes, $stream);
        }
        if (hasFilters) {
          var count = readUi8($bytes, $stream);
          var $2 = $.filters = [];
          var $3 = count;
          while ($3--) {
            var $4 = {};
            var type = $4.type = readUi8($bytes, $stream);
            switch (type) {
            case 0:
              if (type === 4 || type === 7) {
                var count = readUi8($bytes, $stream);
              } else {
                var count = 1;
              }
              var $5 = $4.colors = [];
              var $6 = count;
              while ($6--) {
                var $7 = {};
                $7.red = readUi8($bytes, $stream);
                $7.green = readUi8($bytes, $stream);
                $7.blue = readUi8($bytes, $stream);
                $7.alpha = readUi8($bytes, $stream);
                $5.push($7);
              }
              if (type === 3) {
                var $8 = $4.higlightColor = {};
                $8.red = readUi8($bytes, $stream);
                $8.green = readUi8($bytes, $stream);
                $8.blue = readUi8($bytes, $stream);
                $8.alpha = readUi8($bytes, $stream);
              }
              if (type === 4 || type === 7) {
                var $9 = $4.ratios = [];
                var $10 = count;
                while ($10--) {
                  $9.push(readUi8($bytes, $stream));
                }
              }
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              if (type !== 2) {
                $4.angle = readFixed($bytes, $stream);
                $4.distance = readFixed($bytes, $stream);
              }
              $4.strength = readFixed8($bytes, $stream);
              $4.innerShadow = readUb($bytes, $stream, 1);
              $4.knockout = readUb($bytes, $stream, 1);
              $4.compositeSource = readUb($bytes, $stream, 1);
              if (type === 3) {
                $4.onTop = readUb($bytes, $stream, 1);
              } else {
                var reserved = readUb($bytes, $stream, 1);
              }
              if (type === 4 || type === 7) {
                $4.passes = readUb($bytes, $stream, 4);
              } else {
                var reserved = readUb($bytes, $stream, 4);
              }
              break;
            case 1:
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              $4.passes = readUb($bytes, $stream, 5);
              var reserved = readUb($bytes, $stream, 3);
              break;
            case 2:
            case 3:
            case 4:
              if (type === 4 || type === 7) {
                var count = readUi8($bytes, $stream);
              } else {
                var count = 1;
              }
              var $11 = $4.colors = [];
              var $12 = count;
              while ($12--) {
                var $13 = {};
                $13.red = readUi8($bytes, $stream);
                $13.green = readUi8($bytes, $stream);
                $13.blue = readUi8($bytes, $stream);
                $13.alpha = readUi8($bytes, $stream);
                $11.push($13);
              }
              if (type === 3) {
                var $14 = $4.higlightColor = {};
                $14.red = readUi8($bytes, $stream);
                $14.green = readUi8($bytes, $stream);
                $14.blue = readUi8($bytes, $stream);
                $14.alpha = readUi8($bytes, $stream);
              }
              if (type === 4 || type === 7) {
                var $15 = $4.ratios = [];
                var $16 = count;
                while ($16--) {
                  $15.push(readUi8($bytes, $stream));
                }
              }
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              if (type !== 2) {
                $4.angle = readFixed($bytes, $stream);
                $4.distance = readFixed($bytes, $stream);
              }
              $4.strength = readFixed8($bytes, $stream);
              $4.innerShadow = readUb($bytes, $stream, 1);
              $4.knockout = readUb($bytes, $stream, 1);
              $4.compositeSource = readUb($bytes, $stream, 1);
              if (type === 3) {
                $4.onTop = readUb($bytes, $stream, 1);
              } else {
                var reserved = readUb($bytes, $stream, 1);
              }
              if (type === 4 || type === 7) {
                $4.passes = readUb($bytes, $stream, 4);
              } else {
                var reserved = readUb($bytes, $stream, 4);
              }
              break;
            case 5:
              $4.columns = readUi8($bytes, $stream);
              $4.rows = readUi8($bytes, $stream);
              $4.divisor = readFloat($bytes, $stream);
              $4.bias = readFloat($bytes, $stream);
              var $17 = $4.weights = [];
              var $18 = columns * rows;
              while ($18--) {
                $17.push(readFloat($bytes, $stream));
              }
              var $19 = $4.defaultColor = {};
              $19.red = readUi8($bytes, $stream);
              $19.green = readUi8($bytes, $stream);
              $19.blue = readUi8($bytes, $stream);
              $19.alpha = readUi8($bytes, $stream);
              var reserved = readUb($bytes, $stream, 6);
              $4.clamp = readUb($bytes, $stream, 1);
              $4.preserveAlpha = readUb($bytes, $stream, 1);
              break;
            case 6:
              var $20 = $4.matrix = [];
              var $21 = 20;
              while ($21--) {
                $20.push(readFloat($bytes, $stream));
              }
              break;
            case 7:
              if (type === 4 || type === 7) {
                var count = readUi8($bytes, $stream);
              } else {
                var count = 1;
              }
              var $22 = $4.colors = [];
              var $23 = count;
              while ($23--) {
                var $24 = {};
                $24.red = readUi8($bytes, $stream);
                $24.green = readUi8($bytes, $stream);
                $24.blue = readUi8($bytes, $stream);
                $24.alpha = readUi8($bytes, $stream);
                $22.push($24);
              }
              if (type === 3) {
                var $25 = $4.higlightColor = {};
                $25.red = readUi8($bytes, $stream);
                $25.green = readUi8($bytes, $stream);
                $25.blue = readUi8($bytes, $stream);
                $25.alpha = readUi8($bytes, $stream);
              }
              if (type === 4 || type === 7) {
                var $26 = $4.ratios = [];
                var $27 = count;
                while ($27--) {
                  $26.push(readUi8($bytes, $stream));
                }
              }
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              if (type !== 2) {
                $4.angle = readFixed($bytes, $stream);
                $4.distance = readFixed($bytes, $stream);
              }
              $4.strength = readFixed8($bytes, $stream);
              $4.innerShadow = readUb($bytes, $stream, 1);
              $4.knockout = readUb($bytes, $stream, 1);
              $4.compositeSource = readUb($bytes, $stream, 1);
              if (type === 3) {
                $4.onTop = readUb($bytes, $stream, 1);
              } else {
                var reserved = readUb($bytes, $stream, 1);
              }
              if (type === 4 || type === 7) {
                $4.passes = readUb($bytes, $stream, 4);
              } else {
                var reserved = readUb($bytes, $stream, 4);
              }
              break;
            default:
            }
            $2.push($4);
          }
        }
        if (blend) {
          $.blendMode = readUi8($bytes, $stream);
        }
        if (cache) {
          $.bmpCache = readUi8($bytes, $stream);
        }
        if (hasEvents) {
          var reserved = readUi16($bytes, $stream);
          if (swfVersion >= 6) {
            var allFlags = readUi32($bytes, $stream);
          } else {
            var allFlags = readUi16($bytes, $stream);
          }
          var $28 = $.events = [];
          do {
            var $29 = {};
            if (swfVersion >= 6) {
              var flags = readUi32($bytes, $stream);
            } else {
              var flags = readUi16($bytes, $stream);
            }
            var eoe = $29.eoe = !flags;
            $29.onKeyUp = flags >> 7 & 1;
            $29.onKeyDown = flags >> 6 & 1;
            $29.onMouseUp = flags >> 5 & 1;
            $29.onMouseDown = flags >> 4 & 1;
            $29.onMouseMove = flags >> 3 & 1;
            $29.onUnload = flags >> 2 & 1;
            $29.onEnterFrame = flags >> 1 & 1;
            $29.onLoad = flags & 1;
            if (swfVersion >= 6) {
              $29.onDragOver = flags >> 15 & 1;
              $29.onRollOut = flags >> 14 & 1;
              $29.onRollOver = flags >> 13 & 1;
              $29.onReleaseOutside = flags >> 12 & 1;
              $29.onRelease = flags >> 11 & 1;
              $29.onPress = flags >> 10 & 1;
              $29.onInitialize = flags >> 9 & 1;
              $29.onData = flags >> 8 & 1;
              if (swfVersion >= 7) {
                $29.onConstruct = flags >> 18 & 1;
              } else {
                $29.onConstruct = 0;
              }
              var keyPress = $29.keyPress = flags >> 17 & 1;
              $29.onDragOut = flags >> 16 & 1;
            }
            if (!eoe) {
              var length = $29.length = readUi32($bytes, $stream);
              if (keyPress) {
                $29.keyCode = readUi8($bytes, $stream);
              }
              $29.actionsData = readBinary($bytes, $stream, length - (keyPress ? 1 : 0));
            }
            $28.push($29);
          } while (!eoe);
        }
        if (hasBackgroundColor) {
          $.backgroundColor = ARGB;
        }
        if (hasVisibility) {
          $.visibility = readUi8($bytes, $stream);
        }
      } else {
        $.place = 1;
        $.symbolId = readUi16($bytes, $stream);
        $.depth = readUi16($bytes, $stream);
        $.hasMatrix = 1;
        var $30 = $.matrix = {};
        align($bytes, $stream);
        var hasScale = readUb($bytes, $stream, 1);
        if (hasScale) {
          var bits = readUb($bytes, $stream, 5);
          $30.a = readFb($bytes, $stream, bits);
          $30.d = readFb($bytes, $stream, bits);
        } else {
          $30.a = 1;
          $30.d = 1;
        }
        var hasRotate = readUb($bytes, $stream, 1);
        if (hasRotate) {
          var bits = readUb($bytes, $stream, 5);
          $30.b = readFb($bytes, $stream, bits);
          $30.c = readFb($bytes, $stream, bits);
        } else {
          $30.b = 0;
          $30.c = 0;
        }
        var bits = readUb($bytes, $stream, 5);
        var e = readSb($bytes, $stream, bits);
        var f = readSb($bytes, $stream, bits);
        $30.tx = e / 20;
        $30.ty = f / 20;
        align($bytes, $stream);
        if ($stream.remaining()) {
          $.hasCxform = 1;
          var $31 = $.cxform = {};
          align($bytes, $stream);
          var hasOffsets = readUb($bytes, $stream, 1);
          var hasMultipliers = readUb($bytes, $stream, 1);
          var bits = readUb($bytes, $stream, 4);
          if (hasMultipliers) {
            $31.redMultiplier = readSb($bytes, $stream, bits);
            $31.greenMultiplier = readSb($bytes, $stream, bits);
            $31.blueMultiplier = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $31.alphaMultiplier = readSb($bytes, $stream, bits);
            } else {
              $31.alphaMultiplier = 256;
            }
          } else {
            $31.redMultiplier = 256;
            $31.greenMultiplier = 256;
            $31.blueMultiplier = 256;
            $31.alphaMultiplier = 256;
          }
          if (hasOffsets) {
            $31.redOffset = readSb($bytes, $stream, bits);
            $31.greenOffset = readSb($bytes, $stream, bits);
            $31.blueOffset = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $31.alphaOffset = readSb($bytes, $stream, bits);
            } else {
              $31.alphaOffset = 0;
            }
          } else {
            $31.redOffset = 0;
            $31.greenOffset = 0;
            $31.blueOffset = 0;
            $31.alphaOffset = 0;
          }
          align($bytes, $stream);
        }
      }
      return $;
    },
    28: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      if (tagCode === 5) {
        $.symbolId = readUi16($bytes, $stream);
      }
      $.depth = readUi16($bytes, $stream);
      return $;
    },
    32: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var $0 = $.bbox = {};
      align($bytes, $stream);
      var bits = readUb($bytes, $stream, 5);
      var xMin = readSb($bytes, $stream, bits);
      var xMax = readSb($bytes, $stream, bits);
      var yMin = readSb($bytes, $stream, bits);
      var yMax = readSb($bytes, $stream, bits);
      $0.left = xMin / 20;
      $0.right = xMax / 20;
      $0.top = yMin / 20;
      $0.bottom = yMax / 20;
      align($bytes, $stream);
      var isMorph = $.isMorph = tagCode === 46 || tagCode === 84;
      if (isMorph) {
        var $1 = $.bboxMorph = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $1.left = xMin / 20;
        $1.right = xMax / 20;
        $1.top = yMin / 20;
        $1.bottom = yMax / 20;
        align($bytes, $stream);
      }
      var hasStrokes = $.hasStrokes = tagCode === 83 || tagCode === 84;
      if (hasStrokes) {
        var $2 = $.strokeBbox = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $2.left = xMin / 20;
        $2.right = xMax / 20;
        $2.top = yMin / 20;
        $2.bottom = yMax / 20;
        align($bytes, $stream);
        if (isMorph) {
          var $3 = $.strokeBboxMorph = {};
          align($bytes, $stream);
          var bits = readUb($bytes, $stream, 5);
          var xMin = readSb($bytes, $stream, bits);
          var xMax = readSb($bytes, $stream, bits);
          var yMin = readSb($bytes, $stream, bits);
          var yMax = readSb($bytes, $stream, bits);
          $3.left = xMin / 20;
          $3.right = xMax / 20;
          $3.top = yMin / 20;
          $3.bottom = yMax / 20;
          align($bytes, $stream);
        }
        var reserved = readUb($bytes, $stream, 5);
        $.fillWinding = readUb($bytes, $stream, 1);
        $.nonScalingStrokes = readUb($bytes, $stream, 1);
        $.scalingStrokes = readUb($bytes, $stream, 1);
      }
      if (isMorph) {
        $.offsetMorph = readUi32($bytes, $stream);
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $4 = $.fillStyles = [];
        var $5 = count;
        while ($5--) {
          var $6 = {};
          var type = $6.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $7 = $6.color = {};
              $7.red = readUi8($bytes, $stream);
              $7.green = readUi8($bytes, $stream);
              $7.blue = readUi8($bytes, $stream);
              $7.alpha = readUi8($bytes, $stream);
            } else {
              var $8 = $6.color = {};
              $8.red = readUi8($bytes, $stream);
              $8.green = readUi8($bytes, $stream);
              $8.blue = readUi8($bytes, $stream);
              $8.alpha = 255;
            }
            if (isMorph) {
              var $9 = $6.colorMorph = {};
              $9.red = readUi8($bytes, $stream);
              $9.green = readUi8($bytes, $stream);
              $9.blue = readUi8($bytes, $stream);
              $9.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $10 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $10.a = readFb($bytes, $stream, bits);
              $10.d = readFb($bytes, $stream, bits);
            } else {
              $10.a = 1;
              $10.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $10.b = readFb($bytes, $stream, bits);
              $10.c = readFb($bytes, $stream, bits);
            } else {
              $10.b = 0;
              $10.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $10.tx = e / 20;
            $10.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $11 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $11.a = readFb($bytes, $stream, bits);
                $11.d = readFb($bytes, $stream, bits);
              } else {
                $11.a = 1;
                $11.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $11.b = readFb($bytes, $stream, bits);
                $11.c = readFb($bytes, $stream, bits);
              } else {
                $11.b = 0;
                $11.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $11.tx = e / 20;
              $11.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $6.spreadMode = readUb($bytes, $stream, 2);
              $6.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $6.count = readUb($bytes, $stream, 4);
            var $12 = $6.records = [];
            var $13 = count;
            while ($13--) {
              var $14 = {};
              $14.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $15 = $14.color = {};
                $15.red = readUi8($bytes, $stream);
                $15.green = readUi8($bytes, $stream);
                $15.blue = readUi8($bytes, $stream);
                $15.alpha = readUi8($bytes, $stream);
              } else {
                var $16 = $14.color = {};
                $16.red = readUi8($bytes, $stream);
                $16.green = readUi8($bytes, $stream);
                $16.blue = readUi8($bytes, $stream);
                $16.alpha = 255;
              }
              if (isMorph) {
                $14.ratioMorph = readUi8($bytes, $stream);
                var $17 = $14.colorMorph = {};
                $17.red = readUi8($bytes, $stream);
                $17.green = readUi8($bytes, $stream);
                $17.blue = readUi8($bytes, $stream);
                $17.alpha = readUi8($bytes, $stream);
              }
              $12.push($14);
            }
            if (type === 19) {
              $6.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $6.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $6.bitmapId = readUi16($bytes, $stream);
            var $18 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $18.a = readFb($bytes, $stream, bits);
              $18.d = readFb($bytes, $stream, bits);
            } else {
              $18.a = 1;
              $18.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $18.b = readFb($bytes, $stream, bits);
              $18.c = readFb($bytes, $stream, bits);
            } else {
              $18.b = 0;
              $18.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $18.tx = e / 20;
            $18.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $19 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $19.a = readFb($bytes, $stream, bits);
                $19.d = readFb($bytes, $stream, bits);
              } else {
                $19.a = 1;
                $19.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $19.b = readFb($bytes, $stream, bits);
                $19.c = readFb($bytes, $stream, bits);
              } else {
                $19.b = 0;
                $19.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $19.tx = e / 20;
              $19.ty = f / 20;
              align($bytes, $stream);
            }
            $6.condition = type === 64 || type === 67;
            break;
          default:
          }
          $4.push($6);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $20 = $.lineStyles = [];
        var $21 = count;
        while ($21--) {
          var $22 = {};
          $22.width = readUi16($bytes, $stream);
          if (isMorph) {
            $22.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $22.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $22.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $22.hasFill = readUb($bytes, $stream, 1);
            $22.noHscale = readUb($bytes, $stream, 1);
            $22.noVscale = readUb($bytes, $stream, 1);
            $22.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $22.noClose = readUb($bytes, $stream, 1);
            $22.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $22.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $23 = $22.fillStyle = {};
              var type = $23.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $24 = $23.color = {};
                  $24.red = readUi8($bytes, $stream);
                  $24.green = readUi8($bytes, $stream);
                  $24.blue = readUi8($bytes, $stream);
                  $24.alpha = readUi8($bytes, $stream);
                } else {
                  var $25 = $23.color = {};
                  $25.red = readUi8($bytes, $stream);
                  $25.green = readUi8($bytes, $stream);
                  $25.blue = readUi8($bytes, $stream);
                  $25.alpha = 255;
                }
                if (isMorph) {
                  var $26 = $23.colorMorph = {};
                  $26.red = readUi8($bytes, $stream);
                  $26.green = readUi8($bytes, $stream);
                  $26.blue = readUi8($bytes, $stream);
                  $26.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $27 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.a = readFb($bytes, $stream, bits);
                  $27.d = readFb($bytes, $stream, bits);
                } else {
                  $27.a = 1;
                  $27.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.b = readFb($bytes, $stream, bits);
                  $27.c = readFb($bytes, $stream, bits);
                } else {
                  $27.b = 0;
                  $27.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $27.tx = e / 20;
                $27.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $28 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.a = readFb($bytes, $stream, bits);
                    $28.d = readFb($bytes, $stream, bits);
                  } else {
                    $28.a = 1;
                    $28.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.b = readFb($bytes, $stream, bits);
                    $28.c = readFb($bytes, $stream, bits);
                  } else {
                    $28.b = 0;
                    $28.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $28.tx = e / 20;
                  $28.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $23.spreadMode = readUb($bytes, $stream, 2);
                  $23.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $23.count = readUb($bytes, $stream, 4);
                var $29 = $23.records = [];
                var $30 = count;
                while ($30--) {
                  var $31 = {};
                  $31.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $32 = $31.color = {};
                    $32.red = readUi8($bytes, $stream);
                    $32.green = readUi8($bytes, $stream);
                    $32.blue = readUi8($bytes, $stream);
                    $32.alpha = readUi8($bytes, $stream);
                  } else {
                    var $33 = $31.color = {};
                    $33.red = readUi8($bytes, $stream);
                    $33.green = readUi8($bytes, $stream);
                    $33.blue = readUi8($bytes, $stream);
                    $33.alpha = 255;
                  }
                  if (isMorph) {
                    $31.ratioMorph = readUi8($bytes, $stream);
                    var $34 = $31.colorMorph = {};
                    $34.red = readUi8($bytes, $stream);
                    $34.green = readUi8($bytes, $stream);
                    $34.blue = readUi8($bytes, $stream);
                    $34.alpha = readUi8($bytes, $stream);
                  }
                  $29.push($31);
                }
                if (type === 19) {
                  $23.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $23.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $23.bitmapId = readUi16($bytes, $stream);
                var $35 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.a = readFb($bytes, $stream, bits);
                  $35.d = readFb($bytes, $stream, bits);
                } else {
                  $35.a = 1;
                  $35.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.b = readFb($bytes, $stream, bits);
                  $35.c = readFb($bytes, $stream, bits);
                } else {
                  $35.b = 0;
                  $35.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $35.tx = e / 20;
                $35.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $36 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.a = readFb($bytes, $stream, bits);
                    $36.d = readFb($bytes, $stream, bits);
                  } else {
                    $36.a = 1;
                    $36.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.b = readFb($bytes, $stream, bits);
                    $36.c = readFb($bytes, $stream, bits);
                  } else {
                    $36.b = 0;
                    $36.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $36.tx = e / 20;
                  $36.ty = f / 20;
                  align($bytes, $stream);
                }
                $23.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $37 = $22.color = {};
              $37.red = readUi8($bytes, $stream);
              $37.green = readUi8($bytes, $stream);
              $37.blue = readUi8($bytes, $stream);
              $37.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $38 = $22.colorMorph = {};
                $38.red = readUi8($bytes, $stream);
                $38.green = readUi8($bytes, $stream);
                $38.blue = readUi8($bytes, $stream);
                $38.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $39 = $22.color = {};
              $39.red = readUi8($bytes, $stream);
              $39.green = readUi8($bytes, $stream);
              $39.blue = readUi8($bytes, $stream);
              $39.alpha = readUi8($bytes, $stream);
            } else {
              var $40 = $22.color = {};
              $40.red = readUi8($bytes, $stream);
              $40.green = readUi8($bytes, $stream);
              $40.blue = readUi8($bytes, $stream);
              $40.alpha = 255;
            }
            if (isMorph) {
              var $41 = $22.colorMorph = {};
              $41.red = readUi8($bytes, $stream);
              $41.green = readUi8($bytes, $stream);
              $41.blue = readUi8($bytes, $stream);
              $41.alpha = readUi8($bytes, $stream);
            }
          }
          $20.push($22);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $42 = $.records = [];
        do {
          var $43 = {};
          var type = $43.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $43.eos = !(type || flags);
          if (type) {
            var isStraight = $43.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $43.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $43.deltaX = readSb($bytes, $stream, bits);
                $43.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $43.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $43.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $43.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $43.controlDeltaX = readSb($bytes, $stream, bits);
              $43.controlDeltaY = readSb($bytes, $stream, bits);
              $43.anchorDeltaX = readSb($bytes, $stream, bits);
              $43.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $43.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $43.hasNewStyles = 0;
            }
            var hasLineStyle = $43.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $43.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $43.hasFillStyle0 = flags >> 1 & 1;
            var move = $43.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $43.moveX = readSb($bytes, $stream, bits);
              $43.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $43.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $43.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $43.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $44 = $43.fillStyles = [];
              var $45 = count;
              while ($45--) {
                var $46 = {};
                var type = $46.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $47 = $46.color = {};
                    $47.red = readUi8($bytes, $stream);
                    $47.green = readUi8($bytes, $stream);
                    $47.blue = readUi8($bytes, $stream);
                    $47.alpha = readUi8($bytes, $stream);
                  } else {
                    var $48 = $46.color = {};
                    $48.red = readUi8($bytes, $stream);
                    $48.green = readUi8($bytes, $stream);
                    $48.blue = readUi8($bytes, $stream);
                    $48.alpha = 255;
                  }
                  if (isMorph) {
                    var $49 = $46.colorMorph = {};
                    $49.red = readUi8($bytes, $stream);
                    $49.green = readUi8($bytes, $stream);
                    $49.blue = readUi8($bytes, $stream);
                    $49.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $50 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.a = readFb($bytes, $stream, bits);
                    $50.d = readFb($bytes, $stream, bits);
                  } else {
                    $50.a = 1;
                    $50.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.b = readFb($bytes, $stream, bits);
                    $50.c = readFb($bytes, $stream, bits);
                  } else {
                    $50.b = 0;
                    $50.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $50.tx = e / 20;
                  $50.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $51 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.a = readFb($bytes, $stream, bits);
                      $51.d = readFb($bytes, $stream, bits);
                    } else {
                      $51.a = 1;
                      $51.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.b = readFb($bytes, $stream, bits);
                      $51.c = readFb($bytes, $stream, bits);
                    } else {
                      $51.b = 0;
                      $51.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $51.tx = e / 20;
                    $51.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $46.spreadMode = readUb($bytes, $stream, 2);
                    $46.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $46.count = readUb($bytes, $stream, 4);
                  var $52 = $46.records = [];
                  var $53 = count;
                  while ($53--) {
                    var $54 = {};
                    $54.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $55 = $54.color = {};
                      $55.red = readUi8($bytes, $stream);
                      $55.green = readUi8($bytes, $stream);
                      $55.blue = readUi8($bytes, $stream);
                      $55.alpha = readUi8($bytes, $stream);
                    } else {
                      var $56 = $54.color = {};
                      $56.red = readUi8($bytes, $stream);
                      $56.green = readUi8($bytes, $stream);
                      $56.blue = readUi8($bytes, $stream);
                      $56.alpha = 255;
                    }
                    if (isMorph) {
                      $54.ratioMorph = readUi8($bytes, $stream);
                      var $57 = $54.colorMorph = {};
                      $57.red = readUi8($bytes, $stream);
                      $57.green = readUi8($bytes, $stream);
                      $57.blue = readUi8($bytes, $stream);
                      $57.alpha = readUi8($bytes, $stream);
                    }
                    $52.push($54);
                  }
                  if (type === 19) {
                    $46.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $46.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $46.bitmapId = readUi16($bytes, $stream);
                  var $58 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.a = readFb($bytes, $stream, bits);
                    $58.d = readFb($bytes, $stream, bits);
                  } else {
                    $58.a = 1;
                    $58.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.b = readFb($bytes, $stream, bits);
                    $58.c = readFb($bytes, $stream, bits);
                  } else {
                    $58.b = 0;
                    $58.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $58.tx = e / 20;
                  $58.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $59 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.a = readFb($bytes, $stream, bits);
                      $59.d = readFb($bytes, $stream, bits);
                    } else {
                      $59.a = 1;
                      $59.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.b = readFb($bytes, $stream, bits);
                      $59.c = readFb($bytes, $stream, bits);
                    } else {
                      $59.b = 0;
                      $59.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $59.tx = e / 20;
                    $59.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $46.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $44.push($46);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $60 = $43.lineStyles = [];
              var $61 = count;
              while ($61--) {
                var $62 = {};
                $62.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $62.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $62.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $62.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $62.hasFill = readUb($bytes, $stream, 1);
                  $62.noHscale = readUb($bytes, $stream, 1);
                  $62.noVscale = readUb($bytes, $stream, 1);
                  $62.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $62.noClose = readUb($bytes, $stream, 1);
                  $62.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $62.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $63 = $62.fillStyle = {};
                    var type = $63.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $64 = $63.color = {};
                        $64.red = readUi8($bytes, $stream);
                        $64.green = readUi8($bytes, $stream);
                        $64.blue = readUi8($bytes, $stream);
                        $64.alpha = readUi8($bytes, $stream);
                      } else {
                        var $65 = $63.color = {};
                        $65.red = readUi8($bytes, $stream);
                        $65.green = readUi8($bytes, $stream);
                        $65.blue = readUi8($bytes, $stream);
                        $65.alpha = 255;
                      }
                      if (isMorph) {
                        var $66 = $63.colorMorph = {};
                        $66.red = readUi8($bytes, $stream);
                        $66.green = readUi8($bytes, $stream);
                        $66.blue = readUi8($bytes, $stream);
                        $66.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $67 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.a = readFb($bytes, $stream, bits);
                        $67.d = readFb($bytes, $stream, bits);
                      } else {
                        $67.a = 1;
                        $67.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.b = readFb($bytes, $stream, bits);
                        $67.c = readFb($bytes, $stream, bits);
                      } else {
                        $67.b = 0;
                        $67.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $67.tx = e / 20;
                      $67.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $68 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.a = readFb($bytes, $stream, bits);
                          $68.d = readFb($bytes, $stream, bits);
                        } else {
                          $68.a = 1;
                          $68.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.b = readFb($bytes, $stream, bits);
                          $68.c = readFb($bytes, $stream, bits);
                        } else {
                          $68.b = 0;
                          $68.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $68.tx = e / 20;
                        $68.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $63.spreadMode = readUb($bytes, $stream, 2);
                        $63.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $63.count = readUb($bytes, $stream, 4);
                      var $69 = $63.records = [];
                      var $70 = count;
                      while ($70--) {
                        var $71 = {};
                        $71.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $72 = $71.color = {};
                          $72.red = readUi8($bytes, $stream);
                          $72.green = readUi8($bytes, $stream);
                          $72.blue = readUi8($bytes, $stream);
                          $72.alpha = readUi8($bytes, $stream);
                        } else {
                          var $73 = $71.color = {};
                          $73.red = readUi8($bytes, $stream);
                          $73.green = readUi8($bytes, $stream);
                          $73.blue = readUi8($bytes, $stream);
                          $73.alpha = 255;
                        }
                        if (isMorph) {
                          $71.ratioMorph = readUi8($bytes, $stream);
                          var $74 = $71.colorMorph = {};
                          $74.red = readUi8($bytes, $stream);
                          $74.green = readUi8($bytes, $stream);
                          $74.blue = readUi8($bytes, $stream);
                          $74.alpha = readUi8($bytes, $stream);
                        }
                        $69.push($71);
                      }
                      if (type === 19) {
                        $63.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $63.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $63.bitmapId = readUi16($bytes, $stream);
                      var $75 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.a = readFb($bytes, $stream, bits);
                        $75.d = readFb($bytes, $stream, bits);
                      } else {
                        $75.a = 1;
                        $75.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.b = readFb($bytes, $stream, bits);
                        $75.c = readFb($bytes, $stream, bits);
                      } else {
                        $75.b = 0;
                        $75.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $75.tx = e / 20;
                      $75.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $76 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.a = readFb($bytes, $stream, bits);
                          $76.d = readFb($bytes, $stream, bits);
                        } else {
                          $76.a = 1;
                          $76.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.b = readFb($bytes, $stream, bits);
                          $76.c = readFb($bytes, $stream, bits);
                        } else {
                          $76.b = 0;
                          $76.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $76.tx = e / 20;
                        $76.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $63.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $77 = $62.color = {};
                    $77.red = readUi8($bytes, $stream);
                    $77.green = readUi8($bytes, $stream);
                    $77.blue = readUi8($bytes, $stream);
                    $77.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $78 = $62.colorMorph = {};
                      $78.red = readUi8($bytes, $stream);
                      $78.green = readUi8($bytes, $stream);
                      $78.blue = readUi8($bytes, $stream);
                      $78.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $79 = $62.color = {};
                    $79.red = readUi8($bytes, $stream);
                    $79.green = readUi8($bytes, $stream);
                    $79.blue = readUi8($bytes, $stream);
                    $79.alpha = readUi8($bytes, $stream);
                  } else {
                    var $80 = $62.color = {};
                    $80.red = readUi8($bytes, $stream);
                    $80.green = readUi8($bytes, $stream);
                    $80.blue = readUi8($bytes, $stream);
                    $80.alpha = 255;
                  }
                  if (isMorph) {
                    var $81 = $62.colorMorph = {};
                    $81.red = readUi8($bytes, $stream);
                    $81.green = readUi8($bytes, $stream);
                    $81.blue = readUi8($bytes, $stream);
                    $81.alpha = readUi8($bytes, $stream);
                  }
                }
                $60.push($62);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $42.push($43);
        } while (!eos);
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $82 = $.recordsMorph = [];
        do {
          var $83 = {};
          var type = $83.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $83.eos = !(type || flags);
          if (type) {
            var isStraight = $83.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $83.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $83.deltaX = readSb($bytes, $stream, bits);
                $83.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $83.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $83.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $83.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $83.controlDeltaX = readSb($bytes, $stream, bits);
              $83.controlDeltaY = readSb($bytes, $stream, bits);
              $83.anchorDeltaX = readSb($bytes, $stream, bits);
              $83.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $83.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $83.hasNewStyles = 0;
            }
            var hasLineStyle = $83.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $83.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $83.hasFillStyle0 = flags >> 1 & 1;
            var move = $83.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $83.moveX = readSb($bytes, $stream, bits);
              $83.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $83.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $83.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $83.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $84 = $83.fillStyles = [];
              var $85 = count;
              while ($85--) {
                var $86 = {};
                var type = $86.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $87 = $86.color = {};
                    $87.red = readUi8($bytes, $stream);
                    $87.green = readUi8($bytes, $stream);
                    $87.blue = readUi8($bytes, $stream);
                    $87.alpha = readUi8($bytes, $stream);
                  } else {
                    var $88 = $86.color = {};
                    $88.red = readUi8($bytes, $stream);
                    $88.green = readUi8($bytes, $stream);
                    $88.blue = readUi8($bytes, $stream);
                    $88.alpha = 255;
                  }
                  if (isMorph) {
                    var $89 = $86.colorMorph = {};
                    $89.red = readUi8($bytes, $stream);
                    $89.green = readUi8($bytes, $stream);
                    $89.blue = readUi8($bytes, $stream);
                    $89.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $90 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.a = readFb($bytes, $stream, bits);
                    $90.d = readFb($bytes, $stream, bits);
                  } else {
                    $90.a = 1;
                    $90.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.b = readFb($bytes, $stream, bits);
                    $90.c = readFb($bytes, $stream, bits);
                  } else {
                    $90.b = 0;
                    $90.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $90.tx = e / 20;
                  $90.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $91 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.a = readFb($bytes, $stream, bits);
                      $91.d = readFb($bytes, $stream, bits);
                    } else {
                      $91.a = 1;
                      $91.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.b = readFb($bytes, $stream, bits);
                      $91.c = readFb($bytes, $stream, bits);
                    } else {
                      $91.b = 0;
                      $91.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $91.tx = e / 20;
                    $91.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $86.spreadMode = readUb($bytes, $stream, 2);
                    $86.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $86.count = readUb($bytes, $stream, 4);
                  var $92 = $86.records = [];
                  var $93 = count;
                  while ($93--) {
                    var $94 = {};
                    $94.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $95 = $94.color = {};
                      $95.red = readUi8($bytes, $stream);
                      $95.green = readUi8($bytes, $stream);
                      $95.blue = readUi8($bytes, $stream);
                      $95.alpha = readUi8($bytes, $stream);
                    } else {
                      var $96 = $94.color = {};
                      $96.red = readUi8($bytes, $stream);
                      $96.green = readUi8($bytes, $stream);
                      $96.blue = readUi8($bytes, $stream);
                      $96.alpha = 255;
                    }
                    if (isMorph) {
                      $94.ratioMorph = readUi8($bytes, $stream);
                      var $97 = $94.colorMorph = {};
                      $97.red = readUi8($bytes, $stream);
                      $97.green = readUi8($bytes, $stream);
                      $97.blue = readUi8($bytes, $stream);
                      $97.alpha = readUi8($bytes, $stream);
                    }
                    $92.push($94);
                  }
                  if (type === 19) {
                    $86.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $86.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $86.bitmapId = readUi16($bytes, $stream);
                  var $98 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.a = readFb($bytes, $stream, bits);
                    $98.d = readFb($bytes, $stream, bits);
                  } else {
                    $98.a = 1;
                    $98.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.b = readFb($bytes, $stream, bits);
                    $98.c = readFb($bytes, $stream, bits);
                  } else {
                    $98.b = 0;
                    $98.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $98.tx = e / 20;
                  $98.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $99 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.a = readFb($bytes, $stream, bits);
                      $99.d = readFb($bytes, $stream, bits);
                    } else {
                      $99.a = 1;
                      $99.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.b = readFb($bytes, $stream, bits);
                      $99.c = readFb($bytes, $stream, bits);
                    } else {
                      $99.b = 0;
                      $99.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $99.tx = e / 20;
                    $99.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $86.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $84.push($86);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $100 = $83.lineStyles = [];
              var $101 = count;
              while ($101--) {
                var $102 = {};
                $102.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $102.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $102.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $102.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $102.hasFill = readUb($bytes, $stream, 1);
                  $102.noHscale = readUb($bytes, $stream, 1);
                  $102.noVscale = readUb($bytes, $stream, 1);
                  $102.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $102.noClose = readUb($bytes, $stream, 1);
                  $102.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $102.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $103 = $102.fillStyle = {};
                    var type = $103.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $104 = $103.color = {};
                        $104.red = readUi8($bytes, $stream);
                        $104.green = readUi8($bytes, $stream);
                        $104.blue = readUi8($bytes, $stream);
                        $104.alpha = readUi8($bytes, $stream);
                      } else {
                        var $105 = $103.color = {};
                        $105.red = readUi8($bytes, $stream);
                        $105.green = readUi8($bytes, $stream);
                        $105.blue = readUi8($bytes, $stream);
                        $105.alpha = 255;
                      }
                      if (isMorph) {
                        var $106 = $103.colorMorph = {};
                        $106.red = readUi8($bytes, $stream);
                        $106.green = readUi8($bytes, $stream);
                        $106.blue = readUi8($bytes, $stream);
                        $106.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $107 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.a = readFb($bytes, $stream, bits);
                        $107.d = readFb($bytes, $stream, bits);
                      } else {
                        $107.a = 1;
                        $107.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.b = readFb($bytes, $stream, bits);
                        $107.c = readFb($bytes, $stream, bits);
                      } else {
                        $107.b = 0;
                        $107.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $107.tx = e / 20;
                      $107.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $108 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.a = readFb($bytes, $stream, bits);
                          $108.d = readFb($bytes, $stream, bits);
                        } else {
                          $108.a = 1;
                          $108.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.b = readFb($bytes, $stream, bits);
                          $108.c = readFb($bytes, $stream, bits);
                        } else {
                          $108.b = 0;
                          $108.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $108.tx = e / 20;
                        $108.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $103.spreadMode = readUb($bytes, $stream, 2);
                        $103.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $103.count = readUb($bytes, $stream, 4);
                      var $109 = $103.records = [];
                      var $110 = count;
                      while ($110--) {
                        var $111 = {};
                        $111.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $112 = $111.color = {};
                          $112.red = readUi8($bytes, $stream);
                          $112.green = readUi8($bytes, $stream);
                          $112.blue = readUi8($bytes, $stream);
                          $112.alpha = readUi8($bytes, $stream);
                        } else {
                          var $113 = $111.color = {};
                          $113.red = readUi8($bytes, $stream);
                          $113.green = readUi8($bytes, $stream);
                          $113.blue = readUi8($bytes, $stream);
                          $113.alpha = 255;
                        }
                        if (isMorph) {
                          $111.ratioMorph = readUi8($bytes, $stream);
                          var $114 = $111.colorMorph = {};
                          $114.red = readUi8($bytes, $stream);
                          $114.green = readUi8($bytes, $stream);
                          $114.blue = readUi8($bytes, $stream);
                          $114.alpha = readUi8($bytes, $stream);
                        }
                        $109.push($111);
                      }
                      if (type === 19) {
                        $103.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $103.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $103.bitmapId = readUi16($bytes, $stream);
                      var $115 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.a = readFb($bytes, $stream, bits);
                        $115.d = readFb($bytes, $stream, bits);
                      } else {
                        $115.a = 1;
                        $115.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.b = readFb($bytes, $stream, bits);
                        $115.c = readFb($bytes, $stream, bits);
                      } else {
                        $115.b = 0;
                        $115.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $115.tx = e / 20;
                      $115.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $116 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.a = readFb($bytes, $stream, bits);
                          $116.d = readFb($bytes, $stream, bits);
                        } else {
                          $116.a = 1;
                          $116.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.b = readFb($bytes, $stream, bits);
                          $116.c = readFb($bytes, $stream, bits);
                        } else {
                          $116.b = 0;
                          $116.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $116.tx = e / 20;
                        $116.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $103.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $117 = $102.color = {};
                    $117.red = readUi8($bytes, $stream);
                    $117.green = readUi8($bytes, $stream);
                    $117.blue = readUi8($bytes, $stream);
                    $117.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $118 = $102.colorMorph = {};
                      $118.red = readUi8($bytes, $stream);
                      $118.green = readUi8($bytes, $stream);
                      $118.blue = readUi8($bytes, $stream);
                      $118.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $119 = $102.color = {};
                    $119.red = readUi8($bytes, $stream);
                    $119.green = readUi8($bytes, $stream);
                    $119.blue = readUi8($bytes, $stream);
                    $119.alpha = readUi8($bytes, $stream);
                  } else {
                    var $120 = $102.color = {};
                    $120.red = readUi8($bytes, $stream);
                    $120.green = readUi8($bytes, $stream);
                    $120.blue = readUi8($bytes, $stream);
                    $120.alpha = 255;
                  }
                  if (isMorph) {
                    var $121 = $102.colorMorph = {};
                    $121.red = readUi8($bytes, $stream);
                    $121.green = readUi8($bytes, $stream);
                    $121.blue = readUi8($bytes, $stream);
                    $121.alpha = readUi8($bytes, $stream);
                  }
                }
                $100.push($102);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $82.push($83);
        } while (!eos);
      } else {
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $122 = $.fillStyles = [];
        var $123 = count;
        while ($123--) {
          var $124 = {};
          var type = $124.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $125 = $124.color = {};
              $125.red = readUi8($bytes, $stream);
              $125.green = readUi8($bytes, $stream);
              $125.blue = readUi8($bytes, $stream);
              $125.alpha = readUi8($bytes, $stream);
            } else {
              var $126 = $124.color = {};
              $126.red = readUi8($bytes, $stream);
              $126.green = readUi8($bytes, $stream);
              $126.blue = readUi8($bytes, $stream);
              $126.alpha = 255;
            }
            if (isMorph) {
              var $127 = $124.colorMorph = {};
              $127.red = readUi8($bytes, $stream);
              $127.green = readUi8($bytes, $stream);
              $127.blue = readUi8($bytes, $stream);
              $127.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $128 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $128.a = readFb($bytes, $stream, bits);
              $128.d = readFb($bytes, $stream, bits);
            } else {
              $128.a = 1;
              $128.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $128.b = readFb($bytes, $stream, bits);
              $128.c = readFb($bytes, $stream, bits);
            } else {
              $128.b = 0;
              $128.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $128.tx = e / 20;
            $128.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $129 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $129.a = readFb($bytes, $stream, bits);
                $129.d = readFb($bytes, $stream, bits);
              } else {
                $129.a = 1;
                $129.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $129.b = readFb($bytes, $stream, bits);
                $129.c = readFb($bytes, $stream, bits);
              } else {
                $129.b = 0;
                $129.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $129.tx = e / 20;
              $129.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $124.spreadMode = readUb($bytes, $stream, 2);
              $124.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $124.count = readUb($bytes, $stream, 4);
            var $130 = $124.records = [];
            var $131 = count;
            while ($131--) {
              var $132 = {};
              $132.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $133 = $132.color = {};
                $133.red = readUi8($bytes, $stream);
                $133.green = readUi8($bytes, $stream);
                $133.blue = readUi8($bytes, $stream);
                $133.alpha = readUi8($bytes, $stream);
              } else {
                var $134 = $132.color = {};
                $134.red = readUi8($bytes, $stream);
                $134.green = readUi8($bytes, $stream);
                $134.blue = readUi8($bytes, $stream);
                $134.alpha = 255;
              }
              if (isMorph) {
                $132.ratioMorph = readUi8($bytes, $stream);
                var $135 = $132.colorMorph = {};
                $135.red = readUi8($bytes, $stream);
                $135.green = readUi8($bytes, $stream);
                $135.blue = readUi8($bytes, $stream);
                $135.alpha = readUi8($bytes, $stream);
              }
              $130.push($132);
            }
            if (type === 19) {
              $124.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $124.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $124.bitmapId = readUi16($bytes, $stream);
            var $136 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $136.a = readFb($bytes, $stream, bits);
              $136.d = readFb($bytes, $stream, bits);
            } else {
              $136.a = 1;
              $136.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $136.b = readFb($bytes, $stream, bits);
              $136.c = readFb($bytes, $stream, bits);
            } else {
              $136.b = 0;
              $136.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $136.tx = e / 20;
            $136.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $137 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $137.a = readFb($bytes, $stream, bits);
                $137.d = readFb($bytes, $stream, bits);
              } else {
                $137.a = 1;
                $137.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $137.b = readFb($bytes, $stream, bits);
                $137.c = readFb($bytes, $stream, bits);
              } else {
                $137.b = 0;
                $137.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $137.tx = e / 20;
              $137.ty = f / 20;
              align($bytes, $stream);
            }
            $124.condition = type === 64 || type === 67;
            break;
          default:
          }
          $122.push($124);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $138 = $.lineStyles = [];
        var $139 = count;
        while ($139--) {
          var $140 = {};
          $140.width = readUi16($bytes, $stream);
          if (isMorph) {
            $140.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $140.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $140.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $140.hasFill = readUb($bytes, $stream, 1);
            $140.noHscale = readUb($bytes, $stream, 1);
            $140.noVscale = readUb($bytes, $stream, 1);
            $140.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $140.noClose = readUb($bytes, $stream, 1);
            $140.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $140.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $141 = $140.fillStyle = {};
              var type = $141.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $142 = $141.color = {};
                  $142.red = readUi8($bytes, $stream);
                  $142.green = readUi8($bytes, $stream);
                  $142.blue = readUi8($bytes, $stream);
                  $142.alpha = readUi8($bytes, $stream);
                } else {
                  var $143 = $141.color = {};
                  $143.red = readUi8($bytes, $stream);
                  $143.green = readUi8($bytes, $stream);
                  $143.blue = readUi8($bytes, $stream);
                  $143.alpha = 255;
                }
                if (isMorph) {
                  var $144 = $141.colorMorph = {};
                  $144.red = readUi8($bytes, $stream);
                  $144.green = readUi8($bytes, $stream);
                  $144.blue = readUi8($bytes, $stream);
                  $144.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $145 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.a = readFb($bytes, $stream, bits);
                  $145.d = readFb($bytes, $stream, bits);
                } else {
                  $145.a = 1;
                  $145.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.b = readFb($bytes, $stream, bits);
                  $145.c = readFb($bytes, $stream, bits);
                } else {
                  $145.b = 0;
                  $145.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $145.tx = e / 20;
                $145.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $146 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.a = readFb($bytes, $stream, bits);
                    $146.d = readFb($bytes, $stream, bits);
                  } else {
                    $146.a = 1;
                    $146.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.b = readFb($bytes, $stream, bits);
                    $146.c = readFb($bytes, $stream, bits);
                  } else {
                    $146.b = 0;
                    $146.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $146.tx = e / 20;
                  $146.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $141.spreadMode = readUb($bytes, $stream, 2);
                  $141.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $141.count = readUb($bytes, $stream, 4);
                var $147 = $141.records = [];
                var $148 = count;
                while ($148--) {
                  var $149 = {};
                  $149.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $150 = $149.color = {};
                    $150.red = readUi8($bytes, $stream);
                    $150.green = readUi8($bytes, $stream);
                    $150.blue = readUi8($bytes, $stream);
                    $150.alpha = readUi8($bytes, $stream);
                  } else {
                    var $151 = $149.color = {};
                    $151.red = readUi8($bytes, $stream);
                    $151.green = readUi8($bytes, $stream);
                    $151.blue = readUi8($bytes, $stream);
                    $151.alpha = 255;
                  }
                  if (isMorph) {
                    $149.ratioMorph = readUi8($bytes, $stream);
                    var $152 = $149.colorMorph = {};
                    $152.red = readUi8($bytes, $stream);
                    $152.green = readUi8($bytes, $stream);
                    $152.blue = readUi8($bytes, $stream);
                    $152.alpha = readUi8($bytes, $stream);
                  }
                  $147.push($149);
                }
                if (type === 19) {
                  $141.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $141.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $141.bitmapId = readUi16($bytes, $stream);
                var $153 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.a = readFb($bytes, $stream, bits);
                  $153.d = readFb($bytes, $stream, bits);
                } else {
                  $153.a = 1;
                  $153.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.b = readFb($bytes, $stream, bits);
                  $153.c = readFb($bytes, $stream, bits);
                } else {
                  $153.b = 0;
                  $153.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $153.tx = e / 20;
                $153.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $154 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.a = readFb($bytes, $stream, bits);
                    $154.d = readFb($bytes, $stream, bits);
                  } else {
                    $154.a = 1;
                    $154.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.b = readFb($bytes, $stream, bits);
                    $154.c = readFb($bytes, $stream, bits);
                  } else {
                    $154.b = 0;
                    $154.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $154.tx = e / 20;
                  $154.ty = f / 20;
                  align($bytes, $stream);
                }
                $141.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $155 = $140.color = {};
              $155.red = readUi8($bytes, $stream);
              $155.green = readUi8($bytes, $stream);
              $155.blue = readUi8($bytes, $stream);
              $155.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $156 = $140.colorMorph = {};
                $156.red = readUi8($bytes, $stream);
                $156.green = readUi8($bytes, $stream);
                $156.blue = readUi8($bytes, $stream);
                $156.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $157 = $140.color = {};
              $157.red = readUi8($bytes, $stream);
              $157.green = readUi8($bytes, $stream);
              $157.blue = readUi8($bytes, $stream);
              $157.alpha = readUi8($bytes, $stream);
            } else {
              var $158 = $140.color = {};
              $158.red = readUi8($bytes, $stream);
              $158.green = readUi8($bytes, $stream);
              $158.blue = readUi8($bytes, $stream);
              $158.alpha = 255;
            }
            if (isMorph) {
              var $159 = $140.colorMorph = {};
              $159.red = readUi8($bytes, $stream);
              $159.green = readUi8($bytes, $stream);
              $159.blue = readUi8($bytes, $stream);
              $159.alpha = readUi8($bytes, $stream);
            }
          }
          $138.push($140);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $160 = $.records = [];
        do {
          var $161 = {};
          var type = $161.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $161.eos = !(type || flags);
          if (type) {
            var isStraight = $161.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $161.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $161.deltaX = readSb($bytes, $stream, bits);
                $161.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $161.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $161.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $161.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $161.controlDeltaX = readSb($bytes, $stream, bits);
              $161.controlDeltaY = readSb($bytes, $stream, bits);
              $161.anchorDeltaX = readSb($bytes, $stream, bits);
              $161.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $161.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $161.hasNewStyles = 0;
            }
            var hasLineStyle = $161.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $161.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $161.hasFillStyle0 = flags >> 1 & 1;
            var move = $161.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $161.moveX = readSb($bytes, $stream, bits);
              $161.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $161.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $161.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $161.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $162 = $161.fillStyles = [];
              var $163 = count;
              while ($163--) {
                var $164 = {};
                var type = $164.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $165 = $164.color = {};
                    $165.red = readUi8($bytes, $stream);
                    $165.green = readUi8($bytes, $stream);
                    $165.blue = readUi8($bytes, $stream);
                    $165.alpha = readUi8($bytes, $stream);
                  } else {
                    var $166 = $164.color = {};
                    $166.red = readUi8($bytes, $stream);
                    $166.green = readUi8($bytes, $stream);
                    $166.blue = readUi8($bytes, $stream);
                    $166.alpha = 255;
                  }
                  if (isMorph) {
                    var $167 = $164.colorMorph = {};
                    $167.red = readUi8($bytes, $stream);
                    $167.green = readUi8($bytes, $stream);
                    $167.blue = readUi8($bytes, $stream);
                    $167.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $168 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.a = readFb($bytes, $stream, bits);
                    $168.d = readFb($bytes, $stream, bits);
                  } else {
                    $168.a = 1;
                    $168.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.b = readFb($bytes, $stream, bits);
                    $168.c = readFb($bytes, $stream, bits);
                  } else {
                    $168.b = 0;
                    $168.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $168.tx = e / 20;
                  $168.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $169 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.a = readFb($bytes, $stream, bits);
                      $169.d = readFb($bytes, $stream, bits);
                    } else {
                      $169.a = 1;
                      $169.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.b = readFb($bytes, $stream, bits);
                      $169.c = readFb($bytes, $stream, bits);
                    } else {
                      $169.b = 0;
                      $169.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $169.tx = e / 20;
                    $169.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $164.spreadMode = readUb($bytes, $stream, 2);
                    $164.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $164.count = readUb($bytes, $stream, 4);
                  var $170 = $164.records = [];
                  var $171 = count;
                  while ($171--) {
                    var $172 = {};
                    $172.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $173 = $172.color = {};
                      $173.red = readUi8($bytes, $stream);
                      $173.green = readUi8($bytes, $stream);
                      $173.blue = readUi8($bytes, $stream);
                      $173.alpha = readUi8($bytes, $stream);
                    } else {
                      var $174 = $172.color = {};
                      $174.red = readUi8($bytes, $stream);
                      $174.green = readUi8($bytes, $stream);
                      $174.blue = readUi8($bytes, $stream);
                      $174.alpha = 255;
                    }
                    if (isMorph) {
                      $172.ratioMorph = readUi8($bytes, $stream);
                      var $175 = $172.colorMorph = {};
                      $175.red = readUi8($bytes, $stream);
                      $175.green = readUi8($bytes, $stream);
                      $175.blue = readUi8($bytes, $stream);
                      $175.alpha = readUi8($bytes, $stream);
                    }
                    $170.push($172);
                  }
                  if (type === 19) {
                    $164.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $164.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $164.bitmapId = readUi16($bytes, $stream);
                  var $176 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.a = readFb($bytes, $stream, bits);
                    $176.d = readFb($bytes, $stream, bits);
                  } else {
                    $176.a = 1;
                    $176.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.b = readFb($bytes, $stream, bits);
                    $176.c = readFb($bytes, $stream, bits);
                  } else {
                    $176.b = 0;
                    $176.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $176.tx = e / 20;
                  $176.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $177 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.a = readFb($bytes, $stream, bits);
                      $177.d = readFb($bytes, $stream, bits);
                    } else {
                      $177.a = 1;
                      $177.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.b = readFb($bytes, $stream, bits);
                      $177.c = readFb($bytes, $stream, bits);
                    } else {
                      $177.b = 0;
                      $177.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $177.tx = e / 20;
                    $177.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $164.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $162.push($164);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $178 = $161.lineStyles = [];
              var $179 = count;
              while ($179--) {
                var $180 = {};
                $180.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $180.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $180.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $180.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $180.hasFill = readUb($bytes, $stream, 1);
                  $180.noHscale = readUb($bytes, $stream, 1);
                  $180.noVscale = readUb($bytes, $stream, 1);
                  $180.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $180.noClose = readUb($bytes, $stream, 1);
                  $180.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $180.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $181 = $180.fillStyle = {};
                    var type = $181.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $182 = $181.color = {};
                        $182.red = readUi8($bytes, $stream);
                        $182.green = readUi8($bytes, $stream);
                        $182.blue = readUi8($bytes, $stream);
                        $182.alpha = readUi8($bytes, $stream);
                      } else {
                        var $183 = $181.color = {};
                        $183.red = readUi8($bytes, $stream);
                        $183.green = readUi8($bytes, $stream);
                        $183.blue = readUi8($bytes, $stream);
                        $183.alpha = 255;
                      }
                      if (isMorph) {
                        var $184 = $181.colorMorph = {};
                        $184.red = readUi8($bytes, $stream);
                        $184.green = readUi8($bytes, $stream);
                        $184.blue = readUi8($bytes, $stream);
                        $184.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $185 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.a = readFb($bytes, $stream, bits);
                        $185.d = readFb($bytes, $stream, bits);
                      } else {
                        $185.a = 1;
                        $185.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.b = readFb($bytes, $stream, bits);
                        $185.c = readFb($bytes, $stream, bits);
                      } else {
                        $185.b = 0;
                        $185.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $185.tx = e / 20;
                      $185.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $186 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.a = readFb($bytes, $stream, bits);
                          $186.d = readFb($bytes, $stream, bits);
                        } else {
                          $186.a = 1;
                          $186.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.b = readFb($bytes, $stream, bits);
                          $186.c = readFb($bytes, $stream, bits);
                        } else {
                          $186.b = 0;
                          $186.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $186.tx = e / 20;
                        $186.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $181.spreadMode = readUb($bytes, $stream, 2);
                        $181.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $181.count = readUb($bytes, $stream, 4);
                      var $187 = $181.records = [];
                      var $188 = count;
                      while ($188--) {
                        var $189 = {};
                        $189.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $190 = $189.color = {};
                          $190.red = readUi8($bytes, $stream);
                          $190.green = readUi8($bytes, $stream);
                          $190.blue = readUi8($bytes, $stream);
                          $190.alpha = readUi8($bytes, $stream);
                        } else {
                          var $191 = $189.color = {};
                          $191.red = readUi8($bytes, $stream);
                          $191.green = readUi8($bytes, $stream);
                          $191.blue = readUi8($bytes, $stream);
                          $191.alpha = 255;
                        }
                        if (isMorph) {
                          $189.ratioMorph = readUi8($bytes, $stream);
                          var $192 = $189.colorMorph = {};
                          $192.red = readUi8($bytes, $stream);
                          $192.green = readUi8($bytes, $stream);
                          $192.blue = readUi8($bytes, $stream);
                          $192.alpha = readUi8($bytes, $stream);
                        }
                        $187.push($189);
                      }
                      if (type === 19) {
                        $181.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $181.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $181.bitmapId = readUi16($bytes, $stream);
                      var $193 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.a = readFb($bytes, $stream, bits);
                        $193.d = readFb($bytes, $stream, bits);
                      } else {
                        $193.a = 1;
                        $193.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.b = readFb($bytes, $stream, bits);
                        $193.c = readFb($bytes, $stream, bits);
                      } else {
                        $193.b = 0;
                        $193.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $193.tx = e / 20;
                      $193.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $194 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.a = readFb($bytes, $stream, bits);
                          $194.d = readFb($bytes, $stream, bits);
                        } else {
                          $194.a = 1;
                          $194.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.b = readFb($bytes, $stream, bits);
                          $194.c = readFb($bytes, $stream, bits);
                        } else {
                          $194.b = 0;
                          $194.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $194.tx = e / 20;
                        $194.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $181.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $195 = $180.color = {};
                    $195.red = readUi8($bytes, $stream);
                    $195.green = readUi8($bytes, $stream);
                    $195.blue = readUi8($bytes, $stream);
                    $195.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $196 = $180.colorMorph = {};
                      $196.red = readUi8($bytes, $stream);
                      $196.green = readUi8($bytes, $stream);
                      $196.blue = readUi8($bytes, $stream);
                      $196.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $197 = $180.color = {};
                    $197.red = readUi8($bytes, $stream);
                    $197.green = readUi8($bytes, $stream);
                    $197.blue = readUi8($bytes, $stream);
                    $197.alpha = readUi8($bytes, $stream);
                  } else {
                    var $198 = $180.color = {};
                    $198.red = readUi8($bytes, $stream);
                    $198.green = readUi8($bytes, $stream);
                    $198.blue = readUi8($bytes, $stream);
                    $198.alpha = 255;
                  }
                  if (isMorph) {
                    var $199 = $180.colorMorph = {};
                    $199.red = readUi8($bytes, $stream);
                    $199.green = readUi8($bytes, $stream);
                    $199.blue = readUi8($bytes, $stream);
                    $199.alpha = readUi8($bytes, $stream);
                  }
                }
                $178.push($180);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $160.push($161);
        } while (!eos);
      }
      return $;
    },
    33: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var $0 = $.bbox = {};
      align($bytes, $stream);
      var bits = readUb($bytes, $stream, 5);
      var xMin = readSb($bytes, $stream, bits);
      var xMax = readSb($bytes, $stream, bits);
      var yMin = readSb($bytes, $stream, bits);
      var yMax = readSb($bytes, $stream, bits);
      $0.left = xMin / 20;
      $0.right = xMax / 20;
      $0.top = yMin / 20;
      $0.bottom = yMax / 20;
      align($bytes, $stream);
      var $1 = $.matrix = {};
      align($bytes, $stream);
      var hasScale = readUb($bytes, $stream, 1);
      if (hasScale) {
        var bits = readUb($bytes, $stream, 5);
        $1.a = readFb($bytes, $stream, bits);
        $1.d = readFb($bytes, $stream, bits);
      } else {
        $1.a = 1;
        $1.d = 1;
      }
      var hasRotate = readUb($bytes, $stream, 1);
      if (hasRotate) {
        var bits = readUb($bytes, $stream, 5);
        $1.b = readFb($bytes, $stream, bits);
        $1.c = readFb($bytes, $stream, bits);
      } else {
        $1.b = 0;
        $1.c = 0;
      }
      var bits = readUb($bytes, $stream, 5);
      var e = readSb($bytes, $stream, bits);
      var f = readSb($bytes, $stream, bits);
      $1.tx = e / 20;
      $1.ty = f / 20;
      align($bytes, $stream);
      var glyphBits = $.glyphBits = readUi8($bytes, $stream);
      var advanceBits = $.advanceBits = readUi8($bytes, $stream);
      var $2 = $.records = [];
      do {
        var $3 = {};
        align($bytes, $stream);
        var flags = readUb($bytes, $stream, 8);
        var eot = $3.eot = !flags;
        var hasFont = $3.hasFont = flags >> 3 & 1;
        var hasColor = $3.hasColor = flags >> 2 & 1;
        var hasMoveY = $3.hasMoveY = flags >> 1 & 1;
        var hasMoveX = $3.hasMoveX = flags & 1;
        if (hasFont) {
          $3.fontId = readUi16($bytes, $stream);
        }
        if (hasColor) {
          if (tagCode === 33) {
            var $4 = $3.color = {};
            $4.red = readUi8($bytes, $stream);
            $4.green = readUi8($bytes, $stream);
            $4.blue = readUi8($bytes, $stream);
            $4.alpha = readUi8($bytes, $stream);
          } else {
            var $5 = $3.color = {};
            $5.red = readUi8($bytes, $stream);
            $5.green = readUi8($bytes, $stream);
            $5.blue = readUi8($bytes, $stream);
            $5.alpha = 255;
          }
        }
        if (hasMoveX) {
          $3.moveX = readSi16($bytes, $stream);
        }
        if (hasMoveY) {
          $3.moveY = readSi16($bytes, $stream);
        }
        if (hasFont) {
          $3.fontHeight = readUi16($bytes, $stream);
        }
        if (!eot) {
          var tmp = readUi8($bytes, $stream);
          if (swfVersion > 6) {
            var glyphCount = $3.glyphCount = tmp;
          } else {
            var glyphCount = $3.glyphCount = tmp & 127;
          }
          var $6 = $3.entries = [];
          var $7 = glyphCount;
          while ($7--) {
            var $8 = {};
            $8.glyphIndex = readUb($bytes, $stream, glyphBits);
            $8.advance = readSb($bytes, $stream, advanceBits);
            $6.push($8);
          }
        }
        $2.push($3);
      } while (!eot);
      return $;
    },
    34: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      if (tagCode == 7) {
        var $0 = $.characters = [];
        do {
          var $1 = {};
          var flags = readUi8($bytes, $stream);
          var eob = $1.eob = !flags;
          if (swfVersion >= 8) {
            var blend = $1.blend = flags >> 5 & 1;
            var hasFilters = $1.hasFilters = flags >> 4 & 1;
          } else {
            var blend = $1.blend = 0;
            var hasFilters = $1.hasFilters = 0;
          }
          $1.stateHitTest = flags >> 3 & 1;
          $1.stateDown = flags >> 2 & 1;
          $1.stateOver = flags >> 1 & 1;
          $1.stateUp = flags & 1;
          if (!eob) {
            $1.symbolId = readUi16($bytes, $stream);
            $1.depth = readUi16($bytes, $stream);
            var $2 = $1.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $2.a = readFb($bytes, $stream, bits);
              $2.d = readFb($bytes, $stream, bits);
            } else {
              $2.a = 1;
              $2.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $2.b = readFb($bytes, $stream, bits);
              $2.c = readFb($bytes, $stream, bits);
            } else {
              $2.b = 0;
              $2.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $2.tx = e / 20;
            $2.ty = f / 20;
            align($bytes, $stream);
            if (tagCode === 34) {
              var $3 = $1.cxform = {};
              align($bytes, $stream);
              var hasOffsets = readUb($bytes, $stream, 1);
              var hasMultipliers = readUb($bytes, $stream, 1);
              var bits = readUb($bytes, $stream, 4);
              if (hasMultipliers) {
                $3.redMultiplier = readSb($bytes, $stream, bits);
                $3.greenMultiplier = readSb($bytes, $stream, bits);
                $3.blueMultiplier = readSb($bytes, $stream, bits);
                if (tagCode > 4) {
                  $3.alphaMultiplier = readSb($bytes, $stream, bits);
                } else {
                  $3.alphaMultiplier = 256;
                }
              } else {
                $3.redMultiplier = 256;
                $3.greenMultiplier = 256;
                $3.blueMultiplier = 256;
                $3.alphaMultiplier = 256;
              }
              if (hasOffsets) {
                $3.redOffset = readSb($bytes, $stream, bits);
                $3.greenOffset = readSb($bytes, $stream, bits);
                $3.blueOffset = readSb($bytes, $stream, bits);
                if (tagCode > 4) {
                  $3.alphaOffset = readSb($bytes, $stream, bits);
                } else {
                  $3.alphaOffset = 0;
                }
              } else {
                $3.redOffset = 0;
                $3.greenOffset = 0;
                $3.blueOffset = 0;
                $3.alphaOffset = 0;
              }
              align($bytes, $stream);
            }
            if (hasFilters) {
              $1.filterCount = readUi8($bytes, $stream);
              var $4 = $1.filters = {};
              var type = $4.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $5 = $4.colors = [];
                var $6 = count;
                while ($6--) {
                  var $7 = {};
                  $7.red = readUi8($bytes, $stream);
                  $7.green = readUi8($bytes, $stream);
                  $7.blue = readUi8($bytes, $stream);
                  $7.alpha = readUi8($bytes, $stream);
                  $5.push($7);
                }
                if (type === 3) {
                  var $8 = $4.higlightColor = {};
                  $8.red = readUi8($bytes, $stream);
                  $8.green = readUi8($bytes, $stream);
                  $8.blue = readUi8($bytes, $stream);
                  $8.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $9 = $4.ratios = [];
                  var $10 = count;
                  while ($10--) {
                    $9.push(readUi8($bytes, $stream));
                  }
                }
                $4.blurX = readFixed($bytes, $stream);
                $4.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $4.angle = readFixed($bytes, $stream);
                  $4.distance = readFixed($bytes, $stream);
                }
                $4.strength = readFixed8($bytes, $stream);
                $4.innerShadow = readUb($bytes, $stream, 1);
                $4.knockout = readUb($bytes, $stream, 1);
                $4.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $4.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $4.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              case 1:
                $4.blurX = readFixed($bytes, $stream);
                $4.blurY = readFixed($bytes, $stream);
                $4.passes = readUb($bytes, $stream, 5);
                var reserved = readUb($bytes, $stream, 3);
                break;
              case 2:
              case 3:
              case 4:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $11 = $4.colors = [];
                var $12 = count;
                while ($12--) {
                  var $13 = {};
                  $13.red = readUi8($bytes, $stream);
                  $13.green = readUi8($bytes, $stream);
                  $13.blue = readUi8($bytes, $stream);
                  $13.alpha = readUi8($bytes, $stream);
                  $11.push($13);
                }
                if (type === 3) {
                  var $14 = $4.higlightColor = {};
                  $14.red = readUi8($bytes, $stream);
                  $14.green = readUi8($bytes, $stream);
                  $14.blue = readUi8($bytes, $stream);
                  $14.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $15 = $4.ratios = [];
                  var $16 = count;
                  while ($16--) {
                    $15.push(readUi8($bytes, $stream));
                  }
                }
                $4.blurX = readFixed($bytes, $stream);
                $4.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $4.angle = readFixed($bytes, $stream);
                  $4.distance = readFixed($bytes, $stream);
                }
                $4.strength = readFixed8($bytes, $stream);
                $4.innerShadow = readUb($bytes, $stream, 1);
                $4.knockout = readUb($bytes, $stream, 1);
                $4.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $4.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $4.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              case 5:
                $4.columns = readUi8($bytes, $stream);
                $4.rows = readUi8($bytes, $stream);
                $4.divisor = readFloat($bytes, $stream);
                $4.bias = readFloat($bytes, $stream);
                var $17 = $4.weights = [];
                var $18 = columns * rows;
                while ($18--) {
                  $17.push(readFloat($bytes, $stream));
                }
                var $19 = $4.defaultColor = {};
                $19.red = readUi8($bytes, $stream);
                $19.green = readUi8($bytes, $stream);
                $19.blue = readUi8($bytes, $stream);
                $19.alpha = readUi8($bytes, $stream);
                var reserved = readUb($bytes, $stream, 6);
                $4.clamp = readUb($bytes, $stream, 1);
                $4.preserveAlpha = readUb($bytes, $stream, 1);
                break;
              case 6:
                var $20 = $4.matrix = [];
                var $21 = 20;
                while ($21--) {
                  $20.push(readFloat($bytes, $stream));
                }
                break;
              case 7:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $22 = $4.colors = [];
                var $23 = count;
                while ($23--) {
                  var $24 = {};
                  $24.red = readUi8($bytes, $stream);
                  $24.green = readUi8($bytes, $stream);
                  $24.blue = readUi8($bytes, $stream);
                  $24.alpha = readUi8($bytes, $stream);
                  $22.push($24);
                }
                if (type === 3) {
                  var $25 = $4.higlightColor = {};
                  $25.red = readUi8($bytes, $stream);
                  $25.green = readUi8($bytes, $stream);
                  $25.blue = readUi8($bytes, $stream);
                  $25.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $26 = $4.ratios = [];
                  var $27 = count;
                  while ($27--) {
                    $26.push(readUi8($bytes, $stream));
                  }
                }
                $4.blurX = readFixed($bytes, $stream);
                $4.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $4.angle = readFixed($bytes, $stream);
                  $4.distance = readFixed($bytes, $stream);
                }
                $4.strength = readFixed8($bytes, $stream);
                $4.innerShadow = readUb($bytes, $stream, 1);
                $4.knockout = readUb($bytes, $stream, 1);
                $4.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $4.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $4.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              default:
              }
            }
            if (blend) {
              $1.blendMode = readUi8($bytes, $stream);
            }
          }
          $0.push($1);
        } while (!eob);
        $.actionsData = readBinary($bytes, $stream, 0);
      } else {
        var trackFlags = readUi8($bytes, $stream);
        $.trackAsMenu = trackFlags >> 7 & 1;
        var actionOffset = readUi16($bytes, $stream);
        var $28 = $.characters = [];
        do {
          var $29 = {};
          var flags = readUi8($bytes, $stream);
          var eob = $29.eob = !flags;
          if (swfVersion >= 8) {
            var blend = $29.blend = flags >> 5 & 1;
            var hasFilters = $29.hasFilters = flags >> 4 & 1;
          } else {
            var blend = $29.blend = 0;
            var hasFilters = $29.hasFilters = 0;
          }
          $29.stateHitTest = flags >> 3 & 1;
          $29.stateDown = flags >> 2 & 1;
          $29.stateOver = flags >> 1 & 1;
          $29.stateUp = flags & 1;
          if (!eob) {
            $29.symbolId = readUi16($bytes, $stream);
            $29.depth = readUi16($bytes, $stream);
            var $30 = $29.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $30.a = readFb($bytes, $stream, bits);
              $30.d = readFb($bytes, $stream, bits);
            } else {
              $30.a = 1;
              $30.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $30.b = readFb($bytes, $stream, bits);
              $30.c = readFb($bytes, $stream, bits);
            } else {
              $30.b = 0;
              $30.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $30.tx = e / 20;
            $30.ty = f / 20;
            align($bytes, $stream);
            if (tagCode === 34) {
              var $31 = $29.cxform = {};
              align($bytes, $stream);
              var hasOffsets = readUb($bytes, $stream, 1);
              var hasMultipliers = readUb($bytes, $stream, 1);
              var bits = readUb($bytes, $stream, 4);
              if (hasMultipliers) {
                $31.redMultiplier = readSb($bytes, $stream, bits);
                $31.greenMultiplier = readSb($bytes, $stream, bits);
                $31.blueMultiplier = readSb($bytes, $stream, bits);
                if (tagCode > 4) {
                  $31.alphaMultiplier = readSb($bytes, $stream, bits);
                } else {
                  $31.alphaMultiplier = 256;
                }
              } else {
                $31.redMultiplier = 256;
                $31.greenMultiplier = 256;
                $31.blueMultiplier = 256;
                $31.alphaMultiplier = 256;
              }
              if (hasOffsets) {
                $31.redOffset = readSb($bytes, $stream, bits);
                $31.greenOffset = readSb($bytes, $stream, bits);
                $31.blueOffset = readSb($bytes, $stream, bits);
                if (tagCode > 4) {
                  $31.alphaOffset = readSb($bytes, $stream, bits);
                } else {
                  $31.alphaOffset = 0;
                }
              } else {
                $31.redOffset = 0;
                $31.greenOffset = 0;
                $31.blueOffset = 0;
                $31.alphaOffset = 0;
              }
              align($bytes, $stream);
            }
            if (hasFilters) {
              $29.filterCount = readUi8($bytes, $stream);
              var $32 = $29.filters = {};
              var type = $32.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $33 = $32.colors = [];
                var $34 = count;
                while ($34--) {
                  var $35 = {};
                  $35.red = readUi8($bytes, $stream);
                  $35.green = readUi8($bytes, $stream);
                  $35.blue = readUi8($bytes, $stream);
                  $35.alpha = readUi8($bytes, $stream);
                  $33.push($35);
                }
                if (type === 3) {
                  var $36 = $32.higlightColor = {};
                  $36.red = readUi8($bytes, $stream);
                  $36.green = readUi8($bytes, $stream);
                  $36.blue = readUi8($bytes, $stream);
                  $36.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $37 = $32.ratios = [];
                  var $38 = count;
                  while ($38--) {
                    $37.push(readUi8($bytes, $stream));
                  }
                }
                $32.blurX = readFixed($bytes, $stream);
                $32.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $32.angle = readFixed($bytes, $stream);
                  $32.distance = readFixed($bytes, $stream);
                }
                $32.strength = readFixed8($bytes, $stream);
                $32.innerShadow = readUb($bytes, $stream, 1);
                $32.knockout = readUb($bytes, $stream, 1);
                $32.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $32.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $32.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              case 1:
                $32.blurX = readFixed($bytes, $stream);
                $32.blurY = readFixed($bytes, $stream);
                $32.passes = readUb($bytes, $stream, 5);
                var reserved = readUb($bytes, $stream, 3);
                break;
              case 2:
              case 3:
              case 4:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $39 = $32.colors = [];
                var $40 = count;
                while ($40--) {
                  var $41 = {};
                  $41.red = readUi8($bytes, $stream);
                  $41.green = readUi8($bytes, $stream);
                  $41.blue = readUi8($bytes, $stream);
                  $41.alpha = readUi8($bytes, $stream);
                  $39.push($41);
                }
                if (type === 3) {
                  var $42 = $32.higlightColor = {};
                  $42.red = readUi8($bytes, $stream);
                  $42.green = readUi8($bytes, $stream);
                  $42.blue = readUi8($bytes, $stream);
                  $42.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $43 = $32.ratios = [];
                  var $44 = count;
                  while ($44--) {
                    $43.push(readUi8($bytes, $stream));
                  }
                }
                $32.blurX = readFixed($bytes, $stream);
                $32.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $32.angle = readFixed($bytes, $stream);
                  $32.distance = readFixed($bytes, $stream);
                }
                $32.strength = readFixed8($bytes, $stream);
                $32.innerShadow = readUb($bytes, $stream, 1);
                $32.knockout = readUb($bytes, $stream, 1);
                $32.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $32.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $32.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              case 5:
                $32.columns = readUi8($bytes, $stream);
                $32.rows = readUi8($bytes, $stream);
                $32.divisor = readFloat($bytes, $stream);
                $32.bias = readFloat($bytes, $stream);
                var $45 = $32.weights = [];
                var $46 = columns * rows;
                while ($46--) {
                  $45.push(readFloat($bytes, $stream));
                }
                var $47 = $32.defaultColor = {};
                $47.red = readUi8($bytes, $stream);
                $47.green = readUi8($bytes, $stream);
                $47.blue = readUi8($bytes, $stream);
                $47.alpha = readUi8($bytes, $stream);
                var reserved = readUb($bytes, $stream, 6);
                $32.clamp = readUb($bytes, $stream, 1);
                $32.preserveAlpha = readUb($bytes, $stream, 1);
                break;
              case 6:
                var $48 = $32.matrix = [];
                var $49 = 20;
                while ($49--) {
                  $48.push(readFloat($bytes, $stream));
                }
                break;
              case 7:
                if (type === 4 || type === 7) {
                  var count = readUi8($bytes, $stream);
                } else {
                  var count = 1;
                }
                var $50 = $32.colors = [];
                var $51 = count;
                while ($51--) {
                  var $52 = {};
                  $52.red = readUi8($bytes, $stream);
                  $52.green = readUi8($bytes, $stream);
                  $52.blue = readUi8($bytes, $stream);
                  $52.alpha = readUi8($bytes, $stream);
                  $50.push($52);
                }
                if (type === 3) {
                  var $53 = $32.higlightColor = {};
                  $53.red = readUi8($bytes, $stream);
                  $53.green = readUi8($bytes, $stream);
                  $53.blue = readUi8($bytes, $stream);
                  $53.alpha = readUi8($bytes, $stream);
                }
                if (type === 4 || type === 7) {
                  var $54 = $32.ratios = [];
                  var $55 = count;
                  while ($55--) {
                    $54.push(readUi8($bytes, $stream));
                  }
                }
                $32.blurX = readFixed($bytes, $stream);
                $32.blurY = readFixed($bytes, $stream);
                if (type !== 2) {
                  $32.angle = readFixed($bytes, $stream);
                  $32.distance = readFixed($bytes, $stream);
                }
                $32.strength = readFixed8($bytes, $stream);
                $32.innerShadow = readUb($bytes, $stream, 1);
                $32.knockout = readUb($bytes, $stream, 1);
                $32.compositeSource = readUb($bytes, $stream, 1);
                if (type === 3) {
                  $32.onTop = readUb($bytes, $stream, 1);
                } else {
                  var reserved = readUb($bytes, $stream, 1);
                }
                if (type === 4 || type === 7) {
                  $32.passes = readUb($bytes, $stream, 4);
                } else {
                  var reserved = readUb($bytes, $stream, 4);
                }
                break;
              default:
              }
            }
            if (blend) {
              $29.blendMode = readUi8($bytes, $stream);
            }
          }
          $28.push($29);
        } while (!eob);
        if (!(!actionOffset)) {
          var $56 = $.buttonActions = [];
          do {
            var $57 = {};
            var buttonCondSize = readUi16($bytes, $stream);
            var buttonConditions = readUi16($bytes, $stream);
            $57.idleToOverDown = buttonConditions >> 7 & 1;
            $57.outDownToIdle = buttonConditions >> 6 & 1;
            $57.outDownToOverDown = buttonConditions >> 5 & 1;
            $57.overDownToOutDown = buttonConditions >> 4 & 1;
            $57.overDownToOverUp = buttonConditions >> 3 & 1;
            $57.overUpToOverDown = buttonConditions >> 2 & 1;
            $57.overUpToIdle = buttonConditions >> 1 & 1;
            $57.idleToOverUp = buttonConditions & 1;
            $57.mouseEventFlags = buttonConditions & 511;
            $57.keyPress = buttonConditions >> 9 & 127;
            $57.overDownToIdle = buttonConditions >> 8 & 1;
            if (!buttonCondSize) {
              $57.actionsData = readBinary($bytes, $stream, 0);
            } else {
              $57.actionsData = readBinary($bytes, $stream, buttonCondSize - 4);
            }
            $56.push($57);
          } while ($stream.remaining() > 0);
        }
      }
      return $;
    },
    35: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      if (tagCode > 21) {
        var alphaDataOffset = readUi32($bytes, $stream);
        if (tagCode === 90) {
          $.deblock = readFixed8($bytes, $stream);
        }
        var imgData = $.imgData = readBinary($bytes, $stream, alphaDataOffset);
        $.alphaData = readBinary($bytes, $stream, 0);
      } else {
        var imgData = $.imgData = readBinary($bytes, $stream, 0);
      }
      switch (imgData[0] << 8 | imgData[1]) {
      case 65496:
      case 65497:
        $.mimeType = 'image/jpeg';
        break;
      case 35152:
        $.mimeType = 'image/png';
        break;
      case 18249:
        $.mimeType = 'image/gif';
        break;
      default:
        $.mimeType = 'application/octet-stream';
      }
      if (tagCode === 6) {
        $.incomplete = 1;
      }
      return $;
    },
    36: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var format = $.format = readUi8($bytes, $stream);
      $.width = readUi16($bytes, $stream);
      $.height = readUi16($bytes, $stream);
      $.hasAlpha = tagCode === 36;
      if (format === 3) {
        $.colorTableSize = readUi8($bytes, $stream);
      }
      $.bmpData = readBinary($bytes, $stream, 0);
      return $;
    },
    37: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var $0 = $.bbox = {};
      align($bytes, $stream);
      var bits = readUb($bytes, $stream, 5);
      var xMin = readSb($bytes, $stream, bits);
      var xMax = readSb($bytes, $stream, bits);
      var yMin = readSb($bytes, $stream, bits);
      var yMax = readSb($bytes, $stream, bits);
      $0.left = xMin / 20;
      $0.right = xMax / 20;
      $0.top = yMin / 20;
      $0.bottom = yMax / 20;
      align($bytes, $stream);
      var flags = readUi16($bytes, $stream);
      var hasText = $.hasText = flags >> 7 & 1;
      $.wordWrap = flags >> 6 & 1;
      $.multiline = flags >> 5 & 1;
      $.password = flags >> 4 & 1;
      $.readonly = flags >> 3 & 1;
      var hasColor = $.hasColor = flags >> 2 & 1;
      var hasMaxLength = $.hasMaxLength = flags >> 1 & 1;
      var hasFont = $.hasFont = flags & 1;
      var hasFontClass = $.hasFontClass = flags >> 15 & 1;
      $.autoSize = flags >> 14 & 1;
      var hasLayout = $.hasLayout = flags >> 13 & 1;
      $.noSelect = flags >> 12 & 1;
      $.border = flags >> 11 & 1;
      $.wasStatic = flags >> 10 & 1;
      $.html = flags >> 9 & 1;
      $.useOutlines = flags >> 8 & 1;
      if (hasFont) {
        $.fontId = readUi16($bytes, $stream);
      }
      if (hasFontClass) {
        $.fontClass = readString($bytes, $stream, 0);
      }
      if (hasFont) {
        $.fontHeight = readUi16($bytes, $stream);
      }
      if (hasColor) {
        var $1 = $.color = {};
        $1.red = readUi8($bytes, $stream);
        $1.green = readUi8($bytes, $stream);
        $1.blue = readUi8($bytes, $stream);
        $1.alpha = readUi8($bytes, $stream);
      }
      if (hasMaxLength) {
        $.maxLength = readUi16($bytes, $stream);
      }
      if (hasLayout) {
        $.align = readUi8($bytes, $stream);
        $.leftMargin = readUi16($bytes, $stream);
        $.rightMargin = readUi16($bytes, $stream);
        $.indent = readSi16($bytes, $stream);
        $.leading = readSi16($bytes, $stream);
      }
      $.variableName = readString($bytes, $stream, 0);
      if (hasText) {
        $.initialText = readString($bytes, $stream, 0);
      }
      return $;
    },
    43: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.name = readString($bytes, $stream, 0);
      return $;
    },
    45: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      var playbackFlags = readUi8($bytes, $stream);
      $.playbackRate = playbackFlags >> 2 & 3;
      $.playbackSize = playbackFlags >> 1 & 1;
      $.playbackType = playbackFlags & 1;
      var streamFlags = readUi8($bytes, $stream);
      var streamCompression = $.streamCompression = streamFlags >> 4 & 15;
      $.streamRate = streamFlags >> 2 & 3;
      $.streamSize = streamFlags >> 1 & 1;
      $.streamType = streamFlags & 1;
      $.samplesCount = readUi32($bytes, $stream);
      if (streamCompression == 2) {
        $.latencySeek = readSi16($bytes, $stream);
      }
      return $;
    },
    46: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var $0 = $.bbox = {};
      align($bytes, $stream);
      var bits = readUb($bytes, $stream, 5);
      var xMin = readSb($bytes, $stream, bits);
      var xMax = readSb($bytes, $stream, bits);
      var yMin = readSb($bytes, $stream, bits);
      var yMax = readSb($bytes, $stream, bits);
      $0.left = xMin / 20;
      $0.right = xMax / 20;
      $0.top = yMin / 20;
      $0.bottom = yMax / 20;
      align($bytes, $stream);
      var isMorph = $.isMorph = tagCode === 46 || tagCode === 84;
      if (isMorph) {
        var $1 = $.bboxMorph = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $1.left = xMin / 20;
        $1.right = xMax / 20;
        $1.top = yMin / 20;
        $1.bottom = yMax / 20;
        align($bytes, $stream);
      }
      var hasStrokes = $.hasStrokes = tagCode === 83 || tagCode === 84;
      if (hasStrokes) {
        var $2 = $.strokeBbox = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $2.left = xMin / 20;
        $2.right = xMax / 20;
        $2.top = yMin / 20;
        $2.bottom = yMax / 20;
        align($bytes, $stream);
        if (isMorph) {
          var $3 = $.strokeBboxMorph = {};
          align($bytes, $stream);
          var bits = readUb($bytes, $stream, 5);
          var xMin = readSb($bytes, $stream, bits);
          var xMax = readSb($bytes, $stream, bits);
          var yMin = readSb($bytes, $stream, bits);
          var yMax = readSb($bytes, $stream, bits);
          $3.left = xMin / 20;
          $3.right = xMax / 20;
          $3.top = yMin / 20;
          $3.bottom = yMax / 20;
          align($bytes, $stream);
        }
        var reserved = readUb($bytes, $stream, 5);
        $.fillWinding = readUb($bytes, $stream, 1);
        $.nonScalingStrokes = readUb($bytes, $stream, 1);
        $.scalingStrokes = readUb($bytes, $stream, 1);
      }
      if (isMorph) {
        $.offsetMorph = readUi32($bytes, $stream);
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $4 = $.fillStyles = [];
        var $5 = count;
        while ($5--) {
          var $6 = {};
          var type = $6.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $7 = $6.color = {};
              $7.red = readUi8($bytes, $stream);
              $7.green = readUi8($bytes, $stream);
              $7.blue = readUi8($bytes, $stream);
              $7.alpha = readUi8($bytes, $stream);
            } else {
              var $8 = $6.color = {};
              $8.red = readUi8($bytes, $stream);
              $8.green = readUi8($bytes, $stream);
              $8.blue = readUi8($bytes, $stream);
              $8.alpha = 255;
            }
            if (isMorph) {
              var $9 = $6.colorMorph = {};
              $9.red = readUi8($bytes, $stream);
              $9.green = readUi8($bytes, $stream);
              $9.blue = readUi8($bytes, $stream);
              $9.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $10 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $10.a = readFb($bytes, $stream, bits);
              $10.d = readFb($bytes, $stream, bits);
            } else {
              $10.a = 1;
              $10.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $10.b = readFb($bytes, $stream, bits);
              $10.c = readFb($bytes, $stream, bits);
            } else {
              $10.b = 0;
              $10.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $10.tx = e / 20;
            $10.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $11 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $11.a = readFb($bytes, $stream, bits);
                $11.d = readFb($bytes, $stream, bits);
              } else {
                $11.a = 1;
                $11.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $11.b = readFb($bytes, $stream, bits);
                $11.c = readFb($bytes, $stream, bits);
              } else {
                $11.b = 0;
                $11.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $11.tx = e / 20;
              $11.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $6.spreadMode = readUb($bytes, $stream, 2);
              $6.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $6.count = readUb($bytes, $stream, 4);
            var $12 = $6.records = [];
            var $13 = count;
            while ($13--) {
              var $14 = {};
              $14.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $15 = $14.color = {};
                $15.red = readUi8($bytes, $stream);
                $15.green = readUi8($bytes, $stream);
                $15.blue = readUi8($bytes, $stream);
                $15.alpha = readUi8($bytes, $stream);
              } else {
                var $16 = $14.color = {};
                $16.red = readUi8($bytes, $stream);
                $16.green = readUi8($bytes, $stream);
                $16.blue = readUi8($bytes, $stream);
                $16.alpha = 255;
              }
              if (isMorph) {
                $14.ratioMorph = readUi8($bytes, $stream);
                var $17 = $14.colorMorph = {};
                $17.red = readUi8($bytes, $stream);
                $17.green = readUi8($bytes, $stream);
                $17.blue = readUi8($bytes, $stream);
                $17.alpha = readUi8($bytes, $stream);
              }
              $12.push($14);
            }
            if (type === 19) {
              $6.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $6.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $6.bitmapId = readUi16($bytes, $stream);
            var $18 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $18.a = readFb($bytes, $stream, bits);
              $18.d = readFb($bytes, $stream, bits);
            } else {
              $18.a = 1;
              $18.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $18.b = readFb($bytes, $stream, bits);
              $18.c = readFb($bytes, $stream, bits);
            } else {
              $18.b = 0;
              $18.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $18.tx = e / 20;
            $18.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $19 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $19.a = readFb($bytes, $stream, bits);
                $19.d = readFb($bytes, $stream, bits);
              } else {
                $19.a = 1;
                $19.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $19.b = readFb($bytes, $stream, bits);
                $19.c = readFb($bytes, $stream, bits);
              } else {
                $19.b = 0;
                $19.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $19.tx = e / 20;
              $19.ty = f / 20;
              align($bytes, $stream);
            }
            $6.condition = type === 64 || type === 67;
            break;
          default:
          }
          $4.push($6);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $20 = $.lineStyles = [];
        var $21 = count;
        while ($21--) {
          var $22 = {};
          $22.width = readUi16($bytes, $stream);
          if (isMorph) {
            $22.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $22.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $22.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $22.hasFill = readUb($bytes, $stream, 1);
            $22.noHscale = readUb($bytes, $stream, 1);
            $22.noVscale = readUb($bytes, $stream, 1);
            $22.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $22.noClose = readUb($bytes, $stream, 1);
            $22.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $22.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $23 = $22.fillStyle = {};
              var type = $23.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $24 = $23.color = {};
                  $24.red = readUi8($bytes, $stream);
                  $24.green = readUi8($bytes, $stream);
                  $24.blue = readUi8($bytes, $stream);
                  $24.alpha = readUi8($bytes, $stream);
                } else {
                  var $25 = $23.color = {};
                  $25.red = readUi8($bytes, $stream);
                  $25.green = readUi8($bytes, $stream);
                  $25.blue = readUi8($bytes, $stream);
                  $25.alpha = 255;
                }
                if (isMorph) {
                  var $26 = $23.colorMorph = {};
                  $26.red = readUi8($bytes, $stream);
                  $26.green = readUi8($bytes, $stream);
                  $26.blue = readUi8($bytes, $stream);
                  $26.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $27 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.a = readFb($bytes, $stream, bits);
                  $27.d = readFb($bytes, $stream, bits);
                } else {
                  $27.a = 1;
                  $27.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.b = readFb($bytes, $stream, bits);
                  $27.c = readFb($bytes, $stream, bits);
                } else {
                  $27.b = 0;
                  $27.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $27.tx = e / 20;
                $27.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $28 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.a = readFb($bytes, $stream, bits);
                    $28.d = readFb($bytes, $stream, bits);
                  } else {
                    $28.a = 1;
                    $28.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.b = readFb($bytes, $stream, bits);
                    $28.c = readFb($bytes, $stream, bits);
                  } else {
                    $28.b = 0;
                    $28.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $28.tx = e / 20;
                  $28.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $23.spreadMode = readUb($bytes, $stream, 2);
                  $23.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $23.count = readUb($bytes, $stream, 4);
                var $29 = $23.records = [];
                var $30 = count;
                while ($30--) {
                  var $31 = {};
                  $31.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $32 = $31.color = {};
                    $32.red = readUi8($bytes, $stream);
                    $32.green = readUi8($bytes, $stream);
                    $32.blue = readUi8($bytes, $stream);
                    $32.alpha = readUi8($bytes, $stream);
                  } else {
                    var $33 = $31.color = {};
                    $33.red = readUi8($bytes, $stream);
                    $33.green = readUi8($bytes, $stream);
                    $33.blue = readUi8($bytes, $stream);
                    $33.alpha = 255;
                  }
                  if (isMorph) {
                    $31.ratioMorph = readUi8($bytes, $stream);
                    var $34 = $31.colorMorph = {};
                    $34.red = readUi8($bytes, $stream);
                    $34.green = readUi8($bytes, $stream);
                    $34.blue = readUi8($bytes, $stream);
                    $34.alpha = readUi8($bytes, $stream);
                  }
                  $29.push($31);
                }
                if (type === 19) {
                  $23.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $23.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $23.bitmapId = readUi16($bytes, $stream);
                var $35 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.a = readFb($bytes, $stream, bits);
                  $35.d = readFb($bytes, $stream, bits);
                } else {
                  $35.a = 1;
                  $35.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.b = readFb($bytes, $stream, bits);
                  $35.c = readFb($bytes, $stream, bits);
                } else {
                  $35.b = 0;
                  $35.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $35.tx = e / 20;
                $35.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $36 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.a = readFb($bytes, $stream, bits);
                    $36.d = readFb($bytes, $stream, bits);
                  } else {
                    $36.a = 1;
                    $36.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.b = readFb($bytes, $stream, bits);
                    $36.c = readFb($bytes, $stream, bits);
                  } else {
                    $36.b = 0;
                    $36.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $36.tx = e / 20;
                  $36.ty = f / 20;
                  align($bytes, $stream);
                }
                $23.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $37 = $22.color = {};
              $37.red = readUi8($bytes, $stream);
              $37.green = readUi8($bytes, $stream);
              $37.blue = readUi8($bytes, $stream);
              $37.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $38 = $22.colorMorph = {};
                $38.red = readUi8($bytes, $stream);
                $38.green = readUi8($bytes, $stream);
                $38.blue = readUi8($bytes, $stream);
                $38.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $39 = $22.color = {};
              $39.red = readUi8($bytes, $stream);
              $39.green = readUi8($bytes, $stream);
              $39.blue = readUi8($bytes, $stream);
              $39.alpha = readUi8($bytes, $stream);
            } else {
              var $40 = $22.color = {};
              $40.red = readUi8($bytes, $stream);
              $40.green = readUi8($bytes, $stream);
              $40.blue = readUi8($bytes, $stream);
              $40.alpha = 255;
            }
            if (isMorph) {
              var $41 = $22.colorMorph = {};
              $41.red = readUi8($bytes, $stream);
              $41.green = readUi8($bytes, $stream);
              $41.blue = readUi8($bytes, $stream);
              $41.alpha = readUi8($bytes, $stream);
            }
          }
          $20.push($22);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $42 = $.records = [];
        do {
          var $43 = {};
          var type = $43.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $43.eos = !(type || flags);
          if (type) {
            var isStraight = $43.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $43.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $43.deltaX = readSb($bytes, $stream, bits);
                $43.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $43.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $43.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $43.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $43.controlDeltaX = readSb($bytes, $stream, bits);
              $43.controlDeltaY = readSb($bytes, $stream, bits);
              $43.anchorDeltaX = readSb($bytes, $stream, bits);
              $43.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $43.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $43.hasNewStyles = 0;
            }
            var hasLineStyle = $43.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $43.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $43.hasFillStyle0 = flags >> 1 & 1;
            var move = $43.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $43.moveX = readSb($bytes, $stream, bits);
              $43.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $43.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $43.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $43.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $44 = $43.fillStyles = [];
              var $45 = count;
              while ($45--) {
                var $46 = {};
                var type = $46.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $47 = $46.color = {};
                    $47.red = readUi8($bytes, $stream);
                    $47.green = readUi8($bytes, $stream);
                    $47.blue = readUi8($bytes, $stream);
                    $47.alpha = readUi8($bytes, $stream);
                  } else {
                    var $48 = $46.color = {};
                    $48.red = readUi8($bytes, $stream);
                    $48.green = readUi8($bytes, $stream);
                    $48.blue = readUi8($bytes, $stream);
                    $48.alpha = 255;
                  }
                  if (isMorph) {
                    var $49 = $46.colorMorph = {};
                    $49.red = readUi8($bytes, $stream);
                    $49.green = readUi8($bytes, $stream);
                    $49.blue = readUi8($bytes, $stream);
                    $49.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $50 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.a = readFb($bytes, $stream, bits);
                    $50.d = readFb($bytes, $stream, bits);
                  } else {
                    $50.a = 1;
                    $50.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.b = readFb($bytes, $stream, bits);
                    $50.c = readFb($bytes, $stream, bits);
                  } else {
                    $50.b = 0;
                    $50.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $50.tx = e / 20;
                  $50.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $51 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.a = readFb($bytes, $stream, bits);
                      $51.d = readFb($bytes, $stream, bits);
                    } else {
                      $51.a = 1;
                      $51.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.b = readFb($bytes, $stream, bits);
                      $51.c = readFb($bytes, $stream, bits);
                    } else {
                      $51.b = 0;
                      $51.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $51.tx = e / 20;
                    $51.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $46.spreadMode = readUb($bytes, $stream, 2);
                    $46.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $46.count = readUb($bytes, $stream, 4);
                  var $52 = $46.records = [];
                  var $53 = count;
                  while ($53--) {
                    var $54 = {};
                    $54.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $55 = $54.color = {};
                      $55.red = readUi8($bytes, $stream);
                      $55.green = readUi8($bytes, $stream);
                      $55.blue = readUi8($bytes, $stream);
                      $55.alpha = readUi8($bytes, $stream);
                    } else {
                      var $56 = $54.color = {};
                      $56.red = readUi8($bytes, $stream);
                      $56.green = readUi8($bytes, $stream);
                      $56.blue = readUi8($bytes, $stream);
                      $56.alpha = 255;
                    }
                    if (isMorph) {
                      $54.ratioMorph = readUi8($bytes, $stream);
                      var $57 = $54.colorMorph = {};
                      $57.red = readUi8($bytes, $stream);
                      $57.green = readUi8($bytes, $stream);
                      $57.blue = readUi8($bytes, $stream);
                      $57.alpha = readUi8($bytes, $stream);
                    }
                    $52.push($54);
                  }
                  if (type === 19) {
                    $46.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $46.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $46.bitmapId = readUi16($bytes, $stream);
                  var $58 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.a = readFb($bytes, $stream, bits);
                    $58.d = readFb($bytes, $stream, bits);
                  } else {
                    $58.a = 1;
                    $58.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.b = readFb($bytes, $stream, bits);
                    $58.c = readFb($bytes, $stream, bits);
                  } else {
                    $58.b = 0;
                    $58.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $58.tx = e / 20;
                  $58.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $59 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.a = readFb($bytes, $stream, bits);
                      $59.d = readFb($bytes, $stream, bits);
                    } else {
                      $59.a = 1;
                      $59.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.b = readFb($bytes, $stream, bits);
                      $59.c = readFb($bytes, $stream, bits);
                    } else {
                      $59.b = 0;
                      $59.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $59.tx = e / 20;
                    $59.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $46.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $44.push($46);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $60 = $43.lineStyles = [];
              var $61 = count;
              while ($61--) {
                var $62 = {};
                $62.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $62.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $62.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $62.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $62.hasFill = readUb($bytes, $stream, 1);
                  $62.noHscale = readUb($bytes, $stream, 1);
                  $62.noVscale = readUb($bytes, $stream, 1);
                  $62.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $62.noClose = readUb($bytes, $stream, 1);
                  $62.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $62.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $63 = $62.fillStyle = {};
                    var type = $63.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $64 = $63.color = {};
                        $64.red = readUi8($bytes, $stream);
                        $64.green = readUi8($bytes, $stream);
                        $64.blue = readUi8($bytes, $stream);
                        $64.alpha = readUi8($bytes, $stream);
                      } else {
                        var $65 = $63.color = {};
                        $65.red = readUi8($bytes, $stream);
                        $65.green = readUi8($bytes, $stream);
                        $65.blue = readUi8($bytes, $stream);
                        $65.alpha = 255;
                      }
                      if (isMorph) {
                        var $66 = $63.colorMorph = {};
                        $66.red = readUi8($bytes, $stream);
                        $66.green = readUi8($bytes, $stream);
                        $66.blue = readUi8($bytes, $stream);
                        $66.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $67 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.a = readFb($bytes, $stream, bits);
                        $67.d = readFb($bytes, $stream, bits);
                      } else {
                        $67.a = 1;
                        $67.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.b = readFb($bytes, $stream, bits);
                        $67.c = readFb($bytes, $stream, bits);
                      } else {
                        $67.b = 0;
                        $67.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $67.tx = e / 20;
                      $67.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $68 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.a = readFb($bytes, $stream, bits);
                          $68.d = readFb($bytes, $stream, bits);
                        } else {
                          $68.a = 1;
                          $68.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.b = readFb($bytes, $stream, bits);
                          $68.c = readFb($bytes, $stream, bits);
                        } else {
                          $68.b = 0;
                          $68.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $68.tx = e / 20;
                        $68.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $63.spreadMode = readUb($bytes, $stream, 2);
                        $63.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $63.count = readUb($bytes, $stream, 4);
                      var $69 = $63.records = [];
                      var $70 = count;
                      while ($70--) {
                        var $71 = {};
                        $71.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $72 = $71.color = {};
                          $72.red = readUi8($bytes, $stream);
                          $72.green = readUi8($bytes, $stream);
                          $72.blue = readUi8($bytes, $stream);
                          $72.alpha = readUi8($bytes, $stream);
                        } else {
                          var $73 = $71.color = {};
                          $73.red = readUi8($bytes, $stream);
                          $73.green = readUi8($bytes, $stream);
                          $73.blue = readUi8($bytes, $stream);
                          $73.alpha = 255;
                        }
                        if (isMorph) {
                          $71.ratioMorph = readUi8($bytes, $stream);
                          var $74 = $71.colorMorph = {};
                          $74.red = readUi8($bytes, $stream);
                          $74.green = readUi8($bytes, $stream);
                          $74.blue = readUi8($bytes, $stream);
                          $74.alpha = readUi8($bytes, $stream);
                        }
                        $69.push($71);
                      }
                      if (type === 19) {
                        $63.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $63.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $63.bitmapId = readUi16($bytes, $stream);
                      var $75 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.a = readFb($bytes, $stream, bits);
                        $75.d = readFb($bytes, $stream, bits);
                      } else {
                        $75.a = 1;
                        $75.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.b = readFb($bytes, $stream, bits);
                        $75.c = readFb($bytes, $stream, bits);
                      } else {
                        $75.b = 0;
                        $75.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $75.tx = e / 20;
                      $75.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $76 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.a = readFb($bytes, $stream, bits);
                          $76.d = readFb($bytes, $stream, bits);
                        } else {
                          $76.a = 1;
                          $76.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.b = readFb($bytes, $stream, bits);
                          $76.c = readFb($bytes, $stream, bits);
                        } else {
                          $76.b = 0;
                          $76.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $76.tx = e / 20;
                        $76.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $63.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $77 = $62.color = {};
                    $77.red = readUi8($bytes, $stream);
                    $77.green = readUi8($bytes, $stream);
                    $77.blue = readUi8($bytes, $stream);
                    $77.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $78 = $62.colorMorph = {};
                      $78.red = readUi8($bytes, $stream);
                      $78.green = readUi8($bytes, $stream);
                      $78.blue = readUi8($bytes, $stream);
                      $78.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $79 = $62.color = {};
                    $79.red = readUi8($bytes, $stream);
                    $79.green = readUi8($bytes, $stream);
                    $79.blue = readUi8($bytes, $stream);
                    $79.alpha = readUi8($bytes, $stream);
                  } else {
                    var $80 = $62.color = {};
                    $80.red = readUi8($bytes, $stream);
                    $80.green = readUi8($bytes, $stream);
                    $80.blue = readUi8($bytes, $stream);
                    $80.alpha = 255;
                  }
                  if (isMorph) {
                    var $81 = $62.colorMorph = {};
                    $81.red = readUi8($bytes, $stream);
                    $81.green = readUi8($bytes, $stream);
                    $81.blue = readUi8($bytes, $stream);
                    $81.alpha = readUi8($bytes, $stream);
                  }
                }
                $60.push($62);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $42.push($43);
        } while (!eos);
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $82 = $.recordsMorph = [];
        do {
          var $83 = {};
          var type = $83.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $83.eos = !(type || flags);
          if (type) {
            var isStraight = $83.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $83.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $83.deltaX = readSb($bytes, $stream, bits);
                $83.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $83.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $83.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $83.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $83.controlDeltaX = readSb($bytes, $stream, bits);
              $83.controlDeltaY = readSb($bytes, $stream, bits);
              $83.anchorDeltaX = readSb($bytes, $stream, bits);
              $83.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $83.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $83.hasNewStyles = 0;
            }
            var hasLineStyle = $83.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $83.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $83.hasFillStyle0 = flags >> 1 & 1;
            var move = $83.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $83.moveX = readSb($bytes, $stream, bits);
              $83.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $83.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $83.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $83.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $84 = $83.fillStyles = [];
              var $85 = count;
              while ($85--) {
                var $86 = {};
                var type = $86.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $87 = $86.color = {};
                    $87.red = readUi8($bytes, $stream);
                    $87.green = readUi8($bytes, $stream);
                    $87.blue = readUi8($bytes, $stream);
                    $87.alpha = readUi8($bytes, $stream);
                  } else {
                    var $88 = $86.color = {};
                    $88.red = readUi8($bytes, $stream);
                    $88.green = readUi8($bytes, $stream);
                    $88.blue = readUi8($bytes, $stream);
                    $88.alpha = 255;
                  }
                  if (isMorph) {
                    var $89 = $86.colorMorph = {};
                    $89.red = readUi8($bytes, $stream);
                    $89.green = readUi8($bytes, $stream);
                    $89.blue = readUi8($bytes, $stream);
                    $89.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $90 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.a = readFb($bytes, $stream, bits);
                    $90.d = readFb($bytes, $stream, bits);
                  } else {
                    $90.a = 1;
                    $90.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.b = readFb($bytes, $stream, bits);
                    $90.c = readFb($bytes, $stream, bits);
                  } else {
                    $90.b = 0;
                    $90.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $90.tx = e / 20;
                  $90.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $91 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.a = readFb($bytes, $stream, bits);
                      $91.d = readFb($bytes, $stream, bits);
                    } else {
                      $91.a = 1;
                      $91.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.b = readFb($bytes, $stream, bits);
                      $91.c = readFb($bytes, $stream, bits);
                    } else {
                      $91.b = 0;
                      $91.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $91.tx = e / 20;
                    $91.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $86.spreadMode = readUb($bytes, $stream, 2);
                    $86.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $86.count = readUb($bytes, $stream, 4);
                  var $92 = $86.records = [];
                  var $93 = count;
                  while ($93--) {
                    var $94 = {};
                    $94.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $95 = $94.color = {};
                      $95.red = readUi8($bytes, $stream);
                      $95.green = readUi8($bytes, $stream);
                      $95.blue = readUi8($bytes, $stream);
                      $95.alpha = readUi8($bytes, $stream);
                    } else {
                      var $96 = $94.color = {};
                      $96.red = readUi8($bytes, $stream);
                      $96.green = readUi8($bytes, $stream);
                      $96.blue = readUi8($bytes, $stream);
                      $96.alpha = 255;
                    }
                    if (isMorph) {
                      $94.ratioMorph = readUi8($bytes, $stream);
                      var $97 = $94.colorMorph = {};
                      $97.red = readUi8($bytes, $stream);
                      $97.green = readUi8($bytes, $stream);
                      $97.blue = readUi8($bytes, $stream);
                      $97.alpha = readUi8($bytes, $stream);
                    }
                    $92.push($94);
                  }
                  if (type === 19) {
                    $86.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $86.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $86.bitmapId = readUi16($bytes, $stream);
                  var $98 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.a = readFb($bytes, $stream, bits);
                    $98.d = readFb($bytes, $stream, bits);
                  } else {
                    $98.a = 1;
                    $98.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.b = readFb($bytes, $stream, bits);
                    $98.c = readFb($bytes, $stream, bits);
                  } else {
                    $98.b = 0;
                    $98.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $98.tx = e / 20;
                  $98.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $99 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.a = readFb($bytes, $stream, bits);
                      $99.d = readFb($bytes, $stream, bits);
                    } else {
                      $99.a = 1;
                      $99.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.b = readFb($bytes, $stream, bits);
                      $99.c = readFb($bytes, $stream, bits);
                    } else {
                      $99.b = 0;
                      $99.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $99.tx = e / 20;
                    $99.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $86.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $84.push($86);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $100 = $83.lineStyles = [];
              var $101 = count;
              while ($101--) {
                var $102 = {};
                $102.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $102.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $102.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $102.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $102.hasFill = readUb($bytes, $stream, 1);
                  $102.noHscale = readUb($bytes, $stream, 1);
                  $102.noVscale = readUb($bytes, $stream, 1);
                  $102.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $102.noClose = readUb($bytes, $stream, 1);
                  $102.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $102.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $103 = $102.fillStyle = {};
                    var type = $103.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $104 = $103.color = {};
                        $104.red = readUi8($bytes, $stream);
                        $104.green = readUi8($bytes, $stream);
                        $104.blue = readUi8($bytes, $stream);
                        $104.alpha = readUi8($bytes, $stream);
                      } else {
                        var $105 = $103.color = {};
                        $105.red = readUi8($bytes, $stream);
                        $105.green = readUi8($bytes, $stream);
                        $105.blue = readUi8($bytes, $stream);
                        $105.alpha = 255;
                      }
                      if (isMorph) {
                        var $106 = $103.colorMorph = {};
                        $106.red = readUi8($bytes, $stream);
                        $106.green = readUi8($bytes, $stream);
                        $106.blue = readUi8($bytes, $stream);
                        $106.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $107 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.a = readFb($bytes, $stream, bits);
                        $107.d = readFb($bytes, $stream, bits);
                      } else {
                        $107.a = 1;
                        $107.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.b = readFb($bytes, $stream, bits);
                        $107.c = readFb($bytes, $stream, bits);
                      } else {
                        $107.b = 0;
                        $107.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $107.tx = e / 20;
                      $107.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $108 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.a = readFb($bytes, $stream, bits);
                          $108.d = readFb($bytes, $stream, bits);
                        } else {
                          $108.a = 1;
                          $108.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.b = readFb($bytes, $stream, bits);
                          $108.c = readFb($bytes, $stream, bits);
                        } else {
                          $108.b = 0;
                          $108.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $108.tx = e / 20;
                        $108.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $103.spreadMode = readUb($bytes, $stream, 2);
                        $103.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $103.count = readUb($bytes, $stream, 4);
                      var $109 = $103.records = [];
                      var $110 = count;
                      while ($110--) {
                        var $111 = {};
                        $111.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $112 = $111.color = {};
                          $112.red = readUi8($bytes, $stream);
                          $112.green = readUi8($bytes, $stream);
                          $112.blue = readUi8($bytes, $stream);
                          $112.alpha = readUi8($bytes, $stream);
                        } else {
                          var $113 = $111.color = {};
                          $113.red = readUi8($bytes, $stream);
                          $113.green = readUi8($bytes, $stream);
                          $113.blue = readUi8($bytes, $stream);
                          $113.alpha = 255;
                        }
                        if (isMorph) {
                          $111.ratioMorph = readUi8($bytes, $stream);
                          var $114 = $111.colorMorph = {};
                          $114.red = readUi8($bytes, $stream);
                          $114.green = readUi8($bytes, $stream);
                          $114.blue = readUi8($bytes, $stream);
                          $114.alpha = readUi8($bytes, $stream);
                        }
                        $109.push($111);
                      }
                      if (type === 19) {
                        $103.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $103.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $103.bitmapId = readUi16($bytes, $stream);
                      var $115 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.a = readFb($bytes, $stream, bits);
                        $115.d = readFb($bytes, $stream, bits);
                      } else {
                        $115.a = 1;
                        $115.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.b = readFb($bytes, $stream, bits);
                        $115.c = readFb($bytes, $stream, bits);
                      } else {
                        $115.b = 0;
                        $115.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $115.tx = e / 20;
                      $115.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $116 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.a = readFb($bytes, $stream, bits);
                          $116.d = readFb($bytes, $stream, bits);
                        } else {
                          $116.a = 1;
                          $116.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.b = readFb($bytes, $stream, bits);
                          $116.c = readFb($bytes, $stream, bits);
                        } else {
                          $116.b = 0;
                          $116.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $116.tx = e / 20;
                        $116.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $103.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $117 = $102.color = {};
                    $117.red = readUi8($bytes, $stream);
                    $117.green = readUi8($bytes, $stream);
                    $117.blue = readUi8($bytes, $stream);
                    $117.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $118 = $102.colorMorph = {};
                      $118.red = readUi8($bytes, $stream);
                      $118.green = readUi8($bytes, $stream);
                      $118.blue = readUi8($bytes, $stream);
                      $118.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $119 = $102.color = {};
                    $119.red = readUi8($bytes, $stream);
                    $119.green = readUi8($bytes, $stream);
                    $119.blue = readUi8($bytes, $stream);
                    $119.alpha = readUi8($bytes, $stream);
                  } else {
                    var $120 = $102.color = {};
                    $120.red = readUi8($bytes, $stream);
                    $120.green = readUi8($bytes, $stream);
                    $120.blue = readUi8($bytes, $stream);
                    $120.alpha = 255;
                  }
                  if (isMorph) {
                    var $121 = $102.colorMorph = {};
                    $121.red = readUi8($bytes, $stream);
                    $121.green = readUi8($bytes, $stream);
                    $121.blue = readUi8($bytes, $stream);
                    $121.alpha = readUi8($bytes, $stream);
                  }
                }
                $100.push($102);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $82.push($83);
        } while (!eos);
      } else {
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $122 = $.fillStyles = [];
        var $123 = count;
        while ($123--) {
          var $124 = {};
          var type = $124.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $125 = $124.color = {};
              $125.red = readUi8($bytes, $stream);
              $125.green = readUi8($bytes, $stream);
              $125.blue = readUi8($bytes, $stream);
              $125.alpha = readUi8($bytes, $stream);
            } else {
              var $126 = $124.color = {};
              $126.red = readUi8($bytes, $stream);
              $126.green = readUi8($bytes, $stream);
              $126.blue = readUi8($bytes, $stream);
              $126.alpha = 255;
            }
            if (isMorph) {
              var $127 = $124.colorMorph = {};
              $127.red = readUi8($bytes, $stream);
              $127.green = readUi8($bytes, $stream);
              $127.blue = readUi8($bytes, $stream);
              $127.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $128 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $128.a = readFb($bytes, $stream, bits);
              $128.d = readFb($bytes, $stream, bits);
            } else {
              $128.a = 1;
              $128.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $128.b = readFb($bytes, $stream, bits);
              $128.c = readFb($bytes, $stream, bits);
            } else {
              $128.b = 0;
              $128.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $128.tx = e / 20;
            $128.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $129 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $129.a = readFb($bytes, $stream, bits);
                $129.d = readFb($bytes, $stream, bits);
              } else {
                $129.a = 1;
                $129.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $129.b = readFb($bytes, $stream, bits);
                $129.c = readFb($bytes, $stream, bits);
              } else {
                $129.b = 0;
                $129.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $129.tx = e / 20;
              $129.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $124.spreadMode = readUb($bytes, $stream, 2);
              $124.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $124.count = readUb($bytes, $stream, 4);
            var $130 = $124.records = [];
            var $131 = count;
            while ($131--) {
              var $132 = {};
              $132.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $133 = $132.color = {};
                $133.red = readUi8($bytes, $stream);
                $133.green = readUi8($bytes, $stream);
                $133.blue = readUi8($bytes, $stream);
                $133.alpha = readUi8($bytes, $stream);
              } else {
                var $134 = $132.color = {};
                $134.red = readUi8($bytes, $stream);
                $134.green = readUi8($bytes, $stream);
                $134.blue = readUi8($bytes, $stream);
                $134.alpha = 255;
              }
              if (isMorph) {
                $132.ratioMorph = readUi8($bytes, $stream);
                var $135 = $132.colorMorph = {};
                $135.red = readUi8($bytes, $stream);
                $135.green = readUi8($bytes, $stream);
                $135.blue = readUi8($bytes, $stream);
                $135.alpha = readUi8($bytes, $stream);
              }
              $130.push($132);
            }
            if (type === 19) {
              $124.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $124.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $124.bitmapId = readUi16($bytes, $stream);
            var $136 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $136.a = readFb($bytes, $stream, bits);
              $136.d = readFb($bytes, $stream, bits);
            } else {
              $136.a = 1;
              $136.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $136.b = readFb($bytes, $stream, bits);
              $136.c = readFb($bytes, $stream, bits);
            } else {
              $136.b = 0;
              $136.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $136.tx = e / 20;
            $136.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $137 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $137.a = readFb($bytes, $stream, bits);
                $137.d = readFb($bytes, $stream, bits);
              } else {
                $137.a = 1;
                $137.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $137.b = readFb($bytes, $stream, bits);
                $137.c = readFb($bytes, $stream, bits);
              } else {
                $137.b = 0;
                $137.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $137.tx = e / 20;
              $137.ty = f / 20;
              align($bytes, $stream);
            }
            $124.condition = type === 64 || type === 67;
            break;
          default:
          }
          $122.push($124);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $138 = $.lineStyles = [];
        var $139 = count;
        while ($139--) {
          var $140 = {};
          $140.width = readUi16($bytes, $stream);
          if (isMorph) {
            $140.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $140.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $140.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $140.hasFill = readUb($bytes, $stream, 1);
            $140.noHscale = readUb($bytes, $stream, 1);
            $140.noVscale = readUb($bytes, $stream, 1);
            $140.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $140.noClose = readUb($bytes, $stream, 1);
            $140.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $140.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $141 = $140.fillStyle = {};
              var type = $141.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $142 = $141.color = {};
                  $142.red = readUi8($bytes, $stream);
                  $142.green = readUi8($bytes, $stream);
                  $142.blue = readUi8($bytes, $stream);
                  $142.alpha = readUi8($bytes, $stream);
                } else {
                  var $143 = $141.color = {};
                  $143.red = readUi8($bytes, $stream);
                  $143.green = readUi8($bytes, $stream);
                  $143.blue = readUi8($bytes, $stream);
                  $143.alpha = 255;
                }
                if (isMorph) {
                  var $144 = $141.colorMorph = {};
                  $144.red = readUi8($bytes, $stream);
                  $144.green = readUi8($bytes, $stream);
                  $144.blue = readUi8($bytes, $stream);
                  $144.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $145 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.a = readFb($bytes, $stream, bits);
                  $145.d = readFb($bytes, $stream, bits);
                } else {
                  $145.a = 1;
                  $145.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.b = readFb($bytes, $stream, bits);
                  $145.c = readFb($bytes, $stream, bits);
                } else {
                  $145.b = 0;
                  $145.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $145.tx = e / 20;
                $145.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $146 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.a = readFb($bytes, $stream, bits);
                    $146.d = readFb($bytes, $stream, bits);
                  } else {
                    $146.a = 1;
                    $146.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.b = readFb($bytes, $stream, bits);
                    $146.c = readFb($bytes, $stream, bits);
                  } else {
                    $146.b = 0;
                    $146.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $146.tx = e / 20;
                  $146.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $141.spreadMode = readUb($bytes, $stream, 2);
                  $141.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $141.count = readUb($bytes, $stream, 4);
                var $147 = $141.records = [];
                var $148 = count;
                while ($148--) {
                  var $149 = {};
                  $149.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $150 = $149.color = {};
                    $150.red = readUi8($bytes, $stream);
                    $150.green = readUi8($bytes, $stream);
                    $150.blue = readUi8($bytes, $stream);
                    $150.alpha = readUi8($bytes, $stream);
                  } else {
                    var $151 = $149.color = {};
                    $151.red = readUi8($bytes, $stream);
                    $151.green = readUi8($bytes, $stream);
                    $151.blue = readUi8($bytes, $stream);
                    $151.alpha = 255;
                  }
                  if (isMorph) {
                    $149.ratioMorph = readUi8($bytes, $stream);
                    var $152 = $149.colorMorph = {};
                    $152.red = readUi8($bytes, $stream);
                    $152.green = readUi8($bytes, $stream);
                    $152.blue = readUi8($bytes, $stream);
                    $152.alpha = readUi8($bytes, $stream);
                  }
                  $147.push($149);
                }
                if (type === 19) {
                  $141.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $141.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $141.bitmapId = readUi16($bytes, $stream);
                var $153 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.a = readFb($bytes, $stream, bits);
                  $153.d = readFb($bytes, $stream, bits);
                } else {
                  $153.a = 1;
                  $153.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.b = readFb($bytes, $stream, bits);
                  $153.c = readFb($bytes, $stream, bits);
                } else {
                  $153.b = 0;
                  $153.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $153.tx = e / 20;
                $153.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $154 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.a = readFb($bytes, $stream, bits);
                    $154.d = readFb($bytes, $stream, bits);
                  } else {
                    $154.a = 1;
                    $154.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.b = readFb($bytes, $stream, bits);
                    $154.c = readFb($bytes, $stream, bits);
                  } else {
                    $154.b = 0;
                    $154.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $154.tx = e / 20;
                  $154.ty = f / 20;
                  align($bytes, $stream);
                }
                $141.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $155 = $140.color = {};
              $155.red = readUi8($bytes, $stream);
              $155.green = readUi8($bytes, $stream);
              $155.blue = readUi8($bytes, $stream);
              $155.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $156 = $140.colorMorph = {};
                $156.red = readUi8($bytes, $stream);
                $156.green = readUi8($bytes, $stream);
                $156.blue = readUi8($bytes, $stream);
                $156.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $157 = $140.color = {};
              $157.red = readUi8($bytes, $stream);
              $157.green = readUi8($bytes, $stream);
              $157.blue = readUi8($bytes, $stream);
              $157.alpha = readUi8($bytes, $stream);
            } else {
              var $158 = $140.color = {};
              $158.red = readUi8($bytes, $stream);
              $158.green = readUi8($bytes, $stream);
              $158.blue = readUi8($bytes, $stream);
              $158.alpha = 255;
            }
            if (isMorph) {
              var $159 = $140.colorMorph = {};
              $159.red = readUi8($bytes, $stream);
              $159.green = readUi8($bytes, $stream);
              $159.blue = readUi8($bytes, $stream);
              $159.alpha = readUi8($bytes, $stream);
            }
          }
          $138.push($140);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $160 = $.records = [];
        do {
          var $161 = {};
          var type = $161.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $161.eos = !(type || flags);
          if (type) {
            var isStraight = $161.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $161.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $161.deltaX = readSb($bytes, $stream, bits);
                $161.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $161.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $161.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $161.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $161.controlDeltaX = readSb($bytes, $stream, bits);
              $161.controlDeltaY = readSb($bytes, $stream, bits);
              $161.anchorDeltaX = readSb($bytes, $stream, bits);
              $161.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $161.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $161.hasNewStyles = 0;
            }
            var hasLineStyle = $161.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $161.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $161.hasFillStyle0 = flags >> 1 & 1;
            var move = $161.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $161.moveX = readSb($bytes, $stream, bits);
              $161.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $161.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $161.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $161.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $162 = $161.fillStyles = [];
              var $163 = count;
              while ($163--) {
                var $164 = {};
                var type = $164.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $165 = $164.color = {};
                    $165.red = readUi8($bytes, $stream);
                    $165.green = readUi8($bytes, $stream);
                    $165.blue = readUi8($bytes, $stream);
                    $165.alpha = readUi8($bytes, $stream);
                  } else {
                    var $166 = $164.color = {};
                    $166.red = readUi8($bytes, $stream);
                    $166.green = readUi8($bytes, $stream);
                    $166.blue = readUi8($bytes, $stream);
                    $166.alpha = 255;
                  }
                  if (isMorph) {
                    var $167 = $164.colorMorph = {};
                    $167.red = readUi8($bytes, $stream);
                    $167.green = readUi8($bytes, $stream);
                    $167.blue = readUi8($bytes, $stream);
                    $167.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $168 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.a = readFb($bytes, $stream, bits);
                    $168.d = readFb($bytes, $stream, bits);
                  } else {
                    $168.a = 1;
                    $168.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.b = readFb($bytes, $stream, bits);
                    $168.c = readFb($bytes, $stream, bits);
                  } else {
                    $168.b = 0;
                    $168.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $168.tx = e / 20;
                  $168.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $169 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.a = readFb($bytes, $stream, bits);
                      $169.d = readFb($bytes, $stream, bits);
                    } else {
                      $169.a = 1;
                      $169.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.b = readFb($bytes, $stream, bits);
                      $169.c = readFb($bytes, $stream, bits);
                    } else {
                      $169.b = 0;
                      $169.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $169.tx = e / 20;
                    $169.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $164.spreadMode = readUb($bytes, $stream, 2);
                    $164.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $164.count = readUb($bytes, $stream, 4);
                  var $170 = $164.records = [];
                  var $171 = count;
                  while ($171--) {
                    var $172 = {};
                    $172.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $173 = $172.color = {};
                      $173.red = readUi8($bytes, $stream);
                      $173.green = readUi8($bytes, $stream);
                      $173.blue = readUi8($bytes, $stream);
                      $173.alpha = readUi8($bytes, $stream);
                    } else {
                      var $174 = $172.color = {};
                      $174.red = readUi8($bytes, $stream);
                      $174.green = readUi8($bytes, $stream);
                      $174.blue = readUi8($bytes, $stream);
                      $174.alpha = 255;
                    }
                    if (isMorph) {
                      $172.ratioMorph = readUi8($bytes, $stream);
                      var $175 = $172.colorMorph = {};
                      $175.red = readUi8($bytes, $stream);
                      $175.green = readUi8($bytes, $stream);
                      $175.blue = readUi8($bytes, $stream);
                      $175.alpha = readUi8($bytes, $stream);
                    }
                    $170.push($172);
                  }
                  if (type === 19) {
                    $164.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $164.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $164.bitmapId = readUi16($bytes, $stream);
                  var $176 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.a = readFb($bytes, $stream, bits);
                    $176.d = readFb($bytes, $stream, bits);
                  } else {
                    $176.a = 1;
                    $176.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.b = readFb($bytes, $stream, bits);
                    $176.c = readFb($bytes, $stream, bits);
                  } else {
                    $176.b = 0;
                    $176.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $176.tx = e / 20;
                  $176.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $177 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.a = readFb($bytes, $stream, bits);
                      $177.d = readFb($bytes, $stream, bits);
                    } else {
                      $177.a = 1;
                      $177.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.b = readFb($bytes, $stream, bits);
                      $177.c = readFb($bytes, $stream, bits);
                    } else {
                      $177.b = 0;
                      $177.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $177.tx = e / 20;
                    $177.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $164.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $162.push($164);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $178 = $161.lineStyles = [];
              var $179 = count;
              while ($179--) {
                var $180 = {};
                $180.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $180.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $180.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $180.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $180.hasFill = readUb($bytes, $stream, 1);
                  $180.noHscale = readUb($bytes, $stream, 1);
                  $180.noVscale = readUb($bytes, $stream, 1);
                  $180.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $180.noClose = readUb($bytes, $stream, 1);
                  $180.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $180.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $181 = $180.fillStyle = {};
                    var type = $181.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $182 = $181.color = {};
                        $182.red = readUi8($bytes, $stream);
                        $182.green = readUi8($bytes, $stream);
                        $182.blue = readUi8($bytes, $stream);
                        $182.alpha = readUi8($bytes, $stream);
                      } else {
                        var $183 = $181.color = {};
                        $183.red = readUi8($bytes, $stream);
                        $183.green = readUi8($bytes, $stream);
                        $183.blue = readUi8($bytes, $stream);
                        $183.alpha = 255;
                      }
                      if (isMorph) {
                        var $184 = $181.colorMorph = {};
                        $184.red = readUi8($bytes, $stream);
                        $184.green = readUi8($bytes, $stream);
                        $184.blue = readUi8($bytes, $stream);
                        $184.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $185 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.a = readFb($bytes, $stream, bits);
                        $185.d = readFb($bytes, $stream, bits);
                      } else {
                        $185.a = 1;
                        $185.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.b = readFb($bytes, $stream, bits);
                        $185.c = readFb($bytes, $stream, bits);
                      } else {
                        $185.b = 0;
                        $185.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $185.tx = e / 20;
                      $185.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $186 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.a = readFb($bytes, $stream, bits);
                          $186.d = readFb($bytes, $stream, bits);
                        } else {
                          $186.a = 1;
                          $186.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.b = readFb($bytes, $stream, bits);
                          $186.c = readFb($bytes, $stream, bits);
                        } else {
                          $186.b = 0;
                          $186.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $186.tx = e / 20;
                        $186.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $181.spreadMode = readUb($bytes, $stream, 2);
                        $181.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $181.count = readUb($bytes, $stream, 4);
                      var $187 = $181.records = [];
                      var $188 = count;
                      while ($188--) {
                        var $189 = {};
                        $189.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $190 = $189.color = {};
                          $190.red = readUi8($bytes, $stream);
                          $190.green = readUi8($bytes, $stream);
                          $190.blue = readUi8($bytes, $stream);
                          $190.alpha = readUi8($bytes, $stream);
                        } else {
                          var $191 = $189.color = {};
                          $191.red = readUi8($bytes, $stream);
                          $191.green = readUi8($bytes, $stream);
                          $191.blue = readUi8($bytes, $stream);
                          $191.alpha = 255;
                        }
                        if (isMorph) {
                          $189.ratioMorph = readUi8($bytes, $stream);
                          var $192 = $189.colorMorph = {};
                          $192.red = readUi8($bytes, $stream);
                          $192.green = readUi8($bytes, $stream);
                          $192.blue = readUi8($bytes, $stream);
                          $192.alpha = readUi8($bytes, $stream);
                        }
                        $187.push($189);
                      }
                      if (type === 19) {
                        $181.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $181.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $181.bitmapId = readUi16($bytes, $stream);
                      var $193 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.a = readFb($bytes, $stream, bits);
                        $193.d = readFb($bytes, $stream, bits);
                      } else {
                        $193.a = 1;
                        $193.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.b = readFb($bytes, $stream, bits);
                        $193.c = readFb($bytes, $stream, bits);
                      } else {
                        $193.b = 0;
                        $193.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $193.tx = e / 20;
                      $193.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $194 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.a = readFb($bytes, $stream, bits);
                          $194.d = readFb($bytes, $stream, bits);
                        } else {
                          $194.a = 1;
                          $194.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.b = readFb($bytes, $stream, bits);
                          $194.c = readFb($bytes, $stream, bits);
                        } else {
                          $194.b = 0;
                          $194.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $194.tx = e / 20;
                        $194.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $181.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $195 = $180.color = {};
                    $195.red = readUi8($bytes, $stream);
                    $195.green = readUi8($bytes, $stream);
                    $195.blue = readUi8($bytes, $stream);
                    $195.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $196 = $180.colorMorph = {};
                      $196.red = readUi8($bytes, $stream);
                      $196.green = readUi8($bytes, $stream);
                      $196.blue = readUi8($bytes, $stream);
                      $196.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $197 = $180.color = {};
                    $197.red = readUi8($bytes, $stream);
                    $197.green = readUi8($bytes, $stream);
                    $197.blue = readUi8($bytes, $stream);
                    $197.alpha = readUi8($bytes, $stream);
                  } else {
                    var $198 = $180.color = {};
                    $198.red = readUi8($bytes, $stream);
                    $198.green = readUi8($bytes, $stream);
                    $198.blue = readUi8($bytes, $stream);
                    $198.alpha = 255;
                  }
                  if (isMorph) {
                    var $199 = $180.colorMorph = {};
                    $199.red = readUi8($bytes, $stream);
                    $199.green = readUi8($bytes, $stream);
                    $199.blue = readUi8($bytes, $stream);
                    $199.alpha = readUi8($bytes, $stream);
                  }
                }
                $178.push($180);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $160.push($161);
        } while (!eos);
      }
      return $;
    },
    48: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var hasLayout = $.hasLayout = readUb($bytes, $stream, 1);
      if (swfVersion > 5) {
        $.shiftJis = readUb($bytes, $stream, 1);
      } else {
        var reserved = readUb($bytes, $stream, 1);
      }
      $.smallText = readUb($bytes, $stream, 1);
      $.ansi = readUb($bytes, $stream, 1);
      var wideOffset = $.wideOffset = readUb($bytes, $stream, 1);
      var wide = $.wide = readUb($bytes, $stream, 1);
      $.italic = readUb($bytes, $stream, 1);
      $.bold = readUb($bytes, $stream, 1);
      if (swfVersion > 5) {
        $.language = readUi8($bytes, $stream);
      } else {
        var reserved = readUi8($bytes, $stream);
        $.language = 0;
      }
      var nameLength = readUi8($bytes, $stream);
      $.name = readString($bytes, $stream, nameLength);
      if (tagCode === 75) {
        $.resolution = 20;
      }
      var glyphCount = $.glyphCount = readUi16($bytes, $stream);
      if (wideOffset) {
        var $0 = $.offsets = [];
        var $1 = glyphCount;
        while ($1--) {
          $0.push(readUi32($bytes, $stream));
        }
        $.mapOffset = readUi32($bytes, $stream);
      } else {
        var $2 = $.offsets = [];
        var $3 = glyphCount;
        while ($3--) {
          $2.push(readUi16($bytes, $stream));
        }
        $.mapOffset = readUi16($bytes, $stream);
      }
      var $4 = $.glyphs = [];
      var $5 = glyphCount;
      while ($5--) {
        var $6 = {};
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $7 = $6.records = [];
        do {
          var $8 = {};
          var type = $8.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $8.eos = !(type || flags);
          if (type) {
            var isStraight = $8.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $8.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $8.deltaX = readSb($bytes, $stream, bits);
                $8.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $8.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $8.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $8.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $8.controlDeltaX = readSb($bytes, $stream, bits);
              $8.controlDeltaY = readSb($bytes, $stream, bits);
              $8.anchorDeltaX = readSb($bytes, $stream, bits);
              $8.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $8.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $8.hasNewStyles = 0;
            }
            var hasLineStyle = $8.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $8.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $8.hasFillStyle0 = flags >> 1 & 1;
            var move = $8.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $8.moveX = readSb($bytes, $stream, bits);
              $8.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $8.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $8.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $8.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $9 = $8.fillStyles = [];
              var $10 = count;
              while ($10--) {
                var $11 = {};
                var type = $11.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $12 = $11.color = {};
                    $12.red = readUi8($bytes, $stream);
                    $12.green = readUi8($bytes, $stream);
                    $12.blue = readUi8($bytes, $stream);
                    $12.alpha = readUi8($bytes, $stream);
                  } else {
                    var $13 = $11.color = {};
                    $13.red = readUi8($bytes, $stream);
                    $13.green = readUi8($bytes, $stream);
                    $13.blue = readUi8($bytes, $stream);
                    $13.alpha = 255;
                  }
                  if (isMorph) {
                    var $14 = $11.colorMorph = {};
                    $14.red = readUi8($bytes, $stream);
                    $14.green = readUi8($bytes, $stream);
                    $14.blue = readUi8($bytes, $stream);
                    $14.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $15 = $11.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $15.a = readFb($bytes, $stream, bits);
                    $15.d = readFb($bytes, $stream, bits);
                  } else {
                    $15.a = 1;
                    $15.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $15.b = readFb($bytes, $stream, bits);
                    $15.c = readFb($bytes, $stream, bits);
                  } else {
                    $15.b = 0;
                    $15.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $15.tx = e / 20;
                  $15.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $16 = $11.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $16.a = readFb($bytes, $stream, bits);
                      $16.d = readFb($bytes, $stream, bits);
                    } else {
                      $16.a = 1;
                      $16.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $16.b = readFb($bytes, $stream, bits);
                      $16.c = readFb($bytes, $stream, bits);
                    } else {
                      $16.b = 0;
                      $16.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $16.tx = e / 20;
                    $16.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $11.spreadMode = readUb($bytes, $stream, 2);
                    $11.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $11.count = readUb($bytes, $stream, 4);
                  var $17 = $11.records = [];
                  var $18 = count;
                  while ($18--) {
                    var $19 = {};
                    $19.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $20 = $19.color = {};
                      $20.red = readUi8($bytes, $stream);
                      $20.green = readUi8($bytes, $stream);
                      $20.blue = readUi8($bytes, $stream);
                      $20.alpha = readUi8($bytes, $stream);
                    } else {
                      var $21 = $19.color = {};
                      $21.red = readUi8($bytes, $stream);
                      $21.green = readUi8($bytes, $stream);
                      $21.blue = readUi8($bytes, $stream);
                      $21.alpha = 255;
                    }
                    if (isMorph) {
                      $19.ratioMorph = readUi8($bytes, $stream);
                      var $22 = $19.colorMorph = {};
                      $22.red = readUi8($bytes, $stream);
                      $22.green = readUi8($bytes, $stream);
                      $22.blue = readUi8($bytes, $stream);
                      $22.alpha = readUi8($bytes, $stream);
                    }
                    $17.push($19);
                  }
                  if (type === 19) {
                    $11.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $11.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $11.bitmapId = readUi16($bytes, $stream);
                  var $23 = $11.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $23.a = readFb($bytes, $stream, bits);
                    $23.d = readFb($bytes, $stream, bits);
                  } else {
                    $23.a = 1;
                    $23.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $23.b = readFb($bytes, $stream, bits);
                    $23.c = readFb($bytes, $stream, bits);
                  } else {
                    $23.b = 0;
                    $23.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $23.tx = e / 20;
                  $23.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $24 = $11.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $24.a = readFb($bytes, $stream, bits);
                      $24.d = readFb($bytes, $stream, bits);
                    } else {
                      $24.a = 1;
                      $24.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $24.b = readFb($bytes, $stream, bits);
                      $24.c = readFb($bytes, $stream, bits);
                    } else {
                      $24.b = 0;
                      $24.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $24.tx = e / 20;
                    $24.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $11.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $9.push($11);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $25 = $8.lineStyles = [];
              var $26 = count;
              while ($26--) {
                var $27 = {};
                $27.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $27.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $27.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $27.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $27.hasFill = readUb($bytes, $stream, 1);
                  $27.noHscale = readUb($bytes, $stream, 1);
                  $27.noVscale = readUb($bytes, $stream, 1);
                  $27.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $27.noClose = readUb($bytes, $stream, 1);
                  $27.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $27.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $28 = $27.fillStyle = {};
                    var type = $28.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $29 = $28.color = {};
                        $29.red = readUi8($bytes, $stream);
                        $29.green = readUi8($bytes, $stream);
                        $29.blue = readUi8($bytes, $stream);
                        $29.alpha = readUi8($bytes, $stream);
                      } else {
                        var $30 = $28.color = {};
                        $30.red = readUi8($bytes, $stream);
                        $30.green = readUi8($bytes, $stream);
                        $30.blue = readUi8($bytes, $stream);
                        $30.alpha = 255;
                      }
                      if (isMorph) {
                        var $31 = $28.colorMorph = {};
                        $31.red = readUi8($bytes, $stream);
                        $31.green = readUi8($bytes, $stream);
                        $31.blue = readUi8($bytes, $stream);
                        $31.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $32 = $28.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $32.a = readFb($bytes, $stream, bits);
                        $32.d = readFb($bytes, $stream, bits);
                      } else {
                        $32.a = 1;
                        $32.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $32.b = readFb($bytes, $stream, bits);
                        $32.c = readFb($bytes, $stream, bits);
                      } else {
                        $32.b = 0;
                        $32.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $32.tx = e / 20;
                      $32.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $33 = $28.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $33.a = readFb($bytes, $stream, bits);
                          $33.d = readFb($bytes, $stream, bits);
                        } else {
                          $33.a = 1;
                          $33.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $33.b = readFb($bytes, $stream, bits);
                          $33.c = readFb($bytes, $stream, bits);
                        } else {
                          $33.b = 0;
                          $33.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $33.tx = e / 20;
                        $33.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $28.spreadMode = readUb($bytes, $stream, 2);
                        $28.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $28.count = readUb($bytes, $stream, 4);
                      var $34 = $28.records = [];
                      var $35 = count;
                      while ($35--) {
                        var $36 = {};
                        $36.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $37 = $36.color = {};
                          $37.red = readUi8($bytes, $stream);
                          $37.green = readUi8($bytes, $stream);
                          $37.blue = readUi8($bytes, $stream);
                          $37.alpha = readUi8($bytes, $stream);
                        } else {
                          var $38 = $36.color = {};
                          $38.red = readUi8($bytes, $stream);
                          $38.green = readUi8($bytes, $stream);
                          $38.blue = readUi8($bytes, $stream);
                          $38.alpha = 255;
                        }
                        if (isMorph) {
                          $36.ratioMorph = readUi8($bytes, $stream);
                          var $39 = $36.colorMorph = {};
                          $39.red = readUi8($bytes, $stream);
                          $39.green = readUi8($bytes, $stream);
                          $39.blue = readUi8($bytes, $stream);
                          $39.alpha = readUi8($bytes, $stream);
                        }
                        $34.push($36);
                      }
                      if (type === 19) {
                        $28.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $28.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $28.bitmapId = readUi16($bytes, $stream);
                      var $40 = $28.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $40.a = readFb($bytes, $stream, bits);
                        $40.d = readFb($bytes, $stream, bits);
                      } else {
                        $40.a = 1;
                        $40.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $40.b = readFb($bytes, $stream, bits);
                        $40.c = readFb($bytes, $stream, bits);
                      } else {
                        $40.b = 0;
                        $40.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $40.tx = e / 20;
                      $40.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $41 = $28.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $41.a = readFb($bytes, $stream, bits);
                          $41.d = readFb($bytes, $stream, bits);
                        } else {
                          $41.a = 1;
                          $41.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $41.b = readFb($bytes, $stream, bits);
                          $41.c = readFb($bytes, $stream, bits);
                        } else {
                          $41.b = 0;
                          $41.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $41.tx = e / 20;
                        $41.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $28.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $42 = $27.color = {};
                    $42.red = readUi8($bytes, $stream);
                    $42.green = readUi8($bytes, $stream);
                    $42.blue = readUi8($bytes, $stream);
                    $42.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $43 = $27.colorMorph = {};
                      $43.red = readUi8($bytes, $stream);
                      $43.green = readUi8($bytes, $stream);
                      $43.blue = readUi8($bytes, $stream);
                      $43.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $44 = $27.color = {};
                    $44.red = readUi8($bytes, $stream);
                    $44.green = readUi8($bytes, $stream);
                    $44.blue = readUi8($bytes, $stream);
                    $44.alpha = readUi8($bytes, $stream);
                  } else {
                    var $45 = $27.color = {};
                    $45.red = readUi8($bytes, $stream);
                    $45.green = readUi8($bytes, $stream);
                    $45.blue = readUi8($bytes, $stream);
                    $45.alpha = 255;
                  }
                  if (isMorph) {
                    var $46 = $27.colorMorph = {};
                    $46.red = readUi8($bytes, $stream);
                    $46.green = readUi8($bytes, $stream);
                    $46.blue = readUi8($bytes, $stream);
                    $46.alpha = readUi8($bytes, $stream);
                  }
                }
                $25.push($27);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $7.push($8);
        } while (!eos);
        $4.push($6);
      }
      if (wide) {
        var $47 = $.codes = [];
        var $48 = glyphCount;
        while ($48--) {
          $47.push(readUi16($bytes, $stream));
        }
      } else {
        var $49 = $.codes = [];
        var $50 = glyphCount;
        while ($50--) {
          $49.push(readUi8($bytes, $stream));
        }
      }
      if (hasLayout) {
        $.ascent = readUi16($bytes, $stream);
        $.descent = readUi16($bytes, $stream);
        $.leading = readSi16($bytes, $stream);
        var $51 = $.advance = [];
        var $52 = glyphCount;
        while ($52--) {
          $51.push(readSi16($bytes, $stream));
        }
        var $53 = $.bbox = [];
        var $54 = glyphCount;
        while ($54--) {
          var $55 = {};
          align($bytes, $stream);
          var bits = readUb($bytes, $stream, 5);
          var xMin = readSb($bytes, $stream, bits);
          var xMax = readSb($bytes, $stream, bits);
          var yMin = readSb($bytes, $stream, bits);
          var yMax = readSb($bytes, $stream, bits);
          $55.left = xMin / 20;
          $55.right = xMax / 20;
          $55.top = yMin / 20;
          $55.bottom = yMax / 20;
          align($bytes, $stream);
          $53.push($55);
        }
        var kerningCount = readUi16($bytes, $stream);
        var $56 = $.kerning = [];
        var $57 = kerningCount;
        while ($57--) {
          var $58 = {};
          if (wide) {
            $58.code1 = readUi16($bytes, $stream);
            $58.code2 = readUi16($bytes, $stream);
          } else {
            $58.code1 = readUi8($bytes, $stream);
            $58.code2 = readUi8($bytes, $stream);
          }
          $58.adjustment = readUi16($bytes, $stream);
          $56.push($58);
        }
      }
      return $;
    },
    56: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      var symbolCount = readUi16($bytes, $stream);
      var $0 = $.exports = [];
      var $1 = symbolCount;
      while ($1--) {
        var $2 = {};
        $2.symbolId = readUi16($bytes, $stream);
        $2.className = readString($bytes, $stream, 0);
        $0.push($2);
      }
      return $;
    },
    59: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      if (tagCode === 59) {
        $.spriteId = readUi16($bytes, $stream);
      }
      $.actionsData = readBinary($bytes, $stream, 0);
      return $;
    },
    69: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      var reserved = readUb($bytes, $stream, 1);
      $.useDirectBlit = readUb($bytes, $stream, 1);
      $.useGpu = readUb($bytes, $stream, 1);
      $.hasMetadata = readUb($bytes, $stream, 1);
      $.doAbc = readUb($bytes, $stream, 1);
      $.noCrossDomainCaching = readUb($bytes, $stream, 1);
      $.relativeUrls = readUb($bytes, $stream, 1);
      $.network = readUb($bytes, $stream, 1);
      var pad = readUb($bytes, $stream, 24);
      return $;
    },
    70: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      if (tagCode > 4) {
        if (tagCode > 26) {
          var flags = readUi16($bytes, $stream);
        } else {
          var flags = readUi8($bytes, $stream);
        }
        var hasEvents = $.hasEvents = flags >> 7 & 1;
        var clip = $.clip = flags >> 6 & 1;
        var hasName = $.hasName = flags >> 5 & 1;
        var hasRatio = $.hasRatio = flags >> 4 & 1;
        var hasCxform = $.hasCxform = flags >> 3 & 1;
        var hasMatrix = $.hasMatrix = flags >> 2 & 1;
        var place = $.place = flags >> 1 & 1;
        var move = $.move = flags & 1;
        if (tagCode === 70) {
          var hasBackgroundColor = $.hasBackgroundColor = flags >> 15 & 1;
          var hasVisibility = $.hasVisibility = flags >> 14 & 1;
          var hasImage = $.hasImage = flags >> 12 & 1;
          var hasClassName = $.hasClassName = flags >> 11 & 1;
          var cache = $.cache = flags >> 10 & 1;
          var blend = $.blend = flags >> 9 & 1;
          var hasFilters = $.hasFilters = flags >> 8 & 1;
        } else {
          var cache = $.cache = 0;
          var blend = $.blend = 0;
          var hasFilters = $.hasFilters = 0;
        }
        $.depth = readUi16($bytes, $stream);
        if (hasClassName) {
          $.className = readString($bytes, $stream, 0);
        }
        if (place) {
          $.symbolId = readUi16($bytes, $stream);
        }
        if (hasMatrix) {
          var $0 = $.matrix = {};
          align($bytes, $stream);
          var hasScale = readUb($bytes, $stream, 1);
          if (hasScale) {
            var bits = readUb($bytes, $stream, 5);
            $0.a = readFb($bytes, $stream, bits);
            $0.d = readFb($bytes, $stream, bits);
          } else {
            $0.a = 1;
            $0.d = 1;
          }
          var hasRotate = readUb($bytes, $stream, 1);
          if (hasRotate) {
            var bits = readUb($bytes, $stream, 5);
            $0.b = readFb($bytes, $stream, bits);
            $0.c = readFb($bytes, $stream, bits);
          } else {
            $0.b = 0;
            $0.c = 0;
          }
          var bits = readUb($bytes, $stream, 5);
          var e = readSb($bytes, $stream, bits);
          var f = readSb($bytes, $stream, bits);
          $0.tx = e / 20;
          $0.ty = f / 20;
          align($bytes, $stream);
        }
        if (hasCxform) {
          var $1 = $.cxform = {};
          align($bytes, $stream);
          var hasOffsets = readUb($bytes, $stream, 1);
          var hasMultipliers = readUb($bytes, $stream, 1);
          var bits = readUb($bytes, $stream, 4);
          if (hasMultipliers) {
            $1.redMultiplier = readSb($bytes, $stream, bits);
            $1.greenMultiplier = readSb($bytes, $stream, bits);
            $1.blueMultiplier = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $1.alphaMultiplier = readSb($bytes, $stream, bits);
            } else {
              $1.alphaMultiplier = 256;
            }
          } else {
            $1.redMultiplier = 256;
            $1.greenMultiplier = 256;
            $1.blueMultiplier = 256;
            $1.alphaMultiplier = 256;
          }
          if (hasOffsets) {
            $1.redOffset = readSb($bytes, $stream, bits);
            $1.greenOffset = readSb($bytes, $stream, bits);
            $1.blueOffset = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $1.alphaOffset = readSb($bytes, $stream, bits);
            } else {
              $1.alphaOffset = 0;
            }
          } else {
            $1.redOffset = 0;
            $1.greenOffset = 0;
            $1.blueOffset = 0;
            $1.alphaOffset = 0;
          }
          align($bytes, $stream);
        }
        if (hasRatio) {
          $.ratio = readUi16($bytes, $stream);
        }
        if (hasName) {
          $.name = readString($bytes, $stream, 0);
        }
        if (clip) {
          $.clipDepth = readUi16($bytes, $stream);
        }
        if (hasFilters) {
          var count = readUi8($bytes, $stream);
          var $2 = $.filters = [];
          var $3 = count;
          while ($3--) {
            var $4 = {};
            var type = $4.type = readUi8($bytes, $stream);
            switch (type) {
            case 0:
              if (type === 4 || type === 7) {
                var count = readUi8($bytes, $stream);
              } else {
                var count = 1;
              }
              var $5 = $4.colors = [];
              var $6 = count;
              while ($6--) {
                var $7 = {};
                $7.red = readUi8($bytes, $stream);
                $7.green = readUi8($bytes, $stream);
                $7.blue = readUi8($bytes, $stream);
                $7.alpha = readUi8($bytes, $stream);
                $5.push($7);
              }
              if (type === 3) {
                var $8 = $4.higlightColor = {};
                $8.red = readUi8($bytes, $stream);
                $8.green = readUi8($bytes, $stream);
                $8.blue = readUi8($bytes, $stream);
                $8.alpha = readUi8($bytes, $stream);
              }
              if (type === 4 || type === 7) {
                var $9 = $4.ratios = [];
                var $10 = count;
                while ($10--) {
                  $9.push(readUi8($bytes, $stream));
                }
              }
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              if (type !== 2) {
                $4.angle = readFixed($bytes, $stream);
                $4.distance = readFixed($bytes, $stream);
              }
              $4.strength = readFixed8($bytes, $stream);
              $4.innerShadow = readUb($bytes, $stream, 1);
              $4.knockout = readUb($bytes, $stream, 1);
              $4.compositeSource = readUb($bytes, $stream, 1);
              if (type === 3) {
                $4.onTop = readUb($bytes, $stream, 1);
              } else {
                var reserved = readUb($bytes, $stream, 1);
              }
              if (type === 4 || type === 7) {
                $4.passes = readUb($bytes, $stream, 4);
              } else {
                var reserved = readUb($bytes, $stream, 4);
              }
              break;
            case 1:
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              $4.passes = readUb($bytes, $stream, 5);
              var reserved = readUb($bytes, $stream, 3);
              break;
            case 2:
            case 3:
            case 4:
              if (type === 4 || type === 7) {
                var count = readUi8($bytes, $stream);
              } else {
                var count = 1;
              }
              var $11 = $4.colors = [];
              var $12 = count;
              while ($12--) {
                var $13 = {};
                $13.red = readUi8($bytes, $stream);
                $13.green = readUi8($bytes, $stream);
                $13.blue = readUi8($bytes, $stream);
                $13.alpha = readUi8($bytes, $stream);
                $11.push($13);
              }
              if (type === 3) {
                var $14 = $4.higlightColor = {};
                $14.red = readUi8($bytes, $stream);
                $14.green = readUi8($bytes, $stream);
                $14.blue = readUi8($bytes, $stream);
                $14.alpha = readUi8($bytes, $stream);
              }
              if (type === 4 || type === 7) {
                var $15 = $4.ratios = [];
                var $16 = count;
                while ($16--) {
                  $15.push(readUi8($bytes, $stream));
                }
              }
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              if (type !== 2) {
                $4.angle = readFixed($bytes, $stream);
                $4.distance = readFixed($bytes, $stream);
              }
              $4.strength = readFixed8($bytes, $stream);
              $4.innerShadow = readUb($bytes, $stream, 1);
              $4.knockout = readUb($bytes, $stream, 1);
              $4.compositeSource = readUb($bytes, $stream, 1);
              if (type === 3) {
                $4.onTop = readUb($bytes, $stream, 1);
              } else {
                var reserved = readUb($bytes, $stream, 1);
              }
              if (type === 4 || type === 7) {
                $4.passes = readUb($bytes, $stream, 4);
              } else {
                var reserved = readUb($bytes, $stream, 4);
              }
              break;
            case 5:
              $4.columns = readUi8($bytes, $stream);
              $4.rows = readUi8($bytes, $stream);
              $4.divisor = readFloat($bytes, $stream);
              $4.bias = readFloat($bytes, $stream);
              var $17 = $4.weights = [];
              var $18 = columns * rows;
              while ($18--) {
                $17.push(readFloat($bytes, $stream));
              }
              var $19 = $4.defaultColor = {};
              $19.red = readUi8($bytes, $stream);
              $19.green = readUi8($bytes, $stream);
              $19.blue = readUi8($bytes, $stream);
              $19.alpha = readUi8($bytes, $stream);
              var reserved = readUb($bytes, $stream, 6);
              $4.clamp = readUb($bytes, $stream, 1);
              $4.preserveAlpha = readUb($bytes, $stream, 1);
              break;
            case 6:
              var $20 = $4.matrix = [];
              var $21 = 20;
              while ($21--) {
                $20.push(readFloat($bytes, $stream));
              }
              break;
            case 7:
              if (type === 4 || type === 7) {
                var count = readUi8($bytes, $stream);
              } else {
                var count = 1;
              }
              var $22 = $4.colors = [];
              var $23 = count;
              while ($23--) {
                var $24 = {};
                $24.red = readUi8($bytes, $stream);
                $24.green = readUi8($bytes, $stream);
                $24.blue = readUi8($bytes, $stream);
                $24.alpha = readUi8($bytes, $stream);
                $22.push($24);
              }
              if (type === 3) {
                var $25 = $4.higlightColor = {};
                $25.red = readUi8($bytes, $stream);
                $25.green = readUi8($bytes, $stream);
                $25.blue = readUi8($bytes, $stream);
                $25.alpha = readUi8($bytes, $stream);
              }
              if (type === 4 || type === 7) {
                var $26 = $4.ratios = [];
                var $27 = count;
                while ($27--) {
                  $26.push(readUi8($bytes, $stream));
                }
              }
              $4.blurX = readFixed($bytes, $stream);
              $4.blurY = readFixed($bytes, $stream);
              if (type !== 2) {
                $4.angle = readFixed($bytes, $stream);
                $4.distance = readFixed($bytes, $stream);
              }
              $4.strength = readFixed8($bytes, $stream);
              $4.innerShadow = readUb($bytes, $stream, 1);
              $4.knockout = readUb($bytes, $stream, 1);
              $4.compositeSource = readUb($bytes, $stream, 1);
              if (type === 3) {
                $4.onTop = readUb($bytes, $stream, 1);
              } else {
                var reserved = readUb($bytes, $stream, 1);
              }
              if (type === 4 || type === 7) {
                $4.passes = readUb($bytes, $stream, 4);
              } else {
                var reserved = readUb($bytes, $stream, 4);
              }
              break;
            default:
            }
            $2.push($4);
          }
        }
        if (blend) {
          $.blendMode = readUi8($bytes, $stream);
        }
        if (cache) {
          $.bmpCache = readUi8($bytes, $stream);
        }
        if (hasEvents) {
          var reserved = readUi16($bytes, $stream);
          if (swfVersion >= 6) {
            var allFlags = readUi32($bytes, $stream);
          } else {
            var allFlags = readUi16($bytes, $stream);
          }
          var $28 = $.events = [];
          do {
            var $29 = {};
            if (swfVersion >= 6) {
              var flags = readUi32($bytes, $stream);
            } else {
              var flags = readUi16($bytes, $stream);
            }
            var eoe = $29.eoe = !flags;
            $29.onKeyUp = flags >> 7 & 1;
            $29.onKeyDown = flags >> 6 & 1;
            $29.onMouseUp = flags >> 5 & 1;
            $29.onMouseDown = flags >> 4 & 1;
            $29.onMouseMove = flags >> 3 & 1;
            $29.onUnload = flags >> 2 & 1;
            $29.onEnterFrame = flags >> 1 & 1;
            $29.onLoad = flags & 1;
            if (swfVersion >= 6) {
              $29.onDragOver = flags >> 15 & 1;
              $29.onRollOut = flags >> 14 & 1;
              $29.onRollOver = flags >> 13 & 1;
              $29.onReleaseOutside = flags >> 12 & 1;
              $29.onRelease = flags >> 11 & 1;
              $29.onPress = flags >> 10 & 1;
              $29.onInitialize = flags >> 9 & 1;
              $29.onData = flags >> 8 & 1;
              if (swfVersion >= 7) {
                $29.onConstruct = flags >> 18 & 1;
              } else {
                $29.onConstruct = 0;
              }
              var keyPress = $29.keyPress = flags >> 17 & 1;
              $29.onDragOut = flags >> 16 & 1;
            }
            if (!eoe) {
              var length = $29.length = readUi32($bytes, $stream);
              if (keyPress) {
                $29.keyCode = readUi8($bytes, $stream);
              }
              $29.actionsData = readBinary($bytes, $stream, length - (keyPress ? 1 : 0));
            }
            $28.push($29);
          } while (!eoe);
        }
        if (hasBackgroundColor) {
          $.backgroundColor = ARGB;
        }
        if (hasVisibility) {
          $.visibility = readUi8($bytes, $stream);
        }
      } else {
        $.place = 1;
        $.symbolId = readUi16($bytes, $stream);
        $.depth = readUi16($bytes, $stream);
        $.hasMatrix = 1;
        var $30 = $.matrix = {};
        align($bytes, $stream);
        var hasScale = readUb($bytes, $stream, 1);
        if (hasScale) {
          var bits = readUb($bytes, $stream, 5);
          $30.a = readFb($bytes, $stream, bits);
          $30.d = readFb($bytes, $stream, bits);
        } else {
          $30.a = 1;
          $30.d = 1;
        }
        var hasRotate = readUb($bytes, $stream, 1);
        if (hasRotate) {
          var bits = readUb($bytes, $stream, 5);
          $30.b = readFb($bytes, $stream, bits);
          $30.c = readFb($bytes, $stream, bits);
        } else {
          $30.b = 0;
          $30.c = 0;
        }
        var bits = readUb($bytes, $stream, 5);
        var e = readSb($bytes, $stream, bits);
        var f = readSb($bytes, $stream, bits);
        $30.tx = e / 20;
        $30.ty = f / 20;
        align($bytes, $stream);
        if ($stream.remaining()) {
          $.hasCxform = 1;
          var $31 = $.cxform = {};
          align($bytes, $stream);
          var hasOffsets = readUb($bytes, $stream, 1);
          var hasMultipliers = readUb($bytes, $stream, 1);
          var bits = readUb($bytes, $stream, 4);
          if (hasMultipliers) {
            $31.redMultiplier = readSb($bytes, $stream, bits);
            $31.greenMultiplier = readSb($bytes, $stream, bits);
            $31.blueMultiplier = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $31.alphaMultiplier = readSb($bytes, $stream, bits);
            } else {
              $31.alphaMultiplier = 256;
            }
          } else {
            $31.redMultiplier = 256;
            $31.greenMultiplier = 256;
            $31.blueMultiplier = 256;
            $31.alphaMultiplier = 256;
          }
          if (hasOffsets) {
            $31.redOffset = readSb($bytes, $stream, bits);
            $31.greenOffset = readSb($bytes, $stream, bits);
            $31.blueOffset = readSb($bytes, $stream, bits);
            if (tagCode > 4) {
              $31.alphaOffset = readSb($bytes, $stream, bits);
            } else {
              $31.alphaOffset = 0;
            }
          } else {
            $31.redOffset = 0;
            $31.greenOffset = 0;
            $31.blueOffset = 0;
            $31.alphaOffset = 0;
          }
          align($bytes, $stream);
        }
      }
      return $;
    },
    75: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var hasLayout = $.hasLayout = readUb($bytes, $stream, 1);
      if (swfVersion > 5) {
        $.shiftJis = readUb($bytes, $stream, 1);
      } else {
        var reserved = readUb($bytes, $stream, 1);
      }
      $.smallText = readUb($bytes, $stream, 1);
      $.ansi = readUb($bytes, $stream, 1);
      var wideOffset = $.wideOffset = readUb($bytes, $stream, 1);
      var wide = $.wide = readUb($bytes, $stream, 1);
      $.italic = readUb($bytes, $stream, 1);
      $.bold = readUb($bytes, $stream, 1);
      if (swfVersion > 5) {
        $.language = readUi8($bytes, $stream);
      } else {
        var reserved = readUi8($bytes, $stream);
        $.language = 0;
      }
      var nameLength = readUi8($bytes, $stream);
      $.name = readString($bytes, $stream, nameLength);
      if (tagCode === 75) {
        $.resolution = 20;
      }
      var glyphCount = $.glyphCount = readUi16($bytes, $stream);
      if (wideOffset) {
        var $0 = $.offsets = [];
        var $1 = glyphCount;
        while ($1--) {
          $0.push(readUi32($bytes, $stream));
        }
        $.mapOffset = readUi32($bytes, $stream);
      } else {
        var $2 = $.offsets = [];
        var $3 = glyphCount;
        while ($3--) {
          $2.push(readUi16($bytes, $stream));
        }
        $.mapOffset = readUi16($bytes, $stream);
      }
      var $4 = $.glyphs = [];
      var $5 = glyphCount;
      while ($5--) {
        var $6 = {};
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $7 = $6.records = [];
        do {
          var $8 = {};
          var type = $8.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $8.eos = !(type || flags);
          if (type) {
            var isStraight = $8.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $8.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $8.deltaX = readSb($bytes, $stream, bits);
                $8.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $8.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $8.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $8.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $8.controlDeltaX = readSb($bytes, $stream, bits);
              $8.controlDeltaY = readSb($bytes, $stream, bits);
              $8.anchorDeltaX = readSb($bytes, $stream, bits);
              $8.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $8.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $8.hasNewStyles = 0;
            }
            var hasLineStyle = $8.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $8.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $8.hasFillStyle0 = flags >> 1 & 1;
            var move = $8.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $8.moveX = readSb($bytes, $stream, bits);
              $8.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $8.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $8.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $8.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $9 = $8.fillStyles = [];
              var $10 = count;
              while ($10--) {
                var $11 = {};
                var type = $11.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $12 = $11.color = {};
                    $12.red = readUi8($bytes, $stream);
                    $12.green = readUi8($bytes, $stream);
                    $12.blue = readUi8($bytes, $stream);
                    $12.alpha = readUi8($bytes, $stream);
                  } else {
                    var $13 = $11.color = {};
                    $13.red = readUi8($bytes, $stream);
                    $13.green = readUi8($bytes, $stream);
                    $13.blue = readUi8($bytes, $stream);
                    $13.alpha = 255;
                  }
                  if (isMorph) {
                    var $14 = $11.colorMorph = {};
                    $14.red = readUi8($bytes, $stream);
                    $14.green = readUi8($bytes, $stream);
                    $14.blue = readUi8($bytes, $stream);
                    $14.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $15 = $11.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $15.a = readFb($bytes, $stream, bits);
                    $15.d = readFb($bytes, $stream, bits);
                  } else {
                    $15.a = 1;
                    $15.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $15.b = readFb($bytes, $stream, bits);
                    $15.c = readFb($bytes, $stream, bits);
                  } else {
                    $15.b = 0;
                    $15.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $15.tx = e / 20;
                  $15.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $16 = $11.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $16.a = readFb($bytes, $stream, bits);
                      $16.d = readFb($bytes, $stream, bits);
                    } else {
                      $16.a = 1;
                      $16.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $16.b = readFb($bytes, $stream, bits);
                      $16.c = readFb($bytes, $stream, bits);
                    } else {
                      $16.b = 0;
                      $16.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $16.tx = e / 20;
                    $16.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $11.spreadMode = readUb($bytes, $stream, 2);
                    $11.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $11.count = readUb($bytes, $stream, 4);
                  var $17 = $11.records = [];
                  var $18 = count;
                  while ($18--) {
                    var $19 = {};
                    $19.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $20 = $19.color = {};
                      $20.red = readUi8($bytes, $stream);
                      $20.green = readUi8($bytes, $stream);
                      $20.blue = readUi8($bytes, $stream);
                      $20.alpha = readUi8($bytes, $stream);
                    } else {
                      var $21 = $19.color = {};
                      $21.red = readUi8($bytes, $stream);
                      $21.green = readUi8($bytes, $stream);
                      $21.blue = readUi8($bytes, $stream);
                      $21.alpha = 255;
                    }
                    if (isMorph) {
                      $19.ratioMorph = readUi8($bytes, $stream);
                      var $22 = $19.colorMorph = {};
                      $22.red = readUi8($bytes, $stream);
                      $22.green = readUi8($bytes, $stream);
                      $22.blue = readUi8($bytes, $stream);
                      $22.alpha = readUi8($bytes, $stream);
                    }
                    $17.push($19);
                  }
                  if (type === 19) {
                    $11.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $11.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $11.bitmapId = readUi16($bytes, $stream);
                  var $23 = $11.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $23.a = readFb($bytes, $stream, bits);
                    $23.d = readFb($bytes, $stream, bits);
                  } else {
                    $23.a = 1;
                    $23.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $23.b = readFb($bytes, $stream, bits);
                    $23.c = readFb($bytes, $stream, bits);
                  } else {
                    $23.b = 0;
                    $23.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $23.tx = e / 20;
                  $23.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $24 = $11.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $24.a = readFb($bytes, $stream, bits);
                      $24.d = readFb($bytes, $stream, bits);
                    } else {
                      $24.a = 1;
                      $24.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $24.b = readFb($bytes, $stream, bits);
                      $24.c = readFb($bytes, $stream, bits);
                    } else {
                      $24.b = 0;
                      $24.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $24.tx = e / 20;
                    $24.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $11.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $9.push($11);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $25 = $8.lineStyles = [];
              var $26 = count;
              while ($26--) {
                var $27 = {};
                $27.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $27.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $27.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $27.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $27.hasFill = readUb($bytes, $stream, 1);
                  $27.noHscale = readUb($bytes, $stream, 1);
                  $27.noVscale = readUb($bytes, $stream, 1);
                  $27.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $27.noClose = readUb($bytes, $stream, 1);
                  $27.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $27.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $28 = $27.fillStyle = {};
                    var type = $28.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $29 = $28.color = {};
                        $29.red = readUi8($bytes, $stream);
                        $29.green = readUi8($bytes, $stream);
                        $29.blue = readUi8($bytes, $stream);
                        $29.alpha = readUi8($bytes, $stream);
                      } else {
                        var $30 = $28.color = {};
                        $30.red = readUi8($bytes, $stream);
                        $30.green = readUi8($bytes, $stream);
                        $30.blue = readUi8($bytes, $stream);
                        $30.alpha = 255;
                      }
                      if (isMorph) {
                        var $31 = $28.colorMorph = {};
                        $31.red = readUi8($bytes, $stream);
                        $31.green = readUi8($bytes, $stream);
                        $31.blue = readUi8($bytes, $stream);
                        $31.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $32 = $28.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $32.a = readFb($bytes, $stream, bits);
                        $32.d = readFb($bytes, $stream, bits);
                      } else {
                        $32.a = 1;
                        $32.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $32.b = readFb($bytes, $stream, bits);
                        $32.c = readFb($bytes, $stream, bits);
                      } else {
                        $32.b = 0;
                        $32.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $32.tx = e / 20;
                      $32.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $33 = $28.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $33.a = readFb($bytes, $stream, bits);
                          $33.d = readFb($bytes, $stream, bits);
                        } else {
                          $33.a = 1;
                          $33.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $33.b = readFb($bytes, $stream, bits);
                          $33.c = readFb($bytes, $stream, bits);
                        } else {
                          $33.b = 0;
                          $33.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $33.tx = e / 20;
                        $33.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $28.spreadMode = readUb($bytes, $stream, 2);
                        $28.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $28.count = readUb($bytes, $stream, 4);
                      var $34 = $28.records = [];
                      var $35 = count;
                      while ($35--) {
                        var $36 = {};
                        $36.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $37 = $36.color = {};
                          $37.red = readUi8($bytes, $stream);
                          $37.green = readUi8($bytes, $stream);
                          $37.blue = readUi8($bytes, $stream);
                          $37.alpha = readUi8($bytes, $stream);
                        } else {
                          var $38 = $36.color = {};
                          $38.red = readUi8($bytes, $stream);
                          $38.green = readUi8($bytes, $stream);
                          $38.blue = readUi8($bytes, $stream);
                          $38.alpha = 255;
                        }
                        if (isMorph) {
                          $36.ratioMorph = readUi8($bytes, $stream);
                          var $39 = $36.colorMorph = {};
                          $39.red = readUi8($bytes, $stream);
                          $39.green = readUi8($bytes, $stream);
                          $39.blue = readUi8($bytes, $stream);
                          $39.alpha = readUi8($bytes, $stream);
                        }
                        $34.push($36);
                      }
                      if (type === 19) {
                        $28.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $28.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $28.bitmapId = readUi16($bytes, $stream);
                      var $40 = $28.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $40.a = readFb($bytes, $stream, bits);
                        $40.d = readFb($bytes, $stream, bits);
                      } else {
                        $40.a = 1;
                        $40.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $40.b = readFb($bytes, $stream, bits);
                        $40.c = readFb($bytes, $stream, bits);
                      } else {
                        $40.b = 0;
                        $40.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $40.tx = e / 20;
                      $40.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $41 = $28.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $41.a = readFb($bytes, $stream, bits);
                          $41.d = readFb($bytes, $stream, bits);
                        } else {
                          $41.a = 1;
                          $41.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $41.b = readFb($bytes, $stream, bits);
                          $41.c = readFb($bytes, $stream, bits);
                        } else {
                          $41.b = 0;
                          $41.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $41.tx = e / 20;
                        $41.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $28.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $42 = $27.color = {};
                    $42.red = readUi8($bytes, $stream);
                    $42.green = readUi8($bytes, $stream);
                    $42.blue = readUi8($bytes, $stream);
                    $42.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $43 = $27.colorMorph = {};
                      $43.red = readUi8($bytes, $stream);
                      $43.green = readUi8($bytes, $stream);
                      $43.blue = readUi8($bytes, $stream);
                      $43.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $44 = $27.color = {};
                    $44.red = readUi8($bytes, $stream);
                    $44.green = readUi8($bytes, $stream);
                    $44.blue = readUi8($bytes, $stream);
                    $44.alpha = readUi8($bytes, $stream);
                  } else {
                    var $45 = $27.color = {};
                    $45.red = readUi8($bytes, $stream);
                    $45.green = readUi8($bytes, $stream);
                    $45.blue = readUi8($bytes, $stream);
                    $45.alpha = 255;
                  }
                  if (isMorph) {
                    var $46 = $27.colorMorph = {};
                    $46.red = readUi8($bytes, $stream);
                    $46.green = readUi8($bytes, $stream);
                    $46.blue = readUi8($bytes, $stream);
                    $46.alpha = readUi8($bytes, $stream);
                  }
                }
                $25.push($27);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $7.push($8);
        } while (!eos);
        $4.push($6);
      }
      if (wide) {
        var $47 = $.codes = [];
        var $48 = glyphCount;
        while ($48--) {
          $47.push(readUi16($bytes, $stream));
        }
      } else {
        var $49 = $.codes = [];
        var $50 = glyphCount;
        while ($50--) {
          $49.push(readUi8($bytes, $stream));
        }
      }
      if (hasLayout) {
        $.ascent = readUi16($bytes, $stream);
        $.descent = readUi16($bytes, $stream);
        $.leading = readSi16($bytes, $stream);
        var $51 = $.advance = [];
        var $52 = glyphCount;
        while ($52--) {
          $51.push(readSi16($bytes, $stream));
        }
        var $53 = $.bbox = [];
        var $54 = glyphCount;
        while ($54--) {
          var $55 = {};
          align($bytes, $stream);
          var bits = readUb($bytes, $stream, 5);
          var xMin = readSb($bytes, $stream, bits);
          var xMax = readSb($bytes, $stream, bits);
          var yMin = readSb($bytes, $stream, bits);
          var yMax = readSb($bytes, $stream, bits);
          $55.left = xMin / 20;
          $55.right = xMax / 20;
          $55.top = yMin / 20;
          $55.bottom = yMax / 20;
          align($bytes, $stream);
          $53.push($55);
        }
        var kerningCount = readUi16($bytes, $stream);
        var $56 = $.kerning = [];
        var $57 = kerningCount;
        while ($57--) {
          var $58 = {};
          if (wide) {
            $58.code1 = readUi16($bytes, $stream);
            $58.code2 = readUi16($bytes, $stream);
          } else {
            $58.code1 = readUi8($bytes, $stream);
            $58.code2 = readUi8($bytes, $stream);
          }
          $58.adjustment = readUi16($bytes, $stream);
          $56.push($58);
        }
      }
      return $;
    },
    76: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      var symbolCount = readUi16($bytes, $stream);
      var $0 = $.exports = [];
      var $1 = symbolCount;
      while ($1--) {
        var $2 = {};
        $2.symbolId = readUi16($bytes, $stream);
        $2.className = readString($bytes, $stream, 0);
        $0.push($2);
      }
      return $;
    },
    82: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.flags = readUi32($bytes, $stream);
      $.name = readString($bytes, $stream, 0);
      $.data = readBinary($bytes, $stream, 0);
      return $;
    },
    83: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var $0 = $.bbox = {};
      align($bytes, $stream);
      var bits = readUb($bytes, $stream, 5);
      var xMin = readSb($bytes, $stream, bits);
      var xMax = readSb($bytes, $stream, bits);
      var yMin = readSb($bytes, $stream, bits);
      var yMax = readSb($bytes, $stream, bits);
      $0.left = xMin / 20;
      $0.right = xMax / 20;
      $0.top = yMin / 20;
      $0.bottom = yMax / 20;
      align($bytes, $stream);
      var isMorph = $.isMorph = tagCode === 46 || tagCode === 84;
      if (isMorph) {
        var $1 = $.bboxMorph = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $1.left = xMin / 20;
        $1.right = xMax / 20;
        $1.top = yMin / 20;
        $1.bottom = yMax / 20;
        align($bytes, $stream);
      }
      var hasStrokes = $.hasStrokes = tagCode === 83 || tagCode === 84;
      if (hasStrokes) {
        var $2 = $.strokeBbox = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $2.left = xMin / 20;
        $2.right = xMax / 20;
        $2.top = yMin / 20;
        $2.bottom = yMax / 20;
        align($bytes, $stream);
        if (isMorph) {
          var $3 = $.strokeBboxMorph = {};
          align($bytes, $stream);
          var bits = readUb($bytes, $stream, 5);
          var xMin = readSb($bytes, $stream, bits);
          var xMax = readSb($bytes, $stream, bits);
          var yMin = readSb($bytes, $stream, bits);
          var yMax = readSb($bytes, $stream, bits);
          $3.left = xMin / 20;
          $3.right = xMax / 20;
          $3.top = yMin / 20;
          $3.bottom = yMax / 20;
          align($bytes, $stream);
        }
        var reserved = readUb($bytes, $stream, 5);
        $.fillWinding = readUb($bytes, $stream, 1);
        $.nonScalingStrokes = readUb($bytes, $stream, 1);
        $.scalingStrokes = readUb($bytes, $stream, 1);
      }
      if (isMorph) {
        $.offsetMorph = readUi32($bytes, $stream);
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $4 = $.fillStyles = [];
        var $5 = count;
        while ($5--) {
          var $6 = {};
          var type = $6.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $7 = $6.color = {};
              $7.red = readUi8($bytes, $stream);
              $7.green = readUi8($bytes, $stream);
              $7.blue = readUi8($bytes, $stream);
              $7.alpha = readUi8($bytes, $stream);
            } else {
              var $8 = $6.color = {};
              $8.red = readUi8($bytes, $stream);
              $8.green = readUi8($bytes, $stream);
              $8.blue = readUi8($bytes, $stream);
              $8.alpha = 255;
            }
            if (isMorph) {
              var $9 = $6.colorMorph = {};
              $9.red = readUi8($bytes, $stream);
              $9.green = readUi8($bytes, $stream);
              $9.blue = readUi8($bytes, $stream);
              $9.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $10 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $10.a = readFb($bytes, $stream, bits);
              $10.d = readFb($bytes, $stream, bits);
            } else {
              $10.a = 1;
              $10.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $10.b = readFb($bytes, $stream, bits);
              $10.c = readFb($bytes, $stream, bits);
            } else {
              $10.b = 0;
              $10.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $10.tx = e / 20;
            $10.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $11 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $11.a = readFb($bytes, $stream, bits);
                $11.d = readFb($bytes, $stream, bits);
              } else {
                $11.a = 1;
                $11.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $11.b = readFb($bytes, $stream, bits);
                $11.c = readFb($bytes, $stream, bits);
              } else {
                $11.b = 0;
                $11.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $11.tx = e / 20;
              $11.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $6.spreadMode = readUb($bytes, $stream, 2);
              $6.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $6.count = readUb($bytes, $stream, 4);
            var $12 = $6.records = [];
            var $13 = count;
            while ($13--) {
              var $14 = {};
              $14.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $15 = $14.color = {};
                $15.red = readUi8($bytes, $stream);
                $15.green = readUi8($bytes, $stream);
                $15.blue = readUi8($bytes, $stream);
                $15.alpha = readUi8($bytes, $stream);
              } else {
                var $16 = $14.color = {};
                $16.red = readUi8($bytes, $stream);
                $16.green = readUi8($bytes, $stream);
                $16.blue = readUi8($bytes, $stream);
                $16.alpha = 255;
              }
              if (isMorph) {
                $14.ratioMorph = readUi8($bytes, $stream);
                var $17 = $14.colorMorph = {};
                $17.red = readUi8($bytes, $stream);
                $17.green = readUi8($bytes, $stream);
                $17.blue = readUi8($bytes, $stream);
                $17.alpha = readUi8($bytes, $stream);
              }
              $12.push($14);
            }
            if (type === 19) {
              $6.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $6.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $6.bitmapId = readUi16($bytes, $stream);
            var $18 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $18.a = readFb($bytes, $stream, bits);
              $18.d = readFb($bytes, $stream, bits);
            } else {
              $18.a = 1;
              $18.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $18.b = readFb($bytes, $stream, bits);
              $18.c = readFb($bytes, $stream, bits);
            } else {
              $18.b = 0;
              $18.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $18.tx = e / 20;
            $18.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $19 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $19.a = readFb($bytes, $stream, bits);
                $19.d = readFb($bytes, $stream, bits);
              } else {
                $19.a = 1;
                $19.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $19.b = readFb($bytes, $stream, bits);
                $19.c = readFb($bytes, $stream, bits);
              } else {
                $19.b = 0;
                $19.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $19.tx = e / 20;
              $19.ty = f / 20;
              align($bytes, $stream);
            }
            $6.condition = type === 64 || type === 67;
            break;
          default:
          }
          $4.push($6);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $20 = $.lineStyles = [];
        var $21 = count;
        while ($21--) {
          var $22 = {};
          $22.width = readUi16($bytes, $stream);
          if (isMorph) {
            $22.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $22.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $22.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $22.hasFill = readUb($bytes, $stream, 1);
            $22.noHscale = readUb($bytes, $stream, 1);
            $22.noVscale = readUb($bytes, $stream, 1);
            $22.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $22.noClose = readUb($bytes, $stream, 1);
            $22.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $22.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $23 = $22.fillStyle = {};
              var type = $23.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $24 = $23.color = {};
                  $24.red = readUi8($bytes, $stream);
                  $24.green = readUi8($bytes, $stream);
                  $24.blue = readUi8($bytes, $stream);
                  $24.alpha = readUi8($bytes, $stream);
                } else {
                  var $25 = $23.color = {};
                  $25.red = readUi8($bytes, $stream);
                  $25.green = readUi8($bytes, $stream);
                  $25.blue = readUi8($bytes, $stream);
                  $25.alpha = 255;
                }
                if (isMorph) {
                  var $26 = $23.colorMorph = {};
                  $26.red = readUi8($bytes, $stream);
                  $26.green = readUi8($bytes, $stream);
                  $26.blue = readUi8($bytes, $stream);
                  $26.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $27 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.a = readFb($bytes, $stream, bits);
                  $27.d = readFb($bytes, $stream, bits);
                } else {
                  $27.a = 1;
                  $27.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.b = readFb($bytes, $stream, bits);
                  $27.c = readFb($bytes, $stream, bits);
                } else {
                  $27.b = 0;
                  $27.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $27.tx = e / 20;
                $27.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $28 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.a = readFb($bytes, $stream, bits);
                    $28.d = readFb($bytes, $stream, bits);
                  } else {
                    $28.a = 1;
                    $28.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.b = readFb($bytes, $stream, bits);
                    $28.c = readFb($bytes, $stream, bits);
                  } else {
                    $28.b = 0;
                    $28.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $28.tx = e / 20;
                  $28.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $23.spreadMode = readUb($bytes, $stream, 2);
                  $23.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $23.count = readUb($bytes, $stream, 4);
                var $29 = $23.records = [];
                var $30 = count;
                while ($30--) {
                  var $31 = {};
                  $31.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $32 = $31.color = {};
                    $32.red = readUi8($bytes, $stream);
                    $32.green = readUi8($bytes, $stream);
                    $32.blue = readUi8($bytes, $stream);
                    $32.alpha = readUi8($bytes, $stream);
                  } else {
                    var $33 = $31.color = {};
                    $33.red = readUi8($bytes, $stream);
                    $33.green = readUi8($bytes, $stream);
                    $33.blue = readUi8($bytes, $stream);
                    $33.alpha = 255;
                  }
                  if (isMorph) {
                    $31.ratioMorph = readUi8($bytes, $stream);
                    var $34 = $31.colorMorph = {};
                    $34.red = readUi8($bytes, $stream);
                    $34.green = readUi8($bytes, $stream);
                    $34.blue = readUi8($bytes, $stream);
                    $34.alpha = readUi8($bytes, $stream);
                  }
                  $29.push($31);
                }
                if (type === 19) {
                  $23.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $23.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $23.bitmapId = readUi16($bytes, $stream);
                var $35 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.a = readFb($bytes, $stream, bits);
                  $35.d = readFb($bytes, $stream, bits);
                } else {
                  $35.a = 1;
                  $35.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.b = readFb($bytes, $stream, bits);
                  $35.c = readFb($bytes, $stream, bits);
                } else {
                  $35.b = 0;
                  $35.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $35.tx = e / 20;
                $35.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $36 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.a = readFb($bytes, $stream, bits);
                    $36.d = readFb($bytes, $stream, bits);
                  } else {
                    $36.a = 1;
                    $36.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.b = readFb($bytes, $stream, bits);
                    $36.c = readFb($bytes, $stream, bits);
                  } else {
                    $36.b = 0;
                    $36.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $36.tx = e / 20;
                  $36.ty = f / 20;
                  align($bytes, $stream);
                }
                $23.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $37 = $22.color = {};
              $37.red = readUi8($bytes, $stream);
              $37.green = readUi8($bytes, $stream);
              $37.blue = readUi8($bytes, $stream);
              $37.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $38 = $22.colorMorph = {};
                $38.red = readUi8($bytes, $stream);
                $38.green = readUi8($bytes, $stream);
                $38.blue = readUi8($bytes, $stream);
                $38.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $39 = $22.color = {};
              $39.red = readUi8($bytes, $stream);
              $39.green = readUi8($bytes, $stream);
              $39.blue = readUi8($bytes, $stream);
              $39.alpha = readUi8($bytes, $stream);
            } else {
              var $40 = $22.color = {};
              $40.red = readUi8($bytes, $stream);
              $40.green = readUi8($bytes, $stream);
              $40.blue = readUi8($bytes, $stream);
              $40.alpha = 255;
            }
            if (isMorph) {
              var $41 = $22.colorMorph = {};
              $41.red = readUi8($bytes, $stream);
              $41.green = readUi8($bytes, $stream);
              $41.blue = readUi8($bytes, $stream);
              $41.alpha = readUi8($bytes, $stream);
            }
          }
          $20.push($22);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $42 = $.records = [];
        do {
          var $43 = {};
          var type = $43.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $43.eos = !(type || flags);
          if (type) {
            var isStraight = $43.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $43.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $43.deltaX = readSb($bytes, $stream, bits);
                $43.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $43.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $43.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $43.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $43.controlDeltaX = readSb($bytes, $stream, bits);
              $43.controlDeltaY = readSb($bytes, $stream, bits);
              $43.anchorDeltaX = readSb($bytes, $stream, bits);
              $43.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $43.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $43.hasNewStyles = 0;
            }
            var hasLineStyle = $43.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $43.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $43.hasFillStyle0 = flags >> 1 & 1;
            var move = $43.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $43.moveX = readSb($bytes, $stream, bits);
              $43.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $43.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $43.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $43.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $44 = $43.fillStyles = [];
              var $45 = count;
              while ($45--) {
                var $46 = {};
                var type = $46.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $47 = $46.color = {};
                    $47.red = readUi8($bytes, $stream);
                    $47.green = readUi8($bytes, $stream);
                    $47.blue = readUi8($bytes, $stream);
                    $47.alpha = readUi8($bytes, $stream);
                  } else {
                    var $48 = $46.color = {};
                    $48.red = readUi8($bytes, $stream);
                    $48.green = readUi8($bytes, $stream);
                    $48.blue = readUi8($bytes, $stream);
                    $48.alpha = 255;
                  }
                  if (isMorph) {
                    var $49 = $46.colorMorph = {};
                    $49.red = readUi8($bytes, $stream);
                    $49.green = readUi8($bytes, $stream);
                    $49.blue = readUi8($bytes, $stream);
                    $49.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $50 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.a = readFb($bytes, $stream, bits);
                    $50.d = readFb($bytes, $stream, bits);
                  } else {
                    $50.a = 1;
                    $50.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.b = readFb($bytes, $stream, bits);
                    $50.c = readFb($bytes, $stream, bits);
                  } else {
                    $50.b = 0;
                    $50.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $50.tx = e / 20;
                  $50.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $51 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.a = readFb($bytes, $stream, bits);
                      $51.d = readFb($bytes, $stream, bits);
                    } else {
                      $51.a = 1;
                      $51.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.b = readFb($bytes, $stream, bits);
                      $51.c = readFb($bytes, $stream, bits);
                    } else {
                      $51.b = 0;
                      $51.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $51.tx = e / 20;
                    $51.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $46.spreadMode = readUb($bytes, $stream, 2);
                    $46.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $46.count = readUb($bytes, $stream, 4);
                  var $52 = $46.records = [];
                  var $53 = count;
                  while ($53--) {
                    var $54 = {};
                    $54.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $55 = $54.color = {};
                      $55.red = readUi8($bytes, $stream);
                      $55.green = readUi8($bytes, $stream);
                      $55.blue = readUi8($bytes, $stream);
                      $55.alpha = readUi8($bytes, $stream);
                    } else {
                      var $56 = $54.color = {};
                      $56.red = readUi8($bytes, $stream);
                      $56.green = readUi8($bytes, $stream);
                      $56.blue = readUi8($bytes, $stream);
                      $56.alpha = 255;
                    }
                    if (isMorph) {
                      $54.ratioMorph = readUi8($bytes, $stream);
                      var $57 = $54.colorMorph = {};
                      $57.red = readUi8($bytes, $stream);
                      $57.green = readUi8($bytes, $stream);
                      $57.blue = readUi8($bytes, $stream);
                      $57.alpha = readUi8($bytes, $stream);
                    }
                    $52.push($54);
                  }
                  if (type === 19) {
                    $46.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $46.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $46.bitmapId = readUi16($bytes, $stream);
                  var $58 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.a = readFb($bytes, $stream, bits);
                    $58.d = readFb($bytes, $stream, bits);
                  } else {
                    $58.a = 1;
                    $58.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.b = readFb($bytes, $stream, bits);
                    $58.c = readFb($bytes, $stream, bits);
                  } else {
                    $58.b = 0;
                    $58.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $58.tx = e / 20;
                  $58.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $59 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.a = readFb($bytes, $stream, bits);
                      $59.d = readFb($bytes, $stream, bits);
                    } else {
                      $59.a = 1;
                      $59.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.b = readFb($bytes, $stream, bits);
                      $59.c = readFb($bytes, $stream, bits);
                    } else {
                      $59.b = 0;
                      $59.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $59.tx = e / 20;
                    $59.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $46.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $44.push($46);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $60 = $43.lineStyles = [];
              var $61 = count;
              while ($61--) {
                var $62 = {};
                $62.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $62.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $62.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $62.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $62.hasFill = readUb($bytes, $stream, 1);
                  $62.noHscale = readUb($bytes, $stream, 1);
                  $62.noVscale = readUb($bytes, $stream, 1);
                  $62.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $62.noClose = readUb($bytes, $stream, 1);
                  $62.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $62.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $63 = $62.fillStyle = {};
                    var type = $63.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $64 = $63.color = {};
                        $64.red = readUi8($bytes, $stream);
                        $64.green = readUi8($bytes, $stream);
                        $64.blue = readUi8($bytes, $stream);
                        $64.alpha = readUi8($bytes, $stream);
                      } else {
                        var $65 = $63.color = {};
                        $65.red = readUi8($bytes, $stream);
                        $65.green = readUi8($bytes, $stream);
                        $65.blue = readUi8($bytes, $stream);
                        $65.alpha = 255;
                      }
                      if (isMorph) {
                        var $66 = $63.colorMorph = {};
                        $66.red = readUi8($bytes, $stream);
                        $66.green = readUi8($bytes, $stream);
                        $66.blue = readUi8($bytes, $stream);
                        $66.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $67 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.a = readFb($bytes, $stream, bits);
                        $67.d = readFb($bytes, $stream, bits);
                      } else {
                        $67.a = 1;
                        $67.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.b = readFb($bytes, $stream, bits);
                        $67.c = readFb($bytes, $stream, bits);
                      } else {
                        $67.b = 0;
                        $67.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $67.tx = e / 20;
                      $67.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $68 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.a = readFb($bytes, $stream, bits);
                          $68.d = readFb($bytes, $stream, bits);
                        } else {
                          $68.a = 1;
                          $68.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.b = readFb($bytes, $stream, bits);
                          $68.c = readFb($bytes, $stream, bits);
                        } else {
                          $68.b = 0;
                          $68.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $68.tx = e / 20;
                        $68.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $63.spreadMode = readUb($bytes, $stream, 2);
                        $63.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $63.count = readUb($bytes, $stream, 4);
                      var $69 = $63.records = [];
                      var $70 = count;
                      while ($70--) {
                        var $71 = {};
                        $71.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $72 = $71.color = {};
                          $72.red = readUi8($bytes, $stream);
                          $72.green = readUi8($bytes, $stream);
                          $72.blue = readUi8($bytes, $stream);
                          $72.alpha = readUi8($bytes, $stream);
                        } else {
                          var $73 = $71.color = {};
                          $73.red = readUi8($bytes, $stream);
                          $73.green = readUi8($bytes, $stream);
                          $73.blue = readUi8($bytes, $stream);
                          $73.alpha = 255;
                        }
                        if (isMorph) {
                          $71.ratioMorph = readUi8($bytes, $stream);
                          var $74 = $71.colorMorph = {};
                          $74.red = readUi8($bytes, $stream);
                          $74.green = readUi8($bytes, $stream);
                          $74.blue = readUi8($bytes, $stream);
                          $74.alpha = readUi8($bytes, $stream);
                        }
                        $69.push($71);
                      }
                      if (type === 19) {
                        $63.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $63.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $63.bitmapId = readUi16($bytes, $stream);
                      var $75 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.a = readFb($bytes, $stream, bits);
                        $75.d = readFb($bytes, $stream, bits);
                      } else {
                        $75.a = 1;
                        $75.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.b = readFb($bytes, $stream, bits);
                        $75.c = readFb($bytes, $stream, bits);
                      } else {
                        $75.b = 0;
                        $75.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $75.tx = e / 20;
                      $75.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $76 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.a = readFb($bytes, $stream, bits);
                          $76.d = readFb($bytes, $stream, bits);
                        } else {
                          $76.a = 1;
                          $76.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.b = readFb($bytes, $stream, bits);
                          $76.c = readFb($bytes, $stream, bits);
                        } else {
                          $76.b = 0;
                          $76.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $76.tx = e / 20;
                        $76.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $63.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $77 = $62.color = {};
                    $77.red = readUi8($bytes, $stream);
                    $77.green = readUi8($bytes, $stream);
                    $77.blue = readUi8($bytes, $stream);
                    $77.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $78 = $62.colorMorph = {};
                      $78.red = readUi8($bytes, $stream);
                      $78.green = readUi8($bytes, $stream);
                      $78.blue = readUi8($bytes, $stream);
                      $78.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $79 = $62.color = {};
                    $79.red = readUi8($bytes, $stream);
                    $79.green = readUi8($bytes, $stream);
                    $79.blue = readUi8($bytes, $stream);
                    $79.alpha = readUi8($bytes, $stream);
                  } else {
                    var $80 = $62.color = {};
                    $80.red = readUi8($bytes, $stream);
                    $80.green = readUi8($bytes, $stream);
                    $80.blue = readUi8($bytes, $stream);
                    $80.alpha = 255;
                  }
                  if (isMorph) {
                    var $81 = $62.colorMorph = {};
                    $81.red = readUi8($bytes, $stream);
                    $81.green = readUi8($bytes, $stream);
                    $81.blue = readUi8($bytes, $stream);
                    $81.alpha = readUi8($bytes, $stream);
                  }
                }
                $60.push($62);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $42.push($43);
        } while (!eos);
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $82 = $.recordsMorph = [];
        do {
          var $83 = {};
          var type = $83.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $83.eos = !(type || flags);
          if (type) {
            var isStraight = $83.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $83.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $83.deltaX = readSb($bytes, $stream, bits);
                $83.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $83.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $83.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $83.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $83.controlDeltaX = readSb($bytes, $stream, bits);
              $83.controlDeltaY = readSb($bytes, $stream, bits);
              $83.anchorDeltaX = readSb($bytes, $stream, bits);
              $83.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $83.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $83.hasNewStyles = 0;
            }
            var hasLineStyle = $83.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $83.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $83.hasFillStyle0 = flags >> 1 & 1;
            var move = $83.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $83.moveX = readSb($bytes, $stream, bits);
              $83.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $83.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $83.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $83.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $84 = $83.fillStyles = [];
              var $85 = count;
              while ($85--) {
                var $86 = {};
                var type = $86.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $87 = $86.color = {};
                    $87.red = readUi8($bytes, $stream);
                    $87.green = readUi8($bytes, $stream);
                    $87.blue = readUi8($bytes, $stream);
                    $87.alpha = readUi8($bytes, $stream);
                  } else {
                    var $88 = $86.color = {};
                    $88.red = readUi8($bytes, $stream);
                    $88.green = readUi8($bytes, $stream);
                    $88.blue = readUi8($bytes, $stream);
                    $88.alpha = 255;
                  }
                  if (isMorph) {
                    var $89 = $86.colorMorph = {};
                    $89.red = readUi8($bytes, $stream);
                    $89.green = readUi8($bytes, $stream);
                    $89.blue = readUi8($bytes, $stream);
                    $89.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $90 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.a = readFb($bytes, $stream, bits);
                    $90.d = readFb($bytes, $stream, bits);
                  } else {
                    $90.a = 1;
                    $90.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.b = readFb($bytes, $stream, bits);
                    $90.c = readFb($bytes, $stream, bits);
                  } else {
                    $90.b = 0;
                    $90.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $90.tx = e / 20;
                  $90.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $91 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.a = readFb($bytes, $stream, bits);
                      $91.d = readFb($bytes, $stream, bits);
                    } else {
                      $91.a = 1;
                      $91.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.b = readFb($bytes, $stream, bits);
                      $91.c = readFb($bytes, $stream, bits);
                    } else {
                      $91.b = 0;
                      $91.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $91.tx = e / 20;
                    $91.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $86.spreadMode = readUb($bytes, $stream, 2);
                    $86.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $86.count = readUb($bytes, $stream, 4);
                  var $92 = $86.records = [];
                  var $93 = count;
                  while ($93--) {
                    var $94 = {};
                    $94.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $95 = $94.color = {};
                      $95.red = readUi8($bytes, $stream);
                      $95.green = readUi8($bytes, $stream);
                      $95.blue = readUi8($bytes, $stream);
                      $95.alpha = readUi8($bytes, $stream);
                    } else {
                      var $96 = $94.color = {};
                      $96.red = readUi8($bytes, $stream);
                      $96.green = readUi8($bytes, $stream);
                      $96.blue = readUi8($bytes, $stream);
                      $96.alpha = 255;
                    }
                    if (isMorph) {
                      $94.ratioMorph = readUi8($bytes, $stream);
                      var $97 = $94.colorMorph = {};
                      $97.red = readUi8($bytes, $stream);
                      $97.green = readUi8($bytes, $stream);
                      $97.blue = readUi8($bytes, $stream);
                      $97.alpha = readUi8($bytes, $stream);
                    }
                    $92.push($94);
                  }
                  if (type === 19) {
                    $86.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $86.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $86.bitmapId = readUi16($bytes, $stream);
                  var $98 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.a = readFb($bytes, $stream, bits);
                    $98.d = readFb($bytes, $stream, bits);
                  } else {
                    $98.a = 1;
                    $98.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.b = readFb($bytes, $stream, bits);
                    $98.c = readFb($bytes, $stream, bits);
                  } else {
                    $98.b = 0;
                    $98.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $98.tx = e / 20;
                  $98.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $99 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.a = readFb($bytes, $stream, bits);
                      $99.d = readFb($bytes, $stream, bits);
                    } else {
                      $99.a = 1;
                      $99.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.b = readFb($bytes, $stream, bits);
                      $99.c = readFb($bytes, $stream, bits);
                    } else {
                      $99.b = 0;
                      $99.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $99.tx = e / 20;
                    $99.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $86.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $84.push($86);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $100 = $83.lineStyles = [];
              var $101 = count;
              while ($101--) {
                var $102 = {};
                $102.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $102.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $102.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $102.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $102.hasFill = readUb($bytes, $stream, 1);
                  $102.noHscale = readUb($bytes, $stream, 1);
                  $102.noVscale = readUb($bytes, $stream, 1);
                  $102.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $102.noClose = readUb($bytes, $stream, 1);
                  $102.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $102.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $103 = $102.fillStyle = {};
                    var type = $103.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $104 = $103.color = {};
                        $104.red = readUi8($bytes, $stream);
                        $104.green = readUi8($bytes, $stream);
                        $104.blue = readUi8($bytes, $stream);
                        $104.alpha = readUi8($bytes, $stream);
                      } else {
                        var $105 = $103.color = {};
                        $105.red = readUi8($bytes, $stream);
                        $105.green = readUi8($bytes, $stream);
                        $105.blue = readUi8($bytes, $stream);
                        $105.alpha = 255;
                      }
                      if (isMorph) {
                        var $106 = $103.colorMorph = {};
                        $106.red = readUi8($bytes, $stream);
                        $106.green = readUi8($bytes, $stream);
                        $106.blue = readUi8($bytes, $stream);
                        $106.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $107 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.a = readFb($bytes, $stream, bits);
                        $107.d = readFb($bytes, $stream, bits);
                      } else {
                        $107.a = 1;
                        $107.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.b = readFb($bytes, $stream, bits);
                        $107.c = readFb($bytes, $stream, bits);
                      } else {
                        $107.b = 0;
                        $107.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $107.tx = e / 20;
                      $107.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $108 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.a = readFb($bytes, $stream, bits);
                          $108.d = readFb($bytes, $stream, bits);
                        } else {
                          $108.a = 1;
                          $108.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.b = readFb($bytes, $stream, bits);
                          $108.c = readFb($bytes, $stream, bits);
                        } else {
                          $108.b = 0;
                          $108.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $108.tx = e / 20;
                        $108.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $103.spreadMode = readUb($bytes, $stream, 2);
                        $103.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $103.count = readUb($bytes, $stream, 4);
                      var $109 = $103.records = [];
                      var $110 = count;
                      while ($110--) {
                        var $111 = {};
                        $111.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $112 = $111.color = {};
                          $112.red = readUi8($bytes, $stream);
                          $112.green = readUi8($bytes, $stream);
                          $112.blue = readUi8($bytes, $stream);
                          $112.alpha = readUi8($bytes, $stream);
                        } else {
                          var $113 = $111.color = {};
                          $113.red = readUi8($bytes, $stream);
                          $113.green = readUi8($bytes, $stream);
                          $113.blue = readUi8($bytes, $stream);
                          $113.alpha = 255;
                        }
                        if (isMorph) {
                          $111.ratioMorph = readUi8($bytes, $stream);
                          var $114 = $111.colorMorph = {};
                          $114.red = readUi8($bytes, $stream);
                          $114.green = readUi8($bytes, $stream);
                          $114.blue = readUi8($bytes, $stream);
                          $114.alpha = readUi8($bytes, $stream);
                        }
                        $109.push($111);
                      }
                      if (type === 19) {
                        $103.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $103.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $103.bitmapId = readUi16($bytes, $stream);
                      var $115 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.a = readFb($bytes, $stream, bits);
                        $115.d = readFb($bytes, $stream, bits);
                      } else {
                        $115.a = 1;
                        $115.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.b = readFb($bytes, $stream, bits);
                        $115.c = readFb($bytes, $stream, bits);
                      } else {
                        $115.b = 0;
                        $115.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $115.tx = e / 20;
                      $115.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $116 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.a = readFb($bytes, $stream, bits);
                          $116.d = readFb($bytes, $stream, bits);
                        } else {
                          $116.a = 1;
                          $116.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.b = readFb($bytes, $stream, bits);
                          $116.c = readFb($bytes, $stream, bits);
                        } else {
                          $116.b = 0;
                          $116.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $116.tx = e / 20;
                        $116.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $103.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $117 = $102.color = {};
                    $117.red = readUi8($bytes, $stream);
                    $117.green = readUi8($bytes, $stream);
                    $117.blue = readUi8($bytes, $stream);
                    $117.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $118 = $102.colorMorph = {};
                      $118.red = readUi8($bytes, $stream);
                      $118.green = readUi8($bytes, $stream);
                      $118.blue = readUi8($bytes, $stream);
                      $118.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $119 = $102.color = {};
                    $119.red = readUi8($bytes, $stream);
                    $119.green = readUi8($bytes, $stream);
                    $119.blue = readUi8($bytes, $stream);
                    $119.alpha = readUi8($bytes, $stream);
                  } else {
                    var $120 = $102.color = {};
                    $120.red = readUi8($bytes, $stream);
                    $120.green = readUi8($bytes, $stream);
                    $120.blue = readUi8($bytes, $stream);
                    $120.alpha = 255;
                  }
                  if (isMorph) {
                    var $121 = $102.colorMorph = {};
                    $121.red = readUi8($bytes, $stream);
                    $121.green = readUi8($bytes, $stream);
                    $121.blue = readUi8($bytes, $stream);
                    $121.alpha = readUi8($bytes, $stream);
                  }
                }
                $100.push($102);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $82.push($83);
        } while (!eos);
      } else {
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $122 = $.fillStyles = [];
        var $123 = count;
        while ($123--) {
          var $124 = {};
          var type = $124.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $125 = $124.color = {};
              $125.red = readUi8($bytes, $stream);
              $125.green = readUi8($bytes, $stream);
              $125.blue = readUi8($bytes, $stream);
              $125.alpha = readUi8($bytes, $stream);
            } else {
              var $126 = $124.color = {};
              $126.red = readUi8($bytes, $stream);
              $126.green = readUi8($bytes, $stream);
              $126.blue = readUi8($bytes, $stream);
              $126.alpha = 255;
            }
            if (isMorph) {
              var $127 = $124.colorMorph = {};
              $127.red = readUi8($bytes, $stream);
              $127.green = readUi8($bytes, $stream);
              $127.blue = readUi8($bytes, $stream);
              $127.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $128 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $128.a = readFb($bytes, $stream, bits);
              $128.d = readFb($bytes, $stream, bits);
            } else {
              $128.a = 1;
              $128.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $128.b = readFb($bytes, $stream, bits);
              $128.c = readFb($bytes, $stream, bits);
            } else {
              $128.b = 0;
              $128.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $128.tx = e / 20;
            $128.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $129 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $129.a = readFb($bytes, $stream, bits);
                $129.d = readFb($bytes, $stream, bits);
              } else {
                $129.a = 1;
                $129.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $129.b = readFb($bytes, $stream, bits);
                $129.c = readFb($bytes, $stream, bits);
              } else {
                $129.b = 0;
                $129.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $129.tx = e / 20;
              $129.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $124.spreadMode = readUb($bytes, $stream, 2);
              $124.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $124.count = readUb($bytes, $stream, 4);
            var $130 = $124.records = [];
            var $131 = count;
            while ($131--) {
              var $132 = {};
              $132.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $133 = $132.color = {};
                $133.red = readUi8($bytes, $stream);
                $133.green = readUi8($bytes, $stream);
                $133.blue = readUi8($bytes, $stream);
                $133.alpha = readUi8($bytes, $stream);
              } else {
                var $134 = $132.color = {};
                $134.red = readUi8($bytes, $stream);
                $134.green = readUi8($bytes, $stream);
                $134.blue = readUi8($bytes, $stream);
                $134.alpha = 255;
              }
              if (isMorph) {
                $132.ratioMorph = readUi8($bytes, $stream);
                var $135 = $132.colorMorph = {};
                $135.red = readUi8($bytes, $stream);
                $135.green = readUi8($bytes, $stream);
                $135.blue = readUi8($bytes, $stream);
                $135.alpha = readUi8($bytes, $stream);
              }
              $130.push($132);
            }
            if (type === 19) {
              $124.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $124.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $124.bitmapId = readUi16($bytes, $stream);
            var $136 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $136.a = readFb($bytes, $stream, bits);
              $136.d = readFb($bytes, $stream, bits);
            } else {
              $136.a = 1;
              $136.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $136.b = readFb($bytes, $stream, bits);
              $136.c = readFb($bytes, $stream, bits);
            } else {
              $136.b = 0;
              $136.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $136.tx = e / 20;
            $136.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $137 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $137.a = readFb($bytes, $stream, bits);
                $137.d = readFb($bytes, $stream, bits);
              } else {
                $137.a = 1;
                $137.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $137.b = readFb($bytes, $stream, bits);
                $137.c = readFb($bytes, $stream, bits);
              } else {
                $137.b = 0;
                $137.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $137.tx = e / 20;
              $137.ty = f / 20;
              align($bytes, $stream);
            }
            $124.condition = type === 64 || type === 67;
            break;
          default:
          }
          $122.push($124);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $138 = $.lineStyles = [];
        var $139 = count;
        while ($139--) {
          var $140 = {};
          $140.width = readUi16($bytes, $stream);
          if (isMorph) {
            $140.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $140.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $140.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $140.hasFill = readUb($bytes, $stream, 1);
            $140.noHscale = readUb($bytes, $stream, 1);
            $140.noVscale = readUb($bytes, $stream, 1);
            $140.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $140.noClose = readUb($bytes, $stream, 1);
            $140.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $140.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $141 = $140.fillStyle = {};
              var type = $141.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $142 = $141.color = {};
                  $142.red = readUi8($bytes, $stream);
                  $142.green = readUi8($bytes, $stream);
                  $142.blue = readUi8($bytes, $stream);
                  $142.alpha = readUi8($bytes, $stream);
                } else {
                  var $143 = $141.color = {};
                  $143.red = readUi8($bytes, $stream);
                  $143.green = readUi8($bytes, $stream);
                  $143.blue = readUi8($bytes, $stream);
                  $143.alpha = 255;
                }
                if (isMorph) {
                  var $144 = $141.colorMorph = {};
                  $144.red = readUi8($bytes, $stream);
                  $144.green = readUi8($bytes, $stream);
                  $144.blue = readUi8($bytes, $stream);
                  $144.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $145 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.a = readFb($bytes, $stream, bits);
                  $145.d = readFb($bytes, $stream, bits);
                } else {
                  $145.a = 1;
                  $145.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.b = readFb($bytes, $stream, bits);
                  $145.c = readFb($bytes, $stream, bits);
                } else {
                  $145.b = 0;
                  $145.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $145.tx = e / 20;
                $145.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $146 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.a = readFb($bytes, $stream, bits);
                    $146.d = readFb($bytes, $stream, bits);
                  } else {
                    $146.a = 1;
                    $146.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.b = readFb($bytes, $stream, bits);
                    $146.c = readFb($bytes, $stream, bits);
                  } else {
                    $146.b = 0;
                    $146.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $146.tx = e / 20;
                  $146.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $141.spreadMode = readUb($bytes, $stream, 2);
                  $141.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $141.count = readUb($bytes, $stream, 4);
                var $147 = $141.records = [];
                var $148 = count;
                while ($148--) {
                  var $149 = {};
                  $149.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $150 = $149.color = {};
                    $150.red = readUi8($bytes, $stream);
                    $150.green = readUi8($bytes, $stream);
                    $150.blue = readUi8($bytes, $stream);
                    $150.alpha = readUi8($bytes, $stream);
                  } else {
                    var $151 = $149.color = {};
                    $151.red = readUi8($bytes, $stream);
                    $151.green = readUi8($bytes, $stream);
                    $151.blue = readUi8($bytes, $stream);
                    $151.alpha = 255;
                  }
                  if (isMorph) {
                    $149.ratioMorph = readUi8($bytes, $stream);
                    var $152 = $149.colorMorph = {};
                    $152.red = readUi8($bytes, $stream);
                    $152.green = readUi8($bytes, $stream);
                    $152.blue = readUi8($bytes, $stream);
                    $152.alpha = readUi8($bytes, $stream);
                  }
                  $147.push($149);
                }
                if (type === 19) {
                  $141.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $141.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $141.bitmapId = readUi16($bytes, $stream);
                var $153 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.a = readFb($bytes, $stream, bits);
                  $153.d = readFb($bytes, $stream, bits);
                } else {
                  $153.a = 1;
                  $153.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.b = readFb($bytes, $stream, bits);
                  $153.c = readFb($bytes, $stream, bits);
                } else {
                  $153.b = 0;
                  $153.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $153.tx = e / 20;
                $153.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $154 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.a = readFb($bytes, $stream, bits);
                    $154.d = readFb($bytes, $stream, bits);
                  } else {
                    $154.a = 1;
                    $154.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.b = readFb($bytes, $stream, bits);
                    $154.c = readFb($bytes, $stream, bits);
                  } else {
                    $154.b = 0;
                    $154.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $154.tx = e / 20;
                  $154.ty = f / 20;
                  align($bytes, $stream);
                }
                $141.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $155 = $140.color = {};
              $155.red = readUi8($bytes, $stream);
              $155.green = readUi8($bytes, $stream);
              $155.blue = readUi8($bytes, $stream);
              $155.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $156 = $140.colorMorph = {};
                $156.red = readUi8($bytes, $stream);
                $156.green = readUi8($bytes, $stream);
                $156.blue = readUi8($bytes, $stream);
                $156.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $157 = $140.color = {};
              $157.red = readUi8($bytes, $stream);
              $157.green = readUi8($bytes, $stream);
              $157.blue = readUi8($bytes, $stream);
              $157.alpha = readUi8($bytes, $stream);
            } else {
              var $158 = $140.color = {};
              $158.red = readUi8($bytes, $stream);
              $158.green = readUi8($bytes, $stream);
              $158.blue = readUi8($bytes, $stream);
              $158.alpha = 255;
            }
            if (isMorph) {
              var $159 = $140.colorMorph = {};
              $159.red = readUi8($bytes, $stream);
              $159.green = readUi8($bytes, $stream);
              $159.blue = readUi8($bytes, $stream);
              $159.alpha = readUi8($bytes, $stream);
            }
          }
          $138.push($140);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $160 = $.records = [];
        do {
          var $161 = {};
          var type = $161.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $161.eos = !(type || flags);
          if (type) {
            var isStraight = $161.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $161.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $161.deltaX = readSb($bytes, $stream, bits);
                $161.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $161.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $161.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $161.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $161.controlDeltaX = readSb($bytes, $stream, bits);
              $161.controlDeltaY = readSb($bytes, $stream, bits);
              $161.anchorDeltaX = readSb($bytes, $stream, bits);
              $161.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $161.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $161.hasNewStyles = 0;
            }
            var hasLineStyle = $161.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $161.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $161.hasFillStyle0 = flags >> 1 & 1;
            var move = $161.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $161.moveX = readSb($bytes, $stream, bits);
              $161.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $161.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $161.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $161.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $162 = $161.fillStyles = [];
              var $163 = count;
              while ($163--) {
                var $164 = {};
                var type = $164.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $165 = $164.color = {};
                    $165.red = readUi8($bytes, $stream);
                    $165.green = readUi8($bytes, $stream);
                    $165.blue = readUi8($bytes, $stream);
                    $165.alpha = readUi8($bytes, $stream);
                  } else {
                    var $166 = $164.color = {};
                    $166.red = readUi8($bytes, $stream);
                    $166.green = readUi8($bytes, $stream);
                    $166.blue = readUi8($bytes, $stream);
                    $166.alpha = 255;
                  }
                  if (isMorph) {
                    var $167 = $164.colorMorph = {};
                    $167.red = readUi8($bytes, $stream);
                    $167.green = readUi8($bytes, $stream);
                    $167.blue = readUi8($bytes, $stream);
                    $167.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $168 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.a = readFb($bytes, $stream, bits);
                    $168.d = readFb($bytes, $stream, bits);
                  } else {
                    $168.a = 1;
                    $168.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.b = readFb($bytes, $stream, bits);
                    $168.c = readFb($bytes, $stream, bits);
                  } else {
                    $168.b = 0;
                    $168.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $168.tx = e / 20;
                  $168.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $169 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.a = readFb($bytes, $stream, bits);
                      $169.d = readFb($bytes, $stream, bits);
                    } else {
                      $169.a = 1;
                      $169.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.b = readFb($bytes, $stream, bits);
                      $169.c = readFb($bytes, $stream, bits);
                    } else {
                      $169.b = 0;
                      $169.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $169.tx = e / 20;
                    $169.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $164.spreadMode = readUb($bytes, $stream, 2);
                    $164.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $164.count = readUb($bytes, $stream, 4);
                  var $170 = $164.records = [];
                  var $171 = count;
                  while ($171--) {
                    var $172 = {};
                    $172.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $173 = $172.color = {};
                      $173.red = readUi8($bytes, $stream);
                      $173.green = readUi8($bytes, $stream);
                      $173.blue = readUi8($bytes, $stream);
                      $173.alpha = readUi8($bytes, $stream);
                    } else {
                      var $174 = $172.color = {};
                      $174.red = readUi8($bytes, $stream);
                      $174.green = readUi8($bytes, $stream);
                      $174.blue = readUi8($bytes, $stream);
                      $174.alpha = 255;
                    }
                    if (isMorph) {
                      $172.ratioMorph = readUi8($bytes, $stream);
                      var $175 = $172.colorMorph = {};
                      $175.red = readUi8($bytes, $stream);
                      $175.green = readUi8($bytes, $stream);
                      $175.blue = readUi8($bytes, $stream);
                      $175.alpha = readUi8($bytes, $stream);
                    }
                    $170.push($172);
                  }
                  if (type === 19) {
                    $164.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $164.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $164.bitmapId = readUi16($bytes, $stream);
                  var $176 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.a = readFb($bytes, $stream, bits);
                    $176.d = readFb($bytes, $stream, bits);
                  } else {
                    $176.a = 1;
                    $176.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.b = readFb($bytes, $stream, bits);
                    $176.c = readFb($bytes, $stream, bits);
                  } else {
                    $176.b = 0;
                    $176.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $176.tx = e / 20;
                  $176.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $177 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.a = readFb($bytes, $stream, bits);
                      $177.d = readFb($bytes, $stream, bits);
                    } else {
                      $177.a = 1;
                      $177.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.b = readFb($bytes, $stream, bits);
                      $177.c = readFb($bytes, $stream, bits);
                    } else {
                      $177.b = 0;
                      $177.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $177.tx = e / 20;
                    $177.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $164.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $162.push($164);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $178 = $161.lineStyles = [];
              var $179 = count;
              while ($179--) {
                var $180 = {};
                $180.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $180.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $180.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $180.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $180.hasFill = readUb($bytes, $stream, 1);
                  $180.noHscale = readUb($bytes, $stream, 1);
                  $180.noVscale = readUb($bytes, $stream, 1);
                  $180.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $180.noClose = readUb($bytes, $stream, 1);
                  $180.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $180.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $181 = $180.fillStyle = {};
                    var type = $181.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $182 = $181.color = {};
                        $182.red = readUi8($bytes, $stream);
                        $182.green = readUi8($bytes, $stream);
                        $182.blue = readUi8($bytes, $stream);
                        $182.alpha = readUi8($bytes, $stream);
                      } else {
                        var $183 = $181.color = {};
                        $183.red = readUi8($bytes, $stream);
                        $183.green = readUi8($bytes, $stream);
                        $183.blue = readUi8($bytes, $stream);
                        $183.alpha = 255;
                      }
                      if (isMorph) {
                        var $184 = $181.colorMorph = {};
                        $184.red = readUi8($bytes, $stream);
                        $184.green = readUi8($bytes, $stream);
                        $184.blue = readUi8($bytes, $stream);
                        $184.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $185 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.a = readFb($bytes, $stream, bits);
                        $185.d = readFb($bytes, $stream, bits);
                      } else {
                        $185.a = 1;
                        $185.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.b = readFb($bytes, $stream, bits);
                        $185.c = readFb($bytes, $stream, bits);
                      } else {
                        $185.b = 0;
                        $185.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $185.tx = e / 20;
                      $185.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $186 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.a = readFb($bytes, $stream, bits);
                          $186.d = readFb($bytes, $stream, bits);
                        } else {
                          $186.a = 1;
                          $186.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.b = readFb($bytes, $stream, bits);
                          $186.c = readFb($bytes, $stream, bits);
                        } else {
                          $186.b = 0;
                          $186.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $186.tx = e / 20;
                        $186.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $181.spreadMode = readUb($bytes, $stream, 2);
                        $181.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $181.count = readUb($bytes, $stream, 4);
                      var $187 = $181.records = [];
                      var $188 = count;
                      while ($188--) {
                        var $189 = {};
                        $189.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $190 = $189.color = {};
                          $190.red = readUi8($bytes, $stream);
                          $190.green = readUi8($bytes, $stream);
                          $190.blue = readUi8($bytes, $stream);
                          $190.alpha = readUi8($bytes, $stream);
                        } else {
                          var $191 = $189.color = {};
                          $191.red = readUi8($bytes, $stream);
                          $191.green = readUi8($bytes, $stream);
                          $191.blue = readUi8($bytes, $stream);
                          $191.alpha = 255;
                        }
                        if (isMorph) {
                          $189.ratioMorph = readUi8($bytes, $stream);
                          var $192 = $189.colorMorph = {};
                          $192.red = readUi8($bytes, $stream);
                          $192.green = readUi8($bytes, $stream);
                          $192.blue = readUi8($bytes, $stream);
                          $192.alpha = readUi8($bytes, $stream);
                        }
                        $187.push($189);
                      }
                      if (type === 19) {
                        $181.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $181.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $181.bitmapId = readUi16($bytes, $stream);
                      var $193 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.a = readFb($bytes, $stream, bits);
                        $193.d = readFb($bytes, $stream, bits);
                      } else {
                        $193.a = 1;
                        $193.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.b = readFb($bytes, $stream, bits);
                        $193.c = readFb($bytes, $stream, bits);
                      } else {
                        $193.b = 0;
                        $193.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $193.tx = e / 20;
                      $193.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $194 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.a = readFb($bytes, $stream, bits);
                          $194.d = readFb($bytes, $stream, bits);
                        } else {
                          $194.a = 1;
                          $194.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.b = readFb($bytes, $stream, bits);
                          $194.c = readFb($bytes, $stream, bits);
                        } else {
                          $194.b = 0;
                          $194.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $194.tx = e / 20;
                        $194.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $181.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $195 = $180.color = {};
                    $195.red = readUi8($bytes, $stream);
                    $195.green = readUi8($bytes, $stream);
                    $195.blue = readUi8($bytes, $stream);
                    $195.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $196 = $180.colorMorph = {};
                      $196.red = readUi8($bytes, $stream);
                      $196.green = readUi8($bytes, $stream);
                      $196.blue = readUi8($bytes, $stream);
                      $196.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $197 = $180.color = {};
                    $197.red = readUi8($bytes, $stream);
                    $197.green = readUi8($bytes, $stream);
                    $197.blue = readUi8($bytes, $stream);
                    $197.alpha = readUi8($bytes, $stream);
                  } else {
                    var $198 = $180.color = {};
                    $198.red = readUi8($bytes, $stream);
                    $198.green = readUi8($bytes, $stream);
                    $198.blue = readUi8($bytes, $stream);
                    $198.alpha = 255;
                  }
                  if (isMorph) {
                    var $199 = $180.colorMorph = {};
                    $199.red = readUi8($bytes, $stream);
                    $199.green = readUi8($bytes, $stream);
                    $199.blue = readUi8($bytes, $stream);
                    $199.alpha = readUi8($bytes, $stream);
                  }
                }
                $178.push($180);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $160.push($161);
        } while (!eos);
      }
      return $;
    },
    84: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      var $0 = $.bbox = {};
      align($bytes, $stream);
      var bits = readUb($bytes, $stream, 5);
      var xMin = readSb($bytes, $stream, bits);
      var xMax = readSb($bytes, $stream, bits);
      var yMin = readSb($bytes, $stream, bits);
      var yMax = readSb($bytes, $stream, bits);
      $0.left = xMin / 20;
      $0.right = xMax / 20;
      $0.top = yMin / 20;
      $0.bottom = yMax / 20;
      align($bytes, $stream);
      var isMorph = $.isMorph = tagCode === 46 || tagCode === 84;
      if (isMorph) {
        var $1 = $.bboxMorph = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $1.left = xMin / 20;
        $1.right = xMax / 20;
        $1.top = yMin / 20;
        $1.bottom = yMax / 20;
        align($bytes, $stream);
      }
      var hasStrokes = $.hasStrokes = tagCode === 83 || tagCode === 84;
      if (hasStrokes) {
        var $2 = $.strokeBbox = {};
        align($bytes, $stream);
        var bits = readUb($bytes, $stream, 5);
        var xMin = readSb($bytes, $stream, bits);
        var xMax = readSb($bytes, $stream, bits);
        var yMin = readSb($bytes, $stream, bits);
        var yMax = readSb($bytes, $stream, bits);
        $2.left = xMin / 20;
        $2.right = xMax / 20;
        $2.top = yMin / 20;
        $2.bottom = yMax / 20;
        align($bytes, $stream);
        if (isMorph) {
          var $3 = $.strokeBboxMorph = {};
          align($bytes, $stream);
          var bits = readUb($bytes, $stream, 5);
          var xMin = readSb($bytes, $stream, bits);
          var xMax = readSb($bytes, $stream, bits);
          var yMin = readSb($bytes, $stream, bits);
          var yMax = readSb($bytes, $stream, bits);
          $3.left = xMin / 20;
          $3.right = xMax / 20;
          $3.top = yMin / 20;
          $3.bottom = yMax / 20;
          align($bytes, $stream);
        }
        var reserved = readUb($bytes, $stream, 5);
        $.fillWinding = readUb($bytes, $stream, 1);
        $.nonScalingStrokes = readUb($bytes, $stream, 1);
        $.scalingStrokes = readUb($bytes, $stream, 1);
      }
      if (isMorph) {
        $.offsetMorph = readUi32($bytes, $stream);
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $4 = $.fillStyles = [];
        var $5 = count;
        while ($5--) {
          var $6 = {};
          var type = $6.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $7 = $6.color = {};
              $7.red = readUi8($bytes, $stream);
              $7.green = readUi8($bytes, $stream);
              $7.blue = readUi8($bytes, $stream);
              $7.alpha = readUi8($bytes, $stream);
            } else {
              var $8 = $6.color = {};
              $8.red = readUi8($bytes, $stream);
              $8.green = readUi8($bytes, $stream);
              $8.blue = readUi8($bytes, $stream);
              $8.alpha = 255;
            }
            if (isMorph) {
              var $9 = $6.colorMorph = {};
              $9.red = readUi8($bytes, $stream);
              $9.green = readUi8($bytes, $stream);
              $9.blue = readUi8($bytes, $stream);
              $9.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $10 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $10.a = readFb($bytes, $stream, bits);
              $10.d = readFb($bytes, $stream, bits);
            } else {
              $10.a = 1;
              $10.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $10.b = readFb($bytes, $stream, bits);
              $10.c = readFb($bytes, $stream, bits);
            } else {
              $10.b = 0;
              $10.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $10.tx = e / 20;
            $10.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $11 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $11.a = readFb($bytes, $stream, bits);
                $11.d = readFb($bytes, $stream, bits);
              } else {
                $11.a = 1;
                $11.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $11.b = readFb($bytes, $stream, bits);
                $11.c = readFb($bytes, $stream, bits);
              } else {
                $11.b = 0;
                $11.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $11.tx = e / 20;
              $11.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $6.spreadMode = readUb($bytes, $stream, 2);
              $6.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $6.count = readUb($bytes, $stream, 4);
            var $12 = $6.records = [];
            var $13 = count;
            while ($13--) {
              var $14 = {};
              $14.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $15 = $14.color = {};
                $15.red = readUi8($bytes, $stream);
                $15.green = readUi8($bytes, $stream);
                $15.blue = readUi8($bytes, $stream);
                $15.alpha = readUi8($bytes, $stream);
              } else {
                var $16 = $14.color = {};
                $16.red = readUi8($bytes, $stream);
                $16.green = readUi8($bytes, $stream);
                $16.blue = readUi8($bytes, $stream);
                $16.alpha = 255;
              }
              if (isMorph) {
                $14.ratioMorph = readUi8($bytes, $stream);
                var $17 = $14.colorMorph = {};
                $17.red = readUi8($bytes, $stream);
                $17.green = readUi8($bytes, $stream);
                $17.blue = readUi8($bytes, $stream);
                $17.alpha = readUi8($bytes, $stream);
              }
              $12.push($14);
            }
            if (type === 19) {
              $6.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $6.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $6.bitmapId = readUi16($bytes, $stream);
            var $18 = $6.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $18.a = readFb($bytes, $stream, bits);
              $18.d = readFb($bytes, $stream, bits);
            } else {
              $18.a = 1;
              $18.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $18.b = readFb($bytes, $stream, bits);
              $18.c = readFb($bytes, $stream, bits);
            } else {
              $18.b = 0;
              $18.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $18.tx = e / 20;
            $18.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $19 = $6.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $19.a = readFb($bytes, $stream, bits);
                $19.d = readFb($bytes, $stream, bits);
              } else {
                $19.a = 1;
                $19.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $19.b = readFb($bytes, $stream, bits);
                $19.c = readFb($bytes, $stream, bits);
              } else {
                $19.b = 0;
                $19.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $19.tx = e / 20;
              $19.ty = f / 20;
              align($bytes, $stream);
            }
            $6.condition = type === 64 || type === 67;
            break;
          default:
          }
          $4.push($6);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $20 = $.lineStyles = [];
        var $21 = count;
        while ($21--) {
          var $22 = {};
          $22.width = readUi16($bytes, $stream);
          if (isMorph) {
            $22.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $22.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $22.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $22.hasFill = readUb($bytes, $stream, 1);
            $22.noHscale = readUb($bytes, $stream, 1);
            $22.noVscale = readUb($bytes, $stream, 1);
            $22.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $22.noClose = readUb($bytes, $stream, 1);
            $22.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $22.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $23 = $22.fillStyle = {};
              var type = $23.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $24 = $23.color = {};
                  $24.red = readUi8($bytes, $stream);
                  $24.green = readUi8($bytes, $stream);
                  $24.blue = readUi8($bytes, $stream);
                  $24.alpha = readUi8($bytes, $stream);
                } else {
                  var $25 = $23.color = {};
                  $25.red = readUi8($bytes, $stream);
                  $25.green = readUi8($bytes, $stream);
                  $25.blue = readUi8($bytes, $stream);
                  $25.alpha = 255;
                }
                if (isMorph) {
                  var $26 = $23.colorMorph = {};
                  $26.red = readUi8($bytes, $stream);
                  $26.green = readUi8($bytes, $stream);
                  $26.blue = readUi8($bytes, $stream);
                  $26.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $27 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.a = readFb($bytes, $stream, bits);
                  $27.d = readFb($bytes, $stream, bits);
                } else {
                  $27.a = 1;
                  $27.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $27.b = readFb($bytes, $stream, bits);
                  $27.c = readFb($bytes, $stream, bits);
                } else {
                  $27.b = 0;
                  $27.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $27.tx = e / 20;
                $27.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $28 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.a = readFb($bytes, $stream, bits);
                    $28.d = readFb($bytes, $stream, bits);
                  } else {
                    $28.a = 1;
                    $28.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $28.b = readFb($bytes, $stream, bits);
                    $28.c = readFb($bytes, $stream, bits);
                  } else {
                    $28.b = 0;
                    $28.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $28.tx = e / 20;
                  $28.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $23.spreadMode = readUb($bytes, $stream, 2);
                  $23.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $23.count = readUb($bytes, $stream, 4);
                var $29 = $23.records = [];
                var $30 = count;
                while ($30--) {
                  var $31 = {};
                  $31.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $32 = $31.color = {};
                    $32.red = readUi8($bytes, $stream);
                    $32.green = readUi8($bytes, $stream);
                    $32.blue = readUi8($bytes, $stream);
                    $32.alpha = readUi8($bytes, $stream);
                  } else {
                    var $33 = $31.color = {};
                    $33.red = readUi8($bytes, $stream);
                    $33.green = readUi8($bytes, $stream);
                    $33.blue = readUi8($bytes, $stream);
                    $33.alpha = 255;
                  }
                  if (isMorph) {
                    $31.ratioMorph = readUi8($bytes, $stream);
                    var $34 = $31.colorMorph = {};
                    $34.red = readUi8($bytes, $stream);
                    $34.green = readUi8($bytes, $stream);
                    $34.blue = readUi8($bytes, $stream);
                    $34.alpha = readUi8($bytes, $stream);
                  }
                  $29.push($31);
                }
                if (type === 19) {
                  $23.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $23.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $23.bitmapId = readUi16($bytes, $stream);
                var $35 = $23.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.a = readFb($bytes, $stream, bits);
                  $35.d = readFb($bytes, $stream, bits);
                } else {
                  $35.a = 1;
                  $35.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $35.b = readFb($bytes, $stream, bits);
                  $35.c = readFb($bytes, $stream, bits);
                } else {
                  $35.b = 0;
                  $35.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $35.tx = e / 20;
                $35.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $36 = $23.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.a = readFb($bytes, $stream, bits);
                    $36.d = readFb($bytes, $stream, bits);
                  } else {
                    $36.a = 1;
                    $36.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $36.b = readFb($bytes, $stream, bits);
                    $36.c = readFb($bytes, $stream, bits);
                  } else {
                    $36.b = 0;
                    $36.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $36.tx = e / 20;
                  $36.ty = f / 20;
                  align($bytes, $stream);
                }
                $23.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $37 = $22.color = {};
              $37.red = readUi8($bytes, $stream);
              $37.green = readUi8($bytes, $stream);
              $37.blue = readUi8($bytes, $stream);
              $37.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $38 = $22.colorMorph = {};
                $38.red = readUi8($bytes, $stream);
                $38.green = readUi8($bytes, $stream);
                $38.blue = readUi8($bytes, $stream);
                $38.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $39 = $22.color = {};
              $39.red = readUi8($bytes, $stream);
              $39.green = readUi8($bytes, $stream);
              $39.blue = readUi8($bytes, $stream);
              $39.alpha = readUi8($bytes, $stream);
            } else {
              var $40 = $22.color = {};
              $40.red = readUi8($bytes, $stream);
              $40.green = readUi8($bytes, $stream);
              $40.blue = readUi8($bytes, $stream);
              $40.alpha = 255;
            }
            if (isMorph) {
              var $41 = $22.colorMorph = {};
              $41.red = readUi8($bytes, $stream);
              $41.green = readUi8($bytes, $stream);
              $41.blue = readUi8($bytes, $stream);
              $41.alpha = readUi8($bytes, $stream);
            }
          }
          $20.push($22);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $42 = $.records = [];
        do {
          var $43 = {};
          var type = $43.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $43.eos = !(type || flags);
          if (type) {
            var isStraight = $43.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $43.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $43.deltaX = readSb($bytes, $stream, bits);
                $43.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $43.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $43.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $43.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $43.controlDeltaX = readSb($bytes, $stream, bits);
              $43.controlDeltaY = readSb($bytes, $stream, bits);
              $43.anchorDeltaX = readSb($bytes, $stream, bits);
              $43.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $43.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $43.hasNewStyles = 0;
            }
            var hasLineStyle = $43.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $43.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $43.hasFillStyle0 = flags >> 1 & 1;
            var move = $43.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $43.moveX = readSb($bytes, $stream, bits);
              $43.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $43.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $43.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $43.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $44 = $43.fillStyles = [];
              var $45 = count;
              while ($45--) {
                var $46 = {};
                var type = $46.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $47 = $46.color = {};
                    $47.red = readUi8($bytes, $stream);
                    $47.green = readUi8($bytes, $stream);
                    $47.blue = readUi8($bytes, $stream);
                    $47.alpha = readUi8($bytes, $stream);
                  } else {
                    var $48 = $46.color = {};
                    $48.red = readUi8($bytes, $stream);
                    $48.green = readUi8($bytes, $stream);
                    $48.blue = readUi8($bytes, $stream);
                    $48.alpha = 255;
                  }
                  if (isMorph) {
                    var $49 = $46.colorMorph = {};
                    $49.red = readUi8($bytes, $stream);
                    $49.green = readUi8($bytes, $stream);
                    $49.blue = readUi8($bytes, $stream);
                    $49.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $50 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.a = readFb($bytes, $stream, bits);
                    $50.d = readFb($bytes, $stream, bits);
                  } else {
                    $50.a = 1;
                    $50.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $50.b = readFb($bytes, $stream, bits);
                    $50.c = readFb($bytes, $stream, bits);
                  } else {
                    $50.b = 0;
                    $50.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $50.tx = e / 20;
                  $50.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $51 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.a = readFb($bytes, $stream, bits);
                      $51.d = readFb($bytes, $stream, bits);
                    } else {
                      $51.a = 1;
                      $51.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $51.b = readFb($bytes, $stream, bits);
                      $51.c = readFb($bytes, $stream, bits);
                    } else {
                      $51.b = 0;
                      $51.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $51.tx = e / 20;
                    $51.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $46.spreadMode = readUb($bytes, $stream, 2);
                    $46.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $46.count = readUb($bytes, $stream, 4);
                  var $52 = $46.records = [];
                  var $53 = count;
                  while ($53--) {
                    var $54 = {};
                    $54.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $55 = $54.color = {};
                      $55.red = readUi8($bytes, $stream);
                      $55.green = readUi8($bytes, $stream);
                      $55.blue = readUi8($bytes, $stream);
                      $55.alpha = readUi8($bytes, $stream);
                    } else {
                      var $56 = $54.color = {};
                      $56.red = readUi8($bytes, $stream);
                      $56.green = readUi8($bytes, $stream);
                      $56.blue = readUi8($bytes, $stream);
                      $56.alpha = 255;
                    }
                    if (isMorph) {
                      $54.ratioMorph = readUi8($bytes, $stream);
                      var $57 = $54.colorMorph = {};
                      $57.red = readUi8($bytes, $stream);
                      $57.green = readUi8($bytes, $stream);
                      $57.blue = readUi8($bytes, $stream);
                      $57.alpha = readUi8($bytes, $stream);
                    }
                    $52.push($54);
                  }
                  if (type === 19) {
                    $46.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $46.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $46.bitmapId = readUi16($bytes, $stream);
                  var $58 = $46.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.a = readFb($bytes, $stream, bits);
                    $58.d = readFb($bytes, $stream, bits);
                  } else {
                    $58.a = 1;
                    $58.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $58.b = readFb($bytes, $stream, bits);
                    $58.c = readFb($bytes, $stream, bits);
                  } else {
                    $58.b = 0;
                    $58.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $58.tx = e / 20;
                  $58.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $59 = $46.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.a = readFb($bytes, $stream, bits);
                      $59.d = readFb($bytes, $stream, bits);
                    } else {
                      $59.a = 1;
                      $59.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $59.b = readFb($bytes, $stream, bits);
                      $59.c = readFb($bytes, $stream, bits);
                    } else {
                      $59.b = 0;
                      $59.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $59.tx = e / 20;
                    $59.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $46.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $44.push($46);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $60 = $43.lineStyles = [];
              var $61 = count;
              while ($61--) {
                var $62 = {};
                $62.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $62.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $62.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $62.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $62.hasFill = readUb($bytes, $stream, 1);
                  $62.noHscale = readUb($bytes, $stream, 1);
                  $62.noVscale = readUb($bytes, $stream, 1);
                  $62.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $62.noClose = readUb($bytes, $stream, 1);
                  $62.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $62.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $63 = $62.fillStyle = {};
                    var type = $63.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $64 = $63.color = {};
                        $64.red = readUi8($bytes, $stream);
                        $64.green = readUi8($bytes, $stream);
                        $64.blue = readUi8($bytes, $stream);
                        $64.alpha = readUi8($bytes, $stream);
                      } else {
                        var $65 = $63.color = {};
                        $65.red = readUi8($bytes, $stream);
                        $65.green = readUi8($bytes, $stream);
                        $65.blue = readUi8($bytes, $stream);
                        $65.alpha = 255;
                      }
                      if (isMorph) {
                        var $66 = $63.colorMorph = {};
                        $66.red = readUi8($bytes, $stream);
                        $66.green = readUi8($bytes, $stream);
                        $66.blue = readUi8($bytes, $stream);
                        $66.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $67 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.a = readFb($bytes, $stream, bits);
                        $67.d = readFb($bytes, $stream, bits);
                      } else {
                        $67.a = 1;
                        $67.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $67.b = readFb($bytes, $stream, bits);
                        $67.c = readFb($bytes, $stream, bits);
                      } else {
                        $67.b = 0;
                        $67.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $67.tx = e / 20;
                      $67.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $68 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.a = readFb($bytes, $stream, bits);
                          $68.d = readFb($bytes, $stream, bits);
                        } else {
                          $68.a = 1;
                          $68.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $68.b = readFb($bytes, $stream, bits);
                          $68.c = readFb($bytes, $stream, bits);
                        } else {
                          $68.b = 0;
                          $68.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $68.tx = e / 20;
                        $68.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $63.spreadMode = readUb($bytes, $stream, 2);
                        $63.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $63.count = readUb($bytes, $stream, 4);
                      var $69 = $63.records = [];
                      var $70 = count;
                      while ($70--) {
                        var $71 = {};
                        $71.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $72 = $71.color = {};
                          $72.red = readUi8($bytes, $stream);
                          $72.green = readUi8($bytes, $stream);
                          $72.blue = readUi8($bytes, $stream);
                          $72.alpha = readUi8($bytes, $stream);
                        } else {
                          var $73 = $71.color = {};
                          $73.red = readUi8($bytes, $stream);
                          $73.green = readUi8($bytes, $stream);
                          $73.blue = readUi8($bytes, $stream);
                          $73.alpha = 255;
                        }
                        if (isMorph) {
                          $71.ratioMorph = readUi8($bytes, $stream);
                          var $74 = $71.colorMorph = {};
                          $74.red = readUi8($bytes, $stream);
                          $74.green = readUi8($bytes, $stream);
                          $74.blue = readUi8($bytes, $stream);
                          $74.alpha = readUi8($bytes, $stream);
                        }
                        $69.push($71);
                      }
                      if (type === 19) {
                        $63.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $63.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $63.bitmapId = readUi16($bytes, $stream);
                      var $75 = $63.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.a = readFb($bytes, $stream, bits);
                        $75.d = readFb($bytes, $stream, bits);
                      } else {
                        $75.a = 1;
                        $75.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $75.b = readFb($bytes, $stream, bits);
                        $75.c = readFb($bytes, $stream, bits);
                      } else {
                        $75.b = 0;
                        $75.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $75.tx = e / 20;
                      $75.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $76 = $63.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.a = readFb($bytes, $stream, bits);
                          $76.d = readFb($bytes, $stream, bits);
                        } else {
                          $76.a = 1;
                          $76.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $76.b = readFb($bytes, $stream, bits);
                          $76.c = readFb($bytes, $stream, bits);
                        } else {
                          $76.b = 0;
                          $76.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $76.tx = e / 20;
                        $76.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $63.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $77 = $62.color = {};
                    $77.red = readUi8($bytes, $stream);
                    $77.green = readUi8($bytes, $stream);
                    $77.blue = readUi8($bytes, $stream);
                    $77.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $78 = $62.colorMorph = {};
                      $78.red = readUi8($bytes, $stream);
                      $78.green = readUi8($bytes, $stream);
                      $78.blue = readUi8($bytes, $stream);
                      $78.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $79 = $62.color = {};
                    $79.red = readUi8($bytes, $stream);
                    $79.green = readUi8($bytes, $stream);
                    $79.blue = readUi8($bytes, $stream);
                    $79.alpha = readUi8($bytes, $stream);
                  } else {
                    var $80 = $62.color = {};
                    $80.red = readUi8($bytes, $stream);
                    $80.green = readUi8($bytes, $stream);
                    $80.blue = readUi8($bytes, $stream);
                    $80.alpha = 255;
                  }
                  if (isMorph) {
                    var $81 = $62.colorMorph = {};
                    $81.red = readUi8($bytes, $stream);
                    $81.green = readUi8($bytes, $stream);
                    $81.blue = readUi8($bytes, $stream);
                    $81.alpha = readUi8($bytes, $stream);
                  }
                }
                $60.push($62);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $42.push($43);
        } while (!eos);
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $82 = $.recordsMorph = [];
        do {
          var $83 = {};
          var type = $83.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $83.eos = !(type || flags);
          if (type) {
            var isStraight = $83.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $83.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $83.deltaX = readSb($bytes, $stream, bits);
                $83.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $83.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $83.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $83.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $83.controlDeltaX = readSb($bytes, $stream, bits);
              $83.controlDeltaY = readSb($bytes, $stream, bits);
              $83.anchorDeltaX = readSb($bytes, $stream, bits);
              $83.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $83.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $83.hasNewStyles = 0;
            }
            var hasLineStyle = $83.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $83.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $83.hasFillStyle0 = flags >> 1 & 1;
            var move = $83.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $83.moveX = readSb($bytes, $stream, bits);
              $83.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $83.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $83.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $83.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $84 = $83.fillStyles = [];
              var $85 = count;
              while ($85--) {
                var $86 = {};
                var type = $86.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $87 = $86.color = {};
                    $87.red = readUi8($bytes, $stream);
                    $87.green = readUi8($bytes, $stream);
                    $87.blue = readUi8($bytes, $stream);
                    $87.alpha = readUi8($bytes, $stream);
                  } else {
                    var $88 = $86.color = {};
                    $88.red = readUi8($bytes, $stream);
                    $88.green = readUi8($bytes, $stream);
                    $88.blue = readUi8($bytes, $stream);
                    $88.alpha = 255;
                  }
                  if (isMorph) {
                    var $89 = $86.colorMorph = {};
                    $89.red = readUi8($bytes, $stream);
                    $89.green = readUi8($bytes, $stream);
                    $89.blue = readUi8($bytes, $stream);
                    $89.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $90 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.a = readFb($bytes, $stream, bits);
                    $90.d = readFb($bytes, $stream, bits);
                  } else {
                    $90.a = 1;
                    $90.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $90.b = readFb($bytes, $stream, bits);
                    $90.c = readFb($bytes, $stream, bits);
                  } else {
                    $90.b = 0;
                    $90.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $90.tx = e / 20;
                  $90.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $91 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.a = readFb($bytes, $stream, bits);
                      $91.d = readFb($bytes, $stream, bits);
                    } else {
                      $91.a = 1;
                      $91.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $91.b = readFb($bytes, $stream, bits);
                      $91.c = readFb($bytes, $stream, bits);
                    } else {
                      $91.b = 0;
                      $91.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $91.tx = e / 20;
                    $91.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $86.spreadMode = readUb($bytes, $stream, 2);
                    $86.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $86.count = readUb($bytes, $stream, 4);
                  var $92 = $86.records = [];
                  var $93 = count;
                  while ($93--) {
                    var $94 = {};
                    $94.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $95 = $94.color = {};
                      $95.red = readUi8($bytes, $stream);
                      $95.green = readUi8($bytes, $stream);
                      $95.blue = readUi8($bytes, $stream);
                      $95.alpha = readUi8($bytes, $stream);
                    } else {
                      var $96 = $94.color = {};
                      $96.red = readUi8($bytes, $stream);
                      $96.green = readUi8($bytes, $stream);
                      $96.blue = readUi8($bytes, $stream);
                      $96.alpha = 255;
                    }
                    if (isMorph) {
                      $94.ratioMorph = readUi8($bytes, $stream);
                      var $97 = $94.colorMorph = {};
                      $97.red = readUi8($bytes, $stream);
                      $97.green = readUi8($bytes, $stream);
                      $97.blue = readUi8($bytes, $stream);
                      $97.alpha = readUi8($bytes, $stream);
                    }
                    $92.push($94);
                  }
                  if (type === 19) {
                    $86.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $86.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $86.bitmapId = readUi16($bytes, $stream);
                  var $98 = $86.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.a = readFb($bytes, $stream, bits);
                    $98.d = readFb($bytes, $stream, bits);
                  } else {
                    $98.a = 1;
                    $98.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $98.b = readFb($bytes, $stream, bits);
                    $98.c = readFb($bytes, $stream, bits);
                  } else {
                    $98.b = 0;
                    $98.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $98.tx = e / 20;
                  $98.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $99 = $86.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.a = readFb($bytes, $stream, bits);
                      $99.d = readFb($bytes, $stream, bits);
                    } else {
                      $99.a = 1;
                      $99.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $99.b = readFb($bytes, $stream, bits);
                      $99.c = readFb($bytes, $stream, bits);
                    } else {
                      $99.b = 0;
                      $99.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $99.tx = e / 20;
                    $99.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $86.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $84.push($86);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $100 = $83.lineStyles = [];
              var $101 = count;
              while ($101--) {
                var $102 = {};
                $102.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $102.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $102.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $102.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $102.hasFill = readUb($bytes, $stream, 1);
                  $102.noHscale = readUb($bytes, $stream, 1);
                  $102.noVscale = readUb($bytes, $stream, 1);
                  $102.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $102.noClose = readUb($bytes, $stream, 1);
                  $102.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $102.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $103 = $102.fillStyle = {};
                    var type = $103.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $104 = $103.color = {};
                        $104.red = readUi8($bytes, $stream);
                        $104.green = readUi8($bytes, $stream);
                        $104.blue = readUi8($bytes, $stream);
                        $104.alpha = readUi8($bytes, $stream);
                      } else {
                        var $105 = $103.color = {};
                        $105.red = readUi8($bytes, $stream);
                        $105.green = readUi8($bytes, $stream);
                        $105.blue = readUi8($bytes, $stream);
                        $105.alpha = 255;
                      }
                      if (isMorph) {
                        var $106 = $103.colorMorph = {};
                        $106.red = readUi8($bytes, $stream);
                        $106.green = readUi8($bytes, $stream);
                        $106.blue = readUi8($bytes, $stream);
                        $106.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $107 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.a = readFb($bytes, $stream, bits);
                        $107.d = readFb($bytes, $stream, bits);
                      } else {
                        $107.a = 1;
                        $107.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $107.b = readFb($bytes, $stream, bits);
                        $107.c = readFb($bytes, $stream, bits);
                      } else {
                        $107.b = 0;
                        $107.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $107.tx = e / 20;
                      $107.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $108 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.a = readFb($bytes, $stream, bits);
                          $108.d = readFb($bytes, $stream, bits);
                        } else {
                          $108.a = 1;
                          $108.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $108.b = readFb($bytes, $stream, bits);
                          $108.c = readFb($bytes, $stream, bits);
                        } else {
                          $108.b = 0;
                          $108.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $108.tx = e / 20;
                        $108.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $103.spreadMode = readUb($bytes, $stream, 2);
                        $103.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $103.count = readUb($bytes, $stream, 4);
                      var $109 = $103.records = [];
                      var $110 = count;
                      while ($110--) {
                        var $111 = {};
                        $111.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $112 = $111.color = {};
                          $112.red = readUi8($bytes, $stream);
                          $112.green = readUi8($bytes, $stream);
                          $112.blue = readUi8($bytes, $stream);
                          $112.alpha = readUi8($bytes, $stream);
                        } else {
                          var $113 = $111.color = {};
                          $113.red = readUi8($bytes, $stream);
                          $113.green = readUi8($bytes, $stream);
                          $113.blue = readUi8($bytes, $stream);
                          $113.alpha = 255;
                        }
                        if (isMorph) {
                          $111.ratioMorph = readUi8($bytes, $stream);
                          var $114 = $111.colorMorph = {};
                          $114.red = readUi8($bytes, $stream);
                          $114.green = readUi8($bytes, $stream);
                          $114.blue = readUi8($bytes, $stream);
                          $114.alpha = readUi8($bytes, $stream);
                        }
                        $109.push($111);
                      }
                      if (type === 19) {
                        $103.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $103.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $103.bitmapId = readUi16($bytes, $stream);
                      var $115 = $103.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.a = readFb($bytes, $stream, bits);
                        $115.d = readFb($bytes, $stream, bits);
                      } else {
                        $115.a = 1;
                        $115.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $115.b = readFb($bytes, $stream, bits);
                        $115.c = readFb($bytes, $stream, bits);
                      } else {
                        $115.b = 0;
                        $115.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $115.tx = e / 20;
                      $115.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $116 = $103.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.a = readFb($bytes, $stream, bits);
                          $116.d = readFb($bytes, $stream, bits);
                        } else {
                          $116.a = 1;
                          $116.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $116.b = readFb($bytes, $stream, bits);
                          $116.c = readFb($bytes, $stream, bits);
                        } else {
                          $116.b = 0;
                          $116.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $116.tx = e / 20;
                        $116.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $103.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $117 = $102.color = {};
                    $117.red = readUi8($bytes, $stream);
                    $117.green = readUi8($bytes, $stream);
                    $117.blue = readUi8($bytes, $stream);
                    $117.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $118 = $102.colorMorph = {};
                      $118.red = readUi8($bytes, $stream);
                      $118.green = readUi8($bytes, $stream);
                      $118.blue = readUi8($bytes, $stream);
                      $118.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $119 = $102.color = {};
                    $119.red = readUi8($bytes, $stream);
                    $119.green = readUi8($bytes, $stream);
                    $119.blue = readUi8($bytes, $stream);
                    $119.alpha = readUi8($bytes, $stream);
                  } else {
                    var $120 = $102.color = {};
                    $120.red = readUi8($bytes, $stream);
                    $120.green = readUi8($bytes, $stream);
                    $120.blue = readUi8($bytes, $stream);
                    $120.alpha = 255;
                  }
                  if (isMorph) {
                    var $121 = $102.colorMorph = {};
                    $121.red = readUi8($bytes, $stream);
                    $121.green = readUi8($bytes, $stream);
                    $121.blue = readUi8($bytes, $stream);
                    $121.alpha = readUi8($bytes, $stream);
                  }
                }
                $100.push($102);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $82.push($83);
        } while (!eos);
      } else {
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $122 = $.fillStyles = [];
        var $123 = count;
        while ($123--) {
          var $124 = {};
          var type = $124.type = readUi8($bytes, $stream);
          switch (type) {
          case 0:
            if (tagCode > 22 || isMorph) {
              var $125 = $124.color = {};
              $125.red = readUi8($bytes, $stream);
              $125.green = readUi8($bytes, $stream);
              $125.blue = readUi8($bytes, $stream);
              $125.alpha = readUi8($bytes, $stream);
            } else {
              var $126 = $124.color = {};
              $126.red = readUi8($bytes, $stream);
              $126.green = readUi8($bytes, $stream);
              $126.blue = readUi8($bytes, $stream);
              $126.alpha = 255;
            }
            if (isMorph) {
              var $127 = $124.colorMorph = {};
              $127.red = readUi8($bytes, $stream);
              $127.green = readUi8($bytes, $stream);
              $127.blue = readUi8($bytes, $stream);
              $127.alpha = readUi8($bytes, $stream);
            }
            break;
          case 16:
          case 18:
          case 19:
            var $128 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $128.a = readFb($bytes, $stream, bits);
              $128.d = readFb($bytes, $stream, bits);
            } else {
              $128.a = 1;
              $128.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $128.b = readFb($bytes, $stream, bits);
              $128.c = readFb($bytes, $stream, bits);
            } else {
              $128.b = 0;
              $128.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $128.tx = e / 20;
            $128.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $129 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $129.a = readFb($bytes, $stream, bits);
                $129.d = readFb($bytes, $stream, bits);
              } else {
                $129.a = 1;
                $129.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $129.b = readFb($bytes, $stream, bits);
                $129.c = readFb($bytes, $stream, bits);
              } else {
                $129.b = 0;
                $129.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $129.tx = e / 20;
              $129.ty = f / 20;
              align($bytes, $stream);
            }
            if (tagCode === 83) {
              $124.spreadMode = readUb($bytes, $stream, 2);
              $124.interpolationMode = readUb($bytes, $stream, 2);
            } else {
              var pad = readUb($bytes, $stream, 4);
            }
            var count = $124.count = readUb($bytes, $stream, 4);
            var $130 = $124.records = [];
            var $131 = count;
            while ($131--) {
              var $132 = {};
              $132.ratio = readUi8($bytes, $stream);
              if (tagCode > 22) {
                var $133 = $132.color = {};
                $133.red = readUi8($bytes, $stream);
                $133.green = readUi8($bytes, $stream);
                $133.blue = readUi8($bytes, $stream);
                $133.alpha = readUi8($bytes, $stream);
              } else {
                var $134 = $132.color = {};
                $134.red = readUi8($bytes, $stream);
                $134.green = readUi8($bytes, $stream);
                $134.blue = readUi8($bytes, $stream);
                $134.alpha = 255;
              }
              if (isMorph) {
                $132.ratioMorph = readUi8($bytes, $stream);
                var $135 = $132.colorMorph = {};
                $135.red = readUi8($bytes, $stream);
                $135.green = readUi8($bytes, $stream);
                $135.blue = readUi8($bytes, $stream);
                $135.alpha = readUi8($bytes, $stream);
              }
              $130.push($132);
            }
            if (type === 19) {
              $124.focalPoint = readFixed8($bytes, $stream);
              if (isMorph) {
                $124.focalPointMorph = readFixed8($bytes, $stream);
              }
            }
            break;
          case 64:
          case 65:
          case 66:
          case 67:
            $124.bitmapId = readUi16($bytes, $stream);
            var $136 = $124.matrix = {};
            align($bytes, $stream);
            var hasScale = readUb($bytes, $stream, 1);
            if (hasScale) {
              var bits = readUb($bytes, $stream, 5);
              $136.a = readFb($bytes, $stream, bits);
              $136.d = readFb($bytes, $stream, bits);
            } else {
              $136.a = 1;
              $136.d = 1;
            }
            var hasRotate = readUb($bytes, $stream, 1);
            if (hasRotate) {
              var bits = readUb($bytes, $stream, 5);
              $136.b = readFb($bytes, $stream, bits);
              $136.c = readFb($bytes, $stream, bits);
            } else {
              $136.b = 0;
              $136.c = 0;
            }
            var bits = readUb($bytes, $stream, 5);
            var e = readSb($bytes, $stream, bits);
            var f = readSb($bytes, $stream, bits);
            $136.tx = e / 20;
            $136.ty = f / 20;
            align($bytes, $stream);
            if (isMorph) {
              var $137 = $124.matrixMorph = {};
              align($bytes, $stream);
              var hasScale = readUb($bytes, $stream, 1);
              if (hasScale) {
                var bits = readUb($bytes, $stream, 5);
                $137.a = readFb($bytes, $stream, bits);
                $137.d = readFb($bytes, $stream, bits);
              } else {
                $137.a = 1;
                $137.d = 1;
              }
              var hasRotate = readUb($bytes, $stream, 1);
              if (hasRotate) {
                var bits = readUb($bytes, $stream, 5);
                $137.b = readFb($bytes, $stream, bits);
                $137.c = readFb($bytes, $stream, bits);
              } else {
                $137.b = 0;
                $137.c = 0;
              }
              var bits = readUb($bytes, $stream, 5);
              var e = readSb($bytes, $stream, bits);
              var f = readSb($bytes, $stream, bits);
              $137.tx = e / 20;
              $137.ty = f / 20;
              align($bytes, $stream);
            }
            $124.condition = type === 64 || type === 67;
            break;
          default:
          }
          $122.push($124);
        }
        var tmp = readUi8($bytes, $stream);
        if (tagCode > 2 && tmp === 255) {
          var count = readUi16($bytes, $stream);
        } else {
          var count = tmp;
        }
        var $138 = $.lineStyles = [];
        var $139 = count;
        while ($139--) {
          var $140 = {};
          $140.width = readUi16($bytes, $stream);
          if (isMorph) {
            $140.widthMorph = readUi16($bytes, $stream);
          }
          if (hasStrokes) {
            align($bytes, $stream);
            $140.startCapStyle = readUb($bytes, $stream, 2);
            var joinStyle = $140.joinStyle = readUb($bytes, $stream, 2);
            var hasFill = $140.hasFill = readUb($bytes, $stream, 1);
            $140.noHscale = readUb($bytes, $stream, 1);
            $140.noVscale = readUb($bytes, $stream, 1);
            $140.pixelHinting = readUb($bytes, $stream, 1);
            var reserved = readUb($bytes, $stream, 5);
            $140.noClose = readUb($bytes, $stream, 1);
            $140.endCapStyle = readUb($bytes, $stream, 2);
            if (joinStyle === 2) {
              $140.miterLimitFactor = readFixed8($bytes, $stream);
            }
            if (hasFill) {
              var $141 = $140.fillStyle = {};
              var type = $141.type = readUi8($bytes, $stream);
              switch (type) {
              case 0:
                if (tagCode > 22 || isMorph) {
                  var $142 = $141.color = {};
                  $142.red = readUi8($bytes, $stream);
                  $142.green = readUi8($bytes, $stream);
                  $142.blue = readUi8($bytes, $stream);
                  $142.alpha = readUi8($bytes, $stream);
                } else {
                  var $143 = $141.color = {};
                  $143.red = readUi8($bytes, $stream);
                  $143.green = readUi8($bytes, $stream);
                  $143.blue = readUi8($bytes, $stream);
                  $143.alpha = 255;
                }
                if (isMorph) {
                  var $144 = $141.colorMorph = {};
                  $144.red = readUi8($bytes, $stream);
                  $144.green = readUi8($bytes, $stream);
                  $144.blue = readUi8($bytes, $stream);
                  $144.alpha = readUi8($bytes, $stream);
                }
                break;
              case 16:
              case 18:
              case 19:
                var $145 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.a = readFb($bytes, $stream, bits);
                  $145.d = readFb($bytes, $stream, bits);
                } else {
                  $145.a = 1;
                  $145.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $145.b = readFb($bytes, $stream, bits);
                  $145.c = readFb($bytes, $stream, bits);
                } else {
                  $145.b = 0;
                  $145.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $145.tx = e / 20;
                $145.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $146 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.a = readFb($bytes, $stream, bits);
                    $146.d = readFb($bytes, $stream, bits);
                  } else {
                    $146.a = 1;
                    $146.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $146.b = readFb($bytes, $stream, bits);
                    $146.c = readFb($bytes, $stream, bits);
                  } else {
                    $146.b = 0;
                    $146.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $146.tx = e / 20;
                  $146.ty = f / 20;
                  align($bytes, $stream);
                }
                if (tagCode === 83) {
                  $141.spreadMode = readUb($bytes, $stream, 2);
                  $141.interpolationMode = readUb($bytes, $stream, 2);
                } else {
                  var pad = readUb($bytes, $stream, 4);
                }
                var count = $141.count = readUb($bytes, $stream, 4);
                var $147 = $141.records = [];
                var $148 = count;
                while ($148--) {
                  var $149 = {};
                  $149.ratio = readUi8($bytes, $stream);
                  if (tagCode > 22) {
                    var $150 = $149.color = {};
                    $150.red = readUi8($bytes, $stream);
                    $150.green = readUi8($bytes, $stream);
                    $150.blue = readUi8($bytes, $stream);
                    $150.alpha = readUi8($bytes, $stream);
                  } else {
                    var $151 = $149.color = {};
                    $151.red = readUi8($bytes, $stream);
                    $151.green = readUi8($bytes, $stream);
                    $151.blue = readUi8($bytes, $stream);
                    $151.alpha = 255;
                  }
                  if (isMorph) {
                    $149.ratioMorph = readUi8($bytes, $stream);
                    var $152 = $149.colorMorph = {};
                    $152.red = readUi8($bytes, $stream);
                    $152.green = readUi8($bytes, $stream);
                    $152.blue = readUi8($bytes, $stream);
                    $152.alpha = readUi8($bytes, $stream);
                  }
                  $147.push($149);
                }
                if (type === 19) {
                  $141.focalPoint = readFixed8($bytes, $stream);
                  if (isMorph) {
                    $141.focalPointMorph = readFixed8($bytes, $stream);
                  }
                }
                break;
              case 64:
              case 65:
              case 66:
              case 67:
                $141.bitmapId = readUi16($bytes, $stream);
                var $153 = $141.matrix = {};
                align($bytes, $stream);
                var hasScale = readUb($bytes, $stream, 1);
                if (hasScale) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.a = readFb($bytes, $stream, bits);
                  $153.d = readFb($bytes, $stream, bits);
                } else {
                  $153.a = 1;
                  $153.d = 1;
                }
                var hasRotate = readUb($bytes, $stream, 1);
                if (hasRotate) {
                  var bits = readUb($bytes, $stream, 5);
                  $153.b = readFb($bytes, $stream, bits);
                  $153.c = readFb($bytes, $stream, bits);
                } else {
                  $153.b = 0;
                  $153.c = 0;
                }
                var bits = readUb($bytes, $stream, 5);
                var e = readSb($bytes, $stream, bits);
                var f = readSb($bytes, $stream, bits);
                $153.tx = e / 20;
                $153.ty = f / 20;
                align($bytes, $stream);
                if (isMorph) {
                  var $154 = $141.matrixMorph = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.a = readFb($bytes, $stream, bits);
                    $154.d = readFb($bytes, $stream, bits);
                  } else {
                    $154.a = 1;
                    $154.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $154.b = readFb($bytes, $stream, bits);
                    $154.c = readFb($bytes, $stream, bits);
                  } else {
                    $154.b = 0;
                    $154.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $154.tx = e / 20;
                  $154.ty = f / 20;
                  align($bytes, $stream);
                }
                $141.condition = type === 64 || type === 67;
                break;
              default:
              }
            } else {
              var $155 = $140.color = {};
              $155.red = readUi8($bytes, $stream);
              $155.green = readUi8($bytes, $stream);
              $155.blue = readUi8($bytes, $stream);
              $155.alpha = readUi8($bytes, $stream);
              if (isMorph) {
                var $156 = $140.colorMorph = {};
                $156.red = readUi8($bytes, $stream);
                $156.green = readUi8($bytes, $stream);
                $156.blue = readUi8($bytes, $stream);
                $156.alpha = readUi8($bytes, $stream);
              }
            }
          } else {
            if (tagCode > 22) {
              var $157 = $140.color = {};
              $157.red = readUi8($bytes, $stream);
              $157.green = readUi8($bytes, $stream);
              $157.blue = readUi8($bytes, $stream);
              $157.alpha = readUi8($bytes, $stream);
            } else {
              var $158 = $140.color = {};
              $158.red = readUi8($bytes, $stream);
              $158.green = readUi8($bytes, $stream);
              $158.blue = readUi8($bytes, $stream);
              $158.alpha = 255;
            }
            if (isMorph) {
              var $159 = $140.colorMorph = {};
              $159.red = readUi8($bytes, $stream);
              $159.green = readUi8($bytes, $stream);
              $159.blue = readUi8($bytes, $stream);
              $159.alpha = readUi8($bytes, $stream);
            }
          }
          $138.push($140);
        }
        align($bytes, $stream);
        var fillBits = readUb($bytes, $stream, 4);
        var lineBits = readUb($bytes, $stream, 4);
        var $160 = $.records = [];
        do {
          var $161 = {};
          var type = $161.type = readUb($bytes, $stream, 1);
          var flags = readUb($bytes, $stream, 5);
          var eos = $161.eos = !(type || flags);
          if (type) {
            var isStraight = $161.isStraight = flags >> 4;
            var tmp = flags & 15;
            var bits = tmp + 2;
            if (isStraight) {
              var isGeneral = $161.isGeneral = readUb($bytes, $stream, 1);
              if (isGeneral) {
                $161.deltaX = readSb($bytes, $stream, bits);
                $161.deltaY = readSb($bytes, $stream, bits);
              } else {
                var isVertical = $161.isVertical = readUb($bytes, $stream, 1);
                if (isVertical) {
                  $161.deltaY = readSb($bytes, $stream, bits);
                } else {
                  $161.deltaX = readSb($bytes, $stream, bits);
                }
              }
            } else {
              $161.controlDeltaX = readSb($bytes, $stream, bits);
              $161.controlDeltaY = readSb($bytes, $stream, bits);
              $161.anchorDeltaX = readSb($bytes, $stream, bits);
              $161.anchorDeltaY = readSb($bytes, $stream, bits);
            }
          } else {
            if (tagCode > 2) {
              var hasNewStyles = $161.hasNewStyles = flags >> 4;
            } else {
              var hasNewStyles = $161.hasNewStyles = 0;
            }
            var hasLineStyle = $161.hasLineStyle = flags >> 3 & 1;
            var hasFillStyle1 = $161.hasFillStyle1 = flags >> 2 & 1;
            var hasFillStyle0 = $161.hasFillStyle0 = flags >> 1 & 1;
            var move = $161.move = flags & 1;
            if (move) {
              var bits = readUb($bytes, $stream, 5);
              $161.moveX = readSb($bytes, $stream, bits);
              $161.moveY = readSb($bytes, $stream, bits);
            }
            if (hasFillStyle0) {
              $161.fillStyle0 = readUb($bytes, $stream, fillBits);
            }
            if (hasFillStyle1) {
              $161.fillStyle1 = readUb($bytes, $stream, fillBits);
            }
            if (hasLineStyle) {
              $161.lineStyle = readUb($bytes, $stream, lineBits);
            }
            if (hasNewStyles) {
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $162 = $161.fillStyles = [];
              var $163 = count;
              while ($163--) {
                var $164 = {};
                var type = $164.type = readUi8($bytes, $stream);
                switch (type) {
                case 0:
                  if (tagCode > 22 || isMorph) {
                    var $165 = $164.color = {};
                    $165.red = readUi8($bytes, $stream);
                    $165.green = readUi8($bytes, $stream);
                    $165.blue = readUi8($bytes, $stream);
                    $165.alpha = readUi8($bytes, $stream);
                  } else {
                    var $166 = $164.color = {};
                    $166.red = readUi8($bytes, $stream);
                    $166.green = readUi8($bytes, $stream);
                    $166.blue = readUi8($bytes, $stream);
                    $166.alpha = 255;
                  }
                  if (isMorph) {
                    var $167 = $164.colorMorph = {};
                    $167.red = readUi8($bytes, $stream);
                    $167.green = readUi8($bytes, $stream);
                    $167.blue = readUi8($bytes, $stream);
                    $167.alpha = readUi8($bytes, $stream);
                  }
                  break;
                case 16:
                case 18:
                case 19:
                  var $168 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.a = readFb($bytes, $stream, bits);
                    $168.d = readFb($bytes, $stream, bits);
                  } else {
                    $168.a = 1;
                    $168.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $168.b = readFb($bytes, $stream, bits);
                    $168.c = readFb($bytes, $stream, bits);
                  } else {
                    $168.b = 0;
                    $168.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $168.tx = e / 20;
                  $168.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $169 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.a = readFb($bytes, $stream, bits);
                      $169.d = readFb($bytes, $stream, bits);
                    } else {
                      $169.a = 1;
                      $169.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $169.b = readFb($bytes, $stream, bits);
                      $169.c = readFb($bytes, $stream, bits);
                    } else {
                      $169.b = 0;
                      $169.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $169.tx = e / 20;
                    $169.ty = f / 20;
                    align($bytes, $stream);
                  }
                  if (tagCode === 83) {
                    $164.spreadMode = readUb($bytes, $stream, 2);
                    $164.interpolationMode = readUb($bytes, $stream, 2);
                  } else {
                    var pad = readUb($bytes, $stream, 4);
                  }
                  var count = $164.count = readUb($bytes, $stream, 4);
                  var $170 = $164.records = [];
                  var $171 = count;
                  while ($171--) {
                    var $172 = {};
                    $172.ratio = readUi8($bytes, $stream);
                    if (tagCode > 22) {
                      var $173 = $172.color = {};
                      $173.red = readUi8($bytes, $stream);
                      $173.green = readUi8($bytes, $stream);
                      $173.blue = readUi8($bytes, $stream);
                      $173.alpha = readUi8($bytes, $stream);
                    } else {
                      var $174 = $172.color = {};
                      $174.red = readUi8($bytes, $stream);
                      $174.green = readUi8($bytes, $stream);
                      $174.blue = readUi8($bytes, $stream);
                      $174.alpha = 255;
                    }
                    if (isMorph) {
                      $172.ratioMorph = readUi8($bytes, $stream);
                      var $175 = $172.colorMorph = {};
                      $175.red = readUi8($bytes, $stream);
                      $175.green = readUi8($bytes, $stream);
                      $175.blue = readUi8($bytes, $stream);
                      $175.alpha = readUi8($bytes, $stream);
                    }
                    $170.push($172);
                  }
                  if (type === 19) {
                    $164.focalPoint = readFixed8($bytes, $stream);
                    if (isMorph) {
                      $164.focalPointMorph = readFixed8($bytes, $stream);
                    }
                  }
                  break;
                case 64:
                case 65:
                case 66:
                case 67:
                  $164.bitmapId = readUi16($bytes, $stream);
                  var $176 = $164.matrix = {};
                  align($bytes, $stream);
                  var hasScale = readUb($bytes, $stream, 1);
                  if (hasScale) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.a = readFb($bytes, $stream, bits);
                    $176.d = readFb($bytes, $stream, bits);
                  } else {
                    $176.a = 1;
                    $176.d = 1;
                  }
                  var hasRotate = readUb($bytes, $stream, 1);
                  if (hasRotate) {
                    var bits = readUb($bytes, $stream, 5);
                    $176.b = readFb($bytes, $stream, bits);
                    $176.c = readFb($bytes, $stream, bits);
                  } else {
                    $176.b = 0;
                    $176.c = 0;
                  }
                  var bits = readUb($bytes, $stream, 5);
                  var e = readSb($bytes, $stream, bits);
                  var f = readSb($bytes, $stream, bits);
                  $176.tx = e / 20;
                  $176.ty = f / 20;
                  align($bytes, $stream);
                  if (isMorph) {
                    var $177 = $164.matrixMorph = {};
                    align($bytes, $stream);
                    var hasScale = readUb($bytes, $stream, 1);
                    if (hasScale) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.a = readFb($bytes, $stream, bits);
                      $177.d = readFb($bytes, $stream, bits);
                    } else {
                      $177.a = 1;
                      $177.d = 1;
                    }
                    var hasRotate = readUb($bytes, $stream, 1);
                    if (hasRotate) {
                      var bits = readUb($bytes, $stream, 5);
                      $177.b = readFb($bytes, $stream, bits);
                      $177.c = readFb($bytes, $stream, bits);
                    } else {
                      $177.b = 0;
                      $177.c = 0;
                    }
                    var bits = readUb($bytes, $stream, 5);
                    var e = readSb($bytes, $stream, bits);
                    var f = readSb($bytes, $stream, bits);
                    $177.tx = e / 20;
                    $177.ty = f / 20;
                    align($bytes, $stream);
                  }
                  $164.condition = type === 64 || type === 67;
                  break;
                default:
                }
                $162.push($164);
              }
              var tmp = readUi8($bytes, $stream);
              if (tagCode > 2 && tmp === 255) {
                var count = readUi16($bytes, $stream);
              } else {
                var count = tmp;
              }
              var $178 = $161.lineStyles = [];
              var $179 = count;
              while ($179--) {
                var $180 = {};
                $180.width = readUi16($bytes, $stream);
                if (isMorph) {
                  $180.widthMorph = readUi16($bytes, $stream);
                }
                if (hasStrokes) {
                  align($bytes, $stream);
                  $180.startCapStyle = readUb($bytes, $stream, 2);
                  var joinStyle = $180.joinStyle = readUb($bytes, $stream, 2);
                  var hasFill = $180.hasFill = readUb($bytes, $stream, 1);
                  $180.noHscale = readUb($bytes, $stream, 1);
                  $180.noVscale = readUb($bytes, $stream, 1);
                  $180.pixelHinting = readUb($bytes, $stream, 1);
                  var reserved = readUb($bytes, $stream, 5);
                  $180.noClose = readUb($bytes, $stream, 1);
                  $180.endCapStyle = readUb($bytes, $stream, 2);
                  if (joinStyle === 2) {
                    $180.miterLimitFactor = readFixed8($bytes, $stream);
                  }
                  if (hasFill) {
                    var $181 = $180.fillStyle = {};
                    var type = $181.type = readUi8($bytes, $stream);
                    switch (type) {
                    case 0:
                      if (tagCode > 22 || isMorph) {
                        var $182 = $181.color = {};
                        $182.red = readUi8($bytes, $stream);
                        $182.green = readUi8($bytes, $stream);
                        $182.blue = readUi8($bytes, $stream);
                        $182.alpha = readUi8($bytes, $stream);
                      } else {
                        var $183 = $181.color = {};
                        $183.red = readUi8($bytes, $stream);
                        $183.green = readUi8($bytes, $stream);
                        $183.blue = readUi8($bytes, $stream);
                        $183.alpha = 255;
                      }
                      if (isMorph) {
                        var $184 = $181.colorMorph = {};
                        $184.red = readUi8($bytes, $stream);
                        $184.green = readUi8($bytes, $stream);
                        $184.blue = readUi8($bytes, $stream);
                        $184.alpha = readUi8($bytes, $stream);
                      }
                      break;
                    case 16:
                    case 18:
                    case 19:
                      var $185 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.a = readFb($bytes, $stream, bits);
                        $185.d = readFb($bytes, $stream, bits);
                      } else {
                        $185.a = 1;
                        $185.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $185.b = readFb($bytes, $stream, bits);
                        $185.c = readFb($bytes, $stream, bits);
                      } else {
                        $185.b = 0;
                        $185.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $185.tx = e / 20;
                      $185.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $186 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.a = readFb($bytes, $stream, bits);
                          $186.d = readFb($bytes, $stream, bits);
                        } else {
                          $186.a = 1;
                          $186.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $186.b = readFb($bytes, $stream, bits);
                          $186.c = readFb($bytes, $stream, bits);
                        } else {
                          $186.b = 0;
                          $186.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $186.tx = e / 20;
                        $186.ty = f / 20;
                        align($bytes, $stream);
                      }
                      if (tagCode === 83) {
                        $181.spreadMode = readUb($bytes, $stream, 2);
                        $181.interpolationMode = readUb($bytes, $stream, 2);
                      } else {
                        var pad = readUb($bytes, $stream, 4);
                      }
                      var count = $181.count = readUb($bytes, $stream, 4);
                      var $187 = $181.records = [];
                      var $188 = count;
                      while ($188--) {
                        var $189 = {};
                        $189.ratio = readUi8($bytes, $stream);
                        if (tagCode > 22) {
                          var $190 = $189.color = {};
                          $190.red = readUi8($bytes, $stream);
                          $190.green = readUi8($bytes, $stream);
                          $190.blue = readUi8($bytes, $stream);
                          $190.alpha = readUi8($bytes, $stream);
                        } else {
                          var $191 = $189.color = {};
                          $191.red = readUi8($bytes, $stream);
                          $191.green = readUi8($bytes, $stream);
                          $191.blue = readUi8($bytes, $stream);
                          $191.alpha = 255;
                        }
                        if (isMorph) {
                          $189.ratioMorph = readUi8($bytes, $stream);
                          var $192 = $189.colorMorph = {};
                          $192.red = readUi8($bytes, $stream);
                          $192.green = readUi8($bytes, $stream);
                          $192.blue = readUi8($bytes, $stream);
                          $192.alpha = readUi8($bytes, $stream);
                        }
                        $187.push($189);
                      }
                      if (type === 19) {
                        $181.focalPoint = readFixed8($bytes, $stream);
                        if (isMorph) {
                          $181.focalPointMorph = readFixed8($bytes, $stream);
                        }
                      }
                      break;
                    case 64:
                    case 65:
                    case 66:
                    case 67:
                      $181.bitmapId = readUi16($bytes, $stream);
                      var $193 = $181.matrix = {};
                      align($bytes, $stream);
                      var hasScale = readUb($bytes, $stream, 1);
                      if (hasScale) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.a = readFb($bytes, $stream, bits);
                        $193.d = readFb($bytes, $stream, bits);
                      } else {
                        $193.a = 1;
                        $193.d = 1;
                      }
                      var hasRotate = readUb($bytes, $stream, 1);
                      if (hasRotate) {
                        var bits = readUb($bytes, $stream, 5);
                        $193.b = readFb($bytes, $stream, bits);
                        $193.c = readFb($bytes, $stream, bits);
                      } else {
                        $193.b = 0;
                        $193.c = 0;
                      }
                      var bits = readUb($bytes, $stream, 5);
                      var e = readSb($bytes, $stream, bits);
                      var f = readSb($bytes, $stream, bits);
                      $193.tx = e / 20;
                      $193.ty = f / 20;
                      align($bytes, $stream);
                      if (isMorph) {
                        var $194 = $181.matrixMorph = {};
                        align($bytes, $stream);
                        var hasScale = readUb($bytes, $stream, 1);
                        if (hasScale) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.a = readFb($bytes, $stream, bits);
                          $194.d = readFb($bytes, $stream, bits);
                        } else {
                          $194.a = 1;
                          $194.d = 1;
                        }
                        var hasRotate = readUb($bytes, $stream, 1);
                        if (hasRotate) {
                          var bits = readUb($bytes, $stream, 5);
                          $194.b = readFb($bytes, $stream, bits);
                          $194.c = readFb($bytes, $stream, bits);
                        } else {
                          $194.b = 0;
                          $194.c = 0;
                        }
                        var bits = readUb($bytes, $stream, 5);
                        var e = readSb($bytes, $stream, bits);
                        var f = readSb($bytes, $stream, bits);
                        $194.tx = e / 20;
                        $194.ty = f / 20;
                        align($bytes, $stream);
                      }
                      $181.condition = type === 64 || type === 67;
                      break;
                    default:
                    }
                  } else {
                    var $195 = $180.color = {};
                    $195.red = readUi8($bytes, $stream);
                    $195.green = readUi8($bytes, $stream);
                    $195.blue = readUi8($bytes, $stream);
                    $195.alpha = readUi8($bytes, $stream);
                    if (isMorph) {
                      var $196 = $180.colorMorph = {};
                      $196.red = readUi8($bytes, $stream);
                      $196.green = readUi8($bytes, $stream);
                      $196.blue = readUi8($bytes, $stream);
                      $196.alpha = readUi8($bytes, $stream);
                    }
                  }
                } else {
                  if (tagCode > 22) {
                    var $197 = $180.color = {};
                    $197.red = readUi8($bytes, $stream);
                    $197.green = readUi8($bytes, $stream);
                    $197.blue = readUi8($bytes, $stream);
                    $197.alpha = readUi8($bytes, $stream);
                  } else {
                    var $198 = $180.color = {};
                    $198.red = readUi8($bytes, $stream);
                    $198.green = readUi8($bytes, $stream);
                    $198.blue = readUi8($bytes, $stream);
                    $198.alpha = 255;
                  }
                  if (isMorph) {
                    var $199 = $180.colorMorph = {};
                    $199.red = readUi8($bytes, $stream);
                    $199.green = readUi8($bytes, $stream);
                    $199.blue = readUi8($bytes, $stream);
                    $199.alpha = readUi8($bytes, $stream);
                  }
                }
                $178.push($180);
              }
              align($bytes, $stream);
              var fillBits = readUb($bytes, $stream, 4);
              var lineBits = readUb($bytes, $stream, 4);
            }
          }
          $160.push($161);
        } while (!eos);
      }
      return $;
    },
    89: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      if (tagCode == 15) {
        $.soundId = readUi16($bytes, $stream);
      }
      if (tagCode == 89) {
        $.soundClassName = readString($bytes, $stream, 0);
      }
      var $0 = $.soundInfo = {};
      var reserved = readUb($bytes, $stream, 2);
      $0.stop = readUb($bytes, $stream, 1);
      $0.noMultiple = readUb($bytes, $stream, 1);
      var hasEnvelope = $0.hasEnvelope = readUb($bytes, $stream, 1);
      var hasLoops = $0.hasLoops = readUb($bytes, $stream, 1);
      var hasOutPoint = $0.hasOutPoint = readUb($bytes, $stream, 1);
      var hasInPoint = $0.hasInPoint = readUb($bytes, $stream, 1);
      if (hasInPoint) {
        $0.inPoint = readUi32($bytes, $stream);
      }
      if (hasOutPoint) {
        $0.outPoint = readUi32($bytes, $stream);
      }
      if (hasLoops) {
        $0.loopCount = readUi16($bytes, $stream);
      }
      if (hasEnvelope) {
        var envelopeCount = $0.envelopeCount = readUi8($bytes, $stream);
        var $1 = $0.envelopes = [];
        var $2 = envelopeCount;
        while ($2--) {
          var $3 = {};
          $3.pos44 = readUi32($bytes, $stream);
          $3.volumeLeft = readUi16($bytes, $stream);
          $3.volumeRight = readUi16($bytes, $stream);
          $1.push($3);
        }
      }
      return $;
    },
    90: function ($bytes, $stream, $, swfVersion, tagCode) {
      $ || ($ = {});
      $.id = readUi16($bytes, $stream);
      if (tagCode > 21) {
        var alphaDataOffset = readUi32($bytes, $stream);
        if (tagCode === 90) {
          $.deblock = readFixed8($bytes, $stream);
        }
        var imgData = $.imgData = readBinary($bytes, $stream, alphaDataOffset);
        $.alphaData = readBinary($bytes, $stream, 0);
      } else {
        var imgData = $.imgData = readBinary($bytes, $stream, 0);
      }
      switch (imgData[0] << 8 | imgData[1]) {
      case 65496:
      case 65497:
        $.mimeType = 'image/jpeg';
        break;
      case 35152:
        $.mimeType = 'image/png';
        break;
      case 18249:
        $.mimeType = 'image/gif';
        break;
      default:
        $.mimeType = 'application/octet-stream';
      }
      if (tagCode === 6) {
        $.incomplete = 1;
      }
      return $;
    }
  };
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
      var length = tagCodeAndLength & 63;
      if (length === 63) {
        stream.ensure(4);
        length = readUi32(bytes, stream);
      }
      stream.ensure(length);
      var substream = stream.substream(stream.pos, stream.pos += length);
      var subbytes = substream.bytes;
      var tag = {
          code: tagCode
        };
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
    if (e !== StreamNoDataError)
      throw e;
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
  this.state = {
    bitBuffer: 0,
    bitLength: 0,
    compression: {}
  };
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
      if (e !== InflateNoDataError)
        throw e;
    } finally {
      this.state.bitBuffer = stream.bitBuffer;
      this.state.bitLength = stream.bitLength;
    }
    buffer.removeHead(stream.pos);
    this.target.push(output.data.subarray(lastAvailable, output.available), progressInfo);
  }
};
function BodyParser(swfVersion, length, options) {
  this.swf = {
    swfVersion: swfVersion
  };
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
      var PREFETCH_SIZE = 27;
      if (!buffer.push(data, PREFETCH_SIZE))
        return;
      stream = buffer.createStream();
      var bytes = stream.bytes;
      readHeader(bytes, stream, swf);
      var nextTagHeader = readUi16(bytes, stream);
      var FILE_ATTRIBUTES_LENGTH = 4;
      if (nextTagHeader == (SWF_TAG_CODE_FILE_ATTRIBUTES << 6 | FILE_ATTRIBUTES_LENGTH)) {
        stream.ensure(FILE_ATTRIBUTES_LENGTH);
        var substream = stream.substream(stream.pos, stream.pos += FILE_ATTRIBUTES_LENGTH);
        var handler = tagHandler[SWF_TAG_CODE_FILE_ATTRIBUTES];
        var fileAttributesTag = {
            code: SWF_TAG_CODE_FILE_ATTRIBUTES
          };
        handler(substream.bytes, substream, fileAttributesTag, swfVersion, SWF_TAG_CODE_FILE_ATTRIBUTES);
        swf.fileAttributes = fileAttributesTag;
      } else {
        stream.pos -= 2;
        swf.fileAttributes = {};
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
        buffer = null;
      }
    };
  return pipe;
};
SWF.parse = function (buffer, options) {
  if (!options)
    options = {};
  var pipe = SWF.parseAsync(options);
  var bytes = new Uint8Array(buffer);
  var progressInfo = {
      loaded: bytes.length,
      total: bytes.length
    };
  pipe.push(bytes, progressInfo);
};
var FORMAT_COLORMAPPED = 3;
var FORMAT_15BPP = 4;
var FORMAT_24BPP = 5;
var FACTOR_5BBP = 255 / 31;
function rgbToString(bytes, pos) {
  var red = bytes[pos];
  var green = bytes[pos + 1];
  var blue = bytes[pos + 2];
  return fromCharCode(red, green, blue);
}
function argbToString(bytes, pos) {
  var alpha = bytes[pos];
  if (!alpha)
    return '\0\0\0\0';
  var opacity = alpha / 255;
  var red = 0 | bytes[pos + 1] / opacity;
  var green = 0 | bytes[pos + 2] / opacity;
  var blue = 0 | bytes[pos + 3] / opacity;
  return fromCharCode(red, green, blue, alpha);
}
function defineBitmap(tag) {
  var width = tag.width;
  var height = tag.height;
  var hasAlpha = tag.hasAlpha;
  var plte = '';
  var trns = '';
  var literals = '';
  var bmpData = tag.bmpData;
  switch (tag.format) {
  case FORMAT_COLORMAPPED:
    var colorType = '\x03';
    var bytesPerLine = width + 3 & ~3;
    var colorTableSize = tag.colorTableSize + 1;
    var paletteSize = colorTableSize * (tag.hasAlpha ? 4 : 3);
    var datalen = paletteSize + bytesPerLine * height;
    var stream = createInflatedStream(bmpData, datalen);
    var bytes = stream.bytes;
    var pos = 0;
    var palette = '';
    stream.ensure(paletteSize);
    if (hasAlpha) {
      var alphaValues = '';
      while (pos < paletteSize) {
        palette += rgbToString(bytes, pos);
        pos += 3;
        alphaValues += fromCharCode(bytes[pos++]);
      }
      trns = createPngChunk('tRNS', alphaValues);
    } else {
      while (pos < paletteSize) {
        palette += rgbToString(bytes, pos);
        pos += 3;
      }
    }
    plte = createPngChunk('PLTE', palette);
    while (pos < datalen) {
      stream.ensure(bytesPerLine);
      var begin = pos;
      var end = begin + width;
      var scanline = slice.call(bytes, begin, end);
      if (scanline[0] == 5 && scanline[2] == 5)
        debugger;
      literals += '\0' + fromCharCode.apply(null, scanline);
      stream.pos = pos += bytesPerLine;
    }
    break;
  case FORMAT_15BPP:
    var colorType = '\x02';
    var bytesPerLine = width * 2 + 3 & ~3;
    var stream = createInflatedStream(bmpData, bytesPerLine * height);
    var pos = 0;
    for (var y = 0; y < height; ++y) {
      literals += '\0';
      stream.ensure(bytesPerLine);
      for (var x = 0; x < width; ++x) {
        var word = stream.getUint16(pos);
        pos += 2;
        var red = 0 | FACTOR_5BBP * (word >> 10 & 31);
        var green = 0 | FACTOR_5BBP * (word >> 5 & 31);
        var blue = 0 | FACTOR_5BBP * (word & 31);
        literals += fromCharCode(red, green, blue);
      }
      stream.pos = pos += bytesPerLine;
    }
    break;
  case FORMAT_24BPP:
    if (hasAlpha) {
      var colorType = '\x06';
      var padding = 0;
      var pxToString = argbToString;
    } else {
      var colorType = '\x02';
      var padding = 1;
      var pxToString = rgbToString;
    }
    var bytesPerLine = width * 4;
    var stream = createInflatedStream(bmpData, bytesPerLine * height);
    var bytes = stream.bytes;
    var pos = 0;
    for (var y = 0; y < height; ++y) {
      stream.ensure(bytesPerLine);
      literals += '\0';
      for (var x = 0; x < width; ++x) {
        pos += padding;
        literals += pxToString(bytes, pos);
        pos += 4 - padding;
      }
      stream.pos = pos;
    }
    break;
  default:
    fail('invalid format', 'bitmap');
  }
  var ihdr = toString32(width) + toString32(height) + '\b' + colorType + '\0' + '\0' + '\0';
  ;
  var idat = 'x\x9c';
  var len = literals.length, pos = 0;
  var maxBlockLength = 65535;
  while (len > maxBlockLength) {
    idat += '\0\xff\xff\0\0' + literals.substring(pos, pos + maxBlockLength);
    pos += maxBlockLength;
    len -= maxBlockLength;
  }
  idat += '\x01' + toString16Le(len) + toString16Le(~len & 65535) + literals.substring(pos);
  idat += toString32(adler32(literals));
  var data = '\x89PNG\r\n\x1a\n' + createPngChunk('IHDR', ihdr) + plte + trns + createPngChunk('IDAT', idat) + createPngChunk('IEND', '');
  ;
  return {
    type: 'image',
    id: tag.id,
    width: width,
    height: height,
    mimeType: 'image/png',
    data: data
  };
}
function defineButton(tag, dictionary) {
  var characters = tag.characters;
  var states = {
      up: {},
      over: {},
      down: {},
      hitTest: {}
    };
  var i = 0;
  while (character = characters[i++]) {
    if (character.eob)
      break;
    var characterItem = dictionary[character.symbolId];
    var entry = {
        symbolId: characterItem.id,
        hasMatrix: !(!character.matrix),
        matrix: character.matrix
      };
    if (character.stateUp)
      states.up[character.depth] = entry;
    if (character.stateOver)
      states.over[character.depth] = entry;
    if (character.stateDown)
      states.down[character.depth] = entry;
    if (character.stateHitTest)
      states.hitTest[character.depth] = entry;
  }
  var button = {
      type: 'button',
      id: tag.id,
      buttonActions: tag.buttonActions,
      states: states
    };
  return button;
}
var nextFontId = 1;
function maxPower2(num) {
  var maxPower = 0;
  var val = num;
  while (val >= 2) {
    val /= 2;
    ++maxPower;
  }
  return pow(2, maxPower);
}
function defineFont(tag, dictionary) {
  var tables = {};
  var codes = [];
  var glyphIndex = {};
  var ranges = [];
  var glyphs = tag.glyphs;
  var glyphCount = glyphs.length;
  if (tag.codes) {
    codes = codes.concat(tag.codes);
    for (var i = 0, code; code = codes[i]; ++i)
      glyphIndex[code] = i;
    codes.sort(function (a, b) {
      return a - b;
    });
    var i = 0;
    var code;
    while (code = codes[i++]) {
      var start = code;
      var end = start;
      var indices = [
          i - 1
        ];
      while ((code = codes[i]) && end + 1 === code) {
        ++end;
        indices.push(i);
        ++i;
      }
      ranges.push([
        start,
        end,
        indices
      ]);
    }
  } else {
    var indices = [];
    var UAC_OFFSET = 57344;
    for (var i = 0; i < glyphCount; i++) {
      var code = UAC_OFFSET + i;
      codes.push(code);
      glyphIndex[code] = i;
      indices.push(i);
    }
    ranges.push([
      UAC_OFFSET,
      UAC_OFFSET + glyphCount - 1,
      indices
    ]);
  }
  var ascent = tag.ascent || 1024;
  var descent = tag.descent || 1024;
  tables['OS/2'] = '\0\x01\0\0' + toString16(tag.bold ? 700 : 400) + '\0\x05' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0\0\0\0\0\0\0\0\0' + '\0\0\0\0' + '\0\0\0\0' + '\0\0\0\0' + '\0\0\0\0' + 'ALF ' + toString16((tag.italic ? 1 : 0) | (tag.bold ? 32 : 0)) + toString16(codes[0]) + toString16(codes[codes.length - 1]) + toString16(ascent) + toString16(descent) + '\0\0' + toString16(ascent) + toString16(descent) + '\0\0\0\0' + '\0\0\0\0';
  ;
  var startCount = '';
  var endCount = '';
  var idDelta = '';
  var idRangeOffset = '';
  var i = 0;
  var range;
  while (range = ranges[i++]) {
    var start = range[0];
    var end = range[1];
    var code = range[2][0];
    startCount += toString16(start);
    endCount += toString16(end);
    idDelta += toString16(code - start + 1 & 65535);
    idRangeOffset += toString16(0);
  }
  endCount += '\xff\xff';
  startCount += '\xff\xff';
  idDelta += '\0\x01';
  idRangeOffset += '\0\0';
  var segCount = ranges.length + 1;
  var searchRange = maxPower2(segCount) * 2;
  var rangeShift = 2 * segCount - searchRange;
  var format314 = '\0\0' + toString16(segCount * 2) + toString16(searchRange) + toString16(log(segCount) / log(2)) + toString16(rangeShift) + endCount + '\0\0' + startCount + idDelta + idRangeOffset;
  ;
  tables['cmap'] = '\0\0\0\x01\0\x03\0\x01\0\0\0\f\0\x04' + toString16(format314.length + 4) + format314;
  ;
  var glyf = '\0\x01\0\0\0\0\0\0\0\0\0\0\0\x001\0';
  var loca = '\0\0';
  var resolution = tag.resolution || 1;
  var offset = 16;
  var maxPoints = 0;
  var xMins = [];
  var xMaxs = [];
  var yMins = [];
  var yMaxs = [];
  var maxContours = 0;
  var i = 0;
  var code;
  while (code = codes[i++]) {
    var glyph = glyphs[glyphIndex[code]];
    var records = glyph.records;
    var numberOfContours = 1;
    var endPoint = 0;
    var endPtsOfContours = '';
    var flags = '';
    var xCoordinates = '';
    var yCoordinates = '';
    var x = 0;
    var y = 0;
    var xMin = 1024;
    var xMax = -1024;
    var yMin = 1024;
    var yMax = -1024;
    for (var j = 0, record; record = records[j]; ++j) {
      if (record.type) {
        if (record.isStraight) {
          if (record.isGeneral) {
            flags += '\x01';
            var dx = record.deltaX / resolution;
            var dy = -record.deltaY / resolution;
            xCoordinates += toString16(dx);
            yCoordinates += toString16(dy);
            x += dx;
            y += dy;
          } else if (record.isVertical) {
            flags += '\x11';
            var dy = -record.deltaY / resolution;
            yCoordinates += toString16(dy);
            y += dy;
          } else {
            flags += '!';
            var dx = record.deltaX / resolution;
            xCoordinates += toString16(dx);
            x += dx;
          }
        } else {
          flags += '\0';
          var cx = record.controlDeltaX / resolution;
          var cy = -record.controlDeltaY / resolution;
          xCoordinates += toString16(cx);
          yCoordinates += toString16(cy);
          flags += '\x01';
          var dx = record.anchorDeltaX / resolution;
          var dy = -record.anchorDeltaY / resolution;
          xCoordinates += toString16(dx);
          yCoordinates += toString16(dy);
          ++endPoint;
          x += cx + dx;
          y += cy + dy;
        }
      } else {
        if (record.eos)
          break;
        if (record.move) {
          if (endPoint) {
            ++numberOfContours;
            endPtsOfContours += toString16(endPoint - 1);
          }
          flags += '\x01';
          var moveX = record.moveX / resolution;
          var moveY = -record.moveY / resolution;
          var dx = moveX - x;
          var dy = moveY - y;
          xCoordinates += toString16(dx);
          yCoordinates += toString16(dy);
          x = moveX;
          y = moveY;
          if (endPoint > maxPoints)
            maxPoints = endPoint;
        }
      }
      if (x < xMin)
        xMin = x;
      if (x > xMax)
        xMax = x;
      if (y < yMin)
        yMin = y;
      if (y > yMax)
        yMax = y;
      ++endPoint;
    }
    endPtsOfContours += toString16((endPoint || 1) - 1);
    if (!j) {
      xMin = xMax = yMin = yMax = 0;
      flags += '1';
    }
    var entry = toString16(numberOfContours) + toString16(xMin) + toString16(yMin) + toString16(xMax) + toString16(yMax) + endPtsOfContours + '\0\0' + flags + xCoordinates + yCoordinates;
    ;
    if (entry.length & 1)
      entry += '\0';
    glyf += entry;
    loca += toString16(offset / 2);
    offset += entry.length;
    xMins.push(xMin);
    xMaxs.push(xMax);
    yMins.push(yMin);
    yMaxs.push(yMax);
    if (numberOfContours > maxContours)
      maxContours = numberOfContours;
    if (endPoint > maxPoints)
      maxPoints = endPoint;
  }
  loca += toString16(offset / 2);
  tables['glyf'] = glyf;
  tables['head'] = '\0\x01\0\0\0\x01\0\0\0\0\0\0_\x0f<\xf5\0\v\x04\0\0\0\0\0' + toString32(+new Date()) + '\0\0\0\0' + toString32(+new Date()) + toString16(min.apply(null, xMins)) + toString16(min.apply(null, yMins)) + toString16(max.apply(null, xMaxs)) + toString16(max.apply(null, yMaxs)) + toString16((tag.italic ? 2 : 0) | (tag.bold ? 1 : 0)) + '\0\b' + '\0\x02' + '\0\0' + '\0\0';
  ;
  var advance = tag.advance;
  var resolution = tag.resolution || 1;
  tables['hhea'] = '\0\x01\0\0' + toString16(ascent) + toString16(descent) + '\0\0' + toString16(advance ? max.apply(null, advance) : 1024) + '\0\0' + '\0\0' + '\x03\xb8' + '\0\x01' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + toString16(glyphCount + 1);
  ;
  var hmtx = '\0\0\0\0';
  for (var i = 0; i < glyphCount; ++i)
    hmtx += toString16(advance ? advance[i] / resolution : 1024) + '\0\0';
  tables['hmtx'] = hmtx;
  if (tag.kerning) {
    var kerning = tag.kerning;
    var nPairs = kerning.length;
    var searchRange = maxPower2(nPairs) * 2;
    var kern = '\0\0\0\x01\0\0' + toString16(14 + nPairs * 6) + '\0\x01' + toString16(nPairs) + toString16(searchRange) + toString16(log(nPairs) / log(2)) + toString16(2 * nPairs - searchRange);
    ;
    var i = 0;
    var record;
    while (record = kerning[i++]) {
      kern += toString16(glyphIndex[record.code1]) + toString16(glyphIndex[record.code2]) + toString16(record.adjustment);
      ;
    }
    tables['kern'] = kern;
  }
  tables['loca'] = loca;
  tables['maxp'] = '\0\x01\0\0' + toString16(glyphCount + 1) + toString16(maxPoints) + toString16(maxContours) + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0' + '\0\0';
  ;
  var uniqueId = 'swf-font-' + nextFontId++;
  var fontName = tag.name || uniqueId;
  var psName = fontName.replace(/ /g, '');
  var strings = [
      tag.copyright || 'Original licence',
      fontName,
      'Unknown',
      uniqueId,
      fontName,
      '1.0',
      psName,
      'Unknown',
      'Unknown',
      'Unknown'
    ];
  var count = strings.length;
  var name = '\0\0' + toString16(count) + toString16(count * 12 + 6);
  var offset = 0;
  var i = 0;
  var str;
  while (str = strings[i++]) {
    name += '\0\x01\0\0\0\0' + toString16(i - 1) + toString16(str.length) + toString16(offset);
    offset += str.length;
    ;
  }
  tables['name'] = name + strings.join('');
  tables['post'] = '\0\x03\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0';
  ;
  var names = keys(tables);
  var numTables = names.length;
  var header = '\0\x01\0\0' + toString16(numTables) + '\0\x80' + '\0\x03' + '\0 ';
  ;
  var data = '';
  var offset = numTables * 16 + header.length;
  var i = 0;
  var name;
  while (name = names[i++]) {
    var table = tables[name];
    var length = table.length;
    header += name + '\0\0\0\0' + toString32(offset) + toString32(length);
    ;
    while (length & 3) {
      table += '\0';
      ++length;
    }
    data += table;
    while (offset & 3)
      ++offset;
    offset += length;
  }
  var otf = header + data;
  return {
    type: 'font',
    id: tag.id,
    name: psName + uniqueId,
    codes: codes,
    data: otf
  };
}
var plte = createPngChunk('PLTE', new Array(769).join('\0'));
var alphaValues = [];
for (var i = 0; i < 256; ++i)
  alphaValues.push(i);
var trns = createPngChunk('tRNS', fromCharCode.apply(null, alphaValues));
function getUint16(buff, pos) {
  return buff[pos] << 8 | buff[pos + 1];
}
function defineImage(tag, dictionary) {
  var imgData = tag.imgData;
  var data = '';
  var mask;
  if (tag.mimeType === 'image/jpeg') {
    var width = 0;
    var height = 0;
    var i = 0;
    var n = imgData.length;
    var code;
    do {
      var begin = i;
      while (imgData[i] !== 255)
        ++i;
      while (imgData[i] === 255)
        ++i;
      var code = imgData[i++];
      if (code === 218) {
        i = n;
      } else {
        if (code === 217) {
          i += 2;
          continue;
        } else if (code < 208 || code > 216) {
          var length = getUint16(imgData, i);
          if (code >= 192 && code <= 195) {
            height = getUint16(imgData, i + 3);
            width = getUint16(imgData, i + 5);
          }
          i += length;
        }
      }
      var codes = slice.call(imgData, begin, i);
      var numChunks = codes.length / 65536;
      for (var j = 0; j < numChunks; ++j) {
        var begin = j * 65536;
        var end = begin + 65536;
        var chunk = codes.slice(begin, end);
        data += fromCharCode.apply(null, chunk);
      }
    } while (i < n);
    var alphaData = tag.alphaData;
    if (alphaData) {
      mask = createInflatedStream(alphaData, width * height).bytes;
    }
    if (tag.incomplete) {
      var tables = dictionary[0];
      var header = tables.data;
      if (header)
        data = header.substr(0, header.length - 2) + data.substr(2);
    }
  } else {
    var numChunks = imgData.length / 65536;
    for (var i = 0; i < numChunks; ++i) {
      var begin = i * 65536;
      var end = begin + 65536;
      var chunk = slice.call(imgData, begin, end);
      data += fromCharCode.apply(null, chunk);
    }
  }
  var img = {
      type: 'image',
      id: tag.id,
      width: width,
      height: height,
      mimeType: tag.mimeType,
      data: data
    };
  if (mask)
    img.mask = mask;
  return img;
}
function defineLabel(tag, dictionary) {
  var records = tag.records;
  var m = tag.matrix;
  var cmds = [
      'c.save()',
      'c.transform(' + [
        m.a,
        m.b,
        m.c,
        m.d,
        m.tx,
        m.ty
      ].join(',') + ')',
      'c.scale(0.05, 0.05)'
    ];
  var dependencies = [];
  var x = 0;
  var y = 0;
  var i = 0;
  var record;
  while (record = records[i++]) {
    if (record.eot)
      break;
    if (record.hasFont) {
      var font = dictionary[record.fontId];
      var codes = font.codes;
      cmds.push('c.font="' + record.fontHeight + 'px \'' + font.name + '\'"');
      dependencies.push(font.id);
    }
    if (record.hasColor)
      cmds.push('c.fillStyle="' + toStringRgba(record.color) + '"');
    if (record.hasMoveX)
      x = record.moveX;
    if (record.hasMoveY)
      y = record.moveY;
    var entries = record.entries;
    var j = 0;
    var entry;
    while (entry = entries[j++]) {
      var code = codes[entry.glyphIndex];
      var text = code >= 32 && code != 34 && code != 92 ? fromCharCode(code) : '\\u' + (code + 65536).toString(16).substring(1);
      cmds.push('c.fillText("' + text + '",' + x + ',' + y + ')');
      x += entry.advance;
    }
  }
  cmds.push('c.restore()');
  var label = {
      type: 'label',
      id: tag.id,
      bbox: tag.bbox,
      data: cmds.join('\n')
    };
  if (dependencies.length)
    label.require = dependencies;
  return label;
}
var GRAPHICS_FILL_CLIPPED_BITMAP = 65;
var GRAPHICS_FILL_FOCAL_RADIAL_GRADIENT = 19;
var GRAPHICS_FILL_LINEAR_GRADIENT = 16;
var GRAPHICS_FILL_NONSMOOTHED_CLIPPED_BITMAP = 67;
var GRAPHICS_FILL_NONSMOOTHED_REPEATING_BITMAP = 66;
var GRAPHICS_FILL_RADIAL_GRADIENT = 18;
var GRAPHICS_FILL_REPEATING_BITMAP = 64;
var GRAPHICS_FILL_SOLID = 0;
var GRAPHICS_PATH_COMMAND_CUBIC_CURVE_TO = 6;
var GRAPHICS_PATH_COMMAND_CURVE_TO = 3;
var GRAPHICS_PATH_COMMAND_LINE_TO = 2;
var GRAPHICS_PATH_COMMAND_MOVE_TO = 1;
var GRAPHICS_PATH_COMMAND_WIDE_LINE_TO = 5;
var GRAPHICS_PATH_COMMAND_WIDE_MOVE_TO = 4;
function morph(start, end) {
  if (!isNaN(end) && end !== start)
    return start + '+' + (end - start) + '*r';
  return start;
}
function morphColor(color, colorMorph) {
  return '(' + morph(color.red, colorMorph.red) + ')<<16|' + '(' + morph(color.green, colorMorph.green) + ')<<8|' + '(' + morph(color.blue, colorMorph.blue) + ')';
}
function toColorProperties(color, colorMorph) {
  if (colorMorph) {
    return 'color:' + morphColor(color, colorMorph) + ',' + 'alpha:' + morph(color.alpha / 255, colorMorph.alpha / 255);
  }
  if (color) {
    return 'color:' + (color.red << 16 | color.green << 8 | color.blue) + ',' + 'alpha:' + color.alpha / 255;
  }
  return 'color: 0, alpha: 1';
}
function toMatrixInstance(matrix, matrixMorph) {
  if (matrixMorph) {
    return '{__class__:"flash.geom.Matrix",a:' + morph(matrix.a * 20, matrixMorph.a * 20) + ',' + 'b:' + morph(matrix.b * 20, matrixMorph.b * 20) + ',' + 'c:' + morph(matrix.c * 20, matrixMorph.c * 20) + ',' + 'd:' + morph(matrix.d * 20, matrixMorph.d * 20) + ',' + 'tx:' + morph(matrix.tx, matrixMorph.tx) + ',' + 'ty:' + morph(matrix.ty, matrixMorph.ty) + '}';
  }
  return '{__class__:"flash.geom.Matrix",a:' + matrix.a * 20 + ',' + 'b:' + matrix.b * 20 + ',' + 'c:' + matrix.c * 20 + ',' + 'd:' + matrix.d * 20 + ',' + 'tx:' + matrix.tx * 20 + ',' + 'ty:' + matrix.ty * 20 + '}';
}
function defineShape(tag, dictionary) {
  var records = tag.records;
  var isMorph = tag.isMorph;
  var recordsMorph = isMorph ? tag.recordsMorph : [];
  var fillStyles = tag.fillStyles;
  var lineStyles = tag.lineStyles;
  var fillSegments = {};
  var lineSegments = {};
  var paths = [];
  var dependencies = [];
  var sx = 0;
  var sy = 0;
  var dx = 0;
  var dy = 0;
  var sxm = 0;
  var sym = 0;
  var dxm = 0;
  var dym = 0;
  var dpt = '0,0';
  var edges = [];
  var fillOffset = 0;
  var lineOffset = 0;
  var fill0 = 0;
  var fill1 = 0;
  var line = 0;
  for (var i = 0, j = 0, record; record = records[i]; ++i) {
    if (record.type) {
      sx = dx;
      sy = dy;
      sxm = dxm;
      sym = dym;
      var edge = {
          i: i,
          spt: dpt
        };
      if (record.isStraight) {
        if (record.isGeneral) {
          dx += record.deltaX;
          dy += record.deltaY;
        } else if (record.isVertical) {
          dy += record.deltaY;
        } else {
          dx += record.deltaX;
        }
        if (isMorph) {
          var recordMorph = recordsMorph[j++];
          if (recordMorph.isStraight) {
            if (recordMorph.isGeneral) {
              dxm += recordMorph.deltaX;
              dym += recordMorph.deltaY;
            } else if (recordMorph.isVertical) {
              dym += recordMorph.deltaY;
            } else {
              dxm += recordMorph.deltaX;
            }
          } else {
            var cxm = sxm + recordMorph.controlDeltaX;
            var cym = sym + recordMorph.controlDeltaY;
            dxm = cxm + recordMorph.anchorDeltaX;
            dym = cym + recordMorph.anchorDeltaY;
            edge.cpt = morph(sx + (dx - sx) / 2, cxm) + ',' + morph(sy + (dy - sy) / 2, cym);
          }
        }
      } else {
        var cx = sx + record.controlDeltaX;
        var cy = sy + record.controlDeltaY;
        dx = cx + record.anchorDeltaX;
        dy = cy + record.anchorDeltaY;
        if (isMorph) {
          var recordMorph = recordsMorph[j++];
          if (recordMorph.isStraight) {
            if (recordMorph.isGeneral) {
              dxm += recordMorph.deltaX;
              dym += recordMorph.deltaY;
            } else if (recordMorph.isVertical) {
              dym += recordMorph.deltaY;
            } else {
              dxm += recordMorph.deltaX;
            }
            var cxm = sxm + (dxm - sxm) / 2;
            var cym = sym + (dym - sym) / 2;
          } else {
            var cxm = sxm + recordMorph.controlDeltaX;
            var cym = sym + recordMorph.controlDeltaY;
            dxm = cxm + recordMorph.anchorDeltaX;
            dym = cym + recordMorph.anchorDeltaY;
          }
          edge.cpt = morph(cx, cxm) + ',' + morph(cy, cym);
        } else {
          edge.cpt = cx + ',' + cy;
        }
      }
      if (isMorph)
        dpt = morph(dx, dxm) + ',' + morph(dy, dym);
      else
        dpt = dx + ',' + dy;
      edge.dpt = dpt;
      edges.push(edge);
    } else {
      if (edges.length) {
        if (fill0) {
          var list = fillSegments[fillOffset + fill0];
          if (!list)
            list = fillSegments[fillOffset + fill0] = [];
          list.push({
            i: i,
            spt: edges[0].spt,
            dpt: dpt,
            edges: edges
          });
        }
        if (fill1) {
          var list = fillSegments[fillOffset + fill1];
          if (!list)
            list = fillSegments[fillOffset + fill1] = [];
          list.push({
            i: i,
            spt: edges[edges.length - 1].dpt,
            dpt: edges[0].spt,
            edges: edges,
            flip: true
          });
        }
        if (line) {
          var list = lineSegments[lineOffset + line];
          if (!list)
            list = lineSegments[lineOffset + line] = [];
          list.push({
            i: i,
            spt: edges[0].spt,
            dpt: dpt,
            edges: edges
          });
        }
        edges = [];
      }
      if (record.eos)
        break;
      if (record.hasNewStyles) {
        fillOffset = fillStyles.length;
        lineOffset = lineStyles.length;
        push.apply(fillStyles, record.fillStyles);
        push.apply(lineStyles, record.lineStyles);
      }
      if (record.hasFillStyle0)
        fill0 = record.fillStyle0;
      if (record.hasFillStyle1)
        fill1 = record.fillStyle1;
      if (record.hasLineStyle)
        line = record.lineStyle;
      if (record.move) {
        dx = record.moveX;
        dy = record.moveY;
        if (isMorph) {
          var recordMorph = recordsMorph[j++];
          dxm = recordMorph.moveX;
          dym = recordMorph.moveY;
          dpt = morph(dx, dxm) + ',' + morph(dy, dym);
        } else {
          dpt = dx + ',' + dy;
        }
      }
    }
  }
  var i = 0;
  while (fillStyles[i++]) {
    var path = [];
    var segments = fillSegments[i];
    if (!segments)
      continue;
    var map = {};
    var j = 0;
    var segment;
    while (segment = segments[j++]) {
      var list = map[segment.spt];
      if (!list)
        list = map[segment.spt] = [];
      list.push(segment);
    }
    var numSegments = segments.length;
    var j = 0;
    var count = 0;
    while ((segment = segments[j++]) && count < numSegments) {
      if (segment.skip)
        continue;
      var subpath = [
          segment
        ];
      segment.skip = true;
      ++count;
      var spt = segment.spt;
      var list = map[spt];
      var k = list.length;
      while (k--) {
        if (list[k] === segment) {
          list.splice(k, 1);
          break;
        }
      }
      var dpt = segment.dpt;
      while (dpt !== spt && (list = map[dpt]) != false) {
        segment = list.shift();
        subpath.push(segment);
        segment.skip = true;
        ++count;
        dpt = segment.dpt;
      }
      push.apply(path, subpath);
    }
    if (path.length) {
      var commands = [];
      var fillStyle = fillStyles[i - 1];
      switch (fillStyle.type) {
      case GRAPHICS_FILL_SOLID:
        commands.push('{__class__:"flash.display.GraphicsSolidFill",__isIGraphicsFill__:true,' + toColorProperties(fillStyle.color, fillStyle.colorMorph) + '}');
        break;
      case GRAPHICS_FILL_LINEAR_GRADIENT:
      case GRAPHICS_FILL_RADIAL_GRADIENT:
      case GRAPHICS_FILL_FOCAL_RADIAL_GRADIENT:
        var records = fillStyle.records;
        var colors = [];
        var alphas = [];
        var ratios = [];
        for (var j = 0, n = records.length; j < n; j++) {
          var record = records[j];
          var color = record.color;
          if (record.colorMorph) {
            var colorMorph = record.colorMorph;
            colors.push(morphColor(color, colorMorph));
            alphas.push(morph(color.alpha / 255, colorMorph.alpha / 255));
            ratios.push(morph(record.ratio / 255, record.ratioMorph / 255));
          } else {
            colors.push(color.red << 16 | color.green << 8 | color.blue);
            alphas.push(color.alpha / 255);
            ratios.push(record.ratio / 255);
          }
        }
        commands.push('{__class__:"flash.display.GraphicsGradientFill",__isIGraphicsFill__:true,type:' + (fillStyle.type == GRAPHICS_FILL_LINEAR_GRADIENT ? '"linear"' : '"radial"') + ',' + 'colors:[' + colors.join(',') + '],' + 'alphas:[' + alphas.join(',') + '],' + 'ratios:[' + ratios.join(',') + '],' + 'matrix:' + toMatrixInstance(fillStyle.matrix, fillStyle.matrixMorph), 'spreadMode:"pad",interpolationMode:"rgb",focalPointRatio:' + morph(fillStyle.focalPoint, fillStyle.focalPointMorph) + '}');
        break;
      case GRAPHICS_FILL_REPEATING_BITMAP:
      case GRAPHICS_FILL_CLIPPED_BITMAP:
      case GRAPHICS_FILL_NONSMOOTHED_REPEATING_BITMAP:
      case GRAPHICS_FILL_NONSMOOTHED_CLIPPED_BITMAP:
        var bitmap = dictionary[fillStyle.bitmapId];
        commands.push('{__class__:"flash.display.GraphicsBitmapFill",__isIGraphicsFill__:true,bitmapData: {__class__:"flash.display.BitmapData",_drawable:d[' + bitmap.id + '].value.props.img' + '},' + 'matrix:' + toMatrixInstance(fillStyle.matrix, fillStyle.matrixMorph), 'repeat:' + !(!fillStyle.repeat) + '}');
        dependencies.push(bitmap.id);
        break;
      default:
        fail('invalid fill style', 'shape');
      }
      var cmds = [];
      var data = [];
      var j = 0;
      var subpath;
      var prev = {};
      while (subpath = path[j++]) {
        if (subpath.spt !== prev.dpt) {
          cmds.push(GRAPHICS_PATH_COMMAND_MOVE_TO);
          data.push(subpath.spt);
        }
        var edges = subpath.edges;
        if (subpath.flip) {
          var k = edges.length;
          var edge;
          while (edge = edges[--k]) {
            if (edge.cpt) {
              cmds.push(GRAPHICS_PATH_COMMAND_CURVE_TO);
              data.push(edge.cpt, edge.spt);
            } else {
              cmds.push(GRAPHICS_PATH_COMMAND_LINE_TO);
              data.push(edge.spt);
            }
          }
        } else {
          var k = 0;
          var edge;
          while (edge = edges[k++]) {
            if (edge.cpt) {
              cmds.push(GRAPHICS_PATH_COMMAND_CURVE_TO);
              data.push(edge.cpt, edge.dpt);
            } else {
              cmds.push(GRAPHICS_PATH_COMMAND_LINE_TO);
              data.push(edge.dpt);
            }
          }
        }
        prev = subpath;
      }
      commands.push('{__class__:"flash.display.GraphicsPath",__isIGraphicsPath__:true,commands:[' + cmds.join(',') + '],' + 'data:[' + data.join(',') + ']' + '},{' + '__class__:"flash.display.GraphicsEndFill",' + '__isIGraphicsFill__:true' + '}');
      paths.push({
        i: path[0].i,
        commands: commands
      });
    }
  }
  var i = 0;
  var lineStyle;
  while (lineStyle = lineStyles[i++]) {
    var segments = lineSegments[i];
    if (segments) {
      var colorProps = toColorProperties(lineStyle.color, lineStyle.colorMorph);
      var lineWidth = morph(lineStyle.width || 20, isMorph ? lineStyle.widthMorph || 20 : undefined);
      var capsStyle = lineStyle.endCapStyle === 1 ? 'none' : lineStyle.endCapStyle === 2 ? 'square' : 'round';
      var joinStyle = lineStyle.joinStyle === 1 ? 'bevel' : lineStyle.joinStyle === 2 ? 'miter' : 'round';
      var miterLimitFactor = lineStyle.miterLimitFactor;
      var cmds = [];
      var data = [];
      var j = 0;
      var prev = {};
      while (segment = segments[j++]) {
        var edges = segment.edges;
        var k = 0;
        var edge;
        while (edge = edges[k++]) {
          if (edge.spt !== prev.dpt) {
            cmds.push(GRAPHICS_PATH_COMMAND_MOVE_TO);
            data.push(edge.spt);
          }
          if (edge.cpt) {
            cmds.push(GRAPHICS_PATH_COMMAND_CURVE_TO);
            data.push(edge.cpt, edge.dpt);
          } else {
            cmds.push(GRAPHICS_PATH_COMMAND_LINE_TO);
            data.push(edge.dpt);
          }
          prev = edge;
        }
      }
      paths.push({
        i: Number.MAX_VALUE,
        commands: [
          '{' + '__class__:"flash.display.GraphicsStroke",' + '__isIGraphicsStroke__:true,' + 'thickness:' + lineWidth + ',' + 'pixelHinting:false,' + 'caps:"' + capsStyle + '",' + 'joins:"' + joinStyle + '",' + 'miterLimit:' + miterLimitFactor * 2 + ',' + 'scaleMode:"normal",' + 'fill:{' + '__class__:"flash.display.GraphicsSolidFill",' + '__isIGraphicsFill__:true,' + colorProps + '}' + '},{' + '__class__:"flash.display.GraphicsPath",' + '__isIGraphicsPath__:true,' + 'commands:[' + cmds.join(',') + '],' + 'data:[' + data.join(',') + ']' + '},{' + '__isIGraphicsStroke__:true,' + 'fill:null' + '}'
        ]
      });
    }
  }
  paths.sort(function (a, b) {
    return a.i - b.i;
  });
  var commands = [];
  var i = 0;
  var path;
  while (path = paths[i++])
    push.apply(commands, path.commands);
  var shape = {
      type: 'shape',
      id: tag.id,
      morph: isMorph,
      bbox: tag.strokeBbox || tag.bbox,
      data: '[' + commands.join(',') + ']'
    };
  if (dependencies.length)
    shape.require = dependencies;
  return shape;
}
var SOUND_SIZE_8_BIT = 0;
var SOUND_SIZE_16_BIT = 1;
var SOUND_TYPE_MONO = 0;
var SOUND_TYPE_STEREO = 1;
var SOUND_FORMAT_PCM_BE = 0;
var SOUND_FORMAT_ADPCM = 1;
var SOUND_FORMAT_MP3 = 2;
var SOUND_FORMAT_PCM_LE = 3;
var SOUND_FORMAT_NELLYMOSER_16 = 4;
var SOUND_FORMAT_NELLYMOSER_8 = 5;
var SOUND_FORMAT_NELLYMOSER = 6;
var SOUND_FORMAT_SPEEX = 11;
var SOUND_RATES = [
    5512,
    11250,
    22500,
    44100
  ];
var WaveHeader = new Uint8Array([
    82,
    73,
    70,
    70,
    0,
    0,
    0,
    0,
    87,
    65,
    86,
    69,
    102,
    109,
    116,
    32,
    16,
    0,
    0,
    0,
    1,
    0,
    2,
    0,
    68,
    172,
    0,
    0,
    16,
    177,
    2,
    0,
    4,
    0,
    16,
    0,
    100,
    97,
    116,
    97,
    0,
    0,
    0,
    0
  ]);
function packageWave(data, sampleRate, channels, size, swapBytes) {
  var sizeInBytes = size >> 3;
  var sizePerSecond = channels * sampleRate * sizeInBytes;
  var sizePerSample = channels * sizeInBytes;
  var dataLength = data.length + (data.length & 1);
  var buffer = new ArrayBuffer(WaveHeader.length + dataLength);
  var bytes = new Uint8Array(buffer);
  bytes.set(WaveHeader);
  if (swapBytes) {
    for (var i = 0, j = WaveHeader.length; i < data.length; i += 2, j += 2) {
      bytes[j] = data[i + 1];
      bytes[j + 1] = data[i];
    }
  } else {
    bytes.set(data, WaveHeader.length);
  }
  var view = new DataView(buffer);
  view.setUint32(4, dataLength + 36, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sizePerSecond, true);
  view.setUint16(32, sizePerSample, true);
  view.setUint16(34, size, true);
  view.setUint32(40, dataLength, true);
  return {
    data: bytes,
    mimeType: 'audio/wav'
  };
}
function defineSound(tag, dictionary) {
  var channels = tag.soundType == SOUND_TYPE_STEREO ? 2 : 1;
  var samplesCount = tag.samplesCount;
  var sampleRate = SOUND_RATES[tag.soundRate];
  var data = tag.soundData;
  var pcm, packaged;
  switch (tag.soundFormat) {
  case SOUND_FORMAT_PCM_BE:
    pcm = new Float32Array(samplesCount * channels);
    if (tag.soundSize == SOUND_SIZE_16_BIT) {
      for (var i = 0, j = 0; i < pcm.length; i++, j += 2)
        pcm[i] = (data[j] << 24 | data[j + 1] << 16) / 2147483648;
      packaged = packageWave(data, sampleRate, channels, 16, true);
    } else {
      for (var i = 0; i < pcm.length; i++)
        pcm[i] = (data[i] - 128) / 128;
      packaged = packageWave(data, sampleRate, channels, 8, false);
    }
    break;
  case SOUND_FORMAT_PCM_LE:
    pcm = new Float32Array(samplesCount * channels);
    if (tag.soundSize == SOUND_SIZE_16_BIT) {
      for (var i = 0, j = 0; i < pcm.length; i++, j += 2)
        pcm[i] = (data[j + 1] << 24 | data[j] << 16) / 2147483648;
      packaged = packageWave(data, sampleRate, channels, 16, false);
    } else {
      for (var i = 0; i < pcm.length; i++)
        pcm[i] = (data[i] - 128) / 128;
      packaged = packageWave(data, sampleRate, channels, 8, false);
    }
    break;
  case SOUND_FORMAT_MP3:
    packaged = {
      data: new Uint8Array(data.subarray(2)),
      mimeType: 'audio/mpeg'
    };
    break;
  case SOUND_FORMAT_ADPCM:
    var pcm16 = new Int16Array(samplesCount * channels);
    decodeACPCMSoundData(data, pcm16, channels);
    pcm = new Float32Array(samplesCount * channels);
    for (var i = 0; i < pcm.length; i++)
      pcm[i] = pcm16[i] / 32768;
    packaged = packageWave(new Uint8Array(pcm16.buffer), sampleRate, channels, 16, !new Uint8Array(new Uint16Array([
      1
    ]).buffer)[0]);
    break;
  default:
    throw new Error('Unsupported audio format: ' + tag.soundFormat);
    break;
  }
  var sound = {
      type: 'sound',
      id: tag.id,
      sampleRate: sampleRate,
      channels: channels,
      pcm: pcm
    };
  if (packaged)
    sound.packaged = packaged;
  return sound;
}
var ACPCMIndexTables = [
    [
      -1,
      2
    ],
    [
      -1,
      -1,
      2,
      4
    ],
    [
      -1,
      -1,
      -1,
      -1,
      2,
      4,
      6,
      8
    ],
    [
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      1,
      2,
      4,
      6,
      8,
      10,
      13,
      16
    ]
  ];
var ACPCMStepSizeTable = [
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    16,
    17,
    19,
    21,
    23,
    25,
    28,
    31,
    34,
    37,
    41,
    45,
    50,
    55,
    60,
    66,
    73,
    80,
    88,
    97,
    107,
    118,
    130,
    143,
    157,
    173,
    190,
    209,
    230,
    253,
    279,
    307,
    337,
    371,
    408,
    449,
    494,
    544,
    598,
    658,
    724,
    796,
    876,
    963,
    1060,
    1166,
    1282,
    1411,
    1552,
    1707,
    1878,
    2066,
    2272,
    2499,
    2749,
    3024,
    3327,
    3660,
    4026,
    4428,
    4871,
    5358,
    5894,
    6484,
    7132,
    7845,
    8630,
    9493,
    10442,
    11487,
    12635,
    13899,
    15289,
    16818,
    18500,
    20350,
    22385,
    24623,
    27086,
    29794,
    32767
  ];
function decodeACPCMSoundData(data, pcm16, channels) {
  function readBits(n, signed) {
    while (dataBufferLength < n) {
      dataBuffer = dataBuffer << 8 | data[dataPosition++];
      dataBufferLength += 8;
    }
    dataBufferLength -= n;
    return dataBuffer >>> dataBufferLength & (1 << n) - 1;
  }
  var dataPosition = 0;
  var dataBuffer = 0;
  var dataBufferLength = 0;
  var pcmPosition = 0;
  var codeSize = readBits(2);
  var indexTable = ACPCMIndexTables[codeSize];
  while (pcmPosition < pcm16.length) {
    var x = pcm16[pcmPosition++] = readBits(16) << 16 >> 16;
    var stepIndex = readBits(6);
    if (channels > 1) {
      var x2 = pcm16[pcmPosition++] = readBits(16) << 16 >> 16;
      var stepIndex2 = readBits(6);
    }
    var signMask = 1 << codeSize + 1;
    for (var i = 0; i < 4095; i++) {
      var nibble = readBits(codeSize + 2);
      var step = ACPCMStepSizeTable[stepIndex];
      var sum = 0;
      for (var currentBit = signMask >> 1; currentBit; currentBit >>= 1, step >>= 1) {
        if (nibble & currentBit)
          sum += step;
      }
      x += (nibble & signMask ? -1 : 1) * (sum + step);
      pcm16[pcmPosition++] = x = x < -32768 ? -32768 : x > 32767 ? 32767 : x;
      stepIndex += indexTable[nibble & ~signMask];
      stepIndex = stepIndex < 0 ? 0 : stepIndex > 88 ? 88 : stepIndex;
      if (channels > 1) {
        nibble = readBits(codeSize + 2);
        step = ACPCMStepSizeTable[stepIndex2];
        sum = 0;
        for (var currentBit = signMask >> 1; currentBit; currentBit >>= 1, step >>= 1) {
          if (nibble & currentBit)
            sum += step;
        }
        x2 += (nibble & signMask ? -1 : 1) * (sum + step);
        pcm16[pcmPosition++] = x2 = x2 < -32768 ? -32768 : x2 > 32767 ? 32767 : x2;
        stepIndex2 += indexTable[nibble & ~signMask];
        stepIndex2 = stepIndex2 < 0 ? 0 : stepIndex2 > 88 ? 88 : stepIndex2;
      }
    }
  }
}
var nextSoundStreamId = 0;
function SwfSoundStream(samplesCount, sampleRate, channels) {
  this.streamId = nextSoundStreamId++;
  this.samplesCount = samplesCount;
  this.sampleRate = sampleRate;
  this.channels = channels;
  this.format = null;
  this.currentSample = 0;
}
SwfSoundStream.prototype = {
  get info() {
    return {
      samplesCount: this.samplesCount,
      sampleRate: this.sampleRate,
      channels: this.channels,
      format: this.format,
      streamId: this.streamId
    };
  },
  decode: function (data) {
    throw new Error('SwfSoundStream.decode: not implemented');
  }
};
function SwfSoundStream_decode_PCM(data) {
  var pcm = new Float32Array(data.length);
  for (var i = 0; i < pcm.length; i++)
    pcm[i] = (data[i] - 128) / 128;
  this.currentSample += pcm.length / this.channels;
  return {
    streamId: this.streamId,
    samplesCount: pcm.length / this.channels,
    pcm: pcm
  };
}
function SwfSoundStream_decode_PCM_be(data) {
  var pcm = new Float32Array(data.length / 2);
  for (var i = 0, j = 0; i < pcm.length; i++, j += 2)
    pcm[i] = (data[j] << 24 | data[j + 1] << 16) / 2147483648;
  this.currentSample += pcm.length / this.channels;
  return {
    streamId: this.streamId,
    samplesCount: pcm.length / this.channels,
    pcm: pcm
  };
}
function SwfSoundStream_decode_PCM_le(data) {
  var pcm = new Float32Array(data.length / 2);
  for (var i = 0, j = 0; i < pcm.length; i++, j += 2)
    pcm[i] = (data[j + 1] << 24 | data[j] << 16) / 2147483648;
  this.currentSample += pcm.length / this.channels;
  return {
    streamId: this.streamId,
    samplesCount: pcm.length / this.channels,
    pcm: pcm
  };
}
function SwfSoundStream_decode_MP3(data) {
  var samplesCount = data[1] << 8 | data[0];
  var seek = data[3] << 8 | data[2];
  this.currentSample += samplesCount;
  return {
    streamId: this.streamId,
    samplesCount: samplesCount,
    data: data.subarray(4),
    seek: seek
  };
}
function createSoundStream(tag) {
  var channels = tag.streamType == SOUND_TYPE_STEREO ? 2 : 1;
  var samplesCount = tag.samplesCount;
  var sampleRate = SOUND_RATES[tag.streamRate];
  var stream = new SwfSoundStream(samplesCount, sampleRate, channels);
  switch (tag.streamCompression) {
  case SOUND_FORMAT_PCM_BE:
    stream.format = 'wave';
    if (tag.soundSize == SOUND_SIZE_16_BIT) {
      stream.decode = SwfSoundStream_decode_PCM_be;
    } else {
      stream.decode = SwfSoundStream_decode_PCM;
    }
    break;
  case SOUND_FORMAT_PCM_LE:
    stream.format = 'wave';
    if (tag.soundSize == SOUND_SIZE_16_BIT) {
      stream.decode = SwfSoundStream_decode_PCM_le;
    } else {
      stream.decode = SwfSoundStream_decode_PCM;
    }
    break;
  case SOUND_FORMAT_MP3:
    stream.format = 'mp3';
    stream.decode = SwfSoundStream_decode_MP3;
    break;
  default:
    debugger;
    throw new Error('Unsupported audio format: ' + tag.soundFormat);
    break;
  }
  return stream;
}
function defineText(tag, dictionary) {
  var cmds = [];
  cmds.push('c.save()');
  cmds.push('c.beginPath()');
  cmds.push('c.rect(' + tag.bbox.left + ', ' + tag.bbox.top + ', ' + (tag.bbox.right - tag.bbox.left) + ', ' + (tag.bbox.bottom - tag.bbox.top) + ')');
  cmds.push('c.clip()');
  cmds.push('c.scale(0.05, 0.05)');
  var dependencies = [];
  var y;
  if (tag.hasText) {
    var initialText = tag.html ? tag.initialText.replace(/<[^>]*>/g, '') : tag.initialText;
  } else {
    var initialText = '';
  }
  if (tag.hasFont) {
    y = tag.fontHeight - tag.leading;
    var font = dictionary[tag.fontId];
    cmds.push('c.font="' + tag.fontHeight + 'px \'' + font.name + '\'"');
    dependencies.push(font.id);
  } else {
    y = 12 * (92 / 72) * 20;
    cmds.push('c.font="' + y + 'px \'sans\'"');
  }
  if (tag.hasColor)
    cmds.push('c.fillStyle="' + toStringRgba(tag.color) + '"');
  cmds.push('c.fillText(this.text,0,' + (y - 20 * tag.bbox.top) + ')');
  cmds.push('c.restore();');
  var text = {
      type: 'text',
      id: tag.id,
      bbox: tag.bbox,
      variableName: tag.variableName,
      value: initialText,
      data: cmds.join('\n')
    };
  if (dependencies.length)
    text.require = dependencies;
  return text;
}
