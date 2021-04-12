import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
  left?: boolean;
  right?: boolean;
}

const HeaderSide: React.FC<Props> = ({ children, left, right }) => {
  return (
    <View
      style={[
        styles.container,
        left ? { marginLeft: 8 } : null,
        right ? { marginRight: 8 } : null,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
});

export default HeaderSide;
