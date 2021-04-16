import CameraRoll, { Album } from '@react-native-community/cameraroll';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { requestLoadAlbums } from '../../../store/actions/postingAction';
import { RootState } from '../../../store/reducers';
import { ImagePickerProps } from '../../../types/ScreenProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NoticeModal from '../../../components/Modal/NoticeModal';

const ImagePicker = ({ navigation }: ImagePickerProps) => {
  const dispatch = useDispatch();
  const postingState = useSelector((state: RootState) => state.posting);
  const [pickerMode, setPickerMode] = useState(false);
  const [alertOn, setAlertOn] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(
    postingState.albums.find(album => album.title === '최근 항목'),
  );

  useEffect(() => {
    dispatch(requestLoadAlbums());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="arrow-back-sharp"
            size={26}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </HeaderSide>
      ),
      headerRight: () => null,
      title: '사진 등록',
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <NoticeModal isOpen={alertOn} onClose /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 12,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={1}
          onPress={() => setPickerMode(prev => !prev)}>
          <Text>{currentAlbum?.title}</Text>
          <Ionicons name="chevron-down-sharp" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>0</Text>
          <Text>/10</Text>
          <PressableIcon name="help-circle" onPress={() => setAlertOn(true)} />
        </View>
      </View>
    </View>
  );
};

export default ImagePicker;
