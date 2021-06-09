
/**
 * requires: MathJax
 */

class Equation {

    /** **********************************************************************
     * initialization
     */

    constructor(value) {
        this.DELIMITER = '$$';
        this._init(value);
    }

    _init(value) {
        // store value or initialize empty
        this.setValue(value ? value : {});
        // bind
        this._nodeToTex = this._nodeToTex.bind(this);
        this._eqnFactorToTex = this._eqnFactorToTex.bind(this);
    }

    /** **********************************************************************
     * rendering
     */

    render(DOMNode) {
        DOMNode.innerHTML = this.getAsTexStr();
        MathJax.typeset();
    }

    /** **********************************************************************
     * getters/setters
     */

    setValue(value) {
        if (typeof value !== 'object' || value === null) {
            throw new Error(`setValue(): invalid parameter (should be object), got ${value}`);
        }
        this.value = value
        this._normalizePrimitives(this.value);
    }

    getAsObject() {
        return this.value;
    }

    getAsTexStr() {
        return this.DELIMITER + this._nodeToTex(this.value) + this.DELIMITER;
    }

    /** **********************************************************************
     * Equation object processing
     */

    // Normalize a node that is a primitive. Fills in the 'sign' property
    // by transferring the sign from the 'primitive' property.
    _normalizePrimitive(eqnNode) {
        if (eqnNode.sign) {
            return eqnNode;
        }
        eqnNode.primitive = String(eqnNode.primitive).replace(/^[ \t\n]+/, '');
        if (eqnNode.primitive.match(/^[-+±]/)) {
            eqnNode.sign = eqnNode.primitive.substr(0, 1);
            eqnNode.primitive = eqnNode.primitive.substr(1);
        } else {
            // no leading sign on 'primitive': default positive
            eqnNode.sign = '+';
        }
        return eqnNode;
    }

    // Make sure that every primitive node has 'primitive' and 'sign' properties
    _normalizePrimitives(eqnNode) {
        if (typeof eqnNode !== 'object' || eqnNode === null) {
            throw new Error(`Error: equation node expected, but got ${typeof eqnNode}`);
        }
        if (!eqnNode.primitive) {
            // eqnNode is not primitive: recurse
            for (const subNode of Object.values(eqnNode)) {
                if (typeof subNode === 'object') {
                    this._normalizePrimitives(subNode);
                }
            }
        } else {
            // eqnNode is primitive
            this._normalizePrimitive(eqnNode);
        }
    }

    // Format a factor node with or without parenthesis
    _eqnFactorToTex(eqnNode) {
        if (eqnNode.sum) {
            return ' ( ' + this._nodeToTex(eqnNode) + ' ) ';
        } else {
            return this._nodeToTex(eqnNode);
        }
    }

    // return the correct sign for a node
    _eqnLeadingSign(eqnNode, signMode) {
        const sign = eqnNode.sign;
        if (
            signMode === 'none' || (sign === '+' && signMode === 'nonplus')
        ) {
            return '';
        } else {
            return sign === '±' ? ' \\pm ' : sign
        }
    }

    // Convert the entire equation object to a TeX string
    _nodeToTex(eqn, signMode = 'nonplus') { // signMode : 'nonplus' | 'all' | 'none'
        if (eqn.primitive) {
            return this._eqnLeadingSign(eqn, signMode) + eqn.primitive;
        } else if (eqn.or) {
            return eqn.or.atoms.map(
                atom => this._nodeToTex(atom)
            ).join(' \\lor  ');
        } else if (eqn.equation) {
            return eqn.equation.members.map(
                member => this._nodeToTex(member)
            ).join(' = ');
        } else if (eqn.sum) {
            // TODO suppress sign if there is a sign in de subNode when it is a <product> or <squareroot>
            // one term with optional sign
            const firstTerm = eqn.sum.terms[0];
            const texFirstTerm = this._nodeToTex(firstTerm);
            // rest of terms without sign. join them with the term's sign.
            const result = texFirstTerm + eqn.sum.terms.slice(1).map(term => {
                const sign = term.sign
                    ? term.sign
                    : ' + ';
                return sign + this._nodeToTex(term, 'none')
            }).join('');
            return result;
        } else if (eqn.product) {
            // TODO don't show dots everywhere
            return eqn.product.factors.map(
                factor => this._eqnFactorToTex(factor)
            ).join(' \\cdot ');
        } else if (eqn.fraction) {
            const integer = eqn.fraction.integer;
            return (integer ? this._nodeToTex(integer) : '') +
                ' \\frac{ ' +
                this._nodeToTex(eqn.fraction.numerator) +
                ' } { ' +
                this._nodeToTex(eqn.fraction.denominator) +
                ' } ';
        } else if (eqn.power) {
            const useParens = eqn.power.base && (eqn.power.base.sum || eqn.power.base.product);
            const texBase = this._nodeToTex(eqn.power.base)
            const texExponent = this._nodeToTex(eqn.power.exponent)
            const texParenBase = useParens
                ? ` ( ${texBase} ) `
                : texBase
            return texParenBase + ` ^{ ${texExponent} } `;
        } else if (eqn.squareroot) {
            return ' \\sqrt{ ' + this._nodeToTex(eqn.squareroot) + ' } ';
        } else if (eqn.cuberoot) {
            const texRadicand = this._nodeToTex(eqn.cuberoot);
            return ` \\sqrt[3]{ ${texRadicand} }`
        } else if (eqn.root) {
            const texIndex = this._nodeToTex(eqn.root.index);
            const texRadicand = this._nodeToTex(eqn.root.radicand);
            return ` \\sqrt[ ${texIndex} ]{ ${texRadicand} }`
        }
    }

    /** **********************************************************************
     * node properties
     */

    isVariablePrimitive(node) {
        return node.primitive && typeof node.primitive === 'string';
    }

    isConstantPrimitive(node) {
        return node.primitive && typeof node.primitive === 'number';
    }

    /** **********************************************************************
     * formula management
     */

    simplify() {
        console.log('TODO not yet implemented');
        // cancel +6-5, +6x -5x, sqrt(x^2) etc.
    }

    // for presentation purposes, e.g.
    // no roots in the denominator; no fractions under a radical sign; simplify fractions
    cleanup() {
        console.log('TODO not yet implemented');
    }

    /** **********************************************************************
     * equation components
     */

    _or(...atoms) {
        return { or: { atoms } };
    }
    _equation(...members) {
        return { equation: { members } };
    }
    _sum(...terms) {
        return { sum: { terms } };
    }
    _product(...factors) {
        return { product: { factors } };
    }
    _fraction(numerator, denominator) {
        return { fraction: { numerator, denominator } };
    }
    _power(base, exponent) {
        return { power: { base, exponent } };
    }
    _squareroot(a) {
        return { squareroot: a };
    }
    _cuberoot(a) {
        return { cuberoot: a };
    }
    _root(index, radicand) {
        return { root: { index, radicand } };
    }
    _primitive(a) {
        return this._normalizePrimitive(
            { primitive: a }
        );
    }
}

// vim: set ts=4 sw=4 et nu fdm=marker:
