import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import UserCard from '../components/UserCard';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import VehicleGrid from '../components/VehicleGrid';
import ContentPageTemplate from '../components/ContentPageTemplate';
import ModalCard from '../components/ModalCard';
import Welcome from '../components/Welcome';
import loadingGif from '../assets/loading.gif';
import DataErrorCard from '../components/DataErrorCard';
import garageImg from '../assets/garage.jpg';

const UserPage = () => {
  const location = useLocation();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const { user: loggedInUser, introPopup } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      setUser(res.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    // THIS IS CHECKING IF THE PROFILE NAVLINK WAS CLICKED. IF SO, IT SETS THE USER.
    if (location.state) {
      fetchUser();
      delete location.state;
      return;
    }
  });

  return (
    <ContentPageTemplate bgImgUrl={garageImg}>
      {loading ? (
        <div className="d-flex justify-content-center vh-75 align-items-center">
          <img width="80px" src={loadingGif}></img>
        </div>
      ) : error ? (
        <div className="container">
          <DataErrorCard />
        </div>
      ) : (
        <div className="container">
          {introPopup && (
            <ModalCard>
              <Welcome />
            </ModalCard>
          )}
          <UserCard user={user} />
          <div className="my-5">
            {user.vehicles.length ? (
              <VehicleGrid vehicles={user.vehicles} owner={user} />
            ) : loggedInUser && loggedInUser._id === id ? (
              <div
                className={`card col-md-6 offset-md-3 text-center shadow-lg ${
                  isDark ? 'bg-dark text-light' : 'bd-light'
                }`}
              >
                <div className="card-body p-3">
                  <h5 className="card-title">
                    Hey <i>{user.firstName}</i>,
                  </h5>
                  <p className="card-text">
                    you currently done have any vehicles loaded. <br></br>let's
                    add one now!
                  </p>
                  <Link
                    to="/vehicles/new"
                    className="btn mx-auto btn-outline-primary"
                    type="button"
                    style={{ width: '200px' }}
                  >
                    Add Vehicle
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <h5 className="text-center">
                  {user.firstName} does not have any vehicles added...
                </h5>
              </div>
            )}
          </div>
        </div>
      )}
    </ContentPageTemplate>
  );
};

export default UserPage;
