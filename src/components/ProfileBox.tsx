import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PALETTE } from '../constants/color';

interface IProps {
  isMe?: boolean;
  url: string;
  name: string;
  info: string;
}

const ProfileBox = ({ isMe, url, name, info }: IProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <Image source={{ uri: url }} style={styles.img} />
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.no}>{info}</Text>
          </View>
        </View>
        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="star" style={styles.ratePrimary} />
          <Text style={styles.ratePrimary}>{`4.4`}</Text>
          <Text style={styles.rate}>{`/ 5`}</Text>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    padding: 20,
  },
  img: {
    width: 72,
    height: 72,
    borderRadius: 40,
    borderColor: 'rgb(216,216,216)',
    marginRight: 8,
    borderWidth: 0.5,
  },
  name: { fontSize: 18, fontWeight: 'bold', marginVertical: 2 },
  no: { color: 'rgb(216,216,216)', marginVertical: 2 },
  ratePrimary: {
    fontSize: 16,
    color: PALETTE.main,
    fontWeight: 'bold',
    marginRight: 5,
  },
  rate: { fontSize: 16 },
});

export default ProfileBox;
