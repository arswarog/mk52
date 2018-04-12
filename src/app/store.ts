//import { ActionTypes } from "./atypes";
//import { Mk52 } from "../emk/mk52";
//import { MKDisplay } from "../emk/mkdisplay";
//
//export interface IStoreState {
//    calc?: Mk52;
//    display?: MKDisplay;
//}
//
//export var reducer = function(state: IStoreState = {}, action) {
//    console.log('ACT', action);
//    switch (action.type) {
//        case ActionTypes.SET_STATE:
//            return action.state;
//
//        case ActionTypes.ADD_ITEM:
//            state         = Object.assign({}, state);
//            state.display = state.calc.display;
//            return state;
//
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
//    }
//
//    return state;
//};