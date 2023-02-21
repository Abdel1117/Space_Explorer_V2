import React, { useContext } from 'react'
import { themeContext } from '../../Context/themeContext';

export default function ThemeButton() {
    const { theme, setTheme } = useContext(themeContext);

    return (
        <>
            <button onClick={setTheme(theme)}>
                {theme === "light" ? "sun" : "moon"}
            </button>

        </>
    )
}
