import React from 'react';
import MessageCard from './MessageCard';
import './MessageList.css';

const MessageList = ({ messages, loading }) => {
  if (loading) {
    return (
      <div className="message-list">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="message-list">
        <div className="empty-state">
          <p>Nenhuma mensagem ainda.</p>
        </div>
      </div>
    );
  }

  // Ordenar mensagens por data de criação (mais recentes primeiro)
  const sortedMessages = [...messages].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="message-list">
      {sortedMessages.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;