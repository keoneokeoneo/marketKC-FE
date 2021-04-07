import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
  name: string;
  size?: number;
  color?: string;
  onPress: () => void;
  opacity?: number;
}

const PressableIcon = ({ name, onPress, color, size, opacity }: IProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={opacity ? opacity : 1}
      style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default PressableIcon;
