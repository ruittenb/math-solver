// E(P(x,S(x,1)),0)
// E(S(2x2,3x,-1),0)
// E(x,P(+-5,R(2,)))
//

function equation(str) {
    return `<equation>${parse(str)}</equation>`;
}

function parse(str) {
    let matches = str.match(/^([A-Z])\(([^,)]*),([^)]*)\)$/);
    if (!matches) {
        return term(str);
    }
    let [ fn, a, b ] = matches;
    switch (fn) {
        case 'E':
            return equals(a, b);
        case 'S':
            return sum(a, b);
        case 'P':
            return product(a, b);
        case 'F':
            return fraction(a, b);
        case 'R':
            return root(a);
    }
}

function equals(a, b) {
    return `<table>\n<tr><td>${parse(a)}</td><td>=</td><td>${parse(b)}</td></tr>\n</table>`;
}

function fraction(a, b) {
    return `<table class="fraction">\n<tr><td>${parse(a)}</td></tr><tr><td>${parse(b)}</td></tr>\n</table>`;
}

function root(a) {
    return `<table class="root">\n<tr><td>√</td><td>${parse(a)}</td></tr>\n</table>`;
}

/**
 * +5
 * -5x
 * +-x
 * x
 * x2
 * 5x2
 * -x3
 */
function term(a) {
    //let [ sign, factor, x, power ] = a.match(/^(+|-|+-|±)?(\d*)(?:(x)(\d*))?/);
    let [ _total, sign, number, factor, power ] = a.match(/^([-+]|\+-|±)?(?:(\d+)|(?:(\d*)x(\d*)))$/);
    if (sign == '+-') {
        sign = '±';
    }
    if (number) {
        return `${sign}${number}`;
    } else {
        return `${sign}${factor}x<sup>${power}</sup>`;
    }
}
