import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_HOST, STORAGE_PATH } from '../config/config';
import { Modal } from '@mantine/core';

const ShowPrescription = ({ type = 'button', text = 'Prescription', code }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [pages, setPages] = useState([]);
    const getData = () => {
        const token = localStorage.getItem('token');
        axios.post(`${API_HOST}/prescription/byGroup`, {
            group_code: code
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setPages(response.data)
            })
            .catch(error => {
                console.error("Error : ", error); // Handle error
            });
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            {type == 'span' && <span className='btn btn-secondary btn-sm' onClick={open}>{text}</span>}
            {type == 'button' && <button className="btn btn-sm btn-warning" onClick={open}>{text}</button>}


            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={true}
                fullScreen
                radius={0}
                transitionProps={{ transition: 'fade', duration: 200 }}
                style={{ position: 'relative', zIndex: 9999999 }}>
                <div className="container">
                    <div className="row g-5">
                        {pages.length > 0 && pages.map(px => (
                            <div className="col-12">
                                <img src={STORAGE_PATH + '/' + px.file_path} alt="" loading="lazy"/>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ShowPrescription