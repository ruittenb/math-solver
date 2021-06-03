
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
        this.setValue(value ? value : '<equation></equation>');
        // bind
        this._xmlNodeToTex = this._xmlNodeToTex.bind(this)
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

    getAsTexStr() {
        return this._xmlNodeToTex(this.getAsXmlDoc().documentElement);
    }

    getAsMathDoc() {
        return MathJax.tex2chtml(this.getAsTexStr())
    }

    /** **********************************************************************
     * XML node processing
     */

    // Convert a DOM node list to a regular array.
    _nodeListToArray(nodeList) {
        let result = [];
        for (const node of nodeList) {
            result.push(node);
        }
        return result;
    }

    // Perform a function over every element of a html node collection.
    _nodeListForEach(nodeList, fn) {
        return this._nodeListToArray(nodeList).map(fn);
    }

    // Try to find the first child element with a particular node name.
    // Return undefined if not found.
    _getChildElementByName(node, name) {
        const nameUpper = name.toUpperCase();
        const filteredNodes = this._nodeListToArray(node.children).filter(
            childNode => childNode.nodeName.toUpperCase() === nameUpper
        );
        return filteredNodes.length ? filteredNodes[0] : undefined;
    }

    // Convert the entire xml node to a TeX string
    _xmlNodeToTex(xmlNode) {
        if (xmlNode.nodeType === Node.TEXT_NODE) {
            return xmlNode;
        } else if (xmlNode.nodeType !== Node.ELEMENT_NODE) {
            return '';
        }
        // continue with element nodes
		const elementChild = xmlNode.firstElementChild;
        switch (xmlNode.nodeName) {
            case 'or':
                return this._nodeListForEach(xmlNode.children, this._xmlNodeToTex).join(' \\or ');
            case 'atom':
                return this._xmlNodeToTex(xmlNode.firstChild);
            case 'equation':
                return this._nodeListForEach(xmlNode.children, this._xmlNodeToTex).join(' = ');
            case 'member':
                return ' {' + this._xmlNodeToTex(xmlNode.firstChild) + '} ';
            case 'sum':
                // TODO fix terms with minuses or plusminuses ( one optional sign, rest mandatory signs?)
                return this._nodeListForEach(xmlNode.children, this._xmlNodeToTex).join(' + ');
            case 'term':
                return this._xmlNodeToTex(xmlNode.firstElementChild || xmlNode.firstChild);
            case 'product':
                // TODO joins with multiplication signs or not
                return this._nodeListForEach(xmlNode.children, this._xmlNodeToTex).join(' \cdot ');
            case 'factor': // TODO move to _xmlFactorToTex()
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
                return ' \\frac{ ' +
                    this._xmlNodeToTex(this._getChildElementByName(xmlNode, 'numerator')) +
                    ' } { ' +
                    this._xmlNodeToTex(this._getChildElementByName(xmlNode, 'denominator')) +
                    ' } ';
            case 'power': // TODO
                return this._xmlNodeToTex(this._getChildElementByName(xmlNode, 'base')) +
                    ' ^{ ' +
                    this._xmlNodeToTex(this._getChildElementByName(xmlNode, 'exponent')) +
                    ' } ';
            case 'base': // TODO move to  _xmlBaseToTex()
                if (!elementChild) {
                    // just text
                    return xmlNode.firstChild;
                } else if (elementChild.nodeName.toUpperCase() === 'SUM'
                    || elementChild.nodeName.toUpperCase() === 'PRODUCT'
                ) {
                    // is sum: put in brackets
                    return ' ( ' + this._xmlNodeToTex(elementChild) + ' ) ';
                } else {
                    return this._xmlNodeToTex(elementChild);
                }
            case 'exponent':
                // TODO move to _xmlExponentToTex()
                if (!elementChild) {
                    // just text
                    return xmlNode.firstChild;
                } else {
                    return this._xmlNodeToTex(elementChild);
                }
            case 'root':
                return ' \\sqrt{ ' + this._xmlNodeToTex(xmlNode.firstChild) + ' } ';
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

// vim: set ts=4 sw=4 et nu fdm=marker:
