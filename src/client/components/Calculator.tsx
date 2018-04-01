import * as React from 'react';
import { MK52, MKDisplay } from '../../emk/MK52';
import { Keyboard } from "./Keyboard";

export interface ICalculatorState {
}

export interface ICalculatorProps {
    calc: MK52;
    display: MKDisplay;
    pressButton: (code: string) => void;
    keyboardConfig: any[][];
}

export class Calculator extends React.Component<ICalculatorProps, ICalculatorState> {

    constructor(props, state) {
        super(props, state);
        this.press = this.press.bind(this);
    }

    press(code: string) {
        console.log('code:', code);
        this.props.pressButton(code);
    }

    render() {
        let calc = this.props.calc;
        return (
            <table className="mk52">
                <tbody>
                <tr>
                    <td className="mk_a0" colSpan={3}>&nbsp;</td>
                    <td className="mk_a3">&nbsp;</td>
                    <td className="mk_a4">&nbsp;</td>
                </tr>
                <tr>
                    <td className="mk_b0">&nbsp;</td>
                    <td className="mk_b1">
                        <span className="display" ng-class="{wait: wait, run: run}">{this.props.display.real}</span>
                    </td>
                    <td className="mk_b2">&nbsp;</td>
                    <td className="mk_b3" rowSpan={3}>
                        <Keyboard keyboard={this.props.keyboardConfig} press={this.press}/>
                    </td>
                    <td className="mk_b4" rowSpan={3}>&nbsp;</td>
                </tr>
                <tr>
                    <td className="mk_c0">&nbsp;</td>
                    <td className="mk_c1">&nbsp;</td>
                    <td className="mk_c2">&nbsp;</td>
                </tr>
                <tr>
                    <td className="mk_d0">&nbsp;</td>
                    <td className="mk_d1">
                        <button className="btn btn-default" onClick={() => this.press('reset')}>Reset</button>
                    </td>
                    <td className="mk_d2">&nbsp;</td>
                </tr>
                <tr>
                    <td className="mk_e0">&nbsp;</td>
                    <td className="mk_e1">&nbsp;</td>
                    <td className="mk_e2">&nbsp;</td>
                    <td className="mk_e3">&nbsp;</td>
                    <td className="mk_e4">&nbsp;</td>
                </tr>
                </tbody>
            </table>
        );
    }
}