"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atypes_1 = require("./atypes");
function addItem() {
    return {
        type: atypes_1.ActionTypes.ADD_ITEM,
    };
}
exports.addItem = addItem;
function pressButton(code) {
    return {
        type: atypes_1.ActionTypes.PRESS_BUTTON,
        code: code,
    };
}
exports.pressButton = pressButton;
//# sourceMappingURL=actions.js.map