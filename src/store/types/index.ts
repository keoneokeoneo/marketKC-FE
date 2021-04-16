export interface UserData {
  userID: string;
  userName: string;
  userEmail: string;
}

export interface Category {
  id: number;
  name: string;
}

export type AuthState = {
  login: {
    status: 'WAITING' | 'SUCCESS' | 'FAILURE' | 'INIT';
    error: string;
  };
  register: {
    status: 'WAITING' | 'SUCCESS' | 'FAILURE' | 'INIT';
    error: string;
  };
  status: {
    valid: boolean;
    isLoggedIn: boolean;
    currentUserToken: string;
    currentUserID: string;
  };
};

export type PostingState = {
  formData: {
    title: string;
    content: string;
    category: Category;
  };
};
