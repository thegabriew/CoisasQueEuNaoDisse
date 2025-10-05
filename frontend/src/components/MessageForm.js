import React, { useState } from 'react';
import './MessageForm.css';

const MessageForm = ({ onMessageCreated, apiBaseUrl }) => {
  const [message, setMessage] = useState('');
  const [reciver, setReciver] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Por favor, escreva sua mensagem.' });
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
          reciver: reciver.trim() || null
        }),
      });

      if (response.ok) {
        setMessage('');
        setReciver('');
        setSubmitStatus({ type: 'success', message: 'Mensagem enviada com sucesso! 🎉' });
        onMessageCreated();
        
        // Limpar status após 3 segundos
        setTimeout(() => setSubmitStatus(null), 3000);
      } else {
        const errorData = await response.json();
        setSubmitStatus({ type: 'error', message: errorData.error || 'Erro ao enviar mensagem.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Erro de conexão. Tente novamente.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = () => {
    setMessage('');
    setReciver('');
    setSubmitStatus(null);
  };

  return (
    <div className="message-form-wrapper">
      <div className="message-form-card">
        <div className="form-header">
          <div className="form-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" fill="currentColor"/>
              <path d="M7 9H17V11H7V9ZM7 12H14V14H7V12Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="form-title">Compartilhe seu pensamento</h2>
          <p className="form-description">
            Escreva algo que você sempre quis dizer, mas nunca teve coragem
          </p>
        </div>

        <form onSubmit={handleSubmit} className="message-form">
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Sua mensagem
              <span className="required">*</span>
            </label>
            <div className="textarea-wrapper">
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Comece a escrever..."
                rows={5}
                maxLength={1000}
                required
                className="form-textarea"
              />
              <div className="char-count">
                <span className={message.length > 900 ? 'warning' : ''}>
                  {message.length}/1000
                </span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reciver" className="form-label">
              Para quem? 
              <span className="optional">(opcional)</span>
            </label>
            <input
              type="text"
              id="reciver"
              value={reciver}
              onChange={(e) => setReciver(e.target.value)}
              placeholder="Nome, iniciais ou deixe em branco..."
              maxLength={100}
              className="form-input"
            />
          </div>

          {submitStatus && (
            <div className={`status-alert ${submitStatus.type}`}>
              <div className="status-icon">
                {submitStatus.type === 'success' ? '✓' : '⚠'}
              </div>
              <span>{submitStatus.message}</span>
            </div>
          )}

          <div className="form-actions">
            <button 
              type="button" 
              onClick={clearForm}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Limpar
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || !message.trim()}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <>
                  <span className="btn-spinner"></span>
                  Enviando...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                  </svg>
                  Enviar Mensagem
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageForm;