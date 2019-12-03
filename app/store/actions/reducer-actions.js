import axios from "axios";

export const LOAD_BOOKS = 'LOAD_BOOKS';
export const LOAD_CHAPTERS = 'LOAD_CHAPTERS';
export const LOAD_CHAPTER_VERSES = 'LOAD_CHAPTER_VERSES';

export const LOAD_TRACKS = 'LOAD_TRACKS';
// export const REMOVE_TRACK_FROM_FAVORITES = 'REMOVE_TRACK_FROM_FAVORITES';
// export const ADD_TRACK_TO_FAVORITES = 'ADD_TRACK_TO_FAVORITES';

export function loadBooks() {
  return dispatch => {
    setTimeout(
      () => {
        // http://192.168.0.100:3001/tracks

        fetch(`http://${location.host}/books`, {mode: 'cors'})
          .then((books) => books.json())
          .then(
            (names) => {
              console.log('I got books');
              dispatch(
                {
                  type: LOAD_BOOKS,
                  payload: {
                    names: names
                  }
                }
              )
            }
          );

      }, 100
    );
  }
}

export function loadChapters(bookId, bookName) {
  return dispatch => {
    setTimeout(
      () => {
        console.log(bookId);
        // http://${location.host}/chapters?book=${book_number}

        fetch(`http://${location.host}/chapters?book=${bookId}`, {mode: 'cors'})
          .then((books) => books.json())
          .then(
            (chapters) => {
              console.log('I got chapters of book');
              dispatch(
                {
                  type: LOAD_CHAPTERS,
                  payload: {
                    id: bookId,
                    name: bookName,
                    chapters: chapters
                  }
                }
              )
            }
          );

      }, 100
    );
  }
}

export function loadChapterVerses(bookId, chapterId) {
  return dispatch => {
    setTimeout(
      () => {
        console.log(bookId, chapterId);
        // http://${location.host}/verses?book=${this.state.currentBookId}&chapter=${this.state.currentChapterId}

        fetch(`http://${location.host}/verses?book=${bookId}&chapter=${chapterId}`, {mode: 'cors'})
          .then((verses) => verses.json())
          .then(
            (verses) => {
              console.log('I got verses of book');
              dispatch(
                {
                  type: LOAD_CHAPTER_VERSES,
                  payload: {
                    id: bookId,
                    verses: verses
                  }
                }
              )
            }
          );

      }, 100
    );
  }
}

export function loadTracks(dispatch) {
  return dispatch => {
    setTimeout(
      () => {
        // http://192.168.0.100:3001/tracks

        fetch(`http://${location.host}/tracks`, {mode: 'cors'})
          .then((tracks) => tracks.json())
          .then(
            (tracks) => {
              console.log('I got tracks');
              dispatch(
                {
                  type: LOAD_TRACKS,
                  payload: {
                    tracks: tracks
                  }
                }
              )
            }
          );

      }, 100
    );
  }
}

// export function removeTrackFromFavorites(dispatch, id) {
//   return dispatch => {
//     setTimeout(
//       () => {
//         // Send changes to database
//         axios.put(`http://${location.host}/favorites`, {
//           id: id,
//           favorite: 0,
//         })
//           .then(function (reply) {
//             dispatch(
//               {
//                 type: REMOVE_TRACK_FROM_FAVORITES,
//                 payload: {
//                   id: id
//                 }
//               }
//             )
//           })
//           .catch(function (error) {
//             console.log(error);
//           })
//
//       }, 100
//     );
//   }
// }

// export function addTrackToFavorites(dispatch, id) {
//   return dispatch => {
//     setTimeout(
//       () => {
//         // Send changes to database
//         axios.put(`http://${location.host}/favorites`, {
//           id: id,
//           favorite: 1,
//         })
//           .then(function (reply) {
//             dispatch(
//               {
//                 type: ADD_TRACK_TO_FAVORITES,
//                 payload: {
//                   id: id
//                 }
//               }
//             )
//           })
//           .catch(function (error) {
//             console.log(error);
//           })
//
//       }, 100
//     );
//   }
// }