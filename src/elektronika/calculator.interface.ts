import { CalculatorStatus } from './calculator';
import { IStack, Stack } from './core/stack';
import { Registers } from './core/registers';
import { Program } from './core/program';
import { Cmd } from './core/commands';

export interface IVariousCalculator {
    status?: CalculatorStatus;
    stack?: IStack;
    registers?: Registers;
    program?: Program;
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
    program: Program;
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

// система команд
export interface ICore {
    [key: string]: ICoreCommand;
}
