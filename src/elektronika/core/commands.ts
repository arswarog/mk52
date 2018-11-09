export enum Cmd {
    F = 'F',
    K = 'K',
    AUTO = '',
    PROGRAMM = '',
    EPROM_TRANSFERR = '',
    EPROM_ADDRESS = '',
    SST = '', //step ->
    BST = '', // step <-
    RTN = '', // Return
    R_S = '', // Stop start
    GT = '',//x >=0
    LT = '', // x<0
    EQ = '', // x==0
    NEQ = '', // X!=0
    L0 = '',
    L1 = '',
    L2 = '',
    L3 = '',
    goto = '51',
    RtX = '', // П->X
    XtR = '', // X->П
    Sub = '', // procedure
    Num1 = '01',// = '01',
    Num2 = '02',// = '02',
    Num3 = '03',// = '03',
    Num4 = '04',// = '04',
    Num5 = '05',// = '05',
    Num6 = '06',// = '06',
    Num7 = '07',// = '07',
    Num8 = '08',// = '08',
    Num9 = '09',// = '09',
    Num0 = '00',// = '00',
    Dot = '',
    Sign = '',
    Minus = '',
    Plus = '',
    Mul = '',
    Div = '',
    Enter = '',
    Swap = '',
    Ring = '',
    RestoreX = '',
    EE = '', // Enter Exp
    CX = '', // Clear X
    max = '',
    sin = '',
    cos = '',
    tg = '',
    asin = '',
    acos = '',
    atg = '',
    sqr = '',
    sqrt = '',
    pi = '',
    antifunc = '',
    exp = '',
    lg = '',
    ln = '',
    rXY = '', // x^y
    r10x = '', // 10^x
    CF = '',
    int = '', // [x]
    frac = '', // {x}
    abs = '', // |x|
    sign = '', // sign of number
    or = '',
    xor = '',
    and = '',
    not = '',
    random = '',
    fau_m = '',
    tau_m = '',
    fau_ms = '',
    tau_ms = '',
    NOP = '',
}

export const CmdCodes: { [code: string]: string } = {};

export const CmdAsm: { [code: string]: Cmd } = {};

Object.keys(Cmd).forEach(
    cmd => {
        const code = Cmd[cmd];
        CmdCodes[code] = cmd;
        CmdAsm[cmd.toLowerCase()] = code;
    },
);

console.log(CmdCodes);
console.log(CmdAsm);