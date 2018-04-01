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
var Button_1 = require("./Button");
var Keyboard = /** @class */ (function (_super) {
    __extends(Keyboard, _super);
    function Keyboard(props, state) {
        var _this = _super.call(this, props, state) || this;
        _this.state = {
            modeF: false,
            modeK: false,
        };
        _this.press = _this.press.bind(_this);
        return _this;
    }
    Keyboard.prototype.press = function (btn) {
        if (btn.key !== 'A1' && btn.key !== 'B1') {
            var key = btn.code;
            if (this.state.modeF && btn.f)
                key = btn.codef;
            if (this.state.modeK && btn.k)
                key = btn.codek;
            this.setState({
                modeK: false,
                modeF: false,
            });
            return this.props.press(key);
        }
        var state = {};
        if (this.state.modeK || this.state.modeF) {
            state = {
                modeK: false,
                modeF: false,
            };
        }
        else {
            if (btn.key === 'A1')
                state.modeF = true;
            if (btn.key === 'B1')
                state.modeK = true;
        }
        this.setState(state);
    };
    Keyboard.prototype.render = function () {
        var _this = this;
        var html = this.props.keyboard.map(function (btns, index) { return (React.createElement("tr", { key: "row" + index }, btns.map(function (btn) { return React.createElement(Button_1.Button, { key: btn.key, config: btn, press: _this.press }); }))); });
        return (React.createElement("table", { className: "keyboard" },
            React.createElement("tbody", null, html)));
    };
    return Keyboard;
}(React.Component));
exports.Keyboard = Keyboard;
//# sourceMappingURL=Keyboard.js.map