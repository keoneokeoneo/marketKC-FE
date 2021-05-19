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
import SelectedImgButton from '../../../components/Button/SelectedImgButton';
import { checkMultiple, PERMISSIONS, request } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostingSchema } from '../../../constants/schema';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import Toast from 'react-native-simple-toast';
import { RootState } from '../../../store/reducer';
import {
  LoadedImage,
  PostingData,
  UploadForm,
  ImagePickerRes,
} from '../../../types';
import { savePosting, initPosting } from '../../../store/posting/action';
import {
  uploadImagesThunk,
  uploadPostThunk,
} from '../../../store/posting/thunk';
import { getLibraryPermission } from '../../../utils';
import { getETHThunk } from '../../../store/post/thunk';

interface FormInput {
  title: string;
  content: string;
  categoryID: number;
  categoryName: string;
  priceS: string;
  priceN: number;
  img: number;
  ethS: string;
  ethN: number;
}

const UploadPost = ({ navigation }: UploadPostProps) => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(PostingSchema),
  });
  const dispatch = useDispatch();
  const {
    posting: postingState,
    post: { eth },
  } = useSelector((state: RootState) => state);
  const [keyboardHeight] = useKeyboard();
  const [selectedAssets, setSelectedAssets] = useState<LoadedImage[]>(
    postingState.images.data,
  );

  const save = () => {
    const { content, priceN, title, categoryID, categoryName } = getValues();
    const data: PostingData = {
      images: selectedAssets,
      category: {
        id: categoryID,
        name: categoryName,
      },
      content: content,
      price: priceN,
      title: title,
    };
    dispatch(savePosting(data));
  };

  const onClose = () => {
    save();
    Toast.show('게시글이 임시 저장되었습니다.', Toast.SHORT, [
      'UIAlertController',
    ]);
    navigation.goBack();
  };

  const onSubmit = async (data: FormInput) => {
    const req: UploadForm = {
      title: data.title,
      content: data.content,
      categoryID: data.categoryID,
      price: data.priceN,
    };
    await dispatch(uploadImagesThunk(selectedAssets));
    await dispatch(uploadPostThunk(req));
  };

  const onRemove = useCallback((id: string) => {
    setSelectedAssets(prev => prev.filter(asset => asset.id !== id));
  }, []);

  const openImagePicker = async () => {
    const permission = await getLibraryPermission();
    if (permission === 'unavailable') {
      Alert.alert('이 기기에선 사용이 불가합니다.');
      return;
    } else if (permission === 'blocked') {
      navigation.navigate('GalleryPermission');
      return;
    }
    const res: ImagePickerRes[] = await MultipleImagePicker.openPicker({
      mediaType: 'image',
      selectedColor: PALETTE.main,
      maxSelectedAssets: 5,
      maximumMessage: '최대 5장 까지 선택할 수 있습니다.',
      maximumMessageTitle: '알림',
      selectedAssets: selectedAssets,
    });
    setSelectedAssets(
      res.map(r => ({
        id: r.localIdentifier,
        filename: r.filename,
        mime: r.mime,
        path: r.path,
      })),
    );
    setValue('img', res.length, { shouldValidate: true });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon name="close-sharp" size={26} onPress={onClose} />
        </HeaderSide>
      ),
      headerRight: () => null,
      title: '',
    });
  }, [navigation]);

  useEffect(() => {
    if (postingState.success) {
      dispatch(initPosting());
      navigation.navigate('Home', { screen: 'Feed' });
    }
  }, [postingState.success]);

  useEffect(() => {
    register('categoryID');
    register('priceN');
    register('img');
    register('ethN');
  }, [register]);

  useFocusEffect(
    useCallback(() => {
      clearErrors();
      const {
        form: {
          data: { category, title, content, price },
        },
        images: { data: assets },
      } = postingState;
      setSelectedAssets(assets);
      setValue('title', title);
      setValue('content', content);
      setValue('categoryID', category.id);
      setValue('categoryName', category.name);
      if (category.name === '무료나눔') {
        setValue('priceN', 0);
        setValue('priceS', '무료나눔');
      } else {
        setValue('priceN', price);
      }
      setValue('ethN', price / eth);
      setValue('img', assets.length);
    }, [postingState]),
  );

  return (
    // <TouchableWithoutFeedback
    //   onPress={() => Keyboard.dismiss()}
    //   style={{ flex: 1 }}>
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
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
              <SelectedImgButton data={item} onRemove={onRemove} />
            )}
          />
          {errors.img && <Text style={styles.error}>{errors.img.message}</Text>}
        </View>
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>글 제목</Text>
          </View>
          <View
            style={[styles.textArea, errors.title && { borderColor: 'red' }]}>
            <Controller
              control={control}
              name="title"
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
          {errors.title && (
            <Text style={styles.error}>{errors.title.message}</Text>
          )}
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
              errors.categoryID && { borderColor: 'red' },
            ]}
            onPress={() => {
              navigation.navigate('SelectCategory');
              save();
            }}>
            <Controller
              control={control}
              name="categoryName"
              render={({ field: { value } }) => (
                <TextInput
                  editable={false}
                  placeholder="카테고리 선택"
                  style={styles.textInput}
                  value={value}
                />
              )}
            />
            <Ionicons name="chevron-forward-sharp" size={14} />
          </TouchableOpacity>
          {errors.categoryID && (
            <Text style={styles.error}>{errors.categoryID.message}</Text>
          )}
        </View>
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>판매가격</Text>
            <Text style={styles.helper}>{`1 ETH = ₩ ${numberWithCommas(
              eth,
            )}`}</Text>
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
                name="priceS"
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="판매 금액"
                    style={styles.textInput}
                    value={value}
                    editable={
                      postingState.form.data.category.name === '무료나눔'
                        ? false
                        : true
                    }
                    keyboardType="numeric"
                    onChangeText={value => {
                      setValue('priceN', Number(inputFormatter(value)));
                      onChange(numberWithCommas(inputFormatter(value)));
                      const formatted = inputFormatter(value);
                      const tmp = (Number(formatted) / eth)
                        .toFixed(8)
                        .toString();
                      setValue('ethS', tmp);
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
              <Controller
                control={control}
                name="ethS"
                defaultValue=""
                render={({ field: { value } }) => (
                  <TextInput
                    editable={false}
                    placeholder="ETH"
                    style={styles.textInput}
                    value={value}
                  />
                )}
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
                dispatch(getETHThunk());
              }}
            />
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>상품 설명</Text>
          </View>
          <View
            style={[styles.textArea, errors.content && { borderColor: 'red' }]}>
            <Controller
              control={control}
              name="content"
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
          {errors.content && (
            <Text style={styles.error}>{errors.content.message}</Text>
          )}
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
