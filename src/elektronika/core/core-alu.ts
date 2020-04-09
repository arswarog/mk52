import { Register } from './register';
import BigNumber from 'bignumber.js';

export function equal(x: Register, y: Register): boolean {
    if (x.negative !== y.negative)
        return false;

    if (x.exp !== y.exp)
        return false;

    return x.mantissa === y.mantissa;
}

export function moreThen(x: Register, y: Register): boolean {
    if (equal(x, y))
        return false;

    if (x.negative !== y.negative)
        return y.negative;

    console.log(x, y);

    if (x.exp !== y.exp)
        return x.exp > y.exp;

    return false;
}

export function add(x: Register, y: Register): Register {
    const xx = new BigNumber(x.toNumber());
    const yy = new BigNumber(y.toNumber());
    const r = xx.plus(yy);
    return Register.fromBigNumber(r);
}

export function multiply(x: Register, y: Register): Register {
    let xm = x.mantissa;
    let ym = y.mantissa;
    let exp = 0;
    let mant = 0;
    for (; ;) {
        mant = xm * ym;
        if (mant >= 10 ** 8) {
            exp++;
            if (xm > ym)
                xm /= 10;
            else
                ym /= 10;
        } else
            break;
    }
    const res = {
        mantissa: Math.round(mant),
        exp: exp + x.exp + y.exp,
        negative: x.negative !== y.negative,
    };
    return new Register(res);
}
