import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminAPI, userAPI } from '../../services/api';

const AuthForm = ({ type, userType }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
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

    try {
      let response;
      
      if (userType === 'admin') {
        response = type === 'login' 
          ? await adminAPI.signin(formData)
          : await adminAPI.signup(formData);
      } else {
        response = type === 'login'
          ? await userAPI.signin(formData)
          : await userAPI.signup(formData);
      }

      if (type === 'login') {
        login(response.data.token, userType);
        navigate(userType === 'admin' ? '/admin/dashboard' : '/courses');
      } else {
        setError('Account created successfully! Please login.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {type === 'login' ? 'Sign In' : 'Sign Up'} as {userType === 'admin' ? 'Admin' : 'User'}
        </h2>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? 'Loading...' : (type === 'login' ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        
        <div className="auth-links">
          {type === 'login' ? (
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
          ) : (
            <p>Already have an account? <a href="/login">Sign in</a></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;