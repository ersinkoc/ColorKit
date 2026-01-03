import { useEffect, useRef, useState } from 'react'
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

  const themes = theme === 'dark' ? DARK_THEMES : LIGHT_THEMES

  useEffect(() => {
    // Auto-switch theme when site theme changes
    setSelectedTheme(theme === 'dark' ? 'github-dark' : 'github-light')
  }, [theme])

  useEffect(() => {
    if (!containerRef.current) return

    const html = highlight(code, {
      language,
      theme: selectedTheme,
      lineNumbers: showLineNumbers,
    })

    containerRef.current.innerHTML = html
  }, [code, language, showLineNumbers, selectedTheme])

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-language">{language}</span>
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
      </div>
      <div ref={containerRef} className="code-block" />
    </div>
  )
}
