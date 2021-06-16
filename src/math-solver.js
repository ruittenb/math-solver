
import * as Formula from './Formula.bs';
import * as Examples from './Examples.bs';

//const Formula = require('./Formula.bs');
//const Examples = require('./Examples.bs');

class MathSolver {

    constructor(displayNodeId) {
        this.formulaNodeToTex = Formula.formulaNodeToTex;
        this.examples = Examples.examples;
        this.displayNode = document.getElementById(displayNodeId);
        this.currentExampleIndex = 0;
    }

    render(formula) {
        this.displayNode.innerHTML = this.formulaNodeToTex(formula);
        MathJax.typeset();
    }

    generate() {
        const formula = {}; // Quadratic.generate()
        this.render(formula);
    }

    example() {
        this.currentExampleIndex =
            ++this.currentExampleIndex % this.examples.length;
        const formula = this.examples[this.currentExampleIndex];
        this.render(formula);
    }
}

window.mathSolver = new MathSolver('displayFrame');

