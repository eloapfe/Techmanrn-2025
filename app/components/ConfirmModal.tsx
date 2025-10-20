import React from 'react';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

type Props = {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  botoes: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  }
});

export default function ConfirmModal({ visible, message, onConfirm, onCancel, confirmText = 'Excluir', cancelText = 'Cancelar', confirmColor = '#ff0000' }: Props) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.botoes}>
            <Button color="#35797d" title={cancelText} onPress={onCancel} />
            <Button color={confirmColor} title={confirmText} onPress={onConfirm} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

