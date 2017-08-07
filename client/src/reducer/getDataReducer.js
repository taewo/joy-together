import * as types from '../action/ActionTypes';

const initialState = {
  data: [],
};

const getDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default getDataReducer;
