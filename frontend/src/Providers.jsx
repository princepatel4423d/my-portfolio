import React from 'react'
import { ThemeContext } from './context/ThemeContext'
import { SearchContext } from './context/SearchContext'
import { AppContextProvider } from './context/AppContext'

export function Providers({ children }) {
  return (
    <ThemeContext defaultTheme="dark" storageKey="vite-ui-theme">
      <AppContextProvider>
        <SearchContext>{children}</SearchContext>
      </AppContextProvider>
    </ThemeContext>
  )
}