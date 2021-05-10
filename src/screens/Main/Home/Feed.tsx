import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import HeaderText from '../../../components/HeaderText';
import PressableIcon from '../../../components/PressableIcon';
import { IFeedItem } from '../../../types';
import { FeedProps } from '../../../types/ScreenProps';
import FeedItem from '../../../components/List/Item/FeedItem';
import { dummyData } from '../../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';

const Feed = ({ navigation }: FeedProps) => {
  const userState = useSelector((state: RootState) => state.user);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <HeaderSide left>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('SetLocation')}>
            <HeaderText title={userState.location.area3} />
          </TouchableOpacity>
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
  }, [navigation, userState.location.area3]);

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
