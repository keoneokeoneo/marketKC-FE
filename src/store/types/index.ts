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
  form: {
    title: string;
    content: string;
    category: number;
    price: number;
    cover: string;
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
