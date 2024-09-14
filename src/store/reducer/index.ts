import { combineReducers } from 'redux';
import tokenReducer from './token-reducer';

const rootReducer = combineReducers({
  tokenReducer,
});

export default rootReducer;
