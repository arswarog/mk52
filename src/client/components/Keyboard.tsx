import { MKButton } from "../../emk/MK52";
import * as React from "react";
import { Button } from "./Button";

export interface IKeyboardProps {
    keyboard: MKButton[][];
    press: (key: string) => void;
}

export interface IKeyboardState {
    modeF?: boolean;
    modeK?: boolean;
}

export class Keyboard extends React.Component<IKeyboardProps, IKeyboardState> {
    constructor(props: IKeyboardProps, state: IKeyboardState) {
        super(props, state);
        this.state = {
            modeF: false,
            modeK: false,
        };

        this.press = this.press.bind(this);
    }

    press(btn: MKButton) {
        if (btn.key !== 'A1' && btn.key !== 'B1') {
            let key = btn.code;
            if (this.state.modeF && btn.f)
                key = btn.codef;
            if (this.state.modeK && btn.k)
                key = btn.codek;
            this.setState({
                modeK: false,
                modeF: false,
            });
            return this.props.press(key);
        }

        let state: IKeyboardState = {};
        if (this.state.modeK || this.state.modeF) {
            state = {
                modeK: false,
                modeF: false,
            };
        } else {
            if (btn.key === 'A1')
                state.modeF = true;
            if (btn.key === 'B1')
                state.modeK = true;
        }
        this.setState(state);
    }

    render() {
        let html = this.props.keyboard.map((btns, index) => (
            <tr key={`row${index}`}>
                {btns.map(btn => <Button key={btn.key} config={btn} press={this.press}/>)}
            </tr>
        ));

        return (
            <table className="keyboard">
                <tbody>
                {html}
                </tbody>
            </table>
        );
    }
}