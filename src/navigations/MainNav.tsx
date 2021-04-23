import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { MainParamList } from '../types/NavigationTypes';
import HomeNav from './HomeNav';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';
import CryptoNav from './CryptoNav';
import PostingNav from './PostingNav';
import ChatNav from './ChatNav';
import ProfileNav from './ProfileNav';
import { BottomTabBar } from '../components/BottomTab/BottomTabBar';
import { PALETTE } from '../constants/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator<MainParamList>();

const MainNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      //tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
      tabBarOptions={{
        activeTintColor: PALETTE.main,
        inactiveTintColor: PALETTE.grey,
        labelStyle: {
          fontWeight: 'bold',
          fontSize: 12,
        },
        style: {
          backgroundColor: 'white',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={({ route }) => ({
          title: '홈',
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
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
      <Tab.Screen
        name="Crypto"
        component={CryptoNav}
        options={({ route }) => ({
          title: '코인',
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              size={size}
              color={color}
            />
          ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            switch (routeName) {
              default:
                return true;
            }
          })(route),
        })}
      />
      <Tab.Screen
        name="Posting"
        component={PostingNav}
        options={({ route }) => ({
          title: '등록',
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons name="add-sharp" size={size} color={color} />
          ),
          tabBarVisible: false,
        })}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNav}
        options={({ route }) => ({
          title: '채팅',
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              size={size}
              color={color}
            />
          ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            switch (routeName) {
              case 'ChatRoom':
                return false;
              default:
                return true;
            }
          })(route),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNav}
        options={({ route }) => ({
          title: '내 정보',
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
          tabBarVisible: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            switch (routeName) {
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
