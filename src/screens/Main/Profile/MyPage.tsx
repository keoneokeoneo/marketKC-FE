import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderSide from '../../../components/HeaderSide';
import HeaderText from '../../../components/HeaderText';
import { MyPageProps } from '../../../types/ScreenProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PALETTE } from '../../../constants/color';
import TextChip from '../../../components/Button/TextChip';
import { RootState } from '../../../store/reducer';
import { logout } from '../../../store/auth/action';
import ProfileBox from '../../../components/ProfileBox';
import { loadUserThunk } from '../../../store/user/thunk';
import axios from 'axios';

const MyPage = ({ navigation }: MyPageProps) => {
  const [balance, setBalance] = useState(0);
  const {
    user: {
      data: { id, name, profileImgUrl, walletAddr, email },
      loading,
    },
    location: {
      data: { area3 },
    },
  } = useSelector((state: RootState) => state.user);
  const getData = async () => {
    if (walletAddr !== '') {
      try {
        dispatch(loadUserThunk(id));
        const res = await axios.get(
          `http://127.0.0.1:3000/getBalance?addr=${walletAddr}`,
        );
        if (res.status === 200) {
          setBalance(res.data.result / Math.pow(10, 18));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <HeaderText title="내 정보" />
        </HeaderSide>
      ),
      headerRight: () => null,
      title: '',
    });
  }, [navigation]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getData} />
        }>
        <View style={styles.paper}>
          <ProfileBox
            isMe
            url={profileImgUrl}
            name={name}
            info={`${area3} #${id.split('-')[0]}`}
          />
          <View style={{ marginVertical: 4, padding: 12 }}>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('UserProfile', { userID: id })
              }>
              <Text style={styles.btnText}>프로필 보기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.paper}>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>아이디(이메일)</Text>
            <Text style={styles.infoText}>{email}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>지갑주소</Text>
            <Text style={[styles.infoText]}>
              {walletAddr === '' ? '인증 필요' : walletAddr}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoLabel}>지갑잔액</Text>
            <Text style={styles.infoText}>
              {walletAddr !== '' ? `${balance} ETH` : '안증 필요'}
            </Text>
          </View>
        </View>

        <View style={styles.paper}>
          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={1}
            onPress={() => navigation.navigate('SellList', { userID: id })}>
            <Text style={styles.listItemText}>판매내역</Text>
            <Ionicons name="chevron-forward" style={styles.listItemText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={1}
            onPress={() => navigation.navigate('TXList', { userID: id })}>
            <Text style={styles.listItemText}>트랜잭션</Text>
            <Ionicons name="chevron-forward" style={styles.listItemText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={1}
            onPress={() => navigation.navigate('RequestList')}>
            <Text style={styles.listItemText}>신청내역</Text>
            <Ionicons name="chevron-forward" style={styles.listItemText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={1}
            onPress={() => navigation.navigate('TradeList', { userID: id })}>
            <Text style={styles.listItemText}>거래내역</Text>
            <Ionicons name="chevron-forward" style={styles.listItemText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={1}
            onPress={() => navigation.navigate('RegisterWallet')}>
            <Text style={styles.listItemText}>지갑 등록</Text>
            <Ionicons name="chevron-forward" style={styles.listItemText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={1}
            onPress={() => navigation.navigate('ModifyProfile')}>
            <Text style={styles.listItemText}>프로필 수정</Text>
            <Ionicons name="chevron-forward" style={styles.listItemText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listItem}
            activeOpacity={1}
            onPress={() => {
              dispatch(logout());
              navigation.navigate('Landing', { screen: 'SignIn' });
            }}>
            <Text style={styles.listItemText}>로그아웃</Text>
            <Ionicons name="chevron-forward" style={styles.listItemText} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(216,216,216)',
  },
  paper: {
    backgroundColor: 'white',
    marginBottom: 12,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderWidth: 0.5,
    borderColor: 'rgb(216,216,216)',
    borderRadius: 8,
  },
  btnText: { fontSize: 16, fontWeight: 'bold' },
  listItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(216,216,216)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: { fontSize: 18, fontWeight: '500' },
  infoLabel: { fontWeight: '500', fontSize: 16, marginBottom: 4 },
  info: { paddingVertical: 16, paddingHorizontal: 20 },
  infoText: { color: PALETTE.grey, fontSize: 13 },
});

export default MyPage;
