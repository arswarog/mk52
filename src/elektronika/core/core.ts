import { CoreCommandType, ICalcCtrl, ICore } from '../calculator.interface';
import { Cmd } from './commands';
import { Register } from './register';

export const BaseMKCore: ICore = {
    [Cmd.Enter]: (calc: ICalcCtrl): ICalcCtrl => ({...calc, stack: calc.stack.enter()}),

    [Cmd.Num0]: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(0)}),
    [Cmd.Num1]: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(1)}),
    [Cmd.Num2]: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(2)}),
    [Cmd.Num3]: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(3)}),
    [Cmd.Num4]: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(4)}),
    [Cmd.Num5]: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(5)}),
    [Cmd.Num6]: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(6)}),
    [Cmd.Num7]: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(7)}),
    [Cmd.Num8]: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(8)}),
    [Cmd.Num9]: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(9)}),
    [Cmd.Dot] : (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(-1)}),
    //[Cmd.Sign]: (calc) => {
    //    return {
    //        ...calc,
    //        stack: {
    //            ...calc.stack,
    //            x: calc.stack.x.changeSign(),
    //        },
    //    };
    //},

    [Cmd.Plus] : (calc: ICalcCtrl) => {
        return calc;
    },
    [Cmd.Minus]: (calc: ICalcCtrl) => {
        return calc;
    },
    [Cmd.Mul]  : (calc: ICalcCtrl) => ({
        ...calc,
        stack: calc.stack.op2(multiply(calc.stack.x, calc.stack.y)),
    }),
    [Cmd.Div]  : (calc: ICalcCtrl) => {
        let mant = new Register(calc.stack.y.mantissa / calc.stack.x.mantissa);
        console.log(calc.stack.y.mantissa / calc.stack.x.mantissa);
        console.log(calc.stack.y.mantissa, calc.stack.x.mantissa);
        console.log(mant);
        return calc;
    },
    [Cmd.sqr]  : (calc: ICalcCtrl) => ({
        ...calc,
        stack: calc.stack.op1(multiply(calc.stack.x, calc.stack.x)),
    }),
    [Cmd.pi]   : (calc: ICalcCtrl) => ({
        ...calc,
        stack: calc.stack.enter(new Register(3.1415926)),
    }),
    [Cmd.Swap] : (calc: ICalcCtrl) => ({
        ...calc,
        stack: calc.stack.swap(),
    }),

    [Cmd.goto]: ({
        type     : CoreCommandType.WithAddress,
        operation: (calc: ICalcCtrl) => ({
            ...calc,
            stack: calc.stack.enter(new Register(3.1415926)),
        }),
    }),
};

Object.freeze(BaseMKCore);

function multiply(x: Register, y: Register): Register {
    let xm   = x.mantissa;
    let ym   = y.mantissa;
    let exp  = 0;
    let mant = 0;
    for (; ;) {
        mant = xm * ym;
        if (mant >= 10 ** 8) {
            exp++;
            if (xm > ym)
                xm /= 10;
            else
                ym /= 10;
        } else
            break;
    }
    const res = {
        mantissa: Math.round(mant),
        exp     : exp + x.exp + y.exp,
        negative: x.negative !== y.negative,
    };
    return new Register(res);
}