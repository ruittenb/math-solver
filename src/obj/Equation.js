
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

    render(target) {
        let DOMNode;
        if (target instanceof HTMLElement) {
            DOMNode = target;
        } else if (typeof target === 'string') {
            DOMNode = document.getElementById(target);
        } else {
            throw new Error('render(): Expected HTML element or ID string');
        }
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
    _normalizePrimitive(node) {
        if (node.primitive === undefined) {
            throw new Error('Request to normalize a primitive node that is not a primitive');
        }
        if (node.sign) {
            // already present
            return node;
        }
        if (this.isConstantPrimitive(node)) {
            // constant, e.g. 0, -13, 8
            if (node.primitive < 0) {
                node.sign = '-';
                node.primitive = Math.abs(node.primitive);
            } else {
                node.sign = '+'
            }
        } else {
            // variable, e.g. a, b, x
            node.primitive = String(node.primitive).replace(/^[ \t\n]+/, '');
            if (node.primitive.match(/^[-+±]/)) {
                node.sign = node.primitive.substr(0, 1);
                node.primitive = node.primitive.substr(1);
            } else {
                // no leading sign on 'primitive': default positive
                node.sign = '+';
            }
        }
        return node;
    }

    // Make sure that every primitive node has 'primitive' and 'sign' properties
    _normalizePrimitives(node) {
        if (typeof node !== 'object' || node === null) {
            throw new Error(`Error: equation node expected, but got ${typeof node}`);
        }
        if (node.primitive === undefined) {
            // node is not primitive: recurse
            for (const subNode of Object.values(node)) {
                if (typeof subNode === 'object') {
                    this._normalizePrimitives(subNode);
                }
            }
        } else {
            // node is primitive
            this._normalizePrimitive(node);
        }
    }

    // Format a factor node with or without parenthesis
    _eqnFactorToTex(node) {
        if (node.sum) {
            return ' ( ' + this._nodeToTex(node) + ' ) ';
        } else {
            return this._nodeToTex(node);
        }
    }

    // return the correct sign for a node
    _eqnLeadingSign(node, signMode) {
        const sign = node.sign;
        if (
            signMode === 'none' || (sign === '+' && signMode === 'nonplus')
        ) {
            return '';
        } else {
            return sign === '±' ? ' \\pm ' : sign
        }
    }

    // Format a primitive
    _eqnPrimitiveToTex(node, signMode) {
        return this._eqnLeadingSign(node, signMode) +
            String(node.primitive) +
            (node.subscript ? ` _{ ${node.subscript} }` : '');
    }

    // Convert the entire equation object to a TeX string
    _nodeToTex(node, signMode = 'nonplus') { // signMode : 'nonplus' | 'all' | 'none'
        if (node.primitive !== undefined) {
            return this._eqnPrimitiveToTex(node, signMode);
        } else if (node.or) {
            return node.or.atoms.map(
                atom => this._nodeToTex(atom)
            ).join(' \\lor  ');
        } else if (node.equation) {
            return node.equation.members.map(
                member => this._nodeToTex(member)
            ).join(' = ');
        } else if (node.sum) {
            // TODO suppress sign if there is a sign in de subNode when it is a <product> or <squareroot>
            // one term with optional sign
            const firstTerm = node.sum.terms[0];
            const texFirstTerm = this._nodeToTex(firstTerm);
            // rest of terms without sign. join them with the term's sign.
            const result = texFirstTerm + node.sum.terms.slice(1).map(term => {
                const sign = term.sign
                    ? term.sign
                    : ' + ';
                return sign + this._nodeToTex(term, 'none')
            }).join('');
            return result;
        } else if (node.product) {
            // TODO don't show dots everywhere
            return node.product.factors.map(
                factor => this._eqnFactorToTex(factor)
            ).join(' \\cdot ');
        } else if (node.fraction) {
            const integer = node.fraction.integer;
            return (integer ? this._nodeToTex(integer) : '') +
                ' \\frac{ ' +
                this._nodeToTex(node.fraction.numerator) +
                ' } { ' +
                this._nodeToTex(node.fraction.denominator) +
                ' } ';
        } else if (node.power) {
            const useParens = node.power.base && (node.power.base.sum || node.power.base.product);
            const texBase = this._nodeToTex(node.power.base)
            const texExponent = this._nodeToTex(node.power.exponent)
            const texParenBase = useParens
                ? ` ( ${texBase} ) `
                : texBase
            return texParenBase + ` ^{ ${texExponent} } `;
        } else if (node.squareroot) {
            return ' \\sqrt{ ' + this._nodeToTex(node.squareroot) + ' } ';
        } else if (node.cuberoot) {
            const texRadicand = this._nodeToTex(node.cuberoot);
            return ` \\sqrt[3]{ ${texRadicand} }`
        } else if (node.root) {
            const texIndex = this._nodeToTex(node.root.index);
            const texRadicand = this._nodeToTex(node.root.radicand);
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
    _primitive(prim, subscript) {
        const subscriptNode = subscript ? { subscript } : {};
        return this._normalizePrimitive({
            primitive: prim,
            ...subscriptNode
        });
    }
    _text(text) {
        return { text };
    }
}

// vim: set ts=4 sw=4 et nu fdm=marker:
