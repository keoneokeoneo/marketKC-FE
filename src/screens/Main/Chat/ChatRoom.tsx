import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { ChatRoomProps } from '../../../types/ScreenProps';

const ChatRoom = ({ navigation, route }: ChatRoomProps) => {
  const openSheet = () => {};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="arrow-back-sharp"
            size={26}
            onPress={() => navigation.goBack()}
          />
        </HeaderSide>
      ),
      headerRight: () => (
        <HeaderSide right>
          <PressableIcon
            name="ellipsis-vertical-sharp"
            size={26}
            onPress={openSheet}
          />
        </HeaderSide>
      ),
    });
  }, []);

  return <View />;
};

const styles = StyleSheet.create({});

export default ChatRoom;
