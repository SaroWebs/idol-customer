import React, { useEffect, useState } from 'react'
import MasterLayout from '../Layouts/MasterLayout'
import ProductCard from '../Components/ProductCard';
import axios from 'axios';
import { API_HOST } from '../config/config';

const Products = () => {
    const [items, setItems] = useState(null); // paginated data


    const getItems = (page = 1) => {
        axios.get(`${API_HOST}/products?page=${page}`)
            .then(res => {
                setItems(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const handleNext = () => {
        if (items && items.current_page < items.last_page) {
            getItems(items.current_page + 1);
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <MasterLayout title='Products'>
            <div className="page-content-wrapper">
                {!items ? 'Loading...' : (
                    <div className="top-products-area clearfix">
                        <div className="container">
                            {items.data.length < 1 ? ('No Product') : (
                                <div className="top-product-wrap">
                                    {items.data.map(product => <ProductCard key={product.id} product={product} />)}
                                </div>
                            )}
                            {items.current_page < items.last_page ? (
                                <div className="d-flex justify-content-center">
                                    <button onClick={handleNext} className="btn btn-info btn-sm">Load More</button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                )}
            </div>
        </MasterLayout>
    )
}

export default Products