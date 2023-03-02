import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDateDMY } from '../helpers/helpers';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import noVehicleImg from '../assets/noVehicle.jpg';
import noLogoImg from '../assets/noLogo.jpg';

export const VehicleCard = ({ vehicle }) => {
  const { user } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const themeStyles = isDark ? 'bg-dark text-white' : '';

  const initialUserBtnStyle = {
    border: `1px solid ${vehicle.owner.markerColor}`,
    color: `${vehicle.owner.markerColor}`,
  };
  const [userBtnStyle, setUserBtnStyle] = useState(initialUserBtnStyle);

  const handleMouseLeave = () => {
    setUserBtnStyle(initialUserBtnStyle);
  };

  const handleMouseEnter = () => {
    setUserBtnStyle({
      border: `1px solid ${vehicle.owner.markerColor}`,
      color: 'white',
      backgroundColor: `${vehicle.owner.markerColor}`,
    });
  };

  return (
    <div className={`card shadow ${themeStyles}`}>
      <img
        className="card-img-top shadow"
        crossOrigin="anonymous"
        src={vehicle.vehicleImg ? vehicle.vehicleImg.cardImg : noVehicleImg}
        alt={`${vehicle.year} ${vehicle.manufacture} ${vehicle.model}`}
        style={{ maxHeight: '1500px' }}
      ></img>
      <div className="container">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <div>
              <img
                className="me-3"
                // src={`${vehicle.logo.split('org')[1]}` || noLogoImg}
                src={`/car-logos/${vehicle.urlName}-logo.png`}
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noLogoImg;
                }}
                style={{
                  width: '60px',
                  borderRadius: '5px',
                }}
                alt={`${vehicle.manufacture}'s Logo`}
              ></img>
            </div>
            <div>
              <h5 className="card-title">
                {vehicle.year} {vehicle.manufacture} {vehicle.model}
              </h5>
              <p className="card-text text-muted m-0">
                Headquarters:{' '}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${vehicle.hqCoordinates[1]},${vehicle.hqCoordinates[0]}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {vehicle.hq}
                </a>
              </p>
              <p className="card-text text-muted">
                Vehicle added: {formatDateDMY(vehicle.createdAt)}
              </p>
            </div>
          </div>
          <p className="card-text mb-0">
            <b>Description:</b>
            <br></br>{' '}
            {vehicle.description
              ? vehicle.description
              : 'There is no description for this vehicle sorry...'}
          </p>
        </div>
        <ul className="list-group list-group-flush mb-3">
          <li className={`list-group-item ${themeStyles}`}>
            <b>Owner:</b> {vehicle.owner.firstName} {vehicle.owner.lastName}{' '}
          </li>
          <li className={`list-group-item ${themeStyles}`}>
            <b>Colour:</b> {vehicle.color}{' '}
          </li>
          <li className={`list-group-item ${themeStyles}`}>
            <b>Horsepower:</b>{' '}
            {vehicle.horsepower ? `${vehicle.horsepower}HP` : 'Unknown'}
          </li>
          <li className={`list-group-item ${themeStyles}`}>
            <b>Year Purchased:</b>{' '}
            {vehicle.yearPurchased ? vehicle.yearPurchased : 'Unknown'}
          </li>
        </ul>
        <Link
          to={`/users/${vehicle.owner._id}`}
          className="btn mx-3"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={userBtnStyle}
        >
          {user && vehicle.owner._id === user._id
            ? 'View your other vehicles'
            : `More vehicles from ${vehicle.owner.firstName}`}
        </Link>
        {user && vehicle.owner._id === user._id && (
          <Link
            to={`/vehicles/${vehicle._id}/edit`}
            state={vehicle}
            className="btn btn-outline-secondary"
            style={{ marginLeft: '5px' }}
          >
            Edit Vehicle
          </Link>
        )}
        <div className="card-body"></div>
      </div>
    </div>
  );
};
