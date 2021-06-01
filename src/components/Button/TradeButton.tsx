import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PALETTE } from '../../constants/color';

type IProps = {
  onPress: () => void;
  btnText: string;
  color?: string;
  disable?: boolean;
};

const TradeButton = ({ onPress, btnText, color, disable }: IProps) => (
  <TouchableOpacity
    disabled={disable}
    activeOpacity={1}
    style={styles.container}
    onPress={onPress}>
    <Text style={[styles.text, { color: color }]}>{btnText}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: PALETTE.border,
    borderWidth: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TradeButton;
