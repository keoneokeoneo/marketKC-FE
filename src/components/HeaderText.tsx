import React from 'react';
import { Text } from 'react-native';
import { PALETTE } from '../constants/color';

interface Props {
  title: string;
  color?: string;
}

const HeaderText = ({ title, color }: Props) => {
  return (
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 18,
        color: color ? color : 'black',
      }}>
      {title}
    </Text>
  );
};

export default HeaderText;
