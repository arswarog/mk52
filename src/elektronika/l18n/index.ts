import { Cmd } from '../core/commands';

export const keyLabels: { [key: string]: string } = {
    [Cmd.F]              : 'F',
    [Cmd.K]              : 'K',
    [Cmd.AUTO]           : 'АВТ',
    [Cmd.PROGRAMM]       : 'ПРГ',
    [Cmd.EPROM_TRANSFERR]: '⇵',
    [Cmd.EPROM_ADDRESS]  : 'А↑',
    [Cmd.SST]            : 'ШГ→',
    [Cmd.BST]            : 'ШГ←',
    [Cmd.RTN]            : 'В/О',
    [Cmd.R_S]            : 'С/П',
    [Cmd.GT]             : 'x⩾0',
    [Cmd.LT]             : 'x<0',
    [Cmd.EQ]             : 'x=0',
    [Cmd.NEQ]            : 'x≠0',
    [Cmd.L0]             : 'L0',
    [Cmd.L1]             : 'L1',
    [Cmd.L2]             : 'L2',
    [Cmd.L3]             : 'L3',
    [Cmd.goto]           : 'БП',
    [Cmd.RtX]            : 'П→X',
    [Cmd.XtR]            : 'X→П',
    [Cmd.Sub]            : 'ПП',
    [Cmd.Num1]           : '1',
    [Cmd.Num2]           : '2',
    [Cmd.Num3]           : '3',
    [Cmd.Num4]           : '4',
    [Cmd.Num5]           : '5',
    [Cmd.Num6]           : '6',
    [Cmd.Num7]           : '7',
    [Cmd.Num8]           : '8',
    [Cmd.Num9]           : '9',
    [Cmd.Num0]           : '0',
    [Cmd.Dot]            : '·',
    [Cmd.Sign]           : '/-/',
    [Cmd.Minus]          : '-',
    [Cmd.Plus]           : '+',
    [Cmd.Mul]            : '×',
    [Cmd.Div]            : '÷',
    [Cmd.Enter]          : 'В↑',
    [Cmd.Swap]           : '↔',
    [Cmd.RestoreX]       : 'Bx',
    [Cmd.Ring]           : '⟳',
    [Cmd.EE]             : 'ВП',
    [Cmd.CX]             : 'СX',
    [Cmd.sin]            : 'sin',
    [Cmd.cos]            : 'cos',
    [Cmd.tg]             : 'tg',
    [Cmd.asin]           : 'sin⁻¹',
    [Cmd.acos]           : 'cos⁻¹',
    [Cmd.atg]            : 'tg⁻¹',
    [Cmd.sqr]            : 'x²',
    [Cmd.sqrt]           : '√',
    [Cmd.pi]             : 'π',
    [Cmd.antifunc]       : '1/x',
    [Cmd.exp]            : 'eⁿ',
    [Cmd.lg]             : 'lg',
    [Cmd.ln]             : 'ln',
    [Cmd.rXY]            : 'xⁿ',
    [Cmd.r10x]           : '10ⁿ',
    [Cmd.CF]             : 'CF',
    [Cmd.max]            : 'max',
    [Cmd.int]            : '[x]',
    [Cmd.frac]           : '{x}',
    [Cmd.abs]            : '|x|',
    [Cmd.sign]           : 'ЗН',
    [Cmd.or]             : '∨',
    [Cmd.xor]            : '⊕',
    [Cmd.and]            : '∧',
    [Cmd.not]            : 'ИНВ',
    [Cmd.NOP]            : 'НОП',
    [Cmd.random]         : 'СЧ',
    [Cmd.fau_m]          : '°′',
    [Cmd.tau_m]          : '°′',
    [Cmd.fau_ms]         : '°′″',
    [Cmd.tau_ms]         : '°′″',
};