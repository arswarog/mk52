import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Cmd } from '../elektronika/core/commands';
import { Program } from '../elektronika/core/program';
import { IGlobalState } from '../reducers';

import './Debug.scss';

const programCodes = createSelector(
    (state: IGlobalState) => state.calc.core.program,
    viewProgramBytes,
);

export const Debug = connect(
    (state: IGlobalState) => ({
        keys     : state.calc.core.keys,
        stack    : state.calc.core.stack,
        registers: state.calc.core.registers,
        program : programCodes(state),
    }),
)(
    ({program, registers, stack, keys}: any) => {
        return <div className="page-debug">
            <table>
                <thead>
                <tr>
                    <th colSpan={2}>Stack:</th>
                    <th colSpan={2}>Registers:</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>t:</td>
                    <td>"<code>{stack.t.toString()}</code>"</td>
                    <td>0:</td>
                    <td><code>{registers.get('0').toString()}</code></td>
                    <td>5:</td>
                    <td><code>{registers.get('5').toString()}</code></td>
                    <td>A:</td>
                    <td><code>{registers.get('a').toString()}</code></td>
                </tr>
                <tr>
                    <td>z:</td>
                    <td>"<code>{stack.z.toString()}</code>"</td>
                    <td>1:</td>
                    <td><code>{registers.get('1').toString()}</code></td>
                    <td>6:</td>
                    <td><code>{registers.get('6').toString()}</code></td>
                    <td>B:</td>
                    <td><code>{registers.get('b').toString()}</code></td>
                </tr>
                <tr>
                    <td>y:</td>
                    <td>"<code>{stack.y.toString()}</code>"</td>
                    <td>2:</td>
                    <td><code>{registers.get('2').toString()}</code></td>
                    <td>7:</td>
                    <td><code>{registers.get('7').toString()}</code></td>
                    <td>C:</td>
                    <td><code>{registers.get('c').toString()}</code></td>
                </tr>
                <tr>
                    <td>x:</td>
                    <td>"<code>{stack.x.toString()}</code>"</td>
                    <td>3:</td>
                    <td><code>{registers.get('3').toString()}</code></td>
                    <td>8:</td>
                    <td><code>{registers.get('7').toString()}</code></td>
                    <td>D:</td>
                    <td><code>{registers.get('c').toString()}</code></td>
                </tr>
                <tr>
                    <td>x1:</td>
                    <td>"<code>{stack.x1.toString()}</code>"</td>
                    <td>4:</td>
                    <td><code>{registers.get('4').toString()}</code></td>
                    <td>9:</td>
                    <td><code>{registers.get('9').toString()}</code></td>
                    <td>E:</td>
                    <td><code>{registers.get('e').toString()}</code></td>
                </tr>
                </tbody>
            </table>
            <table className="program">
                <thead>
                <tr>
                    <th colSpan={11}>Program:</th>
                </tr>
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
                {program.map((line: string[], index: number) =>
                    <tr key={index}>
                        <th>{index < 10 ? index : 'A'}</th>
                        {line.map((cmd, cmdi) =>
                            <td key={cmdi}>{cmd}</td>,
                        )}</tr>,
                )}
                </tbody>
            </table>
        </div>;
    },
);

function viewProgramBytes(program: Program): string[][] {
    return program.bytes
                   //.reduceRight((codes: Cmd[], code: Cmd, index: number) => {
                   //    if (!codes.length && code === '00' && index)
                   //        return [];
                   //    codes.unshift(code);
                   //    return codes;
                   //}, [])
                   .reduce(
                       (codes: string[][], command: Cmd): string[][] => {
                           const cmd: string = (command as string).toLowerCase();
                           let line          = codes[codes.length - 1];
                           if (line.length >= 10)
                               line = codes[codes.length] = [];

                           line.push(cmd);
                           return codes;
                       },
                       [[]],
                   );
}