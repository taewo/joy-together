import * as types from './ActionTypes';
import axios from 'axios';
import { API_URL } from '../config';
import * as getDataAction from './getDataAction';

export const deletePeople = () => ({
  type: types.DELETE_PEOPLE,
});

export function deletePeopleFunc() {
  return (dispatch) => {
    return axios.delete(`${API_URL}/people`)
    .then((res) => {
      console.log('Delete People success');
      dispatch(deletePeople());
      dispatch(getDataAction.getDataFunc());
    })
    .catch((err) => {
      console.warn('Delete People err', err);
    });
  };
}
