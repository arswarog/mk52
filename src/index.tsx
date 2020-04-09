import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import './scss/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import { context } from '@reatom/react';
import { initKeyboard, keyboard } from './keyboard';
import { store } from './store';
import { Keyboard } from './models/keyboard/keyboard.atom';
import { setKeyboardLayout } from './models/keyboard/keyboard.actions';
import { MK52Keyboard } from './elektronika/models/mk52';

const history = createBrowserHistory();

document.addEventListener('keydown', keyboard(store.dispatch.bind(store)));

store.subscribe(Keyboard, initKeyboard);

store.dispatch(setKeyboardLayout(MK52Keyboard));

ReactDOM.render(
    <React.StrictMode>
        <context.Provider value={store}>
            <Router history={history}>
                <App/>
            </Router>
        </context.Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
