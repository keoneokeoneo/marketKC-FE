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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { socket } from '../../../../App';
import { getPostThunk } from '../../../store/post/thunk';
import axios from 'axios';
import { numberWithCommas } from '../../../utils';
import Toast from 'react-native-simple-toast';

export interface MsgRes {
  time: string;
  msg: string;
  senderID: string;
}

interface PostRes {
  title: string;
  price: number;
  img: string;
}
interface MsgReq {
  msg: string;
  senderID: string;
  chatID: number;
  postID: number;
  receiverID: string;
}

const ChatRoom = ({ navigation, route }: ChatRoomProps) => {
  const { control, handleSubmit, watch, reset } = useForm<{ msg: string }>();
  const [messages, setMessages] = useState<MsgRes[]>([]);
  const [keyboardHeight] = useKeyboard();
  const { id } = route.params;
  const msgWatch = watch('msg');
  const rootState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

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
      title: '채팅',
      // title: rootState.post.post.data
      //   ? rootState.post.post.data.user.name
      //   : '로딩중',
    });
  }, [navigation]);

  useEffect(() => {
    socket.on(
      'msgToClient',
      (res: { sender: string; msg: string; chatroomID: number }) => {
        console.log('received data : ', res);
        if (id !== res.chatroomID) navigation.setParams({ id: res.chatroomID });
        //setMessages(prev => [...prev, res]);
        Toast.show(`${res.sender}님의 메세지 : ${res.msg}`, Toast.SHORT, [
          'UIAlertController',
        ]);
      },
    );
  }, []);

  const onSubmit = (data: { msg: string }) => {
    if (rootState.post.post.data) {
      const {
        id: postID,
        user: { id: receiverID },
      } = rootState.post.post.data;
      const { id: senderID } = rootState.user.user.data;
      const req: MsgReq = {
        msg: data.msg,
        postID: postID,
        chatID: id,
        receiverID: receiverID,
        senderID: senderID,
      };
      socket.emit('msgToServer', req);
      reset();
    }
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
  const renderHeader = () => {
    return (
      <View>
        {rootState.post.post.data && (
          <TouchableOpacity activeOpacity={1} style={styles.header}>
            <Image
              source={{ uri: rootState.post.post.data.postImgs[0].url }}
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
                {/* <Text style={{ color: PALETTE.line1, fontWeight: 'bold' }}>
                  [거래상태]
                </Text> */}
                <Text
                  ellipsizeMode="tail"
                  style={{ overflow: 'hidden', width: '70%' }}
                  numberOfLines={1}>
                  {rootState.post.post.data.title}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginVertical: 1 }}>
                <Text style={{ fontWeight: '700' }}>{`ETH ${0.0001}`}</Text>
                <Text style={{ fontWeight: '500' }}>{`[KRW ${numberWithCommas(
                  rootState.post.post.data.price,
                )}]`}</Text>
              </View>
            </View>
            <TouchableOpacity
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
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.content}>
          {messages.length > 0 ? (
            <FlatList
              data={messages}
              contentContainerStyle={{ backgroundColor: 'white' }}
              renderItem={({ item }) => (
                <ChatMsg
                  isMe={item.senderID === rootState.user.user.data.id}
                  msg={item.msg}
                  date={item.time}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>No Data</Text>
            </View>
          )}
        </View>

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
