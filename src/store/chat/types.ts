import { GetChatRes, GetChatRoomsRes } from '../../utils/api/chat/types';

/* ---------------------- 액션 타입 ---------------------- */
export const LOAD_CHATS = ' LOAD_CHATS' as const;
export const LOAD_CHATS_SUCCESS = ' LOAD_CHATS_SUCCESS' as const;
export const LOAD_CHATS_ERROR = ' LOAD_CHATS_ERROR' as const;

export const LOAD_CHAT = ' LOAD_CHAT' as const;
export const LOAD_CHAT_SUCCESS = ' LOAD_CHAT_SUCCESS' as const;
export const LOAD_CHAT_ERROR = ' LOAD_CHAT_ERROR' as const;
/* ----------------------------------------------------- */

/* ---------------------- 액션 타입 유니온 ---------------------- */
type LOAD_CHATS_TYPE =
  | typeof LOAD_CHATS
  | typeof LOAD_CHATS_SUCCESS
  | typeof LOAD_CHATS_ERROR;

type LOAD_CHAT_TYPE =
  | typeof LOAD_CHAT
  | typeof LOAD_CHAT_SUCCESS
  | typeof LOAD_CHAT_ERROR;

export type CHAT_ACTION_TYPE = LOAD_CHATS_TYPE | LOAD_CHAT_TYPE;
/* ----------------------------------------------------- */

export type ChatState = {
  chats: {
    loading: boolean;
    error: string | null;
    data: GetChatRoomsRes[] | null;
  };
  chat: {
    loading: boolean;
    error: string | null;
    data: GetChatRes | null;
  };
};
