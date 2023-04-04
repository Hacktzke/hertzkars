import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import styled from 'styled-components';

// THIS COMPONENT IS A REACT MODAL WINDOW FOR USER WELCOME.
const ModalOpacity = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: ${(props) =>
    props.isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.7)'};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  overflow-y: scroll;
`;
const ModalCard = ({ children }) => {
  const { isDark } = useContext(ThemeContext);

  return ReactDOM.createPortal(
    <ModalOpacity isDark={isDark}>
      <div className="container shadow-lg" style={{ maxWidth: '890px' }}>
        <div className="card p-3">{children}</div>
      </div>
    </ModalOpacity>,
    document.querySelector('#modal')
  );
};

export default ModalCard;
