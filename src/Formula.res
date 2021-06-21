
/** ****************************************************************************
 * Formula: Constructors and conversions for formulas
 */

open Types

let toggleSign = (sign: sign): sign => {
    switch sign {
        | Plus      => Minus
        | Minus     => Plus
        | PlusMinus => MinusPlus
        | MinusPlus => PlusMinus
    }
}

/** ****************************************************************************
 * Shortcuts for conversions
 */

let varPrimitiveExpression = (n: varPrimitive) => n->VarPrimitive->PrimitiveExpression
let intPrimitiveExpression = (n: intPrimitive) => n->IntPrimitive->PrimitiveExpression
let floatPrimitiveExpression = (n: floatPrimitive) => n->FloatPrimitive->PrimitiveExpression

let varFractionExpression = (n: varFraction) => n->VarFraction->FractionExpression
let constFractionExpression = (n: constFraction) => n->ConstFraction->FractionExpression

/** ****************************************************************************
 * Constructors
 */

// For consistency. You may also use TextExpression(text)
let createTextExpression = (text: string): expression => {
    text->TextExpression
}

let createVarPrimitive = (variable: string, subscript: option<string>): primitive => {
    if Js.String2.substring(variable, ~from=0, ~to_=0) === "-" {
        let posVariable = variable->Js.String2.sliceToEnd(~from=1)
        VarPrimitive({ sign: Minus, primitive: posVariable, subscript })
    } else {
        VarPrimitive({ sign: Plus, primitive: variable, subscript })
    }
}

let createFloatPrimitive = (n: float): primitive => {
    if n < 0. {
        FloatPrimitive({ sign: Minus, primitive: -.n })
    } else {
        FloatPrimitive({ sign: Plus, primitive: n })
    }
}

let createintPrimitive = (n: int): intPrimitive => {
    if n < 0 {
        { sign: Minus, primitive: -n }
    } else {
        { sign: Plus, primitive: n }
    }
}

let createIntPrimitive = (n: int): primitive => {
    createintPrimitive(n)->IntPrimitive
}

let createSumExpression = (terms: array<expression>) => {
    SumExpression({ terms: terms })
}

let createProductExpression = (~sign: sign = Plus, factors: array<expression>) => {
    ProductExpression({ sign: sign, factors: factors })
}

let createVarFraction = (~sign: sign = Plus, numerator: expression, denominator: expression) => {
    VarFraction({ sign, numerator, denominator })
}

let createConstFraction = (~sign: sign, integer: int, numerator: int, denominator: int) => {
    ConstFraction({
        sign       : sign,
        integer    : integer->createintPrimitive,
        numerator  : numerator->createintPrimitive,
        denominator: denominator->createintPrimitive
    })
}

let createPowerExpression = (~sign: sign = Plus, base: expression, exponent: expression) => {
    PowerExpression({
        sign    : sign,
        base    : base,
        exponent: exponent,
    })
}

let createSquarerootExpression = (~sign: sign = Plus, radicand: expression) => {
    SquarerootExpression({
        sign    : sign,
        radicand: radicand,
    })
}

let createRootExpression = (~sign: sign = Plus, index: expression, radicand: expression) => {
    RootExpression({
        sign    : sign,
        index   : index,
        radicand: radicand,
    })
}

let createEquation = (members: array<expression>) => {
    Equation({ members: members })
}
