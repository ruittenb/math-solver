
/**
 * http://oeis.org/wiki/List_of_LaTeX_mathematical_symbols
 */

let table = Js.Dict.fromArray([
    ("∅", "\\varnothing"),
    ("ℙ", "\\mathbb{P}"),
    ("ℕ", "\\N"),
    ("ℤ", "\\Z"),
    ("ℚ", "\\Q"),
    ("𝔸", "\\mathbb{A}"),
    ("ℝ", "\\R"),
    ("ℂ", "\\mathbb{C}"),
    ("ℍ", "\\mathbb{H}"),
    ("𝕆", "\\mathbb{O}"),
    ("𝕊", "\\mathbb{S}"),
    ("∈", "\\in"),
    ("∉", "\\notin"),
    ("⊂", "\\subset"),
    ("∪", "\\cup"),
    ("∩", "\\cap"),
    ("∀", "\\forall"),
    ("∃", "\\exists"),
    ("∄", "\\nexists"),
    ("¬", "\\neg"),
    ("∨", "\\lor"),
    ("∧", "\\land"),
    ("⇒", "\\implies"),
    ("⇔", "\\iff"),
    ("ℏ", "\\hbar"),
    ("⊗", "\\otimes"),
    ("⊕", "\\oplus"),
    ("∇", "\\nabla"),
    ("∂", "\\partial")
])

let lookupTex = (str: string): string => {
    switch Js.Dict.get(table, str) {
        | Some(texString) => texString ++ " "
        | None            => str
    }
}

// vim: set ts=4 sw=4 et list nu fdm=marker:
