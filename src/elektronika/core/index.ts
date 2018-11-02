import { MKButton } from '../common';
import { Key } from '../core-utils/Key';
import { Stack } from './stack';
import { Registers } from './registers';
import { Programm } from './programm';
import { ICore } from './core.interface';
import { Cmd } from "./commands";

export enum CoreStatus {
    Standart,
    Input,
    InputEx,
    Programm,
    Run,
}

export class MKCore implements ICore {
    public status: CoreStatus   = null;
    public stack: Stack         = null;
    public registers: Registers = null;
    public programm: Programm   = null;
    public keyboard: MKButton[][];
    private keys: string[]      = [];

    public constructor(state?: ICore) {
        this.status    = state ? state.status : CoreStatus.Standart;
        this.stack     = state ? state.stack : new Stack();
        this.programm  = state ? state.programm : new Programm();
        this.registers = state ? state.registers : new Registers();

        console.log(this.keyboard);

        setTimeout(() => this.keyA4(), 200);
    }

    public reset(): MKCore {
        return this;
    }

    public keyPress(key: string): MKCore {
        let func = 'key' + key;

        if (func in this)
            return this[func]();
        else
            throw new Error(`Unknown key ${key}`);
    }

    @Key({
        key: '',
    })
    public keyA1(): MKCore {
        if (this.keys.length)
            return this;
        this.keys.push('F');
        return this;
    }

    @Key({
        key: '',
    })
    public keyA4(): MKCore {
        '7';
        console.log('ok');
        return this;
    }

    public exec(code: Cmd): MKCore {
        // code     = code.toUpperCase();
        let func = 'exec' + code;
        if (func in this)
            return this[func]();

        func = 'exec' + (''+code).substr(0, 1);
        if (func in this)
            return this[func]((''+code).substr(1, 1));

        throw new Error(`Unknown command "${code}"`);
    }
}
