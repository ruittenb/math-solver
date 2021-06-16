
/** ****************************************************************************
 * Formula: Formula rendering
 *
 * Requires: Types, Greek
 */

open Types
open Greek

type signMode =
    | NoSign
    | NoPlus
    | AllSign

let delimiter: string = "$$"

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
        | Minus if signMode !== NoSign => "-"
        | Minus => ""
        | PlusMinus if signMode !== NoSign => " \\pm "
        | PlusMinus => ""
        | Plus if signMode === AllSign => "+"
        | Plus => ""
    }
}

// Format the subscript for a primitive node
let _subscriptAttrToTex = (subscript: option<string>): string => {
    switch subscript {
        | Some(str) => ` _{ ${str} } `
        | None      => ""
    }
}

let _variablePrimitiveToTex = (variable: string) => {
    switch Js.Dict.get(unicodeToTex, variable) {
        | Some(texString) => texString
        | None            => variable
    }
}

// Format a primitive
let _primitiveNodeToTex = (primitive: primitive, signMode: signMode): string => {
    switch primitive {
        | ConstPrimitive(const) =>
            _signAttrToTex(const.sign, signMode) ++
            Belt.Float.toString(const.primitive)
        | VarPrimitive(var) =>
            _signAttrToTex(var.sign, signMode) ++
            _variablePrimitiveToTex(var.primitive) ++
            _subscriptAttrToTex(var.subscript)
    }
}

/** **********************************************************************
 * Conversion of Expressions to Tex
 */

// Format any expression
let rec _expressionNodeToTex = (expression: expression): string => {
    switch expression {
        | TextExpression(text)             => _textToTex(text)
        | PrimitiveExpression(primitive)   => _primitiveNodeToTex(primitive, NoPlus)
        | SumExpression(sum)               => _sumNodeToTex(sum)
        | ProductExpression(product)       => _productNodeToTex(product, NoPlus)
        | FractionExpression(fraction)     => _fractionNodeToTex(fraction, NoPlus)
        | PowerExpression(power)           => _powerNodeToTex(power, NoPlus)
        | SquarerootExpression(squareroot) => _squarerootNodeToTex(squareroot, NoPlus)
        | RootExpression(root)             => _rootNodeToTex(root, NoPlus)
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
        ->Js.Array2.map(_factorNodeToTex)
        // TODO don't show dots everywhere... maybe mapi() ?
        ->Js.Array2.joinWith(" \\cdot ")
}

// Format a term. We use the sign of the second (and following) expressions
// as sign between the terms; e.g. sum(prim(4), prim(-5)) is rendered as "4 - 5"
and _termNodeToTex = (expression: expression, signMode: signMode): string => {
    switch expression {
        | TextExpression(text)             => _textToTex(text)                          // has no sign property
        | SumExpression(sum)               => _sumNodeToTex(sum)                        // has no sign property
        | PrimitiveExpression(primitive)   => _primitiveNodeToTex(primitive,  signMode) // has no immediate sign property
        | FractionExpression(fraction)     => _fractionNodeToTex(fraction,    signMode) // has no immediate sign property
        | ProductExpression(product)       => _signAttrToTex(product.sign,    signMode) ++ " " ++ _productNodeToTex(product, NoSign)
        | PowerExpression(power)           => _signAttrToTex(power.sign,      signMode) ++ " " ++ _powerNodeToTex(power, NoSign)
        | SquarerootExpression(squareroot) => _signAttrToTex(squareroot.sign, signMode) ++ " " ++ _squarerootNodeToTex(squareroot, NoSign)
        | RootExpression(root)             => _signAttrToTex(root.sign,       signMode) ++ " " ++ _rootNodeToTex(root, NoSign)
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

// Format a numerator/denominator
and _fractionToTex = (numerator: expression, denominator: expression): string => {
    let texNumerator   = _expressionNodeToTex(numerator)
    let texDenominator = _expressionNodeToTex(denominator)
    ` \\\\frac{ ${texNumerator} } { ${texDenominator} } `
}

// Format a fraction node
and _fractionNodeToTex = (fractionNode: fraction, signMode: signMode): string => {
    switch (fractionNode) {
        | ConstFraction(fraction) => {
            let fractionInteger = fraction.integer.primitive !== 0.
                ? _primitiveNodeToTex(fraction.integer->ConstPrimitive, NoSign)
                : ""
            _signAttrToTex(fraction.sign, signMode) ++ " " ++
            fractionInteger ++
            _fractionToTex(fraction.numerator->constPrimitiveExpression, fraction.denominator->constPrimitiveExpression)
        }
        | VarFraction(fraction) =>
            _signAttrToTex(fraction.sign, signMode) ++ " " ++
            _fractionToTex(fraction.numerator, fraction.denominator) // note that numerator and denominator are expressions
    }
}

// Format a power node
and _powerNodeToTex = (power: power, signMode: signMode): string => {
    let texSign      = _signAttrToTex(power.sign, signMode)
    let texBase      = _expressionNodeToTex(power.base)
    let texExponent  = _expressionNodeToTex(power.exponent)
    let texParenBase = switch power.base {
        | SumExpression(_)     => ` ( ${texBase} ) `
        | ProductExpression(_) => ` ( ${texBase} ) `
        | _ => texBase
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
    delimiter ++ texFormula ++ delimiter
}

// vim: set ts=4 sw=4 et list nu fdm=marker:
