import axios from 'axios';
import * as types from './ActionTypes';
import { API_URL } from '../config';

export const addData = (name) => ({
  type: types.ADD_PERSON,
  name
});

export function addDataFunc() {
  return (dispatch) => {
    return axios.post(`${API_URL}/persons`, {
      
    })
  }
}
