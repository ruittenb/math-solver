
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

let signedIntValue = (primitive: intPrimitive) => {
    if primitive.sign === Plus { primitive.value } else { -primitive.value } // FIXME what about PlusMinus?
}

/** ****************************************************************************
 * Integers
 */

type intPrimitiveEither = either<expression, intPrimitive>

let intPrimitiveExpressionToEither = (expression: expression): intPrimitiveEither => {
    switch expression {
        | IntPrimitiveExpression(int) => Right(int)
        | value => Left(value)
    }
}

let intEitherToExpression = (wrappedExpression: intPrimitiveEither): expression => {
    switch wrappedExpression {
        | Left(value) => value
        | Right(intPrimitive) => IntPrimitiveExpression(intPrimitive)
    }
}

let addIntPrimitives = (a: intPrimitive, b: intPrimitive): intPrimitive => {
    let (sign, value) = pairWithSign(a.value + b.value) // TODO fix sign
    { sign, value }
}

let compactIntPrimitives = (lijssie: array<intPrimitiveEither>): array<intPrimitiveEither> => {
    let dummyExpression = TextExpression([])
    let (lastElement, newLijssie) = lijssie->Js.Array2.reducei(
        (
            (lastElement: intPrimitiveEither, newLijssie: array<intPrimitiveEither>),
            currentElement: intPrimitiveEither,
            index: int
        ) => {
            if index === 0 {
                (currentElement, newLijssie)
            } else {
                let sumElement = TypeTools.eMap2(lastElement, currentElement, addIntPrimitives)
                switch sumElement {
                    | Right(_) => ( sumElement, newLijssie)
                    | Left(_) => (
                        currentElement,
                        newLijssie->Js.Array2.concat([ lastElement ])
                    )
                }
            }
        },
        (Left(dummyExpression), [])
    )
    newLijssie->Js.Array2.concat([ lastElement ])
}


/** ****************************************************************************
 * Fractions
 */

// Repeatedly take the next multiple of the smallest number until they are equal
let rec _calculateLeastCommonMultiple = (firstA: int, firstB: int, a: int, b: int): int => {
    if a === b {
        a
    } else if a < b {
        _calculateLeastCommonMultiple(firstA, firstB, a + firstA, b)
    } else {
        _calculateLeastCommonMultiple(firstA, firstB, a, b + firstB)
    }
}

// https://en.wikipedia.org/wiki/Least_common_multiple#Using_a_simple_algorithm
let findLeastCommonMultiple = (a: int, b: int): int => {
    _calculateLeastCommonMultiple(a, b, a, b)
}

// Euclidean algorithm
// https://en.wikipedia.org/wiki/Greatest_common_divisor#Euclidean_algorithm
let rec findGreatestCommonDivisor = (a: int, b: int): int => {
    if b === 0 {
        a
    } else {
        findGreatestCommonDivisor(b, mod(a, b))
    }
}

// Note: integer, numerator and denominator are all > 0
let addFractionPrimitives = (fraction1: fractionPrimitive, fraction2: fractionPrimitive): fractionPrimitive => {
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
        } else if fraction1.sign === Plus { // fraction2.sign is Minus // FIXME what about PlusMinus?
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

type fractionPrimitiveEither = either<expression, fractionPrimitive>

let fractionPrimitiveExpressionToEither = (expression: expression): fractionPrimitiveEither => {
    switch expression {
        | FractionPrimitiveExpression(fraction) => Right(fraction)
        | value => Left(value)
    }
}

let fractionEitherToExpression = (wrappedExpression: fractionPrimitiveEither): expression => {
    switch wrappedExpression {
        | Left(value) => value
        | Right(fractionPrimitive) => FractionPrimitiveExpression(fractionPrimitive)
    }
}

let compactFractionPrimitives = (lijssie: array<fractionPrimitiveEither>): array<fractionPrimitiveEither> => {
    let dummyExpression = TextExpression([])
    let (lastElement, newLijssie) = lijssie->Js.Array2.reducei(
        (
            (lastElement: fractionPrimitiveEither, newLijssie: array<fractionPrimitiveEither>),
            currentElement: fractionPrimitiveEither,
            index: int
        ) => {
            if index === 0 {
                (currentElement, newLijssie)
            } else {
                let sumElement = TypeTools.eMap2(lastElement, currentElement, addFractionPrimitives)
                switch sumElement {
                    | Right(_) => ( sumElement, newLijssie)
                    | Left(_) => (
                        currentElement,
                        newLijssie->Js.Array2.concat([ lastElement ])
                    )
                }
            }
        },
        (Left(dummyExpression), [])
    )
    newLijssie->Js.Array2.concat([ lastElement ])
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

