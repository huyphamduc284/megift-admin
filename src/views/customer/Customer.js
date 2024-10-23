import React, { useState, useEffect } from 'react';
import './Customer.scss';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of customers per page

  useEffect(() => {
    // Fetch customer data from API
    fetch('https://localhost:7249/api/customer')
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error('Error fetching customer data:', error));
  }, []);

  // Total number of pages
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  // Get the current customers to display
  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationButtons = () => {
    const buttons = [];
    const siblingCount = 1; // Pages to show before and after the current page
    const totalNumbersToShow = siblingCount * 2 + 3; // Pages around current, including the first/last
    
    if (totalPages <= totalNumbersToShow) {
      // Show all pages if the total is less than the numbers we want to display
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={currentPage === i ? 'active' : ''}
            onClick={() => paginate(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Show the first page
      buttons.push(
        <button
          key={1}
          className={currentPage === 1 ? 'active' : ''}
          onClick={() => paginate(1)}
        >
          1
        </button>
      );

      // Ellipses before the range
      if (currentPage > siblingCount + 2) {
        buttons.push(<span key="start-ellipsis" className="dots">...</span>);
      }

      // Show pages around the current page
      const startPage = Math.max(2, currentPage - siblingCount);
      const endPage = Math.min(totalPages - 1, currentPage + siblingCount);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            className={currentPage === i ? 'active' : ''}
            onClick={() => paginate(i)}
          >
            {i}
          </button>
        );
      }

      // Ellipses after the range
      if (currentPage < totalPages - siblingCount - 1) {
        buttons.push(<span key="end-ellipsis" className="dots">...</span>);
      }

      // Show the last page
      buttons.push(
        <button
          key={totalPages}
          className={currentPage === totalPages ? 'active' : ''}
          onClick={() => paginate(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

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
                <div className="customer-image">
                  <img src={customer.image} alt={customer.name} />
                </div>
              </td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.shippingAddress}</td>
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

        {renderPaginationButtons()}

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

export default Customer;
