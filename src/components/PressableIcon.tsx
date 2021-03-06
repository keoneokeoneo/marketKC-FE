import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
  name: string;
  size?: number;
  color?: string;
  onPress: () => void;
  opacity?: number;
  mh?: number;
}

const PressableIcon = ({ name, onPress, color, size, opacity, mh }: IProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={opacity ? opacity : 1}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: mh ? mh : 0,
      }}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default PressableIcon;
