import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1', value: 4000 },
  { name: '5', value: 3000 },
  { name: '10', value: 2000 },
  { name: '15', value: 2780 },
  { name: '20', value: 1890 },
  { name: '25', value: 2390 },
  { name: '30', value: 3490 },
];

const TotalSales = () => {
  return (
    <div className="dashboard-card total-sales">
      <h2>Total Sales</h2>
      <div className="total-amount">112.400.500đ</div>
      <div className="subtitle">THIS MONTH</div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalSales;