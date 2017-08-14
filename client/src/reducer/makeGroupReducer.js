import * as types from '../action/ActionTypes';

const initialState = {
  groupData: {
    groupNum: 0,
    minMember: 0,
  }
};

const makeGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.MAKE_GROUP:
      return {
        groupData: {
          groupNum: action.groupNum,
          minMember: action.minMember,
        }
      };
    default:
      return state;
  }
};

export default makeGroupReducer;
