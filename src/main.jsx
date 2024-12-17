import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, MantineProvider } from '@mantine/core'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router } from 'react-router-dom'

const theme = createTheme({
  /** Put your mantine theme override here */
});

const AppProvider = ({ children }) => (
  <Router>
    <AuthProvider>
      <CartProvider>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </CartProvider>
    </AuthProvider>
  </Router>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AppProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </AppProvider>
  </StrictMode>,
);
