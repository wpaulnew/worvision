import {LOAD_BOOKS, LOAD_CHAPTERS, LOAD_VERSES} from "../actions/books-actions";

const initialState = {
  books: [],
  currentBook: {
    id: '',
    name: '',
    chapters: []
  },
  currentChapter: {
    id: '',
    verses: []
  },
  currentVerse: {
    number: '',
    text: ''
  }
};

export function booksReducer(state = initialState, action) {
  // console.log(state, action);
  switch (action.type) {

    case LOAD_BOOKS:

      return state = {
        ...state,
        books: action.payload.books
      };

    case LOAD_CHAPTERS:

      return state = {
        ...state,
        currentBook: {
          ...state.currentBook,
          id: action.payload.id,
          name: action.payload.name,
          chapters: action.payload.chapters
        }
      };

    case LOAD_VERSES:

      return state = {
        ...state,
        currentChapter: {
          id: action.payload.id,
          verses: action.payload.verses
        }
      };

    default:
      return state;
  }
}