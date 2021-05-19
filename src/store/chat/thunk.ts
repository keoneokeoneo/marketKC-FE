import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { chatAPI } from '../../utils/api';
import { RootState } from '../reducer';
import {
  ChatAction,
  loadChat,
  loadChatError,
  loadChats,
  loadChatsError,
  loadChatsSuccess,
  loadChatSuccess,
} from './action';

export const loadChatThunk = (
  chatID: number,
  postID: number,
): ThunkAction<void, RootState, null, ChatAction> => {
  return async dispatch => {
    dispatch(loadChat());
    try {
      const res = await chatAPI.getChat(chatID, postID);

      if (res.status === 200) {
        dispatch(loadChatSuccess(res.data));
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response)
        dispatch(loadChatError(e.response.data));
      else dispatch(loadChatError('알수없는에러'));
    }
  };
};

export const loadChatsThunk = (
  id: string,
): ThunkAction<void, RootState, null, ChatAction> => {
  return async dispatch => {
    dispatch(loadChats());
    try {
      const res = await chatAPI.getChatRooms(id);

      if (res.status === 200) {
        dispatch(loadChatsSuccess(res.data));
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response)
        dispatch(loadChatsError(e.response.data));
      else dispatch(loadChatsError('알수없는에러'));
    }
  };
};
