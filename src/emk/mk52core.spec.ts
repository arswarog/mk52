import * as should from 'should';
import { CoreMode, MK52Core } from "./MK52Core";

describe('Core', () => {
    describe('Input value', () => {
        it('Input 456789', () => {
            let core = new MK52Core();
            should(core).have.property('mode', CoreMode.Default);
            should(core.display.toNumber()).equal(0);
            core.exec('04');
            should(core.display.toNumber()).equal(4);
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('05');
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('06');
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('07');
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('08');
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('09');
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('0E');
            should(core).have.property('mode', CoreMode.Added);
            should(core).have.property('x')
                        .have.property('mantissa', 456789);
            should(core).have.property('x')
                        .have.property('magnitude', 0);
            should(core.x.toNumber()).equal(456789);
        });

        it('Input 123^5', () => {
            let core = new MK52Core();
            should(core).have.property('mode', CoreMode.Default);
            core.exec('01');
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('02');
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('03');
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('0C');
            should(core).have.property('mode', CoreMode.AddToMagnitude);
            core.exec('05');
            should(core).have.property('mode', CoreMode.AddToMagnitude);
            core.exec('0E');
            should(core).have.property('mode', CoreMode.Added);
            should(core).have.property('x').have.property('mantissa', 123);
            should(core).have.property('x').have.property('magnitude', 5);
            should(core.x.toNumber()).equal(12300000);
            core.exec('12');
            should(core).have.property('mode', CoreMode.Default);
        });

        it('Input 123^45', () => {
            let core = new MK52Core();
            should(core).have.property('mode', CoreMode.Default);
            core.exec('01');
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('02');
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('03');
            should(core).have.property('mode', CoreMode.AddToMantissa);
            core.exec('0C');
            should(core).have.property('mode', CoreMode.AddToMagnitude);
            core.exec('04');
            should(core).have.property('mode', CoreMode.AddToMagnitude);
            core.exec('05');
            should(core).have.property('mode', CoreMode.AddToMagnitude);
            core.exec('0E');
            should(core).have.property('mode', CoreMode.Added);
            should(core).have.property('x').have.property('mantissa', 123);
            should(core).have.property('x').have.property('magnitude', 45);
            core.exec('12');
            should(core).have.property('mode', CoreMode.Default);
        });
    });

    describe('Input and stack', () => {
        it('Input, up, input and mul', () => {
            let core = new MK52Core();
            should(core.x1.toNumber()).equal(0);
            should(core.x.toNumber()).equal(0);
            should(core.y.toNumber()).equal(0);
            should(core.z.toNumber()).equal(0);
            should(core.t.toNumber()).equal(0);

            ['07', '08', '09', '0E'].forEach(code => core.exec(code));
            should(core.x1.toNumber()).equal(789);
            should(core.x.toNumber()).equal(789);
            should(core.y.toNumber()).equal(789);
            should(core.z.toNumber()).equal(0);
            should(core.t.toNumber()).equal(0);

            ['01', '02', '03', '0E'].forEach(code => core.exec(code));
            should(core.x1.toNumber()).equal(123);
            should(core.x.toNumber()).equal(123);
            should(core.y.toNumber()).equal(123);
            should(core.z.toNumber()).equal(789);
            should(core.t.toNumber()).equal(0);

            ['04', '00', '12'].forEach(code => core.exec(code));
            should(core.x1.toNumber()).equal(40);
            should(core.x.toNumber()).equal(4920);
            should(core.y.toNumber()).equal(789);
            should(core.z.toNumber()).equal(0);
            should(core.t.toNumber()).equal(0);
        });
    });

    describe('Operations', () => {
        it('1000 * 1000', () => {
            let core = new MK52Core();
            should(core.x1.toNumber()).equal(0);
            should(core.x.toNumber()).equal(0);
            should(core.y.toNumber()).equal(0);
            should(core.z.toNumber()).equal(0);
            should(core.t.toNumber()).equal(0);

            ['01', '00', '00', '00', '0E'].forEach(code => core.exec(code));
            should(core.x1.toNumber()).equal(1000);
            should(core.x.toNumber()).equal(1000);
            should(core.y.toNumber()).equal(1000);
            should(core.z.toNumber()).equal(0);
            should(core.t.toNumber()).equal(0);

            core.exec('0E');
            should(core.x1.toNumber()).equal(1000);
            should(core.x.toNumber()).equal(1000);
            should(core.y.toNumber()).equal(1000);
            should(core.z.toNumber()).equal(1000);
            should(core.t.toNumber()).equal(0);

            core.exec('0E');
            should(core.x1.toNumber()).equal(1000);
            should(core.x.toNumber()).equal(1000);
            should(core.y.toNumber()).equal(1000);
            should(core.z.toNumber()).equal(1000);
            should(core.t.toNumber()).equal(1000);

            core.exec('12');
            should(core.x1.toNumber()).equal(1000);
            should(core.x.toNumber()).equal(10 ** 6);
            should(core.y.toNumber()).equal(1000);
            should(core.z.toNumber()).equal(1000);
            should(core.t.toNumber()).equal(1000);

            core.exec('12');
            should(core.x1.toNumber()).equal(10 ** 6);
            should(core.x.toNumber()).equal(10 ** 9);
            should(core.y.toNumber()).equal(1000);
            should(core.z.toNumber()).equal(1000);
            should(core.t.toNumber()).equal(1000);

            core.exec('12');
            should(core.x.toNumber()).equal(10 ** 12);

            core.exec('12');
            should(core.x.toNumber()).equal(10 ** 15);

            core.exec('12');
            should(core.x.toNumber()).equal(10 ** 18);

            core.exec('12');
            should(core.x.toNumber()).equal(10 ** 21);
        });
    });
});