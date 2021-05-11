export type RegData = {
  name: string;
  email: string;
  password: string;
};

export type LoginData = {
  username: string;
  password: string;
};

export type LoginRes = {
  access_token: string;
  id: string;
};

export type LoadUserRes = {
  id: string;
  email: string;
  name: string;
  walletAddr: string;
  profileImgUrl: string;
  createdAt: string;
  updatedAt: string;
  subscribedCategories: string;
};

export type ValidateTokenRes = {
  id: string;
  name: string;
  email: string;
};

export type UploadPostReq = {
  title: string;
  content: string;
  categoryID: number;
  location: string;
  price: number;
  userID: string;
  imgUrls: string[];
};
