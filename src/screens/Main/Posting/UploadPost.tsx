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
  TouchableWithoutFeedback,
  Keyboard,
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
import { check, PERMISSIONS, request } from 'react-native-permissions';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import NoticeModal from '../../../components/Modal/NoticeModal';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostingSchema } from '../../../constants/schema';

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
    getValues,
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
  const [assets, setAssets] = useState<ImageType[]>([]);
  const [permission, setPermission] = useState(false);
  const [noticeModal, setNoticeModal] = useState({
    open: false,
    content: '',
  });
  const postingState = useSelector((state: RootState) => state.posting);

  const onSubmit = (data: FormInput) => {
    console.log(data);
  };

  const onRemove = (id: string) => {
    setAssets(prev => prev.filter(asset => asset.path !== id));
  };

  const getPermission = async (index: number) => {
    let permissionName;
    permissionName =
      index === 1 ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.IOS.CAMERA;
    const result = await check(permissionName);

    if (result) {
      // 이미 승인된 상태
      setPermission(true);
    } else {
      const status = await request(permissionName);
      if (status === 'granted') {
        // 요청해서 승인한 상태
        setPermission(true);
      } else {
        // 요청해서 거절된 상태
        setPermission(false);
      }
    }
  };

  useEffect(() => {
    const test = () => {
      if (errors.postTitle || errors.postContent || errors.postCategoryID) {
        let msg = '';
        if (errors.postTitle) msg += `- ${errors.postTitle.message}\n`;
        if (errors.postContent) msg += `- ${errors.postContent.message}\n`;
        if (errors.postCategoryID)
          msg += `- ${errors.postCategoryID.message}\n`;
        setNoticeModal({ open: true, content: msg });
      }
    };
    if (isSubmitting) test();
  }, [
    isSubmitting,
    errors.postTitle,
    errors.postContent,
    errors.postCategoryID,
  ]);

  const openAssetPicker = () => {
    if (assets.length === 5) {
      setNoticeModal({
        open: true,
        content: '사진은 최대 5장까지 첨부할 수 있습니다.',
      });
      return;
    }
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['닫기', '앨범에서 선택', '사진 촬영하기'],
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          // 앨범에서 선택
          getPermission(buttonIndex);
          if (permission) {
            ImagePicker.openPicker({
              mediaType: 'photo',
              multiple: true,
              //cropping: true,
            })
              .then(res => {
                console.log(res);
                setAssets([...assets, ...res]);
              })
              .catch(err => console.log(err));
          }
        } else if (buttonIndex === 2) {
          // 사진 촬영하기
          getPermission(buttonIndex);
          if (permission) {
            ImagePicker.openCamera({ mediaType: 'photo' })
              .then(res => {
                console.log(res);
                setAssets([...assets, res]);
              })
              .catch(err => console.log(err));
          }
        }
      },
    );
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
      reset();
      if (postingState.formData.category.name === '무료나눔') {
        setValue('postPriceN', 0);
        setValue('postPriceS', '무료나눔');
      }
      setValue('postCategoryID', postingState.formData.category.id);
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
            <Text style={styles.helper}>
              사진을 선택하시면 대표 이미지를 변경할 수 있습니다
            </Text>
          </View>
          <FlatList
            style={{ paddingVertical: 8 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={
              <SelectImgButton
                maximumCount={5}
                currentCount={assets.length}
                onPress={openAssetPicker}
              />
            }
            data={assets}
            keyExtractor={item => item.path}
            renderItem={({ item }) => (
              <SelectedImgButton
                data={item}
                //isCover={item.id === coverID}
                //   onChange={onCoverChange}
                onRemove={onRemove}
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
                //value={ethP}
              />
            </View>
          </View>
          <View
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
          </View>
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
