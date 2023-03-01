import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useLocation, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Footer = () => {
  const location = useLocation();
  const { themeStyles } = useContext(ThemeContext);
  const { user, isLoggedIn } = useContext(AuthContext);
  if (location.pathname !== '/') {
    return (
      <div
        className="w-100 text-center py-2 shadow-lg position-absolute"
        style={{
          ...themeStyles.background,
          height: '100px',
          bottom: '0px',
        }}
      >
        <NavLink
          to="/"
          className="navbar-brand "
          style={{
            color: isLoggedIn ? `${user.markerColor}` : '',
            fontSize: '1.25rem',
            fontWeight: '700',
          }}
        >
          <h2>Hertzkars</h2>
        </NavLink>
        <p>
          Created by{' '}
          <a
            href="https://www.linkedin.com/in/jeshua-hertzke-29bb95233/"
            target="_blank"
            rel="noreferrer"
          >
            Jeshua Hertzke
          </a>
        </p>
      </div>
    );
  }
};

export default Footer;
