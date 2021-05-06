import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PALETTE } from '../constants/color';
import { requestTokenValidation } from '../store/actions/authAction';
import { RootState } from '../store/reducers';
import { IntroProps } from '../types/ScreenProps';

const Intro = ({ navigation }: IntroProps) => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const initState = async () => {
    try {
      const userDataFromStorage = await AsyncStorage.getItem('authData');
      if (userDataFromStorage !== null) {
        const parsedData = JSON.parse(userDataFromStorage);
        console.log(parsedData);
        dispatch(
          requestTokenValidation(parsedData.userToken, parsedData.userID),
        );
        navigation.navigate('Main', {
          screen: 'Home',
          params: { screen: 'Feed' },
        });
      } else {
        console.log('Local Storage에 User Data가 없습니다.');
        navigation.navigate('Landing', { screen: 'SignIn' });
      }
    } catch (e) {
      console.log(e);
    }
    // } finally {
    //   if (authState.status.isLoggedIn && authState.status.isValid) {
    //     navigation.navigate('Main', {
    //       screen: 'Home',
    //       params: { screen: 'Feed' },
    //     });
    //   } else {
    //     Alert.alert('로그인 정보가 유효하지 않습니다.');
    //   }
    // }
  };

  useEffect(() => {
    initState();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>Market KC</Text>
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
  logoText: {
    color: PALETTE.grey,
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default Intro;
