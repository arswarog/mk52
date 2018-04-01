import * as React from 'react';
import * as Actions from "./app/actions";
import { Main } from "./components/Main";
import { connect } from "react-redux";

export class AppComponent extends React.Component<any, any> {
    constructor(a, b) {
        super(a, b);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        console.log('App onClick state', this.state);
        console.log('App onClick props', this.props);
        console.log('click');
        this.props.addItem();
    }

    render() {
        console.log('App render state', this.state);
        console.log('App render props', this.props);
        return <Main pressButton={this.props.pressButton}
                     calc={this.props.calc}
                     counter={this.props.counter}
                     counter2={this.props.counter2}
                     display={this.props.display}/>;
    }
}

function mapStateToProps(state) {
//    console.log(state);
    return Object.assign({}, state);
}

export var App = connect(mapStateToProps, Actions)(AppComponent);
