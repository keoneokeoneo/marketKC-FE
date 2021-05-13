export type ValidateTokenReq = {
  id: string;
  token: string;
};

export type ValidateTokenRes = {
  id: string;
  name: string;
  email: string;
};

export type RegisterReq = {
  name: string;
  email: string;
  password: string;
};

export type RegisterRes = {};

export type LoginReq = {
  username: string;
  password: string;
};

export type LoginRes = {
  access_token: string;
  id: string;
};
