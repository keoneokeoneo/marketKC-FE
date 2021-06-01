import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import TradeButton from '../../../components/Button/TradeButton';
import HeaderSide from '../../../components/HeaderSide';
import Indicator from '../../../components/Indicator';
import TradeListItem from '../../../components/List/Item/TradeListItem';
import StepModal, { StepModalProp } from '../../../components/Modal/StepModal';
import PressableIcon from '../../../components/PressableIcon';
import { ADMIN_ADDR, ADMIN_ID } from '../../../config';
import { PALETTE } from '../../../constants/color';
import { getETHThunk } from '../../../store/post/thunk';
import { RootState } from '../../../store/reducer';
import { TradeListProps } from '../../../types/ScreenProps';
import { tradeAPI } from '../../../utils/api';
import {
  CreateTX,
  GetTradeRes,
  TradeResInit,
} from '../../../utils/api/trade/types';

export interface TransferReq {}

const TradeList = ({ navigation, route }: TradeListProps) => {
  const currentUserID = route.params.userID;

  const {
    post: { eth },
    user: {
      user: {
        data: { id: userID },
      },
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [data, setData] = useState<GetTradeRes[]>([]);
  const [modalData, setModalData] = useState<StepModalProp>({
    stage: 'Init',
    tmp: TradeResInit,
    data: [
      { name: '', addr: '', id: '' },
      { name: 'S-MarCet', addr: ADMIN_ADDR, id: ADMIN_ID },
      {
        name: '',
        addr: '',
        id: '',
      },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onModalOpen = (id: number) => {
    data.map(d => {
      if (d.id === id) {
        setModalData({
          stage: d.stage,
          tmp: d,
          data: [
            { name: d.buyer.name, addr: d.buyer.addr, id: d.buyer.id },
            { name: 'S-MarCet', addr: ADMIN_ADDR, id: ADMIN_ID },
            {
              name: d.seller.name,
              addr: d.seller.addr,
              id: d.seller.id,
            },
          ],
        });
      }
    });
    setOpen(true);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const res = await tradeAPI.getTrades(currentUserID);
      if (res.status === 200) {
        setData(res.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  const onRefresh = () => {
    getData();
    dispatch(getETHThunk());
  };

  const onItemClick = (id: number) => {
    navigation.navigate('Home', { screen: 'Post', params: { id: id } });
  };

  const onTransferToPlatform = async (req: GetTradeRes) => {
    try {
      console.log('Input : ', req);
      await dispatch(getETHThunk());
      const exRes = await tradeAPI.transferToPlatform(
        req.id,
        req.buyer.addr,
        Math.floor((req.post.price / eth) * Math.pow(10, 18)),
      );
      if (exRes.status === 200) console.log('Express Res : ', exRes.data);
      else return;

      const input: CreateTX = {
        tradeID: req.id,
        senderID: req.buyer.id,
        receiverID: ADMIN_ID,
        postID: req.post.id,
        txHash: exRes.data.data.tx,
        eventName: '구매자 입금',
        stage: 'Waiting',
      };
      console.log('Nest Input : ', input);
      const nestRes = await tradeAPI.saveTX(input);
      if (nestRes.status === 200) {
        console.log('Nest Res : ', nestRes.data);
      } else return;
    } catch (e) {
      console.error(e);
    }
  };

  const onTransferToSeller = async (req: GetTradeRes) => {
    try {
      console.log('Input : ', req);
      await dispatch(getETHThunk());
      const exRes = await tradeAPI.transferToSeller(
        req.id,
        Math.floor((req.post.price / eth) * Math.pow(10, 18)),
      );
      if (exRes.status === 200) {
        console.log('Express Res : ', exRes.data);
      } else return;

      const input: CreateTX = {
        tradeID: req.id,
        senderID: ADMIN_ID,
        receiverID: req.seller.id,
        postID: req.post.id,
        txHash: exRes.data.data.tx,
        eventName: '거래 완료',
        stage: 'Done',
      };
      console.log('Nest Input : ', input);
      const nestRes = await tradeAPI.saveTX(input);
      if (nestRes.status === 200) {
        console.log('Nest Res : ', nestRes.data);
        onRefresh();
      } else return;
    } catch (e) {
      console.error(e);
    }
  };

  const onTransferToBuyer = async (req: GetTradeRes) => {
    try {
      console.log('Input : ', req);
      await dispatch(getETHThunk());
      const exRes = await tradeAPI.transferToPlatform(
        req.id,
        req.buyer.addr,
        Math.floor((req.post.price / eth) * Math.pow(10, 18)),
      );
      if (exRes.status === 200) {
        console.log('Express Res : ', exRes.data);
      } else return;

      const input: CreateTX = {
        tradeID: req.id,
        senderID: req.buyer.id,
        receiverID: ADMIN_ID,
        postID: req.post.id,
        txHash: exRes.data.data.tx,
        eventName: '거래 취소',
        stage: 'Rejected',
      };
      console.log('Nest Input : ', input);
      const nestRes = await tradeAPI.saveTX(input);
      if (nestRes.status === 200) {
        console.log('Nest Res : ', nestRes.data);
        onRefresh();
      } else return;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '거래 내역',
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

      <View style={{ flex: 1 }}>
        {data.length > 0 ? (
          <View style={{ flex: 1 }}>
            <StepModal
              isOpen={open}
              onClose={() => setOpen(false)}
              data={modalData}
              userID={currentUserID}
              func1={onTransferToPlatform}
              func2={onTransferToSeller}
              func3={onTransferToBuyer}
            />
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
                  footer={
                    <TradeButton
                      btnText="진행보기"
                      color={PALETTE.main}
                      onPress={() => onModalOpen(item.id)}
                    />
                  }
                />
              )}
            />
          </View>
        ) : (
          <View style={styles.content}>
            <Text>거래 중인 품목이 없습니다.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.border,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default TradeList;
