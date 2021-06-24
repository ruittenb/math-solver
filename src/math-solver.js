
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

    cleanup() {
        this.formula = this.cleanupFormula(this.formula);
        this.render();
    }

    render() {
        const texFormula = this.formulaNodeToTex(this.formula);
        console.log(`Formula: ${texFormula}`);
        this.displayNode.innerHTML = texFormula;
        MathJax.typeset();
    }

    generate() {
        this.formula = QuadraticEquation.generate();
        this.render();
    }

    example(delta) {
        let index = this.currentExampleIndex + delta;
        if (index < 0) {
            index += this.examples.length;
        } else {
            index %= this.examples.length;
        }
        this.currentExampleIndex = index;
        this.formula = this.examples[index];
        this.render();
    }
}

window.MathSolver = MathSolver;

