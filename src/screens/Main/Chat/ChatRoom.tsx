import React, { useEffect, useLayoutEffect } from 'react';
import {
  ActionSheetIOS,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { ChatRoomProps } from '../../../types/ScreenProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PALETTE } from '../../../constants/color';
import { Controller, useForm } from 'react-hook-form';
import { useKeyboard } from '../../../utils/useKeyboard';
import { IMAGES } from '../../../constants/image';
import io from 'socket.io-client';
import ChatMsg from '../../../components/ChatMsg';

const socket = io.connect('http://localhost:31', {
  jsonp: false,
  transports: ['websocket'],
});

const ChatRoom = ({ navigation, route }: ChatRoomProps) => {
  const { control, handleSubmit, watch, reset } = useForm<{ msg: string }>();
  const [keyboardHeight] = useKeyboard();
  const msgWatch = watch('msg');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="arrow-back-sharp"
            size={26}
            onPress={() => navigation.goBack()}
          />
        </HeaderSide>
      ),
      headerRight: () => (
        <HeaderSide right>
          <PressableIcon
            name="ellipsis-vertical-sharp"
            size={26}
            onPress={openActionSheet}
          />
        </HeaderSide>
      ),
      headerStyle: { backgroundColor: PALETTE.bg1 },
    });
  }, [navigation]);

  const onSubmit = (data: { msg: string }) => {
    socket.emit('test', data.msg, (res: any) => {
      console.log(res);
      reset();
    });
  };

  const openActionSheet = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          '닫기',
          '채팅방 나가기',
          '거래 신청하기',
          '신고하기',
          '알림 해제하기',
          '매너 평가하기',
        ],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
        userInterfaceStyle: 'light',
      },
      index => {
        switch (index) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
          case 5:
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity activeOpacity={1} style={styles.header}>
            <Image
              source={IMAGES.defaultImage}
              style={{
                width: 40,
                height: 40,
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 4,
              }}
            />
            <View
              style={{
                flex: 1,
                paddingHorizontal: 4,
                marginLeft: 6,
              }}>
              <View style={{ flexDirection: 'row', marginVertical: 1 }}>
                <Text style={{ color: PALETTE.line1, fontWeight: 'bold' }}>
                  [거래상태]
                </Text>
                <Text
                  ellipsizeMode="tail"
                  style={{ overflow: 'hidden', width: '70%' }}
                  numberOfLines={
                    1
                  }>{`asdfasdfnasodifnaoisdnfoaisdnfoiasdnfoiasndoifnasoidfnoaisdfnoiadsfnoiasdnofian`}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 1 }}>
                <Text style={{ fontWeight: '700' }}>{`ETH ${0.0001}`}</Text>
                <Text style={{ fontWeight: '500' }}>{`[KRW ${'3,000'}]`}</Text>
              </View>
            </View>
            {/* <TouchableOpacity
              activeOpacity={1}
              onPress={() => {}}
              style={{
                borderColor: PALETTE.grey,
                padding: 8,
                borderWidth: 0.5,
                borderRadius: 4,
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  textAlign: 'center',
                  fontSize: 13,
                }}>{`작성한\n후기 보기`}</Text>
            </TouchableOpacity> */}
          </TouchableOpacity>
          <ScrollView style={styles.content}>
            <ChatMsg isMe={true} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={false} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={false} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={true} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={false} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={true} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={true} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={false} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={true} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={false} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={false} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={true} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={false} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={true} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={true} msg="Text 메세지입니다" date="오후 7:32" />
            <ChatMsg isMe={false} msg="Text 메세지입니다" date="오후 7:32" />
          </ScrollView>
          <View
            style={[
              styles.bottom,
              {
                marginBottom: keyboardHeight,
                paddingBottom:
                  keyboardHeight > 0 ? 0 : Platform.OS === 'ios' ? 24 : 0,
              },
            ]}>
            <View style={styles.bottomContainer}>
              {/* <PressableIcon
                name="add-sharp"
                size={26}
                color={PALETTE.grey}
                mh={6}
                onPress={() => {}}
              /> */}
              <View style={styles.bottomInput}>
                <Controller
                  control={control}
                  name="msg"
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      placeholder="메세지를 입력하세요."
                      placeholderTextColor={PALETTE.grey}
                      style={styles.bottomInputText}
                      value={value}
                      onChangeText={value => onChange(value)}
                      onBlur={onBlur}
                    />
                  )}
                />
              </View>
              <PressableIcon
                name="send-sharp"
                size={21}
                color={
                  msgWatch && msgWatch.length > 0 ? PALETTE.line2 : PALETTE.grey
                }
                mh={6}
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.bg1,
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgb(216,216,216)',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: { flex: 1, backgroundColor: 'white', padding: 12 },
  bottom: {
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  bottomContainer: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'center',
  },
  bottomInput: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  bottomInputText: { paddingLeft: 0, paddingTop: 0, fontSize: 16 },
  bottomBtn: {},
});

export default ChatRoom;
