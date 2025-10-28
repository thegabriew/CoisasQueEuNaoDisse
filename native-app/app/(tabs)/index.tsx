import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Modal, View } from 'react-native';
import { Text } from '@/components/Themed';
import { fetchMessages } from '@/api/api';
import { useTheme } from '@/components/ThemeContext';
import Colors from '@/constants/Colors';
import { MessageService } from '@/services/MessageService';
import { useFocusEffect } from '@react-navigation/native';

const MessageDetail = ({ message, onClose }: { message: { id: string; reciver: string; message: string }; onClose: () => void }) => {
  const { theme } = useTheme();

  return (
    <Modal animationType="slide" transparent={true} visible={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={[
          styles.modalContent,
          { backgroundColor: theme === 'dark' ? '#333' : Colors[theme].background }
        ]}>
          <Text style={[styles.modalTitle, { color: Colors[theme].text }]}>
            Detalhes da Mensagem
          </Text>
          <View style={[styles.separator, { backgroundColor: Colors[theme].text }]} />
          <Text style={[styles.to, { color: Colors[theme].text }]}>
            Para: {message.reciver}
          </Text>
          <Text style={[styles.body, { color: Colors[theme].text }]}>
            {message.message}
          </Text>
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: Colors[theme].tint }]}
            onPress={onClose}
          >
            <Text style={[styles.closeButtonText, { color: Colors[theme].background }]}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function TabOneScreen() {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<{ id: string; reciver: string; message: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<{ id: string; reciver: string; message: string } | null>(null);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMessages();
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar mensagens, usando cache:', error);
      const cached = await MessageService.getCachedMessages();
      setMessages(cached.map(msg => ({
        id: msg.id || '',
        reciver: msg.reciver || '',
        message: msg.message || ''
      })));
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadMessages();
      MessageService.sendCachedMessages().catch(() => {});
    }, [loadMessages])
  );

  if (loading) return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>Carregando...</Text>
    </View>
  );

  const handleMessagePress = (message: { id: string; reciver: string; message: string }) => {
    setSelectedMessage(message);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <Text style={[styles.title, { color: Colors[theme].text }]}>
        Coisas que Eu não Disse
      </Text>
      <View style={[styles.separator, { backgroundColor: Colors[theme].text }]} />
      <FlatList
        style={{ width: '100%', marginTop: 12 }}
        data={messages}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleMessagePress(item)}
            style={[styles.messageContainer, { borderBottomColor: Colors[theme].text }]}
          >
            <Text style={[styles.to, { color: Colors[theme].text }]}>
              Para: {item.reciver}
            </Text>
            <Text style={[styles.body, { color: Colors[theme].text }]}>
              {item.message}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: Colors[theme].text }]}>
            Nenhuma mensagem encontrada.
          </Text>
        }
      />
      {selectedMessage && (
        <MessageDetail message={selectedMessage} onClose={handleCloseModal} />
      )}
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
  title: { fontSize: 20, fontWeight: 'bold' },
  separator: { marginVertical: 30, height: 1, width: '80%' },
  messageContainer: { padding: 10, borderBottomWidth: 1, width: '100%' },
  to: { fontSize: 16, fontWeight: 'bold' },
  body: { fontSize: 14 },
  empty: { textAlign: 'center' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  closeButton: { marginTop: 20, padding: 10, borderRadius: 5 },
  closeButtonText: { fontSize: 16 },
});