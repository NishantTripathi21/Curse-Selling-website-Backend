import { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    publishedCourses: 0,
    draftCourses: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getCourses();
      const courses = response.data.courses;
      
      setStats({
        totalCourses: courses.length,
        publishedCourses: courses.filter(course => course.published).length,
        draftCourses: courses.filter(course => !course.published).length
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-subtitle">Manage your courses and track performance</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.totalCourses}</h3>
            <p className="stat-label">Total Courses</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.publishedCourses}</h3>
            <p className="stat-label">Published</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3 className="stat-number">{stats.draftCourses}</h3>
            <p className="stat-label">Drafts</p>
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="action-buttons">
          <button 
            onClick={() => navigate('/admin/create')}
            className="action-btn primary"
          >
            <span className="btn-icon">➕</span>
            Create New Course
          </button>
          
          <button 
            onClick={() => navigate('/admin/courses')}
            className="action-btn secondary"
          >
            <span className="btn-icon">👁️</span>
            View All Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;