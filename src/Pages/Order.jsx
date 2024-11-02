import React, { useEffect, useState } from 'react';
import MasterLayout from '../Layouts/MasterLayout';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_HOST, STORAGE_PATH } from '../config/config';
import PrescriptionUpload from '../Components/PrescriptionUpload';

const Order = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prescLoading, setPrescLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        let token = localStorage.getItem('token');
        try {
            const res = await axios.get(`${API_HOST}/order/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrder(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <MasterLayout title="Loading Order...">
                <div className="page-content-wrapper row">
                    <div className="col-12 text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading order details...</p>
                    </div>
                </div>
            </MasterLayout>
        );
    }

    if (!order || !order.id) {
        return (
            <MasterLayout title="Return to orders">
                <div className="page-content-wrapper row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body text-center">
                                <span>No order found!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        );
    }

    const needPrescription = order.order_items.some(item => item.product.prescription === 1);
    const hasPrescription = '';

    return (
        <MasterLayout title={`Order: ${order.order_no}`}>
            <div className="page-content-wrapper row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <div className="item">Order ID: <strong>{order.order_no}</strong></div>
                                    <p className="offer-price mb-0">
                                        Total Amount: <strong>₹ {order.payable_amount}</strong>
                                    </p>
                                </div>
                                <div>
                                    {needPrescription && (
                                        <PrescriptionUpload type='assigned' text={`${order.prescription ? 'Change Prescription' : 'Upload Prescription'}`} isLoading={prescLoading} setIsLoading={setPrescLoading} order_no={order.order_no} />
                                    ) }

                                </div>
                            </div>
                            {order.order_items && order.order_items.map((item, i) => (
                                <div className="row border-bottom py-3" key={i}>
                                    <div className="col-4 col-md-3">
                                        <Link to={`/product/${item.product.id}`} className="product-thumbnail d-block">
                                            {item.product.images.length > 0 ?
                                                <img src={`${STORAGE_PATH}/${item.product.images[0].image_path}`} alt="Product" className="mb-2 img-fluid" />
                                                :
                                                <img src="/assets/images/no-image.png" alt="no img" className="mb-2 img-fluid" />
                                            }
                                        </Link>
                                    </div>
                                    <div className="col-8 col-md-9">
                                        <Link to={`/product/${item.product.id}`} className="product-title text-capitalize">
                                            {item.product.name}
                                        </Link>
                                        <p className="track-offer mb-1">
                                            Price: <strong>₹ {item.product.offer_price}</strong>
                                        </p>
                                        <div className="item">Quantity: <strong>{item.quantity}</strong></div>
                                    </div>
                                </div>
                            ))}
                        </div >
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default Order;