import { Register } from './register';
import BigNumber from 'bignumber.js';

export const hexList = Object.freeze({
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'a': 10,
    'b': 11,
    'c': 12,
    'd': 13,
    'e': 14,
    'f': 15,
});

export function hex2dec(code: string) {
    const dec = (hexList as any)[code.substr(0, 1)];
    if (dec)
        return dec;
    else
        throw new Error(`Unknown code "${code.substr(0, 1)}" for convert from hex`);
}

export function registerToBigNumber(register: Register): BigNumber {
    const mantissa = new BigNumber(register.mantissa);
    const withExp = mantissa.multipliedBy(10 ** register.exp);
    return register.negative ? withExp.negated() : withExp;
}

export function bigNumberToRegister(bigNumber: BigNumber): Register {
    const exponential = bigNumber.toExponential(7);
    return Register.fromExponential(exponential);
}
