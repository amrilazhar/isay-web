import { createStore, applyMiddleware } from  'redux';

import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers'

const loggerMiddleware = createLogger()

const devTools =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunkMiddleware)
    : composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(
  rootReducer,
  devTools  
);