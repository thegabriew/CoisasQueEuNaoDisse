import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTheme } from '@/components/ThemeContext';
import Colors from '@/constants/Colors';
import { fetchMessages } from '@/api/api'; // ajuste se necessário
import { MessageService } from '@/services/MessageService';
import { useFocusEffect } from '@react-navigation/native';

type Message = { id?: string; reciver: string; message: string };

const MessageDetail = ({ message, onClose }: { message: Message; onClose: () => void }) => {
  const { theme } = useTheme();

  return (
    <Modal animationType="slide" transparent visible={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, { backgroundColor: theme === 'dark' ? '#333' : Colors[theme].background }]}>
          <Text style={[styles.modalTitle, { color: Colors[theme].text }]}>Detalhes da Mensagem</Text>
          <View style={[styles.separator, { backgroundColor: Colors[theme].text }]} />
          <Text style={[styles.to, { color: Colors[theme].text }]}>Para: {message.reciver}</Text>
          <Text style={[styles.body, { color: Colors[theme].text }]}>{message.message}</Text>
          <TouchableOpacity style={[styles.closeButton, { backgroundColor: Colors[theme].tint }]} onPress={onClose}>
            <Text style={[styles.closeButtonText, { color: Colors[theme].background }]}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function StackHome() {
  const { theme } = useTheme();

  // valida e força strings para as cores usadas nos styles
  const rawBackground = Colors?.[theme]?.background;
  const rawText = Colors?.[theme]?.text;
  const rawTint = Colors?.[theme]?.tint;

  if (typeof rawBackground !== 'string' || typeof rawText !== 'string' || typeof rawTint !== 'string') {
    console.warn('Colors values invalid:', {
      background: rawBackground,
      text: rawText,
      tint: rawTint,
      typeofBackground: typeof rawBackground,
      typeofText: typeof rawText,
      typeofTint: typeof rawTint,
    });
  }

  const backgroundColor = typeof rawBackground === 'string' ? rawBackground : String(rawBackground ?? '#ffffff');
  const textColor = typeof rawText === 'string' ? rawText : String(rawText ?? '#000000');
  const tintColor = typeof rawTint === 'string' ? rawTint : String(rawTint ?? '#007bff');

  // use backgroundColor / textColor / tintColor nas renderizações abaixo
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchMessages();
      setMessages(Array.isArray(res) ? res : []);
    } catch (e) {
      const cached = await MessageService.getCachedMessages();
      setMessages(cached);
      console.warn('Erro ao buscar mensagens, usando cache', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Recarrega quando a tela ganha foco (após voltar da tela de envio)
  useFocusEffect(
    useCallback(() => {
      loadMessages();
      // tenta enviar mensagens pendentes ao ganhar foco
      MessageService.sendCachedMessages().catch(() => {});
    }, [loadMessages])
  );

  const handleMessagePress = (m: Message) => setSelectedMessage(m);
  const handleCloseModal = () => setSelectedMessage(null);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
        <ActivityIndicator size="large" color={Colors[theme].tint} />
        <Text style={[styles.title, { color: Colors[theme].text, marginTop: 12 }]}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Coisas que Eu não Disse</Text>
      <View style={[styles.separator, { backgroundColor: Colors[theme].text }]} />

      <Link href="/(stack)/two" asChild>
        <TouchableOpacity style={[styles.newMessageButton, { backgroundColor: tintColor }]}>
          <View style={styles.buttonContent}>
            <FontAwesome name="paper-plane" size={18} color={backgroundColor} style={{ marginRight: 8 }} />
            <Text style={[styles.newMessageText, { color: backgroundColor }]}>Nova mensagem</Text>
          </View>
        </TouchableOpacity>
      </Link>

      <FlatList
        style={{ width: '100%', marginTop: 12 }}
        data={messages}
        keyExtractor={(item) => item.id?.toString() || `${item.reciver}-${Math.random()}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleMessagePress(item)}
            style={[styles.messageContainer, { borderBottomColor: Colors[theme].text }]}
          >
            <Text style={[styles.to, { color: Colors[theme].text }]}>Para: {item.reciver}</Text>
            <Text style={[styles.body, { color: Colors[theme].text }]} numberOfLines={2}>{item.message}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={[styles.empty, { color: Colors[theme].text }]}>Nenhuma mensagem encontrada.</Text>}
      />

      {selectedMessage && <MessageDetail message={selectedMessage} onClose={handleCloseModal} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  separator: { marginVertical: 12, height: 1, width: '100%' },
  messageContainer: { padding: 12, borderBottomWidth: 1, width: '100%' },
  to: { fontSize: 15, fontWeight: '700' },
  body: { fontSize: 14, marginTop: 6 },
  empty: { textAlign: 'center', marginTop: 20 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { padding: 20, borderRadius: 10, width: '85%', alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  separatorModal: { height: 1, width: '100%', marginVertical: 8 },
  closeButton: { marginTop: 16, padding: 10, borderRadius: 6 },
  closeButtonText: { fontSize: 16 },
  buttonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  newMessageButton: { marginTop: 8, padding: 10, borderRadius: 8, minWidth: 160 },
  newMessageText: { fontSize: 16, fontWeight: '600' },
});