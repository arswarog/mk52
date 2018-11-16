import * as React from 'react';
import { bindActionCreators } from 'redux';
import { MKButton } from '../elektronika/common';
import { IGlobalState } from '../reducers';
import * as calcActions from '../reducers/actions/calc';
import { Keyboard } from './Keyboard';
import { connect } from 'react-redux';

import './Calculator.scss';

interface IProps {
    display: any;
    keyboard: any;
    className: string;
    pressButton: (key: MKButton) => any;
    reset: () => any;
}

export const Calculator: any = connect(
    (state: IGlobalState) => ({
        display  : state.calc.core.display(),
        className: '',//getDisplayClassName(state.mk),
        keyboard : state.calc.keyboard,
    }),
    dispatch => bindActionCreators(calcActions, dispatch),
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
                        {/*<span className="display">-8.abcdef0-19</span>*/}
                        <span className="display">{display}</span>
                        {/*<span className="display" ng-class="{wait: wait, run: run}">{this.props.display.real}</span>*/}
                    </td>
                    <td className="mk_b2">&nbsp;</td>
                    <td className="mk_b3" rowSpan={3}>
                        {/*<div className="inset">*/}
                        <div className="key-area">
                            <Keyboard keyboard={keyboard} pressButton={pressButton}/>
                        </div>
                        {/*</div>*/}
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
