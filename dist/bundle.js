(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dup = dup;
exports.sub = sub;
exports.concat = concat;
exports.make = make;
exports.make_float = make_float;
exports.blit = blit;
exports.get = get;
exports.set = set;

function sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;

  while (j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }

  ;
  return result;
}

function len(_acc, _l) {
  while (true) {
    var l = _l;
    var acc = _acc;

    if (!l) {
      return acc;
    }

    _l = l.tl;
    _acc = l.hd.length + acc | 0;
    continue;
  }

  ;
}

function fill(arr, _i, _l) {
  while (true) {
    var l = _l;
    var i = _i;

    if (!l) {
      return;
    }

    var x = l.hd;
    var l$1 = x.length;
    var k = i;
    var j = 0;

    while (j < l$1) {
      arr[k] = x[j];
      k = k + 1 | 0;
      j = j + 1 | 0;
    }

    ;
    _l = l.tl;
    _i = k;
    continue;
  }

  ;
}

function concat(l) {
  var v = len(0, l);
  var result = new Array(v);
  fill(result, 0, l);
  return result;
}

function set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "index out of bounds",
      Error: new Error()
    };
  }

  xs[index] = newval;
}

function get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "index out of bounds",
      Error: new Error()
    };
  }

  return xs[index];
}

function make(len, init) {
  var b = new Array(len);

  for (var i = 0; i < len; ++i) {
    b[i] = init;
  }

  return b;
}

function make_float(len) {
  var b = new Array(len);

  for (var i = 0; i < len; ++i) {
    b[i] = 0;
  }

  return b;
}

function blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for (var j = 0; j < len; ++j) {
      a2[j + i2 | 0] = a1[j + i1 | 0];
    }

    return;
  }

  for (var j$1 = len - 1 | 0; j$1 >= 0; --j$1) {
    a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
  }
}

function dup(prim) {
  return prim.slice(0);
}
/* No side effect */

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nullable_to_opt = nullable_to_opt;
exports.undefined_to_opt = undefined_to_opt;
exports.null_to_opt = null_to_opt;
exports.valFromOption = valFromOption;
exports.some = some;
exports.isNested = isNested;
exports.option_get = option_get;
exports.option_unwrap = option_unwrap;

function isNested(x) {
  return x.BS_PRIVATE_NESTED_SOME_NONE !== undefined;
}

function some(x) {
  if (x === undefined) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: 0
    };
  } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
    };
  } else {
    return x;
  }
}

function nullable_to_opt(x) {
  if (x == null) {
    return;
  } else {
    return some(x);
  }
}

function undefined_to_opt(x) {
  if (x === undefined) {
    return;
  } else {
    return some(x);
  }
}

function null_to_opt(x) {
  if (x === null) {
    return;
  } else {
    return some(x);
  }
}

function valFromOption(x) {
  if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined)) {
    return x;
  }

  var depth = x.BS_PRIVATE_NESTED_SOME_NONE;

  if (depth === 0) {
    return;
  } else {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
    };
  }
}

function option_get(x) {
  if (x === undefined) {
    return;
  } else {
    return valFromOption(x);
  }
}

function option_unwrap(x) {
  if (x !== undefined) {
    return x.VAL;
  } else {
    return x;
  }
}
/* No side effect */

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.entries = entries;
exports.values = values;
exports.fromList = fromList;
exports.fromArray = fromArray;
exports.map = map;
exports.unsafeDeleteKey = void 0;

var Caml_option = _interopRequireWildcard(require("./caml_option.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function get(dict, k) {
  if (k in dict) {
    return Caml_option.some(dict[k]);
  }
}

var unsafeDeleteKey = function (dict, key) {
  delete dict[key];
};

exports.unsafeDeleteKey = unsafeDeleteKey;

function entries(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values = new Array(l);

  for (var i = 0; i < l; ++i) {
    var key = keys[i];
    values[i] = [key, dict[key]];
  }

  return values;
}

function values(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values$1 = new Array(l);

  for (var i = 0; i < l; ++i) {
    values$1[i] = dict[keys[i]];
  }

  return values$1;
}

function fromList(entries) {
  var dict = {};
  var _param = entries;

  while (true) {
    var param = _param;

    if (!param) {
      return dict;
    }

    var match = param.hd;
    dict[match[0]] = match[1];
    _param = param.tl;
    continue;
  }

  ;
}

function fromArray(entries) {
  var dict = {};
  var l = entries.length;

  for (var i = 0; i < l; ++i) {
    var match = entries[i];
    dict[match[0]] = match[1];
  }

  return dict;
}

function map(f, source) {
  var target = {};
  var keys = Object.keys(source);
  var l = keys.length;

  for (var i = 0; i < l; ++i) {
    var key = keys[i];
    target[key] = f(source[key]);
  }

  return target;
}
/* No side effect */

},{"./caml_option.js":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equal = equal;
exports.min = exports.max = void 0;

function equal(x, y) {
  return x === y;
}

var max = 2147483647;
exports.max = max;
var min = -2147483648;
/* No side effect */

exports.min = min;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafe_ceil = unsafe_ceil;
exports.ceil_int = ceil_int;
exports.unsafe_floor = unsafe_floor;
exports.floor_int = floor_int;
exports.random_int = random_int;
exports.floor = exports.ceil = void 0;

var Js_int = _interopRequireWildcard(require("./js_int.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function unsafe_ceil(prim) {
  return Math.ceil(prim);
}

function ceil_int(f) {
  if (f > Js_int.max) {
    return Js_int.max;
  } else if (f < Js_int.min) {
    return Js_int.min;
  } else {
    return Math.ceil(f);
  }
}

function unsafe_floor(prim) {
  return Math.floor(prim);
}

function floor_int(f) {
  if (f > Js_int.max) {
    return Js_int.max;
  } else if (f < Js_int.min) {
    return Js_int.min;
  } else {
    return Math.floor(f);
  }
}

function random_int(min, max) {
  return floor_int(Math.random() * (max - min | 0)) + min | 0;
}

var ceil = ceil_int;
exports.ceil = ceil;
var floor = floor_int;
/* No side effect */

exports.floor = floor;

},{"./js_int.js":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.examples = void 0;

var Formula$MathSolver = _interopRequireWildcard(require("../Formula.bs.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
var examples = [Formula$MathSolver.createEquationFormula([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "y"), Formula$MathSolver.createSumExpression([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createIntPrimitiveExpression(0)])]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createSumExpression([Formula$MathSolver.createFractionPrimitiveExpression(0, 1, 2), Formula$MathSolver.createFractionPrimitiveExpression(0, 1, 3)])]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createSumExpression([Formula$MathSolver.createFractionPrimitiveExpression(3, 2, 9), Formula$MathSolver.createFractionPrimitiveExpression(-1, 1, 12), Formula$MathSolver.createFractionPrimitiveExpression(0, 1, 6)])]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createSumExpression([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createIntPrimitiveExpression(1)])]), Formula$MathSolver.createIntPrimitiveExpression(0)]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createSumExpression([Formula$MathSolver.createIntPrimitiveExpression(1), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "-x")])]), Formula$MathSolver.createIntPrimitiveExpression(2)]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createSumExpression([Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createIntPrimitiveExpression(2), Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createIntPrimitiveExpression(2))]), Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createIntPrimitiveExpression(3), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x")]), Formula$MathSolver.createIntPrimitiveExpression(-1)]), Formula$MathSolver.createIntPrimitiveExpression(0)]), Formula$MathSolver.createLogicalOrFormula([Formula$MathSolver.createEquation([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createIntPrimitiveExpression(1)]), Formula$MathSolver.createEquation([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createIntPrimitiveExpression(4)])]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "y"), Formula$MathSolver.createProductExpression(
/* PlusMinus */
2, [Formula$MathSolver.createIntPrimitiveExpression(3), Formula$MathSolver.createSquarerootExpression(undefined, Formula$MathSolver.createIntPrimitiveExpression(2))])]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "\xcf\x86"), Formula$MathSolver.createSumExpression([Formula$MathSolver.createFractionPrimitiveExpression(0, 1, 2), Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createFractionPrimitiveExpression(0, 1, 2), Formula$MathSolver.createSquarerootExpression(undefined, Formula$MathSolver.createIntPrimitiveExpression(5))])])]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "V"), Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createFractionPrimitiveExpression(0, 4, 3), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "\xcf\x80"), Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "r"), Formula$MathSolver.createIntPrimitiveExpression(3))])]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createRootExpression(undefined, Formula$MathSolver.createIntPrimitiveExpression(3), Formula$MathSolver.createIntPrimitiveExpression(27))]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "y"), Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createIntPrimitiveExpression(3), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x")]), Formula$MathSolver.createIntPrimitiveExpression(5))]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "y"), Formula$MathSolver.createRootExpression(undefined, Formula$MathSolver.createSumExpression([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createIntPrimitiveExpression(5)]), Formula$MathSolver.createIntPrimitiveExpression(3125))]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createVarPrimitiveExpression("1,2", undefined, "x"), Formula$MathSolver.createFractionExpression(undefined, Formula$MathSolver.createSumExpression([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "-b"), Formula$MathSolver.createSquarerootExpression(
/* PlusMinus */
2, Formula$MathSolver.createSumExpression([Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "b"), Formula$MathSolver.createIntPrimitiveExpression(2)), Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createIntPrimitiveExpression(-4), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "a"), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "c")])]))]), Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createIntPrimitiveExpression(2), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "a")]))]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "h"), Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createFloatPrimitiveExpression(13.1), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "Q"), Formula$MathSolver.createSquarerootExpression(undefined, Formula$MathSolver.createFractionExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression("0", undefined, "\xce\xbc"), Formula$MathSolver.createVarPrimitiveExpression("0", undefined, "\xcf\xb5"))), Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "\xce\xb6"), Formula$MathSolver.createIntPrimitiveExpression(2))])]), Formula$MathSolver.createEquationFormula([Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createVarPrimitiveExpression("\xce\xbb", undefined, "B"), Formula$MathSolver.createTextExpression("(\xce\xbb,T)")]), Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createFractionExpression(undefined, Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createIntPrimitiveExpression(2), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "h"), Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "c"), Formula$MathSolver.createIntPrimitiveExpression(2))]), Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "\xce\xbb"), Formula$MathSolver.createIntPrimitiveExpression(5))), Formula$MathSolver.createFractionExpression(undefined, Formula$MathSolver.createIntPrimitiveExpression(1), Formula$MathSolver.createSumExpression([Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "e"), Formula$MathSolver.createFractionExpression(undefined, Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "h"), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "c")]), Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "\xce\xbb"), Formula$MathSolver.createVarPrimitiveExpression("B",
/* Upright */
0, "k"), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "T")]))), Formula$MathSolver.createIntPrimitiveExpression(-1)]))])])];
/* examples Not a pure module */

exports.examples = examples;

},{"../Formula.bs.js":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._generateShapeFactorSimple = _generateShapeFactorSimple;
exports._generateShapeFactorHard = _generateShapeFactorHard;
exports._generateShapeSquare = _generateShapeSquare;
exports._generateShapeSquareConst = _generateShapeSquareConst;
exports._generateShapeSquareLinear = _generateShapeSquareLinear;
exports._generateShapeFullQuadratic = _generateShapeFullQuadratic;
exports.generate = generate;

var Random$MathSolver = _interopRequireWildcard(require("../Random.bs.js"));

var Formula$MathSolver = _interopRequireWildcard(require("../Formula.bs.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
function _generateShapeFactorSimple(rightMember) {
  return Formula$MathSolver.createEquationFormula([Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createSumExpression([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Random$MathSolver.randomNumberPrimitiveExpression(undefined)])]), Formula$MathSolver.createIntPrimitiveExpression(rightMember)]);
}

function _generateShapeFactorHard(rightMember) {
  return Formula$MathSolver.createEquationFormula([Formula$MathSolver.createProductExpression(undefined, [Formula$MathSolver.createSumExpression([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Random$MathSolver.randomNumberPrimitiveExpression(undefined)]), Formula$MathSolver.createSumExpression([Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Random$MathSolver.randomNumberPrimitiveExpression(undefined)])]), Formula$MathSolver.createIntPrimitiveExpression(rightMember)]);
}

function _generateShapeSquare(rightMember) {
  return Formula$MathSolver.createEquationFormula([Formula$MathSolver.createProductExpression(undefined, [Random$MathSolver.randomNumberPrimitiveExpression(undefined), Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createIntPrimitiveExpression(2))]), Formula$MathSolver.createIntPrimitiveExpression(rightMember)]);
}

function _generateShapeSquareConst(rightMember) {
  return Formula$MathSolver.createEquationFormula([Formula$MathSolver.createSumExpression([Formula$MathSolver.createProductExpression(undefined, [Random$MathSolver.randomNumberPrimitiveExpression(undefined), Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createIntPrimitiveExpression(2))]), Random$MathSolver.randomNumberPrimitiveExpression(undefined)]), Formula$MathSolver.createIntPrimitiveExpression(rightMember)]);
}

function _generateShapeSquareLinear(rightMember) {
  return Formula$MathSolver.createEquationFormula([Formula$MathSolver.createSumExpression([Formula$MathSolver.createProductExpression(undefined, [Random$MathSolver.randomNumberPrimitiveExpression(undefined), Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createIntPrimitiveExpression(2))]), Formula$MathSolver.createProductExpression(undefined, [Random$MathSolver.randomNumberPrimitiveExpression(undefined), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x")])]), Formula$MathSolver.createIntPrimitiveExpression(rightMember)]);
}

function _generateShapeFullQuadratic(rightMember) {
  return Formula$MathSolver.createEquationFormula([Formula$MathSolver.createSumExpression([Formula$MathSolver.createProductExpression(undefined, [Random$MathSolver.randomNumberPrimitiveExpression(undefined), Formula$MathSolver.createPowerExpression(undefined, Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x"), Formula$MathSolver.createIntPrimitiveExpression(2))]), Formula$MathSolver.createProductExpression(undefined, [Random$MathSolver.randomNumberPrimitiveExpression(undefined), Formula$MathSolver.createVarPrimitiveExpression(undefined, undefined, "x")]), Random$MathSolver.randomNumberPrimitiveExpression(undefined)]), Formula$MathSolver.createIntPrimitiveExpression(rightMember)]);
}

function generate(param) {
  var shape = Random$MathSolver.randomPos(11);
  var rightMember = Random$MathSolver.randomNumber(undefined);

  switch (shape) {
    case 0:
      return _generateShapeFactorSimple(0);

    case 1:
      return _generateShapeFactorSimple(rightMember);

    case 2:
      return _generateShapeFactorHard(0);

    case 3:
      return _generateShapeFactorHard(rightMember);

    case 4:
      return _generateShapeSquare(rightMember);

    case 5:
      return _generateShapeSquareConst(0);

    case 6:
      return _generateShapeSquareConst(rightMember);

    case 7:
      return _generateShapeSquareLinear(0);

    case 8:
      return _generateShapeSquareLinear(rightMember);

    case 9:
      return _generateShapeFullQuadratic(0);

    case 10:
      return _generateShapeFullQuadratic(rightMember);

    default:
      return {
        TAG:
        /* Text */
        2,
        _0: ""
      };
  }
}
/* No side effect */

},{"../Formula.bs.js":8,"../Random.bs.js":11}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTextExpression = createTextExpression;
exports.createVarPrimitiveExpression = createVarPrimitiveExpression;
exports.createIntPrimitiveExpression = createIntPrimitiveExpression;
exports.createFractionPrimitiveExpression = createFractionPrimitiveExpression;
exports.createFloatPrimitiveExpression = createFloatPrimitiveExpression;
exports.createSumExpression = createSumExpression;
exports.createProductExpression = createProductExpression;
exports.createFractionExpression = createFractionExpression;
exports.createPowerExpression = createPowerExpression;
exports.createSquarerootExpression = createSquarerootExpression;
exports.createRootExpression = createRootExpression;
exports.createEquation = createEquation;
exports.createEquationFormula = createEquationFormula;
exports.createLogicalOrFormula = createLogicalOrFormula;

// Generated by ReScript, PLEASE EDIT WITH CARE
function createTextExpression(text) {
  return {
    TAG:
    /* TextExpression */
    0,
    _0: text
  };
}

function createVarPrimitiveExpression(subscript, subscriptFontStyleOpt, value) {
  var subscriptFontStyle = subscriptFontStyleOpt !== undefined ? subscriptFontStyleOpt :
  /* Default */
  2;

  if (value.substring(0, 0) === "-") {
    return {
      TAG:
      /* VarPrimitiveExpression */
      1,
      _0: {
        sign:
        /* Minus */
        1,
        value: value.slice(1),
        subscript: subscript,
        subscriptFontStyle: subscriptFontStyle
      }
    };
  } else {
    return {
      TAG:
      /* VarPrimitiveExpression */
      1,
      _0: {
        sign:
        /* Plus */
        0,
        value: value,
        subscript: subscript,
        subscriptFontStyle: subscriptFontStyle
      }
    };
  }
}

function createIntPrimitiveExpression(value) {
  if (value < 0) {
    return {
      TAG:
      /* IntPrimitiveExpression */
      2,
      _0: {
        sign:
        /* Minus */
        1,
        value: -value | 0
      }
    };
  } else {
    return {
      TAG:
      /* IntPrimitiveExpression */
      2,
      _0: {
        sign:
        /* Plus */
        0,
        value: value
      }
    };
  }
}

function createFractionPrimitiveExpression(integer, numerator, denominator) {
  if (integer < 0) {
    return {
      TAG:
      /* FractionPrimitiveExpression */
      3,
      _0: {
        sign:
        /* Minus */
        1,
        integer: -integer | 0,
        numerator: numerator,
        denominator: denominator
      }
    };
  } else {
    return {
      TAG:
      /* FractionPrimitiveExpression */
      3,
      _0: {
        sign:
        /* Plus */
        0,
        integer: integer,
        numerator: numerator,
        denominator: denominator
      }
    };
  }
}

function createFloatPrimitiveExpression(value) {
  if (value < 0) {
    return {
      TAG:
      /* FloatPrimitiveExpression */
      4,
      _0: {
        sign:
        /* Minus */
        1,
        value: -value
      }
    };
  } else {
    return {
      TAG:
      /* FloatPrimitiveExpression */
      4,
      _0: {
        sign:
        /* Plus */
        0,
        value: value
      }
    };
  }
}

function createSumExpression(terms) {
  return {
    TAG:
    /* SumExpression */
    5,
    _0: {
      terms: terms
    }
  };
}

function createProductExpression(signOpt, factors) {
  var sign = signOpt !== undefined ? signOpt :
  /* Plus */
  0;
  return {
    TAG:
    /* ProductExpression */
    6,
    _0: {
      sign: sign,
      factors: factors
    }
  };
}

function createFractionExpression(signOpt, numerator, denominator) {
  var sign = signOpt !== undefined ? signOpt :
  /* Plus */
  0;
  return {
    TAG:
    /* FractionExpression */
    7,
    _0: {
      sign: sign,
      numerator: numerator,
      denominator: denominator
    }
  };
}

function createPowerExpression(signOpt, base, exponent) {
  var sign = signOpt !== undefined ? signOpt :
  /* Plus */
  0;
  return {
    TAG:
    /* PowerExpression */
    8,
    _0: {
      sign: sign,
      base: base,
      exponent: exponent
    }
  };
}

function createSquarerootExpression(signOpt, radicand) {
  var sign = signOpt !== undefined ? signOpt :
  /* Plus */
  0;
  return {
    TAG:
    /* SquarerootExpression */
    10,
    _0: {
      sign: sign,
      radicand: radicand
    }
  };
}

function createRootExpression(signOpt, index, radicand) {
  var sign = signOpt !== undefined ? signOpt :
  /* Plus */
  0;
  return {
    TAG:
    /* RootExpression */
    9,
    _0: {
      sign: sign,
      index: index,
      radicand: radicand
    }
  };
}

function createEquation(members) {
  return {
    members: members
  };
}

function createEquationFormula(members) {
  return {
    TAG:
    /* Equation */
    1,
    _0: {
      members: members
    }
  };
}

function createLogicalOrFormula(atoms) {
  return {
    TAG:
    /* LogicalOr */
    0,
    _0: {
      atoms: atoms
    }
  };
}
/* No side effect */

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._removeAddZero = _removeAddZero;
exports._cleanupSumToExpression = _cleanupSumToExpression;
exports._removeMultiplyOne = _removeMultiplyOne;
exports._cleanupProductToExpression = _cleanupProductToExpression;
exports._cleanupExpression = _cleanupExpression;
exports._cleanupMembers = _cleanupMembers;
exports._cleanupEquation = _cleanupEquation;
exports._cleanupEquations = _cleanupEquations;
exports.cleanup = cleanup;

var Formula$MathSolver = _interopRequireWildcard(require("../Formula.bs.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
function _removeAddZero(terms) {
  return terms.filter(function (term) {
    switch (term.TAG | 0) {
      case
      /* IntPrimitiveExpression */
      2:
        return term._0.value !== 0;

      case
      /* FloatPrimitiveExpression */
      4:
        return term._0.value !== 0;

      default:
        return true;
    }
  });
}

function _cleanupSumToExpression(sum) {
  return Formula$MathSolver.createSumExpression(_removeAddZero(sum.terms));
}

function _removeMultiplyOne(factors) {
  return factors.filter(function (factor) {
    switch (factor.TAG | 0) {
      case
      /* IntPrimitiveExpression */
      2:
        return factor._0.value !== 1;

      case
      /* FloatPrimitiveExpression */
      4:
        return factor._0.value !== 1;

      default:
        return true;
    }
  });
}

function _cleanupProductToExpression(product) {
  return Formula$MathSolver.createProductExpression(product.sign, _removeMultiplyOne(product.factors));
}

function _cleanupExpression(expression) {
  switch (expression.TAG | 0) {
    case
    /* SumExpression */
    5:
      return Formula$MathSolver.createSumExpression(_removeAddZero(expression._0.terms));

    case
    /* ProductExpression */
    6:
      return _cleanupProductToExpression(expression._0);

    default:
      return expression;
  }
}

function _cleanupMembers(expressions) {
  return expressions.map(_cleanupExpression);
}

function _cleanupEquation(equation) {
  return Formula$MathSolver.createEquation(equation.members.map(_cleanupExpression));
}

function _cleanupEquations(equations) {
  return equations.map(_cleanupEquation);
}

function cleanup(formula) {
  switch (formula.TAG | 0) {
    case
    /* LogicalOr */
    0:
      return Formula$MathSolver.createLogicalOrFormula(formula._0.atoms.map(_cleanupEquation));

    case
    /* Equation */
    1:
      return Formula$MathSolver.createEquationFormula(formula._0.members.map(_cleanupExpression));

    case
    /* Text */
    2:
      return formula;
  }
}
/* No side effect */

},{"../Formula.bs.js":8}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._textToTex = _textToTex;
exports._signAttrToTex = _signAttrToTex;
exports._applyFontStyle = _applyFontStyle;
exports._subscriptAttrToTex = _subscriptAttrToTex;
exports._varPrimitiveNodeToTex = _varPrimitiveNodeToTex;
exports._intPrimitiveNodeToTex = _intPrimitiveNodeToTex;
exports._fractionPrimitiveNodeToTex = _fractionPrimitiveNodeToTex;
exports._floatPrimitiveNodeToTex = _floatPrimitiveNodeToTex;
exports._expressionNodeToTex = _expressionNodeToTex;
exports._termNodeToTex = _termNodeToTex;
exports._sumNodeToTex = _sumNodeToTex;
exports._factorNodeToTex = _factorNodeToTex;
exports._productNodeToTex = _productNodeToTex;
exports._fractionNodeToTex = _fractionNodeToTex;
exports._powerNodeToTex = _powerNodeToTex;
exports._squarerootNodeToTex = _squarerootNodeToTex;
exports._rootNodeToTex = _rootNodeToTex;
exports._equationNodeToTex = _equationNodeToTex;
exports._logicalOrNodeToTex = _logicalOrNodeToTex;
exports.formulaNodeToTex = formulaNodeToTex;
exports._unicodeToTex = exports.texDelimiter = void 0;

var Caml_array = _interopRequireWildcard(require("rescript/lib/es6/caml_array.js"));

var Greek$MathSolver = _interopRequireWildcard(require("../Tables/Greek.bs.js"));

var MultiplicationSymbol$MathSolver = _interopRequireWildcard(require("../Tables/MultiplicationSymbol.bs.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
var texDelimiter = "$$";
exports.texDelimiter = texDelimiter;

function _textToTex(text) {
  return " \\text{ " + text + " } ";
}

function _signAttrToTex(sign, signMode) {
  switch (sign) {
    case
    /* Plus */
    0:
      if (signMode ===
      /* AllSign */
      2) {
        return "+";
      } else {
        return "";
      }

    case
    /* Minus */
    1:
      if (signMode !==
      /* NoSign */
      0) {
        return "-";
      } else {
        return "";
      }

    case
    /* PlusMinus */
    2:
      if (signMode !==
      /* NoSign */
      0) {
        return " \\pm ";
      } else {
        return "";
      }

    case
    /* MinusPlus */
    3:
      if (signMode !==
      /* NoSign */
      0) {
        return " \\mp ";
      } else {
        return "";
      }

  }
}

var _unicodeToTex = Greek$MathSolver.lookupTex;
exports._unicodeToTex = _unicodeToTex;

function _applyFontStyle(str, fontStyle) {
  var isDigit = new RegExp("^[0-9]").test(str);

  switch (fontStyle) {
    case
    /* Upright */
    0:
      return " \\mathrm{ " + str + " } ";

    case
    /* Italic */
    1:
      return " \\mathit{ " + str + " } ";

    case
    /* Default */
    2:
      if (isDigit) {
        return " \\mathrm{ " + str + " } ";
      } else {
        return " \\mathit{ " + str + " } ";
      }

  }
}

function _subscriptAttrToTex(subscript, subscriptFontStyle) {
  if (subscript !== undefined) {
    return " _{ " + _applyFontStyle(Greek$MathSolver.lookupTex(subscript), subscriptFontStyle) + " } ";
  } else {
    return "";
  }
}

function _varPrimitiveNodeToTex(varPrimitive, signMode) {
  return _signAttrToTex(varPrimitive.sign, signMode) + Greek$MathSolver.lookupTex(varPrimitive.value) + _subscriptAttrToTex(varPrimitive.subscript, varPrimitive.subscriptFontStyle);
}

function _intPrimitiveNodeToTex(intPrimitive, signMode) {
  return _signAttrToTex(intPrimitive.sign, signMode) + String(intPrimitive.value);
}

function _fractionPrimitiveNodeToTex(fractionPrimitive, signMode) {
  var fractionInteger = fractionPrimitive.integer !== 0 ? String(fractionPrimitive.integer) : "";
  var fractionNumerator = String(fractionPrimitive.numerator);
  var fractionDenominator = String(fractionPrimitive.denominator);
  return _signAttrToTex(fractionPrimitive.sign, signMode) + (" " + fractionInteger + " \\frac{ " + fractionNumerator + " } { " + fractionDenominator + " } ");
}

function _floatPrimitiveNodeToTex(floatPrimitive, signMode) {
  return _signAttrToTex(floatPrimitive.sign, signMode) + String(floatPrimitive.value);
}

function _expressionNodeToTex(expression) {
  switch (expression.TAG | 0) {
    case
    /* TextExpression */
    0:
      return _textToTex(expression._0);

    case
    /* VarPrimitiveExpression */
    1:
      return _varPrimitiveNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* IntPrimitiveExpression */
    2:
      return _intPrimitiveNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* FractionPrimitiveExpression */
    3:
      return _fractionPrimitiveNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* FloatPrimitiveExpression */
    4:
      return _floatPrimitiveNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* SumExpression */
    5:
      return _sumNodeToTex(expression._0);

    case
    /* ProductExpression */
    6:
      return _productNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* FractionExpression */
    7:
      return _fractionNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* PowerExpression */
    8:
      return _powerNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* RootExpression */
    9:
      return _rootNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* SquarerootExpression */
    10:
      return _squarerootNodeToTex(expression._0,
      /* NoPlus */
      1);
  }
}

function _termNodeToTex(expression, signMode) {
  switch (expression.TAG | 0) {
    case
    /* TextExpression */
    0:
      return _textToTex(expression._0);

    case
    /* VarPrimitiveExpression */
    1:
      var primitive = expression._0;
      return _signAttrToTex(primitive.sign, signMode) + " " + _varPrimitiveNodeToTex(primitive,
      /* NoSign */
      0);

    case
    /* IntPrimitiveExpression */
    2:
      var primitive$1 = expression._0;
      return _signAttrToTex(primitive$1.sign, signMode) + " " + _intPrimitiveNodeToTex(primitive$1,
      /* NoSign */
      0);

    case
    /* FractionPrimitiveExpression */
    3:
      var primitive$2 = expression._0;
      return _signAttrToTex(primitive$2.sign, signMode) + " " + _fractionPrimitiveNodeToTex(primitive$2,
      /* NoSign */
      0);

    case
    /* FloatPrimitiveExpression */
    4:
      var primitive$3 = expression._0;
      return _signAttrToTex(primitive$3.sign, signMode) + " " + _floatPrimitiveNodeToTex(primitive$3,
      /* NoSign */
      0);

    case
    /* SumExpression */
    5:
      return _sumNodeToTex(expression._0);

    case
    /* ProductExpression */
    6:
      var product = expression._0;
      return _signAttrToTex(product.sign, signMode) + " " + _productNodeToTex(product,
      /* NoSign */
      0);

    case
    /* FractionExpression */
    7:
      var fraction = expression._0;
      return _signAttrToTex(fraction.sign, signMode) + " " + _fractionNodeToTex(fraction,
      /* NoSign */
      0);

    case
    /* PowerExpression */
    8:
      var power = expression._0;
      return _signAttrToTex(power.sign, signMode) + " " + _powerNodeToTex(power,
      /* NoSign */
      0);

    case
    /* RootExpression */
    9:
      var root = expression._0;
      return _signAttrToTex(root.sign, signMode) + " " + _rootNodeToTex(root,
      /* NoSign */
      0);

    case
    /* SquarerootExpression */
    10:
      var squareroot = expression._0;
      return _signAttrToTex(squareroot.sign, signMode) + " " + _squarerootNodeToTex(squareroot,
      /* NoSign */
      0);
  }
}

function _sumNodeToTex(sum) {
  if (sum.terms.length === 0) {
    return "";
  }

  var texFirstTerm = _termNodeToTex(Caml_array.get(sum.terms, 0),
  /* NoPlus */
  1);

  var texOtherTerms = sum.terms.slice(1).map(function (term) {
    return _termNodeToTex(term,
    /* AllSign */
    2);
  }).join("");
  return texFirstTerm + texOtherTerms;
}

function _factorNodeToTex(factor) {
  if (factor.TAG ===
  /* SumExpression */
  5) {
    return " ( " + _sumNodeToTex(factor._0) + " ) ";
  } else {
    return _expressionNodeToTex(factor);
  }
}

function _productNodeToTex(product, signMode) {
  return _signAttrToTex(product.sign, signMode) + product.factors.map(function (factorNode, index) {
    if (index === 0) {
      return _factorNodeToTex(factorNode);
    } else {
      return MultiplicationSymbol$MathSolver.lookupTex(Caml_array.get(product.factors, index - 1 | 0), factorNode) + _factorNodeToTex(factorNode);
    }
  }).join("");
}

function _fractionNodeToTex(fraction, signMode) {
  var texNumerator = _expressionNodeToTex(fraction.numerator);

  var texDenominator = _expressionNodeToTex(fraction.denominator);

  return _signAttrToTex(fraction.sign, signMode) + (" \\frac{ " + texNumerator + " } { " + texDenominator + " } ");
}

function _powerNodeToTex(power, signMode) {
  var texSign = _signAttrToTex(power.sign, signMode);

  var texBase = _expressionNodeToTex(power.base);

  var texExponent = _expressionNodeToTex(power.exponent);

  var match = power.base;
  var texParenBase;

  switch (match.TAG | 0) {
    case
    /* IntPrimitiveExpression */
    2:
    case
    /* FractionPrimitiveExpression */
    3:
    case
    /* FloatPrimitiveExpression */
    4:
      texParenBase = match._0.sign !== 1 ? texBase : " ( " + texBase + " ) ";
      break;

    case
    /* SumExpression */
    5:
    case
    /* ProductExpression */
    6:
      texParenBase = " ( " + texBase + " ) ";
      break;

    default:
      texParenBase = texBase;
  }

  return " " + texSign + texParenBase + "^{ " + texExponent + " } ";
}

function _squarerootNodeToTex(squareroot, signMode) {
  var texSign = _signAttrToTex(squareroot.sign, signMode);

  var texRadicand = _expressionNodeToTex(squareroot.radicand);

  return " " + texSign + " \\sqrt{ " + texRadicand + " } ";
}

function _rootNodeToTex(root, signMode) {
  var texSign = _signAttrToTex(root.sign, signMode);

  var texIndex = _expressionNodeToTex(root.index);

  var texRadicand = _expressionNodeToTex(root.radicand);

  return " " + texSign + " \\sqrt[ " + texIndex + " ]{ " + texRadicand + " }";
}

function _equationNodeToTex(equation) {
  return equation.members.map(_expressionNodeToTex).join(" = ");
}

function _logicalOrNodeToTex(logicalOr) {
  return logicalOr.atoms.map(_equationNodeToTex).join(" \\lor ");
}

function formulaNodeToTex(formula) {
  var texFormula;

  switch (formula.TAG | 0) {
    case
    /* LogicalOr */
    0:
      texFormula = _logicalOrNodeToTex(formula._0);
      break;

    case
    /* Equation */
    1:
      texFormula = _equationNodeToTex(formula._0);
      break;

    case
    /* Text */
    2:
      texFormula = _textToTex(formula._0);
      break;
  }

  return texDelimiter + texFormula + texDelimiter;
}
/* Greek-MathSolver Not a pure module */

},{"../Tables/Greek.bs.js":12,"../Tables/MultiplicationSymbol.bs.js":13,"rescript/lib/es6/caml_array.js":1}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomPos = randomPos;
exports.randomPosNeg = randomPosNeg;
exports.randomNoZero = randomNoZero;
exports.randomNumber = randomNumber;
exports.randomNumberPrimitiveExpression = randomNumberPrimitiveExpression;
exports.limit = void 0;

var Js_math = _interopRequireWildcard(require("rescript/lib/es6/js_math.js"));

var Formula$MathSolver = _interopRequireWildcard(require("./Formula.bs.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
function randomPos(n) {
  return Js_math.random_int(0, n);
}

function randomPosNeg(n) {
  return Js_math.random_int(-n | 0, n);
}

function randomNoZero(n) {
  var result = Js_math.random_int(-n | 0, n);

  if (result !== 0) {
    return result;
  } else {
    return n;
  }
}

function randomNumber(param) {
  return randomNoZero(12);
}

function randomNumberPrimitiveExpression(param) {
  return Formula$MathSolver.createIntPrimitiveExpression(randomNoZero(12));
}

var limit = 12;
/* No side effect */

exports.limit = limit;

},{"./Formula.bs.js":8,"rescript/lib/es6/js_math.js":5}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lookupTex = lookupTex;
exports.table = void 0;

var Js_dict = _interopRequireWildcard(require("rescript/lib/es6/js_dict.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
var table = Js_dict.fromArray([["\xce\x91", "\\Alpha"], ["\xce\xb1", "\\alpha"], ["\xce\x92", "\\Beta"], ["\xce\xb2", "\\beta"], ["\xce\x93", "\\Gamma"], ["\xce\xb3", "\\gamma"], ["\xce\x94", "\\Delta"], ["\xce\xb4", "\\delta"], ["\xce\x95", "\\Epsilon"], ["\xcf\xb5", "\\epsilon"], ["\xce\xb5", "\\varepsilon"], ["\xce\x96", "\\Zeta"], ["\xce\xb6", "\\zeta"], ["\xce\x97", "\\Eta"], ["\xce\xb7", "\\eta"], ["\xce\x98", "\\Theta"], ["\xce\xb8", "\\theta"], ["\xcf\x91", "\\vartheta"], ["\xce\x99", "\\Iota"], ["\xce\xb9", "\\iota"], ["\xce\x9a", "\\Kappa"], ["\xce\xba", "\\kappa"], ["\xcf\xb0", "\\varkappa"], ["\xce\x9b", "\\Lambda"], ["\xce\xbb", "\\lambda"], ["\xce\x9c", "\\Mu"], ["\xce\xbc", "\\mu"], ["\xce\x9d", "\\Nu"], ["\xce\xbd", "\\nu"], ["\xce\x9e", "\\Xi"], ["\xce\xbe", "\\xi"], ["\xce\x9f", "\\Omicron"], ["\xce\xbf", "\\omicron"], ["\xce\xa0", "\\Pi"], ["\xcf\x80", "\\pi"], ["\xcf\x96", "\\varpi"], ["\xce\xa1", "\\Rho"], ["\xcf\x81", "\\rho"], ["\xcf\xb1", "\\varrho"], ["\xce\xa3", "\\Sigma"], ["\xcf\x83", "\\sigma"], ["\xcf\x82", "\\varsigma"], ["\xce\xa4", "\\Tau"], ["\xcf\x84", "\\tau"], ["\xce\xa5", "\\Upsilon"], ["\xcf\x85", "\\upsilon"], ["\xce\xa6", "\\Phi"], ["\xcf\x95", "\\phi"], ["\xcf\x86", "\\varphi"], ["\xce\xa7", "\\Chi"], ["\xcf\x87", "\\chi"], ["\xce\xa8", "\\Psi"], ["\xcf\x88", "\\psi"], ["\xce\xa9", "\\Omega"], ["\xcf\x89", "\\omega"]]);
exports.table = table;

function lookupTex(str) {
  var texString = Js_dict.get(table, str);

  if (texString !== undefined) {
    return " " + texString + " ";
  } else {
    return str;
  }
}
/* table Not a pure module */

},{"rescript/lib/es6/js_dict.js":3}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._multiplicationSymbolLookupIndex = _multiplicationSymbolLookupIndex;
exports._andThenGet = _andThenGet;
exports.lookupTex = lookupTex;
exports._table = exports._tableRowOther = exports._tableRowPower = exports._tableRowSum = exports._tableRowText = void 0;

var Js_dict = _interopRequireWildcard(require("rescript/lib/es6/js_dict.js"));

var Caml_option = _interopRequireWildcard(require("rescript/lib/es6/caml_option.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
var _tableRowText = Js_dict.fromArray([["TextExpression",
/* NoSymbol */
2], ["VarPrimitiveExpression",
/* NoSymbol */
2], ["IntPrimitiveExpression",
/* NoSymbol */
2], ["FractionPrimitiveExpression",
/* NoSymbol */
2], ["FloatPrimitiveExpression",
/* NoSymbol */
2], ["SumExpression",
/* NoSymbol */
2], ["ProductExpression",
/* NoSymbol */
2], ["FractionExpression",
/* NoSymbol */
2], ["PowerExpression",
/* NoSymbol */
2], ["SquareRootExpression",
/* NoSymbol */
2], ["RootExpression",
/* NoSymbol */
2]]);

exports._tableRowText = _tableRowText;

var _tableRowSum = Js_dict.fromArray([["TextExpression",
/* NoSymbol */
2], ["VarPrimitiveExpression",
/* NoSymbol */
2], ["IntPrimitiveExpression",
/* Dot */
1], ["FractionPrimitiveExpression",
/* Dot */
1], ["FloatPrimitiveExpression",
/* Dot */
1], ["SumExpression",
/* NoSymbol */
2], ["ProductExpression",
/* NoSymbol */
2], ["FractionExpression",
/* NoSymbol */
2], ["PowerExpression",
/* NoSymbol */
2], ["SquareRootExpression",
/* NoSymbol */
2], ["RootExpression",
/* NoSymbol */
2]]);

exports._tableRowSum = _tableRowSum;

var _tableRowPower = Js_dict.fromArray([["TextExpression",
/* NoSymbol */
2], ["VarPrimitiveExpression",
/* NoSymbol */
2], ["IntPrimitiveExpression",
/* Dot */
1], ["FractionPrimitiveExpression",
/* Dot */
1], ["FloatPrimitiveExpression",
/* Dot */
1], ["SumExpression",
/* NoSymbol */
2], ["ProductExpression",
/* Dot */
1], ["FractionExpression",
/* Dot */
1], ["PowerExpression",
/* NoSymbol */
2], ["SquareRootExpression",
/* NoSymbol */
2], ["RootExpression",
/* NoSymbol */
2]]);

exports._tableRowPower = _tableRowPower;

var _tableRowOther = Js_dict.fromArray([["TextExpression",
/* NoSymbol */
2], ["VarPrimitiveExpression",
/* NoSymbol */
2], ["IntPrimitiveExpression",
/* Dot */
1], ["FractionPrimitiveExpression",
/* Dot */
1], ["FloatPrimitiveExpression",
/* Dot */
1], ["SumExpression",
/* NoSymbol */
2], ["ProductExpression",
/* Dot */
1], ["FractionExpression",
/* Dot */
1], ["PowerExpression",
/* Dot */
1], ["SquareRootExpression",
/* NoSymbol */
2], ["RootExpression",
/* NoSymbol */
2]]);

exports._tableRowOther = _tableRowOther;

var _table = Js_dict.fromArray([["TextExpression", _tableRowText], ["VarPrimitiveExpression", _tableRowOther], ["IntPrimitiveExpression", _tableRowOther], ["FractionPrimitiveExpression", _tableRowOther], ["FloatPrimitiveExpression", _tableRowOther], ["SumExpression", _tableRowSum], ["ProductExpression", _tableRowOther], ["FractionExpression", _tableRowOther], ["PowerExpression", _tableRowPower], ["SquareRootExpression", _tableRowPower], ["RootExpression", _tableRowPower]]);

exports._table = _table;

function _multiplicationSymbolLookupIndex(factor) {
  switch (factor.TAG | 0) {
    case
    /* TextExpression */
    0:
      return "TextExpression";

    case
    /* VarPrimitiveExpression */
    1:
      return "VarPrimitiveExpression";

    case
    /* IntPrimitiveExpression */
    2:
      return "IntPrimitiveExpression";

    case
    /* FractionPrimitiveExpression */
    3:
      return "FractionPrimitiveExpression";

    case
    /* FloatPrimitiveExpression */
    4:
      return "FloatPrimitiveExpression";

    case
    /* SumExpression */
    5:
      return "SumExpression";

    case
    /* ProductExpression */
    6:
      return "ProductExpression";

    case
    /* FractionExpression */
    7:
      return "FractionExpression";

    case
    /* PowerExpression */
    8:
      return "PowerExpression";

    case
    /* RootExpression */
    9:
      return "RootExpression";

    case
    /* SquarerootExpression */
    10:
      return "SquarerootExpression";
  }
}

function _andThenGet(maybeDict, index) {
  if (maybeDict !== undefined) {
    return Js_dict.get(Caml_option.valFromOption(maybeDict), index);
  }
}

function lookupTex(factorLeft, factorRight) {
  var leftIndex = _multiplicationSymbolLookupIndex(factorLeft);

  var rightIndex = _multiplicationSymbolLookupIndex(factorRight);

  var maybeSymbol = _andThenGet(_andThenGet(Caml_option.some(_table), leftIndex), rightIndex);

  if (maybeSymbol === undefined) {
    return "";
  }

  switch (maybeSymbol) {
    case
    /* Cross */
    0:
      return " \\times ";

    case
    /* Dot */
    1:
      return " \\cdot ";

    case
    /* NoSymbol */
    2:
      return "";
  }
}
/* _tableRowText Not a pure module */

},{"rescript/lib/es6/caml_option.js":2,"rescript/lib/es6/js_dict.js":3}],14:[function(require,module,exports){
// Generated by ReScript, PLEASE EDIT WITH CARE
/* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */

},{}],15:[function(require,module,exports){
"use strict";

var FormulaRenderer = _interopRequireWildcard(require("./Formula/FormulaRenderer.bs"));

var FormulaCleaner = _interopRequireWildcard(require("./Formula/FormulaCleaner.bs"));

var Examples = _interopRequireWildcard(require("./Equation/Examples.bs"));

var QuadraticEquation = _interopRequireWildcard(require("./Equation/QuadraticEquation.bs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * LaTeX:    https://www.latex-project.org/help/documentation/
 * MathJax:  http://docs.mathjax.org/en/latest/
 * ReScript: https://rescript-lang.org/docs/manual/latest/overview
 */
class MathSolver {
  constructor(displayNodeId) {
    this.formulaNodeToTex = FormulaRenderer.formulaNodeToTex;
    this.cleanupFormula = FormulaCleaner.cleanup;
    this.examples = Examples.examples;
    this.displayNode = document.getElementById(displayNodeId);
    this.currentExampleIndex = 0;
  }

  debug(formula) {
    console.log('Formula:', this.formulaNodeToTex(formula));
    const cleanFormula = this.cleanupFormula(formula);
    console.log('Cleaned formula:', this.formulaNodeToTex(cleanFormula));
  }

  render(formula) {
    this.displayNode.innerHTML = this.formulaNodeToTex(formula);
    MathJax.typeset();
  }

  generate() {
    const formula = QuadraticEquation.generate();
    this.render(formula);
  }

  example(delta) {
    let index = this.currentExampleIndex + delta;

    if (index < 0) {
      index += this.examples.length;
    } else {
      index %= this.examples.length;
    }

    this.currentExampleIndex = index;
    let formula = this.examples[index];
    this.render(formula);
  }

}

window.MathSolver = MathSolver;

},{"./Equation/Examples.bs":6,"./Equation/QuadraticEquation.bs":7,"./Formula/FormulaCleaner.bs":9,"./Formula/FormulaRenderer.bs":10}]},{},[8,11,14,15]);
