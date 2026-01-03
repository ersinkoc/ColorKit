import { useState } from 'react'
import { color as createColor, rgb as createRgb } from '@oxog/colorkit'
import { CodeBlock } from '../components/CodeBlock'
import './Playground.css'

export function Playground() {
  const [color, setColor] = useState(createColor(59, 130, 246))
  const [input, setInput] = useState('#3b82f6')

  const updateColor = (value: string) => {
    setInput(value)
    try {
      const c = createColor(value)
      setColor(c)
    } catch {
      // Invalid color, don't update
    }
  }

  const hex = color.toHex()
  const rgb = color.toRgb()
  const hsl = color.toHsl()
  const hsv = color.toHsv()

  return (
    <div className="playground-page">
      <h1>Playground</h1>
      <p className="playground-intro">
        Experiment with colors in real-time. Try different color formats!
      </p>

      <div className="playground-container">
        <div className="playground-preview">
          <div className="color-preview" style={{ background: hex }}>
            <span className="color-value">{hex}</span>
          </div>

          <div className="color-inputs">
            <div className="input-group">
              <label>HEX</label>
              <input
                type="text"
                value={input}
                onChange={(e) => updateColor(e.target.value)}
                placeholder="#3b82f6"
              />
            </div>

            <div className="input-group">
              <label>Red</label>
              <div className="input-group-row">
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.r}
                  onChange={(e) => {
                    const c = createRgb(Number(e.target.value), rgb.g, rgb.b, rgb.a)
                    setColor(c)
                    setInput(c.toHex())
                  }}
                />
                <span>{rgb.r}</span>
              </div>
            </div>

            <div className="input-group">
              <label>Green</label>
              <div className="input-group-row">
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.g}
                  onChange={(e) => {
                    const c = createRgb(rgb.r, Number(e.target.value), rgb.b, rgb.a)
                    setColor(c)
                    setInput(c.toHex())
                  }}
                />
                <span>{rgb.g}</span>
              </div>
            </div>

            <div className="input-group">
              <label>Blue</label>
              <div className="input-group-row">
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={rgb.b}
                  onChange={(e) => {
                    const c = createRgb(rgb.r, rgb.g, Number(e.target.value), rgb.a)
                    setColor(c)
                    setInput(c.toHex())
                  }}
                />
                <span>{rgb.b}</span>
              </div>
            </div>

            <div className="input-group">
              <label>Alpha</label>
              <div className="input-group-row">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={rgb.a}
                  onChange={(e) => {
                    const c = color.setAlpha(Number(e.target.value))
                    setColor(c)
                  }}
                />
                <span>{rgb.a.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="playground-code">
          <h3>Generated Code</h3>
          <CodeBlock
            code={`import { color } from '@oxog/colorkit'

// Create color from HEX
const color = color('${hex}')

// Get values
color.toHex()  // "${hex}"
color.toRgb()  // { r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b}, a: ${rgb.a} }
color.toHsl()  // { h: ${hsl.h}, s: ${hsl.s}, l: ${hsl.l}, a: ${hsl.a} }
color.toHsv()  // { h: ${hsv.h}, s: ${hsv.s}, v: ${hsv.v}, a: ${hsv.a} }

// Manipulate
color.lighten(10).toHex()   // "${color.lighten(10).toHex()}"
color.darken(10).toHex()    // "${color.darken(10).toHex()}"
color.saturate(10).toHex()  // "${color.saturate(10).toHex()}"
color.desaturate(10).toHex() // "${color.desaturate(10).toHex()}"

// Mix colors
color.mix('#ffffff', 0.5).toHex()  // "${color.mix({r:255,g:255,b:255,a:1}, 0.5).toHex()}"
color.tint(20).toHex()  // "${color.tint(20).toHex()}"
color.shade(20).toHex() // "${color.shade(20).toHex()}"
`}
            language="typescript"
          />
        </div>
      </div>

      <div className="color-formats">
        <h3>All Color Formats</h3>
        <div className="formats-grid">
          <div className="format-card">
            <h4>HEX</h4>
            <code>{hex}</code>
          </div>
          <div className="format-card">
            <h4>HEX8</h4>
            <code>{color.toHex8()}</code>
          </div>
          <div className="format-card">
            <h4>RGB</h4>
            <code>rgb({rgb.r}, {rgb.g}, {rgb.b})</code>
          </div>
          <div className="format-card">
            <h4>RGBA</h4>
            <code>rgba({rgb.r}, {rgb.g}, {rgb.b}, {rgb.a.toFixed(2)})</code>
          </div>
          <div className="format-card">
            <h4>HSL</h4>
            <code>hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</code>
          </div>
          <div className="format-card">
            <h4>HSLA</h4>
            <code>hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a.toFixed(2)})</code>
          </div>
          <div className="format-card">
            <h4>HSV</h4>
            <code>hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)</code>
          </div>
          <div className="format-card">
            <h4>HWB</h4>
            <code>hwb(${color.toHwb().h}, ${color.toHwb().w}%, ${color.toHwb().b}%)</code>
          </div>
          <div className="format-card">
            <h4>CMYK</h4>
            <code>cmyk(${color.toCmyk().c}, ${color.toCmyk().m}, ${color.toCmyk().y}, ${color.toCmyk().k})</code>
          </div>
        </div>
      </div>
    </div>
  )
}
