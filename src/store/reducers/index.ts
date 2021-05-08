import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { postingReducer } from './postingReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posting: postingReducer,
  user: userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
