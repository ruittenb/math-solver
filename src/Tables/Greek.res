
/**
 * http://oeis.org/wiki/List_of_LaTeX_mathematical_symbols
 */

let table = Js.Dict.fromArray([
    ("Α", "\\Alpha"),
    ("α", "\\alpha"),
    ("Β", "\\Beta"),
    ("β", "\\beta"),
    ("Γ", "\\Gamma"),
    ("γ", "\\gamma"),
    ("Δ", "\\Delta"),
    ("δ", "\\delta"),
    ("Ε", "\\Epsilon"),
    ("ϵ", "\\epsilon"),
    ("ε", "\\varepsilon"),
    ("Ζ", "\\Zeta"),
    ("ζ", "\\zeta"),
    ("Η", "\\Eta"),
    ("η", "\\eta"),
    ("Θ", "\\Theta"),
    ("θ", "\\theta"),
    ("ϑ", "\\vartheta"),
    ("Ι", "\\Iota"),
    ("ι", "\\iota"),
    ("Κ", "\\Kappa"),
    ("κ", "\\kappa"),
    ("ϰ", "\\varkappa"),
    ("Λ", "\\Lambda"),
    ("λ", "\\lambda"),
    ("Μ", "\\Mu"),
    ("μ", "\\mu"),
    ("Ν", "\\Nu"),
    ("ν", "\\nu"),
    ("Ξ", "\\Xi"),
    ("ξ", "\\xi"),
    ("Ο", "\\Omicron"),
    ("ο", "\\omicron"),
    ("Π", "\\Pi"),
    ("π", "\\pi"),
    ("ϖ", "\\varpi"),
    ("Ρ", "\\Rho"),
    ("ρ", "\\rho"),
    ("ϱ", "\\varrho"),
    ("Σ", "\\Sigma"),
    ("σ", "\\sigma"),
    ("ς", "\\varsigma"),
    ("Τ", "\\Tau"),
    ("τ", "\\tau"),
    ("Υ", "\\Upsilon"),
    ("υ", "\\upsilon"),
    ("Φ", "\\Phi"),
    ("ϕ", "\\phi"),
    ("φ", "\\varphi"),
    ("Χ", "\\Chi"),
    ("χ", "\\chi"),
    ("Ψ", "\\Psi"),
    ("ψ", "\\psi"),
    ("Ω", "\\Omega"),
    ("ω", "\\omega"),
])

let lookupTex = (str: string): string => {
    switch Js.Dict.get(table, str) {
        | Some(texString) => " " ++ texString ++ " "
        | None            => str
    }
}

// vim: set ts=4 sw=4 et list nu fdm=marker:
