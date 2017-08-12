import * as types from '../action/ActionTypes';

const deleteDataReducer = (state = [], action) {
  switch (action.type) {
    case types.DELETE_PEOPLE:
      return state;
    case types.DELETE_PERSON:
      return state;
    default:
      return state;
  }
}

export default deleteDataReducer;
