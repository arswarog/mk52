import { Data } from "./data";
import { ActionTypes } from "./atypes";

export function addItem() {
    return {
        type: ActionTypes.ADD_ITEM,
    };
}

export function pressButton(code) {
    return {
        type: ActionTypes.PRESS_BUTTON,
        code,
    };
}
