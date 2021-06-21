
/** ****************************************************************************
 * Types: Type declarations
 */

// suppress warnings like "the label 'sign' is defined
// in both types 'product' and 'power'" etc.
@@warning("-30")

/** ****************************************************************************
 * Simples
 */

type sign =
    | Plus
    | Minus
    | PlusMinus
    | MinusPlus

type varPrimitive = {
    sign: sign,
    primitive: string,
    subscript: option<string>
}

type intPrimitive = {
    sign: sign,
    primitive: int
}

and fractionPrimitive = {
    sign: sign,
    integer: int,
    numerator: int,
    denominator: int
}

type floatPrimitive = {
    sign: sign,
    primitive: float
}

/** ****************************************************************************
 * Expression and its components
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

// possible extensions: absolute values

and expression =
    | TextExpression(string)
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
    | Text(string)

// vim: set ts=4 sw=4 et list nu fdm=marker:
