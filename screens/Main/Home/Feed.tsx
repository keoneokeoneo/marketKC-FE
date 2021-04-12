import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import HeaderText from '../../../components/HeaderText';
import PressableIcon from '../../../components/PressableIcon';
import { PALETTE } from '../../../constants/color';
import { FeedProps } from '../../../types/ScreenProps';
const Feed = ({ navigation }: FeedProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <HeaderSide left>
          <HeaderText title="Feed" />
        </HeaderSide>
      ),
      headerRight: () => (
        <HeaderSide right>
          <PressableIcon
            name="search-sharp"
            size={26}
            onPress={() => {}}
            mh={4}
          />
          <PressableIcon
            name="filter-sharp"
            size={26}
            onPress={() => {}}
            mh={4}
          />
        </HeaderSide>
      ),
      headerStyle: {
        backgroundColor: PALETTE.bg2,
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Feed</Text>
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

export default Feed;
