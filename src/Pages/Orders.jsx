import React, { useEffect, useState } from 'react'
import MasterLayout from '../Layouts/MasterLayout'
import { API_HOST } from '../config/config';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    let token = localStorage.getItem('token');
    axios.get(`${API_HOST}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <MasterLayout>
      <div className="container">
        <div className="page-header">
          <div className="d-flex px-2" >
            <div className="back-button"></div>
            <div className="">
              <div className="title">
                <h2>Your Orders</h2>
              </div>
            </div>
          </div>
        </div>
        {(!orders || orders.length < 1) ? (
          <div className="card coupon-card mb-3">
            <div className="card-body d-flex flex-column align-items-center" style={{ gap: '1rem' }}>
              <img src="/assets/images/no_order.png" alt="No Order found" />
              <center><Link className="btn btn-warning" to="/">Back to Home</Link></center>
            </div>
          </div>

        ) : (

          <div className="row pt-5">
            {orders.map(order => <OrderItem key={order.id} order={order} />)}
          </div>
        )}
      </div>
    </MasterLayout>
  )
}

export default Orders

const OrderItem = ({ order }) => {
  const statusPriority = ['placed', 'approved', 'processed', 'delivered'];
  const statusAll = ['cancelled', 'returned'];
  const finalStatus = order.order_items.reduce((highestStatus, item) => {
    const latestActiveStatus = item.statuses.filter(s => s.active === 1).slice(-1)[0];
    const latestActiveStatusDate = latestActiveStatus ? latestActiveStatus.updated_at || latestActiveStatus.created_at : '';

    if (latestActiveStatus && statusPriority.includes(latestActiveStatus.status)) {
      return (highestStatus === '' || statusPriority.indexOf(latestActiveStatus.status) > statusPriority.indexOf(highestStatus))
        ? { status: latestActiveStatus.status, date: latestActiveStatusDate, doneBy: latestActiveStatus.done_by }
        : highestStatus;
    }

    return highestStatus;
  }, { status: '', date: '', doneBy: '' });

  const allCancelledOrReturned = order.order_items.every(item =>
    item.statuses.some(status => status.active === 1 && statusAll.includes(status.status))
  );

  if (allCancelledOrReturned) {
    finalStatus.status = statusAll.includes('cancelled') ? 'cancelled' : 'returned';

    const lastDoneBy = order.order_items.flatMap(item =>
      item.statuses.filter(status => status.active === 1 && statusAll.includes(status.status))
    ).pop();

    if (lastDoneBy) {
      finalStatus.doneBy = lastDoneBy.done_by;
    }
  }

  // Convert date to a more user-friendly format
  const formattedDate = finalStatus.date ? new Date(finalStatus.date).toLocaleString() : '';

  // Adjust doneBy field to display 'you' for customers
  const displayDoneBy = finalStatus.doneBy === 'customer' ? 'you' : finalStatus.doneBy;

  return (
    <div className="col-12 my-1" key={order.id}>
      <div className="card top-product-card">
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <Link to={`/order/${order.id}`} className="product-title d-block">
                Order Id: {order.order_no}
              </Link>
              <p className="offer-price">
                Total Price <span>₹ {order.payable_amount}</span>
              </p>
              {finalStatus.status == 'delivered' &&
                <div>
                  <div className="_3SbeKb _2K8tmU"></div>
                  <span className="AO0UbU">Delivered on {formattedDate}</span>
                  <div className="_30gI7w">Your Order has been Delivered.</div>
                </div>
              }
              {finalStatus.status == 'cancelled' &&
                <div>
                  <div className="_3SbeKb qU6Nxg"></div>
                  <span className="AO0UbU">
                    <strong>Cancelled on {formattedDate}</strong>
                  </span>
                  <div className="_30gI7w">
                    {displayDoneBy == 'you' ?
                      <span>As per your request, your item has been cancelled</span>
                      :
                      <span>Item has been cancelled by {displayDoneBy}</span>
                    }
                  </div>
                </div>
              }
              {finalStatus.status == 'placed' && (
                <div className='d-flex align-items-center'>
                  <div className="_3SbeKb _2K8tmU"></div>
                  <div className="_30gI7w">Your Order has been placed.</div>
                </div>
              )}

              {(finalStatus.status == 'processed' || finalStatus.status == 'approved') && (
                <div className='d-flex align-items-center'>
                  <div className="_3SbeKb _2K8tmU"></div>
                  <div className="_30gI7w">Your Order has been processed.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}