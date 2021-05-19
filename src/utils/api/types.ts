export type UserEntity = {
  id: string;
  email: string;
  password: string;
  name: string;
  walletAddr: string;
  profileImgUrl: string;
  createdAt: Date;
  updatedAt: Date;
  subscribedCategories: number[];
  //post:PostEntity[]
  //buyingChats:ChatRoom[]
  //sellingChats:ChatRoom[]
  //messages:Message[]
};

export type CategoryEntity = {
  id: number;
  name: string;
  //posts:Post[]
};

export type PostEntity = {
  id: number;
  title: string;
  content: string;
  price: number;
  views: number;
  location: string;
  status: '판매중' | '거래중' | '거래완료';
  createdAt: Date;
  updatedAt: Date;
  //seller:User
  //category:Category
  //postImgs:PostImg[]
  //chatrooms:ChatRoom[]
};

export type PostImgEntity = {
  id: number;
  url: string;
  //post:Post
};

export type ChatRoomEntity = {
  id: number;
  //buyer:User
  //seller:User
  //post:Post
  //messages:ChatMsg[]
};

export type ChatMsgEntity = {
  id: number;
  //chatroom:ChatRoom
  //sender:User
  createdAt: Date;
  msg: string;
};
