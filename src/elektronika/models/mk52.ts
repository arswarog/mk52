import { makeButton } from '../common';
import { Cmd } from '../core/commands';
import { keyLabels } from '../l18n';

const btn = makeButton(keyLabels);

export const MK52Keyboard  = [
    [
        btn('f', Cmd.F),
        btn('b', Cmd.SST, Cmd.LT),
        btn('b', Cmd.RtX, Cmd.L0),
        btn('w', Cmd.Num7, Cmd.sin, Cmd.int, '7'),
        btn('w', Cmd.Num8, Cmd.cos, Cmd.frac, '8'),
        btn('w', Cmd.Num9, Cmd.tg, Cmd.max, '9'),
        btn('w', Cmd.Minus, Cmd.sqrt),
        btn('w', Cmd.Div, Cmd.antifunc),
    ],
    [
        btn('k', Cmd.K),
        btn('b', Cmd.BST, Cmd.EQ),
        btn('b', Cmd.XtR, Cmd.L1),
        btn('w', Cmd.Num4, Cmd.asin, Cmd.abs, '4'),
        btn('w', Cmd.Num5, Cmd.acos, Cmd.sign, '5'),
        btn('w', Cmd.Num6, Cmd.atg, Cmd.tau_m, '6'),
        btn('w', Cmd.Plus, Cmd.pi, Cmd.tau_m),
        btn('w', Cmd.Mul, Cmd.sqr, null, 'i'),
    ],
    [
        btn('b', Cmd.EPROM_TRANSFERR),
        btn('b', Cmd.RTN, Cmd.GT),
        btn('b', Cmd.goto, Cmd.L2),
        btn('w', Cmd.Num1, Cmd.exp, null, '1'),
        btn('w', Cmd.Num2, Cmd.lg, null, '2'),
        btn('w', Cmd.Num3, Cmd.ln, Cmd.tau_ms, '3'),
        btn('w', Cmd.Swap, Cmd.rXY, Cmd.tau_ms),
        btn('w', Cmd.Enter, Cmd.RestoreX, Cmd.random, 'e'),
    ],
    [
        btn('b', Cmd.EPROM_ADDRESS),
        btn('b', Cmd.R_S, Cmd.NEQ),
        btn('b', Cmd.Sub, Cmd.L3),
        btn('w', Cmd.Num0, Cmd.r10x, Cmd.NOP, '0'),
        btn('w', Cmd.Dot, Cmd.Ring, Cmd.and, 'a'),
        btn('w', Cmd.Sign, Cmd.AUTO, Cmd.or, 'b'),
        btn('w', Cmd.EE, Cmd.PROGRAMM, Cmd.xor, 'c'),
        btn('r', Cmd.CX, Cmd.CF, Cmd.not, 'd'),
    ],
];
export const MK52Keyboard1 = [
    [
        ['A1', 'F', 'f', null],
        ['A2', 'ШГ→', 'b', null, 'x<0', null],
        ['A3', 'П→X', 'b', null, 'L0', null],
        ['A4', '7', 'w', '07', 'sin', null, '[x]', null],
        ['A5', '8', 'w', '08', 'cos', null, '{x}', null],
        ['A6', '9', 'w', '09', 'tg', null, 'max', null],
        ['A7', '-', 'w', '11', '√', null],
        ['A8', '÷', 'w', '13', '1/x', null],
    ], [
        ['B1', 'K', 'k', null],
        ['B2', 'ШГ←', 'b', null, 'x=0', null],
        ['B3', 'X→П', 'b', null, 'L1', null],
        ['B4', '4', 'w', '04', 'sin⁻¹', null, '|x|', null],
        ['B5', '5', 'w', '05', 'cos⁻¹', null, 'ЗН', null],
        ['B6', '6', 'w', '06', 'tg⁻¹', null, '°′', null],
        ['B7', '+', 'w', '10', 'π', null, '°′', null],
        ['B8', '×', 'w', '12', 'x²'],
    ], [
        ['C1', '⇵', 'b', null],
        ['C2', 'В/О', 'b', null, 'x⩾0', null],
        ['C3', 'БП', 'b', null, 'L2', null],
        ['C4', '1', 'w', '01', 'eⁿ', null],
        ['C5', '2', 'w', '02', 'lg', null],
        ['C6', '3', 'w', '03', 'ln', null, '°′″', null],
        ['C7', '↔', 'w', null, 'xⁿ', null, '°′″', null],
        ['C8', 'В↑', 'w', '0E', 'Bx', '0F', 'СЧ', null, 'e'],
    ], [
        ['D1', 'А↑', 'b', null],
        ['D2', 'С/П', 'b', null, 'x≠0'],
        ['D3', 'ПП', 'b', null, 'L3'],
        ['D4', '0', 'w', '00', '10ⁿ', null, 'НОП', null],
        ['D5', '·', 'w', null, '⟳', null, '∧', null, 'a'],
        ['D6', '/-/', 'w', null, 'АВТ', null, '∨', null, 'b'],
        ['D7', 'ВП', 'w', '0C', 'ПРГ', null, '⊕', null, 'c'],
        ['D8', 'СX', 'r', null, 'CF', null, 'ИНВ', null, 'd'],
    ],
];

const labels: any = {};
Object.keys(keyLabels).forEach(
    key => labels[keyLabels[key]] = 'Cmd.' + Cmd[key],
);

console.log(labels);

const aaa = MK52Keyboard1.map(
    row => row.map(
        button => button.map(
            key => key in labels ? labels[key] : key,
        ),
    ),
);

console.log(JSON.stringify(aaa, null, 2));

console.log(aaa);