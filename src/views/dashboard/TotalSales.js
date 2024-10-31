import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '01', value: 3800 },
  { name: '02', value: 3200 },
  { name: '03', value: 4100 },
  { name: '04', value: 3600 },
  { name: '05', value: 3900 },
  { name: '06', value: 3300 },
  { name: '07', value: 4200 }
];

const TotalSales = () => {
  return (
    <div className="dashboard-card total-sales">
      <h2>Total Sales</h2>
      <div className="total-amount">112.400.500đ</div>
      <div className="subtitle">TODAY</div>
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