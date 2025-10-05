import React, { useState } from 'react';
import './NewMessage.css';

const NewMessage = ({ onBack, onMessageCreated, apiBaseUrl }) => {
  const [message, setMessage] = useState('');
  const [reciver, setReciver] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setSubmitStatus({ type: 'error', message: 'A mensagem é obrigatória.' });
      return;
    }

    if (!reciver.trim()) {
      setSubmitStatus({ type: 'error', message: 'O destinatário é obrigatório.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${apiBaseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          reciver: reciver.trim()
        }),
      });

      if (response.ok) {
        setMessage('');
        setReciver('');
        setSubmitStatus({ type: 'success', message: 'Mensagem enviada!' });
        onMessageCreated();
        
        setTimeout(() => {
          onBack();
        }, 2000);
      } else {
        const errorData = await response.json();
        setSubmitStatus({ type: 'error', message: errorData.error || 'Erro ao enviar.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Erro de conexão.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-message">
      <div className="container">
        <div className="new-message-header">
          <button onClick={onBack} className="back-button">
            ← Voltar
          </button>
          <h1>Nova mensagem</h1>
        </div>

        <form onSubmit={handleSubmit} className="message-form">
          <div className="form-group">
            <label htmlFor="reciver">Destinatário *</label>
            <input
              type="text"
              id="reciver"
              value={reciver}
              onChange={(e) => setReciver(e.target.value)}
              placeholder="Para quem é esta mensagem?"
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Mensagem *</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="O que você gostaria de dizer?"
              rows={6}
              maxLength={500}
              required
            />
            <div className="char-count">
              {message.length}/500
            </div>
          </div>

          {submitStatus && (
            <div className={`status-message ${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onBack}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || !message.trim() || !reciver.trim()}
              className="btn-primary"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewMessage;