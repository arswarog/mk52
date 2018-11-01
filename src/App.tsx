import * as React from 'react';
import './App.scss';

import { Calculator } from "./components/Calculator";
import { HistoryView } from "./components/HistoryView";
import { StackView } from "./components/StackView";

class App extends React.Component {
    public render() {
        return (
            <div>
                <Calculator/>
                <HistoryView history={[]}/>
                <StackView/>
            </div>
        );
    }
}

export default App;
