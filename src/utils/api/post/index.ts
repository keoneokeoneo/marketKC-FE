import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { PostRes, PostsRes } from './types';

const getPostByID = async (id: number) => {
  return await axios.get<PostRes>(`${API_BASE_URL}/posts/${id}`);
};

const getPosts = async () => {
  return await axios.get<PostsRes>(`${API_BASE_URL}/posts`);
};

const getETH = async () => {
  return await axios.get(
    'https://api.upbit.com/v1/candles/minutes/1?market=KRW-ETH&count=1',
  );
};

export { getPostByID, getPosts, getETH };
