import { useState, useEffect, useContext } from 'react'
import Nav from './componants/navBarre/Nav'
import Footer from './componants/Footer/Footer'
import Home from './pages/Home/Home'
import Connexion from './pages/Connexion/Connexion'
import Inscription from './pages/Inscription/Inscription'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Galerie from './pages/Galerie/Galerie'
import { UserDashBoard } from './pages/UserDashBoard/UserDashBoard'
import { themeContext } from "./Context/themeContext"

function App() {
  const { theme, setTheme } = useContext(themeContext);

  useEffect(() => {
    const root = window.document.documentElement;
    theme === "light" ? root.classList.remove("dark") : root.classList.add('dark');
  }, [theme])

  return (
    <>
      <Nav />
      <main className='dark:bg-[#252525]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/inscription' element={<Inscription />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='/galerie' element={<Galerie />} />
          <Route path='/Profil/:id' element={<UserDashBoard />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
