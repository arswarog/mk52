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

    stat: {
        executed: number;
        lastRunExecuted: number;
    }
}

export interface ICalculatorCtrl {
    _exec(execute: string, cmd: Cmd): ICalcCtrl;
    _commandComplete(state: ICalculator): ICalcCtrl;
    _commandRunOther(state: ICalculator, cmd: Cmd): ICalcCtrl;
}

export type ICalcCtrl = ICalculator & ICalculatorCtrl;

export interface ICore {
    [key: string]: (calc: ICalcCtrl, command?: Cmd) => ICalcCtrl;
}