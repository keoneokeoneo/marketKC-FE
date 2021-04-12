import { Album } from '@react-native-community/cameraroll';

export const POSTING_LOAD_ALBUMS = 'POSTING_LOAD_ALBUMS' as const;

type PostingLoadAlbum = {
  type: typeof POSTING_LOAD_ALBUMS;
  albums: Album[];
};

export type PositngDispatch = PostingLoadAlbum;
