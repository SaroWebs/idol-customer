import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MasterLayout from '../Layouts/MasterLayout';
import axios from 'axios';
import { API_HOST, STORAGE_PATH } from '../config/config';
import { useCart } from '../contexts/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const Product = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const { addToCart, inCart, removeFromCart } = useCart();

    const getItem = () => {
        axios.get(`${API_HOST}/product/${id}`)
            .then(res => {
                setProduct(res.data);
            }).catch(err => {
                console.log(err.message);
            }).finally(() => {
                setLoading(false);
            });
    }
    useEffect(() => {
        if (id) {
            getItem();
        }
    }, [id])


    return (
        <MasterLayout title={`${(loading && !product) ? 'Product' : product ? product.name : 'Back'}`}>
            {!loading && product ? (
                <div className="row">
                    <div className="col-md-6">
                        {product.images.length > 0 ? <ProductImageSlider items={product.images} /> : (
                            <div className="single-product-slide">
                                <img src="/assets/images/no-image.png" alt={product.name} />
                            </div>
                        )}
                    </div>
                    <div className="col-md-6">
                        <div className="product-description pb-3">
                            <div className="flas-sale-panel bg-white mb-3 p-3">
                                <div className="container">
                                    <div className="p-title-price">
                                        {product.offer_price > 0 ? (
                                            <>
                                                <p className="offer-price mb-0">
                                                    Best Price <sup>*</sup> <span>₹ {product.offer_price}</span>
                                                </p>
                                                <p className="sale-price">
                                                    MRP <span>₹ {product.price}</span>
                                                    <span
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: 'green',
                                                        }}
                                                    >
                                                        GET {parseFloat(product.discount) % 1 === 0
                                                            ? parseInt(product.discount)
                                                            : parseFloat(product.discount).toFixed(1)
                                                        }% OFF
                                                    </span>
                                                </p>

                                            </>
                                        ) : (
                                            <p className="offer-price mb-0">
                                                Best Price <sup>*</sup> <span>₹ {product.price}</span>
                                            </p>
                                        )}
                                        <p style={{
                                            fontSize: '11px',
                                            lineHeight: '0.3'
                                        }}>
                                            (Inclusive of all Taxes)
                                        </p>
                                        {product.mfg_name ?
                                            <span style={{
                                                fontStyle: 'italic',
                                                fontSize: '11px'
                                            }}>
                                                Mfr.: {product.mfg_name}
                                            </span>
                                            : null}
                                    </div>
                                    <div className="sales-offer-content d-flex align-items-end justify-content-between mt-2">
                                        <div className="sales-end">
                                            {product.returnable ? (
                                                <p style={{ fontSize: '10px', lineHeight: '0.3', color: 'green' }}>Returnable within {product.return_time} day{product.return_time > 1 ? 's' : ''}</p>
                                            ) :
                                                <p style={{ fontSize: '10px', lineHeight: '0.3', color: 'red' }}>This product is not returnable.</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* add to cart */}
                                {product.status ? (
                                    <div className="d-flex justify-content-end align-items-center">
                                        {inCart(product.id) ? (
                                            <button onClick={() => removeFromCart(product.id)} className="btn btn-sm btn-danger">Remove from Cart</button>
                                        ) : (
                                            <button onClick={() => addToCart(product.id)} className="btn btn-sm btn-danger">Add to Cart</button>
                                        )}
                                    </div>
                                ) : (
                                    <div className="bg-warning text-secondary text-center">
                                        <small>Unavailable</small>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-specification bg-white mb-3 p-3">
                            <div className="container">
                                <h6>Description</h6>
                                <p>{product.details}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="">
                    {!loading && !product ? (
                        <div className="row">
                            <div className="col-12">
                                <span className="alert alert-warning">Product not found. </span>
                            </div>
                        </div>
                    ) : ('Loading...')}
                </div>
            )}
        </MasterLayout>
    )
}

export default Product

const ProductImageSlider = ({ items }) => {
    return (
        <div className="">
            <Swiper
                spaceBetween={1}
                slidesPerView={1}
                autoplay={{ delay: 2000 }}
                loop={true}
                pagination={{ clickable: true }}
            >
                {items.map(item => (
                    <SwiperSlide key={item.id} style={{ overflow: 'hidden' }}>
                        <img src={STORAGE_PATH + item.image_path} alt="product-image" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}