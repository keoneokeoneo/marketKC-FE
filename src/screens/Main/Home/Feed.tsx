import React, { useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import HeaderText from '../../../components/HeaderText';
import PressableIcon from '../../../components/PressableIcon';
import { IFeedItem } from '../../../types';
import { FeedProps } from '../../../types/ScreenProps';
import FeedItem from '../../../components/List/Item/FeedItem';
import { dummyData } from '../../../constants';

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
            onPress={() => {
              navigation.navigate('SetCategory');
            }}
            mh={4}
          />
        </HeaderSide>
      ),
    });
  }, [navigation]);

  const onSelect = (data: IFeedItem) => {
    navigation.navigate('Post', { post: data });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <FeedItem data={item} onClick={onSelect} />}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Feed;
