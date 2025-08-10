import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActionContext } from '@/context/SearchContext';

const SearchModal = () => {
  const { actions, isSearchOpen, setIsSearchOpen } = useContext(ActionContext);
  const [query, setQuery] = useState('');
  const modalRef = useRef(null);
  const [visible, setVisible] = useState(false); // for transition

  useEffect(() => {
    if (isSearchOpen) {
      setVisible(true);
    } else {
      // small delay before unmount effect
      const timer = setTimeout(() => setVisible(false), 150);
      return () => clearTimeout(timer);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsSearchOpen]);

  const filtered = actions.filter(
    (a) =>
      a.name.toLowerCase().includes(query.toLowerCase()) ||
      (a.keywords && a.keywords.toLowerCase().includes(query.toLowerCase()))
  );

  const grouped = filtered.reduce((acc, action) => {
    const section = action.section || 'Other';
    if (!acc[section]) acc[section] = [];
    acc[section].push(action);
    return acc;
  }, {});

  if (!isSearchOpen && !visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center 
        bg-black/20 dark:bg-black/30 pt-20 
        transition-opacity duration-200 ease-out
        ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        ref={modalRef}
        className={`w-[95vw] md:w-[45vw] rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-lg space-y-4 
          transform transition-all duration-200 ease-out
          ${isSearchOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <input
          autoFocus
          placeholder="Type to search..."
          className="w-full text-xl md:text-2xl bg-transparent border-b border-neutral-500/20 outline-none placeholder:text-neutral-500/50 pb-4"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="max-h-[400px] overflow-y-auto space-y-4">
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section}>
              <div className="px-2 text-xs uppercase">{section}</div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center gap-3 p-2 rounded-xl cursor-pointer transition hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  onClick={() => item.perform?.()}
                >
                  <div className="flex gap-3 items-center">
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;