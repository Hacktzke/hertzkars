import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const themeStyles = isDark
    ? { background: { backgroundColor: 'rgba(0,0,0,.75)', color: 'white' } }
    : { background: { backgroundColor: 'rgba(255,255,255,.85)' } };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div>
      <ThemeContext.Provider value={{ isDark, toggleTheme, themeStyles }}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};

export default ThemeContextProvider;
