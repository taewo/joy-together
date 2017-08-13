import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import getDataReducer from './getDataReducer';
import addDataReducer from './addDataReducer';

const reducer = combineReducers({
  getDataReducer,
  addDataReducer,
  routing: routerReducer,
});

export default reducer;
