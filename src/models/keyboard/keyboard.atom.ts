import { declareAtom } from '@reatom/core';
import { IKeyboardState } from './keyboard.types';
import { setKeyboardLayout } from './keyboard.actions';

export const Keyboard = declareAtom<IKeyboardState>(
    ['keyboard'],
    [],
    on => [
        on(setKeyboardLayout, (_, payload) => payload),
    ],
);
