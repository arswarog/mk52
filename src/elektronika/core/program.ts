import { Cmd } from './commands';

//import { hex2dec } from './_funcs';

export class Program {
    public bytes: Cmd[]    = new Array(105).fill('00');
    public address: number = 0;

    public pushCmd(cmd: Cmd | string): Program {
        const bytes         = [...this.bytes];
        bytes[this.address] = cmd as Cmd;

        return Object.assign(new Program(), {
            bytes,
            address: this.address + 1,
        });
    }

    public goto(address: number): Program {
        //const index = hex2dec(address.substr(0, 1)) * 10 + hex2dec(address.substr(1, 1));

        return Object.assign(new Program(), {
            bytes: this.bytes,
            address,//: index,
        });

    }
}