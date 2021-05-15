import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import MyPage from '../screens/Main/Profile/MyPage';
import { ProfileParamList, TradeListParamList } from '../types/NavigationTypes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BuyList from '../screens/Main/Profile/BuyList';
import SellList from '../screens/Main/Profile/SellList';
import { PALETTE } from '../constants/color';
import HeaderSide from '../components/HeaderSide';
import PressableIcon from '../components/PressableIcon';
import LikeList from '../screens/Main/Profile/LikeList';
import ModifyProfile from '../screens/Main/Profile/ModifyProfile';

const Tab = createMaterialTopTabNavigator<TradeListParamList>();
interface NavProp {
  navigation: StackNavigationProp<ProfileParamList, 'TradeList'>;
}
const TradeList = ({ navigation }: NavProp) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '거래내역',
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="arrow-back-sharp"
            size={26}
            onPress={() => navigation.goBack()}
          />
        </HeaderSide>
      ),
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="SellList"
      backBehavior="history"
      tabBarOptions={{
        inactiveTintColor: PALETTE.grey,
        activeTintColor: PALETTE.main,
        labelStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
        indicatorStyle: {
          //width: '40%',
          width: 57,
          left: 70,
          backgroundColor: PALETTE.main,
        },
      }}>
      <Tab.Screen
        name="SellList"
        component={SellList}
        options={{ tabBarLabel: '판매내역' }}
      />
      <Tab.Screen
        name="BuyList"
        component={BuyList}
        options={{ tabBarLabel: '구매내역' }}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator<ProfileParamList>();

const ProfileNav = () => {
  return (
    <Stack.Navigator initialRouteName="MyPage">
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="ModifyProfile" component={ModifyProfile} />
      <Stack.Screen name="TradeList" component={TradeList} />
      <Stack.Screen name="LikeList" component={LikeList} />
    </Stack.Navigator>
  );
};

export default ProfileNav;
