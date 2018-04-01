import { Digit, Register } from "./register";

export class Registers {

}

export enum CoreMode {
    Default        = 0,
    AddToMantissa  = 1,
    AddToMagnitude = 2,
    Added          = 3,
}

export class MK52Core {
    mode: CoreMode = CoreMode.Default;

    public x1: Register = new Register();
    public x: Register  = new Register();
    public y: Register  = new Register();
    public z: Register  = new Register();
    public t: Register  = new Register();

    public ip: number = 0;

    registers: Registers = new Registers();

    inputBuffer: {
        sign: 1 | -1,
        mantissa: string,
        m_sign: 1 | -1,
        magnitude: string
    };

    get display(): Register {
        if (this.mode === CoreMode.AddToMantissa || this.mode === CoreMode.AddToMagnitude)
            return new Register(parseFloat(this.inputBuffer.mantissa));
        return this.x;
    }

    exec(code: string): boolean {
        let fn = `exec${code}`;
        if (!code || !( fn in this )) {
            console.log('Invalid command');
            return false;
        }

        if (this.mode !== CoreMode.Default) {
            if ([
                '00', '01', '02', '03', '04',
                '05', '06', '07', '08', '09',
                '0C', '0E',
            ].indexOf(code) === -1) {
                this.mode = CoreMode.Default;
            }
        }

        return this[fn]();
    }

    stackDown() {
        this.x1 = new Register(this.x);
        this.x  = new Register(this.y);
        this.y  = new Register(this.z);
        this.z  = new Register(this.t);
    }

    input(value: Digit) {
        switch (this.mode) {
            case CoreMode.AddToMantissa:
                if (this.inputBuffer.mantissa.length < 8)
                    this.inputBuffer.mantissa += '' + value;
                this.x = this.fromBuffer();
                break;
            case CoreMode.AddToMagnitude:
                if (this.inputBuffer.magnitude.length < 2)
                    this.inputBuffer.magnitude += '' + value;
                this.x = this.fromBuffer();
                break;
            case CoreMode.Default:
            default:
                this.exec0E();
            case CoreMode.Added:
                this.mode        = CoreMode.AddToMantissa;
                this.inputBuffer = {
                    sign     : 1,
                    mantissa : '' + value,
                    m_sign   : 1,
                    magnitude: '',
                };
                break;
        }
        console.log(`Digit ${value} mode ${this.mode}`, this.inputBuffer);
    }

    fromBuffer(): Register {
        let mant = parseFloat(this.inputBuffer.mantissa);
        let magn = this.inputBuffer.magnitude ? parseInt(this.inputBuffer.magnitude) : 0;
        return new Register(mant, magn);
    }

    /**
     * Ввод 0
     * Operation "0"
     */
    exec00() {
        return this.input(Digit.h0);
    }

    /**
     * Ввод 1
     * Operation "1"
     */
    exec01() {
        return this.input(Digit.h1);
    }

    /**
     * Ввод 2
     * Operation "2"
     */
    exec02() {
        return this.input(Digit.h2);
    }

    /**
     * Ввод 3
     * Operation "3"
     */
    exec03() {
        return this.input(Digit.h3);
    }

    /**
     * Ввод 4
     * Operation "4"
     */
    exec04() {
        return this.input(Digit.h4);
    }

    /**
     * Ввод 5
     * Operation "5"
     */
    exec05() {
        return this.input(Digit.h5);
    }

    /**
     * Ввод 6
     * Operation "6"
     */
    exec06() {
        return this.input(Digit.h6);
    }

    /**
     * Ввод 7
     * Operation "7"
     */
    exec07() {
        return this.input(Digit.h7);
    }

    /**
     * Ввод 8
     * Operation "8"
     */
    exec08() {
        return this.input(Digit.h8);
    }

    /**
     * Ввод 9
     * Operation "9"
     */
    exec09() {
        return this.input(Digit.h9);
    }

    /**
     * Ввод порядка
     * Operation "ВП"
     */
    exec0C() {
        if (this.mode == CoreMode.AddToMantissa)
            this.mode = CoreMode.AddToMagnitude;
    }

    /**
     * Stack up
     * Operation "В↑"
     */
    exec0E() {
        if (this.mode === CoreMode.AddToMagnitude || this.mode === CoreMode.AddToMantissa) {
            this.x    = this.fromBuffer();
            this.mode = CoreMode.Default;
        }
        this.t    = new Register(this.z);
        this.z    = new Register(this.y);
        this.y    = new Register(this.x);
        this.x1   = new Register(this.x);
        this.mode = CoreMode.Added;
    }

    /**
     * Умножение
     * Operation "×"
     */
    exec12() {
        let x = this.x;
        let y = this.y;
        this.stackDown();
        this.x = x.mul(y);
    }

    /**
     * Деление
     * Operation "÷"
     */
    exec13() {
        let x = this.x;
        let y = this.y;
        this.stackDown();
        this.x = y.div(x);
    }
}