import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PALETTE } from '../constants/color';

interface Props {
  isMe: boolean;
  msg: string;
  date?: string;
}

const ChatMsg = ({ isMe, msg, date }: Props) => {
  return (
    <View style={styles.container}>
      {isMe ? (
        <View style={[styles.wrapper, { justifyContent: 'flex-end' }]}>
          {date && <Text style={styles.date}>{date}</Text>}
          <View style={[styles.msg, { backgroundColor: PALETTE.sub }]}>
            <Text style={{ color: 'white' }}>{msg}</Text>
          </View>
        </View>
      ) : (
        <View style={[styles.wrapper, { justifyContent: 'flex-start' }]}>
          <View style={[styles.msg, { backgroundColor: 'rgb(225,225,225)' }]}>
            <Text style={{}}>{msg}</Text>
          </View>

          {date && <Text style={styles.date}>{date}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginVertical: 4 },
  wrapper: { flexDirection: 'row' },
  msg: { padding: 10, borderRadius: 10, marginHorizontal: 4 },
  date: { fontSize: 12, color: PALETTE.grey, alignSelf: 'flex-end' },
});

export default ChatMsg;
