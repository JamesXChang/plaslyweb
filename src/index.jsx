import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import Main from 'components/Main.jsx';

import { token } from 'states/token-reducer.js';
import { table } from 'states/table-reducer.js';
import { filter } from 'states/filter-reducer.js';
import { option } from 'states/option-reducer.js';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

window.onload = function() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({
        token, table, filter, option
    }), composeEnhancers(applyMiddleware(thunkMiddleware)));

    ReactDOM.render(
        <Provider store={store}>
            <Main/>
        </Provider>,
        document.getElementById('root')
    );
};
