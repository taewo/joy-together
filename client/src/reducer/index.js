import { combineReducers } from 'redux';
import getDataReducer from './getDataReducer';
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
  getDataReducer,
  form: formReducer,
});

export default reducer;
