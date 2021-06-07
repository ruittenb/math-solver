
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

    render(DOMNodeId) {
        //const doc = MathJax.tex2chtml(this.getAsTexStr());
        //MathJax.typeset();
        //return doc;
        MathJax.tex2chtmlPromise(this.getAsTexStr(), {});
            MathJax.typeset(DOMNodeId)
        }).catch(err => {
            console.error(`Error during rendering: ${JSON.stringify(err)}`);
        });
    }

    /** **********************************************************************
     * Equation object processing
     */

    // Make sure that every primitive node has a separate `primitive` and `sign` property
    _normalizePrimitives(eqnNode) {
        if (!eqnNode.primitive) {
            // eqnNode is not primitive
            for (const subNode of Object.values(eqnNode)) {
                this._normalizePrimitives(subNode);
            }
        } else {
            // eqnNode is primitive
            eqnNode.primitive.replace(/^[ \t\n]+/, '');
            if (eqnNode.primitive.match(/^[-+±]/)) {
                eqnNode.sign = eqnNode.primitive.substr(0, 1);
                eqnNode.primitive = eqnNode.primitive.substr(2);
            } else {
                // no leading sign on 'primitive': default positive
                eqnNode.sign = '+';
            }
        }
    }

    // decide whether to apply parenthesis around a factor
    _eqnFactorToTex(factor) {
        if (factor.sum) {
            return ' ( ' + this._eqnObjToTex(factor) + ' ) ';
        } else {
            return this._eqnObjToTex(factor);
        }
    }

    // Convert the entire equation object to a TeX string
    _eqnObjToTex(eqn, signMode = 'nonplus') { // 'nonplus', 'all', 'none'
        console.log('_eqnObjToTex: signMode === ', signMode);
        if (eqn.primitive) {
            const sign = eqn.sign;
            if (
                signMode === 'none' || (sign === '+' && signMode === 'nonplus')
            ) {
                return eqn.primitive;
            } else {
                const texSign = sign === '±' ? ' \\pm ' : sign
                return texSign + eqn.primitive;
            }
        } else if (eqn.or) {
            return eqn.or.atoms.map(this._eqnObjToTex).join(' \\lor  ');
        } else if (eqn.equation) {
            return eqn.equation.members.map(this._eqnObjToTex).join(' = ');
        } else if (eqn.sum) {
            // TODO fix terms with minuses or plusminuses ( one optional sign, rest mandatory signs?)
            console.log('Processing SUM', eqn.sum);
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
    _primitive(a) {
        return {
            primitive: a, sign
        }
    }
}

// vim: set ts=4 sw=4 et nu fdm=marker:
