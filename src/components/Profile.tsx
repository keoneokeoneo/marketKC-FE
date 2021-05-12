import React from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
  isMe: boolean;
}

const Profile = ({}: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imgContainer: {},
  img: { width: 40, height: 40, borderRadius: 20 },
  imgIcon: { color: 'black', padding: 4 },
});

export default Profile;
