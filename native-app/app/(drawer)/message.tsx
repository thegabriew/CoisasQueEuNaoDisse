import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { MessageService } from '@/services/MessageService';
import { useTheme } from '@/components/ThemeContext';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function DrawerMessageScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [reciver, setReciver] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => MessageService.sendCachedMessages(), 5 * 60 * 1000);
    // tenta ao montar
    MessageService.sendCachedMessages();
    return () => clearInterval(interval);
  }, []);

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) setMessage(prev => (prev ? prev + text : text));
  };

  const handleSend = async () => {
    if (!message.trim()) {
      Alert.alert('Erro', 'Digite uma mensagem');
      return;
    }

    const newMessage = { reciver: reciver.trim(), message: message.trim() };
    const sent = await MessageService.sendMessage(newMessage);

    if (sent) {
      Alert.alert('Sucesso', 'Mensagem enviada');
      setReciver('');
      setMessage('');
      router.back();
    } else {
      Alert.alert('Offline', 'Mensagem salva e será enviada quando houver conexão');
      setReciver('');
      setMessage('');
      router.back();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Nova mensagem</Text>
      <TextInput
        style={[styles.input, { borderColor: Colors[theme].text, color: Colors[theme].text }]}
        placeholder="Para"
        placeholderTextColor={Colors[theme].text + '99'}
        value={reciver}
        onChangeText={setReciver}
      />
      <TextInput
        style={[styles.input, { borderColor: Colors[theme].text, color: Colors[theme].text, height: 120 }]}
        placeholder="Mensagem"
        placeholderTextColor={Colors[theme].text + '99'}
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={[styles.button, { backgroundColor: Colors[theme].tint }]} onPress={handlePaste}>
        <Text style={[styles.buttonText, { color: Colors[theme].background }]}>Colar do clipboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: Colors[theme].tint, marginTop: 8 }]} onPress={handleSend}>
        <Text style={[styles.buttonText, { color: Colors[theme].background }]}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'stretch' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 10 },
  button: { padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { fontWeight: '600' },
});