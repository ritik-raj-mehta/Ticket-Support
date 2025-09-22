import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './store/Theme.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
    <ThemeProvider>
    <App />
    <ToastContainer />
    </ThemeProvider>
    </BrowserRouter>
  
)
