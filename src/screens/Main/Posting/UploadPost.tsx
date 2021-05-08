import { useFocusEffect } from '@react-navigation/core';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActionSheetIOS,
  Image,
  Alert,
} from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { PALETTE } from '../../../constants/color';
import { UploadPostProps } from '../../../types/ScreenProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IMAGES } from '../../../constants/image';
import { inputFormatter, numberWithCommas } from '../../../utils';
import { useKeyboard } from '../../../utils/useKeyboard';
import { SelectImgButton } from '../../../components/Button/SelectImgButton';
import ImagePicker, {
  Image as ImageType,
} from 'react-native-image-crop-picker';
import SelectedImgButton from '../../../components/Button/SelectedImgButton';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  request,
} from 'react-native-permissions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import NoticeModal from '../../../components/Modal/NoticeModal';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostingSchema } from '../../../constants/schema';
import {
  ACCESS_KEY_ID,
  BUCKET_NAME,
  BUCKET_REGION,
  SECRET_ACCESS_KEY,
} from '../../../config';
import S3 from 'aws-sdk/clients/s3';
import { v4 as uuid } from 'uuid';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import { ImagePickerRes } from '../../../types';

interface FormInput {
  postTitle: string;
  postContent: string;
  postCategoryID: number;
  postPriceS: string;
  postPriceN: number;
}

const UploadPost = ({ navigation }: UploadPostProps) => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    resolver: yupResolver(PostingSchema),
    defaultValues: {
      postTitle: '',
      postContent: '',
      postPriceN: 0,
      postPriceS: '0',
    },
  });
  const [keyboardHeight] = useKeyboard();
  const [selectedAssets, setSelectedAssets] = useState<ImagePickerRes[]>([]);
  const [cover, setCover] = useState('');
  const [assets, setAssets] = useState<ImageType[]>([]);
  const [permission, setPermission] = useState(false);
  const [noticeModal, setNoticeModal] = useState({
    open: false,
    content: '',
  });
  const postingState = useSelector((state: RootState) => state.posting);
  const watchFields = watch(['']);

  const onSubmit = (data: FormInput) => {
    console.log(data, assets.length);

    if (assets.length > 0) {
      assets.map(asset => uploadToS3(asset));
    }
  };

  const uploadToS3 = async (file: ImageType) => {
    const response = await fetch(file.path);
    const blob = await response.blob();

    const client = new S3({
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
      region: BUCKET_REGION,
      signatureVersion: 'v4',
    });

    const newID = uuid();

    const params = {
      Bucket: BUCKET_NAME + '/postImgs',
      Key: `${newID}.${file.path.split('.')[1]}`,
      Body: blob,
      ContentType: file.mime,
      ACL: 'public-read',
    };

    client.upload(
      params,
      (err: globalThis.Error, data: S3.ManagedUpload.SendData) => {
        if (err) console.log('에러 발생 : ', err);
        else console.log('성공 : ', data);
      },
    );
  };

  const onRemove = useCallback((id: string) => {
    if (id === cover) {
      console.log('delete cover');
      if (selectedAssets.length === 1) setCover('');
      else {
        setCover(selectedAssets[0].localIdentifier);
      }
    }
    setSelectedAssets(prev =>
      prev.filter(asset => asset.localIdentifier !== id),
    );
  }, []);

  const onCoverChange = useCallback((id: string) => {
    setCover(id);
  }, []);

  const getPermission = async () => {
    const checkPermissionsResult = await checkMultiple([
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
    ]);

    // let permissions = {
    //   camera:false,
    //   gallery:false
    // }

    switch (checkPermissionsResult['ios.permission.PHOTO_LIBRARY']) {
      case 'granted':
        console.log('앨범 권한 check : granted');
        break;
      case 'unavailable':
        Alert.alert('이 기기에서 앨범 사용이 불가합니다');
        break;
      case 'blocked':
        console.log('앨범 권한 check : blocked');
        break;
      case 'denied':
        console.log('앨범 권한 요청');
        const requestGalleryPermission = await request(
          PERMISSIONS.IOS.PHOTO_LIBRARY,
        );
        if (requestGalleryPermission === 'granted')
          console.log('앨범 권한 request : granted');
        else console.log('앨범 권한 request : blocked');
        break;
    }
    switch (checkPermissionsResult['ios.permission.CAMERA']) {
      case 'granted':
        console.log('카메라 권한 check : granted');
        break;
      case 'unavailable':
        Alert.alert('이 기기에서 카메라 사용이 불가합니다');
        break;
      case 'blocked':
        console.log('카메라 권한 check : blocked');
        break;
      case 'denied':
        console.log('카메라 권한 요청');
        const requestCameraPermission = await request(PERMISSIONS.IOS.CAMERA);
        if (requestCameraPermission === 'granted')
          console.log('카메라 권한 request : granted');
        else console.log('카메라 권한 request : blocked');
        break;
    }
  };

  // const getPermission = async (index: number) => {
  //   let permissionName;
  //   permissionName =
  //     index === 1 ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.IOS.CAMERA;
  //   const result = await check(permissionName);

  //   if (result) {
  //     // 이미 승인된 상태
  //     setPermission(true);
  //   } else {
  //     const status = await request(permissionName);
  //     if (status === 'granted') {
  //       // 요청해서 승인한 상태
  //       setPermission(true);
  //     } else {
  //       // 요청해서 거절된 상태
  //       setPermission(false);
  //     }
  //   }
  // };

  const openImagePicker = async () => {
    getPermission();
    // const res: ImagePickerRes[] = await MultipleImagePicker.openPicker({
    //   mediaType: 'image',
    //   selectedColor: PALETTE.main,
    //   maxSelectedAssets: 5,
    //   maximumMessage: '최대 5장 까지 선택할 수 있습니다.',
    //   maximumMessageTitle: '알림',
    // });
    // console.log(res);
    // setSelectedAssets(res);
    // if (cover === '' && res.length > 0) {
    //   setCover(res[0].localIdentifier);
    // }
  };

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
      headerRight: () => null,
      title: '',
    });
  }, [navigation]);

  useEffect(() => {
    register('postCategoryID');
    register('postPriceN');
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (postingState.formData.category.categoryName === '무료나눔') {
        setValue('postPriceN', 0);
        setValue('postPriceS', '무료나눔');
      }
      setValue('postCategoryID', postingState.formData.category.categoryID);
    }, [postingState]),
  );

  return (
    // <TouchableWithoutFeedback
    //   onPress={() => Keyboard.dismiss()}
    //   style={{ flex: 1 }}>
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <NoticeModal
          isOpen={noticeModal.open}
          content={noticeModal.content}
          onClose={() => setNoticeModal({ open: false, content: '' })}
        />
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>사진</Text>
          </View>
          <FlatList
            style={{ paddingVertical: 8 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
              <SelectImgButton
                maximumCount={5}
                currentCount={selectedAssets.length}
                onPress={openImagePicker}
              />
            }
            data={selectedAssets}
            keyExtractor={item => item.path}
            renderItem={({ item }) => (
              <SelectedImgButton
                data={item}
                onRemove={onRemove}
                isCover={item.localIdentifier === cover}
                onCoverChange={onCoverChange}
              />
            )}
          />
        </View>
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>글 제목</Text>
          </View>
          <View style={styles.textArea}>
            <Controller
              control={control}
              name="postTitle"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="글 제목"
                  style={styles.textInput}
                  value={value}
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>카테고리</Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.textArea,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}
            onPress={() => navigation.navigate('SelectCategory')}>
            <TextInput
              editable={false}
              placeholder="카테고리 선택"
              style={styles.textInput}
              value={postingState.formData.category.name}
            />

            <Ionicons name="chevron-forward-sharp" size={14} />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>판매가격</Text>
            {/* <Text style={styles.helper}>{`1 ETH = ₩ ${numberWithCommas(
                ETH,
              )}`}</Text> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={[
                styles.textArea,
                {
                  flex: 1,
                  marginRight: 4,
                  flexDirection: 'row',
                  paddingHorizontal: 0,
                },
              ]}>
              <Text
                style={{
                  alignSelf: 'center',
                  marginHorizontal: 8,
                }}>
                ₩
              </Text>
              <Controller
                control={control}
                name="postPriceS"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="판매 금액"
                    style={styles.textInput}
                    value={value}
                    editable={
                      postingState.formData.category.name === '무료나눔'
                        ? false
                        : true
                    }
                    keyboardType="numeric"
                    onChangeText={value => {
                      setValue('postPriceN', Number(inputFormatter(value)));
                      onChange(numberWithCommas(inputFormatter(value)));
                      //const formatted = inputFormatter(value);
                      // const eth = (Number(formatted) / ETH)
                      //   .toFixed(8)
                      //   .toString();
                      // setEthP(eth);
                      //onChange(numberWithCommas(value));
                      //onChange(value);
                    }}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
            <View
              style={[
                styles.textArea,
                {
                  flex: 1,
                  marginLeft: 4,
                  flexDirection: 'row',
                  paddingHorizontal: 0,
                  alignItems: 'center',
                },
              ]}>
              <Image
                source={IMAGES.ethLogo}
                style={{ width: 20, height: 20 }}
              />
              <TextInput
                editable={false}
                placeholder="ETH"
                style={styles.textInput}
                value={'0.0011'}
              />
            </View>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Text>{'1분 전 갱신'}</Text>
            <PressableIcon
              size={24}
              name="refresh-circle-outline"
              onPress={() => {
                //getData();
              }}
            />
          </View> */}
        </View>
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>상품 설명</Text>
          </View>
          <View style={[styles.textArea]}>
            <Controller
              control={control}
              name="postContent"
              defaultValue=""
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  multiline
                  placeholder="사이즈, 색상, 사용감, 사용기간, 보증기간 등 상세한 상품정보를 입력하면 더욱 수월하게 거래할 수 있습니다."
                  style={[styles.textInput, { height: 100 }]}
                  value={value}
                  onChangeText={value => onChange(value)}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          styles.bottomContainer,
          {
            marginBottom: keyboardHeight,
            paddingBottom:
              keyboardHeight > 0 ? 0 : Platform.OS === 'ios' ? 24 : 0,
          },
        ]}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.bottomButtonText}>등록완료</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    // </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  section: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    marginVertical: 4,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  label: {
    fontSize: 18,
    fontWeight: '800',
    marginVertical: 4,
  },
  error: { color: 'red', fontSize: 12 },
  helper: {
    fontSize: 12,
    color: PALETTE.line1,
    marginLeft: 8,
  },
  textArea: {
    marginVertical: 4,
    marginTop: 8,
    borderColor: PALETTE.line1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  textInput: {
    fontSize: 15,
  },
  bottomContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'white',
  },
  bottomButton: {
    backgroundColor: PALETTE.main,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default UploadPost;
