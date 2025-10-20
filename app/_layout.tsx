import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from "expo-router";
import { Button, Image, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  faixa: {
    backgroundColor: "#44babc",
    height: 80,
  },
  imagem: {
    width: 180,
    height: 50,
  },
});

export default function Layout() {

  function sair() {
    AsyncStorage.removeItem('perfil')
      .then(perf => router.replace('/'))
      .catch(err => console.error('error reading perfil from storage', err));
  }

  return <Stack
    screenOptions={{
      headerStyle: styles.faixa,
    }}
  >
    <Stack.Screen name="index" options={{ title: "Tela de Login" }} />
    <Stack.Screen name="screens" options={{
      headerTitle: () => (
        <Image style={styles.imagem} source={require('../assets/images/react-logo.png')} resizeMode="contain" />
      ),
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Button
            color="#35797d"
            title="Sair"
            onPress={sair}
          />
        </View>
      )
    }} />

  </Stack>;
}