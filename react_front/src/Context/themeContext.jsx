import { createContext, useContext, useEffect, useMemo, useState } from "react"

export const themeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const initalState = localStorage.getItem('theme') || 'light';

    const [theme, setTheme] = useState(initalState);

    const toogleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme)
        setTheme(newTheme);
    }


    useEffect(() => {
        setTheme(initalState)
    }, [theme])

    return (
        <themeContext.Provider value={{ theme, setTheme, toogleTheme }}>
            {children}
        </themeContext.Provider>
    )
}