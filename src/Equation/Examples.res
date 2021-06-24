
/** ****************************************************************************
 * Examples: Example formulas
 */

open Types
open Formula

let examples: array<formula> = [
    // y + (-1)^(a+3) = x + 0
    createEquationFormula([
        createSumExpression([
            createVarPrimitiveExpression("y"),
            createPowerExpression(
                createIntPrimitiveExpression(-1),
                createSumExpression([
                    createVarPrimitiveExpression("a"),
                    createIntPrimitiveExpression(3)
                ])
            )
        ]),
        createSumExpression([
            createVarPrimitiveExpression("x"),
            createIntPrimitiveExpression(0)
        ])
    ]),
    // y = x - 1 ^ (x + 3) + 2 ^ (x + 0)
    createEquationFormula([
        createVarPrimitiveExpression("y"),
        createSumExpression([
            createVarPrimitiveExpression("x"),
            createPowerExpression(
                ~sign=Minus,
                createIntPrimitiveExpression(1),
                createSumExpression([
                    createVarPrimitiveExpression("x"),
                    createIntPrimitiveExpression(3)
                ])
            ),
            createPowerExpression(
                createIntPrimitiveExpression(2),
                createSumExpression([
                    createVarPrimitiveExpression("x"),
                    createIntPrimitiveExpression(0)
                ])
            )
        ])
    ]),
    // x = 1/2 + 1/3
    createEquationFormula([
        createVarPrimitiveExpression("x"),
        createSumExpression([
            createFractionPrimitiveExpression(0, 1, 2),
            createFractionPrimitiveExpression(0, 1, 3)
        ])
    ]),
    // x = 3 2/9 - 1 1/12 + 1/6
    createEquationFormula([
        createVarPrimitiveExpression("x"),
        createSumExpression([
            createFractionPrimitiveExpression(3, 2, 9),
            createFractionPrimitiveExpression(-1, 1, 12),
            createFractionPrimitiveExpression(0, 1, 6),
        ])
    ]),
    // x (x + 1) = 0
    createEquationFormula([
        createProductExpression([
            createVarPrimitiveExpression("x"),
            createSumExpression([
                createVarPrimitiveExpression("x"),
                createIntPrimitiveExpression(1)
            ])
        ]),
        createIntPrimitiveExpression(0)
    ]),
    // x (1 - x) = 2
    createEquationFormula([
        createProductExpression([
            createVarPrimitiveExpression("x"),
            createSumExpression([
                createIntPrimitiveExpression(1),
                createVarPrimitiveExpression("-x")
            ])
        ]),
        createIntPrimitiveExpression(2)
    ]),
    // 2x^2 + 3x - 1 = 0
    createEquationFormula([
        createSumExpression([
            createProductExpression([
                createIntPrimitiveExpression(2),
                createPowerExpression(
                    createVarPrimitiveExpression("x"),
                    createIntPrimitiveExpression(2)
                )
            ]),
            createProductExpression([
                createIntPrimitiveExpression(3),
                createVarPrimitiveExpression("x")
            ]),
            createIntPrimitiveExpression(-1)
        ]),
        createIntPrimitiveExpression(0)
    ]),
    // x = 1 v x = -4
    createLogicalOrFormula([
        createEquation([
            createVarPrimitiveExpression("x"),
            createIntPrimitiveExpression(1)
        ]),
        createEquation([
            createVarPrimitiveExpression("x"),
            createIntPrimitiveExpression(4)
        ])
    ]),
    // x = y = ±3√2
    createEquationFormula([
        createVarPrimitiveExpression("x"),
        createVarPrimitiveExpression("y"),
        createProductExpression(~sign=PlusMinus, [
            createIntPrimitiveExpression(3),
            createSquarerootExpression(
                createIntPrimitiveExpression(2)
            )
        ])
    ]),
    // φ = 1/2 + 1/2√5
    createEquationFormula([
        createVarPrimitiveExpression("φ"),
        createSumExpression([
            createFractionPrimitiveExpression(0, 1, 2),
            createProductExpression([
                createFractionPrimitiveExpression(0, 1, 2),
                createSquarerootExpression(
                    createIntPrimitiveExpression(5)
                ),
            ])
        ])
    ]),
    // V = 4/3 πr^3
    createEquationFormula([
        createVarPrimitiveExpression("V"),
        createProductExpression([
            createFractionPrimitiveExpression(0, 4, 3),
            createVarPrimitiveExpression("π"),
            createPowerExpression(
                createVarPrimitiveExpression("r"),
                createIntPrimitiveExpression(3)
            )
        ])
    ]),
    // x = ∛27
    createEquationFormula([
        createVarPrimitiveExpression("x"),
        createRootExpression(
            createIntPrimitiveExpression(3),
            createIntPrimitiveExpression(27)
        )
    ]),
    // y = (3x)^5
    createEquationFormula([
        createVarPrimitiveExpression("y"),
        createPowerExpression(
            createProductExpression([
                createIntPrimitiveExpression(3),
                createVarPrimitiveExpression("x")
            ]),
            createIntPrimitiveExpression(5)
        )
    ]),
    // y = (x + 5) √ 3125
    createEquationFormula([
        createVarPrimitiveExpression("y"),
        createRootExpression(
            createSumExpression([
                createVarPrimitiveExpression("x"),
                createIntPrimitiveExpression(5),
            ]),
            createIntPrimitiveExpression(3125)
        )
    ]),
    // Quadratic equation
    createEquationFormula([
        createVarPrimitiveExpression("x", ~subscript="1,2"),
        createFractionExpression(
            createSumExpression([
                createVarPrimitiveExpression("-b"),
                createSquarerootExpression(
                    ~sign=PlusMinus,
                    createSumExpression([
                        createPowerExpression(
                            createVarPrimitiveExpression("b"),
                            createIntPrimitiveExpression(2),
                        ),
                        createProductExpression([
                            createIntPrimitiveExpression(-4),
                            createVarPrimitiveExpression("a"),
                            createVarPrimitiveExpression("c")
                        ])
                    ])
                )
            ]),
            createProductExpression([
                createIntPrimitiveExpression(2),
                createVarPrimitiveExpression("a"),
            ])
        )
    ]),
    // Planck constant h = 13.1 Q √(μ0/ε0)ζ^2
    createEquationFormula([
        createVarPrimitiveExpression("h"),
        createProductExpression([
            createFloatPrimitiveExpression(13.1),
            createVarPrimitiveExpression("Q"),
            createSquarerootExpression(
                createFractionExpression(
                    createVarPrimitiveExpression("μ", ~subscript="0"),
                    createVarPrimitiveExpression("ϵ", ~subscript="0"),
                )
            ),
            createPowerExpression(
                createVarPrimitiveExpression("ζ"),
                createIntPrimitiveExpression(2)
            )
        ])
    ]),
    // Spectral radiance
    // https://en.wikipedia.org/wiki/Planck_constant#Origin_of_the_constant
    createEquationFormula([
        createProductExpression([
            createVarPrimitiveExpression("B", ~subscript="λ"),
            createTextExpression("(λ,T)"),
        ]),
        createProductExpression([
            createFractionExpression(
                createProductExpression([
                    createIntPrimitiveExpression(2),
                    createVarPrimitiveExpression("h"),
                    createPowerExpression(
                        createVarPrimitiveExpression("c"),
                        createIntPrimitiveExpression(2)
                    )
                ]),
                createPowerExpression(
                    createVarPrimitiveExpression("λ"),
                    createIntPrimitiveExpression(5)
                )
            ),
            createFractionExpression(
                createIntPrimitiveExpression(1),
                createSumExpression([
                    createPowerExpression(
                        createVarPrimitiveExpression("e"),
                        createFractionExpression(
                            createProductExpression([
                                createVarPrimitiveExpression("h"),
                                createVarPrimitiveExpression("c"),
                            ]),
                            createProductExpression([
                                createVarPrimitiveExpression("λ"),
                                createVarPrimitiveExpression("k", ~subscript="B", ~subscriptFontStyle=Upright),
                                createVarPrimitiveExpression("T"),
                            ]),
                        )
                    ),
                    createIntPrimitiveExpression(-1)
                ])
            )
        ])
    ])
]

// vim: set ts=4 sw=4 et list nu fdm=marker:
