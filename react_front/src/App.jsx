import { useState } from 'react'
import Nav from './componants/navBarre/Nav'
import Home from './pages/Home/Home'
import Connexion from './pages/Connexion/Connexion'
import Inscription from './pages/Inscription/Inscription'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Galerie from './pages/Galerie/Galerie'
import { UserDashBoard } from './pages/UserDashBoard/UserDashBoard'

function App() {

  return (
    <>
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/inscription' element={<Inscription />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='/galerie' element={<Galerie />} />
          <Route path='/Profil' element={<UserDashBoard />} />
        </Routes>
      </main>
    </>
  )
}

export default App
