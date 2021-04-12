import React, { useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import LandingNav from './LandingNav';
import MainNav from './MainNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { authInit } from '../store/actions/authAction';
import { useReduxDevToolsExtension } from '@react-navigation/devtools';

const Stack = createStackNavigator();

const AppNav = () => {
  // const navigationRef = useRef<NavigationContainerRef>(null);
  // useReduxDevToolsExtension(navigationRef);
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const getData = async () => {
    try {
      const readData = await AsyncStorage.getItem('userData');
      if (readData !== null) {
        const result = JSON.parse(readData);
        console.log(result);
        dispatch(authInit(result.userToken, result.userID));
      } else console.log('null');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {authState.status.isLoggedIn ? (
          <Stack.Screen name="Main" component={MainNav} />
        ) : (
          <Stack.Screen name="Landing" component={LandingNav} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
