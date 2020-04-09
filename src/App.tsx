import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import './App.scss';

import { IStickerProps, Sticker } from './components/Sticker';
import { Program } from './pages/Program';
import { AboutPage } from './pages/About';
import { Programs } from './pages/Programs';
import { Debug } from './pages/Debug';
import { GithubPage } from './pages/Github';
import { GithubView } from './pages/GithubView';
import { CmdSet } from './pages/CmdSet';
import { Calculator } from './components/Calculator';
import { useAtom } from '@reatom/react';
import { initKeyboard } from './keyboard';
import { Keyboard } from './models/keyboard/keyboard.atom';

const stickers: IStickerProps[] = [
    {
        rotate: -3,
        hueRotate: 120,
        link: '/about',
        text: 'Описание',
        desc: 'Что такое МК52',
    },
    {
        rotate: 12,
        hueRotate: 0,
        link: '/code',
        text: 'Программа',
        desc: 'Надеюсь, будет работать',
    },
    {
        rotate: 5,
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
        link: '/github',
        text: 'Другие программы',
        desc: 'Не только мои творения',
    },
];

function App() {
    return (
        <div>
            <Calculator/>
            {/*<img src={original} width="100%"/>*/}
            <div className="paper">
                <div className="content">
                    <Switch>
                        <Route path="/code" component={Program}/>
                        <Route path="/about" component={AboutPage}/>
                        <Route path="/programs" component={Programs}/>
                        <Route path="/debug" component={Debug}/>
                        <Route path="/github" exact={true} component={GithubPage}/>
                        <Route path="/github/(.*)" component={GithubView}/>
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

export default App;
