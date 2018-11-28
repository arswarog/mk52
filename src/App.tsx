import * as React from 'react';
import './App.scss';
import { Redirect, Route, Switch } from 'react-router';
//import { NavLink } from 'react-router-dom';
import { IStickerProps, Sticker } from './components/Sticker';
//import original from './images/original.jpg';
//import underline from './scss/images/underline.png';

import { Calculator } from './components/Calculator';
import { About } from './pages/About';
import { AllPrograms } from './pages/AllPrograms';
import { CmdSet } from './pages/CmdSet';
import { Debug } from './pages/Debug';
import { Program } from './pages/Program';
import { Programs } from './pages/Programs';

class App extends React.Component {
    public render() {
        const stickers: IStickerProps[] = [
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
            {
                rotate   : 5,
                hueRotate: 31,
                //    link     : '/debug',
                //    text     : 'Отладка',
                //    desc     : 'Регистры, стек и др.',
                //},
                //{
                //    rotate   : -3,
                //    hueRotate: 180,
                //    link     : '/programs',
                //    text     : 'Программы',
                //    desc     : 'Мои творения',
                //},
                //{
                //    rotate   : 16,
                //    hueRotate: 60,
                link     : '/shared',
                text     : 'Другие программы',
                desc     : 'Не только мои творения',
            },
        ];

        return (
            <div>
                <Calculator/>
                {/*<img src={original} width="100%"/>*/}
                <div className="paper">
                    <div className="content">
                        <Switch>
                            <Route path="/code" component={Program}/>
                            <Route path="/about" component={About}/>
                            <Route path="/programs" component={Programs}/>
                            <Route path="/debug" component={Debug}/>
                            <Route path="/shared" component={AllPrograms}/>
                            <Route path="/commands" component={CmdSet}/>
                            <Redirect path="/" exact={true} to="/about"/>
                        </Switch>
                    </div>
                    <div className="stickers">
                        {stickers.map(
                            (sticker, index) => <Sticker {...sticker} key={index}/>,
                        )}
                        {/*{stickers.map(*/}
                            {/*(sticker, index) =>*/}
                                {/*<div className="sticker" key={index}>*/}
                                    {/*<div style={{*/}
                                        {/*backgroundImage: 'url(https://www.picpng.com/images/large/sticky-notes-download-png-32163)',*/}
                                        {/*transform      : `rotate(${sticker.rotate}deg)`,*/}
                                        {/*filter         : `hue-rotate(${sticker.hueRotate}deg)`,*/}
                                    {/*}}>*/}
                                        {/*<NavLink to={sticker.link} activeClassName="active">*/}
                                            {/*<h5>{sticker.text}</h5>*/}
                                            {/*{sticker.desc}*/}
                                            {/*<img src={underline}/>*/}
                                        {/*</NavLink>*/}
                                    {/*</div>*/}
                                {/*</div>,*/}
                        {/*)}*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
