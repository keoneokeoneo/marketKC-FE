import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChatList from '../screens/Main/Chat/ChatList';
import ChatRoom from '../screens/Main/Chat/ChatRoom';
import { ChatParamList } from '../types/NavigationTypes';

const Stack = createStackNavigator<ChatParamList>();

const ChatNav = () => {
  return (
    <Stack.Navigator initialRouteName="ChatList">
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="ChatRoom" component={ChatRoom} />
    </Stack.Navigator>
  );
};

export default ChatNav;
