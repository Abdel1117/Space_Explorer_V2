import { useState, useEffect, useContext, lazy, Suspense } from 'react'
import { useAuth } from "./Context/userContext"
import { Navigate, Outlet } from 'react-router-dom'
import Nav from './componants/navBarre/Nav'
import Footer from './componants/Footer/Footer'
const Home = lazy(() => import('./pages/Home/Home'))
const Connexion = lazy(() => import('./pages/Connexion/Connexion'))
const Inscription = lazy(() => import('./pages/Inscription/Inscription'))
const DashBoard = lazy(() => import("./pages/DashBoard/Dashboard"))
const Ajouter_Article = lazy(() => import('./pages/Ajouter_Article/Ajouter_Article'))
const Forum = lazy(() => import('./pages/Forum/Forum'))
import { Sujet } from './pages/Forum/Sujet'
import { Ajout_Sujet } from './pages/Forum/Ajout_Sujet'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Galerie from './pages/Galerie/Galerie'
import { UserDashBoard } from './pages/UserDashBoard/UserDashBoard'
import { themeContext } from "./Context/themeContext"
import Error_404_Page from './pages/404/Error_404_Page'
import Ajouter_Image from './pages/AjouterImage/Ajouter_Image'
import Article from './pages/Article/Article'

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
  const { userAuth, isCheckingToken, isLoading } = useAuth();

  useEffect(() => {
    const root = window.document.documentElement;
    theme === "light" ? root.classList.remove("dark") : root.classList.add('dark');
  }, [theme])

  if (isLoading) {
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
          <Route path='/forum' element={<Forum />} />
          <Route path='/sujet/:id' element={<Sujet />} />
          <Route path='/ajoutSujet' element={<Ajout_Sujet />} />
          <Route path='/article/:id' element={<Article />} />
          <Route element={<PrivateRoutes />} >
            <Route path='/Profil/:id' element={<UserDashBoard />} />
            <Route path="/DashBoard" element={<DashBoard />} />
            <Route path='/ajouterArticle' element={<Ajouter_Article />} />
            <Route path='/ajouterImage' element={<Ajouter_Image />} />

          </Route>


          <Route path='*' element={<Error_404_Page />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
