import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext } from '../contexts/ThemeContext';

const ModalCard = ({ children }) => {
  const { isDark } = useContext(ThemeContext);
  const overlayStyles = {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '100',
    overflowY: 'scroll',
  };
  return ReactDOM.createPortal(
    <div style={overlayStyles}>
      <div className="container shadow-lg" style={{ maxWidth: '890px' }}>
        <div className="card p-3">{children}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default ModalCard;
