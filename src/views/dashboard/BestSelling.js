import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, LabelList } from 'recharts';
import './BestSelling.scss';

const BestSelling = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://localhost:7249/api/Dashboards/best-selling')
      .then((response) => response.json())
      .then((data) => {
        const topData = data.slice(0, 10); // Lấy top 10 sản phẩm
        setData(topData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching best selling data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-card best-selling">
      <h2>Top 10 Best Selling Products</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 40, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 14 }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: '8px', border: 'none' }}
            itemStyle={{ color: '#fff' }}
            cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
          />
          <Bar dataKey="sales" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#colorUv${index})`} />
            ))}
            <LabelList dataKey="sales" position="right" style={{ fill: '#333', fontSize: 12 }} />
          </Bar>
          {/* Define gradient once and reuse */}
          <defs>
            {data.map((_, index) => (
              <linearGradient id={`colorUv${index}`} x1="0" y1="0" x2="1" y2="0" key={index}>
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

export default BestSelling;
