import { AnyAction } from 'redux';
import { MKButton } from '../../elektronika/common';

export const pressButton = (button: MKButton): AnyAction => ({
    type: 'KEY_PRESS',
    button,
});