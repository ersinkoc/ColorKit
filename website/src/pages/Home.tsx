import { Link } from 'react-router-dom'
import { CodeBlock } from '../components/CodeBlock'
import './Home.css'

export function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-badge">✨ Zero-Dependency</div>
        <h1 className="hero-title">
          <span className="gradient-text">ColorKit</span>
          <br />
          Color Manipulation Library
        </h1>
        <p className="hero-description">
          A powerful, headless color manipulation library for JavaScript and TypeScript.
          Convert, manipulate, and work with colors effortlessly.
        </p>
        <div className="hero-actions">
          <Link to="/docs" className="btn btn-primary">Get Started →</Link>
          <Link to="/playground" className="btn btn-secondary">Try Playground</Link>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Why ColorKit?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <h3>Zero Dependencies</h3>
            <p>No external dependencies. Tree-shakeable and lightweight.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3>TypeScript First</h3>
            <p>Built with TypeScript from the ground up. Full type safety.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>
            <h3>Tree Shakable</h3>
            <p>Import only what you need. Optimal bundle size.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
            </div>
            <h3>Headless</h3>
            <p>Build your own UI. Full control over the picker interface.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
              </svg>
            </div>
            <h3>Color Formats</h3>
            <p>RGB, HSL, HSV, HWB, CMYK, HEX, and named colors.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
            </div>
            <h3>Manipulation</h3>
            <p>Lighten, darken, saturate, mix, blend, and more.</p>
          </div>
        </div>
      </section>

      <section className="code-preview">
        <h2 className="section-title">Quick Start</h2>
        <CodeBlock
          code={`import { color } from '@oxog/colorkit'

// Create a color
const c = color('#ff0000')

// Convert formats
c.toHex()      // "#ff0000"
c.toHsl()      // { h: 0, s: 100, l: 50, a: 1 }
c.toRgb()      // { r: 255, g: 0, b: 0, a: 1 }

// Manipulate
c.lighten(10)  // Lighten by 10%
c.saturate(20) // Saturate by 20%`}
          language="typescript"
        />
      </section>
    </div>
  )
}
