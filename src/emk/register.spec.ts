import * as should from 'should';
import { Register } from "./register";

describe("Register", function() {
    describe("Creation", function() {
        it("Default", function() {
            let reg = new Register();
            should(reg.toNumber()).equal(0);
        });

        it("100", function() {
            let reg = new Register(100);
            should(reg.toNumber()).equal(100);
            should(reg.mant).equal(1);
            should(reg.magn).equal(2);
            should(reg.magnToNormal).equal(0);
        });

        it("0.0100", function() {
            let reg = new Register(0.0100);
            should(reg.toNumber()).equal(0.01);
            should(reg.mant).equal(1);
            should(reg.magn).equal(-2);
            should(reg.magnToNormal).equal(0);
        });

        it("100.00100", function() {
            let reg = new Register(100.00100);
            should(reg.toNumber()).equal(100.001);
            should(reg.mant).equal(100001);
            should(reg.magn).equal(-3);
            should(reg.magnToNormal).equal(5);
            should(reg.magn + reg.magnToNormal).equal(2);
        });

        it("100.0010000000000010", function() {
            let reg = new Register(100.0010000000000010);
            should(reg.toNumber()).equal(100.001);
            should(reg.mant).equal(100001);
            should(reg.magn).equal(-3);
            should(reg.magnToNormal).equal(5);
            should(reg.magn + reg.magnToNormal).equal(2);
        });

        it("100 ^ 2", () => {
            let reg = new Register(100, 2);
            should(reg.toNumber()).equal(10000);
            should(reg.mant).equal(1);
            should(reg.magn).equal(4);
            should(reg.magnToNormal).equal(0);
            should(reg.magn + reg.magnToNormal).equal(4);
        });
    });

    describe("Mul", function() {
        it("5 * 7", () => {
            let x   = new Register(5);
            let y   = new Register(7);
            let res = x.mul(y);

            should(res.toNumber()).equal(35);
            should(res.mant).equal(35);
            should(res.magn).equal(0);
        });

        it("500 * 7", () => {
            let x   = new Register(500);
            let y   = new Register(7);
            let res = x.mul(y);

            should(res.toNumber()).equal(3500);
            should(res.mant).equal(35);
            should(res.magn).equal(2);
        });

        it("123 * 40", () => {
            let x   = new Register(123);
            let y   = new Register(4, 1);
            let res = x.mul(y);

            should(res.toNumber()).equal(4920);
            should(res.mant).equal(492);
            should(res.magn).equal(1);
        });

        it("5^-5 * 7^10", () => {
            let x   = new Register(5, -5);
            let y   = new Register(7, 10);
            let res = x.mul(y);

            should(res.toNumber()).equal(3500000);
            should(res.mant).equal(35);
            should(res.magn).equal(5);
        });
    });
});
