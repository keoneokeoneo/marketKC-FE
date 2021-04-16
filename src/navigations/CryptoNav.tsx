import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Chart from '../screens/Main/Crypto/Chart';
import { CryptoParamList } from '../types/NavigationTypes';

const Stack = createStackNavigator<CryptoParamList>();

const CryptoNav = () => {
  return (
    <Stack.Navigator initialRouteName="Chart">
      <Stack.Screen name="Chart" component={Chart} />
    </Stack.Navigator>
  );
};

export default CryptoNav;
