import React from 'react';

const recentOrders = [
  { item: 'Dây chuyền - DC0001', date: '20 Mar, 2024', total: '150.000đ', status: 'Processing' },
  { item: 'Nhẫn - N0001', date: '19 Mar, 2024', total: '250.000đ', status: 'Processing' },
  { item: 'Dây chuyền - DC0003', date: '7 Feb, 2024', total: '720.000đ', status: 'Completed' },
  { item: 'MOCKUP Black', date: '29 Jan, 2024', total: '130.000đ', status: 'Completed' },
  { item: 'Monochromatic Wardrobe', date: '27 Jan, 2024', total: '500.000đ', status: 'Completed' },
];

const RecentOrders = () => {
  return (
    <div className="dashboard-card recent-orders">
      <div className="header">
        <h2>Recent Orders</h2>
        <button className="view-all">View All</button>
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
          {recentOrders.map((order, index) => (
            <tr key={index}>
              <td>{order.item}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;