import { Calculator } from './calculator';
import { CoreCommandType, ICalcCtrl, ICore, IVariousCalculator } from './calculator.interface';
import { makeButton } from './common';
import { Cmd } from './core/commands';
import { Register } from './core/register';

let calc: Calculator = null;
let testCore: ICore = null;

describe('Calculator', () => {
    beforeEach(() => {
        testCore = {};
        calc = new Calculator(testCore);
        calc = calc.clone({
            stack: {
                x1: new Register(0.000000056723),
                x : new Register(5735.23),
                y : new Register(34536343634534535),
                z : new Register(67835.3437345634534),
                t : new Register(100000000000000000000000000),
                canInput: false,
            },
        });
    });

    describe('Clone', () => {
        it('Keys', () => {
            const calc2 = calc.clone({
                keys: ['F'],
            });

            expect(calc2).toEqual({
                ...calc,
                keys: ['F'],
            });
        });
        it('Stat', () => {
            const calc2 = calc.clone({
                stat: {
                    ...calc.stat,
                    executed: 1,
                },
            });

            expect(calc2).toEqual({
                ...calc,
                stat: {
                    executed       : 1,
                    lastRunExecuted: 0,
                },
            });
        });
    });
    describe('Keyboard controller', () => {
        it('Single keys', (done) => {
            testCore[Cmd.Num0] = {
                type     : CoreCommandType.Single,
                operation: (c) => {
                    done();
                    return c;
                },
            };

            calc.keyPress(makeButton('w', null, Cmd.Num0));
        });

        it('Single keys (when microcode not exists)', () => {
            expect(
                () => calc.keyPress(makeButton('w', null, Cmd.Num0)),
            ).toThrow(new Error(`Unknown cmd "Num0" (code ${Cmd.Num0})`));
        });

        it('F key', (done) => {
            testCore[Cmd.sin] = {
                type     : CoreCommandType.Single,
                operation: (c) => {
                    done();
                    return c;
                },
            };

            calc = calc.keyPress(makeButton('f', null, Cmd.F));

            expect(calc.keys).toEqual(['F']);

            calc = calc.keyPress(makeButton('w', null, Cmd.Num0, Cmd.sin));

            expect(calc.keys).toEqual([]);
        });

        it('K key', (done) => {
            testCore[Cmd.abs] = {
                type     : CoreCommandType.Single,
                operation: (c) => {
                    done();
                    return c;
                },
            };

            calc = calc.keyPress(makeButton('k', null, Cmd.K));

            expect(calc.keys).toEqual(['K']);

            calc = calc.keyPress(makeButton('w', null, Cmd.Num0, Cmd.sin, Cmd.abs));

            expect(calc.keys).toEqual([]);
        });

        describe('ICalculatrCtrl', () => {
            it('commandComplete', () => {
                testCore[Cmd.goto] = {
                    type     : CoreCommandType.WithAddress,
                    operation: (calculator: ICalcCtrl, cmd: Cmd): ICalcCtrl => {
                        return calculator._commandComplete(calculator);
                    },
                };

                let calc1 = calc.keyPress(makeButton('w', null, Cmd.goto));
                expect(calc1.stat.executed).toBe(1);
                expect(calc1.keys).toEqual([]);
            });

            it('commandRunOther', () => {
                const cmds: Cmd[] = [];

                testCore[Cmd.Num0] = {
                    type     : CoreCommandType.Single,
                    operation: (calculator: ICalcCtrl, cmd: Cmd): ICalcCtrl => {
                        cmds.push(cmd);
                        if (cmd === Cmd.Num0)
                            return {
                                ...calculator,
                                keys: [cmd],
                            };
                        else
                            return calculator._commandRunOther(calculator, cmd);
                    },
                };

                testCore[Cmd.goto] = {
                    type     : CoreCommandType.WithAddress,
                    operation: (calculator: ICalcCtrl, cmd: Cmd): ICalcCtrl => {
                        cmds.push(cmd);
                        return calculator._commandComplete(calculator);
                    },
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

        describe('Input numbers', () => {
            // it('Single keys', (done) => {
            //     //calc.keyA4 = (() => {
            //     done();
            //     //}) as any;
            //     //
            //     //calc.keyPress('A4');
            // });
            // it('Single keys (negative)', () => {
            //     //expect(() => {
            //     //    calc.keyPress('A45');
            //     //}).toThrow();
            // });
        });

        //describe('Single commands', () => {
        //
        //});

        describe('Commands with address', () => {
            it('GOTO 11', () => {
                testCore[Cmd.goto] = {
                    type     : CoreCommandType.WithAddress,
                    operation: (calculator: ICalcCtrl, address: string): IVariousCalculator => {
                        let addr = 0;

                        if (address.match(/^\d\d$/))
                            addr = +address;
                        else if (address.match(/^-\d$/))
                            addr = 100 + +address.substr(1, 0);
                        else
                            throw new Error(`Invalid address ${address} in GOTO`);

                        return {
                            program: calculator.program.goto(addr),
                        };
                    },
                };

                expect(calc.program.address).toBe(0);

                let calc1 = calc.keyPress(makeButton('w', null, Cmd.goto));
                expect(calc1.keys).toEqual([]);
                expect(calc1.command).toEqual(testCore[Cmd.goto]);
                expect(calc1.stat.executed).toEqual(0);

                let calc2 = calc1.keyPress(makeButton('w', null, Cmd.Num1));
                expect(calc2.keys).toEqual(['01']);
                expect(calc2.command).toEqual(testCore[Cmd.goto]);
                expect(calc2.stat.executed).toEqual(0);

                let calc3 = calc2.keyPress(makeButton('w', null, Cmd.Num1));
                expect(calc3.keys).toEqual([]);
                expect(calc3.command).toEqual(null);
                expect(calc3.stat.executed).toEqual(1);

                expect(calc3.program.address).toBe(11);
            });
        });

        describe('Commands with register', () => {
            it('XtR 1', () => {
                testCore[Cmd.XtR] = {
                    type     : CoreCommandType.WithRegister,
                    operation: (calculator: ICalcCtrl, register: string): ICalcCtrl => {
                        return {
                            ...calculator,
                            registers: calculator.registers.set(register, calculator.stack.x),
                        };
                    },
                };

                const displayX = ' 5735.23     ';
                expect(calc.stack.x.toString()).toBe(displayX);
                expect(calc.registers.get('1').toString()).toBe(' 0.          ');
                expect(calc.command).toEqual(null);

                let calc1 = calc.keyPress(makeButton('w', null, Cmd.XtR));
                expect(calc1.command).toEqual(testCore[Cmd.XtR]);
                expect(calc1.keys).toEqual([]);
                expect(calc1.stat.executed).toBe(0);

                let calc2 = calc1.keyPress(makeButton('w', null, Cmd.Num1));
                console.log(calc2);
                expect(calc2.command).toEqual(null);
                expect(calc2.keys).toEqual([]);

                expect(calc2.registers.get('1').toString()).toBe(displayX);
                expect(calc2.stat.executed).toBe(1);

                const expected = calc.clone({
                    registers: calc.registers.set('1', calc.stack.x),
                    stat     : {
                        ...calc.stat,
                        executed: 1,
                    },
                });
                console.log(expected);
                expect(calc2).toEqual(expected);
            });
        });
    });

    //describe('Auto execute', () => {
    //    describe('Single commands', () => {
    //
    //    });
    //
    //    describe('Commands with address', () => {
    //
    //    });
    //
    //    describe('Commands with register', () => {
    //
    //    });
    //});
});