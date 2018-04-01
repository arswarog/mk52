import * as React from 'react';
import { Calculator } from './Calculator';
import { MK52, MKDisplay } from '../../emk/MK52';

export interface IMainState {
    value: number;
    newItem?: any;
}

export interface IMainProps {
    calc: MK52;
    pressButton: any;
    display: any;
    counter: number;
    counter2: number;
}

export class Main extends React.Component<IMainProps, IMainState> {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        };

        this.alert = this.alert.bind(this);
    }

    alert(code) {
//        console.log(this.props, this.props.onAddItem, this.state);
        this.props.pressButton();
        this.setState({newItem: " "});
    }

    render() {
        console.log('Main render', this.props);
        let calc = this.props.calc;

        let stack = calc.stack;
        console.log(stack);

        let stackList = ['t', 'z', 'y', 'x', 'x1'].map(r => <tr key={r}>
            <td>{r}</td>
            <td className="display">{stack[r].real}</td>
            <td>{stack[r].value}</td>
        </tr>);

        return (
            <div>
                <b>{this.props.counter}</b> / <b>{this.props.counter2}</b>
                <Calculator calc={this.props.calc}
                            display={this.props.display}
                            pressButton={this.props.pressButton}
                            keyboardConfig={this.props.calc.getKeyboardConfig()}/>
                <table onClick={this.alert}>
                    <thead>
                    <tr>
                        <td>#</td>
                        <td>Real</td>
                        <td>Value</td>
                    </tr>
                    </thead>
                    <tbody>{stackList}</tbody>
                </table>
            </div>
        );
    }
}