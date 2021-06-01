import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import Indicator from '../../../components/Indicator';
import PressableIcon from '../../../components/PressableIcon';
import ProfileBox from '../../../components/ProfileBox';
import { PALETTE } from '../../../constants/color';
import { UserProfileProps } from '../../../types/ScreenProps';
import { userAPI } from '../../../utils/api';
import { LoadUserRes } from '../../../utils/api/user/types';
import Ionicons from 'react-native-vector-icons/Ionicons';

const UserProfile = ({ route, navigation }: UserProfileProps) => {
  const currentUserID = route.params.userID;
  const [userData, setUserData] = useState<LoadUserRes | null>(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const res = await userAPI.loadUserByID(currentUserID);
      if (res.status === 200) {
        console.log(res.data);
        setLoading(false);
        setUserData(res.data);
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  const onRefresh = () => {
    getData();
  };

  useEffect(() => {
    onRefresh();

    return () => navigation.setParams({ userID: null });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로필',
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="arrow-back-sharp"
            size={26}
            onPress={() => navigation.navigate('MyPage')}
          />
        </HeaderSide>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Indicator isActive={loading} />
      {userData ? (
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }>
          <ProfileBox
            name={userData.name}
            info={`#${userData.id.split('-')[0]}`}
            url={userData.profileImgUrl}
          />
          <Text style={styles.date}>{`${new Date(
            userData.createdAt,
          ).toLocaleDateString()}에 가입했어요!`}</Text>
          <View>
            <TouchableOpacity
              style={styles.item}
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('SellList', { userID: userData.id })
              }>
              <Text style={styles.itemText}>판매내역</Text>
              <Ionicons name="chevron-forward" style={styles.itemText} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('TXList', { userID: userData.id })
              }>
              <Text style={styles.itemText}>트랜잭션</Text>
              <Ionicons name="chevron-forward" style={styles.itemText} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              activeOpacity={1}
              onPress={() =>
                navigation.navigate('TradeList', { userID: userData.id })
              }>
              <Text style={styles.itemText}>거래내역</Text>
              <Ionicons name="chevron-forward" style={styles.itemText} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>
            해당 유저가 존재하지 않아요 ㅠㅠ
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  date: {
    padding: 16,
    fontWeight: '500',
    fontSize: 15,
    backgroundColor: PALETTE.border,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(216,216,216)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: { fontSize: 18, fontWeight: '500' },
  noData: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noDataText: { fontSize: 18, fontWeight: 'bold' },
});

export default UserProfile;
