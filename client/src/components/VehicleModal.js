import React, { useContext } from 'react';
import VehicleGrid from './VehicleGrid';
import { ThemeContext } from '../contexts/ThemeContext';
import styled from 'styled-components';

const VehicleModal = ({ vehiclePopup, setVehiclePopup }) => {
  const { isDark } = useContext(ThemeContext);

  const VehicleGridWrapper = styled.div.attrs({
    className: `card container py-3 col-11 col-lg-10 shadow-lg ${
      isDark ? 'bg-dark' : 'bg-light'
    }`,
  })`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-y: scroll;
    max-height: 80%;
    z-index: 100;
  `;

  // return (
  //   <div
  //     className={`position-absolute card container py-3 col-11 col-lg-10 shadow-lg ${
  //       isDark ? 'bg-dark' : 'bg-light'
  //     }`}
  //     style={{
  //       top: '50%',
  //       left: '50%',
  //       transform: 'translate(-50%, -50%)',
  //       overflowY: 'scroll',
  //       maxHeight: '80%',
  //       zIndex: '100',
  //     }}
  //   >
  //     <div className="position-relative w-100 mb-3">
  //       <button
  //         type="button"
  //         className="btn-close"
  //         style={{
  //           float: 'right',
  //           backgroundColor: `${isDark ? 'grey' : ''}`,
  //         }}
  //         aria-label="Close"
  //         onClick={() => {
  //           setVehiclePopup(false);
  //         }}
  //       ></button>
  //     </div>
  //     <VehicleGrid vehicles={vehiclePopup} />
  //   </div>
  // );
  return (
    <VehicleGridWrapper>
      <div className="position-relative w-100 mb-3">
        <button
          type="button"
          className="btn-close"
          style={{
            float: 'right',
            backgroundColor: `${isDark ? 'grey' : ''}`,
          }}
          aria-label="Close"
          onClick={() => {
            setVehiclePopup(false);
          }}
        ></button>
      </div>
      <VehicleGrid vehicles={vehiclePopup} />
    </VehicleGridWrapper>
  );
};

export default VehicleModal;
