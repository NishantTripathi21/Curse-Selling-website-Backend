import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, userType, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/')}>
          <h2>CourseHub</h2>
        </div>
        
        <nav className="nav">
          {user ? (
            <div className="nav-authenticated">
              <span className="welcome-text">
                Welcome, {userType === 'admin' ? 'Admin' : 'User'}
              </span>
              {userType === 'admin' ? (
                <div className="nav-links">
                  <button onClick={() => navigate('/admin/dashboard')} className="nav-link">
                    Dashboard
                  </button>
                  <button onClick={() => navigate('/admin/courses')} className="nav-link">
                    Courses
                  </button>
                  <button onClick={() => navigate('/admin/create')} className="nav-link">
                    Create Course
                  </button>
                </div>
              ) : (
                <div className="nav-links">
                  <button onClick={() => navigate('/courses')} className="nav-link">
                    Courses
                  </button>
                  <button onClick={() => navigate('/my-courses')} className="nav-link">
                    My Courses
                  </button>
                </div>
              )}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-links">
              <button onClick={() => navigate('/login')} className="nav-link">
                Login
              </button>
              <button onClick={() => navigate('/signup')} className="signup-btn">
                Sign Up
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;