import { makeButton } from '../common';
import { Calculator } from '../index';
import { Cmd } from '../core/commands';
import { keyLabels } from '../l18n';

export function Key(config: object): any {
    return (core: Calculator, name: string, value: () => Calculator) => {
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