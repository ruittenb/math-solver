
/** ****************************************************************************
 * Formula: Constructors and conversions for formulas
 */

open Types

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
    let (correctedSign, correctedInt) = FormulaTools.pairWithSign(~sign=sign, value)
    IntPrimitiveExpression({ sign: correctedSign, value: correctedInt })
    /*
    if value < 0 {
        IntPrimitiveExpression({ sign: FormulaTools.flipSign(sign), value: -value })
    } else {
        IntPrimitiveExpression({ sign: sign, value: value })
    }
    */
}

// the sign of numerator and denominator will be disregarded.
let createFractionPrimitiveExpression = (
    ~sign: sign = Plus,
    integer: int,
    numerator: int,
    denominator: int
): expression => {
    if denominator === 0 {
        let message = "[createFractionPrimitiveExpression: denominator must not be zero]"
        createTextExpression(message)
    } else {
        let correctedSign = if integer < 0 {
            FormulaTools.flipSign(sign)
        } else {
            sign
        }
        FractionPrimitiveExpression({
            sign       : correctedSign,
            integer    : Js.Math.abs_int(integer),
            numerator  : Js.Math.abs_int(numerator),
            denominator: Js.Math.abs_int(denominator)
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
