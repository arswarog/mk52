"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Digit;
(function (Digit) {
    Digit[Digit["h0"] = 0] = "h0";
    Digit[Digit["h1"] = 1] = "h1";
    Digit[Digit["h2"] = 2] = "h2";
    Digit[Digit["h3"] = 3] = "h3";
    Digit[Digit["h4"] = 4] = "h4";
    Digit[Digit["h5"] = 5] = "h5";
    Digit[Digit["h6"] = 6] = "h6";
    Digit[Digit["h7"] = 7] = "h7";
    Digit[Digit["h8"] = 8] = "h8";
    Digit[Digit["h9"] = 9] = "h9";
    Digit[Digit["hA"] = 10] = "hA";
    Digit[Digit["hB"] = 11] = "hB";
    Digit[Digit["hC"] = 12] = "hC";
    Digit[Digit["hD"] = 13] = "hD";
    Digit[Digit["hE"] = 14] = "hE";
    Digit[Digit["hF"] = 15] = "hF";
    Digit[Digit["empty"] = 16] = "empty";
    Digit[Digit["dot"] = 17] = "dot";
    Digit[Digit["minus"] = 18] = "minus";
})(Digit = exports.Digit || (exports.Digit = {}));
console.log(Digit.h0, Digit.h1);
var Register = /** @class */ (function () {
    function Register(mantissa, magnitude) {
        if (mantissa === void 0) { mantissa = 0; }
        if (magnitude === void 0) { magnitude = 0; }
        this.mantissa = 0;
        this.magnitude = 0;
        if (mantissa instanceof Register) {
            this.mantissa = mantissa.mantissa;
            this.magnitude = mantissa.magnitude;
            return;
        }
        this.magnitude = magnitude;
        var origin = mantissa;
        if (mantissa === 0)
            return;
        this.mantissa = mantissa;
        this.normalize();
        console.log("CONVERT " + origin + " TO " + this.mantissa + " * 10 ** " + this.magnitude);
    }
    Object.defineProperty(Register.prototype, "mant", {
        get: function () {
            return this.mantissa;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Register.prototype, "magn", {
        get: function () {
            return this.magnitude;
        },
        enumerable: true,
        configurable: true
    });
    Register.prototype.toNumber = function () {
        console.log("CONVERT " + this.mantissa + " * 10 ** " + this.magnitude + " TO " + this.mantissa * Math.pow(10, this.magnitude));
        return this.mantissa * Math.pow(10, this.magnitude);
    };
    Register.prototype.toMagn = function (magn) {
        return 0;
    };
    Register.prototype.normalize = function () {
        var sgn = 1;
        if (this.mantissa < 0) {
            sgn = -1;
            this.mantissa = -this.mantissa;
        }
        while (this.mantissa < Register.PREC) {
            this.mantissa *= 10;
            this.magnitude--;
        }
        while (this.mantissa > Register.PREC * 10) {
            this.mantissa /= 10;
            this.magnitude++;
        }
        while (this.mantissa >= 10 && this.mantissa / 10 === Math.round(this.mantissa / 10)) {
            this.mantissa /= 10;
            this.magnitude++;
        }
        this.mantissa = Math.round(this.mantissa) * sgn;
    };
    Register.prototype.add = function (y) {
        if (y.magn + 10 < this.magn)
            return new Register(this);
        if (y.magn - 10 > this.magn) {
            this.mantissa = y.mantissa;
            this.magnitude = y.magnitude;
            return;
        }
    };
    Register.prototype.mul = function (y) {
        var mant = this.mantissa * y.mantissa;
        var magn = this.magnitude + y.magnitude;
        return new Register(mant, magn);
    };
    Register.PREC = Math.pow(10, 9);
    return Register;
}());
exports.Register = Register;
//# sourceMappingURL=register.js.map