import { ActionIcon, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { useEffect, useState } from 'react'
import '@mantine/core/styles.css';
import '../assets/css/search.css';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { API_HOST } from '../config/config';

const SearchModal = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState('');
    const [items, setItems] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`${API_HOST}/search?term=${searchText}`);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (searchText) {
            fetchSearchResults();
        } else {
            setItems([]);
        }
    }, [searchText]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleCloseModal = () => {
        setSearchText('');
        close();
    };

    const openItem = (id) => {
        navigate(`/product/${id}`)
        handleCloseModal();
    }


    return (
        <>
            <div onClick={open}>
                <input
                    style={{ paddingRight: '2rem' }}
                    className="form-control"
                    type="search"
                    placeholder="Search Medicine..."
                    readOnly
                    value={searchText}
                />
                <i className="fa fa-search" style={{ position: 'absolute', right: '0.4rem', top: '0.6rem' }}></i>
            </div>
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                fullScreen
                radius={0}
                transitionProps={{ transition: 'fade', duration: 200 }}
                style={{ position: 'relative', zIndex: 9999999 }}>

                <div>
                    <div className='s-input-container'>
                        <input
                            className='s-input'
                            placeholder='Search Medicine'
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                        <i className="fa fa-close s-close-btn" onClick={handleCloseModal}></i>
                    </div>
                    {items && items.length > 0 ?
                        <div className="s-content">
                            {items.map((item) => (
                                <div key={item.id} className="search-result-item" onClick={() => openItem(item.id)}>
                                    <div className="w-100 d-flex flex-column">
                                        <span className="font-weight-bold" style={{ fontSize: 'smaller' }}>{item.name}</span>
                                        <div className="w-100 d-flex justify-content-between align-items-center" style={{ margin: '0', padding: '0' }}>
                                            <small className="text-muted flex-1" style={{ fontSize: 'smaller' }}>{item.offer_price}</small>
                                            <div className="d-flex justify-content-end gap-1" style={{ margin: '0', padding: '0' }}>
                                                {(item.prescription === 1) ? <span className='text-xs text-danger' style={{ fontSize: 'smaller' }}>Prescription Required</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div className='d-flex flex-column align-items-center'>
                            <span>Or</span>
                            <Link to={'/prescriptions'}>Upload Prescription</Link>
                        </div>
                    }
                </div>
            </Modal>
        </>
    )
}

export default SearchModal