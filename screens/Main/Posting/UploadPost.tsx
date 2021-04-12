import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useLayoutEffect, useState } from 'react';
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
  Image,
  FlatList,
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
import CameraRoll from '@react-native-community/cameraroll';
import SelectedImgButton, {
  Test,
} from '../../../components/Button/SelectedImgButton';
import { check, PERMISSIONS, request } from 'react-native-permissions';

interface FormInput {}

const UploadPost = ({ navigation }: UploadPostProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>();
  const [keyboardHeight] = useKeyboard();
  const [assets, setAssets] = useState<Test[]>([]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const openAssetPicker = async () => {
    console.log('aa');
    const permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    const result = await check(permission);

    if (result) {
      console.log('이미 승인됨');
      navigation.navigate('ImagePicker');
    }

    const status = await request(permission);
    if (status === 'granted') {
      console.log('승인됨');
      navigation.navigate('ImagePicker');
    } else {
      navigation.navigate('GalleryPermission');
    }
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

  useFocusEffect(
    useCallback(() => {
      reset();
    }, []),
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
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
                  maximumCount={10}
                  currentCount={assets.length}
                  onPress={openAssetPicker}
                />
              }
              data={assets}
              keyExtractor={item => item.uri}
              renderItem={({ item }) => (
                <SelectedImgButton
                  data={item}
                  //isCover={item.id === coverID}
                  //   onChange={onCoverChange}
                  //   onRemove={onRemoveAsset}
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
                name={'postTitle'.toString()}
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
              style={[
                styles.textArea,
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                },
              ]}
              //onPress={selectCategory}
            >
              <TextInput
                editable={false}
                placeholder="카테고리 선택"
                style={styles.textInput}
                //value={category.title}
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
                  name="price"
                  defaultValue=""
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="판매 금액"
                      style={styles.textInput}
                      value={value}
                      keyboardType="numeric"
                      onChangeText={value => {
                        // const formatted = inputFormatter(value);
                        // const eth = (Number(formatted) / ETH)
                        //   .toFixed(8)
                        //   .toString();
                        // setEthP(eth);
                        //onChange(numberWithCommas(formatted));
                        onChange(value);
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
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.bg2,
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
