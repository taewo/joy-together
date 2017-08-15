import axios from 'axios';
import * as types from './ActionTypes';
import { API_URL } from '../config';

export const getData = data => ({
  type: types.GET_DATA,
  data,
});

export function getDataFunc() {
  return (dispatch) => {
    return axios.get(`${API_URL}/persons`)
    .then((res) => {
      dispatch(getData(res.data));
    })
    .catch((err) => {
      console.warn('err', err);
    });
  };
}
