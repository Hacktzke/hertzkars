import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import userImg from '../assets/userImg.jpg';
import { formatDateDMY } from '../helpers/helpers';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const UserCard = ({ user }) => {
  const { isDark } = useContext(ThemeContext);
  const { user: loggedInUser } = useContext(AuthContext);
  // const isProfilePage = user.id === loggedInUser._id ? true : false;
  const isProfilePage =
    loggedInUser && user.id === loggedInUser._id ? true : false;

  return (
    <div
      className={`card mt-3 mb-3 col-lg-8 offset-lg-2 shadow-lg ${
        isDark ? 'bg-dark text-light' : 'bg-light'
      }`}
    >
      <div className="card-body text-center text-md-start">
        <div className="row mb-3 ">
          <div className="d-flex flex-column flex-md-row align-items-center ">
            <img
              src={user.profileImg ? user.profileImg.thumbnail : userImg}
              className="rounded-cicle"
              crossOrigin="anonymous"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                border: `4px solid ${user.markerColor}`,
              }}
              alt="profile thumbnail of the user"
            ></img>
            <div className="mt-3 mt-md-0 ms-md-3">
              <h5 className="card-title ">{user.fullName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Member since: {formatDateDMY(user.createdAt)}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted d-flex align-items-center">
                {isProfilePage ? 'Your' : `${user.firstName}'s`} Marker Colour:{' '}
                <div
                  style={{
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    marginLeft: '5px',
                    backgroundColor: `${user.markerColor}`,
                  }}
                ></div>
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Vehicles Submitted: {user.vehicles.length}
              </h6>
              <h6 className="card-subtitle mb-2 text-muted">
                Favourite Vehicle:{' '}
                {user.favouriteVehicle ? user.favouriteVehicle : 'Unknown'}
              </h6>
            </div>
          </div>
        </div>
        <h5>Personal Biography:</h5>
        <p className="card-text">
          {user.bio
            ? user.bio
            : `${
                isProfilePage ? "You don't" : `${user.firstName} doesn't`
              }  currently have a biography...`}
        </p>
        {loggedInUser && user._id === loggedInUser._id && (
          <Link
            to={`/users/${user._id}/edit`}
            className="btn btn-outline-secondary me-3"
          >
            Edit Profile
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserCard;
