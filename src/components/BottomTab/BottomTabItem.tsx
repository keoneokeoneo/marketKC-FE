import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PALETTE } from '../../constants/color';

interface IProps {
  label: string;
  isCurrent?: boolean;
}

export const BottomTabItem = ({ isCurrent, label }: IProps): JSX.Element => {
  let iconName = '';
  switch (label) {
    case '홈':
      iconName = 'home';
      break;
    case '코인':
      iconName = 'bar-chart';
      break;
    case '채팅':
      iconName = 'chatbubbles';
      break;
    case '내 정보':
      iconName = 'person';
      break;
    case '등록':
      iconName = 'add-circle';
      break;
    default:
      iconName = 'bug';
      break;
  }
  return (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', marginTop: 14 }}>
      <Ionicons
        name={isCurrent ? iconName : `${iconName}-outline`}
        size={21}
        style={{ color: isCurrent ? PALETTE.main : PALETTE.grey }}
      />
      <Text
        style={{
          fontSize: 12,
          fontWeight: isCurrent ? 'bold' : '500',
          color: isCurrent ? PALETTE.main : PALETTE.grey,
          marginVertical: 4,
        }}>
        {label}
      </Text>
    </View>
  );
};
