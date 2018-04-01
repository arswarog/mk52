"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var should = require("should");
var register_1 = require("./register");
describe("Register", function () {
    describe("Creation", function () {
        it("Default", function () {
            var reg = new register_1.Register();
            should(reg.toNumber()).equal(0);
        });
        it("100", function () {
            var reg = new register_1.Register(100);
            should(reg.toNumber()).equal(100);
            should(reg.mant).equal(1);
            should(reg.magn).equal(2);
        });
        it("0.0100", function () {
            var reg = new register_1.Register(0.0100);
            should(reg.toNumber()).equal(0.01);
            should(reg.mant).equal(1);
            should(reg.magn).equal(-2);
        });
        it("100.00100", function () {
            var reg = new register_1.Register(100.00100);
            should(reg.toNumber()).equal(100.001);
            should(reg.mant).equal(100001);
            should(reg.magn).equal(-3);
        });
        it("100.0010000000000010", function () {
            var reg = new register_1.Register(100.0010000000000010);
            should(reg.toNumber()).equal(100.001);
            should(reg.mant).equal(100001);
            should(reg.magn).equal(-3);
        });
        it("100, 2", function () {
            var reg = new register_1.Register(100, 2);
            should(reg.toNumber()).equal(10000);
            should(reg.mant).equal(1);
            should(reg.magn).equal(4);
        });
    });
    describe("Mul", function () {
        it("5 * 7", function () {
            var x = new register_1.Register(5);
            var y = new register_1.Register(7);
            var res = x.mul(y);
            should(res.toNumber()).equal(35);
            should(res.mant).equal(35);
            should(res.magn).equal(0);
        });
        it("500 * 7", function () {
            var x = new register_1.Register(500);
            var y = new register_1.Register(7);
            var res = x.mul(y);
            should(res.toNumber()).equal(3500);
            should(res.mant).equal(35);
            should(res.magn).equal(2);
        });
        it("5 * 700", function () {
            var x = new register_1.Register(5);
            var y = new register_1.Register(700);
            var res = x.mul(y);
            should(res.toNumber()).equal(3500);
            should(res.mant).equal(35);
            should(res.magn).equal(2);
        });
        it("5^-5 * 7^10", function () {
            var x = new register_1.Register(5, -5);
            var y = new register_1.Register(7, 10);
            var res = x.mul(y);
            should(res.toNumber()).equal(3500000);
            should(res.mant).equal(35);
            should(res.magn).equal(5);
        });
    });
});
//# sourceMappingURL=register.spec.js.map