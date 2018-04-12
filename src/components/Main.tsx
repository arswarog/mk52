//import * as React from 'react';
//import { Calculator } from './Calculator';
//import { Mk52 } from "../emk/mk52";
//import { StackView } from "./StackView";
//import { HistoryView } from "./HistoryView";
//
//export interface IMainState {
//    value: number;
//    newItem?: any;
//}
//
//export interface IMainProps {
//    calc: Mk52;
//    pressButton: any;
//    display: any;
//}
//
//export class Main extends React.Component<IMainProps, IMainState> {
//    constructor(props) {
//        super(props);
//        this.state = {
//            value: 0,
//        };
//
//        this.alert = this.alert.bind(this);
//    }
//
//    alert(code) {
////        console.log(this.props, this.props.onAddItem, this.state);
//        this.props.pressButton();
//        this.setState({newItem: " "});
//    }
//
//    render() {
//        console.log('Main render', this.props);
//        let calc = this.props.calc;
//
//        let stack = calc.stack;
//
//        return (
//            <div>
//                <Calculator calc={this.props.calc}
//                            display={this.props.display}
//                            pressButton={this.props.pressButton}
//                            keyboardConfig={this.props.calc.getKeyboardConfig()}/>
//                <table>
//                    <thead>
//                    <tr>
//                        <th>Stack</th>
//                        <th>Registers</th>
//                        <th>History</th>
//                    </tr>
//                    </thead>
//                    <tbody>
//                    <tr>
//                        <td><StackView stack={calc.stack}/></td>
//                        <td></td>
//                        <td><HistoryView history={calc.history}/></td>
//                    </tr>
//                    </tbody>
//                </table>
//            </div>
//        );
//    }
//}