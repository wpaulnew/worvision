export const UPDATE_UI = 'UPDATE_UI';

export function changeCurrentCategory(name) {
  return {
    type: UPDATE_UI,
    payload: {
      name: name
    }
  }
}