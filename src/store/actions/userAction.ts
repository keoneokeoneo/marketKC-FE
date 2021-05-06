import axios from 'axios';
import { Dispatch } from 'react';
import { API_BASE_URL } from '../../config';
import { UserDispatch } from './userActionTypes';

export const userInit = () => {};

export const loadCategories = () => {
  return (dispatch: Dispatch<UserDispatch>) => {
    return axios({
      method: 'GET',
      baseURL: API_BASE_URL,
      url: '/api/categories',
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export type UserActions = ReturnType<typeof userInit>;
