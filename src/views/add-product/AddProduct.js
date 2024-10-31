import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import './AddProduct.scss';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    categoryId: '',
    price: '',
    stockQuantity: '',
    description: '',
    imageUrl: null
  });

  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Fetch categories from API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://localhost:7249/api/Categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      imageUrl: file
    }));
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      imageUrl: null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('ProductName', formData.productName);
    formDataToSubmit.append('CategoryId', Number(formData.categoryId)); // Ensure categoryId is a number
    formDataToSubmit.append('Price', formData.price);
    formDataToSubmit.append('StockQuantity', formData.stockQuantity);
    formDataToSubmit.append('Description', formData.description);

    if (formData.imageUrl) {
      formDataToSubmit.append('ImageUrl', formData.imageUrl);
    }

    try {
      const response = await fetch('https://localhost:7249/api/Products', {
        method: 'POST',
        body: formDataToSubmit
      });

      if (response.ok) {
        toast.success('Product added successfully!');
        navigate('/product');
      } else {
        const errorData = await response.json();
        setErrorMessage('Failed to add product: ' + JSON.stringify(errorData));
      }
    } catch (error) {
      setErrorMessage('Error adding product: ' + error.message);
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock Quantity</label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Image</label>
          <div className="image-upload-container">
            <label className="image-upload-button">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              Choose product image
            </label>
            {formData.imageUrl && (
              <div className="image-preview">
                <img src={URL.createObjectURL(formData.imageUrl)} alt="Product" />
                <button
                  type="button"
                  className="remove-image"
                  onClick={removeImage}
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
