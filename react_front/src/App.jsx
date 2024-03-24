import { useState, useEffect, useContext, useMemo, lazy, Suspense } from 'react'
import { useAuth } from "./Context/userContext"
import { Navigate, Outlet } from 'react-router-dom'
import Nav from './componants/navBarre/Nav'
import Footer from './componants/Footer/Footer'
const Home = lazy(() => import('./pages/Home/Home'))
const Connexion = lazy(() => import('./pages/Connexion/Connexion'))
const Inscription = lazy(() => import('./pages/Inscription/Inscription'))
const DashBoard = lazy(() => import("./pages/DashBoard/Dashboard"))
import { MentionLegales } from './pages/MentionsLegales/MentionLegales'
import { NousContacter } from './pages/NousContacter/NousContacter'
import { PolitiqueDeConfidentialite } from './pages/PolitiqueDeConfidentialite/PolitiqueDeConfidentialite'
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
import { NousSoutenir } from "./pages/NousSoutenir/NousSoutenir"
import { EditImage } from './componants/EditEntity/EditImage/EditImage'
import { EditArticle } from './componants/EditEntity/EditArticle/EditArticle'
import { EditSujet } from './componants/EditEntity/EditSujet/EditSujet'
import { Spinner } from './componants/Spinner/Spinner'
import { CookieBanner } from './componants/CookieBanner/CookieBanner';
import { getCookie, setCookie } from './Functions/CookiesFunction/CookiesFunction'
import { ScrollToTop } from './componants/ScrollToTop/ScrollToTop'

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
  const [showBannerCookie, setShowBannerCookie] = useState(false)


  /* UseEffect to handle the theme of the appplication */
  useEffect(() => {
    const root = window.document.documentElement;
    theme === "light" ? root.classList.remove("dark") : root.classList.add('dark');
  }, [theme])

  /* useMemo to handle the showBannerCookie state */
  const memoizedShowBannerCookie = useMemo(() => {
    const cookie = getCookie("acceptCookie");
    return cookie === undefined;
  }, [document.cookie]); //

  /* Update showBannerCookie state */
  useEffect(() => {
    setShowBannerCookie(memoizedShowBannerCookie);
  }, [memoizedShowBannerCookie]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <ScrollToTop />
      <Nav />

      <main className='bg-[#F5F5F5] dark:bg-[#252525] overflow-scroll'>

        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/inscription' element={<Inscription />} />
            <Route path='/connexion' element={<Connexion />} />
            <Route path='/galerie' element={<Galerie />} />
            <Route path='/forum' element={<Forum />} />
            <Route path='/mentions-legales' element={<MentionLegales />} />
            <Route path='/politique-confidentialite' element={< PolitiqueDeConfidentialite />} />
            <Route path='/nous-contacter' element={<NousContacter />} />
            <Route path='/sujet/:id' element={<Sujet />} />
            <Route path='/ajoutSujet' element={<Ajout_Sujet />} />
            <Route path='/article/:id' element={<Article />} />
            <Route path='/Profil/:id' element={<UserDashBoard />} />
            <Route path="/soutenir" element={<NousSoutenir />} />
            <Route element={<PrivateRoutes />} >
              <Route path="/DashBoard" element={<DashBoard />} />
              <Route path='/ajouterArticle' element={<Ajouter_Article />} />
              <Route path='/ajouterImage' element={<Ajouter_Image />} />
              <Route path='/editImage/:id' element={<EditImage />} />
              <Route path='/editArticle/:id' element={<EditArticle />} />
              <Route path='/editSujet/:id' element={<EditSujet />} />
            </Route>
            <Route path='*' element={<Error_404_Page />} />
          </Routes>
        </Suspense>
        {showBannerCookie &&
          <CookieBanner />
        }

      </main>

      <Footer />
    </>
  )
}

export default App
