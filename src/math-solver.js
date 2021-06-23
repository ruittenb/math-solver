
/**
 * LaTeX:    https://www.latex-project.org/help/documentation/
 * MathJax:  http://docs.mathjax.org/en/latest/
 * ReScript: https://rescript-lang.org/docs/manual/latest/overview
 */

import * as FormulaRenderer from './Formula/FormulaRenderer.bs';
import * as FormulaCleaner from './Formula/FormulaCleaner.bs';
import * as Examples from './Equation/Examples.bs';
import * as QuadraticEquation from './Equation/QuadraticEquation.bs';

class MathSolver {

    constructor(displayNodeId) {
        this.formulaNodeToTex = FormulaRenderer.formulaNodeToTex;
        this.cleanupFormula = FormulaCleaner.cleanup;
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

    example(delta) {
        let index = this.currentExampleIndex + delta;
        if (index < 0) {
            index += this.examples.length;
        } else {
            index %= this.examples.length;
        }
        let formula = this.examples[index];
        console.log('Formula:', formula);
        formula = this.cleanupFormula(formula);
        console.log('Cleaned formula:', formula);
        this.render(formula);
        this.currentExampleIndex = index;
    }
}

window.MathSolver = MathSolver;

