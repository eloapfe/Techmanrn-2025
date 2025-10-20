import React from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, TextInput, View } from 'react-native';

type Comment = {
    id?: number;
    perfil?: number;
    comentario?: string;
};

type Props = {
    visible: boolean;
    comentarios: Comment[] | null;
    comentarioValue: string;
    onChangeComentario: (text: string) => void;
    onSend: () => void;
    onClose: () => void;
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
        gap: 10,
    },
    list: {
        width: '100%',
        maxHeight: 200,
        marginBottom: 12,
    },
    input: {
        width: '100%',
        borderBottomColor: '#35797d',
        borderBottomWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        color: '#000',
        marginBottom: 8,
    },
    texto: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#35797d',
    },
    descricao: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#35797d',
    }
});

export default function CommentsModal({ visible, comentarios, comentarioValue, onChangeComentario, onSend, onClose }: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalBox}>
                    <FlatList
                        style={styles.list}
                        data={comentarios}
                        keyExtractor={(item, index) => String(item?.id ?? index)}
                        renderItem={({ item }) => (
                            <View style={{borderBottomColor:'#35797d', borderBottomWidth:1, gap:5, padding:10}}>
                                <Text style={styles.texto}>Equipamento: {item?.perfil == 2 ? 'ADMIN' : 'COMUM'}</Text>
                                <Text style={styles.descricao}>Descricao: {item?.comentario}</Text>
                            </View>
                        )}
                    />
                    <TextInput
                        placeholder="Escreva um comentário"
                        style={styles.input}
                        value={comentarioValue}
                        onChangeText={onChangeComentario}
                    />
                    <View style={{flexDirection:'row', gap:10}}>
                        <Button color="#35797d" title="Enviar comentario" onPress={onSend} />
                        <Button color="#35797d" title="Fechar" onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
