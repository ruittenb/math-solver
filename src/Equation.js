
/**
 * requires: MathJax
 */

class Equation {

    constructor(limit = null, value = null) {
        // store limit of random natural numbers
        this.setLimit(limit)
        // initialize
        if (value) {
            this.value = value;
        } else {
            this.generate();
        }
        // bind
        this._xmlNodeToTex = this._xmlNodeToTex.bind(this._xmlNodeToTex)
    };

    /** **********************************************************************
     * generator function
     */
    generate() {
        this.value = '<equation></equation>'
    };

    /** **********************************************************************
     * setters
     */
    setLimit(limit) {
        this.limit = limit ? limit : 12;
    }

    /** **********************************************************************
     * getters
     */
    getAsHtmlStr() {
        return this.value;
    }

    getAsXmlDoc() {
        let xmlDoc;
        if (window.DOMParser) {
            const parser = new DOMParser();
            xmlDoc = parser.parseFromString(this.value, "text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(this.value);
        }
        return xmlDoc;
    }

    getAsTexDoc() {
        return MathJax.tex2chtml(
            this._xmlNodeToTex(this.getAsXmlDoc().documentElement)
        )
    }

    _xmlNodeToTex(xmlNode) {
        if (xmlNode.nodeType === Node.TEXT_NODE) {
            return xmlNode;
        } else if (xmlNode.nodeType !== Node.ELEMENT_NODE) {
            return '';
        }
        // continue with element nodes
        switch (xmlNode.nodeName) {
            case 'or':
                return nodeListForEach(xmlNode.children, this._xmlNodeToTex).join(' \\or ');
            case 'atom':
                return this._xmlNodeToTex(xmlNode.firstChild);
            case 'equation':
                return nodeListForEach(xmlNode.children, this._xmlNodeToTex).join(' = ');
            case 'member':
                return ' {' + this._xmlNodeToTex(xmlNode.firstChild) + '} ';
            case 'sum':
                // TODO fix terms with minuses or plusminuses ( one optional sign, rest mandatory signs?)
                return nodeListForEach(xmlNode.children, this._xmlNodeToTex).join(' + ');
            case 'term':
                return this._xmlNodeToTex(xmlNode.firstElementChild || xmlNode.firstChild);
            case 'product':
                // TODO joins with multiplication signs or not
                return nodeListForEach(xmlNode.children, this._xmlNodeToTex).join(' \cdot ');
            case 'factor':
                const elementChild = xmlNode.firstElementChild;
                if (!elementChild) {
                    // just text
                    return xmlNode.firstChild;
                } else if (elementChild.nodeName.toUpperCase() === 'SUM') {
                    // is sum: put in brackets
                    return ' ( ' + this._xmlNodeToTex(elementChild) + ' ) ';
                } else {
                    return this._xmlNodeToTex(elementChild);
                }
            case 'fraction':
                return ' { ' +
                    this._xmlNodeToTex(getChildElementByName(xmlNode, 'numerator')) +
                    ' \\over ' +
                    this._xmlNodeToTex(getChildElementByName(xmlNode, 'denominator')) +
                    ' } ';
            /*
            case 'power': // TODO
            case 'base': // TODO
            case 'exponent': // TODO
            */
            case 'root':
                return ' \\sqrt{' + this._xmlNodeToTex(xmlNode.firstChild) + '} ';
            default:
                throw new Error(`unknown node name: ${xmlNode.nodeName}`);
        }
    }

    /** **********************************************************************
     * equation components
     */
    _equation(...memberValues) {
        const members = memberValues.map(this._member.bind(this));
        return this._enclose(
            'equation', 
            ...members
        );
    }
    _member(a) {
        return this._enclose('member', a);
    }
    _sum(...termValues) {
        const terms = termValues.map(this._term.bind(this));
        return this._enclose(
            'sum',
            ...terms
        );
    }
    _term(a) {
        return this._enclose('term', a);
    }
    _product(...factorValues) {
        const factors = factorValues.map(this._factor.bind(this));
        return this._enclose(
            'product',
            ...factors
        );
    }
    _factor(a) {
        return this._enclose('factor', a);
    }
    _fraction(a, b) {
        return this.enclose(
            'fraction',
            this._numerator(a),
            this._denominator(b)
        );
    }
    _numerator(a) {
        return this._enclose('numerator', a);
    }
    _denominator(a) {
        return this._enclose('denominator', a);
    }
    _power(a, b) {
        return this._enclose(
            'power',
            this._base(a),
            this._exponent(b)
        )
    }
    _base(a) {
        return this._enclose('base', a);
    }
    _exponent(a) {
        return this._enclose('exponent', a);
    }
    _root(a) {
        return this._enclose('root', a);
    }

    _enclose(tag, ...values) {
        return `<${tag}>${values.join('')}</${tag}>`;
    }
}

