import * as types from '../action/ActionTypes';

const initialState = {
  data: []
};

const getDataReducer = (state = initialState, action) => {
  const {data} = state;
  switch (action.type) {
    case types.GET_DATA:
      return {
        data: [
          ...data,
          {
            name: action.data
          }
        ]
      };
    default:
      return state;
  }
};

export default getDataReducer;
