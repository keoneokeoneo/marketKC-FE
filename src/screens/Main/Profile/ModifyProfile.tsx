import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  ActionSheetIOS,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { RootState } from '../../../store/reducer';
import { ModifyProfileProps } from '../../../types/ScreenProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PALETTE } from '../../../constants/color';
import { useKeyboard } from '../../../utils/useKeyboard';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileSchema } from '../../../constants/schema';
import { ImagePickerRes, LoadedImage } from '../../../types';
import { getLibraryPermission } from '../../../utils';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

interface FormData {
  name: string;
}

const ModifyProfile = ({ navigation }: ModifyProfileProps) => {
  const userState = useSelector((state: RootState) => state.user);
  const [img, setImg] = useState<LoadedImage[]>([]);
  const [keyboardHeight] = useKeyboard();
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    getValues,
  } = useForm<FormData>({
    resolver: yupResolver(ProfileSchema),
    mode: 'onChange',
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '프로필 수정',
      headerLeft: () => (
        <HeaderSide>
          <PressableIcon
            name="close-sharp"
            size={26}
            onPress={() => navigation.goBack()}
          />
        </HeaderSide>
      ),
    });
  }, [navigation]);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  const openPicker = async () => {
    const permission = await getLibraryPermission();
    if (permission === 'unavailable')
      return Alert.alert('이 기기에서 사용이 불가합니다.');
    else if (permission === 'blocked')
      return navigation.navigate('Posting', { screen: 'GalleryPermission' });

    const res: ImagePickerRes[] = await MultipleImagePicker.openPicker({
      mediaType: 'image',
      selectedColor: PALETTE.main,
      maxSelectedAssets: 1,
      maximumMessage: '이미지는 최대 1장까지 첨부할 수 있습니다',
      selectedAssets: img,
    });
    setImg(
      res.map(data => ({
        id: data.localIdentifier,
        filename: data.filename,
        mime: data.mime,
        path: data.path,
      })),
    );
  };
  const onClick = () => {
    if (img.length > 0) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['닫기', '앨범에서 선택'],
          cancelButtonIndex: 0,
        },
        index => {
          if (index === 1) {
            //앨범에서 선택
            openPicker();
          }
        },
      );
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['닫기', '앨범에서 선택', '프로필 사진 삭제'],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 2,
        },
        index => {
          if (index === 1) {
            //앨범에서 선택
            openPicker();
          } else if (index === 2) {
            //프로필 사진 삭제
            setImg([]);
          }
        },
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={styles.imgContainer}
          activeOpacity={1}
          onPress={onClick}>
          <Image
            style={styles.img}
            source={{ uri: userState.user.data.profileImgUrl }}
          />
          <View style={styles.icon}>
            <Ionicons name="camera" size={18} />
          </View>
        </TouchableOpacity>
        <Controller
          control={control}
          name="name"
          defaultValue={userState.user.data.name}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              style={[styles.textInput, errors.name && { borderColor: 'red' }]}
              value={value}
              onChangeText={value => onChange(value)}
              onBlur={onBlur}
              placeholder="닉네임을 입력해주세요"
            />
          )}
        />
        <Text style={styles.error}>
          {errors.name ? errors.name.message : ''}
        </Text>
      </View>
      <View style={{ flex: 2 }} />
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleSubmit(onSubmit)}
        style={[
          styles.bottom,
          keyboardHeight > 0
            ? { marginBottom: keyboardHeight }
            : { paddingBottom: 24 },
        ]}>
        <Text style={styles.bottomText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  imgContainer: { flexDirection: 'row', marginBottom: 12 },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: 'rgb(216,216,216)',
    borderWidth: 0.5,
    backgroundColor: PALETTE.grey,
  },
  icon: {
    padding: 4,
    backgroundColor: 'white',
    borderColor: 'rgb(216,216,216)',
    borderWidth: 0.5,
    borderRadius: 100,
    position: 'absolute',
    bottom: 0,
    right: 2,
  },
  textInput: {
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 0.5,
    width: '100%',
    padding: 8,
    textAlign: 'center',
    fontSize: 18,
  },
  error: { color: 'red', marginTop: 4 },
  bottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
    backgroundColor: PALETTE.grey,
  },
  bottomText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ModifyProfile;
