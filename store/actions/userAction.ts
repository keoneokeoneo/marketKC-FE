import axios from 'axios';
import { RegData, REGISTER_USER } from '../types';

const BASE_URL = 'http://localhost:3000/api';

export const registerUser = (regData: RegData) => {
  const data = axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/user/register',
    data: regData,
  })
    .then(res => res.data)
    .catch(error => console.log(error));

  return {
    type: REGISTER_USER,
    payload: data,
  };
};
