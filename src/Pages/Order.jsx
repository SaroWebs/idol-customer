import React, { useEffect, useState } from 'react'
import MasterLayout from '../Layouts/MasterLayout'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_HOST, STORAGE_PATH } from '../config/config';

const Order = () => {
    const { id } = useParams();
    const [order, setOrder] = useState();


    const fetchData = () => {
        let token = localStorage.getItem('token');
        axios.get(`${API_HOST}/order/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setOrder(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchData();
    }, [])

    if (!order || !order.id) return (
        <MasterLayout>
            <div className="page-content-wrapper row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <span>No order found !</span>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );

    const prec = order.order_items.some(item => item.product.prescription === 1);


    return (
        <MasterLayout>
            <div className="page-content-wrapper row">
                {/* order details and then loop order items */}
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="">
                                    <div className="item">Order ID: {order.order_no} </div>
                                    <p className="offer-price">
                                        Total Amount <span>₹ {order.payable_amount}</span>
                                    </p>
                                </div>
                                <div className="">
                                    {prec ? order.prescription ? (
                                        <div className="">
                                            <button className="btn btn-sm btn-warning">Change Prescription</button>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <button className="btn btn-sm btn-danger">Upload Prescription</button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            {order.order_items && order.order_items.map((item, i) => (
                                <div className="row" key={i}>
                                    <div className="col-4 col-md-3">
                                        <Link to={`/prduct/${item.product.id}`} className="product-thumbnail d-block">
                                            {item.product.images.length > 0 ?
                                                <img src={STORAGE_PATH + '/' + item.product.images[0].image_path} alt="Product" className="mb-2" />
                                                :
                                                <img src={"/assets/images/no-image.png"} alt="no img" className="mb-2" />
                                            }
                                        </Link>
                                    </div>
                                    <div className="col-8 col-md-9">
                                        <Link to={`/prduct/${item.product.id}`} className="product-title text-capitalize">
                                            {item.product.name}
                                        </Link>
                                        <p className="track-offer">
                                            Price <span>₹ {item.product.offer_price} </span>
                                        </p>
                                        <div className="item">Quantity : {item.quantity}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}

export default Order