import { CoreCommandType, ICalcCtrl, ICore } from '../calculator.interface';
import { Cmd } from './commands';
import { InputRegister, Register } from './register';
import { Stack } from './stack';
import { RegisterName } from './registers';
import { multiply, add } from './core-alu';

export const BaseMKCore: ICore = {
    [Cmd.Enter]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl): ICalcCtrl => ({...calc, stack: calc.stack.enter()}),
    },

    [Cmd.Num0]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(0)}),
    },
    [Cmd.Num1]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(1)}),
    },
    [Cmd.Num2]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(2)}),
    },
    [Cmd.Num3]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(3)}),
    },
    [Cmd.Num4]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(4)}),
    },
    [Cmd.Num5]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(5)}),
    },
    [Cmd.Num6]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(6)}),
    },
    [Cmd.Num7]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(7)}),
    },
    [Cmd.Num8]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(8)}),
    },
    [Cmd.Num9]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(9)}),
    },
    [Cmd.Dot]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({...calc, stack: calc.stack.input(-1)}),
    },
    [Cmd.Sign]: {
        type: CoreCommandType.Single,
        operation: (calc) => {
            let x = calc.stack.x;
            if (x instanceof InputRegister)
                x = new Register(x);
            return {
                ...calc,
                stack: new Stack({
                    ...calc.stack,
                    x: x.changeSign(),
                    canInput: false,
                }),
            };
        },
    },

    [Cmd.Plus]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({
            ...calc,
            stack: calc.stack.op2(add(calc.stack.x, calc.stack.y)),
        }),
    },
    [Cmd.Minus]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => {
            return calc;
        },
    },
    [Cmd.Mul]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({
            ...calc,
            stack: calc.stack.op2(multiply(calc.stack.x, calc.stack.y)),
        }),
    },
    [Cmd.Div]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => {
            let mant = new Register(calc.stack.y.mantissa / calc.stack.x.mantissa);
            console.log(calc.stack.y.mantissa / calc.stack.x.mantissa);
            console.log(calc.stack.y.mantissa, calc.stack.x.mantissa);
            console.log(mant);
            return calc;
        },
    },
    [Cmd.sqr]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({
            ...calc,
            stack: calc.stack.op1(multiply(calc.stack.x, calc.stack.x)),
        }),
    },
    [Cmd.pi]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({
            ...calc,
            stack: calc.stack.enter(new Register(3.1415926)),
        }),
    },
    [Cmd.Swap]: {
        type: CoreCommandType.Single,
        operation: (calc: ICalcCtrl) => ({
            ...calc,
            stack: calc.stack.swap(),
        }),
    },

    [Cmd.goto]: ({
        type: CoreCommandType.WithAddress,
        operation: (calc: ICalcCtrl) => ({
            ...calc,
            stack: calc.stack.enter(new Register(3.1415926)),
        }),
    }),
    [Cmd.XtR]: ({
        type: CoreCommandType.WithRegister,
        operation: (calculator: ICalcCtrl, register: RegisterName): ICalcCtrl => {
            return {
                ...calculator,
                registers: calculator.registers.set(register, calculator.stack.x),
            };
        },
    }),
    [Cmd.RtX]: ({
        type: CoreCommandType.WithRegister,
        operation: (calculator: ICalcCtrl, register: RegisterName): ICalcCtrl => {
            return {
                ...calculator,
                stack: calculator.stack.enter(calculator.registers.get(register)),
            };
        },
    }),
};

Object.freeze(BaseMKCore);
