import { Register } from './register';
import { add, equal, moreThen, multiply } from './core-alu';
import BigNumber from 'bignumber.js';

describe('core alu', () => {
    describe('equal', () => {
        it('5.3, 5.3', () => {
            const a = new Register(5.3);
            const b = new Register(5.3);

            expect(a).toEqual(b);
            expect(equal(a, b)).toBe(true);
        });
        it('-5.3E-18, -5.3E-18', () => {
            const a = new Register(-5.3, -18);
            const b = new Register(-5.3, -18);

            expect(a).toEqual(b);
            expect(equal(a, b)).toBe(true);
        });
        it('53E1, 53E1', () => {
            const a = new Register(53, 1);
            const b = new Register(53, 1);

            expect(a).toEqual(b);
            expect(equal(a, b)).toBe(true);
        });
        it('53E1, 53', () => {
            const a = new Register(53, 1);
            const b = new Register(530);

            expect(a).not.toEqual(b);
            expect(equal(a, b)).toBe(false);
        });
        it('-53E1, -53E1', () => {
            const a = new Register(-53, 1);
            const b = new Register(53, 1);

            expect(a).not.toEqual(b);
            expect(equal(a, b)).toBe(false);
        });
        it('53E18, 53E-18', () => {
            const a = new Register(53, 18);
            const b = new Register(53, -18);

            expect(a).not.toEqual(b);
            expect(equal(a, b)).toBe(false);
        });
    });
    describe('moreThen', () => {
        it('2, 3', () => {
            const a = new Register(2);
            const b = new Register(3);

            expect(moreThen(a, b)).toBe(false);
            expect(moreThen(b, a)).toBe(true);
        });
        it('1500, 2500', () => {
            const a = new Register(1500);
            const b = new Register(2500);

            expect(moreThen(a, b)).toBe(false);
            expect(moreThen(b, a)).toBe(true);
        });
        it('1500, 2500E12', () => {
            const a = new Register(2500);
            const b = new Register(1500, 12);

            expect(moreThen(a, b)).toBe(false);
            expect(moreThen(b, a)).toBe(true);
        });
        it('2500E6, 1500E12', () => {
            const a = new Register(2500, 6);
            const b = new Register(1500, 12);

            expect(moreThen(a, b)).toBe(false);
            expect(moreThen(b, a)).toBe(true);
        });
        it('1000, 1000', () => {
            const a = new Register(1000);
            const b = new Register(1000);

            expect(moreThen(a, b)).toBe(false);
            expect(moreThen(b, a)).toBe(false);
        });
        it('-1000, 1000', () => {
            const a = new Register(-1000);
            const b = new Register(1000);

            expect(moreThen(a, b)).toBe(false);
            expect(moreThen(b, a)).toBe(true);
        });
    });
    describe('add', () => {
        it('2 + 3 = 5', () => {
            const x = new Register(2);
            const y = new Register(3);

            expect(
                add(x, y),
            ).toEqual(
                new Register(5),
            );
        });
        it('1500 + 2500 = 4000', () => {
            const x = new Register(1500);
            const y = new Register(2500);
            const res = add(x, y);

            expect(
                res,
            ).toEqual(
                new Register(4000),
            );
        });
        it('1000 + 1000 + 1000 + 1000 = 1500 + 2500', () => {
            const x1 = new Register(1000);
            const y1 = new Register(1000);
            const res1 = add(add(add(x1, y1), y1), y1);

            const x2 = new Register(1500);
            const y2 = new Register(2500);
            const res2 = add(x2, y2);

            expect(res1).toEqual(res2);
        });
        it('1500E12 + 2500 = 1500E12', () => {
            const x = new Register(1500, 12);
            const y = new Register(2500);
            const res = add(x, y);

            const res2 = add(y, x);

            expect(res).toEqual(res2);

            expect(
                res,
            ).toEqual(
                new Register(15, 14),
            );
        });
        it('1500E12 + 2500E6 = 15000025E8', () => {
            const x = new Register(1500, 12);
            const y = new Register(2500, 6);
            const res = add(x, y);

            const res2 = add(y, x);

            expect(res).toEqual(res2);

            expect(
                res,
            ).toEqual(
                new Register(15000025, 8),
            );
        });
    });
    describe('multiply', () => {
        it('2 * 2', () => {
            const x = new Register(2);
            const y = new Register(2);

            expect(
                multiply(x, y),
            ).toEqual(
                new Register(4),
            );
        });
        it('10000 * 10000001', () => {
            const x1 = new Register(1000);
            const y1 = new Register(1000);
            const res1 = multiply(multiply(multiply(x1, y1), y1), y1);

            const x2 = new Register(1000000);
            const y2 = new Register(1000000);
            const res2 = multiply(x2, y2);

            expect(res1).toEqual(res2);
        });
    });
});
