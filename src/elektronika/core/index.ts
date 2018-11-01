import {Stack} from './stack';
import {Registers} from './registers';
import {Programm} from './programm';
import {ICore, Cmd} from './core.interface';

export enum CoreStatus {
    Standart,
    Input,
    InputEx,
    Programm,
    Run,
}

export class MKCore implements ICore {
    public status: CoreStatus = null;
    public stack: Stack = null;
    public registers: Registers = null;
    public programm: Programm = null;
    private keys: string[] = [];

    public constructor(state?: ICore) {
        this.status = state ? state.status : CoreStatus.Standart;
        this.stack = state ? state.stack : new Stack();
        this.programm = state ? state.programm : new Programm();
        this.registers = state ? state.registers : new Registers();
    }

    public reset(): MKCore {
        return this;
    }

    public keyPress(key: string) {
        let func = 'key' + key;

        if (func in this)
            this[func]();
        else
            throw new Error(`Unknown key ${key}`)
    }

    public keyA1() {

    }

    public exec(code: Cmd): MKCore {
        code = code.toUpperCase();
        let func = 'exec' + code;
        if (func in this)
            return this[func]();

        func = 'exec' + code.substr(0, 1);
        if (func in this)
            return this[func](code.substr(1, 1));

        throw new Error(`Unknown command "${code}"`)
    }
}
