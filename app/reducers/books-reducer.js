import {LOAD_BOOKS} from "../actions/books-actions";


export function booksReducer(state = [], action) {
  // console.log(state, action);
  switch (action.type) {

    case LOAD_BOOKS:

      return state = {
        ...state,
        books: action.payload.books
      };

    default:
      return state;
  }
}