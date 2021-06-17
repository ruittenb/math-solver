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
exports.examples = void 0;

var Types$MathSolver = _interopRequireWildcard(require("./Types.bs.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
var examples = [{
  TAG:
  /* Equation */
  1,
  _0: {
    members: [Types$MathSolver.varPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: "x",
      subscript: undefined
    }), {
      TAG:
      /* SumExpression */
      2,
      _0: {
        terms: [Types$MathSolver.constFractionExpression({
          sign:
          /* Plus */
          0,
          integer: {
            sign:
            /* Plus */
            0,
            primitive: 0
          },
          numerator: {
            sign:
            /* Plus */
            0,
            primitive: 1
          },
          denominator: {
            sign:
            /* Plus */
            0,
            primitive: 2
          }
        }), Types$MathSolver.constFractionExpression({
          sign:
          /* Plus */
          0,
          integer: {
            sign:
            /* Plus */
            0,
            primitive: 0
          },
          numerator: {
            sign:
            /* Plus */
            0,
            primitive: 1
          },
          denominator: {
            sign:
            /* Plus */
            0,
            primitive: 3
          }
        })]
      }
    }]
  }
}, {
  TAG:
  /* Equation */
  1,
  _0: {
    members: [Types$MathSolver.varPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: "x",
      subscript: undefined
    }), {
      TAG:
      /* SumExpression */
      2,
      _0: {
        terms: [Types$MathSolver.constFractionExpression({
          sign:
          /* Plus */
          0,
          integer: {
            sign:
            /* Plus */
            0,
            primitive: 3
          },
          numerator: {
            sign:
            /* Plus */
            0,
            primitive: 2
          },
          denominator: {
            sign:
            /* Plus */
            0,
            primitive: 9
          }
        }), Types$MathSolver.constFractionExpression({
          sign:
          /* Minus */
          1,
          integer: {
            sign:
            /* Plus */
            0,
            primitive: 1
          },
          numerator: {
            sign:
            /* Plus */
            0,
            primitive: 1
          },
          denominator: {
            sign:
            /* Plus */
            0,
            primitive: 12
          }
        }), Types$MathSolver.constFractionExpression({
          sign:
          /* Plus */
          0,
          integer: {
            sign:
            /* Plus */
            0,
            primitive: 0
          },
          numerator: {
            sign:
            /* Plus */
            0,
            primitive: 1
          },
          denominator: {
            sign:
            /* Plus */
            0,
            primitive: 6
          }
        })]
      }
    }]
  }
}, {
  TAG:
  /* Equation */
  1,
  _0: {
    members: [{
      TAG:
      /* ProductExpression */
      3,
      _0: {
        sign:
        /* Plus */
        0,
        factors: [Types$MathSolver.varPrimitiveExpression({
          sign:
          /* Plus */
          0,
          primitive: "x",
          subscript: undefined
        }), {
          TAG:
          /* SumExpression */
          2,
          _0: {
            terms: [Types$MathSolver.varPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: "x",
              subscript: undefined
            }), Types$MathSolver.floatPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: 1
            })]
          }
        }]
      }
    }, Types$MathSolver.floatPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: 0
    })]
  }
}, {
  TAG:
  /* Equation */
  1,
  _0: {
    members: [{
      TAG:
      /* SumExpression */
      2,
      _0: {
        terms: [{
          TAG:
          /* ProductExpression */
          3,
          _0: {
            sign:
            /* Plus */
            0,
            factors: [Types$MathSolver.floatPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: 2
            }), {
              TAG:
              /* PowerExpression */
              5,
              _0: {
                sign:
                /* Plus */
                0,
                base: Types$MathSolver.varPrimitiveExpression({
                  sign:
                  /* Plus */
                  0,
                  primitive: "x",
                  subscript: undefined
                }),
                exponent: Types$MathSolver.intPrimitiveExpression({
                  sign:
                  /* Plus */
                  0,
                  primitive: 2
                })
              }
            }]
          }
        }, {
          TAG:
          /* ProductExpression */
          3,
          _0: {
            sign:
            /* Plus */
            0,
            factors: [Types$MathSolver.intPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: 3
            }), Types$MathSolver.varPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: "x",
              subscript: undefined
            })]
          }
        }, Types$MathSolver.intPrimitiveExpression({
          sign:
          /* Minus */
          1,
          primitive: 1
        })]
      }
    }, Types$MathSolver.intPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: 0
    })]
  }
}, {
  TAG:
  /* LogicalOr */
  0,
  _0: {
    atoms: [{
      members: [Types$MathSolver.varPrimitiveExpression({
        sign:
        /* Plus */
        0,
        primitive: "x",
        subscript: undefined
      }), Types$MathSolver.floatPrimitiveExpression({
        sign:
        /* Plus */
        0,
        primitive: 1
      })]
    }, {
      members: [Types$MathSolver.varPrimitiveExpression({
        sign:
        /* Plus */
        0,
        primitive: "x",
        subscript: undefined
      }), Types$MathSolver.floatPrimitiveExpression({
        sign:
        /* Minus */
        1,
        primitive: 4
      })]
    }]
  }
}, {
  TAG:
  /* Equation */
  1,
  _0: {
    members: [Types$MathSolver.varPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: "x",
      subscript: undefined
    }), Types$MathSolver.varPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: "y",
      subscript: undefined
    }), {
      TAG:
      /* ProductExpression */
      3,
      _0: {
        sign:
        /* PlusMinus */
        2,
        factors: [Types$MathSolver.floatPrimitiveExpression({
          sign:
          /* Plus */
          0,
          primitive: 3
        }), {
          TAG:
          /* SquarerootExpression */
          7,
          _0: {
            sign:
            /* Plus */
            0,
            radicand: Types$MathSolver.floatPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: 2
            })
          }
        }]
      }
    }]
  }
}, {
  TAG:
  /* Equation */
  1,
  _0: {
    members: [Types$MathSolver.varPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: "\xcf\x86",
      subscript: undefined
    }), {
      TAG:
      /* SumExpression */
      2,
      _0: {
        terms: [Types$MathSolver.constFractionExpression({
          sign:
          /* Plus */
          0,
          integer: {
            sign:
            /* Plus */
            0,
            primitive: 0
          },
          numerator: {
            sign:
            /* Plus */
            0,
            primitive: 1
          },
          denominator: {
            sign:
            /* Plus */
            0,
            primitive: 2
          }
        }), {
          TAG:
          /* ProductExpression */
          3,
          _0: {
            sign:
            /* Plus */
            0,
            factors: [Types$MathSolver.constFractionExpression({
              sign:
              /* Plus */
              0,
              integer: {
                sign:
                /* Plus */
                0,
                primitive: 0
              },
              numerator: {
                sign:
                /* Plus */
                0,
                primitive: 1
              },
              denominator: {
                sign:
                /* Plus */
                0,
                primitive: 2
              }
            }), {
              TAG:
              /* SquarerootExpression */
              7,
              _0: {
                sign:
                /* Plus */
                0,
                radicand: Types$MathSolver.floatPrimitiveExpression({
                  sign:
                  /* Plus */
                  0,
                  primitive: 5
                })
              }
            }]
          }
        }]
      }
    }]
  }
}, {
  TAG:
  /* Equation */
  1,
  _0: {
    members: [Types$MathSolver.varPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: "V",
      subscript: undefined
    }), {
      TAG:
      /* ProductExpression */
      3,
      _0: {
        sign:
        /* Plus */
        0,
        factors: [Types$MathSolver.constFractionExpression({
          sign:
          /* Plus */
          0,
          integer: {
            sign:
            /* Plus */
            0,
            primitive: 0
          },
          numerator: {
            sign:
            /* Plus */
            0,
            primitive: 4
          },
          denominator: {
            sign:
            /* Plus */
            0,
            primitive: 3
          }
        }), Types$MathSolver.varPrimitiveExpression({
          sign:
          /* Plus */
          0,
          primitive: "\xcf\x80",
          subscript: undefined
        }), {
          TAG:
          /* PowerExpression */
          5,
          _0: {
            sign:
            /* Plus */
            0,
            base: Types$MathSolver.varPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: "r",
              subscript: undefined
            }),
            exponent: Types$MathSolver.floatPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: 3
            })
          }
        }]
      }
    }]
  }
}, {
  TAG:
  /* Equation */
  1,
  _0: {
    members: [Types$MathSolver.varPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: "x",
      subscript: undefined
    }), {
      TAG:
      /* RootExpression */
      6,
      _0: {
        sign:
        /* Plus */
        0,
        index: Types$MathSolver.floatPrimitiveExpression({
          sign:
          /* Plus */
          0,
          primitive: 3
        }),
        radicand: Types$MathSolver.floatPrimitiveExpression({
          sign:
          /* Plus */
          0,
          primitive: 27
        })
      }
    }]
  }
}, {
  TAG:
  /* Equation */
  1,
  _0: {
    members: [Types$MathSolver.varPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: "y",
      subscript: undefined
    }), {
      TAG:
      /* PowerExpression */
      5,
      _0: {
        sign:
        /* Plus */
        0,
        base: {
          TAG:
          /* ProductExpression */
          3,
          _0: {
            sign:
            /* Plus */
            0,
            factors: [Types$MathSolver.floatPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: 3
            }), Types$MathSolver.varPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: "x",
              subscript: undefined
            })]
          }
        },
        exponent: Types$MathSolver.floatPrimitiveExpression({
          sign:
          /* Plus */
          0,
          primitive: 5
        })
      }
    }]
  }
}, {
  TAG:
  /* Equation */
  1,
  _0: {
    members: [Types$MathSolver.varPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: "x",
      subscript: undefined
    }), {
      TAG:
      /* RootExpression */
      6,
      _0: {
        sign:
        /* Plus */
        0,
        index: {
          TAG:
          /* SumExpression */
          2,
          _0: {
            terms: [Types$MathSolver.varPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: "x",
              subscript: undefined
            }), Types$MathSolver.floatPrimitiveExpression({
              sign:
              /* Plus */
              0,
              primitive: 5
            })]
          }
        },
        radicand: Types$MathSolver.intPrimitiveExpression({
          sign:
          /* Plus */
          0,
          primitive: 3125
        })
      }
    }]
  }
}, {
  TAG:
  /* Equation */
  1,
  _0: {
    members: [Types$MathSolver.varPrimitiveExpression({
      sign:
      /* Plus */
      0,
      primitive: "x",
      subscript: "1,2"
    }), Types$MathSolver.varFractionExpression({
      sign:
      /* Plus */
      0,
      numerator: {
        TAG:
        /* SumExpression */
        2,
        _0: {
          terms: [Types$MathSolver.varPrimitiveExpression({
            sign:
            /* Minus */
            1,
            primitive: "b",
            subscript: undefined
          }), {
            TAG:
            /* SquarerootExpression */
            7,
            _0: {
              sign:
              /* PlusMinus */
              2,
              radicand: {
                TAG:
                /* SumExpression */
                2,
                _0: {
                  terms: [{
                    TAG:
                    /* PowerExpression */
                    5,
                    _0: {
                      sign:
                      /* Plus */
                      0,
                      base: Types$MathSolver.varPrimitiveExpression({
                        sign:
                        /* Plus */
                        0,
                        primitive: "b",
                        subscript: undefined
                      }),
                      exponent: Types$MathSolver.floatPrimitiveExpression({
                        sign:
                        /* Plus */
                        0,
                        primitive: 2
                      })
                    }
                  }, {
                    TAG:
                    /* ProductExpression */
                    3,
                    _0: {
                      sign:
                      /* Minus */
                      1,
                      factors: [Types$MathSolver.floatPrimitiveExpression({
                        sign:
                        /* Plus */
                        0,
                        primitive: 4
                      }), Types$MathSolver.varPrimitiveExpression({
                        sign:
                        /* Plus */
                        0,
                        primitive: "a",
                        subscript: undefined
                      }), Types$MathSolver.varPrimitiveExpression({
                        sign:
                        /* Plus */
                        0,
                        primitive: "c",
                        subscript: undefined
                      })]
                    }
                  }]
                }
              }
            }
          }]
        }
      },
      denominator: {
        TAG:
        /* ProductExpression */
        3,
        _0: {
          sign:
          /* Plus */
          0,
          factors: [Types$MathSolver.floatPrimitiveExpression({
            sign:
            /* Plus */
            0,
            primitive: 2
          }), Types$MathSolver.varPrimitiveExpression({
            sign:
            /* Plus */
            0,
            primitive: "a",
            subscript: undefined
          })]
        }
      }
    })]
  }
}];
/* examples Not a pure module */

exports.examples = examples;

},{"./Types.bs.js":10}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._textToTex = _textToTex;
exports._signAttrToTex = _signAttrToTex;
exports._subscriptAttrToTex = _subscriptAttrToTex;
exports._variablePrimitiveToTex = _variablePrimitiveToTex;
exports._primitiveNodeToTex = _primitiveNodeToTex;
exports._expressionNodeToTex = _expressionNodeToTex;
exports._termNodeToTex = _termNodeToTex;
exports._sumNodeToTex = _sumNodeToTex;
exports._factorNodeToTex = _factorNodeToTex;
exports._productNodeToTex = _productNodeToTex;
exports._fractionToTex = _fractionToTex;
exports._fractionNodeToTex = _fractionNodeToTex;
exports._powerNodeToTex = _powerNodeToTex;
exports._squarerootNodeToTex = _squarerootNodeToTex;
exports._rootNodeToTex = _rootNodeToTex;
exports._equationNodeToTex = _equationNodeToTex;
exports._logicalOrNodeToTex = _logicalOrNodeToTex;
exports.formulaNodeToTex = formulaNodeToTex;
exports.delimiter = exports.lookupTex = exports._andThenGet = exports._multiplicationSymbolLookupIndex = exports._table = exports._tableRowOther = exports._tableRowPower = exports._tableRowSum = exports._tableRowText = void 0;

var Js_dict = _interopRequireWildcard(require("rescript/lib/es6/js_dict.js"));

var Caml_array = _interopRequireWildcard(require("rescript/lib/es6/caml_array.js"));

var Greek$MathSolver = _interopRequireWildcard(require("./Greek.bs.js"));

var Types$MathSolver = _interopRequireWildcard(require("./Types.bs.js"));

var MultiplicationSymbol$MathSolver = _interopRequireWildcard(require("./MultiplicationSymbol.bs.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
var delimiter = "$$";
exports.delimiter = delimiter;

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

  }
}

function _subscriptAttrToTex(subscript) {
  if (subscript !== undefined) {
    return " _{ " + subscript + " } ";
  } else {
    return "";
  }
}

function _variablePrimitiveToTex(variable) {
  var texString = Js_dict.get(Greek$MathSolver.unicodeToTex, variable);

  if (texString !== undefined) {
    return texString;
  } else {
    return variable;
  }
}

function _primitiveNodeToTex(primitive, signMode) {
  switch (primitive.TAG | 0) {
    case
    /* VarPrimitive */
    0:
      var prim = primitive._0;
      return _signAttrToTex(prim.sign, signMode) + _variablePrimitiveToTex(prim.primitive) + _subscriptAttrToTex(prim.subscript);

    case
    /* IntPrimitive */
    1:
    case
    /* FloatPrimitive */
    2:
      break;
  }

  var prim$1 = primitive._0;
  return _signAttrToTex(prim$1.sign, signMode) + String(prim$1.primitive);
}

function _expressionNodeToTex(expression) {
  switch (expression.TAG | 0) {
    case
    /* TextExpression */
    0:
      return _textToTex(expression._0);

    case
    /* PrimitiveExpression */
    1:
      return _primitiveNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* SumExpression */
    2:
      return _sumNodeToTex(expression._0);

    case
    /* ProductExpression */
    3:
      return _productNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* FractionExpression */
    4:
      return _fractionNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* PowerExpression */
    5:
      return _powerNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* RootExpression */
    6:
      return _rootNodeToTex(expression._0,
      /* NoPlus */
      1);

    case
    /* SquarerootExpression */
    7:
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
    /* PrimitiveExpression */
    1:
      return _primitiveNodeToTex(expression._0, signMode);

    case
    /* SumExpression */
    2:
      return _sumNodeToTex(expression._0);

    case
    /* ProductExpression */
    3:
      var product = expression._0;
      return _signAttrToTex(product.sign, signMode) + " " + _productNodeToTex(product,
      /* NoSign */
      0);

    case
    /* FractionExpression */
    4:
      return _fractionNodeToTex(expression._0, signMode);

    case
    /* PowerExpression */
    5:
      var power = expression._0;
      return _signAttrToTex(power.sign, signMode) + " " + _powerNodeToTex(power,
      /* NoSign */
      0);

    case
    /* RootExpression */
    6:
      var root = expression._0;
      return _signAttrToTex(root.sign, signMode) + " " + _rootNodeToTex(root,
      /* NoSign */
      0);

    case
    /* SquarerootExpression */
    7:
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
  2) {
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

function _fractionToTex(numerator, denominator) {
  var texNumerator = _expressionNodeToTex(numerator);

  var texDenominator = _expressionNodeToTex(denominator);

  return " \\frac{ " + texNumerator + " } { " + texDenominator + " } ";
}

function _fractionNodeToTex(fractionNode, signMode) {
  if (fractionNode.TAG ===
  /* VarFraction */
  0) {
    var fraction = fractionNode._0;
    return _signAttrToTex(fraction.sign, signMode) + " " + _fractionToTex(fraction.numerator, fraction.denominator);
  }

  var fraction$1 = fractionNode._0;
  var fractionInteger = fraction$1.integer.primitive !== 0 ? _primitiveNodeToTex({
    TAG:
    /* IntPrimitive */
    1,
    _0: fraction$1.integer
  },
  /* NoSign */
  0) : "";
  return _signAttrToTex(fraction$1.sign, signMode) + " " + fractionInteger + _fractionToTex(Types$MathSolver.intPrimitiveExpression(fraction$1.numerator), Types$MathSolver.intPrimitiveExpression(fraction$1.denominator));
}

function _powerNodeToTex(power, signMode) {
  var texSign = _signAttrToTex(power.sign, signMode);

  var texBase = _expressionNodeToTex(power.base);

  var texExponent = _expressionNodeToTex(power.exponent);

  var match = power.base;
  var texParenBase;

  switch (match.TAG | 0) {
    case
    /* SumExpression */
    2:
    case
    /* ProductExpression */
    3:
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

  return delimiter + texFormula + delimiter;
}

var _tableRowText = MultiplicationSymbol$MathSolver._tableRowText;
exports._tableRowText = _tableRowText;
var _tableRowSum = MultiplicationSymbol$MathSolver._tableRowSum;
exports._tableRowSum = _tableRowSum;
var _tableRowPower = MultiplicationSymbol$MathSolver._tableRowPower;
exports._tableRowPower = _tableRowPower;
var _tableRowOther = MultiplicationSymbol$MathSolver._tableRowOther;
exports._tableRowOther = _tableRowOther;
var _table = MultiplicationSymbol$MathSolver._table;
exports._table = _table;
var _multiplicationSymbolLookupIndex = MultiplicationSymbol$MathSolver._multiplicationSymbolLookupIndex;
exports._multiplicationSymbolLookupIndex = _multiplicationSymbolLookupIndex;
var _andThenGet = MultiplicationSymbol$MathSolver._andThenGet;
exports._andThenGet = _andThenGet;
var lookupTex = MultiplicationSymbol$MathSolver.lookupTex;
/* Greek-MathSolver Not a pure module */

exports.lookupTex = lookupTex;

},{"./Greek.bs.js":8,"./MultiplicationSymbol.bs.js":9,"./Types.bs.js":10,"rescript/lib/es6/caml_array.js":1,"rescript/lib/es6/js_dict.js":3}],6:[function(require,module,exports){
// Generated by ReScript, PLEASE EDIT WITH CARE
/* This output is empty. Its source's type definitions, externals and/or unused code got optimized away. */

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unicodeToTex = void 0;

var Js_dict = _interopRequireWildcard(require("rescript/lib/es6/js_dict.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Generated by ReScript, PLEASE EDIT WITH CARE
var unicodeToTex = Js_dict.fromArray([["\xce\x91", "\\Alpha"], ["\xce\xb1", "\\alpha"], ["\xce\x92", "\\Beta"], ["\xce\xb2", "\\beta"], ["\xce\x93", "\\Gamma"], ["\xce\xb3", "\\gamma"], ["\xce\x94", "\\Delta"], ["\xce\xb4", "\\delta"], ["\xce\x95", "\\Epsilon"], ["\xcf\xb5", "\\epsilon"], ["\xce\xb5", "\\varepsilon"], ["\xce\x96", "\\Zeta"], ["\xce\xb6", "\\zeta"], ["\xce\x97", "\\Eta"], ["\xce\xb7", "\\eta"], ["\xce\x98", "\\Theta"], ["\xce\xb8", "\\theta"], ["\xcf\x91", "\\vartheta"], ["\xce\x99", "\\Iota"], ["\xce\xb9", "\\iota"], ["\xce\x9a", "\\Kappa"], ["\xce\xba", "\\kappa"], ["\xcf\xb0", "\\varkappa"], ["\xce\x9b", "\\Lambda"], ["\xce\xbb", "\\lambda"], ["\xce\x9c", "\\Mu"], ["\xce\xbc", "\\mu"], ["\xce\x9d", "\\Nu"], ["\xce\xbd", "\\nu"], ["\xce\x9e", "\\Xi"], ["\xce\xbe", "\\xi"], ["\xce\x9f", "\\Omicron"], ["\xce\xbf", "\\omicron"], ["\xce\xa0", "\\Pi"], ["\xcf\x80", "\\pi"], ["\xcf\x96", "\\varpi"], ["\xce\xa1", "\\Rho"], ["\xcf\x81", "\\rho"], ["\xcf\xb1", "\\varrho"], ["\xce\xa3", "\\Sigma"], ["\xcf\x83", "\\sigma"], ["\xcf\x82", "\\varsigma"], ["\xce\xa4", "\\Tau"], ["\xcf\x84", "\\tau"], ["\xce\xa5", "\\Upsilon"], ["\xcf\x85", "\\upsilon"], ["\xce\xa6", "\\Phi"], ["\xcf\x95", "\\phi"], ["\xcf\x86", "\\varphi"], ["\xce\xa7", "\\Chi"], ["\xcf\x87", "\\chi"], ["\xce\xa8", "\\Psi"], ["\xcf\x88", "\\psi"], ["\xce\xa9", "\\Omega"], ["\xcf\x89", "\\omega"]]);
/* unicodeToTex Not a pure module */

exports.unicodeToTex = unicodeToTex;

},{"rescript/lib/es6/js_dict.js":3}],9:[function(require,module,exports){
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
var _tableRowText = Js_dict.fromArray([["textExpression",
/* None */
2], ["varPrimitive",
/* None */
2], ["intPrimitive",
/* None */
2], ["floatPrimitive",
/* None */
2], ["SumExpression",
/* None */
2], ["ProductExpression",
/* None */
2], ["FractionExpression",
/* None */
2], ["PowerExpression",
/* None */
2], ["SquareRootExpression",
/* None */
2], ["RootExpression",
/* None */
2]]);

exports._tableRowText = _tableRowText;

var _tableRowSum = Js_dict.fromArray([["textExpression",
/* None */
2], ["varPrimitive",
/* None */
2], ["intPrimitive",
/* Dot */
1], ["floatPrimitive",
/* Dot */
1], ["SumExpression",
/* None */
2], ["ProductExpression",
/* None */
2], ["FractionExpression",
/* None */
2], ["PowerExpression",
/* None */
2], ["SquareRootExpression",
/* None */
2], ["RootExpression",
/* None */
2]]);

exports._tableRowSum = _tableRowSum;

var _tableRowPower = Js_dict.fromArray([["textExpression",
/* None */
2], ["varPrimitive",
/* None */
2], ["intPrimitive",
/* Dot */
1], ["floatPrimitive",
/* Dot */
1], ["SumExpression",
/* None */
2], ["ProductExpression",
/* Dot */
1], ["FractionExpression",
/* Dot */
1], ["PowerExpression",
/* None */
2], ["SquareRootExpression",
/* None */
2], ["RootExpression",
/* None */
2]]);

exports._tableRowPower = _tableRowPower;

var _tableRowOther = Js_dict.fromArray([["textExpression",
/* None */
2], ["varPrimitive",
/* None */
2], ["intPrimitive",
/* Dot */
1], ["floatPrimitive",
/* Dot */
1], ["SumExpression",
/* None */
2], ["ProductExpression",
/* Dot */
1], ["FractionExpression",
/* Dot */
1], ["PowerExpression",
/* Dot */
1], ["SquareRootExpression",
/* None */
2], ["RootExpression",
/* None */
2]]);

exports._tableRowOther = _tableRowOther;

var _table = Js_dict.fromArray([["textExpression", _tableRowText], ["varPrimitive", _tableRowOther], ["intPrimitive", _tableRowOther], ["floatPrimitive", _tableRowOther], ["SumExpression", _tableRowSum], ["ProductExpression", _tableRowOther], ["FractionExpression", _tableRowOther], ["PowerExpression", _tableRowPower], ["SquareRootExpression", _tableRowPower], ["RootExpression", _tableRowPower]]);

exports._table = _table;

function _multiplicationSymbolLookupIndex(factor) {
  switch (factor.TAG | 0) {
    case
    /* TextExpression */
    0:
      return "textExpression";

    case
    /* PrimitiveExpression */
    1:
      switch (factor._0.TAG | 0) {
        case
        /* VarPrimitive */
        0:
          return "varPrimitive";

        case
        /* IntPrimitive */
        1:
          return "intPrimitive";

        case
        /* FloatPrimitive */
        2:
          return "floatPrimitive";
      }

    case
    /* SumExpression */
    2:
      return "SumExpression";

    case
    /* ProductExpression */
    3:
      return "ProductExpression";

    case
    /* FractionExpression */
    4:
      return "FractionExpression";

    case
    /* PowerExpression */
    5:
      return "PowerExpression";

    case
    /* RootExpression */
    6:
      return "RootExpression";

    case
    /* SquarerootExpression */
    7:
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

  console.log(leftIndex, rightIndex, maybeSymbol);

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
    /* None */
    2:
      return "";
  }
}
/* _tableRowText Not a pure module */

},{"rescript/lib/es6/caml_option.js":2,"rescript/lib/es6/js_dict.js":3}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.varPrimitiveExpression = varPrimitiveExpression;
exports.intPrimitiveExpression = intPrimitiveExpression;
exports.floatPrimitiveExpression = floatPrimitiveExpression;
exports.varFractionExpression = varFractionExpression;
exports.constFractionExpression = constFractionExpression;

// Generated by ReScript, PLEASE EDIT WITH CARE
function varPrimitiveExpression(n) {
  return {
    TAG:
    /* PrimitiveExpression */
    1,
    _0: {
      TAG:
      /* VarPrimitive */
      0,
      _0: n
    }
  };
}

function intPrimitiveExpression(n) {
  return {
    TAG:
    /* PrimitiveExpression */
    1,
    _0: {
      TAG:
      /* IntPrimitive */
      1,
      _0: n
    }
  };
}

function floatPrimitiveExpression(n) {
  return {
    TAG:
    /* PrimitiveExpression */
    1,
    _0: {
      TAG:
      /* FloatPrimitive */
      2,
      _0: n
    }
  };
}

function varFractionExpression(n) {
  return {
    TAG:
    /* FractionExpression */
    4,
    _0: {
      TAG:
      /* VarFraction */
      0,
      _0: n
    }
  };
}

function constFractionExpression(n) {
  return {
    TAG:
    /* FractionExpression */
    4,
    _0: {
      TAG:
      /* ConstFraction */
      1,
      _0: n
    }
  };
}
/* No side effect */

},{}],11:[function(require,module,exports){
"use strict";

var Formula = _interopRequireWildcard(require("./Formula.bs"));

var Examples = _interopRequireWildcard(require("./Examples.bs"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class MathSolver {
  constructor(displayNodeId) {
    this.formulaNodeToTex = Formula.formulaNodeToTex;
    this.examples = Examples.examples;
    this.displayNode = document.getElementById(displayNodeId);
    this.currentExampleIndex = 0;
  }

  render(formula) {
    this.displayNode.innerHTML = this.formulaNodeToTex(formula);
    MathJax.typeset();
  }

  generate() {
    const formula = {}; // Quadratic.generate()

    this.render(formula);
  }

  example() {
    const formula = this.examples[this.currentExampleIndex++];
    this.currentExampleIndex %= this.examples.length;
    this.render(formula);
  }

}

window.MathSolver = MathSolver;

},{"./Examples.bs":4,"./Formula.bs":5}]},{},[4,5,6,7,8,9,10,11]);
