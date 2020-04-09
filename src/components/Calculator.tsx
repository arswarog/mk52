import * as React from 'react';
import { CalcKeyboard } from './CalcKeyboard';

import './Calculator.scss';
import { useAction, useAtom } from '@reatom/react';
import { MKCore } from '../models/mk-core/mk-core.atom';
import { pressButton } from '../models/mk-core/mk-core.actions';
import { Keyboard } from '../models/keyboard/keyboard.atom';

export const Calculator = () => {
    const display = useAtom(MKCore, state => state.display(), []);
    const className = useAtom(MKCore, state => '', []); // getDisplayClassName(state.mk);
    const keyboard = useAtom(Keyboard, state => state, []);

    const handlerPressButton = useAction(pressButton);

    return (
        <div>
            <div className="mk52">
                <div className="top">
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <div className="main">
                    <div className="left">
                        <div className="logo"><span>ЭЛЕКТРОНИКА</span><span>МК52</span></div>
                        <div className="display inset">
                            <div>
                                <div className="phantom">-88888888-88</div>
                                <div>{display}</div>
                            </div>
                        </div>
                        <div className="switches inset">
                            <div className="switch"/>
                            <div className="switch"/>
                            <div className="switch"/>
                            <div className="switch"/>
                        </div>
                    </div>
                    <div className="right">
                        <div className="keyboard">
                            <CalcKeyboard keyboard={keyboard} pressButton={handlerPressButton}/>
                        </div>
                    </div>
                </div>
            </div>
            {/*<table className="mk52">*/}
            {/*<tbody>*/}
            {/*<tr>*/}
            {/*<td className="mk_a0" colSpan={3}>&nbsp;</td>*/}
            {/*<td className="mk_a3">&nbsp;</td>*/}
            {/*<td className="mk_a4">&nbsp;</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*<td className="mk_b0">&nbsp;</td>*/}
            {/*<td className="mk_b1">*/}
            {/*<span className="display">-8.abcdef0-19</span>*/}
            {/*/!*<span className="display" ng-class="{wait: wait, run: run}">{this.props.display.real}</span>*!/*/}
            {/*</td>*/}
            {/*<td className="mk_b2">&nbsp;</td>*/}
            {/*<td className="mk_b3" rowSpan={3}>*/}
            {/*<div className="inset"/>*/}
            {/*</td>*/}
            {/*<td className="mk_b4" rowSpan={3}>&nbsp;</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*<td className="mk_c0">&nbsp;</td>*/}
            {/*<td className="mk_c1">&nbsp;</td>*/}
            {/*<td className="mk_c2">&nbsp;</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*<td className="mk_d0">&nbsp;</td>*/}
            {/*<td className="mk_d1">*/}
            {/*<button className="btn btn-default" onClick={reset}>Reset</button>*/}
            {/*</td>*/}
            {/*<td className="mk_d2">&nbsp;</td>*/}
            {/*</tr>*/}
            {/*<tr>*/}
            {/*<td className="mk_e0">&nbsp;</td>*/}
            {/*<td className="mk_e1">&nbsp;</td>*/}
            {/*<td className="mk_e2">&nbsp;</td>*/}
            {/*<td className="mk_e3">&nbsp;</td>*/}
            {/*<td className="mk_e4">&nbsp;</td>*/}
            {/*</tr>*/}
            {/*</tbody>*/}
            {/*</table>*/}
        </div>
    );
};
