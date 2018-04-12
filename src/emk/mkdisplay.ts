import { Digit, Register } from "./register";

export enum DisplayMode {
    Loading = 'loading',
    Simple  = 'simple',
    Normal  = 'normal',
    Hex     = 'hex',
    Error   = 'error',
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
        let delta      = this.register.magnToNormal;
        let mant       = this.register.mant / 10 ** delta;
        this.mantMinus = false;
        if (mant < 0) {
            this.mantMinus = true;
            mant           = -mant;
        }
        this.mant = this.numToDigits(mant);

        let sign = this.register.magn + delta;
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
            this.mant.push(Digit.empty);

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
