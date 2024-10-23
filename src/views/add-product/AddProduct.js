import React, { useState } from 'react';
import { X } from 'lucide-react';
import './AddProduct.scss';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    slug: '',
    sku: '',
    description: '',
    stockStatus: '',
    availableQuantity: '',
    images: [],
    colors: [],
    sizes: []
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  
  const availableSizes = ['S', 'M', 'X', 'XL', 'XXL'];
  const availableColors = [
    { name: 'Light Blue', code: '#B6D0E2' },
    { name: 'Yellow', code: '#FBD96D' },
    { name: 'Green', code: '#9FD89B' },
    { name: 'Blue', code: '#4169E1' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      sizes: selectedSizes,
      colors: selectedColors
    };
    console.log('Submitting product:', productData);
    // Add your API call here
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock status</label>
            <input
              type="text"
              name="stockStatus"
              value={formData.stockStatus}
              onChange={handleInputChange}
              required
            />
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
            <label>Available quantity</label>
            <input
              type="number"
              name="availableQuantity"
              value={formData.availableQuantity}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
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
          />
        </div>

        <div className="form-group full-width">
          <label>Images</label>
          <div className="image-upload-container">
            <label className="image-upload-button">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              Choose product images
            </label>
            <div className="image-preview-container">
              {formData.images.map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={image} alt={`Product ${index + 1}`} />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => removeImage(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group full-width">
          <label>Colors</label>
          <div className="colors-container">
            {availableColors.map(color => (
              <button
                key={color.code}
                type="button"
                className={`color-option ${selectedColors.includes(color.code) ? 'selected' : ''}`}
                style={{ backgroundColor: color.code }}
                onClick={() => toggleColor(color.code)}
              />
            ))}
          </div>
        </div>

        <div className="form-group full-width">
          <label>Sizes</label>
          <div className="sizes-container">
            {availableSizes.map(size => (
              <button
                key={size}
                type="button"
                className={`size-option ${selectedSizes.includes(size) ? 'selected' : ''}`}
                onClick={() => toggleSize(size)}
              >
                {size}
              </button>
            ))}
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