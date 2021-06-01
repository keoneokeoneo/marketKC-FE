import axios from 'axios';
import {
  API_BASE_URL,
  NAVER_MAP_CLIENT_ID,
  NAVER_MAP_CLIENT_SECRET,
} from '../../../config';
import { LoadUserRes, TradePost, TradeRequest } from './types';

const loadUserByID = async (id: string) => {
  return await axios.get<LoadUserRes>(`${API_BASE_URL}/users/${id}`);
};

const updateUserCategories = async (id: string, categories: number[]) => {
  return await axios.patch(
    `${API_BASE_URL}/users/${id}/categories`,
    categories,
  );
};

const updateUserWalletAddr = async (id: string, walletAddr: string) => {
  return await axios.patch(`${API_BASE_URL}/users/walletAddr`, {
    id,
    walletAddr,
  });
};

const getCurrentLocation = async (long: number, lat: number) => {
  return await axios.get(
    `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${long},${lat}&orders=admcode&output=json`,
    {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': NAVER_MAP_CLIENT_ID,
        'X-NCP-APIGW-API-KEY': NAVER_MAP_CLIENT_SECRET,
      },
    },
  );
};

const getSellList = async (userID: string) => {
  return await axios.get<TradePost[]>(`${API_BASE_URL}/posts/users/${userID}`);
};

const getTradeRequests = async (userID: string) => {
  return await axios.get<TradeRequest[]>(
    `${API_BASE_URL}/trades/requests/users/${userID}`,
  );
};

export {
  loadUserByID,
  getCurrentLocation,
  updateUserCategories,
  updateUserWalletAddr,
  getSellList,
  getTradeRequests,
};
