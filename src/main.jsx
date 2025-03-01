import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import TokenContextProvider from './Components/Context/TokenContex.jsx'
import CartContextProvider from './Components/Context/CartContext.jsx'



createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
  <CartContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </CartContextProvider>
  </TokenContextProvider>
)
