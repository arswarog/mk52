"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atypes_1 = require("./atypes");
exports.reducer = function (state, action) {
    if (state === void 0) { state = {}; }
    console.log('ACT', action);
    switch (action.type) {
        case atypes_1.ActionTypes.SET_STATE:
            return action.state;
        case atypes_1.ActionTypes.ADD_ITEM:
            state = Object.assign({}, state);
            state.display = state.calc.display;
            state.counter++;
            return state;
        case atypes_1.ActionTypes.LOAD:
            state = Object.assign({}, state);
            state.calc.start();
            state.display = state.calc.display;
            state.counter++;
            return state;
        case atypes_1.ActionTypes.PRESS_BUTTON:
            state = Object.assign({}, state);
            state.calc.press(action.code);
            state.display = state.calc.display;
            state.counter++;
            console.log('-----', state.display);
            return state;
    }
    return state;
};
//# sourceMappingURL=store.js.map