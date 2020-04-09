import { declareAction } from '@reatom/core';
import { MKButton } from '../../elektronika/common';

const NS = 'keyboard';

export const setKeyboardLayout = declareAction<MKButton[][]>(NS + ':set');

