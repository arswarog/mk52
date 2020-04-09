import * as React from "react";

interface IStackView {
    stack?: any;// Stack<MKDisplay>
}

export class StackView extends React.Component<IStackView> {
    public render() {
//        let stackList = ['t', 'z', 'y', 'x', 'x1'].map(r =>
//            <tr key={r}>
//                <td>{r}</td>
//                <td className="display">{this.props.stack[r].real}</td>
//                <td>{this.props.stack[r].value}</td>
//            </tr>,
//        );

        return (
            <table>
                <thead>
                <tr>
                    <td>#</td>
                    <td>Real</td>
                    <td>Value</td>
                </tr>
                </thead>
                {/*<tbody>{stackList}</tbody>*/}
            </table>
        );
    }
}