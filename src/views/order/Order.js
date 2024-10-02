import React from 'react';
import './Order.scss';


const orderData = [
  { id: 'DC0001', name: 'Dây chuyền - DC0001', date: '20 Mar, 2024', total: '520.000đ', status: 'Processing', image: '/images/order_images/dc001.jpg' },
  { id: 'DC0002', name: 'Dây chuyền - DC0002', date: '19 Mar, 2024', total: '130.000đ', status: 'Processing', image: '/images/order_images/dc002.jpg' },
  { id: 'N0001', name: 'Nhẫn - N0001', date: '7 Feb, 2024', total: '420.000đ', status: 'Completed', image: '/images/order_images/dc003.jpg' },
  { id: 'DC0003', name: 'Dây chuyền - DC0003', date: '29 Jan, 2024', total: '720.000đ', status: 'Completed', image: '/images/order_images/dc004.jpg' },
  { id: 'UD0001', name: 'UTRANET Black - UD0001', date: '27 Jan, 2024', total: '150.000đ', status: 'Processing', image: '/images/order_images/box1.jpg' },
  { id: 'N0002', name: 'Nhẫn - N0002', date: '4 Jan, 2024', total: '200.000đ', status: 'Cancelled', image: '/images/order_images/dc003.jpg' },
  { id: 'DC0004', name: 'Dây chuyền - DC0004', date: '28 Dec, 2024', total: '670.000đ', status: 'Completed', image: '/images/order_images/dc002.jpg' },
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', date: '20 Dec, 2024', total: '150.000đ', status: 'Processing', image: '/images/order_images/box1.jpg' },
];

const Order = () => {
  return (
    <div className="order-container">
      <div className="order-header">
        <h1>Orders</h1>
        <div className="search-container">
          <input type="text" placeholder="Search orders" />
        </div>
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th></th>
            <th>Order</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr key={order.id}>
              <td>
                <div className="order-image">
                  <img src={order.image} alt={order.name} />
                </div>
              </td>
              <td>{order.name}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <button className="action-button">...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>&lt;</button>
        <button className="active">1</button>
        <button>2</button>
        <span>...</span>
        <button>23</button>
        <button>24</button>
        <button>&gt;</button>
      </div>
    </div>
  );
};

export default Order;