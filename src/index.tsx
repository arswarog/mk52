import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { globalReducer } from './reducers';
import { Provider } from 'react-redux';

const store = createStore(globalReducer);

document.addEventListener('keydown', (event: KeyboardEvent) => {
    store.dispatch({
        type: 'KEYBOARD_EVENT',
        code: event.code,
    });
});

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement,
);
registerServiceWorker();

