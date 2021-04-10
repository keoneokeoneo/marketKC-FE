import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Test from '../screens/Main/Test';

const Tab = createBottomTabNavigator();

const MainNav = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Test" component={Test} />
    </Tab.Navigator>
  );
};

export default MainNav;
