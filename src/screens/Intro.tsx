import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PALETTE } from '../constants/color';
import { IntroProps } from '../types/ScreenProps';
import Geolocation from 'react-native-geolocation-service';
import { IMAGES } from '../constants/image';
import { RootState } from '../store/reducer';
import { findCurrentLocationThunk, loadUserThunk } from '../store/user/thunk';
import { validateTokenThunk } from '../store/auth/thunk';
import { loadCategoriesThunk } from '../store/category';
import { ValidateTokenReq } from '../utils/api/auth/types';

const Intro = ({ navigation }: IntroProps) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(true);

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
            dispatch(
              findCurrentLocationThunk(
                pos.coords.longitude,
                pos.coords.latitude,
              ),
            );
          },
          err => {
            console.log(err);
          },
          { enableHighAccuracy: true, timeout: 3600, maximumAge: 3600 },
        );
      }
    });
  };

  const initState = async () => {
    try {
      const userDataFromStorage = await AsyncStorage.getItem('UserData');
      if (userDataFromStorage) {
        const parsedData: ValidateTokenReq = JSON.parse(userDataFromStorage);
        setLoading(false);
        dispatch(validateTokenThunk(parsedData));
      } else {
        console.log('로컬스토리지에 데이터 없음');
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
    if (authState.validation.error) {
      navigation.navigate('Landing', { screen: 'SignIn' });
    }
    if (!loading && authState.validation.data) {
      dispatch(loadUserThunk(authState.validation.data.id));
      getLocation();
      dispatch(loadCategoriesThunk());
      navigation.navigate('Main', {
        screen: 'Home',
        params: { screen: 'Feed' },
      });
    }
  }, [authState.validation.data, authState.validation.error]);

  return (
    <View style={styles.container}>
      <Image source={IMAGES.appLogo2} style={styles.logo} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}>
        <Text style={styles.text2}>중고 거래</Text>
        <Text style={styles.text1}>그런데</Text>
        <Text style={styles.text2}>암호화폐</Text>
        <Text style={styles.text1}>{`를 곁들인`}</Text>
      </View>
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
  logo: { width: 220, height: 220, padding: 10 },
  logoText: {
    color: PALETTE.main,
    fontSize: 48,
    fontWeight: 'bold',
  },
  text1: { color: PALETTE.grey, fontSize: 18, marginHorizontal: 4 },
  text2: {
    color: PALETTE.main,
    fontWeight: 'bold',
    fontSize: 21,
    marginHorizontal: 2,
  },
});

export default Intro;
