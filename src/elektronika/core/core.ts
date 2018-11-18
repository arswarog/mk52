import { ICalcCtrl, ICore } from '../calculator.interface';
import { Cmd } from './commands';

export const BaseMKCore: ICore = {
    [Cmd.Enter]: (calc: ICalcCtrl): ICalcCtrl => ({...calc, stack: calc.stack.enter()}),

    [Cmd.Num0]: (calc) => ({...calc, stack: calc.stack.input(0)}),
    [Cmd.Num1]: (calc) => ({...calc, stack: calc.stack.input(1)}),
    [Cmd.Num2]: (calc) => ({...calc, stack: calc.stack.input(2)}),
    [Cmd.Num3]: (calc) => ({...calc, stack: calc.stack.input(3)}),
    [Cmd.Num4]: (calc) => ({...calc, stack: calc.stack.input(4)}),
    [Cmd.Num5]: (calc) => ({...calc, stack: calc.stack.input(5)}),
    [Cmd.Num6]: (calc) => ({...calc, stack: calc.stack.input(6)}),
    [Cmd.Num7]: (calc) => ({...calc, stack: calc.stack.input(7)}),
    [Cmd.Num8]: (calc) => ({...calc, stack: calc.stack.input(8)}),
    [Cmd.Num9]: (calc) => ({...calc, stack: calc.stack.input(9)}),
    [Cmd.Dot] : (calc) => ({...calc, stack: calc.stack.input(-1)}),
    //[Cmd.Sign]: (calc) => {
    //    return {
    //        ...calc,
    //        stack: {
    //            ...calc.stack,
    //            x: calc.stack.x.changeSign(),
    //        },
    //    };
    //},

    [Cmd.Plus] : (calc) => {
        return calc;
    },
    [Cmd.Minus]: (calc) => {
        return calc;
    },
    [Cmd.Mul]  : (calc) => {
        return calc;
    },
    [Cmd.Div]  : (calc) => {
        return calc;
    },
};

Object.freeze(BaseMKCore);