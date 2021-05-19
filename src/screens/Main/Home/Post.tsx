import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { PALETTE } from '../../../constants/color';
import { IMAGES } from '../../../constants/image';
import { RootState } from '../../../store/reducer';
import { getETHThunk, getPostThunk } from '../../../store/post/thunk';
import { PostProps } from '../../../types/ScreenProps';
import { numberWithCommas } from '../../../utils';
import { SliderBox } from 'react-native-image-slider-box';
import { socket } from '../../../../App';

interface SocketReq {
  sellerID: string;
  userID: string;
  postID: number;
}

const Post = ({ navigation, route }: PostProps) => {
  const { height: windowHeight } = Dimensions.get('window');
  const sliderHeight = (windowHeight - 84) / 2;
  const postID = route.params.id;
  const dispatch = useDispatch();
  const {
    post: { post, eth },
    user: {
      user: {
        data: { id: userID },
      },
    },
  } = useSelector((state: RootState) => state);

  const getData = async () => {
    dispatch(getPostThunk(postID));
    dispatch(getETHThunk());
  };

  const createChat = () => {
    if (post.data !== null) {
      const {
        seller: { id: sellerID },
      } = post.data;
      const data: SocketReq = {
        postID: postID,
        sellerID: sellerID,
        userID: userID,
      };
      console.log(data);
      socket.emit('requestNewRoom', data, (res: number) =>
        navigation.navigate('Chat', {
          screen: 'ChatRoom',
          params: { chatID: res, postID: postID },
        }),
      );
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="arrow-back"
            size={26}
            mh={4}
            opacity={0.8}
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
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {post.data ? (
        <View style={{ flex: 1 }}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={post.loading} onRefresh={getData} />
            }>
            <View style={{ width: '100%', height: sliderHeight }}>
              <SliderBox
                images={post.data.postImgs.map(img => {
                  return img.url;
                })}
                sliderBoxHeight={sliderHeight}
              />
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {}}
                style={styles.profileWrapper}>
                <View style={styles.profileLeft}>
                  <Image
                    source={IMAGES.defaultUserImage}
                    style={styles.profileThumbnail}
                  />
                  <View style={styles.profileTextWrapper}>
                    <Text style={styles.profileTextP}>
                      {post.data.seller.name}
                    </Text>
                    <Text style={styles.profileTextS}>
                      {post.data.location}
                    </Text>
                  </View>
                </View>
                <View style={styles.profileRight}>
                  <View>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="star" style={styles.profileRate} />
                      <Text style={styles.profileRate}>4.7</Text>
                      <Text
                        style={{ marginHorizontal: 2, color: PALETTE.line1 }}>
                        /
                      </Text>
                      <Text style={{ color: PALETTE.line1 }}>5.0</Text>
                      <Text style={{ marginHorizontal: 2 }}>{`(${1})`}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              {/* <Divider /> */}

              <View style={styles.contentWrapper}>
                <View style={styles.contentTitle}>
                  <Text style={styles.contentTitleText}>{post.data.title}</Text>
                </View>
                <View style={styles.contentInfo}>
                  <Text style={styles.contentInfoText}>
                    {post.data.categoryName}
                  </Text>
                  <Text style={styles.contentInfoText}>·</Text>
                  <Text style={styles.contentInfoText}>
                    {post.data.updatedAt}
                  </Text>
                  <Text style={styles.contentInfoText}>·</Text>
                  <Ionicons name="eye-outline" style={styles.contentInfoText} />
                  <Text style={[styles.contentInfoText]}>
                    {post.data.views}
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={[styles.contentText]}>{post.data.content}</Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View style={styles.bottomBarContainer}>
            <View style={styles.bottomBar}>
              <View style={styles.bottomBarLeft}>
                <View style={styles.priceWrapper}>
                  <Text style={[styles.priceText]}>{`ETH ${(
                    post.data.price / eth
                  )
                    .toFixed(6)
                    .toString()}`}</Text>
                  <Text style={{}}>{`KRW ${numberWithCommas(
                    post.data.price,
                  )}`}</Text>
                </View>
              </View>
              <View style={styles.bottomBarRight}>
                {post.data.seller.id !== userID ? (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={createChat}
                    style={styles.button}>
                    <Text style={styles.buttonText}>판매자와 대화</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate('Chat', { screen: 'ChatList' })
                    }
                    style={styles.button}>
                    <Text style={styles.buttonText}>{`채팅 목록 보기`}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Text>no data</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF', flex: 1 },
  profileWrapper: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    borderBottomColor: 'rgb(216,216,216)',
    borderBottomWidth: 0.5,
  },
  profileLeft: {
    flexDirection: 'row',
  },
  profileRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PALETTE.main,
    marginHorizontal: 1,
  },
  profileThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#c0c0c0',
    marginHorizontal: 4,
  },
  profileTextWrapper: {
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  profileTextP: {
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 1,
  },
  profileTextS: {
    fontSize: 12,
    fontWeight: '400',
    marginVertical: 1,
  },
  contentWrapper: {
    marginVertical: 4,
    padding: 12,
  },
  contentTitle: {},
  contentTitleText: {
    fontSize: 20,
    fontWeight: '700',
  },
  contentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  contentInfoText: {
    color: PALETTE.grey,
    fontSize: 14,
    marginRight: 4,
  },
  content: {
    marginVertical: 4,
  },
  contentText: {
    fontSize: 15,
    lineHeight: 20,
  },
  bottomBarContainer: {
    justifyContent: 'flex-end',
    paddingBottom: 24,
    padding: 12,
    backgroundColor: '#FFF',
    borderTopColor: PALETTE.grey,
    borderTopWidth: 0.5,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  bottomBarLeft: {
    flexDirection: 'row',
  },
  iconWrapper: {
    padding: 8,
    borderWidth: 1,
    borderColor: PALETTE.grey,
    borderRadius: 4,
  },
  priceWrapper: {
    justifyContent: 'center',
    marginLeft: 16,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 2,
  },
  bottomBarRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 12,
    borderRadius: 4,
    backgroundColor: PALETTE.main,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FFF',
  },
});

export default Post;
