import React from 'react';
import { useNavigate } from 'react-router-dom';
import { STORAGE_PATH } from '../config/config';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const ProductCard = ({ product }) => {
    const { inCart, addToCart, removeFromCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleRedirectToProduct = (event) => {
        event.preventDefault();
        if (!event.target.closest('.addtocartbtn') && !event.target.closest('.removefromcartbtn')) {
            navigate(`/product/${product.id}`);
        }
    };

    const handleAddToCart = (event) => {
        event.stopPropagation(); // Prevent the redirect
        if (isAuthenticated) {
            addToCart(product.id);
        } else {
            navigate('/login');
        }
    };

    const handleRemoveFromCart = (event) => {
        event.stopPropagation(); // Prevent the redirect
        removeFromCart(product.id);
    };

    return (
        <div className="card tp-card col-6 col-md-3">
            <div onClick={handleRedirectToProduct} className="card-body product">
                {product.images.length > 0 ? (
                    <img
                        src={`${STORAGE_PATH}/${product.images[0].image_path}`}
                        alt={product.name}
                        loading="lazy" // Lazy load the image
                        className='bg-white'
                    />
                ) : (
                    <img
                        src="/assets/images/no-image.png"
                        alt={product.name}
                        loading="lazy" // Lazy load the image
                    />
                )}
                <div className="product-details">
                    <h3>{product.name}</h3>
                    <div className="price">
                        {product.price > 0 && product.offer_price > 0 ? (
                            <>
                                <span className="new">{product.offer_price}</span>
                                <span className="old">{product.price}</span>
                            </>
                        ) : (
                            <span className="new">{product.offer_price || product.price}</span>
                        )}
                    </div>
                    <p>Mfr: {product.mfg_name}</p>
                </div>
                {product.status !== 1 ? (
                    <div className="d-flex justify-content-center align-items-center p-1">
                        <small>Unavailable</small>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center p-1">
                        {inCart(product.id) ? (
                            <button onClick={handleRemoveFromCart} className="btn btn-sm btn-danger removefromcartbtn">
                                Remove from Cart
                            </button>
                        ) : (
                            <button onClick={handleAddToCart} className="btn btn-danger btn-sm addtocartbtn">
                                Add to Cart
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;