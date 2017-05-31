import 'es6-shim'; // yeah, polyfill all the things !!!
import 'whatwg-fetch'; // yeah, polyfill all the things !!!
import Symbol from 'es-symbol';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './reducers';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { WineApp, RegionsPage, WineListPage, WinePage, NotFound } from './components';
import './index.css';

if (!window.Symbol) {
  window.Symbol = Symbol; // yeah, polyfill all the things !!!
}

const root = window.location.hostname === 'react-bootcamp.github.io'
  ? '/react-wines-103-bis/'
  : '/';
const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware, thunk)
);

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter basename={root} history={history}>
      <WineApp />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
