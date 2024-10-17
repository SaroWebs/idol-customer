import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_HOST } from '../config/config';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchCart();
  }, [user]);

  const fetchCart = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_HOST}/cart`, {  // Updated to use API_HOST
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          setCart(res.data);
        })
        .catch(error => {
          console.error('Error fetching cart:', error);
        });
    } else {
      setCart(null);
    }
  };

  const addToCart = (product_id) => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_HOST}/cart/add-item/${product_id}`, {  // Updated to use API_HOST
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        fetchCart();
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
    }
  };

  const removeFromCart = (item_id) => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_HOST}/cart/remove-item/${item_id}`, {  // Updated to use API_HOST
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        fetchCart();
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
      });
    }
  };

  const updateCart = (item_id, quantity) => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.post(`${API_HOST}/cart/update-item/${item_id}`, { quantity: quantity }, {  // Updated to use API_HOST
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        fetchCart();
      })
      .catch(error => {
        console.error('Error updating cart:', error.response ? error.response.data : error);
      });
    }
  };

  const clearCart = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${API_HOST}/cart/clear`, {  // Updated to use API_HOST
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        setCart(null);
      })
      .catch(error => {
        console.error('Error clearing cart:', error);
      });
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
