import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CodeBlock } from '../components/CodeBlock'
import { color, getComplementary, getTriadic, generateTints } from '@oxog/colorkit'
import './Home.css'

const DEMO_COLORS = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#a29bfe', '#fd79a8']

export function Home() {
  const [activeColor, setActiveColor] = useState('#ff6b6b')
  const [copied, setCopied] = useState(false)

  const c = color(activeColor)
  const complementary = getComplementary(activeColor)
  const triadic = getTriadic(activeColor)
  const tints = generateTints(activeColor, 5)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="home">
      {/* Animated Background */}
      <div className="hero-bg">
        <div className="hero-gradient" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          <span className="badge-dot" />
          v1.0 - Zero Dependencies
        </div>
        <h1 className="hero-title">
          <span className="gradient-text">ColorKit</span>
        </h1>
        <p className="hero-tagline">Professional Color Manipulation for JavaScript</p>
        <p className="hero-description">
          Convert, manipulate, and generate beautiful color palettes.
          Tree-shakeable, TypeScript-first, and incredibly fast.
        </p>
        <div className="hero-actions">
          <Link to="/docs" className="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            Get Started
          </Link>
          <Link to="/playground" className="btn btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Playground
          </Link>
          <a href="https://github.com/oxog/colorkit" className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <span className="stat-value">&lt;4KB</span>
          <span className="stat-label">Core Bundle</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-value">7+</span>
          <span className="stat-label">Color Formats</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-value">50+</span>
          <span className="stat-label">Functions</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <span className="stat-value">100%</span>
          <span className="stat-label">TypeScript</span>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="live-demo">
        <h2 className="section-title">See It In Action</h2>
        <p className="section-subtitle">Click a color to see real-time transformations</p>

        <div className="demo-container">
          <div className="demo-picker">
            <div className="color-palette">
              {DEMO_COLORS.map((clr) => (
                <button
                  key={clr}
                  className={`palette-color ${activeColor === clr ? 'active' : ''}`}
                  style={{ backgroundColor: clr }}
                  onClick={() => setActiveColor(clr)}
                  aria-label={`Select color ${clr}`}
                />
              ))}
            </div>
            <div className="color-input-group">
              <input
                type="text"
                value={activeColor}
                onChange={(e) => {
                  try {
                    color(e.target.value)
                    setActiveColor(e.target.value)
                  } catch {}
                }}
                className="color-input"
              />
              <div className="color-preview" style={{ backgroundColor: activeColor }} />
            </div>
          </div>

          <div className="demo-results">
            <div className="demo-card">
              <h4>Conversions</h4>
              <div className="conversion-list">
                <div className="conversion-item" onClick={() => copyToClipboard(c.toHex())}>
                  <span className="format-label">HEX</span>
                  <code>{c.toHex()}</code>
                </div>
                <div className="conversion-item" onClick={() => copyToClipboard(c.toRgbString())}>
                  <span className="format-label">RGB</span>
                  <code>{c.toRgbString()}</code>
                </div>
                <div className="conversion-item" onClick={() => copyToClipboard(c.toHslString())}>
                  <span className="format-label">HSL</span>
                  <code>{c.toHslString()}</code>
                </div>
              </div>
            </div>

            <div className="demo-card">
              <h4>Harmony</h4>
              <div className="harmony-colors">
                <div className="harmony-row">
                  <span>Complementary</span>
                  <div className="harmony-swatches">
                    {complementary.map((clr, i) => (
                      <div
                        key={i}
                        className="harmony-swatch"
                        style={{ backgroundColor: clr.toHex() }}
                        title={clr.toHex()}
                      />
                    ))}
                  </div>
                </div>
                <div className="harmony-row">
                  <span>Triadic</span>
                  <div className="harmony-swatches">
                    {triadic.map((clr, i) => (
                      <div
                        key={i}
                        className="harmony-swatch"
                        style={{ backgroundColor: clr.toHex() }}
                        title={clr.toHex()}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="demo-card">
              <h4>Tints</h4>
              <div className="tints-preview">
                {tints.map((clr, i) => (
                  <div
                    key={i}
                    className="tint-swatch"
                    style={{ backgroundColor: clr.toHex() }}
                    title={clr.toHex()}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {copied && <div className="copy-toast">Copied to clipboard!</div>}
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why ColorKit?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon feature-icon-1">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3>Zero Dependencies</h3>
            <p>Pure JavaScript with no external dependencies. Works everywhere JavaScript runs.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon feature-icon-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <h3>TypeScript First</h3>
            <p>Built with TypeScript. Full type definitions for excellent DX and autocomplete.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon feature-icon-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h3>Tree Shakeable</h3>
            <p>Import only what you need. ESM modules for optimal bundle size.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon feature-icon-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="13.5" cy="6.5" r="2.5"/>
                <circle cx="17.5" cy="10.5" r="2.5"/>
                <circle cx="8.5" cy="7.5" r="2.5"/>
                <circle cx="6.5" cy="12.5" r="2.5"/>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
              </svg>
            </div>
            <h3>7+ Color Formats</h3>
            <p>HEX, RGB, HSL, HSV, HWB, CMYK, and 140+ named colors supported.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon feature-icon-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
              </svg>
            </div>
            <h3>Color Manipulation</h3>
            <p>Lighten, darken, saturate, desaturate, mix, blend, invert and more.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon feature-icon-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <h3>WCAG Accessibility</h3>
            <p>Built-in contrast checking and readable color suggestions for accessibility.</p>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="installation">
        <h2 className="section-title">Quick Install</h2>
        <div className="install-tabs">
          <CodeBlock
            code="npm install @oxog/colorkit"
            language="bash"
          />
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="code-preview">
        <h2 className="section-title">Simple & Intuitive API</h2>
        <p className="section-subtitle">Get started in seconds with our fluent API</p>
        <div className="code-examples">
          <CodeBlock
            code={`import { color, mix, getTriadic, generatePalette } from '@oxog/colorkit'

// Create colors from any format
const red = color('#ff0000')
const blue = color('rgb(0, 0, 255)')
const green = color({ h: 120, s: 100, l: 50 })

// Convert between formats
red.toHsl()        // { h: 0, s: 100, l: 50, a: 1 }
red.toRgbString()  // "rgb(255, 0, 0)"

// Manipulate colors
red.lighten(20)    // Lighten by 20%
red.saturate(10)   // Increase saturation
red.spin(180)      // Rotate hue by 180°

// Mix and blend
mix(red, blue, 0.5)  // Perfect purple

// Generate harmonies
getTriadic('#ff6b6b')  // [original, +120°, +240°]

// Create palettes
generatePalette('#ff6b6b')  // Full tints, shades, tones`}
            language="typescript"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Ready to add color to your project?</h2>
          <p>Join developers building beautiful, accessible color experiences.</p>
          <div className="cta-actions">
            <Link to="/docs" className="btn btn-primary btn-large">
              Read the Docs
            </Link>
            <Link to="/examples" className="btn btn-secondary btn-large">
              View Examples
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
