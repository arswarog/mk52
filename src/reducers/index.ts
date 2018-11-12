import { calc, ICalcState } from './calc';
import { combineReducers } from 'redux';

export interface IGlobalState {
    calc: ICalcState;
}

export const globalReducer = combineReducers({
    calc,
});