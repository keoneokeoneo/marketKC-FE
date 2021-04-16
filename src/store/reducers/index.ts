import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { postingReducer } from './postingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posting: postingReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
