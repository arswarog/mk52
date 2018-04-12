import * as React from "react";
import { Controller } from "../emk/controller";

interface IHistoryView {
    history: Controller[]
}

export class HistoryView extends React.Component<IHistoryView> {
    render() {
        let history = this.props.history.map(item => (
            <tr>
                <td className="display">{item.last.code}</td>
                <td>{item.last.command}</td>
                <td className="display">{item.display.real}</td>
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