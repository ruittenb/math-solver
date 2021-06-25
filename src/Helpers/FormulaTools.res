
/** ****************************************************************************
 * FormulaTools
 */

open Types

let flipSign = (sign: sign): sign => {
    switch sign {
        | Plus      => Minus
        | Minus     => Plus
        | PlusMinus => MinusPlus
        | MinusPlus => PlusMinus
    }
}

let pairWithSign = (~sign=Plus, n: int): (sign, int) => {
    if n < 0 {
        (flipSign(sign), -n)
    } else {
        (sign, n)
    }
}

let fractionPrimitiveExpressionToOption = (expression: expression): option<fractionPrimitive> => {
    switch expression {
        | FractionPrimitiveExpression(fraction) => Some(fraction)
        | _ => None
    }
}

/** ****************************************************************************
 * Fractions
 */

let rec _calculateLeastCommonMultiple = (firstA: int, firstB: int, a: int, b: int): int => {
    if a === b {
        a
    } else if a < b {
        _calculateLeastCommonMultiple(firstA, firstB, a + firstA, b)
    } else {
        _calculateLeastCommonMultiple(firstA, firstB, a, b + firstB)
    }
}

let findLeastCommonMultiple = (a: int, b: int): int => {
    _calculateLeastCommonMultiple(a, b, a, b)
}

// Note: integer, numerator and denominator are all > 0
let addFractions = (fraction1: fractionPrimitive, fraction2: fractionPrimitive): fractionPrimitive => {
    if fraction1.integer < 0
    || fraction1.numerator < 0
    || fraction1.denominator < 0
    || fraction2.integer < 0
    || fraction2.numerator < 0
    || fraction2.denominator < 0
    {
        // Should not happen
        Js.Exn.raiseRangeError("[addFractions: integer, numerator and denominator must all be positive]")
    }
    // i + n/d => (id + n) / d
    let vulgarNumerator1: int = fraction1.integer * fraction1.denominator + fraction1.numerator
    let vulgarNumerator2: int = fraction2.integer * fraction2.denominator + fraction2.numerator
    let commonDenominator: int = findLeastCommonMultiple(fraction1.denominator, fraction2.denominator)
    let multiplier1: int = commonDenominator / fraction1.denominator
    let multiplier2: int = commonDenominator / fraction2.denominator
    //   a + b = add magnitudes, use sign of first fraction
    // - a - b = add magnitudes, use sign of first fraction
    //   a - b = subtract magnitudes, use sign of result
    // - a + b = subtract magnitudes, use sign of result flipped
    let (resultingSign, commonNumerator) =
        if fraction1.sign === fraction2.sign {
            (fraction1.sign, vulgarNumerator1 * multiplier1 + vulgarNumerator2 * multiplier2)
        } else if fraction1.sign === Plus { // fraction2.sign is Minus
            (vulgarNumerator1 * multiplier1 - vulgarNumerator2 * multiplier2)->pairWithSign
        } else { // fraction1.sign is Minus, fraction2.sign is Plus
            (vulgarNumerator2 * multiplier2 - vulgarNumerator1 * multiplier1)->pairWithSign
        }
    {
        sign: resultingSign,
        integer: 0,
        numerator: commonNumerator,
        denominator: commonDenominator
    }
}

/** ****************************************************************************
 * Powers
 */

let isPowerBaseConstant = (power: power): bool => {
    switch power.base {
        | IntPrimitiveExpression(_)
        | FloatPrimitiveExpression(_)
        | FractionPrimitiveExpression(_) => true
        | _ => false
    }
}

