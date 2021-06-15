
/**
 * requires: Types
 */

module Formula = {

    open Types

    type signMode =
        | NoSign
        | NoPlus
        | AllSign

    let delimiter: string = "$$"

    /** **********************************************************************
     * Conversions of Simples to Tex
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

    // Format a primitive
    let _primitiveNodeToTex = (primitive: primitive, signMode: signMode): string => {
        switch primitive {
            | ConstPrimitive(const) =>
                _signAttrToTex(const.sign, signMode) ++
                Belt.Float.toString(const.primitive)
            | VarPrimitive(var) =>
                _signAttrToTex(var.sign, signMode) ++
                var.primitive ++
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
            | ProductExpression(product)       => _productNodeToTex(product)
            | FractionExpression(fraction)     => _fractionNodeToTex(fraction)
            | PowerExpression(power)           => _powerNodeToTex(power)
            | SquarerootExpression(squareroot) => _squarerootNodeToTex(squareroot)
            | RootExpression(root)             => _rootNodeToTex(root)
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
    and _productNodeToTex = (product: product): string => {
        Js.Array.map(
            _factorNodeToTex,
            product.factors
            // TODO don't show dots everywhere... maybe mapi() ?
        )->Js.Array2.joinWith(" \\cdot ")
    }

//    and _termNodeToTex = (term: expression, signMode): string => {
//        switch term {
//            | PrimitiveExpression(primitive) => _primitiveNodeToTex(primitive, signMode)
//            | _                              => _expressionNodeToTex(term)
//        }
//    }

    and _termNodeToTex = (expression: expression): string => {
        switch expression {
            | TextExpression(text)           => _textToTex(text) // has no sign
            | PrimitiveExpression(primitive) => _signAttrToTex(primitive.sign, AllSign) ++ _primitiveNodeToTex(primitive, NoSign)
            | SumExpression(sum)             => _signAttrToTex(Plus, AllSign) ++ _sumNodeToTex(sum)
            // TODO
            | ProductExpression(product)     => _productNodeToTex(product.sign, AllSign) ++ _productNodeToTex(product)
            | FractionExpression(fraction)   => _termNodeToTex(expression, NoSign) // no sign
            | PowerExpression(power)           => _powerNodeToTex(power)
            | SquarerootExpression(squareroot) => _squarerootNodeToTex(squareroot)
            | RootExpression(root)             => _rootNodeToTex(root)
        }
    }

    // Format a sum of expressions
    and _sumNodeToTex = (sum: sum): string => {
        if Js.Array.length(sum.terms) === 0 {
            ""
        } else {
            // only show the sign on the first term when it's not plus
            let texFirstTerm: string = _termNodeToTex(sum.terms[0], NoPlus);
            // rest of terms without sign. the sign is used to join terms.
            let texOtherTerms: string = Js.Array.map(
                // TODO DONE? suppress sign if there is a sign in the subNode when it is a <product> or <squareroot>
                term => _termNodeToTex(term),
                sum.terms.sliceFrom(1)
            )->Js.Array2.joinWith("")
            texFirstTerm ++ texOtherTerms
        }
    }

    // Format a numerator/denominator
    and _fractionToTex = (numerator: expression, denominator: expression): string => {
        let texNumerator = _expressionNodeToTex(numerator)
        let texDenominator = _expressionNodeToTex(denominator)
        ` \\\\frac{ ${texNumerator} } { ${texDenominator} } `
    }

    // Format a fraction node
    and _fractionNodeToTex = (fraction: fraction): string => {
        switch (fraction) {
            | ConstFraction(fraction) =>
                Belt.Float.toString(fraction.integer) ++
                _fractionToTex(fraction.numerator, fraction.denominator)
            | VarFraction(fraction) =>
                _fractionToTex(fraction.numerator, fraction.denominator)
        }
    }

    // Format a power node
    and _powerNodeToTex = (power: power): string => {
        let texBase = _expressionNodeToTex(power.base)
        let texExponent = _expressionNodeToTex(power.exponent)
        let texParenBase = switch power.base {
            | SumExpression(_)     => ` ( ${texBase} ) `
            | ProductExpression(_) => ` ( ${texBase} ) `
            | _ => texBase
        }
        ` ${texParenBase} ^{ ${texExponent} } `
    }

    // Format a square root
    and _squarerootNodeToTex = (squareroot: squareroot): string => {
        let texRadicand = _expressionNodeToTex(squareroot.radicand)
        ` \\\\sqrt{ ${texRadicand} } `
    }

    // Format any root
    and _rootNodeToTex = (root: root): string => {
        let texIndex    = _expressionNodeToTex(root.index)
        let texRadicand = _expressionNodeToTex(root.radicand)
        ` \\\\sqrt[ ${texIndex} ]{ ${texRadicand} }`
    }

    /** **********************************************************************
     * Conversion of Formula to Tex
     */

    // Equation
    let _equationNodeToTex = (equation: equation) => {
        Js.Array.map(
            member => _expressionNodeToTex(member),
            equation.members
        )->Js.Array2.joinWith(" = ")
    }

    // Logical OR
    let _logicalOrNodeToTex = (logicalOr: logicalOr): string => {
        Js.Array.map(
            atom => _equationNodeToTex(atom),
            logicalOr.atoms
        )->Js.Array2.joinWith(" \\lor ")
    }

    // Convert the entire formula object to a TeX string
    let formulaNodeToTex = (formula: formula): string => {
        let texFormula = switch node {
            | LogicalOr(logicalOr) => _logicalOrNodeToTex(logicalOr)
            | Equation(eq) => _equationNodeToTex(eq)
            | Text(text) => _textToTex(text)
        }
        delimiter ++ texFormula ++ delimiter
    }

    /** **********************************************************************
     * formula management
     */
  
//    simplify() {
//        console.log('TODO not yet implemented');
//        // cancel +6-5, +6x -5x, sqrt(x^2) etc.
//    }
//
//    // for presentation purposes, e.g.
//    // no roots in the denominator; no fractions under a radical sign; simplify fractions
//    cleanup() {
//        console.log('TODO not yet implemented');
//    }

}

// vim: set ts=4 sw=4 et list nu fdm=marker:
