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
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { PALETTE } from '../../../constants/color';
import { IMAGES } from '../../../constants/image';
import { PostProps } from '../../../types/ScreenProps';
import { numberWithCommas } from '../../../utils';

const Post = ({ navigation, route }: PostProps) => {
  const [images, setImages] = useState<{ uri: string }[]>([]);
  const [headerTransparent, setHeaderTranspaernt] = useState(true);
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
  const sliderHeight = (windowHeight - 84) / 2;
  const [isLike, setIsLike] = useState(false);
  const data = route.params.post;

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
    let items = Array.apply(null, Array(1)).map((v, i) => {
      //Loop to make image array to show in slider
      return {
        uri:
          'assets-library://asset/asset.HEIC?id=300C2F7E-F036-40D2-BBC4-6D8180894DBC&ext=HEIC',
      };
    });
    setImages(items);
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
                <Text style={styles.profileTextP}>판매자의 닉네임</Text>
                <Text style={styles.profileTextS}>판매자의 위치 정보</Text>
              </View>
            </View>
            <View style={styles.profileRight}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Ionicons name="star-outline" style={styles.profileRate} />
                  <Ionicons name="star-outline" style={styles.profileRate} />
                  <Ionicons name="star-outline" style={styles.profileRate} />
                  <Ionicons name="star-outline" style={styles.profileRate} />
                  <Ionicons name="star-outline" style={styles.profileRate} />
                </View>
                <Text style={styles.profileRate}>0.0/5.0</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* <Divider /> */}

          <View style={styles.contentWrapper}>
            <View style={styles.contentTitle}>
              <Text style={styles.contentTitleText}>{data.title}</Text>
            </View>
            <View style={styles.contentInfo}>
              <Text style={styles.contentInfoText}>{`생활용품`}</Text>
              <Text style={styles.contentInfoText}>·</Text>
              <Text style={styles.contentInfoText}>방금 전</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText}>머그컵 싸게 판매합니다~~</Text>
            </View>
            <View style={styles.contentInfo}>
              <Ionicons
                name="chatbubbles-outline"
                style={styles.contentInfoText}
              />
              <Text style={styles.contentInfoText}>{`${data.chats}`}</Text>
              <Text style={styles.contentInfoText}>·</Text>
              <Ionicons name="heart-outline" style={styles.contentInfoText} />
              <Text style={styles.contentInfoText}>{`${data.likes}`}</Text>
              <Text style={styles.contentInfoText}>·</Text>
              <Ionicons name="eye-outline" style={styles.contentInfoText} />
              <Text style={styles.contentInfoText}>{`${1}`}</Text>
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
                data.price,
              )} ₩`}</Text>
              <Text style={[styles.priceText]}>{`${(data.price / 2813000)
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
  },
  bottomBarLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  iconWrapper: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: PALETTE.grey,
    borderRadius: 4,
    marginLeft: 10,
  },
  priceWrapper: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 2,
  },
  bottomBarRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 10,
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
