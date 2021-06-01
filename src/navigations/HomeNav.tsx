import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Feed from '../screens/Main/Home/Feed';
import Post from '../screens/Main/Home/Post';
import Search from '../screens/Main/Home/Search';
import SetCategory from '../screens/Main/Home/SetCategory';
import SetLocation from '../screens/Main/Home/SetLocation';
import { HomeParamList } from '../types/NavigationTypes';

const Stack = createStackNavigator<HomeParamList>();

const HomeNav = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen name="SetCategory" component={SetCategory} />
      <Stack.Screen name="SetLocation" component={SetLocation} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default HomeNav;
