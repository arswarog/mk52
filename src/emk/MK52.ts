import { ControllerMode, MKController, Stack } from "./MKController";
import { Digit, Register } from "./register";

export enum DisplayMode {
    Loading = 'loading',
    Simple  = 'simple',
    Normal  = 'normal',
    Hex     = 'hex',
    Error   = 'error',
}

export class MK52 {
    public mk: MKController = new MKController();
    private timer: number;
    public timeout: number;

    constructor() {
        console.log('Create MK52');
    }

    get display(): MKDisplay {
        if (this.mk)
            return this.mk.display;
        else
            return new MKDisplay(DisplayMode.Loading);
    }

    get stack(): Stack<MKDisplay> {
        let stack = this.mk.stack;
        return {
            x1: new MKDisplay(stack.x1),
            x : new MKDisplay(stack.x),
            y : new MKDisplay(stack.y),
            z : new MKDisplay(stack.z),
            t : new MKDisplay(stack.t),
        };
    }

    start(timeout: number = 200) {
        this.timeout = timeout;
        this.mk.start();
    }

    press(code: string): void {
        this.mk.press(code);
    }

    getKeyboardConfig(): MKButton[][] {
        return [
            [
                new MKButton('A1', 'F', 'f', null),
                new MKButton('A2', 'ШГ→', 'b', null, 'x<0', null),
                new MKButton('A3', 'П→X', 'b', null, 'L0', null),
                new MKButton('A4', '7', 'w', '07', 'sin', null, '[x]', null),
                new MKButton('A5', '8', 'w', '08', 'cos', null, '{x}', null),
                new MKButton('A6', '9', 'w', '09', 'tg', null, 'max', null),
                new MKButton('A7', '-', 'w', '11', '√', null),
                new MKButton('A8', '÷', 'w', '13', '1/x', null),
            ], [
                new MKButton('B1', 'K', 'k', null),
                new MKButton('B2', 'ШГ←', 'b', null, 'x=0', null),
                new MKButton('B3', 'X→П', 'b', null, 'L1', null),
                new MKButton('B4', '4', 'w', '04', 'sin⁻¹', null, '|x|', null),
                new MKButton('B5', '5', 'w', '05', 'cos⁻¹', null, 'ЗН', null),
                new MKButton('B6', '6', 'w', '06', 'tg⁻¹', null, '°′', null),
                new MKButton('B7', '+', 'w', '10', 'π', null, '°′', null),
                new MKButton('B8', '×', 'w', '12', 'x²'),
            ], [
                new MKButton('C1', '⇵', 'b', null),
                new MKButton('C2', 'В/О', 'b', null, 'x⩾0', null),
                new MKButton('C3', 'БП', 'b', null, 'L2', null),
                new MKButton('C4', '1', 'w', '01', 'eⁿ', null),
                new MKButton('C5', '2', 'w', '02', 'lg', null),
                new MKButton('C6', '3', 'w', '03', 'ln', null, '°′″', null),
                new MKButton('C7', '↔', 'w', null, 'xⁿ', null, '°′″', null),
                new MKButton('C8', 'В↑', 'w', '0E', 'Bx', null, 'СЧ', null, 'e'),
            ], [
                new MKButton('D1', 'А↑', 'b', null),
                new MKButton('D2', 'С/П', 'b', null, 'x≠0'),
                new MKButton('D3', 'ПП', 'b', null, 'L3'),
                new MKButton('D4', '0', 'w', '00', '10ⁿ', null, 'НОП', null),
                new MKButton('D5', '·', 'w', null, '⟳', null, '∧', null, 'a'),
                new MKButton('D6', '/-/', 'w', null, 'АВТ', null, '∨', null, 'b'),
                new MKButton('D7', 'ВП', 'w', '0C', 'ПРГ', null, '⊕', null, 'c'),
                new MKButton('D8', 'СX', 'r', null, 'CF', null, 'ИНВ', null, 'd'),
            ],
        ];
    }
}

export class MKButton {
    constructor(
        public key: string,
        public text: string,
        public color: 'f' | 'k' | 'b' | 'w' | 'r' = 'b',
        public code: string,
        public f?: string,
        public codef?: string,
        public k?: string,
        public codek?: string,
        public register?: string,
    ) {
    }
}

export class MKDisplay {
    private register: Register = null;
    public mode: DisplayMode   = DisplayMode.Simple;

    public mantMinus     = false;
    public mant: Digit[] = [];
    public signMinus     = false;
    public sign: Digit[] = [];

    constructor(mode: DisplayMode);
    constructor(register: Register);
    constructor(register: Register | DisplayMode) {
        if (register instanceof Register) {
            this.register = register;
            this.mode     = DisplayMode.Error;
            let magn      = register.magn + register.magnToNormal;
            if (register.mant == 0) {
                this.mode = DisplayMode.Simple;
                this.simple();
            } else if (magn >= 0 && magn < 8) {
                this.mode = DisplayMode.Simple;
                this.simple();
            } else if (magn < 0 && -magn > -8) {
                this.mode = DisplayMode.Simple;
                this.simple();
            } else if (magn >= 8 && magn < 100) {
                this.mode = DisplayMode.Normal;
                this.normal();
            } else if (magn <= -8 && magn > -100) {
                this.mode = DisplayMode.Normal;
                this.normal();
            }
        } else {
            this.mode = register;
        }
        this.messageByMode();
        this.normalize();
    }

    private normal(): void {
        console.log('-----', this.register);
        let delta      = this.register.magnToNormal;
        let mant       = this.register.mant / 10 ** delta;
        this.mantMinus = false;
        if (mant < 0) {
            this.mantMinus = true;
            mant           = -mant;
        }
        this.mant = this.numToDigits(mant);

        let sign  = this.register.magn + delta;
        if (sign < 0)
            this.signMinus = true;
        this.sign = this.numToDigits(sign < 0 ? -sign : sign, false);
    }

    private simple(): void {
        this.mant = this.numToDigits(this.register.toNumber());
    }

    private numToDigits(value: number, dotted: boolean = true): Digit[] {
        let mant: Digit[] = [];

        let str     = '' + value;
        let haveDot = false;
        let nums    = 0;
        for (let i = 0; nums < 9 && i < str.length; i++) {
            if (str[i] === '.') {
                haveDot = true;
                mant.push(Digit.dot);
            } else {
                mant.push(+str[i]);
                nums++;
            }
        }
        if (dotted) {
            if (!haveDot)
                mant.push(Digit.dot);

            while (mant.length && mant[mant.length - 1] === Digit.h0)
                mant.pop();
        }

        return mant;
    }

    get value(): string {
        switch (this.mode) {
            case DisplayMode.Loading:
                return "(Loading)";
            case DisplayMode.Error:
                return "(Error)";
            case DisplayMode.Simple:
            case DisplayMode.Hex:
            case DisplayMode.Normal:
            default:
                if (this.register)
                    return '' + this.register.toNumber();
                else
                    return 'null';
        }
    }

    messageByMode() {
        switch (this.mode) {
            case DisplayMode.Normal:
            case DisplayMode.Simple:
            case DisplayMode.Hex:
                break;
            case DisplayMode.Loading:
                this.mantMinus = true;
                this.mant      = [
                    Digit.h8, Digit.dot,
                    Digit.h8, Digit.dot,
                    Digit.h8, Digit.dot,
                    Digit.h8, Digit.dot,
                    Digit.h8, Digit.dot,
                    Digit.h8, Digit.dot,
                    Digit.h8, Digit.dot,
                    Digit.h8, Digit.dot,
                ];
                this.signMinus = true;
                this.sign      = [
                    Digit.h8, Digit.dot,
                    Digit.h8, Digit.dot,
                ];
                break;
            case DisplayMode.Error:
                this.mant = [
                    Digit.hE,
                    Digit.hD,
                    Digit.hD,
                    Digit.h0,
                    Digit.hD,
                ];
                break;
        }
    }

    private normalize() {
        let manLen: number = this.mant.reduce((len, num) => num === Digit.dot ? len : len + 1, 0);
        for (; manLen < 8; manLen++)
            this.mant.unshift(Digit.empty);

        let signLen: number = this.mant.reduce((len, num) => num === Digit.dot ? len : len + 1, 0);
        for (; signLen < 2; signLen++)
            this.sign.unshift(Digit.empty);
    }

    get nums(): Digit[] {
        let result: Digit[] = [];
        result.push(this.mantMinus ? Digit.minus : Digit.empty);
        result.push(...this.mant);
        result.push(this.signMinus ? Digit.minus : Digit.empty);
        result.push(...this.sign);
        console.log(result);

        return result;
    }

    get real(): string {
        let ret = this.nums.map(num => [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
            ' ', '.', '-',
//            h0, h1, h2, h3, h4, h5, h6, h7, h8, h9, hA, hB, hC, hD, hE, hF,
//            empty,
        ][num]).join('');
        return ret;
    }
}
