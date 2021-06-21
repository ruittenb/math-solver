
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

type floatPrimitive = {
    sign: sign,
    primitive: float
}

type primitive =
    | VarPrimitive(varPrimitive)
    | IntPrimitive(intPrimitive)
    | FloatPrimitive(floatPrimitive)

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

and varFraction = {
    sign: sign,
    numerator: expression,
    denominator: expression
}

and constFraction = {
    sign: sign,
    integer: intPrimitive,
    numerator: intPrimitive,
    denominator: intPrimitive
}

and fraction =
    | VarFraction(varFraction)
    | ConstFraction(constFraction)

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
    | PrimitiveExpression(primitive)
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

type formula =
    | LogicalOr(logicalOr)
    | Equation(equation)
    | Text(string)

// vim: set ts=4 sw=4 et list nu fdm=marker:
