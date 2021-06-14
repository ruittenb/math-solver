
/**
 * requires: MathJax
 */

module Formula = {

    type signMode =
        | None
        | NoPlus
        | All

    let delimiter: string = "$$"

//    /** **********************************************************************
//     * initialization
//     */
//
//    constructor(value) {
//        this._init(value);
//    }
//
//    _init(value) {
//        // store value or initialize empty
//        this.setValue(value ? value : {});
//        // bind
//        this._nodeToTex = this._nodeToTex.bind(this);
//        this._eqnFactorToTex = this._eqnFactorToTex.bind(this);
//    }
//
//    /** **********************************************************************
//     * rendering
//     */
//
//    render(target) {
//        let DOMNode;
//        if (target instanceof HTMLElement) {
//            DOMNode = target;
//        } else if (typeof target === 'string') {
//            DOMNode = document.getElementById(target);
//        } else {
//            throw new Error('render(): Expected HTML element or ID string');
//        }
//        DOMNode.innerHTML = this.getAsTexStr();
//        MathJax.typeset();
//    }
//


    /** **********************************************************************
     * Equation object processing
     */

    // Return the correct sign for a node, but suppress 
    // pluses if they are not necessary
    let _signAttrToTex = (sign: Types.sign, signMode: signMode): string => {
        switch sign {
            | Minus if signMode !== None => "-"
            | Minus => ""
            | PlusMinus if signMode !== None => " \\pm "
            | PlusMinus => ""
            | Plus if signMode === All => "+"
            | Plus => ""
        }
    }

    // Format the subscript for a primitive node
    let _subscriptAttrToTex = (subscript: string): string => {
        if Js.String2.length(subscript) > 0 {
            ` _{ ${subscript} } `
        } else {
            ""
        }
    }

    // Format text
    let _textToTex = (text: string): string => {
        ` \\text{ ${text} } `
    }

    // Format a primitive
    let _primitiveNodeToTex = (primitive: Types.primitive, signMode: signMode): string => {
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

    // Format any expression
    let _expressionNodeToTex = (expression: Types.expression): string => {
        switch expression {
            | TextExpression(text)             => _textToTex(text)
            | PrimitiveExpression(primitive)   => _primitiveNodeToTex(primitive, signMode) // TODO signMode
            | SumExpression(sum)               => _sumNodeToTex(sum)
            | ProductExpression(product)       => _productNodeToTex(product)
            | FractionExpression(fraction)     => _fractionNodeToTex(fraction)
            | PowerExpression(power)           => _powerNodeToTex(power)
            | RootExpression(root)             => _rootToTex(root)
            | SquarerootExpression(squareroot) => _squarerootToTex(squareroot)
        }
    }

    // Format a factor with or without parenthesis
    let _factorNodeToTex = (factor: Types.expression): string => {
        switch factor {
            | SumExpression(sum) => " ( " ++ _sumNodeToTex(sum) ++ " ) "
            | _                  => _expressionNodeToTex(factor)
        }
    }

    // Format a product of expressions
    let _productNodeToTex = (product: Types.product): string => {
        Js.Array.map(
            _factorNodeToTex,
            product.factors
            // TODO don't show dots everywhere... maybe mapi() ?
        )->Js.Array2.joinWith(" \\cdot ")
    }

    // Format a sum of expressions
    let _sumNodeToTex = (sum: Types.sum): string => {
            // TODO suppress sign if there is a sign in de subNode when it is a <product> or <squareroot>
            // one term with optional sign
        if Js.Array.length(sum.terms) === 0 {
            ""
        } else {
            let firstTerm = sum.terms[0];
            let texFirstTerm = _termNodeToTex(firstTerm);
            // rest of terms without sign. join them with the term's sign.
            let texOtherTerms = Js.Array2.map(
                _termNodeToTex,
                term => {
//                const sign = term.sign
//                    ? term.sign
//                    : ' + ';
//                return sign + this._nodeToTex(term, 'none')
//            }).join('');

                sum.terms.sliceFrom(1)


//            return result;
                texFirstTerm ++ texOtherTerms
        }


    // Equation
    let _equationNodeToTex = (equation: Types.equation) => {
        Js.Array.map(
            member => _expressionNodeToTex(member),
            equation.members
        )->Js.Array2.joinWith(" = ")
    }

    // Logical OR
    let _logicalOrNodeToTex = (logicalOr: Types.logicalOr): string => {
        Js.Array.map(
            atom => _equationNodeToTex(atom),
            logicalOr.atoms
        )->Js.Array2.joinWith(" \\lor ")
    }

    // Convert the entire formula object to a TeX string
    let formulaNodeToTex = (formula: Types.formula): string => {
        let texFormula = switch node {
            | LogicalOr(logicalOr) => _logicalOrNodeToTex(logicalOr)
            | Equation(eq) => _equationNodeToTex(eq)
            | Text(text) => _textToTex(text)
        }
        delimiter ++ texFormula ++ delimiter
    }

//        } else if (node.fraction) {
//            const integer = node.fraction.integer;
//            return (integer ? this._nodeToTex(integer) : '') +
//                ' \\frac{ ' +
//                this._nodeToTex(node.fraction.numerator) +
//                ' } { ' +
//                this._nodeToTex(node.fraction.denominator) +
//                ' } ';
//        } else if (node.power) {
//            const useParens = node.power.base && (node.power.base.sum || node.power.base.product);
//            const texBase = this._nodeToTex(node.power.base)
//            const texExponent = this._nodeToTex(node.power.exponent)
//            const texParenBase = useParens
//                ? ` ( ${texBase} ) `
//                : texBase
//            return texParenBase + ` ^{ ${texExponent} } `;
//        } else if (node.squareroot) {
//            return ' \\sqrt{ ' + this._nodeToTex(node.squareroot) + ' } ';
//        } else if (node.cuberoot) {
//            const texRadicand = this._nodeToTex(node.cuberoot);
//            return ` \\sqrt[3]{ ${texRadicand} }`
//        } else if (node.root) {
//            const texIndex = this._nodeToTex(node.root.index);
//            const texRadicand = this._nodeToTex(node.root.radicand);
//            return ` \\sqrt[ ${texIndex} ]{ ${texRadicand} }`
//        }
    }
//
//
//    /** **********************************************************************
//     * formula management
//     */
//
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

// vim: set ts=4 sw=4 et nu fdm=marker:
