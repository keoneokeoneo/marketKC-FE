import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyPage from '../screens/Main/Profile/MyPage';
import { ProfileParamList } from '../types/NavigationTypes';
import ModifyProfile from '../screens/Main/Profile/ModifyProfile';
import RegisterWallet from '../screens/Main/Profile/RegisterWallet';

const Stack = createStackNavigator<ProfileParamList>();

const ProfileNav = () => {
  return (
    <Stack.Navigator initialRouteName="MyPage">
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="ModifyProfile" component={ModifyProfile} />
      <Stack.Screen name="RegisterWallet" component={RegisterWallet} />
    </Stack.Navigator>
  );
};

export default ProfileNav;
