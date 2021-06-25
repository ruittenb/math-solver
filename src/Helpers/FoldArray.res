
type mElement = option<int>
type mArray = array<mElement>

let lijst1: mArray = [ Some(1), Some(3), None, Some(5), None, Some(7), Some(9), Some(11), None ];
let lijst2: mArray = [ None, None, Some(-1), Some(-3), Some(-5) ]

let add = (v1: int, v2: int): int => { v1 + v2 }

let compact = (lijssie: mArray): mArray => {
    let (lastElement, newLijssie) = lijssie->Js.Array2.reducei(
        (
            (lastElement: mElement, newLijssie: mArray),
            currentElement: mElement,
            index: int
        ) => {
            if index === 0 {
                (currentElement, newLijssie)
            } else {
                let sumElement = TypeTools.map2(currentElement, lastElement, add)
                switch sumElement {
                    | Some(_) => ( sumElement, newLijssie)
                    | None => (
                        currentElement,
                        newLijssie->Js.Array2.concat([ lastElement ])
                    )
                }
            }
        },
        (None, [])
    )
    newLijssie->Js.Array2.concat([ lastElement ])
}

Js.log2("Original :", lijst1)
Js.log2("Compacted:", compact(lijst1))
Js.log2("Original :", lijst2)
Js.log2("Compacted:", compact(lijst2))

