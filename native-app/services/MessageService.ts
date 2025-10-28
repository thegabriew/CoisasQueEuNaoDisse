import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import { sendMessage as apiSendMessage } from '@/api/api';

type Message = {
  id?: string;
  reciver: string;
  message: string;
};

const CACHED_MESSAGES_KEY = '@CacheMessages';

export class MessageService {
  static async getCachedMessages(): Promise<Message[]> {
    try {
      const raw = await AsyncStorage.getItem(CACHED_MESSAGES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('getCachedMessages', e);
      return [];
    }
  }

  static async setCachedMessages(list: Message[]) {
    try {
      await AsyncStorage.setItem(CACHED_MESSAGES_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('setCachedMessages', e);
    }
  }

  static async cacheMessage(message: Message) {
    try {
      const list = await this.getCachedMessages();
      list.push(message);
      await this.setCachedMessages(list);
      console.log('Mensagem cacheada localmente');
    } catch (e) {
      console.error('cacheMessage', e);
    }
  }

  static async removeCachedMessage(match: Message) {
    try {
      const list = await this.getCachedMessages();
      const filtered = list.filter(m => {
        if (m.id && match.id) return m.id !== match.id;
        return !(m.reciver === match.reciver && m.message === match.message);
      });
      await this.setCachedMessages(filtered);
    } catch (e) {
      console.error('removeCachedMessage', e);
    }
  }

  static async sendCachedMessages() {
    try {
      const net = await Network.getNetworkStateAsync();
      if (!net.isConnected || !net.isInternetReachable) {
        console.log('Sem conexão — não enviando cache');
        return;
      }

      const list = await this.getCachedMessages();
      for (const msg of list) {
        try {
          await apiSendMessage(msg);
          await this.removeCachedMessage(msg);
          console.log('Mensagem do cache enviada para', msg.reciver);
        } catch (e) {
          console.error('Erro enviando mensagem do cache', e);
        }
      }
    } catch (e) {
      console.error('sendCachedMessages', e);
    }
  }

  static async sendMessage(message: Message): Promise<boolean> {
    try {
      const net = await Network.getNetworkStateAsync();
      if (!net.isConnected || !net.isInternetReachable) {
        await this.cacheMessage(message);
        return false;
      }

      try {
        await apiSendMessage(message);
        return true;
      } catch (e) {
        // falha ao enviar, salva no cache
        await this.cacheMessage(message);
        return false;
      }
    } catch (e) {
      console.error('sendMessage', e);
      await this.cacheMessage(message);
      return false;
    }
  }
}