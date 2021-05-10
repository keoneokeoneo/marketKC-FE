import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PALETTE } from '../constants/color';
import { requestTokenValidation } from '../store/actions/authAction';
import { RootState } from '../store/reducers';
import { IntroProps } from '../types/ScreenProps';
import Geolocation from 'react-native-geolocation-service';
import { IMAGES } from '../constants/image';
import { requestLoadCategories } from '../store/actions/categoryAction';
import { requestLoadUser, requestLocation } from '../store/actions/userAction';

const Intro = ({ navigation }: IntroProps) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

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
              requestLocation(pos.coords.longitude, pos.coords.latitude),
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
    if (authState.validation.isLoggedIn) {
      dispatch(requestLoadUser(authState.validation.currentUserID));
      dispatch(requestLoadCategories());
      getLocation();
      navigation.navigate('Main', {
        screen: 'Home',
        params: { screen: 'Feed' },
      });
    }
  }, [authState.validation.isLoggedIn]);

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
