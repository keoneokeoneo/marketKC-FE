import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import HeaderText from '../../../components/HeaderText';
import { PALETTE } from '../../../constants/color';
import { ChatListProps } from '../../../types/ScreenProps';

const ChatList = ({ navigation }: ChatListProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <HeaderText title="ChatList" />
        </HeaderSide>
      ),
      headerRight: () => null,
      title: '',
      headerStyle: {
        backgroundColor: PALETTE.bg2,
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>ChatList</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatList;
