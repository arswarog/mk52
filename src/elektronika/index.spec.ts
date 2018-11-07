//import { makeButton } from './common';
//import { keyLabels } from './l18n/index';
//import { Calculator } from './index';

import { ICalculator, ICore } from './calculator.interface';
import { makeButton } from './common';
import { Cmd } from './core/commands';
import { Calculator } from './index';

let calc: Calculator = null;
let testCore: ICore = null;

describe('Calculator', () => {
    beforeEach(() => {
        testCore = {};
        calc = new Calculator(testCore);
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

            calc.keyPress(makeButton('w', Cmd.Num0));
        });

        it('Single keys (when microcode not exists)', () => {
            expect(
                () => calc.keyPress(makeButton('w', Cmd.Num0)),
            ).toThrow(new Error(`Unknown cmd "Num0" (code ${Cmd.Num0})`));
        });

        it('F key', (done) => {
            testCore[Cmd.sin] = (c) => {
                done();
                return c;
            };

            calc = calc.keyPress(makeButton('f', Cmd.F));

            expect(calc.keys).toEqual(['F']);

            calc = calc.keyPress(makeButton('w', Cmd.Num0, Cmd.sin));

            expect(calc.keys).toEqual([]);
        });

        it('K key', (done) => {
            testCore[Cmd.abs] = (c) => {
                done();
                return c;
            };

            calc = calc.keyPress(makeButton('k', Cmd.K));

            expect(calc.keys).toEqual(['K']);

            calc = calc.keyPress(makeButton('w', Cmd.Num0, Cmd.sin, Cmd.abs));

            expect(calc.keys).toEqual([]);
        });

        describe('GOTO', () => {
            it('GOTO 11', () => {
                let keys = [];

                testCore[Cmd.goto] = (calc: ICalculator, cmd: Cmd): ICalculator => {
                    switch (calc.keys.length) {
                        case 0:
                            calc.keys.push(Cmd.goto);
                            break;
                        case 1:
                            calc.keys.push(cmd.toString().substr(1, 1));
                            break;
                        case 2:
                            const address = calc.keys[1] + cmd.toString().substr(1, 1);
                            calc.programm = calc.programm.goto(address);
                            calc.keys = [];
                            break;
                    }
                    return calc;
                };

                expect(calc.programm.address).toBe(0);

                let calc1 = calc.keyPress(makeButton('w', Cmd.goto));
                expect(calc1.keys).toEqual([Cmd.goto]);

                let calc2 = calc1.keyPress(makeButton('w', Cmd.Num1));
                expect(calc2.keys).toEqual([Cmd.goto, '1']);

                let calc3 = calc2.keyPress(makeButton('w', Cmd.Num1));

                expect(calc3.programm.address).toBe(11);
            });
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