import { ChatAction } from './action';
import {
  ChatState,
  LOAD_CHAT,
  LOAD_CHATS,
  LOAD_CHATS_ERROR,
  LOAD_CHATS_SUCCESS,
  LOAD_CHAT_ERROR,
  LOAD_CHAT_SUCCESS,
} from './types';

const initialState: ChatState = {
  chat: {
    data: null,
    error: null,
    loading: false,
  },
  chats: {
    data: null,
    error: null,
    loading: false,
  },
};

export const chatReducer = (
  state: ChatState = initialState,
  action: ChatAction,
): ChatState => {
  switch (action.type) {
    case LOAD_CHAT:
      return {
        ...state,
        chat: {
          ...state.chat,
          loading: true,
        },
      };
    case LOAD_CHAT_SUCCESS:
      return {
        ...state,
        chat: {
          ...state.chat,
          loading: false,
          data: action.data,
        },
      };
    case LOAD_CHAT_ERROR:
      return {
        ...state,
        chat: {
          ...state.chat,
          loading: false,
          error: action.error,
        },
      };
    case LOAD_CHATS:
      return {
        ...state,
        chats: {
          ...state.chats,
          loading: true,
        },
      };
    case LOAD_CHATS_SUCCESS:
      return {
        ...state,
        chats: {
          ...state.chats,
          loading: false,
          data: action.data,
        },
      };
    case LOAD_CHATS_ERROR:
      return {
        ...state,
        chats: {
          ...state.chats,
          loading: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
};
