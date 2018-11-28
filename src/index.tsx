import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './scss/index.scss';
import { keyboard } from './keyboard';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { globalReducer } from './reducers';
import { Provider } from 'react-redux';

const store = createStore(globalReducer);

document.addEventListener('keydown', keyboard(store.dispatch));

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement,
);
registerServiceWorker();

