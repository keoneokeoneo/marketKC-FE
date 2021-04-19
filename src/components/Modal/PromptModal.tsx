import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { PALETTE } from '../../constants/color';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  title?: string;
  content: string;
  desc?: string;
  cancelText: string;
  confirmText: string;
}

const PromptModal = ({
  onCancel,
  onConfirm,
  isOpen,
  content,
  title,
  desc,
  cancelText,
  confirmText,
}: Props) => {
  return (
    <Modal isVisible={isOpen} onBackdropPress={onCancel}>
      <View style={styles.container}>
        <Text style={styles.title}>{title && title}</Text>
        <Text style={styles.content}>{content}</Text>
        <Text style={styles.desc}>{desc && desc}</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={1}
          onPress={onCancel}>
          <Text style={[styles.btnText, styles.btnCancelText]}>
            {cancelText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={1}
          onPress={onConfirm}>
          <Text style={[styles.btnText, styles.btnConfirmText]}>
            {confirmText}
          </Text>
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
  title: {},
  content: {},
  desc: {},
  btnContainer: {
    flexDirection: 'row',
    borderTopColor: PALETTE.grey,
    borderTopWidth: 1,
  },
  btn: { flex: 1 },
  btnText: { fontSize: 16, fontWeight: '600' },
  btnCancelText: { color: 'black' },
  btnConfirmText: { color: PALETTE.main },
});

export default PromptModal;
