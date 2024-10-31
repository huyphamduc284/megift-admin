import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { toast } from 'react-toastify'; // Import toast từ react-toastify
import './AddProduct.scss';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
<<<<<<< HEAD
    category: '',
    description: '',
    stockQuantity: '',
=======
    slug: '',
    sku: '',
    description: '',
>>>>>>> c64f44606fa98d3dd8bb49d7fa6dd8044d8bd891
    images: [],
    colors: [],
    sizes: []
  });

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Thông báo lỗi nếu có

  const navigate = useNavigate(); // Để điều hướng về trang danh sách sản phẩm

  const availableSizes = ['S', 'M', 'X', 'XL', 'XXL'];
  const availableColors = [
    { name: 'Light Blue', code: '#B6D0E2' },
    { name: 'Yellow', code: '#FBD96D' },
    { name: 'Green', code: '#9FD89B' },
    { name: 'Blue', code: '#4169E1' }
  ];

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image file uploads
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Capture the files
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files] // Store the actual file objects
    }));
  };

  // Remove an image by index
  const removeImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Toggle selected size
  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  // Toggle selected color
  const toggleColor = (color) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  // Handle form submission to call API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage('');

    // Create FormData object to hold all the product data
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('Name', formData.title);
    formDataToSubmit.append('Price', formData.price);
    formDataToSubmit.append('Sku', formData.sku);
    formDataToSubmit.append('Slug', formData.slug);
    formDataToSubmit.append('Description', formData.description);
    formDataToSubmit.append('Colors', selectedColors.join(',')); // Join colors to a comma-separated string
    formDataToSubmit.append('Size', selectedSizes.join(',')); // Join sizes to a comma-separated string

    // Append images to FormData
    for (let i = 0; i < formData.images.length; i++) {
      formDataToSubmit.append('Images', formData.images[i]);
    }

    try {
      const response = await fetch('https://localhost:7249/api/Product', {
        method: 'POST',
        body: formDataToSubmit
      });

      if (response.ok) {
        // Hiển thị toast thông báo thành công
        toast.success('Product added successfully!');
        // Điều hướng về trang danh sách sản phẩm sau khi thêm thành công
        navigate('/product');
      } else {
        setErrorMessage('Failed to add product. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error adding product: ' + error.message);
    }
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>

      {/* Thông báo lỗi nếu có */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
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
<<<<<<< HEAD
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
=======
            <label>Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
>>>>>>> c64f44606fa98d3dd8bb49d7fa6dd8044d8bd891
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
<<<<<<< HEAD
            <label>Stock Quantity</label>
=======
            <label>SKU</label>
>>>>>>> c64f44606fa98d3dd8bb49d7fa6dd8044d8bd891
            <input
              type="text"
              name="sku"
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
                  <img src={URL.createObjectURL(image)} alt={`Product ${index + 1}`} />
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
