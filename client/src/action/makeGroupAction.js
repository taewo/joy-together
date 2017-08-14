import * as types from './ActionTypes';

export const makeGroup = (groupNum, minMember) => ({
  type: types.MAKE_GROUP,
  groupNum,
  minMember,
});
