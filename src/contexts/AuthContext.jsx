import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_HOST } from '../config/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    refreshAuth();
  }, []);

  const refreshAuth = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false); // Authentication check is complete
    } else {
      axios.get(`${API_HOST}/authenticate`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.data) {
            setIsAuthenticated(true);
            setUser(res.data);
          }
        })
        .catch(error => {
          console.log('error');
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        })
        .finally((response) => {
          console.log(response);
          setLoading(false);
        });
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isOtpSent')
    localStorage.removeItem('isVerified')
    localStorage.removeItem('phone');
    localStorage.clear();
    setIsAuthenticated(false); // Update state
    setUser(null); // Clear user information
  };

  // Return the logout method in the context
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, setIsAuthenticated, setUser, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
