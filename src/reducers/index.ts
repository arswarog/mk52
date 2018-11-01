import { MKCore } from "../elektronika/core";
import { AnyAction } from "redux";

export interface IGlobalState {
    mk: MKCore;
}

export function globalReducer(state: IGlobalState, action: AnyAction): IGlobalState {
    if (!state)
        state = {
            mk: new MKCore(),
        };
    return state;
}