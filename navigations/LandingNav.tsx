import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignIn from '../screens/Landing/SignIn';
import { LandingParamList } from '../types/NavigationTypes';

const Stack = createStackNavigator<LandingParamList>();

const LandingNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default LandingNav;
