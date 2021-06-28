
/** ****************************************************************************
 * Helper: TypeTools
 */

open Types

// option helpers
let oWithDefault = (opt: option<'t>, default: 't) => {
    switch opt {
        | None        => default
        | Some(value) => value
    }
}

let oMap2 = (opt1: option<'t>, opt2: option<'t>, fn: ('t, 't) => 'v): option<'v> => {
    switch opt1 {
        | None       => None
        | Some(val1) =>
            switch opt2 {
                | None       => None
                | Some(val2) => Some(fn(val1, val2))
            }
    }
}

let oAndThen2 = (opt1: option<'t>, opt2: option<'t>, fn: ('t, 't) => option<'v>): option<'v> => {
    switch opt1 {
        | None       => None
        | Some(val1) =>
            switch opt2 {
                | None       => None
                | Some(val2) => fn(val1, val2)
            }
    }
}

/** ****************************************************************************
 */

// either helpers
let eMap2 = (opt1: either<'t, 'v>, opt2: either<'t, 'v>, fn: ('v, 'v) => 'w): either<'t, 'w> => {
    switch opt1 {
        | Left(_)     => opt1
        | Right(val1) =>
            switch opt2 {
                | Left(_)     => opt2
                | Right(val2) => Right(fn(val1, val2))
            }
    }
}

