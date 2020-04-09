import * as React from "react";
import { Button } from "./Button";
import { MKButton } from "../elektronika/common";

import './CalcKeyboard.scss';

export interface IKeyboardProps {
    keyboard: MKButton[][];
    pressButton: (key: MKButton) => void;
}

export interface IKeyboardState {
    modeF?: boolean;
    modeK?: boolean;
}

export class CalcKeyboard extends React.Component<IKeyboardProps, IKeyboardState> {
    constructor(props: IKeyboardProps, state: IKeyboardState) {
        super(props, state);
    }

    public render() {
        let html = this.props.keyboard.map((btns, index) => (
            <tr key={`row${index}`}>
                {btns.map((btn, kindex) => <Button key={btn.key || kindex} config={btn} press={this.props.pressButton}/>)}
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

    //private press(btn: MKButton) {
    //    if (btn.key !== 'A1' && btn.key !== 'B1') {
    //        let key = btn.cmd;
    //        if (this.state.modeF && btn.cmdf)
    //            key = btn.cmdf;
    //        if (this.state.modeK && btn.cmdk)
    //            key = btn.cmdk;
    //        this.setState({
    //            modeK: false,
    //            modeF: false,
    //        });
    //        return this.props.pressButton(key);
    //    }
    //
    //    let state: IKeyboardState = {};
    //    if (this.state.modeK || this.state.modeF) {
    //        state = {
    //            modeK: false,
    //            modeF: false,
    //        };
    //    } else {
    //        if (btn.key === 'A1')
    //            state.modeF = true;
    //        if (btn.key === 'B1')
    //            state.modeK = true;
    //    }
    //    this.setState(state);
    //}
}
