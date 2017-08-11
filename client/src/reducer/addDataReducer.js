import * as types from '../action/ActionTypes';

const initialState = {
  members: [],
};

const addDataReducer = (state = initialState, action) => {
  const {members} = state;
  switch (action.type) {
    case types.ADD_PERSON:
      return {
        members: [
          ...members,
          {
            name: action.name,
          },
        ],
      };
    default:
      return state;
  }
};

export default addDataReducer;
