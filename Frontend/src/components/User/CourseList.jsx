import { useState, useEffect } from 'react';
import { userAPI } from '../../services/api';
import CourseCard from '../Course/CourseCard';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchPurchasedCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await userAPI.getCourses();
      setCourses(response.data.courses);
    } catch (err) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchasedCourses = async () => {
    try {
      const response = await userAPI.getPurchasedCourses();
      setPurchasedCourses(response.data.purchasedCourses);
    } catch (err) {
      console.error('Failed to fetch purchased courses:', err);
    }
  };

  const handlePurchase = async (courseId) => {
    try {
      await userAPI.purchaseCourse(courseId);
      alert('Course purchased successfully!');
      fetchPurchasedCourses(); // Refresh purchased courses
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to purchase course');
    }
  };

  const isPurchased = (courseId) => {
    return purchasedCourses.some(course => 
      (course.id || course._id) === courseId
    );
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="course-list-container">
      <div className="page-header">
        <h1 className="page-title">Available Courses</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {filteredCourses.length === 0 ? (
        <div className="empty-state">
          <h3>No courses found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="courses-grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id || course._id}
              course={course}
              onPurchase={handlePurchase}
              isPurchased={isPurchased(course.id || course._id)}
              isAdmin={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;