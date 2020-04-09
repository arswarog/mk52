import { combine, createStore } from '@reatom/core';
import { connectReduxDevtools } from '@reatom/debug';
import { MKCore } from './models/mk-core/mk-core.atom';
import { Keyboard } from './models/keyboard/keyboard.atom';

export const store = createStore(
    combine({
        core: MKCore,
        keyboard: Keyboard,
    }),
);

connectReduxDevtools(store);
