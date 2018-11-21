import { ICalcCtrl, ICore } from '../calculator.interface';
import { Cmd } from './commands';
import { Register } from './register';

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
    [Cmd.Mul]  : (calc: ICalcCtrl) => {
        const x = calc.stack.x.mantissa;
        const y = calc.stack.y.mantissa;
        let exp = 0;
        let mant = 0;
        for (; ;) {
            mant = x * y;
            if (mant >= 10 ** 8) {
                exp++;
                if (x > y)
                    x /= 10;
                else
                    y /= 10;
            } else
                break;
        }
        const res = {
            mantissa: Math.round(mant),
            exp     : exp + calc.stack.x.exp + calc.stack.y.exp,
            negative: calc.stack.x.negative !== calc.stack.y.negative,
        };
        return {
            ...calc,
            stack: calc.stack.op2(new Register(res)),
        };
    },
    [Cmd.Div]  : (calc) => {
        return calc;
    },
};

Object.freeze(BaseMKCore);