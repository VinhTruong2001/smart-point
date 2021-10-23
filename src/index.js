import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { applyMiddleware, createStore } from 'redux';
import myReducer from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

const store = createStore(
  myReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
