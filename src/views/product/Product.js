import React from 'react';
import './Product.scss';

const productData = [
  { id: 'DC0001', name: 'Dây chuyền - DC0001', price: '100.000đ', stock: 'In Stock', category: 'Dây chuyền', image: '/images/product_images/dc001.jpg' },
  { id: 'DC0002', name: 'Dây chuyền - DC0002', price: '35.000đ', stock: 'In Stock', category: 'Dây chuyền', image: '/images/product_images/dc002.jpg' },
  { id: 'N0001', name: 'Nhẫn - N0001', price: '27.000đ', stock: 'In Stock', category: 'Nhẫn', image: '/images/product_images/n001.jpg' },
  { id: 'DC0003', name: 'Dây chuyền - DC0003', price: '22.000đ', stock: 'In Stock', category: 'Dây chuyền', image: '/images/product_images/dc003.jpg' },
  { id: 'UD0001', name: 'UTRAANET Black - UD0001', price: '43.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud001.jpg' },
  { id: 'N0002', name: 'Nhẫn - N0002', price: '35.000đ', stock: 'In Stock', category: 'Nhẫn', image: '/images/product_images/n002.jpg' },
  { id: 'DC0004', name: 'Dây chuyền - DC0004', price: '57.000đ', stock: 'In Stock', category: 'Dây chuyền', image: '/images/product_images/dc004.jpg' },
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', price: '30.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud002.jpg' },
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', price: '30.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud002.jpg' },

  
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', price: '30.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud002.jpg' },
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', price: '30.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud002.jpg' },
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', price: '30.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud002.jpg' },
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', price: '30.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud002.jpg' },
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', price: '30.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud002.jpg' },
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', price: '30.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud002.jpg' },
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', price: '30.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud002.jpg' },
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', price: '30.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud002.jpg' },
  { id: 'UD0002', name: 'MOCKUP Black - UD0002', price: '30.000đ', stock: 'In Stock', category: 'Khác', image: '/images/product_images/ud002.jpg' },
];

const Product = () => {
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
          {productData.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </td>
              <td>{product.name}</td>
              <td>{product.id}</td>
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
        <button>&lt;</button>
        <button className="active">1</button>
        <button>2</button>
        <span>...</span>
        <button>23</button>
        <button>24</button>
        <button>&gt;</button>
      </div>
    </div>
  );
};

export default Product;
