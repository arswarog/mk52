import * as React from "react";
import { MKCore } from "../elektronika/core";

interface IHistoryView {
    history: MKCore[]
}

export class HistoryView extends React.Component<IHistoryView> {
    public render() {
        let history = this.props.history.map(item => (
            <tr>
                {/*<td className="display">{item.last.code}</td>*/}
                {/*<td>{item.last.command}</td>*/}
                {/*<td className="display">{item.display.real}</td>*/}
            </tr>
        ));

        return (
            <table>
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Command</th>
                    <th>Display</th>
                </tr>
                </thead>
                <tbody>
                {history}
                </tbody>
            </table>
        );
    }
}