import { createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import logger from 'redux-logger';

import {createConnect} from 'rims';

import reducers from './reducers';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger),
);

export const store = createStore(
  reducers,
  enhancer
);

export default createConnect(store);
