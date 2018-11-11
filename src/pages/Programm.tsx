import * as React from 'react';
import { connect } from 'react-redux';
import { Cmd } from '../elektronika/core/commands';

import './Programm.scss';
import { keyLabels } from '../elektronika/l18n';

export const Programm = connect()(
    () => {
        // tslint:disable
        const prg: (Cmd | string)[][] = [
            [Cmd.Num0, Cmd.goto, Cmd.EQ, Cmd.goto, Cmd.Num6, Cmd.Num0, Cmd.Num2, Cmd.lg, Cmd.Num3, Cmd.Div],
            [Cmd.Num1, Cmd.Num3, Cmd.GT, '50', Cmd.Div, Cmd.Num0, Cmd.goto, Cmd.lg, Cmd.abs, Cmd.goto],
            [Cmd.Num2, Cmd.Num4, Cmd.LT, Cmd.Num2, Cmd.Num6, Cmd.Num0, Cmd.abs, Cmd.lg, Cmd.Num3, Cmd.Div],
            [Cmd.Num3, Cmd.abs, Cmd.NEQ, Cmd.Num3, Cmd.goto, Cmd.Num0, Cmd.abs, Cmd.lg, Cmd.abs, Cmd.Num6],
            [Cmd.Num4, Cmd.goto, Cmd.Num3, Cmd.goto, Cmd.Div, Cmd.Num0, Cmd.abs, Cmd.lg, Cmd.Num2, Cmd.Div],
            [Cmd.Num5, Cmd.abs, Cmd.lg, Cmd.Num2, Cmd.Div, Cmd.Num0, Cmd.Num3, Cmd.lg, Cmd.abs, Cmd.goto],
            [Cmd.Num6, Cmd.abs, Cmd.lg, Cmd.Num4, Cmd.goto, Cmd.Num0, Cmd.goto, Cmd.lg, Cmd.Num4, Cmd.Num6],
        ];

        return <div className="page-programm">
            ПРОГРАММА
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
                {prg.map((line, index) =>
                    <tr key={index}>
                        <th>{index}</th>
                        {line.map((cmd, cmdi) =>
                            <td key={cmdi}>{keyLabels[cmd]}</td>,
                        )}</tr>,
                )}</tbody>
            </table>
        </div>;
    },
);
