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
  categoryID: number;
  categoryName: string;
}

export interface FeedCategory extends Category {
  isSelected: boolean;
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

export interface Location {
  long: number;
  lat: number;
  area1: string;
  area2: string;
  area3: string;
}
