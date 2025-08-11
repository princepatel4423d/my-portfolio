import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import axios from 'axios';
import MobileMenu from './MobileMenu';
import { ToastContext } from '@/context/ToastContext';
import { FiLogOut, FiKey } from 'react-icons/fi';

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
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      localStorage.removeItem('adminToken');
      setIsLoggedin(false);
      setAdminProfile(null);
      addToast('Logged out successfully', 'success');
      navigate('/login');
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
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 text-white border-2 border-white shadow-lg">
            <span className="text-lg font-bold">
              {adminProfile.name[0].toUpperCase()}
            </span>
          </div>
          {/* Name */}
          <p className="font-semibold text-base text-gray-800">
            {adminProfile.name}
          </p>

          {/* Buttons - only desktop & tablet */}
          <div className="hidden md:flex gap-3 ml-6">
            <button
              type="button"
              onClick={goToResetPassword}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 hover:bg-green-600 text-white font-medium shadow-md transition-all duration-200"
            >
              <FiKey className="text-lg" />
              Reset
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium shadow-md transition-all duration-200"
            >
              <FiLogOut className="text-lg" />
              Logout
            </button>
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