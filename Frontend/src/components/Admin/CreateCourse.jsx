import { useState } from 'react';
import { adminAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageLink: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      
      await adminAPI.createCourse(courseData);
      setSuccess('Course created successfully!');
      
      setTimeout(() => {
        navigate('/admin/courses');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-container">
      <div className="create-course-card">
        <h2 className="page-title">Create New Course</h2>
        
        <form onSubmit={handleSubmit} className="course-form">
          <div className="form-group">
            <label htmlFor="title">Course Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter course title"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="form-textarea"
              placeholder="Enter course description"
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="form-input"
              placeholder="Enter course price"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="imageLink">Image URL</label>
            <input
              type="url"
              id="imageLink"
              name="imageLink"
              value={formData.imageLink}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter image URL"
            />
          </div>
          
          {formData.imageLink && (
            <div className="image-preview">
              <img src={formData.imageLink} alt="Course preview" />
            </div>
          )}
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/admin/courses')}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="submit-btn"
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;