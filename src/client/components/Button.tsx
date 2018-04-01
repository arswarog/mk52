import { MKButton } from "../../emk/MK52";
import * as React from "react";

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