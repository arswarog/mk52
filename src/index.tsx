import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './scss/index.scss';
import { keyboard } from './keyboard';
import { loadList } from './reducers/actions/github';
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, createStore, Store } from 'redux';
import { globalReducer, IGlobalState } from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store: Store<IGlobalState> = createStore(
    globalReducer,
    applyMiddleware(thunk),
);

loadList()(store.dispatch);

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

