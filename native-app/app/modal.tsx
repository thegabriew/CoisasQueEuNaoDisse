import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>
        Aplicação feita para a disciplina de PDM (Programação de Dispositivos Móveis),
        Utilizando React Native, Expo Go, Axios, Express.Js e Sequelize, para abordar os conceito de:
        Navegação(Stack, Tab, Drawer) e Consumo de API.
        Equipe:
        André Casimiro,
        Guilherme Bandeira,
        Jussivan Bezerra,
        Nickolas Davi,
        Raimundo Gabriel
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
