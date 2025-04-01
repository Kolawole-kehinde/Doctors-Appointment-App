import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppContextProvider from './context/AppContext.jsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AppContextProvider>
    <App />
    <Toaster />
    </AppContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
