import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import './App.css'
import Account from './Pages/Auth/Account.jsx'
import Home from './Pages/Home'
import Cart from './Pages/Cart.jsx'
import Login from './Pages/Auth/Login.jsx'
import Orders from './Pages/Orders.jsx'
import Prescriptions from './Pages/Prescriptions.jsx'
import Checkout from './Pages/Checkout.jsx'
import OnlinePayment from './Pages/OnlinePayment.jsx'
import Order from './Pages/Order.jsx'
import Prescription from './Pages/Prescription.jsx'
import Products from './Pages/Products.jsx'
import Product from './Pages/Product.jsx'
import CategoryProducts from './Pages/CategoryProducts.jsx'

import AboutUs from './pages/Static/AboutUs.jsx'
import CancellationRefund from './pages/Static/CancellationRefund.jsx'
import PrivacyPolicy from './pages/Static/PrivacyPolicy.jsx'
import ShippingPolicy from './pages/Static/ShippingPolicy.jsx'
import Terms from './pages/Static/Terms.jsx'
import AccountSettings from './Pages/Auth/AccountSettings.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category/:id/products" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/prescription/:code" element={<Prescription />} />
        <Route path="/online-payment" element={<OnlinePayment />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/settings" element={<AccountSettings />} />


        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/refund-policy" element={<CancellationRefund />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/terms-conditions" element={<Terms />} />


      </Routes>
    </Router>
  )
}

export default App
