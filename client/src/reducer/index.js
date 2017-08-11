import { combineReducers } from 'redux';
import getDataReducer from './getDataReducer';
import addDataReducer from './addDataReducer';

const reducer = combineReducers({
  getDataReducer,
  addDataReducer,
});

export default reducer;
