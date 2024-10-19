import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_HOST } from '../config/config';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const fetchCart = () => {
    const token = localStorage.getItem('token');
    if (token && isAuthenticated) {
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
    if (token && isAuthenticated) {
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

  const removeFromCart = (product_id) => {
    const token = localStorage.getItem('token');
    if (token && isAuthenticated) {
      axios.get(`${API_HOST}/cart/remove-item/${product_id}`, {  // Updated to use API_HOST
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        fetchCart();
      })
      .catch(error => {
        console.error('Error removing item from cart');
      });
    }
  };

  const updateCart = (item_id, quantity) => {
    const token = localStorage.getItem('token');
    if (token && isAuthenticated) {
      axios.post(`${API_HOST}/cart/update-item/${item_id}`, { quantity: quantity }, {  // Updated to use API_HOST
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        fetchCart();
      })
      .catch(error => {
        console.error('Error updating cart');
      });
    }
  };

  const clearCart = () => {
    const token = localStorage.getItem('token');
    if (token && isAuthenticated) {
      axios.get(`${API_HOST}/cart/clear`, {  // Updated to use API_HOST
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        setCart(null);
      })
      .catch(error => {
        console.error('Error clearing cart');
      });
    }
  };

  const inCart = (item_id) => {
    if(cart){
      return cart.some(item=> item.product_id === item_id);
    }
    return false;
  };
  

  return (
    <CartContext.Provider value={{ cart, inCart, setCart, addToCart, removeFromCart, clearCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
