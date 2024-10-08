import React, { useState } from 'react';
import './Customer.scss';

const customerData = [
  { id: 'EH', name: 'Nguyễn Minh Anh', email: 'nguyenminhanh@gmail.com', address: '123 Đường Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh' },
  { id: 'WW', name: 'Trần Quang Huy', email: 'tranquanghuy@yahoo.com', address: '456 Đường Nguyễn Trãi, Quận Thanh Xuân, Hà Nội' },
  { id: 'BS', name: 'Lê Ngọc Lan', email: 'lengoclan@hotmail.com', address: '789 Đường Lê Lợi, Quận Hải Châu, Đà Nẵng' },
  { id: 'RF', name: 'Phạm Bảo Châu', email: 'phambaobaochau@outlook.com', address: '101 Đường Lý Thường Kiệt, Quận 10, TP. Hồ Chí Minh' },
  { id: 'DR', name: 'Hoàng Hải Đăng', email: 'hoanghai.dang@fpt.edu.vn', address: '202 Đường Trần Phú, Quận Hà Đông, Hà Nội' },
  { id: 'RE', name: 'Vũ Thu Hà', email: 'vuthuha@gmail.com', address: '303 Đường Hùng Vương, Quận Ninh Kiều, Cần Thơ' },
  { id: 'TW', name: 'Đặng Thanh Tùng', email: 'dangthanhtung@outlook.com', address: '404 Đường Lê Văn Việt, Quận 9, TP. Hồ Chí Minh' },
  { id: 'AM', name: 'Phan Diệu Linh', email: 'phandieu.linh@yahoo.com', address: '505 Đường Lê Lợi, Quận Hải Châu, Đà Nẵng' },
];

const Customer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Số khách hàng trên mỗi trang

  // Tính toán các khách hàng hiển thị dựa trên trang hiện tại
  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = customerData.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // Xử lý chuyển trang
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
                <div className="customer-icon">{customer.id}</div>
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
