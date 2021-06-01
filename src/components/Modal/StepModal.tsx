import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { PALETTE } from '../../constants/color';
import { IMAGES } from '../../constants/image';
import { GetTradeRes } from '../../utils/api/trade/types';

export type StepModalProp = {
  stage: 'Init' | 'Waiting' | 'Done' | 'Rejected';
  tmp: GetTradeRes;
  data: {
    name: string;
    id: string;
    addr: string;
  }[];
};

type IProps = {
  isOpen: boolean;
  onClose: () => void;
  data: StepModalProp;
  userID: string;
  func1: (req: GetTradeRes) => Promise<void>;
  func2: (req: GetTradeRes) => Promise<void>;
  func3: (req: GetTradeRes) => Promise<void>;
};

const StepModal = ({
  isOpen,
  onClose,
  data,
  userID,
  func1,
  func2,
  func3,
}: IProps) => {
  const [content, setContent] = useState({
    title: '',
    nowAt: '',
    addr: '',
    uri: IMAGES.step1,
  });
  const renderBtns = () => {
    if (data.stage === 'Init') {
      if (data.data[0].id === userID)
        return (
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPress={() => func1(data.tmp)}>
              <Text style={[styles.buttonText]}>거래 진행하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPress={() => func3(data.tmp)}>
              <Text style={[styles.buttonText, { color: '#d34f4f' }]}>
                거래 취소하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPress={onClose}>
              <Text style={[styles.buttonText, { color: 'rgb(160,160,160)' }]}>
                닫기
              </Text>
            </TouchableOpacity>
          </View>
        );
      else
        return (
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPress={() => func3(data.tmp)}>
              <Text style={[styles.buttonText, { color: '#d34f4f' }]}>
                거래 취소하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPress={onClose}>
              <Text style={[styles.buttonText, { color: 'rgb(160,160,160)' }]}>
                닫기
              </Text>
            </TouchableOpacity>
          </View>
        );
    } else if (data.stage === 'Waiting') {
      if (data.data[2].id === userID)
        return (
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPress={() => func2(data.tmp)}>
              <Text style={[styles.buttonText]}>거래 진행하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPress={() => func3(data.tmp)}>
              <Text style={[styles.buttonText, { color: '#d34f4f' }]}>
                거래 취소하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPress={onClose}>
              <Text style={[styles.buttonText, { color: 'rgb(160,160,160)' }]}>
                닫기
              </Text>
            </TouchableOpacity>
          </View>
        );
      else
        return (
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPress={onClose}>
              <Text style={[styles.buttonText, { color: '#d34f4f' }]}>
                거래 취소하기
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={1}
              onPress={onClose}>
              <Text style={[styles.buttonText, { color: 'rgb(160,160,160)' }]}>
                닫기
              </Text>
            </TouchableOpacity>
          </View>
        );
    } else {
      return (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={1}
          onPress={onClose}>
          <Text style={[styles.buttonText, { color: 'rgb(160,160,160)' }]}>
            닫기
          </Text>
        </TouchableOpacity>
      );
    }
  };
  useEffect(() => {
    if (data.stage === 'Init') {
      setContent({
        title: '구매자의 입금을 기다리는 중입니다...',
        nowAt: data.data[0].name,
        addr: data.data[0].addr,
        uri: IMAGES.step1,
      });
    } else if (data.stage === 'Waiting') {
      setContent({
        title: '거래가 진행중입니다...',
        nowAt: data.data[1].name,
        addr: data.data[1].addr,
        uri: IMAGES.step2,
      });
    } else if (data.stage === 'Done') {
      setContent({
        title: '거래가 정상적으로 끝났습니다.',
        nowAt: data.data[2].name,
        addr: data.data[2].addr,
        uri: IMAGES.step3,
      });
    } else {
      setContent({
        title: '거래가 불발되었습니다.',
        nowAt: data.data[2].name,
        addr: data.data[2].addr,
        uri: IMAGES.step3,
      });
    }
  }, [data]);

  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={content.uri} style={styles.img} resizeMode="contain" />
          <Text style={styles.title}>{content.title}</Text>
        </View>
        {renderBtns()}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 12,
  },
  content: { marginBottom: 20, justifyContent: 'center', alignItems: 'center' },
  img: {
    width: 160,
    height: 80,
    marginVertical: 20,
  },
  title: {
    marginVertical: 8,
    fontWeight: '500',
    fontSize: 16,
  },
  btnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderColor: PALETTE.border,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    marginVertical: 4,
  },
  buttonText: {
    fontSize: 15,
    color: PALETTE.main,
    fontWeight: 'bold',
  },
});

export default StepModal;
