import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  faixa: {    
    backgroundColor: "#44babc",
    height: 60,
  },
});

export default function Layout() {
  return <Tabs
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.faixa,
      tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: '#e0f7f6',
    }}>
    <Tabs.Screen name="index" options={{ title: "Admin", tabBarIcon: ({ color }) => (<MaterialIcons name="admin-panel-settings" size={36} color={color} />) }} />
    <Tabs.Screen name="cadastro" options={{ title: "Novo equipamento", tabBarIcon: ({ color }) => (<MaterialIcons name="add-circle-outline" size={36} color={color} />) }} />
  </Tabs>;
}
