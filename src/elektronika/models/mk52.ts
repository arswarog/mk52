import { ICore } from '../calculator.interface';
import { makeButton } from '../common';
import { Cmd } from '../core/commands';
import { BaseMKCore } from '../core/core';
import { keyLabels } from '../l18n';

const btn = makeButton(keyLabels);

export const MK52Core: ICore = BaseMKCore;

export const MK52Keyboard = [
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
        btn('w', Cmd.Mul, Cmd.sqr, null),
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
