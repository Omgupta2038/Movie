import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggleButton = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="theme-toggle">
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
    );
};

export default ThemeToggleButton;
