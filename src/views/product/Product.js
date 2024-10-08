import React, { useState, useEffect } from 'react';
import './Product.scss';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    // Gọi API lấy dữ liệu sản phẩm
    fetch('https://localhost:7249/api/Product') // Đường dẫn API
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching product data:', error));
  }, []);

  // Tính toán các sản phẩm hiển thị dựa trên trang hiện tại
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Xử lý chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-container">
      <div className="product-header">
        <h1>Products</h1>
        <div className="search-container">
          <input type="text" placeholder="Search products" />
        </div>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Categories</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </td>
              <td>{product.name}</td>
              <td>{product.sku}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
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

export default Product;
