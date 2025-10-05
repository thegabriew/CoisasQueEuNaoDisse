import React from 'react';
import './Header.css';

const Header = ({ onNewMessage, showNewButton = true }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="title">Coisas Que Eu Não Disse</h1>
          {showNewButton && (
            <button onClick={onNewMessage} className="btn-new-message">
              Enviar mensagem
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;