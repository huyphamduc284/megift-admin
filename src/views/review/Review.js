import React, { useState, useEffect } from 'react';
import './Review.scss';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    // Gọi API lấy dữ liệu đánh giá
    fetch('https://localhost:7249/api/review') // Đường dẫn API
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching review data:', error));
  }, []);

  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

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
                <div className="review-icon">{review.initials}</div>
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
