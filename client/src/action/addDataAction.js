import axios from 'axios';
import * as types from './ActionTypes';
import { API_URL } from '../config';

export const addData = (name) => ({
  type: types.ADD_PERSON,
  name,
});

export function addDataFunc(name) {
  console.log(123123, name);
  return (dispatch) => {
    return axios.post(`${API_URL}/persons`, {
      name,
    })
    .then((res) => {
      console.log('add data res', res);
      console.log('add data res.data', res.data);
      dispatch(addData(name));
    })
    .catch((err) => {
      console.warn('Add data err', err);
    })
  }
}
