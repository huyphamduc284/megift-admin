import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './PaymentMethods.scss';

const PaymentMethods = () => {
  const [data, setData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả sử bạn sẽ lấy dữ liệu từ API endpoint tương tự như các component khác
    fetch('https://localhost:7249/api/Dashboards/payment-methods')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        const total = data.reduce((sum, item) => sum + item.count, 0);
        setTotalSales(total);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching payment methods data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  const COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6']; // Màu cho các phương thức thanh toán

  return (
    <div className="dashboard-card payment-methods">
      <h2>Payment Methods</h2>
      <div className="total-sales">Total Sales: {totalSales.toLocaleString()}đ</div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="method"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '8px', border: 'none' }}
            formatter={(value) => `${value.toLocaleString()} Sales`}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="legend">
        {data.map((item, index) => (
          <div key={item.method} className="legend-item">
            <span className="dot" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
            <span className="method-info">
              {item.method} - {((item.count / totalSales) * 100).toFixed(0)}%
            </span>
            <span className="sales-count">
              {item.count.toLocaleString()} Sales
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
