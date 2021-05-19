import { GetChatRes, GetChatRoomsRes } from '../../utils/api/chat/types';
import {
  LOAD_CHAT,
  LOAD_CHATS,
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_ERROR,
  LOAD_CHAT_ERROR,
  LOAD_CHAT_SUCCESS,
} from './types';

export const loadChats = () => ({ type: LOAD_CHATS });
export const loadChatsSuccess = (data: GetChatRoomsRes[]) => ({
  type: LOAD_CHATS_SUCCESS,
  data,
});
export const loadChatsError = (error: string) => ({
  type: LOAD_CHATS_ERROR,
  error,
});

export const loadChat = () => ({ type: LOAD_CHAT });
export const loadChatSuccess = (data: GetChatRes) => ({
  type: LOAD_CHAT_SUCCESS,
  data,
});
export const loadChatError = (error: string) => ({
  type: LOAD_CHAT_ERROR,
  error,
});

type LoadChatAction =
  | ReturnType<typeof loadChat>
  | ReturnType<typeof loadChatSuccess>
  | ReturnType<typeof loadChatError>;
type LoadChatsAction =
  | ReturnType<typeof loadChats>
  | ReturnType<typeof loadChatsSuccess>
  | ReturnType<typeof loadChatsError>;

export type ChatAction = LoadChatAction | LoadChatsAction;
