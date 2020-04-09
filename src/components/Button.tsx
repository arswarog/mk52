import * as React from 'react';
import { MKButton } from '../elektronika/common';

export interface IButton {
    config: MKButton,
    press: (key: MKButton) => void;
}

export class Button extends React.Component<IButton> {
    constructor(props: IButton) {
        super(props);
    }

    public render() {
        const cfg   = this.props.config;
        const press = () => this.props.press(cfg);

        return (
            <td>
                {cfg.textf}&nbsp;<i>{cfg.textk}</i>
                <span className="outer">
                    <span onClick={press} className={cfg.color}>{cfg.text}</span>
                </span>
                <b>{cfg.registerText}</b>
            </td>
        );
    }
}