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

const reducer = combineReducers({
  ui: uiReducer,
  tracks: tracksReducer,
  books: booksReducer
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

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
    <App/>
  </Provider>,
  document.getElementById('app')
);