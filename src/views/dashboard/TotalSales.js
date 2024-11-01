import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';
import './TotalSales.scss';

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
      <div className="total-amount">112,400,500đ</div>
      <div className="subtitle">TODAY</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '8px', border: 'none' }}
            formatter={(value) => `${value.toLocaleString()}đ`}
          />
          <Bar dataKey="value" radius={[5, 5, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#colorUv${index})`} />
            ))}
            <LabelList dataKey="value" position="top" style={{ fill: '#333', fontSize: 12 }} />
          </Bar>
          <defs>
            {data.map((_, index) => (
              <linearGradient id={`colorUv${index}`} x1="0" y1="0" x2="0" y2="1" key={index}>
                <stop offset="5%" stopColor="#84d8d0" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={1} />
              </linearGradient>
            ))}
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalSales;
