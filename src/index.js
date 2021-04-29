import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';

ReactDOM.render(
  <BrowserRouter>
    {/* <Provider> */}
      <App/>
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
