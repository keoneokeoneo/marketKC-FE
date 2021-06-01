import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderSide from '../../../components/HeaderSide';
import Indicator from '../../../components/Indicator';
import TradeListItem from '../../../components/List/Item/TradeListItem';
import PressableIcon from '../../../components/PressableIcon';
import TXFooter from '../../../components/TXFooter';
import { PALETTE } from '../../../constants/color';
import { getETHThunk } from '../../../store/post/thunk';
import { RootState } from '../../../store/reducer';
import { TXListProps } from '../../../types/ScreenProps';
import { tradeAPI } from '../../../utils/api';
import { GetTXRes } from '../../../utils/api/trade/types';

const TXList = ({ navigation, route }: TXListProps) => {
  const currentUserID = route.params.userID;

  const {
    user: {
      user: {
        data: { id: userID },
      },
    },
    post: { eth },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GetTXRes[]>([]);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await tradeAPI.getTX(currentUserID);
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    dispatch(getETHThunk());
    getData();
  };

  const onItemClick = (id: number) => {
    navigation.navigate('Home', { screen: 'Post', params: { id: id } });
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '트랜잭션 내역',
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
      <Indicator isActive={loading} />
      {data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          refreshing={loading}
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <TradeListItem
              data={item.post}
              onPress={onItemClick}
              eth={eth}
              footer={<TXFooter data={item} eth={eth} />}
            />
          )}
        />
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>
            해당 유저의 트랜잭션이 없습니다.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.border,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: { fontWeight: '800', fontSize: 16 },
});

export default TXList;
