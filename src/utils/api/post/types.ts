import { S3Image } from '../../../types';

export type PostRes = {
  id: number;
  title: string;
  content: string;
  price: number;
  likes: number;
  chats: number;
  views: number;
  location: string;
  status: string;
  updatedAt: string;
  categoryName: string;
  user: {
    id: string;
    name: string;
    profileImgUrl: string;
  };
  postImgs: S3Image[];
};
