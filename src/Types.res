
/** ****************************************************************************
 * Types: Type declarations
 */

// suppress warnings like "the label 'sign' is defined
// in both types 'product' and 'power'" etc.
@@warning("-30")

type either<'t, 'v> =
    | Left('t)
    | Right('v)

/** ****************************************************************************
 * Data types
 */

type fontStyle =
    | Upright
    | Italic
    | Default // Upright for digits, Italic for letters

type sign =
    | Plus
    | Minus
    | PlusMinus
    | MinusPlus

/** ****************************************************************************
 * Primitives (leaf nodes)
 */

type varPrimitive = {
    sign: sign,
    value: string,
    subscript: option<string>, // option<(string, fontStyle)>
    subscriptFontStyle: fontStyle
}

type intPrimitive = {
    sign: sign,
    value: int       // always positive
}

and fractionPrimitive = {
    sign: sign,
    integer: int,    // always positive
    numerator: int,  // always positive
    denominator: int // always positive
}

type floatPrimitive = {
    sign: sign,
    value: float     // always positive
}

/** ****************************************************************************
 * Expressions and their components
 */

type rec sum = {
    terms: array<expression>
}

and product = {
    sign: sign,
    factors: array<expression>
}

and fraction = {
    sign: sign,
    numerator: expression,
    denominator: expression
}

and power = {
    sign: sign,
    base: expression,
    exponent: expression
}

and squareroot = {
    sign: sign,
    radicand: expression
}

and root = {
    sign: sign,
    index: expression,
    radicand: expression
}

// possible extensions: absolute values, floor, ceiling
// vectors: \overrightarrow \vec
// x element of R etc.

and expression =
    | TextExpression(array<string>)
    | VarPrimitiveExpression(varPrimitive)
    | IntPrimitiveExpression(intPrimitive)
    | FractionPrimitiveExpression(fractionPrimitive)
    | FloatPrimitiveExpression(floatPrimitive)
    | SumExpression(sum)
    | ProductExpression(product)
    | FractionExpression(fraction)
    | PowerExpression(power)
    | RootExpression(root)
    | SquarerootExpression(squareroot)

/** ****************************************************************************
 * Formula in terms of Expressions
 */

type equation = {
    members: array<expression>
}

type logicalOr = {
    atoms: array<equation>
}

// TODO maybe add numbering and annotation?
// 3.   x^2 - 3 = 6              | +3
type formula =
    | LogicalOr(logicalOr)
    | Equation(equation)
    | Text(array<string>)

/** ****************************************************************************
 * Either types (used while cleaning)
 */

//type varPrimitiveEither = either<expression, fractionPrimitive>
type floatPrimitiveEither = either<expression, floatPrimitive>

/** ****************************************************************************
 * Steps to solve
 */

type step =
    | AddConstant(option<float>)      // +n both sides
    | MultiplyConstant(option<float>) // *n both sides
    | Power(option<float>)            // ^n both sides
    | TakeRoot(option<float>)         // n√ both sides
    | Factorize                       // x^2 + x => x (x + 1)
    | Distribute                      // x (x + 2) => x^2 + 2x
    | Gather                          // x^2 + 4 + x - 3 + 5x => x^2 + 6x + 1
    | Reverse                         // a = b => b = a

// vim: set ts=4 sw=4 et list nu fdm=marker:
