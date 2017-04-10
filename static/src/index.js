import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import App from './components/App/App.js';
import './index.css';

import dataReducer from './reducers/dataReducer/dataReducer.js';
import searchReducer from './reducers/searchReducer/searchReducer.js';

const reducer = combineReducers({
  data: dataReducer,
  search: searchReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);