import { ICalculator } from '../calculator.interface';

export class KernelMK52 {
    public exec(core: ICalculator): ICalculator {
        return this.exec01(core);
    }

    private exec01(core: ICalculator) {
        return core;
    }
} 