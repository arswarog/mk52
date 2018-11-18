import { ICalcCtrl, ICore } from './calculator.interface';
import { makeButton } from './common';
import { Cmd } from './core/commands';
import { Calculator } from './index';

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

            calc.keyPress(makeButton('w', null, Cmd.Num0));
        });

        it('Single keys (when microcode not exists)', () => {
            expect(
                () => calc.keyPress(makeButton('w', null, Cmd.Num0)),
            ).toThrow(new Error(`Unknown cmd "Num0" (code ${Cmd.Num0})`));
        });

        it('F key', (done) => {
            testCore[Cmd.sin] = (c) => {
                done();
                return c;
            };

            calc = calc.keyPress(makeButton('f', null, Cmd.F));

            expect(calc.keys).toEqual(['F']);

            calc = calc.keyPress(makeButton('w', null, Cmd.Num0, Cmd.sin));

            expect(calc.keys).toEqual([]);
        });

        it('K key', (done) => {
            testCore[Cmd.abs] = (c) => {
                done();
                return c;
            };

            calc = calc.keyPress(makeButton('k', null, Cmd.K));

            expect(calc.keys).toEqual(['K']);

            calc = calc.keyPress(makeButton('w', null, Cmd.Num0, Cmd.sin, Cmd.abs));

            expect(calc.keys).toEqual([]);
        });

        describe('ICalculatrCtrl', () => {
            it('commandComplete', () => {
                testCore[Cmd.goto] = (calculator: ICalcCtrl, cmd: Cmd): ICalcCtrl => {
                    return calculator._commandComplete(calculator);
                };

                let calc1 = calc.keyPress(makeButton('w', null, Cmd.goto));
                expect(calc1.stat.executed).toBe(1);
                expect(calc1.keys).toEqual([]);
            });

            it('commandRunOther', () => {
                const cmds: Cmd[] = [];

                testCore[Cmd.Num0] = (calculator: ICalcCtrl, cmd: Cmd): ICalcCtrl => {
                    cmds.push(cmd);
                    if (cmd === Cmd.Num0)
                        return {
                            ...calculator,
                            keys: [cmd],
                        };
                    else
                        return calculator._commandRunOther(calculator, cmd);
                };

                testCore[Cmd.goto] = (calculator: ICalcCtrl, cmd: Cmd): ICalcCtrl => {
                    cmds.push(cmd);
                    return calculator._commandComplete(calculator);
                };

                const calc1 = calc.keyPress(makeButton('w', null, Cmd.Num0));
                // expect(calc1.stat.executed).toBe(0);
                expect(calc1.keys).toEqual([Cmd.Num0]);

                const calc2 = calc1.keyPress(makeButton('w', null, Cmd.goto));
                expect(cmds).toEqual([Cmd.Num0, Cmd.goto, Cmd.goto]);
                // expect(calc2.stat.executed).toBe(2);
                expect(calc2.keys).toEqual([]);
            });
        });

        describe('GOTO', () => {
            it('GOTO 11', () => {
                testCore[Cmd.goto] = (calculator: ICalcCtrl, cmd: Cmd): ICalcCtrl => {
                    switch (calculator.keys.length) {
                        case 0:
                            calculator.keys.push(Cmd.goto);
                            break;
                        case 1:
                            calculator.keys.push(cmd.toString().substr(1, 1));
                            break;
                        case 2:
                            const address       = calculator.keys[1] + cmd.toString().substr(1, 1);
                            calculator.programm = calculator.programm.goto(address);
                            return calculator._commandComplete(calculator);
                    }
                    return calculator;
                };

                expect(calc.programm.address).toBe(0);

                let calc1 = calc.keyPress(makeButton('w', null, Cmd.goto));
                expect(calc1.keys).toEqual([Cmd.goto]);

                let calc2 = calc1.keyPress(makeButton('w', null, Cmd.Num1));
                expect(calc2.keys).toEqual([Cmd.goto, '1']);

                let calc3 = calc2.keyPress(makeButton('w', null, Cmd.Num1));

                expect(calc3.programm.address).toBe(11);
                expect(calc3.stat.executed).toBe(1);
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