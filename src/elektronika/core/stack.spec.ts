import { Register } from './register';
import { Stack } from './stack';

describe('Stack', () => {
    let stack: Stack = null;

    beforeEach(() => {
        stack = new Stack({
            t       : new Register(100000000000000000000000000),
            z       : new Register(67835.3437345634534),
            y       : new Register(34536343634534535),
            x       : new Register(5735.23),
            x1      : new Register(0.000000056723),
            canInput: false,
        });
    });

    describe('base', () => {
        it('values', () => {
            let res = stack;

            expect(res.t.toString()).toEqual(' 1.        26');
            expect(res.z.toString()).toEqual(' 67835.344   ');
            expect(res.y.toString()).toEqual(' 3.4536344 16');
            expect(res.x.toString()).toEqual(' 5735.23     ');
            expect(res.x1.toString()).toEqual(' 5.6723   -08');
        });

        it('enter', () => {
            let res = stack.enter();

            expect(res.t.toString()).toEqual(' 67835.344   ');
            expect(res.z.toString()).toEqual(' 3.4536344 16');
            expect(res.y.toString()).toEqual(' 5735.23     ');
            expect(res.x.toString()).toEqual(' 5735.23     ');
            expect(res.x1.toString()).toEqual(' 5735.23     ');

            expect(res.t).toEqual(stack.z);
            expect(res.z).toEqual(stack.y);
            expect(res.y).toEqual(stack.x);
            expect(res.x1).toEqual(stack.x);

            res = res.enter();

            expect(res.t.toString()).toEqual(' 3.4536344 16');
            expect(res.z.toString()).toEqual(' 5735.23     ');
            expect(res.y.toString()).toEqual(' 5735.23     ');
            expect(res.x.toString()).toEqual(' 5735.23     ');
            expect(res.x1.toString()).toEqual(' 5735.23     ');

            expect(res.t).toEqual(stack.y);
            expect(res.z).toEqual(stack.x);
            expect(res.y).toEqual(stack.x);
            expect(res.x1).toEqual(stack.x);
        });

        it('op1', () => {
            let res = stack.op1(new Register(123));

            expect(res.t.toString()).toEqual(' 1.        26');
            expect(res.z.toString()).toEqual(' 67835.344   ');
            expect(res.y.toString()).toEqual(' 3.4536344 16');
            expect(res.x.toString()).toEqual(' 123.        ');
            expect(res.x1.toString()).toEqual(' 5735.23     ');

            expect(res.t).toEqual(stack.t);
            expect(res.z).toEqual(stack.z);
            expect(res.y).toEqual(stack.y);
            expect(res.x1).toEqual(stack.x);
        });

        it('op2', () => {
            let res = stack.op2(new Register(123));

            expect(res.t.toString()).toEqual(' 1.        26');
            expect(res.z.toString()).toEqual(' 1.        26');
            expect(res.y.toString()).toEqual(' 67835.344   ');
            expect(res.x.toString()).toEqual(' 123.        ');
            expect(res.x1.toString()).toEqual(' 5735.23     ');

            expect(res.t).toEqual(stack.t);
            expect(res.z).toEqual(stack.t);
            expect(res.y).toEqual(stack.z);
            expect(res.x1).toEqual(stack.x);
        });
    });
    describe('Input', () => {
        it('canInput = false', () => {
            stack.canInput = false;

            expect(stack.canInput).toEqual(false);

            let res = stack.input(1);

            expect(res.t.toString()).toEqual(' 67835.344   ');
            expect(res.z.toString()).toEqual(' 3.4536344 16');
            expect(res.y.toString()).toEqual(' 5735.23     ');
            expect(res.x.toString()).toEqual(' 1.          ');
            expect(res.x1.toString()).toEqual(' 5735.23     ');

            expect(res.t).toEqual(stack.z);
            expect(res.z).toEqual(stack.y);
            expect(res.y).toEqual(stack.x);
            expect(res.x1).toEqual(stack.x);

            res = res.input(2);

            expect(res.t.toString()).toEqual(' 67835.344   ');
            expect(res.z.toString()).toEqual(' 3.4536344 16');
            expect(res.y.toString()).toEqual(' 5735.23     ');
            expect(res.x.toString()).toEqual(' 12.         ');
            expect(res.x1.toString()).toEqual(' 5735.23     ');

            expect(res.t).toEqual(stack.z);
            expect(res.z).toEqual(stack.y);
            expect(res.y).toEqual(stack.x);
            expect(res.x1).toEqual(stack.x);

            res = res.enter();

            expect(res.canInput).toEqual(true);

            expect(res.t.toString()).toEqual(' 3.4536344 16');
            expect(res.z.toString()).toEqual(' 5735.23     ');
            expect(res.y.toString()).toEqual(' 12.         ');
            expect(res.x.toString()).toEqual(' 12.         ');
            expect(res.x1.toString()).toEqual(' 12.         ');

            expect(res.t).toEqual(stack.y);
            expect(res.z).toEqual(stack.x);
        });
        it('canInput = true', () => {
            stack.canInput = true;

            expect(stack.canInput).toEqual(true);

            let res = stack.input(1);

            expect(res.t.toString()).toEqual(' 1.        26');
            expect(res.z.toString()).toEqual(' 67835.344   ');
            expect(res.y.toString()).toEqual(' 3.4536344 16');
            expect(res.x.toString()).toEqual(' 1.          ');
            expect(res.x1.toString()).toEqual(' 5.6723   -08');

            expect(res.t).toEqual(stack.t);
            expect(res.z).toEqual(stack.z);
            expect(res.y).toEqual(stack.y);
            expect(res.x1).toEqual(stack.x1);

            res = res.input(2);

            expect(res.t.toString()).toEqual(' 1.        26');
            expect(res.z.toString()).toEqual(' 67835.344   ');
            expect(res.y.toString()).toEqual(' 3.4536344 16');
            expect(res.x.toString()).toEqual(' 12.         ');
            expect(res.x1.toString()).toEqual(' 5.6723   -08');

            expect(res.t).toEqual(stack.t);
            expect(res.z).toEqual(stack.z);
            expect(res.y).toEqual(stack.y);
            expect(res.x1).toEqual(stack.x1);

            res = res.enter();

            expect(res.canInput).toEqual(true);

            expect(res.t.toString()).toEqual(' 67835.344   ');
            expect(res.z.toString()).toEqual(' 3.4536344 16');
            expect(res.y.toString()).toEqual(' 12.         ');
            expect(res.x.toString()).toEqual(' 12.         ');
            expect(res.x1.toString()).toEqual(' 12.         ');

            expect(res.t).toEqual(stack.z);
            expect(res.z).toEqual(stack.y);
        });
    });
});