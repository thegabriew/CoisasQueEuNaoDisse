import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import MessageList from './components/MessageList';
import NewMessage from './components/NewMessage';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentView, setCurrentView] = useState('home'); // 'home' ou 'new-message'

  const API_BASE_URL = 'http://localhost:5001';

  useEffect(() => {
    fetchMessages();
  }, [refreshTrigger]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/messages`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Erro ao buscar mensagens');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleNewMessage = () => {
    setCurrentView('new-message');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  if (currentView === 'new-message') {
    return (
      <div className="App">
        <NewMessage 
          onBack={handleBackToHome}
          onMessageCreated={handleMessageCreated}
          apiBaseUrl={API_BASE_URL}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Header onNewMessage={handleNewMessage} />
      <main>
        <div className="container">
          <MessageList 
            messages={messages}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
