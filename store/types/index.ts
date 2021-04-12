import {
  Album,
  Include,
  GetPhotosParams,
  GetAlbumsParams,
  PhotoIdentifier,
} from '@react-native-community/cameraroll';
import {
  authInit,
  login,
  loginFailure,
  loginInit,
  loginSuccess,
  register,
  registerFailure,
  registerInit,
  registerSuccess,
} from '../actions/authAction';
import { loadAlbums } from '../actions/postingAction';

export interface UserData {
  userID: string;
  userName: string;
  userEmail: string;
}

export type AuthActions =
  | ReturnType<typeof authInit>
  | ReturnType<typeof register>
  | ReturnType<typeof registerSuccess>
  | ReturnType<typeof registerFailure>
  | ReturnType<typeof registerInit>
  | ReturnType<typeof login>
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof loginFailure>
  | ReturnType<typeof loginInit>;

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

/* 
Album : title(string), count(number)
getPhotoParams : {
  first(number) : 몇개 가져올거냐
  after(string) : page_info의 end_cursor처럼 어느 시점부터 가져올 것이냐
  groupTypes(string) : Album | All(default) | Event | Faces | Library | PhotoStream | SavedPhotos
  groupName(string) : 'Recent Photos' or custom album titles
  assetType(string) : All | Videos | Photos(default)
  mimeTypes(Array) : (image/jpeg)
  fromTime(number) : timestamp > fromTime
  toTime(number) : timestamp < toTime
  include(array) : {
    filename, fileSize, location, imageSize, playableDuraion
  }
}
getPhotos:Promise {
  edges(array) : {
    node : {
      type(string),
      group_name(string)
      image : {
        uri(string),
        filename(string|null) only set if the include contains filename
        height(number|null) only set if the include contains imageSize
        width(number|null) only set if the include contains imageSize
        fileSize(number|null) only set if the include contains fileSize
      }
      timestamp(number),
      location(object | null) only set if the include contains location {
        latitude(number)
        longitude(number)
        altitude(number)
        heading(numer)
        speen(number)
      }
    }
  }
  page_info:{
    has_next_page(boolean),
    start_cursor(string)
    end_cursor(string)
  }
}
*/
export type PostingState = {
  formData: {
    title: string;
    content: string;
    category: string;
  };
  albums: Album[];
  photos: PhotoIdentifier[];
  params: GetPhotosParams;
  pageInfo: {
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
  };
  isFetching: boolean;
};

export type PostingActions = ReturnType<typeof loadAlbums>;
