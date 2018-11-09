import { MKButton } from './common';
import { MK52Keyboard } from './models/mk52';
import { Stack } from './core/stack';
import { Registers } from './core/registers';
import { Programm } from './core/programm';
import { ICalcCtrl, ICalculator, ICore } from './calculator.interface';
import { Cmd, CmdCodes } from './core/commands';

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

    public stat = {
        executed       : 0,
        lastRunExecuted: 0,
    };

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
            stat     : this.stat,
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

            return this._exec(cmd, cmd);
            // if (cmd in this.core)
            //     return this.clone(this.core[cmd](this, cmd));
            // else
            //     throw new Error(`Unknown cmd "${CmdCodes[cmd]}" (code ${cmd})`);
        }

        if (this.keys.length === 1) {
            if (this.keys[0] === 'F') cmd = key.cmdf;
            if (this.keys[0] === 'K') cmd = key.cmdk;
            if (cmd in this.core) {
                return this.clone(
                    this.core[cmd]({
                        ...this as any,
                        keys: [],
                    }),
                );
            }
        }

        cmd = this.keys[0];

        return this._exec(cmd, key.cmd);
        // if (cmd in this.core)
        //     return this.clone(this.core[cmd](this, key.cmd));
        // else
        //     throw new Error(`Unknown cmd "${CmdCodes[cmd]}" (code ${cmd})`);
    }

    public _exec(execute: string, cmd: Cmd): Calculator {
        if (execute in this.core)
            return this.clone(this.core[execute](this, cmd));
        else
            throw new Error(`Unknown cmd "${CmdCodes[execute]}" (code ${execute})`);
    }

    /**
     * FIXME
     * @param state
     * @private
     */
    public _commandComplete(state: ICalcCtrl): Calculator {
        state.stat = {
            ...this.stat,
            executed: this.stat.executed + 1,
        };
        state.keys = [];
        return this.clone(state);
    }

    /**
     * FIXME
     * @param state
     * @param cmd
     * @private
     */
    public _commandRunOther(state: ICalcCtrl, cmd: Cmd): Calculator {
        const calc = this.clone(state);
        return calc._exec(cmd, cmd);
    }
}
