import { bigNumberToRegister, registerToBigNumber } from './utils';
import { Register } from './register';
import BigNumber from 'bignumber.js';

describe('utils', () => {
    describe('converting between register and BigNumber', () => {
        it('xx', () => {
            console.log(new BigNumber('0').toExponential());
            console.log(new BigNumber('0').toExponential(2));
            bigNumberToRegister(new BigNumber('0'));
            bigNumberToRegister(new BigNumber('-0.001'));
            bigNumberToRegister(new BigNumber('12389712983712893719'));
            bigNumberToRegister(new BigNumber('0.0000012389712983712893719'));
        });
        it('1', () => {
            const register = new Register(1);
            console.log(register);
            const bn = registerToBigNumber(register);
            expect(bn.isEqualTo(new BigNumber(1)));
            expect(bigNumberToRegister(bn)).toEqual(register);
        });
        it('-123', () => {
            const register = new Register(-123);
            console.log(register);
            const bn = registerToBigNumber(register);
            expect(bn.isEqualTo(new BigNumber(-123)));
            expect(bigNumberToRegister(bn)).toEqual(register);
            expect(bn.isNegative()).toBeTruthy();
        });
        it('-0.000123', () => {
            const register = new Register(-0.000123);
            console.log(register);
            const bn = registerToBigNumber(register);
            expect(bn.isEqualTo(new BigNumber(-0.000123)));
            expect(bigNumberToRegister(bn)).toEqual(register);
            expect(bn.isNegative()).toBeTruthy();
        });
        it('-0.000000000123', () => {
            const register = new Register(-0.000000000123);
            console.log(register);
            const bn = registerToBigNumber(register);
            expect(bn.isEqualTo(new BigNumber(-0.000000000123)));
            expect(bigNumberToRegister(bn)).toEqual(register);
            expect(bn.isNegative()).toBeTruthy();
        });
    });
});
