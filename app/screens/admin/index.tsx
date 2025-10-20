import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import CommentsModal from '../../../app/components/CommentsModal';
import ConfirmModal from '../../../app/components/ConfirmModal';

const styles = StyleSheet.create({
  conteiner: {
    backgroundColor: "#eeedeb",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#35797d",
  },
  texto: {
    fontSize: 16,
    fontStyle: 'italic',
    color: "#35797d",
  },
  descricao: {
    fontSize: 16,
    fontStyle: 'italic',
    color: "#35797d",
  },
  list: {
    flex: 1,
    width: "100%",
    gap: 10,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 6,
    padding: 20,
    backgroundColor: "#f9c",
    borderRadius: 8,
    marginBottom: 10,
  },
  imagem: {
    width: "100%",
    height: 200,
    margin: 10,
  },
  botoes: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: 'flex-end',
    gap: 10
  },
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
  },
  modalClose: {
    marginTop: 8,
  },
  input: {
    width: "80%",
    borderColor: "#35797d",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#35797d",
  },
});

export default function Admin() {
  const url = "https://techman-api-2025.vercel.app/"
  const [equipamentos, setEquipamentos] = useState(null);
  const [equipamento, setEquipamento] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [comentarios, setComentarios] = useState(null);
  const [comentario, setComentario] = useState("");
  const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
  const [idEquip, setIdEquip] = useState(0);
  const [perfil, setPerfil] = useState(0);

  useFocusEffect(
    useCallback(() => {
      loadEquipamentos(); // sua função que faz fetch e atualiza estado
    }, [])
  );

  useEffect(() => {
    AsyncStorage.getItem('perfil')
      .then((perf) => {
        if (perf != null) {
          const p = isNaN(Number(perf)) ? 0 : Number(perf);
          setPerfil(p);
          if (p != 2) {
            router.replace('/');
          }
        } else {
          router.replace('/');
        }
      })
      .catch(err => console.error('error reading perfil from storage', err));
    loadEquipamentos();
  }, []);

  function loadEquipamentos() {
    fetch(url + "equipamento")
      .then(response => response.json())
      .then(response => setEquipamentos(response))
      .catch(err => console.error(err));
  }

  function exibirComentario(equip: number) {
    setEquipamento(equip);
    fetch(url + "comentario/equipamento/" + equip)
      .then(response => response.json())
      .then(response => {
        setComentarios(response);
        setModalVisible(true);
      })
      .catch(err => console.error(err));
  }

  function enviarComentario() {
    if (comentario.length > 0) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"equipamento":${equipamento},"comentario":"${comentario}","perfil":${perfil}}`
      };
      fetch(url + 'comentario', options)
        .then(response => response.status)
        .then(response => {
          if (response == 201) {
            setModalVisible(false);
            setComentario("");
          } else console.log(response);
        })
        .catch(err => console.error(err));
    }
  }

  function excluir() {
    const options = { method: 'DELETE' };

    fetch(url + 'equipamento/' + idEquip, options)
      .then(response => response.status)
      .then(response => {
        if (response == 200)
          loadEquipamentos();
        else
          console.log(response)
      })
      .catch(err => console.error(err));
  }

  return (
    <View
      style={styles.conteiner}
    >
      <Text style={styles.titulo}>Techman Admin</Text>
      <FlatList
        style={styles.list}
        data={equipamentos}
        renderItem={({ item }) => (<View>
          <Image style={styles.imagem} source={item.imagem.slice(0, 3) == 'htt' ? item.imagem : 'https://github.com/wellifabio/techman-web-2025/blob/main/assets/' + item.imagem + '?raw=true'} />
          <Text style={styles.texto}>Equipamento: {item.equipamento}</Text>
          <Text style={styles.descricao}>Descricao: {item.descricao}</Text>
          <View style={styles.botoes}>
            <Button color="#35797d" title="Comentarios" onPress={() => exibirComentario(item.id)} />
            <Button color="#35797d" title="Excluir" onPress={() => { setIdEquip(item.id); setModalExcluirVisible(true) }} />
          </View>
        </View>)}
      />
      <CommentsModal
        visible={modalVisible}
        comentarios={comentarios}
        comentarioValue={comentario}
        onChangeComentario={setComentario}
        onSend={enviarComentario}
        onClose={() => setModalVisible(false)}
      />
      <ConfirmModal
        visible={modalExcluirVisible}
        message={'Atenção! Tem certeza que deseja excluir o equipamento? Essa ação não poderá ser desfeita.'}
        onCancel={() => setModalExcluirVisible(false)}
        onConfirm={() => { setModalExcluirVisible(false); excluir(); }}
        confirmText={'Excluir'}
        cancelText={'Cancelar'}
      />
    </View>
  );
}
