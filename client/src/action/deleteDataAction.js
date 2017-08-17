import axios from 'axios';
import * as types from './ActionTypes';
import { API_URL } from '../config';
import * as getDataAction from './getDataAction';

export const deletePeople = () => ({
  type: types.DELETE_PEOPLE,
});

export const deletePerson = name => ({
  type: types.DELETE_PERSON,
  name,
});

export function deletePersonFunc(name) {
  return (dispatch) => {
    return axios({
      url: `${API_URL}/persons`,
      method: 'delete',
      data: {
        name,
      },
    })
    .then((res) => {
      dispatch(deletePerson(name));
      dispatch(getDataAction.getDataFunc());
    })
    .catch((err) => {
      console.warn('err', err);
    });
  };
}

export function deletePeopleFunc() {
  return (dispatch) => {
    return axios.delete(`${API_URL}/people`)
    .then((res) => {
      dispatch(deletePeople());
      dispatch(getDataAction.getDataFunc());
    })
    .catch((err) => {
      console.warn('Delete People err', err);
    });
  };
}
