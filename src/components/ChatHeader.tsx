import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PALETTE } from '../constants/color';
import { numberWithCommas } from '../utils';
import { GetChatPost } from '../utils/api/chat/types';

interface IProps {
  data: GetChatPost;
  eth: number;
  onPostClick: (id: number) => void;
  onBtnClick: () => void;
  show: boolean;
  btnText?: string;
}

const ChatHeader = ({
  data,
  eth,
  onBtnClick,
  onPostClick,
  btnText,
  show,
}: IProps) => (
  <TouchableOpacity
    activeOpacity={1}
    style={styles.container}
    onPress={() => onPostClick(data.id)}>
    <Image source={{ uri: data.postImg }} style={styles.img} />
    <View style={styles.content}>
      <View style={styles.infoContainer}>
        <Text style={styles.status}>{`[${data.status}]`}</Text>
        <Text ellipsizeMode="tail" style={styles.title} numberOfLines={1}>
          {data.title}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.eth}>{`ETH ${(data.price / eth).toFixed(6)}`}</Text>
        <Text style={styles.krw}>{`[KRW ${numberWithCommas(
          data.price,
        )}]`}</Text>
      </View>
    </View>
    {show && btnText && (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.btn}
        onPress={onBtnClick}>
        <Text style={styles.btnText}>{btnText}</Text>
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgb(216,216,216)',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 40,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
  },
  btn: {
    borderColor: PALETTE.grey,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  btnText: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 13,
  },
  content: {
    flex: 1,
    paddingHorizontal: 4,
    marginLeft: 6,
  },
  infoContainer: { flexDirection: 'row', marginVertical: 1 },
  status: { color: PALETTE.line1, fontWeight: 'bold' },
  title: { overflow: 'hidden', width: '70%' },
  priceContainer: { flexDirection: 'row', marginVertical: 1 },
  eth: { fontWeight: 'bold' },
  krw: { fontWeight: '400', fontSize: 13, marginLeft: 4 },
});

export default ChatHeader;
