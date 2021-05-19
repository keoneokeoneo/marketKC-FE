import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { GetChatRes, GetChatRoomsRes } from './types';

const getChat = async (chatID: number, postID: number) => {
  return await axios.get<GetChatRes>(
    `${API_BASE_URL}/chats/${chatID}/${postID}`,
  );
};

const getChatRooms = async (id: string) => {
  return await axios.get<GetChatRoomsRes[]>(
    `${API_BASE_URL}/chats/users/${id}`,
  );
};

export { getChat, getChatRooms };
