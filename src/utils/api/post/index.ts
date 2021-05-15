import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { PostRes, PostsRes } from './types';

const getPostByID = async (id: number) => {
  return await axios.get<PostRes>(`${API_BASE_URL}/posts/${id}`);
};

const getPosts = async () => {
  return await axios.get<PostsRes>(`${API_BASE_URL}/posts`);
};

export { getPostByID, getPosts };
