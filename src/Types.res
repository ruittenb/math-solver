
/** ****************************************************************************
 * Type declarations
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

type varPrimitive = {
    sign: sign,
    primitive: string,
    subscript: option<string>
}

type constPrimitive = {
    sign: sign,
    primitive: float
}

type primitive =
    | VarPrimitive(varPrimitive)
    | ConstPrimitive(constPrimitive)

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
    integer: constPrimitive, // TODO int?
    numerator: constPrimitive, // TODO int?
    denominator: constPrimitive // TODO int?
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

/** ****************************************************************************
 * Shortcuts for conversions
 */

let varPrimitiveExpression = (n: varPrimitive) => n->VarPrimitive->PrimitiveExpression
let constPrimitiveExpression = (n: constPrimitive) => n->ConstPrimitive->PrimitiveExpression

let varFractionExpression = (n: varFraction) => n->VarFraction->FractionExpression
let constFractionExpression = (n: constFraction) => n->ConstFraction->FractionExpression

// vim: set ts=4 sw=4 et list nu fdm=marker:
