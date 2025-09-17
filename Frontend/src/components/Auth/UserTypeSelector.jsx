import { useNavigate } from 'react-router-dom';

const UserTypeSelector = ({ type }) => {
  const navigate = useNavigate();

  return (
    <div className="user-type-container">
      <div className="user-type-card">
        <h2 className="user-type-title">
          Choose {type === 'login' ? 'Login' : 'Sign Up'} Type
        </h2>
        
        <div className="user-type-options">
          <div 
            className="user-type-option"
            onClick={() => navigate(`/${type}?type=admin`)}
          >
            <div className="option-icon">👨‍💼</div>
            <h3>Admin</h3>
            <p>Manage and create courses</p>
          </div>
          
          <div 
            className="user-type-option"
            onClick={() => navigate(`/${type}?type=user`)}
          >
            <div className="option-icon">👨‍🎓</div>
            <h3>Student</h3>
            <p>Browse and purchase courses</p>
          </div>
        </div>
        
        <div className="back-link">
          <a href="/">← Back to Home</a>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelector;