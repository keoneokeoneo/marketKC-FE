import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import MyPage from '../screens/Main/Profile/MyPage';
import { ProfileParamList } from '../types/NavigationTypes';

const Stack = createStackNavigator<ProfileParamList>();

const ProfileNav = () => {
  return (
    <Stack.Navigator initialRouteName="MyPage">
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  );
};

export default ProfileNav;
