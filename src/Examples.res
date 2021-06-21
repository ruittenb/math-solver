
/** ****************************************************************************
 * Examples: Example formulas
 */

open Types
open Formula

let examples: array<formula> = [
    // x = 1/2 + 1/3
    Equation({
        members: [
            varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None }),
            SumExpression({
                terms: [
                    constFractionExpression({
                        sign: Plus,
                        integer: { sign: Plus, primitive: 0 },
                        numerator: { sign: Plus, primitive: 1 },
                        denominator: { sign: Plus, primitive: 2 }
                    }),
                    constFractionExpression({
                        sign: Plus,
                        integer: { sign: Plus, primitive: 0 },
                        numerator: { sign: Plus, primitive: 1 },
                        denominator: { sign: Plus, primitive: 3 },
                    }),
                ]
            })
        ]
    }),
    // x = 3 2/9 - 1 1/12
    Equation({
        members: [
            varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None }),
            SumExpression({
                terms: [
                    constFractionExpression({
                        sign: Plus,
                        integer: { sign: Plus, primitive: 3 },
                        numerator: { sign: Plus, primitive: 2 },
                        denominator: { sign: Plus, primitive: 9 }
                    }),
                    constFractionExpression({
                        sign: Minus,
                        integer: { sign: Plus, primitive: 1 },
                        numerator: { sign: Plus, primitive: 1 },
                        denominator: { sign: Plus, primitive: 12 },
                    }),
                    constFractionExpression({
                        sign: Plus,
                        integer: { sign: Plus, primitive: 0 },
                        numerator: { sign: Plus, primitive: 1 },
                        denominator: { sign: Plus, primitive: 6 },
                    }),
                ]
            })
        ]
    }),
    // x (x + 1) = 0
    Equation({
        members: [
            ProductExpression({
                sign: Plus,
                factors: [
                    varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None }),
                    SumExpression({
                        terms: [
                            varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None }),
                            floatPrimitiveExpression({ sign: Plus, primitive: 1. })
                        ]
                    })
                ]
            }),
            floatPrimitiveExpression({ sign: Plus, primitive: 0. })
        ]
    }),
    // 2x^2 + 3x - 1 = 0
    Equation({
        members: [
            SumExpression({
                terms: [
                    ProductExpression({
                        sign: Plus,
                        factors: [
                            floatPrimitiveExpression({ sign: Plus, primitive: 2. }),
                            PowerExpression({
                                sign: Plus,
                                base: {
                                    varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None })
                                },
                                exponent: {
                                    intPrimitiveExpression({ sign: Plus, primitive: 2 })
                                }
                            })
                        ]
                    }),
                    ProductExpression({
                        sign: Plus,
                        factors: [
                            intPrimitiveExpression({ sign: Plus, primitive: 3 }),
                            varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None })
                        ]
                    }),
                    intPrimitiveExpression({ sign: Minus, primitive: 1 })
                ]
            }),
            intPrimitiveExpression({ sign: Plus, primitive: 0 })
        ]
    }),
    // x = 1 v x = -4
    LogicalOr({
        atoms: [{
            members: [
                varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None }),
                floatPrimitiveExpression({ sign: Plus, primitive: 1. })
            ]
        }, {
            members: [
                varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None }),
                floatPrimitiveExpression({ sign: Minus, primitive: 4. })
            ]
        }]
    }),
    // x = y = ±3√2
    Equation({
        members: [
            varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None }),
            varPrimitiveExpression({ sign: Plus, primitive: "y", subscript: None }),
            ProductExpression({
                sign: PlusMinus,
                factors: [
                    floatPrimitiveExpression({ sign: Plus, primitive: 3. }),
                    SquarerootExpression({
                        sign: Plus,
                        radicand: floatPrimitiveExpression({ sign: Plus, primitive: 2. })
                    })
                ]
            })
        ]
    }),
    // φ = 1/2 + 1/2√5
    Equation({
        members: [
            varPrimitiveExpression({ sign: Plus, primitive: "φ", subscript: None }),
            SumExpression({
                terms: [
                    constFractionExpression({
                        sign: Plus,
                        integer: { sign: Plus, primitive: 0 },
                        numerator: { sign: Plus, primitive: 1 },
                        denominator: { sign: Plus, primitive: 2 },
                    }),
                    ProductExpression({
                        sign: Plus,
                        factors: [
                            constFractionExpression({
                                sign: Plus,
                                integer: { sign: Plus, primitive: 0 },
                                numerator: { sign: Plus, primitive: 1 },
                                denominator: { sign: Plus, primitive: 2 },
                            }),
                            SquarerootExpression({
                                sign: Plus,
                                radicand: floatPrimitiveExpression({ sign: Plus, primitive: 5. })
                            })
                        ]
                    })
                ]
            })
        ]
    }),
    // V = 4/3 πr^3
    Equation({
        members: [
            varPrimitiveExpression({ sign: Plus, primitive: "V", subscript: None }),
            ProductExpression({
                sign: Plus,
                factors: [
                    constFractionExpression({
                        sign: Plus,
                        integer: { sign: Plus, primitive: 0 },
                        numerator: { sign: Plus, primitive: 4 },
                        denominator: { sign: Plus, primitive: 3 },
                    }),
                    varPrimitiveExpression({ sign: Plus, primitive: "π", subscript: None }),
                    PowerExpression({
                        sign: Plus,
                        base: varPrimitiveExpression({ sign: Plus, primitive: "r", subscript: None }),
                        exponent: floatPrimitiveExpression({ sign: Plus, primitive: 3. })
                    })
                ]
            })
        ]
    }),
    // x = ∛27
    Equation({
        members: [
            varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None }),
            RootExpression({
                sign: Plus,
                index: floatPrimitiveExpression({ sign: Plus, primitive: 3. }),
                radicand: floatPrimitiveExpression({ sign: Plus, primitive: 27. })
            })
        ]
    }),
    // y = (3x)^5
    Equation({
        members: [
            varPrimitiveExpression({ sign: Plus, primitive: "y", subscript: None }),
            PowerExpression({
                sign: Plus,
                base: {
                    ProductExpression({
                        sign: Plus,
                        factors: [
                            floatPrimitiveExpression({ sign: Plus, primitive: 3. }),
                            varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None })
                        ]
                    })
                },
                exponent: {
                    floatPrimitiveExpression({ sign: Plus, primitive: 5. })
                }
            })
        ]
    }),
    // x = (x + 5) √ 3125
    Equation({
        members: [
            varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None }),
            RootExpression({
                sign: Plus,
                index: SumExpression({
                    terms: [
                        varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: None }),
                        floatPrimitiveExpression({ sign: Plus, primitive: 5. })
                    ]
                }),
                radicand: {
                    intPrimitiveExpression({ sign: Plus, primitive: 3125 })
                }
            })
        ]
    }),
    // Quadratic equation
    Equation({
        members: [
            varPrimitiveExpression({ sign: Plus, primitive: "x", subscript: Some("1,2") }),
            varFractionExpression({
                sign: Plus,
                numerator: SumExpression({
                    terms: [
                        varPrimitiveExpression({ sign: Minus, primitive: "b", subscript: None }),
                        SquarerootExpression({
                            sign: PlusMinus,
                            radicand: SumExpression({
                                terms: [
                                    PowerExpression({
                                        sign: Plus,
                                        base: varPrimitiveExpression({ sign: Plus, primitive: "b", subscript: None }),
                                        exponent: floatPrimitiveExpression({ sign: Plus, primitive: 2. })
                                    }),
                                    ProductExpression({
                                        sign: Minus,
                                        factors: [
                                            floatPrimitiveExpression({ sign: Plus, primitive: 4. }),
                                            varPrimitiveExpression({ sign: Plus, primitive: "a", subscript: None }),
                                            varPrimitiveExpression({ sign: Plus, primitive: "c", subscript: None })
                                        ]
                                    })
                                ]
                            })
                        })
                    ]
                }),
                denominator: ProductExpression({
                    sign: Plus,
                    factors: [
                        floatPrimitiveExpression({ sign: Plus, primitive: 2. }),
                        varPrimitiveExpression({ sign: Plus, primitive: "a", subscript: None }),
                    ]

                })
            })
        ]
    })
]

// vim: set ts=4 sw=4 et list nu fdm=marker:
