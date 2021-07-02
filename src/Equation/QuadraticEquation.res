
/** ****************************************************************************
 * QuadraticEquation: generate a random shape of quadratic equation
 */

open Types
open Formula
open Random

/**
 * QuadraticEquation shapes:
 *
 * 0.  FactorSimple:  x (x + p) = 0
 * 1.  FactorSimple:  x (x + p) = r
 * 2.  FactorHard:    (x + p) (x + q) = 0
 * 3.  FactorHard:    (x + p) (x + q) = r
 * 4.  Square:        a x^2 = r
 * 5.  SquareConst:   a x^2 + c = 0
 * 6.  SquareConst:   a x^2 + c = r
 * 7.  SquareLinear:  a x^2 + b x = 0
 * 8.  SquareLinear:  a x^2 + b x = r
 * 9.  FullQuadratic: a x^2 + b x + c = 0
 * 10. FullQuadratic: a x^2 + b x + c = r
 */

/** **********************************************************************
 * generator functions
 */

/* 0, 1 */
let _generateShapeFactorSimple = (rightMember: int): formula => {
    createEquationFormula([
        createProductExpression([
            createVarPrimitiveExpression("x"),
            createSumExpression([
                createVarPrimitiveExpression("x"),
                randomNumberPrimitiveExpression()
            ])
        ]),
        createIntPrimitiveExpression(rightMember)
    ])
}

/* 2, 3 */
let _generateShapeFactorHard = (rightMember: int): formula => {
    createEquationFormula([
        createProductExpression([
            createSumExpression([
                createVarPrimitiveExpression("x"),
                randomNumberPrimitiveExpression()
            ]),
            createSumExpression([
                createVarPrimitiveExpression("x"),
                randomNumberPrimitiveExpression()
            ])
        ]),
        createIntPrimitiveExpression(rightMember)
    ])
}

/* 4 */
let _generateShapeSquare = (rightMember: int): formula => {
    createEquationFormula([
        createProductExpression([
            randomNumberPrimitiveExpression(),
            createPowerExpression(
                createVarPrimitiveExpression("x"),
                createIntPrimitiveExpression(2)
            )
        ]),
        createIntPrimitiveExpression(rightMember)
    ])
}

/* 5, 6 */
let _generateShapeSquareConst = (rightMember: int): formula => {
    createEquationFormula([
        createSumExpression([
            createProductExpression([
                randomNumberPrimitiveExpression(),
                createPowerExpression(
                    createVarPrimitiveExpression("x"),
                    createIntPrimitiveExpression(2)
                )
            ]),
            randomNumberPrimitiveExpression(),
        ]),
        createIntPrimitiveExpression(rightMember)
    ])
}

/* 7, 8 */
let _generateShapeSquareLinear = (rightMember: int): formula => {
    createEquationFormula([
        createSumExpression([
            createProductExpression([
                randomNumberPrimitiveExpression(),
                createPowerExpression(
                    createVarPrimitiveExpression("x"),
                    createIntPrimitiveExpression(2)
                )
            ]),
            createProductExpression([
                randomNumberPrimitiveExpression(),
                createVarPrimitiveExpression("x"),
            ])
        ]),
        createIntPrimitiveExpression(rightMember)
    ])
}

/* 9, 10 */
let _generateShapeFullQuadratic = (rightMember: int): formula => {
    createEquationFormula([
        createSumExpression([
            createProductExpression([
                randomNumberPrimitiveExpression(),
                createPowerExpression(
                    createVarPrimitiveExpression("x"),
                    createIntPrimitiveExpression(2)
                )
            ]),
            createProductExpression([
                randomNumberPrimitiveExpression(),
                createVarPrimitiveExpression("x"),
            ]),
            randomNumberPrimitiveExpression(),
        ]),
        createIntPrimitiveExpression(rightMember)
    ])
}

let generate = (): formula => {
    let shape = randomPos(11)
    let rightMember = randomNumber()
    switch shape {
        | 0 => _generateShapeFactorSimple(0)
        | 1 => _generateShapeFactorSimple(rightMember)
        | 2 => _generateShapeFactorHard(0)
        | 3 => _generateShapeFactorHard(rightMember)
        | 4 => _generateShapeSquare(rightMember)
        | 5 => _generateShapeSquareConst(0)
        | 6 => _generateShapeSquareConst(rightMember)
        | 7 => _generateShapeSquareLinear(0)
        | 8 => _generateShapeSquareLinear(rightMember)
        | 9 => _generateShapeFullQuadratic(0)
        | 10 => _generateShapeFullQuadratic(rightMember)
        | _ => Text([])
    }
}

