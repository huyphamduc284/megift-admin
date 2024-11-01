import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecentOrders.scss';

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    fetch('https://localhost:7249/api/Dashboards/recent-orders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recent orders:', error);
        setLoading(false);
      });
  }, []);

  const handleViewAll = () => {
    navigate('/order'); 
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-card recent-orders">
      <div className="header">
        <h2>Recent Orders</h2>
        <button className="view-all" onClick={handleViewAll}>View All</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.item}</td>
              <td>{order.date}</td>
              <td>{order.total.toLocaleString()}đ</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;
