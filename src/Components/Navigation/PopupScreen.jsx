import { useDisclosure } from '@mantine/hooks';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Modal } from '@mantine/core';
import { API_HOST, STORAGE_PATH } from '../../config/config';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import axios from 'axios';

const PopupScreen = () => {
    const [loading, setLoading] = useState(true);
    const [notices, setNotices] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        const showSpalsh = localStorage.getItem('showSplash');
        if (showSpalsh) {
            // getData();
            open();
            localStorage.setItem('showSplash', true);
        } else {
            close();
        }
        setLoading(false);
    }, [])


    const getData = () => {
        axios.get(`${API_HOST}/splashes/all`)
            .then(res => {
                setNotices(res.data);
            })
            .catch(err => {
                console.log('Error getting notices', err.message);
            });
    };

    if (!loading && notices.length > 0) {
        return (
            <Modal opened={opened} centered onClose={close} size={'lg'}>
                <Swiper
                    spaceBetween={5}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 1000 }}
                >
                    {notices.map(notice => (
                        <SwiperSlide key={notice.id}>
                            <img
                                style={{ width: '100%', objectFit: 'cover' }}
                                src={`${STORAGE_PATH + notice.image_url}`}
                                alt="spash"
                                loading='lazy'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Modal>
        );
    }
}

export default PopupScreen