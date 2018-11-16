import { Calculator } from '../elektronika/calculator';
import { MKButton } from '../elektronika/common';
import { AnyAction } from 'redux';
import { MK52Core, MK52Keyboard } from '../elektronika/models/mk52';
import { keyLabels } from '../elektronika/l18n';
import { initKeyboard } from '../keyboard';

export interface ICalcState {
    keyboard: MKButton[][];
    core: Calculator;

    cmdLabels: {[key: string]: string};
}

export function calc(state: ICalcState, action: AnyAction): ICalcState {
    if (!state) {
        state = {
            core     : new Calculator(MK52Core),
            keyboard : MK52Keyboard,
            cmdLabels: keyLabels,
        };
        initKeyboard(state.keyboard);
    }

    console.log('action:', action);

    switch (action.type) {
        case 'KEY_PRESS':
            return {
                ...state,
                core: state.core.keyPress(action.button),
            };
    }
    return state;
}
