import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import { CalculatorComponent } from "../components/Calculator";
import { MKDisplay } from "../emk/mkdisplay";
import { IMkState } from "../reducers/mk52";
import { pressButton } from "../actions/mk52";

const getDisplayClassName = (state: IMkState) => {
//    ng-class="{wait: wait, run: run}"
    return 'display';
};

const mapStateToProps = state => ( {
    display  : null,//new MKDisplay(state.mk52.display),
    counter  : state.mk52.counter,
    className: getDisplayClassName(state.mk52),
    keyboard : state.mk52.keyboard,
} );

const mapDispatchToProps = dispatch => ( {
    pressButton: code => dispatch(pressButton(code)),
} );

export var Calculator = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CalculatorComponent);
