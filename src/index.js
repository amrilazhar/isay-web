import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store.js'

import { configureFakeBackend } from './helpers/fake-backend.js'
configureFakeBackend();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
