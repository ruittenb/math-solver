
/** ****************************************************************************
 * Helper: TypeTools
 */

let _withDefault = (opt: option<'t>, default: 't) => {
    switch opt {
        | Some(value) => value
        | None        => default
    }
}
