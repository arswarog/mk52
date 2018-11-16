import * as React from 'react';
import { connect } from 'react-redux';
import { IGlobalState } from '../reducers';

import './Debug.scss';

export const Debug = connect(
    (state: IGlobalState) => ({
        stack    : state.calc.core.stack,
        registers: state.calc.core.registers,
        programm : state.calc.core.programm,
    }),
)(
    ({programm, registers, stack}: any) => {
        return <div className="page-debug">
            <div className="center">ПРОГРАММА</div>
            <p>
                t: &nbsp;"<code>{stack.t.toString()}</code>"<br/>
                z: &nbsp;"<code>{stack.z.toString()}</code>"<br/>
                y: &nbsp;"<code>{stack.y.toString()}</code>"<br/>
                x: &nbsp;"<code>{stack.x.toString()}</code>"<br/>
                x1: "<code>{stack.x1.toString()}</code>"
            </p>
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
