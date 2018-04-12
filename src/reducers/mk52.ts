import { ActionTypes } from "../actions";
import { IControllerState } from "../emk";
import { MkEvents } from "../actions/mk52";
import { MKButton } from "../emk/common";

export interface IMkState {
    core?: IControllerState;
    display?: any;//MKDisplay;
    counter: number;
    keyboard: MKButton[][];
}

export var mk52 = function(state: IMkState = null, action) {
    console.log('ACT', action);
    switch (action.type) {
        case MkEvents.SetState:
            return action.state;

        case ActionTypes.ADD_ITEM:
            return {
                ...state,
                counter: state.counter + 1,
            };

//        case ActionTypes.LOAD:
//            state = Object.assign({}, state);
//            state.calc.start();
//            state.display = state.calc.display;
//            return state;
//
//        case ActionTypes.PRESS_BUTTON:
//            state = Object.assign({}, state);
//            state.calc.press(action.code);
//            state.display = state.calc.display;
//            console.log('-----', state.display);
//            return state;
        default:
            return state;
    }
};
