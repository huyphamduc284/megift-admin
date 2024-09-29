import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1', value: 4000 },
  { name: '5', value: 3000 },
  { name: '10', value: 2000 },
  { name: '15', value: 2780 },
  { name: '20', value: 1890 },
  { name: '25', value: 2390 },
  { name: '30', value: 3490 },
];

const Customers = () => {
  return (
    <div className="dashboard-card customers">
      <h2>Customers</h2>
      <div className="customer-count">2,571</div>
      <div className="subtitle">THIS MONTH</div>
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