import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IFeedItem } from '../../../types';
import { numberWithCommas } from '../../../utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PALETTE } from '../../../constants/color';

interface IProps {
  data: IFeedItem;
  onClick: (data: IFeedItem) => void;
}

const FeedItem = ({ data, onClick }: IProps) => {
  const { thumbnailUri, chats, date, id, likes, location, price, title } = data;
  return (
    <TouchableOpacity onPress={() => onClick(data)} activeOpacity={1}>
      <View style={styles.cardContainer}>
        <View style={styles.cardLeft}>
          <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{location}</Text>
            <Text style={styles.info}>·</Text>
            <Text style={styles.info}>{date}</Text>
          </View>
          <Text style={styles.price}>{`₩ ${numberWithCommas(price)}`}</Text>
          <View style={styles.subInfoContainer}>
            {chats > 0 ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="chatbubbles-outline" style={styles.subInfo} />
                <Text style={styles.subInfo}>{chats}</Text>
              </View>
            ) : null}
            {likes > 0 ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="heart-outline" style={styles.subInfo} />
                <Text style={styles.subInfo}>{likes}</Text>
              </View>
            ) : null}
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
    width: 52,
    height: 52,
  },
  cardRight: {
    flex: 2,
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
  price: {
    fontSize: 15,
    fontWeight: '600',
    marginVertical: 4,
    alignSelf: 'flex-start',
  },
  subInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  subInfo: {
    fontSize: 13,
    marginHorizontal: 1.5,
  },
});
export default FeedItem;
