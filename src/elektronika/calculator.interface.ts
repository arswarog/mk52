import { CalculatorStatus } from './index';
import { Stack } from './core/stack';
import { Registers } from './core/registers';
import { Programm } from './core/programm';
import { Cmd } from './core/commands';

export interface ICalculator {
    status: CalculatorStatus;
    stack: Stack;
    registers: Registers;
    programm: Programm;
    keys: string[];
}

export interface ICore {
    [key: string]: (calc: ICalculator, command?: Cmd) => ICalculator;
}