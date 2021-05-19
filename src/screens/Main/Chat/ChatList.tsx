import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderSide from '../../../components/HeaderSide';
import HeaderText from '../../../components/HeaderText';
import ChatListItem from '../../../components/List/Item/ChatListItem';
import { loadChatsThunk } from '../../../store/chat/thunk';
import { RootState } from '../../../store/reducer';
import { ChatListProps } from '../../../types/ScreenProps';

const ChatList = ({ navigation }: ChatListProps) => {
  const {
    user,
    chat: { chats },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChatsThunk(user.user.data.id));
  }, []);

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

  const openChatRoom = useCallback((chatID: number, postID: number) => {
    navigation.navigate('ChatRoom', { chatID: chatID, postID: postID });
  }, []);

  return (
    <View style={styles.container}>
      {chats.data ? (
        <FlatList
          data={chats.data}
          keyExtractor={item => item.id.toString()}
          refreshing={chats.loading}
          onRefresh={() => dispatch(loadChatsThunk(user.user.data.id))}
          renderItem={({ item }) => (
            <ChatListItem handlePress={openChatRoom} data={item} />
          )}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>채팅 내역이 존재하지 않아요</Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => dispatch(loadChatsThunk(user.user.data.id))}>
            <Text>다시 시도하기</Text>
          </TouchableOpacity>
        </View>
      )}
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
