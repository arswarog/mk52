import {MKCore} from "./index";

describe('MKCore', () => {
    describe('Keyboard controller', () => {
        describe('Keys', () => {
            it('Single keys', (done) => {
                let core = new MKCore()

                core.keyA4 = () => {
                    done();
                };

                core.keyPress('A4');
            })
            it('Single keys (negative)', () => {
                let core = new MKCore()

                expect(() => {
                    core.keyPress('A45');
                }).toThrow()
            })
        })
        describe('Keys', () => {
            it('Single keys', (done) => {
                let core = new MKCore()

                core.keyA4 = () => {
                    done();
                };

                core.keyPress('A4');
            })
            it('Single keys (negative)', () => {
                let core = new MKCore()

                expect(() => {
                    core.keyPress('A45');
                }).toThrow()
            })
        })
        describe('Input numbers', () => {
            it('Single keys', (done) => {
                let core = new MKCore()

                core.keyA4 = () => {
                    done();
                };

                core.keyPress('A4');
            })
            it('Single keys (negative)', () => {
                let core = new MKCore()

                expect(() => {
                    core.keyPress('A45');
                }).toThrow()
            })
        })
    })
})