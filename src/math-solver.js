
/**
 * LaTeX:    https://www.latex-project.org/help/documentation/
 * MathJax:  http://docs.mathjax.org/en/latest/
 * ReScript: https://rescript-lang.org/docs/manual/latest/overview
 */

import * as FormulaRenderer from './Formula/FormulaRenderer.bs';
import * as Examples from './Equation/Examples.bs';
import * as QuadraticEquation from './Equation/QuadraticEquation.bs';

class MathSolver {

    constructor(displayNodeId) {
        this.formulaNodeToTex = FormulaRenderer.formulaNodeToTex;
        this.examples = Examples.examples;
        this.displayNode = document.getElementById(displayNodeId);
        this.currentExampleIndex = 0;
    }

    render(formula) {
        this.displayNode.innerHTML = this.formulaNodeToTex(formula);
        MathJax.typeset();
    }

    generate() {
        const formula = QuadraticEquation.generate()
        this.render(formula);
    }

    example() {
        const formula = this.examples[this.currentExampleIndex++];
        this.currentExampleIndex %= this.examples.length;
        this.render(formula);
    }
}

window.MathSolver = MathSolver;

