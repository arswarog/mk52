import { ICore } from '../calculator.interface';
import { makeButton } from '../common';
import { Cmd } from '../core/commands';
import { BaseMKCore } from '../core/core';

export const MK52Core: ICore = BaseMKCore;

export const MK52Keyboard = [
    [
        makeButton('f', 'Shift', Cmd.F),
        makeButton('b', null, Cmd.SST, Cmd.LT),
        makeButton('b', null, Cmd.RtX, Cmd.L0),
        makeButton('w', 'Numpad7', Cmd.Num7, Cmd.sin, Cmd.int, '7'),
        makeButton('w', 'Numpad8', Cmd.Num8, Cmd.cos, Cmd.frac, '8'),
        makeButton('w', 'Numpad9', Cmd.Num9, Cmd.tg, Cmd.max, '9'),
        makeButton('w', 'NumpadSustract', Cmd.Minus, Cmd.sqrt),
        makeButton('w', 'NumpadDivide', Cmd.Div, Cmd.antifunc),
    ],
    [
        makeButton('k', 'Control', Cmd.K),
        makeButton('b', null, Cmd.BST, Cmd.EQ),
        makeButton('b', null, Cmd.XtR, Cmd.L1),
        makeButton('w', 'Numpad4', Cmd.Num4, Cmd.asin, Cmd.abs, '4'),
        makeButton('w', 'Numpad5', Cmd.Num5, Cmd.acos, Cmd.sign, '5'),
        makeButton('w', 'Numpad6', Cmd.Num6, Cmd.atg, Cmd.tau_m, '6'),
        makeButton('w', 'NumpadAdd', Cmd.Plus, Cmd.pi, Cmd.tau_m),
        makeButton('w', 'NumpadMultiply', Cmd.Mul, Cmd.sqr, null),
    ],
    [
        makeButton('b', null, Cmd.EPROM_TRANSFERR),
        makeButton('b', null, Cmd.RTN, Cmd.GT),
        makeButton('b', null, Cmd.goto, Cmd.L2),
        makeButton('w', 'Numpad1', Cmd.Num1, Cmd.exp, null, '1'),
        makeButton('w', 'Numpad2', Cmd.Num2, Cmd.lg, null, '2'),
        makeButton('w', 'Numpad3', Cmd.Num3, Cmd.ln, Cmd.tau_ms, '3'),
        makeButton('w', null, Cmd.Swap, Cmd.rXY, Cmd.tau_ms),
        makeButton('w', 'NumpadEnter', Cmd.Enter, Cmd.RestoreX, Cmd.random, 'e'),
    ],
    [
        makeButton('b', null, Cmd.EPROM_ADDRESS),
        makeButton('b', null, Cmd.R_S, Cmd.NEQ),
        makeButton('b', null, Cmd.Sub, Cmd.L3),
        makeButton('w', 'Numpad0', Cmd.Num0, Cmd.r10x, Cmd.NOP, '0'),
        makeButton('w', 'NumpadDecimal', Cmd.Dot, Cmd.Ring, Cmd.and, 'a'),
        makeButton('w', null, Cmd.Sign, Cmd.AUTO, Cmd.or, 'b'),
        makeButton('w', null, Cmd.EntExp, Cmd.PROGRAM, Cmd.xor, 'c'),
        makeButton('r', null, Cmd.ClX, Cmd.CF, Cmd.not, 'd'),
    ],
];

//export const MK52: ICalculatorState = {
//    core    : new Calculator(BaseMKCore),
//    keyboard: MK52Keyboard,
//};