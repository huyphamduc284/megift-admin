import React from 'react';

const Orders = () => {
  const totalOrders = 734;
  const monthlyGoal = 1200;
  const progress = (totalOrders / monthlyGoal) * 100;

  return (
    <div className="dashboard-card orders">
      <h2>Orders</h2>
      <div className="order-count">{totalOrders}</div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="goal">MONTHLY GOALS: {monthlyGoal}</div>
    </div>
  );
};

export default Orders;