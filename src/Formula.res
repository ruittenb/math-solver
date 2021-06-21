
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

/**
 * The lowercase *int* is on purpose: this does not return a primitive, but an intPrimitive
 */
let createintPrimitive = (n: int): intPrimitive => {
    if n < 0 {
        { sign: Minus, primitive: -n }
    } else {
        { sign: Plus, primitive: n }
    }
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

let power = (~sign: sign = Plus, base: float, exponent: float) => {
    PowerExpression({
        sign    : sign,
        base    : base    ->createFloatPrimitive->PrimitiveExpression,
        exponent: exponent->createFloatPrimitive->PrimitiveExpression,
    })
}

let squareroot = (~sign: sign = Plus, radicand: float) => {
    SquarerootExpression({
        sign    : sign,
        radicand: radicand->createFloatPrimitive->PrimitiveExpression
    })
}

let root = (~sign: sign = Plus, index: float, radicand: float) => {
    RootExpression({
        sign    : sign,
        index   : index   ->createFloatPrimitive->PrimitiveExpression,
        radicand: radicand->createFloatPrimitive->PrimitiveExpression
    })
}

