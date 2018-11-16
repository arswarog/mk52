export class Register {
    public sign: boolean    = false;
    public mantissa: string = '0       ';
    public dot: number      = 0;
    public exp: number      = 0;

    constructor(value?: number | Register) {
        if (typeof value === 'number')
            if (value === 0 ||
                value > 10 ** 0 && value < 10 ** 8 ||
                value < -(10 ** 0) && value > -(10 ** 8))
                this.fromNumber(value);
            else
                this.fromExpNumber(value);

        Object.freeze(this);
    }

    public toString(): string {
        return (this.sign ? '-' : ' ')
            + `${this.mantissa.substr(0, this.dot + 1)}.${this.mantissa.substr(this.dot + 1)}`
            + numberToExpString(this.exp, 2);
    }

    private fromNumber(value: number): void {
        let m   = value.toString();
        let dot = m.indexOf('.');
        if (dot !== -1) {
            value = parseFloat(m.substr(0, 9));
            m     = value.toString();
            dot   = m.indexOf('.');
        }
        if (dot === -1) {
            this.dot      = m.length - 1;
            this.mantissa = m;
        } else {
            this.dot      = dot - 1;
            this.mantissa = m.replace('.', '');
        }

        while (this.mantissa.length < 8)
            this.mantissa += ' ';
    }

    private fromExpNumber(value: number): void {
        this.exp = 0;
        while (value >= 10 || value <= -10) {
            value /= 10;
            this.exp++;
        }
        // FIXME https://stackoverflow.com/questions/9383593/extracting-the-exponent-and-mantissa-of-a-javascript-number
        while (value > -1 && value < 1) {
            value *= 10;
            this.exp--;
        }
        this.fromNumber(value);
    }
}

function numberToExpString(value: number, len: number): string {
    if (value === 0)
        return ' '.repeat(len + 1);

    const negative = value < 0;
    let res        = Math.abs(value).toString();

    while (res.length < len)
        res = '0' + res;

    return (negative ? '-' : ' ') + res;
}