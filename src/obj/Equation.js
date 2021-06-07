
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

    /** **********************************************************************
     * setters
     */

    setValue(value) {
        this.value = value
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
        //const doc = MathJax.tex2chtml(this.getAsTexStr());
        //MathJax.typeset();
        //return doc;
        return MathJax.tex2chtml(this.getAsTexStr(), {});
    }

    /** **********************************************************************
     * Equation object processing
     */

    // decide whether to apply parenthesis around a factor
    _eqnFactorToTex(factor) {
        if (factor.sum) {
            return ' ( ' + this._eqnObjToTex(factor) + ' ) ';
        } else {
            return this._eqnObjToTex(factor);
        }
    }

    // Convert the entire equation object to a TeX string
    _eqnObjToTex(eqn, suppressSign = false) {
        if (eqn.primitive) {
            const sign = (eqn.sign && !suppressSign) ? eqn.sign : '';
            const texSign = sign === '±' ? ' \\pm ' : sign
            return texSign + eqn.primitive;
        } else if (eqn.or) {
            return eqn.or.atoms.map(this._eqnObjToTex).join(' \\lor  ');
        } else if (eqn.equation) {
            return eqn.equation.members.map(this._eqnObjToTex).join(' = ');
        } else if (eqn.sum) {
            // TODO fix terms with minuses or plusminuses ( one optional sign, rest mandatory signs?)
            return eqn.sum.terms.map(this._eqnObjToTex).join(' + ');
        } else if (eqn.product) {
            return eqn.product.factors.map(this._eqnFactorToTex).join(' \\cdot ');
        } else if (eqn.fraction) {
            return ' \\frac{ ' +
                this._eqnObjToTex(eqn.fraction.numerator) +
                ' } { ' +
                this._eqnObjToTex(eqn.fraction.denominator) +
                ' } ';
        } else if (eqn.power) { // TODO TESTME
            const useParens = eqn.power.base.sum || eqn.power.base.product;
            const texBase = this._eqnObjToTex(eqn.power.base)
            const texExponent = this._eqnObjToTex(eqn.power.exponent)
            const texParenBase = useParens
                ?  ` ( ${texBase} ) `
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
        return { sum: { terms } }; // TODO signs
    }
    _product(...factors) {
        return { product: { factors } };
    }
    _fraction(a, b) {
        return { fraction: {
            numerator: a,
            denominator: b
        } };
    }
    _power(a, b) {
        return { power: {
            base: a,
            exponent: b
        } };
    }
    _squareroot(a) {
        return { squareroot: a };
    }
    _cuberoot(a) {
        return { cuberoot: a };
    }
    _root(a, b) {
        return { root: {
            index: a,
            radicand: b
        } };
    }
}

// vim: set ts=4 sw=4 et nu fdm=marker:
