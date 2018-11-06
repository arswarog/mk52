import { ICore } from '../calculator.interface';
import { Cmd } from './commands';

export const BaseMKCore: ICore = {
    [Cmd.Num0]: (calc) => {
        return calc;
    },
};