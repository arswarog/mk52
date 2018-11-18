import { Error } from 'tslint/lib/error';

export interface IRegister {
    mantissa: number;
    exp: number;
    negative: boolean;
}

export class Register implements IRegister {
    private static intNormalize(value: number): IRegister {
        if (!value)
            return {mantissa: 0, exp: 0, negative: false};

        let exp      = 0;
        let negative = false;

        if (value < 0) {
            negative = true;
            value    = -value;
        }

        // Приводим к целочисленной мантисе из 8 цифр

        if (value < 10 ** 8)
            while (value * 10 ** (-exp) < 10 ** 7)
                exp--;
        else
            while (value * 10 ** (-exp) >= 10 ** 8)
                exp++;

        let mantissa = Math.round(value * 10 ** (-exp));

        // Избавляемся от незначащих нулей

        if (mantissa % 10000 === 0) {
            exp += 4;
            mantissa /= 10000;
        }

        if (mantissa % 100 === 0) {
            exp += 2;
            mantissa /= 100;
        }

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
            let exp  = reg.exp + mant.length - 1;
            mant     = mant.substr(0, 1) + '.' + mant.substr(1);
            return buildString(
                reg.negative,
                mant,
                exp,
            );
        }

        if (sum >= 0) {
            return buildString(
                reg.negative,
                (reg.mantissa * 10 ** reg.exp).toString().substr(0, 9),
                0,
            );
        } else {
            let mant = '0.' + '0'.repeat(-1 - reg.exp) + reg.mantissa.toString();
            return buildString(
                reg.negative,
                mant,
                0,
            );
        }
    }

    public mantissa: number  = 0;
    public exp: number       = 0;
    public negative: boolean = false;

    constructor(value?: number | IRegister | IInputRegister) {
        if (value)
            if (typeof value === 'number')
                Object.assign(this, Register.intNormalize(value));
            else if ('text' in value)
                Object.assign(this, {
                    mantissa: parseInt((value as IInputRegister).text, 10),
                    exp     : 0,//value.exp,
                    negative: false,//value.negative,
                });
            else
                Object.assign(this, {
                    mantissa: value.mantissa,
                    exp     : value.exp,
                    negative: value.negative,
                });

        //Object.freeze(this);
    }

    public toString(): string {
        return Register.toString(this);
    }

    public input(num: number): Register {
        return (new InputRegister()).input(num);
    }

    public changeSign(): Register {
        return new Register({
            mantissa: this.mantissa,
            exp     : this.exp,
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
    public dot: number  = 0;

    constructor(value?: IInputRegister) {
        super();
        Object.assign(this, value);
    }

    public input(num: number): InputRegister {
        let text = this.text;
        let dot  = this.dot;
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
                dot : text.length,
            });
        }
    }

    public toString(): string {
        if (this.dot) {
            let text = this.text;
            text     = text.substr(0, this.dot) + '.' + text.substr(this.dot);
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