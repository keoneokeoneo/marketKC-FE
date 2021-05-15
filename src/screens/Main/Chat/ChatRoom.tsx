import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActionSheetIOS,
  FlatList,
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
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { socket } from '../../../../App';

export interface MsgRes {
  time: string;
  msg: string;
  senderID: string;
}

const ChatRoom = ({ navigation, route }: ChatRoomProps) => {
  const { control, handleSubmit, watch, reset } = useForm<{ msg: string }>();
  const [messages, setMessages] = useState<MsgRes[]>([]);
  const [keyboardHeight] = useKeyboard();
  const msgWatch = watch('msg');
  const userState = useSelector((state: RootState) => state.user);
  //const uri = 'http://3.36.111.68:3001/market-kc-chat';

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
    });
  }, [navigation]);

  const onSubmit = (data: { msg: string }) => {
    const req = {
      msg: data.msg,
      userID: userState.user.data.id,
    };
    socket.emit('msgToServer', req, (res: MsgRes) => {
      reset();
      setMessages(prev => [...prev, res]);
    });
  };

  useEffect(() => {
    socket.on('msgToClient', (res: MsgRes) => {
      console.log('received data : ', res);
      if (res.senderID !== userState.user.data.id)
        setMessages(prev => [...prev, res]);
    });
  }, []);

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
          <FlatList
            data={messages}
            contentContainerStyle={{ backgroundColor: 'white' }}
            renderItem={({ item }) => (
              <ChatMsg
                isMe={item.senderID === userState.user.data.id}
                msg={item.msg}
                date={item.time}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
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
                size={26}
                color={
                  msgWatch && msgWatch.length > 0 ? PALETTE.main : PALETTE.grey
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
    backgroundColor: 'white',
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
    backgroundColor: 'rgb(235,235,235)',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 14,
    paddingHorizontal: 14,
  },
  bottomInput: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginLeft: 4,
  },
  bottomInputText: { paddingLeft: 0, paddingTop: 0, fontSize: 16 },
  bottomBtn: {},
});

export default ChatRoom;
