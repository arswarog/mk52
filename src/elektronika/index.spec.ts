//import { makeButton } from './common';
//import { keyLabels } from './l18n/index';
//import { Calculator } from './index';

import { ICore } from './calculator.interface';
import { makeButton } from './common';
import { Cmd } from './core/commands';
import { Calculator } from './index';
import { keyLabels } from './l18n';

let calc: Calculator = null;
let testCore: ICore  = null;

describe('Calculator', () => {
    beforeEach(() => {
        testCore = {};
        calc     = new Calculator(testCore);
    });

    describe('Clone', () => {
        it('Keys', () => {
            const calc2 = calc.clone({
                keys: ['F'],
            });

            expect(calc2.keys).toEqual(['F']);
        });
    });
    describe('Keyboard controller', () => {
        it('Single keys', (done) => {
            testCore[Cmd.Num0] = (c) => {
                done();
                return c;
            };

            calc.keyPress(makeButton(keyLabels)('w', Cmd.Num0));
        });

        it('Single keys (when microcode not exists)', () => {
            expect(
                () => calc.keyPress(makeButton(keyLabels)('w', Cmd.Num0)),
            ).toThrow(new Error(`Unknown cmd Num0 (${Cmd.Num0})`));
        });

        it('F key', (done) => {
            testCore[Cmd.sin] = (c) => {
                done();
                return c;
            };

            calc = calc.keyPress(makeButton(keyLabels)('f', Cmd.F));

            expect(calc.keys).toEqual(['F']);

            calc = calc.keyPress(makeButton(keyLabels)('w', Cmd.Num0, Cmd.sin));

            expect(calc.keys).toEqual([]);
        });

        it('K key', (done) => {
            testCore[Cmd.abs] = (c) => {
                done();
                return c;
            };

            calc = calc.keyPress(makeButton(keyLabels)('k', Cmd.K));

            expect(calc.keys).toEqual(['K']);

            calc = calc.keyPress(makeButton(keyLabels)('w', Cmd.Num0, Cmd.sin, Cmd.abs));

            expect(calc.keys).toEqual([]);
        });

        describe('Input numbers', () => {
            it('Single keys', (done) => {
                //calc.keyA4 = (() => {
                done();
                //}) as any;
                //
                //calc.keyPress('A4');
            });
            it('Single keys (negative)', () => {
                //expect(() => {
                //    calc.keyPress('A45');
                //}).toThrow();
            });
        });
    });
});