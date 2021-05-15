import { ThunkAction } from 'redux-thunk';
import {
  ACCESS_KEY_ID,
  BUCKET_NAME,
  BUCKET_REGION,
  SECRET_ACCESS_KEY,
} from '../../config';
import { LoadedImage, UploadForm } from '../../types';
import { postingAPI } from '../../utils/api';
import { UploadPostReq } from '../../utils/api/posting/types';
import { RootState } from '../reducer';
import {
  PostingAction,
  uploadImages,
  uploadImagesError,
  uploadImagesSuccess,
  uploadPost,
  uploadPostError,
  uploadPostSuccess,
} from './action';
import S3 from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';

export const uploadPostThunk = (
  data: UploadForm,
): ThunkAction<void, RootState, null, PostingAction> => {
  return async (dispatch, getState) => {
    dispatch(uploadPost());
    try {
      if (getState().user.user.data && getState().user.location.data) {
        const { area1, area2, area3 } = getState().user.location.data;
        const { id } = getState().user.user.data;
        const { urls } = getState().posting.form.data;
        const req: UploadPostReq = {
          ...data,
          location: `${area1} ${area2} ${area3}`,
          userID: id,
          urls: urls,
        };
        const res = await postingAPI.uploadPost(req);

        if (res.status === 200) {
          dispatch(uploadPostSuccess());
        }
      }
    } catch (e) {
      dispatch(uploadPostError(e));
    }
  };
};

export const uploadImagesThunk = (
  images: LoadedImage[],
): ThunkAction<void, RootState, null, PostingAction> => {
  return async dispatch => {
    dispatch(uploadImages());
    try {
      const client = new S3({
        credentials: {
          accessKeyId: ACCESS_KEY_ID,
          secretAccessKey: SECRET_ACCESS_KEY,
        },
        region: BUCKET_REGION,
        signatureVersion: 'v4',
      });

      const urls: string[] = [];

      images.forEach(async image => {
        const response = await fetch(image.path);
        const blob = await response.blob();
        const ID = uuid();

        const params = {
          Bucket: BUCKET_NAME + '/postImgs',
          Key: `${ID}.${image.path.split('.')[1]}`,
          Body: blob,
          ContentType: image.mime,
          ACL: 'public-read',
        };

        client.upload(
          params,
          (err: globalThis.Error, data: S3.ManagedUpload.SendData) => {
            if (err) {
              dispatch(uploadImagesError(err));
            } else {
              urls.push(data.Location);
            }
          },
        );
      });
      dispatch(uploadImagesSuccess(urls));
    } catch (e) {
      dispatch(uploadImagesError(e));
    }
  };
};
