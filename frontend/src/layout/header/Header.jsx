import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { DesktopTheme } from './_components/DesktopTheme';
import Search from '@/components/common/Search';
import { MobileMenu } from './mobilemenu/MobileMenu';
import { assets } from '@/assets/assets';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'More' }
];

const moreDropdown = [
  { title: 'Contact', desc: 'Get in touch with me', path: '/contact', image: assets.contactImage },
  { title: 'Bucket List', desc: 'Things to do at least once in my life', path: '/bucketlist', image: assets.bucketlistImage }
];

const moreLinks = [
  { title: 'Links', desc: 'All my links are here', path: '/links' },
  { title: 'Uses', desc: 'A peek into my digital...', path: '/uses' },
  { title: 'Attribution', desc: 'Journey to create this site', path: '/attribution' }
];

const Header = () => {
  const location = useLocation();
  const morePaths = [...moreDropdown, ...moreLinks].map(link => link.path);
  const isMoreActive = morePaths.includes(location.pathname);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-zinc-900 shadow-sm rounded-xl">
      <div className="flex items-center justify-between h-14 px-2">
        <div className="text-lg font-bold tracking-tight pl-3 rounded-full transition">
          PRINCE PATEL
        </div>

        <nav className="hidden md:flex space-x-1 relative">
          {navLinks.map((link) =>
            link.name === 'More' ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className={`relative px-3 py-2 text-sm font-medium transition-all ${
                    isMoreActive
                      ? 'text-white dark:text-black bg-neutral-800 dark:bg-neutral-200 rounded-xl'
                      : 'hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 hover:rounded-xl'
                  }`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {link.name}
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute left-1/2 -translate-x-1/2 mt-1 
                      bg-neutral-900 text-white 
                      dark:bg-neutral-100 dark:text-black
                      border border-neutral-700 dark:border-neutral-300
                      rounded-xl shadow-xl p-2 gap-2 z-50"
                    style={{ minWidth: 520 }}
                  >
                    <div className="flex flex-row gap-4">
                      <div className="flex gap-3">
                        {moreDropdown.map((card) => (
                          <NavLink
                            key={card.path}
                            to={card.path}
                            onClick={closeDropdown}
                            className="w-40 bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black 
                              rounded-xl shadow-lg overflow-hidden transition hover:scale-[1.03]"
                          >
                            <img
                              src={card.image}
                              alt={card.title}
                              className="w-full h-28 object-cover rounded-t-xl"
                            />
                            <div className="p-3">
                              <div className="font-bold text-lg">{card.title}</div>
                              <div className="text-xs opacity-80">{card.desc}</div>
                            </div>
                          </NavLink>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2 justify-center">
                        {moreLinks.map((item) => (
                          <NavLink
                            key={`${item.path}-${item.title}`}
                            to={item.path}
                            onClick={closeDropdown}
                            className="bg-neutral-800 dark:bg-neutral-200 
                              text-white dark:text-black 
                              rounded-xl px-3 py-2 flex flex-col 
                              hover:bg-neutral-700 dark:hover:bg-neutral-300 
                              transition min-w-[155px]"
                          >
                            <span className="font-medium">{item.title}</span>
                            <span className="text-xs opacity-75">{item.desc}</span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'text-white dark:text-black bg-neutral-800 dark:bg-neutral-200 rounded-xl'
                      : 'hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-zinc-800 hover:rounded-xl'
                  }`
                }
              >
                {link.name}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-1">
          <Search />
          <DesktopTheme />
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;