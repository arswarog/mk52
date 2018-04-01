import { ActionTypes } from "./atypes";
import { MK52, MKDisplay } from "../../emk/MK52";

export interface IStoreState {
    calc?: MK52;
    display?: MKDisplay;
    counter?: number;
    counter2?: number;
}

export var reducer = function(state: IStoreState = {}, action) {
    console.log('ACT', action);
    switch (action.type) {
        case ActionTypes.SET_STATE:
            return action.state;

        case ActionTypes.ADD_ITEM:
            state         = Object.assign({}, state);
            state.display = state.calc.display;
            state.counter++;
            return state;

        case ActionTypes.LOAD:
            state = Object.assign({}, state);
            state.calc.start();
            state.display = state.calc.display;
            state.counter++;
            return state;

        case ActionTypes.PRESS_BUTTON:
            state = Object.assign({}, state);
            state.calc.press(action.code);
            state.display = state.calc.display;
            state.counter ++;
            console.log('-----', state.display);
            return state;
    }

    return state;
};