import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import HeaderText from '../../../components/HeaderText';
import PressableIcon from '../../../components/PressableIcon';
import { FeedProps } from '../../../types/ScreenProps';
import FeedItem from '../../../components/List/Item/FeedItem';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../../../config';

interface GetAllFeedsRes {
  result: FeedRes[];
  total: number;
}

export interface FeedImg {
  id: number;
  url: string;
}

export interface FeedRes {
  id: number;
  title: string;
  price: number;
  likes: number;
  chats: number;
  location: string;
  updatedAt: string;
  postImgs: FeedImg[];
}

const Feed = ({ navigation }: FeedProps) => {
  const userState = useSelector((state: RootState) => state.user);
  const [data, setData] = useState<FeedRes[]>([]);

  const getData = async () => {
    try {
      const res: AxiosResponse<GetAllFeedsRes> = await axios.get(
        `${API_BASE_URL}/posts/feed`,
      );
      if (res.status === 200) {
        // 성공
        console.log(res.data.result);
        setData(res.data.result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

  const onSelect = (id: number) => {
    navigation.navigate('Post', { id: id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
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
