import { Register } from './register';

export class Registers {
    public values: Register[] = [];
    public regs: string[]     = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];

    constructor(obj?: Registers) {
        if (obj) {
            this.regs = obj.regs;
            this.regs.forEach(reg => this.values[reg] = obj.values[reg]);
        }
        else
            this.regs.forEach(reg => this.values[reg] = new Register());
    }

    public get(reg: string): Register {
        return this.values[reg];
    }

    public set(reg: string, value: Register): Registers {
        const result       = new Registers(this);
        result.values[reg] = value;
        return result;
    }
}