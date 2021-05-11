import S3 from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import {
  ACCESS_KEY_ID,
  BUCKET_NAME,
  BUCKET_REGION,
  SECRET_ACCESS_KEY,
} from '../config';
import { ImagePickerRes } from '../types';

const uploadImgsToS3 = async (images: ImagePickerRes[]) => {
  return new Promise((resolve, reject) => {
    try {
      const client = new S3({
        credentials: {
          accessKeyId: ACCESS_KEY_ID,
          secretAccessKey: SECRET_ACCESS_KEY,
        },
        region: BUCKET_REGION,
        signatureVersion: 'v4',
      });

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
              reject(err);
              return;
            }
            if (data === undefined)
              reject(new Error('Fail to upload image to S3'));
            else resolve(data.Location);
          },
        );
      });
    } catch (e) {
      reject(e);
    }
  });
};
