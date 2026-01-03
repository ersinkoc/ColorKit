import { useState } from 'react'
import {
  color,
  mix,
  tint,
  shade,
  getComplementary,
  getTriadic,
  getTetradic,
  getAnalogous,
  generatePalette,
  generateTailwindPalette,
  generateTints,
  generateShades,
  getContrast,
  isReadable,
  createGradient,
  randomColor
} from '@oxog/colorkit'

// Interactive Color Swatch Component
function ColorSwatch({ hex, label, size = 60 }: { hex: string; label?: string; size?: number }) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="color-swatch-item" onClick={handleClick} title={`Click to copy ${hex}`}>
      <div
        className="color-swatch-box"
        style={{ width: size, height: size, background: hex }}
      />
      {label && <span className="color-swatch-label">{label}</span>}
      <code className="color-swatch-hex">{copied ? 'Copied!' : hex}</code>
    </div>
  )
}

// Interactive Base Color Picker
function InteractiveDemo({ children }: { children: (baseColor: string) => React.ReactNode }) {
  const [baseColor, setBaseColor] = useState('#3b82f6')

  return (
    <div className="interactive-demo">
      <div className="demo-controls">
        <label>Base Color:</label>
        <input
          type="color"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
        />
        <input
          type="text"
          value={baseColor}
          onChange={(e) => {
            try {
              color(e.target.value)
              setBaseColor(e.target.value)
            } catch {}
          }}
          placeholder="#3b82f6"
        />
        <button onClick={() => setBaseColor(randomColor().toHex())}>Random</button>
      </div>
      <div className="demo-result">
        {children(baseColor)}
      </div>
    </div>
  )
}

export const examplesData = [
  {
    id: 'color-creation',
    title: 'Color Creation',
    description: 'Create colors from HEX, RGB, HSL, named colors, and more. ColorKit accepts any valid color format.',
    code: `import { color } from '@oxog/colorkit'

// From HEX
const red = color('#ff0000')

// From RGB string
const green = color('rgb(0, 255, 0)')

// From HSL string
const blue = color('hsl(240, 100%, 50%)')

// From RGB object
const yellow = color({ r: 255, g: 255, b: 0 })

// From named color
const coral = color('coral')

// All return a Color instance with full manipulation capabilities`,
    result: (
      <div className="swatch-grid">
        <ColorSwatch hex="#ff0000" label="HEX" />
        <ColorSwatch hex="#00ff00" label="RGB" />
        <ColorSwatch hex="#0000ff" label="HSL" />
        <ColorSwatch hex="#ffff00" label="Object" />
        <ColorSwatch hex="#ff7f50" label="Named" />
      </div>
    ),
  },
  {
    id: 'color-manipulation',
    title: 'Color Manipulation',
    description: 'Lighten, darken, saturate, desaturate, spin hue, and more. All methods return a new Color instance.',
    code: `import { color } from '@oxog/colorkit'

const base = color('#3b82f6')

// Lighten by 20%
base.lighten(20).toHex()  // "#6ba3f9"

// Darken by 20%
base.darken(20).toHex()   // "#1e5bb8"

// Increase saturation
base.saturate(20).toHex()

// Decrease saturation
base.desaturate(20).toHex()

// Rotate hue by degrees
base.spin(90).toHex()     // Shift hue 90°

// Invert color
base.invert().toHex()

// Grayscale
base.grayscale().toHex()`,
    result: (
      <InteractiveDemo>
        {(baseColor) => {
          const c = color(baseColor)
          return (
            <div className="swatch-grid">
              <ColorSwatch hex={c.toHex()} label="Original" />
              <ColorSwatch hex={c.lighten(20).toHex()} label="Lighten" />
              <ColorSwatch hex={c.darken(20).toHex()} label="Darken" />
              <ColorSwatch hex={c.saturate(30).toHex()} label="Saturate" />
              <ColorSwatch hex={c.desaturate(30).toHex()} label="Desaturate" />
              <ColorSwatch hex={c.spin(90).toHex()} label="Spin 90°" />
              <ColorSwatch hex={c.invert().toHex()} label="Invert" />
              <ColorSwatch hex={c.grayscale().toHex()} label="Grayscale" />
            </div>
          )
        }}
      </InteractiveDemo>
    ),
  },
  {
    id: 'color-mixing',
    title: 'Color Mixing',
    description: 'Mix two colors together, create tints (mix with white) and shades (mix with black).',
    code: `import { mix, tint, shade, tone } from '@oxog/colorkit'

const red = color('#ff0000')
const blue = color('#0000ff')

// Mix two colors (50% each)
mix(red, blue, 0.5).toHex()  // "#800080" purple

// Create tints (lighter variations)
tint(red, 25).toHex()  // Mix with 25% white
tint(red, 50).toHex()  // Mix with 50% white
tint(red, 75).toHex()  // Mix with 75% white

// Create shades (darker variations)
shade(red, 25).toHex() // Mix with 25% black
shade(red, 50).toHex() // Mix with 50% black
shade(red, 75).toHex() // Mix with 75% black`,
    result: (
      <InteractiveDemo>
        {(baseColor) => {
          const c = color(baseColor)
          return (
            <div className="mix-demo">
              <div className="mix-section">
                <h4>Tints (+ White)</h4>
                <div className="palette-strip">
                  {[0, 20, 40, 60, 80].map((amount) => (
                    <ColorSwatch
                      key={amount}
                      hex={tint(c, amount).toHex()}
                      label={`${amount}%`}
                      size={50}
                    />
                  ))}
                </div>
              </div>
              <div className="mix-section">
                <h4>Shades (+ Black)</h4>
                <div className="palette-strip">
                  {[0, 20, 40, 60, 80].map((amount) => (
                    <ColorSwatch
                      key={amount}
                      hex={shade(c, amount).toHex()}
                      label={`${amount}%`}
                      size={50}
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        }}
      </InteractiveDemo>
    ),
  },
  {
    id: 'color-harmonies',
    title: 'Color Harmonies',
    description: 'Generate harmonious color schemes based on color theory: complementary, triadic, tetradic, and analogous.',
    code: `import {
  getComplementary,
  getTriadic,
  getTetradic,
  getAnalogous,
  getSplitComplementary
} from '@oxog/colorkit'

const base = '#3b82f6'

// Complementary (opposite on color wheel)
getComplementary(base)  // [original, complement]

// Triadic (120° apart)
getTriadic(base)        // [color1, color2, color3]

// Tetradic/Square (90° apart)
getTetradic(base)       // [c1, c2, c3, c4]

// Analogous (adjacent colors)
getAnalogous(base)      // [c1, c2, c3]`,
    result: (
      <InteractiveDemo>
        {(baseColor) => (
          <div className="harmony-demo">
            <div className="harmony-section">
              <h4>Complementary</h4>
              <div className="harmony-strip">
                {getComplementary(baseColor).map((c, i) => (
                  <ColorSwatch key={i} hex={c.toHex()} size={50} />
                ))}
              </div>
            </div>
            <div className="harmony-section">
              <h4>Triadic</h4>
              <div className="harmony-strip">
                {getTriadic(baseColor).map((c, i) => (
                  <ColorSwatch key={i} hex={c.toHex()} size={50} />
                ))}
              </div>
            </div>
            <div className="harmony-section">
              <h4>Tetradic</h4>
              <div className="harmony-strip">
                {getTetradic(baseColor).map((c, i) => (
                  <ColorSwatch key={i} hex={c.toHex()} size={50} />
                ))}
              </div>
            </div>
            <div className="harmony-section">
              <h4>Analogous</h4>
              <div className="harmony-strip">
                {getAnalogous(baseColor).map((c, i) => (
                  <ColorSwatch key={i} hex={c.toHex()} size={50} />
                ))}
              </div>
            </div>
          </div>
        )}
      </InteractiveDemo>
    ),
  },
  {
    id: 'tailwind-palette',
    title: 'Tailwind CSS Palette',
    description: 'Generate a complete Tailwind CSS-style color palette from any base color.',
    code: `import { generateTailwindPalette } from '@oxog/colorkit'

const palette = generateTailwindPalette('#3b82f6')

// Returns palette object:
// {
//   50: "#eff6ff",
//   100: "#dbeafe",
//   200: "#bfdbfe",
//   300: "#93c5fd",
//   400: "#60a5fa",
//   500: "#3b82f6",  // Base color
//   600: "#2563eb",
//   700: "#1d4ed8",
//   800: "#1e40af",
//   900: "#1e3a8a",
//   950: "#172554"
// }

// Use in your CSS or config
module.exports = {
  theme: {
    colors: {
      primary: palette
    }
  }
}`,
    result: (
      <InteractiveDemo>
        {(baseColor) => {
          const palette = generateTailwindPalette(baseColor)
          return (
            <div className="tailwind-palette">
              {Object.entries(palette).map(([key, hex]) => (
                <div key={key} className="tailwind-swatch" onClick={() => navigator.clipboard.writeText(hex)}>
                  <div
                    className="tailwind-color"
                    style={{ background: hex }}
                  />
                  <span className="tailwind-key">{key}</span>
                  <code className="tailwind-hex">{hex}</code>
                </div>
              ))}
            </div>
          )
        }}
      </InteractiveDemo>
    ),
  },
  {
    id: 'accessibility',
    title: 'Accessibility & Contrast',
    description: 'Check WCAG contrast ratios and find readable text colors for any background.',
    code: `import { getContrast, isReadable, getReadableColor } from '@oxog/colorkit'

const bg = '#3b82f6'
const white = '#ffffff'
const black = '#000000'

// Get contrast ratio
getContrast(bg, white)  // 4.5 (number)
getContrast(bg, black)  // 7.2 (number)

// Check if readable (WCAG AA)
isReadable(bg, white)  // true if >= 4.5:1

// Get suggested readable color
getReadableColor(bg)   // Returns black or white

// WCAG Guidelines:
// AA Normal Text: 4.5:1
// AA Large Text: 3:1
// AAA Normal Text: 7:1
// AAA Large Text: 4.5:1`,
    result: (
      <InteractiveDemo>
        {(baseColor) => {
          const contrastWhite = getContrast(baseColor, '#ffffff')
          const contrastBlack = getContrast(baseColor, '#000000')
          const readableOnWhite = isReadable(baseColor, '#ffffff')
          const readableOnBlack = isReadable(baseColor, '#000000')

          return (
            <div className="accessibility-demo">
              <div className="contrast-samples">
                <div
                  className="contrast-sample"
                  style={{ background: baseColor, color: '#ffffff' }}
                >
                  <span className="sample-text">White Text</span>
                  <div className="sample-info">
                    <span className="ratio">{contrastWhite.toFixed(2)}:1</span>
                    <span className={`badge ${readableOnWhite ? 'pass' : 'fail'}`}>
                      {readableOnWhite ? 'AA Pass' : 'AA Fail'}
                    </span>
                  </div>
                </div>
                <div
                  className="contrast-sample"
                  style={{ background: baseColor, color: '#000000' }}
                >
                  <span className="sample-text">Black Text</span>
                  <div className="sample-info">
                    <span className="ratio">{contrastBlack.toFixed(2)}:1</span>
                    <span className={`badge ${readableOnBlack ? 'pass' : 'fail'}`}>
                      {readableOnBlack ? 'AA Pass' : 'AA Fail'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="wcag-legend">
                <span>AA Normal: 4.5:1</span>
                <span>AA Large: 3:1</span>
                <span>AAA Normal: 7:1</span>
              </div>
            </div>
          )
        }}
      </InteractiveDemo>
    ),
  },
  {
    id: 'gradients',
    title: 'Gradient Generation',
    description: 'Create smooth CSS gradients between multiple colors with customizable stops.',
    code: `import { createGradient } from '@oxog/colorkit'

// Two-color gradient with stops
const gradient = createGradient([
  { color: '#ff0000', position: 0 },
  { color: '#0000ff', position: 100 }
])
// "linear-gradient(90deg, #ff0000 0%, #0000ff 100%)"

// Multi-color with angle
const rainbow = createGradient([
  { color: '#ff0000', position: 0 },
  { color: '#ff7f00', position: 20 },
  { color: '#ffff00', position: 40 },
  { color: '#00ff00', position: 60 },
  { color: '#0000ff', position: 80 },
  { color: '#8b00ff', position: 100 }
], { angle: 135 })

// Radial gradient
const radial = createGradient([
  { color: '#ff0000', position: 0 },
  { color: '#0000ff', position: 100 }
], { type: 'radial' })`,
    result: (
      <InteractiveDemo>
        {(baseColor) => {
          const c = color(baseColor)

          // Create gradient stops with position
          const twoColorStops = [
            { color: baseColor, position: 0 },
            { color: c.spin(180).toHex(), position: 100 }
          ]

          const multiColorStops = [
            { color: baseColor, position: 0 },
            { color: c.spin(60).toHex(), position: 33 },
            { color: c.spin(120).toHex(), position: 66 },
            { color: c.spin(180).toHex(), position: 100 }
          ]

          const radialStops = [
            { color: baseColor, position: 0 },
            { color: c.lighten(40).toHex(), position: 100 }
          ]

          return (
            <div className="gradient-demo">
              <div
                className="gradient-preview"
                style={{ background: createGradient(twoColorStops) }}
              >
                <span>Two Color</span>
              </div>
              <div
                className="gradient-preview"
                style={{ background: createGradient(multiColorStops, { angle: 90 }) }}
              >
                <span>Multi Color</span>
              </div>
              <div
                className="gradient-preview"
                style={{ background: createGradient(radialStops, { type: 'radial' }) }}
              >
                <span>Radial</span>
              </div>
            </div>
          )
        }}
      </InteractiveDemo>
    ),
  },
  {
    id: 'color-conversion',
    title: 'Format Conversion',
    description: 'Convert colors between all supported formats: HEX, RGB, HSL, HSV, HWB, CMYK.',
    code: `import { color } from '@oxog/colorkit'

const c = color('#3b82f6')

// Get different formats
c.toHex()        // "#3b82f6"
c.toHex8()       // "#3b82f6ff" (with alpha)
c.toRgb()        // { r: 59, g: 130, b: 246, a: 1 }
c.toRgbString()  // "rgb(59, 130, 246)"
c.toHsl()        // { h: 217, s: 91, l: 60, a: 1 }
c.toHslString()  // "hsl(217, 91%, 60%)"
c.toHsv()        // { h: 217, s: 76, v: 96, a: 1 }
c.toHwb()        // { h: 217, w: 23, b: 4, a: 1 }
c.toCmyk()       // { c: 76, m: 47, y: 0, k: 4 }`,
    result: (
      <InteractiveDemo>
        {(baseColor) => {
          const c = color(baseColor)
          const rgb = c.toRgb()
          const hsl = c.toHsl()
          const hsv = c.toHsv()
          const hwb = c.toHwb()
          const cmyk = c.toCmyk()

          return (
            <div className="conversion-demo">
              <div className="format-row">
                <span className="format-name">HEX</span>
                <code>{c.toHex()}</code>
              </div>
              <div className="format-row">
                <span className="format-name">RGB</span>
                <code>rgb({rgb.r}, {rgb.g}, {rgb.b})</code>
              </div>
              <div className="format-row">
                <span className="format-name">HSL</span>
                <code>hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</code>
              </div>
              <div className="format-row">
                <span className="format-name">HSV</span>
                <code>hsv({hsv.h}, {hsv.s}%, {hsv.v}%)</code>
              </div>
              <div className="format-row">
                <span className="format-name">HWB</span>
                <code>hwb({hwb.h}, {hwb.w}%, {hwb.b}%)</code>
              </div>
              <div className="format-row">
                <span className="format-name">CMYK</span>
                <code>cmyk({cmyk.c}%, {cmyk.m}%, {cmyk.y}%, {cmyk.k}%)</code>
              </div>
            </div>
          )
        }}
      </InteractiveDemo>
    ),
  },
]
