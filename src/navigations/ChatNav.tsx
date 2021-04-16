import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChatList from '../screens/Main/Chat/ChatList';
import { ChatParamList } from '../types/NavigationTypes';

const Stack = createStackNavigator<ChatParamList>();

const ChatNav = () => {
  return (
    <Stack.Navigator initialRouteName="ChatList">
      <Stack.Screen name="ChatList" component={ChatList} />
    </Stack.Navigator>
  );
};

export default ChatNav;
