export enum Cmd {
    F,
    K,
    AUTO,
    PROGRAMM,
    EPROM_TRANSFERR,
    EPROM_ADDRESS,
    SST, //step ->
    BST, // step <-
    RTN, // Return
    R_S, // Stop start
    GT,//x >=0
    LT, // x<0
    EQ, // x==0
    NEQ, // X!=0
    L0, L1, L2, L3,
    goto,
    RtX, // П->X
    XtR, // X->П
    Sub, // procedure
    Num1, Num2, Num3, Num4, Num5,
    Num6, Num7, Num8, Num9, Num0,
    Dot, Sign,
    Minus, Plus, Mul, Div,
    Enter,
    Swap,
    Ring,
    RestoreX,
    EE, // Enter Exp
    CX, // Clear X
    max,
    sin, cos, tg,
    asin, acos, atg,
    sqr, sqrt,
    pi, antifunc,
    exp, lg, ln,
    rXY, // x^y
    r10x, // 10^x
    CF,
    int, // [x]
    frac, // {x}
    abs, // |x|
    sign, // sign of number
    or, xor, and, not,
    NOP,
    random,
    fau_m, tau_m,
    fau_ms, tau_ms,
}