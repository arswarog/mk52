"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Keyboard_1 = require("./Keyboard");
var Calculator = /** @class */ (function (_super) {
    __extends(Calculator, _super);
    function Calculator(props, state) {
        var _this = _super.call(this, props, state) || this;
        _this.press = _this.press.bind(_this);
        return _this;
    }
    Calculator.prototype.press = function (code) {
        console.log('code:', code);
        this.props.pressButton(code);
    };
    Calculator.prototype.render = function () {
        var _this = this;
        var calc = this.props.calc;
        return (React.createElement("table", { className: "mk52" },
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", { className: "mk_a0", colSpan: 3 }, "\u00A0"),
                    React.createElement("td", { className: "mk_a3" }, "\u00A0"),
                    React.createElement("td", { className: "mk_a4" }, "\u00A0")),
                React.createElement("tr", null,
                    React.createElement("td", { className: "mk_b0" }, "\u00A0"),
                    React.createElement("td", { className: "mk_b1" },
                        React.createElement("span", { className: "display", "ng-class": "{wait: wait, run: run}" }, this.props.display.real)),
                    React.createElement("td", { className: "mk_b2" }, "\u00A0"),
                    React.createElement("td", { className: "mk_b3", rowSpan: 3 },
                        React.createElement(Keyboard_1.Keyboard, { keyboard: this.props.keyboardConfig, press: this.press })),
                    React.createElement("td", { className: "mk_b4", rowSpan: 3 }, "\u00A0")),
                React.createElement("tr", null,
                    React.createElement("td", { className: "mk_c0" }, "\u00A0"),
                    React.createElement("td", { className: "mk_c1" }, "\u00A0"),
                    React.createElement("td", { className: "mk_c2" }, "\u00A0")),
                React.createElement("tr", null,
                    React.createElement("td", { className: "mk_d0" }, "\u00A0"),
                    React.createElement("td", { className: "mk_d1" },
                        React.createElement("button", { className: "btn btn-default", onClick: function () { return _this.press('reset'); } }, "Reset")),
                    React.createElement("td", { className: "mk_d2" }, "\u00A0")),
                React.createElement("tr", null,
                    React.createElement("td", { className: "mk_e0" }, "\u00A0"),
                    React.createElement("td", { className: "mk_e1" }, "\u00A0"),
                    React.createElement("td", { className: "mk_e2" }, "\u00A0"),
                    React.createElement("td", { className: "mk_e3" }, "\u00A0"),
                    React.createElement("td", { className: "mk_e4" }, "\u00A0")))));
    };
    return Calculator;
}(React.Component));
exports.Calculator = Calculator;
//# sourceMappingURL=Calculator.js.map