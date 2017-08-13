import * as types from '../action/ActionTypes';

const addDataReducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_PERSON:
      return state;
    default:
      return state;
  }
};

export default addDataReducer;
