import { Album } from '@react-native-community/cameraroll';

export const POSTING_LOAD_ALBUMS = 'POSTING_LOAD_ALBUMS' as const;
export const POSTING_SELECT_CATEGORY = 'POSTING_SELECT_CATEGORY' as const;

type PostingLoadAlbum = {
  type: typeof POSTING_LOAD_ALBUMS;
  albums: Album[];
};

type PostingSelectCategory = {
  type: typeof POSTING_SELECT_CATEGORY;
  category: {
    id: number;
    name: string;
  };
};

export type PositngDispatch = PostingLoadAlbum | PostingSelectCategory;
