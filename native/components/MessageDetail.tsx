import { StyleSheet, View } from 'react-native';
import { Text } from '@/components/Themed';
import { RouteProp, useRoute } from '@react-navigation/native';

type MessageDetailParams = {
  MessageDetail: {
    message: { id: string; reciver: string; message: string };
  };
};

type MessageDetailRouteProp = RouteProp<MessageDetailParams, 'MessageDetail'>;

export default function MessageDetailScreen() {
  const route = useRoute<MessageDetailRouteProp>();
  const { message } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes da Mensagem</Text>
      <View style={styles.separator} />
      <Text style={styles.to}>Para: {message.reciver}</Text>
      <Text style={styles.body}>{message.message}</Text>
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
    backgroundColor: '#ccc',
  },
  to: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    color: '#555',
  },
});