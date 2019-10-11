import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import App from "./App";

// For redux
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {combineReducers, createStore, applyMiddleware, compose} from "redux";

import {uiReducer} from "./reducers/ui-reducer";
import {tracksReducer} from "./reducers/tracks-reducer";
import {loadTracks} from "./actions/tracks-actions";
import {loadBooks} from "./actions/books-actions";
import {booksReducer} from "./reducers/books-reducer";

import {BrowserRouter as Router, Route, Link} from "react-router-dom";

// Views
import Remote from "./view/Remote";
import Screen from "./view/Screen";

// Windows
import Add from "./windows/Add";
import Edit from "./windows/Edit";
import Editor from "./windows/Editor";

const reducer = combineReducers({
  ui: uiReducer,
  tracks: tracksReducer,
  books: booksReducer
});

var store;

// if (process.env.NODE_ENV === 'development') {
//   store = compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )(createStore)(reducer);
// }

// if (process.env.NODE_ENV === 'application') {
  store = compose(
    applyMiddleware(thunk)
  )(createStore)(reducer);
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
store.dispatch(loadTracks());
store.dispatch(loadBooks());

console.log('STORE: ', store.getState());

store.subscribe(() => {
  console.log("Store updated!", store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={App}/>
      <Route path="/add" exact component={Add}/>
      <Route path="/edit" exact component={Edit}/>
      <Route path="/editor" exact component={Editor}/>
      <Route path="/screen" exact component={Screen}/>
      <Route path="/remote" exact component={Remote}/>
    </Router>
  </Provider>,
  document.getElementById('app')
);