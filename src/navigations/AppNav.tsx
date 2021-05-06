import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingNav from './LandingNav';
import MainNav from './MainNav';
import { AppNavParamList } from '../types/NavigationTypes';
import Intro from '../screens/Intro';

const Stack = createStackNavigator<AppNavParamList>();

const AppNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Main" component={MainNav} />
        <Stack.Screen name="Landing" component={LandingNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
