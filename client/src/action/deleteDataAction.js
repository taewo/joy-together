import * as types from './ActionTypes';
import axios from 'axios';
import { API_URL } from '../config';
import * as getDataAction from './getDataAction';

export const deletePeople = () => ({
  type: types.DELETE_PEOPLE,
});

export const deletePerson = (name) => ({
  type: types.DELETE_PERSON,
  name,
});

export function deletePersonFunc(name) {
  console.log('name', name)
  return (dispatch) => {
    return axios({
      url: `${API_URL}/persons`,
      method: 'delete',
      data: {
        name,
      },
    })
    .then((res) => {
      console.log('Delete Person success', res);
      dispatch(deletePerson(name));
      dispatch(getDataAction.getDataFunc());
    })
    .catch((err) => {
      console.log('err', err);
    });
  };
}

export function deletePeopleFunc() {
  return (dispatch) => {
    return axios.delete(`${API_URL}/people`)
    .then((res) => {
      console.log('Delete People success', res);
      dispatch(deletePeople());
      dispatch(getDataAction.getDataFunc());
    })
    .catch((err) => {
      console.warn('Delete People err', err);
    });
  };
}
