import React, { createContext, useContext, useEffect, useState } from "react";

// creating a theme context
const ThemeContext = createContext();

// creating a provider component that holds the state
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // getting the initial state from localStorage
    const saveMode = localStorage.getItem("isDarkMode");
    return saveMode === "true" ? true : false;
  });

  // save the theme to localStorage
  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
