import { Category, ImagePickerRes, Location, User } from '../../types';
import { PostRes } from '../../utils/api/post/types';

export type Status = {
  stage: 'INIT' | 'FETCHING' | 'SUCCESS' | 'FAILURE';
  code: number;
  message: string;
};

/* 리듀서 타입 정의 */
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

// 관리할 상태 타입
export type PostState = {
  post: PostRes | null; // 게시글 데이터
  error: Error | null; // API에서 내려온 에러 메세지
  loading: boolean; // 로딩 여부 판별
};
/* */

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
