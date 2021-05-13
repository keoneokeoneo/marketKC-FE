import { combineReducers } from 'redux';
import { postReducer } from './post/reducer';
import { authReducer } from './auth/reducer';
import { categoryReducer } from './category';
import { postingReducer } from './posting/reducer';
import { userReducer } from './user/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posting: postingReducer,
  user: userReducer,
  categories: categoryReducer,
  post: postReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
