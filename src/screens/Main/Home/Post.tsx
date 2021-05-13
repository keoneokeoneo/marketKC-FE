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
import { getPostThunk } from '../../../store/post/thunk';
import { PostProps } from '../../../types/ScreenProps';
import { numberWithCommas } from '../../../utils';

const eth = 2.1e-7;
const Post = ({ navigation, route }: PostProps) => {
  const [headerTransparent, setHeaderTranspaernt] = useState(true);
  const { height: windowHeight } = Dimensions.get('window');
  const sliderHeight = (windowHeight - 84) / 2;
  const [isLike, setIsLike] = useState(false);
  const postID = route.params.id;
  const dispatch = useDispatch();
  const postState = useSelector((state: RootState) => state.post.post);

  const getData = async () => {
    dispatch(getPostThunk(postID));
  };

  const onLikePress = () => {
    setIsLike(prev => !prev);
  };

  useLayoutEffect(() => {
    const color = headerTransparent ? '#fff' : '#000';
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
            color={color}
          />
        </HeaderSide>
      ),
      headerRight: () => null,
      title: '',
      headerTransparent: headerTransparent,
    });
  }, [headerTransparent, navigation]);

  useEffect(() => {
    getData();
  }, []);

  const onScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = e.nativeEvent.contentOffset;
    if (y >= 280 && headerTransparent) {
      setHeaderTranspaernt(false);
    } else {
      setHeaderTranspaernt(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {postState.data ? (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1, backgroundColor: '#FFF' }}
            onScroll={onScroll}
            scrollEventThrottle={16}>
            <View style={{ width: '100%', height: sliderHeight }}>
              {/* <ImageSlider
            images={images}
            sliderHeight={sliderHeight}
            sliderWidth={windowWidth}
            indicatorActiveColor="#fff"
            indicatorInactiveColor="#808080"
            onImagePress={() => {}}
          /> */}
              <Image
                source={
                  postState.data.postImgs.length > 0
                    ? { uri: postState.data.postImgs[0].url }
                    : IMAGES.defaultImage
                }
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View style={styles.container}>
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
                      {postState.data.user.name}
                    </Text>
                    <Text style={styles.profileTextS}>
                      {postState.data.location}
                    </Text>
                  </View>
                </View>
                <View style={styles.profileRight}>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      {/* <Ionicons name="star-outline" style={styles.profileRate} />
                  <Ionicons name="star-outline" style={styles.profileRate} />
                  <Ionicons name="star-outline" style={styles.profileRate} />
                  <Ionicons name="star-outline" style={styles.profileRate} />
                  <Ionicons name="star-outline" style={styles.profileRate} /> */}
                    </View>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 16,
                          color: PALETTE.main,
                          marginRight: 4,
                        }}>
                        4.7
                      </Text>
                      <Text style={{ marginRight: 2, color: PALETTE.line1 }}>
                        /
                      </Text>
                      <Text style={{ color: PALETTE.line1 }}>5.0</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              {/* <Divider /> */}

              <View style={styles.contentWrapper}>
                <View style={styles.contentTitle}>
                  <Text style={styles.contentTitleText}>
                    {postState.data.title}
                  </Text>
                </View>
                <View style={styles.contentInfo}>
                  <Text style={styles.contentInfoText}>
                    {postState.data.categoryName}
                  </Text>
                  <Text style={styles.contentInfoText}>·</Text>
                  <Text style={styles.contentInfoText}>
                    {postState.data.updatedAt}
                  </Text>
                </View>
                <View style={styles.content}>
                  <Text style={styles.contentText}>
                    {postState.data.content}
                  </Text>
                </View>
                <View style={styles.contentInfo}>
                  <Ionicons
                    name="chatbubbles-outline"
                    style={styles.contentInfoText}
                  />
                  <Text style={styles.contentInfoText}>
                    {postState.data.chats}
                  </Text>
                  <Text style={styles.contentInfoText}>·</Text>
                  <Ionicons
                    name="heart-outline"
                    style={styles.contentInfoText}
                  />
                  <Text style={styles.contentInfoText}>
                    {postState.data.likes}
                  </Text>
                  <Text style={styles.contentInfoText}>·</Text>
                  <Ionicons name="eye-outline" style={styles.contentInfoText} />
                  <Text style={styles.contentInfoText}>
                    {postState.data.views}
                  </Text>
                </View>
              </View>

              {/* <Divider /> */}
            </View>
          </ScrollView>
          <View style={styles.bottomBarContainer}>
            <View style={styles.bottomBar}>
              <View style={styles.bottomBarLeft}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={onLikePress}
                  style={styles.iconWrapper}>
                  {isLike ? (
                    <Ionicons name="heart" size={32} color="#f29886" />
                  ) : (
                    <Ionicons name="heart-outline" size={32} color="#c0c0c0" />
                  )}
                </TouchableOpacity>
                <View style={styles.priceWrapper}>
                  <Text style={[styles.priceText]}>{`${numberWithCommas(
                    postState.data.price,
                  )} ₩`}</Text>
                  <Text style={[styles.priceText]}>{`${(
                    (postState.data.price / 1000) *
                    eth
                  )
                    .toFixed(6)
                    .toString()} ETH`}</Text>
                </View>
              </View>
              <View style={styles.bottomBarRight}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {}}
                  style={styles.button}>
                  <Text style={styles.buttonText}>판매자와 대화</Text>
                </TouchableOpacity>
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
  container: { padding: 12, backgroundColor: '#FFF' },
  profileWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
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
    marginRight: 2,
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
    alignItems: 'flex-end',
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
