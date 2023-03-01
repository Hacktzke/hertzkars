import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({});
  const [introPopup, setIntroPopup] = useState(false);
  const changeLoggedInStatus = (bool) => {
    setIsLoggedIn(bool);
  };

  const checkLoggedIn = async () => {
    if (isLoggedIn === null) {
      try {
        const res = await axios.get('/api/auth/');
        const { auth, user } = res.data;
        changeLoggedInStatus(auth);
        setUser(user);
      } catch (error) {
        console.log(error.message);
        setIsLoggedIn(false);
      }
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          changeLoggedInStatus,
          user,
          setUser,
          introPopup,
          setIntroPopup,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
