import React, { useState } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { MainParamList } from '../types/NavigationTypes';
import HomeNav from './HomeNav';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/core';
import CryptoNav from './CryptoNav';
import PostingNav from './PostingNav';
import ChatNav from './ChatNav';
import ProfileNav from './ProfileNav';
import { BottomTabBar } from '../components/BottomTab/BottomTabBar';
import { PALETTE } from '../constants/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal2 from '../components/Modal/Modal2';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/reducers';
import { initPosting } from '../store/actions/postingAction';

const Tab = createBottomTabNavigator<MainParamList>();

const MainNav = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const postingStatus = useSelector((state: RootState) => state.posting.status);
  const onSelect = (flag: boolean) => {
    setOpen(false);
    // true => 이어서 작성
    // flase => 새로 작성
    if (flag) navigation.navigate('Posting');
    else {
      dispatch(initPosting());
      navigation.navigate('Posting');
    }
  };

  return (
    <>
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
          listeners={{
            tabPress: e => {
              e.preventDefault();
              if (postingStatus === 'Saved') setOpen(true);
              else navigation.navigate('Posting');
            },
          }}
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
      <Modal2
        isOpen={open}
        onClose={() => setOpen(false)}
        content={'작성중인 글이 있어요. 이어서 작성하시겠어요?'}
        select1Text="네, 이어서 작성할래요"
        select2Text="아니요, 새로 작성할래요"
        onSelect1={() => onSelect(true)}
        onSelect2={() => onSelect(false)}
      />
    </>
  );
};

export default MainNav;
