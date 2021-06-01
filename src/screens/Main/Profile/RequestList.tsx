import axios from 'axios';
import React, { useEffect, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, Alert, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../../App';
import TradeButton from '../../../components/Button/TradeButton';
import HeaderSide from '../../../components/HeaderSide';
import Indicator from '../../../components/Indicator';
import TradeListItem from '../../../components/List/Item/TradeListItem';
import PressableIcon from '../../../components/PressableIcon';
import { PALETTE } from '../../../constants/color';
import { getETHThunk } from '../../../store/post/thunk';
import { RootState } from '../../../store/reducer';
import { loadUserRequestThunk } from '../../../store/user/thunk';
import { RequestListProps } from '../../../types/ScreenProps';
import Toast from 'react-native-simple-toast';

type TradeRes = {
  id: number;
  price: number;
  from: string;
  to: string;
};

const RequestList = ({ navigation }: RequestListProps) => {
  const {
    post: { eth },
    user: {
      user: {
        data: { id: userID },
      },
      request,
    },
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  const onItemClick = (id: number) => {
    navigation.navigate('Home', { screen: 'Post', params: { id: id } });
  };

  const onAnswer = (id: number, answer: boolean) => {
    console.log(id, answer);
    socket.emit('answerTradeRequest', { id: id, answer: answer });
  };

  const onRefresh = () => {
    dispatch(getETHThunk());
    dispatch(loadUserRequestThunk(userID));
  };

  useEffect(() => {
    socket.on('tradeRequestAccepted', (res: TradeRes) => {
      console.log('생성결과 : ', res);
      axios
        .post('http://127.0.0.1:3000/createTrade', {
          id: res.id,
          price: (res.price / eth) * Math.pow(10, 18),
          seller: res.to,
          buyer: res.from,
        })
        .then((res: any) => {
          console.log(res);
          Alert.alert('거래 생성 결과', '거래가 성공적으로 열렸습니다.');
        })
        .catch(e => console.error(e));
    });
    socket.on('tradeRequestRejected', function () {
      Toast.showWithGravity('요청을 거절하였습니다.', Toast.SHORT, Toast.TOP, [
        'UIAlertController',
      ]);
    });
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '거래 요청 내역',
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
      <Indicator isActive={request.loading} />
      {request.data.length > 0 ? (
        <FlatList
          data={request.data}
          renderItem={({ item }) => (
            <TradeListItem
              data={item.post}
              onPress={onItemClick}
              eth={eth}
              footer={
                userID === item.receiverID ? (
                  item.accepted !== null ? (
                    <TradeButton
                      disable
                      onPress={() => {}}
                      btnText={item.accepted ? '수락함' : '거절함'}
                      color={item.accepted ? PALETTE.main : PALETTE.error}
                    />
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        flex: 1,
                      }}>
                      <TradeButton
                        onPress={() => onAnswer(item.id, true)}
                        btnText="수락"
                        color={PALETTE.main}
                      />
                      <TradeButton
                        onPress={() => onAnswer(item.id, false)}
                        btnText="거절"
                        color={PALETTE.error}
                      />
                    </View>
                  )
                ) : item.accepted !== null ? (
                  <TradeButton
                    disable
                    onPress={() => {}}
                    btnText={item.accepted ? '수락됨' : '거절됨'}
                    color={item.accepted ? PALETTE.main : PALETTE.error}
                  />
                ) : (
                  <TradeButton
                    disable
                    onPress={() => {}}
                    btnText="요청함"
                    color={PALETTE.heart}
                  />
                )
              }
            />
          )}
          refreshing={request.loading}
          onRefresh={onRefresh}
        />
      ) : (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text>거래 요청이 없습니다.</Text>
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

export default RequestList;
