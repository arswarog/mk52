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
var Actions = require("./app/actions");
var Main_1 = require("./components/Main");
var react_redux_1 = require("react-redux");
var AppComponent = /** @class */ (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent(a, b) {
        var _this = _super.call(this, a, b) || this;
        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }
    AppComponent.prototype.onClick = function (e) {
        console.log('App onClick state', this.state);
        console.log('App onClick props', this.props);
        console.log('click');
        this.props.addItem();
    };
    AppComponent.prototype.render = function () {
        console.log('App render state', this.state);
        console.log('App render props', this.props);
        return React.createElement(Main_1.Main, { pressButton: this.props.pressButton, calc: this.props.calc, counter: this.props.counter, counter2: this.props.counter2, display: this.props.display });
    };
    return AppComponent;
}(React.Component));
exports.AppComponent = AppComponent;
function mapStateToProps(state) {
    //    console.log(state);
    return Object.assign({}, state);
}
exports.App = react_redux_1.connect(mapStateToProps, Actions)(AppComponent);
//# sourceMappingURL=App.js.map