import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: '01', value: 85 },
  { day: '02', value: 92 },
  { day: '03', value: 78 },
  { day: '04', value: 88 },
  { day: '05', value: 95 },
  { day: '06', value: 86 },
  { day: '07', value: 91 }
];

const Customers = () => {
  return (
    <div className="dashboard-card customers">
      <h2>Customers</h2>
      <div className="customer-count">2,571</div>
      <div className="subtitle">TODAY</div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={100}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis hide />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Customers;