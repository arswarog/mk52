export enum Digit {
    h0, h1, h2, h3, h4, h5, h6, h7, h8, h9, hA, hB, hC, hD, hE, hF,
        empty, dot, minus,
}

console.log(Digit.h0, Digit.h1);

export class Register {
    private static PREC = 10 ** 9;

    private mantissa: number  = 0;
    private magnitude: number = 0;

    get mant() {
        return this.mantissa;
    }

    get magn() {
        return this.magnitude;
    }

    get magnToNormal() {
        let delta = 0;
        let mant  = this.mant;
        while (mant >= 10 || mant <= -10) {
            mant /= 10;
            delta++;
        }
        while (mant > 0 && mant < 1) {
            mant *= 10;
            delta--;
        }
        let smant = '' + mant;
        for (let i = smant.length - 1; smant[i] === '0'; i--) {
            delta++;
        }
        return delta;
    }

    constructor();
    constructor(value: number);
    constructor(register: Register);
    constructor(mantissa: number, magnitude: number);
    constructor(mantissa: number | Register = 0, magnitude: number = 0) {
        if (mantissa instanceof Register) {
            this.mantissa  = mantissa.mantissa;
            this.magnitude = mantissa.magnitude;
            return;
        }

        this.magnitude = magnitude;
        let origin     = mantissa;
        if (mantissa === 0)
            return;

        this.mantissa = mantissa;
        this.normalize();
//        console.log(`CONVERT ${origin} TO ${this.mantissa} * 10 ** ${this.magnitude}`);
    }

    toNumber(): number {
//        console.log(`CONVERT ${this.mantissa} * 10 ** ${this.magnitude} TO ${this.mantissa * 10 ** this.magnitude}`);
        return this.mantissa * 10 ** this.magnitude;
    }

    private toMagn(magn: number): number {
        return 0;
    }

    private normalize(): void {
        let sgn = 1;

        if (this.mantissa < 0) {
            sgn           = -1;
            this.mantissa = -this.mantissa;
        }
        while (this.mantissa < Register.PREC) {
            this.mantissa *= 10;
            this.magnitude--;
        }
        while (this.mantissa > Register.PREC * 10) {
            this.mantissa /= 10;
            this.magnitude++;
        }
        while (this.mantissa >= 10 && this.mantissa / 10 === Math.round(this.mantissa / 10)) {
            this.mantissa /= 10;
            this.magnitude++;
        }

        this.mantissa = Math.round(this.mantissa) * sgn;
    }

    /**
     * Сложение
     * @param {Register} y
     * @return {Register}
     */
    add(y: Register): Register {
        if (y.magn + 10 < this.magn)
            return new Register(this);
        if (y.magn - 10 > this.magn) {
            this.mantissa  = y.mantissa;
            this.magnitude = y.magnitude;
            return;
        }

    }

    /**
     * Умножение
     * @param {Register} y
     * @return {Register}
     */
    mul(y: Register): Register {
        let mant = this.mantissa * y.mantissa;
        let magn = this.magnitude + y.magnitude;

        return new Register(mant, magn);
    }

    /**
     * Деление
     * @param {Register} y Делитель
     * @return {Register}
     */
    div(y: Register): Register {
        let mant = this.mantissa / y.mantissa;
        let magn = this.magnitude - y.magnitude;

        return new Register(mant, magn);
    }
}