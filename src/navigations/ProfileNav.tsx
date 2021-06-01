import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyPage from '../screens/Main/Profile/MyPage';
import { ProfileParamList } from '../types/NavigationTypes';
import ModifyProfile from '../screens/Main/Profile/ModifyProfile';
import RegisterWallet from '../screens/Main/Profile/RegisterWallet';
import TradeList from '../screens/Main/Profile/TradeList';
import RequestList from '../screens/Main/Profile/RequestList';
import SellList from '../screens/Main/Profile/SellList';
import TXList from '../screens/Main/Profile/TXList';
import UserProfile from '../screens/Main/Profile/UserProfile';

const Stack = createStackNavigator<ProfileParamList>();

const ProfileNav = () => {
  return (
    <Stack.Navigator initialRouteName="MyPage">
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="ModifyProfile" component={ModifyProfile} />
      <Stack.Screen name="RegisterWallet" component={RegisterWallet} />
      <Stack.Screen name="TradeList" component={TradeList} />
      <Stack.Screen name="RequestList" component={RequestList} />
      <Stack.Screen name="SellList" component={SellList} />
      <Stack.Screen name="TXList" component={TXList} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
};

export default ProfileNav;
