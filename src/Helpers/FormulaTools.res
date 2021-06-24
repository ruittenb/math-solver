
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

let isPowerBaseConstant = (power: power): bool => {
    switch power.base {
        | IntPrimitiveExpression(_)
        | FloatPrimitiveExpression(_)
        | FractionPrimitiveExpression(_) => true
        | _ => false
    }
}

