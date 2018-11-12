import { Calculator } from '../elektronika';
import { MKButton } from '../elektronika/common';
import { AnyAction } from 'redux';
import { MK52Core, MK52Keyboard } from '../elektronika/models/mk52';
import { keyLabels } from '../elektronika/l18n';

export interface ICalcState {
    keyboard: MKButton[][];
    core: Calculator;

    cmdLabels: { [key: string]: string };
}

export function calc(state: ICalcState, action: AnyAction): ICalcState {
    if (!state)
        state = {
            core     : new Calculator(MK52Core),
            keyboard : MK52Keyboard,
            cmdLabels: keyLabels,
        };
    return state;
}
