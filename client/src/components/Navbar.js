import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme, themeStyles } = useContext(ThemeContext);
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const logout = async () => {
    try {
      const res = await axios.get('/api/auth/logout');
      const { auth } = res.data;
      navigate('/');
      setIsLoggedIn(auth);
      setUser(undefined);
    } catch (error) {
      console.log(error.message);
    }
  };

  document.addEventListener('click', (e) => {
    isNavCollapsed &&
      !e.target.className.includes('nav') &&
      setIsNavCollapsed(false);
    isNavCollapsed &&
      e.target.className.includes('nav-link') &&
      setIsNavCollapsed(false);
  });

  return (
    <div>
      <div className={'position-absolute w-100'} style={{ zIndex: '100' }}>
        <nav
          className={` navbar navbar-expand-lg ${
            isDark ? 'navbar-dark' : 'navbar-light'
          }`}
          style={
            location.pathname !== '/' || isNavCollapsed
              ? themeStyles.background
              : {}
          }
        >
          <div className="mx-4 d-flex">
            <NavLink
              to="/"
              style={{
                color: isLoggedIn && `${user.markerColor}`,
                fontSize: '1.25rem',
              }}
              className={`nav-link nav-item ${
                !isLoggedIn ? (isDark ? 'text-light' : 'text-dark') : ''
              }`}
            >
              Hertzzzkars
            </NavLink>
            <ion-icon
              style={{
                color: isDark ? 'yellow' : 'black',
                marginLeft: '20px',
                alignSelf: 'center',
                fontSize: '20px',
              }}
              name={isDark ? 'moon-outline' : 'sunny-outline'}
              onClick={() => {
                toggleTheme();
              }}
            ></ion-icon>
          </div>

          <button
            className="navbar-toggler me-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded={!isNavCollapsed ? true : false}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${
              isNavCollapsed ? 'collapse' : ''
            }collapse navbar-collapse`}
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <NavLink to="/vehicles" className="nav-item nav-link ms-3">
                Vehicles
              </NavLink>
              <NavLink className="nav-item nav-link ms-3" to={'/vehicles/new'}>
                New Vehicle
              </NavLink>
              {!isLoggedIn
                ? [
                    <NavLink
                      key="1"
                      end
                      to="/login"
                      className="nav-item nav-link ms-3"
                    >
                      Login
                    </NavLink>,
                    <NavLink
                      key="2"
                      end
                      to="/register"
                      className="nav-item nav-link ms-3"
                    >
                      Register
                    </NavLink>,
                  ]
                : [
                    <NavLink
                      key="3"
                      to={`/users/${user._id}`}
                      state={{ id: user._id }}
                      className="nav-item nav-link ms-3"
                      style={{
                        color: user.markerColor,
                      }}
                    >
                      {user.firstName}
                    </NavLink>,
                    <NavLink
                      key="4"
                      to="/"
                      className="nav-item nav-link ms-3"
                      onClick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </NavLink>,
                  ]}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
