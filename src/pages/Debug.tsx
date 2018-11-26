import * as React from 'react';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers';

import './Debug.scss';

export const Debug = connect(
    (state: IGlobalState) => ({
        keys     : state.calc.core.keys,
        stack    : state.calc.core.stack,
        registers: state.calc.core.registers,
        programm : state.calc.core.programm,
    }),
)(
    ({programm, registers, stack, keys}: any) => {
        return <div className="page-debug">
            Keys: {keys}<br/>
            {/*<div className="center">ПРОГРАММА</div>*/}
            {/*asdasdasd<br/>*/}
            {/*asdasdasd<br/>*/}
            {/*asdasdasd<br/>*/}
            {/*asdasdasd<br/>*/}
            {/*asdasdasd<br/>*/}
            <table>
                <tbody>
                <tr>
                    <td>t:</td>
                    <td>"<code>{stack.t.toString()}</code>"</td>
                </tr>
                <tr>
                    <td>z:</td>
                    <td>"<code>{stack.z.toString()}</code>"</td>
                </tr>
                <tr>
                    <td>y:</td>
                    <td>"<code>{stack.y.toString()}</code>"</td>
                </tr>
                <tr>
                    <td>x:</td>
                    <td>"<code>{stack.x.toString()}</code>"</td>
                </tr>
                <tr>
                    <td>x1:</td>
                    <td>"<code>{stack.x1.toString()}</code>"</td>
                </tr>
                </tbody>
            </table>
            asdasdasd<br/>
            asdasdasd<br/>
            asdasdasd<br/>
            asdasdasd<br/>
            asdasdasd<br/>
            asdasdasd<br/>
            <table>
                <thead>
                <tr>
                    <th/>
                    <th>0</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                </tr>
                </thead>
                <tbody>
                {/*{prg.map((line, index) =>*/}
                {/*<tr key={index}>*/}
                {/*<th>{index < 10 ? index : 'A'}</th>*/}
                {/*{line.map((cmd, cmdi) =>*/}
                {/*<td key={cmdi}>{cmd}</td>,*/}
                {/*)}</tr>,*/}
                {/*)}*/}
                </tbody>
            </table>
            <pre>{JSON.stringify(stack, null, 2)}</pre>
            <pre>{JSON.stringify(registers, null, 2)}</pre>
            <pre>{JSON.stringify(programm, null, 2)}</pre>
        </div>;
    },
);
