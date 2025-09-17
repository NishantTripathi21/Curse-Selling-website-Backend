import { useState, useEffect } from 'react';
import { userAPI } from '../../services/api';
import CourseCard from '../Course/CourseCard';

const PurchasedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPurchasedCourses();
  }, []);

  const fetchPurchasedCourses = async () => {
    try {
      const response = await userAPI.getPurchasedCourses();
      setCourses(response.data.purchasedCourses);
    } catch (err) {
      setError('Failed to fetch purchased courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading your courses...</div>;
  }

  return (
    <div className="purchased-courses-container">
      <div className="page-header">
        <h1 className="page-title">My Courses</h1>
        <p className="page-subtitle">Courses you have purchased</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {courses.length === 0 ? (
        <div className="empty-state">
          <h3>No courses purchased yet</h3>
          <p>Browse our course catalog to get started</p>
          <a href="/courses" className="browse-courses-btn">
            Browse Courses
          </a>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard
              key={course.id || course._id}
              course={course}
              isPurchased={true}
              isAdmin={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchasedCourses;