import React from 'react';
import styled from 'styled-components';

const NoVehiclesModal = ({ setNoVehiclesPopupText, noVehiclesPopupText }) => {
  const NoVehiclesModal = styled.div.attrs({
    className: 'card',
  })`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
  `;

  // return (
  //   <div
  //     className="position-absolute card"
  //     style={{
  //       top: '50%',
  //       left: '50%',
  //       transform: 'translate(-50%, -50%)',
  //       zIndex: '10000',
  //     }}
  //   >
  //     <div className="card-body text-center">
  //       <h5 className="card-title mb-3">{noVehiclesPopupText}</h5>
  //       <button
  //         className="btn btn-outline-primary w-50"
  //         onClick={() => setNoVehiclesPopupText('')}
  //       >
  //         Okay
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <NoVehiclesModal>
      <div className="card-body text-center">
        <h5 className="card-title mb-3">{noVehiclesPopupText}</h5>
        <button
          className="btn btn-outline-primary w-50"
          onClick={() => setNoVehiclesPopupText('')}
        >
          Okay
        </button>
      </div>
    </NoVehiclesModal>
  );
};

export default NoVehiclesModal;
