import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Nhẫn - N0001', value: 1000, color: '#0088FE' },
  { name: 'Dây Chuyền - DC0003', value: 790, color: '#00C49F' },
  { name: 'Dây Chuyền - DC1231', value: 740, color: '#FFBB28' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const BestSelling = () => {
  const totalSales = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="dashboard-card best-selling">
      <h2>Best Selling</h2>
      <div className="subtitle">THIS MONTH</div>
      <div className="total-sales">{totalSales.toLocaleString()}đ</div>
      <div className="subtitle">Total Sales</div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="legend">
        {data.map((item, index) => (
          <li key={index}>
            <span className="dot" style={{ backgroundColor: item.color }}></span>
            {item.name} - {item.value} Sales
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestSelling;