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
        if(cart && cart.length){
            const cartButton = document.querySelector('.cart-btn');
            if (cartButton) {
                cartButton.classList.add('blink-animation');
                const timeout = setTimeout(() => {
                    cartButton.classList.remove('blink-animation');
                }, 500); // Animation duration

                return () => clearTimeout(timeout);
            }
        }
    }, [cart])

    return (
        <>
            <div className="internet-connection-status" id="internetStatus" style={{zIndex:'-10'}}></div>
            <div className="web-footer d-none d-md-flex">
                {/* Top Footer Section */}
                <div className="foot-top pt-5 bg-light">
                    <div className="container">
                        <div className="row">
                            {/* Branches Section */}
                            <div className="col-4">
                                <h5>
                                    <u>Branches</u>
                                </h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <i className="fa fa-map-marker"></i> Nowjan Road, Uzanbazar, Guwahati-781001
                                    </li>
                                    <li>
                                        <i className="fa fa-map-marker"></i> G.N.B Road, Ambari, Opposite AGP Office, Guwahati-781001
                                    </li>
                                    <li>
                                        <i className="fa fa-map-marker"></i> Maniran Dewan Road, Khadi Office Campus, Guwahati-781003
                                    </li>
                                </ul>
                            </div>
                            {/* Links Section */}
                            <div className="col-4">
                                <h5>
                                    <u>Links</u>
                                </h5>
                                <ul className="footer-nav list-unstyled">
                                    <li>
                                        <a href="/about">About Us</a>
                                    </li>
                                    <li>
                                        <a href="/refund-policy">Cancellation &amp; Refund Policy</a>
                                    </li>
                                    <li>
                                        <a href="/terms-conditions">Terms &amp; Conditions</a>
                                    </li>
                                    <li>
                                        <a href="/privacy-policy">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="/shipping-policy">Shipping Policy</a>
                                    </li>
                                    <li>
                                        <a href="/about">Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                            {/* Download App Section */}
                            <div className="col-4">
                                <h4>Download Our App</h4>
                                <div className="d-flex gap-3">
                                    <a
                                        target="_blank"
                                        href="https://play.google.com/store/apps/details?id=com.vasptech.idolpharma&pcampaignid=web_share"
                                        rel="noopener noreferrer"
                                    >
                                        <svg
                                            aria-hidden="true"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path fill="none" d="M0,0h40v40H0V0z"></path>
                                            <g>
                                                <path
                                                    d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z"
                                                    fill="#EA4335"
                                                ></path>
                                                <path
                                                    d="M35.3,16.4L35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4z"
                                                    fill="#FBBC04"
                                                ></path>
                                                <path
                                                    d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z"
                                                    fill="#4285F4"
                                                ></path>
                                                <path
                                                    d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3c0,0,0,0,0,0L19.8,20z"
                                                    fill="#34A853"
                                                ></path>
                                            </g>
                                        </svg>
                                    </a>
                                    <a href="#">
                                        <img src="/logo/appstore.png" alt="Download from App Store" />
                                    </a>
                                </div>
                                <small className="text-muted mt-3 d-block">
                                    * All medicines are dispensed in compliance with the Drugs and Cosmetics Act, 1940 and Rules,
                                    1945. Idol Pharma does not process requests for Schedule X drugs.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Bottom Footer Section */}
                <div className="foot-bottom bg-dark text-light py-3">
                    <div className="container d-flex justify-content-between">
                        <small>
                            Developed by{' '}
                            <a
                                target="_blank"
                                href="https://vasptechnologies.com"
                                rel="noopener noreferrer"
                                className="text-primary"
                            >
                                VASP Technologies
                            </a>
                        </small>
                        <small>
                            Copyright © <a href="javascript:void(0)" className="text-primary">Idol Pharma</a>. All Rights
                            Reserved.
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
                                <li key={index} className={`${location.pathname === link.path ? 'active' : ''} ${link.path === '/cart' ? 'cart-btn' : ''}`}>
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