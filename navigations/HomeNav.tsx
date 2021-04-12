import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Feed from '../screens/Main/Home/Feed';
import { HomeParamList } from '../types/NavigationTypes';

const Stack = createStackNavigator<HomeParamList>();

const HomeNav = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  );
};

export default HomeNav;
