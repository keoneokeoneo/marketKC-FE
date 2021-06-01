import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TradeButton from '../../../components/Button/TradeButton';
import HeaderSide from '../../../components/HeaderSide';
import Indicator from '../../../components/Indicator';
import TradeListItem from '../../../components/List/Item/TradeListItem';
import PressableIcon from '../../../components/PressableIcon';
import { getETHThunk } from '../../../store/post/thunk';
import { RootState } from '../../../store/reducer';
import { loadUserSellThunk } from '../../../store/user/thunk';
import { SellListProps } from '../../../types/ScreenProps';
import { TradePost } from '../../../utils/api/user/types';

const SellList = ({ navigation, route }: SellListProps) => {
  const currentUserID = route.params.userID;
  const {
    post: { eth },
    user: {
      sell,
      user: {
        data: { id: userID },
      },
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const onRefresh = () => {
    dispatch(getETHThunk());
    dispatch(loadUserSellThunk(currentUserID));
  };

  const onItemClick = (id: number) => {
    navigation.navigate('Home', { screen: 'Post', params: { id: id } });
  };

  const onBtnClick = (id: number) => {};

  useEffect(() => {
    onRefresh();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '판매 내역',
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
      <Indicator isActive={sell.loading} />
      {sell.data.length > 0 ? (
        <FlatList
          data={sell.data}
          renderItem={({ item }) => (
            <TradeListItem
              data={item}
              onPress={onItemClick}
              eth={eth}
              footer={
                item.status === '거래중' ? (
                  <TradeButton btnText="진행 보기" onPress={() => {}} />
                ) : item.status === '거래완료' ? (
                  <TradeButton btnText="후기 작성" onPress={() => {}} />
                ) : undefined
              }
            />
          )}
          refreshing={sell.loading}
          onRefresh={onRefresh}
        />
      ) : (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text>판매중인 게시글이 없습니다.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(216,216,216)',
  },
});

export default SellList;
