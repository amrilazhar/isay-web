import { createStore, applyMiddleware } from  'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers'

const devTools =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunkMiddleware)
    : composeWithDevTools(applyMiddleware(thunkMiddleware));

export const store = createStore(
  rootReducer,
  devTools  
);