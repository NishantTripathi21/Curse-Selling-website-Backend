import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, userType } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      if (userType === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/courses');
      }
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn Without Limits
          </h1>
          <p className="hero-subtitle">
            Discover thousands of courses from expert instructors and advance your skills at your own pace.
          </p>
          <div className="hero-actions">
            <button onClick={handleGetStarted} className="cta-primary">
              Get Started
            </button>
            <button onClick={() => navigate('/courses')} className="cta-secondary">
              Browse Courses
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Online learning"
          />
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title">Why Choose CourseHub?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with years of experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⏰</div>
              <h3>Learn at Your Pace</h3>
              <p>Access courses anytime, anywhere, and learn at your own speed</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Practical Skills</h3>
              <p>Gain hands-on experience with real-world projects and assignments</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Certificates</h3>
              <p>Earn certificates upon completion to showcase your achievements</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of learners advancing their careers with CourseHub</p>
          <button onClick={handleGetStarted} className="cta-button">
            Start Learning Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;