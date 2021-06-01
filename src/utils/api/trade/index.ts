import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { CreateTX, GetTradeRes, GetTXRes } from './types';

const URL = 'http://127.0.0.1:3000';

const getTrades = (userID: string) => {
  return axios.get<GetTradeRes[]>(`${API_BASE_URL}/trades/users/${userID}`);
};

const getTradeState = (id: number) => {
  return axios.get(`${URL}/getStage?id=${id}`);
};

const transferToPlatform = (id: number, addr: string, price: number) => {
  return axios.post(`${URL}/transferToPlatform`, {
    id: id,
    buyer: addr,
    price: price,
  });
};

const transferToSeller = (id: number, price: number) => {
  return axios.post(`${URL}/transferToSeller`, { id: id, price: price });
};

const transferToBuyer = (id: number, price: number) => {
  return axios.post(`${URL}/transferToBuyer`, { id: id, price: price });
};

const saveTX = (req: CreateTX) => {
  return axios.post(`${API_BASE_URL}/trades/tx`, req);
};

const getTX = (userID: string) => {
  return axios.get<GetTXRes[]>(`${API_BASE_URL}/trades/tx/users/${userID}`);
};

export {
  getTradeState,
  getTrades,
  transferToBuyer,
  transferToSeller,
  transferToPlatform,
  saveTX,
  getTX,
};
