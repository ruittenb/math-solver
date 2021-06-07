
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
