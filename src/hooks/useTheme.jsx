import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleChristmas = () => {
    setTheme((prevTheme) => (prevTheme === 'light' || prevTheme === 'dark' ? 'christmas' : 'dark'));
  }

  return { theme, toggleTheme, toggleChristmas };
};

export default useTheme;
