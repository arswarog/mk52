import * as React from 'react';
import './App.scss';
//import original from './images/original.jpg';

import { Calculator } from './components/Calculator';
import { HistoryView } from './components/HistoryView';
import { StackView } from './components/StackView';

class App extends React.Component {
    public render() {
        const stickers: Array<{
            top: number,
            left: number,
            text: string,
            active?: boolean,
            rotate: number,
            link?: string,
            hueRotate: number,
        }> = [
            {
                top      : 598,
                left     : 808,
                rotate   : -3,
                hueRotate: 31,
                text     : 'Main',
            },
            {
                top      : 598,
                left     : 808,
                rotate   : 12,
                hueRotate: 31,
                text     : 'Main 2',
            },
            {
                top      : 598,
                left     : 808,
                rotate   : -7,
                hueRotate: 31,
                text     : 'Main 3',
            },
            {
                top      : 598,
                left     : 808,
                rotate   : -3,
                hueRotate: 31,
                text     : 'Main 3',
            },
            {
                top      : 598,
                left     : 808,
                rotate   : 16,
                hueRotate: 31,
                text     : 'Main 3',
            },
        ];

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
                    <div className="stickers">
                        {stickers.map(
                            (sticker, index) =>
                                <div className="sticker"
                                     key={index}>
                                    <div style={{
                                        backgroundImage: 'url(https://www.picpng.com/images/large/sticky-notes-download-png-32163)',
                                        transform      : `rotate(${sticker.rotate}deg)`,
                                        filter         : `hue-rotate(${sticker.hueRotate}deg)`,
                                    }}>
                                        {/*<img src=style={{*/}
                                        {/*position : 'absolute',*/}
                                        {/*top      : '381px',*/}
                                        {/*left     : '808px',*/}
                                        {/*zIndex   : 5,*/}
                                        {/*}}/>*/}
                                        {/*<img src="https://www.picpng.com/images/large/sticky-notes-download-png-32163"*/}
                                        {/*style={{*/}
                                        {/*position: 'absolute',*/}
                                        {/*//top      : '481px',*/}
                                        {/*//left     : '808px',*/}
                                        {/*//zIndex   : 5,*/}
                                        {/*//transform: 'rotate(-3deg)',*/}
                                        {/*}}/>*/}
                                        <a>
                                        {sticker.text}
                                        </a>
                                    </div>
                                </div>,
                        )}
                        {/*<img src="https://www.picpng.com/images/large/sticky-notes-download-png-32163" style={{*/}
                        {/*//position : 'absolute',*/}
                        {/*top      : '481px',*/}
                        {/*left     : '808px',*/}
                        {/*zIndex   : 5,*/}
                        {/*transform: 'rotate(-3deg)',*/}
                        {/*}}/>*/}
                        {/*<img src="https://www.picpng.com/images/large/sticky-notes-download-png-32163" style={{*/}
                        {/*//position : 'absolute',*/}
                        {/*top      : '598px',*/}
                        {/*left     : '808px',*/}
                        {/*zIndex   : 5,*/}
                        {/*transform: 'rotate(6deg)',*/}
                        {/*filter   : 'hue-rotate(31deg)',*/}
                        {/*}}/>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
