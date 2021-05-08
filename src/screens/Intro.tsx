import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PALETTE } from '../constants/color';
import { requestTokenValidation } from '../store/actions/authAction';
import {
  requestUserInit,
  userChangeLocation,
} from '../store/actions/userAction';
import { RootState } from '../store/reducers';
import { IntroProps } from '../types/ScreenProps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import { NAVER_MAP_CLIENT_ID, NAVER_MAP_CLIENT_SECRET } from '../config';
import { Location } from '../types';
import { IMAGES } from '../constants/image';

const Intro = ({ navigation }: IntroProps) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth.status);

  const requestLocationPermission = async () => {
    try {
      return await Geolocation.requestAuthorization('whenInUse');
    } catch (e) {
      console.log(e);
    }
  };

  const getLocation = () => {
    requestLocationPermission().then(res => {
      if (res === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            console.log(pos);
            reverseGeocode(pos.coords.longitude, pos.coords.latitude);
          },
          err => {
            console.log(err);
          },
          { enableHighAccuracy: true, timeout: 3600, maximumAge: 3600 },
        );
      }
    });
  };

  const reverseGeocode = async (long: number, lat: number) => {
    await axios
      .get(
        `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${long},${lat}&orders=admcode&output=json`,
        {
          headers: {
            'X-NCP-APIGW-API-KEY-ID': NAVER_MAP_CLIENT_ID,
            'X-NCP-APIGW-API-KEY': NAVER_MAP_CLIENT_SECRET,
          },
        },
      )
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          const newLocation: Location = {
            long: long,
            lat: lat,
            area1: res.data.results[0].region.area1.name,
            area2: res.data.results[0].region.area2.name,
            area3: res.data.results[0].region.area3.name,
          };
          dispatch(userChangeLocation(newLocation));
        }
      })
      .catch(err => console.log(err));
  };

  const initState = async () => {
    try {
      const userDataFromStorage = await AsyncStorage.getItem('authData');
      if (userDataFromStorage !== null) {
        const parsedData = JSON.parse(userDataFromStorage);
        console.log('Local Storage : ', parsedData);
        dispatch(
          requestTokenValidation(parsedData.userToken, parsedData.userID),
        );
      } else {
        console.log('Local Storage에 User Data가 없습니다.');
        navigation.navigate('Landing', { screen: 'SignIn' });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    initState();
  }, []);

  useEffect(() => {
    if (authState.isLoggedIn && authState.isValid) {
      dispatch(requestUserInit(authState.currentUserID));
      getLocation();
      navigation.navigate('Main', {
        screen: 'Home',
        params: { screen: 'Feed' },
      });
    }
  }, [authState.isLoggedIn, authState.isValid]);

  return (
    <View style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <Text style={styles.logoText}>에스마켙</Text>
      <Text>중고 거래 그런데 암호화폐를 곁들인</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: { width: 180, height: 180, padding: 10 },
  logoText: {
    color: PALETTE.grey,
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default Intro;
