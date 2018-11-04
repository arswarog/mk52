import * as React from 'react';
import { Cmd } from '../elektronika/core/commands';
import { MK52Keyboard } from '../elektronika/models/mk52';
import { Keyboard } from "./Keyboard";
import { connect } from "react-redux";

import './Calculator.scss';

interface IProps {
    display: any;
    keyboard: any;
    className: string;
    pressButton: (cmd: Cmd) => any;
    reset: () => any;
}

export const Calculator = connect(
    state => ( {
        display  : null,//new MKDisplay(state.mk52.display),
        className: '',//getDisplayClassName(state.mk),
        keyboard : MK52Keyboard,// state.mk.keyboard,
    } ),
    dispatch => ( {
        pressButton: () => ( {type: 'any'} ),
        reset      : () => ( {type: 'reset'} ),
//        pressButton: code => dispatch(pressButton(code)),
    } ),
)(
    ({keyboard, display, className, pressButton, reset}: IProps) => {
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
                        <span className="display">-8.abcdef0-19</span>
                        {/*<span className="display" ng-class="{wait: wait, run: run}">{this.props.display.real}</span>*/}
                    </td>
                    <td className="mk_b2">&nbsp;</td>
                    <td className="mk_b3" rowSpan={3}>
                        <Keyboard keyboard={keyboard} pressButton={pressButton}/>
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
                        <button className="btn btn-default" onClick={reset}>Reset</button>
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
    },
);
