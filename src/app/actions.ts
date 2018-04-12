import { Data } from "./data";
import { ActionTypes } from "../actions";

export function addItem() {
    return {
        type: ActionTypes.ADD_ITEM,
    };
}
