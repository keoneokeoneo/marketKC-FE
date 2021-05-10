import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { categoryReducer } from './categoryReducer';
import { postingReducer } from './postingReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posting: postingReducer,
  user: userReducer,
  categories: categoryReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
