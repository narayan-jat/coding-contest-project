import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa'; // Import icons from react-icons
import '../index.css';
const ThemeButton = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Load the saved theme from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
      setCSSVariables(savedTheme);
    }
  }, []);

  const setCSSVariables = (theme) => {
    const root = document.documentElement;

    if (theme === 'dark') {
      root.style.setProperty('--background-color', '#0D1117');
      root.style.setProperty('--text-color', '#e0e0e0');
      root.style.setProperty('--primary-color', '#1E90FF');
      root.style.setProperty('--secondary-color', '#2D333B');
      root.style.setProperty('--border-color', '#58A6FF');
      root.style.setProperty('--bottom-border-color', 'rgb(43, 38, 38)');
      root.style.setProperty('--active-color', '#2EA043');
      root.style.setProperty('--card-color', 'rgb(50, 50, 50)')
      root.style.setProperty('--signup-card-color', 'rgb(1, 0, 0)')
      root.style.setProperty('--hover-background-color', 'rgb(93, 92, 92)')
      root.style.setProperty('--popup-bg-color', '#333')

    } else {
      root.style.setProperty('--background-color', '#FFFFFF');
      root.style.setProperty('--text-color', '#000000');
      root.style.setProperty('--primary-color', '#007ACC');
      root.style.setProperty('--secondary-color', '#D1D5DA');
      root.style.setProperty('--border-color', '#1F6FEB');
      root.style.setProperty('--active-color', '#2EA043');
      root.style.setProperty('--bottom-border-color', 'rgb(250, 246, 246)');
      root.style.setProperty('--card-color', 'rgb(237, 231, 231)')
      root.style.setProperty('--signup-card-color', 'rgb(219, 219, 160')
      root.style.setProperty('--hover-background-color', 'rgb(247, 232, 232)')
      root.style.setProperty('--popup-bg-color', '#dde9e8')
    }
  };

  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    setCSSVariables(newTheme);
    localStorage.setItem('theme', newTheme); // Save the theme to local storage
  };

  return (
    <div>
      <button 
        onClick={toggleTheme}
        aria-label={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', paddingTop: "5px", paddingLeft: "0px", color: "var(--text-color)"}}
      >Theme &nbsp;
        {isDarkTheme 
          ? <FaSun size={14} style={{ color: '#D3D3D3' }} /> // Light gray for dark mode
          : <FaMoon size={14} style={{ color: '#000000' }} /> // Black for light mode
        }
      </button>
    </div>
  );
};

export default ThemeButton;
