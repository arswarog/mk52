import { ICalcCtrl } from '../calculator.interface';
import { CalculatorStatus } from '../calculator';
import { Cmd } from './commands';
import { BaseMKCore } from './core';
import { Program } from './program';
import { Register } from './register';
import { Registers } from './registers';
import { Stack } from './stack';

const core = BaseMKCore;
let mk: ICalcCtrl;

describe('Core', () => {
    beforeEach(() => {
        mk = {
            status: CalculatorStatus.Standart,
            stack: new Stack(),
            registers: Registers.empty(),
            program: new Program(),
            keys: [],

            stat: {
                executed: 0,
                lastRunExecuted: 0,
            },
        } as ICalcCtrl;
    });

    describe('Enter', () => {
        it('1', () => {
            mk.stack = new Stack({
                x1: new Register(0.000000056723),
                x: new Register(5735.23),
                y: new Register(34536343634534535),
                z: new Register(67835.3437345634534),
                t: new Register(100000000000000000000000000),
                canInput: false,
            });

            const res = core[Cmd.Enter].operation(mk);

            expect(res.stack.t.toString()).toEqual(' 67835.344   ');
            expect(res.stack.z.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.y.toString()).toEqual(' 5735.23     ');
            expect(res.stack.x.toString()).toEqual(' 5735.23     ');
            expect(res.stack.x1.toString()).toEqual(' 5735.23     ');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);
        });
        it('2', () => {
            mk.stack = new Stack({
                x1: new Register(0.000000056723),
                x: new Register(5735.23),
                y: new Register(34536343634534535),
                z: new Register(67835.3437345634534),
                t: new Register(100000000000000000000000000),
                canInput: false,
            });

            let res = core[Cmd.Enter].operation(mk);

            expect(res.stack.t.toString()).toEqual(' 67835.344   ');
            expect(res.stack.z.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.y.toString()).toEqual(' 5735.23     ');
            expect(res.stack.x.toString()).toEqual(' 5735.23     ');
            expect(res.stack.x1.toString()).toEqual(' 5735.23     ');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);

            res = core[Cmd.Enter].operation(res as any);

            expect(res.stack.t.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.z.toString()).toEqual(' 5735.23     ');
            expect(res.stack.y.toString()).toEqual(' 5735.23     ');
            expect(res.stack.x.toString()).toEqual(' 5735.23     ');
            expect(res.stack.x1.toString()).toEqual(' 5735.23     ');

            expect(res.stack.t).toEqual(mk.stack.y);
            expect(res.stack.z).toEqual(mk.stack.x);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);
        });
    });

    describe('Input', () => {
        it('canInput = true', () => {
            mk.stack = new Stack({
                t: new Register(100000000000000000000000000),
                z: new Register(67835.3437345634534),
                y: new Register(34536343634534535),
                x: new Register(5735.23),
                x1: new Register(0.000000056723),
                canInput: true,
            });

            expect(mk.stack.t.toString()).toEqual(' 1.        26');
            expect(mk.stack.z.toString()).toEqual(' 67835.344   ');
            expect(mk.stack.y.toString()).toEqual(' 3.4536344 16');
            expect(mk.stack.x.toString()).toEqual(' 5735.23     ');
            expect(mk.stack.x1.toString()).toEqual(' 5.6723   -08');

            let res = core[Cmd.Num1].operation(mk);

            expect(res.stack.canInput).toEqual(true);

            expect(mk.stack.t.toString()).toEqual(' 1.        26');
            expect(mk.stack.z.toString()).toEqual(' 67835.344   ');
            expect(res.stack.y.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.x.toString()).toEqual(' 1.          ');
            expect(mk.stack.x1.toString()).toEqual(' 5.6723   -08');

            expect(res.stack.t).toEqual(mk.stack.t);
            expect(res.stack.z).toEqual(mk.stack.z);
            expect(res.stack.y).toEqual(mk.stack.y);
            expect(res.stack.x1).toEqual(mk.stack.x1);

            res = core[Cmd.Num2].operation(res as any);

            expect(mk.stack.t.toString()).toEqual(' 1.        26');
            expect(mk.stack.z.toString()).toEqual(' 67835.344   ');
            expect(res.stack.y.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.x.toString()).toEqual(' 12.         ');
            expect(mk.stack.x1.toString()).toEqual(' 5.6723   -08');

            expect(res.stack.t).toEqual(mk.stack.t);
            expect(res.stack.z).toEqual(mk.stack.z);
            expect(res.stack.y).toEqual(mk.stack.y);
            expect(res.stack.x1).toEqual(mk.stack.x1);

            res = core[Cmd.Dot].operation(res as any);

            expect(mk.stack.t.toString()).toEqual(' 1.        26');
            expect(mk.stack.z.toString()).toEqual(' 67835.344   ');
            expect(res.stack.y.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.x.toString()).toEqual(' 12.         ');
            expect(mk.stack.x1.toString()).toEqual(' 5.6723   -08');

            expect(res.stack.t).toEqual(mk.stack.t);
            expect(res.stack.z).toEqual(mk.stack.z);
            expect(res.stack.y).toEqual(mk.stack.y);
            expect(res.stack.x1).toEqual(mk.stack.x1);

            res = core[Cmd.Num3].operation(res as any);

            expect(mk.stack.t.toString()).toEqual(' 1.        26');
            expect(mk.stack.z.toString()).toEqual(' 67835.344   ');
            expect(res.stack.y.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.x.toString()).toEqual(' 12.3        ');
            expect(mk.stack.x1.toString()).toEqual(' 5.6723   -08');

            expect(res.stack.t).toEqual(mk.stack.t);
            expect(res.stack.z).toEqual(mk.stack.z);
            expect(res.stack.y).toEqual(mk.stack.y);
            expect(res.stack.x1).toEqual(mk.stack.x1);
        });
        it('canInput = false', () => {
            mk.stack = new Stack({
                t: new Register(100000000000000000000000000),
                z: new Register(67835.3437345634534),
                y: new Register(34536343634534535),
                x: new Register(5735.23),
                x1: new Register(0.000000056723),
                canInput: false,
            });

            let res = core[Cmd.Num1].operation(mk);

            expect(res.stack.t.toString()).toEqual(' 67835.344   ');
            expect(res.stack.z.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.y.toString()).toEqual(' 5735.23     ');
            expect(res.stack.x.toString()).toEqual(' 1.          ');
            expect(res.stack.x1.toString()).toEqual(' 5735.23     ');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);

            res = core[Cmd.Num2].operation(res as any);

            expect(res.stack.t.toString()).toEqual(' 67835.344   ');
            expect(res.stack.z.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.y.toString()).toEqual(' 5735.23     ');
            expect(res.stack.x.toString()).toEqual(' 12.         ');
            expect(res.stack.x1.toString()).toEqual(' 5735.23     ');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);

            res = core[Cmd.Dot].operation(res as any);

            expect(res.stack.t.toString()).toEqual(' 67835.344   ');
            expect(res.stack.z.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.y.toString()).toEqual(' 5735.23     ');
            expect(res.stack.x.toString()).toEqual(' 12.         ');
            expect(res.stack.x1.toString()).toEqual(' 5735.23     ');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);

            res = core[Cmd.Num0].operation(res as any);

            expect(res.stack.t.toString()).toEqual(' 67835.344   ');
            expect(res.stack.z.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.y.toString()).toEqual(' 5735.23     ');
            expect(res.stack.x.toString()).toEqual(' 12.0        ');
            expect(res.stack.x1.toString()).toEqual(' 5735.23     ');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);
        });
    });

    describe('Operations', () => {
        describe('multiply', () => {
            it('normal', () => {
                mk.stack = new Stack({
                    t: new Register(-10),
                    z: new Register(10),
                    y: new Register(-780),
                    x: new Register(5735.231),
                    x1: new Register(0.000000056723),
                    canInput: true,
                });

                expect(mk.stack.t.toString()).toEqual('-10.         ');
                expect(mk.stack.z.toString()).toEqual(' 10.         ');
                expect(mk.stack.y.toString()).toEqual('-780.        ');
                expect(mk.stack.x.toString()).toEqual(' 5735.231    ');
                expect(mk.stack.x1.toString()).toEqual(' 5.6723   -08');

                let res = core[Cmd.Mul].operation(mk);
                expect(res.stack.t.toString()).toEqual('-10.         ');
                expect(res.stack.z.toString()).toEqual('-10.         ');
                expect(res.stack.y.toString()).toEqual(' 10.         ');
                expect(res.stack.x.toString()).toEqual('-4473480.2   ');
                expect(res.stack.x1.toString()).toEqual(' 5735.231    ');

                res = core[Cmd.Mul].operation(res as any);
                expect(res.stack.t.toString()).toEqual('-10.         ');
                expect(res.stack.z.toString()).toEqual('-10.         ');
                expect(res.stack.y.toString()).toEqual('-10.         ');
                expect(res.stack.x.toString()).toEqual('-44734802.   ');
                expect(res.stack.x1.toString()).toEqual('-4473480.2   ');

                res = core[Cmd.Mul].operation(res as any);
                expect(res.stack.t.toString()).toEqual('-10.         ');
                expect(res.stack.z.toString()).toEqual('-10.         ');
                expect(res.stack.y.toString()).toEqual('-10.         ');
                expect(res.stack.x.toString()).toEqual(' 4.4734802 08');
                expect(res.stack.x1.toString()).toEqual('-44734802.   ');
            });
            it('small', () => {
                // FIXME
                //mk.stack = new Stack({
                //    t       : new Register(-10),
                //    z       : new Register(10),
                //    y       : new Register(-780),
                //    x       : new Register(0.000000056723),
                //    x1      : new Register(5735.231),
                //    canInput: true,
                //});
                //
                //expect(mk.stack.t.toString()).toEqual('-10.         ');
                //expect(mk.stack.z.toString()).toEqual(' 10.         ');
                //expect(mk.stack.y.toString()).toEqual('-780.        ');
                //expect(mk.stack.x.toString()).toEqual(' 5.6723   -08');
                //expect(mk.stack.x1.toString()).toEqual(' 5735.231    ');
                //
                //let res = core[Cmd.Mul](mk);
                //expect(res.stack.t.toString()).toEqual('-10.         ');
                //expect(res.stack.z.toString()).toEqual('-10.         ');
                //expect(res.stack.y.toString()).toEqual(' 10.         ');
                //expect(res.stack.x.toString()).toEqual('-44.24394    ');
                //expect(res.stack.x1.toString()).toEqual(' 5.6723   -08');
                //
                //res = core[Cmd.Mul](res);
                //expect(res.stack.t.toString()).toEqual('-10.         ');
                //expect(res.stack.z.toString()).toEqual('-10.         ');
                //expect(res.stack.y.toString()).toEqual('-10.         ');
                //expect(res.stack.x.toString()).toEqual('-44734802.   ');
                //expect(res.stack.x1.toString()).toEqual('-4473480.2   ');
                //
                //res = core[Cmd.Mul](res);
                //expect(res.stack.t.toString()).toEqual('-10.         ');
                //expect(res.stack.z.toString()).toEqual('-10.         ');
                //expect(res.stack.y.toString()).toEqual('-10.         ');
                //expect(res.stack.x.toString()).toEqual(' 4.4734802 08');
                //expect(res.stack.x1.toString()).toEqual('-44734802.   ');
            });
        });

        describe('sqr', () => {
            it('normal', () => {
                mk.stack = new Stack({
                    t: new Register(-2),
                    z: new Register(2),
                    y: new Register(-2),
                    x: new Register(4),
                    x1: new Register(0.000000056723),
                    canInput: true,
                });

                expect(mk.stack.t.toString()).toEqual('-2.          ');
                expect(mk.stack.z.toString()).toEqual(' 2.          ');
                expect(mk.stack.y.toString()).toEqual('-2.          ');
                expect(mk.stack.x.toString()).toEqual(' 4.          ');
                expect(mk.stack.x1.toString()).toEqual(' 5.6723   -08');

                let res = core[Cmd.sqr].operation(mk);
                expect(res.stack.t.toString()).toEqual('-2.          ');
                expect(res.stack.z.toString()).toEqual(' 2.          ');
                expect(res.stack.y.toString()).toEqual('-2.          ');
                expect(res.stack.x.toString()).toEqual(' 16.         ');
                expect(res.stack.x1.toString()).toEqual(' 4.          ');

                res = core[Cmd.sqr].operation(res as any);
                expect(res.stack.t.toString()).toEqual('-2.          ');
                expect(res.stack.z.toString()).toEqual(' 2.          ');
                expect(res.stack.y.toString()).toEqual('-2.          ');
                expect(res.stack.x.toString()).toEqual(' 256.        ');
                expect(res.stack.x1.toString()).toEqual(' 16.         ');

                res = core[Cmd.sqr].operation(res as any);
                expect(res.stack.t.toString()).toEqual('-2.          ');
                expect(res.stack.z.toString()).toEqual(' 2.          ');
                expect(res.stack.y.toString()).toEqual('-2.          ');
                expect(res.stack.x.toString()).toEqual(' 65536.      ');
                expect(res.stack.x1.toString()).toEqual(' 256.        ');
            });
        });

        describe('Sign', () => {
            it('normal', () => {
                mk.stack = new Stack({
                    t: new Register(-2),
                    z: new Register(2),
                    y: new Register(-2),
                    x: new Register(4),
                    x1: new Register(0.000000056723),
                    canInput: true,
                });

                expect(mk.stack.t.toString()).toEqual('-2.          ');
                expect(mk.stack.z.toString()).toEqual(' 2.          ');
                expect(mk.stack.y.toString()).toEqual('-2.          ');
                expect(mk.stack.x.toString()).toEqual(' 4.          ');
                expect(mk.stack.x1.toString()).toEqual(' 5.6723   -08');
                expect(mk.stack.canInput).toBeTruthy();

                let res = core[Cmd.Sign].operation(mk);
                expect(res.stack.t.toString()).toEqual('-2.          ');
                expect(res.stack.z.toString()).toEqual(' 2.          ');
                expect(res.stack.y.toString()).toEqual('-2.          ');
                expect(res.stack.x.toString()).toEqual('-4.          ');
                expect(res.stack.x1.toString()).toEqual(' 5.6723   -08');
                expect(res.stack.canInput).not.toBeTruthy();

                res = core[Cmd.Num1].operation(res as any);
                expect(res.stack.t.toString()).toEqual(' 2.          ');
                expect(res.stack.z.toString()).toEqual('-2.          ');
                expect(res.stack.y.toString()).toEqual('-4.          ');
                expect(res.stack.x.toString()).toEqual(' 1.          ');
                expect(res.stack.x1.toString()).toEqual('-4.          ');

                //res = core[Cmd.sqr].operation(res as any);
                //expect(res.stack.t.toString()).toEqual('-2.          ');
                //expect(res.stack.z.toString()).toEqual(' 2.          ');
                //expect(res.stack.y.toString()).toEqual('-2.          ');
                //expect(res.stack.x.toString()).toEqual(' 65536.      ');
                //expect(res.stack.x1.toString()).toEqual(' 256.        ');
            });
        });

        it('const PI', () => {
            mk.stack = new Stack({
                t: new Register(-2),
                z: new Register(2),
                y: new Register(-2),
                x: new Register(4),
                x1: new Register(0.000000056723),
                canInput: true,
            });

            expect(mk.stack.t.toString()).toEqual('-2.          ');
            expect(mk.stack.z.toString()).toEqual(' 2.          ');
            expect(mk.stack.y.toString()).toEqual('-2.          ');
            expect(mk.stack.x.toString()).toEqual(' 4.          ');
            expect(mk.stack.x1.toString()).toEqual(' 5.6723   -08');

            let res = core[Cmd.pi].operation(mk);
            expect(res.stack.t.toString()).toEqual(' 2.          ');
            expect(res.stack.z.toString()).toEqual('-2.          ');
            expect(res.stack.y.toString()).toEqual(' 4.          ');
            expect(res.stack.x.toString()).toEqual(' 3.1415926   ');
            expect(res.stack.x1.toString()).toEqual(' 4.          ');
        });
    });
});
