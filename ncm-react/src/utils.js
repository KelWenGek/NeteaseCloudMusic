export function getClassName() { }

export function repeat(str, n) {
    let res = '';
    while (n) {
        if (n % 2 === 1) res += str;
        if (n > 1) str += str;
        n >>= 1;
    }
    return res
}

export function check4ten(number) {
    number = Number(number);
    if (number < 10) number = '0' + number;
    return String(number);
}