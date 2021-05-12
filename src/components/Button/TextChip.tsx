import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PALETTE } from '../../constants/color';

interface IProps {
  text: string;
  onPress?: () => void;
}

const TextChip = ({ text, onPress }: IProps) => {
  return (
    <TouchableOpacity activeOpacity={1} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: PALETTE.main,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  text: {
    color: PALETTE.main,
  },
});

export default TextChip;
