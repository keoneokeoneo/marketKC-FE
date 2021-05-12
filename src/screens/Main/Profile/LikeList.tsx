import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { LikeListProps } from '../../../types/ScreenProps';

const LikeList = ({ navigation }: LikeListProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '관심목록',
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="arrow-back-sharp"
            size={26}
            onPress={() => navigation.goBack()}
          />
        </HeaderSide>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>관심목록</Text>
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

export default LikeList;
