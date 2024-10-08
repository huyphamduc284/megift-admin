import React, { useState } from 'react';
import './Review.scss';

const reviewData = [
  { id: 'EH', name: 'Nguyễn Minh Anh', review: 'Đa dạng sản phẩm, dịch vụ khách hàng tốt, giao hàng nhanh.' },
  { id: 'WW', name: 'Trần Quang Huy', review: 'Thiết kế tinh tế, chất lượng tốt, giá cả phải chăng.' },
  { id: 'BS', name: 'Lê Ngọc Lan', review: 'Đa dạng sản phẩm, dịch vụ khách hàng tốt, giao hàng nhanh.' },
  { id: 'RF', name: 'Phạm Bảo Châu', review: 'Giao diện đẹp, sản phẩm đa dạng, chăm sóc khách hàng tốt, giao hàng nhanh.' },
  { id: 'DR', name: 'Hoàng Hải Đăng', review: 'Đa dạng sản phẩm, dịch vụ khách hàng tốt, giao hàng nhanh.' },
  { id: 'RE', name: 'Vũ Thu Hà', review: 'Mẫu mã đa dạng, giá cả hợp lý, dịch vụ tốt.' },
  { id: 'TW', name: 'Đặng Thanh Tùng', review: 'Sản phẩm cao cấp, thiết kế đẹp, dịch vụ khách hàng tốt, giá cao.' },
  { id: 'AM', name: 'Phan Diệu Linh', review: 'Giao diện đẹp, sản phẩm đa dạng, chăm sóc khách hàng tốt, giao hàng nhanh.' },
];

const Review = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = reviewData.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="review-container">
      <div className="review-header">
        <h1>Reviews</h1>
        <div className="search-container">
          <input type="text" placeholder="Search reviews" />
        </div>
      </div>
      <table className="review-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Review</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentReviews.map((review) => (
            <tr key={review.id}>
              <td>
                <div className="review-icon">{review.id}</div>
              </td>
              <td>{review.name}</td>
              <td>{review.review}</td>
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

export default Review;
