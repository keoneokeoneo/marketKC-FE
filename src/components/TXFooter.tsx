import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PALETTE } from '../constants/color';
import { GetTXRes } from '../utils/api/trade/types';

type IProps = {
  data: GetTXRes;
  eth: number;
};

const TXFooter = ({ data, eth }: IProps) => (
  <View style={styles.container}>
    <Text style={styles.event}>{`[${data.eventName}]`}</Text>
    <Text
      ellipsizeMode="tail"
      numberOfLines={1}
      style={styles.hash}>{`[Hash] ${data.txHash}`}</Text>
    <View style={styles.addrContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.addrLabel}>[From]</Text>
        <Text style={styles.addrName}>{data.sender.name}</Text>
      </View>

      <Text style={styles.addr}>{data.sender.addr}</Text>
    </View>
    <View style={styles.addrContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.addrLabel}>[To]</Text>
        <Text style={styles.addrName}>{data.receiver.name}</Text>
      </View>

      <Text style={styles.addr}>{data.receiver.addr}</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.valueLabel}>Value</Text>
      <Text style={styles.value}>{`${data.post.price / eth} ETH`}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderTopColor: PALETTE.border,
    borderTopWidth: 0.5,
  },
  event: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  hash: {
    fontWeight: '700',
    fontSize: 15,
  },
  addrContainer: {
    marginVertical: 6,
  },
  addrLabel: { fontWeight: '700', fontSize: 15 },
  addrName: { fontWeight: '700', fontSize: 15, marginHorizontal: 8 },
  addr: {
    paddingHorizontal: 4,
    marginVertical: 4,
  },
  valueContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'baseline',
  },
  valueLabel: { fontWeight: 'bold', fontSize: 16 },
  value: { marginLeft: 20, fontSize: 16, fontWeight: '500' },
});

export default TXFooter;
