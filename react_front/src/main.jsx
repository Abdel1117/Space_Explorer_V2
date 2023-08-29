import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { UserProvider } from './Context/userContext'
import App from './App'
import './index.css'
import { ThemeProvider } from './Context/themeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>

      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
