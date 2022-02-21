import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
// import * as actions from './actions';
import rootReducers from './reducers';
import App from './App';

import FirebaseContext from './context/firebaseContext';
import Firebase from './services/firebase';

import 'antd/dist/antd.min.css';
import './index.css';
import thunk from 'redux-thunk';

const store = new createStore(rootReducers, applyMiddleware(thunk));

ReactDom.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById('root')
);
