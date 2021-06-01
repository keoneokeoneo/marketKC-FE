import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { ChatRoomProps } from '../../../types/ScreenProps';
import { PALETTE } from '../../../constants/color';
import { Controller, useForm } from 'react-hook-form';
import { useKeyboard } from '../../../utils/useKeyboard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { socket } from '../../../../App';
import { ChatMsgRes } from '../../../utils/api/chat/types';
import ChatMessage from '../../../components/ChatMessage';
import ChatHeader from '../../../components/ChatHeader';
import { loadChatThunk } from '../../../store/chat/thunk';
import { LogBox } from 'react-native';

const ChatRoom = ({ navigation, route }: ChatRoomProps) => {
  const { control, handleSubmit, watch, reset } = useForm<{ text: string }>();
  const [keyboardHeight] = useKeyboard();
  const { chatID, postID } = route.params;
  const msgWatch = watch('text');
  const [messages, setMessages] = useState<ChatMsgRes[]>([]);
  const [receiverID, setReceiverID] = useState('');
  const [headerTitle, setHeaderTitle] = useState('');

  const {
    chat: { chat },
    post: { eth },
    user: {
      user: {
        data: { id: userID },
      },
    },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('room created', (res: number) => {
      //navigation.navigate('ChatRoom', { chatID: res, postID: postID });
      navigation.setParams({ chatID: res, postID: postID });
    });
    socket.on('newMsgRes', (res: ChatMsgRes) => {
      setMessages(prev => [...prev, res]);
    });
    socket.on('tradeRequestFail', (res: string) => {
      Alert.alert('거래 요청 실패', res);
    });
    socket.on('tradeRequestSuccess', (res: string) => {
      Alert.alert('거래 요청 성공', res);
    });
  }, []);

  useEffect(() => {
    dispatch(loadChatThunk(chatID, postID));
  }, [chatID, postID]);

  useEffect(() => {
    if (chat.data) {
      // 채팅 정보를 불러왔음
      const {
        data: { buyer, seller, post },
      } = chat;
      if (buyer && seller) {
        // 디비에 있는 채팅방
        setHeaderTitle(userID === buyer.id ? seller.name : buyer.name);
        setReceiverID(userID === buyer.id ? seller.id : buyer.id);
      } else {
        // 디비에 없는 채팅방 - 신설(메세지를 보내는 순간 디비에 저장)
        setHeaderTitle(chat.data.post.seller.name);
        setReceiverID(post.seller.id);
      }
      setMessages(chat.data.msgs);
    }
  }, [chat]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="arrow-back-sharp"
            size={26}
            onPress={() => navigation.navigate('ChatList')}
          />
        </HeaderSide>
      ),
      title: headerTitle,
    });
  }, [navigation, headerTitle]);

  const onSubmit = (data: { text: string }) => {
    const req = {
      text: data.text,
      chatID: chatID,
      postID: postID,
      senderID: userID,
      receiverID: receiverID,
    };
    socket.emit('msgToServer', req);
    reset();
  };

  const onPostClick = useCallback(
    (id: number) => {
      navigation.navigate('Home', { screen: 'Post', params: { id: id } });
    },
    [navigation],
  );

  const onBtnClick = () => {
    if (chat.data) {
      const { status, seller } = chat.data.post;
      if (seller.id !== userID) {
        if (status === '판매중') {
          console.log('거래신청');
          socket.emit('sendTradeRequest', {
            postID: chat.data.post.id,
            chatID: chat.data.id,
            senderID: userID,
            receiverID: seller.id,
          });
        } else if (status === '거래중') {
        } else {
          // 후기작성
        }
      } else {
        if (status === '판매중') {
        } else if (status === '거래중') {
        } else {
          // 후기작성
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {chat.data ? (
          <View style={{ flex: 1 }}>
            <ChatHeader
              data={chat.data.post}
              eth={eth}
              onBtnClick={onBtnClick}
              onPostClick={onPostClick}
              btnText={
                chat.data.post.status === '판매중' &&
                chat.data.post.seller.id !== userID
                  ? '거래신청'
                  : undefined
              }
              show={chatID !== -1}
            />
            <FlatList
              scrollIndicatorInsets={{ right: 1 }}
              data={messages}
              contentContainerStyle={{
                backgroundColor: 'white',
                padding: 12,
              }}
              renderItem={({ item }) => (
                <ChatMessage
                  isMe={item.sender.id === userID}
                  msg={item.text}
                  date={item.createdAt}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : chat.error ? (
          <View>
            <Text>{chat.error}</Text>
          </View>
        ) : (
          <View>
            <Text>??</Text>
          </View>
        )}
      </View>
      <View
        style={[
          styles.bottom,
          {
            marginBottom: keyboardHeight,
            paddingBottom: keyboardHeight > 0 ? 0 : 24,
          },
        ]}>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomInput}>
            <Controller
              control={control}
              name="text"
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: { flex: 1, backgroundColor: 'white' },
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
