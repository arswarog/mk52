"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var register_1 = require("./register");
var Registers = /** @class */ (function () {
    function Registers() {
    }
    return Registers;
}());
exports.Registers = Registers;
var CoreMode;
(function (CoreMode) {
    CoreMode[CoreMode["Default"] = 0] = "Default";
    CoreMode[CoreMode["AddToNumber"] = 1] = "AddToNumber";
})(CoreMode || (CoreMode = {}));
var MK52Core = /** @class */ (function () {
    function MK52Core() {
        this.mode = CoreMode.Default;
        this.x1 = new register_1.Register();
        this.x = new register_1.Register();
        this.y = new register_1.Register();
        this.z = new register_1.Register();
        this.t = new register_1.Register();
        this.ip = 0;
        this.registers = new Registers();
    }
    Object.defineProperty(MK52Core.prototype, "display", {
        get: function () {
            return this.x;
        },
        enumerable: true,
        configurable: true
    });
    MK52Core.prototype.exec = function (code) {
        return false;
    };
    return MK52Core;
}());
exports.MK52Core = MK52Core;
//# sourceMappingURL=MK52Core.js.map