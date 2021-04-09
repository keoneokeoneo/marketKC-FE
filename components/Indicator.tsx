import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Modal from 'react-native-modal';
import { PALETTE } from '../constants/color';

interface IProps {
  isActive: boolean;
}

const Indicator = ({ isActive }: IProps) => {
  return (
    <Modal isVisible={isActive}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator
          size="large"
          color={PALETTE.main}
          animating={isActive}
        />
      </View>
    </Modal>
  );
};

export default Indicator;
