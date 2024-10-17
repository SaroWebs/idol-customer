import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Account from './Pages/Account'
import Home from './Pages/Home'
import Cart from './Pages/Cart.jsx'
import Login from './Pages/Auth/Login.jsx'
import Orders from './Pages/Orders.jsx'
import Prescriptions from './Pages/Prescriptions.jsx'
import Checkout from './Pages/Checkout.jsx'
import OnlinePayment from './Pages/OnlinePayment.jsx'
import Order from './Pages/Order.jsx'
import Prescription from './Pages/Prescription.jsx'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/prescription/:code" element={<Prescription />} />
          <Route path="/online-payment" element={<OnlinePayment />} />
        </Routes>
    </Router>
  )
}

export default App
