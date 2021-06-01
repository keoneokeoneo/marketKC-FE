import { TradePost, TradePostInit } from '../user/types';

export interface GetTradeRes {
  id: number;
  stage: 'Init' | 'Waiting' | 'Done' | 'Rejected';
  buyer: GetTradeUser;
  seller: GetTradeUser;
  post: TradePost;
}

export const TradeResInit: GetTradeRes = {
  id: -1,
  stage: 'Init',
  buyer: {
    id: '',
    name: '',
    addr: '',
  },
  seller: {
    id: '',
    name: '',
    addr: '',
  },
  post: TradePostInit,
};

export interface GetTradeUser {
  id: string;
  name: string;
  addr: string;
}

export interface CreateTX {
  tradeID: number;
  postID: number;
  txHash: string;
  senderID: string;
  receiverID: string;
  eventName: string;
  stage: 'Waiting' | 'Done' | 'Rejected';
}

export interface GetTXRes {
  id: number;
  txHash: string;
  eventName: string;
  sender: GetTradeUser;
  receiver: GetTradeUser;
  post: TradePost;
}
