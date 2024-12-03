import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { API_HOST, STORAGE_PATH } from '../config/config';
import axios from 'axios';

const HomeSlider = () => {
    const [banners, setBanners] = useState([]);

    const getBanner = async () => {
        try {
            const res = await axios.get(`${API_HOST}/banners/all`);
            setBanners(res.data);
        } catch (err) {
            console.error('Error getting banner', err);
        }
    };

    useEffect(() => {
        getBanner();
    }, []);


    return (
        <div className="container">
            <div className="pt-2">
                <Swiper
                    modules={[Autoplay,Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    pagination={{ clickable: true }}
                >
                    {banners.map((banner, index) => (
                        <SwiperSlide 
                            key={index} 
                            style={{
                                border: '2px solid #ccc',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                position: 'relative'
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
                                loading="lazy"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeSlider;