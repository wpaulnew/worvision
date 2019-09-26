import {UPDATE_UI} from "../actions/ui-actions";

const ui = {
  category: {
    name: 'tracks', // bible
  }
};

export function uiReducer(state = ui, action) {
  // console.log(state, action);
  switch (action.type) {
    case UPDATE_UI:

      return state = {
        ...state,
        category: {
          name: action.payload.name
        }
      };

    default:
      return state;
  }
}