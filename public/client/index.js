"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Redux = require("redux");
var ReactDOM = require("react-dom");
var App_1 = require("./App");
var store_1 = require("./app/store");
var react_redux_1 = require("react-redux");
var atypes_1 = require("./app/atypes");
var MK52_1 = require("../emk/MK52");
var store = Redux.createStore(store_1.reducer);
store.dispatch({
    type: atypes_1.ActionTypes.SET_STATE,
    state: {
        calc: new MK52_1.MK52(),
        display: new MK52_1.MKDisplay(MK52_1.DisplayMode.Loading),
        counter: 0,
        counter2: 1,
    },
});
setTimeout(function () { return store.dispatch({
    type: atypes_1.ActionTypes.LOAD,
    state: {
        calc: new MK52_1.MK52(),
        display: new MK52_1.MKDisplay(MK52_1.DisplayMode.Loading),
        counter: 0,
        counter2: 1,
    },
}); }, 500);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(App_1.App, null)), document.getElementById("app"));
//# sourceMappingURL=index.js.map