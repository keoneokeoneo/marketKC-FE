import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignIn from '../screens/Landing/SignIn';
import SignUp from '../screens/Landing/SignUp';
import { LandingParamList } from '../types/NavigationTypes';

const Stack = createStackNavigator<LandingParamList>();

const LandingNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default LandingNav;
