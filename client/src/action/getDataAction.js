import axios from 'axios';
import * as types from './ActionTypes';
import { API_URL } from '../config';

export const getData = name => ({
  type: types.GET_DATA,
  name,
});

export function getDataFunc() {
  return (dispatch) => {
    return axios.get(`${API_URL}/persons`)
    .then((res) => {
      console.log('getDataFunc', res.data);
      dispatch(getData(res.data));
    })
    .catch((err) => {
      console.warn('err', err);
    });
  };
}
