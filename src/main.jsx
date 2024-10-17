import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createTheme, MantineProvider } from '@mantine/core'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

const theme = createTheme({
  /** Put your mantine theme override here */
});

const AppProvider = ({ children }) => (
  <AuthProvider>
    <CartProvider>
      <MantineProvider theme={theme}>
        {children}
      </MantineProvider>
    </CartProvider>
  </AuthProvider>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
