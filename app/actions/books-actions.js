export const LOAD_BOOKS = 'LOAD_BOOKS';

export function loadBooks(dispatch) {
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