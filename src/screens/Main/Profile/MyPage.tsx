import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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

const MyPage = ({ navigation }: MyPageProps) => {
  const userState = useSelector((state: RootState) => state.user);
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

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ backgroundColor: 'rgb(216,216,216)' }}>
        <View style={styles.paper}>
          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.profileImgContainer}
              activeOpacity={1}>
              <Image
                source={{ uri: userState.user.data.profileImgUrl }}
                style={styles.profileImg}
              />
              <View style={styles.profileImgIcon}>
                <Ionicons name="camera" size={18} />
              </View>
            </TouchableOpacity>
            <View style={styles.profileInfoContainer}>
              <Text style={styles.profileName}>{userState.user.data.name}</Text>
              <Text style={styles.profileSubInfo}>{`${
                userState.location.data.area3
              } #${userState.user.data.id.split('-')[0]}`}</Text>
            </View>
          </View>
          <TouchableOpacity activeOpacity={1} style={styles.profileBtn}>
            <Text style={styles.profileBtnText}>프로필 보기</Text>
          </TouchableOpacity>
          <View style={styles.profileList}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.profileListItem}
              onPress={() =>
                navigation.navigate('TradeList', { screen: 'SellList' })
              }>
              <View style={styles.profileListItemIcon}>
                <Ionicons name="document-text" size={28} />
              </View>
              <Text style={styles.profileListItemText}>거래내역</Text>
            </TouchableOpacity>
            <View style={styles.profileListItemDivider} />
            <TouchableOpacity
              activeOpacity={1}
              style={styles.profileListItem}
              onPress={() => navigation.navigate('LikeList')}>
              <View style={styles.profileListItemIcon}>
                <Ionicons name="heart" size={28} />
              </View>
              <Text style={styles.profileListItemText}>관심목록</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.menuList}>
          <View style={styles.menuListItem}>
            <View>
              <Text style={styles.menuListItemText}>아이디(이메일)</Text>
              <Text
                style={[styles.menuListItemText, styles.menuListItemSubText]}>
                {userState.user.data.email}
              </Text>
            </View>
          </View>

          <View style={styles.menuListItem}>
            <View>
              <Text style={styles.menuListItemText}>암호화폐 지갑주소</Text>
              <Text
                style={[styles.menuListItemText, styles.menuListItemSubText]}>
                {userState.user.data.walletAddr === ''
                  ? '인증되지않음'
                  : userState.user.data.walletAddr}
              </Text>
            </View>
            <TextChip text="인증하기" />
          </View>

          <View style={styles.menuListItem}>
            <View>
              <Text style={styles.menuListItemText}>암호화폐 잔액</Text>
              <Text
                style={[styles.menuListItemText, styles.menuListItemSubText]}>
                {userState.user.data.walletAddr === ''
                  ? '인증되지않음'
                  : `ETH    ${0.22}`}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.menuListItem}
            activeOpacity={1}
            onPress={() => {
              dispatch(logout());
              navigation.navigate('Landing', { screen: 'SignIn' });
            }}>
            <Text style={styles.menuListItemText}>로그아웃</Text>
          </TouchableOpacity>
          <View style={styles.menuListItem}>
            <Text style={styles.menuListItemText}>회원탈퇴</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// document-text / back-check / heart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  paper: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 4,
  },
  profileContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
  },
  profileImgContainer: {},
  profileImg: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderColor: PALETTE.grey,
    borderWidth: 0.5,
  },
  profileImgIcon: {
    padding: 2,
    position: 'absolute',
    right: -2,
    bottom: 0,
    borderRadius: 30,
    borderColor: PALETTE.grey,
    borderWidth: 0.5,
    backgroundColor: 'white',
  },
  profileInfoContainer: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    paddingVertical: 2,
  },
  profileSubInfo: {
    color: PALETTE.grey,
    paddingVertical: 2,
  },
  profileBtn: {
    borderColor: PALETTE.grey,
    borderWidth: 0.5,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginVertical: 12,
  },
  profileBtnText: { fontWeight: '600' },
  profileList: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  profileListItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  profileListItemIcon: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileListItemText: {
    fontWeight: '700',
    fontSize: 16,
  },
  profileListItemDivider: {
    width: 2,
    height: '20%',
    backgroundColor: PALETTE.grey,
  },
  menuList: {
    backgroundColor: 'white',
  },
  menuListItem: {
    borderBottomColor: PALETTE.grey,
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuListItemText: {
    paddingVertical: 2,
    fontSize: 15,
  },
  menuListItemSubText: {
    color: PALETTE.grey,
    fontSize: 13,
  },
});

export default MyPage;
