
/** ****************************************************************************
 * MultiplicationSymbol: Determine the correct symbol to display for multiplication
 */

open Types

type multiplicationSymbol =
    | Cross    // ×  \times
    | Dot      // ·  \cdot
    | NoSymbol

let _tableRowText = Js.Dict.fromArray([
    ("TextExpression",              NoSymbol),
    ("VarPrimitiveExpression",      NoSymbol),
    ("IntPrimitiveExpression",      NoSymbol),
    ("FractionPrimitiveExpression", NoSymbol),
    ("FloatPrimitiveExpression",    NoSymbol),
    ("SumExpression",               NoSymbol),
    ("ProductExpression",           NoSymbol),
    ("FractionExpression",          NoSymbol),
    ("PowerExpression",             NoSymbol),
    ("SquareRootExpression",        NoSymbol),
    ("RootExpression",              NoSymbol),
])
let _tableRowSum = Js.Dict.fromArray([
    ("TextExpression",              NoSymbol),
    ("VarPrimitiveExpression",      NoSymbol),
    ("IntPrimitiveExpression",      Dot),
    ("FractionPrimitiveExpression", Dot),
    ("FloatPrimitiveExpression",    Dot),
    ("SumExpression",               NoSymbol),
    ("ProductExpression",           NoSymbol),
    ("FractionExpression",          NoSymbol),
    ("PowerExpression",             NoSymbol),
    ("SquareRootExpression",        NoSymbol),
    ("RootExpression",              NoSymbol),
])

let _tableRowPower = Js.Dict.fromArray([
    ("TextExpression",              NoSymbol),
    ("VarPrimitiveExpression",      NoSymbol),
    ("IntPrimitiveExpression",      Dot),
    ("FractionPrimitiveExpression", Dot),
    ("FloatPrimitiveExpression",    Dot),
    ("SumExpression",               NoSymbol),
    ("ProductExpression",           Dot),
    ("FractionExpression",          Dot),
    ("PowerExpression",             NoSymbol),
    ("SquareRootExpression",        NoSymbol),
    ("RootExpression",              NoSymbol),
])

let _tableRowOther = Js.Dict.fromArray([
    ("TextExpression",              NoSymbol),
    ("VarPrimitiveExpression",      NoSymbol),
    ("IntPrimitiveExpression",      Dot),
    ("FractionPrimitiveExpression", Dot),
    ("FloatPrimitiveExpression",    Dot),
    ("SumExpression",               NoSymbol),
    ("ProductExpression",           Dot),
    ("FractionExpression",          Dot),
    ("PowerExpression",             Dot),
    ("SquareRootExpression",        NoSymbol),
    ("RootExpression",              NoSymbol),
])

let _table = Js.Dict.fromArray([
    ("TextExpression",              _tableRowText),
    ("VarPrimitiveExpression",      _tableRowOther),
    ("IntPrimitiveExpression",      _tableRowOther),
    ("FractionPrimitiveExpression", _tableRowOther),
    ("FloatPrimitiveExpression",    _tableRowOther),
    ("SumExpression",               _tableRowSum),
    ("ProductExpression",           _tableRowOther),
    ("FractionExpression",          _tableRowOther),
    ("PowerExpression",             _tableRowPower),
    ("SquareRootExpression",        _tableRowPower),
    ("RootExpression",              _tableRowPower),
])

let _multiplicationSymbolLookupIndex = (factor: expression): string => {
    switch factor {
        | TextExpression(_)              => "TextExpression"
        | VarPrimitiveExpression(_)      => "VarPrimitiveExpression"
        | IntPrimitiveExpression(_)      => "IntPrimitiveExpression"
        | FractionPrimitiveExpression(_) => "FractionPrimitiveExpression"
        | FloatPrimitiveExpression(_)    => "FloatPrimitiveExpression"
        | SumExpression(_)               => "SumExpression"
        | ProductExpression(_)           => "ProductExpression"
        | FractionExpression(_)          => "FractionExpression"
        | PowerExpression({ base })      => "PowerExpression"
        | SquarerootExpression(_)        => "SquarerootExpression"
        | RootExpression(_)              => "RootExpression"
    }
}

let _andThenGet = (maybeDict: option<Js.Dict.t<'m>>, index: string): option<'m> => {
    switch maybeDict {
        | Some(dict) => dict->Js.Dict.get(index)
        | None       => None
    }
}

let lookupTex = (factorLeft: expression, factorRight: expression): string => {
    let leftIndex  = _multiplicationSymbolLookupIndex(factorLeft)
    let rightIndex = _multiplicationSymbolLookupIndex(factorRight)

    let maybeSymbol = Some(_table)
        ->_andThenGet(leftIndex)
        ->_andThenGet(rightIndex)

    switch maybeSymbol {
        | Some(Cross)    => " \\times "
        | Some(Dot)      => " \\cdot "
        | Some(NoSymbol) => ""
        | None           => ""
    }
}

// vim: set ts=4 sw=4 et list nu fdm=marker:
