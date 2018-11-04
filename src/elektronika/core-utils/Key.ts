import { makeButton } from '../common';
import { MKCore } from '../core';
import { Cmd } from '../core/commands';
import { keyLabels } from '../l18n';

export function Key(config: object): any {
    return (core: MKCore, name: string, value: () => MKCore) => {
        if (!core.keyboard)
            core.keyboard = [];
        console.log(core.keyboard);
        console.log(name);
        console.log(value);

        if (!core.keyboard[0])
            core.keyboard[0] = [];

        core.keyboard[0].push(makeButton(keyLabels)(
            'f', Cmd.abs, Cmd.abs, Cmd.abs, 'a',
        ));
    };
}