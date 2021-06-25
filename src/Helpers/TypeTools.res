
/** ****************************************************************************
 * Helper: TypeTools
 */

let withDefault = (opt: option<'t>, default: 't) => {
    switch opt {
        | Some(value) => value
        | None        => default
    }
}

let map2 = (opt1: option<'t>, opt2: option<'t>, fn: ('t, 't) => 'v): option<'v> => {
    switch opt1 {
        | None       => None
        | Some(val1) =>
            switch opt2 {
                | Some(val2) => Some(fn(val1, val2))
                | None       => None
            }
    }
}

let andThen2 = (opt1: option<'t>, opt2: option<'t>, fn: ('t, 't) => option<'v>): option<'v> => {
    switch opt1 {
        | None       => None
        | Some(val1) =>
            switch opt2 {
                | Some(val2) => fn(val1, val2)
                | None       => None
            }
    }
}

