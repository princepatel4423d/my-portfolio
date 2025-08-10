import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import MobileMenu from './MobileMenu';
import { ToastContext } from '@/context/ToastContext';

const Header = () => {
  const navigate = useNavigate();
  const {
    adminProfile,
    backendUrl,
    setAdminProfile,
    setIsLoggedin,
  } = useContext(AppContext);

  const { addToast } = useContext(ToastContext);

  const logout = async () => {
    try {
      const token = localStorage.getItem('adminToken');

      if (token) {
        await axios.post(
          `${backendUrl}/api/admin/logout`,
          {}, // no data needed
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Remove token from localStorage on logout
      localStorage.removeItem('adminToken');

      // Update app state
      setIsLoggedin(false);
      setAdminProfile(null);

      addToast('Logged out successfully', 'success');
      navigate('/'); // Redirect to home or login page
    } catch (error) {
      addToast(
        error.response?.data?.message || error.message || 'Logout failed',
        'error'
      );
    }
  };

  const goToResetPassword = () => {
    navigate('/reset-password');
  };

  return (
    <header className="p-4 flex justify-between items-center">
      {adminProfile ? (
        <div className="relative group">
          {/* Profile Avatar with ring */}
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 text-white cursor-pointer border-2 border-white shadow-lg group-hover:ring-4 group-hover:ring-blue-300 transition-all duration-200">
            <span className="text-lg font-bold">{adminProfile.name[0].toUpperCase()}</span>
          </div>
          {/* Profile Card */}
          <div className="absolute hidden group-hover:flex flex-col items-center top-12 left-0 z-20 min-w-[18rem] bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-2xl border border-blue-100 p-0 animate-fade-in">
            <div className="flex flex-col items-center w-full p-5 pb-3 border-b border-blue-100">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 text-white text-2xl font-bold shadow-md mb-2 border-4 border-white">
                {adminProfile.name[0].toUpperCase()}
              </div>
              <p className="font-semibold text-base text-gray-800">{adminProfile.name}</p>
              <p className="text-xs text-gray-600 mt-1">{adminProfile.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                Joined: {new Date(adminProfile.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="w-full flex flex-col items-center p-4 space-y-3">
              <button
                type="button"
                onClick={goToResetPassword}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-2 rounded-lg shadow transition-all duration-150"
              >
                Reset Password
              </button>
              <button
                type="button"
                onClick={logout}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-2 rounded-lg shadow transition-all duration-150"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-4xl text-white"
        >
          Login
        </button>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        <Link to="/">Dashboard</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/experiences">Experience</Link>
        <Link to="/academics">Academics</Link>
        <Link to="/projects">Projects</Link>
      </nav>

      {/* Mobile Navigation */}
      <MobileMenu />
    </header>
  );
};

export default Header;