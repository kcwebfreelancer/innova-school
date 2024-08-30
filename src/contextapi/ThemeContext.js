import React, { useContext, createContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('pink');

    const toggleTheme = () => {
        setTheme(theme === 'pink' ? 'dark' : 'pink');
        localStorage.setItem('theme', theme);
    }

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);