import { CalculatorStatus } from './calculator';
import { Stack } from './core/stack';
import { Registers } from './core/registers';
import { Programm } from './core/programm';
import { Cmd } from './core/commands';

export interface IVariousCalculator {
    status?: CalculatorStatus;
    stack?: Stack;
    registers?: Registers;
    programm?: Programm;
    keys?: string[];
    command?: ICoreCommand;

    stat?: {
        executed?: number;
        lastRunExecuted?: number;
    }
}

export interface ICalculator extends IVariousCalculator {
    status: CalculatorStatus;
    stack: Stack;
    registers: Registers;
    programm: Programm;
    keys: string[];
    command: ICoreCommand;

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

export type ICoreOperation = (calc: ICalcCtrl, option?: any) => IVariousCalculator;

export enum CoreCommandType {
    Single,
    WithAddress,
    WithRegister,
}

export interface ICoreCommand {
    type: CoreCommandType;
    operation: ICoreOperation;
}

export interface ICore {
    [key: string]: ICoreCommand;
}