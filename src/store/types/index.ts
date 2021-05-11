import { Category, ImagePickerRes, Location, User } from '../../types';

export type Status = {
  stage: 'INIT' | 'FETCHING' | 'SUCCESS' | 'FAILURE';
  code: number;
  message: string;
};

export type AuthState = {
  login: Status;
  register: Status;
  validation: {
    status: Status;
    isLoggedIn: boolean;
    currentUserToken: string;
    currentUserID: string;
  };
};

export type PostingState = {
  status: 'Empty' | 'Saved';
  form: {
    title: string;
    content: string;
    category: Category;
    price: number;
    urls: string[];
    status: Status;
  };
  files: {
    imgs: ImagePickerRes[];
    status: Status;
  };
};

export type UserState = {
  user: User & { status: Status };
  categories: {
    status: Status;
    ids: number[];
  };
  location: Location & { status: Status };
};

export type CategoryState = {
  status: Status;
  categories: Category[];
};

export type UploadPostForm = {
  title: string;
  content: string;
  categoryID: number;
  price: number;
};

export type UploadPostData = {
  title: string;
  content: string;
  categoryID: number;
  price: number;
  userID: string;
  location: string;
};
