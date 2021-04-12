import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainParamList } from '../types/NavigationTypes';
import HomeNav from './HomeNav';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

const Tab = createBottomTabNavigator<MainParamList>();

const MainNav = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={({ route }) => ({
          title: '홈',
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            switch (routeName) {
              case 'Post':
                return false;
              case 'SetLocation':
                return false;
              default:
                return true;
            }
          })(route),
        })}
      />
    </Tab.Navigator>
  );
};

export default MainNav;
