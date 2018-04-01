import * as React from 'react';
import * as Redux from 'redux';
import * as ReactDOM from 'react-dom';
import { App } from "./App";
import { reducer } from "./app/store";
import { Provider } from "react-redux";
import { ActionTypes } from "./app/atypes";
import { DisplayMode, MK52, MKDisplay } from "../emk/MK52";

let store = Redux.createStore(reducer);

store.dispatch({
    type : ActionTypes.SET_STATE,
    state: {
        calc    : new MK52(),
        display : new MKDisplay(DisplayMode.Loading),
        counter : 0,
        counter2: 1,
    },
});

setTimeout(() => store.dispatch({
    type : ActionTypes.LOAD,
    state: {
        calc    : new MK52(),
        display : new MKDisplay(DisplayMode.Loading),
        counter : 0,
        counter2: 1,
    },
}), 500);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("app"),
);
