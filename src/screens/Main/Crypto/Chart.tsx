import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import HeaderText from '../../../components/HeaderText';
import { ChartProps } from '../../../types/ScreenProps';

const Chart = ({ navigation }: ChartProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <HeaderText title="Chart" />
        </HeaderSide>
      ),
      headerRight: () => null,
      title: '',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Chart</Text>
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

export default Chart;
