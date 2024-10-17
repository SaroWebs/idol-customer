import React from 'react';
import { useNavigate } from 'react-router-dom'; // Remove Link as it's not used
import { STORAGE_PATH } from '../config/config';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (event) => {
        event.stopPropagation();
        addToCart(product.id);
    };

    const handleRedirectToProduct = (event) => {
        event.preventDefault(); // Prevent anchor default action
        if (!event.target.closest('.addtocartbtn')) { // Check if clicked element is not 'Add to Cart' button
            navigate(`/product/${product.id}`);
        }
    };

    return (
        <div className="card tp-card col-6 col-md-3">
            <a onClick={handleRedirectToProduct} href="javascript:void(0);" className="card-body product">
                {product.images.length > 0 ? (
                    <img src={`${STORAGE_PATH}/${product.images[0].image_path}`} alt={product.name} />
                ) : (
                    <img src="/assets/images/no-image.png" alt={product.name} />
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
                        <button onClick={handleAddToCart} className="btn btn-danger btn-sm addtocartbtn">
                            Add to Cart
                        </button>
                    </div>
                )}
            </a>
        </div>
    );
};

export default ProductCard;
