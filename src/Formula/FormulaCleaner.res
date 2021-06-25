
/** **********************************************************************
 * Formula management
 */

open Types
open Formula

// sum constants

// sum constant fractions

// multiply constants

// add like terms

// simplify fractions

// fraction with numerator zero

// fraction with denominator one

// reverse some orders like [ FractionExpression, constPrimitive ]

// multiply by zero

// -1 · x^2 => -x^2

// replace x^0 by 1 unless x == 0

// replace (expr)^ -1 with 1 / expr ?

// replace {x}√(y^x) with y => allowed? consider odd/even exponents
// replace ({x}√y)^x with y => what about y < 0 ?
// sqrt(x^2) => x

// no roots in the denominator

// no fractions under a radical sign

let _addConstants = (terms: array<expression>): array<expression> => {
    /*
    terms->Js.Array2.filter(
        (term: expression): bool => {
            switch term {
                | IntPrimitiveExpression(primitive)   if primitive.value === 0  => false
                | FloatPrimitiveExpression(primitive) if primitive.value === 0. => false
                | _ => true
            }
        }
    )
    */
    terms
}

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

let _removeMultiplyByOne = (factors: array<expression>): array<expression> => {
    factors->Js.Array2.filter(
        (factor: expression): bool => {
            switch factor {
                | IntPrimitiveExpression(primitive)   if primitive.sign === Plus && primitive.value === 1  => false
                | FloatPrimitiveExpression(primitive) if primitive.sign === Plus && primitive.value === 1. => false
                | _ => true
            }
        }
    )
}

/** ****************************************************************************
 * Expressions
 */

let rec _recurse = (expressions: array<expression>): array<expression> => {
    expressions->Js.Array2.map(_cleanupExpression)
}

and _cleanupFractionPrimitiveToExpression = (fraction: fractionPrimitive): expression => {
    if fraction.numerator === 0 {
        createIntPrimitiveExpression(~sign=fraction.sign, fraction.integer)
    } else if fraction.denominator === 1 {
        createIntPrimitiveExpression(~sign=fraction.sign, fraction.integer + fraction.numerator)
    } else {
        createFractionPrimitiveExpression(
            ~sign=fraction.sign,
            fraction.integer,
            fraction.numerator,
            fraction.denominator
        )
    }
}

and _cleanupSumToExpression = (sum: sum): expression => {
    sum.terms
        ->_removeAddZero
        ->_addConstants
        ->_recurse
        // -> dismantle: if only one term is left, promote it
        ->createSumExpression
}

and _cleanupProductToExpression = (product: product): expression => {
    product.factors
        ->_removeMultiplyByOne
        ->_recurse
        // -> dismantle: if only one factor is left, promote it
        ->createProductExpression(~sign=product.sign)
}

and _cleanupFractionToExpression = (fraction: fraction): expression => {
    createFractionExpression(
        ~sign=fraction.sign,
        fraction.numerator,
        fraction.denominator
    )
}

and _cleanupPowerToExpression = (power: power): expression => {
    let constOne = createIntPrimitiveExpression(~sign=power.sign, 1)
    switch power.base {
        | IntPrimitiveExpression({ sign: Plus, value: 1 })    => constOne
        | FloatPrimitiveExpression({ sign: Plus, value: 1. }) => constOne
        | _ => createPowerExpression(
            ~sign=power.sign,
            // recurse
            _cleanupExpression(power.base),
            _cleanupExpression(power.exponent)
        )
    }
}

and _cleanupExpression = (expression: expression): expression => {
    switch expression {
        | TextExpression(_)                      => expression
        | VarPrimitiveExpression(_)              => expression
        | IntPrimitiveExpression(_)              => expression
        | FractionPrimitiveExpression(fraction)  => fraction->_cleanupFractionPrimitiveToExpression
        | FloatPrimitiveExpression(_)            => expression
        | SumExpression(sum)                     => sum->_cleanupSumToExpression
        | ProductExpression(product)             => product->_cleanupProductToExpression
        | FractionExpression(fraction)           => fraction->_cleanupFractionToExpression
        | PowerExpression(power)                 => power->_cleanupPowerToExpression
        | SquarerootExpression(_)                => expression // _cleanupSquarerootToExpression
        | RootExpression(_)                      => expression // _cleanupRootToExpression
    }
}

/** ****************************************************************************
 * Formulas and Equations
 */

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

