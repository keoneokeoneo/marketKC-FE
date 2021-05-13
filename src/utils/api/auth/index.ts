import axios from 'axios';
import { API_BASE_URL } from '../../../config';

const validateToken = async <T>(token: string) => {
  return await axios.get<T>(`${API_BASE_URL}/auth/validateUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const login = async <T>(data: any) => {
  return await axios.post<T>(`${API_BASE_URL}/auth/login`, data);
};

const register = async <T>(data: any) => {
  return await axios.post<T>(`${API_BASE_URL}/aut/register`, data);
};

export { validateToken, login, register };
