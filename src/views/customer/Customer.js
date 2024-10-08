import React, { useState, useEffect } from 'react';
import './Customer.scss';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    // Gọi API lấy dữ liệu khách hàng
    fetch('https://localhost:7249/api/customer') // Đường dẫn API
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error('Error fetching customer data:', error));
  }, []);

  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="customer-container">
      <div className="customer-header">
        <h1>Customers</h1>
        <div className="search-container">
          <input type="text" placeholder="Search customers" />
        </div>
      </div>
      <table className="customer-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Shipping Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>
                <div className="customer-icon">{customer.initials}</div>
              </td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
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
        <button
          className={currentPage === 1 ? 'active' : ''}
          onClick={() => paginate(1)}
        >
          1
        </button>
        <button
          className={currentPage === 2 ? 'active' : ''}
          onClick={() => paginate(2)}
        >
          2
        </button>
        <span className="dots">...</span>
        <button onClick={() => paginate(23)}>23</button>
        <button onClick={() => paginate(24)}>24</button>
        <button
          className="prev-next"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === 24}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Customer;
