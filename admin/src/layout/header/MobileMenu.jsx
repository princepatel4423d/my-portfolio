import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Experience', path: '/experiences' },
    { name: 'Academics', path: '/academics' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <div className="md:hidden">
      {/* Only show open icon if menu is closed */}
      {!isOpen && (
        <button onClick={toggleMenu} className="p-2 z-50 relative">
          <List size={28} />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-gray-400 text-white z-50 flex flex-col items-center justify-center">
          {/* Close button inside full screen menu */}
          <button onClick={toggleMenu} className="absolute top-8 right-8">
            <X size={32} />
          </button>

          <ul className="flex flex-col gap-6 text-xl text-center">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={toggleMenu}
                  className={`px-4 py-2 ${
                    pathname === link.path ? 'text-yellow-400 font-bold' : ''
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;