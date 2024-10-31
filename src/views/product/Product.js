import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Thêm useLocation để nhận thông báo sau khi thêm sản phẩm
import { Plus } from 'lucide-react';
import './Product.scss';

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Để nhận thông báo từ trang thêm sản phẩm
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetch('https://localhost:7249/api/Products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const siblingCount = 1;
    const totalNumbersToShow = siblingCount * 2 + 3;
    
    if (totalPages <= totalNumbersToShow) {
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
      buttons.push(
        <button
          key={1}
          className={currentPage === 1 ? 'active' : ''}
          onClick={() => paginate(1)}
        >
          1
        </button>
      );

      if (currentPage > siblingCount + 2) {
        buttons.push(<span key="start-ellipsis" className="dots">...</span>);
      }

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

      if (currentPage < totalPages - siblingCount - 1) {
        buttons.push(<span key="end-ellipsis" className="dots">...</span>);
      }

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
    <div className="product-container">
      <div className="product-header">
        <h1>Products</h1>
        <div className="header-actions">
          <button 
            onClick={handleAddProduct}
            className="add-button"
          >
            <Plus className="icon" />
            Add Product
          </button>
        </div>
      </div>

      {/* Hiển thị thông báo nếu quay lại từ trang thêm sản phẩm */}
      {location.state?.message && (
        <div className="success-message">
          {location.state.message}
        </div>
      )}

<table className="product-table">
  <thead>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Category</th>
      <th>Price</th>
      <th>Stock</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    {currentProducts.map((product) => (
      <tr key={product.productId}>
        <td>
          <div className="product-image">
            <img src={product.imageUrl} alt={product.productName} />
          </div>
        </td>
        <td>{product.productName}</td>
        <td>{product.category}</td>
        <td>{product.price}</td>
        <td>{product.stockQuantity}</td>
        <td>{product.description}</td> 
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

export default Product;
