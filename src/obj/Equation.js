
/**
 * requires: MathJax
 */

class Equation {

    constructor(value) {
        this._init(value);
    }

    /** **********************************************************************
     * initialization
     */

    _init(value) {
        // store value or initialize empty
        this.setValue(value ? value : {});
        // bind
        this._eqnObjToTex = this._eqnObjToTex.bind(this);
        this._eqnFactorToTex = this._eqnFactorToTex.bind(this);
    }

    async render(DOMNodeId) {
        console.log('render:A');
        await MathJax.tex2chtmlPromise(this.getAsTexStr(), {});
        console.log('render:B');
        await MathJax.typesetPromise(DOMNodeId);
        console.log('render:C');
    }

    /** **********************************************************************
     * setters
     */

    setValue(value) {
        this.value = value
        this._normalizePrimitives(this.value);
    }

    /** **********************************************************************
     * getters
     */

    getAsObject() {
        return this.value;
    }

    getAsTexStr() {
        return this._eqnObjToTex(this.value);
    }

    getAsMathDoc() {
        return MathJax.tex2chtml(this.getAsTexStr());
    }

    /** **********************************************************************
     * Equation object processing
     */

    // Normalize a node that is a primitive. Fills in the 'sign' property
    // by transferring the sign from the 'primitive' property.
    _normalizePrimitive(eqnNode) {
        if (eqnNode.sign) {
            return;
        }
        eqnNode.primitive = String(eqnNode.primitive).replace(/^[ \t\n]+/, '');
        if (eqnNode.primitive.match(/^[-+±]/)) {
            eqnNode.sign = eqnNode.primitive.substr(0, 1);
            eqnNode.primitive = eqnNode.primitive.substr(2);
        } else {
            // no leading sign on 'primitive': default positive
            eqnNode.sign = '+';
        }
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
            return ' ( ' + this._eqnObjToTex(eqnNode) + ' ) ';
        } else {
            return this._eqnObjToTex(eqnNode);
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
    _eqnObjToTex(eqn, signMode = 'nonplus') { // signMode : 'nonplus' | 'all' | 'none'
        if (eqn.primitive) {
            return this._eqnLeadingSign(eqn, signMode) + eqn.primitive;
        } else if (eqn.or) {
            return eqn.or.atoms.map(
                atom => this._eqnObjToTex(atom)
            ).join(' \\lor  ');
        } else if (eqn.equation) {
            return eqn.equation.members.map(
                member => this._eqnObjToTex(member)
            ).join(' = ');
        } else if (eqn.sum) {
            // one term with optional sign
            const firstTerm = eqn.sum.terms[0];
            const texFirstTerm = this._eqnObjToTex(firstTerm);
            // rest of terms without sign. join them with the term's sign.
            const result = texFirstTerm + eqn.sum.terms.slice(1).map(term => { 
                const sign = term.sign
                    ? term.sign
                    : ' + ';
                return sign + this._eqnObjToTex(term, 'none')
            }).join('');
            return result;
        } else if (eqn.product) {
            return eqn.product.factors.map(
                factor => this._eqnFactorToTex(factor)
            ).join(' \\cdot ');
        } else if (eqn.fraction) {
            return ' \\frac{ ' +
                this._eqnObjToTex(eqn.fraction.numerator) +
                ' } { ' +
                this._eqnObjToTex(eqn.fraction.denominator) +
                ' } ';
        } else if (eqn.power) {
            const useParens = eqn.power.base.sum || eqn.power.base.product;
            const texBase = this._eqnObjToTex(eqn.power.base)
            const texExponent = this._eqnObjToTex(eqn.power.exponent)
            const texParenBase = useParens
                ? ` ( ${texBase} ) `
                : texBase
            return texParenBase + ` ^{ ${texExponent} } `;
        } else if (eqn.squareroot) {
            return ' \\sqrt{ ' + this._eqnObjToTex(eqn.squareroot) + ' } ';
        } else if (eqn.cuberoot) {
            const texRadicand = this._eqnObjToTex(eqn.cuberoot);
            return ` \\sqrt[3]{ ${texRadicand} }`
        } else if (eqn.root) {
            const texIndex = this._eqnObjToTex(eqn.root.index);
            const texRadicand = this._eqnObjToTex(eqn.root.radicand);
            return ` \\sqrt[ ${texIndex} ]{ ${texRadicand} }`
        }
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
