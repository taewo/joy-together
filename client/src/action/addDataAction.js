import axios from 'axios';
import * as types from './ActionTypes';
import * as action from './getDataAction';
import { API_URL } from '../config';

export const addData = name => ({
  type: types.ADD_PERSON,
  name,
});

export function addDataFunc(name) {
  return (dispatch) => {
    return axios.post(`${API_URL}/persons`, {
      name,
    })
    .then((res) => {
      console.log('Add data success');
      dispatch(addData(name));
      dispatch(action.getDataFunc());
    })
    .catch((err) => {
      console.warn('Add data err', err);
    });
  };
}
