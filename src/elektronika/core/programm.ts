import { Cmd } from './commands';
import { hex2dec } from './_funcs';

export class Programm {
    public bytes: Cmd[] = [];
    public address: number = 0;

    public pushCmd(cmd: Cmd | string): Programm {
        const bytes = [...this.bytes];
        bytes[this.address] = cmd as Cmd;

        return Object.assign(new Programm(), {
            bytes,
            address: this.address + 1,
        });
    }

    public goto(address: string): Programm {
        const index = hex2dec(address.substr(0, 1)) * 10 + hex2dec(address.substr(1, 1));

        return Object.assign(new Programm(), {
            bytes: this.bytes,
            address: index,
        });

    }
}