import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { API_HOST, STORAGE_PATH } from '../config/config';
import axios from 'axios';

const HomeSlider = () => {
    const [banners, setBanners] = useState([]);

    const getBanner = () => {
        axios.get(`${API_HOST}/banners/all`)
        .then(res => {
            setBanners(res.data);
        })
        .catch(err => {
            console.log('Error getting banner');
        });
    }

    useEffect(() => {
        getBanner();
    }, []);

    return (
        <div className="container">
            <div className="pt-2">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    pagination={{ clickable: true }}
                >
                    {banners.map((banner, index) => (
                        <SwiperSlide 
                            key={index} 
                            style={{
                                border: '2px solid #ccc', // Change color and thickness as needed
                                borderRadius: '15px', // Adjust the radius for roundness
                                overflow: 'hidden', // Ensure rounded corners apply to the image
                            }}
                        >
                            <img
                                src={STORAGE_PATH + banner.image_url}
                                alt={`${banner.id} image`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover',
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeSlider;
