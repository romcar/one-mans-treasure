import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers/RootReducer';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

var store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App store={store}/>
  </Provider>, document.getElementById('app'));

export default store;