import { calc, ICalcState } from './calc';
import { combineReducers } from 'redux';
import { github, IGithubState } from './github';

export interface IGlobalState {
    calc: ICalcState;
    github: IGithubState;
}

export const globalReducer = combineReducers({
    calc,
    github,
});