export enum Cmd {
    F               = 'F',
    K               = 'K',
    AUTO            = '',
    PROGRAMM        = '',
    EPROM_TRANSFERR = '',
    EPROM_ADDRESS   = '',
    SST             = '', // step ->
    BST             = '', // step <-
    Num0            = '00',
    Num1            = '01',
    Num2            = '02',
    Num3            = '03',
    Num4            = '04',
    Num5            = '05',
    Num6            = '06',
    Num7            = '07',
    Num8            = '08',
    Num9            = '09',
    Dot             = '0a',
    Sign            = '0b',
    EntExp          = '0c', // Enter Exp
    ClX             = '0d', // Clear X
    Enter           = '0e',
    RestoreX        = '0f',
    Plus            = '10',
    Minus           = '11',
    Mul             = '12',
    Div             = '13',
    Swap            = '14',
    r10x            = '15', // 10^x
    lg              = '17',
    ln              = '18',
    asin            = '19',
    acos            = '1a',
    atg             = '1b',
    sin             = '1c',
    cos             = '1d',
    tg              = '1e',
    pi              = '20',
    sqrt            = '21',
    sqr             = '22',
    antifunc        = '23',
    rXY             = '24', // x^y

    XtR             = '4x', // X->П

    RtX             = '6x', // П->X

    Ring            = '',
    max             = '',
    exp             = '',
    CF              = '',
    int             = '', // [x]
    frac            = '', // {x}
    abs             = '', // |x|
    sign            = '', // sign of number
    or              = '',
    xor             = '',
    and             = '',
    not             = '',
    random          = '',
    fau_m           = '',
    tau_m           = '',
    fau_ms          = '',
    tau_ms          = '',
    NOP             = '',
    RTN             = '', // Return
    R_S             = '', // Stop start
    GT              = '59',//x >=0
    LT              = '5c', // x<0
    EQ              = '5e', // x==0
    NEQ             = '57', // X!=0
    L0              = '',
    L1              = '5b',
    L2              = '',
    L3              = '',
    goto            = '51',
    Sub             = '', // procedure
}

export const CmdCodes: {[code: string]: string} = {};

export const CmdAsm: {[code: string]: Cmd} = {};

Object.keys(Cmd).forEach(
    cmd => {
        const code                = Cmd[cmd];
        CmdCodes[code]            = cmd;
        CmdAsm[cmd.toLowerCase()] = code;
    },
);