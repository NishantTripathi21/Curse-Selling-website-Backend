import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import HomePage from './components/Home/HomePage';
import AuthForm from './components/Auth/AuthForm';
import UserTypeSelector from './components/Auth/UserTypeSelector';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminCourses from './components/Admin/AdminCourses';
import CreateCourse from './components/Admin/CreateCourse';
import CourseList from './components/User/CourseList';
import PurchasedCourses from './components/User/PurchasedCourses';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type');
  
  if (!userType) {
    return <UserTypeSelector type="login" />;
  }
  
  return <AuthForm type="login" userType={userType} />;
};

const SignupPage = () => {
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type');
  
  if (!userType) {
    return <UserTypeSelector type="signup" />;
  }
  
  return <AuthForm type="signup" userType={userType} />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/courses" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminCourses />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/create" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <CreateCourse />
                  </ProtectedRoute>
                } 
              />
              
              {/* User Routes */}
              <Route 
                path="/courses" 
                element={
                  <ProtectedRoute>
                    <CourseList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/my-courses" 
                element={
                  <ProtectedRoute>
                    <PurchasedCourses />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;