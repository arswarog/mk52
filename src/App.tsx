import * as React from 'react';
import './App.scss';
import { Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
//import original from './images/original.jpg';
import underline from './images/underline.png';

import { Calculator } from './components/Calculator';
import { About } from './pages/About';
import { AllProgramms } from './pages/AllProgramms';
import { Debug } from './pages/Debug';
import { Programm } from './pages/Programm';
import { Programms } from './pages/Programms';

class App extends React.Component {
    public render() {
        const stickers: Array<{
            text: string,
            desc?: string,
            rotate: number,
            link: string,
            hueRotate: number,
        }> = [
            {
                rotate   : -3,
                hueRotate: 120,
                link     : '/about',
                text     : 'Описание',
                desc     : 'Что такое МК52',
            },
            {
                rotate   : 12,
                hueRotate: 0,
                link     : '/code',
                text     : 'Программа',
                desc     : 'Надеюсь, будет работать',
            },
            //{
            //    rotate   : 5,
            //    hueRotate: 31,
            //    link     : '/debug',
            //    text     : 'Отладка',
            //    desc     : 'Регистры, стек и др.',
            //},
            //{
            //    rotate   : -3,
            //    hueRotate: 180,
            //    link     : '/programms',
            //    text     : 'Программы',
            //    desc     : 'Мои творения',
            //},
            //{
            //    rotate   : 16,
            //    hueRotate: 60,
            //    link     : '/shared',
            //    text     : 'Другие программы',
            //    desc     : 'Не только мои творения',
            //},
        ];

        return (
            <div>
                <Calculator/>
                {/*<img src={original} width="100%"/>*/}
                <div className="paper">
                    <div className="content">
                        <Switch>
                            <Route path="/code" component={Programm}/>
                            <Route path="/about" component={About}/>
                            <Route path="/programms" component={Programms}/>
                            <Route path="/debug" component={Debug}/>
                            <Route path="/shared" component={AllProgramms}/>
                            <Redirect path="/" exact={true} to="/about"/>
                        </Switch>
                    </div>
                    <div className="stickers">
                        {stickers.map(
                            (sticker, index) =>
                                <div className="sticker" key={index}>
                                    <div style={{
                                        backgroundImage: 'url(https://www.picpng.com/images/large/sticky-notes-download-png-32163)',
                                        transform      : `rotate(${sticker.rotate}deg)`,
                                        filter         : `hue-rotate(${sticker.hueRotate}deg)`,
                                    }}>
                                        <NavLink to={sticker.link} activeClassName="active">
                                            <h5>{sticker.text}</h5>
                                            {sticker.desc}
                                            <img src={underline}/>
                                        </NavLink>
                                    </div>
                                </div>,
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
