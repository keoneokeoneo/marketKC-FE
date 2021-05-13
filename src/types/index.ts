export interface IFeedItem {
  id: string;
  thumbnailUri: string;
  title: string;
  location: string;
  date: string;
  price: number;
  likes: number;
  chats: number;
  status: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ImagePickerRes {
  height: number;
  creactionDate: string | null;
  mime: 'image/png' | 'image/heic' | 'image/jpeg';
  width: number;
  filename: string;
  localIdentifier: string;
  path: string;
  type: 'image';
}

export interface LoadedImage {
  id: string;
  path: string;
  mime: 'image/png' | 'image/heic' | 'image/jpeg';
  filename: string;
}

export interface Location {
  long: number;
  lat: number;
  area1: string;
  area2: string;
  area3: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImgUrl: string;
  walletAddr: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface S3Image {
  id: number;
  url: string;
}

export interface PostingData {
  title: string;
  content: string;
  category: Category;
  price: number;
  images: LoadedImage[];
}

export interface UploadForm {
  title: string;
  content: string;
  price: number;
  categoryID: number;
  userID: string;
  location: string;
}
