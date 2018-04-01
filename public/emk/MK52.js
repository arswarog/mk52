"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MKController_1 = require("./MKController");
var register_1 = require("./register");
var DisplayMode;
(function (DisplayMode) {
    DisplayMode["Loading"] = "loading";
    DisplayMode["Simple"] = "simple";
    DisplayMode["Normal"] = "normal";
    DisplayMode["Hex"] = "hex";
    DisplayMode["Error"] = "error";
})(DisplayMode = exports.DisplayMode || (exports.DisplayMode = {}));
var MK52 = /** @class */ (function () {
    function MK52() {
        this.mk = new MKController_1.MKController();
        console.log('Create MK52');
    }
    Object.defineProperty(MK52.prototype, "display", {
        get: function () {
            if (this.mk)
                return this.mk.display;
            else
                return new MKDisplay(DisplayMode.Loading);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MK52.prototype, "stack", {
        get: function () {
            var stack = this.mk.stack;
            return {
                x1: new MKDisplay(stack.x1),
                x: new MKDisplay(stack.x),
                y: new MKDisplay(stack.y),
                z: new MKDisplay(stack.z),
                t: new MKDisplay(stack.t),
            };
        },
        enumerable: true,
        configurable: true
    });
    MK52.prototype.start = function (timeout) {
        if (timeout === void 0) { timeout = 200; }
        this.timeout = timeout;
        this.mk.start();
    };
    MK52.prototype.press = function (code) {
        this.mk.press(code);
    };
    MK52.prototype.getKeyboardConfig = function () {
        return [
            [
                new MKButton('A1', 'F', 'f', null),
                new MKButton('A2', 'ШГ→', 'b', null, 'x<0', null),
                new MKButton('A3', 'П→X', 'b', null, 'L0', null),
                new MKButton('A4', '7', 'w', '07', 'sin', null, '[x]', null),
                new MKButton('A5', '8', 'w', '08', 'cos', null, '{x}', null),
                new MKButton('A6', '9', 'w', '09', 'tg', null, 'max', null),
                new MKButton('A7', '-', 'w', null, '√', null),
                new MKButton('A8', '÷', 'w', null, '1/x', null),
            ], [
                new MKButton('B1', 'K', 'k', null),
                new MKButton('B2', 'ШГ←', 'b', null, 'x=0', null),
                new MKButton('B3', 'X→П', 'b', null, 'L1', null),
                new MKButton('B4', '4', 'w', '04', 'sin⁻¹', null, '|x|', null),
                new MKButton('B5', '5', 'w', '05', 'cos⁻¹', null, 'ЗН', null),
                new MKButton('B6', '6', 'w', '06', 'tg⁻¹', null, '°′', null),
                new MKButton('B7', '+', 'w', null, 'π', null, '°′', null),
                new MKButton('B8', '×', 'w', null, 'x²'),
            ], [
                new MKButton('C1', '⇵', 'b', null),
                new MKButton('C2', 'В/О', 'b', null, 'x⩾0', null),
                new MKButton('C3', 'БП', 'b', null, 'L2', null),
                new MKButton('C4', '1', 'w', '01', 'eⁿ', null),
                new MKButton('C5', '2', 'w', '02', 'lg', null),
                new MKButton('C6', '3', 'w', '03', 'ln', null, '°′″', null),
                new MKButton('C7', '↔', 'w', null, 'xⁿ', null, '°′″', null),
                new MKButton('C8', 'В↑', 'w', null, 'Bx', null, 'СЧ', null, 'e'),
            ], [
                new MKButton('D1', 'А↑', 'b', null),
                new MKButton('D2', 'С/П', 'b', null, 'x≠0'),
                new MKButton('D3', 'ПП', 'b', null, 'L3'),
                new MKButton('D4', '0', 'w', '00', '10ⁿ', null, 'НОП', null),
                new MKButton('D5', '·', 'w', null, '⟳', null, '∧', null, 'a'),
                new MKButton('D6', '/-/', 'w', null, 'АВТ', null, '∨', null, 'b'),
                new MKButton('D7', 'ВП', 'w', null, 'ПРГ', null, '⊕', null, 'c'),
                new MKButton('D8', 'СX', 'r', null, 'CF', null, 'ИНВ', null, 'd'),
            ],
        ];
    };
    return MK52;
}());
exports.MK52 = MK52;
var MKButton = /** @class */ (function () {
    function MKButton(key, text, color, code, f, codef, k, codek, register) {
        if (color === void 0) { color = 'b'; }
        this.key = key;
        this.text = text;
        this.color = color;
        this.code = code;
        this.f = f;
        this.codef = codef;
        this.k = k;
        this.codek = codek;
        this.register = register;
    }
    return MKButton;
}());
exports.MKButton = MKButton;
var MKDisplay = /** @class */ (function () {
    function MKDisplay(register) {
        this.register = null;
        this.mode = DisplayMode.Simple;
        this.mantMinus = false;
        this.mant = [];
        this.signMinus = false;
        this.sign = [];
        if (register instanceof register_1.Register) {
            this.register = register;
            this.mode = DisplayMode.Error;
            var magn = register.magn;
            if (register.mant == 0) {
                this.mode = DisplayMode.Simple;
                this.simple();
            }
            else if (magn >= 0 && magn < 9) {
                this.mode = DisplayMode.Simple;
                this.simple();
            }
            else if (magn < 0 && -magn > -9) {
                this.mode = DisplayMode.Simple;
                this.simple();
            }
            else if (magn > 8 && magn < 100) {
                this.mode = DisplayMode.Normal;
                this.normal();
            }
            else if (magn < -8 && magn > -100) {
                this.mode = DisplayMode.Normal;
                this.normal();
            }
        }
        else {
            this.mode = register;
        }
        this.messageByMode();
        this.normalize();
    }
    MKDisplay.prototype.normal = function () {
        return this.simple();
    };
    MKDisplay.prototype.simple = function () {
        this.mant = [register_1.Digit.h0, register_1.Digit.dot];
        var str = '' + this.register.toNumber();
        this.mant = [];
        var haveDot = false;
        var nums = 0;
        for (var i = 0; nums < 9 && i < str.length; i++) {
            if (str[i] === '.') {
                haveDot = true;
                this.mant.push(register_1.Digit.dot);
            }
            else {
                this.mant.push(+str[i]);
                nums++;
            }
        }
        if (!haveDot)
            this.mant.push(register_1.Digit.dot);
        while (this.mant.length && this.mant[this.mant.length - 1] === register_1.Digit.h0)
            this.mant.pop();
    };
    Object.defineProperty(MKDisplay.prototype, "value", {
        get: function () {
            switch (this.mode) {
                case DisplayMode.Loading:
                    return "(Loading)";
                case DisplayMode.Error:
                    return "(Error)";
                case DisplayMode.Simple:
                case DisplayMode.Hex:
                case DisplayMode.Normal:
                default:
                    if (this.register)
                        return '' + this.register.toNumber();
                    else
                        return 'null';
            }
        },
        enumerable: true,
        configurable: true
    });
    MKDisplay.prototype.messageByMode = function () {
        switch (this.mode) {
            case DisplayMode.Normal:
            case DisplayMode.Simple:
            case DisplayMode.Hex:
                break;
            case DisplayMode.Loading:
                this.mantMinus = true;
                this.mant = [
                    register_1.Digit.h8, register_1.Digit.dot,
                    register_1.Digit.h8, register_1.Digit.dot,
                    register_1.Digit.h8, register_1.Digit.dot,
                    register_1.Digit.h8, register_1.Digit.dot,
                    register_1.Digit.h8, register_1.Digit.dot,
                    register_1.Digit.h8, register_1.Digit.dot,
                    register_1.Digit.h8, register_1.Digit.dot,
                    register_1.Digit.h8, register_1.Digit.dot,
                ];
                this.signMinus = true;
                this.sign = [
                    register_1.Digit.h8, register_1.Digit.dot,
                    register_1.Digit.h8, register_1.Digit.dot,
                ];
                break;
            case DisplayMode.Error:
                this.mant = [
                    register_1.Digit.hE,
                    register_1.Digit.hD,
                    register_1.Digit.hD,
                    register_1.Digit.h0,
                    register_1.Digit.hD,
                ];
                break;
        }
    };
    MKDisplay.prototype.normalize = function () {
        var manLen = this.mant.reduce(function (len, num) { return num === register_1.Digit.dot ? len : len + 1; }, 0);
        for (; manLen < 8; manLen++)
            this.mant.unshift(register_1.Digit.empty);
        var signLen = this.mant.reduce(function (len, num) { return num === register_1.Digit.dot ? len : len + 1; }, 0);
        for (; signLen < 2; signLen++)
            this.sign.unshift(register_1.Digit.empty);
    };
    Object.defineProperty(MKDisplay.prototype, "nums", {
        get: function () {
            var result = [];
            result.push(this.mantMinus ? register_1.Digit.minus : register_1.Digit.empty);
            result.push.apply(result, this.mant);
            result.push(this.signMinus ? register_1.Digit.minus : register_1.Digit.empty);
            result.push.apply(result, this.sign);
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MKDisplay.prototype, "real", {
        get: function () {
            var ret = this.nums.map(function (num) { return [
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                ' ', '.', '-',
            ][num]; }).join('');
            console.log(ret);
            return ret;
        },
        enumerable: true,
        configurable: true
    });
    return MKDisplay;
}());
exports.MKDisplay = MKDisplay;
//# sourceMappingURL=MK52.js.map