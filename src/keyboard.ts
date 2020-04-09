import { MKButton } from './elektronika/common';
import { store } from './store';
import { Keyboard } from './models/keyboard/keyboard.atom';
import { pressButton } from './models/mk-core/mk-core.actions';

const keyReplaceMap = {
    Digit1: 'Numpad1',
    Digit2: 'Numpad2',
    Digit3: 'Numpad3',
    Digit4: 'Numpad4',
    Digit5: 'Numpad5',
    Digit6: 'Numpad6',
    Digit7: 'Numpad7',
    Digit8: 'Numpad8',
    Digit9: 'Numpad9',
    Digit0: 'Numpad0',
    //ShiftRight  : 'Shift',
    //ShiftLeft   : 'Shift',
    //ControlRight: 'Control',
    //ControlLeft : 'Control',
};

let keyMap: { [key: string]: MKButton } = {};

export function initKeyboard(buttons: MKButton[][]): void {
    keyMap = {};
    buttons.forEach(
        row => row.forEach(
            btn => {
                if (btn.kbCode)
                    keyMap[btn.kbCode] = btn;
            },
        ),
    );
}

export function keyboard(dispatch: any) {
    return (event: KeyboardEvent) => {
        let code = event.code;

        if (code in keyReplaceMap)
            code = keyReplaceMap[code];

        if (code in keyMap)
            dispatch(pressButton(keyMap[code]));
    };
}
