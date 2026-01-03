import { useState, useCallback } from 'react'
import {
  color as createColor,
  rgb as createRgb,
  hsl as createHsl,
  getComplementary,
  getTriadic,
  getTetradic,
  getAnalogous,
  getSplitComplementary,
  generateTints,
  generateShades,
  getContrast,
  isReadable,
  randomColor
} from '@oxog/colorkit'
import { CodeBlock } from '../components/CodeBlock'
import './Playground.css'

type TabType = 'sliders' | 'harmonies' | 'contrast' | 'export'

export function Playground() {
  const [color, setColor] = useState(createColor('#3b82f6'))
  const [input, setInput] = useState('#3b82f6')
  const [activeTab, setActiveTab] = useState<TabType>('sliders')
  const [copied, setCopied] = useState<string | null>(null)
  const [contrastBg, setContrastBg] = useState('#ffffff')

  const updateColor = useCallback((value: string) => {
    setInput(value)
    try {
      const c = createColor(value)
      setColor(c)
    } catch {
      // Invalid color, don't update
    }
  }, [])

  const handleRandomColor = () => {
    const c = randomColor()
    setColor(c)
    setInput(c.toHex())
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const hex = color.toHex()
  const rgb = color.toRgb()
  const hsl = color.toHsl()
  const hsv = color.toHsv()
  const hwb = color.toHwb()
  const cmyk = color.toCmyk()

  const complementary = getComplementary(hex)
  const triadic = getTriadic(hex)
  const tetradic = getTetradic(hex)
  const analogous = getAnalogous(hex)
  const splitComp = getSplitComplementary(hex)
  const tints = generateTints(hex, 5)
  const shades = generateShades(hex, 5)

  const contrastRatio = getContrast(hex, contrastBg)
  const readable = isReadable(hex, contrastBg)

  return (
    <div className="playground-page">
      <div className="playground-header">
        <div>
          <h1><span className="gradient-text">Color Playground</span></h1>
          <p className="playground-intro">
            Experiment with colors in real-time. Pick, convert, and explore color harmonies.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleRandomColor}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
            <polyline points="7.5 19.79 7.5 14.6 3 12"/>
            <polyline points="21 12 16.5 14.6 16.5 19.79"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          Random Color
        </button>
      </div>

      <div className="playground-main">
        {/* Color Preview */}
        <div className="color-display">
          <div
            className="color-preview-large"
            style={{ background: hex }}
          >
            <span className="color-value">{hex}</span>
          </div>

          <div className="color-input-section">
            <input
              type="color"
              value={hex}
              onChange={(e) => updateColor(e.target.value)}
              className="color-picker-native"
            />
            <input
              type="text"
              value={input}
              onChange={(e) => updateColor(e.target.value)}
              placeholder="#3b82f6 or rgb(59,130,246) or blue"
              className="color-text-input"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="playground-tabs">
          <button
            className={`tab-btn ${activeTab === 'sliders' ? 'active' : ''}`}
            onClick={() => setActiveTab('sliders')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="21" x2="4" y2="14"/>
              <line x1="4" y1="10" x2="4" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12" y2="3"/>
              <line x1="20" y1="21" x2="20" y2="16"/>
              <line x1="20" y1="12" x2="20" y2="3"/>
              <line x1="1" y1="14" x2="7" y2="14"/>
              <line x1="9" y1="8" x2="15" y2="8"/>
              <line x1="17" y1="16" x2="23" y2="16"/>
            </svg>
            Sliders
          </button>
          <button
            className={`tab-btn ${activeTab === 'harmonies' ? 'active' : ''}`}
            onClick={() => setActiveTab('harmonies')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="6"/>
              <circle cx="12" cy="12" r="2"/>
            </svg>
            Harmonies
          </button>
          <button
            className={`tab-btn ${activeTab === 'contrast' ? 'active' : ''}`}
            onClick={() => setActiveTab('contrast')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 2a10 10 0 0 1 0 20z"/>
            </svg>
            Contrast
          </button>
          <button
            className={`tab-btn ${activeTab === 'export' ? 'active' : ''}`}
            onClick={() => setActiveTab('export')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
            Code
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Sliders Tab */}
          {activeTab === 'sliders' && (
            <div className="sliders-panel">
              <div className="slider-section">
                <h3>RGB</h3>
                <div className="slider-group">
                  <div className="slider-row">
                    <label>R</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={rgb.r}
                      className="slider slider-red"
                      onChange={(e) => {
                        const c = createRgb(Number(e.target.value), rgb.g, rgb.b, rgb.a)
                        setColor(c)
                        setInput(c.toHex())
                      }}
                    />
                    <span className="slider-value">{rgb.r}</span>
                  </div>
                  <div className="slider-row">
                    <label>G</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={rgb.g}
                      className="slider slider-green"
                      onChange={(e) => {
                        const c = createRgb(rgb.r, Number(e.target.value), rgb.b, rgb.a)
                        setColor(c)
                        setInput(c.toHex())
                      }}
                    />
                    <span className="slider-value">{rgb.g}</span>
                  </div>
                  <div className="slider-row">
                    <label>B</label>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={rgb.b}
                      className="slider slider-blue"
                      onChange={(e) => {
                        const c = createRgb(rgb.r, rgb.g, Number(e.target.value), rgb.a)
                        setColor(c)
                        setInput(c.toHex())
                      }}
                    />
                    <span className="slider-value">{rgb.b}</span>
                  </div>
                </div>
              </div>

              <div className="slider-section">
                <h3>HSL</h3>
                <div className="slider-group">
                  <div className="slider-row">
                    <label>H</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={hsl.h}
                      className="slider slider-hue"
                      onChange={(e) => {
                        const c = createHsl(Number(e.target.value), hsl.s, hsl.l, hsl.a)
                        setColor(c)
                        setInput(c.toHex())
                      }}
                    />
                    <span className="slider-value">{hsl.h}°</span>
                  </div>
                  <div className="slider-row">
                    <label>S</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={hsl.s}
                      className="slider slider-saturation"
                      onChange={(e) => {
                        const c = createHsl(hsl.h, Number(e.target.value), hsl.l, hsl.a)
                        setColor(c)
                        setInput(c.toHex())
                      }}
                    />
                    <span className="slider-value">{hsl.s}%</span>
                  </div>
                  <div className="slider-row">
                    <label>L</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={hsl.l}
                      className="slider slider-lightness"
                      onChange={(e) => {
                        const c = createHsl(hsl.h, hsl.s, Number(e.target.value), hsl.a)
                        setColor(c)
                        setInput(c.toHex())
                      }}
                    />
                    <span className="slider-value">{hsl.l}%</span>
                  </div>
                </div>
              </div>

              <div className="slider-section">
                <h3>Alpha</h3>
                <div className="slider-group">
                  <div className="slider-row">
                    <label>A</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={rgb.a}
                      className="slider slider-alpha"
                      onChange={(e) => {
                        const c = color.setAlpha(Number(e.target.value))
                        setColor(c)
                      }}
                    />
                    <span className="slider-value">{(rgb.a * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Harmonies Tab */}
          {activeTab === 'harmonies' && (
            <div className="harmonies-panel">
              <div className="tints-shades-section">
                <div className="palette-row">
                  <h4>Tints</h4>
                  <div className="palette-strip">
                    {tints.map((c, i) => (
                      <div
                        key={i}
                        className="palette-swatch"
                        style={{ backgroundColor: c.toHex() }}
                        title={c.toHex()}
                        onClick={() => updateColor(c.toHex())}
                      />
                    ))}
                  </div>
                </div>
                <div className="palette-row">
                  <h4>Shades</h4>
                  <div className="palette-strip">
                    {shades.map((c, i) => (
                      <div
                        key={i}
                        className="palette-swatch"
                        style={{ backgroundColor: c.toHex() }}
                        title={c.toHex()}
                        onClick={() => updateColor(c.toHex())}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="harmony-grid">
                <div className="harmony-card">
                  <h4>Complementary</h4>
                  <div className="harmony-swatches">
                    {complementary.map((c, i) => (
                      <div
                        key={i}
                        className="harmony-swatch"
                        style={{ backgroundColor: c.toHex() }}
                        title={c.toHex()}
                        onClick={() => updateColor(c.toHex())}
                      />
                    ))}
                  </div>
                </div>

                <div className="harmony-card">
                  <h4>Triadic</h4>
                  <div className="harmony-swatches">
                    {triadic.map((c, i) => (
                      <div
                        key={i}
                        className="harmony-swatch"
                        style={{ backgroundColor: c.toHex() }}
                        title={c.toHex()}
                        onClick={() => updateColor(c.toHex())}
                      />
                    ))}
                  </div>
                </div>

                <div className="harmony-card">
                  <h4>Tetradic</h4>
                  <div className="harmony-swatches">
                    {tetradic.map((c, i) => (
                      <div
                        key={i}
                        className="harmony-swatch"
                        style={{ backgroundColor: c.toHex() }}
                        title={c.toHex()}
                        onClick={() => updateColor(c.toHex())}
                      />
                    ))}
                  </div>
                </div>

                <div className="harmony-card">
                  <h4>Analogous</h4>
                  <div className="harmony-swatches">
                    {analogous.map((c, i) => (
                      <div
                        key={i}
                        className="harmony-swatch"
                        style={{ backgroundColor: c.toHex() }}
                        title={c.toHex()}
                        onClick={() => updateColor(c.toHex())}
                      />
                    ))}
                  </div>
                </div>

                <div className="harmony-card">
                  <h4>Split Complementary</h4>
                  <div className="harmony-swatches">
                    {splitComp.map((c, i) => (
                      <div
                        key={i}
                        className="harmony-swatch"
                        style={{ backgroundColor: c.toHex() }}
                        title={c.toHex()}
                        onClick={() => updateColor(c.toHex())}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contrast Tab */}
          {activeTab === 'contrast' && (
            <div className="contrast-panel">
              <div className="contrast-preview">
                <div
                  className="contrast-sample"
                  style={{ backgroundColor: contrastBg, color: hex }}
                >
                  <span className="contrast-text-large">Large Text (18pt+)</span>
                  <span className="contrast-text-small">Small body text for readability testing</span>
                </div>
                <div
                  className="contrast-sample contrast-sample-inverted"
                  style={{ backgroundColor: hex, color: contrastBg }}
                >
                  <span className="contrast-text-large">Large Text (18pt+)</span>
                  <span className="contrast-text-small">Small body text for readability testing</span>
                </div>
              </div>

              <div className="contrast-info">
                <div className="contrast-ratio-display">
                  <span className="ratio-value">{contrastRatio.toFixed(2)}:1</span>
                  <span className={`ratio-badge ${readable ? 'pass' : 'fail'}`}>
                    {readable ? 'WCAG AA Pass' : 'WCAG AA Fail'}
                  </span>
                </div>

                <div className="contrast-bg-picker">
                  <label>Background Color</label>
                  <div className="bg-picker-row">
                    <input
                      type="color"
                      value={contrastBg}
                      onChange={(e) => setContrastBg(e.target.value)}
                    />
                    <input
                      type="text"
                      value={contrastBg}
                      onChange={(e) => setContrastBg(e.target.value)}
                    />
                    <button onClick={() => setContrastBg('#ffffff')}>White</button>
                    <button onClick={() => setContrastBg('#000000')}>Black</button>
                  </div>
                </div>

                <div className="wcag-guide">
                  <div className="wcag-item">
                    <span className="wcag-level">AA Normal</span>
                    <span className={contrastRatio >= 4.5 ? 'pass' : 'fail'}>4.5:1 {contrastRatio >= 4.5 ? '✓' : '✗'}</span>
                  </div>
                  <div className="wcag-item">
                    <span className="wcag-level">AA Large</span>
                    <span className={contrastRatio >= 3 ? 'pass' : 'fail'}>3:1 {contrastRatio >= 3 ? '✓' : '✗'}</span>
                  </div>
                  <div className="wcag-item">
                    <span className="wcag-level">AAA Normal</span>
                    <span className={contrastRatio >= 7 ? 'pass' : 'fail'}>7:1 {contrastRatio >= 7 ? '✓' : '✗'}</span>
                  </div>
                  <div className="wcag-item">
                    <span className="wcag-level">AAA Large</span>
                    <span className={contrastRatio >= 4.5 ? 'pass' : 'fail'}>4.5:1 {contrastRatio >= 4.5 ? '✓' : '✗'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Export Tab */}
          {activeTab === 'export' && (
            <div className="export-panel">
              <CodeBlock
                code={`import { color, getTriadic, generatePalette } from '@oxog/colorkit'

// Create color from any format
const myColor = color('${hex}')

// Get all formats
myColor.toHex()      // "${hex}"
myColor.toRgbString()   // "${color.toRgbString()}"
myColor.toHslString()   // "${color.toHslString()}"

// Get raw values
myColor.toRgb()   // { r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b}, a: ${rgb.a} }
myColor.toHsl()   // { h: ${hsl.h}, s: ${hsl.s}, l: ${hsl.l}, a: ${hsl.a} }
myColor.toHsv()   // { h: ${hsv.h}, s: ${hsv.s}, v: ${hsv.v}, a: ${hsv.a} }
myColor.toHwb()   // { h: ${hwb.h}, w: ${hwb.w}, b: ${hwb.b}, a: ${hwb.a} }
myColor.toCmyk()  // { c: ${cmyk.c}, m: ${cmyk.m}, y: ${cmyk.y}, k: ${cmyk.k} }

// Manipulate colors
myColor.lighten(20).toHex()    // "${color.lighten(20).toHex()}"
myColor.darken(20).toHex()     // "${color.darken(20).toHex()}"
myColor.saturate(20).toHex()   // "${color.saturate(20).toHex()}"
myColor.desaturate(20).toHex() // "${color.desaturate(20).toHex()}"
myColor.spin(180).toHex()      // "${color.spin(180).toHex()}"
myColor.invert().toHex()       // "${color.invert().toHex()}"

// Generate harmonies
getTriadic('${hex}')  // [${triadic.map(c => `"${c.toHex()}"`).join(', ')}]`}
                language="typescript"
              />
            </div>
          )}
        </div>
      </div>

      {/* Color Formats Grid */}
      <div className="formats-section">
        <h3>All Formats</h3>
        <div className="formats-grid">
          {[
            { label: 'HEX', value: hex },
            { label: 'HEX8', value: color.toHex8() },
            { label: 'RGB', value: color.toRgbString() },
            { label: 'HSL', value: color.toHslString() },
            { label: 'HSV', value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
            { label: 'HWB', value: `hwb(${hwb.h}, ${hwb.w}%, ${hwb.b}%)` },
            { label: 'CMYK', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
          ].map(({ label, value }) => (
            <div
              key={label}
              className={`format-card ${copied === label ? 'copied' : ''}`}
              onClick={() => copyToClipboard(value, label)}
            >
              <span className="format-label">{label}</span>
              <code>{value}</code>
              <span className="copy-hint">{copied === label ? 'Copied!' : 'Click to copy'}</span>
            </div>
          ))}
        </div>
      </div>

      {copied && <div className="copy-toast">Copied to clipboard!</div>}
    </div>
  )
}
