import * as React from "react";
import { Stack } from "../emk/common";
import { MKDisplay } from "../emk/mkdisplay";

interface IStackView {
    stack: Stack<MKDisplay>
}

export class StackView extends React.Component<IStackView> {
    render() {
        let stackList = ['t', 'z', 'y', 'x', 'x1'].map(r =>
            <tr key={r}>
                <td>{r}</td>
                <td className="display">{this.props.stack[r].real}</td>
                <td>{this.props.stack[r].value}</td>
            </tr>,
        );

        return (
            <table>
                <thead>
                <tr>
                    <td>#</td>
                    <td>Real</td>
                    <td>Value</td>
                </tr>
                </thead>
                <tbody>{stackList}</tbody>
            </table>
        );
    }
}