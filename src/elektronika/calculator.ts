import { MKButton } from './common';
import { Stack } from './core/stack';
import { Registers } from './core/registers';
import { Program } from './core/program';
import {
    CoreCommandType,
    ICalcCtrl,
    ICalculator,
    ICore,
    ICoreCommand,
    IVariousCalculator,
} from './calculator.interface';
import { Cmd, CmdCodes } from './core/commands';

export enum CalculatorStatus {
    Standart,
    Input,
    InputEx,
    Program,
    Run,
}

export class Calculator implements ICalculator {
    public status: CalculatorStatus = null;
    public stack: Stack = null;
    public registers: Registers = null;
    public program: Program = null;
    public keys: string[] = [];
    public command: ICoreCommand = null;

    public stat = {
        executed: 0,
        lastRunExecuted: 0,
    };

    constructor(private core: ICore, init: boolean = true) {
        if (init) {
            this.status = CalculatorStatus.Standart;
            this.stack = new Stack();
            this.program = new Program();
            this.registers = Registers.empty();
            this.keys = [];
            this.command = null;
        }
    }

    public reset(): Calculator {
        return new Calculator(this.core, true);
    }

    public clone(state?: IVariousCalculator) {
        const calc: any = {};
        let changes = 0;
        if (state)
            ['status', 'stack', 'program', 'registers', 'keys', 'command', 'stat'].forEach(
                key => {
                    if (key in state && (state as any)[key] !== (this as any)[key]) {
                        calc[key] = (state as any)[key];
                        changes++;
                    }
                },
            );
        else
            changes = 1;

        if (changes)
            return Object.assign(new Calculator(this.core, false), this, calc);
        else
            return this;
    }

    public display(): string {
        return this.stack.x.toString();
    }

    public toObject(state: object = {}): ICalculator {
        return Object.assign({
            status: this.status,
            stack: this.stack,
            registers: this.registers,
            program: this.program,
            keys: this.keys,
            stat: this.stat,
            command: this.command,
        }, state);
    }

    // tslint:disable
    public keyPress(key: MKButton): Calculator {
        let result: Calculator = null;
        if (this.command && (result = this._keyPress(key.cmd)))
            return result;

        if (this.keys.length === 0) {
            if (key.cmd === Cmd.F)
                return this.clone({
                    keys: ['F'],
                });
            if (key.cmd === Cmd.K)
                return this.clone({
                    keys: ['K'],
                });
        }

        if (this.keys.length === 1) {
            if (this.keys[0] === 'F' && (result = this._keyPress(key.cmdf)))
                return result.clone({keys: []});
            if (this.keys[0] === 'K' && (result = this._keyPress(key.cmdk)))
                return result.clone({keys: []});
        }

        if (result = this._keyPress(key.cmd)) return result;

        return this;
    }

    private _keyPress(cmd: Cmd): Calculator | null {
        if (!this.command) {
            const command = this.core[cmd];

            if (!command)
                return null;

            switch (command.type) {
                case CoreCommandType.Single:
                    return this._exec(cmd, cmd);
                default:
                    return this.clone({command});
            }
        }
        if (this.command) {
            switch (this.command.type) {
                case CoreCommandType.WithRegister:
                    if (isCmdNumber(cmd))
                        return this.clone({
                            ...this.command.operation(this, cmdToNumber(cmd)),
                            command: null,
                            keys: [],
                            stat: {
                                ...this.stat,
                                executed: this.stat.executed + 1,
                            },
                        });
                case CoreCommandType.WithAddress:
                    if (isCmdNumber(cmd))
                        if (this.keys.length === 1)
                            return this.clone({
                                ...this.command.operation(this, cmdToNumber(this.keys[0] as Cmd) + cmdToNumber(cmd)),
                                command: null,
                                keys: [],
                                stat: {
                                    ...this.stat,
                                    executed: this.stat.executed + 1,
                                },
                            });
                        else
                            return this.clone({
                                keys: [cmd],
                            });
                case CoreCommandType.Single:
                default:
                    throw new Error('Invalid command');
            }
            return null;
        }
        return null;
        // if (execute in this.core)
        //     return this.clone(this.core[execute].operation(this, cmd));
        // else
        //     throw new Error(`Unknown cmd "${CmdCodes[execute]}" (code ${execute})`);
    }

    /// TODO need refactoring
    public _exec(execute: string, cmd: Cmd): Calculator {
        if (execute in this.core)
            return this.clone(this.core[execute].operation(this, cmd));
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


function isCmdNumber(cmd: Cmd): boolean {
    return !!cmd.match(/^0\d$/);
}

function cmdToNumber(cmd: Cmd): string {
    return cmd.substr(1, 1);
}
