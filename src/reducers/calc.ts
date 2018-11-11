import { Calculator } from '../elektronika';
import { ICalculatorState } from '../elektronika/common';
import { AnyAction } from 'redux';
import { MK52Core, MK52Keyboard } from '../elektronika/models/mk52';

export function calc(state: ICalculatorState, action: AnyAction): ICalculatorState {
    if (!state)
        state = {
            core    : new Calculator(MK52Core),
            keyboard: MK52Keyboard,
        };
    return state;
}
