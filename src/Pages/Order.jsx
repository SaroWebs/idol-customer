import React, { useEffect, useState } from 'react';
import MasterLayout from '../Layouts/MasterLayout';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_HOST, STORAGE_PATH } from '../config/config';
import PrescriptionUpload from '../Components/PrescriptionUpload';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';

const Order = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prescLoading, setPrescLoading] = useState(false);

    const token = localStorage.getItem('token') || null;

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_HOST}/order/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setOrder(res.data);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);


    const cancelOrder = () => {
        const fd = new FormData();
        fd.append('reason', 'test reason');
        axios.post(`${API_HOST}/order/${id}/cancel`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, fd).then(res => {
            console.log(res.data);
            fetchData();
        }).catch(err => {
            console.log(err.message);
        })
    }


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
                                    {(['pending', 'placed', 'approved', 'processed'].includes(order.status)) &&
                                        <OrderCancel token={token} fetchData={fetchData} id={id} />
                                    }
                                    {order.status == 'delivered' && <OrderReturn token={token} fetchData={fetchData} id={id} />}
                                    {order.status == 'cancelled' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Cancelled</span>}
                                    {order.status == 'returned' && <span style={{ color: 'red', fontSize: '0.8rem' }}>Returned</span>}
                                </div>
                            </div>
                            {order.order_items && order.order_items.map((item, i) => (
                                <div className="d-flex justify-content-between align-items-start" key={i}>
                                    <OrderItemDetalis item={item} />
                                    {item.statuses.find(st => st.active === 1 && ['pending', 'placed', 'approved', 'processed'].includes(st.status)) && (
                                        <CancelItem item={item} token={token} fetchData={fetchData} />
                                    )}
                                </div>
                            ))}
                            <div className="py-2">
                                {(['pending', 'placed', 'approved', 'processed'].includes(order.status)) && needPrescription && (
                                    <>
                                        {order.prescription ?
                                            <div className='row'>
                                                <div className="col-12 my-2 p-4">
                                                    <img src={`${STORAGE_PATH}/${order.prescription.file_path}`} alt={`${STORAGE_PATH}/${order.prescription.file_path}`} />
                                                </div>
                                                <PrescriptionUpload type='assigned' text={`Change Prescription`} isLoading={prescLoading} setIsLoading={setPrescLoading} order_no={order.order_no} />
                                            </div>
                                            :
                                            <PrescriptionUpload type='assigned' text={`Upload Prescription`} isLoading={prescLoading} setIsLoading={setPrescLoading} order_no={order.order_no} />
                                        }
                                    </>
                                )}
                            </div>

                        </div >
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default Order;

const OrderReturn = (props) => {
    const { token, id, fetchData } = props;
    const [opened, { open, close }] = useDisclosure(false);
    const [reason, setReason] = useState('');
    const predefinedReasons = [
        'Wrong item delivered',
        'Damaged item received',
        'Expired item delivered',
        'Change of mind',
        'Other (please specify)',
    ];

    const handleReasonChange = (selectedReason) => {
        setReason(selectedReason);
    };

    const returnOrder = () => {
        if (!reason) return alert('Please provide a reason for the return.');

        const fd = new FormData();
        fd.append('reason', reason);
        axios
            .post(`${API_HOST}/order/${id}/return`, fd, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                fetchData();
                close();
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    return (
        <>
            <button onClick={open} className="btn btn-info btn-sm">
                Return
            </button>
            <Modal opened={opened} onClose={close} size="lg" title="Reason for Return">
                <div className="mb-3">
                    <label className="form-label">Select a reason:</label>
                    <div className="form-check-group">
                        {predefinedReasons.map((item, index) => (
                            <div className="form-check mb-2" key={index}>
                                <input
                                    type="radio"
                                    id={`reason-${index}`}
                                    name="reason"
                                    value={item}
                                    className="form-check-input"
                                    onChange={() => handleReasonChange(item)}
                                />
                                <label className="form-check-label" htmlFor={`reason-${index}`}>
                                    {item}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="reasonTextarea" className="form-label">
                        Reason Details:
                    </label>
                    <textarea
                        id="reasonTextarea"
                        name="reason"
                        cols="30"
                        rows="5"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="form-control"
                        placeholder="Please specify your reason here..."
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                    <button onClick={returnOrder} className="btn btn-info me-2">
                        Confirm Return
                    </button>
                    <button onClick={close} className="btn btn-secondary">
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
};

const OrderCancel = ({ token, id, fetchData }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [reason, setReason] = useState('');
    const predefinedReasons = [
        'Changed my mind',
        'Ordered by mistake',
        'Found a better price elsewhere',
        'Delayed delivery',
        'Other (please specify)',
    ];

    const handleReasonChange = (selectedReason) => {
        setReason(selectedReason);
    };

    const cancelOrder = () => {
        if (!reason) {
            alert('Please provide a reason for cancellation.');
            return;
        }

        const fd = new FormData();
        fd.append('reason', reason);
        axios
            .post(`${API_HOST}/order/${id}/cancel`, fd, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                fetchData();
                close();
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    return (
        <>
            <button onClick={open} className="btn btn-warning btn-sm">
                Cancel Order
            </button>
            <Modal opened={opened} onClose={close} size="lg" title="Reason for Cancellation">
                <div className="mb-3">
                    <label className="form-label">Select a reason:</label>
                    <div className="form-check-group">
                        {predefinedReasons.map((item, index) => (
                            <div className="form-check mb-2" key={index}>
                                <input
                                    type="radio"
                                    id={`reason-${index}`}
                                    name="reason"
                                    value={item}
                                    className="form-check-input"
                                    onChange={() => handleReasonChange(item)}
                                />
                                <label className="form-check-label" htmlFor={`reason-${index}`}>
                                    {item}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="reasonTextarea" className="form-label">
                        Reason Details:
                    </label>
                    <textarea
                        id="reasonTextarea"
                        name="reason"
                        cols="30"
                        rows="5"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="form-control"
                        placeholder="Please specify your reason here..."
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                    <button onClick={cancelOrder} className="btn btn-danger me-2">
                        Confirm Cancellation
                    </button>
                    <button onClick={close} className="btn btn-secondary">
                        Close
                    </button>
                </div>
            </Modal>
        </>
    );
};

const CancelItem = ({ token, item, fetchData }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [reason, setReason] = useState('');
    const predefinedReasons = [
        'Changed my mind',
        'Ordered by mistake',
        'Doctors recommendation',
        'Found a better price elsewhere',
        'Delayed delivery',
        'Other (please specify)',
    ];

    const handleReasonChange = (selectedReason) => {
        setReason(selectedReason);
    };

    const cancelOrderItem = () => {
        if (!reason) {
            alert('Please provide a reason for cancellation.');
            return;
        }

        const fd = new FormData();
        fd.append('reason', reason);
        axios
            .post(`${API_HOST}/order-item/${item.id}/cancel`, fd, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                fetchData();
                close();
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    return (
        <>
            <button onClick={open} className="btn btn-warning btn-sm">
                Cancel
            </button>
            <Modal opened={opened} onClose={close} size="lg" title="Reason for Cancellation">
                <div className="mb-3">
                    <label className="form-label">Select a reason:</label>
                    <div className="form-check-group">
                        {predefinedReasons.map((item, index) => (
                            <div className="form-check mb-2" key={index}>
                                <input
                                    type="radio"
                                    id={`reason-${index}`}
                                    name="reason"
                                    value={item}
                                    className="form-check-input"
                                    onChange={() => handleReasonChange(item)}
                                />
                                <label className="form-check-label" htmlFor={`reason-${index}`}>
                                    {item}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="reasonTextarea" className="form-label">
                        Reason Details:
                    </label>
                    <textarea
                        id="reasonTextarea"
                        name="reason"
                        cols="30"
                        rows="5"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="form-control"
                        placeholder="Please specify your reason here..."
                    ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                    <button onClick={cancelOrderItem} className="btn btn-danger me-2">
                        Confirm Cancellation
                    </button>
                    <button onClick={close} className="btn btn-secondary">
                        Close
                    </button>
                </div>
            </Modal>
        </>
    );
};

const OrderItemDetalis = ({item}) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <div className="row border-bottom py-3" onClick={open}>
                <div className="col-4 col-md-3">
                    <div className="product-thumbnail d-block">
                        {item.product.images.length > 0 ?
                            <img src={`${STORAGE_PATH}/${item.product.images[0].image_path}`} alt="Product" className="mb-2 img-fluid" />
                            :
                            <img src="/assets/images/no-image.png" alt="no img" className="mb-2 img-fluid" />
                        }
                    </div>
                </div>
                <div className="col-8 col-md-9">
                    <div className="item-name">
                        {item.product.name}
                    </div>
                    <p className="track-offer mb-1">
                        Price: <strong>₹ {item.product.offer_price}</strong>
                    </p>
                    <div className="item">Quantity: <strong>{item.quantity}</strong></div>
                </div>
            </div>
            <Modal opened={opened} onClose={close} size="lg" centered title="Order status">
                <div className="p-2">
                    <div className="row">
                        {item.statuses?.length > 0 && (
                            <div className="my-order-wrapper pt-3">
                                <div className="card w-100">
                                    <div className="card-body p-4">
                                        {item.statuses?.map(ist => (
                                            <div key={ist.id} className={`single-order-status ${ist.active ? 'active' : ''}`}>
                                                <div className="order-icon shadow-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
                                                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                                                    </svg>
                                                </div>

                                                {ist.status == 'placed' && <div className="order-text"><h6>Order Placed</h6><span>{new Date(ist.created_at).toLocaleString()}</span></div>}
                                                {ist.status == 'approved' && <div className="order-text"><h6>Order Approved</h6><span>{new Date(ist.created_at).toLocaleString()}</span></div>}
                                                {ist.status == 'processed' && <div className="order-text"><h6>Order Processed</h6><span>{new Date(ist.created_at).toLocaleString()}</span></div>}
                                                {ist.status == 'assigned' && <div className="order-text"><h6>Order Assigned</h6><span>{new Date(ist.created_at).toLocaleString()}</span></div>}
                                                {ist.status == 'onway' && <div className="order-text"><h6>Order On the way</h6><span>{new Date(ist.created_at).toLocaleString()}</span></div>}
                                                {ist.status == 'cancelled' && <div className="order-text"><h6>Order Cancelled {ist.done_by == 'customer' ? ' By you' : ` By ${ist.done_by}`}</h6><span>{new Date(ist.created_at).toLocaleString()}</span></div>}
                                                {ist.status == 'returned' && <div className="order-text"><h6>Order Returned {ist.done_by == 'customer' ? ' By you' : ` By ${ist.done_by}`}</h6><span>{new Date(ist.created_at).toLocaleString()}</span></div>}
                                                {ist.status == 'delivered' && <div className="order-text"><h6>Order Delivered</h6><span>{new Date(ist.created_at).toLocaleString()}</span></div>}

                                                <div className="order-status">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                                                        <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
}