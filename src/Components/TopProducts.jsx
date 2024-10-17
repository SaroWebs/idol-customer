import React, { useEffect, useState } from 'react'
import { API_HOST } from '../config/config';
import axios from 'axios';
import ProductCard from './ProductCard';

const TopProducts = () => {
    const [products, setProducts] = useState([]);

    const getTopProducts = () => {
        axios.get(`${API_HOST}/products/top`)
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        getTopProducts();
    }, [])

    return (
        <div className="top-products-area clearfix py-3">
            <div className="container">
                <div className="card pb-3">
                    <div className="section-heading d-flex align-items-center justify-content-between p-3">
                        <h6>Top Products</h6>
                    </div>
                    {products && products.length > 0 ?
                        <div className="top-product-wrap">
                            {products.map(product => <ProductCard  key={product.id} product={product}/>)}
                        </div>
                        :
                        <div className="">No product found</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TopProducts


