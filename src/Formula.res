
/** ****************************************************************************
 * Formula: Constructors and conversions for formulas
 */

open Types

let _flipSign = (sign: sign): sign => {
    switch sign {
        | Plus      => Minus
        | Minus     => Plus
        | PlusMinus => MinusPlus
        | MinusPlus => PlusMinus
    }
}

/*
let _withDefault = (opt: option<'t>, default: 't) => {
    switch opt {
        | Some(value) => value
        | None        => default
    }
}
*/

/** ****************************************************************************
 * Constructors
 */

// For consistency. You may also use TextExpression(text)
let createTextExpression = (text: string): expression => {
    text->TextExpression
}

let createVarPrimitiveExpression = (
    ~subscript: option<string> = ?,
    ~subscriptFontStyle: fontStyle = Default,
    value: string
): expression => {
    if Js.String2.substring(value, ~from=0, ~to_=0) === "-" {
        VarPrimitiveExpression({
            sign: Minus,
            value: value->Js.String2.sliceToEnd(~from=1),
            subscript,
            subscriptFontStyle
        })
    } else {
        VarPrimitiveExpression({
            sign: Plus,
            value,
            subscript,
            subscriptFontStyle
        })
    }
}

let createIntPrimitiveExpression = (~sign: sign = Plus, value: int): expression => {
    if value < 0 {
        IntPrimitiveExpression({ sign: _flipSign(sign), value: -value })
    } else {
        IntPrimitiveExpression({ sign: sign, value: value })
    }
}

let createFractionPrimitiveExpression = (integer: int, numerator: int, denominator: int): expression => {
    if integer < 0 {
        FractionPrimitiveExpression({
            sign       : Minus,
            integer    : -integer,
            numerator  : numerator,
            denominator: denominator,
        })
    } else {
        FractionPrimitiveExpression({
            sign       : Plus,
            integer    : integer,
            numerator  : numerator,
            denominator: denominator,
        })
    }
}

let createFloatPrimitiveExpression = (value: float): expression => {
    if value < 0. {
        FloatPrimitiveExpression({ sign: Minus, value: -.value })
    } else {
        FloatPrimitiveExpression({ sign: Plus, value })
    }
}

let createSumExpression = (terms: array<expression>): expression => {
    SumExpression({ terms: terms })
}

let createProductExpression = (~sign: sign = Plus, factors: array<expression>): expression => {
    ProductExpression({ sign, factors })
}

let createFractionExpression = (~sign: sign = Plus, numerator: expression, denominator: expression): expression => {
    FractionExpression({ sign, numerator, denominator })
}

let createPowerExpression = (~sign: sign = Plus, base: expression, exponent: expression): expression => {
    PowerExpression({
        sign    : sign,
        base    : base,
        exponent: exponent,
    })
}

let createSquarerootExpression = (~sign: sign = Plus, radicand: expression): expression => {
    SquarerootExpression({
        sign    : sign,
        radicand: radicand,
    })
}

let createRootExpression = (~sign: sign = Plus, index: expression, radicand: expression): expression => {
    RootExpression({
        sign    : sign,
        index   : index,
        radicand: radicand,
    })
}

// LaTeX: \lfloor \rfloor \lceil \rceil

let createEquation = (members: array<expression>): equation => {
    { members: members }
}

let createEquationFormula = (members: array<expression>): formula => {
    Equation(createEquation(members))
}

let createLogicalOrFormula = (atoms: array<equation>): formula => {
    LogicalOr({ atoms: atoms })
}
