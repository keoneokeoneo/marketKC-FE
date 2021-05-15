import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import HeaderText from '../../../components/HeaderText';
import PressableIcon from '../../../components/PressableIcon';
import { FeedProps } from '../../../types/ScreenProps';
import FeedItem from '../../../components/List/Item/FeedItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { getPostsThunk } from '../../../store/post/thunk';
import Indicator from '../../../components/Indicator';

const Feed = ({ navigation }: FeedProps) => {
  const userState = useSelector((state: RootState) => state.user);
  const postState = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsThunk());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <HeaderSide left>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('SetLocation')}>
            <HeaderText title={userState.location.data.area3} />
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
  }, [navigation, userState.location.data]);

  const onSelect = (id: number) => {
    navigation.navigate('Post', { id: id });
  };

  return (
    <View style={styles.container}>
      <Indicator isActive={postState.posting.loading} />
      {postState.posting.error && !postState.posting.data ? (
        <View>
          <Text>{postState.posting.error}</Text>
        </View>
      ) : (
        <FlatList
          data={postState.posting.data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <FeedItem data={item} onClick={onSelect} />}
          scrollIndicatorInsets={{ right: 1 }}
        />
      )}
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
