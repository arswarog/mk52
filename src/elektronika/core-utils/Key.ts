import { MKButton } from '../common';
import { MKCore } from '../core';

export function Key(config: object): any {
    return (core: MKCore, name: string, value: () => MKCore) => {
        if (!core.keyboard)
            core.keyboard = [];
        console.log(core.keyboard);
        console.log(name);
        console.log(value);

        if (!core.keyboard[0])
            core.keyboard[0] = [];

        core.keyboard[0].push(new MKButton(
            'X',
            'Text',
            'b',
            'A1',
        ));
    };
}