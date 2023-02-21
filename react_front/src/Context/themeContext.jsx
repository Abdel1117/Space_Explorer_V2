import { createContext, useContext, useEffect, useState } from "react"

export const themeContext = createContext("dark")

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    useEffect(() => {

        theme === "dark" ? setTheme("light") : setTheme("dark");

    }, [])

    return (
        <themeContext.Provider value={{ theme, setTheme }}>
            {children}
        </themeContext.Provider>
    )
}

