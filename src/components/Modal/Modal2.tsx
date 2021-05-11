import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { PALETTE } from '../../constants/color';

interface IProps {
  onSelect1: () => void;
  onSelect2: () => void;
  isOpen: boolean;
  content: string;
  select1Text: string;
  select2Text: string;
  onClose: () => void;
}

const Modal2 = ({
  isOpen,
  onSelect1,
  onSelect2,
  content,
  select1Text,
  select2Text,
  onClose,
}: IProps) => {
  return (
    <Modal isVisible={isOpen} onBackdropPress={onClose}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.contentText}>{content}</Text>
          <TouchableOpacity
            onPress={onSelect1}
            style={[styles.btn, styles.btnPrimary]}
            activeOpacity={1}>
            <Text style={[styles.btnText, styles.btnPrimaryText]}>
              {select1Text}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={1}
            onPress={onSelect2}>
            <Text style={styles.btnText}>{select2Text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  content: { justifyContent: 'center', alignItems: 'center', padding: 20 },
  contentText: { fontSize: 16, marginBottom: 16 },
  btnPrimary: { borderColor: PALETTE.main, backgroundColor: PALETTE.main },
  btn: {
    padding: 12,
    borderRadius: 6,
    marginVertical: 4,
    borderColor: PALETTE.grey,
    borderWidth: 0.5,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPrimaryText: { color: 'white' },
  btnText: { fontSize: 14, fontWeight: 'bold' },
});

export default Modal2;
