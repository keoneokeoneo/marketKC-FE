import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingNav from './LandingNav';

const Stack = createStackNavigator();

const AppNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Landing" component={LandingNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;
