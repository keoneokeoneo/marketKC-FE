import { combineReducers } from 'redux';
import { postReducer } from './post/reducer';
import { authReducer } from './auth/reducer';
import { categoryReducer } from './category';
import { postingReducer } from './posting/reducer';
import { userReducer } from './user/reducer';
import { chatReducer } from './chat/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  posting: postingReducer,
  user: userReducer,
  categories: categoryReducer,
  post: postReducer,
  chat: chatReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
