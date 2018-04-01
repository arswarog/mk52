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
var Calculator_1 = require("./Calculator");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: 0,
        };
        _this.alert = _this.alert.bind(_this);
        return _this;
    }
    Main.prototype.alert = function (code) {
        //        console.log(this.props, this.props.onAddItem, this.state);
        this.props.pressButton();
        this.setState({ newItem: " " });
    };
    Main.prototype.render = function () {
        console.log('Main render', this.props);
        var calc = this.props.calc;
        var stack = calc.stack;
        console.log(stack);
        var stackList = ['t', 'z', 'y', 'x', 'x1'].map(function (r) { return React.createElement("tr", { key: r },
            React.createElement("td", null, r),
            React.createElement("td", { className: "display" }, stack[r].real),
            React.createElement("td", null, stack[r].value)); });
        return (React.createElement("div", null,
            React.createElement("b", null, this.props.counter),
            " / ",
            React.createElement("b", null, this.props.counter2),
            React.createElement(Calculator_1.Calculator, { calc: this.props.calc, display: this.props.display, pressButton: this.props.pressButton, keyboardConfig: this.props.calc.getKeyboardConfig() }),
            React.createElement("table", { onClick: this.alert },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("td", null, "#"),
                        React.createElement("td", null, "Real"),
                        React.createElement("td", null, "Value"))),
                React.createElement("tbody", null, stackList))));
    };
    return Main;
}(React.Component));
exports.Main = Main;
//# sourceMappingURL=Main.js.map