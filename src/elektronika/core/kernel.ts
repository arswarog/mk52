import { ICore } from './core.interface';

export class KernelMK52 {
    public exec(core: ICore): ICore {
        return this.exec01(core);
    }

    private exec01(core: ICore) {
        return core;
    }
} 