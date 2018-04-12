import { IControllerState } from "../emk";

export enum MkEvents {
    SetState    = 'MK_SET_STATE',
    SetDisplay  = 'MK_SET_DISPLAY',
    PressButton = 'MK_PRESS_BUTTON',
    Loaded      = 'MK_LOADED',
}

export function setState(state: IControllerState) {
    return {
        type: MkEvents.SetState,
        state,
    };
}

export function pressButton(code: string) {
    return {
        type: MkEvents.PressButton,
        code,
    };
}

//export function setDisplay(display: MKDisplay) {
//    return {
//        type: MkEvents.SetDisplay,
//        display,
//    };
//}
//
//export function const toggleTodo = id => ( {
//    type: 'TOGGLE_TODO',
//    id,
//} );
