import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from "redux";
import { globalReducer } from "./reducers";
import { Provider } from "react-redux";

const store = createStore(globalReducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
