import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store.js'
import { configureFakeBackend } from './helpers/fake-backend.js'
import reportWebVitals from './reportWebVitals';

import App from './App';
import './index.css';

// configureFakeBackend();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
