import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_HOST } from '../config/config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState({
    active: false,
    description: ''
  });

  useEffect(() => {
    refreshAuth();
  }, []);

  const refreshAuth = () => {
    setLoading({
      active: true,
      description: 'Validating User..'
    });
    localStorage.removeItem('isOtpSent')
    localStorage.removeItem('isVerified')
    const token = localStorage.getItem('token');

    if (!token) {
      logout();
      setLoading({
        active: false,
        description: 'Unauthenticated'
      });
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
            setLoading({
              active: false,
              description: ''
            });
          }
        })
        .catch(error => {
          setIsAuthenticated(false);
          setUser(null);
          setLoading({
            active: false,
            description: 'Unauthenticated'
          });
        })
        .finally((response) => {
          setLoading({
            ...loading,
            active: false,
          });
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
    setLoading({
      active: false,
      description: 'User logged out'
    });
  };

  // Return the logout method in the context
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, setIsAuthenticated, setUser, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
