export const AUTH_INIT = 'AUTH_INIT' as const;
export const AUTH_REGISTER = 'AUTH_REGISTER' as const;
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS' as const;
export const AUTH_REGISTER_FAILURE = 'AUTH_REGISTER_FAILURE' as const;
export const AUTH_REGISTER_INIT = 'AUTH_REGISTER_INIT' as const;
export const AUTH_LOGIN = 'AUTH_LOGIN' as const;
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS' as const;
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE' as const;
export const AUTH_LOGIN_INIT = 'AUTH_LOGIN_INIT' as const;

type AuthInit = {
  type: typeof AUTH_INIT;
};

type AuthRegister = {
  type: typeof AUTH_REGISTER;
};

type AuthRegisterSuccess = {
  type: typeof AUTH_REGISTER_SUCCESS;
};

type AuthRegisterFailure = {
  type: typeof AUTH_REGISTER_FAILURE;
  error: string;
};

type AuthRegisterInit = {
  type: typeof AUTH_REGISTER_INIT;
};

type AuthLogin = {
  type: typeof AUTH_LOGIN;
};

type AuthLoginSuccess = {
  type: typeof AUTH_LOGIN_SUCCESS;
  userToken: string;
  userID: string;
};

type AuthLoginFailure = {
  type: typeof AUTH_LOGIN_FAILURE;
  error: string;
};

type AuthLoginInit = {
  type: typeof AUTH_LOGIN_INIT;
};

export type AuthDispatch =
  | AuthInit
  | AuthRegister
  | AuthRegisterSuccess
  | AuthRegisterFailure
  | AuthRegisterInit
  | AuthLogin
  | AuthLoginSuccess
  | AuthLoginFailure
  | AuthLoginInit;
