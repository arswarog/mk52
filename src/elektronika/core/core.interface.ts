import { CoreStatus } from './index';
import { Stack } from './stack';
import { Registers } from './registers';
import { Programm } from './programm';
import { Cmd } from "./commands";

export interface ICore {
    status: CoreStatus;
    stack: Stack;
    registers: Registers;
    programm: Programm;
}

export interface IKernel {
    [key: string]: (core: ICore, command?: Cmd) => ICore;
}