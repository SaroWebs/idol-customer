import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { API_HOST, STORAGE_PATH } from '../config/config';
import axios from 'axios';
import { Skeleton } from '@mantine/core';

const HomeSlider = () => {
    const [banners, setBanners] = useState([]);
    const [loadingImages, setLoadingImages] = useState([]);

    const getBanner = async () => {
        try {
            const res = await axios.get(`${API_HOST}/banners/all`);
            setBanners(res.data);
            setLoadingImages(new Array(res.data.length).fill(true)); // Initialize loading state for images
        } catch (err) {
            console.error('Error getting banner', err);
        }
    };

    useEffect(() => {
        getBanner();
    }, []);

    // This function is called when an image has loaded
    const handleImageLoad = (index) => {
        setLoadingImages((prevState) => {
            const newLoadingImages = [...prevState];
            newLoadingImages[index] = false; // Mark this image as loaded
            return newLoadingImages;
        });
    };

    return (
        <div className="container">
            <div className="pt-2">
                <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    autoplay={{ delay: 500 }}
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
                                position: 'relative' // Ensure relative positioning for absolute elements
                            }}
                        >
                            {loadingImages[index] && (
                                <Skeleton 
                                    height={200} 
                                    radius="15px" 
                                    animate={true} 
                                    style={{ width: '100%', position: 'absolute', top: 0, left: 0 }} // Position the skeleton absolutely
                                />
                            )}
                            <img
                                src={STORAGE_PATH + banner.image_url}
                                alt={`${banner.id} image`}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'cover',
                                }}
                                onLoad={() => handleImageLoad(index)} 
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