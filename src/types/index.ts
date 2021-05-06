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
