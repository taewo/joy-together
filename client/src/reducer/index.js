import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import getDataReducer from './getDataReducer';
import addDataReducer from './addDataReducer';
import makeGroupReducer from './makeGroupReducer';

const reducer = combineReducers({
  getDataReducer,
  addDataReducer,
  makeGroupReducer,
  routing: routerReducer,
});

export default reducer;
