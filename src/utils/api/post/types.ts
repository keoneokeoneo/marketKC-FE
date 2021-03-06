import { S3Image } from '../../../types';

export type PostRes = {
  id: number;
  title: string;
  content: string;
  price: number;
  views: number;
  location: string;
  status: string;
  updatedAt: string;
  categoryName: string;
  seller: {
    id: string;
    name: string;
    profileImgUrl: string;
  };
  postImgs: S3Image[];
};

export type FeedPost = {
  id: number;
  title: string;
  price: number;
  location: string;
  updatedAt: string;
  postImgs: S3Image[];
};

export type PostsRes = {
  result: FeedPost[];
  total: number;
};
