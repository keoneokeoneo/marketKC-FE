import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { LoginRes, RegisterRes, ValidateTokenRes } from './types';

const validateToken = async (token: string) => {
  return await axios.get<ValidateTokenRes>(
    `${API_BASE_URL}/auth/validateUser`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

const login = async (data: any) => {
  return await axios.post<LoginRes>(`${API_BASE_URL}/auth/login`, data);
};

const register = async (data: any) => {
  return await axios.post<RegisterRes>(`${API_BASE_URL}/auth/register`, data);
};

export { validateToken, login, register };
