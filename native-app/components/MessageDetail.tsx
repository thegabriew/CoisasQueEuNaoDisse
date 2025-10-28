import { StyleSheet, View } from 'react-native';
import { Text, useThemeColor } from '@/components/Themed';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTheme } from '@/components/ThemeContext'; // Importar useTheme do ThemeContext

type MessageDetailParams = {
  MessageDetail: {
    message: { id: string; reciver: string; message: string };
  };
};

type MessageDetailRouteProp = RouteProp<MessageDetailParams, 'MessageDetail'>;

export default function MessageDetailScreen() {
  const route = useRoute<MessageDetailRouteProp>();
  const { message } = route.params;
  const { theme } = useTheme(); // Usar o tema do ThemeContext

  // Obter cores dinâmicas com base no tema
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  // Usar cores personalizadas para separator e primary, já que não estão em Colors.ts
  const separatorColor = useThemeColor({ light: '#ccc', dark: '#444' }, 'text');
  const primaryColor = useThemeColor({ light: '#555', dark: '#aaa' }, 'text');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Detalhes da Mensagem</Text>
      <View style={[styles.separator, { backgroundColor: separatorColor }]} />
      <Text style={[styles.to, { color: textColor }]}>Para: {message.reciver}</Text>
      <Text style={[styles.body, { color: primaryColor }]}>{message.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  to: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
  },
});