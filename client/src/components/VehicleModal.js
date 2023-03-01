import React, { useContext } from 'react';
import VehicleGrid from './VehicleGrid';
import { ThemeContext } from '../contexts/ThemeContext';

const VehicleModal = ({ vehiclePopup, setVehiclePopup }) => {
  const { isDark } = useContext(ThemeContext);
  return (
    <div
      className={`position-absolute card container py-3 col-11 col-lg-10 shadow-lg ${
        isDark ? 'bg-dark' : 'bg-light'
      }`}
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflowY: 'scroll',
        maxHeight: '80%',
        zIndex: '100',
      }}
    >
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
    </div>
  );
};

export default VehicleModal;
