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
    const dec = hexList[code.substr(0, 1)];
    if (dec)
        return dec;
    else
        throw new Error(`Unknown code "${code.substr(0, 1)}" for convert from hex`);
}