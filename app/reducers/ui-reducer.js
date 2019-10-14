import {UPDATE_UI} from "../actions/ui-actions";

const ui = {
  category: {
    name: 'Песни', // tracks or bible
    names: [
      {
        name: 'Библия',
      },
      {
        name: 'Песни'
      }
    ]
  },
  collection: {
    name: 'Все', // tracks or bible
    names: [
      {
        name: 'Все',
      },
      {
        name: 'Мои'
      },
      {
        name: 'Песнь возрождения'
      }
    ]
  }
};

export function uiReducer(state = ui, action) {
  // console.log(state, action);
  switch (action.type) {
    case UPDATE_UI:

      return state = {
        ...state,
        category: {
          names: state.category.names,
          name: action.payload.name
        }
      };

    default:
      return state;
  }
}