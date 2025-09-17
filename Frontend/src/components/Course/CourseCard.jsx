const CourseCard = ({ course, onPurchase, isPurchased, isAdmin, onEdit }) => {
  return (
    <div className="course-card">
      <div className="course-image">
        <img src={course.imageLink} alt={course.title} />
      </div>
      
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-description">{course.description}</p>
        
        <div className="course-footer">
          <div className="course-price">${course.price}</div>
          
          {!isAdmin && (
            <div className="course-actions">
              {isPurchased ? (
                <span className="purchased-badge">Purchased</span>
              ) : (
                <button 
                  onClick={() => onPurchase(course.id || course._id)}
                  className="purchase-btn"
                >
                  Purchase
                </button>
              )}
            </div>
          )}
          
          {isAdmin && (
            <div className="admin-actions">
              <span className={`status-badge ${course.published ? 'published' : 'draft'}`}>
                {course.published ? 'Published' : 'Draft'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;