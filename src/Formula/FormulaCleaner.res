
/** **********************************************************************
 * Formula management
 */

open Types
open Formula

//    simplify() {
//        console.log('TODO not yet implemented');
//        // cancel +6-5, +6x -5x, sqrt(x^2) etc.
//    }
//
//    // for presentation purposes, e.g.
//    // no roots in the denominator; no fractions under a radical sign; simplify fractions
//    cleanup() {
//        console.log('TODO not yet implemented');
//    }


// sum constants

// add like terms

// simplify fractions

// add constant fractions

// multiply constants

// reverse some orders like [ FractionExpression, constPrimitive ]

// multiply by zero or one

// add zero

// replace (expr)^ -1 with 1 / expr

let _cleanupExpression = (expression: expression): expression => {
    expression
}

let _cleanupEquation = (equation: equation): equation => {
    equation.members->Js.Array2.reduce(
        (acc: array<expression>, expression: expression): array<expression> => {
            // Note that Array2.push() is not pure
            let _ = acc->Js.Array2.push(expression->_cleanupExpression)
            acc
        },
        []
    )->createEquation
}

let _cleanupEquations = (equations: array<equation>): array<equation> => {
    equations->Js.Array2.reduce(
        (acc: array<equation>, equation: equation): array<equation> => {
            // Note that Array2.push() is not pure
            let _ = acc->Js.Array2.push(equation->_cleanupEquation)
            acc
        },
        []
    )
}

let cleanup = (formula: formula): formula => {
    switch formula {
        | LogicalOr(logicalOr) => createLogicalOrFormula(_cleanupEquations(logicalOr.atoms))
        | Equation(equation)   => createEquationFormula(_cleanupEquation(equation).members)
        | Text(_)              => formula
    }
}
