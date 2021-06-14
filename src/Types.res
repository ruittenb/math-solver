
/* ****************************************************************************
 * declarations
 */

// suppress warnings like
// "the label 'sign' is defined in both types 'product' and 'power'" etc.
@@warning("-30")

type sign =
    | Plus
    | Minus
    | PlusMinus

type varPrimitive = {
    sign: sign,
    primitive: string,
    subscript: string
}

type constPrimitive = {
    sign: sign,
    primitive: float
}

type primitive =
    | VarPrimitive(varPrimitive)
    | ConstPrimitive(constPrimitive)

type rec sum = {
    terms: array<expression>
}
and product = {
    sign: sign,
    factors: array<expression>
}
and varFraction = {
    sign: sign,
    numerator: expression,
    denominator: expression
}
and constFraction = {
    sign: sign,
    integer: constPrimitive,
    numerator: constPrimitive,
    denominator: constPrimitive
}
and fraction =
	| VarFraction(varFraction)
	| ConstFraction(constFraction)
and power = {
    sign: sign,
    base: expression,
    exponent: expression
}
and root = {
    sign: sign,
    index: expression,
    radicand: expression
}
and squareroot = {
    sign: sign,
    radicand: expression
}
and expression =
    | TextExpression(string)
    | PrimitiveExpression(primitive)
    | SumExpression(sum)
    | ProductExpression(product)
    | FractionExpression(fraction)
    | PowerExpression(power)
    | RootExpression(root)
    | SquarerootExpression(squareroot)

type equation = {
    members: array<expression>
}

type logicalOr = {
    equations: array<equation>
}

type formula =
    | LogicalOr(logicalOr)
    | Equation(equation)
    | Text(string)

// conversions

let varPrimitiveExpression = (n: varPrimitive) => n->VarPrimitive->PrimitiveExpression
let constPrimitiveExpression = (n: constPrimitive) => n->ConstPrimitive->PrimitiveExpression

let varFractionExpression = (n: varFraction) => n->VarFraction->FractionExpression
let constFractionExpression = (n: constFraction) => n->ConstFraction->FractionExpression


/* ****************************************************************************
 * data
 */

let minusb: expression = varPrimitiveExpression({ sign: Minus, primitive: "b", subscript: "" })

let b2: expression = PowerExpression({
    sign: Plus,
    base: varPrimitiveExpression({ sign: Plus, primitive: "b", subscript: "" }),
    exponent: constPrimitiveExpression({ sign: Plus, primitive: 2. })
})

let four: expression = constPrimitiveExpression({ sign: Plus, primitive: 4. })
let a: expression = varPrimitiveExpression({ sign: Plus, primitive: "a", subscript: "" })
let c: expression = varPrimitiveExpression({ sign: Plus, primitive: "c", subscript: "" })
let two: expression = constPrimitiveExpression({ sign: Plus, primitive: 2. })

let abcNumerator: expression = SumExpression({
    terms: [
        minusb,
        SquarerootExpression({
            sign: PlusMinus,
            radicand: SumExpression({
                terms: [
                    b2,
                    ProductExpression({
                        sign: Minus,
                        factors: [ four, a, c ]
                    })
                ]
            })
        })
    ]
})

let abcDenominator: expression = ProductExpression({
    sign: Plus,
    factors: [ two, a ]
})

let abcLeft = varPrimitiveExpression({ sign: Minus, primitive: "x", subscript: "1,2" })
let abcRight = varFractionExpression({
    sign: Plus,
    numerator: abcNumerator,
    denominator: abcDenominator
})

let abcEquation = {
    members: [
        abcLeft,
        abcRight
    ]
}

Js.log(abcEquation)


/* vim: set ts=4 sw=4 et: */
