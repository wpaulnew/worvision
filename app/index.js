import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import App from "./App";

// For redux
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {combineReducers, createStore, applyMiddleware, compose} from "redux";

import {reducer} from "./store/reducers/reducer";

import {BrowserRouter as Router, Route, Link} from "react-router-dom";

// Views
import Remote from "./view/Remote";
import Screen from "./view/Screen";

// Windows

// Главный источник, через app обращаемся ко всему store
const rreducer = combineReducers({
  store: reducer
});

var store;

// if (process.env.NODE_ENV === 'development') {
//   store = compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )(createStore)(rreducer);
// }


// if (process.env.NODE_ENV === 'application') {
  store = compose(
    applyMiddleware(thunk)
  )(createStore)(rreducer);
// }

// const updateUiAction = {
//   type: 'UPDATE_UI',
//   payload: {
//     name: 'bible'
//   }
// };
//

// setTimeout(() => { store.dispatch(changeCurrentCategory('bible')); }, 2000);

// Load songs
// store.dispatch(loadTracks());
// store.dispatch(loadBooks());

console.log('STORE: ', store.getState());

store.subscribe(() => {
  console.log("Store updated!", store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={App}/>
      <Route path="/screen" exact component={Screen}/>
      <Route path="/remote" exact component={Remote}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);