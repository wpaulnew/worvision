import {
  LOAD_BOOKS,
  LOAD_CHAPTERS,
  LOAD_CHAPTER_VERSES,
  UPDATE_CURRENT_VERSE,
  LOAD_TRACKS
} from "../actions/reducer-actions";

// ids like as (id) => {}

// Для ws данные берем со всего стейта и отправляем

const initialState = {
  books: {
    active: false,
    list: [],
    book: {
      id: null,
      name: null,
      chapters: {
        active: false,
        numbers: [],
        chapter: {
          id: 1,
          verses: {
            list: [],
            verse: {
              id: null
            }
          }
        }
      }
    }
  },
  tracks: {
    active: false,
    list: [],
    track: {
      id: null,
      name: null,
      verse: null
    },
    favorites: {
      active: false,
      names: []
    }
  }
};

export function reducer(state = initialState, action) {
  // console.log(state, action);
  switch (action.type) {

    case LOAD_BOOKS:

      return state = {
        ...state,
        books: {
          ...state.books,
          list: action.payload.list
        }
      };

    case LOAD_CHAPTERS:

      return state = {
        ...state,
        books: {
          ...state.books,
          book: {
            ...state.books.book,
            id: action.payload.bookId,
            name: action.payload.bookName,
            chapters: {
              ...state.books.book.chapters,
              numbers: action.payload.numbers
            }
          }
        }
      };

    case LOAD_CHAPTER_VERSES:

      // console.log(action.payload.verses);
      // Устанавливаем значение главы
      return state = {
        ...state,
        books: {
          ...state.books,
          book: {
            ...state.books.book,
            chapters: {
              ...state.books.book.chapters,
              chapter: {
                ...state.books.book.chapters.chapter,
                id: action.payload.chapterId,
                verses: {
                  ...state.books.book.chapters.chapter.verses,
                  list: action.payload.list,
                  verse: {
                    ...state.books.book.chapters.chapter.verses.verse,
                    id: null
                  }
                }
              }
            }
          }
        }
      };

    case UPDATE_CURRENT_VERSE: {

      return state = {
        ...state,
        books: {
          ...state.books,
          book: {
            ...state.books.book,
            chapters: {
              ...state.books.book.chapters,
              chapter: {
                ...state.books.book.chapters.chapter,

                verses: {
                  ...state.books.book.chapters.chapter.verses,
                  verse: {
                    id: action.payload.id,
                    text: action.payload.text
                  }
                }
              }
            }
          }
        }
      };
    }

    // case LOAD_TRACKS:
    //
    //   return state = {
    //     ...state,
    //     names: action.payload.tracks
    //   };

    // case REMOVE_TRACK_FROM_FAVORITES:
    //
    //   return state = {
    //     ...state, tracks: state.tracks.map(track => {
    //       if (track.id === action.payload.id) {
    //         return {...track, favorite: 0}
    //       }
    //       return track;
    //     })
    //   };
    //
    // case ADD_TRACK_TO_FAVORITES:
    //
    //   return state = {
    //     ...state, tracks: state.tracks.map(track => {
    //       if (track.id === action.payload.id) {
    //         return {...track, favorite: 1}
    //       }
    //       return track;
    //     })
    //   };

    default:
      return state;
  }
}

// const initialState = {
//   names: [],
//   name: null,
//   verses: [],
//   book: {
//     id: null,
//     name: null,
//     chapters: [],
//     chapter: {
//       id: null,
//       verses: [],
//       verse: {
//         id: null,
//         text: null
//       },
//     },
//   },
//   track: {
//     id: null,
//     name: null,
//     verses: [],
//     verse: null
//   }
// };
