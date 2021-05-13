import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { UploadPostReq } from './types';

const uploadPost = async <T>(data: UploadPostReq) => {
  return await axios.post<T>(`${API_BASE_URL}/posts`, data);
};

export { uploadPost };
