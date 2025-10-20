import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
    visible: boolean;
    message: string | null;
    onClose: () => void;
    title?: string;
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
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    modalText: {
        marginBottom: 12,
        color: '#333',
    },
    modalClose: {
        marginTop: 8,
    }
});

export default function MessageModal({ visible, message, onClose, title }: Props) {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    {title ? <Text style={styles.modalTitle}>{title}</Text> : null}
                    <Text style={styles.modalText}>{message}</Text>
                    <Pressable style={styles.modalClose} onPress={onClose}>
                        <Text style={{ color: '#35797d', fontWeight: 'bold' }}>Fechar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

