import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider } from "react-redux";
import { App } from "./components/App";
//import { reducer } from "./app/store";
//import { DisplayMode, MKDisplay } from "./emk/mkdisplay";
//import { Mk52 } from "./emk/mk52";

import rootReducer from './reducers';
import { ActionTypes } from "./actions";
import { MkEvents } from "./actions/mk52";
import { MK52Keyboard } from "./emk";

const store = Redux.createStore(rootReducer);

store.dispatch({
    type : ActionTypes.SET_STATE,
    state: {
//        calc    : null,//new Mk52(),
//        display : null,//new MKDisplay(DisplayMode.Loading),
        counter: 0,
    },
});
store.dispatch({
    type : MkEvents.SetState,
    state: {
        keyboard: MK52Keyboard,
//        calc    : null,//new Mk52(),
//        display : null,//new MKDisplay(DisplayMode.Loading),
        counter : 0,
//        counter2: 1,
    },
});
setInterval(() => {
    store.dispatch({
        type: ActionTypes.ADD_ITEM,
    });
    console.log('add item');
}, 1500);

///// Оканчиваем "Загрузку"
//setTimeout(() => store.dispatch({
//    type : ActionTypes.LOAD,
//    state: {
//        calc    : new Mk52(),
//        display : new MKDisplay(DisplayMode.Loading),
//        counter : 0,
//        counter2: 1,
//    },
//}), 500);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('app'),
);