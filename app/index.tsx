import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, TextInput, View } from "react-native";
import MessageModal from './components/MessageModal';

const styles = StyleSheet.create({
  conteiner: {
    backgroundColor: "#eeedeb",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  imagem: {
    width: '60%',
    height: 100,
    margin: 10
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
  grade: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  }
  ,
  cell: {
    width: '30%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
  ,
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

export default function Index() {
  const url = "https://techman-api-2025.vercel.app/login"
  const [senha, setSenha] = useState("");
  const [asteriscos, setAsteriscos] = useState("");
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

  function press(val: String) {
    if (val == 'C') {
      setSenha("");
      setAsteriscos("");
    } else {
      setSenha(senha + val);
      setAsteriscos(asteriscos + '*');
    }
  }

  function login() {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senha })
    };

    fetch(url, options)
      .then(response => response.json())
      .then(response => {
        if (response != 'Senha incorreta') {
          AsyncStorage.setItem('perfil', String(response.perfil)).catch(err => console.error(err));
          if (response.perfil == 2) {
            router.replace('/screens/admin');
          } else
            router.replace('/screens');
        } else {
          setModalMessage(response);
          setModalVisible(true);
        }
      })
  }

  return (
    <View
      style={styles.conteiner}
    >
      <Image style={styles.imagem} source={require('../assets/images/react-logo.png')} resizeMode="contain" />
      <TextInput
        placeholder="Digite a senha"
        style={styles.input}
        editable={false}
        value={asteriscos}
      />
      <View style={styles.grade}>
        <View style={styles.cell}><Button color="#35797d" title=" 1 " onPress={() => press('1')} /></View>
        <View style={styles.cell}><Button color="#35797d" title=" 2 " onPress={() => press('2')} /></View>
        <View style={styles.cell}><Button color="#35797d" title=" 3 " onPress={() => press('3')} /></View>
        <View style={styles.cell}><Button color="#35797d" title=" 4 " onPress={() => press('4')} /></View>
        <View style={styles.cell}><Button color="#35797d" title=" 5 " onPress={() => press('5')} /></View>
        <View style={styles.cell}><Button color="#35797d" title=" 6 " onPress={() => press('6')} /></View>
        <View style={styles.cell}><Button color="#35797d" title=" 7 " onPress={() => press('7')} /></View>
        <View style={styles.cell}><Button color="#35797d" title=" 8 " onPress={() => press('8')} /></View>
        <View style={styles.cell}><Button color="#35797d" title=" 9 " onPress={() => press('9')} /></View>
        <View style={styles.cell}><Button color="#35797d" title=" C " onPress={() => press('C')} /></View>
        <View style={styles.cell}><Button color="#35797d" title=" 0 " onPress={() => press('0')} /></View>
        <View style={styles.cell}>
          <Button color="#35797d" title=" ↵ " onPress={() => login()} disabled={senha.length < 6} />
        </View>
      </View>
      <MessageModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
