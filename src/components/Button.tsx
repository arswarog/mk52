import * as React from "react";
import { MKButton } from "../emk/common";

export interface IButton {
    config: MKButton,
    press: (key: MKButton) => void;
}

export class Button extends React.Component<IButton> {
    constructor(props: IButton) {
        super(props);
    }

    render() {
        let cfg = this.props.config;
        return (
            <td>
                {cfg.f}&nbsp;<i>{cfg.k}</i>
                <span onClick={() => this.props.press(cfg)} className={cfg.color}>{cfg.text}</span>
                <b>&nbsp;{cfg.register}&nbsp;</b>
            </td>
        );
    }
}