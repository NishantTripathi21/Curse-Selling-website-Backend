import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import CourseCard from '../Course/CourseCard';
import { useNavigate } from 'react-router-dom';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await adminAPI.getCourses();
      setCourses(response.data.courses);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="admin-courses-container">
      <div className="page-header">
        <h1 className="page-title">Manage Courses</h1>
        <button 
          onClick={() => navigate('/admin/create')}
          className="create-course-btn"
        >
          Create New Course
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {courses.length === 0 ? (
        <div className="empty-state">
          <h3>No courses found</h3>
          <p>Create your first course to get started</p>
          <button 
            onClick={() => navigate('/admin/create')}
            className="create-first-course-btn"
          >
            Create Course
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard
              key={course.id || course._id}
              course={course}
              isAdmin={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCourses;