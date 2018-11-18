import { ICalcCtrl } from '../calculator.interface';
import { CalculatorStatus } from '../index';
import { Cmd } from './commands';
import { BaseMKCore } from './core';
import { Programm } from './programm';
import { Register } from './register';
import { Registers } from './registers';
import { Stack } from './stack';

const core = BaseMKCore;
let mk: ICalcCtrl;

describe('Core', () => {
    beforeEach(() => {
        mk = {
            status   : CalculatorStatus.Standart,
            stack    : new Stack(),
            registers: new Registers(),
            programm : new Programm(),
            keys     : [],

            stat: {
                executed       : 0,
                lastRunExecuted: 0,
            },
        } as ICalcCtrl;
    });

    describe('Enter', () => {
        it('1', () => {
            mk.stack = new Stack({
                x1      : new Register(0.000000056723),
                x       : new Register(5735.23),
                y       : new Register(34536343634534535),
                z       : new Register(67835.3437345634534),
                t       : new Register(100000000000000000000000000),
                canInput: false,
            });

            const res = core[Cmd.Enter](mk);

            expect(res.stack.t.toString()).toEqual(' 67835.344   ');
            expect(res.stack.z.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.y.toString()).toEqual(' 5735.2300   ');
            expect(res.stack.x.toString()).toEqual(' 5735.2300   ');
            expect(res.stack.x1.toString()).toEqual(' 5735.2300   ');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);
        });
        it('2', () => {
            mk.stack = new Stack({
                x1      : new Register(0.000000056723),
                x       : new Register(5735.23),
                y       : new Register(34536343634534535),
                z       : new Register(67835.3437345634534),
                t       : new Register(100000000000000000000000000),
                canInput: false,
            });

            let res = core[Cmd.Enter](mk);

            expect(res.stack.t.toString()).toEqual(' 67835.344   ');
            expect(res.stack.z.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.y.toString()).toEqual(' 5735.2300   ');
            expect(res.stack.x.toString()).toEqual(' 5735.2300   ');
            expect(res.stack.x1.toString()).toEqual(' 5735.2300   ');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);

            res = core[Cmd.Enter](res);

            expect(res.stack.t.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.z.toString()).toEqual(' 5735.2300   ');
            expect(res.stack.y.toString()).toEqual(' 5735.2300   ');
            expect(res.stack.x.toString()).toEqual(' 5735.2300   ');
            expect(res.stack.x1.toString()).toEqual(' 5735.2300   ');

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
                t       : new Register(100000000000000000000000000),
                z       : new Register(67835.3437345634534),
                y       : new Register(34536343634534535),
                x       : new Register(5735.23),
                x1      : new Register(0.000000056723),
                canInput: true,
            });

            let res = core[Cmd.Enter](mk);
            res     = core[Cmd.Num1](res);

            expect(res.stack.t.toString()).toEqual(' 1         16');
            expect(res.stack.z.toString()).toEqual(' 67835.344   ');
            expect(res.stack.y.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.x.toString()).toEqual(' 1.          ');
            expect(res.stack.x1.toString()).toEqual(' 5735.2300-10');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);

            res = core[Cmd.Num2](res);

            expect(res.stack.t.toString()).toEqual(' 1         16');
            expect(res.stack.z.toString()).toEqual(' 67835.344   ');
            expect(res.stack.y.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.x.toString()).toEqual(' 12.         ');
            expect(res.stack.x1.toString()).toEqual(' 5735.2300-10');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);
        });
        it('canInput = false', () => {
            mk.stack = new Stack({
                t       : new Register(100000000000000000000000000),
                z       : new Register(67835.3437345634534),
                y       : new Register(34536343634534535),
                x       : new Register(5735.23),
                x1      : new Register(0.000000056723),
                canInput: false,
            });

            let res = core[Cmd.Enter](mk);
            res     = core[Cmd.Num1](res);

            expect(res.stack.t.toString()).toEqual(' 67835.344   ');
            expect(res.stack.z.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.y.toString()).toEqual(' 5735.2300   ');
            expect(res.stack.x.toString()).toEqual(' 1.          ');
            expect(res.stack.x1.toString()).toEqual(' 5735.2300   ');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);

            res = core[Cmd.Num2](res);

            expect(res.stack.t.toString()).toEqual(' 67835.344   ');
            expect(res.stack.z.toString()).toEqual(' 3.4536344 16');
            expect(res.stack.y.toString()).toEqual(' 5735.2300   ');
            expect(res.stack.x.toString()).toEqual(' 12.         ');
            expect(res.stack.x1.toString()).toEqual(' 5735.2300   ');

            expect(res.stack.t).toEqual(mk.stack.z);
            expect(res.stack.z).toEqual(mk.stack.y);
            expect(res.stack.y).toEqual(mk.stack.x);
            expect(res.stack.x1).toEqual(mk.stack.x);
        });
    });
});