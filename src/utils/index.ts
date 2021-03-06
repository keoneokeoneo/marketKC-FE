import Geolocation from 'react-native-geolocation-service';
import { checkMultiple, PERMISSIONS, request } from 'react-native-permissions';

export const regex_onlyNumber = /[^0-9]/g;
export const regex_firstZero = /(^0+)/;

export const inputFormatter = (input: string): string => {
  const onlyNumber = input.replace(regex_onlyNumber, '');
  const removedFirstZero = onlyNumber.replace(regex_firstZero, '');
  return removedFirstZero;
};

export const numberWithCommas = (input: number | string) => {
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const requestLocationPermission = async () => {
  try {
    return await Geolocation.requestAuthorization('whenInUse');
  } catch (e) {
    console.log(e);
  }
};

// 두 위경도 사이의 거리 구하기
export const getDistance = (
  lat1: number,
  long1: number,
  lat2: number,
  long2: number,
) => {
  const toRadian = (deg: number) => deg * (Math.PI / 180);

  const R = 6371; // 지구 둘레 [Km]

  const distanceBetweenLats = toRadian(lat2 - lat1);
  const distanceBetweenLongs = toRadian(long2 - long1);

  const a =
    Math.pow(Math.sin(distanceBetweenLats / 2), 2) +
    Math.cos(toRadian(lat1)) *
      Math.cos(toRadian(lat2)) *
      Math.pow(Math.sin(distanceBetweenLongs / 2), 2);

  const result = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return result;
};

export const getLibraryPermission = async () => {
  const checkPermissionsResult = await checkMultiple([
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
  ]);

  switch (checkPermissionsResult['ios.permission.PHOTO_LIBRARY']) {
    case 'granted':
      break;
    case 'unavailable':
      return 'unavailable';
    case 'blocked':
      return 'blocked';
    case 'denied':
      const requestGalleryPermission = await request(
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      );
      if (requestGalleryPermission === 'granted') break;
      else return 'blocked';
  }
  switch (checkPermissionsResult['ios.permission.CAMERA']) {
    case 'granted':
      return 'granted';
    case 'unavailable':
      return 'unavailable';
    case 'blocked':
      return 'blocked';
    case 'denied':
      const requestCameraPermission = await request(PERMISSIONS.IOS.CAMERA);
      if (requestCameraPermission === 'granted') return 'granted';
      else return 'blocked';
  }
};
