import React from 'react';

const PaymentMethods = () => {
  const data = [
    { method: 'COD', count: 1200, color: '#3498db' },
    { method: 'Credit Card', count: 800, color: '#2ecc71' },
    { method: 'E-Wallet', count: 530, color: '#e74c3c' }
  ];

  const total = data.reduce((sum, item) => sum + item.count, 0);

  const createPieSlice = (startAngle, endAngle) => {
    const start = (startAngle - 90) * Math.PI / 180;
    const end = (endAngle - 90) * Math.PI / 180;
    
    const x1 = 50 + 40 * Math.cos(start);
    const y1 = 50 + 40 * Math.sin(start);
    const x2 = 50 + 40 * Math.cos(end);
    const y2 = 50 + 40 * Math.sin(end);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  let currentAngle = 0;
  const paths = data.map(item => {
    const angle = (item.count / total) * 360;
    const path = createPieSlice(currentAngle, currentAngle + angle);
    currentAngle += angle;
    return { ...item, path };
  });

  return (
    <div className="payment-methods">
      <h2>Payment Methods</h2>
      <div className="subtitle">THIS MONTH</div>
      <div className="total-amount">2,530đ</div>
      <div className="total-label">Total Sales</div>
      
      <div className="chart-container">
        <svg viewBox="0 0 100 100">
          {paths.map((item) => (
            <path
              key={item.method}
              d={item.path}
              fill={item.color}
            />
          ))}
        </svg>
      </div>
      
      <div className="legend">
        {data.map((item) => (
          <div key={item.method} className="legend-item">
            <span className="dot" style={{ backgroundColor: item.color }}></span>
            <span className="method-info">
              {item.method} - {((item.count / total) * 100).toFixed(0)}%
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