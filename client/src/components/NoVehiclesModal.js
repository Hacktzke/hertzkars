import React from 'react';
import styled from 'styled-components';

const Modal = styled.div.attrs({
  className: 'card',
})`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
`;

const NoVehiclesModal = ({ setNoVehiclesPopupText, noVehiclesPopupText }) => {
  return (
    <Modal>
      <div className="card-body text-center">
        <h5 className="card-title mb-3">{noVehiclesPopupText}</h5>
        <button
          className="btn btn-outline-primary w-50"
          onClick={() => setNoVehiclesPopupText('')}
        >
          Okay
        </button>
      </div>
    </Modal>
  );
};

export default NoVehiclesModal;
