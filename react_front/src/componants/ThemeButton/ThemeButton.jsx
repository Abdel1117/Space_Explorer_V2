import React, { useContext } from 'react'
import { themeContext } from '../../Context/themeContext';
import Moon from "../../assets/icon_svg/icons8-moon.png";

export default function ThemeButton() {
    const { theme, toogleTheme } = useContext(themeContext);

    const SunIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="40px">
            <path fill="#FF9800" d="M11 11H37V37H11z" />
            <path fill="#FF9800" d="M11.272 11.272H36.728V36.728H11.272z" transform="rotate(-45.001 24 24)" />
            <path fill="#FFEB3B" d="M13,24c0,6.077,4.923,11,11,11c6.076,0,11-4.923,11-11s-4.924-11-11-11C17.923,13,13,17.923,13,24" />
        </svg>
    );

    return (
        <>
            <button className="mx-2 text" onClick={() => toogleTheme()}>
                {
                    theme === "light" ? <SunIcon /> : <img className='h-[40px] w-[40px]' src={Moon} alt="Moon" />

                }
            </button>

        </>
    )
}
