import { Register } from './register';

export class Registers {
    public values: Register[] = [];
    public regs: string[]     = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];

    constructor() {
        this.regs.forEach(reg => this.values[reg] = new Register());
    }
}