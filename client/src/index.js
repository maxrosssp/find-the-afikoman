import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './js/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

ReactDOM.render((
  <BrowserRouter basename="/game">
    <App />
  </BrowserRouter>
), document.getElementById('root'));
