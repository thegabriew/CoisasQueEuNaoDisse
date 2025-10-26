import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Modal, View } from 'react-native';
import { Text } from '@/components/Themed';
import { fetchMessages } from '@/api/api';

const MessageDetail = ({ message, onClose }: { message: { id: string; reciver: string; message: string }; onClose: () => void }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Detalhes da Mensagem</Text>
          <View style={styles.separator} />
          <Text style={styles.to}>Para: {message.reciver}</Text>
          <Text style={styles.body}>{message.message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function TabOneScreen() {
  const [messages, setMessages] = useState<{ id: string; reciver: string; message: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<{ id: string; reciver: string; message: string } | null>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const data = await fetchMessages();
        setMessages(data);
        console.log(data);
      } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  if (loading) return (
    <View style={styles.container}>
      <Text style={styles.title}>Carregando...</Text>
    </View>
  );

  const handleMessagePress = (message: { id: string; reciver: string; message: string }) => {
    setSelectedMessage(message);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coisas que Eu não Disse</Text>
      <View style={styles.separator} />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleMessagePress(item)} style={styles.messageContainer}>
            <Text style={styles.to}>Para: {item.reciver}</Text>
            <Text style={styles.body}>{item.message}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma mensagem encontrada.</Text>}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  to: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    color: '#555',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#000',
  },
});