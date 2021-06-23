
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

// replace (expr)^ -1 with 1 / expr

let _removeAddZero = (terms: array<expression>): array<expression> => {
    terms->Js.Array2.filter(
        (term: expression): bool => {
            switch term {
                | IntPrimitiveExpression(primitive)   if primitive.value === 0  => false
                | FloatPrimitiveExpression(primitive) if primitive.value === 0. => false
                | _ => true
            }
        }
    )
}

let _cleanupSumToExpression = (sum: sum): expression => {
    sum.terms
        ->_removeAddZero
        // -> recurse
        ->createSumExpression
}

let _removeMultiplyOne = (factors: array<expression>): array<expression> => {
    factors->Js.Array2.filter(
        (factor: expression): bool => {
            switch factor {
                | IntPrimitiveExpression(primitive)   if primitive.value === 1  => false
                | FloatPrimitiveExpression(primitive) if primitive.value === 1. => false
                | _ => true
            }
        }
    )
}

let _cleanupProductToExpression = (product: product): expression => {
    product.factors
        ->_removeMultiplyOne
        // -> recurse
        ->createProductExpression(~sign=product.sign)
}

let _cleanupExpression = (expression: expression): expression => {
    switch expression {
        | TextExpression(_)                      => expression
        | VarPrimitiveExpression(_)              => expression
        | IntPrimitiveExpression(_)              => expression
        | FractionPrimitiveExpression(primitive) => expression // _fractionPrimitiveNodeToTex(primitive, NoPlus)
        | FloatPrimitiveExpression(_)            => expression
        | SumExpression(sum)                     => sum->_cleanupSumToExpression
        | ProductExpression(product)             => product->_cleanupProductToExpression
        | FractionExpression(fraction)           => expression // _fractionNodeToTex(fraction, NoPlus)
        | PowerExpression(power)                 => expression // _powerNodeToTex(power, NoPlus)
        | SquarerootExpression(squareroot)       => expression // _squarerootNodeToTex(squareroot, NoPlus)
        | RootExpression(root)                   => expression // _rootNodeToTex(root, NoPlus)
    }
}

let _cleanupMembers = (expressions: array<expression>): array<expression> => {
    expressions
        ->Js.Array2.map(_cleanupExpression)
}

let _cleanupEquation = (equation: equation): equation => {
    equation.members
        ->_cleanupMembers
        ->createEquation
    // also, perform actions on "both" sides (i.e. all members)
}

let _cleanupEquations = (equations: array<equation>): array<equation> => {
    equations
        ->Js.Array2.map(_cleanupEquation)
}

let cleanup = (formula: formula): formula => {
    switch formula {
        | LogicalOr(logicalOr) => logicalOr.atoms->_cleanupEquations->createLogicalOrFormula
        | Equation(equation)   => equation.members->_cleanupMembers->createEquationFormula
        | Text(_)              => formula
    }
}
