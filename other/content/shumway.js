(function(a) {
  function b(a, d, b, n, p) {
    void 0 === n && e("Missing required offset argument");
    (0 > n || n + b > a.byteLength) && e("Invalid index: " + n);
    if(1 === b || !!p === f) {
      if(0 === (a.byteOffset + n) % b) {
        return(new d(a.buffer, a.byteOffset + n, 1))[0]
      }
      for(p = 0;p < b;p++) {
        g[p] = a._bytes[n + p]
      }
      return(new d(g.buffer))[0]
    }
    for(p = 0;p < b;p++) {
      g[b - p - 1] = a._bytes[n + p]
    }
    return(new d(g.buffer))[0]
  }
  function d(a, d, b, n, p, r) {
    void 0 === n && e("Missing required offset argument");
    void 0 === p && e("Missing required value argument");
    (0 > n || n + b > a.byteLength) && e("Invalid index: " + n);
    if(1 === b || !!r === f) {
      if(0 === (a.byteOffset + n) % b) {
        (new d(a.buffer, a.byteOffset + n, 1))[0] = p
      }else {
        (new d(g.buffer))[0] = p;
        for(d = 0;d < b;d++) {
          a._bytes[d + n] = g[d]
        }
      }
    }else {
      (new d(g.buffer))[0] = p;
      for(d = 0;d < b;d++) {
        a._bytes[n + d] = g[b - 1 - d]
      }
    }
  }
  function e(a) {
    throw Error(a);
  }
  if(!a.DataView) {
    a.ArrayBuffer || e("ArrayBuffer not supported");
    Object.defineProperties || e("This module requires ECMAScript 5");
    var f = 1 === (new Int8Array((new Int32Array([1])).buffer))[0], g = new Uint8Array(8);
    a.DataView = function(a, d, b) {
      a instanceof ArrayBuffer || e("Bad ArrayBuffer");
      d = d || 0;
      b = b || a.byteLength - d;
      (0 > d || 0 > b || d + b > a.byteLength) && e("Illegal offset and/or length");
      Object.defineProperties(this, {buffer:{value:a, enumerable:!1, writable:!1, configurable:!1}, byteOffset:{value:d, enumerable:!1, writable:!1, configurable:!1}, byteLength:{value:b, enumerable:!1, writable:!1, configurable:!1}, _bytes:{value:new Uint8Array(a, d, b), enumerable:!1, writable:!1, configurable:!1}})
    };
    a.DataView.prototype = {constructor:DataView, getInt8:function(a) {
      return b(this, Int8Array, 1, a)
    }, getUint8:function(a) {
      return b(this, Uint8Array, 1, a)
    }, getInt16:function(a, d) {
      return b(this, Int16Array, 2, a, d)
    }, getUint16:function(a, d) {
      return b(this, Uint16Array, 2, a, d)
    }, getInt32:function(a, d) {
      return b(this, Int32Array, 4, a, d)
    }, getUint32:function(a, d) {
      return b(this, Uint32Array, 4, a, d)
    }, getFloat32:function(a, d) {
      return b(this, Float32Array, 4, a, d)
    }, getFloat64:function(a, d) {
      return b(this, Float64Array, 8, a, d)
    }, setInt8:function(a, b) {
      d(this, Int8Array, 1, a, b)
    }, setUint8:function(a, b) {
      d(this, Uint8Array, 1, a, b)
    }, setInt16:function(a, b, e) {
      d(this, Int16Array, 2, a, b, e)
    }, setUint16:function(a, b, e) {
      d(this, Uint16Array, 2, a, b, e)
    }, setInt32:function(a, b, e) {
      d(this, Int32Array, 4, a, b, e)
    }, setUint32:function(a, b, e) {
      d(this, Uint32Array, 4, a, b, e)
    }, setFloat32:function(a, b, e) {
      d(this, Float32Array, 4, a, b, e)
    }, setFloat64:function(a, b, e) {
      d(this, Float64Array, 8, a, b, e)
    }}
  }
})(this);
var Kanvas = Kanvas || function(a) {
  function b(a, d, b) {
    n(a, d, {get:function() {
      var a;
      b.get ? (a = b.get.call(this), n(this, d, {value:a, writable:b.writable, configurable:b.configurable, enumerable:b.enumerable})) : a = b.value;
      return a
    }, configurable:!0})
  }
  function d(a, d, b, e, f, g, k) {
    var l = d + Math.cos(f) * e, m = b + Math.sin(f) * e;
    a.__cmds__.push(2);
    a.__data__.push(l, m);
    k ? (f < g && (f += 2 * Math.ceil((g - f) / (2 * Math.PI)) * Math.PI), f - g > 2 * Math.PI && (g = f - 2 * Math.PI)) : (g < f && (g += 2 * Math.ceil((f - g) / (2 * Math.PI)) * Math.PI), g - f > 2 * Math.PI && (g = f + 2 * Math.PI));
    var n = Math.abs(g - f);
    for(k = k ? -1 : 1;0 < n;) {
      g = n > Math.PI / 2 ? f + Math.PI / 2 * k : f + n * k;
      var p = 4 / 3 * Math.tan((g - f) / 4) * e, l = d + Math.cos(g) * e, m = b + Math.sin(g) * e, r = d + Math.cos(f) * e + -Math.sin(f) * p;
      f = b + Math.sin(f) * e + Math.cos(f) * p;
      var s = l + Math.sin(g) * p, p = m + -Math.cos(g) * p;
      a.__cmds__.push(3);
      a.__data__.push(r, f, s, p, l, m);
      n -= Math.PI / 2;
      f = g
    }
  }
  var e = {version:"0.0.0"}, f = a.createElement("canvas"), g = f.constructor, k = f.getContext("2d"), g = g.prototype, l = Object.create(k.constructor.prototype), m = f.getContext, n = Object.defineProperty, p = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, v, s;
  try {
    v = (new SVGMatrix).constructor
  }catch(u) {
    var C = a.createElementNS("http://www.w3.org/2000/svg", "svg");
    v = function() {
      return C.createSVGMatrix()
    };
    v.prototype = SVGMatrix.prototype
  }
  "currentTransform" in k || (b(l, "__ct__", {get:function() {
    return new v
  }}), b(l, "__ctm__", {get:function() {
    return[1, 0, 0, 1, 0, 0]
  }}), n(l, "currentTransform", {get:function() {
    return this.__ct__
  }, set:function(a) {
    if(!(a instanceof v)) {
      throw new TypeError;
    }
    n(this, "__ct__", {value:a})
  }}), b(l, "__stack__", {get:function() {
    return[]
  }}), l.save = function() {
    this.__save__();
    this.__stack__.push(this.__ctm__.slice())
  }, l.restore = function() {
    this.__restore__();
    if(this.__stack__.length) {
      var a = this.__ct__, d = this.__ctm__, b = this.__stack__.pop();
      a.a = d[0] = b[0];
      a.b = d[1] = b[1];
      a.c = d[2] = b[2];
      a.d = d[3] = b[3];
      a.e = d[4] = b[4];
      a.f = d[5] = b[5]
    }
  }, l.scale = function(a, d) {
    if(!(+a != a || +d != d)) {
      this.__scale__(a, d);
      var b = this.__ct__, e = this.__ctm__;
      b.a = e[0] *= a;
      b.b = e[1] *= a;
      b.c = e[2] *= d;
      b.d = e[3] *= d
    }
  }, l.rotate = function(a) {
    if(+a == a) {
      this.__rotate__(a);
      var d = this.__ct__, b = this.__ctm__, e = Math.cos(a);
      a = Math.sin(a);
      d.a = b[0] = b[0] * e + b[2] * a;
      d.b = b[1] = b[1] * e + b[3] * a;
      d.c = b[2] = b[0] * -a + b[2] * e;
      d.d = b[3] = b[1] * -a + b[3] * e
    }
  }, l.translate = function(a, d) {
    if(!(+a != a || +d != d)) {
      this.__translate__(a, d);
      var b = this.__ct__, e = this.__ctm__;
      b.e = e[4] += e[0] * a + e[2] * d;
      b.f = e[5] += e[1] * a + e[3] * d
    }
  }, l.transform = function(a, d, b, e, f, g) {
    if(!(+a != a || +d != d || +b != b || +e != e || +f != f || +g != g)) {
      this.__transform__(a, d, b, e, f, g);
      var k = this.__ct__, l = this.__ctm__, m = l[0], n = l[1], p = l[2], r = l[3];
      k.a = l[0] = m * a + p * d;
      k.b = l[1] = n * a + r * d;
      k.c = l[2] = m * b + p * e;
      k.d = l[3] = n * b + r * e;
      k.e = l[4] += m * f + p * g;
      k.f = l[5] += n * f + r * g
    }
  }, l.setTransform = function(a, d, b, e, f, g) {
    if(!(+a != a || +d != d || +b != b || +e != e || +f != f || +g != g)) {
      this.__setTransform__(a, d, b, e, f, g);
      var k = this.__ct__, l = this.__ctm__;
      k.a = l[0] = a;
      k.b = l[1] = d;
      k.c = l[2] = b;
      k.d = l[3] = e;
      k.e = l[4] = f;
      k.f = l[5] = g
    }
  }, l.resetTransform = function() {
    this.setTransform(1, 0, 0, 1, 0, 0)
  });
  "ellipse" in k || (l.ellipse = function(a, d, b, e, f, g, k, l) {
    if(!(+a != a || +d != d || +b != b || +e != e || +g != g || +k != k)) {
      if(0 > b || 0 > e) {
        throw new IndexSizeError;
      }
      var m = Math.cos(f);
      f = Math.sin(f);
      this.save();
      this.transform(m * b, f * e, -f * b, m * e, a, d);
      this.arc(0, 0, 1, g, k, l);
      this.restore()
    }
  });
  "undefined" === typeof Path ? (s = function w(a) {
    if(!(this instanceof w)) {
      return new w(a)
    }
  }, a = Object.create(null), b(a, "__cmds__", {get:function() {
    return[]
  }}), b(a, "__data__", {get:function() {
    return[]
  }}), a.closePath = function() {
    this.__cmds__.push(0)
  }, a.moveTo = function(a, d) {
    +a != a || +d != d || (this.__cmds__.push(1), this.__data__.push(a, d))
  }, a.lineTo = function(a, d) {
    +a != a || +d != d || (this.__cmds__.push(2), this.__data__.push(a, d))
  }, a.quadraticCurveTo = function(a, d, b, e) {
    if(!(+a != a || +d != d || +b != b || +e != e)) {
      var f = this.__data__.length - 2, g = this.__data__[f], f = this.__data__[f + 1];
      a = g + 2 / 3 * (a - g);
      d = f + 2 / 3 * (d - f);
      g = a + (b - g) / 3;
      f = d + (e - f) / 3;
      this.__cmds__.push(3);
      this.__data__.push(a, d, g, f, b, e)
    }
  }, a.bezierCurveTo = function(a, d, b, e, f, g) {
    +a != a || (+d != d || +b != b || +e != e || +f != f || +g != g) || (this.__cmds__.push(3), this.__data__.push(a, d, b, e, f, g))
  }, a.arcTo = function(a, b, e, f, g, k, l) {
    if(5 < arguments.length && g !== k) {
      throw Error("Elliptical arcTo not supported");
    }
    if(!(+a != a || +b != b || +e != e || +f != f || +g != g)) {
      if(0 > g) {
        throw new IndexSizeError;
      }
      var m = this.__data__.length - 2, n = this.__data__[m], p = this.__data__[m + 1], m = (e - a) * (p - b) + (f - b) * (a - n);
      if(!m || n === a && p === b || a === e && b === f || 0 === g) {
        this.__cmds__.push(2), this.__data__.push(a, b)
      }else {
        var r = (n - a) * (n - a) + (p - b) * (p - b), s = (a - e) * (a - e) + (b - f) * (b - f), C = (r + s - ((n - e) * (n - e) + (p - f) * (p - f))) / (2 * Math.sqrt(r * s)), v = Math.sqrt(1 - C * C), C = g / ((1 - C) / v), n = (a - n) / Math.sqrt(r), v = (b - p) / Math.sqrt(r), r = (a - e) / Math.sqrt(s), u = (b - f) / Math.sqrt(s), s = a - n * C, p = b - v * C, r = a - r * C, C = b - u * C, m = 0 > m, v = s + v * g * (m ? 1 : -1), n = p - n * g * (m ? 1 : -1), u = Math.atan2(p - n, s - v), C = 
        Math.atan2(C - n, r - v);
        this.__cmds__.push(2);
        this.__data__.push(s, p);
        d(this, v, n, g, u, C, m)
      }
    }
  }, a.rect = function(a, d, b, e) {
    +a != a || (+d != d || +b != b || +e != e) || (this.__cmds__.push(1, 2, 2, 2, 0), this.__data__.push(a, d, a + b, d, a + b, d + e, a, d + e))
  }, a.arc = function(a, b, e, f, g, k) {
    if(!(+a != a || +b != b || +e != e || +f != f || +g != g)) {
      if(0 > e) {
        throw new IndexSizeError;
      }
      d(this, a, b, e, f, g, k)
    }
  }, a.ellipse = function(a, b, e, f, g, k, l, m) {
    if(!(+a != a || +b != b || +e != e || +f != f || +k != k || +l != l)) {
      if(0 > e || 0 > f) {
        throw new IndexSizeError;
      }
      Math.cos(g);
      Math.sin(g);
      d(this, 0, 0, 1, k, l, m)
    }
  }, s.prototype = a, n(l, "__draw__", {value:function(a) {
    var d = a.__cmds__;
    a = a.__data__;
    for(var b = 0, e = 0;b < d.length;b++) {
      switch(d[b]) {
        case 0:
          this.closePath();
          break;
        case 1:
          this.moveTo(a[e++], a[e++]);
          break;
        case 2:
          this.lineTo(a[e++], a[e++]);
          break;
        case 3:
          this.bezierCurveTo(a[e++], a[e++], a[e++], a[e++], a[e++], a[e++])
      }
    }
  }}), l.fill = function(a) {
    a instanceof s && (this.beginPath(), this.__draw__(a));
    this.__fill__()
  }, l.stroke = function(a) {
    a instanceof s && (this.beginPath(), this.__draw__(a));
    this.__stroke__()
  }, l.clip = function(a) {
    a instanceof s && (this.beginPath(), this.__draw__(a));
    this.__clip__()
  }, l.isPointInPath = function(a, d, b) {
    b instanceof s && (this.beginPath(), this.__draw__(b));
    this.__isPointInPath__(a, d)
  }) : s = Path;
  n(g, "__pctx__", {value:null});
  g.getContext = function(a) {
    var d = this.__pctx__;
    if(d && d !== a) {
      return null
    }
    var b;
    if("kanvas-2d" === a) {
      b = m.call(this, "2d");
      for(var e = r(l), f = 0;f < e.length;f++) {
        var g = e[f];
        if(b[g] !== l[g]) {
          g in b && (b["__" + g + "__"] = b[g]);
          var k = p(l, g);
          n(b, g, k)
        }
      }
    }else {
      b = m.apply(this, arguments)
    }
    !d && null !== b && n(b, "__pctx__", {value:b});
    return b
  };
  e.SVGMatrix = v;
  e.Path = s;
  return e
}(document), create = Object.create, defineProperty = Object.defineProperty, keys = Object.keys, isArray = Array.isArray, fromCharCode = String.fromCharCode, log = Math.log, max = Math.max, min = Math.min, pow = Math.pow, push = [].push, slice = [].slice, splice = [].splice;
function fail(a, b) {
  throw Error((b ? b + ": " : "") + a);
}
function assert(a, b, d) {
  a || fail(b, d)
}
function toStringRgba(a) {
  return"rgba(" + [a.red, a.green, a.blue, a.alpha / 255].join() + ")"
}
function toString16(a) {
  return fromCharCode(a >> 8 & 255, a & 255)
}
function toString16Le(a) {
  return fromCharCode(a & 255, a >> 8 & 255)
}
function toString32(a) {
  return toString16(a >> 16) + toString16(a)
}
for(var crcTable = [], i = 0;256 > i;i++) {
  for(var c = i, h = 0;8 > h;h++) {
    c = c & 1 ? 3988292384 ^ c >> 1 & 2147483647 : c >> 1 & 2147483647
  }
  crcTable[i] = c
}
function crc32(a) {
  for(var b = -1, d = 0, e = a.length;d < e;++d) {
    var f = (b ^ a.charCodeAt(d)) & 255, b = b >>> 8 ^ crcTable[f]
  }
  return b ^ -1
}
function createPngChunk(a, b) {
  var d = a + b;
  return toString32(b.length) + d + toString32(crc32(d))
}
function adler32(a) {
  for(var b = 1, d = 0, e = 0, f = a.length;e < f;++e) {
    b = (b + (a.charCodeAt(e) & 255)) % 65521, d = (d + b) % 65521
  }
  return d << 16 | b
}
(function() {
  eval("function t() {} t.name === 't'") || Object.defineProperty(Function.prototype, "name", {get:function() {
    if(this.__name) {
      return this.__name
    }
    var a = /function\s([^\(]+)/.exec(this.toString());
    return this.__name = a && "anonymous" !== a[1] ? a[1] : null
  }, configurable:!0, enumerable:!1})
})();
var SWF_TAG_CODE_CSM_TEXT_SETTINGS = 74, SWF_TAG_CODE_DEFINE_BINARY_DATA = 87, SWF_TAG_CODE_DEFINE_BITS = 6, SWF_TAG_CODE_DEFINE_BITS_JPEG2 = 21, SWF_TAG_CODE_DEFINE_BITS_JPEG3 = 35, SWF_TAG_CODE_DEFINE_BITS_JPEG4 = 90, SWF_TAG_CODE_DEFINE_BITS_LOSSLESS = 20, SWF_TAG_CODE_DEFINE_BITS_LOSSLESS2 = 36, SWF_TAG_CODE_DEFINE_BUTTON = 7, SWF_TAG_CODE_DEFINE_BUTTON2 = 34, SWF_TAG_CODE_DEFINE_BUTTON_CXFORM = 23, SWF_TAG_CODE_DEFINE_BUTTON_SOUND = 17, SWF_TAG_CODE_DEFINE_EDIT_TEXT = 37, SWF_TAG_CODE_DEFINE_FONT = 
10, SWF_TAG_CODE_DEFINE_FONT2 = 48, SWF_TAG_CODE_DEFINE_FONT3 = 75, SWF_TAG_CODE_DEFINE_FONT4 = 91, SWF_TAG_CODE_DEFINE_FONT_ALIGN_ZONES = 73, SWF_TAG_CODE_DEFINE_FONT_INFO = 13, SWF_TAG_CODE_DEFINE_FONT_INFO2 = 62, SWF_TAG_CODE_DEFINE_FONT_NAME = 88, SWF_TAG_CODE_DEFINE_MORPH_SHAPE = 46, SWF_TAG_CODE_DEFINE_MORPH_SHAPE2 = 84, SWF_TAG_CODE_DEFINE_SCALING_GRID = 78, SWF_TAG_CODE_DEFINE_SCENE_AND_FRAME_LABEL_DATA = 86, SWF_TAG_CODE_DEFINE_SHAPE = 2, SWF_TAG_CODE_DEFINE_SHAPE2 = 22, SWF_TAG_CODE_DEFINE_SHAPE3 = 
32, SWF_TAG_CODE_DEFINE_SHAPE4 = 83, SWF_TAG_CODE_DEFINE_SOUND = 14, SWF_TAG_CODE_DEFINE_SPRITE = 39, SWF_TAG_CODE_DEFINE_TEXT = 11, SWF_TAG_CODE_DEFINE_TEXT2 = 33, SWF_TAG_CODE_DEFINE_VIDEO_STREAM = 60, SWF_TAG_CODE_DO_ABC = 82, SWF_TAG_CODE_DO_ACTION = 12, SWF_TAG_CODE_DO_INIT_ACTION = 59, SWF_TAG_CODE_ENABLE_DEBUGGER = 58, SWF_TAG_CODE_ENABLE_DEBUGGER2 = 64, SWF_TAG_CODE_END = 0, SWF_TAG_CODE_EXPORT_ASSETS = 56, SWF_TAG_CODE_FILE_ATTRIBUTES = 69, SWF_TAG_CODE_FRAME_LABEL = 43, SWF_TAG_CODE_IMPORT_ASSETS = 
57, SWF_TAG_CODE_IMPORT_ASSETS2 = 71, SWF_TAG_CODE_JPEG_TABLES = 8, SWF_TAG_CODE_METADATA = 77, SWF_TAG_CODE_PLACE_OBJECT = 4, SWF_TAG_CODE_PLACE_OBJECT2 = 26, SWF_TAG_CODE_PLACE_OBJECT3 = 70, SWF_TAG_CODE_PROTECT = 24, SWF_TAG_CODE_REMOVE_OBJECT = 5, SWF_TAG_CODE_REMOVE_OBJECT2 = 28, SWF_TAG_CODE_SCRIPT_LIMITS = 65, SWF_TAG_CODE_SET_BACKGROUND_COLOR = 9, SWF_TAG_CODE_SET_TAB_INDEX = 66, SWF_TAG_CODE_SHOW_FRAME = 1, SWF_TAG_CODE_SOUND_STREAM_BLOCK = 19, SWF_TAG_CODE_SOUND_STREAM_HEAD = 18, SWF_TAG_CODE_SOUND_STREAM_HEAD2 = 
45, SWF_TAG_CODE_START_SOUND = 15, SWF_TAG_CODE_START_SOUND2 = 89, SWF_TAG_CODE_SYMBOL_CLASS = 76, SWF_TAG_CODE_VIDEO_FRAME = 61;
self.SWF = {};
var SI8 = 0, SI16 = 1, SI32 = 2, UI8 = 3, UI16 = 4, UI32 = 5, FIXED = 6, FIXED8 = 7, FLOAT16 = 8, FLOAT = 9, DOUBLE = 10, EncodedU32 = 11, BOOL = 12, ALIGN = 13;
function createFlexibleType(a) {
  var b = function() {
    return{$:a, args:slice.call(arguments)}
  };
  b.valueOf = function() {
    return a
  };
  return b
}
for(var SB = createFlexibleType(14), UB = createFlexibleType(15), FB = createFlexibleType(16), STRING = createFlexibleType(17), BINARY = createFlexibleType(18), RGB = {red:3, green:3, blue:3, alpha:"255"}, RGBA = {red:3, green:3, blue:3, alpha:3}, ARGB = {alpha:3, red:3, green:3, blue:3}, RECT = {$$0:13, $$bits:UB(5), $$xMin:SB("bits"), $$xMax:SB("bits"), $$yMin:SB("bits"), $$yMax:SB("bits"), left:"xMin/20", right:"xMax/20", top:"yMin/20", bottom:"yMax/20", $$1:13}, MATRIX = {$$0:13, $$hasScale:UB(1), 
$0:["hasScale", [{$$bits:UB(5), a:FB("bits"), d:FB("bits")}, {a:"1", d:"1"}]], $$hasRotate:UB(1), $1:["hasRotate", [{$$bits:UB(5), b:FB("bits"), c:FB("bits")}, {b:"0", c:"0"}]], $$bits:UB(5), $$e:SB("bits"), $$f:SB("bits"), tx:"e/20", ty:"f/20", $$1:13}, CXFORM = {$$0:13, $$hasOffsets:UB(1), $$hasMultipliers:UB(1), $$bits:UB(4), $0:["hasMultipliers", [{redMultiplier:SB("bits"), greenMultiplier:SB("bits"), blueMultiplier:SB("bits"), alphaMultiplier:["tagCode>4", [SB("bits"), "256"]]}, {redMultiplier:"256", 
greenMultiplier:"256", blueMultiplier:"256", alphaMultiplier:"256"}]], $1:["hasOffsets", [{redOffset:SB("bits"), greenOffset:SB("bits"), blueOffset:SB("bits"), alphaOffset:["tagCode>4", [SB("bits"), "0"]]}, {redOffset:"0", greenOffset:"0", blueOffset:"0", alphaOffset:"0"}]], $$1:13}, MOVIE_HEADER = {bbox:RECT, $$reserved:3, frameRate:3, frameCount:4}, EVENT = {$$flags:["swfVersion>=6", [UI32, UI16]], $eoe:"!flags", onKeyUp:"flags>>7&1", onKeyDown:"flags>>6&1", onMouseUp:"flags>>5&1", onMouseDown:"flags>>4&1", 
onMouseMove:"flags>>3&1", onUnload:"flags>>2&1", onEnterFrame:"flags>>1&1", onLoad:"flags&1", $0:["swfVersion>=6", [{onDragOver:"flags>>15&1", onRollOut:"flags>>14&1", onRollOver:"flags>>13&1", onReleaseOutside:"flags>>12&1", onRelease:"flags>>11&1", onPress:"flags>>10&1", onInitialize:"flags>>9&1", onData:"flags>>8&1", onConstruct:["swfVersion>=7", ["flags>>18&1", "0"]], $keyPress:"flags>>17&1", onDragOut:"flags>>16&1"}]], $1:["!eoe", [{$length:UI32, keyCode:["keyPress", [UI8, null]], actionsData:BINARY("length - (keyPress ? 1 : 0)")}]]}, 
FILTER_GLOW = {$$count:["type===4||type===7", [UI8, "1"]], colors:{$:RGBA, count:"count"}, higlightColor:["type===3", [RGBA]], $0:["type===4||type===7", [{ratios:{$:UI8, count:"count"}}]], blurX:6, blurY:6, $1:["type!==2", [{angle:FIXED, distance:FIXED}]], strength:7, innerShadow:UB(1), knockout:UB(1), compositeSource:UB(1), $3:["type===3", [{onTop:UB(1)}, {$$reserved:UB(1)}]], $4:["type===4||type===7", [{passes:UB(4)}, {$$reserved:UB(4)}]]}, FILTER_BLUR = {blurX:6, blurY:6, passes:UB(5), $$reserved:UB(3)}, 
FILTER_CONVOLUTION = {columns:3, rows:3, divisor:9, bias:9, weights:{$:9, count:"columns*rows"}, defaultColor:RGBA, $$reserved:UB(6), clamp:UB(1), preserveAlpha:UB(1)}, FILTER_COLORMATRIX = {matrix:{$:9, count:20}}, ANY_FILTER = {$type:3, $0:["type", {"0":FILTER_GLOW, 1:FILTER_BLUR, 2:FILTER_GLOW, 3:FILTER_GLOW, 4:FILTER_GLOW, 5:FILTER_CONVOLUTION, 6:FILTER_COLORMATRIX, 7:FILTER_GLOW}]}, FILL_SOLID = {color:["tagCode>22||isMorph", [RGBA, RGB]], colorMorph:["isMorph", [RGBA]]}, GRADIENT_RECORD = {ratio:3, 
color:["tagCode>22", [RGBA, RGB]], $0:["isMorph", [{ratioMorph:UI8, colorMorph:RGBA}]]}, GRADIENT = {$0:["tagCode===83", [{spreadMode:UB(2), interpolationMode:UB(2)}, {$$pad:UB(4)}]], $count:UB(4), records:{$:GRADIENT_RECORD, count:"count"}, $1:["type===19", [{focalPoint:FIXED8, focalPointMorph:["isMorph", [FIXED8]]}]]}, FILL_GRADIENT = {matrix:MATRIX, matrixMorph:["isMorph", [MATRIX]], $0:GRADIENT}, FILL_BITMAP = {bitmapId:4, matrix:MATRIX, matrixMorph:["isMorph", [MATRIX]], condition:"type===64||type===67"}, 
FILL_STYLE = {$type:3, $0:["type", {"0":FILL_SOLID, 16:FILL_GRADIENT, 18:FILL_GRADIENT, 19:FILL_GRADIENT, 64:FILL_BITMAP, 65:FILL_BITMAP, 66:FILL_BITMAP, 67:FILL_BITMAP}]}, FILL_STYLE_ARRAY = {$$tmp:3, $$count:["tagCode>2&&tmp===255", [UI16, "tmp"]], fillStyles:{$:FILL_STYLE, count:"count"}}, LINE_STYLE = {width:4, widthMorph:["isMorph", [UI16]], $0:["hasStrokes", [{$$:ALIGN, startCapStyle:UB(2), $joinStyle:UB(2), $hasFill:UB(1), noHscale:UB(1), noVscale:UB(1), pixelHinting:UB(1), $$reserved:UB(5), 
noClose:UB(1), endCapStyle:UB(2), miterLimitFactor:["joinStyle===2", [FIXED8]], $1:["hasFill", [{fillStyle:FILL_STYLE}, {color:RGBA, colorMorph:["isMorph", [RGBA]]}]]}, {color:["tagCode>22", [RGBA, RGB]], colorMorph:["isMorph", [RGBA]]}]]}, LINE_STYLE_ARRAY = {$$tmp:3, $$count:["tagCode>2&&tmp===255", [UI16, "tmp"]], lineStyles:{$:LINE_STYLE, count:"count"}}, STYLE_BITS = {$$:13, $$fillBits:UB(4), $$lineBits:UB(4)}, STYLES = {$0:FILL_STYLE_ARRAY, $1:LINE_STYLE_ARRAY, $2:STYLE_BITS}, SHAPE_RECORD_SETUP = 
{$hasNewStyles:["tagCode>2", ["flags>>4", "0"]], $hasLineStyle:"flags>>3&1", $hasFillStyle1:"flags>>2&1", $hasFillStyle0:"flags>>1&1", $move:"flags&1", $0:["move", [{$$bits:UB(5), moveX:SB("bits"), moveY:SB("bits")}]], fillStyle0:["hasFillStyle0", [UB("fillBits")]], fillStyle1:["hasFillStyle1", [UB("fillBits")]], lineStyle:["hasLineStyle", [UB("lineBits")]], $1:["hasNewStyles", [STYLES]]}, SHAPE_RECORD_EDGE = {$isStraight:"flags>>4", $$tmp:"flags&0x0f", $$bits:"tmp+2", $0:["isStraight", [{$isGeneral:UB(1), 
$1:["isGeneral", [{deltaX:SB("bits"), deltaY:SB("bits")}, {$isVertical:UB(1), $2:["isVertical", [{deltaY:SB("bits")}, {deltaX:SB("bits")}]]}]]}, {controlDeltaX:SB("bits"), controlDeltaY:SB("bits"), anchorDeltaX:SB("bits"), anchorDeltaY:SB("bits")}]]}, SHAPE_RECORD = {$type:UB(1), $$flags:UB(5), $eos:"!(type||flags)", $0:["type", [SHAPE_RECORD_EDGE, SHAPE_RECORD_SETUP]]}, SHAPE = {$0:STYLE_BITS, records:{$:SHAPE_RECORD, condition:"!eos"}}, SHAPE_WITH_STYLE = {$0:STYLES, records:{$:SHAPE_RECORD, condition:"!eos"}}, 
MORPH_SHAPE_WITH_STYLE = {$0:STYLES, records:{$:SHAPE_RECORD, condition:"!eos"}, $1:STYLE_BITS, recordsMorph:{$:SHAPE_RECORD, condition:"!eos"}}, KERNING = {$0:["wide", [{code1:UI16, code2:UI16}, {code1:UI8, code2:UI8}]], adjustment:4}, TEXT_ENTRY = {glyphIndex:UB("glyphBits"), advance:SB("advanceBits")}, TEXT_RECORD_SETUP = {$hasFont:"flags>>3&1", $hasColor:"flags>>2&1", $hasMoveY:"flags>>1&1", $hasMoveX:"flags&1", fontId:["hasFont", [UI16]], $0:["hasColor", [{color:["tagCode===33", [RGBA, RGB]]}]], 
moveX:["hasMoveX", [SI16]], moveY:["hasMoveY", [SI16]], fontHeight:["hasFont", [UI16]]}, TEXT_RECORD = {$$:13, $$flags:UB(8), $eot:"!flags", $0:TEXT_RECORD_SETUP, $1:["!eot", [{$$tmp:UI8, $glyphCount:["swfVersion>6", ["tmp", "tmp&0x7f"]], entries:{$:TEXT_ENTRY, count:"glyphCount"}}]]}, SOUND_ENVELOPE = {pos44:5, volumeLeft:4, volumeRight:4}, SOUND_INFO = {$$reserved:UB(2), stop:UB(1), noMultiple:UB(1), $hasEnvelope:UB(1), $hasLoops:UB(1), $hasOutPoint:UB(1), $hasInPoint:UB(1), inPoint:["hasInPoint", 
[UI32]], outPoint:["hasOutPoint", [UI32]], loopCount:["hasLoops", [UI16]], $0:["hasEnvelope", [{$envelopeCount:UI8, envelopes:{$:SOUND_ENVELOPE, count:"envelopeCount"}}]]}, BUTTON = {$$flags:3, $eob:"!flags", $0:["swfVersion>=8", [{$blend:"flags>>5&1", $hasFilters:"flags>>4&1"}, {$blend:"0", $hasFilters:"0"}]], stateHitTest:"flags>>3&1", stateDown:"flags>>2&1", stateOver:"flags>>1&1", stateUp:"flags&1", $1:["!eob", [{symbolId:UI16, depth:UI16, matrix:MATRIX, cxform:["tagCode===34", [CXFORM]], $2:["hasFilters", 
[{filterCount:UI8, filters:ANY_FILTER}]], blendMode:["blend", [UI8]]}]]}, BUTTONCONDACTION = {$$buttonCondSize:4, $$buttonConditions:4, idleToOverDown:"buttonConditions>>7&1", outDownToIdle:"buttonConditions>>6&1", outDownToOverDown:"buttonConditions>>5&1", overDownToOutDown:"buttonConditions>>4&1", overDownToOverUp:"buttonConditions>>3&1", overUpToOverDown:"buttonConditions>>2&1", overUpToIdle:"buttonConditions>>1&1", idleToOverUp:"buttonConditions&1", mouseEventFlags:"buttonConditions&511", keyPress:"buttonConditions>>9&127", 
overDownToIdle:"buttonConditions>>8&1", actionsData:["!buttonCondSize", [BINARY(0), BINARY("buttonCondSize - 4")]]}, DEFINE_BITMAP = {id:4, $format:3, width:4, height:4, hasAlpha:"tagCode===36", colorTableSize:["format===3", [UI8]], bmpData:BINARY(0)}, DEFINE_FONT = {id:4, $$firstOffset:4, $glyphCount:"firstOffset/2", $$restOffsets:{$:4, count:"glyphCount-1"}, offsets:"[firstOffset].concat(restOffsets)", glyphs:{$:SHAPE, count:"glyphCount"}}, DEFINE_FONT2 = {id:4, $hasLayout:UB(1), $0:["swfVersion>5", 
[{shiftJis:UB(1)}, {$$reserved:UB(1)}]], smallText:UB(1), ansi:UB(1), $wideOffset:UB(1), $wide:UB(1), italic:UB(1), bold:UB(1), $1:["swfVersion>5", [{language:UI8}, {$$reserved:UI8, language:"0"}]], $$nameLength:3, name:STRING("nameLength"), resolution:["tagCode===75", ["20"]], $glyphCount:4, $2:["wideOffset", [{offsets:{$:UI32, count:"glyphCount"}, mapOffset:UI32}, {offsets:{$:UI16, count:"glyphCount"}, mapOffset:UI16}]], glyphs:{$:SHAPE, count:"glyphCount"}, $3:["wide", [{codes:{$:UI16, count:"glyphCount"}}, 
{codes:{$:UI8, count:"glyphCount"}}]], $4:["hasLayout", [{ascent:UI16, descent:UI16, leading:SI16, advance:{$:SI16, count:"glyphCount"}, bbox:{$:RECT, count:"glyphCount"}, $$kerningCount:UI16, kerning:{$:KERNING, count:"kerningCount"}}]]}, DEFINE_IMAGE = {id:4, $0:["tagCode>21", [{$$alphaDataOffset:UI32, deblock:["tagCode===90", [FIXED8]], $imgData:BINARY("alphaDataOffset"), alphaData:BINARY(0)}, {$imgData:BINARY(0)}]], mimeType:["imgData[0]<<8|imgData[1]", {65496:'"image/jpeg"', 65497:'"image/jpeg"', 
35152:'"image/png"', 18249:'"image/gif"', unknown:'"application/octet-stream"'}], incomplete:["tagCode===6", ["1"]]}, DEFINE_JPEG_TABLES = {id:"0", imgData:BINARY(0), mimeType:'"application/octet-stream"'}, DEFINE_LABEL = {id:4, bbox:RECT, matrix:MATRIX, $glyphBits:3, $advanceBits:3, records:{$:TEXT_RECORD, condition:"!eot"}}, DEFINE_SHAPE = {id:4, bbox:RECT, $isMorph:"tagCode===46||tagCode===84", bboxMorph:["isMorph", [RECT]], $hasStrokes:"tagCode===83||tagCode===84", $0:["hasStrokes", [{strokeBbox:RECT, 
strokeBboxMorph:["isMorph", [RECT]], $$reserved:UB(5), fillWinding:UB(1), nonScalingStrokes:UB(1), scalingStrokes:UB(1)}]], $1:["isMorph", [{offsetMorph:UI32, $2:MORPH_SHAPE_WITH_STYLE}, {$2:SHAPE_WITH_STYLE}]]}, DEFINE_TEXT = {id:4, bbox:RECT, $$flags:4, $hasText:"flags>>7&1", wordWrap:"flags>>6&1", multiline:"flags>>5&1", password:"flags>>4&1", readonly:"flags>>3&1", $hasColor:"flags>>2&1", $hasMaxLength:"flags>>1&1", $hasFont:"flags&1", $hasFontClass:"flags>>15&1", autoSize:"flags>>14&1", $hasLayout:"flags>>13&1", 
noSelect:"flags>>12&1", border:"flags>>11&1", wasStatic:"flags>>10&1", html:"flags>>9&1", useOutlines:"flags>>8&1", fontId:["hasFont", [UI16]], fontClass:["hasFontClass", [STRING(0)]], fontHeight:["hasFont", [UI16]], color:["hasColor", [RGBA]], maxLength:["hasMaxLength", [UI16]], $0:["hasLayout", [{align:UI8, leftMargin:UI16, rightMargin:UI16, indent:SI16, leading:SI16}]], variableName:STRING(0), initialText:["hasText", [STRING(0)]]}, DEFINE_BUTTON = {id:4, $0:["tagCode==7", [{characters:{$:BUTTON, 
condition:"!eob"}, actionsData:BINARY(0)}, {$$trackFlags:UI8, trackAsMenu:"trackFlags>>7&1", $$actionOffset:UI16, characters:{$:BUTTON, condition:"!eob"}, $1:["!!actionOffset", [{buttonActions:{$:BUTTONCONDACTION, condition:"$stream.remaining() > 0"}}]]}]]}, DO_ABC = {flags:5, name:STRING(0), data:BINARY(0)}, DO_ACTION = {spriteId:["tagCode===59", [UI16]], actionsData:BINARY(0)}, FILE_ATTRIBUTES = {$$reserved:UB(1), useDirectBlit:UB(1), useGpu:UB(1), hasMetadata:UB(1), doAbc:UB(1), noCrossDomainCaching:UB(1), 
relativeUrls:UB(1), network:UB(1), $$pad:UB(24)}, PLACE_OBJECT = {$0:["tagCode>4", [{$$flags:["tagCode>26", [UI16, UI8]], $hasEvents:"flags>>7&1", $clip:"flags>>6&1", $hasName:"flags>>5&1", $hasRatio:"flags>>4&1", $hasCxform:"flags>>3&1", $hasMatrix:"flags>>2&1", $place:"flags>>1&1", $move:"flags&1", $1:["tagCode===70", [{$hasBackgroundColor:"flags>>15&1", $hasVisibility:"flags>>14&1", $hasImage:"flags>>12&1", $hasClassName:"flags>>11&1", $cache:"flags>>10&1", $blend:"flags>>9&1", $hasFilters:"flags>>8&1"}, 
{$cache:"0", $blend:"0", $hasFilters:"0"}]], depth:UI16, className:["hasClassName", [STRING(0)]], symbolId:["place", [UI16]], matrix:["hasMatrix", [MATRIX]], cxform:["hasCxform", [CXFORM]], ratio:["hasRatio", [UI16]], name:["hasName", [STRING(0)]], clipDepth:["clip", [UI16]], $2:["hasFilters", [{$$count:UI8, filters:{$:ANY_FILTER, count:"count"}}]], blendMode:["blend", [UI8]], bmpCache:["cache", [UI8]], $3:["hasEvents", [{$$reserved:UI16, $$allFlags:["swfVersion>=6", [UI32, UI16]], events:{$:EVENT, 
condition:"!eoe"}}]], backgroundColor:["hasBackgroundColor", ["ARGB"]], visibility:["hasVisibility", [UI8]]}, {place:"1", symbolId:UI16, depth:UI16, hasMatrix:"1", matrix:MATRIX, $1:["$stream.remaining()", [{hasCxform:"1", cxform:CXFORM}]]}]]}, REMOVE_OBJECT = {symbolId:["tagCode===5", [UI16]], depth:4}, SET_BACKGROUND_COLOR = {color:RGB}, SYMBOL_CLASS = {$$symbolCount:4, exports:{$:{symbolId:4, className:STRING(0)}, count:"symbolCount"}}, FRAME_LABEL = {name:STRING(0)}, DEFINE_SOUND = {id:4, $$soundFlags:3, 
soundFormat:"soundFlags>>4&15", soundRate:"soundFlags>>2&3", soundSize:"soundFlags>>1&1", soundType:"soundFlags&1", samplesCount:5, soundData:BINARY(0)}, START_SOUND = {soundId:["tagCode == 15", [UI16]], soundClassName:["tagCode == 89", [STRING(0)]], soundInfo:SOUND_INFO}, SOUND_STREAM_HEAD = {$$playbackFlags:3, playbackRate:"playbackFlags>>2&3", playbackSize:"playbackFlags>>1&1", playbackType:"playbackFlags&1", $$streamFlags:3, $streamCompression:"streamFlags>>4&15", streamRate:"streamFlags>>2&3", 
streamSize:"streamFlags>>1&1", streamType:"streamFlags&1", samplesCount:5, latencySeek:["streamCompression == 2", [SI16]]}, SOUND_STREAM_BLOCK = {data:BINARY(0)}, codeLengthOrder = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], distanceCodes = [], distanceExtraBits = [], j = i = 0, code = 1;30 > i;++i) {
  distanceCodes[i] = code, code += 1 << (distanceExtraBits[i] = ~~((j += 2 < i ? 1 : 0) / 2))
}
for(var bitLengths = [], i = 0;32 > i;++i) {
  bitLengths[i] = 5
}
for(var fixedDistanceTable = makeHuffmanTable(bitLengths), lengthCodes = [], lengthExtraBits = [], j = i = 0, code = 3;29 > i;++i) {
  lengthCodes[i] = code - (28 == i ? 1 : 0), code += 1 << (lengthExtraBits[i] = ~~((j += 4 < i ? 1 : 0) / 4 % 6))
}
for(i = 0;288 > i;++i) {
  bitLengths[i] = 144 > i || 279 < i ? 8 : 256 > i ? 9 : 7
}
var fixedLiteralTable = makeHuffmanTable(bitLengths);
function makeHuffmanTable(a) {
  for(var b = max.apply(null, a), d = a.length, e = 1 << b, f = new Uint32Array(e), g = 0, k = 1, l = 2;k <= b;g <<= 1, ++k, l <<= 1) {
    for(var m = 0;m < d;++m) {
      if(a[m] === k) {
        for(var n = 0, p = 0;p < k;++p) {
          n = 2 * n + (g >> p & 1)
        }
        for(p = n;p < e;p += l) {
          f[p] = k << 16 | m
        }
        ++g
      }
    }
  }
  return{codes:f, maxBits:b}
}
function verifyDeflateHeader() {
}
function createInflatedStream(a, b) {
  verifyDeflateHeader(a);
  var d = new Stream(a, 2), e = {data:new Uint8Array(b), available:0, completed:!1}, f = {};
  do {
    inflateBlock(d, e, f)
  }while(!e.completed && d.pos < d.end);
  return new Stream(e.data, 0, e.available)
}
var InflateNoDataError = {};
function inflateBlock(a, b, d) {
  var e = "header" in d ? d.header : d.header = readBits(a.bytes, a, 3);
  switch(e >> 1) {
    case 0:
      a.align();
      var f = a.pos;
      if(4 > a.end - f) {
        throw InflateNoDataError;
      }
      var g = a.getUint16(f, !0);
      a.getUint16(f + 2, !0);
      if(a.end - f < 4 + g) {
        throw InflateNoDataError;
      }
      var k = f + 4, l = a.pos = k + g, f = a.bytes;
      splice.apply(b.data, [b.available, g].concat(slice.call(f, k, l)));
      b.available += g;
      break;
    case 1:
      inflate(a, b, fixedLiteralTable, fixedDistanceTable, d);
      break;
    case 2:
      if("distanceTable" in d) {
        f = d.distanceTable, g = d.literalTable
      }else {
        var f = a.bytes, k = a.pos, l = a.bitBuffer, m = a.bitLength;
        try {
          for(var g = [], n = readBits(f, a, 5) + 257, p = readBits(f, a, 5) + 1, r = n + p, v = readBits(f, a, 4) + 4, s = 0;19 > s;++s) {
            g[codeLengthOrder[s]] = s < v ? readBits(f, a, 3) : 0
          }
          for(var u = makeHuffmanTable(g), g = [], v = s = 0;s < r;) {
            var C = 1, q = readCode(f, a, u);
            switch(q) {
              case 16:
                C = readBits(f, a, 2) + 3;
                q = v;
                break;
              case 17:
                C = readBits(f, a, 3) + 3;
                q = 0;
                break;
              case 18:
                C = readBits(f, a, 7) + 11;
                q = 0;
                break;
              default:
                v = q
            }
            for(;C--;) {
              g[s++] = q
            }
          }
        }catch(w) {
          throw a.pos = k, a.bitBuffer = l, a.bitLength = m, w;
        }
        f = d.distanceTable = makeHuffmanTable(g.splice(n, p));
        g = d.literalTable = makeHuffmanTable(g)
      }
      inflate(a, b, g, f, d);
      delete d.distanceTable;
      delete d.literalTable;
      break;
    default:
      fail("unknown block type", "inflate")
  }
  delete d.header;
  b.completed = !!(e & 1)
}
function readBits(a, b, d) {
  var e = b.bitBuffer, f = b.bitLength;
  if(d > f) {
    var g = b.pos, k = b.end;
    do {
      if(g >= k) {
        throw b.pos = g, b.bitBuffer = e, b.bitLength = f, InflateNoDataError;
      }
      e |= a[g++] << f;
      f += 8
    }while(d > f);
    b.pos = g
  }
  b.bitBuffer = e >>> d;
  b.bitLength = f - d;
  return e & (1 << d) - 1
}
function inflate(a, b, d, e, f) {
  var g = b.available, k = b.data, l = a.bytes, m = "sym" in f ? f.sym : readCode(l, a, d);
  for(;256 !== m;) {
    if(256 > m) {
      k[g++] = m
    }else {
      f.sym = m;
      var m = m - 257, m = "len" in f ? f.len : f.len = lengthCodes[m] + readBits(l, a, lengthExtraBits[m]), n = "sym2" in f ? f.sym2 : f.sym2 = readCode(l, a, e), n = distanceCodes[n] + readBits(l, a, distanceExtraBits[n]), n = g - n;
      for(;m--;) {
        k[g++] = k[n++]
      }
      delete f.sym2;
      delete f.len;
      delete f.sym
    }
    b.available = g;
    m = readCode(l, a, d)
  }
}
function readCode(a, b, d) {
  var e = b.bitBuffer, f = b.bitLength, g = d.maxBits;
  if(g > f) {
    var k = b.pos, l = b.end;
    do {
      if(k >= l) {
        throw b.pos = k, b.bitBuffer = e, b.bitLength = f, InflateNoDataError;
      }
      e |= a[k++] << f;
      f += 8
    }while(g > f);
    b.pos = k
  }
  a = d.codes[e & (1 << g) - 1];
  d = a >> 16;
  b.bitBuffer = e >>> d;
  b.bitLength = f - d;
  return a & 65535
}
var StreamNoDataError = {}, Stream = function() {
  function a() {
    this.bitBuffer = this.bitLength = 0
  }
  function b(a) {
    if(this.pos + a > this.end) {
      throw StreamNoDataError;
    }
  }
  function d() {
    return this.end - this.pos
  }
  function e(a, d) {
    var b = new g(this.bytes);
    b.pos = a;
    b.end = d;
    return b
  }
  function f(a) {
    var d = this.bytes, b = this.end + a.length;
    if(b > d.length) {
      throw"stream buffer overfow";
    }
    d.set(a, this.end);
    this.end = b
  }
  function g(g, l, m, n) {
    void 0 === l && (l = 0);
    g.buffer instanceof ArrayBuffer && (l += g.byteOffset, g = g.buffer);
    void 0 === m && (m = g.byteLength - l);
    void 0 === n && (n = m);
    var p = new Uint8Array(g, l, n);
    g = new DataView(g, l, n);
    g.bytes = p;
    g.pos = 0;
    g.end = m;
    g.bitBuffer = 0;
    g.bitLength = 0;
    g.align = a;
    g.ensure = b;
    g.remaining = d;
    g.substream = e;
    g.push = f;
    return g
  }
  return g
}();
function readSi8(a, b) {
  return b.getInt8(b.pos++)
}
function readSi16(a, b) {
  return b.getInt16(b.pos, b.pos += 2)
}
function readSi32(a, b) {
  return b.getInt32(b.pos, b.pos += 4)
}
function readUi8(a, b) {
  return a[b.pos++]
}
function readUi16(a, b) {
  return b.getUint16(b.pos, b.pos += 2)
}
function readUi32(a, b) {
  return b.getUint32(b.pos, b.pos += 4)
}
function readFixed(a, b) {
  return b.getInt32(b.pos, b.pos += 4) / 65536
}
function readFixed8(a, b) {
  return b.getInt16(b.pos, b.pos += 2) / 256
}
function readFloat16(a, b) {
  var d = b.getUint16(b.pos);
  b.pos += 2;
  var e = d >> 15 ? -1 : 1, f = (d & 31744) >> 10, d = d & 1023;
  return!f ? e * pow(2, -14) * (d / 1024) : 31 === f ? d ? NaN : Infinity * e : e * pow(2, f - 15) * (1 + d / 1024)
}
function readFloat(a, b) {
  return b.getFloat32(b.pos, b.pos += 4)
}
function readDouble(a, b) {
  return b.getFloat64(b.pos, b.pos += 8)
}
function readEncodedU32(a, b) {
  var d = a[b.pos++];
  if(!(d & 128)) {
    return d
  }
  d |= a[b.pos++] << 7;
  if(!(d & 16384)) {
    return d
  }
  d |= a[b.pos++] << 14;
  if(!(d & 2097152)) {
    return d
  }
  d |= a[b.pos++] << 21;
  return!(d & 268435456) ? d : d | a[b.pos++] << 28
}
function readBool(a, b) {
  return!!a[b.pos++]
}
function align(a, b) {
  b.align()
}
function readSb(a, b, d) {
  return readUb(a, b, d) << 32 - d >> 32 - d
}
for(var masks = new Uint32Array(33), i = 1, mask = 0;32 >= i;++i) {
  masks[i] = mask = mask << 1 | 1
}
function readUb(a, b, d) {
  for(var e = b.bitBuffer, f = b.bitLength;d > f;) {
    e = e << 8 | a[b.pos++], f += 8
  }
  f -= d;
  a = e >>> f & masks[d];
  b.bitBuffer = e;
  b.bitLength = f;
  return a
}
function readFb(a, b, d) {
  return readSb(a, b, d) / 65536
}
function readString(a, b, d) {
  var e = [], f = b.pos;
  if(d) {
    e = slice.call(a, f, f += d)
  }else {
    d = 0;
    for(var g;g = a[f++];d++) {
      e[d] = g
    }
  }
  b.pos = f;
  a = d / 65536;
  b = "";
  for(d = 0;d < a;++d) {
    f = 65536 * d, f = e.slice(f, f + 65536), b += fromCharCode.apply(null, f)
  }
  return decodeURIComponent(escape(b.replace("\x00", "", "g")))
}
function readBinary(a, b, d) {
  return a.subarray(b.pos, b.pos = d ? b.pos + d : b.end)
}
var defaultTemplateSet = [readSi8, readSi16, readSi32, readUi8, readUi16, readUi32, readFixed, readFixed8, readFloat16, readFloat, readDouble, readEncodedU32, readBool, align, readSb, readUb, readFb, readString, readBinary], rtemplate = /^function\s*(.*)\s*\(([^)]*)\)\s*{\s*([\s\S]*.)\s*}$/, rinlinable = /^return\s*([^;]*)$/;
function generateParser(a) {
  var b = [], d = 0;
  (function g(a, e) {
    "object" !== typeof a || "$" in a ? (a = {$$:a}, e = void 0) : e || (e = "$" + d++);
    var m = [], n;
    for(n in a) {
      var p = a[n];
      if("object" === typeof p && void 0 != p.$) {
        var r = p, p = r.$
      }else {
        r = {}
      }
      var v = !1, s = !1, u = !1;
      "$" === n[0] && (+n[1] == n[1] ? s = v = !0 : (u = !0, "$" === n[1] && (s = !0)), n = n.replace(/^\$\$?\d*/, ""));
      var C = [];
      n && (u && C.push("var " + n + "="), s || C.push(e + "." + n + "="));
      if(r.count || "length" in r || r.condition) {
        if(u) {
          var q = n
        }else {
          q = "$" + d++, C.unshift("var " + q + "=")
        }
        C.push("[]");
        if(r.count) {
          var w = "$" + d++;
          C.push("var " + w + "=" + r.count);
          C.push("while(" + w + "--){")
        }else {
          if("length" in r) {
            var w = "$" + d++, x = r.length;
            0 >= x && (x = "$stream.remaining()+" + x);
            C.push("var " + w + "=$stream.pos+" + x + "");
            C.push("while($stream.pos<" + w + "){")
          }else {
            C.push("do{")
          }
        }
        (p = g(p)) ? (C.push("var " + p + "={}"), C.push(b.pop()), C.push(q + ".push(" + p + ")}")) : (C.push(q + ".push("), C.push(b.pop()), C.push(")}"));
        r.condition && C.push("while(" + r.condition + ")")
      }else {
        switch(typeof p) {
          case "number":
            p = defaultTemplateSet[p], "function" === typeof p && (w = rtemplate.exec(p), p = w[1], q = w[2].split(", "), w = w[3].split("\n"), x = !0, q.length - 2 && (r = r.args, q.splice(2, r.length, r), x = !1), p = x && rinlinable.test(w) ? RegExp.$1 : p + "(" + q.join(",") + ")");
          case "string":
            C.push(p);
            break;
          case "object":
            var H = C.splice(0).join(""), r = function(a) {
              a = g(a, v ? e : u && n);
              var d = H;
              !v && a && (!u && !s && (d = "var " + a + "=" + d), d += "{}");
              C.push(d);
              C.push(b.pop())
            };
            if(isArray(p)) {
              if(w = p[0], p = p[1], isArray(p)) {
                C.push("if(" + w + "){"), r(p[0]), C.push("}"), p[1] && (C.push("else{"), r(p[1]), C.push("}"))
              }else {
                q = keys(p);
                C.push("switch(" + w + "){");
                for(x = 0;w = q[x++];) {
                  "unknown" !== w && (C.push("case " + w + ":"), p[w] != p[q[x]] && (r(p[w]), C.push("break")))
                }
                C.push("default:");
                "unknown" in p && r(p.unknown);
                C.push("}")
              }
            }else {
              r(p)
            }
            break;
          default:
            fail("invalid type", "generate")
        }
      }
      push.apply(m, C)
    }
    b.push(m.join("\n"));
    return e
  })(a, "$");
  var e = ["$bytes", "$stream", "$"];
  1 < arguments.length && push.apply(e, slice.call(arguments, 1));
  return(0,eval)("(function(" + e.join(",") + "){\n$||($={})\n" + b.join("\n") + "\nreturn $\n})")
}
var FORMAT_COLORMAPPED = 3, FORMAT_15BPP = 4, FORMAT_24BPP = 5, FACTOR_5BBP = 255 / 31;
function rgbToString(a, b) {
  return fromCharCode(a[b], a[b + 1], a[b + 2])
}
function argbToString(a, b) {
  var d = a[b];
  if(!d) {
    return"\x00\x00\x00\x00"
  }
  var e = d / 255;
  return fromCharCode(0 | a[b + 1] / e, 0 | a[b + 2] / e, 0 | a[b + 3] / e, d)
}
function defineBitmap(a) {
  var b = a.width, d = a.height, e = a.hasAlpha, f = "", g = "", k = "", l = a.bmpData;
  switch(a.format) {
    case 3:
      var m = "\u0003", n = b + 3 & -4, f = (a.colorTableSize + 1) * (a.hasAlpha ? 4 : 3), p = f + n * d, r = createInflatedStream(l, p), v = r.bytes, l = 0, s = "";
      r.ensure(f);
      if(e) {
        for(g = "";l < f;) {
          s += rgbToString(v, l), l += 3, g += fromCharCode(v[l++])
        }
        g = createPngChunk("tRNS", g)
      }else {
        for(;l < f;) {
          s += rgbToString(v, l), l += 3
        }
      }
      for(f = createPngChunk("PLTE", s);l < p;) {
        r.ensure(n);
        e = l;
        e = slice.call(v, e, e + b);
        if(5 == e[0] && 5 == e[2]) {
          debugger
        }
        k += "\x00" + fromCharCode.apply(null, e);
        r.pos = l += n
      }
      break;
    case 4:
      m = "\u0002";
      n = 2 * b + 3 & -4;
      r = createInflatedStream(l, n * d);
      for(p = l = 0;p < d;++p) {
        k += "\x00";
        r.ensure(n);
        for(e = 0;e < b;++e) {
          v = r.getUint16(l), l += 2, k += fromCharCode(0 | FACTOR_5BBP * (v >> 10 & 31), 0 | FACTOR_5BBP * (v >> 5 & 31), 0 | FACTOR_5BBP * (v & 31))
        }
        r.pos = l += n
      }
      break;
    case 5:
      if(e) {
        var m = "\u0006", s = 0, u = argbToString
      }else {
        m = "\u0002", s = 1, u = rgbToString
      }
      n = 4 * b;
      r = createInflatedStream(l, n * d);
      v = r.bytes;
      for(p = l = 0;p < d;++p) {
        r.ensure(n);
        k += "\x00";
        for(e = 0;e < b;++e) {
          l += s, k += u(v, l), l += 4 - s
        }
        r.pos = l
      }
      break;
    default:
      fail("invalid format", "bitmap")
  }
  m = toString32(b) + toString32(d) + "\b" + m + "\x00\x00\x00";
  n = "x\u009c";
  r = k.length;
  for(l = 0;65535 < r;) {
    n += "\x00\u00ff\u00ff\x00\x00" + k.substring(l, l + 65535), l += 65535, r -= 65535
  }
  n += "\u0001" + toString16Le(r) + toString16Le(~r & 65535) + k.substring(l);
  n += toString32(adler32(k));
  k = "\u0089PNG\r\n\u001a\n" + createPngChunk("IHDR", m) + f + g + createPngChunk("IDAT", n) + createPngChunk("IEND", "");
  return{type:"image", id:a.id, width:b, height:d, mimeType:"image/png", data:k}
}
function defineButton(a, b) {
  for(var d = a.characters, e = {up:{}, over:{}, down:{}, hitTest:{}}, f = 0;(character = d[f++]) && !character.eob;) {
    var g = {symbolId:b[character.symbolId].id, hasMatrix:!!character.matrix, matrix:character.matrix};
    character.stateUp && (e.up[character.depth] = g);
    character.stateOver && (e.over[character.depth] = g);
    character.stateDown && (e.down[character.depth] = g);
    character.stateHitTest && (e.hitTest[character.depth] = g)
  }
  return{type:"button", id:a.id, buttonActions:a.buttonActions, states:e}
}
var nextFontId = 1;
function maxPower2(a) {
  for(var b = 0;2 <= a;) {
    a /= 2, ++b
  }
  return pow(2, b)
}
function defineFont(a) {
  var b = {}, d = [], e = {}, f = [], g = a.glyphs, k = g.length;
  if(a.codes) {
    for(var d = d.concat(a.codes), l = 0, m;m = d[l];++l) {
      e[m] = l
    }
    d.sort(function(a, d) {
      return a - d
    });
    for(l = 0;m = d[l++];) {
      for(var n = m, p = n, r = [l - 1];(m = d[l]) && p + 1 === m;) {
        ++p, r.push(l), ++l
      }
      f.push([n, p, r])
    }
  }else {
    r = [];
    for(l = 0;l < k;l++) {
      m = 57344 + l, d.push(m), e[m] = l, r.push(l)
    }
    f.push([57344, 57344 + k - 1, r])
  }
  var r = a.ascent || 1024, v = a.descent || 1024;
  b["OS/2"] = "\x00\u0001\x00\x00" + toString16(a.bold ? 700 : 400) + "\x00\u0005\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00ALF " + toString16((a.italic ? 1 : 0) | (a.bold ? 32 : 0)) + toString16(d[0]) + toString16(d[d.length - 1]) + toString16(r) + toString16(v) + "\x00\x00" + toString16(r) + toString16(v) + "\x00\x00\x00\x00\x00\x00\x00\x00";
  for(var s = "", u = "", C = "", q = "", l = 0, w;w = f[l++];) {
    n = w[0], p = w[1], m = w[2][0], s += toString16(n), u += toString16(p), C += toString16(m - n + 1 & 65535), q += toString16(0)
  }
  u += "\u00ff\u00ff";
  s += "\u00ff\u00ff";
  C += "\x00\u0001";
  q += "\x00\x00";
  f = f.length + 1;
  l = 2 * maxPower2(f);
  n = 2 * f - l;
  l = "\x00\x00" + toString16(2 * f) + toString16(l) + toString16(log(f) / log(2)) + toString16(n) + u + "\x00\x00" + s + C + q;
  b.cmap = "\x00\x00\x00\u0001\x00\u0003\x00\u0001\x00\x00\x00\f\x00\u0004" + toString16(l.length + 4) + l;
  n = "\x00\u0001\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x001\x00";
  u = "\x00\x00";
  f = a.resolution || 1;
  s = 16;
  C = 0;
  p = [];
  w = [];
  for(var x = [], H = [], l = q = 0;m = d[l++];) {
    var y = g[e[m]].records;
    m = 1;
    for(var t = 0, N = "", L = "", M = "", J = "", O = 0, A = 0, D = 1024, z = -1024, E = 1024, Q = -1024, F = 0, B;B = y[F];++F) {
      if(B.type) {
        if(B.isStraight) {
          if(B.isGeneral) {
            var L = L + "\u0001", G = B.deltaX / f;
            B = -B.deltaY / f;
            M += toString16(G);
            J += toString16(B);
            O += G;
            A += B
          }else {
            B.isVertical ? (L += "\u0011", B = -B.deltaY / f, J += toString16(B), A += B) : (L += "!", G = B.deltaX / f, M += toString16(G), O += G)
          }
        }else {
          var L = L + "\x00", K = B.controlDeltaX / f, I = -B.controlDeltaY / f, M = M + toString16(K), J = J + toString16(I), L = L + "\u0001", G = B.anchorDeltaX / f;
          B = -B.anchorDeltaY / f;
          M += toString16(G);
          J += toString16(B);
          ++t;
          O += K + G;
          A += I + B
        }
      }else {
        if(B.eos) {
          break
        }
        B.move && (t && (++m, N += toString16(t - 1)), L += "\u0001", K = B.moveX / f, I = -B.moveY / f, G = K - O, B = I - A, M += toString16(G), J += toString16(B), O = K, A = I, t > C && (C = t))
      }
      O < D && (D = O);
      O > z && (z = O);
      A < E && (E = A);
      A > Q && (Q = A);
      ++t
    }
    N += toString16((t || 1) - 1);
    F || (D = z = E = Q = 0, L += "1");
    y = toString16(m) + toString16(D) + toString16(E) + toString16(z) + toString16(Q) + N + "\x00\x00" + L + M + J;
    y.length & 1 && (y += "\x00");
    n += y;
    u += toString16(s / 2);
    s += y.length;
    p.push(D);
    w.push(z);
    x.push(E);
    H.push(Q);
    m > q && (q = m);
    t > C && (C = t)
  }
  u += toString16(s / 2);
  b.glyf = n;
  b.head = "\x00\u0001\x00\x00\x00\u0001\x00\x00\x00\x00\x00\x00_\u000f<\u00f5\x00\v\u0004\x00\x00\x00\x00\x00" + toString32(+new Date) + "\x00\x00\x00\x00" + toString32(+new Date) + toString16(min.apply(null, p)) + toString16(min.apply(null, x)) + toString16(max.apply(null, w)) + toString16(max.apply(null, H)) + toString16((a.italic ? 2 : 0) | (a.bold ? 1 : 0)) + "\x00\b\x00\u0002\x00\x00\x00\x00";
  g = a.advance;
  f = a.resolution || 1;
  b.hhea = "\x00\u0001\x00\x00" + toString16(r) + toString16(v) + "\x00\x00" + toString16(g ? max.apply(null, g) : 1024) + "\x00\x00\x00\x00\u0003\u00b8\x00\u0001\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00" + toString16(k + 1);
  r = "\x00\x00\x00\x00";
  for(l = 0;l < k;++l) {
    r += toString16(g ? g[l] / f : 1024) + "\x00\x00"
  }
  b.hmtx = r;
  if(a.kerning) {
    g = a.kerning;
    r = g.length;
    l = 2 * maxPower2(r);
    r = "\x00\x00\x00\u0001\x00\x00" + toString16(14 + 6 * r) + "\x00\u0001" + toString16(r) + toString16(l) + toString16(log(r) / log(2)) + toString16(2 * r - l);
    for(l = 0;B = g[l++];) {
      r += toString16(e[B.code1]) + toString16(e[B.code2]) + toString16(B.adjustment)
    }
    b.kern = r
  }
  b.loca = u;
  b.maxp = "\x00\u0001\x00\x00" + toString16(k + 1) + toString16(C) + toString16(q) + "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00";
  e = "swf-font-" + nextFontId++;
  l = a.name || e;
  k = l.replace(/ /g, "");
  r = [a.copyright || "Original licence", l, "Unknown", e, l, "1.0", k, "Unknown", "Unknown", "Unknown"];
  l = r.length;
  g = "\x00\x00" + toString16(l) + toString16(12 * l + 6);
  for(l = s = 0;v = r[l++];) {
    g += "\x00\u0001\x00\x00\x00\x00" + toString16(l - 1) + toString16(v.length) + toString16(s), s += v.length
  }
  b.name = g + r.join("");
  b.post = "\x00\u0003\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00";
  r = keys(b);
  l = r.length;
  v = "\x00\u0001\x00\x00" + toString16(l) + "\x00\u0080\x00\u0003\x00 ";
  u = "";
  s = 16 * l + v.length;
  for(l = 0;g = r[l++];) {
    C = b[g];
    q = C.length;
    for(v += g + "\x00\x00\x00\x00" + toString32(s) + toString32(q);q & 3;) {
      C += "\x00", ++q
    }
    for(u += C;s & 3;) {
      ++s
    }
    s += q
  }
  return{type:"font", id:a.id, name:k + e, codes:d, data:v + u}
}
for(var plte = createPngChunk("PLTE", Array(769).join("\x00")), alphaValues = [], i = 0;256 > i;++i) {
  alphaValues.push(i)
}
var trns = createPngChunk("tRNS", fromCharCode.apply(null, alphaValues));
function getUint16(a, b) {
  return a[b] << 8 | a[b + 1]
}
function defineImage(a, b) {
  var d = a.imgData, e = "", f;
  if("image/jpeg" === a.mimeType) {
    var g = 0, k = 0, l = 0, m = d.length, n;
    do {
      for(var p = l;255 !== d[l];) {
        ++l
      }
      for(;255 === d[l];) {
        ++l
      }
      n = d[l++];
      if(218 === n) {
        l = m
      }else {
        if(217 === n) {
          l += 2;
          continue
        }else {
          if(208 > n || 216 < n) {
            var r = getUint16(d, l);
            192 <= n && 195 >= n && (k = getUint16(d, l + 3), g = getUint16(d, l + 5));
            l += r
          }
        }
      }
      n = slice.call(d, p, l);
      for(var r = n.length / 65536, v = 0;v < r;++v) {
        var p = 65536 * v, s = p + 65536, p = n.slice(p, s), e = e + fromCharCode.apply(null, p)
      }
    }while(l < m);
    if(d = a.alphaData) {
      f = createInflatedStream(d, g * k).bytes
    }
    a.incomplete && (d = b[0].data) && (e = d.substr(0, d.length - 2) + e.substr(2))
  }else {
    r = d.length / 65536;
    for(l = 0;l < r;++l) {
      p = 65536 * l, s = p + 65536, p = slice.call(d, p, s), e += fromCharCode.apply(null, p)
    }
  }
  e = {type:"image", id:a.id, width:g, height:k, mimeType:a.mimeType, data:e};
  f && (e.mask = f);
  return e
}
function defineLabel(a, b) {
  for(var d = a.records, e = a.matrix, f = ["c.save()", "c.transform(" + [e.a, e.b, e.c, e.d, e.tx, e.ty].join() + ")", "c.scale(0.05, 0.05)"], e = [], g = 0, k = 0, l = 0, m;(m = d[l++]) && !m.eot;) {
    if(m.hasFont) {
      var n = b[m.fontId], p = n.codes;
      f.push('c.font="' + m.fontHeight + "px '" + n.name + "'\"");
      e.push(n.id)
    }
    m.hasColor && f.push('c.fillStyle="' + toStringRgba(m.color) + '"');
    m.hasMoveX && (g = m.moveX);
    m.hasMoveY && (k = m.moveY);
    m = m.entries;
    for(var n = 0, r;r = m[n++];) {
      var v = p[r.glyphIndex], v = 32 <= v && 34 != v && 92 != v ? fromCharCode(v) : "\\u" + (v + 65536).toString(16).substring(1);
      f.push('c.fillText("' + v + '",' + g + "," + k + ")");
      g += r.advance
    }
  }
  f.push("c.restore()");
  d = {type:"label", id:a.id, bbox:a.bbox, data:f.join("\n")};
  e.length && (d.require = e);
  return d
}
var GRAPHICS_FILL_CLIPPED_BITMAP = 65, GRAPHICS_FILL_FOCAL_RADIAL_GRADIENT = 19, GRAPHICS_FILL_LINEAR_GRADIENT = 16, GRAPHICS_FILL_NONSMOOTHED_CLIPPED_BITMAP = 67, GRAPHICS_FILL_NONSMOOTHED_REPEATING_BITMAP = 66, GRAPHICS_FILL_RADIAL_GRADIENT = 18, GRAPHICS_FILL_REPEATING_BITMAP = 64, GRAPHICS_FILL_SOLID = 0, GRAPHICS_PATH_COMMAND_CUBIC_CURVE_TO = 6, GRAPHICS_PATH_COMMAND_CURVE_TO = 3, GRAPHICS_PATH_COMMAND_LINE_TO = 2, GRAPHICS_PATH_COMMAND_MOVE_TO = 1, GRAPHICS_PATH_COMMAND_WIDE_LINE_TO = 5, GRAPHICS_PATH_COMMAND_WIDE_MOVE_TO = 
4;
function morph(a, b) {
  return!isNaN(b) && b !== a ? a + "+" + (b - a) + "*r" : a
}
function morphColor(a, b) {
  return"(" + morph(a.red, b.red) + ")<<16|(" + morph(a.green, b.green) + ")<<8|(" + morph(a.blue, b.blue) + ")"
}
function toColorProperties(a, b) {
  return b ? "color:" + morphColor(a, b) + ",alpha:" + morph(a.alpha / 255, b.alpha / 255) : a ? "color:" + (a.red << 16 | a.green << 8 | a.blue) + ",alpha:" + a.alpha / 255 : "color: 0, alpha: 1"
}
function toMatrixInstance(a, b) {
  return b ? '{__class__:"flash.geom.Matrix",a:' + morph(20 * a.a, 20 * b.a) + ",b:" + morph(20 * a.b, 20 * b.b) + ",c:" + morph(20 * a.c, 20 * b.c) + ",d:" + morph(20 * a.d, 20 * b.d) + ",tx:" + morph(a.tx, b.tx) + ",ty:" + morph(a.ty, b.ty) + "}" : '{__class__:"flash.geom.Matrix",a:' + 20 * a.a + ",b:" + 20 * a.b + ",c:" + 20 * a.c + ",d:" + 20 * a.d + ",tx:" + 20 * a.tx + ",ty:" + 20 * a.ty + "}"
}
function defineShape(a, b) {
  for(var d = a.records, e = a.isMorph, f = e ? a.recordsMorph : [], g = a.fillStyles, k = a.lineStyles, l = {}, m = {}, n = [], p = [], r = 0, v = 0, s = 0, u = 0, C = 0, q = 0, w = 0, x = 0, H = "0,0", y = [], t = 0, N = 0, L = 0, M = 0, J = 0, O = 0, A = 0, D;D = d[O];++O) {
    if(D.type) {
      var r = s, v = u, C = w, q = x, z = {i:O, spt:H};
      D.isStraight ? (D.isGeneral ? (s += D.deltaX, u += D.deltaY) : D.isVertical ? u += D.deltaY : s += D.deltaX, e && (D = f[A++], D.isStraight ? D.isGeneral ? (w += D.deltaX, x += D.deltaY) : D.isVertical ? x += D.deltaY : w += D.deltaX : (C += D.controlDeltaX, q += D.controlDeltaY, w = C + D.anchorDeltaX, x = q + D.anchorDeltaY, z.cpt = morph(r + (s - r) / 2, C) + "," + morph(v + (u - v) / 2, q)))) : (H = r + D.controlDeltaX, v += D.controlDeltaY, s = H + D.anchorDeltaX, u = v + D.anchorDeltaY, 
      e ? (D = f[A++], D.isStraight ? (D.isGeneral ? (w += D.deltaX, x += D.deltaY) : D.isVertical ? x += D.deltaY : w += D.deltaX, C += (w - C) / 2, q += (x - q) / 2) : (C += D.controlDeltaX, q += D.controlDeltaY, w = C + D.anchorDeltaX, x = q + D.anchorDeltaY), z.cpt = morph(H, C) + "," + morph(v, q)) : z.cpt = H + "," + v);
      H = e ? morph(s, w) + "," + morph(u, x) : s + "," + u;
      z.dpt = H;
      y.push(z)
    }else {
      y.length && (L && ((z = l[t + L]) || (z = l[t + L] = []), z.push({i:O, spt:y[0].spt, dpt:H, edges:y})), M && ((z = l[t + M]) || (z = l[t + M] = []), z.push({i:O, spt:y[y.length - 1].dpt, dpt:y[0].spt, edges:y, flip:!0})), J && ((z = m[N + J]) || (z = m[N + J] = []), z.push({i:O, spt:y[0].spt, dpt:H, edges:y})), y = []);
      if(D.eos) {
        break
      }
      D.hasNewStyles && (t = g.length, N = k.length, push.apply(g, D.fillStyles), push.apply(k, D.lineStyles));
      D.hasFillStyle0 && (L = D.fillStyle0);
      D.hasFillStyle1 && (M = D.fillStyle1);
      D.hasLineStyle && (J = D.lineStyle);
      D.move && (s = D.moveX, u = D.moveY, e ? (D = f[A++], w = D.moveX, x = D.moveY, H = morph(s, w) + "," + morph(u, x)) : H = s + "," + u)
    }
  }
  for(O = 0;g[O++];) {
    if(f = [], d = l[O]) {
      u = {};
      for(A = 0;y = d[A++];) {
        (z = u[y.spt]) || (z = u[y.spt] = []), z.push(y)
      }
      w = d.length;
      for(x = A = 0;(y = d[A++]) && x < w;) {
        if(!y.skip) {
          s = [y];
          y.skip = !0;
          ++x;
          t = y.spt;
          z = u[t];
          for(D = z.length;D--;) {
            if(z[D] === y) {
              z.splice(D, 1);
              break
            }
          }
          for(H = y.dpt;H !== t && !1 != (z = u[H]);) {
            y = z.shift(), s.push(y), y.skip = !0, ++x, H = y.dpt
          }
          push.apply(f, s)
        }
      }
      if(f.length) {
        H = [];
        y = g[O - 1];
        switch(y.type) {
          case 0:
            H.push('{__class__:"flash.display.GraphicsSolidFill",__isIGraphicsFill__:true,' + toColorProperties(y.color, y.colorMorph) + "}");
            break;
          case 16:
          ;
          case 18:
          ;
          case 19:
            d = y.records;
            z = [];
            s = [];
            u = [];
            A = 0;
            for(w = d.length;A < w;A++) {
              D = d[A], x = D.color, D.colorMorph ? (t = D.colorMorph, z.push(morphColor(x, t)), s.push(morph(x.alpha / 255, t.alpha / 255)), u.push(morph(D.ratio / 255, D.ratioMorph / 255))) : (z.push(x.red << 16 | x.green << 8 | x.blue), s.push(x.alpha / 255), u.push(D.ratio / 255))
            }
            H.push('{__class__:"flash.display.GraphicsGradientFill",__isIGraphicsFill__:true,type:' + (16 == y.type ? '"linear"' : '"radial"') + ",colors:[" + z.join(",") + "],alphas:[" + s.join(",") + "],ratios:[" + u.join(",") + "],matrix:" + toMatrixInstance(y.matrix, y.matrixMorph), 'spreadMode:"pad",interpolationMode:"rgb",focalPointRatio:' + morph(y.focalPoint, y.focalPointMorph) + "}");
            break;
          case 64:
          ;
          case 65:
          ;
          case 66:
          ;
          case 67:
            A = b[y.bitmapId];
            H.push('{__class__:"flash.display.GraphicsBitmapFill",__isIGraphicsFill__:true,bitmapData: {__class__:"flash.display.BitmapData",_drawable:d[' + A.id + "].value.props.img},matrix:" + toMatrixInstance(y.matrix, y.matrixMorph), "repeat:" + !!y.repeat + "}");
            p.push(A.id);
            break;
          default:
            fail("invalid fill style", "shape")
        }
        u = [];
        w = [];
        A = 0;
        for(x = {};s = f[A++];) {
          s.spt !== x.dpt && (u.push(1), w.push(s.spt));
          y = s.edges;
          if(s.flip) {
            for(D = y.length;z = y[--D];) {
              z.cpt ? (u.push(3), w.push(z.cpt, z.spt)) : (u.push(2), w.push(z.spt))
            }
          }else {
            for(D = 0;z = y[D++];) {
              z.cpt ? (u.push(3), w.push(z.cpt, z.dpt)) : (u.push(2), w.push(z.dpt))
            }
          }
          x = s
        }
        H.push('{__class__:"flash.display.GraphicsPath",__isIGraphicsPath__:true,commands:[' + u.join(",") + "],data:[" + w.join(",") + ']},{__class__:"flash.display.GraphicsEndFill",__isIGraphicsFill__:true}');
        n.push({i:f[0].i, commands:H})
      }
    }
  }
  for(O = 0;A = k[O++];) {
    if(d = m[O]) {
      g = toColorProperties(A.color, A.colorMorph);
      l = morph(A.width || 20, e ? A.widthMorph || 20 : void 0);
      H = 1 === A.endCapStyle ? "none" : 2 === A.endCapStyle ? "square" : "round";
      f = 1 === A.joinStyle ? "bevel" : 2 === A.joinStyle ? "miter" : "round";
      s = A.miterLimitFactor;
      u = [];
      w = [];
      A = 0;
      for(x = {};y = d[A++];) {
        y = y.edges;
        for(D = 0;z = y[D++];) {
          z.spt !== x.dpt && (u.push(1), w.push(z.spt)), z.cpt ? (u.push(3), w.push(z.cpt, z.dpt)) : (u.push(2), w.push(z.dpt)), x = z
        }
      }
      n.push({i:Number.MAX_VALUE, commands:['{__class__:"flash.display.GraphicsStroke",__isIGraphicsStroke__:true,thickness:' + l + ',pixelHinting:false,caps:"' + H + '",joins:"' + f + '",miterLimit:' + 2 * s + ',scaleMode:"normal",fill:{__class__:"flash.display.GraphicsSolidFill",__isIGraphicsFill__:true,' + g + '}},{__class__:"flash.display.GraphicsPath",__isIGraphicsPath__:true,commands:[' + u.join(",") + "],data:[" + w.join(",") + "]},{__isIGraphicsStroke__:true,fill:null}"]})
    }
  }
  n.sort(function(a, d) {
    return a.i - d.i
  });
  H = [];
  for(O = 0;f = n[O++];) {
    push.apply(H, f.commands)
  }
  e = {type:"shape", id:a.id, morph:e, bbox:a.strokeBbox || a.bbox, data:"[" + H.join(",") + "]"};
  p.length && (e.require = p);
  return e
}
var SOUND_SIZE_8_BIT = 0, SOUND_SIZE_16_BIT = 1, SOUND_TYPE_MONO = 0, SOUND_TYPE_STEREO = 1, SOUND_FORMAT_PCM_BE = 0, SOUND_FORMAT_ADPCM = 1, SOUND_FORMAT_MP3 = 2, SOUND_FORMAT_PCM_LE = 3, SOUND_FORMAT_NELLYMOSER_16 = 4, SOUND_FORMAT_NELLYMOSER_8 = 5, SOUND_FORMAT_NELLYMOSER = 6, SOUND_FORMAT_SPEEX = 11, SOUND_RATES = [5512, 11250, 22500, 44100], WaveHeader = new Uint8Array([82, 73, 70, 70, 0, 0, 0, 0, 87, 65, 86, 69, 102, 109, 116, 32, 16, 0, 0, 0, 1, 0, 2, 0, 68, 172, 0, 0, 16, 177, 2, 0, 4, 0, 
16, 0, 100, 97, 116, 97, 0, 0, 0, 0]);
function packageWave(a, b, d, e, f) {
  var g = e >> 3, k = d * b * g, g = d * g, l = a.length + (a.length & 1), m = new ArrayBuffer(WaveHeader.length + l), n = new Uint8Array(m);
  n.set(WaveHeader);
  if(f) {
    f = 0;
    for(var p = WaveHeader.length;f < a.length;f += 2, p += 2) {
      n[p] = a[f + 1], n[p + 1] = a[f]
    }
  }else {
    n.set(a, WaveHeader.length)
  }
  a = new DataView(m);
  a.setUint32(4, l + 36, !0);
  a.setUint16(22, d, !0);
  a.setUint32(24, b, !0);
  a.setUint32(28, k, !0);
  a.setUint16(32, g, !0);
  a.setUint16(34, e, !0);
  a.setUint32(40, l, !0);
  return{data:n, mimeType:"audio/wav"}
}
function defineSound(a) {
  var b = 1 == a.soundType ? 2 : 1, d = a.samplesCount, e = SOUND_RATES[a.soundRate], f = a.soundData, g;
  switch(a.soundFormat) {
    case 0:
      g = new Float32Array(d * b);
      if(1 == a.soundSize) {
        for(var k = d = 0;d < g.length;d++, k += 2) {
          g[d] = (f[k] << 24 | f[k + 1] << 16) / 2147483648
        }
        f = packageWave(f, e, b, 16, !0)
      }else {
        for(d = 0;d < g.length;d++) {
          g[d] = (f[d] - 128) / 128
        }
        f = packageWave(f, e, b, 8, !1)
      }
      break;
    case 3:
      g = new Float32Array(d * b);
      if(1 == a.soundSize) {
        for(k = d = 0;d < g.length;d++, k += 2) {
          g[d] = (f[k + 1] << 24 | f[k] << 16) / 2147483648
        }
        f = packageWave(f, e, b, 16, !1)
      }else {
        for(d = 0;d < g.length;d++) {
          g[d] = (f[d] - 128) / 128
        }
        f = packageWave(f, e, b, 8, !1)
      }
      break;
    case 2:
      f = {data:new Uint8Array(f.subarray(2)), mimeType:"audio/mpeg"};
      break;
    case 1:
      k = new Int16Array(d * b);
      decodeACPCMSoundData(f, k, b);
      g = new Float32Array(d * b);
      for(d = 0;d < g.length;d++) {
        g[d] = k[d] / 32768
      }
      f = packageWave(new Uint8Array(k.buffer), e, b, 16, !(new Uint8Array((new Uint16Array([1])).buffer))[0]);
      break;
    default:
      throw Error("Unsupported audio format: " + a.soundFormat);
  }
  a = {type:"sound", id:a.id, sampleRate:e, channels:b, pcm:g};
  f && (a.packaged = f);
  return a
}
var ACPCMIndexTables = [[-1, 2], [-1, -1, 2, 4], [-1, -1, -1, -1, 2, 4, 6, 8], [-1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 4, 6, 8, 10, 13, 16]], ACPCMStepSizeTable = [7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552, 1707, 1878, 2066, 2272, 2499, 2749, 3024, 3327, 3660, 4026, 4428, 4871, 5358, 5894, 
6484, 7132, 7845, 8630, 9493, 10442, 11487, 12635, 13899, 15289, 16818, 18500, 20350, 22385, 24623, 27086, 29794, 32767];
function decodeACPCMSoundData(a, b, d) {
  function e(d) {
    for(;k < d;) {
      g = g << 8 | a[f++], k += 8
    }
    k -= d;
    return g >>> k & (1 << d) - 1
  }
  for(var f = 0, g = 0, k = 0, l = 0, m = e(2), n = ACPCMIndexTables[m];l < b.length;) {
    var p = b[l++] = e(16) << 16 >> 16, r = e(6);
    if(1 < d) {
      var v = b[l++] = e(16) << 16 >> 16, s = e(6)
    }
    for(var u = 1 << m + 1, C = 0;4095 > C;C++) {
      for(var q = e(m + 2), w = ACPCMStepSizeTable[r], x = 0, H = u >> 1;H;H >>= 1, w >>= 1) {
        q & H && (x += w)
      }
      p += (q & u ? -1 : 1) * (x + w);
      b[l++] = p = -32768 > p ? -32768 : 32767 < p ? 32767 : p;
      r += n[q & ~u];
      r = 0 > r ? 0 : 88 < r ? 88 : r;
      if(1 < d) {
        q = e(m + 2);
        w = ACPCMStepSizeTable[s];
        x = 0;
        for(H = u >> 1;H;H >>= 1, w >>= 1) {
          q & H && (x += w)
        }
        v += (q & u ? -1 : 1) * (x + w);
        b[l++] = v = -32768 > v ? -32768 : 32767 < v ? 32767 : v;
        s += n[q & ~u];
        s = 0 > s ? 0 : 88 < s ? 88 : s
      }
    }
  }
}
var nextSoundStreamId = 0;
function SwfSoundStream(a, b, d) {
  this.streamId = nextSoundStreamId++;
  this.samplesCount = a;
  this.sampleRate = b;
  this.channels = d;
  this.format = null;
  this.currentSample = 0
}
SwfSoundStream.prototype = {get info() {
  return{samplesCount:this.samplesCount, sampleRate:this.sampleRate, channels:this.channels, format:this.format, streamId:this.streamId}
}, decode:function() {
  throw Error("SwfSoundStream.decode: not implemented");
}};
function SwfSoundStream_decode_PCM(a) {
  for(var b = new Float32Array(a.length), d = 0;d < b.length;d++) {
    b[d] = (a[d] - 128) / 128
  }
  this.currentSample += b.length / this.channels;
  return{streamId:this.streamId, samplesCount:b.length / this.channels, pcm:b}
}
function SwfSoundStream_decode_PCM_be(a) {
  for(var b = new Float32Array(a.length / 2), d = 0, e = 0;d < b.length;d++, e += 2) {
    b[d] = (a[e] << 24 | a[e + 1] << 16) / 2147483648
  }
  this.currentSample += b.length / this.channels;
  return{streamId:this.streamId, samplesCount:b.length / this.channels, pcm:b}
}
function SwfSoundStream_decode_PCM_le(a) {
  for(var b = new Float32Array(a.length / 2), d = 0, e = 0;d < b.length;d++, e += 2) {
    b[d] = (a[e + 1] << 24 | a[e] << 16) / 2147483648
  }
  this.currentSample += b.length / this.channels;
  return{streamId:this.streamId, samplesCount:b.length / this.channels, pcm:b}
}
function SwfSoundStream_decode_MP3(a) {
  var b = a[1] << 8 | a[0], d = a[3] << 8 | a[2];
  this.currentSample += b;
  return{streamId:this.streamId, samplesCount:b, data:a.subarray(4), seek:d}
}
function createSoundStream(a) {
  var b = new SwfSoundStream(a.samplesCount, SOUND_RATES[a.streamRate], 1 == a.streamType ? 2 : 1);
  switch(a.streamCompression) {
    case 0:
      b.format = "wave";
      b.decode = 1 == a.soundSize ? SwfSoundStream_decode_PCM_be : SwfSoundStream_decode_PCM;
      break;
    case 3:
      b.format = "wave";
      b.decode = 1 == a.soundSize ? SwfSoundStream_decode_PCM_le : SwfSoundStream_decode_PCM;
      break;
    case 2:
      b.format = "mp3";
      b.decode = SwfSoundStream_decode_MP3;
      break;
    default:
      debugger;
      throw Error("Unsupported audio format: " + a.soundFormat);
  }
  return b
}
function defineText(a, b) {
  var d = [];
  d.push("c.save()");
  d.push("c.beginPath()");
  d.push("c.rect(" + a.bbox.left + ", " + a.bbox.top + ", " + (a.bbox.right - a.bbox.left) + ", " + (a.bbox.bottom - a.bbox.top) + ")");
  d.push("c.clip()");
  d.push("c.scale(0.05, 0.05)");
  var e = [], f, g = a.hasText ? a.html ? a.initialText.replace(/<[^>]*>/g, "") : a.initialText : "";
  if(a.hasFont) {
    f = a.fontHeight - a.leading;
    var k = b[a.fontId];
    d.push('c.font="' + a.fontHeight + "px '" + k.name + "'\"");
    e.push(k.id)
  }else {
    f = 240 * (92 / 72), d.push('c.font="' + f + "px 'sans'\"")
  }
  a.hasColor && d.push('c.fillStyle="' + toStringRgba(a.color) + '"');
  d.push("c.fillText(this.text,0," + (f - 20 * a.bbox.top) + ")");
  d.push("c.restore();");
  d = {type:"text", id:a.id, bbox:a.bbox, variableName:a.variableName, value:g, data:d.join("\n")};
  e.length && (d.require = e);
  return d
}
var isWorker = "undefined" === typeof window;
if(isWorker) {
  importScripts("../../../lib/mp3/mp3.js");
  self.addEventListener("message", function(a) {
    a = a.data;
    var b = a.sessionId;
    try {
      switch(a.action) {
        case "create":
          var d = new Session(b);
          sessions[b] = d;
          break;
        case "close":
          if(d = sessions[b]) {
            d.close(), delete sessions[b]
          }
          break;
        case "decode":
          d = sessions[b];
          if(!d) {
            throw Error("mp3 decoding session is unavailable");
          }
          d.decode(a.data)
      }
    }catch(e) {
      self.postMessage({sessionId:b, action:"error", message:e.message})
    }
  }, !1);
  var sessions = {}, Session = function(a) {
    this.id = a;
    if("undefined" === typeof MP3Decoder) {
      throw Error("mp3 decoder is not available");
    }
    a = new MP3Decoder;
    a.onframedata = function(a, d, e, f) {
      self.postMessage({sessionId:this.id, action:"frame", frameData:a, channels:d, sampleRate:e, bitRate:f})
    }.bind(this);
    a.onid3tag = function(a) {
      self.postMessage({sessionId:this.id, action:"id3", id3Data:a})
    }.bind(this);
    this.decoder = a
  };
  Session.prototype = {decode:function(a) {
    this.decoder.push(a)
  }, close:function() {
    self.postMessage({sessionId:this.id, action:"closed"})
  }};
  self.console = {log:function(a) {
    self.postMessage({action:"console", method:"log", message:a})
  }, error:function(a) {
    self.postMessage({action:"console", method:"error", message:a})
  }}
}else {
  var mp3Worker, createMP3Worker = function() {
    var a = new Worker(SHUMWAY_ROOT + "swf/mp3worker.js");
    a.addEventListener("message", function(a) {
      "console" === a.data.action && console[a.data.method].call(console, a.data.message)
    });
    return a
  }, nextSessionId = 0, MP3DecoderSession = function() {
    mp3Worker = mp3Worker || createMP3Worker();
    var a = nextSessionId++;
    this.id = a;
    this.onworkermessage = function(b) {
      if(b.data.sessionId === a) {
        switch(b.data.action) {
          case "closed":
            if(this.onclosed) {
              this.onclosed()
            }
            mp3Worker.removeEventListener("message", this.onworkermessage, !1);
            break;
          case "frame":
            this.onframedata(b.data.frameData, b.data.channels, b.data.sampleRate, b.data.bitRate);
            break;
          case "id3":
            if(this.onid3tag) {
              this.onid3tag(b.data.id3Data)
            }
            break;
          case "error":
            if(this.onerror) {
              this.onerror(b.data.message)
            }
        }
      }
    }.bind(this);
    mp3Worker.addEventListener("message", this.onworkermessage, !1);
    mp3Worker.postMessage({sessionId:a, action:"create"})
  };
  MP3DecoderSession.prototype = {pushAsync:function(a) {
    mp3Worker.postMessage({sessionId:this.id, action:"decode", data:a})
  }, close:function() {
    mp3Worker.postMessage({sessionId:this.id, action:"close"})
  }};
  MP3DecoderSession.processAll = function(a, b) {
    var d = 8E3, e = new Float32Array(d), f = 0, g = [], k = !1, l = new MP3DecoderSession;
    l.onframedata = function(a) {
      var b = a.length + f;
      if(b > d) {
        do {
          d *= 2
        }while(b > d);
        b = new Float32Array(d);
        b.set(e);
        e = b
      }
      e.set(a, f);
      f += a.length
    };
    l.onid3tag = function(a) {
      g.push(a)
    };
    l.onclosed = function() {
      k || b(e.subarray(0, f), g)
    };
    l.onerror = function(a) {
      k || (k = !0, b(null, null, a))
    };
    l.pushAsync(a);
    l.close()
  }
}
SWF.embed = function(a, b, d) {
  function e(a, d) {
    p && (p.style.width = a.clientWidth + "px", p.style.height = a.clientHeight + "px");
    d.width = a.clientWidth * n;
    d.height = a.clientHeight * n
  }
  var f = document.createElement("canvas"), g = f.getContext("kanvas-2d"), k = new flash.display.Loader, l = k.contentLoaderInfo, m = new flash.display.Stage;
  m._loader = k;
  l._parameters = d.movieParams;
  var n = "devicePixelRatio" in window ? window.devicePixelRatio : 1, p = null;
  if(1 < n) {
    var r = "scale(" + 1 / n + ", " + 1 / n + ")";
    f.setAttribute("style", "-moz-transform: " + r + ";-webkit-transform: " + r + ";transform: " + r + ";-moz-transform-origin: 0% 0%;-webkit-transform-origin: 0% 0%;transform-origin: 0% 0%;");
    p = document.createElement("div");
    p.setAttribute("style", "display: inline-block; overflow: hidden;");
    p.appendChild(f)
  }
  k._parent = m;
  k._stage = m;
  m._loader = k;
  l.addEventListener("init", function() {
    function a() {
      b.style.cursor = u ? m._clickTarget && m._clickTarget.shouldHaveHandCursor ? "pointer" : "auto" : "none"
    }
    b.clientHeight ? (e(b, f), window.addEventListener("resize", function() {
      e.bind(b, f)
    })) : (p && (p.style.width = m._stageWidth + "px", p.style.height = m._stageHeight + "px"), f.width = m._stageWidth * n, f.height = m._stageHeight * n);
    b.setAttribute("style", "position: relative");
    f.addEventListener("click", function() {
      ShumwayKeyboardListener.focus = m;
      m._clickTarget && m._clickTarget.dispatchEvent(new flash.events.MouseEvent("click"))
    });
    f.addEventListener("dblclick", function() {
      m._clickTarget && m._clickTarget._doubleClickEnabled && m._clickTarget.dispatchEvent(new flash.events.MouseEvent("doubleClick"))
    });
    f.addEventListener("mousedown", function() {
      m._clickTarget && m._clickTarget.dispatchEvent(new flash.events.MouseEvent("mouseDown"))
    });
    f.addEventListener("mousemove", function(a) {
      var d = this, b = 0, e = 0;
      if(d.offsetParent) {
        do {
          b += d.offsetLeft, e += d.offsetTop
        }while(d = d.offsetParent)
      }
      d = m._canvasState;
      m._mouseX = ((a.pageX - b) * n - d.offsetX) / d.scale;
      m._mouseY = ((a.pageY - e) * n - d.offsetY) / d.scale
    });
    f.addEventListener("mouseup", function() {
      m._clickTarget && m._clickTarget.dispatchEvent(new flash.events.MouseEvent("mouseUp"))
    });
    f.addEventListener("mouseover", function() {
      m._mouseOver = !0;
      m._mouseJustLeft = !1
    });
    f.addEventListener("mouseout", function() {
      m._mouseOver = !1;
      m._mouseJustLeft = !0
    });
    var r = l._backgroundColor;
    m._color = r;
    g.fillStyle = toStringRgba(r);
    g.fillRect(0, 0, f.width, f.height);
    r = k._content;
    m._children[0] = r;
    m._control.appendChild(r._control);
    var u = !0;
    m._setCursorVisible = function(d) {
      u = d;
      a()
    };
    m._syncCursor = a;
    a();
    b.appendChild(p || f);
    if(d.onStageInitialized) {
      d.onStageInitialized(m)
    }
    renderStage(m, g, d.onBeforeFrame, d.onFrame)
  });
  d.onComplete && l.addEventListener("complete", function() {
    d.onComplete()
  });
  k._loadFrom(a)
};
function renderDisplayObject(a, b, d, e, f) {
  d.a * d.d == d.b * d.c ? (b.closePath(), b.rect(0, 0, 0, 0), b.clip()) : b.transform(d.a, d.b, d.c, d.d, d.tx, d.ty);
  e && (b.globalAlpha = (b.globalAlpha * e.alphaMultiplier + e.alphaOffset) / 256);
  1 !== a._alpha && (b.globalAlpha *= a._alpha);
  if(a._graphics) {
    if(d = a._graphics, d._bitmap) {
      b.translate(a._bbox.left, a._bbox.top), b.drawImage(d._bitmap, 0, 0)
    }else {
      e = d._scale;
      1 !== e && b.scale(e, e);
      e = d._subpaths;
      for(var g = 0, k = e.length;g < k;g++) {
        var l = e[g], m = l.target;
        if(f) {
          b.beginPath(), b.__draw__(m), b.closePath()
        }else {
          if(m.fillStyle && (b.fillStyle = m.fillStyle, m.fillTransform ? (d = m.fillTransform, b.beginPath(), b.__draw__(m), b.save(), b.transform(d.a, d.b, d.c, d.d, d.tx, d.ty), b.fill(), b.restore()) : b.fill(m)), m.strokeStyle) {
            b.strokeStyle = m.strokeStyle;
            d = l.drawingStyles;
            for(var n in d) {
              b[n] = d[n]
            }
            b.stroke(m)
          }
        }
      }
    }
  }
  a.draw && a.draw(b, a.ratio)
}
function renderStage(a, b, d, e) {
  function f(a) {
    var d = (Math.floor(a.x * s + u) - u) / s, b = (Math.floor(a.y * s + C) - C) / s, e = (Math.ceil((a.x + a.width) * s + u) - u) / s;
    a = (Math.ceil((a.y + a.height) * s + C) - C) / s;
    return{x:d, y:b, width:e - d, height:a - b}
  }
  function g(a, d) {
    var b = a._children, e = !1;
    d.childrenStart(a);
    for(var f = 0, l = b.length;f < l;f++) {
      var k = b[f];
      if(k && k._visible) {
        var m = w.isInstanceOf(k) || x.isInstanceOf(k);
        d.visit(k, m);
        m && g(k, d);
        k._dirtyArea && (e = !0)
      }
    }
    d.childrenEnd(a);
    e && (a._bounds = null)
  }
  function k(a) {
    this.ctx = a;
    this.enterFrameEvt = new flash.events.Event("enterFrame")
  }
  function l() {
    this.interactiveParent = a;
    this.parentsStack = [a];
    this.mouseOverEvt = new flash.events.Event("mouseOver");
    this.mouseOutEvt = new flash.events.Event("mouseOut");
    this.mouseMoveEvt = new flash.events.Event("mouseMove");
    this.mouseOverTargets = [a._mouseOver ? a : null];
    this.oldMouseOverTargets = [];
    a._mouseJustLeft && (this.oldMouseOverTargets.push(a), a._mouseJustLeft = !1)
  }
  function m() {
    this.exitFrameEvt = new flash.events.Event("exitFrame")
  }
  function n(a) {
    this.ctx = a;
    this.depth = 0;
    this.clipStack = this.clipDepth = null
  }
  function p() {
    for(var d = 0;0 < a._pendingScripts.length;) {
      if(a._pendingScripts.shift()(), 100 < ++d) {
        console.error("ERROR: pending script limit was reached");
        a._pendingScripts = [];
        break
      }
    }
  }
  var r = b.canvas.width, v = b.canvas.height, s = Math.min(r / a._stageWidth, v / a._stageHeight), u = (r - s * a.stageWidth) / 2, C = (v - s * a.stageHeight) / 2;
  b.translate(u, C);
  b.scale(s, s);
  var q = avm2.systemDomain.getClass("flash.display.MovieClip"), w = avm2.systemDomain.getClass("flash.display.DisplayObjectContainer"), x = avm2.systemDomain.getClass("flash.display.SimpleButton"), H = avm2.systemDomain.getClass("flash.display.InteractiveObject");
  k.prototype = {childrenStart:function() {
  }, childrenEnd:function() {
  }, visit:function(a) {
    q.isInstanceOf(a) && a.isPlaying() && (a._renderNextFrame(), p());
    a.dispatchEvent(this.enterFrameEvt);
    a._refreshAS2Variables && a._refreshAS2Variables();
    if(a._dirtyArea) {
      var d = f(a._dirtyArea);
      a = f(a.getBounds());
      this.ctx.rect(d.x, d.y, d.width, d.height);
      this.ctx.rect(a.x, a.y, a.width, a.height)
    }else {
      a._graphics && a._graphics._revision !== a._revision && (a._revision = a._graphics._revision, a._markAsDirty(), this.ctx.rect(0, 0, r, v))
    }
  }};
  l.prototype = {childrenStart:function() {
  }, childrenEnd:function(d) {
    this.interactiveParent = this.parentsStack.pop();
    if(d === a) {
      d = [];
      var b = this.oldMouseOverTargets, e = this.mouseOverTargets.pop();
      if(a._clickTarget = e) {
        do {
          var g = b.indexOf(e);
          0 <= g && (b[g] = null);
          e._mouseOver || d.push(e);
          g = e;
          do {
            e = this.mouseOverTargets.pop()
          }while(g === e)
        }while(e)
      }
      for(;0 < b.length;) {
        if(e = b.pop()) {
          e._mouseOver = !1, e.dispatchEvent(this.mouseOutEvt), TRACE_SYMBOLS_INFO && e._control && delete e._control.dataset.mouseOver
        }
      }
      for(;0 < d.length;) {
        e = d.pop(), e._mouseOver = !0, e.dispatchEvent(this.mouseOverEvt), TRACE_SYMBOLS_INFO && e._control && (e._control.dataset.mouseOver = !0)
      }
    }
  }, visit:function(d, b) {
    var e = this.interactiveParent;
    H.isInstanceOf(d) && (d._mouseEnabled && e._mouseChildren) && (e = d);
    d._mouseOver && this.oldMouseOverTargets.push(d);
    var g = !1, f = d._parent, l = {x:f._mouseX, y:f._mouseY};
    d._applyCurrentInverseTransform(l, f);
    if(l.x !== d._mouseX || l.y !== d._mouseY) {
      g = !0
    }
    d._mouseX = l.x;
    d._mouseY = l.y;
    f = d._hitArea || d;
    a._mouseOver && f._hitTest(!0, a._mouseX, a._mouseY, !0, null, !0) && (g && e.dispatchEvent(this.mouseMoveEvt), this.mouseOverTargets = this.parentsStack.concat([e]));
    b && (this.parentsStack.push(this.interactiveParent), this.interactiveParent = e)
  }};
  m.prototype = {childrenStart:function() {
  }, childrenEnd:function() {
  }, visit:function(a) {
    a.dispatchEvent(this.exitFrameEvt)
  }};
  n.prototype = {childrenStart:function() {
    if(0 == this.depth) {
      var d = this.ctx;
      d.save();
      d.clip();
      var b = a._color;
      255 > b.alpha && d.clearRect(0, 0, r, v);
      0 < b.alpha && (d.fillStyle = toStringRgba(b), d.fill());
      d.mozFillRule = "evenodd";
      a._canvasState = {canvas:d.canvas, scale:s, offsetX:u, offsetY:C}
    }
    this.depth++;
    this.clipDepth && 0 < this.clipDepth.length && (this.clipStack = {depth:this.depth, clip:this.clipDepth, next:this.clipStack}, this.clipDepth = null)
  }, childrenEnd:function() {
    if(this.clipDepth) {
      for(;0 < this.clipDepth.length;) {
        this.clipDepth.pop(), this.ctx.restore()
      }
      this.clipDepth = null
    }
    this.clipStack && this.clipStack.depth === this.depth && (this.clipDepth = this.clipStack.clip, this.clipStack = this.clipStack.next);
    this.depth--;
    this.ctx.restore()
  }, visit:function(d, b) {
    for(var e = this.ctx, g = !1;this.clipDepth && 0 < this.clipDepth.length && d._depth > this.clipDepth[0];) {
      this.clipDepth.shift(), e.restore()
    }
    d._clipDepth && !b && (this.clipDepth || (this.clipDepth = []), g = !0, this.clipDepth.unshift(d._clipDepth), e.save());
    e.save();
    renderDisplayObject(d, e, d._currentTransform, d._cxform, g);
    b || e.restore();
    g && e.clip();
    a._showRedrawRegions && d._dirtyArea && (g = d._dirtyArea, e.save(), e.strokeStyle = "#f00", e.lineWidth = 1, e.strokeRect(g.x, g.y, g.width, g.height), e.restore());
    d._dirtyArea = null
  }};
  var y = 0, t = 1E3 / a.frameRate, N = Date.now(), L = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout, M, J;
  if("undefined" !== typeof FirefoxCom && FirefoxCom.requestSync("getBoolPref", {pref:"shumway.dummyMode", def:!1})) {
    J = [];
    for(var O = 0;10 > O;O++) {
      J.push({position:{x:10 + Math.random() * ((b.canvas.width - 20) / s), y:10 + Math.random() * ((b.canvas.height - 20) / s)}, velocity:{x:1 * (Math.random() - 0.5), y:1 * (Math.random() - 0.5)}})
    }
    b.fillStyle = "black";
    b.lineWidth = 2;
    b.fillRect(0, 0, b.canvas.width, b.canvas.height);
    M = function() {
      b.fillStyle = "black";
      b.fillRect(0, 0, b.canvas.width, b.canvas.height);
      b.strokeStyle = "green";
      J.forEach(function(a) {
        var d = a.position;
        a = a.velocity;
        b.beginPath();
        b.arc(d.x, d.y, 10, 0, 2 * Math.PI, !0);
        b.stroke();
        var e = d.x + a.x, g = d.y + a.y;
        if(10 > e || e > b.canvas.width / s - 10) {
          a.x *= -1
        }
        if(10 > g || g > b.canvas.height / s - 10) {
          a.y *= -1
        }
        d.x += a.x;
        d.y += a.y
      })
    }
  }
  console.timeEnd("Initialize Renderer");
  console.timeEnd("Total");
  (function D() {
    var f = Date.now(), q;
    if((q = f >= N) && d) {
      q = {cancel:!1}, d(q), q = !q.cancel
    }
    q && (y = f, N = y + t, M ? M() : (g(a, new l), p(), b.beginPath(), g(a, new k(b)), g(a, new n(b)), g(a, new m), a._syncCursor(), e && e()));
    L(D)
  })()
}
var tagHandler = {"0":void 0, 1:void 0, 2:DEFINE_SHAPE, 4:PLACE_OBJECT, 5:REMOVE_OBJECT, 6:DEFINE_IMAGE, 7:DEFINE_BUTTON, 8:DEFINE_JPEG_TABLES, 9:SET_BACKGROUND_COLOR, 10:DEFINE_FONT, 11:DEFINE_LABEL, 12:DO_ACTION, 13:void 0, 14:DEFINE_SOUND, 15:START_SOUND, 17:void 0, 18:SOUND_STREAM_HEAD, 19:SOUND_STREAM_BLOCK, 20:DEFINE_BITMAP, 21:DEFINE_IMAGE, 22:DEFINE_SHAPE, 23:void 0, 24:void 0, 26:PLACE_OBJECT, 28:REMOVE_OBJECT, 32:DEFINE_SHAPE, 33:DEFINE_LABEL, 34:DEFINE_BUTTON, 35:DEFINE_IMAGE, 36:DEFINE_BITMAP, 
37:DEFINE_TEXT, 39:void 0, 43:FRAME_LABEL, 45:SOUND_STREAM_HEAD, 46:DEFINE_SHAPE, 48:DEFINE_FONT2, 56:SYMBOL_CLASS, 57:void 0, 58:void 0, 59:DO_ACTION, 60:void 0, 61:void 0, 62:void 0, 64:void 0, 65:void 0, 66:void 0, 69:FILE_ATTRIBUTES, 70:PLACE_OBJECT, 71:void 0, 73:void 0, 74:void 0, 75:DEFINE_FONT2, 76:SYMBOL_CLASS, 77:void 0, 78:void 0, 82:DO_ABC, 83:DEFINE_SHAPE, 84:DEFINE_SHAPE, 86:void 0, 87:void 0, 88:void 0, 89:START_SOUND, 90:DEFINE_IMAGE, 91:void 0}, tag;
for(tag in tagHandler) {
  var handler = tagHandler[tag];
  "object" === typeof handler && (tagHandler[tag] = generateParser(handler, "swfVersion", "tagCode"))
}
var readHeader = generateParser(MOVIE_HEADER);
function readTags(a, b, d, e) {
  var f = a.tags, g = b.bytes, k;
  try {
    do {
      k = b.pos;
      b.ensure(2);
      var l = readUi16(g, b), m = l >> 6, n = l & 63;
      63 === n && (b.ensure(4), n = readUi32(g, b));
      b.ensure(n);
      var p = b.substream(b.pos, b.pos += n), r = p.bytes, n = {code:m};
      if(39 === m) {
        n.type = "sprite", n.id = readUi16(r, p), n.frameCount = readUi16(r, p), n.tags = [], readTags(n, p, d)
      }else {
        var v = tagHandler[m];
        v && v(r, p, n, d, m)
      }
      f.push(n);
      if(1 === m) {
        for(;b.pos + 2 <= b.end && 1 === b.getUint16(b.pos, !0) >> 6;) {
          f.push(n), b.pos += 2
        }
        e && e(a)
      }else {
        e && "id" in n && e(a)
      }
    }while(m && b.pos < b.end)
  }catch(s) {
    if(s !== StreamNoDataError) {
      throw s;
    }
    b.pos = k
  }
}
function HeadTailBuffer(a) {
  this.bufferSize = a || 16;
  this.buffer = new Uint8Array(this.bufferSize);
  this.pos = 0
}
HeadTailBuffer.prototype = {push:function(a, b) {
  var d = this.pos + a.length;
  if(this.bufferSize < d) {
    for(var e = this.bufferSize;e < d;) {
      e <<= 1
    }
    d = new Uint8Array(e);
    0 < this.bufferSize && d.set(this.buffer);
    this.buffer = d;
    this.bufferSize = e
  }
  this.buffer.set(a, this.pos);
  this.pos += a.length;
  if(b) {
    return this.pos >= b
  }
}, getHead:function(a) {
  return this.buffer.subarray(0, a)
}, getTail:function(a) {
  return this.buffer.subarray(a, this.pos)
}, removeHead:function(a) {
  a = this.getTail(a);
  this.buffer = new Uint8Array(this.bufferSize);
  this.buffer.set(a);
  this.pos = a.length
}, get arrayBuffer() {
  return this.buffer.buffer
}, get length() {
  return this.pos
}, createStream:function() {
  return new Stream(this.arrayBuffer, 0, this.length)
}};
function CompressedPipe(a, b) {
  this.target = a;
  this.length = b;
  this.initialize = !0;
  this.buffer = new HeadTailBuffer(8096);
  this.state = {bitBuffer:0, bitLength:0, compression:{}};
  this.output = {data:new Uint8Array(b), available:0, completed:!1}
}
CompressedPipe.prototype = {push:function(a, b) {
  var d = this.buffer;
  if(this.initialize) {
    if(!d.push(a, 2)) {
      return
    }
    var e = d.getHead(2);
    verifyDeflateHeader(e);
    d.removeHead(2);
    this.initialize = !1
  }else {
    d.push(a)
  }
  e = d.createStream();
  e.bitBuffer = this.state.bitBuffer;
  e.bitLength = this.state.bitLength;
  var f = this.output, g = f.available;
  try {
    do {
      inflateBlock(e, f, this.state.compression)
    }while(e.pos < d.length && !f.completed)
  }catch(k) {
    if(k !== InflateNoDataError) {
      throw k;
    }
  }finally {
    this.state.bitBuffer = e.bitBuffer, this.state.bitLength = e.bitLength
  }
  d.removeHead(e.pos);
  this.target.push(f.data.subarray(g, f.available), b)
}};
function BodyParser(a, b, d) {
  this.swf = {swfVersion:a};
  this.buffer = new HeadTailBuffer(32768);
  this.initialize = !0;
  this.totalRead = 0;
  this.length = b;
  this.options = d
}
BodyParser.prototype = {push:function(a, b) {
  if(0 !== a.length) {
    var d = this.swf, e = this.buffer, f = this.options, g;
    if(this.initialize) {
      if(!e.push(a, 27)) {
        return
      }
      g = e.createStream();
      var k = g.bytes;
      readHeader(k, g, d);
      if(4420 == readUi16(k, g)) {
        g.ensure(4);
        var k = g.substream(g.pos, g.pos += 4), l = {code:69};
        (0,tagHandler[69])(k.bytes, k, l, m, 69);
        d.fileAttributes = l
      }else {
        g.pos -= 2, d.fileAttributes = {}
      }
      if(f.onstart) {
        f.onstart(d)
      }
      d.tags = [];
      this.initialize = !1
    }else {
      e.push(a), g = e.createStream()
    }
    b && (d.bytesLoaded = b.loaded, d.bytesTotal = b.total);
    var m = d.swfVersion;
    readTags(d, g, m, f.onprogress);
    g = g.pos;
    e.removeHead(g);
    this.totalRead += g;
    if(this.totalRead >= this.length && f.oncomplete) {
      f.oncomplete(d)
    }
  }
}};
SWF.parseAsync = function(a) {
  var b = new HeadTailBuffer;
  return{push:function(d, e) {
    if("target" in this) {
      return this.target.push(d, e)
    }
    if(b.push(d, 8)) {
      var f = b.getHead(8), g = 67 === f[0], k = f[3], l = b.createStream();
      l.pos += 4;
      f = readUi32(f, l) - 8;
      k = new BodyParser(k, f, a);
      g && (k = new CompressedPipe(k, f));
      k.push(b.getTail(8), e);
      this.target = k;
      b = null
    }
  }}
};
SWF.parse = function(a, b) {
  b || (b = {});
  var d = SWF.parseAsync(b), e = new Uint8Array(a);
  d.push(e, {loaded:e.length, total:e.length})
};
function proxyNativeProperty(a) {
  return{get:function() {
    return this.$nativeObject[a]
  }, set:function(b) {
    this.$nativeObject[a] = b
  }, enumerable:!0}
}
function proxyNativeReadonlyProperty(a) {
  return{get:function() {
    return this.$nativeObject[a]
  }, enumerable:!0}
}
function proxyNativeMethod(a) {
  return{value:function(b) {
    return this.$nativeObject[a].apply(this.$nativeObject, arguments)
  }, enumerable:!1}
}
function proxyEventHandler(a, b) {
  var d = null, e = null;
  return{get:function() {
    return d
  }, set:function(f) {
    d !== f && (d && this.$nativeObject.removeEventListener(a, e), (d = f) ? (e = function() {
      var a = b ? b(arguments) : null;
      return d.apply(this, a)
    }.bind(this), this.$nativeObject.addEventListener(a, e)) : e = null)
  }, configurable:!1, enumerable:!1}
}
function createConstant(a) {
  return{value:a, writable:!1, configurable:!1, enumerable:!0}
}
function defineObjectProperties(a, b) {
  for(var d in b) {
    Object.defineProperty(a, d, b[d])
  }
}
function getAS2Object(a) {
  return a ? a._getAS2Object() : null
}
function AS2MovieClip() {
}
AS2MovieClip.prototype = Object.create(Object.prototype, {$nativeObject:{value:null, writable:!0}, $attachNativeObject:{value:function(a) {
  this.$nativeObject = a;
  a.$as2Object = this
}, enumerable:!1}, $lookupChild:{value:function(a) {
  return"." == a ? this : ".." == a ? getAS2Object(this.$nativeObject.parent) : getAS2Object(this.$nativeObject.getChildByName(a))
}, enumerable:!1}, $targetPath:{get:function() {
  var a = this._target;
  return"/" != a ? "_level0" + a.replace(/\//g, ".") : "_level0"
}, enumerable:!0}, _alpha:proxyNativeProperty("alpha"), attachAudio:{value:function() {
  throw"Not implemented: attachAudio";
}, enumerable:!1}, attachBitmap:{value:function() {
  throw"Not implemented: attachBitmap";
}, enumerable:!1}, attachMovie:{value:function(a, b, d, e) {
  a = this.$nativeObject._constructSymbol(symbolId, b);
  this._insertChildAtDepth(a, d);
  d = a._getAS2Object();
  for(var f in e) {
    d[f] = e[f]
  }
  return d
}, enumerable:!1}, beginFill:{value:function(a, b) {
  this.$nativeObject._graphics.beginFill(a, b)
}}, beginBitmapFill:{value:function(a, b, d, e) {
  a instanceof flash.display.BitmapData && this.$nativeObject._graphics.beginBitmapFill(a, b, d, e)
}, enumerable:!1}, beginGradientFill:{value:function(a, b, d, e, f, g, k, l) {
  this.$nativeObject._graphics.beginGradientFill(a, b, d, e, f, g, k, l)
}, enumerable:!1}, blendMode:proxyNativeProperty("blendMode"), cacheAsBitmap:proxyNativeProperty("cacheAsBitmap"), clear:{value:function() {
  this.$nativeObject._graphics.clear()
}, enumerable:!1}, createEmptyMovieClip:{value:function(a, b) {
  var d = avm2.systemDomain.getClass("flash.display.MovieClip").createInstance();
  d.name = a;
  this.$nativeObject._insertChildAtDepth(d, +b);
  return d._getAS2Object()
}, enumerable:!1}, createTextField:{value:function(a, b, d, e, f, g) {
  var k = avm2.systemDomain.getClass("flash.text.TextField").createInstance();
  k.name = a;
  k._bbox = {left:+d, top:+e, right:+d + f, bottom:+e + g};
  this.$nativeObject._insertChildAtDepth(k, +b);
  return k._getAS2Object()
}, enumerable:!1}, _currentframe:proxyNativeReadonlyProperty("currentFrame"), curveTo:{value:function(a, b, d, e) {
  this.$nativeObject._graphics.curveTo(a, b, d, e)
}, enumerable:!1}, _droptarget:proxyNativeReadonlyProperty("dropTarget"), duplicateMovieClip:{value:function(a, b, d) {
  return this.$nativeObject._duplicate(a, +b, d)._getAS2Object()
}, enumerable:!1}, enabled:proxyNativeProperty("enabled"), endFill:{value:function() {
  this.$nativeObject._graphics.endFill()
}, enumerable:!1}, filters:{get:function() {
  throw"Not implemented: get$filters";
}, set:function() {
  throw"Not implemented: set$filters";
}, enumerable:!0}, focusEnabled:{get:function() {
  throw"Not implemented: get$focusEnabled";
}, set:function() {
  throw"Not implemented: set$focusEnabled";
}, enumerable:!0}, _focusrect:{get:function() {
  throw"Not implemented: get$_focusrect";
}, set:function() {
  throw"Not implemented: set$_focusrect";
}, enumerable:!0}, forceSmoothing:{get:function() {
  throw"Not implemented: get$forceSmoothing";
}, set:function() {
  throw"Not implemented: set$forceSmoothing";
}, enumerable:!0}, _framesloaded:proxyNativeReadonlyProperty("_framesLoaded"), getBounds:{value:function(a) {
  a = a.$nativeObject;
  if(!a) {
    throw"Unsupported bounds type";
  }
  return this.$nativeObject.getBounds(a)
}, enumerable:!1}, getBytesLoaded:{value:function() {
  return this.$nativeObject.loaderInfo.bytesLoaded
}, enumerable:!1}, getBytesTotal:{value:function() {
  return this.$nativeObject.loaderInfo.bytesTotal
}, enumerable:!1}, getDepth:{value:function() {
  return this.$nativeObject._clipDepth
}, enumerable:!1}, getInstanceAtDepth:{value:function(a) {
  return this.$nativeObject._depthMap[a]
}, enumerable:!1}, getNextHighestDepth:{value:function() {
  return this.$nativeObject._depthMap.length
}, enumerable:!1}, getRect:{value:function() {
  throw"Not implemented: getRect";
}, enumerable:!1}, getSWFVersion:{value:function() {
  return this.$nativeObject.loaderInfo.swfVersion
}, enumerable:!1}, getTextSnapshot:{value:function() {
  throw"Not implemented: getTextSnapshot";
}, enumerable:!1}, getURL:{value:function(a, b, d) {
  a = new AS2URLRequest(a);
  d && (a.method = d);
  flash.net.navigateToURL(a, b)
}, enumerable:!1}, globalToLocal:{value:function() {
  throw"Not implemented: globalToLocal";
}, enumerable:!1}, gotoAndPlay:proxyNativeMethod("gotoAndPlay"), gotoAndStop:proxyNativeMethod("gotoAndStop"), _height:proxyNativeProperty("height"), _highquality:{get:function() {
  return 1
}, set:function() {
}, enumerable:!0}, hitArea:{get:function() {
  throw"Not implemented: get$hitArea";
}, set:function() {
  throw"Not implemented: set$hitArea";
}, enumerable:!0}, hitTest:{value:function(a, b, d) {
  return a instanceof AS2MovieClip ? this.$nativeObject.hitTestObject(a.$nativeObject) : this.$nativeObject.hitTestPoint(a, b, d)
}, enumerable:!1}, lineGradientStyle:{value:function(a, b, d, e, f, g, k, l) {
  this.$nativeObject._graphics.lineGradientStyle(a, b, d, e, f, g, k, l)
}, enumerable:!1}, lineStyle:{value:function(a, b, d, e, f, g, k, l) {
  this.$nativeObject._graphics.lineStyle(a, b, d, e, f, g, k, l)
}, enumerable:!1}, lineTo:{value:function(a, b) {
  this.$nativeObject._graphics.lineTo(a, b)
}, enumerable:!1}, loadMovie:{value:function() {
  throw"Not implemented: loadMovie";
}, enumerable:!1}, loadVariables:{value:function() {
  throw"Not implemented: loadVariables";
}, enumerable:!1}, localToGlobal:{value:function(a) {
  var b = this.$nativeObject.localToGlobal(a);
  a.x = b.x;
  a.y = b.y
}, enumerable:!1}, _lockroot:{get:function() {
  throw"Not implemented: get$_lockroot";
}, set:function() {
  throw"Not implemented: set$_lockroot";
}, enumerable:!0}, menu:{get:function() {
  throw"Not implemented: get$menu";
}, set:function() {
  throw"Not implemented: set$menu";
}, enumerable:!0}, moveTo:{value:function(a, b) {
  this.$nativeObject._graphics.moveTo(a, b)
}, enumerable:!1}, _name:proxyNativeProperty("name"), nextFrame:proxyNativeMethod("nextFrame"), onData:proxyEventHandler("data"), onDragOut:proxyEventHandler("dragOut"), onDragOut:proxyEventHandler("dragOver"), onEnterFrame:proxyEventHandler("enterFrame"), onKeyDown:proxyEventHandler("keyDown"), onKeyUp:proxyEventHandler("keyUp"), onKillFocus:proxyEventHandler("focusOut", function(a) {
  return[a.relatedObject]
}), onLoad:proxyEventHandler("load"), onMouseDown:proxyEventHandler("mouseDown"), onMouseUp:proxyEventHandler("mouseUp"), onPress:proxyEventHandler("mouseDown"), onRelease:proxyEventHandler("mouseUp"), onReleaseOutside:proxyEventHandler("releaseOutside"), onRollOut:proxyEventHandler("rollOut"), onRollOver:proxyEventHandler("rollOver"), onSetFocus:proxyEventHandler("focusIn", function(a) {
  return[a.relatedObject]
}), onUnload:proxyEventHandler("unload"), opaqueBackground:proxyNativeProperty("opaqueBackground"), _parent:{get:function() {
  return getAS2Object(this.$nativeObject.parent)
}, set:function() {
  throw"Not implemented: set$_parent";
}, enumerable:!0}, play:proxyNativeMethod("play"), prevFrame:proxyNativeMethod("prevFrame"), _quality:{get:function() {
  return"HIGH"
}, set:function() {
}, enumerable:!0}, removeMovieClip:{value:function() {
  this._parent.$nativeObject.removeChild(this.$nativeObject)
}, enumerable:!1}, _rotation:proxyNativeProperty("rotation"), scale9Grid:{get:function() {
  throw"Not implemented: get$scale9Grid";
}, set:function() {
  throw"Not implemented: set$scale9Grid";
}, enumerable:!0}, scrollRect:{get:function() {
  throw"Not implemented: get$scrollRect";
}, set:function() {
  throw"Not implemented: set$scrollRect";
}, enumerable:!0}, setMask:{value:function() {
  throw"Not implemented: setMask";
}, enumerable:!1}, _soundbuftime:{get:function() {
  throw"Not implemented: get$_soundbuftime";
}, set:function() {
  throw"Not implemented: set$_soundbuftime";
}, enumerable:!0}, startDrag:{value:function(a, b, d, e, f) {
  this.$nativeObject.startDrag(a, 3 > arguments.length ? null : new AS2Rectangle(b, d, e - b, f - d))
}, enumerable:!1}, stop:proxyNativeMethod("stop"), stopDrag:proxyNativeMethod("stopDrag"), swapDepths:{value:function() {
  throw"Not implemented: swapDepths";
}, enumerable:!1}, tabChildren:proxyNativeProperty("tabChildren"), tabEnabled:proxyNativeProperty("tabEnabled"), tabIndex:proxyNativeProperty("tabIndex"), _target:{get:function() {
  var a = this.$nativeObject;
  if(a === a.root) {
    return"/"
  }
  var b = "";
  do {
    b = "/" + a.name + b, a = a.parent
  }while(a !== a.root);
  return b
}, enumerable:!0}, _totalframes:proxyNativeReadonlyProperty("totalFrames"), trackAsMenu:{get:function() {
  throw"Not implemented: get$trackAsMenu";
}, set:function() {
  throw"Not implemented: set$trackAsMenu";
}, enumerable:!0}, transform:{get:function() {
  throw"Not implemented: get$transform";
}, set:function() {
  throw"Not implemented: set$transform";
}, enumerable:!0}, toString:proxyNativeMethod("toString"), unloadMovie:{value:function() {
  this.$nativeObject.stop()
}, enumerable:!1}, _url:{get:function() {
  throw"Not implemented: get$_url";
}, enumerable:!0}, useHandCursor:proxyNativeProperty("useHandCursor"), _visible:{get:function() {
  return this.$nativeObject.visible
}, set:function(a) {
  this.$nativeObject.visible = !!+a
}, enumerable:!0}, _width:proxyNativeProperty("width"), _x:proxyNativeProperty("x"), _xmouse:proxyNativeReadonlyProperty("mouseX"), _xscale:proxyNativeProperty("scaleX"), _y:proxyNativeProperty("y"), _ymouse:proxyNativeReadonlyProperty("mouseY"), _yscale:proxyNativeProperty("scaleY")});
function AS2Button() {
}
AS2Button.prototype = Object.create(Object.prototype, {$nativeObject:{value:null, writable:!0}, $attachNativeObject:{value:function(a) {
  this.$nativeObject = a;
  a.$as2Object = this
}, enumerable:!1}, _alpha:{get:function() {
  return this.$nativeObject.alpha
}, set:function(a) {
  this.$nativeObject.alpha = a
}, enumerable:!0}, blendMode:{get:function() {
  return this.$nativeObject.blendMode
}, set:function(a) {
  this.$nativeObject.blendMode = a
}, enumerable:!0}, cacheAsBitmap:{get:function() {
  return this.$nativeObject.cacheAsBitmap
}, set:function(a) {
  this.$nativeObject.cacheAsBitmap = a
}, enumerable:!0}, enabled:{get:function() {
  return this.$nativeObject.enabled
}, set:function(a) {
  this.$nativeObject.enabled = a
}, enumerable:!0}, filters:{get:function() {
  throw"Not implemented: get$filters";
}, set:function() {
  throw"Not implemented: set$filters";
}, enumerable:!0}, _focusrect:{get:function() {
  throw"Not implemented: get$_focusrect";
}, set:function() {
  throw"Not implemented: set$_focusrect";
}, enumerable:!0}, getDepth:{value:function() {
  throw"Not implemented: getDepth";
}, enumerable:!1}, _height:{get:function() {
  return this.$nativeObject.height
}, set:function(a) {
  this.$nativeObject.height = a
}, enumerable:!0}, _highquality:{get:function() {
  return 1
}, set:function() {
}, enumerable:!0}, menu:{get:function() {
  throw"Not implemented: get$menu";
}, set:function() {
  throw"Not implemented: set$menu";
}, enumerable:!0}, _name:{get:function() {
  return this.$nativeObject.name
}, set:function(a) {
  this.$nativeObject.name = a
}, enumerable:!0}, onDragOut:proxyEventHandler("dragOut"), onDragOut:proxyEventHandler("dragOver"), onKeyDown:proxyEventHandler("keyDown"), onKeyUp:proxyEventHandler("keyUp"), onKillFocus:proxyEventHandler("focusOut", function(a) {
  return[a.relatedObject]
}), onPress:proxyEventHandler("mouseDown"), onRelease:proxyEventHandler("mouseUp"), onReleaseOutside:proxyEventHandler("releaseOutside"), onRollOut:proxyEventHandler("rollOut"), onRollOver:proxyEventHandler("rollOver"), onSetFocus:proxyEventHandler("focusIn", function(a) {
  return[a.relatedObject]
}), _parent:{get:function() {
  return getAS2Object(this.$nativeObject.parent)
}, set:function() {
  throw"Not implemented: set$_parent";
}, enumerable:!0}, _quality:{get:function() {
  return"HIGH"
}, set:function() {
}, enumerable:!0}, _rotation:{get:function() {
  return this.$nativeObject.rotation
}, set:function(a) {
  this.$nativeObject.rotation = a
}, enumerable:!0}, scale9Grid:{get:function() {
  throw"Not implemented: get$scale9Grid";
}, set:function() {
  throw"Not implemented: set$scale9Grid";
}, enumerable:!0}, _soundbuftime:{get:function() {
  throw"Not implemented: get$_soundbuftime";
}, set:function() {
  throw"Not implemented: set$_soundbuftime";
}, enumerable:!0}, tabEnabled:{get:function() {
  return this.$nativeObject.tabEnabled
}, set:function(a) {
  this.$nativeObject.tabEnabled = a
}, enumerable:!0}, tabIndex:{get:function() {
  return this.$nativeObject.tabIndex
}, set:function(a) {
  return this.$nativeObject.tabIndex = a
}, enumerable:!0}, _target:{get:function() {
  throw"Not implemented: get$_target";
}, enumerable:!0}, trackAsMenu:{get:function() {
  throw"Not implemented: get$trackAsMenu";
}, set:function() {
  throw"Not implemented: set$trackAsMenu";
}, enumerable:!0}, _url:{get:function() {
  throw"Not implemented: get$_url";
}, enumerable:!0}, useHandCursor:{get:function() {
  throw"Not implemented: get$useHandCursor";
}, set:function() {
  throw"Not implemented: set$useHandCursor";
}, enumerable:!0}, _visible:{get:function() {
  return this.$nativeObject.visible
}, set:function(a) {
  this.$nativeObject.visible = !!+a
}, enumerable:!0}, _width:{get:function() {
  return this.$nativeObject.width
}, set:function(a) {
  this.$nativeObject.width = a
}, enumerable:!0}, _x:{get:function() {
  return this.$nativeObject.x
}, set:function(a) {
  this.$nativeObject.x = a
}, enumerable:!0}, _xmouse:{get:function() {
  return this.$nativeObject.mouseX
}, enumerable:!0}, _xscale:{get:function() {
  return this.$nativeObject.scaleX
}, set:function(a) {
  this.$nativeObject.scaleX = a
}, enumerable:!0}, _y:{get:function() {
  return this.$nativeObject.y
}, set:function(a) {
  this.$nativeObject.y = a
}, enumerable:!0}, _ymouse:{get:function() {
  return this.$nativeObject.mouseY
}, enumerable:!0}, _yscale:{get:function() {
  return this.$nativeObject.scaleY
}, set:function(a) {
  this.$nativeObject.scale = a
}, enumerable:!0}});
function AS2TextField() {
}
AS2TextField.prototype = Object.create(Object.prototype, {$nativeObject:{value:null, writable:!0}, $attachNativeObject:{value:function(a) {
  this.$nativeObject = a;
  a.$as2Object = this
}, enumerable:!1}, _alpha:{get:function() {
  return this.$nativeObject.alpha
}, set:function(a) {
  this.$nativeObject.alpha = a
}, enumerable:!0}, antiAliasType:{get:function() {
  return this.$nativeObject.antiAliasType
}, set:function(a) {
  this.$nativeObject.antiAliasType = a
}, enumerable:!0}, autoSize:{get:function() {
  return this.$nativeObject.autoSize
}, set:function(a) {
  this.$nativeObject.autoSize = a
}, enumerable:!0}, background:{get:function() {
  return this.$nativeObject.background
}, set:function(a) {
  this.$nativeObject.background = a
}, enumerable:!0}, backgroundColor:{get:function() {
  return this.$nativeObject.backgroundColor
}, set:function(a) {
  this.$nativeObject.backgroundColor = a
}, enumerable:!0}, border:{get:function() {
  return this.$nativeObject.border
}, set:function(a) {
  this.$nativeObject.border = a
}, enumerable:!0}, borderColor:{get:function() {
  return this.$nativeObject.borderColor
}, set:function(a) {
  this.$nativeObject.borderColor = a
}, enumerable:!0}, bottomScroll:{get:function() {
  return this.$nativeObject.bottomScrollV
}, enumerable:!0}, condenseWhite:{get:function() {
  return this.$nativeObject.condenseWhite
}, set:function(a) {
  this.$nativeObject.condenseWhite = a
}, enumerable:!0}, embedFonts:{get:function() {
  return this.$nativeObject.embedFonts
}, set:function(a) {
  this.$nativeObject.embedFonts = a
}, enumerable:!0}, getNewTextFormat:{value:function() {
  return this.$nativeObject.defaultTextFormat
}, enumerable:!0}, getTextFormat:proxyNativeMethod("getTextFormat"), _height:{get:function() {
  return this.$nativeObject.height
}, set:function(a) {
  this.$nativeObject.height = a
}, enumerable:!0}, _highquality:{get:function() {
  return 1
}, set:function() {
}, enumerable:!0}, hscroll:{get:function() {
  return this.$nativeObject.embedFonts
}, set:function(a) {
  this.$nativeObject.embedFonts = a
}, enumerable:!0}, html:{get:function() {
  throw"Not implemented: get$_html";
}, set:function() {
  throw"Not implemented: set$_html";
}, enumerable:!0}, htmlText:{get:function() {
  return this.$nativeObject.htmlText
}, set:function(a) {
  this.$nativeObject.htmlText = a
}, enumerable:!0}, length:{get:function() {
  return this.$nativeObject.length
}, enumerable:!0}, maxChars:{get:function() {
  return this.$nativeObject.maxChars
}, set:function(a) {
  this.$nativeObject.maxChars = a
}, enumerable:!0}, maxhscroll:{get:function() {
  return this.$nativeObject.maxScrollH
}, enumerable:!0}, maxscroll:{get:function() {
  return this.$nativeObject.maxScrollV
}, enumerable:!0}, multiline:{get:function() {
  return this.$nativeObject.multiline
}, set:function(a) {
  this.$nativeObject.multiline = a
}, enumerable:!0}, _name:{get:function() {
  return this.$nativeObject.name
}, set:function(a) {
  this.$nativeObject.name = a
}, enumerable:!0}, onDragOut:proxyEventHandler("dragOut"), onDragOut:proxyEventHandler("dragOver"), onKeyDown:proxyEventHandler("keyDown"), onKeyUp:proxyEventHandler("keyUp"), onKillFocus:proxyEventHandler("focusOut", function(a) {
  return[a.relatedObject]
}), onPress:proxyEventHandler("mouseDown"), onRelease:proxyEventHandler("mouseUp"), onReleaseOutside:proxyEventHandler("releaseOutside"), onRollOut:proxyEventHandler("rollOut"), onRollOver:proxyEventHandler("rollOver"), onSetFocus:proxyEventHandler("focusIn", function(a) {
  return[a.relatedObject]
}), _parent:{get:function() {
  return getAS2Object(this.$nativeObject.parent)
}, set:function() {
  throw"Not implemented: set$_parent";
}, enumerable:!0}, password:{get:function() {
  return this.$nativeObject.displayAsPassword
}, set:function(a) {
  this.$nativeObject.displayAsPassword = a
}, enumerable:!0}, _quality:{get:function() {
  return"HIGH"
}, set:function() {
}, enumerable:!0}, _rotation:{get:function() {
  return this.$nativeObject.rotation
}, set:function(a) {
  this.$nativeObject.rotation = a
}, enumerable:!0}, scroll:{get:function() {
  return this.$nativeObject.scrollV
}, set:function(a) {
  this.$nativeObject.rotation = a
}, enumerable:!0}, selectable:{get:function() {
  return this.$nativeObject.selectable
}, set:function(a) {
  this.$nativeObject.selectable = a
}, enumerable:!0}, setNewTextFormat:{value:function(a) {
  this.$nativeObject.defaultTextFormat = a
}, enumerable:!0}, setTextFormat:proxyNativeMethod("setTextFormat"), _soundbuftime:{get:function() {
  throw"Not implemented: get$_soundbuftime";
}, set:function() {
  throw"Not implemented: set$_soundbuftime";
}, enumerable:!0}, tabEnabled:{get:function() {
  return this.$nativeObject.tabEnabled
}, set:function(a) {
  this.$nativeObject.tabEnabled = a
}, enumerable:!0}, tabIndex:{get:function() {
  return this.$nativeObject.tabIndex
}, set:function(a) {
  return this.$nativeObject.tabIndex = a
}, enumerable:!0}, _target:{get:function() {
  throw"Not implemented: get$_target";
}, enumerable:!0}, text:{get:function() {
  return this.$nativeObject.text
}, set:function(a) {
  this.$nativeObject.text = a
}, enumerable:!0}, textColor:{get:function() {
  return this.$nativeObject.textColor
}, set:function(a) {
  this.$nativeObject.textColor = a
}, enumerable:!0}, textHeight:{get:function() {
  return this.$nativeObject.textHeight
}, set:function(a) {
  this.$nativeObject.textHeight = a
}, enumerable:!0}, textWidth:{get:function() {
  return this.$nativeObject.textWidth
}, set:function(a) {
  this.$nativeObject.textWidth = a
}, enumerable:!0}, type:{get:function() {
  return this.$nativeObject.type
}, set:function(a) {
  this.$nativeObject.type = a
}, enumerable:!0}, _url:{get:function() {
  throw"Not implemented: get$_url";
}, enumerable:!0}, variable:{get:function() {
  throw"Not implemented: get$variable";
}, set:function() {
  throw"Not implemented: set$variable";
}, enumerable:!0}, _visible:{get:function() {
  return this.$nativeObject.visible
}, set:function(a) {
  this.$nativeObject.visible = !!+a
}, enumerable:!0}, _width:{get:function() {
  return this.$nativeObject.width
}, set:function(a) {
  this.$nativeObject.width = a
}, enumerable:!0}, wordWrap:{get:function() {
  return this.$nativeObject.wordWrap
}, set:function(a) {
  this.$nativeObject.wordWrap = a
}, enumerable:!0}, _x:{get:function() {
  return this.$nativeObject.x
}, set:function(a) {
  this.$nativeObject.x = a
}, enumerable:!0}, _xmouse:{get:function() {
  return this.$nativeObject.mouseX
}, enumerable:!0}, _xscale:{get:function() {
  return this.$nativeObject.scaleX
}, set:function(a) {
  this.$nativeObject.scaleX = a
}, enumerable:!0}, _y:{get:function() {
  return this.$nativeObject.y
}, set:function(a) {
  this.$nativeObject.y = a
}, enumerable:!0}, _ymouse:{get:function() {
  return this.$nativeObject.mouseY
}, enumerable:!0}, _yscale:{get:function() {
  return this.$nativeObject.scaleY
}, set:function(a) {
  this.$nativeObject.scale = a
}, enumerable:!0}});
function AS2Broadcaster() {
}
defineObjectProperties(AS2Broadcaster, {initialize:{value:function(a) {
  a._listeners = [];
  a.broadcastMessage = AS2Broadcaster.prototype.broadcastMessage;
  a.addListener = AS2Broadcaster.prototype.addListener;
  a.removeListener = AS2Broadcaster.prototype.removeListener
}, enumerable:!1}});
AS2Broadcaster.prototype = Object.create(Object.prototype, {broadcastMessage:{value:function(a) {
  for(var b = Array.prototype.slice.call(arguments, 1), d = 0;d < this._listeners.length;d++) {
    var e = this._listeners[d];
    a in e && e[a].apply(e, b)
  }
}, enumerable:!1}, addListener:{value:function(a) {
  this._listeners.push(a)
}, enumerable:!1}, removeListener:{value:function(a) {
  a = this._listeners.indexOf(a);
  0 > a || this._listeners.splice(a, 1)
}, enumerable:!1}});
function AS2Key() {
}
defineObjectProperties(AS2Key, {DOWN:createConstant(40), LEFT:createConstant(37), RIGHT:createConstant(39), UP:createConstant(38), $keyStates:{value:[], writable:!1, enumerable:!1}, $lastKeyCode:{value:0, writable:!0, configurable:!0, enumerable:!1}, $bind:{value:function(a) {
  a.addEventListener("keyDown", function(a) {
    AS2Key.$lastKeyCode = a.keyCode;
    AS2Key.$keyStates[a.keyCode] = 1;
    AS2Key.broadcastMessage("onKeyDown")
  }, !1);
  a.addEventListener("keyUp", function(a) {
    AS2Key.$lastKeyCode = a.keyCode;
    delete AS2Key.$keyStates[a.keyCode];
    AS2Key.broadcastMessage("onKeyUp")
  }, !1)
}, enumerable:!1}, isDown:{value:function(a) {
  return!!AS2Key.$keyStates[a]
}}});
AS2Broadcaster.initialize(AS2Key);
function AS2Mouse() {
}
defineObjectProperties(AS2Mouse, {$lastX:{value:0, writable:!0, configurable:!0, enumerable:!1}, $lastY:{value:0, writable:!0, configurable:!0, enumerable:!1}, $bind:{value:function(a) {
  function b(d) {
    var b = a._canvasState;
    if(b) {
      var f = d.clientX;
      d = d.clientY;
      for(var g = b.canvas;g;g = g.offsetParent) {
        f -= g.offsetLeft, d -= g.offsetTop
      }
      AS2Mouse.$lastX = (f - b.offsetX) / b.scale;
      AS2Mouse.$lastY = (d - b.offsetY) / b.scale
    }
  }
  a.addEventListener("mousedown", function(a) {
    b(a);
    AS2Mouse.broadcastMessage("onMouseDown")
  }, !1);
  a.addEventListener("mousemove", function(a) {
    b(a);
    AS2Mouse.broadcastMessage("onMouseMove")
  }, !1);
  a.addEventListener("mouseout", function(a) {
    b(a);
    AS2Mouse.broadcastMessage("onMouseMove")
  }, !1);
  a.addEventListener("mouseup", function(a) {
    b(a);
    AS2Mouse.broadcastMessage("onMouseUp")
  }, !1)
}, enumerable:!1}, hide:{value:function() {
  Mouse.hide()
}, enumerable:!1}, show:{value:function() {
  Mouse.show()
}, enumerable:!1}});
AS2Broadcaster.initialize(AS2Mouse);
function AS2Stage() {
}
defineObjectProperties(AS2Stage, {$stage:{get:function() {
  return AS2Context.instance.stage
}}, align:{get:function() {
  return this.$stage.align
}, set:function(a) {
  this.$stage.align = a
}, enumerable:!0}, displayState:{get:function() {
  return this.$stage.displayState
}, set:function(a) {
  this.$stage.displayState = a
}, enumerable:!0}, fullScreenSourceRect:{get:function() {
  return this.$stage.fullScreenSourceRect
}, set:function(a) {
  this.$stage.fullScreenSourceRect = a
}, enumerable:!0}, height:{get:function() {
  return this.$stage.stageHeight
}, enumerable:!0}, scaleMode:{get:function() {
  return this.$stage.scaleMode
}, set:function(a) {
  this.$stage.scaleMode = a
}, enumerable:!0}, showMenu:{get:function() {
  return this.$stage.showDefaultContextMenu
}, set:function(a) {
  this.$stage.showDefaultContextMenu = a
}, enumerable:!0}, width:{get:function() {
  return this.$stage.stageWidth
}, enumerable:!0}});
AS2Broadcaster.initialize(AS2Stage);
function AS2Rectangle(a, b, d, e) {
  this.x = a;
  this.y = b;
  this.width = d;
  this.height = e
}
AS2Rectangle.prototype = Object.create(Object.prototype, {});
var AS2System = Object.create(Object.prototype, {capabilities:{get:function() {
  return avm2.systemDomain.getClass("flash.system.Capabilities")
}}});
defineObjectProperties(Object.prototype, {watch:{get:function() {
  throw"Not implemented: watch";
}, enumerable:!1}, unwatch:{get:function() {
  throw"Not implemented: unwatch";
}, enumerable:!1}, addProperty:{value:function(a, b, d) {
  if("string" !== typeof a || "" === a || "function" !== typeof b || "function" !== typeof d && null !== d) {
    return!1
  }
  Object.defineProperty(this, a, {get:b, set:d || void 0, configurable:!0, enumerable:!0});
  return!0
}, enumerable:!1}, registerClass:{value:function() {
  throw"Not implemented: registerClass";
}, enumerable:!1}});
defineObjectProperties(Array, {CASEINSENSITIVE:createConstant(1), DESCENDING:createConstant(2), UNIQUESORT:createConstant(4), RETURNINDEXEDARRAY:createConstant(8), NUMERIC:createConstant(16)});
defineObjectProperties(Array.prototype, {sort:{value:function() {
  var a = Array.prototype.sort;
  return function(b, d) {
    if(1 >= arguments.length && "number" !== typeof b) {
      return a.apply(this, arguments)
    }
    "number" === typeof b && (d = b, b = null);
    var e = d & Array.UNIQUESORT || d & Array.RETURNINDEXEDARRAY ? this.slice(0) : this;
    d & Array.CASEINSENSITIVE && (b = function(a, d) {
      var b = String(a).toLowerCase(), e = String(d).toLowerCase();
      return b < e ? -1 : b == e ? 0 : 1
    });
    d & Array.NUMERIC && (b = function(a, d) {
      var b = a - d;
      return 0 > b ? -1 : 0 < b ? 1 : 0
    });
    a.call(e, b);
    if(d & Array.UNIQUESORT) {
      var f;
      for(f = 1;f < e.length;++f) {
        if(e[f - 1] !== e[f]) {
          return
        }
      }
      for(f = 0;f < e.length;++f) {
        this[f] = e[f]
      }
      e = this
    }
    d.DESCENDING && e.reverse();
    return e
  }
}(), enumerable:!1}, sortOn:{value:function(a, b) {
  var d;
  d = b & Array.NUMERIC ? function(d, b) {
    var g = Number(d[a]), k = Number(b[a]);
    return g < k ? -1 : g == k ? 0 : 1
  } : b & Array.CASEINSENSITIVE ? function(d, b) {
    var g = String(d[a]).toLowerCase(), k = String(b[a]).toLowerCase();
    return g < k ? -1 : g == k ? 0 : 1
  } : function(d, b) {
    var g = String(d[a]), k = String(b[a]);
    return g < k ? -1 : g == k ? 0 : 1
  };
  return 1 >= arguments.length ? this.sort(d) : this.sort(d, b & ~(Array.NUMERIC | Array.CASEINSENSITIVE))
}, enumerable:!1}});
function createBuiltinType(a, b) {
  if(a === Array) {
    var d = b;
    1 == b.length && "number" === typeof b[0] && (d = [], d.length = b[0]);
    return d
  }
  if(a === Boolean || a === Number || a === String || a === Function) {
    return a.apply(null, b)
  }
  if(a === Date) {
    switch(b.length) {
      case 0:
        return new Date;
      case 1:
        return new Date(b[0]);
      default:
        return new Date(b[0], b[1], 2 < b.length ? b[2] : 1, 3 < b.length ? b[3] : 0, 4 < b.length ? b[4] : 0, 5 < b.length ? b[5] : 0, 6 < b.length ? b[6] : 0)
    }
  }
  if(a === Object) {
    return{}
  }
}
"undefined" !== typeof GLOBAL && (GLOBAL.AS2MovieClip = AS2MovieClip, GLOBAL.AS2Button = AS2Button, GLOBAL.AS2TextField = AS2TextField, GLOBAL.AS2Broadcaster = AS2Broadcaster, GLOBAL.AS2Key = AS2Key, GLOBAL.AS2Mouse = AS2Mouse, GLOBAL.AS2Stage = AS2Stage, GLOBAL.AS2Rectangle = AS2Rectangle, GLOBAL.AS2System = AS2System, GLOBAL.createBuiltinType = createBuiltinType);
function ASSetPropFlags() {
}
var PropertiesIndexMap = "_x _y _xscale _yscale _currentframe _totalframes _alpha _visible _width _height _rotation _target _framesloaded _name _droptarget _url _highquality _focusrect _soundbuftime _quality _xmouse _ymouse".split(" ");
function AS2Globals() {
  this._global = this
}
AS2Globals.prototype = {$asfunction:function() {
  throw"Not implemented: $asfunction";
}, ASSetPropFlags:ASSetPropFlags, call:function(a) {
  AS2Context.instance.resolveTarget().$nativeObject._as2CallFrame(a)
}, chr:function(a) {
  return String.fromCharCode(a)
}, clearInterval:function() {
  avm2.applicationDomain.getProperty(Multiname.fromSimpleName("flash.utils.clearInterval"), !0, !0);
  clearInterval.apply(null, arguments)
}, clearTimeout:function() {
  avm2.applicationDomain.getProperty(Multiname.fromSimpleName("flash.utils.clearTimeout"), !0, !0).apply(null, arguments)
}, duplicateMovieClip:function(a, b, d) {
  AS2Context.instance.resolveTarget(a).duplicateMovieClip(b, d)
}, fscommand:function(a, b) {
  avm2.applicationDomain.getProperty(Multiname.fromSimpleName("flash.system.fscommand"), !0, !0).apply(null, arguments)
}, getProperty:function(a, b) {
  return AS2Context.instance.resolveTarget(a)[PropertiesIndexMap[b]]
}, getTimer:function() {
  return avm2.applicationDomain.getProperty(Multiname.fromSimpleName("flash.utils.getTimer"), !0, !0)()
}, getURL:function(a, b, d) {
  a = new flash.net.URLRequest(a);
  d && (a.method = d);
  avm2.applicationDomain.getProperty(Multiname.fromSimpleName("flash.net.navigateToURL"), !0, !0)(a, b)
}, getVersion:function() {
  return flash.system.Capabilities.version
}, gotoAndPlay:function() {
  var a = AS2Context.instance.resolveTarget();
  2 > arguments.length ? a.gotoAndPlay(arguments[0]) : a.gotoAndPlay(arguments[1], arguments[0])
}, gotoAndStop:function(a, b) {
  var d = AS2Context.instance.resolveTarget();
  2 > arguments.length ? d.gotoAndStop(arguments[0]) : d.gotoAndStop(arguments[1], arguments[0])
}, gotoLabel:function(a) {
  AS2Context.instance.resolveTarget().$nativeObject.gotoLabel(a)
}, ifFrameLoaded:function(a, b) {
  var d = AS2Context.instance.resolveTarget();
  return(2 > arguments.length ? arguments[0] : arguments[1]) < d._framesloaded
}, "int":function(a) {
  return 0 | a
}, length:function(a) {
  return("" + a).length
}, loadMovie:function(a, b) {
  AS2Context.instance.resolveTarget(b);
  if(/^fscommand:/i.test(a)) {
    return this.fscommand(a.substring(10), b)
  }
  throw"Not implemented: loadMovie";
}, loadMovieNum:function(a, b) {
  AS2Context.instance.resolveLevel(b);
  if(/^fscommand:/i.test(a)) {
    return this.fscommand(a.substring(10))
  }
  throw"Not implemented: loadMovieNum";
}, loadVariables:function(a, b) {
  AS2Context.instance.resolveTarget(b);
  throw"Not implemented: loadVariables";
}, loadVariablesNum:function(a, b) {
  AS2Context.instance.resolveLevel(b);
  throw"Not implemented: loadVariablesNum";
}, mbchr:function(a) {
  return String.fromCharCode.charCodeAt(a)
}, mblength:function(a) {
  return("" + a).length
}, mbord:function(a) {
  return("" + a).charCodeAt(0)
}, mbsubstring:function(a, b, d) {
  return b !== (0 | b) || d !== (0 | d) ? "" : ("" + a).substr(b, d)
}, nextFrame:function() {
  AS2Context.instance.resolveTarget().nextFrame()
}, nextScene:function() {
  AS2Context.instance.resolveTarget().nextScene()
}, ord:function(a) {
  return("" + a).charCodeAt(0)
}, play:function() {
  AS2Context.instance.resolveTarget().play()
}, prevFrame:function() {
  AS2Context.instance.resolveTarget().prevFrame()
}, prevScene:function() {
  AS2Context.instance.resolveTarget().prevScene()
}, print:function() {
  throw"Not implemented: print";
}, printAsBitmap:function() {
  throw"Not implemented: printAsBitmap";
}, printAsBitmapNum:function() {
  throw"Not implemented: printAsBitmapNum";
}, printNum:function() {
  throw"Not implemented: printNum";
}, random:function(a) {
  return 0 | Math.random() * (0 | a)
}, removeMovieClip:function(a) {
  var b = AS2Context.instance.resolveTarget();
  a = AS2Context.instance.resolveTarget(a);
  b.removeChild(a)
}, setInterval:function() {
  return avm2.applicationDomain.getProperty(Multiname.fromSimpleName("flash.utils.setInterval"), !0, !0).apply(null, arguments)
}, setProperty:function(a, b, d) {
  AS2Context.instance.resolveTarget(a)[PropertiesIndexMap[b]] = d
}, setTimeout:function() {
  return avm2.applicationDomain.getProperty(Multiname.fromSimpleName("flash.utils.setTimeout"), !0, !0).apply(null, arguments)
}, showRedrawRegions:function() {
  throw"Not implemented: showRedrawRegions";
}, startDrag:function(a, b, d, e, f, g) {
  AS2Context.instance.resolveTarget(a).startDrag(b, 3 > arguments.length ? null : new AS2Rectangle(d, e, f - d, g - e))
}, stop:function() {
  AS2Context.instance.resolveTarget().stop()
}, stopAllSounds:function() {
  avm2.systemDomain.getClass("flash.media.SoundMixer").native.static.stopAll()
}, stopDrag:function(a) {
  AS2Context.instance.resolveTarget(a).stopDrag()
}, substring:function(a, b, d) {
  return this.mbsubstring(a, b, d)
}, targetPath:function(a) {
  return AS2Context.instance.resolveTarget(a)._target
}, toggleHighQuality:function() {
  throw"Not implemented: toggleHighQuality";
}, trace:function(a) {
  avm2.applicationDomain.getProperty(Multiname.fromSimpleName("trace"), !0, !0)(a)
}, unloadMovie:function(a) {
  AS2Context.instance.resolveTarget(a).unloadMovie()
}, unloadMovieNum:function(a) {
  AS2Context.instance.resolveLevel(a).unloadMovie()
}, updateAfterEvent:function() {
  throw"Not implemented";
}, Boolean:Boolean, Date:Date, Function:Function, Math:Math, Number:Number, NaN:NaN, Infinity:Infinity, Object:Object, RegExp:RegExp, String:String, isFinite:isFinite, isNaN:isNaN, parseFloat:parseFloat, parseInt:parseInt, undefined:void 0, MovieClip:AS2MovieClip, AsBroadcaster:AS2Broadcaster, System:AS2System, Stage:AS2Stage, Button:AS2Button, TextField:AS2TextField, Rectangle:AS2Rectangle, Key:AS2Key, Mouse:AS2Mouse, get TextFormat() {
  return delete this.TextFormat, this.TextFormat = flash.text.TextFormat
}};
"undefined" !== typeof GLOBAL && (GLOBAL.AS2Globals = AS2Globals);
function ActionsDataStream(a, b) {
  this.array = a;
  this.position = 0;
  this.end = a.length;
  this.readString = 6 <= b ? this.readUTF8String : this.readANSIString;
  var d = new ArrayBuffer(4);
  (new Int32Array(d))[0] = 1;
  if(!(new Uint8Array(d))[0]) {
    throw"big-endian platform";
  }
}
ActionsDataStream.prototype = {readUI8:function() {
  return this.array[this.position++]
}, readUI16:function() {
  var a = this.position, b = this.array, b = b[a + 1] << 8 | b[a];
  this.position = a + 2;
  return b
}, readSI16:function() {
  var a = this.position, b = this.array, b = b[a + 1] << 8 | b[a];
  this.position = a + 2;
  return 32768 > b ? b : b - 65536
}, readInteger:function() {
  var a = this.position, b = this.array, b = b[a] | b[a + 1] << 8 | b[a + 2] << 16 | b[a + 3] << 24;
  this.position = a + 4;
  return b
}, readFloat:function() {
  var a = this.position, b = this.array, d = new ArrayBuffer(4), e = new Uint8Array(d);
  e[0] = b[a];
  e[1] = b[a + 1];
  e[2] = b[a + 2];
  e[3] = b[a + 3];
  this.position = a + 4;
  return(new Float32Array(d))[0]
}, readDouble:function() {
  var a = this.position, b = this.array, d = new ArrayBuffer(8), e = new Uint8Array(d);
  e[4] = b[a];
  e[5] = b[a + 1];
  e[6] = b[a + 2];
  e[7] = b[a + 3];
  e[0] = b[a + 4];
  e[1] = b[a + 5];
  e[2] = b[a + 6];
  e[3] = b[a + 7];
  this.position = a + 8;
  return(new Float64Array(d))[0]
}, readBoolean:function() {
  return!!this.readUI8()
}, readANSIString:function() {
  for(var a = "", b;b = this.readUI8();) {
    a += String.fromCharCode(b)
  }
  return a
}, readUTF8String:function() {
  for(var a = "", b;b = this.readUI8();) {
    if(128 > b) {
      a += String.fromCharCode(b)
    }else {
      if(128 == (b & 192)) {
        throw"Invalid UTF8 encoding";
      }
      var d = 192, e = 5;
      do {
        var f = d >> 1 | 128;
        if((b & f) == d) {
          break
        }
        d = f;
        --e
      }while(0 <= e);
      d = b & (1 << e) - 1;
      for(f = 5;f >= e;--f) {
        b = this.readUI8();
        if(128 != (b & 192)) {
          throw"Invalid UTF8 encoding";
        }
        d = d << 6 | b & 63
      }
      a = 65536 <= d ? a + String.fromCharCode(d - 65536 >> 10 & 1023 | 55296, d & 1023 | 56320) : a + String.fromCharCode(d)
    }
  }
  return a
}, readBytes:function(a) {
  var b = this.position, d = Math.max(this.end - b, 0);
  d < a && (a = d);
  d = this.array.subarray(b, b + a);
  this.position = b + a;
  return d
}};
"undefined" !== typeof GLOBAL && (GLOBAL.ActionsDataStream = ActionsDataStream);
var AVM1_TRACE_ENABLED = !1, AVM1_ERRORS_IGNORED = !0, MAX_AVM1_INSTRUCTIONS_LIMIT = 1E5, MAX_AVM1_ERRORS_LIMIT = 1E3;
function AS2ScopeListItem(a, b) {
  this.scope = a;
  this.next = b
}
AS2ScopeListItem.prototype = {create:function(a) {
  return new AS2ScopeListItem(a, this)
}};
function AS2Context(a) {
  this.swfVersion = a;
  this.globals = new AS2Globals(this);
  this.initialScope = new AS2ScopeListItem(this.globals, null);
  this.assets = {};
  this.errorsIgnored = this.instructionsExecuted = 0
}
AS2Context.instance = null;
AS2Context.prototype = {addAssets:function(a) {
  for(var b = 0;b < a.length;b++) {
    a[b].className && (this.assets[a[b].className] = a[b])
  }
}, resolveTarget:function(a) {
  a ? "string" === typeof a && (a = lookupAS2Children(a, this.defaultTarget, this.globals._root)) : a = this.defaultTarget;
  if("object" !== typeof a || null === a || !("$nativeObject" in a)) {
    throw"Invalid AS2 target object: " + Object.prototype.toString.call(a);
  }
  return a
}, resolveLevel:function(a) {
  return this.resolveTarget(this.globals["_level" + a])
}};
function AS2Error(a) {
  this.error = a
}
function as2GetType(a) {
  if(null === a) {
    return"null"
  }
  var b = typeof a;
  return"function" === b ? "object" : "object" === b && a instanceof AS2MovieClip ? "movieclip" : b
}
function as2ToPrimitive(a) {
  return"object" !== as2GetType(a) ? a : a.valueOf()
}
function as2ToAddPrimitive(a) {
  return"object" !== as2GetType(a) ? a : a instanceof Date && 6 <= AS2Context.instance.swfVersion ? a.toString() : a.valueOf()
}
function as2ToBoolean(a) {
  switch(as2GetType(a)) {
    default:
      return!1;
    case "boolean":
      return a;
    case "number":
      return 0 != a && !isNaN(a);
    case "string":
      return 0 !== a.length;
    case "object":
      return!0
  }
}
function as2ToNumber(a) {
  a = as2ToPrimitive(a);
  switch(as2GetType(a)) {
    case "undefined":
    ;
    case "null":
      return 7 <= AS2Context.instance.swfVersion ? NaN : 0;
    default:
      return 5 <= AS2Context.instance.swfVersion ? NaN : 0;
    case "null":
      return NaN;
    case "boolean":
      return a ? 1 : 0;
    case "number":
      return a;
    case "string":
      return"" === a && 5 > AS2Context.instance.swfVersion ? 0 : +a
  }
}
function as2ToInteger(a) {
  a = as2ToNumber(a);
  return isNaN(a) ? 0 : !isFinite(a) || 0 == a ? a : (0 > a ? -1 : 1) * Math.floor(Math.abs(a))
}
function as2ToInt32(a) {
  a = as2ToNumber(a);
  return isNaN(a) || !isFinite(a) || 0 == a ? 0 : a | 0
}
function as2ToString(a) {
  switch(as2GetType(a)) {
    case "undefined":
      return 7 <= AS2Context.instance.swfVersion ? "undefined" : "";
    case "null":
      return"null";
    case "boolean":
      return a ? "true" : "false";
    case "number":
      return a.toString();
    case "string":
      return a;
    case "undefined":
      return"undefined";
    case "movieclip":
      return a.$targetPath;
    case "object":
      var b = a.toString !== Function.prototype.toString ? a.toString() : a;
      return"string" === typeof b ? b : "function" === typeof a ? "[type Function]" : "[type Object]"
  }
}
function as2Compare(a, b) {
  var d = as2ToPrimitive(a), e = as2ToPrimitive(b);
  return"string" === typeof d && "string" === typeof e ? d < e : as2ToNumber(d) < as2ToNumber(e)
}
function as2InstanceOf(a, b) {
  return a instanceof b ? !0 : !1
}
function executeActions(a, b, d, e) {
  var f = ActionTracerFactory.get(), g = b.initialScope.create(d), k = AS2Context.instance;
  try {
    AS2Context.instance = b, b.defaultTarget = d, b.globals["this"] = d, e && b.addAssets(e), f.message("ActionScript Execution Starts"), f.indent(), interpretActions(a, g, null, [])
  }finally {
    b.instructionsExecuted = 0, b.errorsIgnored = 0, f.unindent(), f.message("ActionScript Execution Stops"), AS2Context.instance = k
  }
}
function lookupAS2Children(a, b, d) {
  var e = a.split("/");
  "" === e[e.length - 1] && e.pop();
  if("" === e[0] || "_level0" === e[0] || "_root" === e[0]) {
    b = d, e.shift()
  }
  for(;0 < e.length;) {
    d = b;
    b = b.$lookupChild(e[0]);
    if(!b) {
      throw e[0] + " (expr " + a + ") is not found in " + d._target;
    }
    e.shift()
  }
  return b
}
function interpretActions(a, b, d, e) {
  function f(a) {
    if(a) {
      try {
        v.defaultTarget = lookupAS2Children(a, C, u._root)
      }catch(d) {
        throw v.defaultTarget = null, d;
      }
    }else {
      v.defaultTarget = w
    }
  }
  function g(a, e, g, f) {
    var l = function() {
      for(var a = {"this":this, arguments:arguments}, l = b.create(a), k = 0;k < arguments.length || k < e.length;k++) {
        a[e[k]] = arguments[k]
      }
      a = [];
      if(g) {
        for(k = 0;k < g.length;k++) {
          var m = g[k];
          if(m) {
            if("param" == m.type) {
              a[k] = arguments[m.index]
            }else {
              switch(m.name) {
                case "this":
                  a[k] = this;
                  break;
                case "arguments":
                  a[k] = arguments;
                  break;
                case "super":
                  throw"Not implemented: super";;
                case "_global":
                  a[k] = u;
                  break;
                case "_parent":
                  a[k] = u._parent;
                  break;
                case "_root":
                  a[k] = u._root
              }
            }
          }
        }
      }
      var k = AS2Context.instance, n;
      try {
        return AS2Context.instance = v, n = 0 === v.instructionsExecuted, v.defaultTarget = w, H.indent(), interpretActions(f, l, d, a)
      }finally {
        n && (v.instructionsExecuted = 0, v.errorsIgnored = 0), H.unindent(), v.defaultTarget = C, AS2Context.instance = k
      }
    };
    a && (l.name = a);
    return l
  }
  function k(a) {
    var d, b;
    if(0 <= a.indexOf(":")) {
      b = a.split(":"), d = lookupAS2Children(b[0], C, u._root), b = b[1]
    }else {
      if(0 <= a.indexOf(".")) {
        a = a.split(".");
        b = a.pop();
        d = u;
        for(var e = 0;e < a.length;e++) {
          if(d = d[a[e]], !d) {
            throw a.slice(0, e + 1) + " is undefined";
          }
        }
      }
    }
    if(d) {
      return{obj:d, name:b}
    }
  }
  function l(a) {
    if(a in w) {
      return w[a]
    }
    var d = k(a);
    if(d) {
      return d.obj[d.name]
    }
    if(d = C instanceof AS2MovieClip && C.$lookupChild(a)) {
      return d
    }
    for(d = b;d;d = d.next) {
      if(a in d.scope) {
        return d.scope[a]
      }
    }
  }
  function m(a) {
    var d = l(a);
    if(!(d instanceof Object)) {
      throw'Object "' + a + '" is not found';
    }
    return d
  }
  function n(a, d) {
    if(isNaN(a) || 0 > a || a > d || a != (0 | a)) {
      throw"Invalid number of arguments: " + a;
    }
  }
  function p(a) {
    var d = +a.pop();
    n(d, a.length);
    for(var b = [], e = 0;e < d;e++) {
      b.push(a.pop())
    }
    return b
  }
  function r(a) {
    for(;0 < a && s.position < s.end;) {
      var d = 128 <= s.readUI8() ? s.readUI16() : 0;
      s.position += d;
      a--
    }
    y = s.position
  }
  for(var v = AS2Context.instance, s = new ActionsDataStream(a, v.swfVersion), u = v.globals, C = v.defaultTarget, q = [], w = b.scope, x = 5 <= v.swfVersion, H = ActionTracerFactory.get(), y, t = !1, N = !1, L;s.position < s.end && !N;) {
    try {
      for(;s.position < s.end;) {
        if(1E5 <= v.instructionsExecuted++) {
          throw N = !0, "long running script -- AVM1 instruction limit is reached";
        }
        var M = s.readUI8(), J = 128 <= M ? s.readUI16() : 0;
        y = s.position + J;
        L = 0;
        H.print(s.position, M, q);
        switch(M) {
          case 129:
            var O = s.readUI16();
            u.gotoAndPlay(O + 1);
            break;
          case 131:
            var A = s.readString(), D = s.readString();
            u.getURL(A, D);
            break;
          case 4:
            u.nextFrame();
            break;
          case 5:
            u.prevFrame();
            break;
          case 6:
            u.play();
            break;
          case 7:
            u.stop();
            break;
          case 8:
            u.toggleHighQuality();
            break;
          case 9:
            u.stopAllSounds();
            break;
          case 138:
            var O = s.readUI16(), z = s.readUI8();
            u.ifFrameLoaded(O) || r(z);
            break;
          case 139:
            var E = s.readString();
            f(E);
            break;
          case 140:
            var Q = s.readString();
            u.gotoLabel(Q);
            break;
          case 150:
            for(;s.position < y;) {
              var F = s.readUI8(), B;
              switch(F) {
                case 0:
                  B = s.readString();
                  break;
                case 1:
                  B = s.readFloat();
                  break;
                case 2:
                  B = null;
                  break;
                case 3:
                  B = void 0;
                  break;
                case 4:
                  B = e[s.readUI8()];
                  break;
                case 5:
                  B = s.readBoolean();
                  break;
                case 6:
                  B = s.readDouble();
                  break;
                case 7:
                  B = s.readInteger();
                  break;
                case 8:
                  B = d[s.readUI8()];
                  break;
                case 9:
                  B = d[s.readUI16()];
                  break;
                default:
                  throw"Unknown value type: " + F;
              }
              q.push(B)
            }
            break;
          case 23:
            q.pop();
            break;
          case 10:
            var G = as2ToNumber(q.pop()), K = as2ToNumber(q.pop());
            q.push(G + K);
            break;
          case 11:
            G = as2ToNumber(q.pop());
            K = as2ToNumber(q.pop());
            q.push(K - G);
            break;
          case 12:
            G = as2ToNumber(q.pop());
            K = as2ToNumber(q.pop());
            q.push(G * K);
            break;
          case 13:
            var G = as2ToNumber(q.pop()), K = as2ToNumber(q.pop()), I = K / G;
            q.push(x ? I : isFinite(I) ? I : "#ERROR#");
            break;
          case 14:
            var G = as2ToNumber(q.pop()), K = as2ToNumber(q.pop()), U = G == K;
            q.push(x ? U : U ? 1 : 0);
            break;
          case 15:
            G = as2ToNumber(q.pop());
            K = as2ToNumber(q.pop());
            U = K < G;
            q.push(x ? U : U ? 1 : 0);
            break;
          case 16:
            G = as2ToBoolean(q.pop());
            K = as2ToBoolean(q.pop());
            U = G && K;
            q.push(x ? U : U ? 1 : 0);
            break;
          case 17:
            G = as2ToBoolean(q.pop());
            K = as2ToBoolean(q.pop());
            U = G || K;
            q.push(x ? U : U ? 1 : 0);
            break;
          case 18:
            U = !as2ToBoolean(q.pop());
            q.push(x ? U : U ? 1 : 0);
            break;
          case 19:
            var V = as2ToString(q.pop()), da = as2ToString(q.pop()), U = V == da;
            q.push(x ? U : U ? 1 : 0);
            break;
          case 20:
          ;
          case 49:
            V = as2ToString(q.pop());
            q.push(u.length(V));
            break;
          case 33:
            V = as2ToString(q.pop());
            da = as2ToString(q.pop());
            q.push(da + V);
            break;
          case 21:
            var X = q.pop(), Z = q.pop();
            B = as2ToString(q.pop());
            q.push(u.substring(B, Z, X));
            break;
          case 53:
            X = q.pop();
            Z = q.pop();
            B = as2ToString(q.pop());
            q.push(u.mbsubstring(B, Z, X));
            break;
          case 41:
            V = as2ToString(q.pop());
            da = as2ToString(q.pop());
            U = da < V;
            q.push(x ? U : U ? 1 : 0);
            break;
          case 24:
            q.push(u.int(q.pop()));
            break;
          case 50:
            q.push(u.chr(q.pop()));
            break;
          case 54:
            q.push(u.mbchr(q.pop()));
            break;
          case 51:
            q.push(u.ord(q.pop()));
            break;
          case 55:
            q.push(u.mbord(q.pop()));
            break;
          case 153:
            var wa = s.readSI16();
            y += wa;
            break;
          case 157:
            wa = s.readSI16();
            (U = !!q.pop()) && (y += wa);
            break;
          case 158:
            Q = q.pop();
            u.call(Q);
            break;
          case 28:
            var Ga = "" + q.pop();
            L++;
            q.push(l(Ga));
            break;
          case 29:
            B = q.pop();
            Ga = "" + q.pop();
            var Ea = Ga, Ha = B;
            if(Ea in w) {
              w[Ea] = Ha
            }else {
              var ya = k(Ea);
              ya ? ya.obj[ya.name] = Ha : (w.this || l("this"))[Ea] = Ha
            }
            break;
          case 154:
            var ha = s.readUI8(), Ba;
            switch(ha >> 6 & 3) {
              case 1:
                Ba = "GET";
                break;
              case 2:
                Ba = "POST"
            }
            var Ca = ha & 2 ? ha & 1 ? u.loadVariables : u.loadMovie : ha & 1 ? u.loadVariablesNum : u.loadMovieNum, aa = q.pop(), xa = q.pop();
            Ca.call(u, xa, aa, Ba);
            break;
          case 159:
            var ha = s.readUI8(), Fa = [q.pop()];
            ha & 2 && Fa.push(s.readUI16());
            (ha & 1 ? u.gotoAndPlay : u.gotoAndStop).apply(u, Fa);
            break;
          case 32:
            aa = q.pop();
            f(aa);
            break;
          case 34:
            Z = q.pop();
            aa = q.pop();
            L++;
            q.push(u.getProperty(aa, Z));
            break;
          case 35:
            B = q.pop();
            Z = q.pop();
            aa = q.pop();
            u.setProperty(aa, Z, B);
            break;
          case 36:
            var Ia = q.pop(), aa = q.pop(), ta = q.pop();
            u.duplicateMovieClip(ta, aa, Ia);
            break;
          case 37:
            aa = q.pop();
            u.unloadMovie(aa);
            break;
          case 39:
            var aa = q.pop(), $ = q.pop(), za = !q.pop() ? null : {y2:q.pop(), x2:q.pop(), y1:q.pop(), x1:q.pop()};
            dragParams = [aa, $];
            za && (dragParams = dragParams.push(za.x1, za.y1, za.x2, za.y2));
            u.startDrag.apply(u, dragParams);
            break;
          case 40:
            u.stopDrag();
            break;
          case 141:
            z = s.readUI8();
            O = q.pop();
            u.ifFrameLoaded(O) || r(z);
            break;
          case 38:
            B = q.pop();
            u.trace(B);
            break;
          case 52:
            q.push(u.getTimer());
            break;
          case 48:
            q.push(u.random(q.pop()));
            break;
          case 61:
            var ka = q.pop(), ga = p(q);
            L++;
            var fa, La = ka, Ma = l(La);
            if(!(Ma instanceof Function)) {
              throw'Function "' + La + '" is not found';
            }
            fa = Ma;
            var ia = fa.apply(w, ga);
            q.push(ia);
            break;
          case 82:
            var Aa = q.pop(), W = q.pop(), ga = p(q);
            L++;
            if(Aa) {
              W = Object(W);
              if(!(Aa in W)) {
                throw"Method " + Aa + " is not defined.";
              }
              ia = W[Aa].apply(W, ga)
            }else {
              ia = W.apply(C, ga)
            }
            q.push(ia);
            break;
          case 136:
            X = s.readUI16();
            d = [];
            for(var pa = 0;pa < X;pa++) {
              d.push(s.readString())
            }
            break;
          case 155:
            for(var ka = s.readString(), Qa = s.readUI16(), Na = [], pa = 0;pa < Qa;pa++) {
              Na.push(s.readString())
            }
            var Da = s.readUI16();
            y += Da;
            fa = g(ka, Na, null, s.readBytes(Da));
            ka ? w[ka] = fa : q.push(fa);
            break;
          case 60:
            B = q.pop();
            var na = q.pop();
            w[na] = B;
            break;
          case 65:
            na = q.pop();
            w[na] = void 0;
            break;
          case 58:
            na = q.pop();
            W = q.pop();
            delete W[na];
            q.push(!(na in W));
            break;
          case 59:
            na = q.pop();
            a: {
              for(var Ra = na, Ja = b;Ja;Ja = Ja.next) {
                if(Ra in Ja.scope) {
                  delete Ja.scope[Ra];
                  ia = !(Ra in Ja.scope);
                  break a
                }
              }
              ia = !1
            }
            q.push(ia);
            break;
          case 70:
            var Sa = q.pop();
            q.push(null);
            W = m(Sa);
            for(na in W) {
              q.push(na)
            }
            break;
          case 73:
            var Y = q.pop(), ea = q.pop();
            q.push(Y == ea);
            break;
          case 78:
            na = q.pop();
            W = q.pop();
            q.push(W[na]);
            break;
          case 66:
            var Wa = p(q);
            q.push(Wa);
            break;
          case 67:
            var qa = +q.pop();
            n(qa, q.length >> 1);
            W = {};
            for(pa = 0;pa < qa;pa++) {
              B = q.pop(), na = q.pop(), W[na] = B
            }
            q.push(W);
            break;
          case 83:
            Aa = q.pop();
            W = q.pop();
            ga = p(q);
            L++;
            var ca;
            if(Aa) {
              if(!(Aa in W)) {
                throw"Method " + Aa + " is not defined.";
              }
              ca = W[Aa]
            }else {
              ca = W
            }
            ia = new (ca.bind.apply(ca, [null].concat(ga)));
            ia || (ia = {}, ia.constructor = ca, ca.apply(ia, ga));
            q.push(ia);
            break;
          case 64:
            Sa = q.pop();
            W = m(Sa);
            ga = p(q);
            L++;
            ia = createBuiltinType(W, ga);
            "undefined" === typeof ia && (ia = {}, W.apply(ia, ga), ia.constructor = W);
            q.push(ia);
            break;
          case 79:
            B = q.pop();
            na = q.pop();
            W = q.pop();
            W[na] = B;
            break;
          case 69:
            W = q.pop();
            q.push("movieclip" === as2GetType(W) ? W._target : void 0);
            break;
          case 148:
            Da = s.readUI16();
            W = q.pop();
            y += Da;
            var Xa = s.readBytes(Da), Ka = b.create(Object(W));
            interpretActions(Xa, Ka, d, e);
            break;
          case 74:
            q.push(as2ToNumber(q.pop()));
            break;
          case 75:
            q.push(as2ToString(q.pop()));
            break;
          case 68:
            W = q.pop();
            ia = as2GetType(W);
            q.push(ia);
            break;
          case 71:
            Y = q.pop();
            ea = q.pop();
            da = as2ToAddPrimitive(Y);
            V = as2ToAddPrimitive(ea);
            "string" === typeof V || "string" === typeof da ? q.push(as2ToString(V) + as2ToString(da)) : q.push(as2ToNumber(V) + as2ToNumber(da));
            break;
          case 72:
            Y = q.pop();
            ea = q.pop();
            q.push(as2Compare(ea, Y));
            break;
          case 63:
            Y = as2ToNumber(q.pop());
            ea = as2ToNumber(q.pop());
            q.push(ea % Y);
            break;
          case 96:
            Y = as2ToInt32(q.pop());
            ea = as2ToInt32(q.pop());
            q.push(ea & Y);
            break;
          case 99:
            Y = as2ToInt32(q.pop());
            ea = as2ToInt32(q.pop());
            q.push(ea << Y);
            break;
          case 97:
            Y = as2ToInt32(q.pop());
            ea = as2ToInt32(q.pop());
            q.push(ea | Y);
            break;
          case 100:
            Y = as2ToInt32(q.pop());
            ea = as2ToInt32(q.pop());
            q.push(ea >> Y);
            break;
          case 101:
            Y = as2ToInt32(q.pop());
            ea = as2ToInt32(q.pop());
            q.push(ea >>> Y);
            break;
          case 98:
            Y = as2ToInt32(q.pop());
            ea = as2ToInt32(q.pop());
            q.push(ea ^ Y);
            break;
          case 81:
            Y = as2ToNumber(q.pop());
            Y--;
            q.push(Y);
            break;
          case 80:
            Y = as2ToNumber(q.pop());
            Y++;
            q.push(Y);
            break;
          case 76:
            q.push(q[q.length - 1]);
            break;
          case 62:
            return q.pop();
          case 77:
            q.push(q.pop(), q.pop());
            break;
          case 135:
            var ba = s.readUI8();
            e[ba] = q[q.length - 1];
            break;
          case 84:
            var la = q.pop(), W = q.pop();
            q.push(as2InstanceOf(Object(W), la));
            break;
          case 85:
            W = q.pop();
            q.push(null);
            for(na in W) {
              q.push(na)
            }
            break;
          case 102:
            Y = q.pop();
            ea = q.pop();
            q.push(Y === ea);
            break;
          case 103:
            Y = q.pop();
            ea = q.pop();
            q.push(as2Compare(Y, ea));
            break;
          case 104:
            V = as2ToString(q.pop());
            da = as2ToString(q.pop());
            U = da > V;
            q.push(x ? U : U ? 1 : 0);
            break;
          case 142:
            ka = s.readString();
            Qa = s.readUI16();
            s.readUI8();
            for(var ha = s.readUI16(), ma = [], Na = [], pa = 0;pa < Qa;pa++) {
              var ba = s.readUI8(), S = s.readString();
              Na.push(S);
              ba && (ma[ba] = {type:"param", name:S, index:pa})
            }
            Da = s.readUI16();
            y += Da;
            var R = 1;
            ha & 1 && (ma[R++] = {type:"var", name:"this"});
            ha & 4 && (ma[R++] = {type:"var", name:"arguments"});
            ha & 16 && (ma[R++] = {type:"var", name:"super"});
            ha & 64 && (ma[R++] = {type:"var", name:"_root"});
            ha & 128 && (ma[R++] = {type:"var", name:"_parent"});
            ha & 256 && (ma[R++] = {type:"var", name:"_global"});
            fa = g(ka, Na, ma, s.readBytes(Da));
            ka ? w[ka] = fa : q.push(fa);
            break;
          case 105:
            var ra = q.pop(), sa = q.pop(), W = Object.create(ra.prototype, {constructor:{value:sa, enumerable:!1}});
            sa.prototype = W;
            break;
          case 43:
            W = q.pop();
            la = q.pop();
            q.push(as2InstanceOf(W, la) ? W : null);
            break;
          case 44:
            var la = q.pop(), ua = +q.pop();
            n(ua, q.length);
            for(var P = [], pa = 0;pa < ua;pa++) {
              P.push(q.pop())
            }
            la.$interfaces = P;
            break;
          case 143:
            var ha = s.readUI8(), va = !!(ha & 4), T = !!(ha & 2), ja = !!(ha & 1), oa = s.readUI16(), Ua = s.readUI16(), Va = s.readUI16(), Ya = va ? s.readUI8() : s.readString();
            y += oa + Ua + Va;
            var Za = T, $a = ja, Ta = Ya, ab = s.readBytes(oa), bb = s.readBytes(Ua), cb = s.readBytes(Va);
            try {
              interpretActions(ab, b, d, e)
            }catch(Oa) {
              if(!$a) {
                throw Oa;
              }
              if(!(Oa instanceof AS2Error)) {
                throw Oa;
              }
              "string" === typeof Ta ? w[Ta] = Oa.error : e[Ta] = Oa.error;
              interpretActions(bb, b, d, e)
            }finally {
              Za && interpretActions(cb, b, d, e)
            }
            break;
          case 42:
            throw W = q.pop(), new AS2Error(W);;
          case 45:
            ga = p(q);
            L++;
            ia = u.fscommand.apply(null, ga);
            q.push(ia);
            break;
          case 137:
            s.readUI8();
            break;
          case 0:
            return;
          default:
            throw"Unknown action code: " + M;
        }
        s.position = y;
        t = !1
      }
    }catch(Pa) {
      if(N) {
        throw Pa;
      }
      if(Pa instanceof AS2Error) {
        throw Pa;
      }
      s.position = y;
      if(0 < L) {
        for(;L--;) {
          q.push(void 0)
        }
      }
      if(!t) {
        if(1E3 <= v.errorsIgnored++) {
          throw N = !0, "long running script -- AVM1 errors limit is reached";
        }
        console.error("AVM1 error: " + Pa);
        t = !0
      }
    }
  }
}
var ActionTracerFactory = function() {
  function a() {
  }
  var b = {print:function() {
  }, indent:function() {
  }, unindent:function() {
  }, message:function() {
  }};
  a.get = function() {
    return b
  };
  return a
}(), ActionNamesMap = {"0":"EOA", 4:"ActionNextFrame", 5:"ActionPreviousFrame", 6:"ActionPlay", 7:"ActionStop", 8:"ActionToggleQuality", 9:"ActionStopSounds", 10:"ActionAdd", 11:"ActionSubtract", 12:"ActionMultiply", 13:"ActionDivide", 14:"ActionEquals", 15:"ActionLess", 16:"ActionAnd", 17:"ActionOr", 18:"ActionNot", 19:"ActionStringEquals", 20:"ActionStringLength", 21:"ActionStringExtract", 23:"ActionPop", 24:"ActionToInteger", 28:"ActionGetVariable", 29:"ActionSetVariable", 32:"ActionSetTarget2", 
33:"ActionStringAdd", 34:"ActionGetProperty", 35:"ActionSetProperty", 36:"ActionCloneSprite", 37:"ActionRemoveSprite", 38:"ActionTrace", 39:"ActionStartDrag", 40:"ActionEndDrag", 41:"ActionStringLess", 42:"ActionThrow", 43:"ActionCastOp", 44:"ActionImplementsOp", 45:"ActionFSCommand2", 48:"ActionRandomNumber", 49:"ActionMBStringLength", 50:"ActionCharToAscii", 51:"ActionAsciiToChar", 52:"ActionGetTime", 53:"ActionMBStringExtrac", 54:"ActionMBCharToAscii", 55:"ActionMBAsciiToChar", 58:"ActionDelete", 
59:"ActionDelete2", 60:"ActionDefineLocal", 61:"ActionCallFunction", 62:"ActionReturn", 63:"ActionModulo", 64:"ActionNewObject", 65:"ActionDefineLocal2", 66:"ActionInitArray", 67:"ActionInitObject", 68:"ActionTypeOf", 69:"ActionTargetPath", 70:"ActionEnumerate", 71:"ActionAdd2", 72:"ActionLess2", 73:"ActionEquals2", 74:"ActionToNumber", 75:"ActionToString", 76:"ActionPushDuplicate", 77:"ActionStackSwap", 78:"ActionGetMember", 79:"ActionSetMember", 80:"ActionIncrement", 81:"ActionDecrement", 82:"ActionCallMethod", 
83:"ActionNewMethod", 84:"ActionInstanceOf", 85:"ActionEnumerate2", 96:"ActionBitAnd", 97:"ActionBitOr", 98:"ActionBitXor", 99:"ActionBitLShift", 100:"ActionBitRShift", 101:"ActionBitURShift", 102:"ActionStrictEquals", 103:"ActionGreater", 104:"ActionStringGreater", 105:"ActionExtends", 129:"ActionGotoFrame", 131:"ActionGetURL", 135:"ActionStoreRegister", 136:"ActionConstantPool", 137:"ActionStrictMode", 138:"ActionWaitForFrame", 139:"ActionSetTarget", 140:"ActionGoToLabel", 141:"ActionWaitForFrame2", 
142:"ActionDefineFunction", 143:"ActionTry", 148:"ActionWith", 150:"ActionPush", 153:"ActionJump", 154:"ActionGetURL2", 155:"ActionDefineFunction", 157:"ActionIf", 158:"ActionCall", 159:"ActionGotoFrame2"};
"undefined" !== typeof GLOBAL && (GLOBAL.executeActions = executeActions, GLOBAL.AS2Context = AS2Context);
var release = !1, inBrowser = "undefined" != typeof console;
inBrowser || (console = {info:print, warn:function(a) {
  traceWarnings.value && print(a)
}});
function backtrace() {
  try {
    throw Error();
  }catch(a) {
    return a.stack ? a.stack.split("\n").slice(2).join("\n") : ""
  }
}
function error(a) {
  inBrowser || console.info(backtrace());
  throw Error(a);
}
function assert(a) {
  "" === a && (a = !0);
  if(!a) {
    var b = Array.prototype.slice.call(arguments);
    b.shift();
    error(b.join(""))
  }
}
function assertFalse(a, b) {
  a && error(b)
}
function assertNotImplemented(a, b) {
  a || error(b)
}
function warning(a) {
  release || console.warn(a)
}
function notImplemented() {
  release || !0
}
function somewhatImplemented(a) {
  warning(a)
}
function unexpected() {
  release || !0
}
function makeForwardingGetter(a) {
  return function() {
    return this[a]
  }
}
function makeForwardingSetter(a) {
  return function(b) {
    this[a] = b
  }
}
function defineReadOnlyProperty(a, b, d) {
  Object.defineProperty(a, b, {value:d, writable:!1, configurable:!0, enumerable:!1})
}
function defineNonEnumerableGetterOrSetter(a, b, d, e) {
  e ? defineNonEnumerableGetter(a, b, d) : defineNonEnumerableSetter(a, b, d)
}
function defineNonEnumerableGetter(a, b, d) {
  Object.defineProperty(a, b, {get:d, configurable:!0, enumerable:!1})
}
function defineNonEnumerableSetter(a, b, d) {
  Object.defineProperty(a, b, {set:d, configurable:!0, enumerable:!1})
}
function defineNonEnumerableProperty(a, b, d) {
  Object.defineProperty(a, b, {value:d, writable:!0, configurable:!0, enumerable:!1})
}
function isNullOrUndefined(a) {
  return null === a || void 0 === a
}
function isPowerOfTwo(a) {
  return a && 0 === (a & a - 1)
}
function time(a, b) {
  for(var d = new Date, e = 0;e < b;e++) {
    a()
  }
  d = (new Date - d) / b;
  console.info("Took: " + d + "ms.");
  return d
}
function toKeyValueArray(a) {
  var b = Object.prototype.hasOwnProperty, d = [], e;
  for(e in a) {
    b.call(a, e) && d.push([e, a[e]])
  }
  return d
}
function isNumeric(a) {
  return"number" === typeof a || !isNaN(parseInt(a, 10))
}
function isString(a) {
  return"string" === typeof a
}
function setBitFlags(a, b, d) {
  return d ? a | b : a & ~b
}
function getBitFlags(a, b) {
  return!!(a & b)
}
(function() {
  function a(a, b, f) {
    a[b] || Object.defineProperty(a, b, {value:f, writable:!0, configurable:!0, enumerable:!1})
  }
  var b = String.prototype;
  a(b, "padRight", function(a, b) {
    var f = this, g = f.replace(/\033\[[0-9]*m/g, "").length;
    if(!a || g >= b) {
      return f
    }
    for(var g = (b - g) / a.length, k = 0;k < g;k++) {
      f += a
    }
    return f
  });
  a(b, "trim", function() {
    return this.replace(/^\s+|\s+$/g, "")
  });
  a(b, "endsWith", function(a) {
    return-1 !== this.indexOf(a, this.length - a.length)
  });
  b = Array.prototype;
  a(b, "popMany", function(a) {
    release || !0;
    var b = this.length - a, f = this.slice(b, this.length);
    this.splice(b, a);
    return f
  });
  a(b, "pushMany", function(a) {
    for(var b = 0;b < a.length;b++) {
      this.push(a[b])
    }
  });
  a(b, "clone", function() {
    return this.slice(0)
  });
  a(b, "first", function() {
    release || !0;
    return this[0]
  });
  a(b, "last", function() {
    release || !0;
    return this[this.length - 1]
  });
  a(b, "peek", function() {
    release || !0;
    return this[this.length - 1]
  });
  a(b, "empty", function() {
    return 0 === this.length
  });
  a(b, "pushUnique", function(a) {
    0 > this.indexOf(a) && this.push(a)
  });
  a(b, "unique", function() {
    for(var a = [], b = 0;b < this.length;b++) {
      a.pushUnique(this[b])
    }
    return a
  });
  a(b, "replace", function(a, b) {
    if(a === b) {
      return 0
    }
    for(var f = 0, g = 0;g < this.length;g++) {
      this[g] === a && (this[g] = b, f++)
    }
    return f
  });
  a(b, "count", function(a) {
    for(var b = 0, f = 0;f < this.length;f++) {
      this[f] === a && b++
    }
    return b
  });
  a(b, "notEmpty", function() {
    return 0 < this.length
  });
  a(b, "contains", function(a) {
    return 0 <= this.indexOf(a)
  });
  a(b, "top", function() {
    return this.length && this[this.length - 1]
  });
  a(b, "mapWithIndex", function(a) {
    for(var b = [], f = 0;f < this.length;f++) {
      b.push(a(this[f], f))
    }
    return b
  })
})();
function utf8decode(a) {
  for(var b = new Int8Array(4 * a.length), d = 0, e = 0, f = a.length;e < f;e++) {
    if(127 >= a.charCodeAt(e)) {
      b[d++] = a.charCodeAt(e)
    }else {
      for(var g = encodeURIComponent(a.charAt(e)).substr(1).split("%"), k = 0, l = g.length;k < l;k++) {
        b[d++] = parseInt(g[k], 16)
      }
    }
  }
  return b.subarray(0, d)
}
function utf8encode(a) {
  for(var b = "", d = String.fromCharCode, e = 0, f = a.length;e < f;e++) {
    var g = a[e], b = b + (127 >= g ? 37 === g ? "%25" : d(g) : "%" + g.toString(16).toUpperCase())
  }
  return decodeURIComponent(b)
}
function getFlags(a, b) {
  for(var d = "", e = 0;e < b.length;e++) {
    a & 1 << e && (d += b[e] + " ")
  }
  return 0 === d.length ? "" : d.trim()
}
function bitCount(a) {
  a -= a >> 1 & 1431655765;
  a = (a & 858993459) + (a >> 2 & 858993459);
  return 16843009 * (a + (a >> 4) & 252645135) >> 24
}
function BitSetFunctor(a) {
  function b() {
    this.dirty = this.count = 0;
    this.size = e;
    this.bits = new Uint32Array(e >> 5)
  }
  function d() {
    this.dirty = this.count = 0;
    this.size = e;
    this.bits = 0
  }
  var e = a + 31 >> 5 << 5, f = 1 === e >> 5, g = f ? d : b;
  g.ADDRESS_BITS_PER_WORD = 5;
  g.BITS_PER_WORD = 32;
  g.BIT_INDEX_MASK = 31;
  g.singleword = f;
  b.prototype = {recount:function() {
    if(this.dirty) {
      for(var a = this.bits, d = 0, b = 0, e = a.length;b < e;b++) {
        var g = a[b], g = g - (g >> 1 & 1431655765), g = (g & 858993459) + (g >> 2 & 858993459), d = d + (16843009 * (g + (g >> 4) & 252645135) >> 24)
      }
      this.count = d;
      this.dirty = 0
    }
  }, set:function(a) {
    var d = a >> 5, b = this.bits[d];
    a = b | 1 << (a & 31);
    this.bits[d] = a;
    this.dirty |= b ^ a
  }, setAll:function() {
    for(var a = this.bits, d = 0, b = a.length;d < b;d++) {
      a[d] = 4294967295
    }
    this.count = this.size;
    this.dirty = 0
  }, clear:function(a) {
    var d = a >> 5, b = this.bits[d];
    a = b & ~(1 << (a & 31));
    this.bits[d] = a;
    this.dirty |= b ^ a
  }, get:function(a) {
    return 0 !== (this.bits[a >> 5] & 1 << (a & 31))
  }, clearAll:function() {
    for(var a = this.bits, d = 0, b = a.length;d < b;d++) {
      a[d] = 0
    }
    this.dirty = this.count = 0
  }, _union:function(a) {
    var d = this.dirty, b = this.bits;
    a = a.bits;
    for(var e = 0, g = b.length;e < g;e++) {
      var f = b[e], v = f | a[e];
      b[e] = v;
      d |= f ^ v
    }
    this.dirty = d
  }, intersect:function(a) {
    var d = this.dirty, b = this.bits;
    a = a.bits;
    for(var e = 0, g = b.length;e < g;e++) {
      var f = b[e], v = f & a[e];
      b[e] = v;
      d |= f ^ v
    }
    this.dirty = d
  }, subtract:function(a) {
    var d = this.dirty, b = this.bits;
    a = a.bits;
    for(var e = 0, g = b.length;e < g;e++) {
      var f = b[e], v = f & ~a[e];
      b[e] = v;
      d |= f ^ v
    }
    this.dirty = d
  }, negate:function() {
    for(var a = this.dirty, d = this.bits, b = 0, e = d.length;b < e;b++) {
      var g = d[b], f = ~g;
      d[b] = f;
      a |= g ^ f
    }
    this.dirty = a
  }, forEach:function(a) {
    release || !0;
    for(var d = this.bits, b = 0, e = d.length;b < e;b++) {
      var g = d[b];
      if(g) {
        for(var f = 0;32 > f;f++) {
          g & 1 << f && a(32 * b + f)
        }
      }
    }
  }, toArray:function() {
    for(var a = [], d = this.bits, b = 0, e = d.length;b < e;b++) {
      var g = d[b];
      if(g) {
        for(var f = 0;32 > f;f++) {
          g & 1 << f && a.push(32 * b + f)
        }
      }
    }
    return a
  }, equals:function(a) {
    if(this.size !== a.size) {
      return!1
    }
    var d = this.bits;
    a = a.bits;
    for(var b = 0, e = d.length;b < e;b++) {
      if(d[b] !== a[b]) {
        return!1
      }
    }
    return!0
  }, contains:function(a) {
    if(this.size !== a.size) {
      return!1
    }
    var d = this.bits;
    a = a.bits;
    for(var b = 0, e = d.length;b < e;b++) {
      if((d[b] | a[b]) !== d[b]) {
        return!1
      }
    }
    return!0
  }, toBitString:function() {
    for(var d = "", b = 0;b < a;b++) {
      d += this.get(b) ? "1" : "0"
    }
    return d
  }, toString:function() {
    for(var d = [], b = 0;b < a;b++) {
      this.get(b) && d.push(b)
    }
    return d.join(", ")
  }, isEmpty:function() {
    this.recount();
    return 0 === this.count
  }, clone:function() {
    var a = new b;
    a._union(this);
    return a
  }};
  d.prototype = {recount:function() {
    if(this.dirty) {
      var a = this.bits, a = a - (a >> 1 & 1431655765), a = (a & 858993459) + (a >> 2 & 858993459);
      this.count = 0 + (16843009 * (a + (a >> 4) & 252645135) >> 24);
      this.dirty = 0
    }
  }, set:function(a) {
    var d = this.bits;
    this.bits = a = d | 1 << (a & 31);
    this.dirty |= d ^ a
  }, setAll:function() {
    this.bits = 4294967295;
    this.count = this.size;
    this.dirty = 0
  }, clear:function(a) {
    var d = this.bits;
    this.bits = a = d & ~(1 << (a & 31));
    this.dirty |= d ^ a
  }, get:function(a) {
    return 0 !== (this.bits & 1 << (a & 31))
  }, clearAll:function() {
    this.dirty = this.count = this.bits = 0
  }, _union:function(a) {
    var d = this.bits;
    this.bits = a = d | a.bits;
    this.dirty = d ^ a
  }, intersect:function(a) {
    var d = this.bits;
    this.bits = a = d & a.bits;
    this.dirty = d ^ a
  }, subtract:function(a) {
    var d = this.bits;
    this.bits = a = d & ~a.bits;
    this.dirty = d ^ a
  }, negate:function() {
    var a = this.bits, d = ~a;
    this.bits = d;
    this.dirty = a ^ d
  }, forEach:function(a) {
    release || !0;
    var d = this.bits;
    if(d) {
      for(var b = 0;32 > b;b++) {
        d & 1 << b && a(b)
      }
    }
  }, toArray:function() {
    var a = [], d = this.bits;
    if(d) {
      for(var b = 0;32 > b;b++) {
        d & 1 << b && a.push(b)
      }
    }
    return a
  }, equals:function(a) {
    return this.bits === a.bits
  }, contains:function(a) {
    var d = this.bits;
    return(d | a.bits) === d
  }, isEmpty:function() {
    this.recount();
    return 0 === this.count
  }, clone:function() {
    var a = new d;
    a._union(this);
    return a
  }, toBitString:b.prototype.toBitString, toString:b.prototype.toString};
  return g
}
function base64ArrayBuffer(a) {
  var b = "";
  a = new Uint8Array(a);
  for(var d = a.byteLength, e = d % 3, d = d - e, f, g, k, l, m = 0;m < d;m += 3) {
    l = a[m] << 16 | a[m + 1] << 8 | a[m + 2], f = (l & 16515072) >> 18, g = (l & 258048) >> 12, k = (l & 4032) >> 6, l &= 63, b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[f] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[g] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[k] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[l]
  }
  1 == e ? (l = a[d], b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(l & 252) >> 2] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(l & 3) << 4] + "==") : 2 == e && (l = a[d] << 8 | a[d + 1], b += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(l & 64512) >> 10] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(l & 1008) >> 4] + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(l & 15) << 2] + 
  "=");
  return b
}
var PURPLE = "\u001b[94m", YELLOW = "\u001b[93m", GREEN = "\u001b[92m", RED = "\u001b[91m", ENDC = "\u001b[0m", IndentingWriter = function() {
  function a(a, e) {
    this.tab = "  ";
    this.padding = "";
    this.suppressOutput = a;
    this.out = e || b
  }
  var b = console.info.bind(console);
  a.prototype.writeLn = function(a) {
    this.suppressOutput || this.out(this.padding + a)
  };
  a.prototype.debugLn = function(a) {
    this.suppressOutput || this.out(this.padding + "\u001b[94m" + a + "\u001b[0m")
  };
  a.prototype.enter = function(a) {
    this.suppressOutput || this.out(this.padding + a);
    this.indent()
  };
  a.prototype.leaveAndEnter = function(a) {
    this.leave(a);
    this.indent()
  };
  a.prototype.leave = function(a) {
    this.outdent();
    this.suppressOutput || this.out(this.padding + a)
  };
  a.prototype.indent = function() {
    this.padding += this.tab
  };
  a.prototype.outdent = function() {
    0 < this.padding.length && (this.padding = this.padding.substring(0, this.padding.length - this.tab.length))
  };
  a.prototype.writeArray = function(a, b, f) {
    b = b || !1;
    for(var g = 0, k = a.length;g < k;g++) {
      var l = "";
      b && (l = null === a[g] ? "null" : void 0 === a[g] ? "undefined" : a[g].constructor.name, l += " ");
      var m = f ? "" : ("" + g).padRight(" ", 4);
      this.writeLn(m + l + a[g])
    }
  };
  return a
}(), Map = function() {
  function a() {
    this.elements = {}
  }
  a.prototype.set = function(a, d) {
    this.elements[a] = d
  };
  a.prototype.get = function(a) {
    if(this.has(a)) {
      return this.elements[a]
    }
  };
  a.prototype.has = function(a) {
    return Object.prototype.hasOwnProperty.call(this.elements, a)
  };
  a.prototype.remove = function(a) {
    this.has(a) && delete this.elements[a]
  };
  return a
}(), SortedList = function() {
  function a(a) {
    release || !0;
    this.compare = a;
    this.head = null
  }
  a.prototype.push = function(a) {
    release || !0;
    if(this.head) {
      var d = this.head, e = null;
      a = {value:a, next:null};
      for(var f = this.compare;d;) {
        if(0 < f(d.value, a.value)) {
          e ? (a.next = d, e.next = a) : (a.next = this.head, this.head = a);
          return
        }
        e = d;
        d = d.next
      }
      e.next = a
    }else {
      this.head = {value:a, next:null}
    }
  };
  a.prototype.forEach = function(a) {
    for(var d = this.head;d;) {
      a(d.value), d = d.next
    }
  };
  a.prototype.pop = function() {
    if(this.head) {
      var a = this.head;
      this.head = this.head.next;
      return a.value
    }
  };
  a.prototype.peek = function() {
    return this.head
  };
  a.prototype.contains = function(a) {
    for(var d = this.head;d;) {
      if(d.value === a) {
        return!0
      }
      d = d.next
    }
    return!1
  };
  a.prototype.toString = function() {
    for(var a = "[ ", d = this.head;d;) {
      a += d.value.toString() + " ", d = d.next
    }
    return a + "]"
  };
  return a
}();
(function() {
  function a() {
    this.id = "$weakmap" + b++
  }
  if("function" !== typeof this.WeakMap) {
    var b = 0;
    a.prototype = {has:function(a) {
      return a.hasOwnProperty(this.id)
    }, get:function(a, b) {
      return a.hasOwnProperty(this.id) ? a[this.id] : b
    }, set:function(a, b) {
      Object.defineProperty(a, this.id, {value:b, enumerable:!1, configurable:!0})
    }};
    this.WeakMap = a
  }
})();
(function(a) {
  var b = function() {
    this.arguments = []
  }, d = function(a, d, b, e) {
    this.shortName = a;
    this.longName = d;
    this.type = b;
    e = e || {};
    this.positional = e.positional;
    this.parseFn = e.parse;
    this.value = e.defaultValue
  };
  d.prototype.parse = function(a) {
    "boolean" === this.type ? (release || !0, this.value = a) : "number" === this.type ? (release || !0, this.value = parseInt(a, 10)) : this.value = a;
    this.parseFn && this.parseFn(this.value)
  };
  b.prototype.addArgument = function(a, b, e, f) {
    a = new d(a, b, e, f);
    this.arguments.push(a);
    return a
  };
  b.prototype.addBoundOption = function(a) {
    this.arguments.push(new d(a.shortName, a.longName, a.type, {parse:function(d) {
      a.value = d
    }}))
  };
  b.prototype.addBoundOptionSet = function(a) {
    var d = this;
    a.options.forEach(function(a) {
      a instanceof e ? d.addBoundOptionSet(a) : (release || !0, d.addBoundOption(a))
    })
  };
  b.prototype.getUsage = function() {
    var a = "";
    this.arguments.forEach(function(d) {
      a = d.positional ? a + d.longName : a + ("[-" + d.shortName + "|--" + d.longName + ("boolean" === d.type ? "" : " " + d.type[0].toUpperCase()) + "]");
      a += " "
    });
    return a
  };
  b.prototype.parse = function(a) {
    var d = {}, b = [];
    this.arguments.forEach(function(a) {
      a.positional ? b.push(a) : (d["-" + a.shortName] = a, d["--" + a.longName] = a)
    });
    for(var e = [];a.length;) {
      var f = a.shift(), p = null, r = f;
      if("--" == f) {
        e = e.concat(a);
        break
      }else {
        "-" == f.slice(0, 1) || "--" == f.slice(0, 2) ? (p = d[f], release || !0, "boolean" !== p.type ? (r = a.shift(), release || !0) : r = !0) : b.length ? p = b.shift() : e.push(r)
      }
      p && p.parse(r)
    }
    release || !0;
    return e
  };
  var e, f = function(a) {
    this.name = a;
    this.options = []
  };
  f.prototype.register = function(a) {
    this.options.push(a);
    return a
  };
  f.prototype.trace = function(a) {
    a.enter(this.name + " {");
    this.options.forEach(function(d) {
      d.trace(a)
    });
    a.leave("}")
  };
  e = f;
  f = function(a, d, b, e, f) {
    this.longName = d;
    this.shortName = a;
    this.type = b;
    this.value = this.defaultValue = e;
    this.description = f
  };
  f.prototype.parse = function(a) {
    this.value = a
  };
  f.prototype.trace = function(a) {
    a.writeLn(("-" + this.shortName + "|--" + this.longName).padRight(" ", 30) + " = " + this.type + " " + this.value + " [" + this.defaultValue + "] (" + this.description + ")")
  };
  a.Option = f;
  a.OptionSet = e;
  a.ArgumentParser = b
})("undefined" === typeof exports ? options = {} : exports);
(function(a) {
  var b = function(a, d) {
    this.parent = a;
    this.timers = {};
    this.name = d;
    this.count = this.total = this.last = this.begin = 0
  }, d = new b(null, "Total"), e = d;
  b.prototype.start = function() {
    this.begin = (new Date).getTime()
  };
  b.prototype.stop = function() {
    this.last = (new Date).getTime() - this.begin;
    this.total += this.last;
    this.count += 1
  };
  b.time = function(a, d) {
    b.start(a);
    d();
    b.stop()
  };
  b.start = function(a) {
    e = a in e.timers ? e.timers[a] : e.timers[a] = new b(e, a);
    e.start()
  };
  b.stop = function() {
    e.stop();
    e = e.parent
  };
  b.prototype.toJSON = function() {
    return{name:this.name, total:this.total, timers:this.timers}
  };
  b.prototype.trace = function(a, d) {
    if(d) {
      a.writeLn("SHUMWAY$JSON " + JSON.stringify({timer:this}))
    }else {
      a.enter(this.name + ": " + this.total + " ms, count: " + this.count + ", average: " + (this.total / this.count).toFixed(2) + " ms");
      for(var b in this.timers) {
        this.timers[b].trace(a)
      }
      a.outdent()
    }
  };
  b.trace = function(a, b) {
    d.trace(a, b)
  };
  var f = function(a) {
    this.enabled = !!a;
    this.counts = {}
  };
  f.prototype.setEnabled = function(a) {
    this.enabled = a
  };
  f.prototype.toJSON = function() {
    return{counts:this.counts}
  };
  f.prototype.count = function(a, d) {
    this.enabled && (void 0 === this.counts[a] && (this.counts[a] = 0), this.counts[a] += void 0 !== d ? d : 1)
  };
  f.prototype.trace = function(a, d) {
    if(d) {
      a.writeLn("SHUMWAY$JSON " + JSON.stringify({counter:this}))
    }else {
      for(var b in this.counts) {
        a.writeLn(b + ": " + this.counts[b])
      }
    }
  };
  a.Timer = b;
  a.Counter = f
})("undefined" === typeof exports ? metrics = {} : exports);
var Counter = new metrics.Counter(!0), Timer = metrics.Timer, Option = options.Option, OptionSet = options.OptionSet, systemOptions = new OptionSet("System Options"), disassemble = systemOptions.register(new Option("d", "disassemble", "boolean", !1, "disassemble")), traceLevel = systemOptions.register(new Option("t", "traceLevel", "number", 0, "trace level"));
window.print = function(a) {
  console.log(a)
};
var CONSTANT_Undefined = 0, CONSTANT_Utf8 = 1, CONSTANT_Float = 2, CONSTANT_Int = 3, CONSTANT_UInt = 4, CONSTANT_PrivateNs = 5, CONSTANT_Double = 6, CONSTANT_QName = 7, CONSTANT_Namespace = 8, CONSTANT_Multiname = 9, CONSTANT_False = 10, CONSTANT_True = 11, CONSTANT_Null = 12, CONSTANT_QNameA = 13, CONSTANT_MultinameA = 14, CONSTANT_RTQName = 15, CONSTANT_RTQNameA = 16, CONSTANT_RTQNameL = 17, CONSTANT_RTQNameLA = 18, CONSTANT_NameL = 19, CONSTANT_NameLA = 20, CONSTANT_NamespaceSet = 21, CONSTANT_PackageNamespace = 
22, CONSTANT_PackageInternalNs = 23, CONSTANT_ProtectedNamespace = 24, CONSTANT_ExplicitNamespace = 25, CONSTANT_StaticProtectedNs = 26, CONSTANT_MultinameL = 27, CONSTANT_MultinameLA = 28, CONSTANT_TypeName = 29, CONSTANT_ClassSealed = 1, CONSTANT_ClassFinal = 2, CONSTANT_ClassInterface = 4, CONSTANT_ClassProtectedNs = 8, TRAIT_Slot = 0, TRAIT_Method = 1, TRAIT_Getter = 2, TRAIT_Setter = 3, TRAIT_Class = 4, TRAIT_Function = 5, TRAIT_Const = 6, ATTR_Final = 1, ATTR_Override = 2, ATTR_Metadata = 4, 
SLOT_var = 0, SLOT_method = 1, SLOT_getter = 2, SLOT_setter = 3, SLOT_class = 4, SLOT_function = 6, METHOD_Arguments = 1, METHOD_Activation = 2, METHOD_Needrest = 4, METHOD_HasOptional = 8, METHOD_IgnoreRest = 16, METHOD_Native = 32, METHOD_Setsdxns = 64, METHOD_HasParamNames = 128, OP_bkpt = 1, OP_nop = 2, OP_throw = 3, OP_getsuper = 4, OP_setsuper = 5, OP_dxns = 6, OP_dxnslate = 7, OP_kill = 8, OP_label = 9, OP_lf32x4 = 10, OP_sf32x4 = 11, OP_ifnlt = 12, OP_ifnle = 13, OP_ifngt = 14, OP_ifnge = 
15, OP_jump = 16, OP_iftrue = 17, OP_iffalse = 18, OP_ifeq = 19, OP_ifne = 20, OP_iflt = 21, OP_ifle = 22, OP_ifgt = 23, OP_ifge = 24, OP_ifstricteq = 25, OP_ifstrictne = 26, OP_lookupswitch = 27, OP_pushwith = 28, OP_popscope = 29, OP_nextname = 30, OP_hasnext = 31, OP_pushnull = 32, OP_pushundefined = 33, OP_pushfloat = 34, OP_nextvalue = 35, OP_pushbyte = 36, OP_pushshort = 37, OP_pushtrue = 38, OP_pushfalse = 39, OP_pushnan = 40, OP_pop = 41, OP_dup = 42, OP_swap = 43, OP_pushstring = 44, OP_pushint = 
45, OP_pushuint = 46, OP_pushdouble = 47, OP_pushscope = 48, OP_pushnamespace = 49, OP_hasnext2 = 50, OP_li8 = 53, OP_li16 = 54, OP_li32 = 55, OP_lf32 = 56, OP_lf64 = 57, OP_si8 = 58, OP_si16 = 59, OP_si32 = 60, OP_sf32 = 61, OP_sf64 = 62, OP_newfunction = 64, OP_call = 65, OP_construct = 66, OP_callmethod = 67, OP_callstatic = 68, OP_callsuper = 69, OP_callproperty = 70, OP_returnvoid = 71, OP_returnvalue = 72, OP_constructsuper = 73, OP_constructprop = 74, OP_callsuperid = 75, OP_callproplex = 
76, OP_callinterface = 77, OP_callsupervoid = 78, OP_callpropvoid = 79, OP_sxi1 = 80, OP_sxi8 = 81, OP_sxi16 = 82, OP_applytype = 83, OP_pushfloat4 = 84, OP_newobject = 85, OP_newarray = 86, OP_newactivation = 87, OP_newclass = 88, OP_getdescendants = 89, OP_newcatch = 90, OP_findpropstrict = 93, OP_findproperty = 94, OP_finddef = 95, OP_getlex = 96, OP_setproperty = 97, OP_getlocal = 98, OP_setlocal = 99, OP_getglobalscope = 100, OP_getscopeobject = 101, OP_getproperty = 102, OP_getouterscope = 
103, OP_initproperty = 104, OP_setpropertylate = 105, OP_deleteproperty = 106, OP_deletepropertylate = 107, OP_getslot = 108, OP_setslot = 109, OP_getglobalslot = 110, OP_setglobalslot = 111, OP_convert_s = 112, OP_esc_xelem = 113, OP_esc_xattr = 114, OP_convert_i = 115, OP_convert_u = 116, OP_convert_d = 117, OP_convert_b = 118, OP_convert_o = 119, OP_checkfilter = 120, OP_convert_f = 121, OP_unplus = 122, OP_convert_f4 = 123, OP_coerce = 128, OP_coerce_b = 129, OP_coerce_a = 130, OP_coerce_i = 
131, OP_coerce_d = 132, OP_coerce_s = 133, OP_astype = 134, OP_astypelate = 135, OP_coerce_u = 136, OP_coerce_o = 137, OP_negate = 144, OP_increment = 145, OP_inclocal = 146, OP_decrement = 147, OP_declocal = 148, OP_typeof = 149, OP_not = 150, OP_bitnot = 151, OP_add = 160, OP_subtract = 161, OP_multiply = 162, OP_divide = 163, OP_modulo = 164, OP_lshift = 165, OP_rshift = 166, OP_urshift = 167, OP_bitand = 168, OP_bitor = 169, OP_bitxor = 170, OP_equals = 171, OP_strictequals = 172, OP_lessthan = 
173, OP_lessequals = 174, OP_greaterthan = 175, OP_greaterequals = 176, OP_instanceof = 177, OP_istype = 178, OP_istypelate = 179, OP_in = 180, OP_increment_i = 192, OP_decrement_i = 193, OP_inclocal_i = 194, OP_declocal_i = 195, OP_negate_i = 196, OP_add_i = 197, OP_subtract_i = 198, OP_multiply_i = 199, OP_getlocal0 = 208, OP_getlocal1 = 209, OP_getlocal2 = 210, OP_getlocal3 = 211, OP_setlocal0 = 212, OP_setlocal1 = 213, OP_setlocal2 = 214, OP_setlocal3 = 215, OP_invalid = 237, OP_debug = 239, 
OP_debugline = 240, OP_debugfile = 241, OP_bkptline = 242, OP_timestamp = 243, INT_MIN_VALUE = -2147483648, INT_MAX_VALUE = 2147483647, UINT_MIN_VALUE = 0, UINT_MAX_VALUE = 4294967295, Errors = {OutOfMemoryError:{code:1E3, message:"The system is out of memory."}, NotImplementedError:{code:1001, message:"The method %1 is not implemented."}, InvalidPrecisionError:{code:1002, message:"Number.toPrecision has a range of 1 to 21. Number.toFixed and Number.toExponential have a range of 0 to 20. Specified value is not within expected range."}, 
InvalidRadixError:{code:1003, message:"The radix argument must be between 2 and 36; got %1."}, InvokeOnIncompatibleObjectError:{code:1004, message:"Method %1 was invoked on an incompatible object."}, ArrayIndexNotIntegerError:{code:1005, message:"Array index is not a positive integer (%1)."}, CallOfNonFunctionError:{code:1006, message:"%1 is not a function."}, ConstructOfNonFunctionError:{code:1007, message:"Instantiation attempted on a non-constructor."}, AmbiguousBindingError:{code:1008, message:"%1 is ambiguous; Found more than one matching binding."}, 
ConvertNullToObjectError:{code:1009, message:"Cannot access a property or method of a null object reference."}, ConvertUndefinedToObjectError:{code:1010, message:"A term is undefined and has no properties."}, IllegalOpcodeError:{code:1011, message:"Method %1 contained illegal opcode %2 at offset %3."}, LastInstExceedsCodeSizeError:{code:1012, message:"The last instruction exceeded code size."}, FindVarWithNoScopeError:{code:1013, message:"Cannot call OP_findproperty when scopeDepth is 0."}, ClassNotFoundError:{code:1014, 
message:"Class %1 could not be found."}, IllegalSetDxns:{code:1015, message:"Method %1 cannot set default xml namespace"}, DescendentsError:{code:1016, message:"Descendants operator (..) not supported on type %1."}, ScopeStackOverflowError:{code:1017, message:"Scope stack overflow occurred."}, ScopeStackUnderflowError:{code:1018, message:"Scope stack underflow occurred."}, GetScopeObjectBoundsError:{code:1019, message:"Getscopeobject %1 is out of bounds."}, CannotFallOffMethodError:{code:1020, message:"Code cannot fall off the end of a method."}, 
InvalidBranchTargetError:{code:1021, message:"At least one branch target was not on a valid instruction in the method."}, IllegalVoidError:{code:1022, message:"Type void may only be used as a function return type."}, StackOverflowError:{code:1023, message:"Stack overflow occurred."}, StackUnderflowError:{code:1024, message:"Stack underflow occurred."}, InvalidRegisterError:{code:1025, message:"An invalid register %1 was accessed."}, SlotExceedsCountError:{code:1026, message:"Slot %1 exceeds slotCount=%2 of %3."}, 
MethodInfoExceedsCountError:{code:1027, message:"Method_info %1 exceeds method_count=%2."}, DispIdExceedsCountError:{code:1028, message:"Disp_id %1 exceeds max_disp_id=%2 of %3."}, DispIdUndefinedError:{code:1029, message:"Disp_id %1 is undefined on %2."}, StackDepthUnbalancedError:{code:1030, message:"Stack depth is unbalanced. %1 != %2."}, ScopeDepthUnbalancedError:{code:1031, message:"Scope depth is unbalanced. %1 != %2."}, CpoolIndexRangeError:{code:1032, message:"Cpool index %1 is out of range %2."}, 
CpoolEntryWrongTypeError:{code:1033, message:"Cpool entry %1 is wrong type."}, CheckTypeFailedError:{code:1034, message:"Type Coercion failed: cannot convert %1 to %2."}, IllegalSuperCallError:{code:1035, message:"Illegal super expression found in method %1."}, CannotAssignToMethodError:{code:1037, message:"Cannot assign to a method %1 on %2."}, RedefinedError:{code:1038, message:"%1 is already defined."}, CannotVerifyUntilReferencedError:{code:1039, message:"Cannot verify method until it is referenced."}, 
CantUseInstanceofOnNonObjectError:{code:1040, message:"The right-hand side of instanceof must be a class or function."}, IsTypeMustBeClassError:{code:1041, message:"The right-hand side of operator must be a class."}, InvalidMagicError:{code:1042, message:"Not an ABC file.  major_version=%1 minor_version=%2."}, InvalidCodeLengthError:{code:1043, message:"Invalid code_length=%1."}, InvalidMethodInfoFlagsError:{code:1044, message:"MethodInfo-%1 unsupported flags=%2."}, UnsupportedTraitsKindError:{code:1045, 
message:"Unsupported traits kind=%1."}, MethodInfoOrderError:{code:1046, message:"MethodInfo-%1 referenced before definition."}, MissingEntryPointError:{code:1047, message:"No entry point was found."}, PrototypeTypeError:{code:1049, message:"Prototype objects must be vanilla Objects."}, ConvertToPrimitiveError:{code:1050, message:"Cannot convert %1 to primitive."}, IllegalEarlyBindingError:{code:1051, message:"Illegal early binding access to %1."}, InvalidURIError:{code:1052, message:"Invalid URI passed to %1 function."}, 
IllegalOverrideError:{code:1053, message:"Illegal override of %1 in %2."}, IllegalExceptionHandlerError:{code:1054, message:"Illegal range or target offsets in exception handler."}, WriteSealedError:{code:1056, message:"Cannot create property %1 on %2."}, IllegalSlotError:{code:1057, message:"%1 can only contain methods."}, IllegalOperandTypeError:{code:1058, message:"Illegal operand type: %1 must be %2."}, ClassInfoOrderError:{code:1059, message:"ClassInfo-%1 is referenced before definition."}, 
ClassInfoExceedsCountError:{code:1060, message:"ClassInfo %1 exceeds class_count=%2."}, NumberOutOfRangeError:{code:1061, message:"The value %1 cannot be converted to %2 without losing precision."}, WrongArgumentCountError:{code:1063, message:"Argument count mismatch on %1. Expected %2, got %3."}, CannotCallMethodAsConstructor:{code:1064, message:"Cannot call method %1 as constructor."}, UndefinedVarError:{code:1065, message:"Variable %1 is not defined."}, FunctionConstructorError:{code:1066, message:"The form function('function body') is not supported."}, 
IllegalNativeMethodBodyError:{code:1067, message:"Native method %1 has illegal method body."}, CannotMergeTypesError:{code:1068, message:"%1 and %2 cannot be reconciled."}, ReadSealedError:{code:1069, message:"Property %1 not found on %2 and there is no default value."}, CallNotFoundError:{code:1070, message:"Method %1 not found on %2"}, AlreadyBoundError:{code:1071, message:"Function %1 has already been bound to %2."}, ZeroDispIdError:{code:1072, message:"Disp_id 0 is illegal."}, DuplicateDispIdError:{code:1073, 
message:"Non-override method %1 replaced because of duplicate disp_id %2."}, ConstWriteError:{code:1074, message:"Illegal write to read-only property %1 on %2."}, MathNotFunctionError:{code:1075, message:"Math is not a function."}, MathNotConstructorError:{code:1076, message:"Math is not a constructor."}, WriteOnlyError:{code:1077, message:"Illegal read of write-only property %1 on %2."}, IllegalOpMultinameError:{code:1078, message:"Illegal opcode/multiname combination: %1<%2>."}, IllegalNativeMethodError:{code:1079, 
message:"Native methods are not allowed in loaded code."}, IllegalNamespaceError:{code:1080, message:"Illegal value for namespace."}, ReadSealedErrorNs:{code:1081, message:"Property %1 not found on %2 and there is no default value."}, NoDefaultNamespaceError:{code:1082, message:"No default namespace has been set."}, XMLPrefixNotBound:{code:1083, message:'The prefix "%1" for element "%2" is not bound.'}, XMLBadQName:{code:1084, message:"Element or attribute (\"%1\") does not match QName production: QName::=(NCName':')?NCName."}, 
XMLUnterminatedElementTag:{code:1085, message:'The element type "%1" must be terminated by the matching end-tag "</%2>".'}, XMLOnlyWorksWithOneItemLists:{code:1086, message:"The %1 method only works on lists containing one item."}, XMLAssignmentToIndexedXMLNotAllowed:{code:1087, message:"Assignment to indexed XML is not allowed."}, XMLMarkupMustBeWellFormed:{code:1088, message:"The markup in the document following the root element must be well-formed."}, XMLAssigmentOneItemLists:{code:1089, message:"Assignment to lists with more than one item is not supported."}, 
XMLMalformedElement:{code:1090, message:"XML parser failure: element is malformed."}, XMLUnterminatedCData:{code:1091, message:"XML parser failure: Unterminated CDATA section."}, XMLUnterminatedXMLDecl:{code:1092, message:"XML parser failure: Unterminated XML declaration."}, XMLUnterminatedDocTypeDecl:{code:1093, message:"XML parser failure: Unterminated DOCTYPE declaration."}, XMLUnterminatedComment:{code:1094, message:"XML parser failure: Unterminated comment."}, XMLUnterminatedAttribute:{code:1095, 
message:"XML parser failure: Unterminated attribute."}, XMLUnterminatedElement:{code:1096, message:"XML parser failure: Unterminated element."}, XMLUnterminatedProcessingInstruction:{code:1097, message:"XML parser failure: Unterminated processing instruction."}, XMLNamespaceWithPrefixAndNoURI:{code:1098, message:"Illegal prefix %1 for no namespace."}, RegExpFlagsArgumentError:{code:1100, message:"Cannot supply flags when constructing one RegExp from another."}, NoScopeError:{code:1101, message:"Cannot verify method %1 with unknown scope."}, 
IllegalDefaultValue:{code:1102, message:"Illegal default value for type %1."}, CannotExtendFinalClass:{code:1103, message:"Class %1 cannot extend final base class."}, XMLDuplicateAttribute:{code:1104, message:'Attribute "%1" was already specified for element "%2".'}, CorruptABCError:{code:1107, message:"The ABC data is corrupt, attempt to read out of bounds."}, InvalidBaseClassError:{code:1108, message:"The OP_newclass opcode was used with the incorrect base class."}, DanglingFunctionError:{code:1109, 
message:"Attempt to directly call unbound function %1 from method %2."}, CannotExtendError:{code:1110, message:"%1 cannot extend %2."}, CannotImplementError:{code:1111, message:"%1 cannot implement %2."}, CoerceArgumentCountError:{code:1112, message:"Argument count mismatch on class coercion.  Expected 1, got %1."}, InvalidNewActivationError:{code:1113, message:"OP_newactivation used in method without NEED_ACTIVATION flag."}, NoGlobalScopeError:{code:1114, message:"OP_getglobalslot or OP_setglobalslot used with no global scope."}, 
NotConstructorError:{code:1115, message:"%1 is not a constructor."}, ApplyError:{code:1116, message:"second argument to Function.prototype.apply must be an array."}, XMLInvalidName:{code:1117, message:"Invalid XML name: %1."}, XMLIllegalCyclicalLoop:{code:1118, message:"Illegal cyclical loop between nodes."}, DeleteTypeError:{code:1119, message:"Delete operator is not supported with operand of type %1."}, DeleteSealedError:{code:1120, message:"Cannot delete property %1 on %2."}, DuplicateMethodBodyError:{code:1121, 
message:"Method %1 has a duplicate method body."}, IllegalInterfaceMethodBodyError:{code:1122, message:"Interface method %1 has illegal method body."}, FilterError:{code:1123, message:"Filter operator not supported on type %1."}, InvalidHasNextError:{code:1124, message:"OP_hasnext2 requires object and index to be distinct registers."}, OutOfRangeError:{code:1125, message:"The index %1 is out of range %2."}, VectorFixedError:{code:1126, message:"Cannot change the length of a fixed Vector."}, TypeAppOfNonParamType:{code:1127, 
message:"Type application attempted on a non-parameterized type."}, WrongTypeArgCountError:{code:1128, message:"Incorrect number of type parameters for %1. Expected %2, got %3."}, JSONCyclicStructure:{code:1129, message:"Cyclic structure cannot be converted to JSON string."}, JSONInvalidReplacer:{code:1131, message:"Replacer argument to JSON stringifier must be an array or a two parameter function."}, JSONInvalidParseInput:{code:1132, message:"Invalid JSON parse input."}, FileOpenError:{code:1500, 
message:"Error occurred opening file %1."}, FileWriteError:{code:1501, message:"Error occurred writing to file %1."}, ScriptTimeoutError:{code:1502, message:"A script has executed for longer than the default timeout period of 15 seconds."}, ScriptTerminatedError:{code:1503, message:"A script failed to exit after 30 seconds and was terminated."}, EndOfFileError:{code:1504, message:"End of file."}, StringIndexOutOfBoundsError:{code:1505, message:"The string index %1 is out of bounds; must be in range %2 to %3."}, 
InvalidRangeError:{code:1506, message:"The specified range is invalid."}, NullArgumentError:{code:1507, message:"Argument %1 cannot be null."}, InvalidArgumentError:{code:1508, message:"The value specified for argument %1 is invalid."}, ArrayFilterNonNullObjectError:{code:1510, message:"When the callback argument is a method of a class, the optional this argument must be null."}, InvalidParamError:{code:2004, message:"One of the parameters is invalid."}, ParamRangeError:{code:2006, message:"The supplied index is out of bounds."}, 
NullPointerError:{code:2007, message:"Parameter %1 must be non-null."}, InvalidEnumError:{code:2008, message:"Parameter %1 must be one of the accepted values."}, CantInstantiateError:{code:2012, message:"%1 class cannot be instantiated."}, ArgumentError:{code:2015, message:"Invalid BitmapData."}, EOFError:{code:2030, message:"End of file was encountered."}, CompressedDataError:{code:2058, message:"There was an error decompressing the data."}, EmptyStringError:{code:2085, message:"Parameter %1 must be non-empty string."}, 
ProxyGetPropertyError:{code:2088, message:"The Proxy class does not implement getProperty. It must be overridden by a subclass."}, ProxySetPropertyError:{code:2089, message:"The Proxy class does not implement setProperty. It must be overridden by a subclass."}, ProxyCallPropertyError:{code:2090, message:"The Proxy class does not implement callProperty. It must be overridden by a subclass."}, ProxyHasPropertyError:{code:2091, message:"The Proxy class does not implement hasProperty. It must be overridden by a subclass."}, 
ProxyDeletePropertyError:{code:2092, message:"The Proxy class does not implement deleteProperty. It must be overridden by a subclass."}, ProxyGetDescendantsError:{code:2093, message:"The Proxy class does not implement getDescendants. It must be overridden by a subclass."}, ProxyNextNameIndexError:{code:2105, message:"The Proxy class does not implement nextNameIndex. It must be overridden by a subclass."}, ProxyNextNameError:{code:2106, message:"The Proxy class does not implement nextName. It must be overridden by a subclass."}, 
ProxyNextValueError:{code:2107, message:"The Proxy class does not implement nextValue. It must be overridden by a subclass."}, InvalidArrayLengthError:{code:2108, message:"The value %1 is not a valid Array length."}, ReadExternalNotImplementedError:{code:2173, message:"Unable to read object in stream.  The class %1 does not implement flash.utils.IExternalizable but is aliased to an externalizable class."}};
function getErrorMessage(a) {
  if(!debuggerMode.value) {
    return"Error #" + a
  }
  for(var b in Errors) {
    if(Errors[b].code == a) {
      return"Error #" + a + ": " + Errors[b].message
    }
  }
}
function formatErrorMessage(a) {
  var b = a.message;
  Array.prototype.slice.call(arguments, 1).forEach(function(a, e) {
    b = b.replace("%" + (e + 1), a)
  });
  return"Error #" + a.code + ": " + b
}
function translateErrorMessage(a) {
  if(a.type) {
    switch(a.type) {
      case "undefined_method":
        return formatErrorMessage(Errors.CallOfNonFunctionError, "value");
      default:
        throw notImplemented(a.type);
    }
  }else {
    return 0 <= a.message.indexOf("is not a function") ? formatErrorMessage(Errors.CallOfNonFunctionError, "value") : a.message
  }
}
var opcodeTable = [null, {name:"bkpt", operands:"", canThrow:!1, stackDelta:0}, {name:"nop", operands:"", canThrow:!1, stackDelta:0}, {name:"throw", operands:"", canThrow:!0, stackDelta:-1}, {name:"getsuper", operands:"index:u30", canThrow:!0, stackDelta:0}, {name:"setsuper", operands:"index:u30", canThrow:!0, stackDelta:-2}, {name:"dxns", operands:"index:u30", canThrow:!0, stackDelta:0}, {name:"dxnslate", operands:"", canThrow:!0, stackDelta:-1}, {name:"kill", operands:"index:u30", canThrow:!1, 
stackDelta:0}, {name:"label", operands:"", canThrow:!1, stackDelta:0}, {name:"lf32x4", operands:"", canThrow:!0, stackDelta:0}, {name:"sf32x4", operands:"", canThrow:!0, stackDelta:-2}, {name:"ifnlt", operands:"offset:s24", canThrow:!0, stackDelta:-2}, {name:"ifnle", operands:"offset:s24", canThrow:!0, stackDelta:-2}, {name:"ifngt", operands:"offset:s24", canThrow:!0, stackDelta:-2}, {name:"ifnge", operands:"offset:s24", canThrow:!0, stackDelta:-2}, {name:"jump", operands:"offset:s24", canThrow:!1, 
stackDelta:0}, {name:"iftrue", operands:"offset:s24", canThrow:!1, stackDelta:-1}, {name:"iffalse", operands:"offset:s24", canThrow:!1, stackDelta:-1}, {name:"ifeq", operands:"offset:s24", canThrow:!0, stackDelta:-2}, {name:"ifne", operands:"offset:s24", canThrow:!0, stackDelta:-2}, {name:"iflt", operands:"offset:s24", canThrow:!0, stackDelta:-2}, {name:"ifle", operands:"offset:s24", canThrow:!0, stackDelta:-2}, {name:"ifgt", operands:"offset:s24", canThrow:!0, stackDelta:-2}, {name:"ifge", operands:"offset:s24", 
canThrow:!0, stackDelta:-2}, {name:"ifstricteq", operands:"offset:s24", canThrow:!1, stackDelta:-2}, {name:"ifstrictne", operands:"offset:s24", canThrow:!1, stackDelta:-2}, {name:"lookupswitch", operands:null, canThrow:!1, stackDelta:-1}, {name:"pushwith", operands:"", canThrow:!1, stackDelta:-1}, {name:"popscope", operands:"", canThrow:!1, stackDelta:0}, {name:"nextname", operands:"", canThrow:!0, stackDelta:-1}, {name:"hasnext", operands:"", canThrow:!0, stackDelta:-1}, {name:"pushnull", operands:"", 
canThrow:!1, stackDelta:1}, {name:"pushundefined", operands:"", canThrow:!1, stackDelta:1}, null, {name:"nextvalue", operands:"", canThrow:!0, stackDelta:-1}, {name:"pushbyte", operands:"value:s08", canThrow:!1, stackDelta:1}, {name:"pushshort", operands:"value:s16", canThrow:!1, stackDelta:1}, {name:"pushtrue", operands:"", canThrow:!1, stackDelta:1}, {name:"pushfalse", operands:"", canThrow:!1, stackDelta:1}, {name:"pushnan", operands:"", canThrow:!1, stackDelta:1}, {name:"pop", operands:"", canThrow:!1, 
stackDelta:-1}, {name:"dup", operands:"", canThrow:!1, stackDelta:1}, {name:"swap", operands:"", canThrow:!1, stackDelta:0}, {name:"pushstring", operands:"index:u30S", canThrow:!1, stackDelta:1}, {name:"pushint", operands:"index:u30I", canThrow:!1, stackDelta:1}, {name:"pushuint", operands:"index:u30U", canThrow:!1, stackDelta:1}, {name:"pushdouble", operands:"index:u30D", canThrow:!1, stackDelta:1}, {name:"pushscope", operands:"", canThrow:!1, stackDelta:-1}, {name:"pushnamespace", operands:"index:u30N", 
canThrow:!1, stackDelta:1}, {name:"hasnext2", operands:"object:u30,index:u30", canThrow:!0, stackDelta:1}, {name:"lix8", operands:null, canThrow:!0, stackDelta:0, internal:!0}, {name:"lix16", operands:null, canThrow:!0, stackDelta:0, internal:!0}, {name:"li8", operands:"", canThrow:!0, stackDelta:0}, {name:"li16", operands:"", canThrow:!0, stackDelta:0}, {name:"li32", operands:"", canThrow:!0, stackDelta:0}, {name:"lf32", operands:"", canThrow:!0, stackDelta:0}, {name:"lf64", operands:"", canThrow:!0, 
stackDelta:0}, {name:"si8", operands:"", canThrow:!0, stackDelta:-2}, {name:"si16", operands:"", canThrow:!0, stackDelta:-2}, {name:"si32", operands:"", canThrow:!0, stackDelta:-2}, {name:"sf32", operands:"", canThrow:!0, stackDelta:-2}, {name:"sf64", operands:"", canThrow:!0, stackDelta:-2}, null, {name:"newfunction", operands:"index:u30MI", canThrow:!0, stackDelta:1}, {name:"call", operands:"argCount:u30", canThrow:!0, stackDelta:-1}, {name:"construct", operands:"argCount:u30", canThrow:!0, stackDelta:0}, 
{name:"callmethod", operands:"index:u30,argCount:u30", canThrow:!0, stackDelta:0}, {name:"callstatic", operands:"index:u30MI,argCount:u30", canThrow:!0, stackDelta:0}, {name:"callsuper", operands:"index:u30M,argCount:u30", canThrow:!0, stackDelta:0}, {name:"callproperty", operands:"index:u30M,argCount:u30", canThrow:!0, stackDelta:0}, {name:"returnvoid", operands:"", canThrow:!1, stackDelta:0}, {name:"returnvalue", operands:"", canThrow:!0, stackDelta:-1}, {name:"constructsuper", operands:"argCount:u30", 
canThrow:!0, stackDelta:-1}, {name:"constructprop", operands:"index:u30M,argCount:u30", canThrow:!0, stackDelta:0}, {name:"callsuperid", operands:null, canThrow:!0, stackDelta:0, internal:!0}, {name:"callproplex", operands:"index:u30M,argCount:u30", canThrow:!0, stackDelta:0}, {name:"callinterface", operands:null, canThrow:!0, stackDelta:0, internal:!0}, {name:"callsupervoid", operands:"index:u30M,argCount:u30", canThrow:!0, stackDelta:-1}, {name:"callpropvoid", operands:"index:u30M,argCount:u30", 
canThrow:!0, stackDelta:-1}, {name:"sxi1", operands:"", canThrow:!1, stackDelta:0}, {name:"sxi8", operands:"", canThrow:!1, stackDelta:0}, {name:"sxi16", operands:"", canThrow:!1, stackDelta:0}, {name:"applytype", operands:"argCount:u30", canThrow:!0, stackDelta:0}, {name:"pushfloat4", operands:null, canThrow:!1, stackDelta:1}, {name:"newobject", operands:"argCount:u30", canThrow:!0, stackDelta:1}, {name:"newarray", operands:"argCount:u30", canThrow:!0, stackDelta:1}, {name:"newactivation", operands:"", 
canThrow:!0, stackDelta:1}, {name:"newclass", operands:"index:u30CI", canThrow:!0, stackDelta:0}, {name:"getdescendants", operands:"index:u30M", canThrow:!0, stackDelta:0}, {name:"newcatch", operands:"index:u30EI", canThrow:!0, stackDelta:1}, {name:"findpropglobalstrict", operands:null, canThrow:!0, stackDelta:0, internal:!0}, {name:"findpropglobal", operands:null, canThrow:!0, stackDelta:0, internal:!0}, {name:"findpropstrict", operands:"index:u30M", canThrow:!0, stackDelta:1}, {name:"findproperty", 
operands:"index:u30M", canThrow:!0, stackDelta:1}, {name:"finddef", operands:null, canThrow:!0, stackDelta:1}, {name:"getlex", operands:"index:u30M", canThrow:!0, stackDelta:1}, {name:"setproperty", operands:"index:u30M", canThrow:!0, stackDelta:-2}, {name:"getlocal", operands:"index:u30", canThrow:!1, stackDelta:1}, {name:"setlocal", operands:"index:u30", canThrow:!1, stackDelta:-1}, {name:"getglobalscope", operands:"", canThrow:!1, stackDelta:1}, {name:"getscopeobject", operands:"index:u30", canThrow:!1, 
stackDelta:1}, {name:"getproperty", operands:"index:u30M", canThrow:!0, stackDelta:0}, {name:"getouterscope", operands:null, canThrow:!1, stackDelta:1}, {name:"initproperty", operands:"index:u30M", canThrow:!0, stackDelta:-2}, null, {name:"deleteproperty", operands:"index:u30M", canThrow:!0, stackDelta:0}, null, {name:"getslot", operands:"index:u30", canThrow:!0, stackDelta:0}, {name:"setslot", operands:"index:u30", canThrow:!0, stackDelta:-2}, {name:"getglobalslot", operands:"index:u30", canThrow:!1, 
stackDelta:1}, {name:"setglobalslot", operands:"index:u30", canThrow:!1, stackDelta:-1}, {name:"convert_s", operands:"", canThrow:!0, stackDelta:0}, {name:"esc_xelem", operands:"", canThrow:!0, stackDelta:0}, {name:"esc_xattr", operands:"", canThrow:!0, stackDelta:0}, {name:"convert_i", operands:"", canThrow:!0, stackDelta:0}, {name:"convert_u", operands:"", canThrow:!0, stackDelta:0}, {name:"convert_d", operands:"", canThrow:!0, stackDelta:0}, {name:"convert_b", operands:"", canThrow:!0, stackDelta:0}, 
{name:"convert_o", operands:"", canThrow:!0, stackDelta:0}, {name:"checkfilter", operands:"", canThrow:!0, stackDelta:0}, {name:"convert_f", operands:"", canThrow:!0, stackDelta:0}, {name:"unplus", operands:"", canThrow:!0, stackDelta:0}, {name:"convert_f4", operands:"", canThrow:!0, stackDelta:0}, null, null, null, null, {name:"coerce", operands:"index:u30M", canThrow:!0, stackDelta:0}, {name:"coerce_b", operands:"", canThrow:!0, stackDelta:0}, {name:"coerce_a", operands:"", canThrow:!0, stackDelta:0}, 
{name:"coerce_i", operands:"", canThrow:!0, stackDelta:0}, {name:"coerce_d", operands:"", canThrow:!0, stackDelta:0}, {name:"coerce_s", operands:"", canThrow:!0, stackDelta:0}, {name:"astype", operands:"index:u30M", canThrow:!0, stackDelta:0}, {name:"astypelate", operands:"", canThrow:!0, stackDelta:-1}, {name:"coerce_u", operands:"", canThrow:!0, stackDelta:0}, {name:"coerce_o", operands:"", canThrow:!0, stackDelta:0}, null, null, null, null, null, null, {name:"negate", operands:"", canThrow:!0, 
stackDelta:0}, {name:"increment", operands:"", canThrow:!0, stackDelta:0}, {name:"inclocal", operands:"index:u30", canThrow:!0, stackDelta:0}, {name:"decrement", operands:"", canThrow:!0, stackDelta:0}, {name:"declocal", operands:"index:u30", canThrow:!0, stackDelta:0}, {name:"typeof", operands:"", canThrow:!1, stackDelta:0}, {name:"not", operands:"", canThrow:!1, stackDelta:0}, {name:"bitnot", operands:"", canThrow:!0, stackDelta:0}, null, null, null, null, null, null, null, null, {name:"add", operands:"", 
canThrow:!0, stackDelta:-1}, {name:"subtract", operands:"", canThrow:!0, stackDelta:-1}, {name:"multiply", operands:"", canThrow:!0, stackDelta:-1}, {name:"divide", operands:"", canThrow:!0, stackDelta:-1}, {name:"modulo", operands:"", canThrow:!0, stackDelta:-1}, {name:"lshift", operands:"", canThrow:!0, stackDelta:-1}, {name:"rshift", operands:"", canThrow:!0, stackDelta:-1}, {name:"urshift", operands:"", canThrow:!0, stackDelta:-1}, {name:"bitand", operands:"", canThrow:!0, stackDelta:-1}, {name:"bitor", 
operands:"", canThrow:!0, stackDelta:-1}, {name:"bitxor", operands:"", canThrow:!0, stackDelta:-1}, {name:"equals", operands:"", canThrow:!0, stackDelta:-1}, {name:"strictequals", operands:"", canThrow:!0, stackDelta:-1}, {name:"lessthan", operands:"", canThrow:!0, stackDelta:-1}, {name:"lessequals", operands:"", canThrow:!0, stackDelta:-1}, {name:"greaterthan", operands:"", canThrow:!0, stackDelta:-1}, {name:"greaterequals", operands:"", canThrow:!0, stackDelta:-1}, {name:"instanceof", operands:"", 
canThrow:!0, stackDelta:-1}, {name:"istype", operands:"index:u30M", canThrow:!0, stackDelta:0}, {name:"istypelate", operands:"", canThrow:!0, stackDelta:-1}, {name:"in", operands:"", canThrow:!0, stackDelta:-1}, null, null, null, null, null, null, null, null, null, null, null, {name:"increment_i", operands:"", canThrow:!0, stackDelta:0}, {name:"decrement_i", operands:"", canThrow:!0, stackDelta:0}, {name:"inclocal_i", operands:"index:u30", canThrow:!0, stackDelta:0}, {name:"declocal_i", operands:"index:u30", 
canThrow:!0, stackDelta:0}, {name:"negate_i", operands:"", canThrow:!0, stackDelta:0}, {name:"add_i", operands:"", canThrow:!0, stackDelta:-1}, {name:"subtract_i", operands:"", canThrow:!0, stackDelta:-1}, {name:"multiply_i", operands:"", canThrow:!0, stackDelta:-1}, null, null, null, null, null, null, null, null, {name:"getlocal0", operands:"", canThrow:!1, stackDelta:1}, {name:"getlocal1", operands:"", canThrow:!1, stackDelta:1}, {name:"getlocal2", operands:"", canThrow:!1, stackDelta:1}, {name:"getlocal3", 
operands:"", canThrow:!1, stackDelta:1}, {name:"setlocal0", operands:"", canThrow:!1, stackDelta:-1}, {name:"setlocal1", operands:"", canThrow:!1, stackDelta:-1}, {name:"setlocal2", operands:"", canThrow:!1, stackDelta:-1}, {name:"setlocal3", operands:"", canThrow:!1, stackDelta:-1}, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, {name:"invalid", operands:"", canThrow:!1, stackDelta:0}, null, {name:"debug", operands:"debugType:u08,index:u30S,reg:u08,extra:u30", 
canThrow:!0, stackDelta:0}, {name:"debugline", operands:"lineNumber:u30", canThrow:!0, stackDelta:0}, {name:"debugfile", operands:"index:u30S", canThrow:!0, stackDelta:0}, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
(function() {
  function a(a) {
    a = a.split(":");
    return{name:a[0], size:a[1].substring(0, 3), type:a[1].substring(3)}
  }
  for(var b = 0;b < opcodeTable.length;b++) {
    var d = opcodeTable[b];
    d && null !== d.operands && (d.operands = "" === d.operands ? [] : d.operands.split(",").map(a))
  }
})();
function opcodeName(a) {
  return opcodeTable[a].name
}
var AbcStream = function() {
  function a(a) {
    this.bytes = a;
    this.view = new DataView(a.buffer, a.byteOffset);
    this.pos = 0
  }
  var b = new Int32Array(256);
  a.prototype = {get position() {
    return this.pos
  }, remaining:function() {
    return this.bytes.length - this.pos
  }, seek:function(a) {
    this.pos = a
  }, readU8:function() {
    return this.bytes[this.pos++]
  }, readU8s:function(a) {
    var b = new Uint8Array(a);
    b.set(this.bytes.subarray(this.pos, this.pos + a), 0);
    this.pos += a;
    return b
  }, readS8:function() {
    return this.bytes[this.pos++] << 24 >> 24
  }, readU32:function() {
    return this.readS32() >>> 0
  }, readU30:function() {
    return this.readU32()
  }, readU30Unsafe:function() {
    return this.readU32()
  }, readS16:function() {
    return this.readU30Unsafe() << 16 >> 16
  }, readS32:function() {
    var a = this.readU8();
    a & 128 && (a = a & 127 | this.readU8() << 7, a & 16384 && (a = a & 16383 | this.readU8() << 14, a & 2097152 && (a = a & 2097151 | this.readU8() << 21, a & 268435456 && (a = a & 268435455 | this.readU8() << 28, a &= 4294967295))));
    return a
  }, readWord:function() {
    var a = this.view.getUint32(this.pos, !0);
    this.pos += 4;
    return a
  }, readS24:function() {
    return(this.readU8() | this.readU8() << 8 | this.readU8() << 16) << 8 >> 8
  }, readDouble:function() {
    var a = this.view.getFloat64(this.pos, !0);
    this.pos += 8;
    return a
  }, readUTFString:function(a) {
    var e = this.pos, f = e + a, g = this.bytes, k = 0;
    if(!b || b.length < a) {
      b = new Int32Array(2 * a)
    }
    for(a = b;e < f;) {
      var l = g[e++];
      if(127 >= l) {
        a[k++] = l
      }else {
        if(192 <= l) {
          var m = 0;
          224 > l ? m = (l & 31) << 6 | g[e++] & 63 : 240 > l ? m = (l & 15) << 12 | (g[e++] & 63) << 6 | g[e++] & 63 : (m = ((l & 7) << 18 | (g[e++] & 63) << 12 | (g[e++] & 63) << 6 | g[e++] & 63) - 65536, a[k++] = ((m & 1047552) >>> 10) + 55296, m = (m & 1023) + 56320);
          a[k++] = m
        }
      }
    }
    this.pos = e;
    return String.fromCharCode.apply(null, a.subarray(0, k))
  }};
  return a
}();
function parseTraits(a, b, d) {
  for(var e = b.readU30(), f = [], g = 0;g < e;g++) {
    f.push(new Trait(a, b, d))
  }
  return f
}
var Trait = function() {
  function a(a, d, e) {
    var f = a.constantPool, g = a.methods, k = a.classes;
    a = a.metadata;
    this.holder = e;
    this.name = f.multinames[d.readU30()];
    e = d.readU8();
    this.kind = e & 15;
    this.attributes = e >> 4 & 15;
    release || !0;
    switch(this.kind) {
      case 0:
      ;
      case 6:
        this.slotId = d.readU30();
        this.typeName = f.multinames[d.readU30()];
        g = d.readU30();
        this.value = void 0;
        0 !== g && (this.value = f.getValue(d.readU8(), g));
        break;
      case 1:
      ;
      case 3:
      ;
      case 2:
        this.dispId = d.readU30();
        this.methodInfo = g[d.readU30()];
        this.methodInfo.name = this.name;
        attachHolder(this.methodInfo, this.holder);
        break;
      case 4:
        this.slotId = d.readU30();
        release || !0;
        this.classInfo = k[d.readU30()];
        break;
      case 5:
        release || !0
    }
    if(this.attributes & 4) {
      for(var l, f = 0, g = d.readU30();f < g;f++) {
        k = a[d.readU30()], "__go_to_definition_help" === k.tagName || "__go_to_ctor_definition_help" === k.tagName || (l || (l = {}), l[k.tagName] = k)
      }
      l && (this.metadata = l)
    }
  }
  a.prototype.isSlot = function() {
    return 0 === this.kind
  };
  a.prototype.isConst = function() {
    return 6 === this.kind
  };
  a.prototype.isMethod = function() {
    return 1 === this.kind
  };
  a.prototype.isClass = function() {
    return 4 === this.kind
  };
  a.prototype.isGetter = function() {
    return 2 === this.kind
  };
  a.prototype.isSetter = function() {
    return 3 === this.kind
  };
  a.prototype.isProtected = function() {
    return this.name.namespaces[0].isProtected()
  };
  a.prototype.kindName = function() {
    switch(this.kind) {
      case 0:
        return"Slot";
      case 6:
        return"Const";
      case 1:
        return"Method";
      case 3:
        return"Setter";
      case 2:
        return"Getter";
      case 4:
        return"Class";
      case 5:
        return"Function"
    }
    unexpected()
  };
  a.prototype.isOverride = function() {
    return this.attributes & 2
  };
  a.prototype.isFinal = function() {
    return this.attributes & 1
  };
  a.prototype.toString = function() {
    var a = getFlags(this.attributes, ["final", "override", "metadata"]);
    a && (a += " ");
    a += Multiname.getQualifiedName(this.name) + ", kind: " + this.kind;
    switch(this.kind) {
      case 0:
      ;
      case 6:
        return a + ", slotId: " + this.slotId + ", typeName: " + this.typeName + ", value: " + this.value;
      case 1:
      ;
      case 3:
      ;
      case 2:
        return a + ", method: " + this.methodInfo + ", dispId: " + this.dispId;
      case 4:
        return a + ", slotId: " + this.slotId + ", class: " + this.classInfo
    }
  };
  return a
}(), ShumwayNamespace = function() {
  function a(a, d) {
    void 0 !== a && (void 0 === d && (d = ""), this.kind = a, this.originalURI = this.uri = d, b.call(this))
  }
  function b() {
    if(this.isPublic() && this.uri) {
      var a = this.uri.length - 1;
      58004 < this.uri.charCodeAt(a) && (this.uri = this.uri.substring(0, a - 1))
    }else {
      this.isUnique() && (this.uri = String(this.uri + Date.now()))
    }
    a = this.uri;
    if(release) {
      for(var b = new ArrayBuffer(a.length), e = new Uint8Array(b), l = 0, m = a.length;l < m;l++) {
        e[l] = a.charCodeAt(l)
      }
      a = base64ArrayBuffer(b).replace(/=/g, "")
    }else {
      void 0 !== a && (a = a.replace(/\.|:|-|\//gi, "$"))
    }
    this.uri = a;
    release || !0;
    this.qualifiedName = d[this.kind] + (this.uri ? "$" + this.uri : "")
  }
  var d = {};
  d[CONSTANT_Namespace] = "public";
  d[CONSTANT_PackageNamespace] = "public";
  d[CONSTANT_PackageInternalNs] = "packageInternal";
  d[CONSTANT_PrivateNs] = "private";
  d[CONSTANT_ProtectedNamespace] = "protected";
  d[CONSTANT_ExplicitNamespace] = "explicit";
  d[CONSTANT_StaticProtectedNs] = "staticProtected";
  a.kindFromString = function(a) {
    for(var b in d) {
      if(d[b] === a) {
        return b
      }
    }
    return release || !0
  };
  a.createNamespace = function(d) {
    return new a(8, d)
  };
  a.prototype = Object.create({parse:function(a, d) {
    this.kind = d.readU8();
    this.originalURI = this.uri = a.strings[d.readU30()];
    b.call(this)
  }, isPublic:function() {
    return 8 === this.kind || 22 === this.kind
  }, isProtected:function() {
    return 24 === this.kind
  }, isUnique:function() {
    return 5 === this.kind || 24 === this.kind || 8 === this.kind && "" === this.uri
  }, isDynamic:function() {
    return this.isPublic() && !this.uri
  }, getURI:function() {
    return this.uri
  }, toString:function() {
    return d[this.kind] + (this.originalURI ? "$" + this.originalURI : "")
  }, clone:function() {
    var d = new a;
    d.kind = this.kind;
    d.uri = this.uri;
    d.originalURI = this.originalURI;
    d.qualifiedName = this.qualifiedName;
    return d
  }, isEqualTo:function(a) {
    return this.qualifiedName === a.qualifiedName
  }, getAccessModifier:function() {
    return d[this.kind]
  }});
  a.PUBLIC = new a(8);
  a.PROTECTED = new a(24);
  var e = {};
  a.fromSimpleName = function(b) {
    if(b in e) {
      return e[b]
    }
    var g;
    0 === b.indexOf("[") ? (release || !0, g = b.substring(1, b.length - 1).split(",")) : g = [b];
    return e[b] = g.map(function(b) {
      b = b.trim();
      var e;
      0 < b.indexOf(" ") ? (e = b.substring(0, b.indexOf(" ")).trim(), b = b.substring(b.indexOf(" ") + 1).trim()) : b === d[8] || b === d[23] || b === d[5] || b === d[24] || b === d[25] || b === d[26] ? (e = b, b = "") : e = "public";
      return new a(a.kindFromString(e), b)
    })
  };
  return a
}(), Multiname = function() {
  function a(a, d, g) {
    this.id = b++;
    this.namespaces = a;
    this.name = d;
    this.flags = g || 0
  }
  var b = 1;
  a.parse = function(a, d, b) {
    var k = 0, l = d.readU8(), m, n = [], p = 0, r;
    switch(l) {
      case 7:
      ;
      case 13:
        (k = d.readU30()) && (n = [a.namespaces[k]]);
        (k = d.readU30()) && (m = a.strings[k]);
        break;
      case 15:
      ;
      case 16:
        (k = d.readU30()) && (m = a.strings[k]);
        p |= 2;
        break;
      case 17:
      ;
      case 18:
        p |= 6;
        break;
      case 9:
      ;
      case 14:
        (k = d.readU30()) && (m = a.strings[k]);
        k = d.readU30();
        release || !0;
        n = a.namespaceSets[k];
        break;
      case 27:
      ;
      case 28:
        p |= 4;
        k = d.readU30();
        release || !0;
        n = a.namespaceSets[k];
        break;
      case 29:
        k = d.readU32();
        n = b[k].namespaces;
        m = b[k].name;
        d.readU32();
        release || !0;
        k = d.readU32();
        r = b[k];
        break;
      default:
        unexpected()
    }
    switch(l) {
      case 13:
      ;
      case 16:
      ;
      case 18:
      ;
      case 14:
      ;
      case 28:
        p |= 1
    }
    a = new Multiname(n, m, p);
    r && (a.typeParameter = r);
    return a
  };
  a.isMultiname = function(a) {
    return"number" === typeof a || "string" === typeof a || a instanceof Multiname || a instanceof Number
  };
  a.isQName = function(d) {
    return"number" === typeof d || "string" === typeof d || d instanceof Number ? !0 : d instanceof a ? d.namespaces && 1 === d.namespaces.length : !1
  };
  a.isRuntimeName = function(a) {
    return a instanceof Multiname && a.isRuntimeName()
  };
  a.isRuntimeNamespace = function(a) {
    return a instanceof Multiname && a.isRuntimeNamespace()
  };
  a.isRuntime = function(a) {
    return a instanceof Multiname && a.isRuntimeName() || a.isRuntimeNamespace()
  };
  a.getQualifiedName = function(a) {
    release || !0;
    return"number" === typeof a || "string" === typeof a || a instanceof Number ? a : a.qualifiedName || (a.qualifiedName = a.namespaces[0].qualifiedName ? a.namespaces[0].qualifiedName + "$" + a.name : a.name)
  };
  a.getPublicQualifiedName = function(a) {
    return isNumeric(a) ? Number(a) : "public$" + a
  };
  a.getAccessModifier = function(a) {
    release || !0;
    if("number" === typeof a || "string" === typeof a || a instanceof Number) {
      return"public"
    }
    release || !0;
    return a.namespaces[0].getAccessModifier()
  };
  a.isAnyName = function(a) {
    return a instanceof Multiname && void 0 === a.name
  };
  a.isNumeric = function(d) {
    if("number" === typeof d) {
      return!0
    }
    if("string" === typeof d) {
      return isNumeric(d)
    }
    release || !0;
    return!isNaN(parseInt(a.getName(d), 10))
  };
  a.getName = function(a) {
    release || !0;
    release || !0;
    return a.getName()
  };
  a.getMultiname = function(a, d) {
    return isNumeric(d) ? d : new Multiname(a, d)
  };
  var d = {};
  a.fromSimpleName = function(a) {
    release || !0;
    if(a in d) {
      return d[a]
    }
    var b, g;
    b = a.lastIndexOf(".");
    0 >= b && (b = a.lastIndexOf(" "));
    0 < b ? (g = a.substring(b + 1).trim(), b = a.substring(0, b).trim()) : (g = a, b = "");
    return d[a] = new Multiname(ShumwayNamespace.fromSimpleName(b), g)
  };
  a.prototype.getQName = function(a) {
    release || !0;
    this.cache || (this.cache = []);
    var d = this.cache[a];
    d || (d = this.cache[a] = new Multiname([this.namespaces[a]], this.name));
    return d
  };
  a.prototype.hasQName = function(a) {
    if(this.name !== a.name) {
      return!1
    }
    for(var d = 0;d < this.namespaces.length;d++) {
      if(this.namespaces[d].isEqualTo(a.namespaces[0])) {
        return!0
      }
    }
    return!1
  };
  a.prototype.isAttribute = function() {
    return this.flags & 1
  };
  a.prototype.isAnyName = function() {
    return!this.isRuntimeName() && void 0 === this.name
  };
  a.prototype.isAnyNamespace = function() {
    return!this.isRuntimeNamespace() && 0 === this.namespaces.length
  };
  a.prototype.isRuntimeName = function() {
    return this.flags & 4
  };
  a.prototype.isRuntimeNamespace = function() {
    return this.flags & 2
  };
  a.prototype.isRuntime = function() {
    return this.flags & 6
  };
  a.prototype.isQName = function() {
    return 1 === this.namespaces.length && !this.isAnyName()
  };
  a.prototype.hasTypeParameter = function() {
    return!!this.typeParameter
  };
  a.prototype.getName = function() {
    release || !0;
    return this.name
  };
  a.prototype.getNamespace = function() {
    release || !0;
    release || !0;
    return this.namespaces[0]
  };
  a.prototype.nameToString = function() {
    return this.isAnyName() ? "*" : this.isRuntimeName() ? "[]" : this.getName()
  };
  a.prototype.toString = function() {
    var a = this.isAttribute() ? "@" : "";
    if(this.isAnyNamespace()) {
      a += "*::" + this.nameToString()
    }else {
      if(this.isRuntimeNamespace()) {
        a += "[]::" + this.nameToString()
      }else {
        if(1 === this.namespaces.length && this.isQName()) {
          a += this.namespaces[0].toString() + "::", a += this.nameToString()
        }else {
          for(var a = a + "{", d = 0, b = this.namespaces.length;d < b;d++) {
            a += this.namespaces[d].toString(), d + 1 < b && (a += ",")
          }
          a += "}::" + this.nameToString()
        }
      }
    }
    this.hasTypeParameter() && (a += "<" + this.typeParameter.toString() + ">");
    return a
  };
  return a
}(), ConstantPool = function() {
  function a(a) {
    var d, e, f = [0];
    e = a.readU30();
    for(d = 1;d < e;++d) {
      f.push(a.readS32())
    }
    var g = [0];
    e = a.readU30();
    for(d = 1;d < e;++d) {
      g.push(a.readU32())
    }
    var k = [NaN];
    e = a.readU30();
    for(d = 1;d < e;++d) {
      k.push(a.readDouble())
    }
    var l = [""];
    e = a.readU30();
    for(d = 1;d < e;++d) {
      l.push(a.readUTFString(a.readU30()))
    }
    this.positionAfterUTFStrings = a.pos;
    this.ints = f;
    this.uints = g;
    this.doubles = k;
    this.strings = l;
    f = [void 0];
    e = a.readU30();
    for(d = 1;d < e;++d) {
      g = new ShumwayNamespace, g.parse(this, a), f.push(g)
    }
    g = [void 0];
    e = a.readU30();
    for(d = 1;d < e;++d) {
      for(var k = a.readU30(), l = [], m = 0;m < k;++m) {
        l.push(f[a.readU30()])
      }
      g.push(l)
    }
    this.namespaces = f;
    this.namespaceSets = g;
    f = [void 0];
    e = a.readU30();
    for(d = 1;d < e;++d) {
      f.push(Multiname.parse(this, a, f))
    }
    this.multinames = f
  }
  a.prototype.getValue = function(a, d) {
    switch(a) {
      case 3:
        return this.ints[d];
      case 4:
        return this.uints[d];
      case 6:
        return this.doubles[d];
      case 1:
        return this.strings[d];
      case 11:
        return!0;
      case 10:
        return!1;
      case 12:
        return null;
      case 0:
        break;
      case 8:
      ;
      case 23:
        return this.namespaces[d];
      case 7:
      ;
      case 14:
      ;
      case 15:
      ;
      case 16:
      ;
      case 17:
      ;
      case 18:
      ;
      case 19:
      ;
      case 20:
        return this.multinames[d];
      case 2:
        warning("TODO: CONSTANT_Float may be deprecated?");
        break;
      default:
        release || !0
    }
  };
  return a
}(), MethodInfo = function() {
  function a(a, b) {
    for(var f = a.constantPool, g = b.readU30(), k = f.multinames[b.readU30()], l = [], m = 0;m < g;m++) {
      l.push({type:f.multinames[b.readU30()]})
    }
    var n = f.strings[b.readU30()], p = b.readU8(), m = 0;
    if(p & 8) {
      m = b.readU30();
      release || !0;
      for(m = g - m;m < g;m++) {
        var r = b.readU30();
        l[m].value = f.getValue(b.readU8(), r)
      }
    }
    if(p & 128) {
      for(m = 0;m < g;m++) {
        l[m].name = f.strings[b.readU30()]
      }
    }else {
      for(m = 0;m < g;m++) {
        f = l[m], r = m, release || !0, r = "p" + String.fromCharCode(65 + r), f.name = r
      }
    }
    this.flags = p;
    this.optionals = null;
    this.debugName = n;
    this.parameters = l;
    this.returnType = k
  }
  function b(a, b) {
    var f = a.constantPool.multinames, f = {start:b.readU30(), end:b.readU30(), target:b.readU30(), typeName:f[b.readU30()], varName:f[b.readU30()]};
    release || !0;
    release || !0;
    return f
  }
  a.prototype = {toString:function() {
    var a = getFlags(this.flags, "NEED_ARGUMENTS NEED_ACTIVATION NEED_REST HAS_OPTIONAL   SET_DXN HAS_PARAM_NAMES".split(" "));
    return(a ? a + " " : "") + this.name
  }, needsActivation:function() {
    return!!(this.flags & 2)
  }, needsRest:function() {
    return!!(this.flags & 4)
  }, needsArguments:function() {
    return!!(this.flags & 1)
  }, isNative:function() {
    return!!(this.flags & 32)
  }};
  a.parseBody = function(a, e) {
    var f = a.methods[e.readU30()];
    release || !0;
    f.maxStack = e.readU30();
    f.localCount = e.readU30();
    f.initScopeDepth = e.readU30();
    f.maxScopeDepth = e.readU30();
    f.code = e.readU8s(e.readU30());
    for(var g = [], k = e.readU30(), l = 0;l < k;++l) {
      g.push(b(a, e))
    }
    f.exceptions = g;
    f.traits = parseTraits(a, e, f)
  };
  a.prototype.hasExceptions = function() {
    return 0 < this.exceptions.length
  };
  return a
}(), MetaDataInfo = function() {
  function a(a, d) {
    var e = a.constantPool.strings;
    this.tagName = e[d.readU30()];
    for(var f = d.readU30(), g = [], k = [], l = [], m = 0;m < f;m++) {
      k[m] = e[d.readU30()]
    }
    for(m = 0;m < f;m++) {
      l[m] = e[d.readU30()]
    }
    for(m = 0;m < f;m++) {
      e = g[m] = {key:k[m], value:l[m]}, e.key && (release || !0, this[e.key] = e.value)
    }
    this.items = g
  }
  a.prototype = {toString:function() {
    return"[" + this.tagName + "]"
  }};
  return a
}();
function attachHolder(a, b) {
  release || !0;
  a.holder = b
}
var InstanceInfo = function() {
  function a(a, e) {
    this.id = b++;
    var f = a.constantPool, g = a.methods;
    this.name = f.multinames[e.readU30()];
    release || !0;
    this.superName = f.multinames[e.readU30()];
    this.flags = e.readU8();
    this.protectedNs = void 0;
    this.flags & 8 && (this.protectedNs = f.namespaces[e.readU30()]);
    var k = e.readU30();
    this.interfaces = [];
    for(var l = 0;l < k;l++) {
      this.interfaces[l] = f.multinames[e.readU30()]
    }
    this.init = g[e.readU30()];
    this.init.name = this.name;
    attachHolder(this.init, this);
    this.traits = parseTraits(a, e, this)
  }
  var b = 1;
  a.prototype = {toString:function() {
    var a = getFlags(this.flags & 8, ["sealed", "final", "interface", "protected"]), a = (a ? a + " " : "") + this.name;
    this.superName && (a += " extends " + this.superName);
    return a
  }, isFinal:function() {
    return this.flags & 2
  }, isSealed:function() {
    return this.flags & 1
  }, isInterface:function() {
    return this.flags & 4
  }};
  return a
}(), ClassInfo = function() {
  function a(a, e, f) {
    this.id = b++;
    this.init = a.methods[f.readU30()];
    attachHolder(this.init, this);
    this.traits = parseTraits(a, f, this);
    this.instanceInfo = e
  }
  var b = 1;
  a.prototype.toString = function() {
    return this.instanceInfo.name.toString()
  };
  return a
}(), ScriptInfo = function() {
  function a(a, e, f) {
    this.id = b++;
    this.abc = a;
    this.name = a.name + "$script" + e;
    this.init = a.methods[f.readU30()];
    attachHolder(this.init, this);
    this.traits = parseTraits(a, f, this);
    this.traits.verified = !0
  }
  var b = 1;
  a.prototype = {get entryPoint() {
    return this.init
  }, toString:function() {
    return this.name
  }};
  return a
}(), AbcFile = function() {
  function a(a, d) {
    console.time("Parse ABC: " + d);
    this.name = d;
    var e, f, g = new AbcStream(a);
    e = g.readWord();
    if(3014671 > e) {
      throw Error("Invalid ABC File (magic = " + Number(e).toString(16) + ")");
    }
    this.constantPool = new ConstantPool(g, d);
    this.methods = [];
    e = g.readU30();
    for(f = 0;f < e;++f) {
      this.methods.push(new MethodInfo(this, g))
    }
    this.metadata = [];
    e = g.readU30();
    for(f = 0;f < e;++f) {
      this.metadata.push(new MetaDataInfo(this, g))
    }
    this.instances = [];
    e = g.readU30();
    for(f = 0;f < e;++f) {
      this.instances.push(new InstanceInfo(this, g))
    }
    this.classes = [];
    for(f = 0;f < e;++f) {
      this.classes.push(new ClassInfo(this, this.instances[f], g))
    }
    this.scripts = [];
    e = g.readU30();
    for(f = 0;f < e;++f) {
      this.scripts.push(new ScriptInfo(this, f, g))
    }
    e = g.readU30();
    for(f = 0;f < e;++f) {
      MethodInfo.parseBody(this, g)
    }
    InlineCacheManager.updateInlineCaches(this);
    console.timeEnd("Parse ABC: " + d)
  }
  a.prototype = {get lastScript() {
    release || !0;
    return this.scripts[this.scripts.length - 1]
  }, toString:function() {
    return this.name
  }};
  return a
}(), Bytecode = function() {
  function a(a) {
    var d = a.readU8();
    this.op = d;
    this.originalPosition = a.position;
    var e = opcodeTable[d];
    e || unexpected("Unknown Op " + d);
    this.canThrow = e.canThrow;
    var f;
    switch(d) {
      case 27:
        e = a.readS24();
        this.offsets = [];
        f = a.readU30() + 1;
        for(d = 0;d < f;d++) {
          this.offsets.push(a.readS24())
        }
        this.offsets.push(e);
        break;
      default:
        d = 0;
        for(f = e.operands.length;d < f;d++) {
          var g = e.operands[d];
          switch(g.size) {
            case "u08":
              this[g.name] = a.readU8();
              break;
            case "s08":
              this[g.name] = a.readS8();
              break;
            case "s16":
              this[g.name] = a.readS16();
              break;
            case "s24":
              this[g.name] = a.readS24();
              break;
            case "u30":
              this[g.name] = a.readU30();
              break;
            case "u32":
              this[g.name] = a.readU32();
              break;
            default:
              unexpected()
          }
        }
    }
  }
  a.prototype = {makeBlockHead:function(a) {
    if(this.succs) {
      return a
    }
    this.bid = a;
    this.succs = [];
    this.preds = [];
    this.dominatees = [];
    return a + 1
  }, trace:function(a) {
    this.succs && a.writeLn("#" + this.bid)
  }, toString:function(a) {
    var d = opcodeTable[this.op], e = d.name.padRight(" ", 20), f, g;
    if(27 === this.op) {
      e += "targets:";
      f = 0;
      for(g = this.targets.length;f < g;f++) {
        e += (0 < f ? "," : "") + this.targets[f].position
      }
    }else {
      f = 0;
      for(g = d.operands.length;f < g;f++) {
        var k = d.operands[f];
        if("offset" === k.name) {
          e += "target:" + this.target.position
        }else {
          var e = e + (k.name + ": "), l = this[k.name];
          if(a) {
            switch(k.type) {
              case "":
                e += l;
                break;
              case "I":
                e += a.constantPool.ints[l];
                break;
              case "U":
                e += a.constantPool.uints[l];
                break;
              case "D":
                e += a.constantPool.doubles[l];
                break;
              case "S":
                e += a.constantPool.strings[l];
                break;
              case "N":
                e += a.constantPool.namespaces[l];
                break;
              case "CI":
                e += a.classes[l];
                break;
              case "M":
                e += a.constantPool.multinames[l];
                break;
              default:
                e += "?"
            }
          }else {
            e += l
          }
        }
        f < g - 1 && (e += ", ")
      }
    }
    return e
  }};
  return a
}(), Analysis = function() {
  function a(a, b) {
    Counter.count("Analysis");
    this.method = a;
    this.options = b || {};
    this.method.code && (Timer.start("Normalize"), this.normalizeBytecode(), Timer.stop())
  }
  function b(a, b, f) {
    return function(g, k, l) {
      function m(a) {
        return l + a.bid
      }
      function n(a) {
        a.fn = a.fn.bind(p)
      }
      var p = this;
      l = l || "";
      var r = this.bytecodes;
      r && (a.forEach(n), b.forEach(n), writeGraphViz(g, k.toString(), r[0], m, function(a) {
        return a.succs || []
      }, a, b, function(a) {
        return"Block: " + a.bid + "\\l"
      }, f && f.bind(this, m)))
    }
  }
  a.prototype = {normalizeBytecode:function() {
    function a(d, b) {
      if(d && d[b]) {
        return d[b]
      }
      var e = Object.create(Bytecode.prototype);
      e.op = 237;
      e.position = b;
      d && (d[b] = e);
      return e
    }
    for(var b = [], f = [], g = new AbcStream(this.method.code), k;0 < g.remaining();) {
      var l = g.position;
      k = new Bytecode(g);
      switch(k.op) {
        case 2:
        ;
        case 9:
          b[l] = f.length;
          continue;
        case 27:
          this.method.hasLookupSwitches = !0;
          k.targets = [];
          for(var m = k.offsets, n = 0, p = m.length;n < p;n++) {
            m[n] += l
          }
          break;
        case 16:
        ;
        case 21:
        ;
        case 12:
        ;
        case 22:
        ;
        case 13:
        ;
        case 23:
        ;
        case 14:
        ;
        case 24:
        ;
        case 15:
        ;
        case 19:
        ;
        case 20:
        ;
        case 25:
        ;
        case 26:
        ;
        case 17:
        ;
        case 18:
          k.offset += g.position
      }
      k.position = f.length;
      b[l] = f.length;
      f.push(k)
    }
    for(var g = {}, r = 0, v = f.length;r < v;r++) {
      switch(k = f[r], k.op) {
        case 27:
          m = k.offsets;
          n = 0;
          for(p = m.length;n < p;n++) {
            l = b[m[n]], k.targets.push(f[l] || a(g, m[n])), m[n] = l
          }
          break;
        case 16:
        ;
        case 21:
        ;
        case 12:
        ;
        case 22:
        ;
        case 13:
        ;
        case 23:
        ;
        case 14:
        ;
        case 24:
        ;
        case 15:
        ;
        case 19:
        ;
        case 20:
        ;
        case 25:
        ;
        case 26:
        ;
        case 17:
        ;
        case 18:
          l = b[k.offset], k.target = f[l] || a(g, k.offset), k.offset = l
      }
    }
    this.bytecodes = f;
    k = this.method.exceptions;
    n = 0;
    for(p = k.length;n < p;n++) {
      m = k[n], m.start = b[m.start], m.end = b[m.end], m.offset = b[m.target], m.target = f[m.offset], m.target.exception = m
    }
  }, detectBasicBlocks:function() {
    var a = this.bytecodes, b = this.method.exceptions, f = 0 < b.length, g = {}, k, l, m, n;
    n = a[0].makeBlockHead(0);
    l = 0;
    for(m = a.length - 1;l < m;l++) {
      switch(k = a[l], k.op) {
        case 71:
        ;
        case 72:
        ;
        case 3:
          n = a[l + 1].makeBlockHead(n);
          break;
        case 27:
          k = k.targets;
          for(var p = 0, r = k.length;p < r;p++) {
            n = k[p].makeBlockHead(n)
          }
          n = a[l + 1].makeBlockHead(n);
          break;
        case 16:
        ;
        case 21:
        ;
        case 12:
        ;
        case 22:
        ;
        case 13:
        ;
        case 23:
        ;
        case 14:
        ;
        case 24:
        ;
        case 15:
        ;
        case 19:
        ;
        case 20:
        ;
        case 25:
        ;
        case 26:
        ;
        case 17:
        ;
        case 18:
          n = k.target.makeBlockHead(n), n = a[l + 1].makeBlockHead(n)
      }
    }
    k = a[m];
    switch(k.op) {
      case 27:
        k = k.targets;
        p = 0;
        for(r = k.length;p < r;p++) {
          n = k[p].makeBlockHead(n)
        }
        break;
      case 16:
        n = k.target.makeBlockHead(n);
        break;
      case 21:
      ;
      case 12:
      ;
      case 22:
      ;
      case 13:
      ;
      case 23:
      ;
      case 14:
      ;
      case 24:
      ;
      case 15:
      ;
      case 19:
      ;
      case 20:
      ;
      case 25:
      ;
      case 26:
      ;
      case 17:
      ;
      case 18:
        n = k.target.makeBlockHead(n), a[l + 1] = getInvalidTarget(null, l + 1), n = a[l + 1].makeBlockHead(n)
    }
    if(f) {
      p = 0;
      for(r = b.length;p < r;p++) {
        l = b[p], m = a[l.end + 1], n = a[l.start].makeBlockHead(n), m && (n = m.makeBlockHead(n)), n = l.target.makeBlockHead(n)
      }
    }
    var v = a[0];
    l = 1;
    for(m = a.length;l < m;l++) {
      if(a[l].succs) {
        release || !0;
        g[v.bid] = v;
        k = a[l - 1];
        v.end = k;
        var s = a[l];
        switch(k.op) {
          case 71:
          ;
          case 72:
          ;
          case 3:
            break;
          case 27:
            p = 0;
            for(r = k.targets.length;p < r;p++) {
              v.succs.push(k.targets[p])
            }
            break;
          case 16:
            v.succs.push(k.target);
            break;
          case 21:
          ;
          case 12:
          ;
          case 22:
          ;
          case 13:
          ;
          case 23:
          ;
          case 14:
          ;
          case 24:
          ;
          case 15:
          ;
          case 19:
          ;
          case 20:
          ;
          case 25:
          ;
          case 26:
          ;
          case 17:
          ;
          case 18:
            v.succs.push(k.target);
            k.target !== s && v.succs.push(s);
            break;
          default:
            v.succs.push(s)
        }
        if(f) {
          p = v;
          r = [];
          k = 0;
          for(var u = b.length;k < u;k++) {
            var C = b[k];
            p.position >= C.start && p.end.position <= C.end && r.push(C.target)
          }
          k = r;
          v.hasCatches = 0 < k.length;
          v.succs.push.apply(v.succs, k)
        }
        v = s
      }
    }
    g[v.bid] = v;
    k = a[m - 1];
    switch(k.op) {
      case 27:
        p = 0;
        for(r = k.targets.length;p < r;p++) {
          v.succs.push(k.targets[p])
        }
        break;
      case 16:
        v.succs.push(k.target)
    }
    v.end = k;
    var q = BitSetFunctor(n), w = q.ADDRESS_BITS_PER_WORD, x = q.BITS_PER_WORD, H = q.BIT_INDEX_MASK;
    q.singleton = function(a) {
      var d = new q;
      d.set(a.bid);
      d.count = 1;
      d.dirty = 0;
      return d
    };
    q.fromBlocks = function(a) {
      var d = new q;
      d.setBlocks(a);
      return d
    };
    a = q.prototype;
    q.singleword ? (a.forEachBlock = function(a) {
      release || !0;
      var d = this.bits;
      if(d) {
        for(var b = 0;b < x;b++) {
          d & 1 << b && a(g[b])
        }
      }
    }, a.choose = function() {
      var a = this.bits;
      if(a) {
        for(var d = 0;d < x;d++) {
          if(a & 1 << d) {
            return g[d]
          }
        }
      }
    }, a.members = function() {
      var a = [], d = this.bits;
      if(d) {
        for(var b = 0;b < x;b++) {
          d & 1 << b && a.push(g[b])
        }
      }
      return a
    }, a.setBlocks = function(a) {
      for(var d = this.bits, b = 0, e = a.length;b < e;b++) {
        d |= 1 << (a[b].bid & H)
      }
      this.bits = d
    }) : (a.forEachBlock = function(a) {
      release || !0;
      for(var d = this.bits, b = 0, e = d.length;b < e;b++) {
        var f = d[b];
        if(f) {
          for(var l = 0;l < x;l++) {
            f & 1 << l && a(g[b * x + l])
          }
        }
      }
    }, a.choose = function() {
      for(var a = this.bits, d = 0, b = a.length;d < b;d++) {
        var e = a[d];
        if(e) {
          for(var f = 0;f < x;f++) {
            if(e & 1 << f) {
              return g[d * x + f]
            }
          }
        }
      }
    }, a.members = function() {
      for(var a = [], d = this.bits, b = 0, e = d.length;b < e;b++) {
        var f = d[b];
        if(f) {
          for(var l = 0;l < x;l++) {
            f & 1 << l && a.push(g[b * x + l])
          }
        }
      }
      return a
    }, a.setBlocks = function(a) {
      for(var d = this.bits, b = 0, e = a.length;b < e;b++) {
        var f = a[b].bid;
        d[f >> w] |= 1 << (f & H)
      }
    });
    this.BlockSet = q
  }, normalizeReachableBlocks:function() {
    var a = this.bytecodes[0];
    release || !0;
    var b = this.BlockSet, f = [], g = {}, k = {}, l = [a];
    for(k[a.bid] = !0;a = l.top();) {
      if(g[a.bid]) {
        if(1 === g[a.bid]) {
          g[a.bid] = 2;
          f.push(a);
          for(var m = a.succs, n = 0, p = m.length;n < p;n++) {
            m[n].preds.push(a)
          }
        }
        k[a.bid] = !1;
        l.pop()
      }else {
        g[a.bid] = 1;
        k[a.bid] = !0;
        m = a.succs;
        n = 0;
        for(p = m.length;n < p;n++) {
          var r = m[n];
          k[r.bid] && (a.spbacks || (a.spbacks = new b), a.spbacks.set(r.bid));
          !g[r.bid] && l.push(r)
        }
      }
    }
    this.blocks = f.reverse()
  }, computeDominance:function() {
    var a = this.blocks, b = a.length, f = Array(b);
    f[0] = 0;
    for(var g = {}, k = 0;k < b;k++) {
      g[a[k].bid] = k
    }
    for(var l = !0;l;) {
      l = !1;
      for(k = 1;k < b;k++) {
        var m = a[k].preds, n = m.length, p = g[m[0].bid];
        if(!(p in f)) {
          for(var r = 1;r < n && !(p = g[m[r].bid], p in f);r++) {
          }
        }
        release || !0;
        for(r = 0;r < n;r++) {
          var v = g[m[r].bid];
          if(v !== p && v in f) {
            for(;v !== p;) {
              for(;v > p;) {
                v = f[v]
              }
              for(;p > v;) {
                p = f[p]
              }
            }
            p = v
          }
        }
        f[k] !== p && (f[k] = p, l = !0)
      }
    }
    a[0].dominator = a[0];
    for(k = 1;k < b;k++) {
      g = a[k], n = a[f[k]], g.dominator = n, n.dominatees.push(g), g.npreds = g.preds.length
    }
    b = [a[0]];
    for(a[0].level || (a[0].level = 0);g = b.shift();) {
      a = g.dominatees;
      r = 0;
      for(n = a.length;r < n;r++) {
        a[r].level = g.level + 1
      }
      b.push.apply(b, a)
    }
  }, analyzeControlFlow:function() {
    release || !0;
    this.detectBasicBlocks();
    this.normalizeReachableBlocks();
    this.computeDominance();
    return this.analyzedControlFlow = !0
  }, markLoops:function() {
    function a(d, f) {
      var g = new b;
      g.setBlocks(d);
      g.recount();
      this.id = f;
      this.body = g;
      this.exit = new b;
      this.save = {};
      this.head = new b;
      this.npreds = 0
    }
    if(!this.analyzedControlFlow && !this.analyzeControlFlow()) {
      return!1
    }
    var b = this.BlockSet, f;
    f = this.blocks;
    for(var g = new b, k = 0, l = f.length;k < l;k++) {
      var m = f[k], n = m.spbacks;
      if(n) {
        for(var m = m.succs, p = 0, r = m.length;p < r;p++) {
          var v = m[p];
          n.get(v.bid) && g.set(v.dominator.bid)
        }
      }
    }
    f = g.members();
    if(0 >= f.length) {
      return this.markedLoops = !0
    }
    f = f.sort(function(a, d) {
      return a.level - d.level
    });
    g = 0;
    for(k = f.length - 1;0 <= k;k--) {
      for(var l = f[k], n = 1, m = {}, p = {}, r = [], v = [], s = [], u = l.level + 1, C = [l], q = void 0, w = void 0, q = void 0;q = C.top();) {
        if(m[q.bid]) {
          if(v.peek() === q) {
            v.pop();
            var x = [];
            do {
              w = r.pop(), p[w.bid] = !0, x.push(w)
            }while(w !== q);
            (1 < x.length || w.spbacks && w.spbacks.get(w.bid)) && s.push(x)
          }
          C.pop()
        }else {
          m[q.bid] = n++;
          r.push(q);
          v.push(q);
          for(var w = q.succs, x = 0, H = w.length;x < H;x++) {
            if(q = w[x], !(q.level < u)) {
              var y = q.bid;
              if(m[y]) {
                if(!p[y]) {
                  for(;m[v.peek().bid] > m[y];) {
                    v.pop()
                  }
                }
              }else {
                C.push(q)
              }
            }
          }
        }
      }
      n = s;
      if(0 !== n.length) {
        m = 0;
        for(p = n.length;m < p;m++) {
          r = n[m];
          v = new a(r, g++);
          s = 0;
          for(u = r.length;s < u;s++) {
            if(C = r[s], C.level === l.level + 1 && !C.loop) {
              C.loop = v;
              v.head.set(C.bid);
              q = C.preds;
              w = 0;
              for(x = q.length;w < x;w++) {
                v.body.get(q[w].bid) && C.npreds--
              }
              v.npreds += C.npreds
            }
          }
          s = 0;
          for(u = r.length;s < u;s++) {
            C = r[s], C.level === l.level + 1 && (C.npreds = v.npreds)
          }
          v.head.recount()
        }
      }
    }
    return this.markedLoops = !0
  }, trace:function(a) {
    function b(a) {
      return a.bid
    }
    var f = this.bytecodes;
    a.enter("analysis {");
    a.enter("cfg {");
    this.blocks.forEach(function(g) {
      g.dominator ? (a.enter("block " + g.bid + (0 < g.succs.length ? " -> " + g.succs.map(b).join(",") : "") + " {"), a.writeLn("npreds".padRight(" ", 10) + g.npreds), a.writeLn("idom".padRight(" ", 10) + g.dominator.bid), a.writeLn("domcs".padRight(" ", 10) + g.dominatees.map(b).join(",")), g.frontier && a.writeLn("frontier".padRight(" ", 10) + "{" + g.frontier.toArray().join(",") + "}"), a.writeLn("level".padRight(" ", 10) + g.level)) : a.enter("block unreachable {");
      g.loop && (a.writeLn("loop".padRight(" ", 10) + "{" + g.loop.body.toArray().join(",") + "}"), a.writeLn("  id".padRight(" ", 10) + g.loop.id), a.writeLn("  head".padRight(" ", 10) + "{" + g.loop.head.toArray().join(",") + "}"), a.writeLn("  exit".padRight(" ", 10) + "{" + g.loop.exit.toArray().join(",") + "}"), a.writeLn("  npreds".padRight(" ", 10) + g.loop.npreds));
      a.writeLn("");
      if(0 <= g.position) {
        for(var k = g.position;k <= g.end.position;k++) {
          a.writeLn(("" + k).padRight(" ", 5) + f[k])
        }
      }else {
        a.writeLn("abstract")
      }
      a.leave("}")
    });
    a.leave("}");
    this.controlTree && (a.enter("control-tree {"), this.controlTree.trace(a), a.leave("}"));
    a.leave("}")
  }, traceCFG:b([{fn:function(a) {
    return a.succs || []
  }, style:""}], [{fn:function(a) {
    return a.preds || []
  }, style:""}]), traceDJ:b([{fn:function(a) {
    return a.dominatees || []
  }, style:"style=dashed"}, {fn:function(a) {
    var b = new this.BlockSet;
    b.setBlocks(a.succs);
    b.subtract(this.BlockSet.fromBlocks(a.dominatees));
    a.spbacks && b.subtract(a.spbacks);
    return b.members()
  }, style:""}, {fn:function(a) {
    return a.spbacks ? a.spbacks.members() : []
  }, style:"style=bold"}], [{fn:function(a) {
    return a.preds || []
  }, style:""}], function(a, b) {
    for(var f = this.bytecodes[0], g = [f], k = f.level, l = [];f = g.shift();) {
      k != f.level && (b.writeLn("{rank=same; " + l.map(function(b) {
        return"block_" + a(b)
      }).join(" ") + "}"), l.length = 0, k = f.level), l.push(f), g.push.apply(g, f.dominatees)
    }
  })};
  return a
}();
(function(a) {
  function b(a) {
    for(var d = ["leadingComments", "loc"];a;) {
      a.fields && (d = a.fields.concat(d)), a = a.extends ? f[a.extends] : null
    }
    return d
  }
  function d(a) {
    return"_" + a
  }
  function e(g, l) {
    if(!a[g]) {
      for(var m = b(l), n = [], p = ['this.type = "' + g + '";'], r = 0, v = m.length;r < v;r++) {
        var s = m[r];
        "@" === s.charAt(0) && (m[r] = s = s.substr(1), n.push(s));
        p.push("this." + s + " = _" + s + ";")
      }
      m = new Function(m.map(d), p.join("\n"));
      l.extends && (p = e(l.extends, f[l.extends]), m.prototype = Object.create(p.prototype));
      Object.defineProperty(m.prototype, "_children", {value:n, writable:!0, configurable:!0, enumerable:!1});
      a[g] = m
    }
    return a[g]
  }
  var f = a.lang = {Node:{}, Program:{"extends":"Node", fields:["@body"]}, Statement:{"extends":"Node"}, EmptyStatement:{"extends":"Statement"}, BlockStatement:{"extends":"Statement", fields:["@body"]}, ExpressionStatement:{"extends":"Statement", fields:["@expression"]}, IfStatement:{"extends":"Statement", fields:["@test", "@consequent", "@alternate"]}, LabeledStatement:{"extends":"Statement", fields:["@label", "@body"]}, BreakStatement:{"extends":"Statement", fields:["@label"]}, ContinueStatement:{"extends":"Statement", 
  fields:["@label"]}, WithStatement:{"extends":"Statement", fields:["@object", "@body"]}, SwitchStatement:{"extends":"Statement", fields:["@discriminant", "@cases", "lexical"]}, ReturnStatement:{"extends":"Statement", fields:["@argument"]}, ThrowStatement:{"extends":"Statement", fields:["@argument"]}, TryStatement:{"extends":"Statement", fields:["@block", "@handlers", "@finalizer"]}, WhileStatement:{"extends":"Statement", fields:["@test", "@body"]}, DoWhileStatement:{"extends":"Statement", fields:["@body", 
  "@test"]}, ForStatement:{"extends":"Statement", fields:["@init", "@test", "@update", "@body"]}, ForInStatement:{"extends":"Statement", fields:["@left", "@right", "@body", "each"]}, LetStatement:{"extends":"Statement", fields:["@head", "@body"]}, DebuggerStatement:{"extends":"Statement"}, Declaration:{"extends":"Statement"}, FunctionDeclaration:{"extends":"Declaration", fields:"@id @params @body @decltype generator expression".split(" ")}, VariableDeclaration:{"extends":"Declaration", fields:["kind", 
  "@declarations"]}, VariableDeclarator:{"extends":"Node", fields:["@id", "@init", "@decltype", "@arguments"]}, Expression:{"extends":"Pattern"}, ThisExpression:{"extends":"Expression"}, ArrayExpression:{"extends":"Expression", fields:["elements"]}, ObjectExpression:{"extends":"Expression", fields:["@properties"]}, Property:{"extends":"Node", fields:["@key", "@value", "kind"]}, FunctionExpression:{"extends":"Expression", fields:"@id @params @body @decltype generator expression".split(" ")}, SequenceExpression:{"extends":"Expression", 
  fields:["@expressions"]}, UnaryExpression:{"extends":"Expression", fields:["operator", "@argument", "prefix"]}, BinaryExpression:{"extends":"Expression", fields:["operator", "@left", "@right"]}, AssignmentExpression:{"extends":"Expression", fields:["@left", "operator", "@right"]}, UpdateExpression:{"extends":"Expression", fields:["operator", "@argument", "prefix"]}, LogicalExpression:{"extends":"Expression", fields:["operator", "@left", "@right"]}, ConditionalExpression:{"extends":"Expression", 
  fields:["@test", "@consequent", "@alternate"]}, NewExpression:{"extends":"Expression", fields:["@callee", "@arguments"]}, CallExpression:{"extends":"Expression", fields:["@callee", "@arguments"]}, MemberExpression:{"extends":"Expression", fields:["@object", "@property", "computed", "kind"]}, YieldExpression:{"extends":"Expression", fields:["@argument"]}, ComprehensionExpression:{"extends":"Expression", fields:["@blocks", "@filter"]}, GeneratorExpression:{"extends":"Expression", fields:["@blocks", 
  "@filter"]}, LetExpression:{"extends":"Expression", fields:["@head", "@body"]}, Pattern:{"extends":"Node"}, ObjectPattern:{"extends":"Pattern", fields:["@properties"]}, ArrayPattern:{"extends":"Pattern", fields:["@elements"]}, SwitchCase:{"extends":"Node", fields:["@test", "@consequent"]}, CatchClause:{"extends":"Node", fields:["@param", "@guard", "@body"]}, Identifier:{"extends":"Expression", fields:["name", "kind"]}, Literal:{"extends":"Expression", fields:["value"]}, Type:{"extends":"Node"}, 
  PointerType:{"extends":"Type", fields:["@base", "arraySize"]}, StructType:{"extends":"Type", fields:["@id", "@fields", "isUnion"]}, FieldDeclarator:{"extends":"Node", fields:["@id", "@decltype"]}, ArrowType:{"extends":"Type", fields:["@params", "@return"]}, TypeIdentifier:{"extends":"Type", fields:["name"]}, TypeAliasDirective:{"extends":"Node", fields:["@original", "@alias"]}, CastExpression:{"extends":"Expression", fields:["@as", "@argument"]}};
  a.allFields = b;
  for(var g in f) {
    e(g, f[g])
  }
  a.makePass = function(a, d) {
    return function(b) {
      for(var e, f, g, v = this._children, s = 0, u = v.length;s < u;s++) {
        if(g = this[v[s]]) {
          if(g instanceof Array) {
            f = this[v[s]] = [];
            for(var C = 0, q = g.length;C < q;C++) {
              "function" === typeof g[C][a] && (e = g[C][a](b), null !== e && f.push(e))
            }
          }else {
            "function" === typeof g[a] && (e = g[a](b), this[v[s]] = null === e ? void 0 : e)
          }
        }
      }
      return"function" === typeof this[d] ? (b.logger && "undefined" !== typeof this.loc ? (b.logger.push(this), e = this[d](b), b.logger.pop()) : e = this[d](b), null === e ? null : e ? e : this) : this
    }
  };
  a.lift = function l(d) {
    if(d instanceof Array) {
      return d.map(function(a) {
        return l(a)
      })
    }
    var e = d.type, g = a[e];
    if(!g) {
      throw Error("unknown node type `" + e + "'");
    }
    g = new g;
    g.loc = d.loc;
    for(var e = b(f[e]), r = 0, v = e.length;r < v;r++) {
      var s;
      "@" === e[r].charAt(0) ? (s = e[r].substr(1), d[s] && (g[s] = l(d[s]))) : (s = e[r], g[s] = d[s])
    }
    return g
  };
  a.flatten = function m(a) {
    if(a instanceof Array) {
      return a.map(function(a) {
        return m(a)
      })
    }
    for(var d = a.type, e = {type:d}, d = b(f[d]), g = 0, s = d.length;g < s;g++) {
      var u;
      "@" === d[g].charAt(0) ? (u = d[g].substr(1), e[u] = a[u] ? m(a[u]) : null) : (u = d[g], e[u] = a[u])
    }
    return e
  }
})("undefined" === typeof exports ? estransform = {} : exports);
(function(a) {
  function b(a) {
    var d = a.length, b = [], e;
    for(e = 0;e < d;e += 1) {
      b[e] = a.charAt(e)
    }
    return b
  }
  function d(a, d) {
    var b = "";
    for(d |= 0;0 < d;d >>>= 1, a += a) {
      d & 1 && (b += a)
    }
    return b
  }
  function e(a) {
    a = a.charAt(a.length - 1);
    return"\r" === a || "\n" === a
  }
  function f(a) {
    var d = {}, b, e;
    for(b in a) {
      a.hasOwnProperty(b) && (e = a[b], d[b] = "object" === typeof e && null !== e ? f(e) : e)
    }
    return d
  }
  function g(a, d) {
    function b(a) {
      return"object" === typeof a && a instanceof Object && !(a instanceof RegExp)
    }
    var e, f;
    for(e in d) {
      d.hasOwnProperty(e) && (f = d[e], b(f) ? b(a[e]) ? g(a[e], f) : a[e] = g({}, f) : a[e] = f)
    }
    return a
  }
  function k(a) {
    return 0 <= "\t\v\f \u00a0".indexOf(a) || 5760 <= a.charCodeAt(0) && 0 <= "\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\ufeff".indexOf(a)
  }
  function l(a) {
    return 0 <= "\n\r\u2028\u2029".indexOf(a)
  }
  function m(a) {
    return"$" === a || "_" === a || "\\" === a || "a" <= a && "z" >= a || "A" <= a && "Z" >= a || "0" <= a && "9" >= a || 128 <= a.charCodeAt(0) && L.NonAsciiIdentifierPart.test(a)
  }
  function n(a, d) {
    var b = a.charAt(a.length - 1), e = d.charAt(0);
    return("+" === b || "-" === b) && b === e || m(b) && m(e) ? a + " " + d : k(b) || l(b) || k(e) || l(e) ? a + d : a + K + d
  }
  function p(a) {
    return A + a
  }
  function r(a, d) {
    if("Line" === a.type) {
      return e(a.value) ? "//" + a.value : "//" + a.value + "\n"
    }
    if(V.format.indent.adjustMultilineComment && /[\n\r]/.test(a.value)) {
      var b = d, g, f, l, m, n, q;
      g = ("/*" + a.value + "*/").split(/\r\n|[\r\n]/);
      q = Number.MAX_VALUE;
      f = 1;
      for(l = g.length;f < l;f += 1) {
        m = g[f];
        for(n = 0;n < m.length && k(m[n]);) {
          n += 1
        }
        q > n && (q = n)
      }
      "undefined" !== typeof b ? (m = A, "*" === g[1][q] && (b += " "), A = b) : (1 === q % 2 && (q -= 1), m = A);
      f = 1;
      for(l = g.length;f < l;f += 1) {
        g[f] = p(g[f].slice(q))
      }
      A = m;
      return g.join("\n")
    }
    return"/*" + a.value + "*/"
  }
  function v(a, d, b) {
    return d < b ? "(" + a + ")" : a
  }
  function s(a, d) {
    var b, e;
    b = !V.comment || !a.leadingComments;
    if(a.type === y.BlockStatement && b) {
      return K + w(a)
    }
    if(a.type === y.EmptyStatement && b) {
      return";"
    }
    b = A;
    A += D;
    e = G + p(w(a, {semicolonOptional:d}));
    A = b;
    return e
  }
  function u(a, d) {
    return a.type === y.BlockStatement && (!V.comment || !a.leadingComments) && !e(d) ? K : e(d) ? A + "" : ("" === G ? " " : G) + (A + "")
  }
  function C(a) {
    var d, b, e;
    d = "(";
    b = 0;
    for(e = a.params.length;b < e;b += 1) {
      d += a.params[b].name, b + 1 < e && (d += "," + K)
    }
    return d + ")" + s(a.body)
  }
  function q(a, d) {
    var f, g, l, k, m, r;
    g = d.precedence;
    m = d.allowIn;
    r = d.allowCall;
    switch(a.type) {
      case y.SequenceExpression:
        f = "";
        m |= t.Sequence < g;
        k = 0;
        for(l = a.expressions.length;k < l;k += 1) {
          f += q(a.expressions[k], {precedence:t.Assignment, allowIn:m, allowCall:!0}), k + 1 < l && (f += "," + K)
        }
        f = v(f, t.Sequence, g);
        break;
      case y.AssignmentExpression:
        m |= t.Assignment < g;
        f = v(q(a.left, {precedence:t.Call, allowIn:m, allowCall:!0}) + K + a.operator + K + q(a.right, {precedence:t.Assignment, allowIn:m, allowCall:!0}), t.Assignment, g);
        break;
      case y.ConditionalExpression:
        m |= t.Conditional < g;
        f = v(q(a.test, {precedence:t.LogicalOR, allowIn:m, allowCall:!0}) + K + "?" + K + q(a.consequent, {precedence:t.Assignment, allowIn:m, allowCall:!0}) + K + ":" + K + q(a.alternate, {precedence:t.Assignment, allowIn:m, allowCall:!0}), t.Conditional, g);
        break;
      case y.LogicalExpression:
      ;
      case y.BinaryExpression:
        l = N[a.operator];
        m |= l < g;
        f = n(q(a.left, {precedence:l, allowIn:m, allowCall:!0}), a.operator);
        k = q(a.right, {precedence:l + 1, allowIn:m, allowCall:!0});
        f = "/" === a.operator && "/" === f.charAt(f.length - 1) ? f + (" " + k) : n(f, k);
        f = "in" === a.operator && !m ? "(" + f + ")" : v(f, l, g);
        break;
      case y.CallExpression:
        f = q(a.callee, {precedence:t.Call, allowIn:!0, allowCall:!0, allowUnparenthesizedNew:!1});
        f += "(";
        k = 0;
        for(l = a.arguments.length;k < l;k += 1) {
          f += q(a.arguments[k], {precedence:t.Assignment, allowIn:!0, allowCall:!0}), k + 1 < l && (f += "," + K)
        }
        f += ")";
        f = r ? v(f, t.Call, g) : "(" + f + ")";
        break;
      case y.NewExpression:
        l = a.arguments.length;
        m = void 0 === d.allowUnparenthesizedNew || d.allowUnparenthesizedNew;
        f = n("new", q(a.callee, {precedence:t.New, allowIn:!0, allowCall:!1, allowUnparenthesizedNew:m && !I && 0 === l}));
        if(!m || I || 0 < l) {
          f += "(";
          for(k = 0;k < l;k += 1) {
            f += q(a.arguments[k], {precedence:t.Assignment, allowIn:!0, allowCall:!0}), k + 1 < l && (f += "," + K)
          }
          f += ")"
        }
        f = v(f, t.New, g);
        break;
      case y.MemberExpression:
        f = q(a.object, {precedence:t.Call, allowIn:!0, allowCall:r, allowUnparenthesizedNew:!1});
        a.computed ? f += "[" + q(a.property, {precedence:t.Sequence, allowIn:!0, allowCall:r}) + "]" : (a.object.type === y.Literal && "number" === typeof a.object.value && 0 > f.indexOf(".") && !/[eExX]/.test(f) && !(2 <= f.length && "0" === f[0]) && (f += "."), f += "." + a.property.name);
        f = v(f, t.Member, g);
        break;
      case y.UnaryExpression:
        k = q(a.argument, {precedence:t.Unary + (a.argument.type === y.UnaryExpression && 3 > a.operator.length && a.argument.operator === a.operator ? 1 : 0), allowIn:!0, allowCall:!0});
        "" === K ? f = n(a.operator, k) : (f = a.operator, 2 < f.length && (f += " "), f += k);
        f = v(f, t.Unary, g);
        break;
      case y.UpdateExpression:
        f = a.prefix ? v(a.operator + q(a.argument, {precedence:t.Unary, allowIn:!0, allowCall:!0}), t.Unary, g) : v(q(a.argument, {precedence:t.Postfix, allowIn:!0, allowCall:!0}) + a.operator, t.Postfix, g);
        break;
      case y.FunctionExpression:
        f = "function";
        f = a.id ? f + (" " + a.id.name) : f + K;
        f += C(a);
        break;
      case y.ArrayExpression:
        if(!a.elements.length) {
          f = "[]";
          break
        }
        f = "[" + G;
        g = A;
        A += D;
        k = 0;
        for(l = a.elements.length;k < l;k += 1) {
          a.elements[k] ? f += p(q(a.elements[k], {precedence:t.Assignment, allowIn:!0, allowCall:!0})) : (f += A + "", k + 1 === l && (f += ",")), k + 1 < l && (f += "," + G)
        }
        A = g;
        e(f) || (f += G);
        f += A + "]";
        break;
      case y.Property:
        f = "get" === a.kind || "set" === a.kind ? a.kind + " " + q(a.key, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + C(a.value) : q(a.key, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + ":" + K + q(a.value, {precedence:t.Assignment, allowIn:!0, allowCall:!0});
        break;
      case y.ObjectExpression:
        if(!a.properties.length) {
          f = "{}";
          break
        }
        f = "{" + G;
        g = A;
        A += D;
        k = 0;
        for(l = a.properties.length;k < l;k += 1) {
          f += p(q(a.properties[k], {precedence:t.Sequence, allowIn:!0, allowCall:!0})), k + 1 < l && (f += "," + G)
        }
        A = g;
        e(f) || (f += G);
        f += A + "}";
        break;
      case y.ThisExpression:
        f = "this";
        break;
      case y.Identifier:
        f = a.name;
        break;
      case y.Literal:
        if(a.hasOwnProperty("raw") && da) {
          try {
            if(l = da(a.raw).body[0].expression, l.type === y.Literal && l.value === a.value) {
              f = a.raw;
              break
            }
          }catch(s) {
          }
        }
        if(null === a.value) {
          f = "null";
          break
        }
        if("string" === typeof a.value) {
          f = a.value;
          r = "";
          var u;
          k = l = 0;
          "undefined" === typeof f[0] && (f = b(f));
          g = 0;
          for(m = f.length;g < m;g += 1) {
            u = f[g];
            if("'" === u) {
              l += 1
            }else {
              if('"' === u) {
                k += 1
              }else {
                if("/" === u && z) {
                  r += "\\"
                }else {
                  if(0 <= "\\\n\r\u2028\u2029".indexOf(u)) {
                    var w = "\\";
                    switch(u) {
                      case "\\":
                        w += "\\";
                        break;
                      case "\n":
                        w += "n";
                        break;
                      case "\r":
                        w += "r";
                        break;
                      case "\u2028":
                        w += "u2028";
                        break;
                      case "\u2029":
                        w += "u2029";
                        break;
                      default:
                        throw Error("Incorrectly classified character");
                    }
                    r += w;
                    continue
                  }else {
                    if(z && " " > u || !z && !(B || " " <= u && "~" >= u)) {
                      var w = f[g + 1], x = u.charCodeAt(0), U = x.toString(16), H = "\\";
                      switch(u) {
                        case "\b":
                          H += "b";
                          break;
                        case "\f":
                          H += "f";
                          break;
                        case "\t":
                          H += "t";
                          break;
                        default:
                          H = z || 255 < x ? H + ("u" + "0000".slice(U.length) + U) : "\x00" === u && 0 > "0123456789".indexOf(w) ? H + "0" : "\v" === u ? H + "v" : H + ("x" + "00".slice(U.length) + U)
                      }
                      r += H;
                      continue
                    }
                  }
                }
              }
            }
            r += u
          }
          l = !("double" === F || "auto" === F && k < l);
          f = r;
          r = l ? "'" : '"';
          "undefined" === typeof f[0] && (f = b(f));
          g = 0;
          for(m = f.length;g < m;g += 1) {
            u = f[g];
            if("'" === u && l || '"' === u && !l) {
              r += "\\"
            }
            r += u
          }
          f = r + (l ? "'" : '"');
          break
        }
        if("number" === typeof a.value) {
          f = a.value;
          if(f !== f) {
            throw Error("Numeric literal whose value is NaN");
          }
          if(0 > 1 / f) {
            throw Error("Numeric literal whose value is negative");
          }
          if(f === 1 / 0) {
            f = z ? "null" : E ? "1e400" : "1e+400"
          }else {
            g = "" + f;
            if(E && !(3 > g.length)) {
              m = g.indexOf(".");
              !z && ("0" === g.charAt(0) && 1 === m) && (m = 0, g = g.slice(1));
              l = g;
              g = g.replace("e+", "e");
              k = 0;
              if(0 < (r = l.indexOf("e"))) {
                k = +l.slice(r + 1), l = l.slice(0, r)
              }
              0 <= m && (k -= l.length - m - 1, l = +(l.slice(0, m) + l.slice(m + 1)) + "");
              for(r = 0;"0" === l.charAt(l.length + r - 1);) {
                r -= 1
              }
              0 !== r && (k -= r, l = l.slice(0, r));
              0 !== k && (l += "e" + k);
              if((l.length < g.length || Q && 1E12 < f && Math.floor(f) === f && (l = "0x" + f.toString(16)).length < g.length) && +l === f) {
                g = l
              }
            }
            f = g
          }
          break
        }
        f = a.value.toString()
    }
    if(void 0 === f) {
      throw Error("Unknown expression type: " + a.type);
    }
    return f
  }
  function w(a, b) {
    var f, g, k, m, v, x, B;
    x = !0;
    B = ";";
    b && (x = void 0 === b.allowIn || b.allowIn, !U && !0 === b.semicolonOptional && (B = ""));
    switch(a.type) {
      case y.BlockStatement:
        k = "{" + G;
        m = A;
        A += D;
        f = 0;
        for(g = a.body.length;f < g;f += 1) {
          v = p(w(a.body[f], {semicolonOptional:f === g - 1})), k += v, e(v) || (k += G)
        }
        A = m;
        k += A + "}";
        break;
      case y.BreakStatement:
        k = a.label ? "break " + a.label.name + B : "break" + B;
        break;
      case y.ContinueStatement:
        k = a.label ? "continue " + a.label.name + B : "continue" + B;
        break;
      case y.DoWhileStatement:
        k = "do" + s(a.body);
        k += u(a.body, k);
        k += "while" + K + "(" + q(a.test, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + ")" + B;
        break;
      case y.CatchClause:
        m = A;
        A += D;
        k = "catch" + K + "(" + q(a.param, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + ")";
        A = m;
        k += s(a.body);
        break;
      case y.DebuggerStatement:
        k = "debugger" + B;
        break;
      case y.EmptyStatement:
        k = ";";
        break;
      case y.ExpressionStatement:
        k = q(a.expression, {precedence:t.Sequence, allowIn:!0, allowCall:!0});
        k = "{" === k.charAt(0) || "function" === k.slice(0, 8) && 0 <= " (".indexOf(k.charAt(8)) ? "(" + k + ")" + B : k + B;
        break;
      case y.VariableDeclarator:
        k = a.init ? a.id.name + K + "=" + K + q(a.init, {precedence:t.Assignment, allowIn:x, allowCall:!0}) : a.id.name;
        break;
      case y.VariableDeclaration:
        k = a.kind;
        if(1 === a.declarations.length && a.declarations[0].init && a.declarations[0].init.type === y.FunctionExpression) {
          k += " " + w(a.declarations[0], {allowIn:x})
        }else {
          m = A;
          A += D;
          v = a.declarations[0];
          k = V.comment && v.leadingComments ? k + ("\n" + p(w(v, {allowIn:x}))) : k + (" " + w(v, {allowIn:x}));
          f = 1;
          for(g = a.declarations.length;f < g;f += 1) {
            v = a.declarations[f], k = V.comment && v.leadingComments ? k + ("," + G + p(w(v, {allowIn:x}))) : k + ("," + K + w(v, {allowIn:x}))
          }
          A = m
        }
        k += B;
        break;
      case y.ThrowStatement:
        k = n("throw", q(a.argument, {precedence:t.Sequence, allowIn:!0, allowCall:!0})) + B;
        break;
      case y.TryStatement:
        k = "try" + s(a.block);
        k += u(a.block, k);
        f = 0;
        for(g = a.handlers.length;f < g;f += 1) {
          if(k += w(a.handlers[f]), a.finalizer || f + 1 !== g) {
            k += u(a.handlers[f].body, k)
          }
        }
        a.finalizer && (k += "finally" + s(a.finalizer));
        break;
      case y.SwitchStatement:
        m = A;
        A += D;
        k = "switch" + K + "(" + q(a.discriminant, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + ")" + K + "{" + G;
        A = m;
        if(a.cases) {
          f = 0;
          for(g = a.cases.length;f < g;f += 1) {
            v = p(w(a.cases[f], {semicolonOptional:f === g - 1})), k += v, e(v) || (k += G)
          }
        }
        k += A + "}";
        break;
      case y.SwitchCase:
        m = A;
        A += D;
        k = a.test ? n("case", q(a.test, {precedence:t.Sequence, allowIn:!0, allowCall:!0})) + ":" : "default:";
        f = 0;
        if((g = a.consequent.length) && a.consequent[0].type === y.BlockStatement) {
          v = s(a.consequent[0]), k += v, f = 1
        }
        for(f !== g && !e(k) && (k += G);f < g;f += 1) {
          v = p(w(a.consequent[f], {semicolonOptional:f === g - 1 && "" === B})), k += v, f + 1 !== g && !e(v) && (k += G)
        }
        A = m;
        break;
      case y.IfStatement:
        m = A;
        A += D;
        a.alternate ? a.alternate.type === y.IfStatement ? (k = "if" + K + "(" + q(a.test, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + ")", A = m, k += s(a.consequent), k += u(a.consequent, k), k += "else " + w(a.alternate)) : (k = "if" + K + "(" + q(a.test, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + ")", A = m, k += s(a.consequent), k += u(a.consequent, k), k = n(k + "else", s(a.alternate, "" === B))) : (k = "if" + K + "(" + q(a.test, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + 
        ")", A = m, k += s(a.consequent, "" === B));
        break;
      case y.ForStatement:
        m = A;
        A += D;
        k = "for" + K + "(";
        k = a.init ? a.init.type === y.VariableDeclaration ? k + w(a.init, {allowIn:!1}) : k + (q(a.init, {precedence:t.Sequence, allowIn:!1, allowCall:!0}) + ";") : k + ";";
        k = a.test ? k + (K + q(a.test, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + ";") : k + ";";
        k = a.update ? k + (K + q(a.update, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + ")") : k + ")";
        A = m;
        k += s(a.body, "" === B);
        break;
      case y.ForInStatement:
        k = "for" + K + "(";
        a.left.type === y.VariableDeclaration ? (m = A, A += D + D, k += a.left.kind + " " + w(a.left.declarations[0], {allowIn:!1})) : (m = A, A += D, k += q(a.left, {precedence:t.Call, allowIn:!0, allowCall:!0}));
        m = A = m;
        A += D;
        k = n(k, "in");
        k = n(k, q(a.right, {precedence:t.Sequence, allowIn:!0, allowCall:!0})) + ")";
        A = m;
        k += s(a.body, "" === B);
        break;
      case y.LabeledStatement:
        k = a.label.name + ":" + s(a.body, "" === B);
        break;
      case y.Program:
        k = "";
        f = 0;
        for(g = a.body.length;f < g;f += 1) {
          v = p(w(a.body[f], {semicolonOptional:f === g - 1})), k += v, f + 1 < g && !e(v) && (k += G)
        }
        break;
      case y.FunctionDeclaration:
        k = "function" + K;
        a.id && (k += ("" === K ? " " : "") + a.id.name);
        k += C(a);
        break;
      case y.ReturnStatement:
        k = a.argument ? n("return", q(a.argument, {precedence:t.Sequence, allowIn:!0, allowCall:!0})) + B : "return" + B;
        break;
      case y.WhileStatement:
        m = A;
        A += D;
        k = "while" + K + "(" + q(a.test, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + ")";
        A = m;
        k += s(a.body, "" === B);
        break;
      case y.WithStatement:
        m = A, A += D, k = "with" + K + "(" + q(a.object, {precedence:t.Sequence, allowIn:!0, allowCall:!0}) + ")", A = m, k += s(a.body, "" === B)
    }
    if(void 0 === k) {
      throw Error("Unknown statement type: " + a.type);
    }
    if(V.comment) {
      f = k;
      if(a.leadingComments) {
        m = f;
        B = a.leadingComments[0];
        f = r(B);
        e(f) || (f += "\n");
        g = 1;
        for(k = a.leadingComments.length;g < k;g += 1) {
          B = a.leadingComments[g], B = r(B), e(B) || (B += "\n"), f += A + B
        }
        f += A + m
      }
      if(a.trailingComments) {
        m = !e(f);
        g = A + f + D;
        for(k = g.length - 1;0 <= k && !l(g.charAt(k));k -= 1) {
        }
        v = d(" ", g.length - 1 - k);
        g = 0;
        for(k = a.trailingComments.length;g < k;g += 1) {
          B = a.trailingComments[g], m ? (f = 0 === g ? f + D : f + v, f += r(B, v)) : f += p(r(B)), g !== k - 1 && !e(f) && (f += "\n")
        }
      }
      return f
    }
    return k
  }
  function x(a, d) {
    var b, e, f, g, k, l, m;
    b = [a];
    for(e = [];b.length;) {
      if(f = b.pop()) {
        g = d.enter ? d.enter(f) : void 0;
        if(g === J.Break) {
          break
        }
        b.push(null);
        e.push(f);
        if(g !== J.Skip) {
          l = M[f.type];
          for(g = l.length;0 <= (g -= 1);) {
            if(m = f[l[g]]) {
              if(O(m)) {
                for(k = m.length;0 <= (k -= 1);) {
                  m[k] && b.push(m[k])
                }
              }else {
                b.push(m)
              }
            }
          }
        }
      }else {
        if(f = e.pop(), g = d.leave ? d.leave(f) : void 0, g === J.Break) {
          break
        }
      }
    }
  }
  function H(a, d) {
    var b, e, f, g;
    e = d.length;
    for(f = 0;e;) {
      b = e >>> 1, g = f + b, d[g].range[0] > a.range[0] ? e = b : (f = g + 1, e -= b + 1)
    }
    b = f;
    a.extendedRange = [a.range[0], a.range[1]];
    b !== d.length && (a.extendedRange[1] = d[b].range[0]);
    b -= 1;
    0 <= b && (b < d.length ? a.extendedRange[0] = d[b].range[1] : (void 0).length && (a.extendedRange[1] = d[d.length - 1].range[0]));
    return a
  }
  var y, t, N, L, M, J, O, A, D, z, E, Q, F, B, G, K, I, U, V, da;
  y = {AssignmentExpression:"AssignmentExpression", ArrayExpression:"ArrayExpression", BlockStatement:"BlockStatement", BinaryExpression:"BinaryExpression", BreakStatement:"BreakStatement", CallExpression:"CallExpression", CatchClause:"CatchClause", ConditionalExpression:"ConditionalExpression", ContinueStatement:"ContinueStatement", DoWhileStatement:"DoWhileStatement", DebuggerStatement:"DebuggerStatement", EmptyStatement:"EmptyStatement", ExpressionStatement:"ExpressionStatement", ForStatement:"ForStatement", 
  ForInStatement:"ForInStatement", FunctionDeclaration:"FunctionDeclaration", FunctionExpression:"FunctionExpression", Identifier:"Identifier", IfStatement:"IfStatement", Literal:"Literal", LabeledStatement:"LabeledStatement", LogicalExpression:"LogicalExpression", MemberExpression:"MemberExpression", NewExpression:"NewExpression", ObjectExpression:"ObjectExpression", Program:"Program", Property:"Property", ReturnStatement:"ReturnStatement", SequenceExpression:"SequenceExpression", SwitchStatement:"SwitchStatement", 
  SwitchCase:"SwitchCase", ThisExpression:"ThisExpression", ThrowStatement:"ThrowStatement", TryStatement:"TryStatement", UnaryExpression:"UnaryExpression", UpdateExpression:"UpdateExpression", VariableDeclaration:"VariableDeclaration", VariableDeclarator:"VariableDeclarator", WhileStatement:"WhileStatement", WithStatement:"WithStatement"};
  t = {Sequence:0, Assignment:1, Conditional:2, LogicalOR:3, LogicalAND:4, BitwiseOR:5, BitwiseXOR:6, BitwiseAND:7, Equality:8, Relational:9, BitwiseSHIFT:10, Additive:11, Multiplicative:12, Unary:13, Postfix:14, Call:15, New:16, Member:17, Primary:18};
  N = {"||":t.LogicalOR, "&&":t.LogicalAND, "|":t.BitwiseOR, "^":t.BitwiseXOR, "&":t.BitwiseAND, "==":t.Equality, "!=":t.Equality, "===":t.Equality, "!==":t.Equality, "<":t.Relational, ">":t.Relational, "<=":t.Relational, ">=":t.Relational, "in":t.Relational, "instanceof":t.Relational, "<<":t.BitwiseSHIFT, ">>":t.BitwiseSHIFT, ">>>":t.BitwiseSHIFT, "+":t.Additive, "-":t.Additive, "*":t.Multiplicative, "%":t.Multiplicative, "/":t.Multiplicative};
  L = {NonAsciiIdentifierPart:RegExp("[\u00aa\u00b5\u00ba\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]")};
  (O = Array.isArray) || (O = function(a) {
    return"[object Array]" === Object.prototype.toString.call(a)
  });
  M = {AssignmentExpression:["left", "right"], ArrayExpression:["elements"], BlockStatement:["body"], BinaryExpression:["left", "right"], BreakStatement:["label"], CallExpression:["callee", "arguments"], CatchClause:["param", "body"], ConditionalExpression:["test", "consequent", "alternate"], ContinueStatement:["label"], DoWhileStatement:["body", "test"], DebuggerStatement:[], EmptyStatement:[], ExpressionStatement:["expression"], ForStatement:["init", "test", "update", "body"], ForInStatement:["left", 
  "right", "body"], FunctionDeclaration:["id", "params", "body"], FunctionExpression:["id", "params", "body"], Identifier:[], IfStatement:["test", "consequent", "alternate"], Literal:[], LabeledStatement:["label", "body"], LogicalExpression:["left", "right"], MemberExpression:["object", "property"], NewExpression:["callee", "arguments"], ObjectExpression:["properties"], Program:["body"], Property:["key", "value"], ReturnStatement:["argument"], SequenceExpression:["expressions"], SwitchStatement:["descriminant", 
  "cases"], SwitchCase:["test", "consequent"], ThisExpression:[], ThrowStatement:["argument"], TryStatement:["block", "handlers", "finalizer"], UnaryExpression:["argument"], UpdateExpression:["argument"], VariableDeclaration:["declarations"], VariableDeclarator:["id", "init"], WhileStatement:["test", "body"], WithStatement:["object", "body"]};
  J = {Break:1, Skip:2};
  a.version = "0.0.6-dev";
  a.generate = function(a, b) {
    var e = {indent:null, base:null, parse:null, comment:!1, format:{indent:{style:"    ", base:0, adjustMultilineComment:!1}, json:!1, renumber:!1, hexadecimal:!1, quotes:"single", escapeless:!1, compact:!1, parentheses:!0, semicolons:!0}};
    "undefined" !== typeof b ? ("string" === typeof b.indent && (e.format.indent.style = b.indent), "number" === typeof b.base && (e.format.indent.base = b.base), b = g(e, b), D = b.format.indent.style, A = "string" === typeof b.base ? b.base : d(D, b.format.indent.base)) : (b = e, D = b.format.indent.style, A = d(D, b.format.indent.base));
    z = b.format.json;
    E = b.format.renumber;
    Q = z ? !1 : b.format.hexadecimal;
    F = z ? "double" : b.format.quotes;
    B = b.format.escapeless;
    b.format.compact ? G = K = D = A = "" : (G = "\n", K = " ");
    I = b.format.parentheses;
    U = b.format.semicolons;
    da = z ? null : b.parse;
    V = b;
    switch(a.type) {
      case y.BlockStatement:
      ;
      case y.BreakStatement:
      ;
      case y.CatchClause:
      ;
      case y.ContinueStatement:
      ;
      case y.DoWhileStatement:
      ;
      case y.DebuggerStatement:
      ;
      case y.EmptyStatement:
      ;
      case y.ExpressionStatement:
      ;
      case y.ForStatement:
      ;
      case y.ForInStatement:
      ;
      case y.FunctionDeclaration:
      ;
      case y.IfStatement:
      ;
      case y.LabeledStatement:
      ;
      case y.Program:
      ;
      case y.ReturnStatement:
      ;
      case y.SwitchStatement:
      ;
      case y.SwitchCase:
      ;
      case y.ThrowStatement:
      ;
      case y.TryStatement:
      ;
      case y.VariableDeclaration:
      ;
      case y.VariableDeclarator:
      ;
      case y.WhileStatement:
      ;
      case y.WithStatement:
        return w(a);
      case y.AssignmentExpression:
      ;
      case y.ArrayExpression:
      ;
      case y.BinaryExpression:
      ;
      case y.CallExpression:
      ;
      case y.ConditionalExpression:
      ;
      case y.FunctionExpression:
      ;
      case y.Identifier:
      ;
      case y.Literal:
      ;
      case y.LogicalExpression:
      ;
      case y.MemberExpression:
      ;
      case y.NewExpression:
      ;
      case y.ObjectExpression:
      ;
      case y.Property:
      ;
      case y.SequenceExpression:
      ;
      case y.ThisExpression:
      ;
      case y.UnaryExpression:
      ;
      case y.UpdateExpression:
        return q(a, {precedence:t.Sequence, allowIn:!0, allowCall:!0})
    }
    throw Error("Unknown node type: " + a.type);
  };
  a.traverse = x;
  a.attachComments = function(a, d, b) {
    var e = [], g, k;
    if(!a.range) {
      throw Error("attachComments needs range information");
    }
    if(!b.length) {
      if(d.length) {
        k = 0;
        for(g = d.length;k < g;k += 1) {
          b = f(d[k]), b.extendedRange = [0, a.range[0]], e.push(b)
        }
        a.leadingComments = e
      }
      return a
    }
    k = 0;
    for(g = d.length;k < g;k += 1) {
      e.push(H(f(d[k]), b))
    }
    x(a, {cursor:0, enter:function(a) {
      for(var d;this.cursor < e.length;) {
        d = e[this.cursor];
        if(d.extendedRange[1] > a.range[0]) {
          break
        }
        d.extendedRange[1] === a.range[0] ? (a.leadingComments || (a.leadingComments = []), a.leadingComments.push(d), e.splice(this.cursor, 1)) : this.cursor += 1
      }
      if(this.cursor === e.length) {
        return J.Break
      }
      if(e[this.cursor].extendedRange[0] > a.range[1]) {
        return J.Skip
      }
    }});
    x(a, {cursor:0, leave:function(a) {
      for(var d;this.cursor < e.length;) {
        d = e[this.cursor];
        if(a.range[1] < d.extendedRange[0]) {
          break
        }
        a.range[1] === d.extendedRange[0] ? (a.trailingComments || (a.trailingComments = []), a.trailingComments.push(d), e.splice(this.cursor, 1)) : this.cursor += 1
      }
      if(this.cursor === e.length) {
        return J.Break
      }
      if(e[this.cursor].extendedRange[0] > a.range[1]) {
        return J.Skip
      }
    }});
    return a
  }
})("undefined" === typeof exports ? escodegen = {} : exports);
var verifierOptions = systemOptions.register(new OptionSet("Verifier Options")), verifierTraceLevel = verifierOptions.register(new Option("tv", "tv", "number", 0, "Verifier Trace Level")), Type = function() {
  function a() {
    unexpected("Type is Abstract")
  }
  a.prototype.equals = function(a) {
    return this === a
  };
  a.prototype.merge = function(a) {
    unexpected("Merging " + this + " with " + a)
  };
  a.cache = {name:{}, classInfo:[], instanceInfo:[], scriptInfo:[], methodInfo:[]};
  a.from = function(d, b) {
    var f = null;
    d instanceof ClassInfo ? f = a.cache.classInfo : d instanceof InstanceInfo ? f = a.cache.instanceInfo : d instanceof ScriptInfo && (f = a.cache.scriptInfo);
    return f ? f[d.id] || (f[d.id] = new TraitsType(d, b)) : d instanceof Activation ? new TraitsType(d.methodInfo) : d instanceof Global ? new TraitsType(d.scriptInfo) : d instanceof Interface ? new TraitsType(d.classInfo, b) : d instanceof MethodInfo ? new MethodType(d) : b && d instanceof b.system.Class ? a.from(d.classInfo, b) : Type.Any
  };
  a.fromSimpleName = function(a, b) {
    return Type.fromName(Multiname.fromSimpleName(a), b)
  };
  a.fromName = function(d, b) {
    if(void 0 === d) {
      return Type.Undefined
    }
    var f = Multiname.getQualifiedName(d), g = a.cache.name[f];
    if(g) {
      return g
    }
    if("public$void" === f) {
      return Type.Void
    }
    release || !0;
    g = (g = b.findClassInfo(d)) ? a.from(g, b) : Type.Any;
    return a.cache.name[f] = g
  };
  a.prototype.applyType = function(a) {
    return new ParameterizedType(this, a)
  };
  a.prototype.toString = function() {
    return"[type]"
  };
  a.prototype.isNumeric = function() {
    return this === Type.Int || this === Type.Number
  };
  a.prototype.instance = function() {
    return this
  };
  a.prototype.getTrait = function() {
    return null
  };
  a.prototype.super = function() {
    unexpected("Can't call super on " + this)
  };
  a.prototype.isSubtypeOf = function(a) {
    return this === a || this.equals(a) ? !0 : this.merge(a) === this
  };
  var b = !1;
  a.initializeTypes = function(d) {
    b || (d = d.domain, a.Any = new AtomType("Any"), a.Null = new AtomType("Null"), a.Undefined = new AtomType("Undefined"), a.Void = new AtomType("Void"), a.Int = Type.fromSimpleName("int", d).instance(), a.Uint = Type.fromSimpleName("uint", d).instance(), a.Array = Type.fromSimpleName("Array", d).instance(), a.Object = Type.fromSimpleName("Object", d).instance(), a.String = Type.fromSimpleName("String", d).instance(), a.Number = Type.fromSimpleName("Number", d).instance(), a.Boolean = Type.fromSimpleName("Boolean", 
    d).instance(), a.Function = Type.fromSimpleName("Function", d).instance(), b = !0)
  };
  return a
}(), AtomType = function() {
  function a(a) {
    this.name = a
  }
  a.prototype = Object.create(Type.prototype);
  a.prototype.toString = function() {
    if(this === Type.Any) {
      return"?"
    }
    if(this === Type.Undefined) {
      return"_"
    }
    if(this === Type.Null) {
      return"X"
    }
    if(this === Type.Void) {
      return"V"
    }
    unexpected()
  };
  a.prototype.merge = function(a) {
    return a instanceof TraitsType ? Type.Any : this === a ? this : Type.Any
  };
  return a
}(), MethodType = function() {
  function a(a) {
    this.methodInfo = a
  }
  a.prototype = Object.create(Type.prototype);
  a.prototype.toString = function() {
    return"MT " + this.methodInfo
  };
  return a
}(), TraitsType = function() {
  function a(a, d) {
    release || !0;
    this.object = a;
    this.traits = a.traits;
    this.domain = d;
    this.object instanceof InstanceInfo && (release || !0)
  }
  function b(a) {
    if(a instanceof ScriptInfo) {
      return"SI"
    }
    if(a instanceof ClassInfo) {
      return"CI:" + a.instanceInfo.name.name
    }
    if(a instanceof InstanceInfo) {
      return"II:" + a.name.name
    }
    if(a instanceof MethodInfo) {
      return"MI"
    }
    if(a instanceof Activation) {
      return"AC"
    }
    release || !0
  }
  function d(a, b, g) {
    var k = !g, l;
    if(Multiname.isQName(b)) {
      r = Multiname.getQualifiedName(b);
      n = 0;
      for(p = a.length;n < p;n++) {
        if(l = a[n], Multiname.getQualifiedName(l.name) === r && !(g && l.isGetter() || k && l.isSetter())) {
          return l
        }
      }
    }else {
      release || !0;
      for(var m, n = 0, p = b.namespaces.length;n < p;n++) {
        var r = b.getQName(n);
        if(b.namespaces[n].isDynamic()) {
          m = r
        }else {
          if(l = d(a, r, g)) {
            return l
          }
        }
      }
      if(m) {
        return d(a, m, g)
      }
    }
  }
  a.prototype = Object.create(Type.prototype);
  a.prototype.getTrait = function(a, b) {
    if(b && this.isInstanceInfo()) {
      var g = this;
      do {
        var k = g.getTrait(a);
        k || (g = g.super())
      }while(!k && g);
      return k
    }
    return d(this.traits, a)
  };
  a.prototype.getTraitAt = function(a) {
    if(this.object instanceof ScriptInfo || this.object instanceof MethodInfo) {
      a: {
        for(var d = this.traits, b = d.length - 1;0 <= b;b--) {
          if(d[b].slotId === a) {
            a = d[b];
            break a
          }
        }
        unexpected("Cannot find trait with slotId: " + a + " in " + d);
        a = void 0
      }
      return a
    }
  };
  a.prototype.toString = function() {
    switch(this) {
      case Type.Int:
        return"I";
      case Type.Uint:
        return"U";
      case Type.Array:
        return"A";
      case Type.Object:
        return"O";
      case Type.String:
        return"S";
      case Type.Number:
        return"N";
      case Type.Boolean:
        return"B";
      case Type.Function:
        return"F"
    }
    return b(this.object)
  };
  a.prototype.instance = function() {
    release || !0;
    return this.instanceCache || (this.instanceCache = Type.from(this.object.instanceInfo, this.domain))
  };
  a.prototype.super = function() {
    release || !0;
    if(this.object.superName) {
      var a = Type.fromName(this.object.superName, this.domain).instance();
      release || !0;
      return a
    }
    return null
  };
  a.prototype.isClassInfo = function() {
    return this.object instanceof ClassInfo
  };
  a.prototype.isInstanceInfo = function() {
    return this.object instanceof InstanceInfo
  };
  a.prototype.equals = function(a) {
    return this.traits === a.traits
  };
  a.prototype.merge = function(a) {
    if(a instanceof TraitsType) {
      if(this.equals(a)) {
        return this
      }
      if(this.isNumeric() && a.isNumeric()) {
        return Type.Number
      }
      if(this.isInstanceInfo() && a.isInstanceInfo()) {
        for(var d = [], b = this;b;b = b.super()) {
          d.push(b)
        }
        for(b = a;b;b = b.super()) {
          for(a = 0;a < d.length;a++) {
            if(d[a].equals(b)) {
              return b
            }
          }
        }
        return Type.Object
      }
    }
    return Type.Any
  };
  return a
}(), MultinameType = function() {
  function a(a, d) {
    this.namespaces = a;
    this.name = d
  }
  a.prototype = Object.create(Type.prototype);
  a.prototype.toString = function() {
    return"MN"
  };
  return a
}(), ParameterizedType = function() {
  function a(a, d) {
    this.type = a;
    this.parameter = d
  }
  a.prototype = Object.create(Type.prototype);
  a.prototype.toString = function() {
    return this.type + "<" + this.parameter + ">"
  };
  return a
}(), TypeInformation = function() {
  function a() {
  }
  a.prototype.toString = function() {
    return toKeyValueArray(this).map(function(a) {
      return a[0] + ": " + a[1]
    }).join(" | ")
  };
  return a
}(), Verifier = function() {
  function a(a) {
    this.name = "VerifierError";
    this.message = a || ""
  }
  function b(a) {
    this.writer = new IndentingWriter;
    this.abc = a;
    Type.initializeTypes(a)
  }
  var d, e = function() {
    this.id = l += 1;
    this.stack = [];
    this.scope = [];
    this.local = []
  }, f = function(a, d) {
    if(a.length != d.length) {
      return!1
    }
    for(var b = a.length - 1;0 <= b;b--) {
      if(!a[b].equals(d[b])) {
        return!1
      }
    }
    return!0
  }, g = function(a, d) {
    if(a.length != d.length) {
      return!1
    }
    for(var b = a.length - 1;0 <= b;b--) {
      if(!(a[b] === d[b] || a[b].equals(d[b])) && a[b].merge(d[b]) !== a[b]) {
        return!1
      }
    }
    return!0
  }, k = function(a, d) {
    release || !0;
    for(var b = a.length - 1;0 <= b;b--) {
      release || !0, a[b] !== d[b] && (a[b] = a[b].merge(d[b]))
    }
  }, l = 0;
  e.prototype.clone = function() {
    var a = new d;
    a.originalId = this.id;
    a.stack = this.stack.slice(0);
    a.scope = this.scope.slice(0);
    a.local = this.local.slice(0);
    return a
  };
  e.prototype.trace = function(a) {
    a.writeLn(this.toString())
  };
  e.prototype.toString = function() {
    return"<" + this.id + (this.originalId ? ":" + this.originalId : "") + ", L[" + this.local.join(", ") + "], S[" + this.stack.join(", ") + "], $[" + this.scope.join(", ") + "]>"
  };
  e.prototype.equals = function(a) {
    return f(this.stack, a.stack) && f(this.scope, a.scope) && f(this.local, a.local)
  };
  e.prototype.isSubset = function(a) {
    return g(this.stack, a.stack) && g(this.scope, a.scope) && g(this.local, a.local)
  };
  e.prototype.merge = function(a) {
    k(this.local, a.local);
    k(this.stack, a.stack);
    k(this.scope, a.scope)
  };
  d = e;
  var m = function(a, d, b) {
    this.scope = b;
    this.abc = a.abc;
    this.domain = this.abc.domain;
    this.verifier = a;
    this.methodInfo = d;
    this.writer = new IndentingWriter;
    this.returnType = Type.Undefined
  };
  m.prototype.verify = function() {
    var a = this.methodInfo, b = verifierTraceLevel.value ? this.writer : null, e = a.analysis.blocks;
    e.forEach(function(a) {
      a.entryState = a.exitState = null
    });
    b && this.methodInfo.trace(b, this.verifier.abc);
    var f = new d;
    release || !0;
    this.thisType = a.holder ? Type.from(a.holder, this.domain) : Type.Any;
    f.local.push(this.thisType);
    for(var g = 0;g < a.parameters.length;g++) {
      f.local.push(Type.fromName(a.parameters[g].type, this.domain).instance())
    }
    var k = a.localCount - a.parameters.length - 1;
    if(a.needsRest() || a.needsArguments()) {
      f.local.push(Type.Array), k -= 1
    }
    for(g = 0;g < k;g++) {
      f.local.push(Type.Undefined)
    }
    release || !0;
    b && f.trace(b);
    a = 0;
    for(g = e.length;a < g;a++) {
      e[a].bdo = a
    }
    var l = new SortedList(function(a, d) {
      return a.bdo - d.bdo
    });
    e[0].entryState = f;
    for(l.push(e[0]);l.peek();) {
      var m = l.pop(), w = m.exitState = m.entryState.clone();
      this.verifyBlock(m, w);
      m.succs.forEach(function(a) {
        l.contains(a) ? (b && b.writeLn("Forward Merged Block: " + a.bid + " " + w.toString() + " with " + a.entryState.toString()), a.entryState.merge(w), b && b.writeLn("Merged State: " + a.entryState)) : a.entryState ? a.entryState.isSubset(w) || (b && b.writeLn("Backward Merged Block: " + m.bid + " with " + a.bid + " " + w.toString() + " with " + a.entryState.toString()), a.entryState.merge(w), l.push(a), b && b.writeLn("Merged State: " + a.entryState)) : (a.entryState = w.clone(), l.push(a), 
        b && b.writeLn("Added Block: " + a.bid + " to worklist: " + a.entryState.toString()))
      })
    }
    b && b.writeLn("Inferred return type: " + this.returnType);
    this.methodInfo.inferredReturnType = this.returnType
  };
  m.prototype.verifyBlock = function(d, b) {
    function e(a) {
      if(a instanceof TraitsType) {
        if(a === Type.Function) {
          return Type.Object
        }
        release || !0;
        return a.instance()
      }
      return Type.Any
    }
    function f() {
      return D.ti || (D.ti = new TypeInformation)
    }
    function g(a) {
      release || !0;
      f().type = a;
      N.push(a)
    }
    function k() {
      return N.pop()
    }
    function l(a, d) {
      for(var b = L.length - 1;0 <= b;b--) {
        if(L[b] instanceof TraitsType) {
          if(L[b].getTrait(a)) {
            return f().scopeDepth = L.length - b - 1, L[b]
          }
        }else {
          return Type.Any
        }
      }
      if(y && (y.object && a instanceof Multiname) && (b = y.findProperty(a, O.domain, d, !0))) {
        var e = y.findDepth(b);
        release || !0;
        f().scopeDepth = e + L.length;
        b instanceof Global && (f().object = b);
        return Type.from(b, O.domain)
      }
      return(b = O.domain.findProperty(a, !1, !1)) ? (release || !0, f().object = b, Type.from(b, O.domain)) : Type.Any
    }
    function m() {
      var a = A[D.index];
      if(a.isRuntime()) {
        var d = a.namespaces, b = a.name;
        a.isRuntimeName() && (b = k());
        a.isRuntimeNamespace() && (d = [k()]);
        return new MultinameType(d, a, b)
      }
      return a
    }
    function w(a) {
      if(a instanceof TraitsType && (a = a.getTraitAt(D.index), M && M.debugLn("accessSlot() -> " + a), a)) {
        f().trait = a;
        if(a.isSlot()) {
          return Type.fromName(a.typeName, O.domain).instance()
        }
        if(a.isClass()) {
          return Type.from(a.classInfo, O.domain)
        }
      }
      return Type.Any
    }
    function x(a, d) {
      if(a instanceof TraitsType && d instanceof Multiname) {
        var b = a.getTrait(d, !0);
        M && M.debugLn("getProperty(" + d + ") -> " + b);
        if(b) {
          f().trait = b;
          if(b.isSlot()) {
            return Type.fromName(b.typeName, O.domain).instance()
          }
          if(b.isClass()) {
            return Type.from(b.classInfo, O.domain)
          }
          if(b.isMethod()) {
            return Type.from(b.methodInfo, O.domain)
          }
        }else {
          f().propertyQName = Multiname.getPublicQualifiedName(d.name)
        }
      }
      return Type.Any
    }
    function H(a, b) {
      if(a instanceof TraitsType && b instanceof Multiname) {
        var d = a.getTrait(b, !0);
        M && M.debugLn("setProperty(" + b + ") -> " + d);
        d ? f().trait = d : f().propertyQName = Multiname.getPublicQualifiedName(b.name)
      }
    }
    var y = this.scope, t = b.local, N = b.stack, L = b.scope, M = verifierTraceLevel.value ? this.writer : null, J = this.methodInfo.analysis.bytecodes, O = this.verifier.abc, A = O.constantPool.multinames, D, z, E;
    M && M.enter("verifyBlock: " + d.bid + ", range: [" + d.position + ", " + d.end.position + "], entryState: " + b.toString() + " {");
    for(var Q = d.position, F = d.end.position;Q <= F;Q++) {
      D = J[Q];
      z = D.op;
      M && 1 < verifierTraceLevel.value && M.writeLn(("stateBefore: " + b.toString()).padRight(" ", 100) + " : " + Q + ", " + D.toString(O));
      switch(z) {
        case 1:
          break;
        case 3:
          k();
          break;
        case 4:
          E = m();
          z = k();
          release || !0;
          g(x(z.super(), E));
          break;
        case 5:
          E = k();
          E = m();
          z = k();
          release || !0;
          H(z.super(), E);
          break;
        case 6:
          notImplemented(D);
          break;
        case 7:
          notImplemented(D);
          break;
        case 8:
          b.local[D.index] = Type.Undefined;
          break;
        case 10:
          notImplemented(D);
          break;
        case 11:
          notImplemented(D);
          break;
        case 12:
        ;
        case 24:
        ;
        case 13:
        ;
        case 23:
        ;
        case 14:
        ;
        case 22:
        ;
        case 15:
        ;
        case 21:
        ;
        case 19:
        ;
        case 20:
        ;
        case 25:
        ;
        case 26:
          k();
          k();
          break;
        case 16:
          break;
        case 17:
        ;
        case 18:
          k();
          break;
        case 27:
          k(Type.Int);
          break;
        case 29:
          L.pop();
          break;
        case 30:
        ;
        case 35:
          k(Type.Int);
          k();
          g(Type.Any);
          break;
        case 31:
          g(Type.Boolean);
          break;
        case 50:
          g(Type.Boolean);
          break;
        case 32:
          g(Type.Null);
          break;
        case 33:
          g(Type.Undefined);
          break;
        case 34:
          notImplemented(D);
          break;
        case 36:
          g(Type.Int);
          break;
        case 37:
          g(Type.Int);
          break;
        case 44:
          g(Type.String);
          break;
        case 45:
          g(Type.Int);
          break;
        case 46:
          g(Type.Uint);
          break;
        case 47:
          g(Type.Number);
          break;
        case 38:
          g(Type.Boolean);
          break;
        case 39:
          g(Type.Boolean);
          break;
        case 40:
          g(Type.Number);
          break;
        case 41:
          k();
          break;
        case 42:
          E = k();
          g(E);
          g(E);
          break;
        case 43:
          z = k();
          E = k();
          g(z);
          g(E);
          break;
        case 28:
          k();
          L.push(Type.Any);
          break;
        case 48:
          L.push(k());
          break;
        case 49:
          notImplemented(D);
          break;
        case 53:
        ;
        case 54:
        ;
        case 55:
          g(Type.Int);
          break;
        case 56:
        ;
        case 57:
          g(Type.Number);
          break;
        case 58:
        ;
        case 59:
        ;
        case 60:
          k(Type.Int);
          break;
        case 61:
        ;
        case 62:
          k(Type.Number);
          break;
        case 64:
          g(Type.Function);
          break;
        case 65:
          N.popMany(D.argCount);
          z = k();
          k();
          g(Type.Any);
          break;
        case 67:
          throw new a("callmethod");;
        case 68:
          notImplemented(D);
          break;
        case 69:
          N.popMany(D.argCount);
          E = m();
          z = k();
          x(z, E);
          g(Type.Any);
          break;
        case 70:
        ;
        case 76:
          N.popMany(D.argCount);
          E = m();
          z = k();
          z = x(z, E);
          z = z instanceof MethodType ? Type.fromName(z.methodInfo.returnType, O.domain).instance() : Type.Any;
          g(z);
          break;
        case 71:
          this.returnType.merge(Type.Undefined);
          break;
        case 72:
          k();
          break;
        case 73:
          N.popMany(D.argCount);
          N.pop();
          this.thisType.isInstanceInfo() && this.thisType.super() === Type.Object && (f().noCallSuperNeeded = !0);
          break;
        case 66:
          N.popMany(D.argCount);
          g(e(k()));
          break;
        case 74:
          N.popMany(D.argCount);
          E = m();
          g(e(x(N.pop(), E)));
          break;
        case 75:
          notImplemented(D);
          break;
        case 77:
          notImplemented(D);
          break;
        case 78:
          N.popMany(D.argCount);
          m();
          k();
          break;
        case 79:
          N.popMany(D.argCount);
          m();
          k();
          break;
        case 80:
        ;
        case 81:
        ;
        case 82:
          break;
        case 83:
          release || !0;
          E = k();
          z = k();
          g(z.applyType(E));
          break;
        case 84:
          notImplemented(D);
          break;
        case 85:
          N.popMany(2 * D.argCount);
          g(Type.Object);
          break;
        case 86:
          N.popMany(D.argCount);
          g(Type.Array);
          break;
        case 87:
          g(Type.from(new Activation(this.methodInfo)));
          break;
        case 88:
          g(Type.Any);
          break;
        case 89:
          notImplemented(D);
          break;
        case 90:
          g(Type.Any);
          break;
        case 93:
          g(l(m(), !0));
          break;
        case 94:
          g(l(m(), !1));
          break;
        case 95:
          notImplemented(D);
          break;
        case 96:
          E = m();
          g(x(l(E, !0), E));
          break;
        case 104:
        ;
        case 97:
          E = k();
          E = m();
          z = k();
          H(z, E, D);
          break;
        case 98:
          g(t[D.index]);
          break;
        case 99:
          t[D.index] = k();
          break;
        case 100:
          y.object ? g(Type.from(y.global.object)) : g(Type.Any);
          break;
        case 101:
          g(L[D.index]);
          break;
        case 102:
          E = m();
          z = k();
          g(x(z, E));
          break;
        case 103:
          notImplemented(D);
          break;
        case 105:
          notImplemented(D);
          break;
        case 106:
          m();
          k();
          g(Type.Boolean);
          break;
        case 107:
          notImplemented(D);
          break;
        case 108:
          g(w(k()));
          break;
        case 109:
          E = k();
          z = k();
          w(z);
          break;
        case 110:
          notImplemented(D);
          break;
        case 111:
          notImplemented(D);
          break;
        case 112:
          k();
          g(Type.String);
          break;
        case 113:
          k();
          g(Type.String);
          break;
        case 114:
          k();
          g(Type.String);
          break;
        case 131:
        ;
        case 115:
          k();
          g(Type.Int);
          break;
        case 136:
        ;
        case 116:
          k();
          g(Type.Uint);
          break;
        case 132:
        ;
        case 117:
          k();
          g(Type.Number);
          break;
        case 129:
        ;
        case 118:
          k();
          g(Type.Boolean);
          break;
        case 119:
          notImplemented(D);
          break;
        case 120:
          notImplemented(D);
          break;
        case 121:
          k();
          g(Type.Number);
          break;
        case 122:
          notImplemented(D);
          break;
        case 123:
          notImplemented(D);
          break;
        case 128:
          z = k();
          E = Type.fromName(A[D.index], this.domain).instance();
          E.isSubtypeOf(z) && (f().noCoercionNeeded = !0);
          g(E);
          break;
        case 130:
          break;
        case 133:
          k();
          g(Type.String);
          break;
        case 134:
          notImplemented(D);
          break;
        case 135:
          k();
          k();
          g(Type.Any);
          break;
        case 137:
          notImplemented(D);
          break;
        case 144:
        ;
        case 145:
        ;
        case 147:
          k();
          g(Type.Number);
          break;
        case 146:
        ;
        case 148:
          t[D.index] = Type.Number;
          break;
        case 149:
          k();
          g(Type.String);
          break;
        case 150:
          k();
          g(Type.Boolean);
          break;
        case 160:
          E = k();
          z = k();
          z.isNumeric() && E.isNumeric() ? g(Type.Number) : z === Type.String || E === Type.String ? g(Type.String) : g(Type.Any);
          break;
        case 161:
        ;
        case 162:
        ;
        case 163:
        ;
        case 164:
          k();
          k();
          g(Type.Number);
          break;
        case 168:
        ;
        case 169:
        ;
        case 170:
        ;
        case 165:
        ;
        case 166:
        ;
        case 167:
          k();
          k();
          g(Type.Int);
          break;
        case 151:
          k();
          g(Type.Int);
          break;
        case 171:
        ;
        case 172:
        ;
        case 173:
        ;
        case 174:
        ;
        case 175:
        ;
        case 176:
        ;
        case 177:
        ;
        case 180:
          k();
          k();
          g(Type.Boolean);
          break;
        case 178:
          k();
          g(Type.Boolean);
          break;
        case 179:
          k();
          k();
          g(Type.Boolean);
          break;
        case 194:
        ;
        case 195:
          t[D.index] = Type.Int;
          break;
        case 193:
        ;
        case 192:
        ;
        case 196:
          k();
          g(Type.Int);
          break;
        case 197:
        ;
        case 198:
        ;
        case 199:
          k();
          k();
          g(Type.Int);
          break;
        case 208:
        ;
        case 209:
        ;
        case 210:
        ;
        case 211:
          g(t[z - 208]);
          break;
        case 212:
        ;
        case 213:
        ;
        case 214:
        ;
        case 215:
          t[z - OP_setlocal0] = k();
          break;
        case 239:
          break;
        case 240:
          break;
        case 241:
          break;
        case 242:
          break;
        case 243:
          break;
        default:
          console.info("Not Implemented: " + D)
      }
      M && D.ti && M.debugLn("> TI: " + D.ti)
    }
    M && (M.leave("}"), M.writeLn("verifiedBlock: " + d.bid + ", range: [" + d.position + ", " + d.end.position + "], exitState: " + b.toString()))
  };
  b.prototype.verifyMethod = function(b, d) {
    try {
      (new m(this, b, d)).verify(), b.verified = !0, Counter.count("Verifier: Methods")
    }catch(e) {
      if(!(e instanceof a)) {
        throw e;
      }
    }
  };
  return b
}();
(function(a) {
  function b(a, b) {
    return Object.create(a.prototype, {nodeName:{value:b}})
  }
  function d(a) {
    var b;
    if(a instanceof A) {
      return a.value instanceof Multiname ? a.value.name : a.value
    }
    if(a instanceof w) {
      return a.name
    }
    if(a instanceof q) {
      return b = "|" + a.id + "|", b
    }
    if(a instanceof v) {
      return b = "{" + a.id + "}", b
    }
    if(a instanceof N) {
      return a.type === N.Type.STORE ? (b = "[" + a.id + "->" + a.argument.id + "]", b) : (b = "(" + a.id + ")", b)
    }
    if(a instanceof s) {
      return b = "(" + a.id + ")", b
    }
    if(a instanceof p) {
      return a.id
    }
    unexpected(a + " " + typeof a)
  }
  function e(a) {
    return a.id
  }
  function f(a) {
    return a instanceof A
  }
  var g = !1, k = function(a, b, d) {
    this.name = a;
    this.binary = d;
    this.evaluate = b;
    l[a] = this
  }, l = {};
  k.ADD = new k("+", function(a, b) {
    return a + b
  }, !0);
  k.SUB = new k("-", function(a, b) {
    return a - b
  }, !0);
  k.MUL = new k("*", function(a, b) {
    return a * b
  }, !0);
  k.DIV = new k("/", function(a, b) {
    return a / b
  }, !0);
  k.MOD = new k("%", function(a, b) {
    return a % b
  }, !0);
  k.AND = new k("&", function(a, b) {
    return a & b
  }, !0);
  k.OR = new k("|", function(a, b) {
    return a | b
  }, !0);
  k.XOR = new k("^", function(a, b) {
    return a ^ b
  }, !0);
  k.LSH = new k("<<", function(a, b) {
    return a << b
  }, !0);
  k.RSH = new k(">>", function(a, b) {
    return a >> b
  }, !0);
  k.URSH = new k(">>>", function(a, b) {
    return a >>> b
  }, !0);
  k.SEQ = new k("===", function(a, b) {
    return a === b
  }, !0);
  k.SNE = new k("!==", function(a, b) {
    return a !== b
  }, !0);
  k.EQ = new k("==", function(a, b) {
    return a == b
  }, !0);
  k.NE = new k("!=", function(a, b) {
    return a != b
  }, !0);
  k.LE = new k("<=", function(a, b) {
    return a <= b
  }, !0);
  k.GT = new k(">", function(a, b) {
    return a > b
  }, !0);
  k.LT = new k("<", function(a, b) {
    return a < b
  }, !0);
  k.GE = new k(">=", function(a, b) {
    return a >= b
  }, !0);
  k.BITWISE_NOT = new k("~", function(a) {
    return~a
  }, !1);
  k.PLUS = new k("+", function(a) {
    return+a
  }, !1);
  k.NEG = new k("-", function(a) {
    return-a
  }, !1);
  k.TRUE = new k("!!", function(a) {
    return!!a
  }, !1);
  k.FALSE = new k("!", function(a) {
    return!a
  }, !1);
  var m = k.SEQ, n = k.SNE;
  m.not = n;
  n.not = m;
  m = k.EQ;
  n = k.NE;
  m.not = n;
  n.not = m;
  m = k.TRUE;
  n = k.FALSE;
  m.not = n;
  n.not = m;
  k.fromName = function(a) {
    return l[a]
  };
  k.prototype.isBinary = function() {
    return this.binary
  };
  k.prototype.toString = function() {
    return this.name
  };
  var p, m = function() {
    this.id = r[r.length - 1] += 1
  }, r = [];
  m.startNumbering = function() {
    r.push(0)
  };
  m.stopNumbering = function() {
    r.pop()
  };
  m.prototype.nodeName = "Node";
  m.prototype.toString = function(a) {
    if(a) {
      return d(this)
    }
    var b = [];
    this.visitInputs(function(a) {
      b.push(d(a))
    }, !0);
    a = d(this) + " = " + this.nodeName.toUpperCase();
    this.toStringDetails && (a += " " + this.toStringDetails());
    b.length && (a += " " + b.join(", "));
    return a
  };
  m.prototype.visitInputs = function(a, b) {
    if(!f(this)) {
      for(var d in this) {
        var e = this[d];
        if(!(e instanceof A) || b) {
          e instanceof p && a(e), e instanceof Array && e.forEach(function(d) {
            (!(d instanceof A) || b) && a(d)
          })
        }
      }
    }
  };
  m.prototype.replaceInput = function(a, b) {
    var d = 0, e;
    for(e in this) {
      var f = this[e];
      f instanceof p && f === a && (this[e] = b, d++);
      f instanceof Array && (d += f.replace(a, b))
    }
    return d
  };
  m.prototype.push = function(a) {
    void 0 === this.length && (this.length = 0);
    this[this.length++] = a
  };
  p = m;
  var v, m = function() {
    p.apply(this)
  };
  m.prototype = b(p);
  v = m;
  var s, m = function() {
    p.apply(this)
  };
  m.prototype = b(p);
  m.prototype.mustFloat = !1;
  s = m;
  var u, m = function(a) {
    v.call(this);
    this.predecessors = a ? [a] : [];
    this.phis = []
  };
  m.prototype = b(v, "Region");
  m.prototype.verify = function() {
    var a = this.predecessors;
    a.forEach(function() {
    });
    1 < a.length && this.phis.forEach(function() {
    })
  };
  u = m;
  var C, m = function() {
    u.call(this);
    this.control = this
  };
  m.prototype = b(u, "Start");
  C = m;
  var q, m = function(a, b) {
    p.call(this);
    this.control = a;
    this.arguments = b ? [b] : []
  };
  m.prototype = b(s, "Phi");
  m.prototype.pushValue = function(a) {
    this.arguments.push(a)
  };
  q = m;
  var w, m = function(a) {
    this.name = a
  };
  m.prototype = b(s, "Variable");
  w = m;
  var x = function(a, b) {
    this.to = a;
    this.from = b
  };
  x.prototype = b(s, "Move");
  x.prototype.toString = function() {
    return this.to.name + " <= " + this.from
  };
  var H, m = function(a) {
    v.call(this, a)
  };
  m.prototype = b(v, "End");
  H = m;
  m = function(a, b) {
    v.call(this);
    this.control = a;
    this.predicate = b
  };
  m.prototype = b(H, "If");
  var y, n = function(a, b) {
    v.call(this);
    this.control = a;
    this.determinant = b
  };
  n.prototype = b(H, "Switch");
  y = n;
  var t, n = function(a) {
    v.call(this);
    this.control = a
  };
  n.prototype = b(H, "Jump");
  t = n;
  n = function(a, b, d) {
    v.call(this);
    this.control = a;
    this.store = b;
    this.argument = d
  };
  n.prototype = b(H, "Stop");
  var N, L = function(a, b, d) {
    s.call(this);
    this.argument = a;
    this.type = b;
    d && (this.selector = d)
  };
  L.Type = {CASE:"case", TRUE:"true", FALSE:"false", STORE:"store", SCOPE:"scope"};
  L.prototype = b(s, "Projection");
  L.prototype.project = function() {
    return this.argument
  };
  L.prototype.toStringDetails = function() {
    return String(this.type).toUpperCase()
  };
  N = L;
  L = function(a, b, d) {
    p.call(this);
    this.condition = a;
    this.left = b;
    this.right = d
  };
  L.prototype = b(s, "Latch");
  var M, J = function(a, b, d) {
    p.call(this);
    this.operator = a;
    this.left = b;
    this.right = d
  };
  J.prototype = b(s, "Binary");
  J.prototype.toStringDetails = function() {
    return String(this.operator.name).toUpperCase()
  };
  M = J;
  var O, J = function(a, b) {
    p.call(this);
    this.operator = a;
    this.argument = b
  };
  J.prototype = b(s, "Unary");
  J.prototype.toStringDetails = function() {
    return String(this.operator.name).toUpperCase()
  };
  O = J;
  var A, J = function(a) {
    p.call(this);
    this.value = a
  };
  J.prototype = b(s, "Constant");
  A = J;
  J = function(a, b, d) {
    p.call(this);
    this.parent = a;
    this.object = b;
    this.isWith = d
  };
  J.prototype = b(s, "AVM2_Scope");
  var D, z = function(a) {
    p.call(this);
    this.control = a
  };
  z.prototype = b(s, "This");
  D = z;
  z = function(a, b) {
    p.call(this);
    this.control = a;
    this.argument = b
  };
  z.prototype = b(s, "Throw");
  var E = function(a) {
    p.call(this);
    this.control = a
  };
  E.prototype = b(s, "Arguments");
  var Q = function(a, b) {
    p.call(this);
    this.control = a;
    this.scope = b
  };
  Q.prototype = b(s, "AVM2_Global");
  var F = function(a) {
    p.call(this);
    this.name = a
  };
  F.prototype = b(s, "GlobalProperty");
  var B = function(a, b, d, e) {
    p.call(this);
    this.control = a;
    this.store = b;
    this.object = d;
    this.name = e
  };
  B.prototype = b(s, "GetProperty");
  var G = function(a, b, d, e) {
    B.call(this, a, b, d, e)
  };
  G.prototype = b(B, "AVM2_GetProperty");
  var K, I = function(a, b, d, e, f) {
    p.call(this);
    this.control = a;
    this.store = b;
    this.object = d;
    this.name = e;
    this.value = f
  };
  I.prototype = b(s, "SetProperty");
  K = I;
  I = function(a, b, d, e, f) {
    K.call(this, a, b, d, e, f)
  };
  I.prototype = b(K, "AVM2_SetProperty");
  var U = function(a, b, d, e) {
    p.call(this);
    this.control = a;
    this.store = b;
    this.object = d;
    this.index = e
  };
  U.prototype = b(s, "AVM2_GetSlot");
  var V = function(a, b, d, e, f) {
    p.call(this);
    this.control = a;
    this.store = b;
    this.object = d;
    this.index = e;
    this.value = f
  };
  V.prototype = b(s, "AVM2_SetSlot");
  var da = function(a, b, d, e, f, g) {
    p.call(this);
    this.control = a;
    this.store = b;
    this.scope = d;
    this.name = e;
    this.domain = f;
    this.strict = g
  };
  da.prototype = b(s, "AVM2_FindProperty");
  var X = function(a) {
    p.call(this);
    this.elements = a
  };
  X.prototype = b(s, "NewArray");
  var Z = function(a, b) {
    p.call(this);
    this.key = a;
    this.value = b
  };
  Z.prototype = b(s, "KeyValuePair");
  Z.prototype.mustFloat = !0;
  var wa = function(a) {
    p.call(this);
    this.properties = a
  };
  wa.prototype = b(s, "NewObject");
  var Ga = function(a) {
    p.call(this);
    this.methodInfo = a
  };
  Ga.prototype = b(s, "AVM2_NewActivation");
  var Ea = function(a, b, d) {
    p.call(this);
    this.multiname = a;
    this.namespaces = b;
    this.name = d
  };
  Ea.prototype = b(s, "AVM2_Runtime_Multiname");
  var Ha = function(a, b, d, e, f) {
    p.call(this);
    this.control = a;
    this.callee = d;
    this.object = e;
    this.store = b;
    this.arguments = f
  };
  Ha.prototype = b(s, "Call");
  var ya = function(a, b, d, e) {
    p.call(this);
    this.control = a;
    this.callee = d;
    this.store = b;
    this.arguments = e
  };
  ya.prototype = b(s, "New");
  var ha = function(a, b, d, e) {
    ya.call(this, a, b, d, e)
  };
  ha.prototype = b(ya, "AVM2_New");
  b(s, "Store");
  var Ba = new A(void 0);
  Ba.toString = function() {
    return"_"
  };
  var Ca, aa = function(a, b, d) {
    p.call(this);
    this.control = a;
    this.index = b;
    this.name = d
  };
  aa.prototype = b(s, "Parameter");
  Ca = aa;
  var xa, aa = function(a, b, d) {
    this.region = b;
    this.id = a;
    this.successors = [];
    this.predecessors = [];
    this.nodes = [b, d]
  };
  aa.prototype.pushSuccessorAt = function(a, b, d) {
    this.successors[b] = a;
    d && a.pushPredecessor(this)
  };
  aa.prototype.pushSuccessor = function(a, b) {
    this.successors.push(a);
    b && a.pushPredecessor(this)
  };
  aa.prototype.pushPredecessor = function(a) {
    this.predecessors.push(a)
  };
  aa.prototype.visitNodes = function(a) {
    this.nodes.forEach(a)
  };
  aa.prototype.visitSuccessors = function(a) {
    this.successors.forEach(a)
  };
  aa.prototype.visitPredecessors = function(a) {
    this.predecessors.forEach(a)
  };
  aa.prototype.append = function(a) {
    a.mustFloat || this.nodes.splice(this.nodes.length - 1, 0, a)
  };
  aa.prototype.toString = function() {
    return"B" + this.id + (this.name ? " (" + this.name + ")" : "")
  };
  aa.prototype.trace = function(a) {
    a.writeLn(this)
  };
  xa = aa;
  var aa = function(a) {
    this.exit = a
  }, Fa = function(a, b, d) {
    var e = [];
    a = [a];
    for(var f = a.push.bind(a);node = a.pop();) {
      e[node.id] || (e[node.id] = !0, d(node), a.push(node), b(node, f))
    }
  }, Ia = function(a, b, d) {
    function e(a) {
      f[a.id] || g.push(a)
    }
    for(var f = [], g = [a];a = g.top();) {
      f[a.id] ? (1 === f[a.id] && (f[a.id] = 2, d(a)), g.pop()) : (f[a.id] = 1, b(a, e))
    }
  };
  aa.prototype.buildCFG = function() {
    return ta.fromDFG(this)
  };
  aa.prototype.forEach = function(a, b) {
    (b ? Ia : Fa)(this.exit, function(a, b) {
      a.visitInputs(b)
    }, a)
  };
  aa.prototype.traceMetrics = function(a) {
    var b = new metrics.Counter(!0);
    Fa(this.exit, function(a, b) {
      a.visitInputs(b)
    }, function(a) {
      b.count(a.nodeName)
    });
    b.trace(a)
  };
  aa.prototype.trace = function(a) {
    function b(a) {
      return a instanceof v ? "yellow" : a instanceof q ? "purple" : a instanceof s ? "green" : "white"
    }
    function d(a) {
      return a instanceof N ? a.project() : a
    }
    function e(a) {
      a = d(a);
      g[a.id] || (g[a.id] = !0, a.block && k.push(a.block), f.push(a), a.visitInputs(e))
    }
    var f = [], g = {}, k = [];
    e(this.exit);
    a.writeLn("");
    a.enter("digraph DFG {");
    a.writeLn("graph [bgcolor = gray10];");
    a.writeLn("edge [color = white];");
    a.writeLn("node [shape = box, fontname = Consolas, fontsize = 11, color = white, fontcolor = white];");
    a.writeLn("rankdir = BT;");
    k.forEach(function(b) {
      a.enter("subgraph cluster" + b.nodes[0].id + " { bgcolor = gray20;");
      b.visitNodes(function(b) {
        b = d(b);
        a.writeLn("N" + b.id + ";")
      });
      a.leave("}")
    });
    f.forEach(function(d) {
      a.writeLn("N" + d.id + ' [label = "' + d.toString() + '", color = "' + b(d) + '"];')
    });
    f.forEach(function(e) {
      e.visitInputs(function(f) {
        f = d(f);
        a.writeLn("N" + e.id + " -> N" + f.id + " [color=" + b(f) + "];")
      })
    });
    a.leave("}");
    a.writeLn("")
  };
  var ta, $ = function() {
    this.nextBlockID = 0;
    this.blocks = [];
    this.exit;
    this.root
  };
  $.fromDFG = function(a) {
    function b(a) {
      a instanceof N && (a = a.project());
      if(!e[a.id]) {
        e[a.id] = !0;
        var f = a.control;
        f instanceof u || (f = a.control = new u(f));
        a = f.block = d.buildBlock(f, a);
        f instanceof C && (d.root = a);
        for(var g = 0;g < f.predecessors.length;g++) {
          var k = f.predecessors[g], l, m = !1;
          k instanceof N ? (l = k.project(), m = k.type === N.Type.TRUE) : l = k;
          l instanceof u && (l = new t(k), l = new N(l, N.Type.TRUE), f.predecessors[g] = l, l = l.project(), m = !0);
          b(l);
          var n = l.control.block;
          l instanceof y ? n.pushSuccessorAt(a, k.selector.value, !0) : m && 0 < n.successors.length ? (n.pushSuccessor(a, !0), n.hasFlippedSuccessors = !0) : n.pushSuccessor(a, !0)
        }
      }
    }
    var d = new ta;
    d.dfg = a;
    var e = [];
    b(a.exit);
    d.splitCriticalEdges();
    d.exit = a.exit.control.block;
    d.computeDominators(!0);
    return d
  };
  $.prototype.buildRootAndExit = function() {
    0 < this.blocks[0].predecessors.length ? (this.root = new xa(this.nextBlockID++), this.blocks.push(this.root), this.root.pushSuccessor(this.blocks[0], !0)) : this.root = this.blocks[0];
    for(var a = [], b = 0;b < this.blocks.length;b++) {
      var d = this.blocks[b];
      0 === d.successors.length && a.push(d)
    }
    if(0 === a.length) {
      unexpected("Must have an exit block.")
    }else {
      if(1 === a.length && a[0] !== this.root) {
        this.exit = a[0]
      }else {
        this.exit = new xa(this.nextBlockID++);
        this.blocks.push(this.exit);
        for(b = 0;b < a.length;b++) {
          a[b].pushSuccessor(this.exit, !0)
        }
      }
    }
  };
  $.prototype.fromString = function(a, b) {
    function d(a) {
      var b = f[a];
      if(b) {
        return b
      }
      f[a] = b = new xa(e.nextBlockID++);
      b.name = a;
      g.push(b);
      return b
    }
    var e = this, f = e.blockNames || (e.blockNames = {}), g = e.blocks;
    a.replace(/\ /g, "").split(",").forEach(function(a) {
      a = a.split("->");
      for(var b = null, e = 0;e < a.length;e++) {
        var f = a[e];
        if(b) {
          var g = f;
          d(b).pushSuccessor(d(g), !0)
        }else {
          d(f)
        }
        b = f
      }
    });
    this.root = f[b]
  };
  $.prototype.buildBlock = function(a, b) {
    var d = new xa(this.nextBlockID++, a, b);
    this.blocks.push(d);
    return d
  };
  $.prototype.createBlockSet = function() {
    this.setConstructor || (this.setConstructor = BitSetFunctor(this.blocks.length));
    return new this.setConstructor
  };
  $.prototype.computeReversePostOrder = function() {
    if(this.order) {
      return this.order
    }
    var a = this.order = [];
    this.depthFirstSearch(null, a.push.bind(a));
    a.reverse();
    for(var b = 0;b < a.length;b++) {
      a[b].rpo = b
    }
    return a
  };
  $.prototype.depthFirstSearch = function(a, b) {
    function d(f) {
      e.set(f.id);
      a && a(f);
      for(var g = f.successors, k = 0, l = g.length;k < l;k++) {
        var m = g[k];
        e.get(m.id) || d(m)
      }
      b && b(f)
    }
    var e = this.createBlockSet();
    d(this.root)
  };
  $.prototype.computeDominators = function(a) {
    for(var b = new Int32Array(this.blocks.length), d = 0;d < b.length;d++) {
      b[d] = -1
    }
    var e = this.createBlockSet();
    this.depthFirstSearch(function(a) {
      for(var d = a.successors, f = 0, g = d.length;f < g;f++) {
        var k = d[f].id, l = a.id, m = b, n = k;
        if(!(0 > b[k])) {
          k = b[k];
          for(e.clearAll();0 <= k;) {
            e.set(k), k = b[k]
          }
          for(;0 <= l && !e.get(l);) {
            l = b[l]
          }
        }
        m[n] = l
      }
    });
    if(a) {
      d = 0;
      for(a = this.blocks.length;d < a;d++) {
        this.blocks[d].dominator = this.blocks[b[d]]
      }
      var f = function(a) {
        var b;
        if(void 0 !== a.dominatorDepth) {
          return a.dominatorDepth
        }
        b = a.dominator ? f(a.dominator) + 1 : 0;
        return a.dominatorDepth = b
      }, d = 0;
      for(a = this.blocks.length;d < a;d++) {
        f(this.blocks[d])
      }
    }
    return b
  };
  $.prototype.computeLoops = function() {
    function a(f) {
      if(d.get(f.id)) {
        return b.get(f.id) && !f.isLoopHeader && (f.isLoopHeader = !0, f.loops = 1 << e, e += 1), f.loops
      }
      d.set(f.id);
      b.set(f.id);
      for(var g = 0, k = 0, l = f.successors.length;k < l;k++) {
        g |= a(f.successors[k])
      }
      f.isLoopHeader && (g &= ~f.loops);
      f.loops = g;
      b.clear(f.id);
      return g
    }
    var b = this.createBlockSet(), d = this.createBlockSet(), e = 0;
    a(this.root)
  };
  $.prototype.computeUses = function() {
    var a = g && new IndentingWriter;
    g && a.enter("> Compute Uses");
    var b = [];
    this.dfg.forEach(function(a) {
      a.visitInputs(function(d) {
        var e = b[d.id];
        e || (e = b[d.id] = {def:d, uses:[]});
        e.uses.pushUnique(a)
      })
    });
    g && (a.enter("> Uses"), b.forEach(function(b) {
      a.writeLn(b.def.id + " -> [" + b.uses.map(e).join(", ") + "] " + b.def)
    }), a.leave("<"), a.leave("<"));
    return b
  };
  $.prototype.verify = function() {
    var a = g && new IndentingWriter;
    g && a.enter("> Verify");
    this.computeReversePostOrder().forEach(function(a) {
      a.phis && a.phis.forEach(function() {
      })
    });
    g && a.leave("<")
  };
  $.prototype.optimizePhis = function() {
    function a(b, d) {
      d = d.unique();
      if(1 === d.length) {
        return d[0]
      }
      if(2 === d.length) {
        if(d[0] === b) {
          return d[1]
        }
        if(d[1] === b) {
          return d[0]
        }
      }
      return b
    }
    var b = g && new IndentingWriter;
    g && b.enter("> Optimize Phis");
    var d = [], f = this.computeUses();
    f.forEach(function(a) {
      a.def instanceof q && d.push(a.def)
    });
    g && b.writeLn("Trying to optimize " + d.length + " phis.");
    for(var k = 0, l = 0, m = !0;m;) {
      l++, m = !1, d.forEach(function(d) {
        var l = a(d, d.arguments), n;
        if(n = l !== d) {
          if(g && b.writeLn("Update " + d + " with " + l), n = f[d.id], 0 === n.uses.length) {
            n = !1
          }else {
            g && b.writeLn("Replacing: " + d.id + " in [" + n.uses.map(e).join(", ") + "] with " + l.id);
            var p = 0;
            n.uses.forEach(function(a) {
              p += a.replaceInput(d, l)
            });
            n.uses = [];
            n = !0
          }
        }
        n && (m = !0, k++)
      })
    }
    g && (b.writeLn("Simplified " + k + " phis, in " + l + " iterations."), b.leave("<"))
  };
  $.prototype.splitCriticalEdges = function() {
    var a = g && new IndentingWriter, b = this.blocks, d = [];
    g && a.enter("> Splitting Critical Edges");
    for(var e = 0;e < b.length;e++) {
      var f = b[e].successors;
      if(1 < f.length) {
        for(var k = 0;k < f.length;k++) {
          1 < f[k].predecessors.length && d.push({from:b[e], to:f[k]})
        }
      }
    }
    if((b = d.length) && g) {
      a.writeLn("Splitting: " + b), this.trace(a)
    }
    for(var l;l = d.pop();) {
      e = l.from.successors.indexOf(l.to);
      f = l.to.predecessors.indexOf(l.from);
      g && a.writeLn("Splitting critical edge: " + l.from + " -> " + l.to);
      var k = l.to, m = k.region, n = new u(m.predecessors[f]), p = new t(n), n = this.buildBlock(n, p);
      m.predecessors[f] = new N(p, N.Type.TRUE);
      l = l.from;
      l.successors[e] = n;
      n.pushPredecessor(l);
      n.pushSuccessor(k);
      k.predecessors[f] = n
    }
    b && g && this.trace(a);
    g && a.leave("<");
    return b
  };
  $.prototype.allocateVariables = function() {
    function a(d) {
      if(!(d instanceof N && (!N.Type.STORE || d.type === N.Type.STORE)) && !(d instanceof K) && d instanceof s) {
        d.variable = new w("l" + d.id), g && b.writeLn("Allocated: " + d.variable + " to " + d)
      }
    }
    var b = g && new IndentingWriter;
    g && b.enter("> Allocating Virtual Registers");
    var d = this.computeReversePostOrder();
    d.forEach(function(b) {
      b.nodes.forEach(a);
      b.phis && b.phis.forEach(a)
    });
    for(var e = [], f = 0;f < d.length;f++) {
      var k = d[f], l = k.phis, k = k.predecessors;
      if(l) {
        for(var m = 0;m < l.length;m++) {
          var n = l[m];
          g && b.writeLn("Emitting moves for: " + n);
          arguments = n.arguments;
          for(var p = 0;p < k.length;p++) {
            var q = k[p], r = arguments[p];
            if(!r.abstract && !(r instanceof N && (!N.Type.STORE || r.type === N.Type.STORE))) {
              q = e[q.id] || (e[q.id] = []), r = r.variable || r, n.variable !== r && q.push(new x(n.variable, r))
            }
          }
        }
      }
    }
    var C = this.blocks;
    e.forEach(function(a, d) {
      var e = C[d], f = 0;
      for(g && b.writeLn(e + " Moves: " + a);a.length;) {
        for(var k = 0;k < a.length;k++) {
          for(var l = a[k], m = 0;m < a.length;m++) {
            if(k !== m && a[m].from === l.to) {
              l = null;
              break
            }
          }
          l && (a.splice(k--, 1), e.append(l))
        }
        if(a.length) {
          g && b.writeLn("Breaking Cycle");
          l = a[0];
          m = new w("t" + f++);
          C[d].append(new x(m, l.to));
          for(k = 1;k < a.length;k++) {
            a[k].from === l.to && (a[k].from = m)
          }
        }
      }
    });
    g && b.leave("<")
  };
  $.prototype.scheduleEarly = function() {
    function a(b) {
      return b.mustNotFloat || b.shouldNotFloat ? !1 : b.mustFloat || b.shouldFloat || b instanceof Ca || b instanceof D ? !0 : b instanceof M || b instanceof O || b instanceof Ca
    }
    function b(d) {
      m[d.id] = !0;
      a(d) || d.control.block.append(d)
    }
    function d(a, e) {
      g && k.writeLn("Scheduled: " + a + " in " + e);
      a.control = e;
      b(a)
    }
    function f(a) {
      g && k.enter("> Schedule: " + a);
      var n = [];
      a.visitInputs(function(a) {
        a instanceof s && n.push(a instanceof N ? a.project() : a)
      });
      g && k.writeLn("Inputs: [" + n.map(e) + "], length: " + n.length);
      for(var p = 0;p < n.length;p++) {
        var r = n[p];
        !(r instanceof q) && !m[r.id] && f(r)
      }
      if(a.control) {
        a instanceof H || (a instanceof q || a instanceof C || m[a.id]) || b(a)
      }else {
        if(n.length) {
          r = n[0].control;
          for(p = 1;p < n.length;p++) {
            var t = n[p].control;
            r.block.dominatorDepth < t.block.dominatorDepth && (r = t)
          }
          d(a, r)
        }else {
          d(a, l.root.region)
        }
      }
      g && k.leave("<")
    }
    var g = !1, k = g && new IndentingWriter;
    g && k.enter("> Schedule Early");
    var l = this, m = [], n = [];
    this.dfg.forEach(function(b) {
      b instanceof u || b instanceof t || (b.control && n.push(b), b instanceof q && b.arguments.forEach(function(b) {
        a(b) && (b.mustNotFloat = !0)
      }))
    }, !0);
    g && n.forEach(function(a) {
      print("Root: " + a)
    });
    n.forEach(function(a) {
      if(a instanceof q) {
        var b = a.control.block;
        (b.phis || (b.phis = [])).push(a)
      }
      a.control && f(a)
    });
    g && k.leave("<");
    n.forEach(function(a) {
      a instanceof N && a.project()
    })
  };
  $.prototype.trace = function(a) {
    function b(a) {
      d[a.id] || (d[a.id] = !0, e.push(a), a.visitSuccessors(b))
    }
    var d = [], e = [], f = this.root, g = this.exit;
    b(f);
    a.writeLn("");
    a.enter("digraph CFG {");
    a.writeLn("graph [bgcolor = gray10];");
    a.writeLn("edge [fontname = Consolas, fontsize = 11, color = white, fontcolor = white];");
    a.writeLn("node [shape = box, fontname = Consolas, fontsize = 11, color = white, fontcolor = white, style = filled];");
    a.writeLn("rankdir = TB;");
    e.forEach(function(b) {
      var d = "";
      void 0 !== b.name && (d += " " + b.name);
      void 0 !== b.rpo && (d += " O: " + b.rpo);
      a.writeLn("B" + b.id + ' [label = "B' + b.id + d + '", fillcolor = "black", shape=' + (b === f ? "house" : b === g ? "invhouse" : "box") + ", style=filled];")
    });
    e.forEach(function(b) {
      b.visitSuccessors(function(d) {
        a.writeLn("B" + b.id + " -> B" + d.id)
      });
      b.dominator && a.writeLn("B" + b.id + " -> B" + b.dominator.id + " [color = orange];");
      b.follow && a.writeLn("B" + b.id + " -> B" + b.follow.id + " [color = purple];")
    });
    a.leave("}");
    a.writeLn("")
  };
  ta = $;
  var $ = function() {
  }, za = function(a, b) {
    if(f(a.argument)) {
      return new A(a.operator.evaluate(a.argument.value))
    }
    if(b) {
      var d = ka(a.argument, !0);
      if(a.operator === k.TRUE) {
        return d
      }
      if(d instanceof O) {
        if(a.operator === k.FALSE && d.operator === k.FALSE) {
          return d.argument
        }
      }else {
        return new O(a.operator, d)
      }
    }
    return a
  }, ka = function(a, b) {
    return a instanceof O ? za(a, b) : a instanceof M ? f(a.left) && f(a.right) ? new A(a.operator.evaluate(a.left.value, a.right.value)) : a : a
  };
  $.prototype.tryFold = ka;
  a.isConstant = f;
  a.Block = xa;
  a.Node = p;
  a.Start = C;
  a.Undefined = Ba;
  a.This = D;
  a.Throw = z;
  a.Arguments = E;
  a.AVM2Global = Q;
  a.Projection = N;
  a.Region = u;
  a.Latch = L;
  a.Binary = M;
  a.Unary = O;
  a.Constant = A;
  a.AVM2FindProperty = da;
  a.GlobalProperty = F;
  a.GetProperty = B;
  a.SetProperty = K;
  a.AVM2GetProperty = G;
  a.AVM2SetProperty = I;
  a.AVM2GetSlot = U;
  a.AVM2SetSlot = V;
  a.Call = Ha;
  a.AVM2New = ha;
  a.Phi = q;
  a.Stop = n;
  a.If = m;
  a.Switch = y;
  a.End = H;
  a.Jump = t;
  a.AVM2Scope = J;
  a.Operator = k;
  a.Variable = w;
  a.Move = x;
  a.Parameter = Ca;
  a.NewArray = X;
  a.NewObject = wa;
  a.AVM2NewActivation = Ga;
  a.KeyValuePair = Z;
  a.AVM2RuntimeMultiname = Ea;
  a.DFG = aa;
  a.CFG = ta;
  a.PeepholeOptimizer = $
})("undefined" === typeof exports ? IR = {} : exports);
var c4Options = systemOptions.register(new OptionSet("C4 Options")), enableC4 = c4Options.register(new Option("c4", "c4", "boolean", !1, "Enable the C4 compiler.")), c4TraceLevel = c4Options.register(new Option("tc4", "tc4", "number", 0, "Compiler Trace Level"));
(function(a) {
  function b(a) {
    return a instanceof u && a.value instanceof Multiname
  }
  function d(a) {
    return a instanceof u && isNumeric(a.value) ? !0 : a.ty && a.ty.isNumeric()
  }
  function e(a) {
    return new u(a)
  }
  function f(a, b, d) {
    d = d.split(".");
    for(var f = 0;f < d.length;f++) {
      b = new IR.GetProperty(null, a, b, e(d[f])), b.shouldFloat = !0
    }
    return b
  }
  function g(a) {
    a = new IR.GlobalProperty(a);
    a.mustFloat = !0;
    return a
  }
  var k = IR.Node, l = IR.Start, m = IR.Undefined, n = IR.This, p = IR.Projection, r = IR.Region, v = IR.Binary, s = IR.Unary, u = IR.Constant, C = IR.Call, q = IR.Phi, w = IR.Stop, x = IR.Operator, H = IR.Parameter, y = IR.NewArray, t = IR.NewObject, N = IR.KeyValuePair, L = IR.isConstant, M = IR.DFG, J = new IndentingWriter, O, A = function(a) {
    this.id = Q += 1;
    this.index = a;
    this.local = [];
    this.stack = [];
    this.scope = [];
    this.saved = this.store = m
  }, D = function(a, b, d) {
    a = b instanceof q && b.control === a ? b : new q(a, b);
    a.pushValue(d);
    return a
  }, z = function(a, b, d) {
    for(var e = 0;e < b.length;e++) {
      b[e] = D(a, b[e], d[e])
    }
  }, E = function(a) {
    return a instanceof k ? a.toString(!0) : a
  }, Q = 0;
  A.prototype.clone = function(a) {
    var b = new O;
    b.index = void 0 !== a ? a : this.index;
    b.local = this.local.slice(0);
    b.stack = this.stack.slice(0);
    b.scope = this.scope.slice(0);
    b.saved = this.saved;
    b.store = this.store;
    return b
  };
  A.prototype.matches = function(a) {
    return this.stack.length === a.stack.length && this.scope.length === a.scope.length && this.local.length === a.local.length
  };
  A.prototype.makePhis = function(a) {
    function b(d) {
      return new q(a, d)
    }
    var d = new O;
    d.index = this.index;
    d.local = this.local.map(b);
    d.stack = this.stack.map(b);
    d.scope = this.scope.map(b);
    d.saved = this.saved;
    d.store = b(this.store);
    return d
  };
  A.prototype.merge = function(a, b) {
    z(a, this.local, b.local);
    z(a, this.stack, b.stack);
    z(a, this.scope, b.scope);
    this.store = D(a, this.store, b.store);
    this.store.abstract = !0
  };
  A.prototype.trace = function(a) {
    a.writeLn(this.toString())
  };
  A.prototype.toString = function() {
    return"<" + String(this.id + " @ " + this.index).padRight(" ", 10) + (" M: " + E(this.store)).padRight(" ", 14) + (" X: " + E(this.saved)).padRight(" ", 14) + (" $: " + this.scope.map(E).join(", ")).padRight(" ", 20) + (" L: " + this.local.map(E).join(", ")).padRight(" ", 40) + (" S: " + this.stack.map(E).join(", ")).padRight(" ", 60)
  };
  O = A;
  var F = function(a, b, d, e) {
    this.abc = a;
    this.scope = d;
    this.methodInfo = b;
    this.hasDynamicScope = e;
    this.peepholeOptimizer = new IR.PeepholeOptimizer
  };
  F.prototype.buildStart = function() {
    var a = this.methodInfo, b = new l, d = b.entryState = new O(0);
    d.local.push(new n(b));
    for(var k = this.hasDynamicScope ? 1 : 0, q = a.parameters.length, r = 0;r < q;r++) {
      d.local.push(new H(b, k + r, PARAMETER_PREFIX + a.parameters[r].name))
    }
    for(r = q;r < a.localCount;r++) {
      d.local.push(m)
    }
    d.store = new p(b, p.Type.STORE);
    b.scope = this.hasDynamicScope ? new H(b, 0, SAVED_SCOPE_NAME) : new u(this.scope);
    d.saved = new p(b, p.Type.SCOPE);
    b.domain = new u(this.domain);
    r = new IR.Arguments(b);
    if(a.needsRest() || a.needsArguments()) {
      var s = e(k + (a.needsRest() ? q : 0));
      d.local[q + 1] = new C(b, d.store, g("sliceArguments"), null, [r, s])
    }
    s = f(d.store, r, "length");
    for(r = 0;r < q;r++) {
      var t = a.parameters[r], v = r + 1, w = d.local[v];
      if(void 0 !== t.value) {
        var y = new IR.Binary(x.LT, s, e(k + r + 1)), w = new IR.Latch(y, e(t.value), w)
      }
      t.type && !t.type.isAnyName() && ((y = this.coercers[t.type.name]) ? w = y(w) : (t = this.abc.domain.getProperty(t.type, !0, !1)) && (w = new C(b, d.store, g("coerce"), null, [w, e(t)])));
      d.local[v] = w
    }
    return b
  };
  F.prototype.build = function() {
    function a(b, d) {
      var e = new s(b, d);
      Q && (e = Q.tryFold(e));
      return e
    }
    function k(a, b, d) {
      a = new v(a, b, d);
      Q && (a = Q.tryFold(a));
      return a
    }
    function l(a) {
      return k(x.OR, a, e(0))
    }
    function n(a) {
      return k(x.URSH, a, e(0))
    }
    function U(b) {
      return a(x.PLUS, b)
    }
    function A(b) {
      return a(x.FALSE, a(x.FALSE, b))
    }
    function D(a) {
      return k(x.ADD, e(""), a)
    }
    function H(q, r, s) {
      function v(a) {
        if(void 0 !== a) {
          if(a < ua.length) {
            return ua[ua.length - 1 - a]
          }
          if(a === ua.length) {
            return s.saved
          }
          var b = s.saved;
          a -= ua.length;
          for(var d = 0;d < a;d++) {
            b = Y(b, "parent")
          }
          return b
        }
        return 0 < ua.length ? ua.top() : s.saved
      }
      function w(a) {
        T.ti && !a.ty && (a.ty = T.ti.type);
        sa.push(a)
      }
      function M(a) {
        a.shouldFloat = !0;
        return a
      }
      function z() {
        return sa.pop()
      }
      function F(a) {
        var b = ra, d = z();
        d.shouldNotFloat = !0;
        b[a] = d
      }
      function X(a) {
        a = Fa[a];
        if(a.isRuntime()) {
          var b = new u(a.namespaces), e = new u(a.name);
          if(a.isRuntimeName() && (e = z(), d(e))) {
            return e
          }
          a.isRuntimeNamespace() && (b = z());
          return new IR.AVM2RuntimeMultiname(new u(a), b, e)
        }
        return new u(a)
      }
      function Z(a) {
        return b(a) && Multiname.isQName(a.value) ? e(Multiname.getQualifiedName(a.value)) : a
      }
      function wa(a, b, d) {
        a = new IR.AVM2FindProperty(q, s.store, v(), a, Ia, b);
        if(d) {
          if(d.object) {
            return d.object instanceof Global && !d.object.isExecuted() ? a : e(d.object)
          }
          if(void 0 !== d.scopeDepth) {
            return ea(v(d.scopeDepth))
          }
        }
        return a
      }
      function Y(a, b) {
        return f(s.store, a, b)
      }
      function ea(a) {
        return a instanceof IR.AVM2Scope ? a.object : Y(a, "object")
      }
      function ga(a, b, f, g) {
        b = Z(b);
        if(f) {
          var k = f.trait ? Multiname.getQualifiedName(f.trait.name) : f.propertyQName;
          if(k) {
            return g && (f.trait && f.trait.isMethod()) && !(f.trait.holder instanceof InstanceInfo && f.trait.holder.isInterface()) ? (k = VM_OPEN_METHOD_PREFIX + k, M(new IR.GetProperty(q, s.store, a, e(k)))) : new IR.GetProperty(q, s.store, a, e(k))
          }
        }
        if(d(b) || b instanceof u && isString(b.value)) {
          f = M(new IR.GetProperty(q, s.store, a, b));
          if(!d(b)) {
            return f
          }
          b = M(ca(Y(a, "indexGet"), a, [b]));
          return M(new IR.Latch(Y(a, "indexGet"), b, f))
        }
        return new IR.AVM2GetProperty(q, s.store, a, b)
      }
      function qa(a) {
        s.store = new p(a, p.Type.STORE);
        return a
      }
      function ca(a, b, d) {
        return qa(new C(q, s.store, a, b, d))
      }
      function fa(b) {
        var d;
        b.isBinary() && (d = z());
        var e = z();
        b = d ? k(b, e, d) : a(b, e);
        Q && (b = Q.tryFold(b, !0));
        return b
      }
      function Ka(b) {
        b = a(x.FALSE, fa(b));
        Q && (b = Q.tryFold(b, !0));
        return b
      }
      function ba(b, d) {
        var e, f;
        b.isBinary() ? (f = z(), e = z(), d && (f = l(f), e = l(e)), w(k(b, e, f))) : (e = z(), d && (e = l(e)), w(a(b, e)))
      }
      function la(a) {
        a = new IR.If(q, a);
        va = [{control:new p(a, p.Type.FALSE), target:E[T.position + 1], state:s}, {control:new p(a, p.Type.TRUE), target:T.target, state:s}]
      }
      var ma = r.entryState;
      if(ma) {
        $ && J.writeLn("Type State: " + ma);
        for(var S = 0;S < ma.local.length;S++) {
          var R = ma.local[S], ra = s.local[S];
          ra.ty || (ra.ty = R)
        }
      }
      var ra = s.local, sa = s.stack, ua = s.scope, P, va = null;
      $ && (J.writeLn("Processing Region: " + q + ", Block: " + r.bid), J.enter(("> state: " + q.entryState.toString()).padRight(" ", 100)));
      q.processed = !0;
      var T, ma = r.position;
      for(r = r.end.position;ma <= r;ma++) {
        T = E[ma];
        var ja = T.op;
        s.index = ma;
        switch(ja) {
          case 3:
            qa(new IR.Throw(q, z()));
            ka.push({region:q, store:s.store, value:m});
            va = [];
            break;
          case 98:
            w(ra[T.index]);
            break;
          case 208:
          ;
          case 209:
          ;
          case 210:
          ;
          case 211:
            w(ra[ja - 208]);
            break;
          case 99:
            F(T.index);
            break;
          case 212:
          ;
          case 213:
          ;
          case 214:
          ;
          case 215:
            F(ja - 212);
            break;
          case 28:
            ua.push(new IR.AVM2Scope(v(), z(), !0));
            break;
          case 48:
            ua.push(new IR.AVM2Scope(v(), z(), !1));
            break;
          case 29:
            ua.pop();
            break;
          case 100:
            w(new IR.AVM2Global(null, v()));
            break;
          case 101:
            w(ea(s.scope[T.index]));
            break;
          case 93:
            w(wa(X(T.index), !0, T.ti));
            break;
          case 94:
            w(wa(X(T.index), !1, T.ti));
            break;
          case 102:
            S = X(T.index);
            R = z();
            w(ga(R, S, T.ti));
            break;
          case 96:
            S = X(T.index);
            w(ga(wa(S, !0, T.ti), S));
            break;
          case 104:
          ;
          case 97:
            P = z();
            S = X(T.index);
            R = z();
            a: {
              var oa = P;
              P = T.ti;
              S = Z(S);
              if(d(S) || S instanceof u && isString(S.value)) {
                P = new IR.SetProperty(q, s.store, R, S, oa), d(S) ? (oa = ca(Y(R, "indexSet"), R, [S, oa]), S = IR.Latch, R = Y(R, "indexSet"), oa.mustFloat = !0, P.mustFloat = !0, qa(new S(R, oa, P))) : qa(P)
              }else {
                if(P && (P = P.trait ? Multiname.getQualifiedName(P.trait.name) : P.propertyQName)) {
                  qa(new IR.SetProperty(q, s.store, R, e(P), oa));
                  break a
                }
                qa(new IR.AVM2SetProperty(q, s.store, R, S, oa))
              }
            }
            break;
          case 106:
            S = X(T.index);
            R = z();
            w(ca(g("deleteProperty"), null, [R, S]));
            break;
          case 108:
            R = z();
            a: {
              P = R;
              R = e(T.index);
              if(S = T.ti) {
                if(S = S.trait) {
                  if(S.isConst()) {
                    P = e(S.value);
                    break a
                  }
                  R = Multiname.getQualifiedName(S.name);
                  P = new IR.GetProperty(q, s.store, P, e(R));
                  break a
                }
              }
              P = new IR.AVM2GetSlot(null, s.store, P, R)
            }
            w(P);
            break;
          case 109:
            P = z();
            R = z();
            a: {
              S = e(T.index);
              if(oa = T.ti) {
                if(oa = oa.trait) {
                  S = Multiname.getQualifiedName(oa.name);
                  qa(new IR.SetProperty(q, s.store, R, e(S), P));
                  break a
                }
              }
              qa(new IR.AVM2SetSlot(q, s.store, R, S, P))
            }
            break;
          case 4:
            S = X(T.index);
            R = z();
            w(ca(g("getSuper"), null, [s.saved, R, S]));
            break;
          case 5:
            P = z();
            S = X(T.index);
            R = z();
            qa(ca(g("setSuper"), null, [s.saved, R, S, P]));
            break;
          case 241:
          ;
          case 240:
            break;
          case 64:
            S = Y(ta, "createFunction");
            w(ca(S, ta, [e(aa[T.index]), v(), e(!0)]));
            break;
          case 65:
            P = sa.popMany(T.argCount);
            R = z();
            S = z();
            w(ca(S, R, P));
            break;
          case 70:
          ;
          case 76:
          ;
          case 79:
            P = sa.popMany(T.argCount);
            S = X(T.index);
            R = z();
            S = ga(R, S, T.ti, !0);
            P = 70 === ja || 79 === ja ? ca(S, R, P) : ca(S, null, P);
            79 !== ja && w(P);
            break;
          case 69:
          ;
          case 78:
            S = X(T.index);
            P = sa.popMany(T.argCount);
            R = z();
            S = ca(g("getSuper"), null, [s.saved, R, S]);
            P = ca(S, R, P);
            78 !== ja && w(P);
            break;
          case 66:
            P = sa.popMany(T.argCount);
            R = z();
            w(qa(new IR.AVM2New(q, s.store, R, P)));
            break;
          case 73:
            P = sa.popMany(T.argCount);
            R = z();
            if(!T.ti || !T.ti.noCallSuperNeeded) {
              S = Y(s.saved, "object.baseClass.instanceNoInitialize"), w(ca(S, R, P))
            }
            break;
          case 74:
            P = sa.popMany(T.argCount);
            S = X(T.index);
            R = z();
            S = ga(R, S, T.ti);
            w(qa(new IR.AVM2New(q, s.store, S, P)));
            break;
          case 128:
            if(T.ti && T.ti.noCoercionNeeded) {
              Counter.count("Compiler: NoCoercionNeeded");
              break
            }else {
              Counter.count("Compiler: CoercionNeeded")
            }
            P = z();
            S = X(T.index);
            a: {
              R = S;
              if(b(R) && (S = Ia.value.getProperty(R.value, !0, !0))) {
                R = e(S);
                break a
              }
              R = ga(wa(R, !0), R)
            }
            a: {
              if(L(P) && L(R)) {
                P = e(coerce(P.value, R.value))
              }else {
                if(L(R) && (S = za[R.name])) {
                  P = S(P);
                  break a
                }
                P = ca(g("coerce"), null, [P, R])
              }
            }
            w(P);
            break;
          case 131:
          ;
          case 115:
            w(l(z()));
            break;
          case 136:
          ;
          case 116:
            w(n(z()));
            break;
          case 132:
          ;
          case 117:
            P = z();
            P = U(P);
            w(P);
            break;
          case 129:
          ;
          case 118:
            w(A(z()));
            break;
          case 130:
            break;
          case 133:
            P = z();
            P = ca(g("coerceString"), null, [P]);
            w(P);
            break;
          case 112:
            w(D(z()));
            break;
          case 135:
            R = z();
            P = z();
            w(ca(g("asInstance"), null, [P, R]));
            break;
          case 72:
          ;
          case 71:
            P = 72 === ja ? z() : m;
            ka.push({region:q, store:s.store, value:P});
            va = [];
            break;
          case 30:
          ;
          case 35:
            P = z();
            R = z();
            w(ca(g(30 === ja ? "nextName" : "nextValue"), null, [R, P]));
            break;
          case 50:
            P = ca(g("hasNext2"), null, [ra[T.object], ra[T.index]]);
            ra[T.object] = Y(P, "object");
            w(ra[T.index] = Y(P, "index"));
            break;
          case 32:
            w(e(null));
            break;
          case 33:
            w(m);
            break;
          case 34:
            notImplemented();
            break;
          case 36:
            w(e(T.value));
            break;
          case 37:
            w(e(T.value));
            break;
          case 44:
            w(e(Ca[T.index]));
            break;
          case 45:
            w(e(ya[T.index]));
            break;
          case 46:
            w(e(ha[T.index]));
            break;
          case 47:
            w(e(Ba[T.index]));
            break;
          case 38:
            w(e(!0));
            break;
          case 39:
            w(e(!1));
            break;
          case 40:
            w(e(NaN));
            break;
          case 41:
            z();
            break;
          case 42:
            P = z();
            P.shouldNotFloat = !0;
            w(P);
            w(P);
            break;
          case 43:
            s.stack.push(z(), z());
            break;
          case 239:
          ;
          case 240:
          ;
          case 241:
            break;
          case 12:
            la(Ka(x.LT));
            break;
          case 24:
            la(fa(x.GE));
            break;
          case 13:
            la(Ka(x.LE));
            break;
          case 23:
            la(fa(x.GT));
            break;
          case 14:
            la(Ka(x.GT));
            break;
          case 22:
            la(fa(x.LE));
            break;
          case 15:
            la(Ka(x.GE));
            break;
          case 21:
            la(fa(x.LT));
            break;
          case 16:
            va = [{control:q, target:T.target, state:s}];
            break;
          case 17:
            la(fa(x.TRUE));
            break;
          case 18:
            la(fa(x.FALSE));
            break;
          case 19:
            la(fa(x.EQ));
            break;
          case 20:
            la(fa(x.NE));
            break;
          case 25:
            la(fa(x.SEQ));
            break;
          case 26:
            la(fa(x.SNE));
            break;
          case 27:
            P = z();
            if(2 < T.targets.length) {
              va = [];
              P = new IR.Switch(q, P);
              for(R = 0;R < T.targets.length;R++) {
                va.push({control:new p(P, p.Type.CASE, e(R)), target:T.targets[R], state:s})
              }
            }else {
              P = k(x.SEQ, P, e(0)), P = new IR.If(q, P), va = [{control:new p(P, p.Type.FALSE), target:T.targets[1], state:s}, {control:new p(P, p.Type.TRUE), target:T.targets[0], state:s}]
            }
            break;
          case 150:
            ba(x.FALSE);
            break;
          case 151:
            ba(x.BITWISE_NOT);
            break;
          case 160:
            ba(x.ADD);
            break;
          case 197:
            ba(x.ADD, !0);
            break;
          case 161:
            ba(x.SUB);
            break;
          case 198:
            ba(x.SUB, !0);
            break;
          case 162:
            ba(x.MUL);
            break;
          case 199:
            ba(x.MUL, !0);
            break;
          case 163:
            ba(x.DIV);
            break;
          case 164:
            ba(x.MOD);
            break;
          case 165:
            ba(x.LSH);
            break;
          case 166:
            ba(x.RSH);
            break;
          case 167:
            ba(x.URSH);
            break;
          case 168:
            ba(x.AND);
            break;
          case 169:
            ba(x.OR);
            break;
          case 170:
            ba(x.XOR);
            break;
          case 171:
            ba(x.EQ);
            break;
          case 172:
            ba(x.SEQ);
            break;
          case 173:
            ba(x.LT);
            break;
          case 174:
            ba(x.LE);
            break;
          case 175:
            ba(x.GT);
            break;
          case 176:
            ba(x.GE);
            break;
          case 144:
            ba(x.NEG);
            break;
          case 196:
            ba(x.NEG, !0);
            break;
          case 145:
          ;
          case 192:
          ;
          case 147:
          ;
          case 193:
            w(e(1));
            145 === ja || 147 === ja ? w(U(z())) : w(l(z()));
            145 === ja || 192 === ja ? ba(x.ADD) : ba(x.SUB);
            break;
          case 146:
          ;
          case 194:
          ;
          case 148:
          ;
          case 195:
            w(e(1));
            146 === ja || 148 === ja ? w(U(ra[T.index])) : w(l(ra[T.index]));
            146 === ja || 194 === ja ? ba(x.ADD) : ba(x.SUB);
            F(T.index);
            break;
          case 177:
            R = z();
            P = z();
            w(ca(Y(R, "isInstanceOf"), null, [P]));
            break;
          case 178:
            P = z();
            S = X(T.index);
            R = ga(wa(S, !1), S);
            w(ca(g("isInstance"), null, [P, R]));
            break;
          case 179:
            R = z();
            P = z();
            w(ca(g("isInstance"), null, [P, R]));
            break;
          case 180:
            R = z();
            P = sa.pop();
            S = k(x.ADD, e("public$"), P);
            w(ca(g("hasProperty"), null, [R, S]));
            break;
          case 149:
            w(ca(g("typeOf"), null, [z()]));
            break;
          case 8:
            w(m);
            F(T.index);
            break;
          case 83:
            P = sa.popMany(T.argCount);
            R = z();
            S = Y(ta, "applyType");
            w(ca(S, ta, [R, new y(P)]));
            break;
          case 86:
            P = sa.popMany(T.argCount);
            w(new y(P));
            break;
          case 85:
            R = [];
            for(S = 0;S < T.argCount;S++) {
              P = z(), oa = z(), oa = e(Multiname.getPublicQualifiedName(oa.value)), R.unshift(new N(oa, P))
            }
            w(new t(R));
            break;
          case 87:
            w(new IR.AVM2NewActivation(e(O)));
            break;
          case 88:
            S = Y(ta, "createClass");
            w(ca(S, ta, [e(xa[T.index]), z(), v()]));
            break;
          default:
            unexpected("Not Implemented: " + T)
        }
        239 === ja || (241 === ja || 240 === ja) || $ && J.writeLn(("state: " + s.toString()).padRight(" ", 100) + " : " + ma + ", " + T.toString(this.abc))
      }
      $ && J.leave(("< state: " + s.toString()).padRight(" ", 100));
      va || (va = [], T.position + 1 <= E.length && va.push({control:q, target:E[T.position + 1], state:s}));
      return va
    }
    for(var z = this.methodInfo.analysis, F = z.blocks, E = z.bytecodes, O = this.methodInfo, Q = this.peepholeOptimizer, ya = this.abc.constantPool.ints, ha = this.abc.constantPool.uints, Ba = this.abc.constantPool.doubles, Ca = this.abc.constantPool.strings, aa = this.abc.methods, xa = this.abc.classes, Fa = this.abc.constantPool.multinames, Ia = new u(this.abc.domain), ta = new u(this.abc.runtime), $ = 2 < c4TraceLevel.value, za = this.coercers = {"int":l, uint:n, Number:U, Boolean:A, String:D}, 
    ka = [], z = 0;z < F.length;z++) {
      F[z].blockDominatorOrder = z
    }
    var ga = new SortedList(function(a, b) {
      return a.block.blockDominatorOrder - b.block.blockDominatorOrder
    }), z = this.buildStart();
    for(ga.push({region:z, block:F[0]});F = ga.pop();) {
      H(F.region, F.block, F.region.entryState.clone()).forEach(function(a) {
        var b = a.target, d = b.region;
        d ? ($ && J.enter("Merging into region: " + d + " @ " + b.position + ", block " + b.bid + " {"), $ && J.writeLn("  R " + d.entryState), $ && J.writeLn("+ I " + a.state), d.entryState.merge(d, a.state), d.predecessors.push(a.control), $ && J.writeLn("  = " + d.entryState), $ && J.leave("}")) : (d = b.region = new r(a.control), b.loop && $ && J.writeLn("Adding PHIs to loop region."), d.entryState = b.loop ? a.state.makePhis(d) : a.state.clone(b.position), $ && J.writeLn("Adding new region: " + 
        d + " @ " + b.position + " to worklist."), ga.push({region:d, block:b}))
      }), $ && J.enter("Worklist: {"), ga.forEach(function(a) {
        $ && J.writeLn(a.region + " " + a.block.bdo + " " + a.region.entryState)
      }), $ && J.leave("}")
    }
    $ && J.writeLn("Done");
    if(1 < ka.length) {
      var fa = new r, La = new q(fa), Ma = new q(fa);
      ka.forEach(function(a) {
        fa.predecessors.push(a.region);
        La.pushValue(a.value);
        Ma.pushValue(a.store)
      });
      F = new w(fa, Ma, La)
    }else {
      F = new w(ka[0].region, ka[0].store, ka[0].value)
    }
    return new M(F)
  };
  a.build = function(a, b, d, e, f) {
    release || !0;
    release || !0;
    release || !0;
    Counter.count("Compiler: Compiled Methods");
    Timer.start("Compiler");
    d.analysis.markLoops();
    enableVerifier.value && (Timer.start("ver"), b.verifyMethod(d, e), Timer.stop());
    b = 0 < c4TraceLevel.value;
    var g = 1 < c4TraceLevel.value;
    Timer.start("IR Builder");
    k.startNumbering();
    a = (new F(a, d, e, f)).build();
    Timer.stop();
    g && a.trace(J);
    Timer.start("IR CFG");
    a = a.buildCFG();
    Timer.stop();
    Timer.start("IR OPTIMIZE PHIs");
    a.optimizePhis();
    Timer.stop();
    Timer.start("IR SCHEDULE");
    a.scheduleEarly();
    Timer.stop();
    g && a.trace(J);
    a.verify();
    Timer.start("IR ALLOCATE VARIABLES");
    a.allocateVariables();
    Timer.stop();
    g = Backend.generate(a);
    b && J.writeLn(g);
    k.stopNumbering();
    Timer.stop();
    return g
  }
})("undefined" === typeof exports ? Builder = {} : exports);
var C4Compiler = function() {
  function a(a) {
    this.abc = a;
    this.verifier = new Verifier(a)
  }
  a.prototype.compileMethod = function(a, d, e, f) {
    return Builder.build(this.abc, this.verifier, a, e, f)
  };
  return a
}();
(function(a) {
  var b, d = function(a) {
    this.kind = 1;
    this.body = a
  }, e = function(a) {
    this.kind = 2;
    this.body = a
  }, f = function(a, b, d, e) {
    this.kind = 3;
    this.cond = a;
    this.then = b;
    this.else = d;
    this.negated = !1;
    this.nothingThrownLabel = e
  }, g = function(a, b) {
    this.kind = 4;
    this.index = a;
    this.body = b
  }, k = function(a, b, d) {
    this.kind = 5;
    this.determinant = a;
    this.cases = b;
    this.nothingThrownLabel = d
  }, l = function(a, b) {
    this.kind = 6;
    this.labels = a;
    this.body = b
  }, m = function(a) {
    for(var b = {}, d = 0, e = a.length;d < e;d++) {
      var f = a[d];
      f.labels || print(f.toSource());
      for(var g = 0, k = f.labels.length;g < k;g++) {
        b[f.labels[g]] = f
      }
    }
    this.kind = 7;
    this.cases = a;
    this.labelMap = b
  }, n = function(a) {
    this.kind = 8;
    this.label = a
  }, p = function(a, b) {
    this.kind = 9;
    this.label = a;
    this.head = b
  }, r = function(a, b) {
    this.kind = 10;
    this.label = a;
    this.head = b;
    this.necessary = !0
  }, v = function(a, b) {
    this.kind = 11;
    this.body = a;
    this.catches = b
  }, s = function(a, b, d) {
    this.kind = 12;
    this.varName = a;
    this.typeName = b;
    this.body = d
  };
  d.prototype = {trace:function(a) {
    for(var b = this.body, d = 0, e = b.length;d < e;d++) {
      b[d].trace(a)
    }
  }, first:function() {
    return this.body[0]
  }, slice:function(a, b) {
    return new d(this.body.slice(a, b))
  }};
  e.prototype = {trace:function(a) {
    a.enter("loop {");
    this.body.trace(a);
    a.leave("}")
  }};
  f.prototype = {trace:function(a) {
    this.cond.trace(a);
    this.nothingThrownLabel && a.enter("if (label is " + this.nothingThrownLabel + ") {");
    a.enter("if" + (this.negated ? " not" : "") + " {");
    this.then && this.then.trace(a);
    this.else && (a.outdent(), a.enter("} else {"), this.else.trace(a));
    a.leave("}");
    this.nothingThrownLabel && a.leave("}")
  }};
  g.prototype = {trace:function(a) {
    0 <= this.index ? a.writeLn("case " + this.index + ":") : a.writeLn("default:");
    a.indent();
    this.body && this.body.trace(a);
    a.outdent()
  }};
  k.prototype = {trace:function(a) {
    this.nothingThrownLabel && a.enter("if (label is " + this.nothingThrownLabel + ") {");
    this.determinant.trace(a);
    a.writeLn("switch {");
    for(var b = 0, d = this.cases.length;b < d;b++) {
      this.cases[b].trace(a)
    }
    a.writeLn("}");
    this.nothingThrownLabel && a.leave("}")
  }};
  l.prototype = {trace:function(a) {
    a.enter("if (label is " + this.labels.join(" or ") + ") {");
    this.body && this.body.trace(a);
    a.leave("}")
  }};
  m.prototype = {trace:function(a) {
    for(var b = 0, d = this.cases.length;b < d;b++) {
      this.cases[b].trace(a)
    }
  }};
  n.prototype = {trace:function(a) {
    a.writeLn("label = " + this.label)
  }};
  p.prototype = {trace:function(a) {
    this.label && a.writeLn("label = " + this.label);
    a.writeLn("break")
  }};
  r.prototype = {trace:function(a) {
    this.label && a.writeLn("label = " + this.label);
    this.necessary && a.writeLn("continue")
  }};
  v.prototype = {trace:function(a) {
    a.enter("try {");
    this.body.trace(a);
    a.writeLn("label = " + this.nothingThrownLabel);
    for(var b = 0, d = this.catches.length;b < d;b++) {
      this.catches[b].trace(a)
    }
    a.leave("}")
  }};
  s.prototype = {trace:function(a) {
    a.outdent();
    a.enter("} catch (" + (this.varName || "e") + (this.typeName ? " : " + this.typeName : "") + ") {");
    this.body.trace(a)
  }};
  b = {SEQ:1, LOOP:2, IF:3, CASE:4, SWITCH:5, LABEL_CASE:6, LABEL_SWITCH:7, EXIT:8, BREAK:9, CONTINUE:10, TRY:11, CATCH:12, Seq:d, Loop:e, If:f, Case:g, Switch:k, LabelCase:l, LabelSwitch:m, Exit:n, Break:p, Continue:r, Try:v, Catch:s};
  var u = function(a, b) {
    this.options = b || {};
    var d = a.blocks, e = BitSetFunctor(a.blocks.length), f = e.ADDRESS_BITS_PER_WORD, g = e.BITS_PER_WORD, k = e.BIT_INDEX_MASK;
    e.singleton = function(a) {
      var b = new e;
      b.set(a.id);
      b.count = 1;
      b.dirty = 0;
      return b
    };
    e.fromBlocks = function(a) {
      var b = new e;
      b.setBlocks(a);
      return b
    };
    var l = e.prototype;
    e.singleword ? (l.forEachBlock = function(a) {
      release || !0;
      var b = this.bits;
      if(b) {
        for(var e = 0;e < g;e++) {
          b & 1 << e && a(d[e])
        }
      }
    }, l.choose = function() {
      var a = this.bits;
      if(a) {
        for(var b = 0;b < g;b++) {
          if(a & 1 << b) {
            return d[b]
          }
        }
      }
    }, l.members = function() {
      var a = [], b = this.bits;
      if(b) {
        for(var e = 0;e < g;e++) {
          b & 1 << e && a.push(d[e])
        }
      }
      return a
    }, l.setBlocks = function(a) {
      for(var b = this.bits, d = 0, e = a.length;d < e;d++) {
        b |= 1 << (a[d].id & k)
      }
      this.bits = b
    }) : (l.forEachBlock = function(a) {
      release || !0;
      for(var b = this.bits, e = 0, f = b.length;e < f;e++) {
        var k = b[e];
        if(k) {
          for(var l = 0;l < g;l++) {
            k & 1 << l && a(d[e * g + l])
          }
        }
      }
    }, l.choose = function() {
      for(var a = this.bits, b = 0, e = a.length;b < e;b++) {
        var f = a[b];
        if(f) {
          for(var k = 0;k < g;k++) {
            if(f & 1 << k) {
              return d[b * g + k]
            }
          }
        }
      }
    }, l.members = function() {
      for(var a = [], b = this.bits, e = 0, f = b.length;e < f;e++) {
        var k = b[e];
        if(k) {
          for(var l = 0;l < g;l++) {
            k & 1 << l && a.push(d[e * g + l])
          }
        }
      }
      return a
    }, l.setBlocks = function(a) {
      for(var b = this.bits, d = 0, e = a.length;d < e;d++) {
        var g = a[d].id;
        b[g >> f] |= 1 << (g & k)
      }
    });
    this.BlockSet = e;
    this.hasExceptions = !1;
    this.normalizeReachableBlocks(a.root)
  }, e = function(a, b, d) {
    return function(e, f, g) {
      function k(a) {
        return g + a.id
      }
      function l(a) {
        a.fn = a.fn.bind(m)
      }
      var m = this;
      g = g || "";
      var n = this.bytecodes;
      n && (a.forEach(l), b.forEach(l), writeGraphViz(e, f.toString(), n[0], k, function(a) {
        return a.successors || []
      }, a, b, function(a) {
        return"Block: " + a.id + "\\l"
      }, d && d.bind(this, k)))
    }
  };
  u.prototype = {normalizeReachableBlocks:function(a) {
    release || !0;
    var b = this.BlockSet, d = [], e = {}, f = {}, g = [a];
    for(f[a.id] = !0;a = g.top();) {
      if(e[a.id]) {
        1 === e[a.id] && (e[a.id] = 2, d.push(a)), f[a.id] = !1, g.pop()
      }else {
        e[a.id] = 1;
        f[a.id] = !0;
        for(var k = a.successors, l = 0, m = k.length;l < m;l++) {
          var n = k[l];
          f[n.id] && (a.spbacks || (a.spbacks = new b), a.spbacks.set(n.id));
          !e[n.id] && g.push(n)
        }
      }
    }
    this.blocks = d.reverse()
  }, computeDominance:function() {
    var a = this.blocks, b = a.length, d = Array(b);
    d[0] = 0;
    for(var e = [], f = 0;f < b;f++) {
      e[a[f].id] = f, a[f].dominatees = []
    }
    for(var g = !0;g;) {
      g = !1;
      for(f = 1;f < b;f++) {
        var k = a[f].predecessors, l = k.length, m = e[k[0].id];
        if(!(m in d)) {
          for(var n = 1;n < l && !(m = e[k[n].id], m in d);n++) {
          }
        }
        release || !0;
        for(n = 0;n < l;n++) {
          var p = e[k[n].id];
          if(p !== m && p in d) {
            for(;p !== m;) {
              for(;p > m;) {
                p = d[p]
              }
              for(;m > p;) {
                m = d[m]
              }
            }
            m = p
          }
        }
        d[f] !== m && (d[f] = m, g = !0)
      }
    }
    a[0].dominator = a[0];
    for(f = 1;f < b;f++) {
      e = a[f], l = a[d[f]], e.dominator = l, l.dominatees.push(e), e.npredecessors = e.predecessors.length
    }
    b = [a[0]];
    for(a[0].level || (a[0].level = 0);e = b.shift();) {
      a = e.dominatees;
      n = 0;
      for(l = a.length;n < l;n++) {
        a[n].level = e.level + 1
      }
      b.push.apply(b, a)
    }
  }, computeFrontiers:function() {
    for(var a = this.BlockSet, b = this.blocks, d = 0, e = b.length;d < e;d++) {
      b[d].frontier = new a
    }
    d = 1;
    for(e = b.length;d < e;d++) {
      var a = b[d], f = a.predecessors;
      if(2 <= f.length) {
        for(var g = a.dominator, k = 0, l = f.length;k < l;k++) {
          for(var m = f[k];m !== g;) {
            m.frontier.set(a.id), m = m.dominator
          }
        }
      }
    }
  }, analyzeControlFlow:function() {
    this.computeDominance();
    return this.analyzedControlFlow = !0
  }, markLoops:function() {
    function a(d, e) {
      var f = new b;
      f.setBlocks(d);
      f.recount();
      this.id = e;
      this.body = f;
      this.exit = new b;
      this.save = {};
      this.head = new b;
      this.npredecessors = 0
    }
    if(!this.analyzedControlFlow && !this.analyzeControlFlow()) {
      return!1
    }
    var b = this.BlockSet, d;
    d = this.blocks;
    for(var e = new b, f = 0, g = d.length;f < g;f++) {
      var k = d[f], l = k.spbacks;
      if(l) {
        for(var k = k.successors, m = 0, n = k.length;m < n;m++) {
          var p = k[m];
          l.get(p.id) && e.set(p.dominator.id)
        }
      }
    }
    d = e.members();
    if(0 >= d.length) {
      return this.markedLoops = !0
    }
    d = d.sort(function(a, b) {
      return a.level - b.level
    });
    e = 0;
    for(f = d.length - 1;0 <= f;f--) {
      for(var g = d[f], l = 1, k = {}, m = {}, n = [], p = [], r = [], s = g.level + 1, v = [g], u = void 0, E = void 0, u = void 0;u = v.top();) {
        if(k[u.id]) {
          if(p.peek() === u) {
            p.pop();
            var Q = [];
            do {
              E = n.pop(), m[E.id] = !0, Q.push(E)
            }while(E !== u);
            (1 < Q.length || E.spbacks && E.spbacks.get(E.id)) && r.push(Q)
          }
          v.pop()
        }else {
          k[u.id] = l++;
          n.push(u);
          p.push(u);
          for(var E = u.successors, Q = 0, F = E.length;Q < F;Q++) {
            if(u = E[Q], !(u.level < s)) {
              var B = u.id;
              if(k[B]) {
                if(!m[B]) {
                  for(;k[p.peek().id] > k[B];) {
                    p.pop()
                  }
                }
              }else {
                v.push(u)
              }
            }
          }
        }
      }
      l = r;
      if(0 !== l.length) {
        k = 0;
        for(m = l.length;k < m;k++) {
          n = l[k];
          p = new a(n, e++);
          r = 0;
          for(s = n.length;r < s;r++) {
            if(v = n[r], v.level === g.level + 1 && !v.loop) {
              v.loop = p;
              p.head.set(v.id);
              u = v.predecessors;
              E = 0;
              for(Q = u.length;E < Q;E++) {
                p.body.get(u[E].id) && v.npredecessors--
              }
              p.npredecessors += v.npredecessors
            }
          }
          r = 0;
          for(s = n.length;r < s;r++) {
            v = n[r], v.level === g.level + 1 && (v.npredecessors = p.npredecessors)
          }
          p.head.recount()
        }
      }
    }
    return this.markedLoops = !0
  }, induceControlTree:function() {
    function a(b, d) {
      b.recount();
      if(0 === b.count) {
        return null
      }
      b.save = d;
      return b
    }
    function d(k, l, m, n, p, r, s) {
      for(var v = [];k;) {
        if(1 < k.count) {
          for(var u = new f, z = {}, E = [], Q = k.members(), F = 0, B = Q.length;F < B;F++) {
            var G = Q[F], K = G.id, I;
            if(G.loop && k.contains(G.loop.head)) {
              var U = G.loop;
              if(!U.induced) {
                for(var V = U.head.members(), da = 0, X = 0, Z = V.length;X < Z;X++) {
                  da += k.save[V[X].id]
                }
                if(0 < G.npredecessors - da) {
                  G.npredecessors -= k.save[K], G.save = k.save[K], I = d(G, u, z, n), E.push(new b.LabelCase([K], I))
                }else {
                  X = 0;
                  for(Z = V.length;X < Z;X++) {
                    I = V[X], I.npredecessors -= da, I.save = da
                  }
                  I = d(G, u, z, n);
                  E.push(new b.LabelCase(U.head.toArray(), I));
                  U.induced = !0
                }
              }
            }else {
              G.npredecessors -= k.save[K], G.save = k.save[K], I = d(G, u, z, n), E.push(new b.LabelCase([K], I))
            }
          }
          for(var G = [], X = 0, F = 0, B = E.length;F < B;F++) {
            I = E[F];
            Z = I.labels;
            U = V = 0;
            for(da = Z.length;U < da;U++) {
              K = Z[U], u.get(K) && 0 < Q[F].npredecessors - k.save[K] ? G.push(K) : Z[V++] = K
            }
            Z.length = V;
            0 < Z.length && (E[X++] = I)
          }
          E.length = X;
          if(0 === E.length) {
            F = 0;
            for(B = G.length;F < B;F++) {
              K = G[F], m[K] = (m[K] || 0) + k.save[K], l.set(K)
            }
            break
          }
          v.push(new b.LabelSwitch(E));
          k = a(u, z)
        }else {
          1 === k.count ? (G = k.choose(), K = G.id, G.npredecessors -= k.save[K], G.save = k.save[K]) : (G = k, K = G.id);
          if(p) {
            p = !1
          }else {
            if(n && !n.body.get(K)) {
              G.npredecessors += G.save;
              n.exit.set(K);
              n.save[K] = (n.save[K] || 0) + G.save;
              v.push(new b.Break(K, n));
              break
            }
            if(n && G.loop === n) {
              G.npredecessors += G.save;
              v.push(new b.Continue(K, n));
              break
            }
            if(G === s) {
              break
            }
            if(0 < G.npredecessors) {
              G.npredecessors += G.save;
              m[K] = (m[K] || 0) + G.save;
              l.set(K);
              v.push(r ? new b.Break(K, r) : new b.Exit(K));
              break
            }
            if(G.loop) {
              var Z = G.loop;
              if(1 === Z.head.count) {
                u = d(Z.head.choose(), null, null, Z, !0)
              }else {
                u = [];
                V = Z.head.members();
                F = 0;
                for(B = V.length;F < B;F++) {
                  I = V[F], z = I.id, I = d(I, null, null, Z, !0), u.push(new b.LabelCase([z], I))
                }
                u = new b.LabelSwitch(u)
              }
              v.push(new b.Loop(u));
              k = a(Z.exit, Z.save);
              continue
            }
          }
          u = new f;
          z = {};
          if(e && G.hasCatches) {
            I = G.successors;
            E = [];
            k = [];
            F = 0;
            for(B = I.length;F < B;F++) {
              Q = I[F], (Q.exception ? E : k).push(Q)
            }
            X = [];
            F = 0;
            for(B = E.length;F < B;F++) {
              Q = E[F], Q.npredecessors -= 1, Q.save = 1, I = d(Q, u, z, n), Q = Q.exception, X.push(new b.Catch(Q.varName, Q.typeName, I))
            }
            B = new b.Try(G, X)
          }else {
            k = G.successors, B = G
          }
          if(2 < k.length) {
            E = [];
            for(F = k.length - 1;0 <= F;F--) {
              Q = k[F], Q.npredecessors -= 1, Q.save = 1, I = d(Q, u, z, n, null, G, k[F + 1]), E.unshift(new b.Case(F, I))
            }
            E.top().index = void 0;
            e && G.hasCatches ? (B.nothingThrownLabel = g, B = new b.Switch(B, E, g++)) : B = new b.Switch(B, E);
            k = a(u, z)
          }else {
            2 === k.length ? (F = G.hasFlippedSuccessors ? k[1] : k[0], I = G.hasFlippedSuccessors ? k[0] : k[1], F.npredecessors -= 1, F.save = 1, F = d(F, u, z, n), I.npredecessors -= 1, I.save = 1, I = d(I, u, z, n), e && G.hasCatches ? (B.nothingThrownLabel = g, B = new b.If(B, F, I, g++)) : B = new b.If(B, F, I), k = a(u, z)) : (I = k[0]) ? e && G.hasCatches ? (B.nothingThrownLabel = I.id, z[I.id] = (z[I.id] || 0) + 1, u.set(I.id), k = a(u, z)) : (I.npredecessors -= 1, I.save = 1, k = I) : e && 
            G.hasCatches ? (B.nothingThrownLabel = -1, k = a(u, z)) : k = I
          }
          v.push(B)
        }
      }
      return 1 < v.length ? new b.Seq(v) : v[0]
    }
    var e = this.hasExceptions, f = this.BlockSet, g = this.blocks.length;
    this.controlTree = d(this.blocks[0], new f, {})
  }, massageControlTree:function() {
    function a(d, e, f, g) {
      switch(d.kind) {
        case b.SEQ:
          for(var k = d.body, l = k.length - 1;0 <= l;l--) {
            k[l] = a(k[l], k[l + 1] || e, f, g)
          }
          for(var m = 0, l = 0, n = k.length;l < n;l++) {
            k[l] && (k[m++] = k[l])
          }
          return(k.length = m) ? d : null;
        case b.LOOP:
          return d.body = a(d.body, null, d.body, e), d;
        case b.IF:
          return d.then = a(d.then, e, f, g), d.else = a(d.else, e, f, g), d.then || (d.then = d.else, d.else = null, d.negated = !0), d.then ? d : null;
        case b.SWITCH:
          for(var p = d.cases, l = 0, n = p.length;l < n;l++) {
            var r = p[l];
            r.body && (r.body = a(r.body, e, f, e))
          }
          return d;
        case b.LABEL_SWITCH:
          for(var s = d.labelMap, p = d.cases, l = m = 0, n = p.length;l < n;l++) {
            if(r = p[l], k = a(r.body, e, f, g)) {
              r.body = k, p[m++] = r
            }else {
              for(var k = r.labels, r = 0, v = k.length;r < v;r++) {
                delete s[k[r]]
              }
            }
          }
          return(p.length = m) ? d : null;
        case b.EXIT:
          return e && e.kind === b.LABEL_SWITCH ? (d.label in e.labelMap || (d.label = 0), d) : null;
        case b.BREAK:
          return g && g.kind === b.LABEL_SWITCH ? d.label in g.labelMap || (d.label = 0) : delete d.label, d;
        case b.CONTINUE:
          return f && f.kind === b.LABEL_SWITCH ? d.label in f.labelMap || (d.label = 0) : delete d.label, d.necessary = !!e, d.necessary || d.label ? d : null;
        default:
          return d
      }
    }
    this.controlTree = a(this.controlTree)
  }, restructureControlFlow:function() {
    Timer.start("restructureControlFlow");
    if(!this.markedLoops && !this.markLoops()) {
      return Timer.stop(), !1
    }
    this.induceControlTree();
    this.options.massage && this.massageControlTree();
    this.restructuredControlFlow = !0;
    Timer.stop();
    return!0
  }, trace:function(a) {
    function b(a) {
      return a.id
    }
    var d = this.bytecodes;
    a.enter("analysis {");
    a.enter("cfg {");
    this.blocks.forEach(function(e) {
      e.dominator ? (a.enter("block " + e.id + (0 < e.successors.length ? " -> " + e.successors.map(b).join(",") : "") + " {"), a.writeLn("npredecessors".padRight(" ", 10) + e.npredecessors), a.writeLn("idom".padRight(" ", 10) + e.dominator.id), a.writeLn("domcs".padRight(" ", 10) + e.dominatees.map(b).join(",")), e.frontier && a.writeLn("frontier".padRight(" ", 10) + "{" + e.frontier.toArray().join(",") + "}"), a.writeLn("level".padRight(" ", 10) + e.level)) : a.enter("block unreachable {");
      e.loop && (a.writeLn("loop".padRight(" ", 10) + "{" + e.loop.body.toArray().join(",") + "}"), a.writeLn("  id".padRight(" ", 10) + e.loop.id), a.writeLn("  head".padRight(" ", 10) + "{" + e.loop.head.toArray().join(",") + "}"), a.writeLn("  exit".padRight(" ", 10) + "{" + e.loop.exit.toArray().join(",") + "}"), a.writeLn("  npredecessors".padRight(" ", 10) + e.loop.npredecessors));
      a.writeLn("");
      if(0 <= e.position) {
        for(var f = e.position;f <= e.end.position;f++) {
          a.writeLn(("" + f).padRight(" ", 5) + d[f])
        }
      }else {
        a.writeLn("abstract")
      }
      a.leave("}")
    });
    a.leave("}");
    this.controlTree && (a.enter("control-tree {"), this.controlTree.trace(a), a.leave("}"));
    a.leave("}")
  }, traceCFG:e([{fn:function(a) {
    return a.successors || []
  }, style:""}], [{fn:function(a) {
    return a.predecessors || []
  }, style:""}]), traceDJ:e([{fn:function(a) {
    return a.dominatees || []
  }, style:"style=dashed"}, {fn:function(a) {
    var b = new this.BlockSet;
    b.setBlocks(a.successors);
    b.subtract(this.BlockSet.fromBlocks(a.dominatees));
    a.spbacks && b.subtract(a.spbacks);
    return b.members()
  }, style:""}, {fn:function(a) {
    return a.spbacks ? a.spbacks.members() : []
  }, style:"style=bold"}], [{fn:function(a) {
    return a.predecessors || []
  }, style:""}], function(a, b) {
    for(var d = this.bytecodes[0], e = [d], f = d.level, g = [];d = e.shift();) {
      f != d.level && (b.writeLn("{rank=same; " + g.map(function(b) {
        return"block_" + a(b)
      }).join(" ") + "}"), g.length = 0, f = d.level), g.push(d), e.push.apply(e, d.dominatees)
    }
  })};
  a.Control = b;
  a.analyze = function(a) {
    a = new u(a, {massage:!0});
    a.restructureControlFlow();
    return a.controlTree
  }
})("undefined" === typeof exports ? Looper = {} : exports);
(function() {
  function a(a) {
    if("string" === typeof a || null === a || !0 === a || !1 === a) {
      return new n(a)
    }
    if(void 0 === a) {
      return new p("undefined")
    }
    if("object" === typeof a || "function" === typeof a) {
      return new p(objectConstantName(a))
    }
    if("number" === typeof a && isNaN(a)) {
      return new p("NaN")
    }
    if(Infinity === a) {
      return new p("Infinity")
    }
    if(-Infinity === a) {
      return new N("-", new p("Infinity"))
    }
    if("number" === typeof a && 0 > 1 / a) {
      return new N("-", new n(Math.abs(a)))
    }
    if("number" === typeof a) {
      return new n(a)
    }
    unexpected("Cannot emit constant for value: " + a)
  }
  function b(a) {
    return new p(a)
  }
  function d(a) {
    if(!("$" === a[0] || "_" === a[0] || "\\" === a[0] || "a" <= a[0] && "z" >= a[0] || "A" <= a[0] && "Z" >= a[0])) {
      return!1
    }
    for(var b = 1;b < a.length;b++) {
      if(!("$" === a[b] || "_" === a[b] || "\\" === a[b] || "a" <= a[b] && "z" >= a[b] || "A" <= a[b] && "Z" >= a[b] || "0" <= a[b] && "9" >= a[b])) {
        return!1
      }
    }
    return!0
  }
  function e(a) {
    Array.prototype.slice.call(arguments, 1).forEach(function(b) {
      a = "string" === typeof b ? d(b) ? new s(a, new p(b), !1) : new s(a, new n(b), !0) : b instanceof n && d(b.value) ? new s(a, new p(b.value), !1) : new s(a, b, !0)
    });
    return a
  }
  function f(a, b) {
    b.forEach(function() {
    });
    return new C(a, b)
  }
  function g(a, b) {
    return new q(a, "=", b)
  }
  function k() {
    this.label = new I("$L");
    this.variables = [];
    this.parameters = []
  }
  function l(a, d, e) {
    return e || !a.variable ? a.compile(d) : b(a.variable.name)
  }
  var m = estransform, n = m.Literal, p = m.Identifier, r = m.VariableDeclaration, v = m.VariableDeclarator, s = m.MemberExpression, u = m.BinaryExpression, C = m.CallExpression, q = m.AssignmentExpression, w = m.ExpressionStatement, x = m.ReturnStatement, H = m.ConditionalExpression, y = m.ObjectExpression, t = m.ArrayExpression, N = m.UnaryExpression, L = m.NewExpression, M = m.Property, J = m.BlockStatement, O = m.ThisExpression, A = m.ThrowStatement, D = m.IfStatement, z = m.WhileStatement, E = 
  m.BreakStatement, Q = m.ContinueStatement, F = m.SwitchStatement, B = m.SwitchCase, m = IR.Block, G = IR.Operator, K = Looper.Control, I = IR.Variable;
  K.Break.prototype.compile = function(a, b) {
    return a.compileBreak(this, b)
  };
  K.Continue.prototype.compile = function(a, b) {
    return a.compileContinue(this, b)
  };
  K.Exit.prototype.compile = function(a, b) {
    return a.compileExit(this, b)
  };
  K.LabelSwitch.prototype.compile = function(a, b) {
    return a.compileLabelSwitch(this, b)
  };
  K.Seq.prototype.compile = function(a, b) {
    return a.compileSequence(this, b)
  };
  m.prototype.compile = function(a, b) {
    return a.compileBlock(this, b)
  };
  K.Loop.prototype.compile = function(a, b) {
    return a.compileLoop(this, b)
  };
  K.Switch.prototype.compile = function(a, b) {
    return a.compileSwitch(this, b)
  };
  K.If.prototype.compile = function(a, b) {
    return a.compileIf(this, b)
  };
  K.Try.prototype.compile = function(a, b) {
    return a.compileTry(this, b)
  };
  k.prototype.useVariable = function(a) {
    return this.variables.pushUnique(a)
  };
  k.prototype.useParameter = function(a) {
    return this.parameters[a.index] = a
  };
  k.prototype.compileLabelBody = function(a) {
    var d = [];
    a.label && (this.useVariable(this.label), d.push(new w(g(b(this.label.name), new n(a.label)))));
    return d
  };
  k.prototype.compileBreak = function(a) {
    a = this.compileLabelBody(a);
    a.push(new E(null));
    return new J(a)
  };
  k.prototype.compileContinue = function(a) {
    a = this.compileLabelBody(a);
    a.push(new Q(null));
    return new J(a)
  };
  k.prototype.compileExit = function(a) {
    return new J(this.compileLabelBody(a))
  };
  k.prototype.compileIf = function(b) {
    var d = b.cond.compile(this), e = null, f = null;
    b.then && (e = b.then.compile(this));
    b.else && (f = b.else.compile(this));
    var g = l(d.end.predicate, this);
    if(b.negated) {
      a: {
        b = g;
        if(b instanceof Constant) {
          if(!0 === b.value || !1 === b.value) {
            b = a(!b.value);
            break a
          }
        }else {
          if(b instanceof p) {
            b = new N(G.FALSE.name, b);
            break a
          }
        }
        release || !0;
        var g = b instanceof u ? b.left : b.argument, k = b.right, m = G.fromName(b.operator);
        b = m === G.EQ && k instanceof n && !1 === k.value || m === G.FALSE ? g : m.not ? b instanceof u ? new u(m.not.name, g, k) : new N(m.not.name, g) : new N(G.FALSE.name, b)
      }
    }else {
      b = g
    }
    d.body.push(new D(b, e || new J([]), f || null));
    return d
  };
  k.prototype.compileSwitch = function(a) {
    var b = a.determinant.compile(this), d = [];
    a.cases.forEach(function(a) {
      var b;
      a.body && (b = a.body.compile(this));
      a = "number" === typeof a.index ? new n(a.index) : void 0;
      d.push(new B(a, b ? [b] : []))
    }, this);
    a = l(b.end.determinant, this);
    b.body.push(new F(a, d, !1));
    return b
  };
  k.prototype.compileLabelSwitch = function(a) {
    function d(a) {
      release || !0;
      return new u("===", f, new n(a))
    }
    for(var e = null, f = b(this.label.name), g = a.cases.length - 1;0 <= g;g--) {
      for(var k = a.cases[g], l = k.labels, m = d(l[0]), p = 1;p < l.length;p++) {
        m = new u("||", m, d(l[p]))
      }
      e = new D(m, k.body ? k.body.compile(this) : new J, e)
    }
    return e
  };
  k.prototype.compileLoop = function(b) {
    b = b.body.compile(this);
    return new z(a(!0), b)
  };
  k.prototype.compileSequence = function(a) {
    var b = this, d = [];
    a.body.forEach(function(a) {
      a = a.compile(b);
      a instanceof J ? d = d.concat(a.body) : d.push(a)
    });
    return new J(d)
  };
  k.prototype.compileBlock = function(a) {
    for(var d = [], e = 1;e < a.nodes.length - 1;e++) {
      var f = a.nodes[e], k;
      f instanceof IR.Throw ? k = l(f, this, !0) : (f instanceof IR.Move ? (k = b(f.to.name), this.useVariable(f.to), f = l(f.from, this)) : (f.variable ? (k = b(f.variable.name), this.useVariable(f.variable)) : k = null, f = l(f, this, !0)), k = k ? new w(g(k, f)) : new w(f));
      d.push(k)
    }
    e = a.nodes.last();
    e instanceof IR.Stop && d.push(new x(l(e.argument, this)));
    d = new J(d);
    d.end = a.nodes.last();
    return d
  };
  IR.Parameter.prototype.compile = function(a) {
    a.useParameter(this);
    return b(this.name)
  };
  IR.Constant.prototype.compile = function() {
    return a(this.value)
  };
  IR.Variable.prototype.compile = function() {
    return b(this.name)
  };
  IR.Phi.prototype.compile = function(a) {
    return l(this.variable, a)
  };
  IR.AVM2Scope.prototype.compile = function(a) {
    var d = l(this.parent, a);
    a = l(this.object, a);
    var e = new n(this.isWith);
    return new L(b("Scope"), [d, a, e])
  };
  IR.AVM2FindProperty.prototype.compile = function(a) {
    var b = l(this.scope, a), d = l(this.name, a);
    a = l(this.domain, a);
    var g = new n(this.strict);
    return f(e(b, "findProperty"), [d, a, g])
  };
  IR.AVM2GetProperty.prototype.compile = function(a) {
    var d = l(this.object, a);
    a = l(this.name, a);
    return f(b("getProperty"), [d, a])
  };
  IR.Latch.prototype.compile = function(a) {
    return new H(l(this.condition, a), l(this.left, a), l(this.right, a))
  };
  IR.Unary.prototype.compile = function(a) {
    return new N(this.operator.name, l(this.argument, a))
  };
  IR.Binary.prototype.compile = function(a) {
    return new u(this.operator.name, l(this.left, a), l(this.right, a))
  };
  IR.Call.prototype.compile = function(a) {
    var b = this.arguments.map(function(b) {
      return l(b, a)
    }), d = l(this.callee, a), g;
    g = this.object ? l(this.object, a) : new n(null);
    return f(e(d, "call"), [g].concat(b))
  };
  IR.AVM2New.prototype.compile = function(a) {
    var b = this.arguments.map(function(b) {
      return l(b, a)
    }), d = l(this.callee, a), d = e(d, "instance");
    return new L(d, b)
  };
  IR.This.prototype.compile = function() {
    return new O
  };
  IR.Throw.prototype.compile = function(a) {
    a = l(this.argument, a);
    return new A(a)
  };
  IR.Arguments.prototype.compile = function() {
    return b("arguments")
  };
  IR.AVM2Global.prototype.compile = function(a) {
    a = l(this.scope, a);
    return e(a, "global", "object")
  };
  IR.AVM2SetProperty.prototype.compile = function(a) {
    var d = l(this.object, a), e = l(this.name, a);
    a = l(this.value, a);
    return f(b("setProperty"), [d, e, a])
  };
  IR.GlobalProperty.prototype.compile = function() {
    return b(this.name)
  };
  IR.GetProperty.prototype.compile = function(a) {
    var b = l(this.object, a);
    a = l(this.name, a);
    return e(b, a)
  };
  IR.SetProperty.prototype.compile = function(a) {
    var b = l(this.object, a), d = l(this.name, a);
    a = l(this.value, a);
    return g(e(b, d), a)
  };
  IR.AVM2GetProperty.prototype.compile = function(a) {
    var d = l(this.object, a);
    a = l(this.name, a);
    return f(b("getProperty"), [d, a])
  };
  IR.AVM2SetSlot.prototype.compile = function(a) {
    var d = l(this.object, a), e = l(this.index, a);
    a = l(this.value, a);
    return f(b("setSlot"), [d, e, a])
  };
  IR.AVM2GetSlot.prototype.compile = function(a) {
    var d = l(this.object, a);
    a = l(this.index, a);
    return f(b("getSlot"), [d, a])
  };
  IR.Projection.prototype.compile = function(a) {
    return l(this.argument.scope, a)
  };
  IR.NewArray.prototype.compile = function(a) {
    var b;
    b = this.elements.map(function(b) {
      return l(b, a)
    });
    return new t(b)
  };
  IR.NewObject.prototype.compile = function(a) {
    var b = this.properties.map(function(b) {
      var d = l(b.key, a);
      b = l(b.value, a);
      return new M(d, b, "init")
    });
    return new y(b)
  };
  IR.AVM2NewActivation.prototype.compile = function(a) {
    a = l(this.methodInfo, a);
    return f(b("createActivation"), [a])
  };
  IR.AVM2RuntimeMultiname.prototype.compile = function(a) {
    var d = l(this.namespaces, a);
    a = l(this.name, a);
    return f(e(b("Multiname"), "getMultiname"), [d, a])
  };
  Backend.generate = function(a) {
    a = Looper.analyze(a);
    new IndentingWriter;
    var d = new k;
    a = a.compile(d);
    for(var e = [], f = 0;f < d.parameters.length;f++) {
      e.push(b(d.parameters[f] ? d.parameters[f].name : "_"))
    }
    d.variables.length && (Counter.count("Backend: Locals", d.variables.length), d = d.variables.map(function(a) {
      return new v(b(a.name))
    }), d = new r("var", d), a.body.unshift(d));
    return escodegen.generate(a, {base:"", indent:"  ", comment:!0})
  }
})("undefined" === typeof exports ? Backend = {} : exports);
var domainOptions = systemOptions.register(new OptionSet("Domain Options")), traceClasses = domainOptions.register(new Option("tc", "traceClasses", "boolean", !1, "trace class creation")), traceDomain = domainOptions.register(new Option("tdpa", "traceDomain", "boolean", !1, "trace domain property access")), EXECUTION_MODE = {INTERPRET:1, COMPILE:2};
function executeScript(a) {
  var b = a.abc;
  disassemble.value && b.trace(new IndentingWriter);
  traceExecution.value && print("Executing: " + b.name + " " + a);
  release || !0;
  var d = new Global(b.runtime, a);
  b.domain.allowNatives && (d.public$unsafeJSNative = getNative);
  a.executing = !0;
  d = new Scope(null, a.global);
  b.runtime.createFunction(a.init, d).call(a.global);
  a.executed = !0
}
function ensureScriptIsExecuted(a, b) {
  !a.executed && !a.executing && (2 <= traceExecution.value && print("Executing Script For: " + b), executeScript(a))
}
var Domain = function() {
  function a(b, d, e, f) {
    this.vm = b;
    this.abcs = [];
    this.loadedAbcs = {};
    this.loadedClasses = [];
    this.classCache = Object.create(null);
    this.scriptCache = Object.create(null);
    this.classInfoCache = Object.create(null);
    this.base = d;
    this.allowNatives = f;
    this.mode = e;
    this.natives = {};
    d ? this.system = d.system : (this.system = this, b = this.Class = function(b, d, e) {
      this.debugName = b;
      d && (release || !0, this.instanceNoInitialize = this.instance = d, this.hasInitialize = 0, this.instance.class = this);
      e ? e === a.coerceCallable && (e = a.coerceCallable(this)) : e = a.passthroughCallable(d);
      defineNonEnumerableProperty(this, "call", e.call);
      defineNonEnumerableProperty(this, "apply", e.apply)
    }, b.prototype = {forceConstify:!0, setSymbol:function(a) {
      this.instance.prototype.symbol = a
    }, getSymbol:function() {
      return this.instance.prototype.symbol
    }, initializeInstance:function(a) {
      for(var b = this, d = [];b;) {
        b.hasInitialize & 1 && d.push(b.instance.prototype.initialize), b = b.baseClass
      }
      for(;b = d.pop();) {
        b.call(a)
      }
      Counter.count("Initialize: " + this.classInfo.instanceInfo.name)
    }, createInstance:function(a) {
      var b = Object.create(this.instance.prototype);
      this.instance.apply(b, a);
      return b
    }, createAsSymbol:function(a) {
      var b = Object.create(this.instance.prototype);
      if(b.symbol) {
        var d = Object.create(b.symbol), e;
        for(e in a) {
          d[e] = a[e]
        }
        b.symbol = d
      }else {
        b.symbol = a
      }
      return b
    }, extendBuiltin:function(a) {
      this.baseClass = a;
      this.dynamicPrototype = this.instance.prototype;
      defineNonEnumerableProperty(this.dynamicPrototype, "public$constructor", this)
    }, extend:function(a) {
      release || !0;
      this.baseClass = a;
      this.dynamicPrototype = Object.create(a.dynamicPrototype);
      if(a.hasInitialize) {
        var b = this.instance, d = this;
        this.instance = function() {
          d.initializeInstance(this);
          b.apply(this, arguments)
        };
        this.instance.class = b.class;
        this.hasInitialize |= 2
      }
      this.instance.prototype = Object.create(this.dynamicPrototype);
      defineNonEnumerableProperty(this.dynamicPrototype, "public$constructor", this);
      defineReadOnlyProperty(this.instance.prototype, "class", this)
    }, link:function(a) {
      function b(a, d) {
        for(var e = Object.keys(d), f = 0, g = e.length;f < g;f++) {
          var k = e[f], l = Multiname.getQualifiedName(Multiname.fromSimpleName(d[k]));
          release || !0;
          var m = Object.getOwnPropertyDescriptor(a, l);
          m && m.get ? Object.defineProperty(a, k, m) : Object.defineProperty(a, k, {get:new Function("", "return this." + l), set:new Function("v", "this." + l + " = v")})
        }
      }
      release || !0;
      if(a.initialize) {
        if(!this.hasInitialize) {
          var d = this.instance, e = this;
          this.instance = function() {
            e.initializeInstance(this);
            d.apply(this, arguments)
          };
          this.instance.class = d.class;
          this.instance.prototype = d.prototype
        }
        this.hasInitialize |= 1
      }
      for(var f = this.dynamicPrototype, p = Object.keys(a), r = 0, v = p.length;r < v;r++) {
        var s = p[r];
        Object.defineProperty(f, s, Object.getOwnPropertyDescriptor(a, s))
      }
      if(a = a.__glue__) {
        a.script && (a.script.instance && b(f, a.script.instance), a.script.static && b(this, a.script.static)), this.native = a.native
      }
    }, extendNative:function(a, b) {
      this.baseClass = a;
      this.dynamicPrototype = Object.getPrototypeOf(b.prototype);
      this.instance.prototype = b.prototype;
      defineNonEnumerableProperty(this.dynamicPrototype, "public$constructor", this);
      defineReadOnlyProperty(this.instance.prototype, "class", this)
    }, coerce:function(a) {
      return a
    }, isInstanceOf:function(a) {
      return this.isInstance(a)
    }, isInstance:function(a) {
      return null === a || "object" !== typeof a ? !1 : this.dynamicPrototype.isPrototypeOf(a)
    }, toString:function() {
      return"[class " + this.debugName + "]"
    }}, b.instance = b, b.toString = b.prototype.toString, b.native = {instance:{prototype:{get:function() {
      return this.dynamicPrototype
    }}}}, (this.MethodClosure = function(a, b) {
      var d = b.bind(a);
      defineNonEnumerableProperty(this, "call", d.call.bind(d));
      defineNonEnumerableProperty(this, "apply", d.apply.bind(d))
    }).prototype = {toString:function() {
      return"function Function() {}"
    }})
  }
  a.passthroughCallable = function(a) {
    return{call:function(d) {
      Array.prototype.shift.call(arguments);
      return a.apply(d, arguments)
    }, apply:function(d, e) {
      return a.apply(d, e)
    }}
  };
  a.coerceCallable = function(a) {
    return{call:function(d, e) {
      return coerce(e, a)
    }, apply:function(d, e) {
      return coerce(e[0], a)
    }}
  };
  a.constructingCallable = function(a) {
    return{call:function(d) {
      return new Function.bind.apply(a, arguments)
    }, apply:function(d, e) {
      return new Function.bind.apply(a, [d].concat(e))
    }}
  };
  a.prototype = {getProperty:function(a, d, e) {
    if(e = this.findDefiningScript(a, e)) {
      return!e.script.executing ? void 0 : e.script.global[Multiname.getQualifiedName(e.name)]
    }
    if(d) {
      return unexpected("Cannot find property " + a)
    }
  }, getClass:function(a) {
    var d = this.classCache, e = d[a];
    e || (e = d[a] = this.getProperty(Multiname.fromSimpleName(a), !0, !0));
    release || !0;
    return e
  }, findClass:function(a) {
    return a in this.classCache ? !0 : this.findProperty(Multiname.fromSimpleName(a), !1, !0)
  }, findProperty:function(a, d, e) {
    traceDomain.value && print("Domain.findProperty: " + a);
    if(e = this.findDefiningScript(a, e)) {
      return e.script.global
    }
    if(d) {
      return unexpected("Cannot find property " + a)
    }
  }, findClassInfo:function(a) {
    release || Multiname.isQName(a);
    var d = Multiname.getQualifiedName(a), e = this.classInfoCache[d];
    if(e || this.base && (e = this.base.findClassInfo(a))) {
      return e
    }
    a = this.abcs;
    for(e = 0;e < a.length;e++) {
      for(var f = a[e].scripts, g = 0;g < f.length;g++) {
        for(var k = f[g].traits, l = 0;l < k.length;l++) {
          var m = k[l];
          if(m.isClass() && Multiname.getQualifiedName(m.name) == d) {
            return this.classInfoCache[d] = m.classInfo
          }
        }
      }
    }
  }, installNative:function(a, d) {
    natives[a] = function() {
      return d
    }
  }, findDefiningScript:function(a, d) {
    var e = this.scriptCache[a.id];
    if(e && (e.script.executed || !d) || this.base && (e = this.base.findDefiningScript(a, d))) {
      return e
    }
    Counter.count("Domain: findDefiningScript");
    for(var e = this.abcs, f = 0;f < e.length;f++) {
      for(var g = e[f], g = g.scripts, k = 0;k < g.length;k++) {
        var l = g[k], m = l.traits;
        if(a instanceof Multiname) {
          for(var n = 0;n < m.length;n++) {
            var p = m[n];
            if(a.hasQName(p.name)) {
              return d && ensureScriptIsExecuted(l, p.name), this.scriptCache[a.id] = {script:l, name:p.name}
            }
          }
        }else {
          unexpected()
        }
      }
    }
    if(!this.base && this.vm.findDefiningAbc && (g = this.vm.findDefiningAbc(a), null !== g && !this.loadedAbcs[g.name])) {
      return this.loadedAbcs[g.name] = !0, this.loadAbc(g), this.findDefiningScript(a, d)
    }
  }, executeAbc:function(a) {
    console.time("Execute ABC: " + a.name);
    this.loadAbc(a);
    executeScript(a.lastScript);
    traceClasses.value && this.traceLoadedClasses();
    console.timeEnd("Execute ABC: " + a.name)
  }, loadAbc:function(a) {
    traceExecution.value && print("Loading: " + a.name);
    a.domain = this;
    this.abcs.push(a);
    a.runtime = new Runtime(a)
  }, _getScriptObject:function() {
    this.scriptObject || (avm2.systemDomain.getClass("flash.system.ApplicationDomain").createInstance([this]), release || !0);
    return this.scriptObject
  }, traceLoadedClasses:function() {
    function a(b) {
      for(var f in b) {
        var g = f, k = Object.getOwnPropertyDescriptor(b, f);
        if(k && (k.get && (g += " getter"), k.set && (g += " setter"), k.value)) {
          if(k = b[f], k instanceof Scope) {
            for(g += ": ";k;) {
              if(release || !0, g += k.object.debugName || "T", k = k.parent) {
                g += " <: "
              }
            }
          }else {
            k instanceof Function ? g += ": " + (k.name ? k.name : "anonymous") : k && (g += ": " + k)
          }
        }
        d.writeLn(g)
      }
    }
    var d = new IndentingWriter;
    d.enter("Loaded Classes");
    this.loadedClasses.forEach(function(e) {
      d.enter(e.debugName + (e.baseClass ? " extends " + e.baseClass.debugName : "") + " {");
      d.enter("instance");
      a(e.prototype);
      d.leave("");
      d.enter("static");
      a(e);
      d.leave("");
      d.leave("}")
    });
    d.leave("")
  }};
  return a
}(), runtimeOptions = systemOptions.register(new OptionSet("Runtime Options")), traceScope = runtimeOptions.register(new Option("ts", "traceScope", "boolean", !1, "trace scope execution")), traceExecution = runtimeOptions.register(new Option("tx", "traceExecution", "number", 0, "trace script execution")), tracePropertyAccess = runtimeOptions.register(new Option("tpa", "tracePropertyAccess", "boolean", !1, "trace property access")), functionBreak = runtimeOptions.register(new Option("fb", "functionBreak", 
"number", -1, "Inserts a debugBreak at function index #.")), compileOnly = runtimeOptions.register(new Option("co", "compileOnly", "number", -1, "Compiles only function number.")), compileUntil = runtimeOptions.register(new Option("cu", "compileUntil", "number", -1, "Compiles only until a function number.")), debuggerMode = runtimeOptions.register(new Option("dm", "debuggerMode", "boolean", !1, "matches avm2 debugger build semantics")), enableVerifier = runtimeOptions.register(new Option("verify", 
"verify", "boolean", !1, "Enable verifier.")), enableInlineCaching = runtimeOptions.register(new Option("ic", "inlineCaching", "boolean", !1, "Enable inline caching.")), traceInlineCaching = runtimeOptions.register(new Option("tic", "traceInlineCaching", "boolean", !1, "Trace inline caching execution.")), compilerEnableExceptions = runtimeOptions.register(new Option("cex", "exceptions", "boolean", !1, "Compile functions with catch blocks.")), compilerMaximumMethodSize = runtimeOptions.register(new Option("cmms", 
"maximumMethodSize", "number", 4096, "Compiler maximum method size.")), jsGlobal = function() {
  return this || (0,eval)("this")
}(), VM_SLOTS = "vm slots", VM_LENGTH = "vm length", VM_BINDINGS = "vm bindings", VM_NATIVE_PROTOTYPE_FLAG = "vm native prototype", VM_ENUMERATION_KEYS = "vm enumeration keys", VM_TOMBSTONE = {}, VM_OPEN_METHODS = "vm open methods", VM_NEXT_NAME = "vm next name", VM_NEXT_NAME_INDEX = "vm next name index", VM_UNSAFE_CLASSES = ["Shumway"], VM_OPEN_METHOD_PREFIX = "open$", VM_NATIVE_BUILTINS = [Object, Number, Boolean, String, Array, Date, RegExp], VM_NATIVE_BUILTIN_SURROGATES = [{object:Object, methods:["toString", 
"valueOf"]}, {object:Function, methods:["toString", "valueOf"]}], VM_NATIVE_BUILTIN_ORIGINALS = "vm originals", SAVED_SCOPE_NAME = "$SS", PARAMETER_PREFIX = "p", $M = [], $C = [];
function objectConstantName(a) {
  release || !0;
  if(a.hasOwnProperty("objectID")) {
    return"$C_" + a.objectID
  }
  var b = $C.length;
  Object.defineProperty(a, "objectID", {value:b, writable:!1, enumerable:!1});
  $C.push(a);
  b = "$C_" + b;
  jsGlobal[b] = a;
  return b
}
function initializeGlobalObject(a) {
  var b = /^public\$/;
  defineReadOnlyProperty(a.Object.prototype, "vm next name index", function(a) {
    if(0 === a) {
      var d = VM_ENUMERATION_KEYS, g = [], k;
      for(k in this) {
        isNumeric(k) ? g.push(Number(k)) : b.test(k) && !(this["vm bindings"] && 0 <= this[VM_BINDINGS].indexOf(k)) && g.push(k.substr(7))
      }
      this[d] = g
    }
    for(d = this["vm enumeration keys"];a < d.length;) {
      if(d[a] !== VM_TOMBSTONE) {
        return a + 1
      }
      a++
    }
    delete this["vm enumeration keys"];
    return 0
  });
  defineReadOnlyProperty(a.Object.prototype, "vm next name", function(a) {
    var b = this["vm enumeration keys"];
    release || !0;
    return b[a - 1]
  });
  var d = a[VM_NATIVE_BUILTIN_ORIGINALS] = {};
  VM_NATIVE_BUILTIN_SURROGATES.forEach(function(b) {
    var f = b.object;
    d[f.name] = {};
    b.methods.forEach(function(b) {
      var e = f.prototype[b];
      d[f.name][b] = e;
      var l = Multiname.getPublicQualifiedName(b);
      a[f.name].prototype[b] = function() {
        return this[l] ? this[l]() : e.call(this)
      }
    })
  });
  VM_NATIVE_BUILTINS.forEach(function(a) {
    defineReadOnlyProperty(a.prototype, "vm native prototype", !0)
  })
}
function isNativePrototype(a) {
  return a.hasOwnProperty("vm native prototype")
}
initializeGlobalObject(jsGlobal);
function createNewGlobalObject() {
  var a = null;
  inBrowser ? (a = document.createElement("iframe"), a.style.display = "none", document.body.appendChild(a), a = window.frames[window.frames.length - 1]) : a = newGlobal("new-compartment");
  initializeGlobalObject(a);
  return a
}
function toDouble(a) {
  return Number(a)
}
function toBoolean(a) {
  return!!a
}
function toUint(a) {
  a |= 0;
  return 0 > a ? a + 4294967296 : a
}
function toInt(a) {
  return a | 0
}
function toString(a) {
  return String(a)
}
function coerce(a, b) {
  if(b.coerce) {
    return b.coerce(a)
  }
  if(isNullOrUndefined(a)) {
    return null
  }
  if(b.isInstance(a)) {
    return a
  }
  release || !0
}
function coerceString(a) {
  return null === a || void 0 === a ? null : String(a)
}
function typeOf(a) {
  if(a) {
    if(a.constructor == String) {
      return"string"
    }
    if(a.constructor == Number) {
      return"number"
    }
    if(a.constructor == Boolean) {
      return"boolean"
    }
  }
  return typeof a
}
function getSlot(a, b) {
  return a[a[VM_SLOTS][b].name]
}
function setSlot(a, b, d) {
  b = a[VM_SLOTS][b];
  if(!b.const) {
    var e = b.type;
    a[b.name] = e && e.coerce ? e.coerce(d) : d
  }
}
function nextName(a, b) {
  return a["vm next name"](b)
}
function nextValue(a, b) {
  return a[Multiname.getPublicQualifiedName(a["vm next name"](b))]
}
function hasNext2(a, b) {
  release || !0;
  release || !0;
  return{index:a["vm next name index"](b), object:a}
}
function getDescendants() {
  notImplemented("getDescendants")
}
function checkFilter() {
  notImplemented("checkFilter")
}
function Activation(a) {
  this.methodInfo = a
}
var Interface = function() {
  function a(a) {
    var d = a.instanceInfo;
    release || !0;
    this.name = d.name;
    this.classInfo = a
  }
  a.prototype = {toString:function() {
    return"[interface " + this.name + "]"
  }, isInstance:function(a) {
    if(null === a || "object" !== typeof a) {
      return!1
    }
    for(a = a.class;a;) {
      var d = a.implementedInterfaces;
      if(d) {
        for(var e = 0, f = d.length;e < f;e++) {
          if(d[e] === this) {
            return!0
          }
        }
      }
      a = a.baseClass
    }
    return!1
  }, call:function(a) {
    return a
  }, apply:function(a, d) {
    return d[0]
  }};
  return a
}(), Scope = function() {
  function a(a, d, e) {
    this.parent = a;
    this.object = d;
    this.global = a ? a.global : this;
    this.isWith = e;
    this.cache = Object.create(null)
  }
  a.prototype.findDepth = function(a) {
    for(var d = this, e = 0;d;) {
      if(d.object === a) {
        return e
      }
      e++;
      d = d.parent
    }
    return-1
  };
  a.prototype.findProperty = function(a, d, e, f) {
    release || !0;
    release || !0;
    var g, k = this.cache, l = "string" === typeof a ? a : a.id;
    if(!f && l && (g = k[l])) {
      return g
    }
    (traceScope.value || tracePropertyAccess.value) && print("Scope.findProperty(" + a + ")");
    g = this.object;
    if(Multiname.isQName(a)) {
      if(this.isWith) {
        if(Multiname.getQualifiedName(a) in g) {
          return g
        }
      }else {
        if(nameInTraits(g, Multiname.getQualifiedName(a))) {
          return l && (k[l] = g), g
        }
      }
    }else {
      if(this.isWith) {
        if(resolveMultiname(g, a)) {
          return g
        }
      }else {
        if(resolveMultinameInTraits(g, a)) {
          return l && (k[l] = g), g
        }
      }
    }
    if(this.parent) {
      return g = this.parent.findProperty(a, d, e, f), l && (k[a.id] = g), g
    }
    if(f) {
      return null
    }
    if(d = d.findProperty(a, e, !0)) {
      return d
    }
    e && unexpected("Cannot find property " + a);
    return this.global.object
  };
  a.prototype.trace = function() {
    for(var a = this;a;) {
      print(a.object + (a.object ? " - " + a.object.debugName : "")), a = a.parent
    }
  };
  return a
}();
function nameInTraits(a, b) {
  if(a.hasOwnProperty("vm bindings") && a.hasOwnProperty(b)) {
    return!0
  }
  var d = Object.getPrototypeOf(a);
  return d.hasOwnProperty("vm bindings") && d.hasOwnProperty(b)
}
function resolveMultinameInTraits(a, b) {
  release || !0;
  a = Object(a);
  for(var d = 0, e = b.namespaces.length;d < e;d++) {
    var f = b.getQName(d);
    if(nameInTraits(a, Multiname.getQualifiedName(f))) {
      return f
    }
  }
}
function resolveMultiname(a, b, d) {
  a = Object(a);
  for(var e, f = isNativePrototype(a), g = 0, k = b.namespaces.length;g < k;g++) {
    var l = b.getQName(g);
    if(d) {
      if(nameInTraits(a, Multiname.getQualifiedName(l))) {
        return l
      }
    }else {
      if(b.namespaces[g].isDynamic()) {
        if(e = l, f) {
          break
        }
      }else {
        if(!f && Multiname.getQualifiedName(l) in a) {
          return l
        }
      }
    }
  }
  if(e && !d && Multiname.getQualifiedName(e) in a) {
    return e
  }
}
function isPrimitiveType(a) {
  return"number" === typeof a || "string" === typeof a || "boolean" === typeof a
}
function sliceArguments(a, b) {
  return Array.prototype.slice.call(a, b)
}
function getProperty(a, b) {
  release || !0;
  if(a.canHandleProperties) {
    return a.get(b.name)
  }
  release || !0;
  var d = Multiname.isQName(b) ? b : resolveMultiname(a, b), e = void 0;
  if(!d && isPrimitiveType(a)) {
    throw new ReferenceError(formatErrorMessage(Errors.ReadSealedError, b.name, typeof a));
  }
  if(void 0 !== d) {
    if(Multiname.isAnyName(d)) {
      return
    }
    e = Multiname.isNumeric(d) && a.indexGet ? a.indexGet(Multiname.getQualifiedName(d), e) : a[Multiname.getQualifiedName(d)]
  }
  tracePropertyAccess.value && print("getProperty(" + a.toString() + ", " + b + " -> " + d + ") has value: " + !!e);
  return e
}
function hasProperty(a, b) {
  release || !0;
  var d = Multiname.isQName(b) ? b : resolveMultiname(a, b);
  return!d ? !1 : Multiname.getQualifiedName(d) in a
}
function getSuper(a, b, d) {
  release || !0;
  release || !0;
  release || !0;
  var e = a.object.baseClass;
  release || !0;
  a = e.instance.prototype;
  var f = d.isQName() ? d : resolveMultiname(a, d), g = void 0;
  if(f) {
    if(Multiname.isNumeric(f) && a.indexGet) {
      g = a.indexGet(Multiname.getQualifiedName(f), g)
    }else {
      var f = Multiname.getQualifiedName(f), k = a[VM_OPEN_METHODS][f], e = e.classInfo.instanceInfo.name;
      k ? (g = b[e + " " + f]) || (g = b[e + " " + f] = k.bind(b)) : (a = Object.getOwnPropertyDescriptor(a, f), release || !0, g = a.get ? a.get.call(b) : b[f])
    }
  }
  tracePropertyAccess.value && print("getSuper(" + d + ") has value: " + !!g);
  return g
}
function setProperty(a, b, d) {
  release || !0;
  if(a.canHandleProperties) {
    return a.set(b.name, d)
  }
  release || !0;
  var e = Multiname.isQName(b) ? b : resolveMultiname(a, b);
  tracePropertyAccess.value && print("setProperty(" + b + ") trait: " + d);
  void 0 === e && (e = Multiname.getPublicQualifiedName(b.name));
  Multiname.isNumeric(e) && a.indexSet ? a.indexSet(Multiname.getQualifiedName(e), d) : a[Multiname.getQualifiedName(e)] = d
}
function setSuper(a, b, d, e) {
  release || !0;
  release || !0;
  var f = a.object.baseClass;
  release || !0;
  tracePropertyAccess.value && print("setProperty(" + d + ") trait: " + e);
  a = f.instance.prototype;
  var g = Multiname.isQName(d) ? d : resolveMultiname(a, d);
  if(void 0 !== g) {
    Multiname.isNumeric(g) && a.indexSet ? a.indexSet(Multiname.getQualifiedName(g), e) : (d = Multiname.getQualifiedName(g), a = Object.getOwnPropertyDescriptor(a, d), release || !0, a.set ? a.set.call(b, e) : b[d] = e)
  }else {
    throw new ReferenceError("Cannot create property " + d.name + " on " + f.debugName);
  }
}
function deleteProperty(a, b) {
  release || !0;
  if(a.canHandleProperties) {
    return a.delete(b.name)
  }
  release || !0;
  var d = Multiname.isQName(b) ? b : resolveMultiname(a, b);
  if(void 0 === d) {
    return!0
  }
  if(d instanceof Multiname && !d.namespaces[0].isPublic() || "object" !== typeof a || null === a) {
    return!1
  }
  var e = Multiname.getQualifiedName(d);
  return!(e in Object.getPrototypeOf(a)) ? (a["vm enumeration keys"] && (e = a[VM_ENUMERATION_KEYS].indexOf(e), 0 <= e && (a[VM_ENUMERATION_KEYS][e] = VM_TOMBSTONE)), delete a[Multiname.getQualifiedName(d)]) : !1
}
function isInstanceOf(a, b) {
  return b.isInstanceOf(a)
}
function asInstance(a, b) {
  return b.isInstance(a) ? a : null
}
function isInstance(a, b) {
  return b.isInstance(a)
}
function createActivation(a) {
  return Object.create(a.activationPrototype)
}
function CatchScopeObject(a, b) {
  b && a.applyTraits(this, new Scope(null, this), null, [b], null, null)
}
var Global = function() {
  function a(a, d) {
    this.scriptInfo = d;
    d.global = this;
    d.abc = a.abc;
    a.applyTraits(this, new Scope(null, this), null, d.traits, null, null);
    d.loaded = !0
  }
  a.prototype.toString = function() {
    return"[object global]"
  };
  a.prototype.isExecuted = function() {
    return this.scriptInfo.executed
  };
  a.prototype.ensureExecuted = function() {
    ensureScriptIsExecuted(this.scriptInfo)
  };
  defineNonEnumerableProperty(a.prototype, Multiname.getPublicQualifiedName("toString"), function() {
    return this.toString()
  });
  return a
}(), Runtime = function() {
  function a(a) {
    this.abc = a;
    this.domain = a.domain;
    this.domain.mode !== EXECUTION_MODE.INTERPRET && (this.compiler = new C4Compiler(a));
    this.interpreter = new Interpreter(a);
    this.exception = {value:void 0}
  }
  function b(a, b) {
    release || !0;
    var d, e = null;
    d = function n() {
      Counter.count("Executing Trampoline");
      e || (e = a(n));
      return e.apply(this, arguments)
    };
    defineReadOnlyProperty(d, "vm length", b);
    d.isTrampoline = !0;
    return d
  }
  var d = 0, e = 0;
  a.stack = [];
  a.currentDomain = function() {
    return Runtime.stack.length ? Runtime.stack.top().domain : null
  };
  a.unwindStackTo = function(b) {
    for(var d = a.stack, e = d.length;d[e - 1] !== b;) {
      e--
    }
    d.length = e
  };
  a.prototype.createFunction = function(a, b, k) {
    function l(a, b, d) {
      var e = function() {
        var e = this === jsGlobal ? d.global.object : this, f;
        n && arguments.length < p.length ? (f = Array.prototype.slice.call(arguments), f = f.concat(p.slice(arguments.length - p.length))) : f = arguments;
        return a.interpretMethod(e, b, d, f)
      };
      return e.instance = e
    }
    function m(a, b) {
      var d = function() {
        Counter.count("Binding Scope");
        Array.prototype.unshift.call(arguments, b);
        return a.apply(this === jsGlobal ? b.global.object : this, arguments)
      };
      return d.instance = d
    }
    release || !0;
    var n = !1, p = a.parameters.map(function(a) {
      void 0 !== a.value && (n = !0);
      return a.value
    }), r = this.domain.mode;
    if(!a.analysis) {
      a.analysis = new Analysis(a, {massage:!0});
      a.traits && (a.activationPrototype = this.applyTraits(new Activation(a), null, null, a.traits, null, null));
      for(var v = a.exceptions, s = 0, u = v.length;s < u;s++) {
        var C = v[s];
        if(C.varName) {
          var q = Object.create(Trait.prototype);
          q.kind = 0;
          q.name = C.varName;
          q.typeName = C.typeName;
          q.holder = a;
          C.scopeObject = new CatchScopeObject(this, q)
        }else {
          C.scopeObject = new CatchScopeObject
        }
      }
    }
    d++;
    if(r === EXECUTION_MODE.INTERPRET || a.hasExceptions() && !compilerEnableExceptions.value || a.code.length > compilerMaximumMethodSize.value) {
      return l(this.interpreter, a, b)
    }
    if(0 <= compileOnly.value && Number(compileOnly.value) !== d) {
      return print("Compile Only Skipping " + d), l(this.interpreter, a, b)
    }
    if(0 <= compileUntil.value && d > compileUntil.value) {
      return print("Compile Until Skipping " + d), l(this.interpreter, a, b)
    }
    (0 <= compileOnly.value || 0 <= compileUntil.value) && print("Compiling " + d);
    if(a.compiledMethod) {
      return release || !0, m(a.compiledMethod, b)
    }
    r = a.parameters.map(function(a) {
      return"p" + a.name
    });
    k && r.unshift("$SS");
    $M.push(a);
    v = this.compiler.compileMethod(a, n, b, k);
    s = a.name ? Multiname.getQualifiedName(a.name) : "fn" + e;
    a.verified && (s += "$V");
    e == functionBreak.value && (v = '{ debugBreak("' + s + '");\n' + v + "}");
    r = "function " + s + " (" + r.join(", ") + ") " + v;
    1 < traceLevel.value && a.trace(new IndentingWriter, this.abc);
    a.debugTrace = function(b) {
      return function() {
        a.trace(new IndentingWriter, b)
      }
    }(this.abc);
    0 < traceLevel.value && print(r);
    a.compiledMethod = (0,eval)("[$M[" + ($M.length - 1) + "]," + r + "][1]");
    e++;
    return k ? m(a.compiledMethod, b) : a.compiledMethod
  };
  a.prototype.createClass = function(a, b, d) {
    var e = a.instanceInfo;
    if(e.isInterface()) {
      return this.createInterface(a)
    }
    var m = this.domain, n = Multiname.getName(e.name);
    traceExecution.value && print("Creating class " + n + (a.native ? " replaced with native " + a.native.cls : ""));
    var p, r, v = b ? b.instance.prototype : null;
    0 <= VM_UNSAFE_CLASSES.indexOf(n) && (a.native = {cls:n + "Class"}, e.traits.concat(a.traits).forEach(function(a) {
      a.isMethod() && (a.methodInfo.flags |= 32)
    }));
    var s;
    a.native && ((s = getNative(a.native.cls)) || warning("No native for " + a.native.cls));
    if(a.native && s) {
      release || !0;
      b || (d = new Scope(d, m.system.Class));
      d = new Scope(d, null);
      p = s(this, d, this.createFunction(e.init, d), b);
      p.classInfo = a;
      p.scope = d;
      d.object = p;
      if(r = p.instance) {
        b = p.native ? p.native.instance : void 0, this.applyTraits(r.prototype, d, v, e.traits, b, p)
      }
      b = p.native ? p.native.static : void 0;
      this.applyTraits(p, d, null, a.traits, b, null)
    }else {
      d = new Scope(d, null), r = this.createFunction(e.init, d), p = new m.system.Class(n, r), p.classInfo = a, p.scope = d, d.object = p, p.extend(b), this.applyTraits(p.instance.prototype, d, v, e.traits, null, p), this.applyTraits(p, d, null, a.traits, null, null), r = p.instance
    }
    if(r) {
      var v = p, u = Object.create(null);
      (function y(a) {
        a.baseClass && y(a.baseClass);
        a = a.classInfo.instanceInfo;
        for(var b = 0;b < a.traits.length;b++) {
          var d = a.traits[b];
          if(d.isProtected()) {
            var e = d.name.getName();
            u[e] || (u[e] = {definingNamespace:a.protectedNs, namespaces:[], trait:d});
            u[e].definingNamespace = a.protectedNs
          }
        }
        for(e in u) {
          u[e].namespaces.push(a.protectedNs)
        }
      })(v);
      v = r.prototype["vm open methods"];
      b = r.prototype["vm bindings"];
      for(var C in u) {
        n = Multiname.getQualifiedName(new Multiname([u[C].definingNamespace], C));
        s = u[C].namespaces;
        for(var q = u[C].trait, w = 0;w < s.length;w++) {
          var x = Multiname.getQualifiedName(new Multiname([s[w]], C));
          x !== n && (Counter.count("Protected Aliases"), defineNonEnumerableGetter(r.prototype, x, makeForwardingGetter(n)), defineNonEnumerableSetter(r.prototype, x, makeForwardingSetter(n)), b.push(x), q.isMethod() && (v[x] = v[n]))
        }
      }
    }
    0 < e.interfaces.length && (p.implementedInterfaces = []);
    (function t(a) {
      for(var b = 0, d = a.length;b < d;b++) {
        var e = m.getProperty(a[b], !0, !0), f = e.classInfo.instanceInfo;
        p.implementedInterfaces.push(e);
        t(f.interfaces);
        for(var e = r.prototype, f = f.traits, g = 0, k = f.length;g < k;g++) {
          var l = f[g], n = Multiname.getQualifiedName(l.name), l = function(a) {
            return function() {
              return this[a]
            }
          }(Multiname.getPublicQualifiedName(Multiname.getName(l.name)));
          Counter.count("Interface Aliases");
          defineNonEnumerableGetter(e, n, l)
        }
      }
    })(e.interfaces);
    this.createFunction(a.init, d).call(p);
    this.sealConstantTraits(p, a.traits);
    traceClasses.value && (m.loadedClasses.push(p), m.traceLoadedClasses());
    return p
  };
  a.prototype.createInterface = function(a) {
    var b = a.instanceInfo;
    release || !0;
    if(traceExecution.value) {
      var d = "Creating interface " + b.name;
      b.interfaces.length && (d += " implements " + b.interfaces.map(function(a) {
        return a.getName()
      }).join(", "));
      print(d)
    }
    return new Interface(a)
  };
  a.prototype.sealConstantTraits = function(a, b) {
    for(var d = this, e = 0, m = b.length;e < m;e++) {
      var n = b[e];
      n.isConst() && (n = Multiname.getQualifiedName(n.name), function(b, e) {
        Object.defineProperty(a, b, {configurable:!1, enumerable:!1, get:function() {
          return e
        }, set:function() {
          d.throwErrorFromVM("ReferenceError", "Illegal write to read-only property " + b + ".")
        }})
      }(n, a[n]))
    }
  };
  a.prototype.getTraitFunction = function(b, d, e) {
    release || !0;
    release || !0;
    var l = b.methodInfo, m;
    if(l.isNative() && this.domain.allowNatives) {
      var n = b.metadata;
      n && n.native ? (e = n.native.items[0].value, (m = getNative(e)) || (m = this.domain.natives[e]), m = m && m(a, d)) : n && n.unsafeJSNative ? m = getNative(n.unsafeJSNative.items[0].value) : e && (d = Multiname.getName(l.name), m = b.isGetter() ? e[d] ? e[d].get : void 0 : b.isSetter() ? e[d] ? e[d].set : void 0 : e[d]);
      if(!m) {
        return warning("No native method for: " + b.kindName() + " " + l.holder.name + "::" + Multiname.getQualifiedName(l.name)), function() {
          warning("Calling undefined native method: " + b.kindName() + " " + l.holder.name + "::" + Multiname.getQualifiedName(l.name))
        }
      }
    }else {
      2 <= traceExecution.value && print("Creating Function For Trait: " + b.holder + " " + b), m = this.createFunction(l, d)
    }
    3 <= traceExecution.value && print("Made Function: " + Multiname.getQualifiedName(l.name));
    return m
  };
  a.prototype.applyMethodTrait = function(a, d, e, l, m) {
    var n = this;
    release || !0;
    var p = Multiname.getQualifiedName(d.name);
    if(l) {
      if(release || !0, d.isMethod()) {
        var r = {value:null};
        l = b(function(a) {
          var b = n.getTraitFunction(d, e, m);
          Counter.count("Runtime: Patching Memoizer");
          a = a.patchTargets;
          for(var f = 0;f < a.length;f++) {
            var l = a[f];
            l.object[l.name] = b;
            3 <= traceExecution.value && print("Trampoline: Patching: " + l.name)
          }
          return b
        }, d.methodInfo.parameters.length);
        r.value = l;
        a[VM_OPEN_METHODS][p] = l;
        defineNonEnumerableProperty(a, "open$" + p, l);
        d.isOverride() && d.isProtected();
        var v = defineNonEnumerableGetter;
        Counter.count("Runtime: Memoizers");
        v(a, p, function() {
          Counter.count("Runtime: Memoizing");
          3 <= traceExecution.value && print("Memoizing: " + p);
          if(isNativePrototype(this)) {
            return Counter.count("Runtime: Method Closures"), r.value.bind(this)
          }
          if(this.hasOwnProperty(p)) {
            if(Object.getOwnPropertyDescriptor(this, p).get) {
              return Counter.count("Runtime: Method Closures"), r.value.bind(this)
            }
            Counter.count("Runtime: Unpatched Memoizer");
            return this[p]
          }
          var a = r.value.bind(this);
          defineReadOnlyProperty(a, "public$prototype", null);
          r.value.isTrampoline || defineReadOnlyProperty(this, p, a);
          return a
        });
        l.patchTargets = [{object:r, name:"value"}, {object:a[VM_OPEN_METHODS], name:p}, {object:a, name:VM_OPEN_METHOD_PREFIX + p}]
      }else {
        if(d.isGetter() || d.isSetter()) {
          l = b(function() {
            var b = n.getTraitFunction(d, e, m);
            defineNonEnumerableGetterOrSetter(a, p, b, d.isGetter());
            return b
          }), defineNonEnumerableGetterOrSetter(a, p, l, d.isGetter())
        }
      }
    }else {
      if(d.isMethod()) {
        l = b(function() {
          var b = n.getTraitFunction(d, e, m);
          defineReadOnlyProperty(a, p, b);
          defineReadOnlyProperty(a, "open$" + p, b);
          return b
        }, d.methodInfo.parameters.length), v = l.bind(a), defineReadOnlyProperty(v, "vm length", l["vm length"]), defineReadOnlyProperty(v, "public$prototype", null), defineNonEnumerableProperty(a, p, v), defineNonEnumerableProperty(a, "open$" + p, v)
      }else {
        if(d.isGetter() || d.isSetter()) {
          l = b(function() {
            var b = n.getTraitFunction(d, e, m);
            defineNonEnumerableGetterOrSetter(a, p, b, d.isGetter());
            return b
          }), defineNonEnumerableGetterOrSetter(a, p, l, d.isGetter())
        }
      }
    }
  };
  a.prototype.applyTraits = function(a, b, d, e, m, n) {
    var p = this.domain;
    if(d) {
      for(var r = {}, v = d["vm bindings"], s = d["vm open methods"], u = 0;u < v.length;u++) {
        var C = v[u], q = Object.getOwnPropertyDescriptor(d, C);
        Object.defineProperty(a, C, q);
        s.hasOwnProperty(C) && (q = s[C], r[C] = q, defineNonEnumerableProperty(a, "open$" + C, q), q.patchTargets && (q.patchTargets.push({object:r, name:C}), q.patchTargets.push({object:a, name:"open$" + C})))
      }
      defineNonEnumerableProperty(a, "vm bindings", d[VM_BINDINGS].slice());
      defineNonEnumerableProperty(a, "vm slots", d[VM_SLOTS].slice());
      defineNonEnumerableProperty(a, "vm open methods", r)
    }else {
      defineNonEnumerableProperty(a, "vm bindings", []), defineNonEnumerableProperty(a, "vm slots", []), defineNonEnumerableProperty(a, "vm open methods", {})
    }
    d = a[VM_SLOTS].length;
    r = d + 1;
    for(v = 0;v < e.length;v++) {
      s = e[v], u = Multiname.getQualifiedName(s.name), s.isSlot() || s.isConst() || s.isClass() ? (s.slotId || (s.slotId = r++), s.slotId < d && (release || !0, this.throwErrorFromVM("VerifyError", "Bad slot ID.")), s.isClass() && (s.metadata && s.metadata.native && p.allowNatives) && (s.classInfo.native = s.metadata.native), C = s.typeName, defineNonEnumerableProperty(a, u, s.value), a[VM_SLOTS][s.slotId] = {name:u, "const":s.isConst(), type:C ? p.getProperty(C, !1, !1) : null}) : s.isMethod() || 
      s.isGetter() || s.isSetter() ? this.applyMethodTrait(a, s, b, n, m) : release || !0, a[VM_BINDINGS].push(u), 3 <= traceExecution.value && print("Applied Trait: " + s + " " + u)
    }
    return a
  };
  a.prototype.applyType = function(a, b) {
    var d = a.classInfo.instanceInfo.name.name;
    if("Vector" === d) {
      release || !0;
      d = b[0];
      if(null !== d && void 0 !== d) {
        switch(d = d.classInfo.instanceInfo.name.name, d) {
          case "int":
          ;
          case "uint":
          ;
          case "double":
            break;
          default:
            d = "object"
        }
      }else {
        d = "object"
      }
      return this.domain.getClass("packageInternal __AS3__.vec.Vector$" + d)
    }
    return notImplemented(d)
  };
  a.prototype.throwErrorFromVM = function(a, b, d) {
    throw new (this.domain.getClass(a).instance)(b, d);
  };
  a.prototype.translateError = function(a) {
    if(a instanceof Error) {
      var b = this.domain.getClass(a.name);
      if(b) {
        return new b.instance(translateErrorMessage(a))
      }
      unexpected("Can't translate error: " + a)
    }
    return a
  };
  a.prototype.notifyConstruct = function(a, b) {
    return this.domain.vm.notifyConstruct(a, b)
  };
  return a
}(), InlineCacheManager = function() {
  function a(a) {
    a.forEach(function(a) {
      var b = a.name.getName();
      a = a.name.getNamespace();
      d.has(b) || d.set(b, new e(b));
      b = d.get(b);
      release || !0;
      b.update(a)
    })
  }
  var b = new IndentingWriter, d = new Map, e = function() {
    function a(b) {
      this.name = b;
      this.namespaces = [];
      this.dirty = !0;
      this.inlineCaches = []
    }
    var d = 0;
    a.prototype.update = function(a) {
      release || !0;
      for(var b = !0, d = this.namespaces, e = 0;e < d.length;e++) {
        if(d[e][0].isEqualTo(a)) {
          d[e][1]++;
          b = !1;
          break
        }
      }
      b && (this.namespaces.push([a, 1]), release || !0)
    };
    a.prototype.getIntersection = function(a) {
      for(var b = this.namespaces.sort(function(a, b) {
        return a[1] - b[1]
      }), d = [], e = 0;e < b.length;e++) {
        for(var f = b[e][0], g = 0;g < a.namespaces.length;g++) {
          if(a.namespaces[g].isEqualTo(f)) {
            f.isDynamic() || d.push(new Multiname([f], a.name));
            break
          }
        }
      }
      d.push(Multiname.getPublicQualifiedName(a.name));
      return d
    };
    a.prototype.create = function(a, e) {
      this.dirty = !1;
      var f = this.getIntersection(a);
      f.reverse();
      for(var n, p = 0;p < f.length;p++) {
        var r = Multiname.getQualifiedName(f[p]);
        n = e ? 0 === p ? "o." + r + " = v" : "(o." + r + ' !== undefined || ("' + r + '" in o)) ? o.' + r + " = v : (" + n + ")" : 0 === p ? "o." + r : "((x = o." + r + ') !== undefined || ("' + r + '" in o)) ? x : (' + n + ")"
      }
      release || !0;
      p = (e ? INLINE_CACHE_SETTER_PREFIX : INLINE_CACHE_GETTER_PREFIX) + d++;
      n = e ? "function " + p + "(o, v) { " + n + "; }" : "function " + p + "(o) { " + (1 < f.length ? "var x; " : "") + "return " + n + "; }";
      traceInlineCaching.value && b.writeLn("IC Stub: " + n);
      jsGlobal[p] = eval("[" + n + "][0]");
      this.inlineCaches.push(p);
      return p
    };
    return a
  }();
  return{createInlineCache:function(a, b) {
    release || !0;
    release || !0;
    release || !0;
    var e = a.inlineCache || (a.inlineCache = {}), l = b ? "setter" : "getter";
    if(e[l]) {
      return e[l]
    }
    var m = a.getName();
    if(d.has(m) && (m = d.get(m))) {
      return Counter.count("Compiler: Inline Cache"), e[l] = m.create(a, b)
    }
  }, updateInlineCaches:function(e) {
    if(enableInlineCaching.value && (e.scripts.forEach(function(b) {
      a(b.traits)
    }), e.classes.forEach(function(b) {
      a(b.traits);
      a(b.instanceInfo.traits)
    }), e.methods.forEach(function(b) {
      b.traits && a(b.traits)
    }), traceInlineCaching.value)) {
      for(var g in d) {
        d.has(g) && (e = d.get(g), b.writeLn("IC Set: " + g + " - " + e.namespaces.map(function(a) {
          return a[0].qualifiedName + ": " + a[1]
        }).join(", ")))
      }
    }
  }}
}(), XML, XMLList;
function XMLClass(a, b, d, e) {
  function f(a) {
    if(null === a) {
      throw new TypeError(formatErrorMessage(Errors.ConvertNullToObjectError));
    }
    if(void 0 === a) {
      throw new TypeError(formatErrorMessage(Errors.ConvertUndefinedToObjectError));
    }
    if(a instanceof XML) {
      return a
    }
    if(a instanceof XMLList) {
      throw new TypeError(formatErrorMessage(Errors.XMLMarkupMustBeWellFormed));
    }
    a = toString(a);
    warning("TODO: Parse: " + a)
  }
  XML = function(a) {
    a ? a instanceof XML || a instanceof XMLList ? warning("TODO: Clone: " + xml) : f.call(this, a) : f.call(this, "")
  };
  var g = new a.domain.system.Class("XML", XML, Domain.passthroughCallable(XML));
  g._flags = 15;
  g._prettyIndent = 2;
  g.extend(e);
  g.native = {"static":{ignoreComments:{get:function() {
    return getBitFlags(g._flags, 1)
  }, set:function(a) {
    g._flags = setBitFlags(g._flags, 1, a)
  }}, ignoreProcessingInstructions:{get:function() {
    return getBitFlags(g._flags, 2)
  }, set:function(a) {
    g._flags = setBitFlags(g._flags, 2, a)
  }}, ignoreWhitespace:{get:function() {
    return getBitFlags(g._flags, 4)
  }, set:function(a) {
    g._flags = setBitFlags(g._flags, 4, a)
  }}, prettyPrinting:{get:function() {
    return getBitFlags(g._flags, 8)
  }, set:function(a) {
    g._flags = setBitFlags(g._flags, 8, a)
  }}, prettyIndent:{get:function() {
    return g._prettyIndent
  }, set:function(a) {
    g._prettyIndent = a
  }}}, instance:{toString:function() {
    return this._value
  }, hasOwnProperty:function() {
    notImplemented("XML.hasOwnProperty")
  }, propertyIsEnumerable:function() {
    notImplemented("XML.propertyIsEnumerable")
  }, addNamespace:function() {
    notImplemented("XML.addNamespace")
  }, appendChild:function() {
    notImplemented("XML.appendChild")
  }, attribute:function() {
    notImplemented("XML.attribute")
  }, attributes:function() {
    notImplemented("XML.attributes")
  }, child:function() {
    notImplemented("XML.child")
  }, childIndex:function() {
    notImplemented("XML.childIndex")
  }, children:function() {
    notImplemented("XML.children")
  }, comments:function() {
    notImplemented("XML.comments")
  }, contains:function() {
    notImplemented("XML.contains")
  }, copy:function() {
    notImplemented("XML.copy")
  }, descendants:function() {
    notImplemented("XML.descendants")
  }, elements:function() {
    notImplemented("XML.elements")
  }, hasComplexContent:function() {
    notImplemented("XML.hasComplexContent")
  }, hasSimpleContent:function() {
    notImplemented("XML.hasSimpleContent")
  }, inScopeNamespaces:function() {
    notImplemented("XML.inScopeNamespaces")
  }, insertChildAfter:function() {
    notImplemented("XML.insertChildAfter")
  }, insertChildBefore:function() {
    notImplemented("XML.insertChildBefore")
  }, localName:function() {
    notImplemented("XML.localName")
  }, name:function() {
    notImplemented("XML.name")
  }, _namespace:function() {
    notImplemented("XML._namespace")
  }, namespaceDeclarations:function() {
    notImplemented("XML.namespaceDeclarations")
  }, nodeKind:function() {
    notImplemented("XML.nodeKind")
  }, normalize:function() {
    notImplemented("XML.normalize")
  }, parent:function() {
    notImplemented("XML.parent")
  }, processingInstructions:function() {
    notImplemented("XML.processingInstructions")
  }, prependChild:function() {
    notImplemented("XML.prependChild")
  }, removeNamespace:function() {
    notImplemented("XML.removeNamespace")
  }, replace:function() {
    notImplemented("XML.replace")
  }, setChildren:function() {
    notImplemented("XML.setChildren")
  }, setLocalName:function() {
    notImplemented("XML.setLocalName")
  }, setName:function() {
    notImplemented("XML.setName")
  }, setNamespace:function() {
    notImplemented("XML.setNamespace")
  }, text:function() {
    notImplemented("XML.text")
  }, toXMLString:function() {
    notImplemented("XML.toXMLString")
  }, notification:function() {
    notImplemented("XML.notification")
  }, setNotification:function() {
    notImplemented("XML.setNotification")
  }}};
  return g
}
function XMLListClass(a, b, d, e) {
  XMLList = function() {
  };
  a = new a.domain.system.Class("XMLList", XMLList, Domain.passthroughCallable(XMLList));
  a.extend(e);
  a.native = {"static":{}, instance:{toString:function() {
    notImplemented("XMLList.toString")
  }, hasOwnProperty:function() {
    notImplemented("XMLList.hasOwnProperty")
  }, propertyIsEnumerable:function() {
    notImplemented("XMLList.propertyIsEnumerable")
  }, attribute:function() {
    notImplemented("XMLList.attribute")
  }, attributes:function() {
    notImplemented("XMLList.attributes")
  }, child:function() {
    notImplemented("XMLList.child")
  }, children:function() {
    notImplemented("XMLList.children")
  }, comments:function() {
    notImplemented("XMLList.comments")
  }, contains:function() {
    notImplemented("XMLList.contains")
  }, copy:function() {
    notImplemented("XMLList.copy")
  }, descendants:function() {
    notImplemented("XMLList.descendants")
  }, elements:function() {
    notImplemented("XMLList.elements")
  }, hasComplexContent:function() {
    notImplemented("XMLList.hasComplexContent")
  }, hasSimpleContent:function() {
    notImplemented("XMLList.hasSimpleContent")
  }, length:function() {
    notImplemented("XMLList.length")
  }, name:function() {
    notImplemented("XMLList.name")
  }, normalize:function() {
    notImplemented("XMLList.normalize")
  }, parent:function() {
    notImplemented("XMLList.parent")
  }, processingInstructions:function() {
    notImplemented("XMLList.processingInstructions")
  }, text:function() {
    notImplemented("XMLList.text")
  }, toXMLString:function() {
    notImplemented("XMLList.toXMLString")
  }, addNamespace:function() {
    notImplemented("XMLList.addNamespace")
  }, appendChild:function() {
    notImplemented("XMLList.appendChild")
  }, childIndex:function() {
    notImplemented("XMLList.childIndex")
  }, inScopeNamespaces:function() {
    notImplemented("XMLList.inScopeNamespaces")
  }, insertChildAfter:function() {
    notImplemented("XMLList.insertChildAfter")
  }, insertChildBefore:function() {
    notImplemented("XMLList.insertChildBefore")
  }, nodeKind:function() {
    notImplemented("XMLList.nodeKind")
  }, _namespace:function() {
    notImplemented("XMLList._namespace")
  }, localName:function() {
    notImplemented("XMLList.localName")
  }, namespaceDeclarations:function() {
    notImplemented("XMLList.namespaceDeclarations")
  }, prependChild:function() {
    notImplemented("XMLList.prependChild")
  }, removeNamespace:function() {
    notImplemented("XMLList.removeNamespace")
  }, replace:function() {
    notImplemented("XMLList.replace")
  }, setChildren:function() {
    notImplemented("XMLList.setChildren")
  }, setLocalName:function() {
    notImplemented("XMLList.setLocalName")
  }, setName:function() {
    notImplemented("XMLList.setName")
  }, setNamespace:function() {
    notImplemented("XMLList.setNamespace")
  }}};
  return a
}
function QNameClass(a, b, d, e) {
  function f() {
  }
  a = new a.domain.system.Class("QName", f, Domain.passthroughCallable(f));
  a.extend(e);
  a.native = {"static":{}, instance:{localName:{get:function() {
    notImplemented("QName.localName");
    return this._localName
  }}, uri:{get:function() {
    notImplemented("QName.uri");
    return this._uri
  }}}};
  return a
}
function debugBreak(a) {
  print("\u001b[91mdebugBreak: " + a + "\u001b[0m")
}
var natives = function() {
  function a(a, d, e) {
    function f(a, e) {
      a = b(a);
      for(var g = new r(a), l = 0;l < a;l++) {
        g[l] = d ? d.defaultValue : void 0
      }
      g[k] = !!e;
      return g
    }
    var r = createNewGlobalObject().Array, v = r.prototype;
    if(d) {
      var s = d.coerce;
      v.indexGet = function(a) {
        return this[a]
      };
      v.indexSet = function(a, b) {
        this[a] = s(b)
      }
    }
    f.prototype = v;
    var u = new a.domain.system.Class(d ? "Vector$" + d.classInfo.instanceInfo.name.name : "Vector", f, g(f));
    defineReadOnlyProperty(r.prototype, "class", u);
    u.extendBuiltin(e);
    u.native = {instance:{fixed:{get:function() {
      return this["vm vector is fixed"]
    }, set:function(a) {
      this[k] = a
    }}, length:{get:function() {
      return this.length
    }, set:function(a) {
      this.length = a
    }}, pop:function() {
      if(this["vm vector is fixed"]) {
        var b = Errors.VectorFixedError;
        a.throwErrorFromVM("RangeError", getErrorMessage(b.code), b.code)
      }else {
        if(0 === this.length) {
          return d.defaultValue
        }
      }
      return v.pop.call(this, arguments)
    }, push:v.push, shift:v.shift, unshift:v.unshift, _reverse:v.reverse, _every:v.every, _filter:v.filter, _forEach:v.forEach, _map:v.map, _some:v.some, _sort:v.sort}};
    u.vectorType = d;
    u.coerce = function(a) {
      return a
    };
    u.isInstanceOf = function() {
      return!0
    };
    u.isInstance = function(a) {
      return null === a || "object" !== typeof a ? !1 : !this.instance.vectorType && a.class.vectorType ? !0 : this.instance.prototype.isPrototypeOf(a)
    };
    return u
  }
  function b(a) {
    return Number(a) | 0
  }
  function d(a) {
    return Number(a) >>> 0
  }
  function e(a) {
    var b = {__glue__:{script:{instance:{message:"public message", name:"public name"}}, "native":{instance:{getStackTrace:function() {
      return"TODO: getStackTrace"
    }}, "static":{getErrorMessage:getErrorMessage}}}};
    return function(d, e, f, g) {
      d = new d.domain.system.Class(a, f);
      d.extend(g);
      "Error" === a && d.link(b);
      return d
    }
  }
  function f(a) {
    return function() {
      return a
    }
  }
  var g = Domain.passthroughCallable, k = "vm vector is fixed";
  return{print:f(print), notImplemented:f(notImplemented), debugBreak:f(debugBreak), decodeURI:f(decodeURI), decodeURIComponent:f(decodeURIComponent), encodeURI:f(encodeURI), encodeURIComponent:f(encodeURIComponent), isNaN:f(isNaN), isFinite:f(isFinite), parseInt:f(parseInt), parseFloat:f(parseFloat), escape:f(escape), unescape:f(unescape), isXMLName:f("undefined" !== typeof isXMLName ? isXMLName : function() {
    notImplemented("Chrome doesn't support isXMLName.")
  }), Function:Function, String:String, Array:Array, Number:Number, Boolean:Boolean, Math:Math, Date:Date, RegExp:RegExp, Object:Object, ObjectClass:function(a) {
    a = new a.domain.system.Class("Object", Object, g(Object));
    a.native = {instance:{length:{get:function() {
      return this.length
    }, set:function(a) {
      this.length = a
    }}, isPrototypeOf:Object.prototype.isPrototypeOf, hasOwnProperty:function(a) {
      if(!a) {
        return!1
      }
      a = Multiname.getPublicQualifiedName(a);
      return this.hasOwnProperty(a) ? !0 : Object.getPrototypeOf(this).hasOwnProperty(a)
    }, propertyIsEnumerable:function(a) {
      if(!a) {
        return!1
      }
      a = Multiname.getPublicQualifiedName(a);
      return Object.prototype.propertyIsEnumerable.call(this, a)
    }}, "static":{_setPropertyIsEnumerable:function(a, b) {
      b = Multiname.getPublicQualifiedName(b);
      var d = Object.getOwnPropertyDescriptor(a, b);
      d.enumerable = !1;
      Object.defineProperty(a, b, d)
    }}};
    a.dynamicPrototype = Object.prototype;
    a.defaultValue = null;
    a.coerce = function(a) {
      return null === a || void 0 === a ? null : "string" === typeof a ? a : Object(a)
    };
    a.isInstanceOf = function(a) {
      return null === a ? !1 : !0
    };
    a.isInstance = function(a) {
      return null === a || void 0 === a ? !1 : !0
    };
    return a
  }, Class:function(a, b, d, e) {
    a = a.domain.system.Class;
    a.debugName = "Class";
    a.prototype.extendBuiltin.call(a, e);
    a.coerce = function(a) {
      return a
    };
    a.isInstanceOf = function() {
      return!0
    };
    a.isInstance = function() {
      return!0
    };
    return a
  }, NamespaceClass:function(a, b, d, e) {
    function f(a, b) {
      void 0 === b && (b = a, a = void 0);
      if(void 0 !== a) {
        "function" === typeof isXMLName && (a = String(a)), b = String(b)
      }else {
        if(void 0 !== b && b.constructor === ShumwayNamespace) {
          return b.clone()
        }
      }
      var d = ShumwayNamespace.createNamespace(b);
      d.prefix = a;
      return d
    }
    a = new a.domain.system.Class("Namespace", f, g(f));
    a.extendNative(e, ShumwayNamespace);
    e = ShumwayNamespace.prototype;
    a.native = {instance:{prefix:{get:e.getPrefix}, uri:{get:e.getURI}}};
    return a
  }, FunctionClass:function(a, b, d, e) {
    a = new a.domain.system.Class("Function", Function, g(Function));
    a.extendBuiltin(e);
    a.native = {instance:{prototype:{get:function() {
      return this.prototype
    }, set:function(a) {
      this.prototype = a
    }}, length:{get:function() {
      return this.hasOwnProperty("vm length") ? this["vm length"] : this.length
    }}, call:Function.prototype.call, apply:Function.prototype.apply}};
    a.coerce = function(a) {
      return a
    };
    a.isInstanceOf = function(a) {
      return"function" === typeof a
    };
    a.isInstance = function(a) {
      return"function" === typeof a
    };
    return a
  }, MethodClosureClass:function(a, b, d, e) {
    a = new a.domain.system.Class("MethodClosure", a.domain.system.MethodClosure);
    a.extendBuiltin(e);
    return a
  }, BooleanClass:function(a, b, d, e) {
    a = new a.domain.system.Class("Boolean", Boolean, g(Boolean));
    a.extendBuiltin(e);
    a.native = {instance:{toString:Boolean.prototype.toString, valueOf:Boolean.prototype.valueOf}};
    a.coerce = Boolean;
    a.isInstanceOf = function(a) {
      return"boolean" === typeof a || a instanceof Boolean
    };
    a.isInstance = function(a) {
      return"boolean" === typeof a || a instanceof Boolean ? !0 : !1
    };
    return a
  }, StringClass:function(a, b, d, e) {
    a = new a.domain.system.Class("String", String, g(String));
    a.extendBuiltin(e);
    var f = String.prototype;
    a.native = {instance:{length:{get:function() {
      return this.length
    }}, indexOf:f.indexOf, lastIndexOf:f.lastIndexOf, charAt:f.charAt, charCodeAt:f.charCodeAt, concat:f.concat, localeCompare:f.localeCompare, match:function(a) {
      return void 0 === a ? null : this.match(a)
    }, replace:f.replace, search:function(a) {
      return void 0 === a ? -1 : this.search(a)
    }, slice:f.slice, split:f.split, substr:f.substr, substring:f.substring, toLowerCase:f.toLowerCase, toLocaleLowerCase:f.toLocaleLowerCase, toUpperCase:function() {
      var a = f.toUpperCase.apply(this);
      return a = a.replace(/\u039C/g, String.fromCharCode(181))
    }, toLocaleUpperCase:function() {
      var a = f.toLocaleUpperCase.apply(this);
      return a = a.replace(/\u039C/g, String.fromCharCode(181))
    }, toString:f.toString, valueOf:f.valueOf}, "static":String};
    a.isInstance = function(a) {
      return null !== a && void 0 !== a && "string" === typeof a.valueOf()
    };
    a.coerce = function(a) {
      return null === a || void 0 === a ? null : String(a)
    };
    a.isInstanceOf = function(a) {
      return Object(a) instanceof String
    };
    a.isInstance = function(a) {
      return Object(a) instanceof String
    };
    return a
  }, NumberClass:function(a, b, d, e) {
    a = new a.domain.system.Class("Number", Number, g(Number));
    a.extendBuiltin(e);
    a.native = {instance:Number.prototype};
    a.defaultValue = Number(0);
    a.isInstance = function(a) {
      return null !== a && void 0 !== a && "number" === typeof a.valueOf()
    };
    a.coerce = Number;
    a.isInstanceOf = function(a) {
      return Object(a) instanceof Number
    };
    a.isInstance = function(a) {
      return Object(a) instanceof Number
    };
    return a
  }, intClass:function(a, d, e, f) {
    a = new a.domain.system.Class("int", b, g(b));
    a.extendBuiltin(f);
    a.defaultValue = 0;
    a.coerce = b;
    a.isInstanceOf = function() {
      return!1
    };
    a.isInstance = function(a) {
      a instanceof Number && (a = a.valueOf());
      return(a | 0) === a
    };
    return a
  }, uintClass:function(a, b, e, f) {
    a = new a.domain.system.Class("uint", d, g(d));
    a.extend(f);
    a.defaultValue = 0;
    a.isInstanceOf = function() {
      return!1
    };
    a.isInstance = function(a) {
      a instanceof Number && (a = a.valueOf());
      return a >>> 0 === a
    };
    a.coerce = d;
    return a
  }, ArrayClass:function(a, b, d, e) {
    a = new a.domain.system.Class("Array", Array, g(Array));
    a.extendBuiltin(e);
    e = Array.prototype;
    a.native = {instance:{length:{get:function() {
      return this.length
    }, set:function(a) {
      this.length = a
    }}, join:e.join, pop:e.pop, push:e.push, reverse:e.reverse, concat:e.concat, shift:e.shift, slice:e.slice, unshift:e.unshift, splice:e.splice, sort:e.sort, indexOf:e.indexOf, lastIndexOf:e.lastIndexOf, every:e.every, filter:e.filter, forEach:e.forEach, map:e.map, some:e.some}};
    a.coerce = function(a) {
      return a
    };
    a.isInstanceOf = function() {
      return!0
    };
    return a
  }, VectorClass:function(b, d, e, f) {
    return a(b, void 0, f)
  }, ObjectVectorClass:function(b, d, e, f) {
    return a(b, b.domain.getClass("Object"), f)
  }, IntVectorClass:function(b, d, e, f) {
    return a(b, b.domain.getClass("int"), f)
  }, UIntVectorClass:function(b, d, e, f) {
    return a(b, b.domain.getClass("uint"), f)
  }, DoubleVectorClass:function(b, d, e, f) {
    return a(b, b.domain.getClass("Number"), f)
  }, ByteArrayClass:function(a, b, d, e) {
    function f() {
      this.a = new ArrayBuffer(128);
      this.position = this.length = 0;
      this.cacheViews();
      this.le = this.nativele = 1 === (new Int8Array((new Int32Array([])).buffer))[0]
    }
    function k() {
      a.throwErrorFromVM("flash.errors.EOFError", "End of file was encountered.")
    }
    function s(a, b, d) {
      a.position + d > a.length && k();
      b = a.view[b](a.position, a.le);
      a.position += d;
      return b
    }
    function u(a, b, d, e) {
      d = a.position + d;
      a.ensureCapacity(d);
      a.view[b](a.position, e, a.le);
      a.position = d;
      d > a.length && (a.length = d)
    }
    b = new a.domain.system.Class("ByteArray", f, g(f));
    b.extendBuiltin(e);
    e = f.prototype;
    e.indexGet = function(a) {
      return this.uint8v[a]
    };
    e.indexSet = function(a, b) {
      this.uint8v[a] = b
    };
    e.cacheViews = function() {
      var a = this.a;
      this.int8v = new Int8Array(a);
      this.uint8v = new Uint8Array(a);
      this.view = new DataView(a)
    };
    e.ensureCapacity = function(a) {
      var b = this.a;
      if(b.byteLength < a) {
        for(b = b.byteLength;b < a;) {
          b *= 2
        }
        a = new ArrayBuffer(b);
        b = this.int8v;
        this.a = a;
        this.cacheViews();
        this.int8v.set(b)
      }
    };
    e.clear = function() {
      this.position = this.length = 0
    };
    e.readBoolean = function() {
      this.position + 1 > this.length && k();
      return 0 !== this.int8v[this.position++]
    };
    e.readByte = function() {
      this.position + 1 > this.length && k();
      return this.int8v[this.position++]
    };
    e.readUnsignedByte = function() {
      this.position + 1 > this.length && k();
      return this.uint8v[this.position++]
    };
    e.readBytes = function(a, b, d) {
      var e = this.position;
      e + d > this.length && k();
      a.int8v.set(new Int8Array(this.a, e, d), b);
      this.position += d
    };
    e.writeBoolean = function(a) {
      var b = this.position + 1;
      this.ensureCapacity(b);
      this.int8v[this.position++] = a ? 1 : 0;
      b > this.length && (this.length = b)
    };
    e.writeByte = function(a) {
      var b = this.position + 1;
      this.ensureCapacity(b);
      this.int8v[this.position++] = a;
      b > this.length && (this.length = b)
    };
    e.writeUnsignedByte = function(a) {
      var b = this.position + 1;
      this.ensureCapacity(b);
      this.uint8v[this.position++] = a;
      b > this.length && (this.length = b)
    };
    e.writeRawBytes = function(a) {
      var b = this.position + a.length;
      this.ensureCapacity(b);
      this.int8v.set(a, this.position);
      this.position = b;
      b > this.length && (this.length = b)
    };
    e.writeBytes = function(a, b, d) {
      b || d ? this.writeRawBytes(new Int8Array(a.a, b, d)) : this.writeRawBytes(a.int8v)
    };
    e.readDouble = function() {
      return s(this, "getFloat64", 8)
    };
    e.readFloat = function() {
      return s(this, "getFloat32", 4)
    };
    e.readInt = function() {
      return s(this, "getInt32", 4)
    };
    e.readShort = function() {
      return s(this, "getInt16", 2)
    };
    e.readUnsignedInt = function() {
      return s(this, "getUint32", 4)
    };
    e.readUnsignedShort = function() {
      return s(this, "getUint16", 2)
    };
    e.writeDouble = function(a) {
      u(this, "setFloat64", 8, a)
    };
    e.writeFloat = function(a) {
      u(this, "setFloat32", 4, a)
    };
    e.writeInt = function(a) {
      u(this, "setInt32", 4, a)
    };
    e.writeShort = function(a) {
      u(this, "setInt16", 2, a)
    };
    e.writeUnsignedInt = function(a) {
      u(this, "setUint32", 4, a)
    };
    e.writeUnsignedShort = function(a) {
      u(this, "setUint16", 2, a)
    };
    e.readUTF = function() {
      return this.readUTFBytes(this.readShort())
    };
    e.readUTFBytes = function(a) {
      var b = this.position;
      b + a > this.length && k();
      this.position += a;
      return utf8encode(new Int8Array(this.a, b, a))
    };
    e.writeUTF = function(a) {
      a = utf8decode(a);
      this.writeShort(a.length);
      this.writeRawBytes(a)
    };
    e.writeUTFBytes = function(a) {
      a = utf8decode(a);
      this.writeRawBytes(a)
    };
    e.toString = function() {
      return utf8encode(new Int8Array(this.a, 0, this.length))
    };
    b.native = {instance:{length:{get:function() {
      return this.length
    }, set:function(a) {
      a > this.a.byteLength && this.ensureSize(a);
      this.length = a
    }}, bytesAvailable:{get:function() {
      return this.a.byteLength - this.position
    }}, position:{get:function() {
      return this.position
    }, set:function(a) {
      this.position = a
    }}, endian:{get:function() {
      return this.le ? "littleEndian" : "bigEndian"
    }, set:function(a) {
      this.le = "littleEndian" === a
    }}, readBytes:e.readBytes, writeBytes:e.writeBytes, writeBoolean:e.writeBoolean, writeByte:e.writeByte, writeShort:e.writeShort, writeInt:e.writeInt, writeUnsignedInt:e.writeUnsignedInt, writeDouble:e.writeDouble, writeMultiByte:e.writeMultiByte, writeUTF:e.writeUTF, writeUTFBytes:e.writeUTFBytes, readBoolean:e.readBoolean, readByte:e.readByte, readUnsignedByte:e.readUnsignedByte, readShort:e.readShort, readUnsignedShort:e.readUnsignedShort, readInt:e.readInt, readUnsignedInt:e.readUnsignedInt, 
    readFloat:e.readFloat, readDouble:e.readDouble, readMultiByte:e.readMultiByte, readUTF:e.readUTF, readUTFBytes:e.readUTFBytes, toString:e.toString}};
    return b
  }, ErrorClass:e("Error"), DefinitionErrorClass:e("DefinitionError"), EvalErrorClass:e("EvalError"), RangeErrorClass:e("RangeError"), ReferenceErrorClass:e("ReferenceError"), SecurityErrorClass:e("SecurityError"), SyntaxErrorClass:e("SyntaxError"), TypeErrorClass:e("TypeError"), URIErrorClass:e("URIError"), VerifyErrorClass:e("VerifyError"), UninitializedErrorClass:e("UninitializedError"), ArgumentErrorClass:e("ArgumentError"), DateClass:function(a, b, d, e) {
    a = new a.domain.system.Class("Date", Date, g(Date));
    a.extendBuiltin(e);
    a.native = {instance:Date.prototype, "static":Date};
    return a
  }, MathClass:function(a) {
    a = new a.domain.system.Class("Math");
    a.native = {"static":Math};
    return a
  }, RegExpClass:function(a, b, d, e) {
    function f(a, b) {
      if(b) {
        var d, e = {};
        0 <= b.indexOf("s") && (a = a.replace(/\./, "(.|\n)"), b = stripFlags(b, "s"), e.push({key:"dotall", value:!0}));
        d = RegExp(a, b);
        for(var g = 0, k = e.length;g < k;g++) {
          var l = e[g];
          d[l.key] = l.value
        }
        return d
      }
      return RegExp(a, b)
    }
    f.prototype = RegExp.prototype;
    a = new a.domain.system.Class("RegExp", f, g(f));
    a.extendBuiltin(e);
    e = RegExp.prototype;
    a.native = {instance:{global:{get:function() {
      return this.global
    }}, source:{get:function() {
      return this.source
    }}, ignoreCase:{get:function() {
      return this.ignoreCase
    }}, multiline:{get:function() {
      return this.multiline
    }}, lastIndex:{get:function() {
      return this.lastIndex
    }, set:function(a) {
      this.lastIndex = a
    }}, dotall:{get:function() {
      return this.dotall
    }}, extended:{get:function() {
      return this.extended
    }}, exec:e.exec, test:e.test}};
    return a
  }, DictionaryClass:function(a, b, d, e) {
    function f(a) {
      this.weakKeys = a;
      this.map = new WeakMap;
      a || (this.keys = [])
    }
    a = new a.domain.system.Class("Dictionary", f, g(f));
    a.extendNative(e, f);
    e = f.prototype;
    defineReadOnlyProperty(e, "canHandleProperties", !0);
    defineNonEnumerableProperty(e, "set", function(a, b) {
      this.map.set(Object(a), b);
      !this.weakKeys && 0 > this.keys.indexOf(a) && this.keys.push(a)
    });
    defineNonEnumerableProperty(e, "get", function(a) {
      return this.map.get(Object(a))
    });
    defineNonEnumerableProperty(e, "delete", function(a) {
      this.map.delete(Object(a), value);
      var b;
      !this.weakKeys && 0 <= (b = this.keys.indexOf(a)) && this.keys.splice(b, 1)
    });
    defineNonEnumerableProperty(e, "enumProperties", function() {
      return this.keys
    });
    a.native = {instance:{init:function() {
    }}};
    return a
  }, XMLClass:XMLClass, XMLListClass:XMLListClass, QNameClass:QNameClass, ShumwayClass:function(a, b, d, e) {
    function f() {
    }
    a = new a.domain.system.Class("Shumway", f, g(f));
    a.extend(e);
    a.native = {"static":{info:function(a) {
      console.info(a)
    }, json:function(a) {
      return JSON.stringify(a)
    }, eval:function(a) {
      return eval(a)
    }, "debugger":function() {
      debugger
    }}};
    return a
  }, CapabilitiesClass:function(a, b, d, e) {
    function f() {
    }
    a = new a.domain.system.Class("Capabilities", f, g(f));
    a.extend(e);
    a.native = {"static":{playerType:{get:function() {
      return"AVMPlus"
    }}}};
    return a
  }, ApplicationDomainClass:function(a, b, d, e) {
    a = new a.domain.system.Class("ApplicationDomain", d, g(d));
    a.extendBuiltin(e);
    a.native = {instance:{ctor:function(a) {
      var b = null;
      a instanceof Domain && (b = a, a = !a.base ? null : a.base._getScriptObject());
      a = a ? a.dom : Runtime.stack.top().domain.system;
      this.dom = b || new Domain(a.vm, a);
      this.dom.scriptObject = this
    }, parentDomain:{get:function() {
      var a = this.dom.base;
      if(a) {
        return a.scriptObject || (a.scriptObject = new d), a.scriptObject
      }
    }}, getDefinition:function(a) {
      a = a.replace("::", ".");
      return this.dom.getProperty(Multiname.fromSimpleName(a), !1, !0)
    }, hasDefinition:function(a) {
      if(!a) {
        return!1
      }
      a = a.replace("::", ".");
      return!!this.dom.findProperty(Multiname.fromSimpleName(a), !1, !1)
    }}, "static":{currentDomain:{get:function() {
      var a = Runtime.currentDomain();
      a.scriptObject || (a.scriptObject = new d);
      return a.scriptObject
    }}}};
    return a
  }, getQualifiedClassName:f(function(a) {
    switch(typeof a) {
      case "number":
        return(a | 0) === a ? "int" : "Number";
      case "string":
        return"String";
      case "boolean":
        return"Boolean";
      case "object":
        if(a instanceof Date) {
          return"Date"
        }
        var b;
        a.class ? b = a.class : a.classInfo && (b = a);
        if(b) {
          return a = b.classInfo.instanceInfo.name, (b = a.namespaces[0].originalURI) ? b + "::" + a.name : a.name
        }
    }
    return notImplemented(a + " (" + typeof a + ")")
  }), getQualifiedSuperclassName:f(function(a) {
    switch(typeof a) {
      case "number":
      ;
      case "string":
      ;
      case "boolean":
        return"Object";
      case "object":
        if(a instanceof Date) {
          return"Object"
        }
        var b;
        a.class ? b = a.class : a.classInfo && (b = a);
        return b && b.baseClass ? (a = b.baseClass.classInfo.instanceInfo.name, (b = a.namespaces[0].originalURI) ? b + "::" + a.name : a.name) : "Object"
    }
    return notImplemented(a + " (superOf " + typeof a + ")")
  }), getDefinitionByName:f(function(a) {
    a = a.replace("::", ".");
    return Runtime.currentDomain().getClass(a)
  }), original:jsGlobal["vm originals"]}
}();
function getNative(a) {
  a = a.split(".");
  for(var b = natives, d = 0, e = a.length;d < e;d++) {
    b = b && b[a[d]]
  }
  release || !0;
  return b
}
var disassemblerOptions = systemOptions.register(new OptionSet("Disassembler Options")), filter = disassemblerOptions.register(new Option("f", "filter", "string", "SpciMsmNtu", "[S]ource, constant[p]ool, [c]lasses, [i]nstances, [M]etadata, [s]cripts, [m]ethods, multi[N]ames, S[t]atistics, [u]tf"));
function traceArray(a, b, d, e) {
  0 !== d.length && (a.enter(b + " {"), d.forEach(function(b) {
    b.trace(a, e)
  }), a.leave("}"))
}
AbcFile.prototype.trace = function(a) {
  0 <= filter.value.indexOf("p") && this.constantPool.trace(a);
  0 <= filter.value.indexOf("N") && this.constantPool.traceMultinamesOnly(a);
  0 <= filter.value.indexOf("c") && traceArray(a, "classes", this.classes);
  0 <= filter.value.indexOf("i") && traceArray(a, "instances", this.instances);
  0 <= filter.value.indexOf("M") && traceArray(a, "metadata", this.metadata);
  0 <= filter.value.indexOf("s") && traceArray(a, "scripts", this.scripts);
  0 <= filter.value.indexOf("m") && traceArray(a, "methods", this.methods, this);
  0 <= filter.value.indexOf("S") && traceSource(a, this);
  0 <= filter.value.indexOf("t") && traceStatistics(a, this);
  0 <= filter.value.indexOf("u") && print(JSON.stringify({strings:this.constantPool.strings, positionAfterUTFStrings:this.constantPool.positionAfterUTFStrings}, null, 2))
};
ConstantPool.prototype.trace = function(a) {
  a.enter("constantPool {");
  for(var b in this) {
    "namespaces" === b ? (a.enter("namespaces {"), this.namespaces.forEach(function(b, e) {
      a.writeLn(("" + e).padRight(" ", 3) + (b ? b.toString() : "*"))
    }), a.leave("}")) : this[b] instanceof Array && (a.enter(b + " " + this[b].length + " {"), a.writeArray(this[b]), a.leave("}"))
  }
  a.leave("}")
};
ConstantPool.prototype.traceMultinamesOnly = function(a) {
  a.writeArray(this.multinames, null, !0)
};
ClassInfo.prototype.trace = function(a) {
  a.enter("class " + this + " {");
  traceArray(a, "traits", this.traits);
  a.leave("}")
};
MetaDataInfo.prototype.trace = function(a) {
  a.enter(this + " {");
  this.items.forEach(function(b) {
    a.writeLn((b.key ? b.key + ": " : "") + '"' + b.value + '"')
  });
  a.leave("}")
};
InstanceInfo.prototype.trace = function(a) {
  a.enter("instance " + this + " {");
  traceArray(a, "traits", this.traits);
  a.leave("}")
};
ScriptInfo.prototype.trace = function(a) {
  a.enter("script " + this + " {");
  traceArray(a, "traits", this.traits);
  a.leave("}")
};
Trait.prototype.trace = function(a) {
  if(this.metadata) {
    for(var b in this.metadata) {
      this.metadata.hasOwnProperty(b) && this.metadata[b].trace(a)
    }
  }
  a.writeLn(this)
};
function traceAbc(a, b) {
  b.trace(a)
}
function traceOperand(a, b, d) {
  var e = 0;
  switch(a.size) {
    case "s08":
      e = d.readS8();
      break;
    case "u08":
      e = d.readU8();
      break;
    case "s16":
      e = d.readS16();
      break;
    case "s24":
      e = d.readS24();
      break;
    case "u30":
      e = d.readU30();
      break;
    case "u32":
      e = d.readU32();
      break;
    default:
      release || !0
  }
  d = "";
  switch(a.type) {
    case "":
      break;
    case "I":
      d = b.constantPool.ints[e];
      break;
    case "U":
      d = b.constantPool.uints[e];
      break;
    case "D":
      d = b.constantPool.doubles[e];
      break;
    case "S":
      d = b.constantPool.strings[e];
      break;
    case "N":
      d = b.constantPool.namespaces[e];
      break;
    case "CI":
      d = b.classes[e];
      break;
    case "M":
      return b.constantPool.multinames[e];
    default:
      d = "?"
  }
  return a.name + ":" + e + ("" === d ? "" : " (" + d + ")")
}
function traceOperands(a, b, d, e) {
  e = e || !1;
  var f = d.position, g = "";
  null === a.operands ? g = "null" : a.operands.forEach(function(e, f) {
    g += traceOperand(e, b, d);
    f < a.operands.length - 1 && (g += ", ")
  });
  e && d.seek(f);
  return g
}
MethodInfo.prototype.trace = function(a, b) {
  a.enter("method" + (this.name ? " " + this.name : "") + " {");
  a.writeLn("flags: " + getFlags(this.flags, "NEED_ARGUMENTS NEED_ACTIVATION NEED_REST HAS_OPTIONAL  NATIVE SET_DXN HAS_PARAM_NAMES".split(" ")));
  a.writeLn("parameters: " + this.parameters.map(function(a) {
    return(a.type ? Multiname.getQualifiedName(a.type) + "::" : "") + a.name
  }));
  if(this.code) {
    var d = new AbcStream(this.code);
    traceArray(a, "traits", this.traits);
    for(a.enter("code {");0 < d.remaining();) {
      var e = d.readU8(), f = opcodeTable[e], g;
      g = ("" + d.position).padRight(" ", 6);
      switch(e) {
        case 27:
          g += f.name + ": defaultOffset: " + d.readS24();
          e = d.readU30();
          g += ", caseCount: " + e;
          for(f = 0;f < e + 1;f++) {
            g += " offset: " + d.readS24()
          }
          a.writeLn(g);
          break;
        default:
          f ? (g += f.name.padRight(" ", 20), f.operands ? (0 < f.operands.length && (g += traceOperands(f, b, d)), a.writeLn(g)) : release || !0) : release || !0
      }
    }
    a.leave("}")
  }
  a.leave("}")
};
var SourceTracer = function() {
  function a(a) {
    return void 0 === a ? "undefined" : null === a ? "null" : "string" === typeof a ? '"' + a + '"' : String(a)
  }
  function b(b, d) {
    return b.parameters.map(function(b) {
      var e = b.name;
      d || (b.type && (e += ":" + b.type.getName()), void 0 !== b.value && (e += " = " + a(b.value)));
      return e
    }).join(", ")
  }
  function d(a) {
    this.writer = a
  }
  d.prototype = {traceTraits:function(d, f, g) {
    var k = this.writer, l = this;
    d.forEach(function(d) {
      var e;
      e = Multiname.getAccessModifier(d.name);
      var p = d.name.namespaces[0].originalURI;
      p && ("http://adobe.com/AS3/2006/builtin" === p && (p = "AS3"), e = "public" === e ? g === p ? "" : p : e);
      f && (e += " static");
      d.isSlot() || d.isConst() ? (l.traceMetadata(d.metadata), e = d.isConst() ? e + " const" : e + " var", e += " " + d.name.getName(), d.typeName && (e += ":" + d.typeName.getName()), d.value && (e += " = " + a(d.value)), k.writeLn(e + ";")) : d.isMethod() || d.isGetter() || d.isSetter() ? (l.traceMetadata(d.metadata), p = d.methodInfo, d.attributes & 2 && (e += " override"), p.isNative() && (e += " native"), e = e + " function" + (d.isGetter() ? " get" : d.isSetter() ? " set" : ""), e += " " + 
      d.name.getName(), e += "(" + b(p) + ")", e += p.returnType ? ":" + p.returnType.getName() : "", p.isNative() ? k.writeLn(e + ";") : g ? k.writeLn(e + ";") : k.writeLn(e + ' { notImplemented("' + d.name.getName() + '"); }')) : d.isClass() ? (k.enter("package " + d.classInfo.instanceInfo.name.namespaces[0].originalURI + " {\n"), l.traceMetadata(d.metadata), l.traceClass(d.classInfo), k.leave("\n}"), l.traceClassStub(d)) : notImplemented()
    })
  }, traceClassStub2:function(a) {
    function d(a) {
      var e = [];
      a.forEach(function(a) {
        (a.isMethod() || a.isGetter() || a.isSetter()) && a.methodInfo.isNative() && e.push(a)
      });
      e.forEach(function(a, d) {
        var f = a.methodInfo, k = a.name.getName();
        g.writeLn("// " + k + " :: " + (f.parameters.length ? b(f) : "void") + " -> " + (f.returnType ? f.returnType.getName() : "any"));
        var l;
        l = a.isGetter() ? '"get ' + k + '"' : a.isSetter() ? '"set ' + k + '"' : k;
        g.enter(l + ": function " + k + "(" + b(f, !0) + ") {");
        g.writeLn('  notImplemented("' + m + "." + k + '");');
        g.leave("}" + (d === e.length - 1 ? "" : ",\n"))
      })
    }
    var g = this.writer, k = a.classInfo, l = k.instanceInfo, m = l.name.getName();
    a = a.metadata ? a.metadata.native : null;
    if(!a) {
      return!1
    }
    g.writeLn("Cut and paste the following into `native.js' and edit accordingly");
    g.writeLn("8< --------------------------------------------------------------");
    g.enter("natives." + a.cls + " = function " + a.cls + "(runtime, scope, instance, baseClass) {");
    g.writeLn('var c = new runtime.domain.system.Class("' + m + '", instance, Domain.passthroughCallable(instance));');
    g.writeLn("c.extend(baseClass);\n");
    g.enter("c.nativeStatics = {");
    d(k.traits, !0);
    g.leave("};\n");
    g.enter("c.nativeMethods = {");
    d(l.traits);
    g.leave("};\n");
    g.writeLn("return c;");
    g.leave("};");
    g.writeLn("-------------------------------------------------------------- >8");
    return!0
  }, traceClassStub:function(a) {
    function d(a, e, f) {
      function k(a, d) {
        var e = a.methodInfo, m = a.name.getName(), n = "// (" + (e.parameters.length ? b(e) : "void") + ") -> " + (e.returnType ? e.returnType.getName() : "any"), p = m;
        a.isGetter() ? p = "get" : a.isSetter() && (p = "set");
        g.enter(p + ": function " + m + "(" + b(e, !0) + ") { " + n);
        g.writeLn('notImplemented("' + l + "." + m + '");');
        f || (a.isGetter() ? g.writeLn("return this._" + m + ";") : a.isSetter() && g.writeLn("this._" + m + " = " + e.parameters[0].name + ";"));
        g.leave("}" + (d ? "," : ""))
      }
      var m = a;
      a = {properties:m.filter(function(a) {
        return!e && !(a.isMethod() || a.isGetter() || a.isSetter())
      }), methods:m.filter(function(a) {
        return(a.isMethod() || a.isGetter() || a.isSetter()) && e === a.methodInfo.isNative()
      })};
      var u = [], C = Object.create(null);
      a.methods.forEach(function(a) {
        var b = a.name.getName();
        a.isGetter() || a.isSetter() ? (C[b] || (C[b] = []), C[b].push(a)) : u.push(a)
      });
      for(m = 0;m < u.length;m++) {
        k(u[m], m < u.length - 1)
      }
      for(var q = toKeyValueArray(C), w = 0;w < q.length;w++) {
        g.enter(q[w][0] + ": {");
        for(var x = q[w][1], m = 0;m < x.length;m++) {
          k(x[m], m < x.length - 1)
        }
        g.leave("}" + (w < q.length - 1 ? "," : ""))
      }
      a.properties.forEach(function(b, d) {
        var e = b.name.getName(), f = d === a.properties.length - 1;
        b.name.getNamespace().isPublic() && g.writeLn(e + ": " + ("'public " + b.name.name + "'") + (f ? "" : ","))
      })
    }
    var g = this.writer;
    a = a.classInfo;
    var k = a.instanceInfo, l = k.name.getName();
    g.writeLn("Cut and paste the following glue and edit accordingly.");
    g.writeLn("Class " + k);
    g.writeLn("8< --------------------------------------------------------------");
    var m = k.name.namespaces[0].originalURI;
    g.enter("var " + l + "Definition = (function () {");
    g.enter("return {");
    g.writeLn("// (" + b(k.init, !1) + ")");
    g.writeLn('__class__: "' + m + "." + l + '",');
    g.enter("initialize: function () {");
    g.leave("},");
    g.enter("__glue__: {");
    g.enter("native: {");
    g.enter("static: {");
    d(a.traits, !0, !0);
    g.leave("},");
    g.enter("instance: {");
    d(k.traits, !0);
    g.leave("}");
    g.leave("},");
    g.enter("script: {");
    g.enter("static: {");
    g.writeLn("// ...");
    g.leave("},");
    g.enter("instance: {");
    d(k.traits, !1);
    g.leave("}");
    g.leave("}");
    g.leave("}");
    g.leave("};");
    g.leave("}).call(this);");
    g.writeLn("-------------------------------------------------------------- >8");
    return!0
  }, traceClass:function(a) {
    var d = this.writer, g = a.instanceInfo, k = g.name, l = Multiname.getAccessModifier(k);
    g.isFinal() && (l += " final");
    g.isSealed() || (l += " dynamic");
    l += g.isInterface() ? " interface " : " class ";
    l += k.getName();
    g.superName && "Object" !== g.superName.getName() && (l += " extends " + g.superName.getName());
    g.interfaces.length && (l += " implements " + g.interfaces.map(function(a) {
      return a.getName()
    }).join(", "));
    d.enter(l + " {");
    g.isInterface() || d.writeLn("public function " + k.getName() + "(" + b(g.init) + ") {}");
    var m;
    g.isInterface() && (m = k.namespaces[0].originalURI + ":" + k.name);
    this.traceTraits(a.traits, !0, m);
    this.traceTraits(g.traits, !1, m);
    d.leave("}")
  }, traceMetadata:function(a) {
    var b = this.writer, d;
    for(d in a) {
      a.hasOwnProperty(d) && 0 !== d.indexOf("__") && b.writeLn("[" + d + "(" + a[d].items.map(function(a) {
        return(a.key ? a.key + "=" : "") + '"' + a.value + '"'
      }).join(", ") + ")]")
    }
  }};
  return d
}();
function traceSource(a, b) {
  var d = new SourceTracer(a);
  b.scripts.forEach(function(a) {
    d.traceTraits(a.traits)
  })
}
function traceStatistics(a, b) {
  var d = new metrics.Counter(!0), e = new metrics.Counter(!0), f = new metrics.Counter(!0), g = new metrics.Counter(!0), k = {}, l = {}, m = {};
  b.classes.forEach(function(a) {
    k[a.instanceInfo.name.name] = !0
  });
  b.scripts.forEach(function(a) {
    a.traits.forEach(function(a) {
      if(a.isClass()) {
        var b = a.classInfo.instanceInfo.superName ? a.classInfo.instanceInfo.superName.name : "?";
        b in k || e.count(b);
        a.classInfo.traits.forEach(function(a) {
          a.isMethod() ? l[a.name.name] = !0 : m[a.name.name] = !0
        });
        a.classInfo.instanceInfo.traits.forEach(function(a) {
          a.isMethod() && !(a.attributes & 2) ? l[a.name.name] = !0 : m[a.name.name] = !0
        })
      }
    })
  });
  var n = new metrics.Counter(!0);
  b.methods.forEach(function(a) {
    function e(a) {
      var d = 0;
      switch(a.size) {
        case "s08":
          d = v.readS8();
          break;
        case "u08":
          d = v.readU8();
          break;
        case "s16":
          d = v.readS16();
          break;
        case "s24":
          d = v.readS24();
          break;
        case "u30":
          d = v.readU30();
          break;
        case "u32":
          d = v.readU32();
          break;
        default:
          release || !0
      }
      var f = "";
      switch(a.type) {
        case "":
          break;
        case "I":
          f = b.constantPool.ints[d];
          break;
        case "U":
          f = b.constantPool.uints[d];
          break;
        case "D":
          f = b.constantPool.doubles[d];
          break;
        case "S":
          f = b.constantPool.strings[d];
          break;
        case "N":
          f = b.constantPool.namespaces[d];
          break;
        case "CI":
          f = b.classes[d];
          break;
        case "M":
          f = b.constantPool.multinames[d];
          break;
        default:
          f = "?"
      }
      return f
    }
    if(a.code) {
      for(var v = new AbcStream(a.code);0 < v.remaining();) {
        a = v.readU8();
        var s = opcodeTable[a], u = null;
        if(s) {
          switch(n.count(s.name), s.operands && (u = s.operands.map(e)), a) {
            case 65:
            ;
            case 67:
              continue;
            case 70:
            ;
            case 76:
            ;
            case 79:
            ;
            case 68:
            ;
            case 69:
            ;
            case 78:
              u[0] && !(u[0].name in l) && f.count(u[0].name);
              break;
            case 74:
              u[0] && !(u[0].name in k) && d.count(u[0].name);
              break;
            case 102:
            ;
            case 97:
              u[0] && !(u[0].name in m) && g.count(u[0].name)
          }
        }
      }
    }
  });
  a.writeLn(JSON.stringify({definedClasses:k, definedMethods:l, definedProperties:m, libraryClasses:d.counts, librarySuperClasses:e.counts, libraryMethods:f.counts, libraryProperties:g.counts, operations:n.counts}, null, 2))
}
var interpreterOptions = systemOptions.register(new OptionSet("Interpreter Options")), traceInterpreter = interpreterOptions.register(new Option("ti", "traceInterpreter", "number", 0, "trace interpreter execution")), interpreterBytecodeCount = 0, Interpreter = function() {
  function a(a) {
    this.abc = a
  }
  function b(a, b) {
    if(a.classInfo) {
      var d = a.classInfo.instanceInfo.name.qualifiedName;
      if(d === Multiname.getPublicQualifiedName("String")) {
        return String.apply(null, b)
      }
      if(d === Multiname.getPublicQualifiedName("Boolean")) {
        return Boolean.apply(null, b)
      }
      if(d === Multiname.getPublicQualifiedName("Number")) {
        return Number.apply(null, b)
      }
    }
    return new (Function.bind.apply(a.instance, [, ].concat(b)))
  }
  function d(a, b) {
    if(Multiname.isRuntime(b)) {
      var d = b.namespaces, e = b.name;
      Multiname.isRuntimeName(b) && (e = a.pop());
      if(isNumeric(e)) {
        return release || !0, e
      }
      Multiname.isRuntimeNamespace(b) && (d = [a.pop()]);
      b = new Multiname(d, e)
    }
    release || !0;
    return b
  }
  var e = [].slice;
  a.prototype = {interpretMethod:function(a, g, k, l) {
    release || !0;
    Counter.count("Interpret Method");
    var m = this.abc, n = m.constantPool.ints, p = m.constantPool.uints, r = m.constantPool.doubles, v = m.constantPool.strings, s = m.methods, u = m.constantPool.multinames, C = m.runtime, q = m.domain, w = Runtime.stack, x = g.exceptions;
    a = [a];
    var H = k, y = 0, t = [], N = g.parameters.length, L = l.length;
    w.push(C);
    for(var M, J = 0;J < N;J++) {
      var O = g.parameters[J];
      M = J < L ? l[J] : O.value;
      O.type && !O.type.isAnyName() && (M = coerce(M, q.getProperty(O.type, !0, !0)));
      a.push(M)
    }
    g.needsRest() ? a.push(e.call(l, N)) : g.needsArguments() && a.push(e.call(l, 0));
    var A, D, z, E, Q, F, B, N = g.analysis.bytecodes, O = L = void 0;
    0 < traceInterpreter.value && (g.name && Multiname.getQualifiedName(g.name), g.trace(new IndentingWriter, m));
    var G = 0, K = N.length;
    a:for(;G < K;) {
      interpreterBytecodeCount++;
      0 < traceInterpreter.value && void 0 !== L && print("position: " + L + ": " + O);
      try {
        var I = N[G], U = I.op;
        switch(U) {
          case 1:
            notImplemented();
            break;
          case 3:
            throw t.pop();;
          case 4:
            E = d(t, u[I.index]);
            t.push(getSuper(k, t.pop(), E));
            break;
          case 5:
            M = t.pop();
            E = d(t, u[I.index]);
            setSuper(k, t.pop(), E, M);
            break;
          case 6:
            notImplemented();
            break;
          case 7:
            notImplemented();
            break;
          case 8:
            a[I.index] = void 0;
            break;
          case 10:
            notImplemented();
            break;
          case 11:
            notImplemented();
            break;
          case 12:
            B = t.pop();
            F = t.pop();
            G = !(F < B) ? I.offset : G + 1;
            continue;
          case 24:
            B = t.pop();
            F = t.pop();
            G = F >= B ? I.offset : G + 1;
            continue;
          case 13:
            B = t.pop();
            F = t.pop();
            G = !(F <= B) ? I.offset : G + 1;
            continue;
          case 23:
            B = t.pop();
            F = t.pop();
            G = F > B ? I.offset : G + 1;
            continue;
          case 14:
            B = t.pop();
            F = t.pop();
            G = !(F > B) ? I.offset : G + 1;
            continue;
          case 22:
            B = t.pop();
            F = t.pop();
            G = F <= B ? I.offset : G + 1;
            continue;
          case 15:
            B = t.pop();
            F = t.pop();
            G = !(F >= B) ? I.offset : G + 1;
            continue;
          case 21:
            B = t.pop();
            F = t.pop();
            G = F < B ? I.offset : G + 1;
            continue;
          case 16:
            G = I.offset;
            continue;
          case 17:
            G = t.pop() ? I.offset : G + 1;
            continue;
          case 18:
            G = !t.pop() ? I.offset : G + 1;
            continue;
          case 19:
            B = t.pop();
            F = t.pop();
            G = F == B ? I.offset : G + 1;
            continue;
          case 20:
            B = t.pop();
            F = t.pop();
            G = F != B ? I.offset : G + 1;
            continue;
          case 25:
            B = t.pop();
            F = t.pop();
            G = F === B ? I.offset : G + 1;
            continue;
          case 26:
            B = t.pop();
            F = t.pop();
            G = F !== B ? I.offset : G + 1;
            continue;
          case 27:
            z = t.pop();
            if(0 > z || z >= I.offsets.length) {
              z = I.offsets.length - 1
            }
            G = I.offsets[z];
            continue;
          case 28:
            H = new Scope(H, t.pop(), !0);
            y++;
            break;
          case 29:
            H = H.parent;
            y--;
            break;
          case 30:
            z = t.pop();
            A = t.pop();
            t.push(nextName(A, z));
            break;
          case 35:
            z = t.pop();
            A = t.pop();
            t.push(nextValue(A, z));
            break;
          case 31:
            notImplemented();
            break;
          case 50:
            Q = hasNext2(a[I.object], a[I.index]);
            a[I.object] = Q.object;
            a[I.index] = Q.index;
            t.push(!!Q.index);
            break;
          case 32:
            t.push(null);
            break;
          case 33:
            t.push(void 0);
            break;
          case 34:
            notImplemented();
            break;
          case 36:
          ;
          case 37:
            t.push(I.value);
            break;
          case 44:
            t.push(v[I.index]);
            break;
          case 45:
            t.push(n[I.index]);
            break;
          case 46:
            t.push(p[I.index]);
            break;
          case 47:
            t.push(r[I.index]);
            break;
          case 38:
            t.push(!0);
            break;
          case 39:
            t.push(!1);
            break;
          case 40:
            t.push(NaN);
            break;
          case 41:
            t.pop();
            break;
          case 42:
            t.push(t.top());
            break;
          case 43:
            t.push(t.pop(), t.pop());
            break;
          case 48:
            H = new Scope(H, t.pop());
            y++;
            break;
          case 49:
            notImplemented();
            break;
          case 53:
            notImplemented();
            break;
          case 54:
            notImplemented();
            break;
          case 55:
            notImplemented();
            break;
          case 56:
            notImplemented();
            break;
          case 57:
            notImplemented();
            break;
          case 58:
            notImplemented();
            break;
          case 59:
            notImplemented();
            break;
          case 60:
            notImplemented();
            break;
          case 61:
            notImplemented();
            break;
          case 62:
            notImplemented();
            break;
          case 64:
            t.push(C.createFunction(s[I.index], H, !0));
            break;
          case 65:
            l = t.popMany(I.argCount);
            A = t.pop();
            t.push(t.pop().apply(A, l));
            break;
          case 66:
            l = t.popMany(I.argCount);
            A = t.pop();
            t.push(b(A, l));
            break;
          case 67:
            notImplemented();
            break;
          case 68:
            notImplemented();
            break;
          case 69:
            l = t.popMany(I.argCount);
            E = d(t, u[I.index]);
            A = t.pop();
            t.push(getSuper(k, A, E).apply(A, l));
            break;
          case 70:
            l = t.popMany(I.argCount);
            E = d(t, u[I.index]);
            A = t.pop();
            var V = getProperty(A, E);
            V || C.throwErrorFromVM("ReferenceError", E + " not found.");
            t.push(V.apply(A, l));
            break;
          case 71:
            w.pop();
            return;
          case 72:
            return w.pop(), t.pop();
          case 73:
            l = t.popMany(I.argCount);
            A = t.pop();
            k.object.baseClass.instanceNoInitialize.apply(A, l);
            break;
          case 74:
            l = t.popMany(I.argCount);
            E = d(t, u[I.index]);
            A = t.pop();
            (V = getProperty(A, E)) || C.throwErrorFromVM("ReferenceError", E + " not found.");
            t.push(b(V, l));
            break;
          case 75:
            notImplemented();
            break;
          case 76:
            l = t.popMany(I.argCount);
            E = d(t, u[I.index]);
            A = t.pop();
            (V = getProperty(A, E)) || C.throwErrorFromVM("ReferenceError", E + " not found.");
            t.push(V.apply(null, l));
            break;
          case 77:
            notImplemented();
            break;
          case 78:
            l = t.popMany(I.argCount);
            E = d(t, u[I.index]);
            A = t.pop();
            getSuper(k, A, E).apply(A, l);
            break;
          case 79:
            l = t.popMany(I.argCount);
            E = d(t, u[I.index]);
            A = t.pop();
            (V = getProperty(A, E)) || C.throwErrorFromVM("ReferenceError", E + " not found.");
            V.apply(A, l);
            break;
          case 80:
            notImplemented();
            break;
          case 81:
            notImplemented();
            break;
          case 82:
            notImplemented();
            break;
          case 83:
            l = t.popMany(I.argCount);
            t.push(C.applyType(t.pop(), l));
            break;
          case 84:
            notImplemented();
            break;
          case 85:
            A = {};
            for(J = 0;J < I.argCount;J++) {
              M = t.pop(), A[Multiname.getPublicQualifiedName(t.pop())] = M
            }
            t.push(A);
            break;
          case 86:
            A = [];
            A.push.apply(A, t.popMany(I.argCount));
            t.push(A);
            break;
          case 87:
            release || !0;
            t.push(createActivation(g));
            break;
          case 88:
            t.push(C.createClass(m.classes[I.index], t.pop(), H));
            break;
          case 89:
            E = d(t, u[I.index]);
            t.push(getDescendants(E, t.pop()));
            break;
          case 90:
            release || !0;
            t.push(x[I.index].scopeObject);
            break;
          case 93:
            E = d(t, u[I.index]);
            t.push(H.findProperty(E, q, !0));
            break;
          case 94:
            E = d(t, u[I.index]);
            t.push(H.findProperty(E, q, !1));
            break;
          case 95:
            notImplemented();
            break;
          case 96:
            E = d(t, u[I.index]);
            t.push(getProperty(H.findProperty(E, q, !0), E));
            break;
          case 104:
          ;
          case 97:
            M = t.pop();
            E = d(t, u[I.index]);
            setProperty(t.pop(), E, M);
            break;
          case 98:
            t.push(a[I.index]);
            break;
          case 99:
            a[I.index] = t.pop();
            break;
          case 100:
            t.push(H.global.object);
            break;
          case 101:
            A = H;
            var da = y - 1 - I.index;
            release || !0;
            for(J = 0;J < da;J++) {
              A = A.parent
            }
            t.push(A.object);
            break;
          case 102:
            E = d(t, u[I.index]);
            t.push(getProperty(t.pop(), E));
            break;
          case 103:
            notImplemented();
            break;
          case 105:
            notImplemented();
            break;
          case 106:
            E = d(t, u[I.index]);
            A = t.pop();
            t.push(deleteProperty(A, E));
            break;
          case 107:
            notImplemented();
            break;
          case 108:
            t.push(getSlot(t.pop(), I.index));
            break;
          case 109:
            M = t.pop();
            A = t.pop();
            setSlot(A, I.index, M);
            break;
          case 110:
            notImplemented();
            break;
          case 111:
            notImplemented();
            break;
          case 112:
            t.push(toString(t.pop()));
            break;
          case 113:
            notImplemented();
            break;
          case 114:
            notImplemented();
            break;
          case 131:
          ;
          case 115:
            t.push(toInt(t.pop()));
            break;
          case 136:
          ;
          case 116:
            t.push(toUint(t.pop()));
            break;
          case 132:
          ;
          case 117:
            t.push(toDouble(t.pop()));
            break;
          case 129:
          ;
          case 118:
            t.push(toBoolean(t.pop()));
            break;
          case 119:
            notImplemented();
            break;
          case 120:
            t.push(checkFilter(t.pop()));
            break;
          case 121:
            notImplemented();
            break;
          case 122:
            notImplemented();
            break;
          case 123:
            notImplemented();
            break;
          case 128:
            M = t.pop();
            E = u[I.index];
            t.push(coerce(M, q.getProperty(E, !0, !0)));
            break;
          case 130:
            break;
          case 133:
            t.push(coerceString(t.pop()));
            break;
          case 134:
            notImplemented();
            break;
          case 135:
            D = t.pop();
            M = t.pop();
            t.push(asInstance(M, D));
            break;
          case 137:
            A = t.pop();
            t.push(void 0 == A ? null : A);
            break;
          case 144:
            t.push(-t.pop());
            break;
          case 145:
            F = t.pop();
            t.push(F + 1);
            break;
          case 146:
            ++a[I.index];
            break;
          case 147:
            t.push(1);
            B = t.pop();
            F = t.pop();
            t.push(F - B);
            break;
          case 148:
            --a[I.index];
            break;
          case 149:
            t.push(typeOf(t.pop()));
            break;
          case 150:
            t.push(!t.pop());
            break;
          case 151:
            t.push(~t.pop());
            break;
          case 160:
            B = t.pop();
            F = t.pop();
            t.push(F + B);
            break;
          case 161:
            B = t.pop();
            F = t.pop();
            t.push(F - B);
            break;
          case 162:
            B = t.pop();
            F = t.pop();
            t.push(F * B);
            break;
          case 163:
            B = t.pop();
            F = t.pop();
            t.push(F / B);
            break;
          case 164:
            B = t.pop();
            F = t.pop();
            t.push(F % B);
            break;
          case 165:
            B = t.pop();
            F = t.pop();
            t.push(F << B);
            break;
          case 166:
            B = t.pop();
            F = t.pop();
            t.push(F >> B);
            break;
          case 167:
            B = t.pop();
            F = t.pop();
            t.push(F >>> B);
            break;
          case 168:
            B = t.pop();
            F = t.pop();
            t.push(F & B);
            break;
          case 169:
            B = t.pop();
            F = t.pop();
            t.push(F | B);
            break;
          case 170:
            B = t.pop();
            F = t.pop();
            t.push(F ^ B);
            break;
          case 171:
            B = t.pop();
            F = t.pop();
            t.push(F == B);
            break;
          case 172:
            B = t.pop();
            F = t.pop();
            t.push(F === B);
            break;
          case 173:
            B = t.pop();
            F = t.pop();
            t.push(F < B);
            break;
          case 174:
            B = t.pop();
            F = t.pop();
            t.push(F <= B);
            break;
          case 175:
            B = t.pop();
            F = t.pop();
            t.push(F > B);
            break;
          case 176:
            B = t.pop();
            F = t.pop();
            t.push(F >= B);
            break;
          case 177:
            D = t.pop();
            M = t.pop();
            t.push(isInstanceOf(M, D));
            break;
          case 178:
            M = t.pop();
            E = u[I.index];
            release || !0;
            D = q.getProperty(E, !0, !0);
            t.push(isInstance(M, D));
            break;
          case 179:
            D = t.pop();
            M = t.pop();
            t.push(isInstance(M, D));
            break;
          case 180:
            A = t.pop();
            E = Multiname.getPublicQualifiedName(t.pop());
            t.push(hasProperty(A, E));
            break;
          case 192:
            t.push(t.pop() | 0);
            t.push(1);
            B = t.pop();
            F = t.pop();
            t.push(F + B);
            break;
          case 193:
            t.push(t.pop() | 0);
            t.push(1);
            B = t.pop();
            F = t.pop();
            t.push(F - B);
            break;
          case 194:
            a[I.index] = (a[I.index] | 0) + 1;
            break;
          case 195:
            a[I.index] = (a[I.index] | 0) - 1;
            break;
          case 196:
            t.push(~(t.pop() | 0));
            break;
          case 197:
            B = t.pop();
            F = t.pop();
            t.push(F + B | 0);
            break;
          case 198:
            B = t.pop();
            F = t.pop();
            t.push(F - B | 0);
            break;
          case 199:
            B = t.pop();
            F = t.pop();
            t.push(F * B | 0);
            break;
          case 208:
          ;
          case 209:
          ;
          case 210:
          ;
          case 211:
            t.push(a[U - 208]);
            break;
          case 212:
          ;
          case 213:
          ;
          case 214:
          ;
          case 215:
            a[U - OP_setlocal0] = t.pop();
            break;
          case 239:
          ;
          case 240:
            O = I.lineNumber;
            break;
          case 241:
            L = v[I.index];
            break;
          case 242:
            notImplemented();
            break;
          case 243:
            notImplemented();
            break;
          default:
            console.info("Not Implemented: " + opcodeName(I))
        }
        G++
      }catch(X) {
        if(1 > x.length) {
          throw X;
        }
        X = C.translateError(X);
        J = 0;
        for(H = x.length;J < H;J++) {
          var Z = x[J];
          if(G >= Z.start && G <= Z.end && (!Z.typeName || q.getProperty(Z.typeName, !0, !0).isInstance(X))) {
            Runtime.unwindStackTo(C);
            H = k;
            y = 0;
            t.length = 0;
            t.push(X);
            G = Z.offset;
            continue a
          }
        }
        throw X;
      }
    }
  }};
  return a
}(), AVM2 = function() {
  function a(a, d, e) {
    this.systemDomain = new Domain(this, null, a, !0);
    this.applicationDomain = new Domain(this, this.systemDomain, d, !1);
    this.findDefiningAbc = e
  }
  a.currentVM = function() {
    return Runtime.stack.top().domain.system.vm
  };
  a.isRunning = function() {
    return 0 !== Runtime.stack.length
  };
  a.prototype = {notifyConstruct:function() {
  }};
  return a
}(), playerGlobalNames = {}, playerGlobalScripts = {};
(function() {
  for(var a = [{name:"Object", offset:0, length:53432, defs:"Object Class Function Namespace Boolean Number int uint String Array AS3 bugzilla decodeURI decodeURIComponent encodeURI encodeURIComponent isNaN isFinite parseInt parseFloat escape unescape isXMLName NaN Infinity undefined __AS3__.vec:Vector __AS3__.vec:Vector$object __AS3__.vec:Vector$int __AS3__.vec:Vector$uint __AS3__.vec:Vector$double avmplus:describeTypeJSON avmplus:extendsXml avmplus:implementsXml avmplus:constructorXml avmplus:constantXml avmplus:variableXml avmplus:accessorXml avmplus:methodXml avmplus:parameterXml avmplus:metadataXml avmplus:argXml avmplus:typeXml avmplus:factoryXml avmplus:describeParams avmplus:describeMetadata avmplus:finish avmplus:describeTraits avmplus:HIDE_NSURI_METHODS avmplus:INCLUDE_BASES avmplus:INCLUDE_INTERFACES avmplus:INCLUDE_VARIABLES avmplus:INCLUDE_ACCESSORS avmplus:INCLUDE_METHODS avmplus:INCLUDE_METADATA avmplus:INCLUDE_CONSTRUCTOR avmplus:INCLUDE_TRAITS avmplus:USE_ITRAITS avmplus:HIDE_OBJECT avmplus:FLASH10_FLAGS avmplus:describeType avmplus:getQualifiedClassName avmplus:getQualifiedSuperclassName".split(" ")}, 
  {name:"flash/xml/XMLTag", offset:53432, length:859, defs:["flash.xml:XMLTag"]}, {name:"flash/net/NetStreamInfo", offset:54291, length:5307, defs:["flash.net:NetStreamInfo"]}, {name:"flash/sampler/StackFrame", offset:59598, length:4475, defs:"flash.sampler:StackFrame flash.sampler:Sample flash.sampler:NewObjectSample flash.sampler:DeleteObjectSample flash.sampler:clearSamples flash.sampler:startSampling flash.sampler:stopSampling flash.sampler:pauseSampling flash.sampler:sampleInternalAllocs flash.sampler:setSamplerCallback flash.sampler:_setSamplerCallback flash.sampler:getSize flash.sampler:getMemberNames flash.sampler:getSamples flash.sampler:_getSamples flash.sampler:getSampleCount flash.sampler:getInvocationCount flash.sampler:getSetterInvocationCount flash.sampler:getGetterInvocationCount flash.sampler:_getInvocationCount flash.sampler:isGetterSetter flash.sampler:getLexicalScopes flash.sampler:getSavedThis flash.sampler:getMasterString flash.sampler:ClassFactory".split(" ")}, 
  {name:"flash/display3D/Context3DBlendFactor", offset:64073, length:1101, defs:["flash.display3D:Context3DBlendFactor"]}, {name:"flash/net/registerClassAlias", offset:65174, length:429, defs:["flash.net:registerClassAlias", "flash.net:getClassByAlias"]}, {name:"flash/display3D/Context3DStencilAction", offset:65603, length:896, defs:["flash.display3D:Context3DStencilAction"]}, {name:"flash/text/engine/CFFHinting", offset:66499, length:504, defs:["flash.text.engine:CFFHinting"]}, {name:"flash/display/IDrawCommand", 
  offset:67003, length:280, defs:["flash.display:IDrawCommand"]}, {name:"flash/net/Responder", offset:67283, length:600, defs:["flash.net:Responder"]}, {name:"flash/utils/IDataInput", offset:67883, length:2232, defs:["flash.utils:IDataInput"]}, {name:"flash/utils/ObjectInput", offset:70115, length:1952, defs:["flash.utils:ObjectInput"]}, {name:"flash/events/EventPhase", offset:72067, length:504, defs:["flash.events:EventPhase"]}, {name:"flash/net/URLLoaderDataFormat", offset:72571, length:551, defs:["flash.net:URLLoaderDataFormat"]}, 
  {name:"flash/net/IDynamicPropertyWriter", offset:73122, length:537, defs:["flash.net:IDynamicPropertyWriter"]}, {name:"flash/geom/PerspectiveProjection", offset:73659, length:1312, defs:["flash.geom:PerspectiveProjection"]}, {name:"flash/events/IEventDispatcher", offset:74971, length:1046, defs:["flash.events:IEventDispatcher"]}, {name:"flash/events/EventDispatcher", offset:76017, length:3072, defs:["flash.events:EventDispatcher"]}, {name:"flash/display/Stage3D", offset:79089, length:1225, defs:["flash.display:Stage3D"]}, 
  {name:"flash/sensors/Geolocation", offset:80314, length:932, defs:["flash.sensors:Geolocation"]}, {name:"Error", offset:81246, length:5961, defs:"Error DefinitionError EvalError RangeError ReferenceError SecurityError SyntaxError TypeError URIError VerifyError UninitializedError ArgumentError flash.errors:IOError flash.errors:EOFError flash.errors:MemoryError flash.errors:IllegalOperationError".split(" ")}, {name:"flash/text/engine/ContentElement", offset:87207, length:1868, defs:["flash.text.engine:ContentElement"]}, 
  {name:"flash/text/engine/TextElement", offset:89075, length:954, defs:["flash.text.engine:TextElement"]}, {name:"flash/concurrent/Mutex", offset:90029, length:2484, defs:["flash.concurrent:Mutex", "flash.concurrent:Condition", "avm2.intrinsics.memory:mfence", "avm2.intrinsics.memory:casi32"]}, {name:"flash/display/NativeMenu", offset:92513, length:604, defs:["flash.display:NativeMenu"]}, {name:"flash/ui/ContextMenu", offset:93117, length:2359, defs:["flash.ui:ContextMenu"]}, {name:"flash/net/drm/DRMManagerSession", 
  offset:95476, length:20509, defs:"flash.net.drm:DRMManagerSession flash.net.drm:DRMAuthenticationContext flash.net.drm:DRMPlaybackTimeWindow flash.net.drm:DRMVoucher flash.net.drm:DRMVoucherDownloadContext flash.net.drm:DRMVoucherStoreContext flash.net.drm:DRMManager flash.net.drm:DRMModuleCycleProvider flash.net.drm:DRMURLDownloadContext".split(" ")}, {name:"flash/display/IBitmapDrawable", offset:115985, length:281, defs:["flash.display:IBitmapDrawable"]}, {name:"flash/display/DisplayObject", 
  offset:116266, length:5912, defs:["flash.display:DisplayObject"]}, {name:"flash/display/Bitmap", offset:122178, length:1149, defs:["flash.display:Bitmap"]}, {name:"flash/globalization/DateTimeFormatter", offset:123327, length:2422, defs:["flash.globalization:DateTimeFormatter"]}, {name:"flash/media/VideoStatus", offset:125749, length:545, defs:["flash.media:VideoStatus"]}, {name:"flash/system/fscommand", offset:126294, length:632, defs:["flash.system:fscommand", "flash.system:FSCommand"]}, {name:"adobe/utils/MMExecute", 
  offset:126926, length:436, defs:["adobe.utils:MMExecute", "adobe.utils:MMEndCommand"]}, {name:"flash/external/ExternalInterface", offset:127362, length:7206, defs:["flash.external:ExternalInterface"]}, {name:"flash/security/CertificateStatus", offset:134568, length:939, defs:["flash.security:CertificateStatus"]}, {name:"flash/system/Security", offset:135507, length:2365, defs:["flash.system:Security"]}, {name:"flash/events/Event", offset:137872, length:4511, defs:["flash.events:Event"]}, {name:"flash/events/KeyboardEvent", 
  offset:142383, length:2329, defs:["flash.events:KeyboardEvent"]}, {name:"flash/net/navigateToURL", offset:144712, length:392, defs:["flash.net:navigateToURL", "flash.net:sendToURL"]}, {name:"flash/events/SoftKeyboardTrigger", offset:145104, length:562, defs:["flash.events:SoftKeyboardTrigger"]}, {name:"flash/display3D/Context3DRenderMode", offset:145666, length:534, defs:["flash.display3D:Context3DRenderMode"]}, {name:"flash/ui/GameInputControl", offset:146200, length:1234, defs:["flash.ui:GameInputControl"]}, 
  {name:"flash/geom/Matrix", offset:147434, length:4980, defs:["flash.geom:Matrix"]}, {name:"flash/events/ThrottleType", offset:152414, length:534, defs:["flash.events:ThrottleType"]}, {name:"flash/text/TextInteractionMode", offset:152948, length:526, defs:["flash.text:TextInteractionMode"]}, {name:"flash/filters/DisplacementMapFilterMode", offset:153474, length:636, defs:["flash.filters:DisplacementMapFilterMode"]}, {name:"flash/geom/Rectangle", offset:154110, length:5057, defs:["flash.geom:Rectangle"]}, 
  {name:"flash/net/drm/AuthenticationMethod", offset:159167, length:1246, defs:["flash.net.drm:AuthenticationMethod", "flash.net.drm:LoadVoucherSetting", "flash.net.drm:AddToDeviceGroupSetting"]}, {name:"flash/utils/Timer", offset:160413, length:2134, defs:["flash.utils:Timer"]}, {name:"flash/utils/SetIntervalTimer", offset:162547, length:1758, defs:["flash.utils:SetIntervalTimer", "flash.utils:setInterval", "flash.utils:setTimeout", "flash.utils:clearInterval", "flash.utils:clearTimeout"]}, {name:"flash/text/engine/TextJustifier", 
  offset:164305, length:1512, defs:["flash.text.engine:TextJustifier"]}, {name:"flash/media/Microphone", offset:165817, length:3070, defs:["flash.media:Microphone"]}, {name:"flash/sensors/Accelerometer", offset:168887, length:958, defs:["flash.sensors:Accelerometer"]}, {name:"flash/display3D/textures/TextureBase", offset:169845, length:622, defs:["flash.display3D.textures:TextureBase"]}, {name:"flash/display3D/textures/Texture", offset:170467, length:1061, defs:["flash.display3D.textures:Texture"]}, 
  {name:"flash/net/drm/DRMDeviceGroup", offset:171528, length:1200, defs:["flash.net.drm:DRMDeviceGroup"]}, {name:"flash/display/InteractiveObject", offset:172728, length:4152, defs:["flash.display:InteractiveObject"]}, {name:"flash/display/DisplayObjectContainer", offset:176880, length:2730, defs:["flash.display:DisplayObjectContainer"]}, {name:"flash/display/FocusDirection", offset:179610, length:11058, defs:["flash.display:FocusDirection", "flash.display:Stage"]}, {name:"flash/events/UncaughtErrorEvents", 
  offset:190668, length:573, defs:["flash.events:UncaughtErrorEvents"]}, {name:"flash/display/IGraphicsData", offset:191241, length:289, defs:["flash.display:IGraphicsData"]}, {name:"flash/display/IGraphicsFill", offset:191530, length:289, defs:["flash.display:IGraphicsFill"]}, {name:"flash/display/GraphicsEndFill", offset:191819, length:485, defs:["flash.display:GraphicsEndFill"]}, {name:"flash/accessibility/Accessibility", offset:192304, length:842, defs:["flash.accessibility:Accessibility"]}, 
  {name:"flash/text/GridFitType", offset:193146, length:503, defs:["flash.text:GridFitType"]}, {name:"flash/globalization/CollatorMode", offset:193649, length:517, defs:["flash.globalization:CollatorMode"]}, {name:"adobe/utils/CustomActions", offset:194166, length:799, defs:["adobe.utils:CustomActions"]}, {name:"flash/errors/StackOverflowError", offset:194965, length:1011, defs:["flash.errors:StackOverflowError", "flash.errors:ScriptTimeoutError", "flash.errors:InvalidSWFError"]}, {name:"flash/media/VideoCodec", 
  offset:195976, length:510, defs:["flash.media:VideoCodec"]}, {name:"flash/geom/Point", offset:196486, length:2138, defs:["flash.geom:Point"]}, {name:"flash/ui/Mouse", offset:198624, length:996, defs:["flash.ui:Mouse"]}, {name:"flash/xml/XMLParser", offset:199620, length:619, defs:["flash.xml:XMLParser"]}, {name:"flash/net/NetGroupInfo", offset:200239, length:2622, defs:["flash.net:NetGroupInfo"]}, {name:"flash/display/ShaderJob", offset:202861, length:1486, defs:["flash.display:ShaderJob"]}, {name:"flash/text/FontStyle", 
  offset:204347, length:547, defs:["flash.text:FontStyle"]}, {name:"flash/accessibility/ISearchableText", offset:204894, length:479, defs:["flash.accessibility:ISearchableText"]}, {name:"flash/display/GraphicsShaderFill", offset:205373, length:648, defs:["flash.display:GraphicsShaderFill"]}, {name:"flash/net/NetStream", offset:206021, length:12820, defs:["flash.net:NetStream"]}, {name:"flash/printing/PrintJobOptions", offset:218841, length:520, defs:["flash.printing:PrintJobOptions"]}, {name:"flash/net/FileReference", 
  offset:219361, length:3031, defs:["flash.net:FileReference"]}, {name:"flash/display/StageQuality", offset:222392, length:777, defs:["flash.display:StageQuality"]}, {name:"flash/geom/Transform", offset:223169, length:1655, defs:["flash.geom:Transform"]}, {name:"flash/accessibility/AccessibilityProperties", offset:224824, length:783, defs:["flash.accessibility:AccessibilityProperties"]}, {name:"flash/filters/BitmapFilter", offset:225607, length:554, defs:["flash.filters:BitmapFilter"]}, {name:"flash/filters/DropShadowFilter", 
  offset:226161, length:2578, defs:["flash.filters:DropShadowFilter"]}, {name:"flash/system/ApplicationInstaller", offset:228739, length:1092, defs:["flash.system:ApplicationInstaller"]}, {name:"flash/display3D/Context3DVertexBufferFormat", offset:229831, length:725, defs:["flash.display3D:Context3DVertexBufferFormat"]}, {name:"flash/globalization/DateTimeNameContext", offset:230556, length:561, defs:["flash.globalization:DateTimeNameContext"]}, {name:"flash/display/GraphicsSolidFill", offset:231117, 
  length:635, defs:["flash.display:GraphicsSolidFill"]}, {name:"flash/display/ShaderParameterType", offset:231752, length:1144, defs:["flash.display:ShaderParameterType"]}, {name:"flash/filters/GradientGlowFilter", offset:232896, length:2661, defs:["flash.filters:GradientGlowFilter"]}, {name:"JSON", offset:235557, length:2655, defs:["JSON", "Walker"]}, {name:"flash/system/SecurityDomain", offset:238212, length:813, defs:["flash.system:SecurityDomain"]}, {name:"flash/net/IDynamicPropertyOutput", offset:239025, 
  length:507, defs:["flash.net:IDynamicPropertyOutput"]}, {name:"flash/net/DynamicPropertyOutput", offset:239532, length:695, defs:["flash.net:DynamicPropertyOutput"]}, {name:"flash/media/SoundTransform", offset:240227, length:1599, defs:["flash.media:SoundTransform"]}, {name:"flash/text/engine/FontLookup", offset:241826, length:501, defs:["flash.text.engine:FontLookup"]}, {name:"flash/display/MorphShape", offset:242327, length:526, defs:["flash.display:MorphShape"]}, {name:"flash/net/LocalConnection", 
  offset:242853, length:1613, defs:["flash.net:LocalConnection"]}, {name:"flash/display3D/Program3D", offset:244466, length:707, defs:["flash.display3D:Program3D"]}, {name:"flash/ui/MouseCursor", offset:245173, length:596, defs:["flash.ui:MouseCursor"]}, {name:"flash/events/TextEvent", offset:245769, length:1293, defs:["flash.events:TextEvent"]}, {name:"flash/net/URLRequestHeader", offset:247062, length:542, defs:["flash.net:URLRequestHeader"]}, {name:"flash/display/TriangleCulling", offset:247604, 
  length:561, defs:["flash.display:TriangleCulling"]}, {name:"flash/display/JPEGEncoderOptions", offset:248165, length:624, defs:["flash.display:JPEGEncoderOptions"]}, {name:"flash/net/URLLoader", offset:248789, length:2592, defs:["flash.net:URLLoader"]}, {name:"flash/accessibility/ISimpleTextSelection", offset:251381, length:685, defs:["flash.accessibility:ISimpleTextSelection"]}, {name:"flash/display/Sprite", offset:252066, length:1976, defs:["flash.display:Sprite"]}, {name:"_3fa260287b70f9c2758634de100a49d54c3f5d3f6359cd77d07fc7f4a8ccecbd_flash_display_Sprite", 
  offset:254042, length:1433, defs:["_3fa260287b70f9c2758634de100a49d54c3f5d3f6359cd77d07fc7f4a8ccecbd_flash_display_Sprite"]}, {name:"flash/utils/IDataOutput", offset:255475, length:1976, defs:["flash.utils:IDataOutput"]}, {name:"flash/net/Socket", offset:257451, length:4914, defs:["flash.net:Socket"]}, {name:"flash/net/SecureSocket", offset:262365, length:3247, defs:["flash.net:SecureSocket"]}, {name:"flash/text/engine/TypographicCase", offset:265612, length:793, defs:["flash.text.engine:TypographicCase"]}, 
  {name:"flash/display/IGraphicsPath", offset:266405, length:289, defs:["flash.display:IGraphicsPath"]}, {name:"flash/display/GraphicsTrianglePath", offset:266694, length:1240, defs:["flash.display:GraphicsTrianglePath"]}, {name:"flash/display/PixelSnapping", offset:267934, length:521, defs:["flash.display:PixelSnapping"]}, {name:"flash/display3D/Context3DProgramType", offset:268455, length:543, defs:["flash.display3D:Context3DProgramType"]}, {name:"flash/display/Shape", offset:268998, length:590, 
  defs:["flash.display:Shape"]}, {name:"flash/media/SoundMixer", offset:269588, length:1436, defs:["flash.media:SoundMixer"]}, {name:"flash/filters/ConvolutionFilter", offset:271024, length:2284, defs:["flash.filters:ConvolutionFilter"]}, {name:"flash/net/NetGroupReceiveMode", offset:273308, length:523, defs:["flash.net:NetGroupReceiveMode"]}, {name:"flash/events/DRMDeviceGroupEvent", offset:273831, length:1334, defs:["flash.events:DRMDeviceGroupEvent"]}, {name:"flash/text/engine/TextLineCreationResult", 
  offset:275165, length:689, defs:["flash.text.engine:TextLineCreationResult"]}, {name:"flash/events/StatusEvent", offset:275854, length:1267, defs:["flash.events:StatusEvent"]}, {name:"flash/display/ShaderData", offset:277121, length:672, defs:["flash.display:ShaderData"]}, {name:"flash/system/WorkerState", offset:277793, length:2870, defs:["flash.system:WorkerState", "flash.system:Worker"]}, {name:"flash/system/LoaderContext", offset:280663, length:1320, defs:["flash.system:LoaderContext"]}, {name:"flash/system/JPEGLoaderContext", 
  offset:281983, length:735, defs:["flash.system:JPEGLoaderContext"]}, {name:"flash/debugger/enterDebugger", offset:282718, length:279, defs:["flash.debugger:enterDebugger"]}, {name:"flash/ui/Multitouch", offset:282997, length:1121, defs:["flash.ui:Multitouch"]}, {name:"Date", offset:284118, length:10379, defs:["Date"]}, {name:"flash/display/SWFVersion", offset:294497, length:864, defs:["flash.display:SWFVersion"]}, {name:"flash/events/ProgressEvent", offset:295361, length:1435, defs:["flash.events:ProgressEvent"]}, 
  {name:"flash/media/scanHardware", offset:296796, length:2968, defs:["flash.media:scanHardware", "flash.media:Camera"]}, {name:"flash/text/engine/TextBaseline", offset:299764, length:832, defs:["flash.text.engine:TextBaseline"]}, {name:"flash/text/AntiAliasType", offset:300596, length:474, defs:["flash.text:AntiAliasType"]}, {name:"flash/net/NetGroup", offset:301070, length:5049, defs:["flash.net:NetGroup"]}, {name:"flash/events/ErrorEvent", offset:306119, length:1052, defs:["flash.events:ErrorEvent"]}, 
  {name:"flash/events/IOErrorEvent", offset:307171, length:1204, defs:["flash.events:IOErrorEvent"]}, {name:"flash/utils/describeType", offset:308375, length:1393, defs:"flash.utils:describeType flash.utils:getAliasName flash.utils:getQualifiedClassName flash.utils:getDefinitionByName flash.utils:getQualifiedSuperclassName flash.utils:getTimer flash.utils:escapeMultiByte flash.utils:unescapeMultiByte trace watson".split(" ")}, {name:"flash/display/ColorCorrectionSupport", offset:309768, length:621, 
  defs:["flash.display:ColorCorrectionSupport"]}, {name:"flash/ui/MultitouchInputMode", offset:310389, length:573, defs:["flash.ui:MultitouchInputMode"]}, {name:"flash/text/TextFormatAlign", offset:310962, length:658, defs:["flash.text:TextFormatAlign"]}, {name:"flash/text/engine/Kerning", offset:311620, length:500, defs:["flash.text.engine:Kerning"]}, {name:"flash/net/NetStreamAppendBytesAction", offset:312120, length:639, defs:["flash.net:NetStreamAppendBytesAction"]}, {name:"flash/display/IGraphicsStroke", 
  offset:312759, length:297, defs:["flash.display:IGraphicsStroke"]}, {name:"flash/net/NetGroupSendResult", offset:313056, length:560, defs:["flash.net:NetGroupSendResult"]}, {name:"flash/display/LineScaleMode", offset:313616, length:582, defs:["flash.display:LineScaleMode"]}, {name:"flash/events/AsyncErrorEvent", offset:314198, length:1076, defs:["flash.events:AsyncErrorEvent"]}, {name:"flash/display/StageScaleMode", offset:315274, length:595, defs:["flash.display:StageScaleMode"]}, {name:"flash/ui/GameInput", 
  offset:315869, length:835, defs:["flash.ui:GameInput"]}, {name:"flash/filters/BitmapFilterQuality", offset:316704, length:535, defs:["flash.filters:BitmapFilterQuality"]}, {name:"flash/profiler/profile", offset:317239, length:454, defs:["flash.profiler:profile", "flash.profiler:showRedrawRegions"]}, {name:"flash/display/BitmapData", offset:317693, length:4790, defs:["flash.display:BitmapData"]}, {name:"flash/events/ShaderEvent", offset:322483, length:1669, defs:["flash.events:ShaderEvent"]}, {name:"flash/events/TimerEvent", 
  offset:324152, length:1048, defs:["flash.events:TimerEvent"]}, {name:"XML", offset:325200, length:12638, defs:["XML", "XMLList", "QName"]}, {name:"flash/ui/GameInputHand", offset:337838, length:523, defs:["flash.ui:GameInputHand"]}, {name:"Math", offset:338361, length:1672, defs:["Math"]}, {name:"flash/events/DRMAuthenticateEvent", offset:340033, length:2108, defs:["flash.events:DRMAuthenticateEvent"]}, {name:"flash/media/H264Level", offset:342141, length:1104, defs:["flash.media:H264Level"]}, 
  {name:"flash/text/FontType", offset:343245, length:504, defs:["flash.text:FontType"]}, {name:"flash/display/NativeMenuItem", offset:343749, length:787, defs:["flash.display:NativeMenuItem"]}, {name:"flash/net/FileFilter", offset:344536, length:937, defs:["flash.net:FileFilter"]}, {name:"flash/text/Font", offset:345473, length:845, defs:["flash.text:Font"]}, {name:"flash/events/SampleDataEvent", offset:346318, length:1415, defs:["flash.events:SampleDataEvent"]}, {name:"flash/utils/Endian", offset:347733, 
  length:454, defs:["flash.utils:Endian"]}, {name:"flash/filters/BevelFilter", offset:348187, length:2674, defs:["flash.filters:BevelFilter"]}, {name:"flash/net/SharedObject", offset:350861, length:3383, defs:["flash.net:SharedObject"]}, {name:"flash/media/SoundLoaderContext", offset:354244, length:596, defs:["flash.media:SoundLoaderContext"]}, {name:"flash/events/AccelerometerEvent", offset:354840, length:1946, defs:["flash.events:AccelerometerEvent"]}, {name:"flash/display/ShaderParameter", offset:356786, 
  length:845, defs:["flash.display:ShaderParameter"]}, {name:"flash/ui/ContextMenuClipboardItems", offset:357631, length:1879, defs:["flash.ui:ContextMenuClipboardItems"]}, {name:"flash/media/SoundCodec", offset:359510, length:563, defs:["flash.media:SoundCodec"]}, {name:"flash/events/DRMCustomProperties", offset:360073, length:2540, defs:["flash.events:DRMCustomProperties", "flash.events:DRMStatusEvent"]}, {name:"flash/automation/ActionGenerator", offset:362613, length:801, defs:["flash.automation:ActionGenerator"]}, 
  {name:"flash/text/TextFormat", offset:363414, length:3332, defs:["flash.text:TextFormat"]}, {name:"flash/events/NetStatusEvent", offset:366746, length:1085, defs:["flash.events:NetStatusEvent"]}, {name:"flash/display/GraphicsBitmapFill", offset:367831, length:760, defs:["flash.display:GraphicsBitmapFill"]}, {name:"flash/system/DomainMemoryWithStage3D", offset:368591, length:1743, defs:["flash.system:DomainMemoryWithStage3D"]}, {name:"flash/system/MessageChannelState", offset:370334, length:2210, 
  defs:["flash.system:MessageChannelState", "flash.system:MessageChannel"]}, {name:"RegExp", offset:372544, length:1471, defs:["RegExp"]}, {name:"flash/display/LoaderInfo", offset:374015, length:3881, defs:["flash.display:LoaderInfo"]}, {name:"flash/text/TextDisplayMode", offset:377896, length:518, defs:["flash.text:TextDisplayMode"]}, {name:"flash/net/URLRequestMethod", offset:378414, length:624, defs:["flash.net:URLRequestMethod"]}, {name:"flash/display/Shader", offset:379038, length:961, defs:["flash.display:Shader"]}, 
  {name:"flash/events/NetDataEvent", offset:379999, length:1149, defs:["flash.events:NetDataEvent"]}, {name:"flash/system/ImageDecodingPolicy", offset:381148, length:539, defs:["flash.system:ImageDecodingPolicy"]}, {name:"flash/display/GraphicsGradientFill", offset:381687, length:2224, defs:["flash.display:GraphicsGradientFill"]}, {name:"flash/text/engine/TextLineMirrorRegion", offset:383911, length:1170, defs:["flash.text.engine:TextLineMirrorRegion"]}, {name:"flash/display3D/IndexBuffer3D", offset:385081, 
  length:921, defs:["flash.display3D:IndexBuffer3D"]}, {name:"flash/events/IMEEvent", offset:386002, length:1303, defs:["flash.events:IMEEvent"]}, {name:"flash/text/engine/TextLine", offset:387305, length:5029, defs:["flash.text.engine:TextLine"]}, {name:"flash/display3D/VertexBuffer3D", offset:392334, length:940, defs:["flash.display3D:VertexBuffer3D"]}, {name:"flash/utils/CompressionAlgorithm", offset:393274, length:5295, defs:["flash.utils:CompressionAlgorithm", "flash.utils:IDataInput2", "flash.utils:IDataOutput2", 
  "flash.utils:ByteArray"]}, {name:"flash/display/FrameLabel", offset:398569, length:871, defs:["flash.display:FrameLabel"]}, {name:"adobe/utils/ProductManager", offset:399440, length:2071, defs:["adobe.utils:ProductManager"]}, {name:"flash/events/GameInputEvent", offset:401511, length:849, defs:["flash.events:GameInputEvent"]}, {name:"flash/net/ObjectEncoding", offset:402360, length:794, defs:["flash.net:ObjectEncoding"]}, {name:"flash/geom/Matrix3D", offset:403154, length:3313, defs:["flash.geom:Matrix3D"]}, 
  {name:"flash/media/H264Profile", offset:406467, length:474, defs:["flash.media:H264Profile"]}, {name:"flash/display/Scene", offset:406941, length:802, defs:["flash.display:Scene"]}, {name:"flash/display3D/Context3DClearMask", offset:407743, length:611, defs:["flash.display3D:Context3DClearMask"]}, {name:"flash/net/NetStreamMulticastInfo", offset:408354, length:5325, defs:["flash.net:NetStreamMulticastInfo"]}, {name:"flash/globalization/LastOperationStatus", offset:413679, length:1671, defs:["flash.globalization:LastOperationStatus"]}, 
  {name:"flash/events/ActivityEvent", offset:415350, length:1099, defs:["flash.events:ActivityEvent"]}, {name:"flash/net/NetConnection", offset:416449, length:3692, defs:["flash.net:NetConnection"]}, {name:"flash/events/VideoEvent", offset:420141, length:968, defs:["flash.events:VideoEvent"]}, {name:"flash/filters/BitmapFilterType", offset:421109, length:535, defs:["flash.filters:BitmapFilterType"]}, {name:"flash/display/SpreadMethod", offset:421644, length:519, defs:["flash.display:SpreadMethod"]}, 
  {name:"flash/text/TextField", offset:422163, length:10471, defs:["flash.text:TextField"]}, {name:"flash/events/GestureEvent", offset:432634, length:2768, defs:["flash.events:GestureEvent"]}, {name:"flash/events/PressAndTapGestureEvent", offset:435402, length:2208, defs:["flash.events:PressAndTapGestureEvent"]}, {name:"flash/media/SoundChannel", offset:437610, length:1031, defs:["flash.media:SoundChannel"]}, {name:"flash/text/engine/EastAsianJustifier", offset:438641, length:1350, defs:["flash.text.engine:EastAsianJustifier"]}, 
  {name:"flash/accessibility/AccessibilityImplementation", offset:439991, length:2663, defs:["flash.accessibility:AccessibilityImplementation"]}, {name:"flash/text/CSMSettings", offset:442654, length:648, defs:["flash.text:CSMSettings"]}, {name:"flash/net/drm/DRMContentData", offset:443302, length:2300, defs:["flash.net.drm:DRMContentData"]}, {name:"flash/events/StageVideoAvailabilityEvent", offset:445602, length:890, defs:["flash.events:StageVideoAvailabilityEvent"]}, {name:"flash/net/NetGroupSendMode", 
  offset:446492, length:538, defs:["flash.net:NetGroupSendMode"]}, {name:"flash/text/TextRun", offset:447030, length:569, defs:["flash.text:TextRun"]}, {name:"flash/net/XMLSocket", offset:447599, length:2766, defs:["flash.net:XMLSocket"]}, {name:"flash/utils/Dictionary", offset:450365, length:722, defs:["flash.utils:Dictionary"]}, {name:"flash/display3D/Context3DCompareMode", offset:451087, length:827, defs:["flash.display3D:Context3DCompareMode"]}, {name:"flash/text/TextFieldAutoSize", offset:451914, 
  length:578, defs:["flash.text:TextFieldAutoSize"]}, {name:"flash/text/engine/GroupElement", offset:452492, length:1911, defs:["flash.text.engine:GroupElement"]}, {name:"flash/automation/AutomationAction", offset:454403, length:669, defs:["flash.automation:AutomationAction"]}, {name:"flash/automation/KeyboardAutomationAction", offset:455072, length:992, defs:["flash.automation:KeyboardAutomationAction"]}, {name:"flash/net/NetStreamPlayOptions", offset:456064, length:891, defs:["flash.net:NetStreamPlayOptions"]}, 
  {name:"flash/text/engine/ElementFormat", offset:456955, length:4281, defs:["flash.text.engine:ElementFormat"]}, {name:"flash/filters/DisplacementMapFilter", offset:461236, length:2454, defs:["flash.filters:DisplacementMapFilter"]}, {name:"flash/globalization/CurrencyParseResult", offset:463690, length:936, defs:["flash.globalization:CurrencyParseResult"]}, {name:"flash/display3D/Context3D", offset:464626, length:5441, defs:["flash.display3D:Context3D"]}, {name:"flash/printing/PrintJob", offset:470067, 
  length:2693, defs:["flash.printing:PrintJob"]}, {name:"flash/xml/XMLNodeType", offset:472760, length:746, defs:["flash.xml:XMLNodeType"]}, {name:"flash/events/TransformGestureEvent", offset:473506, length:2762, defs:["flash.events:TransformGestureEvent"]}, {name:"flash/net/GroupSpecifier", offset:476268, length:9817, defs:["flash.net:GroupSpecifier"]}, {name:"flash/system/SecurityPanel", offset:486085, length:760, defs:["flash.system:SecurityPanel"]}, {name:"flash/globalization/Collator", offset:486845, 
  length:2251, defs:["flash.globalization:Collator"]}, {name:"flash/display/Graphics", offset:489096, length:5565, defs:["flash.display:Graphics"]}, {name:"flash/ui/ContextMenuItem", offset:494661, length:1400, defs:["flash.ui:ContextMenuItem"]}, {name:"flash/net/FileReferenceList", offset:496061, length:805, defs:["flash.net:FileReferenceList"]}, {name:"flash/events/DataEvent", offset:496866, length:1126, defs:["flash.events:DataEvent"]}, {name:"flash/ui/GameInputFinger", offset:497992, length:584, 
  defs:["flash.ui:GameInputFinger"]}, {name:"flash/geom/Utils3D", offset:498576, length:768, defs:["flash.geom:Utils3D"]}, {name:"flash/text/TextColorType", offset:499344, length:476, defs:["flash.text:TextColorType"]}, {name:"flash/ui/KeyLocation", offset:499820, length:574, defs:["flash.ui:KeyLocation"]}, {name:"flash/display/BitmapDataChannel", offset:500394, length:566, defs:["flash.display:BitmapDataChannel"]}, {name:"flash/text/StaticText", offset:500960, length:616, defs:["flash.text:StaticText"]}, 
  {name:"flash/events/FocusEvent", offset:501576, length:2097, defs:["flash.events:FocusEvent"]}, {name:"flash/display/BlendMode", offset:503673, length:1090, defs:["flash.display:BlendMode"]}, {name:"flash/net/SharedObjectFlushStatus", offset:504763, length:531, defs:["flash.net:SharedObjectFlushStatus"]}, {name:"flash/display/GraphicsPath", offset:505294, length:2513, defs:["flash.display:GraphicsPath"]}, {name:"flash/events/HTTPStatusEvent", offset:507807, length:1677, defs:["flash.events:HTTPStatusEvent"]}, 
  {name:"flash/geom/Orientation3D", offset:509484, length:560, defs:["flash.geom:Orientation3D"]}, {name:"flash/text/engine/TextBlock", offset:510044, length:5617, defs:["flash.text.engine:TextBlock"]}, {name:"flash/system/System", offset:515661, length:1753, defs:["flash.system:System"]}, {name:"flash/filters/BlurFilter", offset:517414, length:1123, defs:["flash.filters:BlurFilter"]}, {name:"flash/media/StageVideoAvailability", offset:518537, length:556, defs:["flash.media:StageVideoAvailability"]}, 
  {name:"flash/system/Capabilities", offset:519093, length:3483, defs:["flash.system:Capabilities"]}, {name:"flash/system/ApplicationDomain", offset:522576, length:1494, defs:["flash.system:ApplicationDomain"]}, {name:"flash/display/StageAlign", offset:524070, length:716, defs:["flash.display:StageAlign"]}, {name:"flash/text/TextFieldType", offset:524786, length:470, defs:["flash.text:TextFieldType"]}, {name:"flash/display/GraphicsStroke", offset:525256, length:2213, defs:["flash.display:GraphicsStroke"]}, 
  {name:"flash/utils/flash_proxy", offset:527469, length:1800, defs:["flash.utils:flash_proxy", "flash.utils:Proxy"]}, {name:"flash/globalization/DateTimeStyle", offset:529269, length:647, defs:["flash.globalization:DateTimeStyle"]}, {name:"flash/events/DRMAuthenticationErrorEvent", offset:529916, length:1895, defs:["flash.events:DRMAuthenticationErrorEvent"]}, {name:"flash/net/NetGroupReplicationStrategy", offset:531811, length:591, defs:["flash.net:NetGroupReplicationStrategy"]}, {name:"flash/events/NetFilterEvent", 
  offset:532402, length:950, defs:["flash.events:NetFilterEvent"]}, {name:"flash/geom/Vector3D", offset:533352, length:3920, defs:["flash.geom:Vector3D"]}, {name:"flash/events/ThrottleEvent", offset:537272, length:1278, defs:["flash.events:ThrottleEvent"]}, {name:"flash/globalization/LocaleID", offset:538550, length:1487, defs:["flash.globalization:LocaleID"]}, {name:"flash/events/GesturePhase", offset:540037, length:570, defs:["flash.events:GesturePhase"]}, {name:"flash/globalization/DateTimeNameStyle", 
  offset:540607, length:627, defs:["flash.globalization:DateTimeNameStyle"]}, {name:"flash/automation/MouseAutomationAction", offset:541234, length:1829, defs:["flash.automation:MouseAutomationAction"]}, {name:"flash/ui/GameInputControlType", offset:543063, length:738, defs:["flash.ui:GameInputControlType"]}, {name:"flash/display3D/Context3DTextureFormat", offset:543801, length:631, defs:["flash.display3D:Context3DTextureFormat"]}, {name:"flash/ui/MouseCursorData", offset:544432, length:1004, defs:["flash.ui:MouseCursorData"]}, 
  {name:"flash/display/StageDisplayState", offset:545436, length:592, defs:["flash.display:StageDisplayState"]}, {name:"flash/net/NetMonitor", offset:546028, length:655, defs:["flash.net:NetMonitor"]}, {name:"flash/events/SyncEvent", offset:546683, length:1055, defs:["flash.events:SyncEvent"]}, {name:"flash/globalization/NumberFormatter", offset:547738, length:3379, defs:["flash.globalization:NumberFormatter"]}, {name:"flash/media/MicrophoneEnhancedOptions", offset:551117, length:2019, defs:["flash.media:MicrophoneEnhancedOptions"]}, 
  {name:"flash/xml/XMLNode", offset:553136, length:4338, defs:["flash.xml:XMLNode"]}, {name:"flash/trace/Trace", offset:557474, length:1014, defs:["flash.trace:Trace"]}, {name:"flash/system/IMEConversionMode", offset:558488, length:793, defs:["flash.system:IMEConversionMode"]}, {name:"flash/text/TextFormatDisplay", offset:559281, length:508, defs:["flash.text:TextFormatDisplay"]}, {name:"flash/events/DRMErrorEvent", offset:559789, length:2017, defs:["flash.events:DRMErrorEvent"]}, {name:"flash/filters/ColorMatrixFilter", 
  offset:561806, length:895, defs:["flash.filters:ColorMatrixFilter"]}, {name:"flash/system/SystemUpdater", offset:562701, length:2410, defs:["flash.system:SystemUpdater", "flash.system:SystemUpdaterType"]}, {name:"flash/display/ActionScriptVersion", offset:565111, length:515, defs:["flash.display:ActionScriptVersion"]}, {name:"flash/media/Video", offset:565626, length:1376, defs:["flash.media:Video"]}, {name:"flash/desktop/ClipboardFormats", offset:567002, length:8298, defs:["flash.desktop:ClipboardFormats", 
  "flash.desktop:ClipboardTransferMode", "flash.desktop:Clipboard"]}, {name:"flash/display/AVM1Movie", offset:575300, length:1865, defs:["flash.display:AVM1Movie"]}, {name:"flash/filters/GradientBevelFilter", offset:577165, length:2694, defs:["flash.filters:GradientBevelFilter"]}, {name:"flash/ui/ContextMenuBuiltInItems", offset:579859, length:2547, defs:["flash.ui:ContextMenuBuiltInItems"]}, {name:"flash/text/engine/BreakOpportunity", offset:582406, length:601, defs:["flash.text.engine:BreakOpportunity"]}, 
  {name:"flash/display/PNGEncoderOptions", offset:583007, length:627, defs:["flash.display:PNGEncoderOptions"]}, {name:"flash/globalization/NationalDigitsType", offset:583634, length:1896, defs:["flash.globalization:NationalDigitsType"]}, {name:"flash/text/TextExtent", offset:585530, length:695, defs:["flash.text:TextExtent"]}, {name:"flash/text/engine/GraphicElement", offset:586225, length:1341, defs:["flash.text.engine:GraphicElement"]}, {name:"flash/system/IME", offset:587566, length:1381, defs:["flash.system:IME"]}, 
  {name:"flash/text/engine/FontMetrics", offset:588947, length:1075, defs:["flash.text.engine:FontMetrics"]}, {name:"flash/security/X509Certificate", offset:590022, length:1735, defs:["flash.security:X509Certificate"]}, {name:"flash/events/TouchEvent", offset:591757, length:5240, defs:["flash.events:TouchEvent"]}, {name:"flash/text/engine/TextRotation", offset:596997, length:661, defs:["flash.text.engine:TextRotation"]}, {name:"flash/display3D/Context3DProfile", offset:597658, length:547, defs:["flash.display3D:Context3DProfile"]}, 
  {name:"flash/text/ime/IIMEClient", offset:598205, length:1802, defs:["flash.text.ime:IIMEClient"]}, {name:"flash/display3D/Context3DTriangleFace", offset:600007, length:641, defs:["flash.display3D:Context3DTriangleFace"]}, {name:"flash/events/MouseEvent", offset:600648, length:4905, defs:["flash.events:MouseEvent"]}, {name:"flash/xml/XMLDocument", offset:605553, length:3522, defs:["flash.xml:XMLDocument"]}, {name:"flash/text/engine/RenderingMode", offset:609075, length:502, defs:["flash.text.engine:RenderingMode"]}, 
  {name:"flash/net/URLRequest", offset:609577, length:2169, defs:["flash.net:URLRequest"]}, {name:"flash/automation/StageCapture", offset:611746, length:1555, defs:["flash.automation:StageCapture"]}, {name:"flash/media/StageVideo", offset:613301, length:1641, defs:["flash.media:StageVideo"]}, {name:"flash/events/DRMDeviceGroupErrorEvent", offset:614942, length:2201, defs:["flash.events:DRMDeviceGroupErrorEvent"]}, {name:"flash/events/SoftKeyboardEvent", offset:617143, length:1653, defs:["flash.events:SoftKeyboardEvent"]}, 
  {name:"flash/errors/DRMManagerError", offset:618796, length:874, defs:["flash.errors:DRMManagerError"]}, {name:"flash/text/engine/FontPosture", offset:619670, length:494, defs:["flash.text.engine:FontPosture"]}, {name:"flash/display/JointStyle", offset:620164, length:502, defs:["flash.display:JointStyle"]}, {name:"flash/display/ShaderPrecision", offset:620666, length:502, defs:["flash.display:ShaderPrecision"]}, {name:"flash/text/engine/LineJustification", offset:621168, length:710, defs:["flash.text.engine:LineJustification"]}, 
  {name:"flash/globalization/StringTools", offset:621878, length:1250, defs:["flash.globalization:StringTools"]}, {name:"flash/text/StyleSheet", offset:623128, length:3305, defs:["flash.text:StyleSheet"]}, {name:"flash/display/ShaderInput", offset:626433, length:1038, defs:["flash.display:ShaderInput"]}, {name:"flash/net/NetStreamPlayTransitions", offset:627471, length:848, defs:["flash.net:NetStreamPlayTransitions"]}, {name:"flash/display/BitmapEncodingColorSpace", offset:628319, length:688, defs:["flash.display:BitmapEncodingColorSpace"]}, 
  {name:"flash/display/InterpolationMethod", offset:629007, length:518, defs:["flash.display:InterpolationMethod"]}, {name:"flash/media/ID3Info", offset:629525, length:541, defs:["flash.media:ID3Info"]}, {name:"flash/system/TouchscreenType", offset:630066, length:549, defs:["flash.system:TouchscreenType"]}, {name:"flash/events/DRMAuthenticationCompleteEvent", offset:630615, length:1774, defs:["flash.events:DRMAuthenticationCompleteEvent"]}, {name:"flash/events/SecurityErrorEvent", offset:632389, 
  length:1045, defs:["flash.events:SecurityErrorEvent"]}, {name:"flash/system/AuthorizedFeatures", offset:633434, length:1104, defs:["flash.system:AuthorizedFeatures"]}, {name:"flash/media/Sound", offset:634538, length:2359, defs:["flash.media:Sound"]}, {name:"flash/system/WorkerDomain", offset:636897, length:996, defs:["flash.system:WorkerDomain"]}, {name:"flash/net/URLStream", offset:637893, length:2721, defs:["flash.net:URLStream"]}, {name:"flash/events/OutputProgressEvent", offset:640614, length:1459, 
  defs:["flash.events:OutputProgressEvent"]}, {name:"flash/display/SimpleButton", offset:642073, length:2124, defs:["flash.display:SimpleButton"]}, {name:"flash/display/JPEGXREncoderOptions", offset:644197, length:760, defs:["flash.display:JPEGXREncoderOptions"]}, {name:"flash/display/GradientType", offset:644957, length:472, defs:["flash.display:GradientType"]}, {name:"flash/net/URLVariables", offset:645429, length:1584, defs:["flash.net:URLVariables"]}, {name:"flash/globalization/CurrencyFormatter", 
  offset:647013, length:4010, defs:["flash.globalization:CurrencyFormatter"]}, {name:"flash/printing/PrintJobOrientation", offset:651023, length:529, defs:["flash.printing:PrintJobOrientation"]}, {name:"flash/crypto/generateRandomBytes", offset:651552, length:347, defs:["flash.crypto:generateRandomBytes"]}, {name:"flash/events/NetMonitorEvent", offset:651899, length:1060, defs:["flash.events:NetMonitorEvent"]}, {name:"flash/text/engine/TextLineValidity", offset:652959, length:638, defs:["flash.text.engine:TextLineValidity"]}, 
  {name:"flash/text/TextSnapshot", offset:653597, length:1344, defs:["flash.text:TextSnapshot"]}, {name:"flash/display/Loader", offset:654941, length:4198, defs:["flash.display:Loader"]}, {name:"flash/events/FullScreenEvent", offset:659139, length:1328, defs:["flash.events:FullScreenEvent"]}, {name:"flash/utils/ObjectOutput", offset:660467, length:1784, defs:["flash.utils:ObjectOutput"]}, {name:"flash/utils/IExternalizable", offset:662251, length:577, defs:["flash.utils:IExternalizable"]}, {name:"flash/text/engine/FontDescription", 
  offset:662828, length:2196, defs:["flash.text.engine:FontDescription"]}, {name:"flash/globalization/NumberParseResult", offset:665024, length:1E3, defs:["flash.globalization:NumberParseResult"]}, {name:"flash/automation/StageCaptureEvent", offset:666024, length:1310, defs:["flash.automation:StageCaptureEvent"]}, {name:"flash/security/X500DistinguishedName", offset:667334, length:1215, defs:["flash.security:X500DistinguishedName"]}, {name:"adobe/utils/XMLUI", offset:668549, length:662, defs:["adobe.utils:XMLUI"]}, 
  {name:"flash/display/ColorCorrection", offset:669211, length:542, defs:["flash.display:ColorCorrection"]}, {name:"flash/text/engine/LigatureLevel", offset:669753, length:652, defs:["flash.text.engine:LigatureLevel"]}, {name:"flash/media/VideoStreamSettings", offset:670405, length:2164, defs:["flash.media:VideoStreamSettings"]}, {name:"flash/media/H264VideoStreamSettings", offset:672569, length:1813, defs:["flash.media:H264VideoStreamSettings"]}, {name:"flash/automation/Configuration", offset:674382, 
  length:786, defs:["flash.automation:Configuration"]}, {name:"flash/text/engine/JustificationStyle", offset:675168, length:652, defs:["flash.text.engine:JustificationStyle"]}, {name:"flash/ui/KeyboardType", offset:675820, length:532, defs:["flash.ui:KeyboardType"]}, {name:"flash/display/CapsStyle", offset:676352, length:497, defs:["flash.display:CapsStyle"]}, {name:"flash/text/ime/CompositionAttributeRange", offset:676849, length:753, defs:["flash.text.ime:CompositionAttributeRange"]}, {name:"flash/text/engine/TabStop", 
  offset:677602, length:1048, defs:["flash.text.engine:TabStop"]}, {name:"flash/text/engine/FontWeight", offset:678650, length:485, defs:["flash.text.engine:FontWeight"]}, {name:"flash/ui/GameInputDevice", offset:679135, length:1552, defs:["flash.ui:GameInputDevice"]}, {name:"flash/media/AudioDecoder", offset:680687, length:768, defs:["flash.media:AudioDecoder"]}, {name:"flash/text/TextRenderer", offset:681455, length:1074, defs:["flash.text:TextRenderer"]}, {name:"flash/events/StageVideoEvent", 
  offset:682529, length:1341, defs:["flash.events:StageVideoEvent"]}, {name:"flash/text/engine/DigitWidth", offset:683870, length:553, defs:["flash.text.engine:DigitWidth"]}, {name:"flash/geom/ColorTransform", offset:684423, length:1790, defs:["flash.geom:ColorTransform"]}, {name:"flash/system/AuthorizedFeaturesLoader", offset:686213, length:969, defs:["flash.system:AuthorizedFeaturesLoader"]}, {name:"flash/display/GraphicsPathWinding", offset:687182, length:539, defs:["flash.display:GraphicsPathWinding"]}, 
  {name:"flash/display/GraphicsPathCommand", offset:687721, length:744, defs:["flash.display:GraphicsPathCommand"]}, {name:"flash/text/engine/TabAlignment", offset:688465, length:588, defs:["flash.text.engine:TabAlignment"]}, {name:"flash/profiler/Telemetry", offset:689053, length:1062, defs:["flash.profiler:Telemetry"]}, {name:"flash/events/UncaughtErrorEvent", offset:690115, length:1159, defs:["flash.events:UncaughtErrorEvent"]}, {name:"flash/text/engine/DigitCase", offset:691274, length:538, defs:["flash.text.engine:DigitCase"]}, 
  {name:"flash/filters/ShaderFilter", offset:691812, length:1919, defs:["flash.filters:ShaderFilter"]}, {name:"flash/events/GeolocationEvent", offset:693731, length:2920, defs:["flash.events:GeolocationEvent"]}, {name:"flash/ui/Keyboard", offset:696651, length:17797, defs:["flash.ui:Keyboard"]}, {name:"flash/media/MicrophoneEnhancedMode", offset:714448, length:708, defs:["flash.media:MicrophoneEnhancedMode"]}, {name:"flash/filters/GlowFilter", offset:715156, length:1920, defs:["flash.filters:GlowFilter"]}, 
  {name:"flash/display/MovieClip", offset:717076, length:2591, defs:["flash.display:MovieClip"]}, {name:"flash/text/engine/SpaceJustifier", offset:719667, length:1661, defs:["flash.text.engine:SpaceJustifier"]}, {name:"flash/net/drm/VoucherAccessInfo", offset:721328, length:1113, defs:["flash.net.drm:VoucherAccessInfo"]}, {name:"flash/events/ContextMenuEvent", offset:722441, length:1822, defs:["flash.events:ContextMenuEvent"]}, {name:"flash/display3D/textures/CubeTexture", offset:724263, length:1114, 
  defs:["flash.display3D.textures:CubeTexture"]}, {name:"flash/text/TextLineMetrics", offset:725377, length:732, defs:["flash.text:TextLineMetrics"]}], b = 0;b < a.length;b++) {
    var d = a[b];
    playerGlobalScripts[d.name] = d;
    if("string" === typeof d.defs) {
      playerGlobalNames[d.defs] = d.name
    }else {
      for(var e = 0;e < d.defs.length;e++) {
        playerGlobalNames[d.defs[e]] = d.name
      }
    }
  }
})();
enableVerifier.value = !0;
var release = enableC4.value = !0, avm2Root = SHUMWAY_ROOT + "avm2/", builtinPath = avm2Root + "generated/builtin/builtin.abc", playerGlobalPath = SHUMWAY_ROOT + "flash/playerglobal.abc", BinaryFileReader = function() {
  function a(a, d) {
    this.url = a;
    this.responseType = d || "arraybuffer"
  }
  a.prototype = {readAll:function(a, d) {
    var e = new XMLHttpRequest;
    e.open("GET", this.url, !0);
    e.responseType = this.responseType;
    a && (e.onprogress = function(d) {
      a(e.response, d.loaded, d.total)
    });
    e.onreadystatechange = function() {
      4 === e.readyState && (200 !== e.status && 0 !== e.status ? d(null, e.statusText) : d(e.response))
    };
    e.setRequestHeader("If-Modified-Since", "Fri, 01 Jan 1960 00:00:00 GMT");
    e.send(null)
  }};
  return a
}(), libraryAbcs;
function grabAbc(a) {
  var b = libraryScripts[a];
  return b ? new AbcFile(new Uint8Array(libraryAbcs, b.offset, b.length), a) : null
}
function findDefiningAbc(a) {
  if(!avm2.builtinsLoaded) {
    return null
  }
  for(var b, d = 0;d < a.namespaces.length && !(b = a.namespaces[d].originalURI + ":" + a.name, b = playerGlobalNames[b]);d++) {
  }
  return b ? grabAbc(b) : null
}
var avm2, libraryScripts = playerGlobalScripts, libraryNames = playerGlobalNames;
function createAVM2(a, b, d, e, f) {
  console.time("Load AVM2");
  avm2 = new AVM2(d, e, findDefiningAbc);
  var g;
  (new BinaryFileReader(b)).readAll(null, function(b) {
    libraryAbcs = b;
    (new BinaryFileReader(a)).readAll(null, function(a) {
      g = new AbcFile(new Uint8Array(a), "builtin.abc");
      avm2.builtinsLoaded = !1;
      avm2.systemDomain.executeAbc(g);
      avm2.builtinsLoaded = !0;
      console.info(Counter.toJSON());
      console.timeEnd("Load AVM2");
      f(avm2)
    })
  })
}
function describeProperty(a) {
  return{value:a, writable:!0, configurable:!0, enumerable:!0}
}
function scriptProperties(a, b) {
  return b.reduce(function(b, e) {
    b[e] = a + " " + e;
    return b
  }, {})
}
function Promise() {
  this.resolved = !1;
  this._callbacks = []
}
Promise.when = function() {
  var a = arguments.length, b = new Promise;
  if(a) {
    for(var d = [], e = 0, f = a;e < f;e++) {
      var g = arguments[e];
      g.resolved ? (d[e] = g.value, --a) : (g._resolves || (g._resolves = [])).push({promise:b, itemIndex:e})
    }
    0 < a ? (b._values = d, b._unresolvedPromises = a) : b.resolve(d)
  }else {
    b.resolve()
  }
  return b
};
Promise.prototype.resolve = function(a) {
  if(!this.resolved) {
    this.resolved = !0;
    this.value = a;
    for(var b = this._callbacks, d = 0, e = b.length;d < e;d++) {
      var f = b[d];
      f(a)
    }
    if(e = this._resolves) {
      for(var g = [], b = [], d = 0;d < e.length;d++) {
        e[d].promise.resolved || b.push(e[d], a)
      }
      for(;0 < b.length;) {
        if(d = b.shift(), e = b.shift(), a = d.promise, a._values[d.itemIndex] = e, !--a._unresolvedPromises && (a.resolved = !0, a.value = a._values, delete a._values, g.push(a), e = a._resolves)) {
          for(d = 0;d < e.length;d++) {
            e[d].promise.resolved || b.push(e[d], a.value)
          }
        }
      }
      for(;0 < g.length;) {
        a = g.shift();
        b = a._callbacks;
        d = 0;
        for(e = b.length;d < e;d++) {
          f = b[d], f(a.value)
        }
      }
    }
  }
};
Promise.prototype.then = function(a) {
  this.resolved ? a(this.value) : this._callbacks.push(a)
};
function resolveURI(a) {
  if(!inBrowser) {
    return a
  }
  var b = document.createElement("a");
  b.href = a;
  console.info("resolved ", a, " to ", b.href);
  return b.href
}
var BitmapDefinition = function() {
  return{__class__:"flash.display.Bitmap", draw:function(a) {
    a.drawImage(this._bitmapData._canvas, 0, 0)
  }, __glue__:{"native":{instance:{ctor:function(a, b, d) {
    this._bitmapData = a;
    this._pixelSnapping = b;
    this._smoothing = d
  }}}}}
}.call(this), BitmapDataDefinition = function() {
  var a = {__class__:"flash.display.BitmapData", initialize:function() {
    var a = this.symbol;
    a && (this.ctor(a.width, a.height), this._ctx.drawImage(a.img, 0, 0))
  }, _checkCanvas:function() {
    if(null === this._drawable) {
      throw ArgumentError();
    }
  }, ctor:function(a, b, f, g) {
    if(isNaN(a + b) || 0 >= a || 0 >= b) {
      throw ArgumentError();
    }
    this._transparent = !!f;
    var k = document.createElement("canvas");
    this._ctx = k.getContext("2d");
    k.width = a | 0;
    k.height = b | 0;
    this._drawable = k;
    this._backgroundColor = g;
    (!f || g | 0) && this.fillRect(new flash.geom.Rectangle(0, 0, a | 0, b | 0), g)
  }, dispose:function() {
    this._ctx = null;
    this._drawable.width = 0;
    this._drawable.height = 0;
    this._drawable = null
  }, draw:function(a, b, f, g, k) {
    this._checkCanvas();
    this._ctx.save();
    this._ctx.beginPath();
    this._ctx.rect(k.x, k.y, k.width, k.height);
    this._ctx.clip();
    renderDisplayObject(a, this._ctx, b, f);
    this._ctx.restore()
  }, fillRect:function(a, b) {
    this._checkCanvas();
    this._transparent || (b |= 4278190080);
    var f = this._ctx;
    f.fillStyle = ARGBtoCSSColor(b);
    f.fillRect(a.x, a.y, a.width, a.height)
  }, getPixel:function(a, b) {
    this._checkCanvas();
    var f = this._ctx.getImageData(a, b, 1, 1);
    return dataToRGB(f)
  }, getPixel32:function(a, b) {
    this._checkCanvas();
    var f = this._ctx.getImageData(a, b, 1, 1);
    return dataToARGB(f)
  }, setPixel:function(a, b, f) {
    this.fillRect({x:a, y:b, width:1, height:1}, f | 4278190080)
  }, setPixel32:function(a, b, f) {
    this.fillRect({x:a, y:b, width:1, height:1}, f)
  }, clone:function() {
    this._checkCanvas();
    var a = new flash.display.BitmapData(this._drawable.width, this._drawable.height, !0, 0);
    a._ctx.drawImage(this._drawable, 0, 0);
    return a
  }, scroll:function(a, b) {
    this._checkCanvas();
    this._ctx.draw(this._drawable, a, b);
    this._ctx.save();
    this._ctx.fillStyle = ARGBtoCSSColor(this._backgroundColor);
    var f = this._drawable.width, g = this._drawable.height;
    0 < a ? this._ctx.fillRect(0, 0, a, g) : 0 > a && this._ctx.fillRect(a, 0, f, g);
    0 < b ? this._ctx.fillRect(a, b, f, g) : 0 > b && this._ctx.fillRect(0, b, f, g);
    this._ctx.restore()
  }, get width() {
    return this._drawable.width
  }, get height() {
    return this._drawable.height
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{ctor:a.ctor, fillRect:a.fillRect, dispose:a.dispose, getPixel:a.getPixel, getPixel32:a.getPixel32, setPixel:a.setPixel, setPixel32:a.setPixel32, draw:a.draw, clone:a.clone, scroll:a.scroll, width:b(a, "width"), height:b(a, "height")}}};
  return a
}.call(this);
function dataToRGB(a) {
  return a[0] << 24 | a[1] << 16 | a[2]
}
function dataToARGB(a) {
  return a[3] << 32 | dataToRGB(a)
}
function ARGBtoRGBA(a) {
  return(a >>> 24 | a << 8) >>> 0
}
function ARGBtoCSSColor(a) {
  return"rgba(" + (a >>> 16 & 255) + "," + (a >>> 8 & 255) + "," + (a & 255) + "," + (a >>> 24 & 255) / 255 + ")"
}
var TRACE_SYMBOLS_INFO = !1, DisplayObjectDefinition = function() {
  var a = {__class__:"flash.display.DisplayObject", initialize:function() {
    this._alpha = 1;
    this._animated = !1;
    this._bounds = this._bitmap = this._bbox = null;
    this._cacheAsBitmap = !1;
    this._children = [];
    this._control = document.createElement("div");
    this._graphics = this._dirtyArea = this._depth = this._cxform = this._currentTransform = this._clipDepth = null;
    this._filters = [];
    this._loader = null;
    this._mouseChildren = !0;
    this._mouseOver = !1;
    this._mouseY = this._mouseX = 0;
    this._opaqueBackground = this._name = null;
    this._owned = !1;
    this._parent = null;
    this._revision = 0;
    this._root = null;
    this._rotation = 0;
    this._scaleY = this._scaleX = 1;
    this._transform = this._stage = null;
    this._visible = !0;
    this._wasCachedAsBitmap = !1;
    this._y = this._x = 0;
    var a = this.symbol;
    if(a && (this._animated = a.animated || !1, this._bbox = a.bbox || null, this._children = a.children || [], this._clipDepth = a.clipDepth || null, this._cxform = a.cxform || null, this._depth = a.depth || null, this._loader = a.loader || null, this._name = a.name || null, this._owned = a.owned || !1, this._parent = a.parent || null, this._root = a.root || null, this._stage = a.stage || null, a = a.currentTransform)) {
      var b = a.a, f = a.b, g = a.c, k = a.d;
      this._rotation = 0 !== b ? 180 * Math.atan(f / b) / Math.PI : 0 < f ? 90 : -90;
      f = Math.sqrt(b * b + f * f);
      this._scaleX = 0 < b ? f : -f;
      b = Math.sqrt(k * k + g * g);
      this._scaleY = 0 < k ? b : -b;
      this._x = a.tx;
      this._y = a.ty;
      this._currentTransform = a
    }
    TRACE_SYMBOLS_INFO && this._updateTraceSymbolInfo();
    this._updateCurrentTransform()
  }, _updateTraceSymbolInfo:function() {
    var a = this.symbol, a = {className:this.__class__, symbolId:a && a.symbolId, name:this._name};
    this._control.dataset.symbolInfo = a;
    this._control.title = (a.symbolId ? "symbolId: " + a.symbolId + "\n" : "") + (a.name ? "name: " + a.name + "\n" : "") + "class: " + this.__class__;
    this._control.className = "c_" + this.__class__.replace(/\./g, "_")
  }, _applyCurrentInverseTransform:function(a, b) {
    this._parent !== this._stage && this._parent !== b && this._parent._applyCurrentInverseTransform(a);
    var f = this._currentTransform, g = a.x - f.tx, k = a.y - f.ty, l = 1 / (f.a * f.d - f.b * f.c);
    a.x = (f.d * g - f.c * k) * l;
    a.y = (f.a * k - f.b * g) * l
  }, _applyCurrentTransform:function(a, b) {
    var f = this._currentTransform, g = a.x, k = a.y;
    a.x = f.a * g + f.c * k + f.tx;
    a.y = f.d * k + f.b * g + f.ty;
    this._parent !== this._stage && this._parent !== b && this._parent._applyCurrentTransform(a, b)
  }, _hitTest:function(a, b, f, g, k, l) {
    if(a) {
      k = {x:b, y:f};
      this._applyCurrentInverseTransform(k);
      if(g) {
        if(this._graphics) {
          g = this._graphics._scale;
          1 !== g && (k.x /= g, k.y /= g);
          var m = this._graphics._hitCtx;
          if(m.isPointInPath(k.x, k.y)) {
            return!0
          }
          var n = this._graphics._subpaths;
          g = 0;
          for(a = n.length;g < a;g++) {
            var p = n[g], r = p.target;
            if(r.strokeStyle) {
              var v = p.drawingStyles;
              if(m.mozIsPointInStroke) {
                m.strokeStyle = r.strokeStyle;
                for(var s in v) {
                  m[s] = v[s]
                }
                if(m.mozIsPointInStroke(k.x, k.y)) {
                  return!0
                }
              }else {
                var u = r._strokeHitContext;
                u || (u = m.canvas.cloneNode().getContext("2d"), r._strokeHitContext = u, p.strokeToPath(u, {strokeWidth:v.lineWidth, startCap:v.lineCap, endCap:v.lineCap, join:v.lineJoin, miterLimit:v.miterLimit}));
                if(u.isPointInPath(k.x, k.y)) {
                  return!0
                }
              }
            }
          }
        }
        if(!l) {
          l = this._children;
          g = 0;
          for(a = l.length;g < a;g++) {
            if(l[g]._hitTest(!0, b, f, !0)) {
              return!0
            }
          }
        }
        return!1
      }
      f = this.getBounds();
      return k.x >= f.x && k.x < f.x + f.width && k.y >= f.y && k.y < f.y + f.height
    }
    l = this.getBounds();
    s = k.getBounds();
    b = Math.max(l.x, s.x);
    f = Math.max(l.y, s.y);
    b = Math.min(l.x + l.width, s.x + s.width) - b;
    f = Math.min(l.y + l.height, s.y + s.height) - f;
    return 0 < b && 0 < f
  }, _markAsDirty:function() {
    this._dirtyArea || (this._dirtyArea = this.getBounds());
    this._bounds = null
  }, _updateCurrentTransform:function() {
    var a = this._scaleX, b = this._scaleY, f, g;
    switch(this._rotation) {
      case 0:
      ;
      case 360:
        g = 1;
        f = 0;
        break;
      case 90:
      ;
      case -270:
        g = 0;
        f = 1;
        break;
      case 180:
      ;
      case -180:
        g = -1;
        f = 0;
        break;
      case 270:
      ;
      case -90:
        g = 0;
        f = -1;
        break;
      default:
        f = this._rotation / 180 * Math.PI, g = Math.cos(f), f = Math.sin(f)
    }
    this._currentTransform = {a:g * a, b:f * a, c:-f * b, d:g * b, tx:this._x, ty:this._y}
  }, get accessibilityProperties() {
    return null
  }, set accessibilityProperties(a) {
    notImplemented()
  }, get alpha() {
    return this._alpha
  }, set alpha(a) {
    this._alpha = a;
    this._slave = !1;
    this._markAsDirty()
  }, get blendMode() {
    return"normal"
  }, set blendMode(a) {
    notImplemented()
  }, get cacheAsBitmap() {
    return this._cacheAsBitmap
  }, set cacheAsBitmap(a) {
    this._cacheAsBitmap = this._filters.length ? !0 : a
  }, get filters() {
    return this._filters
  }, set filters(a) {
    a.length ? (this._filters.length || (this._wasCachedAsBitmap = this._cacheAsBitmap), this._cacheAsBitmap = !0) : this._cacheAsBitmap = this._wasCachedAsBitmap;
    this._filters = a
  }, get height() {
    return this.getBounds(this._parent).height
  }, set height(a) {
    0 > a && (a = 0);
    var b = this.scaleY;
    0 === b && 0 < a && (this.scaleY = b = 1);
    this.scaleY = b * a / this.height
  }, get loaderInfo() {
    return this._loader && this._loader._contentLoaderInfo || this._parent.loaderInfo
  }, get mask() {
    return null
  }, set mask(a) {
    notImplemented()
  }, get name() {
    return this._name
  }, set name(a) {
    this._name = a;
    TRACE_SYMBOLS_INFO && this._updateTraceSymbolInfo()
  }, get mouseX() {
    return this._mouseX
  }, get mouseY() {
    return this._mouseY
  }, get opaqueBackground() {
    return this._opaqueBackground
  }, set opaqueBackground(a) {
    this._opaqueBackground = a
  }, get parent() {
    return this._parent
  }, get root() {
    return this._root || (this._parent ? this._parent.root : null)
  }, get rotation() {
    return this._rotation
  }, set rotation(a) {
    this._slave = !1;
    a !== this._rotation && (this._markAsDirty(), this._rotation = a, this._updateCurrentTransform())
  }, get stage() {
    return this._stage || (this._parent ? this._parent.stage : null)
  }, get scaleX() {
    return this._scaleX
  }, set scaleX(a) {
    this._slave = !1;
    a !== this._scaleX && (this._markAsDirty(), this._scaleX = a, this._updateCurrentTransform())
  }, get scaleY() {
    return this._scaleY
  }, set scaleY(a) {
    this._slave = !1;
    a !== this._scaleY && (this._markAsDirty(), this._scaleY = a, this._updateCurrentTransform())
  }, get scale9Grid() {
    return null
  }, set scale9Grid(a) {
    notImplemented()
  }, get scrollRect() {
    return null
  }, set scrollRect(a) {
    notImplemented()
  }, get transform() {
    return this._transform || new flash.geom.Transform(this)
  }, set transform(a) {
    this._currentTransform = a.matrix;
    this._slave = !1;
    var b = this._transform;
    b.colorTransform = a.colorTransform;
    b.matrix = a.matrix;
    this._markAsDirty()
  }, get visible() {
    return this._visible
  }, set visible(a) {
    this._slave = !1;
    a !== this._visible && (this._visible = a, this._markAsDirty())
  }, get width() {
    return this.getBounds(this._parent).width
  }, set width(a) {
    0 > a && (a = 0);
    var b = this.scaleX;
    0 === b && 0 < a && (this.scaleX = b = 1);
    this.scaleX = b * a / this.width
  }, get x() {
    return this._x
  }, set x(a) {
    this._slave = !1;
    a !== this._x && (this._markAsDirty(), this._x = a, this._updateCurrentTransform())
  }, get y() {
    return this._y
  }, set y(a) {
    this._slave = !1;
    a !== this._y && (this._markAsDirty(), this._y = a, this._updateCurrentTransform())
  }, getBounds:function(a) {
    if(!this._bounds) {
      var b = this._bbox, f = Number.MAX_VALUE, g = Number.MIN_VALUE, k = Number.MAX_VALUE, l = Number.MIN_VALUE;
      if(b) {
        f = b.left, g = b.right, k = b.top, l = b.bottom
      }else {
        for(var m = this._children, n = m.length, p = 0;p < n;p++) {
          if(b = m[p], b._visible) {
            var b = b.getBounds(this), r = b.x, v = b.y, s = b.x + b.width, b = b.y + b.height, f = Math.min(f, r, s), g = Math.max(g, r, s), k = Math.min(k, v, b), l = Math.max(l, v, b)
          }
        }
      }
      if(this._graphics && (b = this._graphics._getBounds(!0))) {
        r = b.x, v = b.y, s = b.x + b.width, b = b.y + b.height, f = Math.min(f, r, s), g = Math.max(g, r, s), k = Math.min(k, v, b), l = Math.max(l, v, b)
      }
      f === Number.MAX_VALUE && (f = g = k = l = 0);
      this._bounds = {xMin:f, xMax:g, yMin:k, yMax:l}
    }
    b = this._bounds;
    l = {x:b.xMin, y:b.yMin};
    this._applyCurrentTransform(l, a);
    m = {x:b.xMax, y:b.yMin};
    this._applyCurrentTransform(m, a);
    n = {x:b.xMax, y:b.yMax};
    this._applyCurrentTransform(n, a);
    b = {x:b.xMin, y:b.yMax};
    this._applyCurrentTransform(b, a);
    f = Math.min(l.x, m.x, n.x, b.x);
    g = Math.max(l.x, m.x, n.x, b.x);
    k = Math.min(l.y, m.y, n.y, b.y);
    l = Math.max(l.y, m.y, n.y, b.y);
    return new flash.geom.Rectangle(f, k, g - f, l - k)
  }, getRect:function() {
    notImplemented()
  }, globalToLocal:function(a) {
    a = new flash.geom.Point(a.x, a.y);
    this._applyCurrentInverseTransform(a);
    return a
  }, hitTestObject:function(a) {
    return this._hitTest(!1, 0, 0, !1, a)
  }, hitTestPoint:function(a, b, f) {
    return this._hitTest(!0, a, b, f, null)
  }, localToGlobal:function(a) {
    a = new flash.geom.Point(a.x, a.y);
    this._applyCurrentTransform(a);
    return a
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{root:b(a, "root"), stage:b(a, "stage"), name:b(a, "name"), parent:b(a, "parent"), mask:b(a, "mask"), visible:b(a, "visible"), x:b(a, "x"), y:b(a, "y"), z:b(a, "z"), scaleX:b(a, "scaleX"), scaleY:b(a, "scaleY"), scaleZ:b(a, "scaleZ"), mouseX:b(a, "mouseX"), mouseY:b(a, "mouseY"), rotation:b(a, "rotation"), rotationX:b(a, "rotationX"), rotationY:b(a, "rotationY"), rotationZ:b(a, "rotationZ"), alpha:b(a, "alpha"), width:b(a, "width"), height:b(a, "height"), _hitTest:a._hitTest, 
  cacheAsBitmap:b(a, "cacheAsBitmap"), opaqueBackground:b(a, "opaqueBackground"), scrollRect:b(a, "scrollRect"), filters:b(a, "filters"), blendMode:b(a, "blendMode"), transform:b(a, "transform"), scale9Grid:b(a, "scale9Grid"), loaderInfo:b(a, "loaderInfo"), accessibilityProperties:b(a, "accessibilityProperties"), globalToLocal:a.globalToLocal, localToGlobal:a.localToGlobal, getBounds:a.getBounds, getRect:a.getRect}}};
  return a
}.call(this), DisplayObjectContainerDefinition = function() {
  var a = {get mouseChildren() {
    return this._mouseChildren
  }, set mouseChildren(a) {
    this._mouseChildren = a
  }, get numChildren() {
    return this._children.length
  }, get tabChildren() {
    return!0
  }, set tabChildren(a) {
    notImplemented()
  }, get textSnapshot() {
    notImplemented()
  }, addChild:function(a) {
    if(a === this) {
      throw ArgumentError();
    }
    return this.addChildAt(a, this._children.length)
  }, addChildAt:function(a, b) {
    if(a === this) {
      throw ArgumentError();
    }
    var f = this._children;
    if(0 > b || b > f.length) {
      throw RangeError();
    }
    a._parent && a._parent.removeChild(a);
    f.splice(b, 0, a);
    a._owned = !1;
    a._parent = this;
    this._control.appendChild(a._control);
    this._markAsDirty();
    return a
  }, areInaccessibleObjectsUnderPoint:function() {
    notImplemented()
  }, contains:function(a) {
    return-1 < this._children.indexOf(a)
  }, getChildAt:function(a) {
    var b = this._children;
    if(0 > a || a > b.length) {
      throw RangeError();
    }
    return b[a]
  }, getChildByName:function(a) {
    for(var b = this._children, f = 0, g = b.length;f < g;f++) {
      var k = b[f];
      if(k.name === a) {
        return k
      }
    }
    return null
  }, getChildIndex:function(a) {
    a = this._children.indexOf(a);
    if(0 > a) {
      throw ArgumentError();
    }
    return a
  }, getObjectsUnderPoint:function() {
    notImplemented()
  }, removeChild:function(a) {
    a = this._children.indexOf(a);
    if(0 > a) {
      throw ArgumentError();
    }
    return this.removeChildAt(a)
  }, removeChildAt:function(a) {
    var b = this._children;
    if(0 > a || a > b.length) {
      throw RangeError();
    }
    var f = b[a];
    b.splice(a, 1);
    f._parent = null;
    this._control.removeChild(f._control);
    this._markAsDirty();
    return f
  }, setChildIndex:function(a, b) {
    var f = this._children;
    if(0 > b || b > f.length) {
      throw RangeError();
    }
    var g = f.indexOf(a);
    if(0 > g) {
      throw ArgumentError();
    }
    f.splice(g, 1);
    f.splice(b, 0, a);
    a._owned = !1;
    this._markAsDirty();
    return a
  }, removeChildren:function(a, b) {
    var f = this._children.length;
    if(0 > a || a > f || 0 > b || b < a || b > f) {
      throw RangeError();
    }
    for(f = a;f < b;f++) {
      this.removeChildAt(f)
    }
  }, swapChildren:function(a) {
    var b = this._children, f = b.indexOf(a);
    a = b.indexOf(a);
    if(0 > f || 0 > a) {
      throw ArgumentError();
    }
    this.swapChildrenAt(f, a)
  }, swapChildrenAt:function(a, b) {
    var f = this._children, g = f.length;
    if(0 > a || a > g || 0 > b || b > g) {
      throw RangeError();
    }
    var g = f[a], k = f[b];
    f[a] = k;
    f[b] = g;
    g._owned = !1;
    k._owned = !1;
    this._markAsDirty()
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{numChildren:b(a, "numChildren"), tabChildren:b(a, "tabChildren"), mouseChildren:b(a, "mouseChildren"), textSnapshot:b(a, "textSnapshot"), addChild:a.addChild, addChildAt:a.addChildAt, removeChild:a.removeChild, removeChildAt:a.removeChildAt, getChildIndex:a.getChildIndex, setChildIndex:a.setChildIndex, getChildAt:a.getChildAt, getChildByName:a.getChildByName, contains:a.contains, swapChildrenAt:a.swapChildrenAt, swapChildren:a.swapChildren, removeChildren:a.removeChildren}}};
  return a
}.call(this), GraphicsDefinition = function() {
  function a(a, b) {
    return"rgba(" + (a >> 16 & 255) + "," + (a >> 8 & 255) + "," + (a & 255) + "," + b + ")"
  }
  var b = document.createElement("canvas").getContext("2d"), d = {__class__:"flash.display.Graphics", initialize:function() {
    this._fillTransform = this._fillStyle = this._drawingStyles = this._bitmap = null;
    this._revision = 0;
    this._scale = 1;
    this._strokeStyle = null;
    this._subpaths = [];
    var a = document.createElement("canvas");
    a.width = a.height = 1;
    this._hitCtx = a.getContext("2d")
  }, _beginFillObject:function(a) {
    if(null === a) {
      this.endFill()
    }else {
      switch(a.__class__) {
        case "flash.display.GraphicsEndFill":
          this.endFill();
          break;
        case "flash.display.GraphicsSolidFill":
          this.beginFill(a.color, a.alpha);
          break;
        case "flash.display.GraphicsGradientFill":
          this.beginGradientFill(a.type, a.colors, a.alphas, a.ratios, a.matrix, a.spreadMethod, a.interpolationMethod, a.focalPointRatio);
          break;
        case "flash.display.GraphicsBitmapFill":
          this.beginBitmapFill(a.bitmapData, a.matrix, a.repeat, a.smooth);
          break;
        case "flash.display.GraphicsShaderFill":
          this.beginShaderFill(a.shader, a.matrix)
      }
    }
  }, _beginStrokeObject:function(a) {
    var b = null, d = null;
    null !== a && "flash.display.GraphicsStroke" === a.__class__ && (b = a);
    b && (b.fill && b.fill.__isIGraphicsFill__) && (d = b.fill);
    if(null === b || null === d) {
      this.lineStyle(null)
    }else {
      if("flash.display.GraphicsSolidFill" === d.__class__) {
        this.lineStyle(b.thickness, d.color, d.alpha, b.pixelHinting, b.scaleMode, b.caps, b.joints, b.miterLimit)
      }else {
        switch(this.lineStyle(b.thickness, 0, 1, b.pixelHinting, b.scaleMode, b.caps, b.joints, b.miterLimit), d.__class__) {
          case "flash.display.GraphicsGradientFill":
            this.lineGradientStyle(d.type, d.colors, d.alphas, d.ratios, d.matrix, d.spreadMethod, d.interpolationMethod, d.focalPointRatio);
            break;
          case "flash.display.GraphicsBitmapFill":
            this.lineBitmapStyle(d.bitmapData, d.matrix, d.repeat, d.smooth);
            break;
          case "flash.display.GraphicsShaderFill":
            this.lineShaderStyle(d.shader, d.matrix)
        }
      }
    }
  }, _cacheAsBitmap:function(a) {
    var b = this._getBounds(), d = document.createElement("canvas");
    d.width = b.width;
    d.height = b.height;
    b = d.getContext("kanvas-2d");
    b.translate(-a.left, -a.top);
    a = this._scale;
    1 !== a && b.scale(a, a);
    a = this._subpaths;
    for(var e = 0;e < a.length;e++) {
      var f = a[e], g = f.target;
      if(g.fillStyle) {
        if(b.fillStyle = g.fillStyle, g.fillTransform) {
          var k = g.fillTransform;
          b.beginPath();
          b.__draw__(g);
          b.save();
          b.transform(k.a, k.b, k.c, k.d, k.tx, k.ty);
          b.fill();
          b.restore()
        }else {
          b.fill(g)
        }
      }
      if(g.strokeStyle) {
        b.strokeStyle = g.strokeStyle;
        var f = f.drawingStyles, l;
        for(l in f) {
          b[l] = f[l]
        }
        b.stroke(g)
      }
    }
    this._bitmap = d
  }, _drawPathObject:function(a) {
    "flash.display.GraphicsPath" === a.__class__ ? this.drawPath(a.commands, a.data, a.winding) : "flash.display.GraphicsTrianglePath" === a.__class__ && this.drawTriangles(a.vertices, a.indices, a.uvtData, a.culling)
  }, get _currentPath() {
    var a = new Kanvas.Path, b = new e(a, this._hitCtx);
    b.drawingStyles = this._drawingStyles;
    a.fillStyle = this._fillStyle;
    a.fillTransform = this._fillTransform;
    a.strokeStyle = this._strokeStyle;
    this._subpaths.push(b);
    Object.defineProperty(this, "_currentPath", describeProperty(b));
    return b
  }, beginFill:function(b, d) {
    void 0 === d && (d = 1);
    delete this._currentPath;
    this._fillStyle = d ? a(b, d) : null;
    this._fillTransform = null
  }, beginGradientFill:function(d, e, f, g, k, l, u, C) {
    if("linear" === d) {
      d = b.createLinearGradient(-1, 0, 1, 0)
    }else {
      if("radial" == d) {
        d = b.createRadialGradient(C || 0, 0, 0, 0, 0, 1)
      }else {
        throw ArgumentError();
      }
    }
    l = 0;
    for(u = e.length;l < u;l++) {
      d.addColorStop(g[l], a(e[l], f[l]))
    }
    this._fillStyle = d;
    this._fillTransform = k ? {a:819.2 * k.a, b:819.2 * k.b, c:819.2 * k.c, d:819.2 * k.d, tx:k.tx, ty:k.ty} : {a:819.2, b:0, c:0, d:819.2, tx:0, ty:0}
  }, beginBitmapFill:function(a, d, e) {
    this._fillStyle = b.createPattern(a._drawable, e ? "repeat" : "no-repeat");
    a = this._scale;
    this._fillTransform = d ? {a:a * d.a, b:a * d.b, c:a * d.c, d:a * d.d, tx:d.tx, ty:d.ty} : {a:a, b:0, c:0, d:a, tx:0, ty:0}
  }, clear:function() {
    delete this._currentPath;
    this._strokeStyle = this._fillTransform = this._fillStyle = this._drawingStyles = null;
    this._subpaths.length = 0;
    this._hitCtx.beginPath()
  }, copyFrom:function() {
    notImplemented()
  }, cubicCurveTo:function(a, b, d, e, f, g) {
    this._currentPath.bezierCurveTo(a, b, d, e, f, g);
    this._revision++
  }, curveTo:function(a, b, d, e) {
    this._currentPath.quadraticCurveTo(a, b, d, e);
    this._revision++
  }, drawGraphicsData:function(a) {
    for(var b = 0, d = a.length;b < d;b++) {
      var e = a[b];
      e.__isIGraphicsPath__ ? this._drawPathObject(e) : e.__isIGraphicsFill__ ? this._beginFillObject(e) : e.__isIGraphicsStroke__ && this._beginStrokeObject(e)
    }
  }, drawPath:function(a, b, d) {
    delete this._currentPath;
    this._currentPath.fillRule = d || "evenOdd";
    for(var e = d = 0, f = a.length;d < f;d++) {
      switch(a[d]) {
        case 6:
          this.cubicCurveTo(b[e++], b[e++], b[e++], b[e++], b[e++], b[e++]);
          break;
        case 3:
          this.curveTo(b[e++], b[e++], b[e++], b[e++]);
          break;
        case 2:
          this.lineTo(b[e++], b[e++]);
          break;
        case 1:
          this.moveTo(b[e++], b[e++]);
          break;
        case 5:
        ;
        case 4:
          this.curveTo(0, 0, b[e++], b[e++])
      }
    }
  }, drawRect:function(a, b, d, e) {
    if(isNaN(d + e)) {
      throw ArgumentError();
    }
    this._currentPath.rect(a, b, d, e);
    this._revision++
  }, drawRoundRect:function(a, b, d, e, f, g) {
    if(isNaN(d + e + f) || void 0 !== g && isNaN(g)) {
      throw ArgumentError();
    }
    f /= 2;
    g /= 2;
    this._currentPath.moveTo(a + d, b + e - g);
    this._currentPath.arcTo(a + d, b + e, a + d - f, b + e, f, g);
    this._currentPath.arcTo(a, b + e, a, b + e - g, f, g);
    this._currentPath.arcTo(a, b, a + f, b, f, g);
    this._currentPath.arcTo(a + d, b, a + d, b + g, f, g)
  }, drawRoundRectComplex:function(a, b, d, e, f, g, k, l) {
    if(isNaN(d + e + f + g + k + l)) {
      throw ArgumentError();
    }
    this._currentPath.moveTo(a + d, b + e - radiusH);
    this._currentPath.arcTo(a + d, b + e, a + d - l, b + e, l);
    this._currentPath.arcTo(a, b + e, a, b + e - k, k);
    this._currentPath.arcTo(a, b, a + f, b, f);
    this._currentPath.arcTo(a + d, b, a + d, b + g, g)
  }, drawTriangles:function() {
    notImplemented()
  }, endFill:function() {
    delete this._currentPath;
    this._fillTransform = this._fillStyle = null
  }, lineBitmapStyle:function() {
    notImplemented()
  }, lineGradientStyle:function() {
    notImplemented()
  }, lineStyle:function(b, d, e, f, g, k, l, C) {
    delete this._currentPath;
    b ? (void 0 === e && (e = 1), void 0 === C && (C = 3), this._drawingStyles = {lineCap:k || "round", lineJoin:k || "round", lineWidth:b, miterLimit:2 * C}, this._strokeStyle = a(d, e)) : this._strokeStyle = this._drawingStyles = null
  }, lineTo:function(a, b) {
    this._currentPath.lineTo(a, b);
    this._revision++
  }, moveTo:function(a, b) {
    this._currentPath.moveTo(a, b);
    this._revision++
  }, _getBounds:function(a) {
    for(var b = this._subpaths, d = [], f = [], g = [], k = [], l = 0, C = b.length;l < C;l++) {
      var q = b[l], w = q.getBounds();
      w && (d.push(w.minX), f.push(w.minY), g.push(w.maxX), k.push(w.maxY));
      if(a && q.target.strokeStyle) {
        var w = new e, x = q.drawingStyles;
        q.strokeToPath(w, {strokeWidth:x.lineWidth, startCap:x.lineCap, endCap:x.lineCap, join:x.lineJoin, miterLimit:x.miterLimit});
        if(w = w.getBounds()) {
          d.push(w.minX), f.push(w.minY), g.push(w.maxX), k.push(w.maxY)
        }
      }
    }
    if(0 === d.length) {
      return 0
    }
    a = this._scale;
    d = Math.min.apply(Math, d) * a;
    f = Math.min.apply(Math, f) * a;
    g = Math.max.apply(Math, g) * a;
    k = Math.max.apply(Math, k) * a;
    return{x:d, y:f, width:g - d, height:k - f}
  }}, e, f = function() {
  }, g = function(a, b) {
    this.target = a || new f;
    this.segments = [0];
    this.points = [{x:0, y:0, type:0}];
    this.hitCtx = b
  }, k = Math.sin(Math.PI / 12), l = Math.cos(Math.PI / 12);
  f.prototype = {moveTo:function() {
  }, lineTo:function() {
  }, quadraticCurveTo:function() {
  }, closePath:function() {
  }};
  g.prototype = {get lineWidth() {
    return this.target.lineWidth
  }, set lineWidth(a) {
    this.target.lineWidth = a
  }, get lineCap() {
    return this.target.lineCap
  }, set lineCap(a) {
    this.target.lineCap = a
  }, get lineJoin() {
    return this.target.lineJoin
  }, set lineJoin(a) {
    this.target.lineJoin = a
  }, get miterLimit() {
    return this.target.miterLimit
  }, set miterLimit(a) {
    this.target.miterLimit = a
  }, moveTo:function(a, b) {
    var d = this.segments[this.segments.length - 1];
    d === this.points.length - 1 ? (this.points[d].x = a, this.points[d].y = b) : (this.segments.push(this.points.length), this.points.push({x:a, y:b, type:0}));
    this.target.moveTo(a, b);
    this.hitCtx && this.hitCtx.moveTo(a, b)
  }, lineTo:function(a, b) {
    this.points.push({x:a, y:b, type:1});
    this.target.lineTo(a, b);
    this.hitCtx && this.hitCtx.lineTo(a, b)
  }, closePath:function() {
    var a = this.segments[this.segments.length - 1];
    this.points.push({x:this.points[a].x, y:this.points[a].y, type:2});
    this.target.closePath();
    this.hitCtx && this.hitCtx.closePath();
    this.segments.push(this.points.length);
    this.points.push({x:this.points[a].x, y:this.points[a].y, type:0})
  }, quadraticCurveTo:function(a, b, d, e) {
    for(var f = this.points, g = f[f.length - 1].x, k = f[f.length - 1].y, l = 0;8 > l;l++) {
      var q = (l + 1) / 8, w = 1 - q;
      f.push({x:(g * w + a * q) * w + (a * w + d * q) * q, y:(k * w + b * q) * w + (b * w + e * q) * q, type:4})
    }
    f[f.length - 1].type = 1;
    this.target.quadraticCurveTo(a, b, d, e);
    this.hitCtx && this.hitCtx.quadraticCurveTo(a, b, d, e)
  }, bezierCurveTo:function(a, b, d, e, f, g) {
    for(var k = this.points, l = k[k.length - 1].x, q = k[k.length - 1].y, w = 0;8 > w;w++) {
      var x = (w + 1) / 8, H = 1 - x, y = a * H + d * x, t = b * H + e * x;
      k.push({x:((l * H + a * x) * H + y * x) * H + (y * H + (d * H + f * x) * x) * x, y:((q * H + b * x) * H + t * x) * H + (t * H + (e * H + g * x) * x) * x, type:4})
    }
    k[k.length - 1].type = 1;
    this.target.bezierCurveTo(a, b, d, e, f, g);
    this.hitCtx && this.hitCtx.bezierCurveTo(a, b, d, e, f, g)
  }, arcTo:function(a, b, d, e, f, g, k) {
    var l = this.points, q = a, w = b, x = d, H = e, y = f, t = 6 > arguments.length ? f : g, N = k, L = l[l.length - 1].x, M = l[l.length - 1].y, J = q - L, O = w - M, A = x - q, D = H - w, z = J * D - O * A;
    if(0 >= y || 0 >= t || 0 == z) {
      l.push({x:q, y:w, type:1})
    }else {
      var E = 1, Q = 0;
      N && (E = Math.cos(N), Q = Math.sin(N));
      N = A * E + D * Q;
      A = -A * Q + D * E;
      J = Math.atan2(-(J * E + O * Q) * t, (-J * Q + O * E) * y);
      O = Math.atan2(-N * t, A * y);
      0 > z && (J = (0 <= J ? -Math.PI : Math.PI) + J, O = (0 <= O ? -Math.PI : Math.PI) + O);
      var N = y * Math.cos(J), A = t * Math.sin(J), D = y * Math.cos(O), F = t * Math.sin(O), z = N * E - A * Q, N = N * Q + A * E, A = w - M, B = -(q - L), L = (q - z) * (w - M) - (w - N) * (q - L), M = H - w, G = -(x - q), w = (x - (D * E - F * Q)) * (H - w) - (H - (D * Q + F * E)) * (x - q), x = A * G - B * M, q = (L * G - B * w) / x, w = (A * w - L * M) / x;
      l.push({x:z + q, y:N + w, type:1});
      for(x = O - J;x > Math.PI;) {
        x -= 2 * Math.PI
      }
      for(;x <= -Math.PI;) {
        x += 2 * Math.PI
      }
      H = Math.ceil(12 * (Math.abs(x) / Math.PI));
      for(L = 1;L <= H;L++) {
        O = J + x * L / H, M = y * Math.cos(O), O = t * Math.sin(O), l.push({x:M * E - O * Q + q, y:M * Q + O * E + w, type:4})
      }
      l[l.length - 1].type = 1
    }
    this.target.arcTo.apply(this.target, arguments);
    this.hitCtx && this.hitCtx.arcTo.apply(this.hitCtx, arguments)
  }, rect:function(a, b, d, e) {
    var f = this.segments[this.segments.length - 1];
    f === this.points.length - 1 ? (this.points[f].x = a, this.points[f].y = b) : (this.segments.push(this.points.length), this.points.push({x:a, y:b, type:0}));
    this.points.push({x:a + d, y:b, type:1});
    this.points.push({x:a + d, y:b + e, type:1});
    this.points.push({x:a, y:b + e, type:1});
    this.points.push({x:a, y:b, type:2});
    this.target.rect(a, b, d, e);
    this.hitCtx && this.hitCtx.rect(a, b, d, e)
  }, strokeToPath:function(a, b) {
    var d = b || {strokeWidth:this.lineWidth, startCap:this.lineCap, endCap:this.lineCap, join:this.lineJoin, miterLimit:this.miterLimit}, e = function(a, b, e, f) {
      e.type = 3;
      switch(b) {
        case "round":
          var g = (e.x2 + f.x1) / 2;
          f = (e.y2 + f.y1) / 2;
          b = e.x2 - g;
          var m = e.y2 - f;
          for(e = 0;12 > e;e++) {
            var n = b * l - m * k, q = b * k + m * l;
            a.push({x1:g + b, y1:f + m, x2:g + n, y2:f + q, type:3});
            b = n;
            m = q
          }
          break;
        case "square":
          g = d.strokeWidth / 2, b = e.x2 - e.x1, m = e.y2 - e.y1, n = Math.sqrt(b * b + m * m), e.x2 += b * g / n, e.y2 += m * g / n, f.x1 += b * g / n, f.y1 += m * g / n;
        default:
          a.push({x1:e.x2, y1:e.y2, x2:f.x1, y2:f.y1, type:3})
      }
    }, f = function(a, b, e, f) {
      var g = b.y2 - b.y1, k = -(b.x2 - b.x1), l = b.x1 * b.y2 - b.x2 * b.y1, m = e.y2 - e.y1, n = -(e.x2 - e.x1), q = e.x1 * e.y2 - e.x2 * e.y1, r = g * n - k * m;
      if(0 == r) {
        a.push({type:"lineTo", args:[b.x2, b.y2]}), a.push({type:"lineTo", args:[e.x1, e.y1]})
      }else {
        if(k = (l * n - k * q) / r, g = (g * q - l * m) / r, r = !(k < b.x1 && k < b.x2 || k > b.x1 && k > b.x2 || g < b.y1 && g < b.y2 || g > b.y1 && g > b.y2), l = !(k < e.x1 && k < e.x2 || k > e.x1 && k > e.x2 || g < e.y1 && g < e.y2 || g > e.y1 && g > e.y2), !r && !l) {
          switch(f) {
            default:
            ;
            case "bevel":
              a.push({type:"lineTo", args:[b.x2, b.y2]});
              a.push({type:"lineTo", args:[e.x1, e.y1]});
              break;
            case "round":
              a.push({type:"lineTo", args:[b.x2, b.y2]});
              a.push({type:"quadraticCurveTo", args:[k, g, e.x1, e.y1]});
              break;
            case "miter":
              a.push({type:"lineTo", args:[b.x2, b.y2]}), f = -(b.y2 - e.y1), l = b.x2 - e.x1, r = Math.sqrt(f * f + l * l), f = (f * (k - e.x1) + l * (g - e.y1)) / r, r = d.miterLimit * d.strokeWidth / 2, f > r ? (f = r / f, r = 1 - f, a.push({type:"lineTo", args:[b.x2 * r + k * f, b.y2 * r + g * f]}), a.push({type:"lineTo", args:[e.x1 * r + k * f, e.y1 * r + g * f]})) : a.push({type:"lineTo", args:[k, g]}), a.push({type:"lineTo", args:[e.x1, e.y1]})
          }
        }else {
          !r || !l ? (a.push({type:"lineTo", args:r ? [k, g] : [b.x2, b.y2]}), a.push({type:"lineTo", args:l ? [k, g] : [e.x1, e.y1]})) : a.push({type:"lineTo", args:[k, g]})
        }
      }
    }, g = function(b) {
      for(var e = {type:"moveTo", args:null}, g = [e], k = d.join, l = 0;l < b.length;l++) {
        switch(b[l].type) {
          default:
            f(g, b[l], b[(l + 1) % b.length], k);
            break;
          case 3:
            g.push({type:"lineTo", args:[b[l].x2, b[l].y2]});
            break;
          case 4:
            f(g, b[l], b[(l + 1) % b.length], "bevel")
        }
      }
      e.args = g[g.length - 1].args.slice(-2);
      g.push({type:"closePath"});
      for(b = 0;b < g.length;b++) {
        a[g[b].type].apply(a, g[b].args)
      }
    }, u = 0, C = this.segments, q = this.points, w = C[0];
    do {
      ++u;
      var x = u < C.length ? C[u] : q.length;
      if(0 !== q[w].type) {
        throw"invalid points structure";
      }
      if(w + 1 >= x) {
        x = w
      }else {
        var H = 2 === q[x - 1].type, y = q[w].x, t = q[w].y, N = 0;
        w++;
        for(var L = [], M = [], J = d.strokeWidth / 2;w < x;w++) {
          var O = q[w].x, A = q[w].y, D = q[w].type, z = O - y, E = A - t;
          if(!(0 == z && 0 == E)) {
            var Q = J / Math.sqrt(z * z + E * E), z = z * Q, E = E * Q;
            L.push({x1:y + E, y1:t - z, x2:O + E, y2:A - z, type:D});
            M.push({x1:O - E, y1:A + z, x2:y - E, y2:t + z, type:N});
            y = O;
            t = A;
            N = D
          }
        }
        0 !== L.length && (M.reverse(), H ? (g(L), g(M)) : (e(L, d.endCap, L[L.length - 1], M[0]), e(M, d.startCap, M[M.length - 1], L[0]), L = L.concat(M), g(L)));
        w = x
      }
    }while(u < C.length)
  }, getBounds:function() {
    var a = this.points;
    if(1 >= a.length) {
      return null
    }
    var b, d, e, f;
    b = e = a[0].x;
    d = f = a[0].y;
    for(var g = 1;g < a.length;g++) {
      var k = a[g].x, l = a[g].y;
      k < b && (b = k);
      l < d && (d = l);
      k > e && (e = k);
      l > f && (f = l)
    }
    return{minX:b, minY:d, maxX:e, maxY:f}
  }};
  e = g;
  d.__glue__ = {"native":{instance:{beginFill:d.beginFill, beginGradientFill:d.beginGradientFill, beginBitmapFill:d.beginBitmapFill, beginFillObject:d.beginFillObject, beginStrokeObject:d.beginStrokeObject, clear:d.clear, copyFrom:d.copyFrom, cubicCurveTo:d.cubicCurveTo, curveTo:d.curveTo, drawPath:d.drawPath, drawPathObject:d.drawPathObject, drawRect:d.drawRect, drawRoundRect:d.drawRoundRect, drawRoundRectComplex:d.drawRoundRectComplex, drawTriangles:d.drawTriangles, endFill:d.endFill, lineBitmapStyle:d.lineBitmapStyle, 
  lineGradientStyle:d.lineGradientStyle, lineStyle:d.lineStyle, moveTo:d.moveTo, lineTo:d.lineTo}}};
  return d
}.call(this), InteractiveObjectDefinition = function() {
  var a = {initialize:function() {
    this._doubleClickEnabled = !1;
    this._hitArea = null;
    this._mouseEnabled = !0;
    this._tabEnabled = !1;
    this._focusRect = null
  }, get accessibilityImplementation() {
    return null
  }, set accessibilityImplementation(a) {
    notImplemented()
  }, get contextMenu() {
    return null
  }, set contextMenu(a) {
    notImplemented()
  }, get doubleClickEnabled() {
    return this._doubleClickEnabled
  }, set doubleClickEnabled(a) {
    this._doubleClickEnabled = a
  }, get focusRect() {
    return this._focusRect
  }, set focusRect(a) {
    this._focusRect = a
  }, get mouseEnabled() {
    return this._mouseEnabled
  }, set mouseEnabled(a) {
    this._mouseEnabled = a
  }, get needsSoftKeyboard() {
    return!1
  }, set needsSoftKeyboard(a) {
    notImplemented()
  }, get softKeyboardInputAreaOfInterest() {
    return null
  }, set softKeyboardInputAreaOfInterest(a) {
    notImplemented()
  }, get tabEnabled() {
    return this._tabEnabled
  }, set tabEnabled(a) {
    var b = this._tabEnabled;
    this._tabEnabled = a;
    b !== a && (a = flash.events.Event, this.dispatchEvent(new a(a.class.TAB_ENABLED_CHANGE, !1, !1)))
  }, get tabIndex() {
    return-1
  }, requestSoftKeyboard:function() {
    notImplemented()
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{tabEnabled:b(a, "tabEnabled"), tabIndex:b(a, "tabIndex"), focusRect:b(a, "focusRect"), mouseEnabled:b(a, "mouseEnabled"), doubleClickEnabled:b(a, "doubleClickEnabled"), accessibilityImplementation:b(a, "accessibilityImplementation"), softKeyboardInputAreaOfInterest:b(a, "softKeyboardInputAreaOfInterest"), needsSoftKeyboard:b(a, "needsSoftKeyboard"), contextMenu:b(a, "contextMenu"), requestSoftKeyboard:a.requestSoftKeyboard}}};
  return a
}.call(this), $RELEASE = !1, LoaderDefinition = function() {
  function a(a, b) {
    function d() {
      var a = {}, b = {type:"frame"}, e = 0, f = null;
      return{onstart:function(a) {
        m({command:"init", result:a})
      }, onprogress:function(d) {
        m({command:"progress", result:{bytesLoaded:d.bytesLoaded, bytesTotal:d.bytesTotal}});
        d = d.tags;
        for(var g = d.length;e < g;e++) {
          var k = d[e];
          if("id" in k) {
            var n = void 0;
            switch(k.code) {
              case SWF_TAG_CODE_DEFINE_BITS:
              ;
              case SWF_TAG_CODE_DEFINE_BITS_JPEG2:
              ;
              case SWF_TAG_CODE_DEFINE_BITS_JPEG3:
              ;
              case SWF_TAG_CODE_DEFINE_BITS_JPEG4:
              ;
              case SWF_TAG_CODE_JPEG_TABLES:
                n = defineImage(k, l);
                break;
              case SWF_TAG_CODE_DEFINE_BITS_LOSSLESS:
              ;
              case SWF_TAG_CODE_DEFINE_BITS_LOSSLESS2:
                n = defineBitmap(k, l);
                break;
              case SWF_TAG_CODE_DEFINE_BUTTON:
              ;
              case SWF_TAG_CODE_DEFINE_BUTTON2:
                n = defineButton(k, l);
                break;
              case SWF_TAG_CODE_DEFINE_EDIT_TEXT:
                n = defineText(k, l);
                break;
              case SWF_TAG_CODE_DEFINE_FONT:
              ;
              case SWF_TAG_CODE_DEFINE_FONT2:
              ;
              case SWF_TAG_CODE_DEFINE_FONT3:
              ;
              case SWF_TAG_CODE_DEFINE_FONT4:
                n = defineFont(k, l);
                break;
              case SWF_TAG_CODE_DEFINE_MORPH_SHAPE:
              ;
              case SWF_TAG_CODE_DEFINE_MORPH_SHAPE2:
              ;
              case SWF_TAG_CODE_DEFINE_SHAPE:
              ;
              case SWF_TAG_CODE_DEFINE_SHAPE2:
              ;
              case SWF_TAG_CODE_DEFINE_SHAPE3:
              ;
              case SWF_TAG_CODE_DEFINE_SHAPE4:
                n = defineShape(k, l);
                break;
              case SWF_TAG_CODE_DEFINE_SOUND:
                n = defineSound(k, l);
                break;
              case SWF_TAG_CODE_DEFINE_SPRITE:
                for(var n = {}, x = {type:"frame"}, H = [], y = k.tags, t = null, N = 0, L = 0, M = y.length;L < M;L++) {
                  var J = y[L];
                  switch(J.code) {
                    case SWF_TAG_CODE_DO_ACTION:
                      t || (t = []);
                      t.push(N);
                      t.push(J.actionsData);
                      break;
                    case SWF_TAG_CODE_START_SOUND:
                      (x.startSounds || (x.startSounds = [])).push(J);
                      break;
                    case SWF_TAG_CODE_SOUND_STREAM_HEAD:
                      try {
                        soundStream = createSoundStream(J), x.soundStream = soundStream.info
                      }catch(O) {
                      }
                      break;
                    case SWF_TAG_CODE_SOUND_STREAM_BLOCK:
                      soundStream && (x.soundStreamBlock = soundStream.decode(J.data));
                      break;
                    case SWF_TAG_CODE_FRAME_LABEL:
                      x.labelName = J.name;
                      break;
                    case SWF_TAG_CODE_PLACE_OBJECT:
                    ;
                    case SWF_TAG_CODE_PLACE_OBJECT2:
                    ;
                    case SWF_TAG_CODE_PLACE_OBJECT3:
                      n[J.depth] = J;
                      break;
                    case SWF_TAG_CODE_REMOVE_OBJECT:
                    ;
                    case SWF_TAG_CODE_REMOVE_OBJECT2:
                      n[J.depth] = null;
                      break;
                    case SWF_TAG_CODE_SHOW_FRAME:
                      for(J = 1;L < M && y[L + 1].code === SWF_TAG_CODE_SHOW_FRAME;) {
                        L++, J++
                      }
                      N += J;
                      x.repeat = J;
                      x.depths = n;
                      H.push(x);
                      n = {};
                      x = {type:"frame"}
                  }
                }
                n = {type:"sprite", id:k.id, frameCount:k.frameCount, frames:H, frameScripts:t};
                break;
              case SWF_TAG_CODE_DEFINE_TEXT:
              ;
              case SWF_TAG_CODE_DEFINE_TEXT2:
                n = defineLabel(k, l)
            }
            n ? (l[k.id] = n, m(n)) : m({command:"error", message:"unknown symbol type: " + k.code})
          }else {
            switch(k.code) {
              case SWF_TAG_CODE_DO_ABC:
                (n = b.abcBlocks) ? n.push({data:k.data, flags:k.flags}) : b.abcBlocks = [{data:k.data, flags:k.flags}];
                break;
              case SWF_TAG_CODE_DO_ACTION:
                (n = b.actionBlocks) ? n.push(k.actionsData) : b.actionBlocks = [k.actionsData];
                break;
              case SWF_TAG_CODE_DO_INIT_ACTION:
                n = b.initActionBlocks;
                n || (b.initActionBlocks = n = {});
                n[k.spriteId] = k.actionsData;
                break;
              case SWF_TAG_CODE_START_SOUND:
                n = b.startSounds;
                n || (b.startSounds = n = []);
                n.push(k);
                break;
              case SWF_TAG_CODE_SOUND_STREAM_HEAD:
                try {
                  f = createSoundStream(k), b.soundStream = f.info
                }catch(A) {
                }
                break;
              case SWF_TAG_CODE_SOUND_STREAM_BLOCK:
                f && (b.soundStreamBlock = f.decode(k.data));
                break;
              case SWF_TAG_CODE_EXPORT_ASSETS:
              ;
              case SWF_TAG_CODE_SYMBOL_CLASS:
                n = b.exports;
                b.exports = n ? n.concat(k.exports) : k.exports.slice(0);
                break;
              case SWF_TAG_CODE_FRAME_LABEL:
                b.labelName = k.name;
                break;
              case SWF_TAG_CODE_PLACE_OBJECT:
              ;
              case SWF_TAG_CODE_PLACE_OBJECT2:
              ;
              case SWF_TAG_CODE_PLACE_OBJECT3:
                a[k.depth] = k;
                break;
              case SWF_TAG_CODE_REMOVE_OBJECT:
              ;
              case SWF_TAG_CODE_REMOVE_OBJECT2:
                a[k.depth] = null;
                break;
              case SWF_TAG_CODE_SET_BACKGROUND_COLOR:
                b.bgcolor = k.color;
                break;
              case SWF_TAG_CODE_SHOW_FRAME:
                for(k = 1;e < g;) {
                  n = d[e + 1];
                  if(!n || n.code !== SWF_TAG_CODE_SHOW_FRAME) {
                    break
                  }
                  e++;
                  k++
                }
                b.repeat = k;
                b.depths = a;
                m(b);
                a = {};
                b = {type:"frame"}
            }
          }
        }
      }, oncomplete:function(a) {
        m(a);
        m({command:"complete"})
      }}
    }
    function k(a) {
      SWF.parse(a, d())
    }
    var l = {}, m;
    m = a ? function(b) {
      return a._commitData(b)
    } : function(a) {
      self.postMessage(a)
    };
    if("object" === typeof b) {
      if(b instanceof ArrayBuffer) {
        k(b)
      }else {
        if("subscribe" in b) {
          var n = SWF.parseAsync(d());
          b.subscribe(n.push.bind(n))
        }else {
          "undefined" !== typeof FileReaderSync ? (n = new FileReaderSync, n = n.readAsArrayBuffer(b), k(n)) : (n = new FileReader, n.onload = function() {
            k(this.result)
          }, n.readAsArrayBuffer(b))
        }
      }
    }else {
      n = new XMLHttpRequest, n.open("GET", b), n.responseType = "arraybuffer", n.onload = function() {
        k(this.response)
      }, n.send()
    }
  }
  var b = "../../../lib/DataView.js/DataView.js ../util.js ../../swf/util.js ../../swf/swf.js ../../swf/types.js ../../swf/structs.js ../../swf/tags.js ../../swf/inflate.js ../../swf/stream.js ../../swf/templates.js ../../swf/generator.js ../../swf/handlers.js ../../swf/parser.js ../../swf/bitmap.js ../../swf/button.js ../../swf/font.js ../../swf/image.js ../../swf/label.js ../../swf/shape.js ../../swf/sound.js ../../swf/text.js".split(" ");
  $RELEASE && (b = ["../../shumway-worker.js"]);
  if("undefined" === typeof window) {
    importScripts.apply(null, b), self.onmessage = function(b) {
      "pipe:" !== b.data && a(null, b.data);
      var d = {subscribe:function(a) {
        this.callback = a
      }};
      a(null, d);
      self.onmessage = function(a) {
        d.callback(a.data.data, a.data.progress)
      }
    }
  }else {
    b = document.head;
    b.insertBefore(document.createElement("style"), b.firstChild);
    var d = document.styleSheets[0];
    return{__class__:"flash.display.Loader", initialize:function() {
      this._contentLoaderInfo = new flash.display.LoaderInfo;
      this._contentLoaderInfo._loader = this;
      this._dictionary = {};
      this._displayList = null;
      this._symbols = {};
      this._timeline = [];
      this._previousPromise = null
    }, _commitData:function(a) {
      var b = this.contentLoaderInfo;
      switch(a.command) {
        case "init":
          this._init(a.result);
          break;
        case "progress":
          this._updateProgress(a.result);
          break;
        case "complete":
          b.dispatchEvent(new flash.events.Event("complete", !1, !1));
          break;
        case "error":
          console.error("ERROR: " + a.message);
          break;
        default:
          a.id ? this._commitSymbol(a) : "frame" === a.type && this._commitFrame(a)
      }
    }, _updateProgress:function(a) {
      var b = this.contentLoaderInfo;
      b._bytesLoaded = a.bytesLoaded || 0;
      b._bytesTotal = a.bytesTotal || 0;
      a = avm2.systemDomain.getClass("flash.events.ProgressEvent");
      b.dispatchEvent(a.createInstance(["progress", !1, !1, b._bytesLoaded, b._bytesTotal]))
    }, _buildFrame:function(a, b, d, k) {
      var l = this._dictionary;
      a = Object.create(a);
      var m = k.depths;
      if(m) {
        for(var n in m) {
          var p = m[n];
          if(p) {
            if(a[n] && p.move) {
              var r = p, p = Object.create(a[n]), v;
              for(v in r) {
                var s = r[v];
                s && (p[v] = s)
              }
            }
            p.symbolId && ((r = l[p.symbolId]) && !r.resolved && d.push(r), p = Object.create(p, {promise:{value:r}}))
          }
          a[n] = p
        }
      }
      for(d = k.repeat;d--;) {
        b.push(a)
      }
      return a
    }, _commitFrame:function(a) {
      var b = a.abcBlocks, d = a.actionBlocks, k = a.exports, l = this, m = l._dictionary, n = l.contentLoaderInfo, p = l._timeline, r = p.length + 1, v = new Promise, s = a.labelName, u = this._previousPromise;
      this._previousPromise = v;
      u = [u];
      this._displayList = this._buildFrame(this._displayList, p, u, a, r);
      n._backgroundColor = a.bgcolor ? a.bgcolor : {color:16777215, alpha:255};
      Promise.when.apply(Promise, u).then(function() {
        if(b && l._isAvm2Enabled) {
          for(var u = avm2.applicationDomain, q = 0, w = b.length;q < w;q++) {
            var x = new AbcFile(b[q].data, "abc_block_" + q);
            b[q].flags ? u.loadAbc(x) : u.executeAbc(x)
          }
        }
        if(k && l._isAvm2Enabled) {
          q = 0;
          for(w = k.length;q < w;q++) {
            u = k[q], (x = m[u.symbolId]) && x.then(function(a, b) {
              return function() {
                var d = a.value;
                d.className = b;
                avm2.applicationDomain.getClass(b).setSymbol(d.props)
              }
            }(x, u.className))
          }
        }
        if(u = l._content) {
          if(u._framesLoaded += a.repeat, s && u._frameLabels && (u._frameLabels[s] = {__class__:"flash.display.FrameLabel", frame:r, name:s}), !l._isAvm2Enabled && (H = l._avm1Context, d)) {
            for(q = 0;q < d.length;q++) {
              t = d[q], u.addFrameScript(r - 1, function(a) {
                return function() {
                  return executeActions(a, H, this._getAS2Object(), k)
                }
              }(t))
            }
          }
        }else {
          q = l._parent;
          assert(m[0].resolved);
          u = m[0].value;
          w = avm2.applicationDomain.getClass(u.className);
          u = w.createAsSymbol({framesLoaded:p.length, loader:l, parent:q, timeline:p, totalFrames:u.props.totalFrames, stage:l._stage});
          q && q == l._stage ? (q._frameRate = n._frameRate, q._stageHeight = n._height, q._stageWidth = n._width, q._root = u) : l._children.push(u);
          s && (q = {}, q[s] = {__class__:"flash.display.FrameLabel", frame:r, name:s}, u.symbol.frameLabels = q);
          if(!l._isAvm2Enabled) {
            var H = l._avm1Context, x = u._getAS2Object();
            H.globals._root = x;
            H.globals._level0 = x;
            var y = {1:[]};
            if(d) {
              for(q = 0;q < d.length;q++) {
                var t = d[q];
                y[1].push(function(a) {
                  return function() {
                    return executeActions(a, H, this._getAS2Object(), k)
                  }
                }(t))
              }
            }
            var q = l.loaderInfo._parameters, N;
            for(N in q) {
              N in x || (x[N] = q[N])
            }
            u.symbol.frameScripts = y
          }
          w.instance.call(u);
          l._content = u
        }
        a.startSounds && u._registerStartSounds(r, a.startSounds);
        a.soundStream && u._initSoundStream(a.soundStream);
        a.soundStreamBlock && u._addSoundStreamBlock(r, a.soundStreamBlock);
        1 === r && n.dispatchEvent(new flash.events.Event("init", !1, !1));
        v.resolve(a)
      })
    }, _commitSymbol:function(a) {
      var b = "flash.display.DisplayObject", g = a.require, k = this._dictionary, l = [], m = {loader:this}, n = new Promise;
      if(g && g.length) {
        for(var p = 0, r = g.length;p < r;p++) {
          var v = k[g[p]];
          v && !v.resolved && l.push(v)
        }
      }
      switch(a.type) {
        case "button":
          var p = {}, s;
          for(s in a.states) {
            var r = [], g = {}, v = a.states[s], u;
            for(u in v) {
              var C = v[u], q = k[C.symbolId];
              q && !q.resolved && l.push(q);
              r.push(q);
              g[u] = Object.create(C, {promise:{value:q}})
            }
            1 === r.length ? p[s] = r[0] : (r = new Promise, r.resolve({className:"flash.display.Sprite", props:{loader:this, timeline:[g]}}), p[s] = r)
          }
          b = "flash.display.SimpleButton";
          m.states = p;
          m.buttonActions = a.buttonActions;
          break;
        case "font":
          fromCharCode.apply(null, a.codes) && (d.insertRule('@font-face{font-family:"' + a.name + '";src:url(data:font/opentype;base64,' + btoa(a.data) + ")}", d.cssRules.length), b = "flash.text.Font");
          break;
        case "image":
          var w = new Image, x = new Promise;
          w.onload = function() {
            if(a.mask) {
              var b = document.createElement("canvas");
              b.width = a.width;
              b.height = a.height;
              var d = b.getContext("2d");
              d.drawImage(w, 0, 0);
              for(var f = d.getImageData(0, 0, a.width, a.height), g = f.data, k = a.mask, l = f.width * f.height, n = 0, p = 3;n < l;n++, p += 4) {
                g[p] = k[n]
              }
              d.putImageData(f, 0, 0);
              m.img = b
            }
            x.resolve()
          };
          w.src = "data:" + a.mimeType + ";base64," + btoa(a.data);
          l.push(x);
          b = "flash.display.BitmapData";
          m.img = w;
          m.width = a.width;
          m.height = a.height;
          break;
        case "label":
          var H = new Function("d,c,r", a.data), b = "flash.text.StaticText";
          m.bbox = a.bbox;
          m.draw = function(a, b) {
            return H.call(this, k, a, b)
          };
          break;
        case "text":
          H = new Function("d,c,r", a.data);
          b = "flash.text.TextField";
          m.bbox = a.bbox;
          m.draw = function(a, b) {
            return H.call(this, k, a, b)
          };
          m.text = a.value;
          m.variableName = a.variableName;
          break;
        case "shape":
          var y = new Function("d,r", "return " + a.data), b = a.morph ? "flash.display.MorphShape" : "flash.display.Shape";
          m.bbox = a.bbox;
          m.graphicsFactory = function D(a) {
            if(D[a]) {
              return D[a]
            }
            var b = new flash.display.Graphics;
            b._scale = 0.05;
            b.drawGraphicsData(y(k, a));
            return D[a] = b
          };
          break;
        case "sound":
          if(!a.pcm && !PLAY_USING_AUDIO_TAG) {
            assert("audio/mpeg" === a.packaged.mimeType);
            var t = new Promise;
            MP3DecoderSession.processAll(a.packaged.data, function(a, b, d, e) {
              a.pcm = b || new Uint8Array(0);
              t.resolve();
              e && console.error("ERROR: " + e)
            }.bind(null, m));
            l.push(t)
          }
          b = "flash.media.Sound";
          m.sampleRate = a.sampleRate;
          m.channels = a.channels;
          m.pcm = a.pcm;
          m.packaged = a.packaged;
          break;
        case "sprite":
          g = null;
          s = a.frameCount;
          u = {};
          for(var v = 1, N = a.frames, C = [], q = [], p = 0, r = N.length;p < r;p++) {
            var L = N[p], v = C.length + 1;
            L.labelName && (u[L.labelName] = {__class__:"flash.display.FrameLabel", frame:v, name:L.labelName});
            if(L.startSounds) {
              q[v] = L.startSounds;
              for(var M = 0;M < L.startSounds.length;M++) {
                var J = k[L.startSounds[M].soundId];
                J && !J.resolved && l.push(J)
              }
            }
            g = this._buildFrame(g, C, l, L, v)
          }
          g = {};
          if(!this._isAvm2Enabled && a.frameScripts) {
            for(var O = this._avm1Context, r = a.frameScripts, p = 0;p < r.length;p += 2) {
              v = r[p] + 1, N = function(a) {
                return function() {
                  return executeActions(a, O, this._getAS2Object())
                }
              }(r[p + 1]), g[v] ? g[v].push(N) : g[v] = [N]
            }
          }
          b = "flash.display.MovieClip";
          m.timeline = C;
          m.framesLoaded = s;
          m.frameLabels = u;
          m.frameScripts = g;
          m.totalFrames = s;
          m.startSoundRegistrations = q
      }
      k[a.id] = n;
      Promise.when.apply(Promise, l).then(function() {
        n.resolve({className:b, props:m})
      })
    }, _init:function(a) {
      var b = this.contentLoaderInfo;
      b._swfVersion = a.swfVersion;
      var d = a.bbox;
      b._width = d.right - d.left;
      b._height = d.bottom - d.top;
      b._frameRate = a.frameRate;
      var k = new Promise, b = new Promise;
      b.then(function() {
        k.resolve({className:"flash.display.MovieClip", props:{totalFrames:a.frameCount}})
      });
      this._previousPromise = this._dictionary[0] = k;
      this._vmPromise = b;
      this._isAvm2Enabled = a.fileAttributes.doAbc;
      this._setup()
    }, _loadFrom:function(b, d) {
      if("undefined" !== typeof window) {
        var g = this, k = new Worker(SHUMWAY_ROOT + "flash/display/Loader.js");
        k.onmessage = function(a) {
          g._commitData(a.data)
        };
        "object" === typeof b && "subscribe" in b ? (k.postMessage("pipe:"), b.subscribe(function(a, b) {
          k.postMessage({data:a, progress:b})
        })) : k.postMessage(b)
      }else {
        a(this, b, d)
      }
    }, _setup:function() {
      var a = this._stage;
      if(this._isAvm2Enabled) {
        avm2.systemDomain.getClass("flash.ui.Mouse")._stage = a
      }else {
        var b = new AS2Context(this.contentLoaderInfo._swfVersion);
        b.stage = a;
        this._avm1Context = b;
        AS2Key.$bind(a);
        AS2Mouse.$bind(a)
      }
      this._vmPromise.resolve()
    }, get contentLoaderInfo() {
      return this._contentLoaderInfo
    }, close:function() {
      notImplemented()
    }, load:function(a) {
      this._loadFrom(a.url)
    }, loadBytes:function(a) {
      if(!a.length) {
        throw ArgumentError();
      }
      this._loadFrom(a)
    }, unload:function() {
      notImplemented()
    }, unloadAndStop:function() {
      notImplemented()
    }, __glue__:{"native":{instance:{contentLoaderInfo:{get:function() {
      return this._contentLoaderInfo
    }}, close:function() {
      notImplemented()
    }, load:function(a) {
      this._loadFrom(a.url)
    }, loadBytes:function(a) {
      if(!a.length) {
        throw ArgumentError();
      }
      this._loadFrom(a)
    }, unload:function() {
      notImplemented()
    }, unloadAndStop:function() {
      notImplemented()
    }, _getJPEGLoaderContextdeblockingfilter:function() {
      return 0
    }, _load:function(a) {
      this._loadFrom(resolveURI(a.url))
    }}}}}
  }
}.call(this), LoaderInfoDefinition = function() {
  return{__class__:"flash.display.LoaderInfo", initialize:function() {
    this._bytes = this._backgroundColor = this._actionScriptVersion = null;
    this._bytesTotal = this._bytesLoaded = 0;
    this._width = this._url = this._swfVersion = this._loaderURL = this._loader = this._height = this._frameRate = this._contentType = this._content = null
  }, __glue__:{"native":{"static":{getLoaderInfoByDefinition:function() {
    notImplemented("LoaderInfo.getLoaderInfoByDefinition")
  }}, instance:{_getArgs:function() {
    var a = this._parameters, b = {}, d;
    for(d in a) {
      b[Multiname.getPublicQualifiedName(d)] = a[d]
    }
    return b
  }, _getUncaughtErrorEvents:function() {
    notImplemented("LoaderInfo._getUncaughtErrorEvents")
  }, _setUncaughtErrorEvents:function() {
    notImplemented("LoaderInfo._setUncaughtErrorEvents")
  }, loaderURL:{get:function() {
    return this._loaderURL
  }}, url:{get:function() {
    return this._url
  }}, isURLInaccessible:{get:function() {
    return this._isURLInaccessible
  }}, bytesLoaded:{get:function() {
    return this._bytesLoaded
  }}, bytesTotal:{get:function() {
    return this._bytesTotal
  }}, applicationDomain:{get:function() {
    return avm2.applicationDomain._getScriptObject()
  }}, swfVersion:{get:function() {
    if(!this._swfVersion) {
      throw Error();
    }
    return this._swfVersion
  }}, actionScriptVersion:{get:function() {
    return this._actionScriptVersion
  }}, frameRate:{get:function() {
    return this._frameRate
  }}, width:{get:function() {
    return this._width
  }}, height:{get:function() {
    return this._height
  }}, contentType:{get:function() {
    return this._contentType
  }}, sharedEvents:{get:function() {
    return this._sharedEvents
  }}, parentSandboxBridge:{get:function() {
    return this._parentSandboxBridge
  }, set:function(a) {
    this._parentSandboxBridge = a
  }}, childSandboxBridge:{get:function() {
    return this._childSandboxBridge
  }, set:function(a) {
    this._childSandboxBridge = a
  }}, sameDomain:{get:function() {
    return this._sameDomain
  }}, childAllowsParent:{get:function() {
    return this._childAllowsParent
  }}, parentAllowsChild:{get:function() {
    return this._parentAllowsChild
  }}, loader:{get:function() {
    return this._loader
  }}, content:{get:function() {
    return this._content
  }}, bytes:{get:function() {
    return this._bytes
  }}}}, script:{instance:scriptProperties("public", ["swfVersion", "bytesTotal", "bytesLoaded"])}}}
}.call(this), MorphShapeDefinition = function() {
  return{__class__:"flash.display.MorphShape", initialize:function() {
    this._graphics = new flash.display.Graphics;
    var a = this.symbol;
    this._graphics = a && a.graphicsFactory ? a.graphicsFactory(a.ratio || 0) : new flash.display.Graphics
  }, __glue__:{"native":{instance:{graphics:{get:function() {
    return this._graphics
  }}}}}}
}.call(this), MovieClipDefinition = function() {
  var a = {__class__:"flash.display.MovieClip", initialize:function() {
    this._currentFrame = 0;
    this._currentFrameLabel = null;
    this._currentLabel = !1;
    this._currentScene = {};
    this._enabled = null;
    this._frameScripts = {};
    this._frameLabels = {};
    this._framesLoaded = 1;
    this._isPlaying = !0;
    this._scenes = {};
    this._timeline = null;
    this._totalFrames = 1;
    this._startSoundRegistrations = [];
    var a = this.symbol;
    a && (this._timeline = a.timeline || null, this._framesLoaded = a.framesLoaded || 1, this._frameLabels = Object.create(a.frameLabels || null), this._frameScripts = Object.create(a.frameScripts || null), this._totalFrames = a.totalFrames || 1, this._startSoundRegistrations = a.startSoundRegistrations || [])
  }, _callFrame:function(a) {
    if(a in this._frameScripts) {
      a = this._frameScripts[a];
      for(var b = 0, f = a.length;b < f;b++) {
        a[b].call(this)
      }
    }
  }, _as2CallFrame:function(a) {
    isNaN(a) ? (a = this._frameLabels[a]) && this._callFrame(a.frame) : this._callFrame(a)
  }, _getAS2Object:function() {
    this.$as2Object || (new AS2MovieClip).$attachNativeObject(this);
    return this.$as2Object
  }, _gotoFrame:function(a) {
    if(1 > a || a > this._totalFrames) {
      a = 1
    }
    a > this.framesLoaded && (a = this.framesLoaded);
    var b = this._currentFrame;
    if(a !== b) {
      this._markAsDirty();
      if(0 < b) {
        var f = this._children, g = this._timeline, k = g[b - 1], g = g[a - 1];
        if(g !== k) {
          var b = a > b ? g : k, l;
          for(l in b) {
            for(var b = g[l], m = k[l], n = null, p = -1, r = f.length, v = r;v--;) {
              var s = f[v];
              if(s._depth > l) {
                s._animated && (r = v)
              }else {
                if(s._depth == l) {
                  n = s;
                  p = v;
                  break
                }
              }
            }
            if(b) {
              if(b !== m) {
                if(n && b.symbolId === m.symbolId && b.ratio === m.ratio) {
                  if(n._animated) {
                    b.hasClipDepth && (s._clipDepth = b.clipDepth);
                    if(b.hasMatrix) {
                      var p = b.matrix, r = p.a, u = p.b, v = p.c, m = p.d;
                      n._rotation = 180 * Math.atan2(u, r) / Math.PI;
                      u = Math.sqrt(r * r + u * u);
                      n._scaleX = 0 < r ? u : -u;
                      r = Math.sqrt(m * m + v * v);
                      n._scaleY = 0 < m ? r : -r;
                      n._x = p.tx;
                      n._y = p.ty;
                      n._currentTransform = p
                    }
                    b.hasCxform && (n._cxform = b.cxform)
                  }
                }else {
                  m = r, r = !1, n && (m = p, r = !0, this._control.removeChild(n._control), n.dispatchEvent(new flash.events.Event("removed"))), this._addTimelineChild(b, m, r)
                }
              }
            }else {
              n && n._owned && (f.splice(p, 1), this._control.removeChild(n._control), n.dispatchEvent(new flash.events.Event("removed")))
            }
          }
          this._constructChildren()
        }
      }
      if(this._currentFrame = a) {
        this._callFrame(a), this._startSounds(a)
      }
    }
  }, _registerStartSounds:function(a, b) {
    this._startSoundRegistrations[a] = b
  }, _initSoundStream:function(a) {
    var b = this._soundStream = {data:{pcm:new Float32Array(a.samplesCount * a.channels), sampleRate:a.sampleRate, channels:a.channels}, seekIndex:[], position:0};
    "mp3" === a.format && (b.decoderPosition = 0, b.decoderSession = new MP3DecoderSession, b.decoderSession.onframedata = function(a) {
      var d = b.decoderPosition;
      b.data.pcm.set(a, d);
      b.decoderPosition = d + a.length
    }.bind(this), b.decoderSession.onerror = function(a) {
      console.error("ERROR: MP3DecoderSession: " + a)
    })
  }, _addSoundStreamBlock:function(a, b) {
    var f = this._soundStream, g = f.position;
    f.seekIndex[a] = g + b.seek * f.data.channels;
    f.position = g + b.samplesCount * f.data.channels;
    var k = f.decoderSession;
    k ? k.pushAsync(b.data) : f.data.pcm.set(b.pcm, g)
  }, _startSounds:function(a) {
    var b = this._startSoundRegistrations[a];
    if(b) {
      for(var f = this._sounds || (this._sounds = {}), g = this.loaderInfo._loader, k = 0;k < b.length;k++) {
        var l = b[k], m = l.soundId, l = l.soundInfo, n = f[m];
        if(!n) {
          n = g._dictionary[m].value;
          if(!n) {
            continue
          }
          var p = avm2.systemDomain.findClass(n.className) ? avm2.systemDomain.getClass(n.className) : avm2.applicationDomain.getClass(n.className), n = p.createAsSymbol(n.props);
          p.instance.call(n);
          f[m] = n = {object:n}
        }
        n.channel && (n.channel.stop(), delete n.channel);
        l.stop || (n.channel = n.object.play(0, l.hasLoops ? l.loopCount : 0))
      }
    }
    this._soundStream && (!this._soundStream.sound && this._soundStream.seekIndex[a]) && (p = avm2.systemDomain.findClass("flash.media.Sound") ? avm2.systemDomain.getClass("flash.media.Sound") : avm2.applicationDomain.getClass("flash.media.Sound"), n = p.createAsSymbol(this._soundStream.data), p.instance.call(n), a = n.play(), this._soundStream.sound = n, this._soundStream.channel = a)
  }, get currentFrame() {
    return this._currentFrame || 1
  }, get currentFrameLabel() {
    return this._currentFrameLabel
  }, get currentLabel() {
    return this._currentLabel
  }, get currentLabels() {
    return this._currentScene.labels
  }, get currentScene() {
    return this._currentScene
  }, get enabled() {
    return this._enabled
  }, set enabled(a) {
    this._enabled = a
  }, get framesLoaded() {
    return this._framesLoaded
  }, get totalFrames() {
    return this._totalFrames
  }, get trackAsMenu() {
    return!1
  }, set trackAsMenu(a) {
    notImplemented()
  }, addFrameScript:function() {
    for(var a = this._frameScripts, b = 0, f = arguments.length;b < f;b += 2) {
      var g = arguments[b] + 1, k = arguments[b + 1], l = a[g];
      l ? l.push(k) : a[g] = [k]
    }
  }, gotoAndPlay:function(a) {
    this.play();
    isNaN(a) ? this.gotoLabel(a) : this._stage._pendingScripts.push(this._gotoFrame.bind(this, a))
  }, gotoAndStop:function(a) {
    this.stop();
    isNaN(a) ? this.gotoLabel(a) : this._stage._pendingScripts.push(this._gotoFrame.bind(this, a))
  }, gotoLabel:function(a) {
    (a = this._frameLabels[a]) && this._stage._pendingScripts.push(this._gotoFrame.bind(this, a.frame))
  }, isPlaying:function() {
    return this._isPlaying
  }, nextFrame:function() {
    this.stop();
    this._stage._pendingScripts.push(function() {
      this._gotoFrame(this._currentFrame % this._totalFrames + 1)
    }.bind(this))
  }, _renderNextFrame:function() {
    this._gotoFrame(this._currentFrame % this._totalFrames + 1)
  }, nextScene:function() {
    notImplemented()
  }, play:function() {
    this._isPlaying = !0
  }, prevFrame:function() {
    this.stop();
    this._stage._pendingScripts.push(function() {
      this._gotoFrame(1 < this._currentFrame ? this._currentFrame - 1 : this._totalFrames)
    }.bind(this))
  }, prevScene:function() {
    notImplemented()
  }, stop:function() {
    this._isPlaying = !1
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{currentFrame:b(a, "currentFrame"), framesLoaded:b(a, "framesLoaded"), totalFrames:b(a, "totalFrames"), trackAsMenu:b(a, "trackAsMenu"), scenes:b(a, "scenes"), currentScene:b(a, "currentScene"), currentLabel:b(a, "currentLabel"), currentFrameLabel:b(a, "currentFrameLabel"), enabled:b(a, "enabled"), isPlaying:b(a, "isPlaying"), play:a.play, stop:a.stop, nextFrame:a.nextFrame, prevFrame:a.prevFrame, gotoAndPlay:a.gotoAndPlay, gotoAndStop:a.gotoAndStop, addFrameScript:a.addFrameScript, 
  prevScene:a.prevScene, nextScene:a.nextScene}}};
  return a
}.call(this), ShapeDefinition = function() {
  return{__class__:"flash.display.Shape", initialize:function() {
    var a = this.symbol;
    a && a.graphicsFactory ? (a = a.graphicsFactory(0), this._stage && ("low" === this._stage._quality && !a._bitmap) && a._cacheAsBitmap(this._bbox), this._graphics = a) : this._graphics = new flash.display.Graphics
  }, __glue__:{"native":{instance:{graphics:{get:function() {
    return this._graphics
  }}}}}}
}.call(this), SimpleButtonDefinition = function() {
  function a(a, b) {
    if(!a) {
      return null
    }
    var d = avm2.systemDomain.findClass(a.className) ? avm2.systemDomain.getClass(a.className) : avm2.applicationDomain.getClass(a.className), e = Object.create(a.props);
    e.animated = !0;
    e.parent = b;
    e = d.createAsSymbol(e);
    d.instance.call(e);
    return e
  }
  var b = {__class__:"flash.display.SimpleButton", get downState() {
    return this._downState
  }, set downState(a) {
    this._downState = a
  }, get hitTestState() {
    return this._hitArea
  }, set hitTestState(a) {
    this._hitArea = a
  }, get overState() {
    return this._overState
  }, set overState(a) {
    this._overState = a
  }, get upState() {
    return this._upState
  }, set upState(a) {
    this._upState = a
  }, get useHandCursor() {
    return this._useHandCursor
  }, set useHandCursor(a) {
    this._useHandCursor = a
  }, _getAS2Object:function() {
    this.$as2Object || (new AS2Button).$attachNativeObject(this);
    return this.$as2Object
  }, initialize:function() {
    this._hitArea = this._downState = null;
    this._mouseChildren = this._isMouseOver = this._isMouseDown = !1;
    this._upState = this._overState = null;
    this._useHandCursor = !0;
    this._avm1StateCode = this._prevAvm1StateCode = 0;
    this._avm1MouseEvents = null;
    var b = this.symbol;
    if(b) {
      var d = b.states;
      d.down && (this._downState = a(d.down.value, this));
      d.hitTest && (this._hitArea = a(d.hitTest.value, this));
      d.over && (this._overState = a(d.over.value, this));
      d.up && (this._upState = a(d.up.value, this))
    }
    d = avm2.systemDomain.getClass("flash.events.MouseEvent");
    this.addEventListener(d.MOUSE_DOWN, function() {
      this._isMouseDown = !0;
      this._updateButton()
    }.bind(this), !0);
    this.addEventListener(d.MOUSE_OUT, function() {
      this._isMouseOver = !1;
      this._updateButton()
    }.bind(this), !0);
    this.addEventListener(d.MOUSE_OVER, function() {
      this._isMouseOver = !0;
      this._updateButton()
    }.bind(this), !0);
    this.addEventListener(d.MOUSE_UP, function() {
      this._isMouseDown = !1;
      this._updateButton()
    }.bind(this), !0);
    !this._loader._isAvm2Enabled && (b && b.buttonActions) && this._initAvm1Events(b.buttonActions)
  }, _updateButton:function() {
    this._markAsDirty();
    var a = this._upState;
    this._isMouseDown && this._isMouseOver && this._downState ? a = this._downState : this._isMouseOver && this._overState && (a = this._overState);
    0 < this._children.length && this._control.removeChild(this._children[0]._control);
    this._children = [a];
    this._control.appendChild(a._control);
    this._avm1MouseEvents && this._processAvm1MouseEvents(this._avm1MouseEvents)
  }, _processAvm1MouseEvents:function(a) {
    var b = this._avm1StateCode, d = (this._isMouseDown ? 1 : 0) | (this._isMouseOver ? 2 : 0);
    if(b !== d) {
      this._prevAvm1StateCode = b;
      this._avm1StateCode = d;
      b = e[b << 2 | d];
      for(d = 0;d < a.length;d++) {
        var f = a[d];
        0 !== (f.flags & b) && f.listener()
      }
    }
  }, _initAvm1Events:function(a) {
    for(var b = this._loader._avm1Context, e = null, f = 0;f < a.length;f++) {
      var n = a[f], p = function(a) {
        return executeActions(a, b, this._getAS2Object())
      }.bind(this.parent, n.actionsData), r = n.mouseEventFlags;
      r && (this._avm1MouseEvents || (this._avm1MouseEvents = [])).push({flags:r, listener:p});
      if(n = n.keyPress) {
        e = e || (e = []), e.push({keyCode:d[n] || 0, charCode:n, listener:p})
      }
    }
    if(e) {
      var v = function(a) {
        for(var b = 0;b < e.length;b++) {
          var d = e[b];
          (d.keyCode ? d.keyCode === a.keyCode : d.charCode === a.charCode) && d.listener()
        }
      }, s = avm2.systemDomain.getClass("flash.events.KeyboardEvent");
      this.stage.addEventListener(s.KEY_DOWN, v, !1);
      this.addEventListener("removed", function() {
        this.stage.removeEventListener(s.KEY_DOWN, v, !1)
      }.bind(this), !1)
    }
  }, get shouldHaveHandCursor() {
    return this._useHandCursor
  }}, d = [0, 37, 39, 36, 35, 45, 46, 0, 8, 0, 0, 0, 0, 13, 38, 40, 33, 34, 9, 27], e = [0, 0, 1, 128, 64, 0, 0, 32, 2, 0, 0, 4, 256, 16, 8, 0], f = Object.getOwnPropertyDescriptor;
  b.__glue__ = {"native":{instance:{downState:f(b, "downState"), hitTestState:f(b, "hitTestState"), overState:f(b, "overState"), upState:f(b, "upState"), useHandCursor:f(b, "useHandCursor"), _updateButton:b._updateButton}}};
  return b
}.call(this), SpriteDefinition = function() {
  var a = {__class__:"flash.display.Sprite", initialize:function() {
    this._buttonMode = !1;
    this._useHandCursor = !0;
    var a = this.symbol;
    if(a) {
      if(this._graphics = a.graphics || new flash.display.Graphics, a.timeline && (a = a.timeline[0])) {
        for(var b in a) {
          this._addTimelineChild(a[b])
        }
      }
    }else {
      this._graphics = new flash.display.Graphics
    }
  }, _addTimelineChild:function(a, b, f) {
    var g = a.promise.value, k = Object.create(g.props);
    k.depth = a.depth;
    k.symbolId = a.symbolId;
    a.clip && (k.clipDepth = a.clipDepth);
    a.hasCxform && (k.cxform = a.cxform);
    a.hasMatrix && (k.currentTransform = a.matrix);
    a.hasName && (k.name = a.name);
    a.hasRatio && (k.ratio = a.ratio / 65535);
    a = {className:g.className, events:a.events, props:k};
    void 0 !== b ? this._children.splice(b, f ? 1 : 0, a) : this._children.push(a)
  }, _constructChildren:function() {
    for(var a = this._loader, b = avm2.systemDomain.getClass("flash.display.DisplayObject"), f = this._children, g = 0, k = f.length;g < k;g++) {
      var l = f[g];
      if(!b.isInstanceOf(l)) {
        var m = avm2.systemDomain.findClass(l.className) ? avm2.systemDomain.getClass(l.className) : avm2.applicationDomain.getClass(l.className), n = Object.create(l.props), p = n.name;
        n.animated = !0;
        n.owned = !0;
        n.parent = this;
        n.stage = this.stage;
        n = m.createAsSymbol(n);
        p && (this[Multiname.getPublicQualifiedName(p)] = n);
        m.instance.call(n);
        assert(n._control);
        this._control.appendChild(n._control);
        a._isAvm2Enabled || this._initAvm1Bindings(n, p, l.events);
        n._markAsDirty();
        n.dispatchEvent(new flash.events.Event("load"));
        n.dispatchEvent(new flash.events.Event("added"));
        f[g] = n
      }
    }
  }, _insertChildAtDepth:function(a) {
    this.addChild(a);
    this._loader._isAvm2Enabled || this._initAvm1Bindings(a, a.name)
  }, _duplicate:function(a, b) {
    var f = this._loader, g = this._parent, k = g._children, l = this.class, m = this.symbol, n = Object.create(m);
    n.name = a;
    n.depth = b;
    n.parent = g;
    n = l.createAsSymbol(n);
    a && (g[Multiname.getPublicQualifiedName(a)] = n);
    l.instance.call(n);
    assert(n._control);
    g._control.appendChild(n._control);
    f._isAvm2Enabled || g._initAvm1Bindings(n, a, m && m.events);
    n._markAsDirty();
    n.dispatchEvent(new flash.events.Event("load"));
    n.dispatchEvent(new flash.events.Event("added"));
    k.push(n);
    return n
  }, _initAvm1Bindings:function(a, b, f) {
    var g = this._loader._avm1Context, k = a.symbol;
    if(k && k.variableName) {
      var l = k.variableName, k = l.lastIndexOf("."), m;
      if(0 <= k) {
        var n = l.substring(0, k).split(".");
        "_root" == n[0] ? (m = this.root._getAS2Object(), n.shift()) : m = a._getAS2Object();
        for(;0 < n.length;) {
          if(!(n[0] in m)) {
            throw"Cannot find " + l + " variable";
          }
          m = m[n.shift()]
        }
        l = l.substring(k + 1)
      }else {
        m = a._getAS2Object()
      }
      l in m || (m[l] = a.text);
      a._refreshAS2Variables = function() {
        a.text = m[l]
      }
    }
    if(f) {
      n = [];
      for(k = 0;k < f.length;k++) {
        var p = f[k];
        if(p.eoe) {
          break
        }
        var r = function(a) {
          return executeActions(a, g, this._getAS2Object())
        }.bind(a, p.actionsData), v;
        for(v in p) {
          if(0 === v.indexOf("on") && p[v]) {
            var s = v[2].toLowerCase() + v.substring(3);
            this.addEventListener(s, r, !1);
            n.push({name:s, fn:r})
          }
        }
      }
      0 < n.length && a.addEventListener("removed", function(a) {
        for(var b = 0;b < a.length;b++) {
          this.removeEventListener(a[b].name, a[b].fn, !1)
        }
      }.bind(a, n), !1)
    }
    b && (this._getAS2Object()[b] = a._getAS2Object())
  }, get buttonMode() {
    return this._buttonMode
  }, set buttonMode(a) {
    this._buttonMode = a
  }, get graphics() {
    return this._graphics
  }, get hitArea() {
    return this._hitArea
  }, set hitArea(a) {
    this._hitArea = a
  }, get soundTransform() {
    notImplemented()
  }, set soundTransform(a) {
    notImplemented()
  }, get useHandCursor() {
    return this._useHandCursor
  }, set useHandCursor(a) {
    this._useHandCursor = a;
    this.stage && this.stage._syncCursor()
  }, get shouldHaveHandCursor() {
    return this._buttonMode && this._useHandCursor
  }, startDrag:function() {
    notImplemented()
  }, startTouchDrag:function() {
    notImplemented()
  }, stopDrag:function() {
    notImplemented()
  }, stopTouchDrag:function() {
    notImplemented()
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{graphics:b(a, "graphics"), buttonMode:b(a, "buttonMode"), dropTarget:b(a, "dropTarget"), startDrag:a.startDrag, stopDrag:a.stopDrag, startTouchDrag:a.startTouchDrag, stopTouchDrag:a.stopTouchDrag, constructChildren:a._constructChildren, hitArea:b(a, "hitArea"), useHandCursor:b(a, "useHandCursor"), soundTransform:b(a, "soundTransform")}}};
  return a
}.call(this), StageDefinition = function() {
  var a = {__class__:"flash.display.Stage", initialize:function() {
    this._color = 4294967295;
    this._clickTarget = this._focus = null;
    this._showRedrawRegions = !1;
    this._stage = this;
    this._stageWidth = this._stageHeight = 0;
    this._transform = {};
    this._mouseJustLeft = !1;
    this._quality = "high";
    this._pendingScripts = []
  }, get allowsFullScreen() {
    return!1
  }, get colorCorrection() {
    return"default"
  }, set colorCorrection(a) {
    notImplemented()
  }, get colorCorrectionSupport() {
    return"unsuported"
  }, get displayState() {
    return null
  }, get focus() {
    return Keyboard._focus
  }, set focus(a) {
    Keyboard._focus = a
  }, get frameRate() {
    return this._frameRate
  }, set frameRate(a) {
    this._frameRate = a
  }, get fullScreenHeight() {
    notImplemented()
  }, get fullScreenSourceRect() {
    return null
  }, set fullScreenSourceRect(a) {
    notImplemented()
  }, get fullScreenWidth() {
    notImplemented()
  }, get quality() {
    return this._quality
  }, set quality(a) {
    this._quality = a
  }, get scaleMode() {
    return"noScale"
  }, set scaleMode(a) {
    notImplemented()
  }, get showDefaultContextMenu() {
    return!0
  }, set showDefaultContextMenu(a) {
    notImplemented()
  }, get stageFocusRect() {
    return!1
  }, set stageFocusRect(a) {
    notImplemented()
  }, get stageHeight() {
    return this._stageHeight
  }, set stageHeight(a) {
    notImplemented()
  }, get stageWidth() {
    return this._stageWidth
  }, set stageWidth(a) {
    notImplemented()
  }, get stageVideos() {
    notImplemented()
  }, get wmodeGPU() {
    return!1
  }, invalidate:function() {
    notImplemented()
  }, isFocusInaccessible:function() {
    notImplemented()
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{stageHeight:b(a, "stageHeight"), stageWidth:b(a, "stageWidth"), frameRate:b(a, "frameRate"), requireOwnerPermissions:function() {
  }}}};
  return a
}.call(this), EventDefinition = function() {
  var a = {__class__:"flash.events.Event", initialize:function() {
    this._canceled = !1;
    this._eventPhase = 2;
    this._target = this._currentTarget = null
  }, get currentTarget() {
    return this._currentTarget
  }, get eventPhase() {
    return this._eventPhase
  }, get target() {
    return this._target
  }, ctor:function(a, b, f) {
    Counter.count("Event: " + a);
    this.type = a;
    this.bubbles = !!b;
    this.cancelable = !!f
  }, isDefaultPrevented:function() {
    return this._isDefaultPrevented
  }, preventDefault:function() {
    this._isDefaultPrevented = !0
  }, stopImmediatePropagation:function() {
    notImplemented()
  }, stopPropagation:function() {
    notImplemented()
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {script:{"static":scriptProperties("public", "ACTIVATE ADDED ADDED_TO_STAGE CANCEL CHANGE CLEAR CLOSE COMPLETE CONNECT COPY CUT DEACTIVATE ENTER_FRAME FRAME_CONSTRUCTED EXIT_FRAME ID3 INIT MOUSE_LEAVE OPEN PASTE PROGRESS REMOVED REMOVED_FROM_STAGE RENDER RESIZE SCROLL TEXT_INTERACTION_MODE_CHANGE SELECT SELECT_ALL SOUND_COMPLETE TAB_CHILDREN_CHANGE TAB_INDEX_CHANGE TAB_ENABLED_CHANGE UNLOAD FULLSCREEN HTML_BOUNDS_CHANGE HTML_RENDER HTML_DOM_INITIALIZE LOCATION_CHANGE VIDEO_FRAME".split(" "))}, 
  "native":{instance:{type:{get:function() {
    return this.type
  }}, bubbles:{get:function() {
    return this.bubbles
  }}, cancelable:{get:function() {
    return this.cancelable
  }}, target:b(a, "target"), currentTarget:b(a, "currentTarget"), eventPhase:b(a, "eventPhase"), ctor:a.ctor, stopPropagation:a.stopPropagation, stopImmediatePropagation:a.stopImmediatePropagation, isDefaultPrevented:a.isDefaultPrevented}}};
  return a
}.call(this), EventDispatcherDefinition = function() {
  var a = {__class__:"flash.events.EventDispatcher", initialize:function() {
    this._captureHandlers = {};
    this._control = null;
    this._handlers = {}
  }, ctor:function(a) {
    this._target = a
  }, addEventListener:function(a, d, e, f) {
    if("function" !== typeof d) {
      throw ArgumentError();
    }
    void 0 === f && (f = 0);
    var g = e ? this._captureHandlers : this._handlers, k = g[a];
    k || (k = {queue:[], handleEvent:function(a) {
      if(a instanceof CustomEvent) {
        var b = a;
        a = b.detail;
        a._eventPhase = b.eventPhase
      }
      a._currentTarget = this;
      for(var b = this.queue, d = 0, e = b.length;d < e;d++) {
        b[d].listener(a)
      }
    }}, this._control && this._control.addEventListener("shumway." + a, k, e), g[a] = k);
    a = k.queue;
    for(e = a.length;0 < e && !(f < a[e - 1].prio);) {
      e--
    }
    a.splice(e, 0, {listener:d, prio:f})
  }, ctor:function() {
  }, dispatchEvent:function(a) {
    a._target = this;
    if(this._control) {
      var d = document.createEvent("CustomEvent");
      d.initCustomEvent("shumway." + a.type, a.bubbles, a.cancelable, a);
      this._control.dispatchEvent(d)
    }else {
      (d = this._handlers[a.type]) && d.handleEvent(a)
    }
    return!!a.isDefaultPrevented
  }, hasEventListener:function(a) {
    return a in this._captureHandlers || a in this._handlers
  }, removeEventListener:function(a, d, e) {
    var f = e ? this._captureHandlers : this._handlers, g = f[a];
    if(g) {
      for(var k = g.queue, l = 0;l < k.length;l++) {
        if(k[l].listener === d) {
          k.splice(l, 1);
          break
        }
      }
      k.length || (this._control && this._control.removeEventListener("shumway." + a, g, e), delete f[a])
    }
  }, willTrigger:function(a) {
    var d = this;
    do {
      if(d.hasEventListener(a)) {
        return!0
      }
    }while(d = d.parent);
    return!1
  }};
  a.__glue__ = {"native":{instance:{ctor:a.ctor, addEventListener:a.addEventListener, removeEventListener:a.removeEventListener, hasEventListener:a.hasEventListener, willTrigger:a.willTrigger, dispatchEventFunction:a.dispatchEvent}}};
  return a
}.call(this), KeyboardEventDefinition = function() {
  var a = {__class__:"flash.events.KeyboardEvent", updateAfterEvent:function() {
    notImplemented()
  }, get keyCode() {
    return this.private$flash$events$KeyboardEvent$m_keyCode
  }};
  a.__glue__ = {script:{instance:scriptProperties("private", ["m_keyCode", "m_keyLocation"]), "static":scriptProperties("public", ["KEY_DOWN", "KEY_UP"])}, "native":{instance:{charCode:{get:function() {
    return this.charCode
  }, set:function(a) {
    this.charCode = a
  }}, ctrlKey:{get:function() {
    return this.ctrlKey
  }, set:function(a) {
    this.ctrlKey = a
  }}, altKey:{get:function() {
    return this.altKey
  }, set:function(a) {
    this.altKey = a
  }}, shiftKey:{get:function() {
    return this.shiftKey
  }, set:function(a) {
    this.shiftKey = a
  }}, updateAfterEvent:a.updateAfterEvent}}};
  return a
}.call(this), MouseEventDefinition = function() {
  var a = {__class__:"flash.events.MouseEvent", updateAfterEvent:function() {
    notImplemented()
  }};
  a.__glue__ = {script:{instance:{relatedObject:"private m_relatedObject", ctrlKey:"private m_ctrlKey", altKey:"private m_altKey", shiftKey:"private m_shiftKey", buttonDown:"private m_buttonDown", delta:"private m_delta", isRelatedObjectInaccessible:"private m_isRelatedObjectInaccessible"}, "static":{CLICK:"public CLICK", DOUBLE_CLICK:"public DOUBLE_CLICK", MOUSE_DOWN:"public MOUSE_DOWN", MOUSE_MOVE:"public MOUSE_MOVE", MOUSE_OUT:"public MOUSE_OUT", MOUSE_OVER:"public MOUSE_OVER", MOUSE_UP:"public MOUSE_UP", 
  MOUSE_WHEEL:"public MOUSE_WHEEL", ROLL_OUT:"public ROLL_OUT", ROLL_OVER:"public ROLL_OVER"}}, "native":{instance:{localX:{get:function() {
    return this.localX
  }, set:function(a) {
    this.localX = a
  }}, localY:{get:function() {
    return this.localY
  }, set:function(a) {
    this.localY = a
  }}, getStageX:function() {
    notImplemented()
  }, getStageY:function() {
    notImplemented()
  }, updateAfterEvent:a.updateAfterEvent}}};
  return a
}.call(this), TextEventDefinition = function() {
  return{__class__:"flash.events.TextEvent", __glue__:{script:{"static":{LINK:"public LINK", TEXT_INPUT:"public TEXT_INPUT"}}, "native":{instance:{}}}}
}.call(this), TimerEventDefinition = function() {
  var a = {__class__:"flash.events.TimerEvent", updateAfterEvent:function() {
    notImplemented()
  }};
  a.__glue__ = {script:{"static":{TIMER:"public TIMER", TIMER_COMPLETE:"public TIMER_COMPLETE"}}, "native":{instance:{updateAfterEvent:a.updateAfterEvent}}};
  return a
}.call(this), ExternalInterfaceDefinition = function() {
  return{__glue__:{"native":{"static":{available:{get:function() {
    return!1
  }}}}}}
}.call(this), BevelFilterDefinition = function() {
  return{__class__:"flash.filters.BevelFilter", initialize:function() {
  }, __glue__:{}}
}.call(this), BitmapFilterDefinition = function() {
  return{__class__:"flash.filters.BitmapFilter", initialize:function() {
  }, __glue__:{}}
}.call(this), BlurFilterDefinition = function() {
  return{__class__:"flash.filters.BlurFilter", initialize:function() {
  }, applyFilter:function(a, b, d) {
    assert(a instanceof Uint8ClampedArray);
    assert(a.length === 4 * b * d);
    blurFilter(a, b, d, this._blurX, this._blurY)
  }, updateFilterBounds:function(a) {
    assert(a instanceof flash.geom.Rectangle);
    a.inflate(this._blurX, this._blurY)
  }, __glue__:{"native":{"static":{}, instance:{blurX:{get:function() {
    return this._blurX
  }, set:function(a) {
    this._blurX = a
  }}, blurY:{get:function() {
    return this._blurY
  }, set:function(a) {
    this._blurY = a
  }}, quality:{get:function() {
    return this._quality
  }, set:function(a) {
    this._quality = a
  }}}}}}
}.call(this), ColorMatrixFilterDefinition = function() {
  return{__class__:"flash.filters.ColorMatrixFilter", initialize:function() {
  }, applyFilter:function(a, b, d) {
    this._matrix && (assert(a instanceof Uint8ClampedArray), assert(a.length === 4 * b * d), colorFilter(a, b, d, this._matrix))
  }, updateFilterBounds:function(a) {
    assert(a instanceof flash.geom.Rectangle);
    return a
  }, __glue__:{"native":{instance:{matrix:{get:function() {
    return this._matrix
  }, set:function(a) {
    this._matrix = a
  }}}}}}
}.call(this), ConvolutionFilterDefinition = function() {
  return{__class__:"flash.filters.ConvolutionFilter", initialize:function() {
  }, __glue__:{}}
}.call(this), DisplacementMapFilterDefinition = function() {
  return{__class__:"flash.filters.DisplacementMapFilter", initialize:function() {
  }, __glue__:{}}
}.call(this), DropShadowFilterDefinition = function() {
  return{__class__:"flash.filters.DropShadowFilter", initialize:function() {
  }, applyFilter:function(a, b, d) {
    dropShadowFilter(a, b, d, [this._color >> 24 & 255, this._color >> 16 & 255, this._color >> 8 & 255, this._color & 255], this._blurX, this._blurY, this._angle, this._distance, this._strength)
  }, updateFilterBounds:function(a) {
    assert(a instanceof flash.geom.Rectangle);
    var b = a.clone(), d = Math.sin(this._angle) * this._distance | 0, e = Math.cos(this._angle) * this._distance | 0;
    b.offset(e, d);
    b.inflate(this._blurX, this._blurY);
    b = a.union(b);
    a.setTo(b.x, b.y, b.width, b.height)
  }, __glue__:{"native":{instance:{distance:{get:function() {
    return this._distance
  }, set:function(a) {
    this._distance = a
  }}, angle:{get:function() {
    return this._angle
  }, set:function(a) {
    this._angle = a
  }}, color:{get:function() {
    return this._color
  }, set:function(a) {
    this._color = a
  }}, alpha:{get:function() {
    return this._alpha
  }, set:function(a) {
    this._alpha = a
  }}, blurX:{get:function() {
    return this._blurX
  }, set:function(a) {
    this._blurX = a
  }}, blurY:{get:function() {
    return this._blurY
  }, set:function(a) {
    this._blurY = a
  }}, hideObject:{get:function() {
    return this._hideObject
  }, set:function(a) {
    this._hideObject = a
  }}, inner:{get:function() {
    return this._inner
  }, set:function(a) {
    this._inner = a
  }}, knockout:{get:function() {
    return this._knockout
  }, set:function(a) {
    this._knockout = a
  }}, quality:{get:function() {
    return this._quality
  }, set:function(a) {
    this._quality = a
  }}, strength:{get:function() {
    return this._strength
  }, set:function(a) {
    this._strength = a
  }}}}}}
}.call(this), GlowFilterDefinition = function() {
  return{__class__:"flash.filters.GlowFilter", initialize:function() {
  }, applyFilter:function(a, b, d) {
    glowFilter(a, b, d, [this._color >> 24 & 255, this._color >> 16 & 255, this._color >> 8 & 255, this._color & 255], this._blurX, this._blurY, this._strength)
  }, updateFilterBounds:function(a) {
    assert(a instanceof flash.geom.Rectangle);
    a.inflate(this._blurX, this._blurY)
  }, __glue__:{"native":{"static":{}, instance:{color:{get:function() {
    return this._color
  }, set:function(a) {
    this._color = a
  }}, alpha:{get:function() {
    return this._alpha
  }, set:function(a) {
    this._alpha = a
  }}, blurX:{get:function() {
    return this._blurX
  }, set:function(a) {
    this._blurX = a
  }}, blurY:{get:function() {
    return this._blurY
  }, set:function(a) {
    this._blurY = a
  }}, inner:{get:function() {
    return this._inner
  }, set:function(a) {
    this._inner = a
  }}, knockout:{get:function() {
    return this._knockout
  }, set:function(a) {
    this._knockout = a
  }}, quality:{get:function() {
    return this._quality
  }, set:function(a) {
    this._quality = a
  }}, strength:{get:function() {
    return this._strength
  }, set:function(a) {
    this._strength = a
  }}}}}}
}.call(this), GradientBevelFilterDefinition = function() {
  return{__class__:"flash.filters.GradientBevelFilter", initialize:function() {
  }, __glue__:{}}
}.call(this), GradientGlowFilterDefinition = function() {
  return{__class__:"flash.filters.GradientGlowFilter", initialize:function() {
  }, __glue__:{}}
}.call(this), ShaderFilterDefinition = function() {
  return{__class__:"flash.filters.ShaderFilter", initialize:function() {
  }, __glue__:{}}
}.call(this), ColorTransformDefinition = function() {
  return{__class__:"flash.geom.ColorTransform", __glue__:{script:{instance:scriptProperties("public", "redMultiplier greenMultiplier blueMultiplier alphaMultiplier redOffset greenOffset blueOffset alphaOffset color concat".split(" "))}}}
}.call(this), MatrixDefinition = function() {
  return{__class__:"flash.geom.Matrix", __glue__:{script:{instance:scriptProperties("public", "a b c d tx ty concat invert identity createBox createGradientBox rotate translate scale deltaTransformPoint transformPoint setTo".split(" "))}}}
}.call(this), PointDefinition = function() {
  return{__class__:"flash.geom.Point", __glue__:{script:{"static":scriptProperties("public", ["interpolate", "distance", "polar"]), instance:scriptProperties("public", "x y length offset interpolate subtract add normalize".split(" "))}}}
}.call(this), RectangleDefinition = function() {
  return{__class__:"flash.geom.Rectangle", __glue__:{script:{instance:scriptProperties("public", "x y width height left right top bottom topLeft bottomRight size isEmpty setEmpty inflate inflatePoint offset offsetPoint contains containsPoint containsRect intersection intersects union equals".split(" "))}}}
}.call(this), TransformDefinition = function() {
  var a = {__class__:"flash.geom.Transform", get colorTransform() {
    var a = this._target._cxform;
    return a ? new flash.geom.ColorTransform(a.redMultiplier, a.greenMultiplier, a.blueMultiplier, a.alphaMultiplier, a.redOffset, a.greenOffset, a.blueOffset, a.alphaOffset) : new flash.geom.ColorTransform
  }, set colorTransform(a) {
    if(!avm2.systemDomain.getClass("flash.geom.ColorTransform").isInstanceOf(a)) {
      throw TypeError();
    }
    this._target._cxform = {redMultiplier:a.redMultiplier, greenMultiplier:a.greenMultiplier, blueMultiplier:a.blueMultiplier, alphaMultiplier:a.alphaMultiplier, redOffset:a.redOffset, greenOffset:a.greenOffset, blueOffset:a.blueOffset, alphaOffset:a.alphaOffset}
  }, get concatenatedColorTransform() {
    var a = this.colorTransform;
    a.concat(this._target.parent.transform.concatenatedColorTransform);
    return a
  }, get concatenatedMatrix() {
    var a = this.matrix;
    a.concat(this._target.parent.transform.concatenatedMatrix);
    return a
  }, get matrix() {
    var a = this._target._currentTransform;
    return new flash.geom.Matrix(a.a, a.b, a.c, a.d, a.tx, a.ty)
  }, set matrix(a) {
    if(!avm2.systemDomain.getClass("flash.geom.Matrix").isInstanceOf(a)) {
      throw TypeError();
    }
    var b = a.a, f = a.b, g = a.c, k = a.d, l = a.tx, m = a.ty, n = this._target;
    n._rotation = 0 !== b ? 180 * Math.atan(f / b) / Math.PI : 0 < f ? 90 : -90;
    var p = Math.sqrt(b * b + f * f);
    n._scaleX = 0 < b ? p : -p;
    p = Math.sqrt(k * k + g * g);
    n._scaleY = 0 < k ? p : -p;
    n._x = a.tx;
    n._y = a.ty;
    n._currentTransform = {a:b, b:f, c:g, d:k, tx:l, ty:m}
  }, ctor:function(a) {
    this._target = a;
    a._transform = this
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{colorTransform:b(a, "colorTransform"), concatenatedColorTransform:b(a, "concatenatedColorTransform"), concatenatedMatrix:b(a, "concatenatedMatrix"), matrix:b(a, "matrix"), ctor:a.ctor}}};
  return a
}.call(this), ID3InfoDefinition = function() {
  return{__glue__:{script:{instance:{songName:"public songName", genre:"public genre", artist:"public artist", track:"public track", album:"public album", year:"public year", comment:"public comment"}}}}
}.call(this), PLAY_USING_AUDIO_TAG = !0, SoundDefinition = function() {
  function a(a, d) {
    b = b || document.createElement("audio");
    b.canPlayType(a.mimeType) ? (b.src = "data:" + a.mimeType + ";base64," + base64ArrayBuffer(a.data), b.load(), b.addEventListener("loadedmetadata", function() {
      d({duration:1E3 * this.duration})
    })) : d({duration:0})
  }
  var b = null, d = {initialize:function() {
    this._playQueue = [];
    this._url = null;
    this._bytesLoaded = this._bytesTotal = this._length = 0;
    this._id3 = new flash.media.ID3Info;
    var b = this.symbol;
    if(b) {
      var d = {};
      b.pcm && (d.sampleRate = b.sampleRate, d.channels = b.channels, d.pcm = b.pcm, d.end = b.pcm.length);
      d.completed = !0;
      b.packaged && (d.data = b.packaged.data.buffer, d.mimeType = b.packaged.mimeType);
      var e = this;
      a(d, function(a) {
        e._length = a.duration
      });
      this._soundData = d
    }
  }, close:function() {
    throw"Not implemented: close";
  }, extract:function() {
    throw"Not implemented: extract";
  }, _load:function(b) {
    if(b) {
      var d = this, e = this._stream = new flash.net.URLStream, l = avm2.systemDomain.getClass("flash.utils.ByteArray").createInstance(), m = 0, n = null, p = {completed:!1};
      e.addEventListener("progress", function(a) {
        d._bytesLoaded = a.public$bytesLoaded;
        d._bytesTotal = a.public$bytesTotal;
        if(!PLAY_USING_AUDIO_TAG && !n) {
          var b = function(a, b) {
            0 === d._length && (d._soundData = p, d._playQueue.forEach(function(a) {
              a.channel._playSoundDataViaChannel(p, a.startTime)
            }));
            d._length = b ? 1E3 * a : 1E3 * Math.max(a, n.estimateDuration(d._bytesTotal))
          }, f = 8E3, u = new Float32Array(f), C = 0, q = 0, w = !0, x = 0, H = 0, y = 0, t = new MP3DecoderSession;
          t.onframedata = function(a, d, e, g) {
            w && (200 > H ? (x += g, H++) : w = !1, this.averageBitRate = x / H);
            if(0 !== a.length) {
              C || (p.sampleRate = e, p.channels = d, p.pcm = u);
              if(C + a.length >= f) {
                do {
                  f *= 2
                }while(C + a.length >= f);
                d = new Float32Array(f);
                d.set(u);
                u = p.pcm = d
              }
              u.set(a, C);
              p.end = C += a.length;
              q = 1 / p.sampleRate / p.channels;
              b(C * q, !1)
            }
          };
          t.onid3tag = function(a) {
            y += a.length
          };
          t.onclosed = function() {
            b(C * q, !0)
          };
          n = {pushData:function(a) {
            t.pushAsync(a)
          }, estimateDuration:function(a) {
            return Math.max(0, 8 * (a - y) / 0)
          }, close:function() {
            t.close()
          }}
        }
        var N = e.bytesAvailable;
        e.readBytes(l, m, N);
        n && n.pushData(new Uint8Array(l.a, m, N));
        m += N;
        d.dispatchEvent(a)
      });
      e.addEventListener("complete", function(b) {
        d.dispatchEvent(b);
        p.data = l.a;
        p.mimeType = "audio/mpeg";
        p.completed = !0;
        PLAY_USING_AUDIO_TAG && (d._soundData = p, a(p, function(a) {
          d._length = a.duration
        }), d._playQueue.forEach(function(a) {
          a.channel._playSoundDataViaAudio(p, a.startTime)
        }));
        n && n.close()
      });
      e.load(b)
    }
  }, loadCompressedDataFromByteArray:function() {
    throw"Not implemented: loadCompressedDataFromByteArray";
  }, loadPCMFromByteArray:function() {
    throw"Not implemented: loadPCMFromByteArray";
  }, play:function(a, b, d) {
    a = a || 0;
    b = b || 0;
    var e = new flash.media.SoundChannel;
    e._sound = this;
    e._soundTransform = d;
    this._playQueue.push({channel:e, startTime:a});
    this._soundData && (PLAY_USING_AUDIO_TAG ? e._playSoundDataViaAudio(this._soundData, a, b) : e._playSoundDataViaChannel(this._soundData, a, b));
    return e
  }, get bytesLoaded() {
    return this._bytesLoaded
  }, get bytesTotal() {
    return this._bytesTotal
  }, get id3() {
    return this._id3
  }, get isBuffering() {
    throw"Not implemented: isBuffering";
  }, get isURLInaccessible() {
    throw"Not implemented: isURLInaccessible";
  }, get length() {
    return this._length
  }, get url() {
    return this._url
  }}, e = Object.getOwnPropertyDescriptor;
  d.__glue__ = {"native":{instance:{close:d.close, extract:d.extract, _load:d._load, loadCompressedDataFromByteArray:d.loadCompressedDataFromByteArray, loadPCMFromByteArray:d.loadPCMFromByteArray, play:d.play, bytesLoaded:e(d, "bytesLoaded"), bytesTotal:e(d, "bytesTotal"), id3:e(d, "id3"), isBuffering:e(d, "isBuffering"), isURLInaccessible:e(d, "isURLInaccessible"), length:e(d, "length"), url:e(d, "url")}}};
  return d
}.call(this), SoundChannelDefinition = function() {
  return{initialize:function() {
    this._element = null;
    this._rightPeak = this._leftPeak = this._position = 0;
    this._soundTransform = this._pcmData = null
  }, _registerWithSoundMixer:function() {
    avm2.systemDomain.getClass("flash.media.SoundMixer").native.static._registerChannel(this)
  }, _unregisterWithSoundMixer:function() {
    avm2.systemDomain.getClass("flash.media.SoundMixer").native.static._unregisterChannel(this)
  }, _playSoundDataViaChannel:function(a, b, d) {
    assert(a.pcm, "no pcm data found");
    this._registerWithSoundMixer();
    var e = this, f = Math.round(b / 1E3 * a.sampleRate) * a.channels, g = f;
    this._position = b;
    this._audioChannel = createAudioChannel(a.sampleRate, a.channels);
    this._audioChannel.ondatarequested = function(b) {
      var l = a.end;
      if(g >= l && a.completed) {
        e._unregisterWithSoundMixer(), e._audioChannel.stop(), e.dispatchEvent(new flash.events.Event("soundComplete", !1, !1))
      }else {
        var m = b.count;
        b = b.data;
        var n = a.pcm;
        do {
          for(var p = Math.min(l - g, m), r = 0;r < p;r++) {
            b[r] = n[g++]
          }
          m -= p;
          if(g >= l) {
            if(!d) {
              break
            }
            d--;
            g = f
          }
        }while(0 < m);
        e._position = 1E3 * (g / a.sampleRate / a.channels)
      }
    };
    this._audioChannel.start()
  }, _playSoundDataViaAudio:function(a, b, d) {
    if(a.mimeType) {
      this._registerWithSoundMixer();
      this._position = b;
      var e = this, f = 0, g = document.createElement("audio");
      g.canPlayType(a.mimeType) ? (g.preload = "metadata", g.loop = 0 < d, g.src = "data:" + a.mimeType + ";base64," + base64ArrayBuffer(a.data), g.addEventListener("loadeddata", function() {
        g.currentTime = b / 1E3;
        g.play()
      }), g.addEventListener("timeupdate", function() {
        var a = g.currentTime;
        d && f > a && (--d, d || (g.loop = !1), a < b / 1E3 && (g.currentTime = b / 1E3));
        e._position = 1E3 * (f = a)
      }), g.addEventListener("ended", function() {
        e._unregisterWithSoundMixer();
        e.dispatchEvent(new flash.events.Event("soundComplete", !1, !1))
      }), this._element = g) : console.error('ERROR: "' + a.mimeType + '" type playback is not supported by the browser')
    }
  }, __glue__:{"native":{"static":{}, instance:{stop:function() {
    this._element && (this._unregisterWithSoundMixer(), this._element.pause());
    this._audioChannel && (this._unregisterWithSoundMixer(), this._audioChannel.stop())
  }, position:{get:function() {
    return this._position
  }}, leftPeak:{get:function() {
    return this._leftPeak
  }}, rightPeak:{get:function() {
    return this.rightPeak
  }}, soundTransform:{get:function() {
    return this._soundTransform
  }, set:function(a) {
    this._soundTransform = a
  }}}}, script:{instance:scriptProperties("public", ["stop"])}}}
}.call(this);
function createAudioChannel(a, b) {
  if(WebAudioChannel.isSupported) {
    return new WebAudioChannel(a, b)
  }
  if(AudioDataChannel.isSupported) {
    return new AudioDataChannel(a, b)
  }
  error("PCM data playback is not supported by the browser")
}
function AudioResampler(a, b) {
  this.sourceRate = a;
  this.targetRate = b;
  this.tail = [];
  this.sourceOffset = 0
}
AudioResampler.prototype = {ondatarequested:function() {
}, getData:function(a, b) {
  for(var d = this.sourceRate / this.targetRate, e = this.sourceOffset, f = Math.ceil((b - 1) * d + e) + 1, g = [], k = 0;k < a.length;k++) {
    g.push(new Float32Array(f))
  }
  this.ondatarequested({data:g, count:f});
  for(k = 0;k < a.length;k++) {
    for(var l = a[k], m = g[k], n = 0;n < b;n++) {
      var p = n * d + e, r = Math.floor(p), v = Math.ceil(p), s = 0 > r ? this.tail[k] : m[r];
      r === v ? l[n] = s : (p -= r, l[n] = s * (1 - p) + m[v] * p)
    }
    this.tail[k] = m[f - 1]
  }
  this.sourceOffset = (b - 1) * d + e - (f - 1)
}};
function WebAudioChannel(a, b) {
  var d = WebAudioChannel.context;
  d || (d = "undefined" !== typeof AudioContext ? new AudioContext : new webkitAudioContext, WebAudioChannel.context = d);
  this.context = d;
  this.contextSampleRate = d.sampleRate || 44100;
  this.channels = b;
  this.sampleRate = a;
  this.contextSampleRate != a && (this.resampler = new AudioResampler(a, this.contextSampleRate), this.resampler.ondatarequested = function(a) {
    this.requestData(a.data, a.count)
  }.bind(this))
}
WebAudioChannel.prototype = {start:function() {
  var a = this.context.createScriptProcessor ? this.context.createScriptProcessor(2048, 0, this.channels) : this.context.createJavaScriptNode(2048, 0, this.channels), b = this;
  a.onaudioprocess = function(a) {
    for(var e = [], f = 0;f < b.channels;f++) {
      e.push(a.outputBuffer.getChannelData(f))
    }
    a = e[0].length;
    b.resampler ? b.resampler.getData(e, a) : b.requestData(e, a)
  };
  a.connect(this.context.destination);
  this.source = a
}, stop:function() {
  this.source.disconnect(this.context.destination)
}, requestData:function(a, b) {
  var d = this.channels, e = new Float32Array(b * d);
  this.ondatarequested({data:e, count:e.length});
  for(var f = 0, g = 0;f < b;f++) {
    for(var k = 0;k < d;k++) {
      a[k][f] = e[g++]
    }
  }
}};
WebAudioChannel.isSupported = function() {
  return"undefined" !== typeof AudioContext || "undefined" != typeof webkitAudioContext
}();
function AudioDataChannel(a, b) {
  this.sampleRate = a;
  this.channels = b
}
AudioDataChannel.prototype = {start:function() {
  var a = this.sampleRate, b = this.channels, d = this, e = new Audio;
  e.mozSetup(b, a);
  var f = 0, g = a * b / 2, k = null, l;
  this.interval = setInterval(function() {
    var a;
    if(k) {
      a = e.mozWriteAudio(k.subarray(l));
      f += a;
      l += a;
      if(l < k.length) {
        return
      }
      k = null
    }
    a = e.mozCurrentSampleOffset() + g - f;
    a -= a % b;
    if(0 < a) {
      var n = new Float32Array(a);
      d.requestData(n, a);
      a = e.mozWriteAudio(n);
      a < n.length && (k = n, l = a);
      f += a
    }
  }, 100)
}, stop:function() {
  clearInterval(this.interval)
}, requestData:function(a, b) {
  this.ondatarequested({data:a, count:b})
}};
AudioDataChannel.isSupported = function() {
  return"mozSetup" in new Audio
}();
var SoundMixerDefinition = function() {
  var a = {}, b = [];
  a.__glue__ = {"native":{"static":{stopAll:function() {
    b.forEach(function(a) {
      a.stop()
    });
    b = []
  }, _registerChannel:function(a) {
    b.push(a)
  }, _unregisterChannel:function(a) {
    a = b.indexOf(a);
    0 <= a && b.splice(a, 1)
  }}}};
  return a
}.call(this), SoundTransformDefinition = function() {
  return{__class__:"flash.media.SoundTransform"}
}.call(this), VideoDefinition = function() {
  var a = {initialize:function() {
    this._element = document.createElement("video");
    this._element.controls = !1;
    this._element.setAttribute("style", "position: absolute; top:0; left:0; z-index: -100;");
    this._added = !1
  }, attachNetStream:function(a) {
    this._netStream = a;
    this._element.src = a._url
  }, ctor:function(a, d) {
    void 0 === a && (a = 320);
    void 0 === d && (d = 240);
    this._videoWidth = a;
    this._videoHeight = d;
    this._bbox = {left:0, top:0, right:a, bottom:d};
    this._videoScaleY = this._videoScaleX = 1;
    this._element.addEventListener("loadedmetadata", function() {
      this._videoScaleX = this._videoWidth / this._element.videoWidth;
      this._videoScaleY = this._videoHeight / this._element.videoHeight;
      this._markAsDirty()
    }.bind(this))
  }, draw:function(a) {
    this._added || (a.canvas.parentNode.appendChild(this._element), this._element.play(), this._added = !0);
    a.beginPath();
    a.rect(0, 0, this._videoWidth, this._videoHeight);
    a.clip();
    a.clearRect(0, 0, this._videoWidth, this._videoHeight);
    a = a.currentTransform;
    var d = this._videoScaleX, e = this._videoScaleY;
    a = "transform: matrix(" + d * a.a + ", " + d * a.b + ", " + e * a.c + ", " + e * a.d + ", " + a.e + ", " + a.f + ");";
    this._currentCssTransform !== a && (this._currentCssTransform = a, this._element.setAttribute("style", "position: absolute; top:0; left:0; z-index: -100;transform-origin: 0px 0px 0;" + a + "-webkit-transform-origin: 0px 0px 0; -webkit-" + a), this._markAsDirty())
  }};
  a.__glue__ = {"native":{instance:{attachNetStream:a.attachNetStream, ctor:a.ctor}}};
  return a
}.call(this), NetConnectionDefinition = function() {
  var a = {connect:function() {
  }, invokeWithArgsArray:function() {
  }};
  a.__glue__ = {"native":{instance:{connect:a.connect, invokeWithArgsArray:a.invokeWithArgsArray}}};
  return a
}.call(this), NetStreamDefinition = function() {
  var a = {ctor:function() {
  }, play:function(a) {
    this._url = a
  }};
  a.__glue__ = {"native":{instance:{ctor:a.ctor, play:a.play}}};
  return a
}.call(this), ResponderDefinition = function() {
  var a = {ctor:function() {
  }};
  a.__glue__ = {"native":{instance:{ctor:a.ctor}}};
  return a
}.call(this), URLLoaderDefinition = function() {
  return{initialize:function() {
  }, __glue__:{"native":{"static":{}, instance:{}}, script:{"static":{}, instance:{data:"public data", dataFormat:"public dataFormat", bytesTotal:"public bytesTotal", bytesLoaded:"public bytesLoaded"}}}}
}.call(this), URLRequestDefinition = function() {
  var a = {initialize:function() {
    this._url = null;
    this._method = "GET";
    this._digest = this._data = null;
    this._contentType = "application/x-www-form-urlencoded";
    this._requestHeaders = null
  }, setMethod:function(a) {
    this._method = a
  }, setRequestHeaders:function(a) {
    this._requestHeaders = a
  }, get contentType() {
    return this._contentType
  }, set contentType(a) {
    this._contentType = a
  }, get data() {
    return this._data
  }, set data(a) {
    this._data = a
  }, get digest() {
    return this._digest
  }, set digest(a) {
    this._digest = a
  }, get method() {
    return this._method
  }, get requestHeaders() {
    return this._requestHeaders
  }, get url() {
    return this._url
  }, set url(a) {
    this._url = a
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{setMethod:a.setMethod, setRequestHeaders:a.setRequestHeaders, contentType:b(a, "contentType"), data:b(a, "data"), digest:b(a, "digest"), method:b(a, "method"), requestHeaders:b(a, "requestHeaders"), url:b(a, "url")}}};
  return a
}.call(this), URLStreamDefinition = function() {
  var a = {initialize:function() {
    this._stream = null;
    this._littleEndian = this._connected = !1
  }, close:function() {
    this._session.close()
  }, load:function(a) {
    var b = FileLoadingService.createSession(), f = this, g = !0;
    b.onprogress = function(a, b) {
      if(g) {
        g = !1;
        var d = b.bytesTotal, e = new ArrayBuffer(d);
        f._stream = new Stream(e, 0, 0, d)
      }
      f._stream.push(a);
      d = avm2.systemDomain.getClass("flash.events.ProgressEvent");
      f.dispatchEvent(d.createInstance(["progress", !1, !1, b.bytesLoaded, b.bytesTotal]))
    };
    b.onerror = function() {
      throw"Not implemented: session.onerror";
    };
    b.onopen = function() {
      f._connected = !0;
      f.dispatchEvent(new flash.events.Event("open", !1, !1))
    };
    b.onclose = function() {
      f._connected = !1;
      f.dispatchEvent(new flash.events.Event("complete", !1, !1))
    };
    b.open(a);
    this._session = b
  }, readBoolean:function() {
    throw"Not implemented: URLStream.readBoolean";
  }, readByte:function() {
    var a = this._stream;
    a.ensure(1);
    return a.bytes[a.pos++]
  }, readBytes:function(a, b, f) {
    if(0 > f) {
      throw"Invalid length argument";
    }
    var g = this._stream;
    f ? g.ensure(f) : f = g.remaining();
    a.writeRawBytes(g.bytes.subarray(g.pos, g.pos + f), b, f);
    g.pos += f
  }, readDouble:function() {
    throw"Not implemented: URLStream.readDouble";
  }, readFloat:function() {
    throw"Not implemented: URLStream.readFloat";
  }, readInt:function() {
    throw"Not implemented: URLStream.readInt";
  }, readMultiByte:function() {
    throw"Not implemented: URLStream.readMultiByte";
  }, readObject:function() {
    throw"Not implemented: URLStream.readObject";
  }, readShort:function() {
    throw"Not implemented: URLStream.readShort";
  }, readUTF:function() {
    throw"Not implemented: URLStream.readUTF";
  }, readUTFBytes:function() {
    throw"Not implemented: URLStream.readUTFBytes";
  }, readUnsignedByte:function() {
    throw"Not implemented: URLStream.readUnsignedByte";
  }, readUnsignedInt:function() {
    throw"Not implemented: URLStream.readUnsignedInt";
  }, readUnsignedShort:function() {
    var a = this._stream;
    a.ensure(2);
    var b = a.getUint16(a.pos, this._littleEndian);
    a.pos += 2;
    return b
  }, get bytesAvailable() {
    return this._stream.remaining()
  }, get connected() {
    return this._connected
  }, get endian() {
    return this._littleEndian ? "littleEndian" : "bigEndian"
  }, set endian(a) {
    this._littleEndian = "littleEndian" == a
  }, get objectEncoding() {
    throw"Not implemented: URLStream.objectEncoding$get";
  }, set objectEncoding(a) {
    throw"Not implemented: URLStream.objectEncoding$set";
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{close:a.close, load:a.load, readBoolean:a.readBoolean, readByte:a.readByte, readBytes:a.readBytes, readDouble:a.readDouble, readFloat:a.readFloat, readInt:a.readInt, readMultiByte:a.readMultiByte, readObject:a.readObject, readShort:a.readShort, readUTF:a.readUTF, readUTFBytes:a.readUTFBytes, readUnsignedByte:a.readUnsignedByte, readUnsignedInt:a.readUnsignedInt, readUnsignedShort:a.readUnsignedShort, bytesAvailable:b(a, "bytesAvailable"), connected:b(a, "connected"), 
  endian:b(a, "endian"), objectEncoding:b(a, "objectEncoding")}}};
  return a
}.call(this), CapabilitiesDefinition = function() {
  var a = {}, b, d = window.navigator.userAgent;
  0 < d.indexOf("Macintosh") ? b = "Mac OS 10.5.2" : 0 < d.indexOf("Windows") ? b = "Windows XP" : 0 < d.indexOf("Linux") ? b = "Linux" : notImplemented();
  a.__glue__ = {"native":{"static":{version:{get:function() {
    return"SHUMWAY 10,0,0,0"
  }, enumerable:!0}, os:{get:function() {
    return b
  }, enumerable:!0}}}, script:{"static":scriptProperties("public", ["version", "os"])}};
  return a
}.call(this), FSCommandDefinition = function() {
  return{__glue__:{"native":{"static":{_fscommand:function(a, b) {
    console.log("FSCommand: " + a + "; " + b)
  }}}}}
}.call(this), SecurityDefinition = function() {
  var a = !0;
  return{__class__:"flash.system.Security", initialize:function() {
  }, __glue__:{"native":{"static":{exactSettings:{get:function() {
    return a
  }, set:function(b) {
    a = b
  }}, sandboxType:{get:function() {
    return"remote"
  }}}, instance:{}}}}
}.call(this), SecurityDomainDefinition = function() {
  return{__class__:"flash.system.SecurityDomain", initialize:function() {
  }, _currentDomain:null, __glue__:{"native":{"static":{currentDomain:{get:function() {
    return this._currentDomain
  }}}, instance:{}}}}
}.call(this), SystemDefinition = function() {
  return{__class__:"flash.system.System", initialize:function() {
  }, __glue__:{"native":{"static":{setClipboard:function() {
    notImplemented("System.setClipboard")
  }, pause:function() {
    notImplemented("System.pause")
  }, resume:function() {
    notImplemented("System.resume")
  }, exit:function() {
    notImplemented("System.exit")
  }, gc:function() {
    notImplemented("System.gc")
  }, pauseForGCIfCollectionImminent:function() {
    notImplemented("System.pauseForGCIfCollectionImminent")
  }, disposeXML:function() {
    notImplemented("System.disposeXML")
  }, ime:{get:function() {
    notImplemented("System.ime")
  }}, totalMemoryNumber:{get:function() {
    return performance.memory ? performance.memory.usedJSHeapSize : 0
  }}, freeMemory:{get:function() {
    notImplemented("System.freeMemory")
  }}, privateMemory:{get:function() {
    return 0
  }}, processCPUUsage:{get:function() {
    notImplemented("System.processCPUUsage")
  }}, useCodePage:{get:function() {
    notImplemented("System.useCodePage")
  }, set:function() {
    notImplemented("System.useCodePage")
  }}, vmVersion:{get:function() {
    notImplemented("System.vmVersion")
  }}}, instance:{}}}}
}.call(this), FontDefinition = function() {
  var a = {__class__:"flash.text.Font", initialize:function() {
    var a = this.symbol;
    a && (this._fontName = a.name || null)
  }, get fontName() {
    return this._fontName
  }, get fontStyle() {
    return this._fontStyle
  }, get fontType() {
    return this._fontType
  }, hasGlyphs:function() {
    return!0
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{fontName:b(a, "fontName"), fontStyle:b(a, "fontStyle"), fontType:b(a, "fontType"), hasGlyphs:a.hasGlyphs}, "static":{enumerateFonts:function() {
    return[]
  }, registerFont:function() {
    throw"Not implemented: registerFont";
  }}}};
  return a
}.call(this), StaticTextDefinition = function() {
  var a = {__class__:"flash.text.StaticText", initialize:function() {
    var a = this.symbol;
    a && (this.draw = a.draw || null)
  }, get text() {
    return this._text
  }, set text(a) {
    this._text = a
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{text:b(a, "text")}}};
  return a
}.call(this), TextFieldDefinition = function() {
  var a = {__class__:"flash.text.TextField", initialize:function() {
    this._defaultTextFormat = null;
    var a = this.symbol;
    a && (this.draw = a.draw || this.draw, this.text = a.text || "")
  }, _getAS2Object:function() {
    this.$as2Object || (new AS2TextField).$attachNativeObject(this);
    return this.$as2Object
  }, replaceText:function(a, b, f) {
    this._text = this._text.substring(0, a) + f + this._text.substring(b);
    this._markAsDirty()
  }, draw:function(a) {
    var b = this._bbox;
    b && (a.save(), a.beginPath(), a.rect(b.left, b.top, b.right - b.left, b.bottom - b.top), a.clip(), a.fillText(this.text, b.left, b.bottom), a.restore())
  }, get text() {
    return this._text
  }, set text(a) {
    this._text !== a && (this._text = a, this._markAsDirty())
  }, get defaultTextFormat() {
    return this._defaultTextFormat
  }, set defaultTextFormat(a) {
    this._defaultTextFormat = a
  }, getTextFormat:function() {
    return null
  }, setTextFormat:function() {
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {"native":{instance:{text:b(a, "text"), defaultTextFormat:b(a, "defaultTextFormat"), draw:a.draw, replaceText:a.replaceText, getTextFormat:a.getTextFormat, setTextFormat:a.setTextFormat}}};
  return a
}.call(this), TextFormatDefinition = function() {
  return{__class__:"flash.text.TextFormat", initialize:function() {
  }, __glue__:{"native":{"static":{}, instance:{align:{get:function() {
    return this._align
  }, set:function(a) {
    this._align = a
  }}, blockIndent:{get:function() {
    return this._blockIndent
  }, set:function(a) {
    this._blockIndent = a
  }}, bold:{get:function() {
    return this._bold
  }, set:function(a) {
    this._bold = a
  }}, bullet:{get:function() {
    return this._bullet
  }, set:function(a) {
    this._bullet = a
  }}, color:{get:function() {
    return this._color
  }, set:function(a) {
    this._color = a
  }}, display:{get:function() {
    return this._display
  }, set:function(a) {
    this._display = a
  }}, font:{get:function() {
    return this._font
  }, set:function(a) {
    this._font = a
  }}, indent:{get:function() {
    return this._indent
  }, set:function(a) {
    this._indent = a
  }}, italic:{get:function() {
    return this._italic
  }, set:function(a) {
    this._italic = a
  }}, kerning:{get:function() {
    return this._kerning
  }, set:function(a) {
    this._kerning = a
  }}, leading:{get:function() {
    return this._leading
  }, set:function(a) {
    this._leading = a
  }}, leftMargin:{get:function() {
    return this._leftMargin
  }, set:function(a) {
    this._leftMargin = a
  }}, letterSpacing:{get:function() {
    return this._letterSpacing
  }, set:function(a) {
    this._letterSpacing = a
  }}, rightMargin:{get:function() {
    return this._rightMargin
  }, set:function(a) {
    this._rightMargin = a
  }}, size:{get:function() {
    return this._size
  }, set:function(a) {
    this._size = a
  }}, tabStops:{get:function() {
    return this._tabStops
  }, set:function(a) {
    this._tabStops = a
  }}, target:{get:function() {
    return this._target
  }, set:function(a) {
    this._target = a
  }}, underline:{get:function() {
    return this._underline
  }, set:function(a) {
    this._underline = a
  }}, url:{get:function() {
    return this._url
  }, set:function(a) {
    this._url = a
  }}}}}}
}.call(this), ShumwayKeyboardListener = {_lastKeyCode:0, _captureKeyPress:!1, focus:null, handleEvent:function(a) {
  var b = a.keyCode;
  if("keydown" === a.type) {
    if(this._lastKeyCode = b, this._captureKeyPress = 8 === b || 9 === b || 13 === b || 32 === b || 48 <= b && 90 >= b || 145 < b) {
      return
    }
  }else {
    if("keypress" === a.type && !this._captureKeyPress) {
      return
    }
  }
  this.focus && this.focus.dispatchEvent(new flash.events.KeyboardEvent("keyup" === a.type ? "keyUp" : "keyDown", !0, !1, a.charCode, "keyup" === a.type ? a.keyCode : this._lastKeyCode, a.keyLocation, a.ctrlKey, a.altKey, a.shiftKey))
}};
window.addEventListener("keydown", ShumwayKeyboardListener);
window.addEventListener("keypress", ShumwayKeyboardListener);
window.addEventListener("keyup", ShumwayKeyboardListener);
var KeyboardDefinition = function() {
  var a = {get capsLock() {
    return!1
  }, get hasVirtualKeyboard() {
    return!1
  }, get numLock() {
    return!1
  }, get physicalKeyboardType() {
    return"alphanumeric"
  }, get isAccessible() {
    return!0
  }}, b = Object.getOwnPropertyDescriptor;
  a.__glue__ = {script:{"static":scriptProperties("public", "A ALTERNATE AUDIO B BACK BACKQUOTE BACKSLASH BACKSPACE BLUE C CAPS_LOCK CHANNEL_DOWN CHANNEL_UP COMMA COMMAND CONTROL D DELETE DOWN DVR E END ENTER EQUAL ESCAPE EXIT F F1 F10 F11 F12 F13 F14 F15 F2 F3 F4 F5 F6 F7 F8 F9 FAST_FORWARD G GREEN GUIDE H HELP HOME I INFO INPUT INSERT J K KEYNAME_BEGIN KEYNAME_BREAK KEYNAME_CLEARDISPLAY KEYNAME_CLEARLINE KEYNAME_DELETE KEYNAME_DELETECHAR KEYNAME_DELETELINE KEYNAME_DOWNARROW KEYNAME_END KEYNAME_EXECUTE KEYNAME_F1 KEYNAME_F10 KEYNAME_F11 KEYNAME_F12 KEYNAME_F13 KEYNAME_F14 KEYNAME_F15 KEYNAME_F16 KEYNAME_F17 KEYNAME_F18 KEYNAME_F19 KEYNAME_F2 KEYNAME_F20 KEYNAME_F21 KEYNAME_F22 KEYNAME_F23 KEYNAME_F24 KEYNAME_F25 KEYNAME_F26 KEYNAME_F27 KEYNAME_F28 KEYNAME_F29 KEYNAME_F3 KEYNAME_F30 KEYNAME_F31 KEYNAME_F32 KEYNAME_F33 KEYNAME_F34 KEYNAME_F35 KEYNAME_F4 KEYNAME_F5 KEYNAME_F6 KEYNAME_F7 KEYNAME_F8 KEYNAME_F9 KEYNAME_FIND KEYNAME_HELP KEYNAME_HOME KEYNAME_INSERT KEYNAME_INSERTCHAR KEYNAME_INSERTLINE KEYNAME_LEFTARROW KEYNAME_MENU KEYNAME_MODESWITCH KEYNAME_NEXT KEYNAME_PAGEDOWN KEYNAME_PAGEUP KEYNAME_PAUSE KEYNAME_PREV KEYNAME_PRINT KEYNAME_PRINTSCREEN KEYNAME_REDO KEYNAME_RESET KEYNAME_RIGHTARROW KEYNAME_SCROLLLOCK KEYNAME_SELECT KEYNAME_STOP KEYNAME_SYSREQ KEYNAME_SYSTEM KEYNAME_UNDO KEYNAME_UPARROW KEYNAME_USER L LAST LEFT LEFTBRACKET LIVE M MASTER_SHELL MENU MINUS N NEXT NUMBER_0 NUMBER_1 NUMBER_2 NUMBER_3 NUMBER_4 NUMBER_5 NUMBER_6 NUMBER_7 NUMBER_8 NUMBER_9 NUMPAD NUMPAD_0 NUMPAD_1 NUMPAD_2 NUMPAD_3 NUMPAD_4 NUMPAD_5 NUMPAD_6 NUMPAD_7 NUMPAD_8 NUMPAD_9 NUMPAD_ADD NUMPAD_DECIMAL NUMPAD_DIVIDE NUMPAD_ENTER NUMPAD_MULTIPLY NUMPAD_SUBTRACT O P PAGE_DOWN PAGE_UP PAUSE PERIOD PLAY PREVIOUS Q QUOTE R RECORD RED REWIND RIGHT RIGHTBRACKET S SEARCH SEMICOLON SETUP SHIFT SKIP_BACKWARD SKIP_FORWARD SLASH SPACE STOP STRING_BEGIN STRING_BREAK STRING_CLEARDISPLAY STRING_CLEARLINE STRING_DELETE STRING_DELETECHAR STRING_DELETELINE STRING_DOWNARROW STRING_END STRING_EXECUTE STRING_F1 STRING_F10 STRING_F11 STRING_F12 STRING_F13 STRING_F14 STRING_F15 STRING_F16 STRING_F17 STRING_F18 STRING_F19 STRING_F2 STRING_F20 STRING_F21 STRING_F22 STRING_F23 STRING_F24 STRING_F25 STRING_F26 STRING_F27 STRING_F28 STRING_F29 STRING_F3 STRING_F30 STRING_F31 STRING_F32 STRING_F33 STRING_F34 STRING_F35 STRING_F4 STRING_F5 STRING_F6 STRING_F7 STRING_F8 STRING_F9 STRING_FIND STRING_HELP STRING_HOME STRING_INSERT STRING_INSERTCHAR STRING_INSERTLINE STRING_LEFTARROW STRING_MENU STRING_MODESWITCH STRING_NEXT STRING_PAGEDOWN STRING_PAGEUP STRING_PAUSE STRING_PREV STRING_PRINT STRING_PRINTSCREEN STRING_REDO STRING_RESET STRING_RIGHTARROW STRING_SCROLLLOCK STRING_SELECT STRING_STOP STRING_SYSREQ STRING_SYSTEM STRING_UNDO STRING_UPARROW STRING_USER SUBTITLE T TAB U UP V VOD W X Y YELLOW Z CharCodeStrings".split(" "))}, 
  "native":{instance:{capsLock:b(a, "capsLock"), hasVirtualKeyboard:b(a, "hasVirtualKeyboard"), numLock:b(a, "numLock"), physicalKeyboardType:b(a, "physicalKeyboardType"), isAccessible:b(a, "isAccessible")}}};
  return a
}.call(this), MouseDefinition = function() {
  return{__class__:"flash.ui.Mouse", __glue__:{"native":{"static":{cursor:{get:function() {
    return"auto"
  }, set:function() {
    notImplemented()
  }}, supportsCursor:{get:function() {
    return!0
  }}, supportsNativeCursor:{get:function() {
    return!0
  }}, hide:function() {
  }, show:function() {
  }, registerCursor:function() {
    notImplemented()
  }, unregisterCursor:function() {
    notImplemented()
  }}}}}
}.call(this), TimerDefinition = function() {
  return{__class__:"flash.utils.Timer", initialize:function() {
    this.running = !1;
    this.private$flash$utils$Timer$m_iteration = 0
  }, __glue__:{"native":{instance:{running:{get:function() {
    return this.running
  }}, _start:function(a, b) {
    this.running = !0;
    this.interval = setInterval(b, a)
  }, stop:function() {
    this.running = !1;
    clearInterval(this.interval)
  }, _timerDispatch:function() {
    this.dispatchEvent(new flash.events.TimerEvent("timer", !0, !1))
  }}}}}
}.call(this);
function makeStub(a, b, d) {
  function e() {
    if(!avm2) {
      throw Error("AVM2 not initialized");
    }
    var f = avm2.systemDomain.getClass(b);
    a[d] = f.instance;
    e.prototype = f.instance.prototype;
    return f.createInstance(arguments)
  }
  a[d] = e
}
var as3error = {};
"Error DefinitionError EvalError RangeError ReferenceError SecurityError SyntaxError TypeError URIError URIError VerifyError UninitializedError ArgumentError".split(" ").forEach(function(a) {
  makeStub(as3error, a, a)
});
(function() {
  function a(a, d, e) {
    return{className:a, nativeName:d, definition:e}
  }
  [a("flash.display.DisplayObject", "DisplayObjectClass", DisplayObjectDefinition), a("flash.display.InteractiveObject", "InteractiveObjectClass", InteractiveObjectDefinition), a("flash.display.DisplayObjectContainer", "ContainerClass", DisplayObjectContainerDefinition), a("flash.display.Sprite", "SpriteClass", SpriteDefinition), a("flash.display.MovieClip", "MovieClipClass", MovieClipDefinition), a("flash.display.Shape", "ShapeClass", ShapeDefinition), a("flash.display.Bitmap", "BitmapClass", BitmapDefinition), 
  a("flash.display.BitmapData", "BitmapDataClass", BitmapDataDefinition), a("flash.display.Stage", "StageClass", StageDefinition), a("flash.display.Loader", "LoaderClass", LoaderDefinition), a("flash.display.LoaderInfo", "LoaderInfoClass", LoaderInfoDefinition), a("flash.display.Graphics", "GraphicsClass", GraphicsDefinition), a("flash.display.SimpleButton", "SimpleButtonClass", SimpleButtonDefinition), a("flash.display.MorphShape", "MorphShapeClass", MorphShapeDefinition), a("flash.filters.BevelFilter", 
  "BevelFilterClass", BevelFilterDefinition), a("flash.filters.BitmapFilter", "BitmapFilterClass", BitmapFilterDefinition), a("flash.filters.BlurFilter", "BlurFilterClass", BlurFilterDefinition), a("flash.filters.ColorMatrixFilter", "ColorMatrixFilterClass", ColorMatrixFilterDefinition), a("flash.filters.ConvolutionFilter", "ConvolutionFilterClass", ConvolutionFilterDefinition), a("flash.filters.DisplacementMapFilter", "DisplacementMapFilterClass", DisplacementMapFilterDefinition), a("flash.filters.DropShadowFilter", 
  "DropShadowFilterClass", DropShadowFilterDefinition), a("flash.filters.GlowFilter", "GlowFilterClass", GlowFilterDefinition), a("flash.filters.GradientBevelFilter", "GradientBevelFilterClass", GradientBevelFilterDefinition), a("flash.filters.GradientGlowFilter", "GradientGlowFilterClass", GradientGlowFilterDefinition), a("flash.filters.ShaderFilter", "ShaderFilterClass", ShaderFilterDefinition), a("flash.geom.Point", "PointClass", PointDefinition), a("flash.geom.Rectangle", "RectangleClass", RectangleDefinition), 
  a("flash.geom.Matrix", "MatrixClass", MatrixDefinition), a("flash.geom.Transform", "TransformClass", TransformDefinition), a("flash.geom.ColorTransform", "ColorTransformClass", ColorTransformDefinition), a("flash.events.EventDispatcher", "EventDispatcherClass", EventDispatcherDefinition), a("flash.events.Event", "EventClass", EventDefinition), a("flash.events.KeyboardEvent", "KeyboardEventClass", KeyboardEventDefinition), a("flash.events.MouseEvent", "MouseEventClass", MouseEventDefinition), a("flash.events.TextEvent", 
  "TextEventClass", TextEventDefinition), a("flash.events.TimerEvent", "TimerEventClass", TimerEventDefinition), a("flash.external.ExternalInterface", "ExternalInterfaceClass", ExternalInterfaceDefinition), a("flash.ui.Keyboard", "KeyboardClass", KeyboardDefinition), a("flash.ui.Mouse", "MouseClass", MouseDefinition), a("flash.text.Font", "FontClass", FontDefinition), a("flash.text.TextField", "TextFieldClass", TextFieldDefinition), a("flash.text.StaticText", "StaticTextClass", StaticTextDefinition), 
  a("flash.text.TextFormat", "TextFormatClass", TextFormatDefinition), a("flash.media.Sound", "SoundClass", SoundDefinition), a("flash.media.SoundChannel", "SoundChannelClass", SoundChannelDefinition), a("flash.media.SoundMixer", "SoundMixerClass", SoundMixerDefinition), a("flash.media.SoundTransform", "SoundTransformClass", SoundTransformDefinition), a("flash.media.Video", "VideoClass", VideoDefinition), a("flash.media.ID3Info", "ID3InfoClass", ID3InfoDefinition), a("flash.net.NetConnection", "NetConnectionClass", 
  NetConnectionDefinition), a("flash.net.NetStream", "NetStreamClass", NetStreamDefinition), a("flash.net.Responder", "ResponderClass", ResponderDefinition), a("flash.net.URLRequest", "URLRequestClass", URLRequestDefinition), a("flash.net.URLStream", "URLStreamClass", URLStreamDefinition), a("flash.net.URLLoader", "URLLoaderClass", URLLoaderDefinition), a("flash.system.FSCommand", "FSCommandClass", FSCommandDefinition), a("flash.system.Capabilities", "CapabilitiesClass", CapabilitiesDefinition), 
  a("flash.system.System", "SystemClass", SystemDefinition), a("flash.system.Security", "SecurityClass", SecurityDefinition), a("flash.system.SecurityDomain", "SecurityDomainClass", SecurityDomainDefinition), a("flash.utils.Timer", "TimerClass", TimerDefinition)].forEach(function(a) {
    for(var d = a.className.split("."), e = this, f = 0, g = d.length - 1;f < g;f++) {
      e[d[f]] || (e[d[f]] = {}), e = e[d[f]]
    }
    makeStub(e, a.className, d[d.length - 1]);
    natives[a.nativeName] = function(d, e, f, g) {
      d = new d.domain.system.Class(name, f, Domain.coerceCallable);
      d.extend(g);
      d.link(a.definition);
      return d
    }
  })
}).call(this);
natives["FlashUtilScript::getDefinitionByName"] = natives.getDefinitionByName;
natives["FlashUtilScript::getTimer"] = function() {
  var a = Date.now();
  return function() {
    return Date.now() - a
  }
};
natives["FlashNetScript::navigateToURL"] = function() {
  return function(a, b) {
    if(!a || !a.url) {
      throw Error("Invalid request object");
    }
    var d = a.url;
    /^fscommand:/i.test(d) ? avm2.applicationDomain.getProperty(Multiname.fromSimpleName("flash.system.fscommand"), !0, !0).call(null, d.substring(10), b) : window.open(d, b)
  }
};

