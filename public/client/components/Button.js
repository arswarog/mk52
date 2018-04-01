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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        return _super.call(this, props) || this;
    }
    Button.prototype.render = function () {
        var _this = this;
        var cfg = this.props.config;
        return (React.createElement("td", null,
            cfg.f,
            "\u00A0",
            React.createElement("i", null, cfg.k),
            React.createElement("span", { onClick: function () { return _this.props.press(cfg); }, className: cfg.color }, cfg.text),
            React.createElement("b", null,
                "\u00A0",
                cfg.register,
                "\u00A0")));
    };
    return Button;
}(React.Component));
exports.Button = Button;
//# sourceMappingURL=Button.js.map