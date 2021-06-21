
/** **********************************************************************
 * Random: generate random numbers
 */

// limit of random numbers
let limit: int = 12

//        n => 0 .. n - 1
// e.g.  10 => 0 .. 9
let randomPos = (n: int): int => {
    Js.Math.random_int(0, n)
}

//        n =>  -n .. n - 1
// e.g.  10 => -10 .. 9
let randomPosNeg = (n: int): int => {
    Js.Math.random_int(-n, n)
}

//        n =>  -n .. -1, 1 .. n
// e.g.  10 => -10 .. -1, 1 .. 10
let randomNoZero = (n: int): int => {
    let result = randomPosNeg(n)
    if result !== 0 {
        result
    } else {
        n
    }
}

// use the limit
let randomNumber = (): int => {
    randomNoZero(limit)
}

// return random number as primitive node
let randomNumberPrimitiveExpression = (): Types.expression => {
    randomNumber()->Formula.createIntPrimitiveExpression
}

