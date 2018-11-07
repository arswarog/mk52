import * as React from 'react';
import './App.scss';
//import original from './images/original.jpg';

import { Calculator } from './components/Calculator';
import { HistoryView } from './components/HistoryView';
import { StackView } from './components/StackView';

class App extends React.Component {
    public render() {
        return (
            <div>
                <Calculator/>
                {/*<img src={original} width="100%"/>*/}
                <div className="paper">
                    <div className="content">
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                        <HistoryView history={[]}/>
                        <StackView/>
                        asdasdasdasdasasdaaasssssssssssssssssssssd<br/>
                        ______________________________________________<br/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
