import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { numberWithCommas } from '../../../utils';
import { PALETTE } from '../../../constants/color';
import { IMAGES } from '../../../constants/image';
import { FeedPost } from '../../../utils/api/post/types';

interface IProps {
  data: FeedPost;
  onClick: (id: number) => void;
  eth: number;
}

const FeedItem = ({ data, onClick, eth }: IProps) => {
  const location = data.location.split(' ');
  const date = new Date(data.updatedAt).toLocaleString().toString();
  return (
    <TouchableOpacity onPress={() => onClick(data.id)} activeOpacity={1}>
      <View style={styles.cardContainer}>
        <View style={styles.cardLeft}>
          <Image
            source={
              data.postImgs.length > 0
                ? { uri: data.postImgs[0].url }
                : IMAGES.defaultImage
            }
            style={styles.thumbnail}
          />
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{`${location[1]} ${location[2]}`}</Text>
            <Text style={styles.info}>·</Text>
            <Text style={styles.info}>{date}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{`ETH ${(data.price / eth)
              .toFixed(6)
              .toString()}`}</Text>
          </View>
          <View style={styles.subInfoContainer}>
            <Text style={styles.subInfoText}>{`KRW ${numberWithCommas(
              data.price,
            )}`}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 4,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: PALETTE.grey,
  },
  cardLeft: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    borderRadius: 6,
    width: 84,
    height: 84,
  },
  cardRight: {
    flex: 2.5,
    padding: 4,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginVertical: 4,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  info: {
    marginRight: 4,
    fontSize: 12,
    color: PALETTE.grey,
  },
  priceContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 4,
  },
  subInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subInfoText: { fontSize: 13 },
});
export default FeedItem;
