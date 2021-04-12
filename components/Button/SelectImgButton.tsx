import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PALETTE } from '../../constants/color';

interface Props {
  currentCount: number;
  maximumCount: number;
  onPress?: () => void;
}

export const SelectImgButton = ({
  currentCount,
  maximumCount,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="camera-sharp" size={24} />
      <View style={styles.textContainer}>
        <Text style={[styles.text, styles.textSelected]}>{currentCount}</Text>
        <Text style={styles.text}>{`/${maximumCount}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 84,
    width: 84,
    borderWidth: 0.5,
    borderColor: PALETTE.line1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: PALETTE.line1,
    fontWeight: '500',
  },
  textSelected: {
    color: PALETTE.main,
    fontWeight: '800',
  },
});
