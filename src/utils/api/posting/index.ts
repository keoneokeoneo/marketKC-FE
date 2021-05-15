import axios from 'axios';
import { API_BASE_URL } from '../../../config';
import { UploadPostReq } from './types';

const uploadPost = async (data: UploadPostReq) => {
  return await axios.post<string>(`${API_BASE_URL}/posts`, data);
};

export { uploadPost };
