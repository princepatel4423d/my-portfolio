import { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
import { FiLogOut, FiKey } from 'react-icons/fi';
import { AppContext } from '@/context/AppContext';
import { ToastContext } from '@/context/ToastContext';
import axios from 'axios';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { adminProfile, backendUrl, setAdminProfile, setIsLoggedin } =
    useContext(AppContext);
  const { addToast } = useContext(ToastContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  const logout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        await axios.post(
          `${backendUrl}/api/admin/logout`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
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

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Experience', path: '/experiences' },
    { name: 'Academics', path: '/academics' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <div className="md:hidden">
      {!isOpen && (
        <button onClick={toggleMenu} className="p-2 z-50 relative">
          <List size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 text-white z-50 flex flex-col items-center justify-center px-6">
          {/* Close Button */}
          <button onClick={toggleMenu} className="absolute top-8 right-8">
            <X size={32} />
          </button>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-6 text-xl text-center mb-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={toggleMenu}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    pathname === link.path
                      ? 'bg-yellow-400 text-gray-900 font-bold'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Buttons for admin only */}
          {adminProfile && (
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <button
                onClick={() => {
                  toggleMenu();
                  goToResetPassword();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 rounded-lg shadow-lg text-lg font-medium"
              >
                <FiKey className="text-xl" />
                Reset Password
              </button>
              <button
                onClick={() => {
                  toggleMenu();
                  logout();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-lg shadow-lg text-lg font-medium"
              >
                <FiLogOut className="text-xl" />
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;