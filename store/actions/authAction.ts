import axios from 'axios';
import { Dispatch } from 'react';
import { RegData } from '../../types/APITypes';
import {
  AuthDispatch,
  AUTH_REGISTER,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_INIT,
  AUTH_REGISTER_SUCCESS,
} from './ActionTypes';

const BASE_URL = 'http://localhost:3000/api';

// export const registerUser = (regData: RegData) => {
//   const data: Promise<Response> = axios({
//     method: 'POST',
//     baseURL: BASE_URL,
//     url: '/user/register',
//     data: regData,
//   })
//     .then(res => {
//       console.log(res.data);
//       return res.data;
//     })
//     .catch(error => {
//       throw error;
//     });
//   return {
//     type: REGISTER_USER,
//     payload: data,
//   };
// };

export const registerRequest = (regData: RegData) => {
  return (dispatch: Dispatch<AuthDispatch>) => {
    dispatch(register());

    return axios({
      method: 'POST',
      baseURL: BASE_URL,
      url: '/user/register',
      data: regData,
    })
      .then(res => {
        console.log(res.data);
        if (res.data.code === 1) {
          dispatch(registerSuccess());
        } else {
          dispatch(registerFailure(res.data.data));
        }
      })
      .catch(error => {
        dispatch(registerFailure(error));
      });
  };
};

export const registerInit = () => {
  return { type: AUTH_REGISTER_INIT };
};
export const register = () => {
  return { type: AUTH_REGISTER };
};
export const registerSuccess = () => {
  return { type: AUTH_REGISTER_SUCCESS };
};
export const registerFailure = (error: string) => {
  return { type: AUTH_REGISTER_FAILURE, error };
};
