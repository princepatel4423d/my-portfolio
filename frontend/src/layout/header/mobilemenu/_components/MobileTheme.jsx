import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Desktop, Moon, Sun } from '@phosphor-icons/react';

export function MobileTheme() {
  const { setTheme, theme: currTheme } = useTheme();

  return (
    <div className="flex flex-1 items-end justify-center pt-5">
      <div className="flex overflow-hidden rounded-xl bg-neutral-200/50 text-2xl dark:bg-neutral-1000/50">
        <button
          onClick={() => setTheme('light')}
          data-theme-light={currTheme === 'light'}
          className={`p-4 ${
            currTheme === 'light' ? 'bg-neutral-300' : ''
          }`}
          title="Light Theme"
        >
          <Sun
            size={20}
            weight={currTheme === 'light' ? 'duotone' : 'regular'}
          />
        </button>
        <button
          onClick={() => setTheme('system')}
          data-theme-system={currTheme === 'system'}
          className={`p-4 ${
            currTheme === 'system'
              ? 'bg-neutral-300 dark:bg-neutral-800'
              : ''
          }`}
          title="System Theme"
        >
          <Desktop
            size={20}
            weight={currTheme === 'system' ? 'duotone' : 'regular'}
          />
        </button>
        <button
          onClick={() => setTheme('dark')}
          data-theme-dark={currTheme === 'dark'}
          className={`p-4 ${
            currTheme === 'dark' ? 'bg-neutral-800 text-white' : ''
          }`}
          title="Dark Theme"
        >
          <Moon
            size={20}
            weight={currTheme === 'dark' ? 'duotone' : 'regular'}
          />
        </button>
      </div>
    </div>
  );
}