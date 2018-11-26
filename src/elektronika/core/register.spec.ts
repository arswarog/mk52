import { InputRegister, IRegister, Register } from './register';

const intNormalize: (value: number, exp?: number ) => IRegister = Register['intNormalize'];
const toString: (value: IRegister) => string     = Register['toString'];

describe('Register', () => {
    describe('intNormalize', () => {
        it('0', () => {
            const res = intNormalize(0);
            expect(res).toEqual({mantissa: 0, exp: 0, negative: false});
        });
        it('10', () => {
            const res = intNormalize(10);
            expect(res).toEqual({mantissa: 1, exp: 1, negative: false});
        });
        it('10000000', () => {
            const res = intNormalize(10000000);
            expect(res).toEqual({mantissa: 1, exp: 7, negative: false});
        });
        it('0.000001', () => {
            const res = intNormalize(0.000001);
            expect(res).toEqual({mantissa: 1, exp: -6, negative: false});
        });
        it('1000.0001', () => {
            const res = intNormalize(1000.0001);
            expect(res).toEqual({mantissa: 10000001, exp: -4, negative: false});
        });
        it('1000.000001', () => {
            const res = intNormalize(1000.000001);
            expect(res).toEqual({mantissa: 1, exp: 3, negative: false});
        });
        it('10.000000001', () => {
            const res = intNormalize(10.000000001);
            expect(res).toEqual({mantissa: 1, exp: 1, negative: false});
        });
        it('5.8462846268465465421684 * 10 ** 3', () => {
            const res = intNormalize(5.8462846268465465421684 * 10 ** 3);
            expect(res).toEqual({mantissa: 58462846, exp: -4, negative: false});
        });
        it('10**10', () => {
            const res = intNormalize(10000000000);
            expect(res).toEqual({mantissa: 1, exp: 10, negative: false});
        });
        it('10000000001', () => {
            const res = intNormalize(10000000001);
            expect(res).toEqual({mantissa: 1, exp: 10, negative: false});
        });
        it('5.2 * 10**63', () => {
            const res = intNormalize(5.2 * 10 ** 63);
            expect(res).toEqual({mantissa: 52, exp: 62, negative: false});
        });
        it('58.462846268465465421684 * 10 ** 34', () => {
            const res = intNormalize(58.462846268465465421684 * 10 ** 34);
            expect(res).toEqual({mantissa: 58462846, exp: 28, negative: false});
        });
        it('0.000000001', () => {
            const res = intNormalize(0.000000001);
            expect(res).toEqual({mantissa: 1, exp: -9, negative: false});
        });
        it('0.000000056723', () => {
            const res = intNormalize(0.000000056723);
            expect(res).toEqual({mantissa: 56723, exp: -12, negative: false});
        });
        it('5.2 * 10**-63', () => {
            const res = intNormalize(5.2 * 10 ** -63);
            expect(res).toEqual({mantissa: 52, exp: -64, negative: false});
        });
        it('58.462846268465465421684 * 10 ** -34', () => {
            const res = intNormalize(58.462846268465465421684 * 10 ** -34);
            expect(res).toEqual({mantissa: 58462846, exp: -40, negative: false});
        });

        describe('Auto test', () => {
            for (let i = 1, e = 3, n = false; i < 1000; i += 41, e--, n = !n) {
                it('number ' + (n ? '-' : '') + i + ' * 10^' + e, () => {
                    const res = intNormalize((-1) ** +n * i * 10 ** e);
                    const ex  = {
                        mantissa: i,
                        exp     : e,
                        negative: n,
                    };
                    if (ex.mantissa)
                        while (ex.mantissa % 10 === 0) {
                            ex.mantissa /= 10;
                            ex.exp++;
                        }

                    expect(res).toEqual(ex);
                });
                // FIXME
                //it('number (with exp) ' + (-1) ** +n + i + ' * 10^' + e, () => {
                //    const res = intNormalize((-1) ** +n * i, e);
                //    const ex  = {
                //        mantissa: i,
                //        exp     : e,
                //        negative: n,
                //    };
                //    if (ex.mantissa)
                //        while (ex.mantissa % 10 === 0) {
                //            ex.mantissa /= 10;
                //            ex.exp++;
                //        }
                //
                //    expect(res).toEqual(ex);
                //});
            }
        });
    });

    describe('normalize and toString', () => {
        it('0', () => {
            const res = {mantissa: 0, exp: 0, negative: false};
            //expect(res).toEqual({mantissa: 0, exp: 0, negative: false});
            expect(toString(res)).toEqual(' 0.          ');
        });
        it('10', () => {
            const res = {mantissa: 1, exp: 1, negative: false};
            //expect(res).toEqual({mantissa: 10, exp: 0, negative: false});
            expect(toString(res)).toEqual(' 10.         ');
        });
        it('10000000', () => {
            const res = {mantissa: 1, exp: 7, negative: false};
            //expect(res).toEqual({mantissa: 10000000, exp: 0, negative: false});
            expect(toString(res)).toEqual(' 10000000.   ');
        });
        it('1000.0001', () => {
            const res = {mantissa: 10000001, exp: -4, negative: false};
            //expect(res).toEqual({mantissa: 1000.0001, exp: 0, negative: false});
            expect(toString(res)).toEqual(' 1000.0001   ');
        });
        it('1000.000001', () => {
            const res = {mantissa: 1, exp: 3, negative: false};
            //expect(res).toEqual({mantissa: 1000, exp: 0, negative: false});
            expect(toString(res)).toEqual(' 1000.       ');
        });
        it('10.000000001', () => {
            const res = {mantissa: 1, exp: 1, negative: false};
            //expect(res).toEqual({mantissa: 10, exp: 0, negative: false});
            expect(toString(res)).toEqual(' 10.         ');
        });
        it('57320', () => {
            const reg = new Register(57320);
            expect(reg.toString()).toEqual(' 57320.      ');
        });
        it('5732', () => {
            const reg = new Register(5732);
            expect(reg.toString()).toEqual(' 5732.       ');
        });
        it('573.2', () => {
            const reg = new Register(573.2);
            expect(reg.toString()).toEqual(' 573.2       ');
        });
        it('57.32', () => {
            const reg = new Register(57.32);
            expect(reg.toString()).toEqual(' 57.32       ');
        });
        it('57352', () => {
            const reg = new Register(57352);
            expect(reg.toString()).toEqual(' 57352.      ');
        });
        it('5735.2', () => {
            const reg = new Register(5735.2);
            expect(reg.toString()).toEqual(' 5735.2      ');
        });
        it('573.52', () => {
            const reg = new Register(573.52);
            expect(reg.toString()).toEqual(' 573.52      ');
        });
        it('5735.23', () => {
            const reg = new Register(5735.23);
            expect(reg.toString()).toEqual(' 5735.23     ');
        });
        it('5.8462846268465465421684 * 10 ** 3', () => {
            const res = {mantissa: 58462846, exp: -4, negative: false};
            //expect(res).toEqual({mantissa: 5846.2846, exp: 0, negative: false});
            expect(toString(res)).toEqual(' 5846.2846   ');
        });
        it('10**10', () => {
            const res = {mantissa: 1, exp: 10, negative: false};
            //expect(res).toEqual({mantissa: 1, exp: 10, negative: false});
            expect(toString(res)).toEqual(' 1.        10');
        });
        it('10000000001', () => {
            const res = {mantissa: 1, exp: 10, negative: false};
            //expect(res).toEqual({mantissa: 1, exp: 10, negative: false});
            expect(toString(res)).toEqual(' 1.        10');
        });
        it('5.2 * 10**63', () => {
            const res = {mantissa: 52, exp: 62, negative: false};
            //expect(res).toEqual({mantissa: 5.2, exp: 63, negative: false});
            expect(toString(res)).toEqual(' 5.2       63');
        });
        it('58.462846268465465421684 * 10 ** 34', () => {
            const res = {mantissa: 58462846, exp: 28, negative: false};
            //expect(res).toEqual({mantissa: 5.8462846, exp: 35, negative: false});
            expect(toString(res)).toEqual(' 5.8462846 35');
        });
        it('0.000001', () => {
            const res = {mantissa: 1, exp: -6, negative: false};
            //expect(res).toEqual({mantissa: 0.000001, exp: 0, negative: false});
            expect(toString(res)).toEqual(' 0.000001    ');
        });
        it('0.0000001', () => {
            const res = {mantissa: 1, exp: -7, negative: false};
            //expect(res).toEqual({mantissa: 0.0000001, exp: 0, negative: false});
            expect(toString(res)).toEqual(' 0.0000001   ');
        });
        it('0.00000001', () => {
            const res = {mantissa: 1, exp: -8, negative: false};
            //expect(res).toEqual({mantissa: 1, exp: -8, negative: false});
            expect(toString(res)).toEqual(' 1.       -08');
        });
        it('0.000000001', () => {
            const res = {mantissa: 1, exp: -9, negative: false};
            //expect(res).toEqual({mantissa: 1, exp: -9, negative: false});
            expect(toString(res)).toEqual(' 1.       -09');
        });
        it('0.000000056723', () => {
            const res = {mantissa: 56723, exp: -12, negative: false};
            //expect(res).toEqual({mantissa: 5.6723, exp: -8, negative: false});
            expect(toString(res)).toEqual(' 5.6723   -08');
        });
        it('5.2 * 10**-63', () => {
            const res = {mantissa: 52, exp: -64, negative: false};
            //expect(res).toEqual({mantissa: 5.2, exp: -63, negative: false});
            expect(toString(res)).toEqual(' 5.2      -63');
        });
        it('58.462846268465465421684 * 10 ** -34', () => {
            const res = {mantissa: 58462846, exp: -40, negative: false};
            //expect(res).toEqual({mantissa: 5.8462846, exp: -33, negative: false});
            expect(toString(res)).toEqual(' 5.8462846-33');
        });
    });

    describe('Complex', () => {
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
            it('57.1', () => {
                const reg = new Register(57.1);
                expect(reg.toString()).toEqual(' 57.1        ');
            });
            it('5735.23', () => {
                const reg = new Register(5735.23);
                expect(reg.toString()).toEqual(' 5735.23     ');
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

    describe('input', () => {
        it('001', () => {
            let reg = new Register();
            expect(reg).toBeInstanceOf(Register);
            expect(reg.toString()).toEqual(' 0.          ');

            reg = reg.input(0);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 0.          ');

            reg = reg.input(0);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 00.         ');

            reg = reg.input(1);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 001.        ');
        });
        it('00.1', () => {
            let reg = new Register();
            expect(reg).toBeInstanceOf(Register);
            expect(reg.toString()).toEqual(' 0.          ');

            reg = reg.input(0);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 0.          ');

            reg = reg.input(0);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 00.         ');

            reg = reg.input(-1);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 00.         ');

            reg = reg.input(1);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 00.1        ');
        });
        it('(.)001', () => {
            let reg = new Register();
            expect(reg).toBeInstanceOf(Register);
            expect(reg.toString()).toEqual(' 0.          ');

            reg = reg.input(-1);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 0.          ');

            reg = reg.input(0);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 0.          ');

            reg = reg.input(0);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 00.         ');

            reg = reg.input(1);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 001.        ');
        });
        it('12345678(9)', () => {
            let reg = new Register();
            expect(reg).toBeInstanceOf(Register);
            expect(reg.toString()).toEqual(' 0.          ');

            reg = reg.input(1);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1.          ');

            reg = reg.input(2);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 12.         ');

            reg = reg.input(3);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 123.        ');

            reg = reg.input(4);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1234.       ');

            reg = reg.input(5);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 12345.      ');

            reg = reg.input(6);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 123456.     ');

            reg = reg.input(7);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1234567.    ');

            reg = reg.input(8);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 12345678.   ');

            reg = reg.input(9);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 12345678.   ');
        });
        it('1234.5(.)678(9)', () => {
            let reg = new Register();
            expect(reg).toBeInstanceOf(Register);
            expect(reg.toString()).toEqual(' 0.          ');

            reg = reg.input(1);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1.          ');

            reg = reg.input(2);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 12.         ');

            reg = reg.input(3);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 123.        ');

            reg = reg.input(4);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1234.       ');

            reg = reg.input(-1);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1234.       ');

            reg = reg.input(5);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1234.5      ');

            reg = reg.input(-1);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1234.5      ');

            reg = reg.input(6);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1234.56     ');

            reg = reg.input(7);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1234.567    ');

            reg = reg.input(8);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1234.5678   ');

            reg = reg.input(9);
            expect(reg).toBeInstanceOf(InputRegister);
            expect(reg.toString()).toEqual(' 1234.5678   ');
        });
    });

    describe('toNumber - Auto test', () => {
        for (let i = 1, e = 99, n = false; i < 199; i++, e--, n = !n) {
            const m = +Math.random().toString().substr(0, 10);
            const x = (-1) ** +n * m * 10 ** e;

            it(`number ${m} ^ ${e}`, () => {
                const res = new Register(x);

                const check = 1 - res.toNumber() / x;

                expect(Math.log10(Math.abs(check))).toBeLessThan(-15);
            });
        }
    });
});