import React, { useEffect, useState } from 'react';
import './Customer.scss';

const Customers = () => {
  const [data, setData] = useState({ totalUsers: 0, lastWeekLogins: 0, currentDayLogins: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://localhost:7249/api/Dashboards/customer')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching customer summary data:', error);
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-card customers-summary">
      <h2>Customer Summary</h2>
      <div className="summary-item">
        <h3>Total Users</h3>
        <p>{data.totalUsers.toLocaleString()}</p>
      </div>
      <div className="summary-item">
        <h3>Logins Last Week</h3>
        <p>{data.lastWeekLogins.toLocaleString()}</p>
      </div>
      <div className="summary-item">
        <h3>Logins Today</h3>
        <p>{data.currentDayLogins.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Customers;
