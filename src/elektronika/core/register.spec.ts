import { Register } from './register';

describe('Register', () => {
    it('Default', () => {
        const reg = new Register();
        expect(reg.toString()).toEqual(' 0.          ');
    });
    describe('Normal numbers', () => {
        it('0', () => {
            const reg = new Register(0);
            expect(reg.toString()).toEqual(' 0.          ');
        });
        it('10', () => {
            const reg = new Register(10);
            expect(reg.toString()).toEqual(' 10.         ');
        });
        it('10000000', () => {
            const reg = new Register(10000000);
            expect(reg.toString()).toEqual(' 10000000.   ');
        });
        it('0.000001', () => {
            const reg = new Register(0.000001);
            expect(reg.toString()).toEqual(' 0.000001    ');
        });
        it('1000.0001', () => {
            const reg = new Register(1000.0001);
            expect(reg.toString()).toEqual(' 1000.0001   ');
        });
        it('1000.000001', () => {
            const reg = new Register(1000.000001);
            expect(reg.toString()).toEqual(' 1000.       ');
        });
        it('10.000000001', () => {
            const reg = new Register(10.000000001);
            expect(reg.toString()).toEqual(' 10.         ');
        });
        it('5.8462846268465465421684 * 10 ** 3', () => {
            const reg = new Register(5.8462846268465465421684 * 10 ** 3);
            expect(reg.toString()).toEqual(' 5846.2846   ');
        });
    });
    describe('Big numbers', () => {
        it('10**10', () => {
            const reg = new Register(10000000000);
            expect(reg.toString()).toEqual(' 1.        10');
        });
        it('10000000001', () => {
            const reg = new Register(10000000001);
            expect(reg.toString()).toEqual(' 1.        10');
        });
        it('5.2 * 10**63', () => {
            const reg = new Register(5.2 * 10 ** 63);
            expect(reg.toString()).toEqual(' 5.2       63');
        });
        it('58.462846268465465421684 * 10 ** 34', () => {
            const reg = new Register(58.462846268465465421684 * 10 ** 34);
            expect(reg.toString()).toEqual(' 5.8462846 35');
        });
    });
    describe('Small numbers', () => {
        it('0.000000001', () => {
            const reg = new Register(0.000000001);
            expect(reg.toString()).toEqual(' 1.       -09');
        });
        it('0.000000056723', () => {
            const reg = new Register(0.000000056723);
            expect(reg.toString()).toEqual(' 5.6723   -08');
        });
        it('5.2 * 10**-63', () => {
            const reg = new Register(5.2 * 10 ** -63);
            expect(reg.toString()).toEqual(' 5.2      -63');
        });
        it('58.462846268465465421684 * 10 ** -34', () => {
            const reg = new Register(58.462846268465465421684 * 10 ** -34);
            expect(reg.toString()).toEqual(' 5.8462846-33');
        });
    });
});