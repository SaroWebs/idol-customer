import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_HOST } from '../config/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
    } else {
      axios.get(`${API_HOST}/authenticate`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          setIsAuthenticated(true);
          setUser(res.data);
        })
        .catch(error => {
          console.error('Error:', error);
          setIsAuthenticated(false);
          setUser(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};