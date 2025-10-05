import React from 'react';
import './MessageCard.css';

const MessageCard = ({ message }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Hoje';
    } else if (diffDays === 2) {
      return 'Ontem';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} dias atrás`;
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  };

  return (
    <div className="message-card">
      <div className="message-content">
        <p>{message.message}</p>
      </div>
      
      <div className="message-meta">
        <span className="message-reciver">Para: {message.reciver || 'Não informado'}</span>
        <span className="message-date">{formatDate(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default MessageCard;