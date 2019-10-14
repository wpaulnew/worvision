export const LOAD_BOOKS = 'LOAD_BOOKS';
export const LOAD_CHAPTERS = 'LOAD_CHAPTERS';
export const LOAD_VERSES = 'LOAD_VERSES';

export function loadBooks() {
  return dispatch => {
    setTimeout(
      () => {
        // http://192.168.0.100:3001/tracks

        fetch(`http://${location.host}/books`, {mode: 'cors'})
          .then((books) => books.json())
          .then(
            (books) => {
              console.log('I got books');
              dispatch(
                {
                  type: LOAD_BOOKS,
                  payload: {
                    books: books
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

export function loadVerses(bookId, chapterId) {
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
                  type: LOAD_VERSES,
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