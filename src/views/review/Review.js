import React, { useState, useEffect } from 'react';
import './Review.scss';

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of reviews per page

  useEffect(() => {
    // Fetch review data from API
    fetch('https://localhost:7249/api/Reviews')
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching review data:', error));
  }, []);

  // Calculate the total number of pages
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // Get the current reviews to display
  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render pagination buttons dynamically
  const renderPaginationButtons = () => {
    const buttons = [];
    const siblingCount = 1; // Number of pages to show around the current page
    const totalNumbersToShow = siblingCount * 2 + 3; // Pages around the current, including the first/last

    if (totalPages <= totalNumbersToShow) {
      // Display all pages if total is less than the number we want to display
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
    <div className="review-container">
      <div className="review-header">
        <h1>Reviews</h1>
      </div>
      <table className="review-table">
  <thead>
    <tr>
      <th>Product</th>
      <th>Customer</th>
      <th>Rating</th>
      <th>Review</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {currentReviews.map((review) => (
      <tr key={review.reviewId}>
        <td>{review.product}</td>
        <td>{review.customer}</td>
        <td>{review.rating}</td>
        <td>{review.comment}</td>
        <td>{new Date(review.reviewDate).toLocaleDateString()}</td> 
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

export default Review;
