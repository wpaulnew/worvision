import {ADD_TRACK_TO_FAVORITES, LOAD_TRACKS, REMOVE_TRACK_FROM_FAVORITES} from "../actions/tracks-actions";

export function tracksReducer(state = [], action) {
  // console.log(state, action);
  switch (action.type) {

    case LOAD_TRACKS:

      return state = {
        ...state,
        tracks: action.payload.tracks
      };

    case REMOVE_TRACK_FROM_FAVORITES:

      return state = {
        ...state, tracks: state.tracks.map(track => {
          if (track.id === action.payload.id) {
            return {...track, favorite: 0}
          }
          return track;
        })
      };

    case ADD_TRACK_TO_FAVORITES:

      return state = {
        ...state, tracks: state.tracks.map(track => {
          if (track.id === action.payload.id) {
            return {...track, favorite: 1}
          }
          return track;
        })
      };

    default:
      return state;
  }
}