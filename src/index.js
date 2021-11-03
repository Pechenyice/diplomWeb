import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './redux/reducers';
import CommonErrorBoundary from './components/helpers/ErrorBounderies/CommonErrorBoundary';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <CommonErrorBoundary>
        <App />
      </CommonErrorBoundary>
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
