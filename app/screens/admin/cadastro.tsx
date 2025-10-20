import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from 'expo-checkbox';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import MessageModal from '../../components/MessageModal';

const styles = StyleSheet.create({
  conteiner: {
    backgroundColor: '#eeedeb',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "#35797d"
  },
  texto: {
    fontSize: 16,
    color: "#35797d"
  },
  coluna: {
    width: "90%",
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    gap: 20,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imagem: {
    width: '60%',
    height: 100,
    margin: 10
  },
  input: {
    width: "100%",
    borderBottomColor: "#35797d",
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    color: "#35797d",
  },
  checkbox: {
    margin: 8,
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
  }
});

export default function Cadastro() {
  const url = "https://techman-api-2025.vercel.app/"
  const [equipamento, setEquipamento] = useState("");
  const [imagem, setImagem] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    AsyncStorage.getItem('perfil')
      .then((perf) => {
        if (perf != null) {
          const perfil = isNaN(Number(perf)) ? perf : Number(perf);
          if (perfil == 2) {
            router.replace('/screens/admin');
          } else
            router.replace('/screens');
        } else {
          console.log('perfil não encontrado');
        }
      })
      .catch(err => console.error('error reading perfil from storage', err));
  }, []);

  function enviarFormulario() {
    if (equipamento.length > 0 && descricao.length > 0) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: `{"equipamento":"${equipamento}","imagem":"${imagem}","descricao":"${descricao}","ativo":${ativo ? 1 : 0}}`
      };

      fetch(url + 'equipamento', options)
        .then(response => response.status)
        .then(response => {
          if (response == 201) {
            setEquipamento("");
            setImagem("");
            setDescricao("");
            setModalMessage("Equipamento cadastrado");
            setModalVisible(true);
            router.replace('/screens/admin');
          } else {
            setModalMessage("Erro ao cadastrar equipamento");
            setModalVisible(true);
          }
        })
        .catch(err => {
          setModalMessage(err);
          setModalVisible(true);
        });
    } else {
      setModalMessage("Preencha todos os campos obrigatórios");
      setModalVisible(true);
    }
  }

  return (
    <View
      style={styles.conteiner}
    >
      <View style={styles.coluna}>
        <Text style={styles.titulo}>Cadastro de equipamento</Text>
        <TextInput
          placeholder="Digite o nome do equipamento"
          style={styles.input}
          value={equipamento}
          onChangeText={setEquipamento}
        />
        <TextInput
          placeholder="Digite a descricao equipamento"
          style={styles.input}
          value={descricao}
          onChangeText={setDescricao}
        />
        <TextInput
          placeholder="Digite a url da imagem"
          style={styles.input}
          value={imagem}
          onChangeText={setImagem}
        />
        <View style={styles.linha}>
          <Text style={styles.texto}>Ativo</Text>
          <Checkbox
            style={styles.checkbox}
            value={ativo}
            onValueChange={setAtivo}
            color={ativo ? '#35797d' : undefined}
          />
        </View>
        <Button color="#35797d" title="Enviar" onPress={() => enviarFormulario()} />
      </View>
      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
