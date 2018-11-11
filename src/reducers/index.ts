import { ICalculatorState } from '../elektronika/common';
import { calc } from './calc';
import { combineReducers } from 'redux';

export interface IGlobalState {
    calc: ICalculatorState;
}

export const globalReducer = combineReducers({
    calc,
});