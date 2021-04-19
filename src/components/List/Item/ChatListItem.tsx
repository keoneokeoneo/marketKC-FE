import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { onChange } from 'react-native-reanimated';
import { PALETTE } from '../../../constants/color';
import { IMAGES } from '../../../constants/image';

interface Props {
  onPress: () => void;
}

const ChatListItem = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={onPress}>
      <Image source={IMAGES.defaultUserImage} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerUserName}>유저 이름</Text>
          <Text style={styles.headerInfo}>유저 위치 정보</Text>
          <Text style={styles.headerInfo}>・</Text>
          <Text style={styles.headerInfo}>00월 00일</Text>
        </View>
        <View style={styles.msgContainer}>
          <Text style={styles.msg}>채팅방 마지막 기록</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: PALETTE.grey,
    //backgroundColor: 'yellow',
  },
  image: { width: 48, height: 48, borderRadius: 30, borderWidth: 0.5 },
  content: {
    justifyContent: 'space-between',
    marginLeft: 12,
    //backgroundColor: 'blue',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerUserName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4,
  },
  headerInfo: {
    color: PALETTE.grey,
    marginHorizontal: 2,
    fontSize: 13,
  },
  msgContainer: {},
  msg: {
    fontSize: 15,
  },
});

export default ChatListItem;
