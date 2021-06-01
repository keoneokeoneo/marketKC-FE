import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PALETTE } from '../../../constants/color';
import { TradePost } from '../../../utils/api/user/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { numberWithCommas } from '../../../utils';

type IProps = {
  data: TradePost;
  eth: number;
  onPress: (id: number) => void;
  footer?: JSX.Element;
};

const TradeListItem = ({ data, onPress, eth, footer }: IProps) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => onPress(data.id)}
      style={styles.content}
      activeOpacity={1}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: data.postImg }} style={styles.img} />
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.subInfo}>
          <Text style={styles.subInfoText}>{data.location}</Text>
          <Text style={styles.subInfoText}>·</Text>
          <Text style={styles.subInfoText}>{data.updatedAt}</Text>
        </View>
        <View style={styles.subInfo}>
          <View style={styles.chip}>
            <Text style={styles.chipText}>{data.status}</Text>
          </View>
          <Text style={styles.priceText}>{`${(data.price / eth).toFixed(
            6,
          )} ETH`}</Text>
        </View>
        <View style={styles.sub}>
          <Text>{`[KRW] ${numberWithCommas(data.price)}`}</Text>
          {data.chats > 0 && (
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="chatbubbles-outline" style={styles.subText} />
              <Text style={styles.subText}>{data.chats}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
    {footer}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 8,
  },
  content: {
    padding: 12,
    flexDirection: 'row',
  },
  imgContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  img: { width: 92, height: 92, borderRadius: 8 },
  info: { flex: 2, justifyContent: 'center' },
  title: { fontSize: 15, marginBottom: 2 },
  subInfo: {
    flexDirection: 'row',
    marginVertical: 2,
    alignItems: 'center',
  },
  subInfoText: { color: PALETTE.grey, fontSize: 12, marginRight: 1 },
  chip: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PALETTE.main,
    borderRadius: 4,
    marginRight: 4,
  },
  chipText: { fontSize: 13, color: 'white', fontWeight: 'bold' },
  priceText: { fontWeight: 'bold', fontSize: 15 },
  sub: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: { fontSize: 13, color: PALETTE.grey },
});

export default TradeListItem;
