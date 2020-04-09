import { declareAtom } from '@reatom/core';
import { Calculator } from '../../elektronika';
import { MK52Core } from '../../elektronika/models/mk52';
import { pressButton } from './mk-core.actions';

export const MKCore = declareAtom<Calculator>(
    ['mk-core'],
    new Calculator(MK52Core),
    on => [
        on(pressButton, (state, button) => state.keyPress(button)),
    ],
);
