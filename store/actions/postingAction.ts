import CameraRoll, { Album } from '@react-native-community/cameraroll';
import { Dispatch } from 'react';
import { PositngDispatch, POSTING_LOAD_ALBUMS } from './postingActionTypes';

export const requestLoadAlbums = () => {
  return (dispatch: Dispatch<PositngDispatch>) => {
    return CameraRoll.getAlbums({ assetType: 'Photos' }).then(res => {
      dispatch(loadAlbums(res));
    });
  };
};

export const loadAlbums = (result: Album[]) => {
  return { type: POSTING_LOAD_ALBUMS, albums: result };
};
