export type GetChatRoomsRes = {
  id: number;
  target: {
    id: string;
    name: string;
    profileImgUrl: string;
  };
  post: {
    id: number;
    location: string;
    imgUrl: string;
  };
  lastMsg: {
    id: number;
    text: string;
    createdAt: string;
  };
};

export type GetChatRes = {
  id: number | null;
  msgs: ChatMsgRes[];
  post: GetChatPost;
  buyer: {
    id: string;
    name: string;
  } | null;
  seller: {
    id: string;
    name: string;
  } | null;
};

export type GetChatPost = {
  id: number;
  title: string;
  price: number;
  postImg: string;
  seller: {
    id: string;
    name: string;
  };
  status: string;
};

export type ChatMsgRes = {
  id: number;
  createdAt: string;
  text: string;
  sender: {
    id: string;
    name: string;
  };
};
