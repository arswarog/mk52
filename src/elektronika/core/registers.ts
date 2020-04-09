import { Register } from './register';
import { Map } from 'immutable';

export enum RegisterName {
    R0 = '0',
    R1 = '1',
    R2 = '2',
    R3 = '3',
    R4 = '4',
    R5 = '5',
    R6 = '6',
    R7 = '7',
    R8 = '8',
    R9 = '9',
    RA = 'a',
    RB = 'b',
    RC = 'c',
    RD = 'd',
    RE = 'e',
}

const registerNames = Object.values(RegisterName);

export class Registers {
    public readonly values: Map<RegisterName, Register>;

    public static empty() {
        const values = Map<RegisterName, Register>(
            registerNames.map(
                (key: RegisterName) => [key, new Register()],
            ),
        );

        return Registers.makeByMap(values);
    }

    constructor(obj: Registers) {
        this.values = obj.values;
    }

    public get(reg: RegisterName): Register {
        if (!isRegisterName(reg))
            throw new Error(`"${reg}" not a RegisterName`);
        return this.values.get(reg);
    }

    public set(reg: RegisterName, value: Register): Registers {
        if (!isRegisterName(reg))
            throw new Error(`"${reg}" not a RegisterName`);

        return Registers.makeByMap(this.values.set(reg, value));
    }

    private static makeByMap(map: Map<RegisterName, Register>): Registers {
        return new Registers({
            values: map,
        } as any);
    }
}

export function isRegisterName(reg: RegisterName): boolean {
    return registerNames.indexOf(reg) !== -1;
}
