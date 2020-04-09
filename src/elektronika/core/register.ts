import BigNumber from 'bignumber.js';

export interface IRegister {
    mantissa: number;
    exp: number;
    negative: boolean;
}

export class Register implements IRegister {
    public static fromBigNumber(bigNumber: BigNumber): Register {
        const exponential = bigNumber.toExponential(8);
        return Register.fromExponential(exponential);
    }

    public static fromExponential(exponential: string): Register {
        console.log(exponential);
        const match = exponential.match(/^(-?[1-9]|-?[1-9]\.\d+|0|0.0+)e([+-]\d+)+$/);
        console.log(match);
        if (!match)
            throw new Error(`Invalid exponential format in "${exponential}"`);
        let [, rawMantissa, rawExp] = match;
        const dotIndexOf = rawMantissa.indexOf('.');
        if (dotIndexOf !== -1)
            while (rawMantissa.substr(-1) === '0')
                rawMantissa = rawMantissa.substr(0, rawMantissa.length - 1);

        const mantissa = +rawMantissa.replace('.', '');
        const additionalExp = dotIndexOf === -1
            ? 0
            : rawMantissa.length - dotIndexOf - 1;
        const exp = +rawExp - additionalExp;
        console.log(mantissa, exp);
        const register = Register.intNormalize(mantissa, exp);
        console.log(register);
        return new Register({
            ...register,
            exp: exp - register.exp,
        });
    }

    private static intNormalize(value: number, exp: number = 0): IRegister {
        if (!value)
            return {mantissa: 0, exp: 0, negative: false};

        console.log('-1', value, exp);

        let negative = false;

        if (value < 0) {
            negative = true;
            value = -value;
        }

        // Приводим к целочисленной мантисе из 8 цифр

        if (value < 10 ** 8)
            while (value * 10 ** (-exp) < 10 ** 7)
                exp--;
        else
            while (value * 10 ** (-exp) >= 10 ** 8)
                exp++;

        console.log('0', value, exp);

        let mantissa = Math.round(value * 10 ** (-exp));

        // Избавляемся от незначащих нулей

        console.log('1', mantissa, exp);

        if (mantissa % 10000 === 0) {
            exp += 4;
            mantissa /= 10000;
        }

        console.log('2', mantissa, exp);
        if (mantissa % 100 === 0) {
            exp += 2;
            mantissa /= 100;
        }

        console.log('3', mantissa, exp);
        if (mantissa % 10 === 0) {
            exp += 1;
            mantissa /= 10;
        }

        return {
            mantissa,
            exp,
            negative,
        };
    }

    private static toString(reg: IRegister): string {
        const sum = reg.exp + reg.mantissa.toString().length;

        if (sum > 8 || sum < -6) {
            let mant = reg.mantissa.toString();
            let exp = reg.exp + mant.length - 1;
            return buildString(
                reg.negative,
                mant.substr(0, 1) + '.' + mant.substr(1),
                exp,
            );
        }

        if (sum >= 0) {
            const mant = (reg.mantissa).toString();

            if (reg.exp >= 0) {
                return buildString(
                    reg.negative,
                    (reg.mantissa * 10 ** reg.exp).toString().substr(0, 9),
                    0,
                );
            }

            return buildString(
                reg.negative,
                mant.substr(0, mant.length + reg.exp) + '.' + mant.substr(reg.exp),
                0,
            );
        } else {
            const mant = '0.' + '0'.repeat(-1 - reg.exp) + reg.mantissa.toString();
            console.log(sum, reg.mantissa, reg.exp, mant);
            return buildString(
                reg.negative,
                mant,
                0,
            );
        }
    }

    public mantissa: number = 0;
    public exp: number = 0;
    public negative: boolean = false;

    constructor(value?: number | IRegister | IInputRegister, exp?: number) {
        if (value)
            if (typeof value === 'number')
                Object.assign(this, Register.intNormalize(value));
            else if ('text' in value)
                Object.assign(this, {
                    mantissa: parseInt((value as IInputRegister).text, 10),
                    exp: 0,//value.exp,
                    negative: false,//value.negative,
                });
            else
                Object.assign(this, {
                    mantissa: value.mantissa,
                    exp: value.exp,
                    negative: value.negative,
                });

        //Object.freeze(this);
    }

    public toString(): string {
        return Register.toString(this);
    }

    public toNumber(): number {
        return this.mantissa * 10 ** this.exp * (this.negative ? -1 : 1);
    }

    public input(num: number): Register {
        return (new InputRegister()).input(num);
    }

    public changeSign(): Register {
        return new Register({
            mantissa: this.mantissa,
            exp: this.exp,
            negative: !this.negative,
        });
    }
}

interface IInputRegister {
    text: string;
    dot: number;
}

export class InputRegister extends Register implements IInputRegister {
    public text: string = '';
    public dot: number = 0;

    constructor(value?: IInputRegister) {
        super();
        Object.assign(this, value);
    }

    public input(num: number): InputRegister {
        let text = this.text;
        let dot = this.dot;
        if (num >= 0) {
            if (text.length < 8)
                text += num;

            return new InputRegister({
                text,
                dot,
            });
        } else {
            if (dot)
                return this;

            return new InputRegister({
                text: this.text,
                dot: text.length,
            });
        }
    }

    public toString(): string {
        if (this.dot) {
            let text = this.text;
            text = text.substr(0, this.dot) + '.' + text.substr(this.dot);
            return buildString(this.negative, text, this.exp);
        } else {
            let text = this.text;
            if (!text)
                text = '0';
            return buildString(this.negative, text + '.', this.exp);
        }
    }
}

function buildString(negative: boolean, mant: string, exponent: number): string {
    if (mant.length > 9)
        throw new Error(`Max length of "mant" must <= 9 symbols, but "${mant}:`);
    if (mant.indexOf('.') === -1) mant += '.';
    if (mant.length < 9) mant += ' '.repeat(9 - mant.length);
    let exp = 'err';

    if (exponent === 0)
        exp = '   ';
    else if (exponent <= -100)
        exp = '-er';
    else if (exponent <= -10)
        exp = exponent.toString();
    else if (exponent < 0)
        exp = '-0' + (-exponent);
    else if (exponent < 10)
        exp = ' 0' + exponent;
    else if (exponent < 100)
        exp = ' ' + exponent;
    else
        exp = '+er';

    return (negative ? '-' : ' ') + mant + exp;
}
