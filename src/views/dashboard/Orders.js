import React, { useEffect, useState } from 'react';
import './Orders.scss';

const Orders = () => {
  const [data, setData] = useState({ totalOrders: 0, monthlyGoal: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://localhost:7249/api/Dashboards/monthly-orders')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching order data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  const progress = (data.totalOrders / data.monthlyGoal) * 100;

  return (
    <div className="dashboard-card orders">
      <h2>Orders</h2>
      <div className="order-count">{data.totalOrders}</div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #3498db, #2ecc71)',
            transition: 'width 0.5s ease-in-out',
          }}
        ></div>
      </div>
      <div className="goal">MONTHLY GOALS: {data.monthlyGoal}</div>
    </div>
  );
};

export default Orders;
