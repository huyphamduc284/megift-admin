import React, { useState, useEffect } from 'react';
import './Order.scss';

const Order = () => {
  const [orders, setOrders] = useState([]); // State to hold all fetched orders
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state
  const itemsPerPage = 8; // Items per page

  useEffect(() => {
    // Fetch order data from API
    fetch('https://localhost:7249/api/Order') // Replace this with your API URL
      .then((response) => response.json())
      .then((data) => {
        setOrders(data); // Set the fetched orders to state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError('Error fetching orders');
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading orders...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if the API request fails
  }

  return (
    <div className="order-container">
      <div className="order-header">
        <h1>Orders</h1>
        <div className="search-container">
          <input type="text" placeholder="Search orders" />
        </div>
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.productName}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </td>
              <td>
                <button className="action-button">...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="prev-next"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {/* Dynamically render pagination buttons */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="prev-next"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Order;
