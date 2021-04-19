import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import HeaderText from '../../../components/HeaderText';
import ChatListItem from '../../../components/List/Item/ChatListItem';
import { PALETTE } from '../../../constants/color';
import { ChatListProps } from '../../../types/ScreenProps';

const ChatList = ({ navigation }: ChatListProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <HeaderText title="채팅" />
        </HeaderSide>
      ),
      headerRight: () => null,
      title: '',
      headerStyle: {
        backgroundColor: 'white',
      },
    });
  }, [navigation]);

  const openChatRoom = () => {
    navigation.navigate('ChatRoom');
  };

  return (
    <View style={styles.container}>
      <ChatListItem onPress={openChatRoom} />
      <ChatListItem onPress={openChatRoom} />
      <ChatListItem onPress={openChatRoom} />
      <ChatListItem onPress={openChatRoom} />
      <ChatListItem onPress={openChatRoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ChatList;
