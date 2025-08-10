import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  House,
  User,
  Trophy,
  Briefcase,
  Note,
  Notebook,
  FolderOpen,
  Tag,
  Desktop,
  Moon,
  Sun,
  GithubLogo,
  File,
} from '@phosphor-icons/react'
import SearchModal from '@/layout/header/_components/SearchModel'

export const ActionContext = createContext(null)

export function SearchContext({ children }) {
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const perform = (path) => () => {
    setIsSearchOpen(false)
    navigate(path)
  }

  const actions = [
    {
      id: 'home',
      name: 'Home',
      section: 'Navigation',
      keywords: 'homepage main start',
      icon: <House size="1em" />,
      perform: perform('/')
    },
    {
      id: 'about',
      name: 'About',
      section: 'Navigation',
      keywords: 'user me bio',
      icon: <User size="1em" />,
      perform: perform('/about')
    },
    {
      id: 'achievement',
      name: 'Achievement',
      section: 'Navigation',
      icon: <Trophy size="1em" />,
      perform: perform('/achievement')
    },
    {
      id: 'blog',
      name: 'Blog',
      section: 'Blog',
      icon: <Note size="1em" />,
      perform: perform('/blog')
    },
    {
      id: 'til',
      name: 'Today I Learned',
      section: 'Blog',
      icon: <Notebook size="1em" />,
      perform: perform('/blog/til')
    },
    {
      id: 'categories',
      name: 'Categories',
      section: 'Blog',
      icon: <FolderOpen size="1em" />,
      perform: perform('/blog/categories')
    },
    {
      id: 'tags',
      name: 'Tags',
      section: 'Blog',
      icon: <Tag size="1em" />,
      perform: perform('/blog/tags')
    },
    {
      id: 'projects',
      name: 'Projects',
      section: 'Projects',
      icon: <Briefcase size="1em" />,
      perform: perform('/projects')
    },
    {
      id: 'system-theme',
      name: 'System Theme',
      parent: 'theme',
      section: 'Configuration',
      icon: <Desktop size="1em" />,
      perform: () => {
        localStorage.removeItem('theme')
        document.documentElement.classList.remove('dark', 'light')
      }
    },
    {
      id: 'dark-theme',
      name: 'Dark Mode',
      parent: 'theme',
      section: 'Configuration',
      icon: <Moon size="1em" />,
      perform: () => {
        localStorage.setItem('theme', 'dark')
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      }
    },
    {
      id: 'light-theme',
      name: 'Light Mode',
      parent: 'theme',
      section: 'Configuration',
      icon: <Sun size="1em" />,
      perform: () => {
        localStorage.setItem('theme', 'light')
        document.documentElement.classList.add('light')
        document.documentElement.classList.remove('dark')
      }
    },
    {
      id: 'repo',
      name: 'Source Code',
      section: 'Website',
      icon: <GithubLogo size="1em" />,
      perform: () => window.open('https://github.com/princepatel4423d/my-portfolio', '_blank')
    },
    {
      id: 'license',
      name: 'License',
      section: 'Website',
      icon: <File size="1em" />,
      perform: () =>
        window.open('https://github.com/princepatel4423d/my-portfolio/blob/main/LICENSE', '_blank')
    },
  ]

  return (
    <ActionContext.Provider value={{ actions, isSearchOpen, setIsSearchOpen }}>
      <SearchModal />
      {children}
    </ActionContext.Provider>
  )
}
