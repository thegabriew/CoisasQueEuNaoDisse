import { useState } from 'react';
import { StyleSheet, TextInput, Button, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { sendMessage } from '@/api/api';

export default function TabTwoScreen() {
  const [reciver, setReciver] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = async () => {
    if (!message) {
      Alert.alert('Erro', 'Por favor, preencha pelo menos a mensagem.');
      return;
    }

    try {
      let data = await sendMessage({ reciver, message });
      if(data){
        Alert.alert('Sucesso', 'Mensagem enviada com sucesso!');
      setReciver('');
      setMessage('');
      }else{
        throw new Error('Falha ao enviar a mensagem.');
      }
      
    } catch (error) {
      Alert.alert('Erro', 'Falha ao enviar a mensagem.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Mensagem</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.text}>Destinatário</Text>
      <TextInput
        value={reciver}
        onChangeText={setReciver}
        placeholder="Digite o destinatário"
        style={styles.input}
      />
      <Text style={styles.text}>Mensagem</Text>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Digite sua mensagem"
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      <Button title="Enviar" onPress={handleSendMessage} />
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
  },
  text: {
    fontSize: 15,
    fontStyle: 'italic',
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
});