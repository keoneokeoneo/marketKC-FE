export const AUTH_REGISTER = 'AUTH_REGISTER' as const;
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS' as const;
export const AUTH_REGISTER_FAILURE = 'AUTH_REGISTER_FAILURE' as const;
export const AUTH_REGISTER_INIT = 'AUTH_REGISTER_INIT' as const;

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

export type AuthDispatch =
  | AuthRegister
  | AuthRegisterSuccess
  | AuthRegisterFailure
  | AuthRegisterInit;
