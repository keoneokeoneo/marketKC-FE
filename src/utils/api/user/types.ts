export type LoadUserRes = {
  id: string;
  email: string;
  name: string;
  walletAddr: string;
  profileImgUrl: string;
  createdAt: string;
  updatedAt: string;
  subscribedCategories: string[];
};

export interface TradePost {
  id: number;
  title: string;
  location: string;
  updatedAt: string;
  status: string;
  price: number;
  postImg: string;
  chats: number;
  seller: {
    id: string;
    name: string;
  };
}

export const TradePostInit: TradePost = {
  id: -1,
  title: '',
  location: '',
  updatedAt: '',
  status: '',
  price: -1,
  postImg: '',
  chats: -1,
  seller: {
    id: '',
    name: '',
  },
};

export interface TradeRequest {
  id: number;
  chatID: number;
  senderID: string;
  receiverID: string;
  accepted: boolean | null;
  post: TradePost;
}
