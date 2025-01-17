import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'swiper/swiper-bundle.css';
import { API_HOST, STORAGE_PATH } from '../config/config';
import { Link } from 'react-router-dom';

const ProductCategoryWrapper = () => {
    const [categories, setCategories] = useState([]);

    const getData = () => {
        axios.get(`${API_HOST}/categories/all`)
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                console.log('Error getting categories', err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    if (!categories || categories.length < 1) return null;

    return (
        <div className="product-category-wrapper py-3">
            <div className="container">
                <div className="section-heading d-flex justify-content-between">
                    <h6><b>Shop By Category</b></h6>
                    <div className="owl-navs">
                        <span className="catPrev"><i className="lni lni-chevron-left"></i></span>
                        <span className="catNext"><i className="lni lni-chevron-right"></i></span>
                    </div>
                </div>
                <div className="product-category-wrap">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={15}
                        slidesPerView={3.3}
                        breakpoints={{
                            640: {
                                slidesPerView: 3.3,
                            },
                            768: {
                                slidesPerView: 5.3,
                            },
                            1024: {
                                slidesPerView: 7.5,
                            },
                        }}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        navigation={{
                            nextEl: '.catNext',
                            prevEl: '.catPrev',
                        }}
                    >
                        {categories.map((category, index) => (
                            <SwiperSlide key={index}
                                className='d-flex align-items-end justify-content-center'
                                style={{ background: '#fefefe', border:'1px solid #eee', height: '110px', borderRadius: '12px' }}
                            >
                                {category.id == 1 || category.name == 'all' ? (
                                    <Link to={`/products`} className="d-flex flex-column align-items-center justify-content-center category-block">
                                        <img
                                            src={`${STORAGE_PATH + category.icon_path}`}
                                            alt={category.name}
                                            style={{ width: '75px', objectFit: 'cover' }}
                                            loading="lazy"
                                        />
                                        <h6 style={{ fontSize: '0.7rem', textAlign: 'center' }}>{category.name}</h6>
                                    </Link>
                                ) : (
                                    <Link to={`/category/${category.id}/products`} className="d-flex flex-column align-items-center justify-content-center category-block">
                                        <img
                                            src={`${STORAGE_PATH + category.icon_path}`} // Adjust the path if needed
                                            alt={category.name}
                                            style={{ width: '75px', objectFit: 'cover' }}
                                            loading="lazy"
                                        />
                                        <h6 style={{ fontSize: '0.7rem', textAlign: 'center' }}>{category.name}</h6>
                                    </Link>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ProductCategoryWrapper;
