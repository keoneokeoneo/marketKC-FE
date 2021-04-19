import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { PALETTE } from '../../constants/color';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

const NoticeModal = ({ isOpen, onClose, content }: IProps) => {
  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.contentText}>{content}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={1}
          onPress={onClose}>
          <Text style={styles.buttonText}>닫기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 12,
  },
  content: {
    marginBottom: 20,
  },
  contentText: {
    fontSize: 15,
    fontWeight: '600',
  },
  button: {
    width: '100%',
    backgroundColor: PALETTE.main,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NoticeModal;
