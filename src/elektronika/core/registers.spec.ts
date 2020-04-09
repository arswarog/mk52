import { RegisterName, Registers } from './registers';
import { Register } from './register';

describe('registers', () => {
    it('initializing', () => {
        const registers = Registers.empty();

        Object.values(RegisterName).forEach(
            key => expect(registers.get(key)).toBeInstanceOf(Register),
        );
    });
    it('immutable set', () => {
        const reg1 = Registers.empty();

        const value = new Register(123);
        const reg2 = reg1.set(RegisterName.R5, value);

        expect(reg2).not.toBe(reg1);
        expect(reg2.get(RegisterName.R5)).toBe(value);
        expect(reg1.get(RegisterName.R5)).not.toBe(value);
    });
});
