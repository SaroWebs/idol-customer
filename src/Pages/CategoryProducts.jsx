import React, { useEffect, useState } from 'react'
import MasterLayout from '../Layouts/MasterLayout'
import ProductCard from '../Components/ProductCard';
import axios from 'axios';
import { API_HOST } from '../config/config';
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
    const { id } = useParams();
    const [items, setItems] = useState(null);
    const [loading, setLoading]=useState(false);
    const [pageTitle, setTitle]=useState('Category');

    const getItems = (page = 1) => {
        setLoading(true);
        axios.get(`${API_HOST}/products?page=${page}&category=${id}`)
            .then(res => {
                setItems(res.data);
            })
            .catch(err => {
                console.log(err.message);
            })
            .finally(()=>{
                setLoading(false);
            });
    };

    const handleNext = () => {
        if (items && items.current_page < items.last_page) {
            getItems(items.current_page + 1);
        }
    };

    useEffect(() => {
        let itm = items && items.category ? items.category.name : 'Category';
        setTitle(itm);
    }, [items]);

    useEffect(() => {
        getItems();
    }, []);

    return (
        <MasterLayout title={pageTitle}>
            <div className="page-content-wrapper">
                {loading || !items ? (
                    <div className="">
                        {loading ? 'loading..' : 'no-product'}
                    </div>
                ) : (
                    <div className="top-products-area clearfix">
                        <div className="container">
                            <p className="py-2">
                                Showing {items.data.length} of {items.total} items
                            </p>
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

export default CategoryProducts