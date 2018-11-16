import { Dispatch } from 'redux';
import { MKButton } from './elektronika/common';

const keyReplaceMap = {
    Digit1      : 'Numpad1',
    Digit2      : 'Numpad2',
    Digit3      : 'Numpad3',
    Digit4      : 'Numpad4',
    Digit5      : 'Numpad5',
    Digit6      : 'Numpad6',
    Digit7      : 'Numpad7',
    Digit8      : 'Numpad8',
    Digit9      : 'Numpad9',
    Digit0      : 'Numpad0',
    //ShiftRight  : 'Shift',
    //ShiftLeft   : 'Shift',
    //ControlRight: 'Control',
    //ControlLeft : 'Control',
};

const keyMap: {[key: string]: MKButton} = {};

export function initKeyboard(buttons: MKButton[][]): void {
    buttons.forEach(
        row => row.forEach(
            btn => {
                if (btn.kbCode)
                    keyMap[btn.kbCode] = btn;
            },
        ),
    );
}

export function keyboard(dispatch: Dispatch) {
    return (event: KeyboardEvent) => {
        //console.log(keyMap);

        let code = event.code;
        console.log(code);

        if (code in keyReplaceMap)
            code = keyReplaceMap[code];

        if (code in keyMap)
            dispatch({
                type  : 'KEY_PRESS',
                button: keyMap[code],
            });
    };
}