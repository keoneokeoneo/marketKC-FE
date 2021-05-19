import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { LoginReq, LoginRes, RegisterReq, ValidationRes } from './types';

const validation = async (token: string) => {
  return await axios.get<ValidationRes>(`${API_BASE_URL}/auth/validation`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const login = async (req: LoginReq) => {
  return await axios.post<LoginRes>(`${API_BASE_URL}/auth/login`, req);
};

const register = async (req: RegisterReq) => {
  return await axios.post<string>(`${API_BASE_URL}/auth/register`, req);
};

export { validation, login, register };
