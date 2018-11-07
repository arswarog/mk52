import { ICore } from '../calculator.interface';
import { makeButton } from '../common';
import { Cmd } from '../core/commands';
import { BaseMKCore } from '../core/core';

export const MK52Core: ICore = BaseMKCore;

export const MK52Keyboard = [
    [
        makeButton('f', Cmd.F),
        makeButton('b', Cmd.SST, Cmd.LT),
        makeButton('b', Cmd.RtX, Cmd.L0),
        makeButton('w', Cmd.Num7, Cmd.sin, Cmd.int, '7'),
        makeButton('w', Cmd.Num8, Cmd.cos, Cmd.frac, '8'),
        makeButton('w', Cmd.Num9, Cmd.tg, Cmd.max, '9'),
        makeButton('w', Cmd.Minus, Cmd.sqrt),
        makeButton('w', Cmd.Div, Cmd.antifunc),
    ],
    [
        makeButton('k', Cmd.K),
        makeButton('b', Cmd.BST, Cmd.EQ),
        makeButton('b', Cmd.XtR, Cmd.L1),
        makeButton('w', Cmd.Num4, Cmd.asin, Cmd.abs, '4'),
        makeButton('w', Cmd.Num5, Cmd.acos, Cmd.sign, '5'),
        makeButton('w', Cmd.Num6, Cmd.atg, Cmd.tau_m, '6'),
        makeButton('w', Cmd.Plus, Cmd.pi, Cmd.tau_m),
        makeButton('w', Cmd.Mul, Cmd.sqr, null),
    ],
    [
        makeButton('b', Cmd.EPROM_TRANSFERR),
        makeButton('b', Cmd.RTN, Cmd.GT),
        makeButton('b', Cmd.goto, Cmd.L2),
        makeButton('w', Cmd.Num1, Cmd.exp, null, '1'),
        makeButton('w', Cmd.Num2, Cmd.lg, null, '2'),
        makeButton('w', Cmd.Num3, Cmd.ln, Cmd.tau_ms, '3'),
        makeButton('w', Cmd.Swap, Cmd.rXY, Cmd.tau_ms),
        makeButton('w', Cmd.Enter, Cmd.RestoreX, Cmd.random, 'e'),
    ],
    [
        makeButton('b', Cmd.EPROM_ADDRESS),
        makeButton('b', Cmd.R_S, Cmd.NEQ),
        makeButton('b', Cmd.Sub, Cmd.L3),
        makeButton('w', Cmd.Num0, Cmd.r10x, Cmd.NOP, '0'),
        makeButton('w', Cmd.Dot, Cmd.Ring, Cmd.and, 'a'),
        makeButton('w', Cmd.Sign, Cmd.AUTO, Cmd.or, 'b'),
        makeButton('w', Cmd.EE, Cmd.PROGRAMM, Cmd.xor, 'c'),
        makeButton('r', Cmd.CX, Cmd.CF, Cmd.not, 'd'),
    ],
];
