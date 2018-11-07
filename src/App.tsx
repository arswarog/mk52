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
                <img src="https://www.picpng.com/images/large/sticky-notes-download-png-32163" style={{
                    position : 'absolute',
                    top      : '381px',
                    left     : '808px',
                    zIndex   : 5,
                    transform: 'rotate(12deg)',
                    filter   : 'hue-rotate(120deg)',
                }}/>
                <img src="https://www.picpng.com/images/large/sticky-notes-download-png-32163" style={{
                    position : 'absolute',
                    top      : '481px',
                    left     : '808px',
                    zIndex   : 5,
                    transform: 'rotate(-3deg)',
                }}/>
                <img src="https://www.picpng.com/images/large/sticky-notes-download-png-32163" style={{
                    position : 'absolute',
                    top      : '598px',
                    left     : '808px',
                    zIndex   : 5,
                    transform: 'rotate(6deg)',
                    filter   : 'hue-rotate(31deg)',
                }}/>
                <img src="https://cdn.pixabay.com/photo/2017/01/12/17/11/post-it-1975179_960_720.png" style={{
                    position: 'absolute',
                    zIndex  : 5,
                    display : 'none',
                }}/>
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
