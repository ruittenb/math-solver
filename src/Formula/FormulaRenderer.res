
/** ****************************************************************************
 * Formula: Formula rendering
 */

open Types

type signMode =
    | NoSign
    | NoPlus
    | AllSign

let texDelimiter: string = "$$"

/** **********************************************************************
 * Conversions of attributes and leaf nodes to Tex
 */

// Format text
let _textToTex = (text: string): string => {
    ` \\\\text{ ${text} } `
}

// Return the correct sign for a node, but suppress
// pluses if they are not necessary
let _signAttrToTex = (sign: sign, signMode: signMode): string => {
    switch sign {
        | PlusMinus if signMode !== NoSign => " \\pm "
        | PlusMinus => ""
        | MinusPlus if signMode !== NoSign => " \\mp "
        | MinusPlus => ""
        | Minus if signMode !== NoSign => "-"
        | Minus => ""
        | Plus if signMode === AllSign => "+"
        | Plus => ""
    }
}

let _applyFontStyle = (str: string, fontStyle: fontStyle) => {
    switch fontStyle {
        | Normal => ` \\\\mathrm{ ${str} } `
        | Italic => ` \\\\mathit{ ${str} } `
    }
}

// Format the subscript for a primitive node
let _subscriptAttrToTex = (subscript: option<string>, subscriptFontStyle: fontStyle): string => {
    switch subscript {
        | Some(str) => " _{ " ++ str->_applyFontStyle(subscriptFontStyle) ++ " } "
        | None      => ""
    }
}

// Format Greek letters in variables
let _variableToTex = (variable: string) => {
    switch Js.Dict.get(Greek.unicodeToTex, variable) {
        | Some(texString) => texString
        | None            => variable
    }
}

// Format a variable primitive
let _varPrimitiveNodeToTex = (varPrimitive: varPrimitive, signMode: signMode): string => {
    _signAttrToTex(varPrimitive.sign, signMode) ++
    _variableToTex(varPrimitive.primitive) ++
    _subscriptAttrToTex(varPrimitive.subscript, varPrimitive.subscriptFontStyle)
}

// Format an integer primitive
let _intPrimitiveNodeToTex = (intPrimitive: intPrimitive, signMode: signMode): string => {
    _signAttrToTex(intPrimitive.sign, signMode) ++
    Belt.Int.toString(intPrimitive.primitive)
}

// Format a fraction primitive
let _fractionPrimitiveNodeToTex = (fractionPrimitive: fractionPrimitive, signMode: signMode): string => {
    let fractionInteger = fractionPrimitive.integer !== 0
        ? Belt.Int.toString(fractionPrimitive.integer)
        : ""
    let fractionNumerator = Belt.Int.toString(fractionPrimitive.numerator)
    let fractionDenominator = Belt.Int.toString(fractionPrimitive.denominator)
    _signAttrToTex(fractionPrimitive.sign, signMode) ++
    ` ${fractionInteger} \\\\frac{ ${fractionNumerator} } { ${fractionDenominator} } `
}

// Format a float primitive
let _floatPrimitiveNodeToTex = (floatPrimitive: floatPrimitive, signMode: signMode): string => {
    _signAttrToTex(floatPrimitive.sign, signMode) ++
    Belt.Float.toString(floatPrimitive.primitive)
}

/** **********************************************************************
 * Conversion of Expressions to Tex
 */

// Format any expression
let rec _expressionNodeToTex = (expression: expression): string => {
    switch expression {
        | TextExpression(text)                   => _textToTex(text)
        | VarPrimitiveExpression(primitive)      => _varPrimitiveNodeToTex(primitive, NoPlus)
        | IntPrimitiveExpression(primitive)      => _intPrimitiveNodeToTex(primitive, NoPlus)
        | FractionPrimitiveExpression(primitive) => _fractionPrimitiveNodeToTex(primitive, NoPlus)
        | FloatPrimitiveExpression(primitive)    => _floatPrimitiveNodeToTex(primitive, NoPlus)
        | SumExpression(sum)                     => _sumNodeToTex(sum)
        | ProductExpression(product)             => _productNodeToTex(product, NoPlus)
        | FractionExpression(fraction)           => _fractionNodeToTex(fraction, NoPlus)
        | PowerExpression(power)                 => _powerNodeToTex(power, NoPlus)
        | SquarerootExpression(squareroot)       => _squarerootNodeToTex(squareroot, NoPlus)
        | RootExpression(root)                   => _rootNodeToTex(root, NoPlus)
    }
}

// Format a term. We use the sign of the second (and following) expressions
// as sign between the terms; e.g. sum(prim(4), prim(-5)) is rendered as "4 - 5"
and _termNodeToTex = (expression: expression, signMode: signMode): string => {
    switch expression {
        | TextExpression(text)                   => _textToTex(text)                          // has no sign property
        | SumExpression(sum)                     => _sumNodeToTex(sum)                        // has no sign property
        | VarPrimitiveExpression(primitive)      => _signAttrToTex(primitive.sign,  signMode) ++ " " ++ _varPrimitiveNodeToTex(primitive, NoSign)
        | IntPrimitiveExpression(primitive)      => _signAttrToTex(primitive.sign,  signMode) ++ " " ++ _intPrimitiveNodeToTex(primitive, NoSign)
        | FractionPrimitiveExpression(primitive) => _signAttrToTex(primitive.sign,  signMode) ++ " " ++ _fractionPrimitiveNodeToTex(primitive, NoSign)
        | FloatPrimitiveExpression(primitive)    => _signAttrToTex(primitive.sign,  signMode) ++ " " ++ _floatPrimitiveNodeToTex(primitive, NoSign)
        | ProductExpression(product)             => _signAttrToTex(product.sign,    signMode) ++ " " ++ _productNodeToTex(product, NoSign)
        | FractionExpression(fraction)           => _signAttrToTex(fraction.sign,   signMode) ++ " " ++ _fractionNodeToTex(fraction, NoSign)
        | PowerExpression(power)                 => _signAttrToTex(power.sign,      signMode) ++ " " ++ _powerNodeToTex(power, NoSign)
        | SquarerootExpression(squareroot)       => _signAttrToTex(squareroot.sign, signMode) ++ " " ++ _squarerootNodeToTex(squareroot, NoSign)
        | RootExpression(root)                   => _signAttrToTex(root.sign,       signMode) ++ " " ++ _rootNodeToTex(root, NoSign)
    }
}

// Format a sum of expressions
and _sumNodeToTex = (sum: sum): string => {
    if Js.Array2.length(sum.terms) === 0 {
        ""
    } else {
        // only show the sign on the first term when it's not plus
        let texFirstTerm: string = _termNodeToTex(sum.terms[0], NoPlus);
        // rest of terms without sign. the sign is used to join terms.
        let texOtherTerms: string = sum.terms
            ->Js.Array2.sliceFrom(1)
            ->Js.Array2.map(term => _termNodeToTex(term, AllSign))
            ->Js.Array2.joinWith("")
        texFirstTerm ++ texOtherTerms
    }
}

// Format a factor with or without parenthesis
and _factorNodeToTex = (factor: expression): string => {
    switch factor {
        | SumExpression(sum) => " ( " ++ _sumNodeToTex(sum) ++ " ) "
        | _                  => _expressionNodeToTex(factor)
    }
}

// Format a product of expressions
and _productNodeToTex = (product: product, signMode: signMode): string => {
    _signAttrToTex(product.sign, signMode) ++
    product.factors
        ->Js.Array2.mapi((factorNode, index) => {
            if index === 0 {
                // first factor
                _factorNodeToTex(factorNode)
            } else {
                MultiplicationSymbol.lookupTex(product.factors[index - 1], factorNode) ++
                _factorNodeToTex(factorNode)
            }
        })
        ->Js.Array2.joinWith("")
}

// Format a fraction node
and _fractionNodeToTex = (fraction: fraction, signMode: signMode): string => {
    let texNumerator   = _expressionNodeToTex(fraction.numerator)
    let texDenominator = _expressionNodeToTex(fraction.denominator)
    _signAttrToTex(fraction.sign, signMode) ++
    ` \\\\frac{ ${texNumerator} } { ${texDenominator} } `
}

// Format a power node
and _powerNodeToTex = (power: power, signMode: signMode): string => {
    let texSign      = _signAttrToTex(power.sign, signMode)
    let texBase      = _expressionNodeToTex(power.base)
    let texExponent  = _expressionNodeToTex(power.exponent)
    let texParenBase = switch power.base {
        | IntPrimitiveExpression({ sign: Minus })      => ` ( ${texBase} ) `
        | FractionPrimitiveExpression({ sign: Minus }) => ` ( ${texBase} ) `
        | FloatPrimitiveExpression({ sign: Minus })    => ` ( ${texBase} ) `
        | SumExpression(_)                             => ` ( ${texBase} ) `
        | ProductExpression(_)                         => ` ( ${texBase} ) `
        | _                                            => texBase
    }
    ` ${texSign}${texParenBase}^{ ${texExponent} } `
}

// Format a square root
and _squarerootNodeToTex = (squareroot: squareroot, signMode: signMode): string => {
    let texSign     = _signAttrToTex(squareroot.sign, signMode)
    let texRadicand = _expressionNodeToTex(squareroot.radicand)
    ` ${texSign} \\\\sqrt{ ${texRadicand} } `
}

// Format any root
and _rootNodeToTex = (root: root, signMode: signMode): string => {
    let texSign     = _signAttrToTex(root.sign, signMode)
    let texIndex    = _expressionNodeToTex(root.index)
    let texRadicand = _expressionNodeToTex(root.radicand)
    ` ${texSign} \\\\sqrt[ ${texIndex} ]{ ${texRadicand} }`
}

/** **********************************************************************
 * Conversion of Formula to Tex
 */

// Equation
let _equationNodeToTex = (equation: equation) => {
    equation.members
        ->Js.Array2.map(member => _expressionNodeToTex(member))
        ->Js.Array2.joinWith(" = ")
}

// Logical OR
let _logicalOrNodeToTex = (logicalOr: logicalOr): string => {
    logicalOr.atoms
        ->Js.Array2.map(atom => _equationNodeToTex(atom))
        ->Js.Array2.joinWith(" \\lor ")
}

// Convert the entire formula object to a TeX string
let formulaNodeToTex = (formula: formula): string => {
    let texFormula = switch formula {
        | LogicalOr(logicalOr) => _logicalOrNodeToTex(logicalOr)
        | Equation(eq)         => _equationNodeToTex(eq)
        | Text(text)           => _textToTex(text)
    }
    texDelimiter ++ texFormula ++ texDelimiter
}

// vim: set ts=4 sw=4 et list nu fdm=marker:
