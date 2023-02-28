import { createContext, useContext, useEffect, useState } from "react"

export const themeContext = createContext("light")

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const toogleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    }

    return (
        <themeContext.Provider value={{ theme, setTheme, toogleTheme }}>
            {children}
        </themeContext.Provider>
    )
}