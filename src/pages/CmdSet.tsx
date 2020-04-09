import * as React from 'react';

import './CmdSet.scss';
import { Cmd } from '../elektronika/core/commands';
import { Program as CoreProgram } from '../elektronika/core/program';
import { programToView } from '../elektronika/viewTools';

// tslint:disable
const prg = programToView({
    bytes: [
        'КППЕ', '48', 'КППЕ', '6В', '67', Cmd.Num2, Cmd.Mul, 'ПП', 'A0', 'В↑',
        'КПх8', Cmd.Plus, 'КхП8', Cmd.Swap, Cmd.Num7, Cmd.r10x, Cmd.Plus, '68', '6С', Cmd.Div,
        Cmd.Plus, '6d', 'K⊕', 'K{x}', 'В↑', 'ВП', Cmd.Num7, 'С/П', '48', '69',
        '01', Cmd.Plus, '49', 'КПх8', '67', Cmd.Minus, 'КхП8', Cmd.Num1, Cmd.Minus, 'Fx<o',
        '44', Cmd.Num0, Cmd.goto, '47', 'КПх8', '6С', Cmd.Plus, 'КхП8', 'K{x}', '6С',
        Cmd.Num5, Cmd.Mul, Cmd.Minus, 'Fx≥o', '68', 'КПх5', '65', Cmd.Num3, Cmd.Minus, 'Fx≥o',
        '65', '6А', 'ПхД', 'KΛ', 'C/П', 'КПх8', 'K[х]', 'КхП8', 'FL0', '00',
        Cmd.ClX, '46', Cmd.Num5, '40', '67', 'КПх0', Cmd.Minus, 'Fx≥o', '92', 'FBx',
        'Fx=o', '83', 'КПх6', '60', 'FL0', '73', '66', Cmd.Num3, Cmd.Minus, 'Kx≥oC',
        '6А', 'С/П', Cmd.Num1, '40', Cmd.Num4, '6В', Cmd.pi, Cmd.Mul, 'K{x}', '4В',
        Cmd.Mul, Cmd.Num1, Cmd.Plus, 'K[х]', 'В/О',
        //'0e', '51', '5e', '41', '06', '0e', '02', '1c', '03', '5b',
        //'01', '03', '59', '50', '5b', '4e', '51', '1c', '20', '51',
        //'02', '44', '4c', '42', '06', '4e', '20', '1c', '43', '5b',
        //'03', '20', '57', '03', '51', '0e', '20', '1c', '20', '06',
        //'04', '51', '03', '51', '40', '1c', '0e', '5b', '05', '20',
        //'1c', '0e', '5b', '0e', '43', '1c', '20', '51', '06', '20',
        //'1c', '04', '51', '4e', '51', '1c', '04', '09', '03', '20',
        //'57', '51', '0e', '20', '1c', '20', '06', '04', '51', '03',
        //'51', '5b', '0e', '20', '1c', '0e', '5b', '05', '20', '1c',
        //'0e', '5b', '0e', '03', '1c', '20', '51', '06', '20', '1c',
        //'04', '51', '0e', '51', '1c',
    ],
} as CoreProgram);

export const CmdSet = () => {
    return <div className="page-program">
        <div className="center">ПРОГРАММА</div>
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
                <th>A</th>
                <th>B</th>
                <th>C</th>
                <th>D</th>
                <th>E</th>
                <th>F</th>
            </tr>
            </thead>
            <tbody>
            {prg.map((line, index) =>
                <tr key={index}>
                    <th>{index < 10 ? index : 'A'}</th>
                    {line.map((cmd, cmdi) =>
                        <td key={cmdi}>{cmd}</td>,
                    )}</tr>,
            )}</tbody>
        </table>
    </div>;
};
