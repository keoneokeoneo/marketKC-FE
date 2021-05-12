import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BuyListProps } from '../../../types/ScreenProps';

const BuyList = ({ navigation }: BuyListProps) => {
  return (
    <View style={styles.container}>
      <Text>구매내역</Text>
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

export default BuyList;
