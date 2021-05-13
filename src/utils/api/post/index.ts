import axios from 'axios';
import { API_BASE_URL } from '../../../config';

const getPostByID = async <T>(id: number) => {
  return await axios.get<T>(`${API_BASE_URL}/posts/${id}`);
};

export { getPostByID };
