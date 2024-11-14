import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getMenuLinks } from '../../Layouts/MenuLinks';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Footer = () => {
    const { isAuthenticated } = useAuth();
    const { cart } = useCart();
    const menuLinks = getMenuLinks(isAuthenticated);
    const location = useLocation();
    useEffect(() => {
        const cartButton = document.querySelector('.cart-btn');
        if (cartButton) {
            cartButton.classList.add('blink-animation');
            const timeout = setTimeout(() => {
                cartButton.classList.remove('blink-animation');
            }, 500); // Animation duration

            return () => clearTimeout(timeout);
        }
    }, [cart])
    
    return (
        <>
            <div className="internet-connection-status" id="internetStatus"></div>
            <div className="web-footer d-none d-md-flex">
                <div className="foot-top">
                    <div className="container row">
                        <div className="col-4"></div>
                        <div className="col-4"></div>
                        <div className="col-4"></div>
                    </div>
                </div>
                <div className="foot-bottom mt-5">
                    <div className="container">
                        <small>Developed by
                            <a target="_blank" href="https://vasptechnologies.com" rel="noopener noreferrer">
                                VASP Technologies
                            </a>
                        </small>
                    </div>
                </div>
            </div>
            <div className="d-block d-md-none" style={{ margin: '2rem auto' }}></div>
            <div className="footer-nav-area d-block d-md-none" id="footerNav">
                <div className="container h-100 px-0">
                    <div className="suha-footer-nav h-100">
                        <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                            {menuLinks.map((link, index) => (
                                <li key={index} className={`${location.pathname === link.path ? 'active' : ''} ${link.path ==='/cart'? 'cart-btn': ''}`}>
                                    <Link to={link.path}>
                                        <i className={link.icon}></i>
                                        {link.label}
                                    </Link>
                                    {link.path === '/cart' && (
                                        <span style={{ top: '-13%', right: '18px' }} className="badge badge-light">
                                            {cart ? cart.length : 0}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;