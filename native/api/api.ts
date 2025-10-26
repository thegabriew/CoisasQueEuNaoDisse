import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/'
});

export const fetchMessages = async () => {
  try {
    const response = await api.get('messages');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    throw error;
  }
};

export const sendMessage = async (message: { reciver: string; message: string }) => {
  try {
    const response = await api.post('messages', message);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error;
  }
};

export const viewMessage = async (id: string) => {
  try {
    const response = await api.get(`messages/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar mensagem:', error);
    throw error;
  }
};

export default api;