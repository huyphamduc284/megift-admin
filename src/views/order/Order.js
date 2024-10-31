import React, { useState, useEffect } from 'react';
import './Order.scss';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    fetch('https://localhost:7249/api/Orders')
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching orders');
        setLoading(false);
      });
  }, []);

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="order-container">
      <div className="order-header">
        <h1>Orders</h1>
      </div>
      <table className="order-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <React.Fragment key={order.orderId}>
              <tr
                className="order-row"
                onClick={() => toggleOrderDetails(order.orderId)}
              >
                <td>{order.customer}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.totalAmount}</td>
                <td>
                  <span className={`status ${order.orderStatus.toLowerCase()}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td>{order.orderType}</td>
              </tr>
              {expandedOrderId === order.orderId && (
                <tr className="order-details-row">
                  <td colSpan="6">
                    <div className="order-details-container">
                      <h3>Order Details</h3>
                      <div className="order-details-rows">
                        {order.orderDetails.map((detail) => (
                          <div key={detail.productId} className="order-detail-row">
                            <img
                              src={detail.productImage}
                              alt={detail.productName}
                              className="product-image"
                            />
                            <div className="product-info">
                              <span className="product-name">{detail.productName}</span>
                              <span>Quantity: {detail.quantity}</span>
                              <span>Price: {detail.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
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
