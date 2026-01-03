import { useEffect, useRef, useState, useCallback } from 'react'
import { highlight } from '@oxog/codeshine'
import { useTheme } from '../contexts/ThemeContext'
import './CodeBlock.css'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
}

const DARK_THEMES = [
  { value: 'github-dark', label: 'GitHub Dark' },
  { value: 'dracula', label: 'Dracula' },
  { value: 'vscode-dark', label: 'VSCode Dark' },
  { value: 'monokai', label: 'Monokai' },
  { value: 'nord', label: 'Nord' },
  { value: 'one-dark', label: 'One Dark' },
  { value: 'tokyo-night', label: 'Tokyo Night' },
  { value: 'catppuccin', label: 'Catppuccin' },
]

const LIGHT_THEMES = [
  { value: 'github-light', label: 'GitHub Light' },
  { value: 'vscode-light', label: 'VSCode Light' },
  { value: 'one-light', label: 'One Light' },
  { value: 'solarized-light', label: 'Solarized Light' },
  { value: 'ayu-light', label: 'Ayu Light' },
]

export function CodeBlock({ code, language = 'typescript', showLineNumbers = true }: CodeBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState(theme === 'dark' ? 'github-dark' : 'github-light')
  const [copied, setCopied] = useState(false)

  const themes = theme === 'dark' ? DARK_THEMES : LIGHT_THEMES

  useEffect(() => {
    setSelectedTheme(theme === 'dark' ? 'github-dark' : 'github-light')
  }, [theme])

  // Highlight code using codeshine library - safe as it processes code syntax, not user HTML
  const updateHighlight = useCallback(() => {
    if (!containerRef.current) return
    const highlightedHtml = highlight(code, {
      language,
      theme: selectedTheme,
      lineNumbers: showLineNumbers,
    })
    // Safe: codeshine generates syntax-highlighted code, not arbitrary HTML
    containerRef.current.innerHTML = highlightedHtml
  }, [code, language, selectedTheme, showLineNumbers])

  useEffect(() => {
    updateHighlight()
  }, [updateHighlight])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <div className="header-left">
          <div className="mac-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <span className="code-language">{language}</span>
        </div>
        <div className="header-right">
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="theme-selector"
          >
            {themes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <button
            className={`copy-button ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            aria-label={copied ? 'Copied!' : 'Copy code'}
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div ref={containerRef} className="code-block-content" />
    </div>
  )
}
