import {LOAD_BOOKS, LOAD_CHAPTERS, LOAD_CHAPTER_VERSES, LOAD_TRACKS} from "../actions/reducer-actions";

const initialState = {
  names: [],
  name: null,
  verses: [],
  book: {
    id: null,
    name: null,
    chapters: [],
    chapter: {
      id: null,
      verse: {
        id: null,
        text: null
      },
    },
  },
  track: {
    id: null,
    name: null,
    verse: null
  }
};

export function reducer(state = initialState, action) {
  // console.log(state, action);
  switch (action.type) {

    case LOAD_BOOKS:

      return state = {
        ...state,
        names: action.payload.names
      };

    case LOAD_CHAPTERS:

      return state = {
        ...state,
        name: action.payload.name,
        book: {
          ...state.book,
          id: action.payload.id,
          name: action.payload.name,
          chapters: action.payload.chapters,
        }
      };

    case LOAD_CHAPTER_VERSES:

      // console.log(action.payload.verses);
      // Устанавливаем значение главы

      return state = {
        ...state,
        verses: action.payload.verses,
        book: {
          ...state.book,
          chapter: {
            ...state.chapter,
            id: action.payload.chapterId
          }
        }
      };

    case LOAD_TRACKS:

      return state = {
        ...state,
        names: action.payload.tracks
      };

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
