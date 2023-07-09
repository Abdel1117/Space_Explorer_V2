import { useState, useEffect, useContext } from 'react'
import { useAuth } from "./Context/userContext"
import { Navigate, Outlet } from 'react-router-dom'
import Nav from './componants/navBarre/Nav'
import Footer from './componants/Footer/Footer'
import Home from './pages/Home/Home'
import Connexion from './pages/Connexion/Connexion'
import Inscription from './pages/Inscription/Inscription'
import DashBoard from "./pages/DashBoard/Dashboard"
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Galerie from './pages/Galerie/Galerie'
import { UserDashBoard } from './pages/UserDashBoard/UserDashBoard'
import { themeContext } from "./Context/themeContext"
import Error_404_Page from './pages/404/Error_404_Page'
import Ajouter_Entity from './pages/Ajouter_Entity/Ajouter_Entity'


const PrivateRoutes = () => {
  const { userAuth } = useAuth();



  if (userAuth === undefined) {
    return null;
  }

  return userAuth !== null && userAuth.userRole === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};


function App() {
  const { theme, setTheme } = useContext(themeContext);
  const { isLoading, userAuth, isCheckingToken } = useAuth();

  useEffect(() => {
    const root = window.document.documentElement;
    theme === "light" ? root.classList.remove("dark") : root.classList.add('dark');
  }, [theme])
  if (isCheckingToken) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Nav />
      <main className='bg-[#F5F5F5] dark:bg-[#252525]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/inscription' element={<Inscription />} />
          <Route path='/connexion' element={<Connexion />} />
          <Route path='/galerie' element={<Galerie />} />
          <Route path='/Profil/:id' element={<UserDashBoard />} />

          <Route element={<PrivateRoutes />} >
            <Route path="/DashBoard" element={<DashBoard />} />
            <Route path='/Ajouter_Entity' element={<Ajouter_Entity />} />

          </Route>


          <Route path='*' element={<Error_404_Page />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
