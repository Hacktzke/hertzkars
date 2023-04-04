import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import noVehicleImg from '../assets/noVehicle.jpg';
import noLogoImg from '../assets/noLogo.jpg';

const VehicleTab = ({ vehicle }) => {
  const { isDark } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();
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

  useEffect(() => {
    setUserBtnStyle(initialUserBtnStyle);
  }, [vehicle]);

  return (
    <div
      className={`card m-3 shadow d-flex justify-content-center ${themeStyles}`}
      style={{ minHeight: '300px' }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center ">
            <Link to={`/vehicles/${vehicle._id}`} className="">
              <img
                className="card-img mt-3 mt-md-0 my-lg-3 shadow-lg "
                src={
                  vehicle.vehicleImg
                    ? vehicle.vehicleImg.thumbnail
                    : noVehicleImg
                }
                crossOrigin="anonymous"
                alt={`${vehicle.year} ${vehicle.manufacture} ${vehicle.model}`}
                loading="lazy"
                style={{ maxHeight: '250px' }}
              ></img>
            </Link>
          </div>
          <div className="px-3 px-sm-5 px-md-3 my-4 my-md-0 col-md-6 d-flex justify-content-center align-items-center">
            <div className="row">
              <div className=" d-flex align-items-center">
                <div className="me-3 ">
                  <img
                    className="my-3 my-md-0"
                    src={`/car-logos/${vehicle.urlName}-logo.png`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = noLogoImg;
                    }}
                    style={{
                      width: '60px',
                      borderRadius: '5px',
                    }}
                    crossOrigin="anonymous"
                    alt={`${vehicle.manufacture}'s Logo`}
                  ></img>
                </div>
                <div>
                  <h6 className="card-title">
                    {vehicle.year} {vehicle.manufacture} {vehicle.model}
                  </h6>
                  <p className="card-subtitle text-muted small">
                    Headquarters:<br></br>
                    <a
                      className="small"
                      href={`https://www.google.com/maps/search/?api=1&query=${vehicle.hqCoordinates[1]},${vehicle.hqCoordinates[0]}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {vehicle.hq}
                    </a>
                  </p>
                </div>
              </div>
              <div className="d-md-none">
                <hr></hr>
              </div>
              <div className="col-6 col-md-12 d-flex align-items-center">
                <ul className="list-group list-unstyled list-group-flush small ">
                  {vehicle.owner.firstName ? (
                    <li className={`mt-md-2 ${themeStyles}`}>
                      <b>Owner:</b> {vehicle.owner.fullName}
                    </li>
                  ) : (
                    <li className={`mt-2 ${themeStyles}`}>
                      <b>Year Purchased:</b>{' '}
                      {vehicle.yearPurchased
                        ? vehicle.yearPurchased
                        : 'Unknown'}
                    </li>
                  )}
                  <li className={`mt-2 ${themeStyles}`}>
                    <b>Horsepower:</b>{' '}
                    {vehicle.horsepower
                      ? `${vehicle.horsepower} HP`
                      : 'Unknown'}
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-12 my-md-2">
                <ul className="list-group list-unstyled list-group-flush small">
                  {!location.pathname.includes('users') && (
                    <li className={`mt-1 ${themeStyles}`}>
                      <Link
                        to={`/users/${vehicle.owner._id}`}
                        className="btn btn-sm w-100"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ ...userBtnStyle, maxWidth: '400px' }}
                      >
                        {vehicle.owner.firstName}'s vehicles
                      </Link>
                    </li>
                  )}
                  <li className={`mt-1 ${themeStyles}`}>
                    <Link
                      to={`/vehicles/${vehicle._id}`}
                      className="btn btn-sm my-1 btn-outline-primary w-100"
                      style={{ marginRight: '5px', maxWidth: '400px' }}
                    >
                      More Info
                    </Link>
                    {user && vehicle.owner === user._id && (
                      <Link
                        to={`/vehicles/${vehicle._id}/edit`}
                        state={vehicle}
                        className="btn btn-sm my-2 btn-outline-secondary w-100"
                        style={{ maxWidth: '400px' }}
                      >
                        Edit Vehicle
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleTab;
