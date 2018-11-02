import { MKCore } from './core';

export class MK52 extends MKCore {
    public keyPress(key: string): MKCore {
        let func = 'key' + key;

        if (func in this)
            return this[func]();
        else
            throw new Error(`Unknown key ${key}`);
    }
}