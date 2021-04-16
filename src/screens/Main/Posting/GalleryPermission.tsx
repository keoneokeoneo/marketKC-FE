import React, { useLayoutEffect } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { PALETTE } from '../../../constants/color';
import { GalleryPermissionProps } from '../../../types/ScreenProps';

const GalleryPermission = ({ navigation }: GalleryPermissionProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="close-sharp"
            size={26}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </HeaderSide>
      ),
      title: '',
      headerTransparent: true,
    });
  }, [navigation]);

  const onPress = () => {
    Linking.openSettings();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>모든 사진 접근 권한을 허용해주세요</Text>
      <Text style={styles.subTitle}>더 쉽고 편하게 사진을 올릴 수 있어요</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          backgroundColor: PALETTE.bg2,
          paddingVertical: 2,
          paddingHorizontal: 12,
        }}>
        <Text style={{ fontWeight: '500' }}>
          권한 변경 시 앱이 재시작 됩니다.
        </Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.innerBtn}>모든 사진 접근 허용하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: PALETTE.line1,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginVertical: 16,
  },
  btn: {
    backgroundColor: PALETTE.main,
    borderRadius: 8,
    padding: 12,
  },
  innerBtn: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default GalleryPermission;
