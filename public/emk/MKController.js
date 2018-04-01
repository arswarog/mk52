"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MK52Core_1 = require("./MK52Core");
var register_1 = require("./register");
var MK52_1 = require("./MK52");
var ControllerMode;
(function (ControllerMode) {
    ControllerMode[ControllerMode["Loading"] = 0] = "Loading";
    ControllerMode[ControllerMode["User"] = 1] = "User";
    ControllerMode[ControllerMode["Programming"] = 2] = "Programming";
    ControllerMode[ControllerMode["Run"] = 3] = "Run";
})(ControllerMode = exports.ControllerMode || (exports.ControllerMode = {}));
var MKController = /** @class */ (function () {
    function MKController() {
        this._mode = ControllerMode.Loading;
        this.core = new MK52Core_1.MK52Core();
    }
    Object.defineProperty(MKController.prototype, "display", {
        get: function () {
            switch (this._mode) {
                case ControllerMode.Loading:
                    return new MK52_1.MKDisplay(MK52_1.DisplayMode.Loading);
                default:
                    return new MK52_1.MKDisplay(this.core.display);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKController.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKController.prototype, "stack", {
        get: function () {
            return {
                x1: this.core.x1,
                x: this.core.x,
                y: this.core.y,
                z: this.core.z,
                t: this.core.t,
            };
        },
        enumerable: true,
        configurable: true
    });
    MKController.prototype.start = function () {
        this._mode = ControllerMode.User;
    };
    MKController.prototype.press = function (code) {
        console.log("CODE " + code);
        this.core.x.add(new register_1.Register(1.010));
    };
    return MKController;
}());
exports.MKController = MKController;
//# sourceMappingURL=MKController.js.map