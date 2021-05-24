import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PALETTE } from '../../../constants/color';
import { GetChatRoomsRes } from '../../../utils/api/chat/types';

interface Props {
  handlePress: (chatID: number, postID: number) => void;
  data: GetChatRoomsRes;
}

const ChatListItem = ({ handlePress, data }: Props) => {
  const { id, lastMsg, post, target } = data;
  const location = post.location.split(' ');
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => handlePress(id, post.id)}>
      <Image source={{ uri: target.profileImgUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerUserName}>{target.name}</Text>
          <Text
            style={styles.headerInfo}>{`${location[1]} ${location[2]}`}</Text>
          <Text style={styles.headerInfo}>・</Text>
          <Text style={styles.headerInfo}>{lastMsg.createdAt}</Text>
        </View>
        <View style={styles.msgContainer}>
          <Text style={styles.msg}>{lastMsg.text}</Text>
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
