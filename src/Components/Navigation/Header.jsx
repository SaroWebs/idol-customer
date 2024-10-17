import React from 'react'
import { Link } from 'react-router-dom';
import { getMenuLinks } from '../../Layouts/MenuLinks';
import SearchModal from '../SearchModal';
import { useCart } from '../../contexts/CartContext';

const Header = ({isAuthenticated, openSidebar}) => {
  const { cart } = useCart();
  const menuLinks = getMenuLinks(isAuthenticated);
  
  return (
    <div className="header-area" id="headerArea">
      <div className="container h-100 d-flex align-items-center justify-content-between">
        <div className="logo-wrapper mt-1">
          <Link to={`/`}>
            <img style={{ height: '50px' }} src="/logo/smalllogo.png" alt="" />
          </Link>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div style={{ position: 'relative' }} id="openSearchSection">
            <SearchModal/>
          </div>
          <ul className="nav-menu d-none d-md-flex">
            {menuLinks.map((link, index) => (
              <li key={index} className={index === 0 ? 'active' : ''}>
                <Link to={link.path}>
                  {link.label}
                  {link.path === '/cart' && <span>({cart ? cart.length : 0})</span>}
                </Link>
              </li>
            ))}
          </ul>
          <div onClick={openSidebar} className="suha-navbar-toggler d-flex d-md-none flex-wrap" id="suhaNavbarToggler">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header