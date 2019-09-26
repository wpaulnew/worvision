import axios from "axios";

export const LOAD_TRACKS = 'LOAD_TRACKS';
export const REMOVE_TRACK_FROM_FAVORITES = 'REMOVE_TRACK_FROM_FAVORITES';
export const ADD_TRACK_TO_FAVORITES = 'ADD_TRACK_TO_FAVORITES';

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

export function removeTrackFromFavorites(dispatch, id) {
  return dispatch => {
    setTimeout(
      () => {
        // Send changes to database
        axios.put(`http://${location.host}/favorites`, {
          id: id,
          favorite: 0,
        })
          .then(function (reply) {
            dispatch(
              {
                type: REMOVE_TRACK_FROM_FAVORITES,
                payload: {
                  id: id
                }
              }
            )
          })
          .catch(function (error) {
            console.log(error);
          })

      }, 100
    );
  }
}

export function addTrackToFavorites(dispatch, id) {
  return dispatch => {
    setTimeout(
      () => {
        // Send changes to database
        axios.put(`http://${location.host}/favorites`, {
          id: id,
          favorite: 1,
        })
          .then(function (reply) {
            dispatch(
              {
                type: ADD_TRACK_TO_FAVORITES,
                payload: {
                  id: id
                }
              }
            )
          })
          .catch(function (error) {
            console.log(error);
          })

      }, 100
    );
  }
}