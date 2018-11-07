import { MKButton } from './common';
import { MK52Keyboard } from './models/mk52';
import { Stack } from './core/stack';
import { Registers } from './core/registers';
import { Programm } from './core/programm';
import { ICalculator, ICore } from './calculator.interface';
import { Cmd } from './core/commands';

export enum CalculatorStatus {
    Standart,
    Input,
    InputEx,
    Programm,
    Run,
}

export class Calculator implements ICalculator {
    public status: CalculatorStatus = null;
    public stack: Stack = null;
    public registers: Registers = null;
    public programm: Programm = null;
    public keyboard: MKButton[][] = MK52Keyboard;
    public keys: string[] = [];

    constructor(private core: ICore, init: boolean = true) {
        if (init) {
            this.status = CalculatorStatus.Standart;
            this.stack = new Stack();
            this.programm = new Programm();
            this.registers = new Registers();
            this.keys = [];
        }
    }

    public reset(): Calculator {
        return new Calculator(this.core, true);
    }

    public clone(state?: object) {
        const calc: object = {};
        let changes = 0;
        if (state)
            ['status', 'stack', 'programm', 'registers', 'keys'].forEach(
                key => {
                    if (state[key] && state[key] !== this[key]) {
                        calc[key] = state[key];
                        changes++;
                    }
                },
            );
        else
            changes = 1;
        if (changes)
            return Object.assign(new Calculator(this.core, false), calc);
        else
            return this;
    }

    public toObject(state: object = {}): ICalculator {
        return Object.assign({
            status   : this.status,
            stack    : this.stack,
            registers: this.registers,
            programm : this.programm,
            keys     : this.keys,
        }, state);
    }

    public keyPress(key: MKButton): Calculator {
        let cmd = null;

        if (this.keys.length === 0) {
            if (key.cmd === Cmd.F)
                return this.clone({
                    keys: ['F'],
                });
            if (key.cmd === Cmd.K)
                return this.clone({
                    keys: ['K'],
                });

            cmd = key.cmd;

            if (cmd in this.core)
                return this.clone(this.core[cmd](this, cmd));
            else
                throw new Error(`Unknown cmd "${Cmd[cmd]}" (code ${cmd})`);
        }

        if (this.keys.length === 1) {
            if (this.keys[0] === 'F') cmd = key.cmdf;
            if (this.keys[0] === 'K') cmd = key.cmdk;
            if (cmd in this.core) {
                return this.clone(
                    this.core[cmd](
                        this.toObject({
                            keys: [],
                        }),
                    ),
                );
            }
        }

        cmd = this.keys[0];

        if (cmd in this.core)
            return this.clone(this.core[cmd](this, key.cmd));
        else
            throw new Error(`Unknown cmd "${Cmd[cmd]}" (code ${cmd})`);
    }
}
