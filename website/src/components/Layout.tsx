import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import './Layout.css'

export function Layout() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="layout">
      <div className="color-orb color-orb-1" />
      <div className="color-orb color-orb-2" />
      <div className="color-orb color-orb-3" />
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="8" cy="8" r="6" fill="#ef4444" />
              <circle cx="24" cy="8" r="6" fill="#22c55e" />
              <circle cx="8" cy="24" r="6" fill="#3b82f6" />
              <circle cx="24" cy="24" r="6" fill="#eab308" />
            </svg>
            <span>ColorKit</span>
          </Link>

          <nav className="nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/api" className={`nav-link ${isActive('/api') ? 'active' : ''}`}>API</Link>
            <Link to="/docs" className={`nav-link ${isActive('/docs') ? 'active' : ''}`}>Docs</Link>
            <Link to="/examples" className={`nav-link ${isActive('/examples') ? 'active' : ''}`}>Examples</Link>
            <Link to="/playground" className={`nav-link ${isActive('/playground') ? 'active' : ''}`}>Playground</Link>
          </nav>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2025 ColorKit. MIT License.</p>
          <p>Built with Vite + React + TypeScript</p>
        </div>
      </footer>
    </div>
  )
}
