import { Calculator } from '../elektronika/index';
import { AnyAction } from 'redux';
import { MK52Core } from '../elektronika/models/mk52';

export interface IGlobalState {
    mk: Calculator;
}

export function globalReducer(state: IGlobalState, action: AnyAction): IGlobalState {
    if (!state)
        state = {
            mk: new Calculator(MK52Core),
        };
    return state;
}