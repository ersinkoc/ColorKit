import { useState, useEffect } from 'react'
import { CodeBlock } from '../components/CodeBlock'
import './Docs.css'

const sections = [
  { id: 'installation', label: 'Installation' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'color-creation', label: 'Color Creation' },
  { id: 'conversion', label: 'Format Conversion' },
  { id: 'manipulation', label: 'Manipulation' },
  { id: 'mixing', label: 'Mixing & Blending' },
  { id: 'harmony', label: 'Color Harmony' },
  { id: 'palette', label: 'Palette Generation' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'gradients', label: 'Gradients' },
  { id: 'utilities', label: 'Utilities' },
  { id: 'typescript', label: 'TypeScript' },
]

export function Docs() {
  const [activeSection, setActiveSection] = useState('installation')

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id))
      const scrollPos = window.scrollY + 150

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="docs-page">
      <aside className="docs-sidebar">
        <nav className="docs-nav">
          <h3>Documentation</h3>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  className={activeSection === section.id ? 'active' : ''}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="docs-content">
        <h1><span className="gradient-text">Documentation</span></h1>
        <p className="docs-intro">
          Complete guide to ColorKit - the professional color manipulation library for JavaScript and TypeScript.
        </p>

        {/* Installation */}
        <section id="installation" className="doc-section">
          <h2>Installation</h2>
          <p>Install ColorKit using your preferred package manager:</p>
          <CodeBlock language="bash" code={`npm install @oxog/colorkit
# or
yarn add @oxog/colorkit
# or
pnpm add @oxog/colorkit`} />

          <div className="doc-note">
            <strong>Bundle Size:</strong> ColorKit is tree-shakeable. Import only what you need for optimal bundle size. Core functions are under 4KB gzipped.
          </div>
        </section>

        {/* Quick Start */}
        <section id="quick-start" className="doc-section">
          <h2>Quick Start</h2>
          <p>Get started with ColorKit in seconds:</p>
          <CodeBlock language="typescript" code={`import { color, mix, getTriadic } from '@oxog/colorkit'

// Create a color from any format
const blue = color('#3b82f6')

// Convert to different formats
console.log(blue.toHex())        // "#3b82f6"
console.log(blue.toRgbString())  // "rgb(59, 130, 246)"
console.log(blue.toHslString())  // "hsl(217, 91%, 60%)"

// Manipulate colors
const lighter = blue.lighten(20)
const darker = blue.darken(20)
const complementary = blue.spin(180)

// Mix colors
const purple = mix('#3b82f6', '#ef4444', 0.5)

// Generate harmonies
const [c1, c2, c3] = getTriadic('#3b82f6')`} />
        </section>

        {/* Color Creation */}
        <section id="color-creation" className="doc-section">
          <h2>Color Creation</h2>
          <p>ColorKit accepts colors in many formats. Use the <code>color()</code> function to create a Color instance:</p>

          <h3>Supported Formats</h3>
          <CodeBlock language="typescript" code={`import { color } from '@oxog/colorkit'

// HEX formats
color('#f00')           // 3-digit hex
color('#ff0000')        // 6-digit hex
color('#ff0000ff')      // 8-digit hex with alpha

// RGB formats
color('rgb(255, 0, 0)')
color('rgba(255, 0, 0, 0.5)')
color({ r: 255, g: 0, b: 0 })
color({ r: 255, g: 0, b: 0, a: 0.5 })

// HSL formats
color('hsl(0, 100%, 50%)')
color('hsla(0, 100%, 50%, 0.5)')
color({ h: 0, s: 100, l: 50 })

// HSV/HSB format
color('hsv(0, 100%, 100%)')
color({ h: 0, s: 100, v: 100 })

// HWB format
color({ h: 0, w: 0, b: 0 })

// Named colors (140+ CSS colors)
color('red')
color('coral')
color('dodgerblue')`} />

          <h3>Constructor Functions</h3>
          <p>For more control, use specific constructor functions:</p>
          <CodeBlock language="typescript" code={`import { rgb, hsl, hsv, hex } from '@oxog/colorkit'

// RGB constructor
const red = rgb(255, 0, 0)
const redWithAlpha = rgb(255, 0, 0, 0.5)

// HSL constructor
const blue = hsl(240, 100, 50)

// HSV constructor
const green = hsv(120, 100, 100)

// HEX parser
const yellow = hex('#ffff00')`} />
        </section>

        {/* Format Conversion */}
        <section id="conversion" className="doc-section">
          <h2>Format Conversion</h2>
          <p>Convert colors between any supported format:</p>

          <h3>Output Methods</h3>
          <CodeBlock language="typescript" code={`const c = color('#3b82f6')

// String outputs
c.toHex()        // "#3b82f6"
c.toHex8()       // "#3b82f6ff"
c.toRgbString()  // "rgb(59, 130, 246)"
c.toHslString()  // "hsl(217, 91%, 60%)"

// Object outputs
c.toRgb()   // { r: 59, g: 130, b: 246, a: 1 }
c.toHsl()   // { h: 217, s: 91, l: 60, a: 1 }
c.toHsv()   // { h: 217, s: 76, v: 96, a: 1 }
c.toHwb()   // { h: 217, w: 23, b: 4, a: 1 }
c.toCmyk()  // { c: 76, m: 47, y: 0, k: 4 }

// Individual channels
c.red()     // 59
c.green()   // 130
c.blue()    // 246
c.alpha()   // 1
c.hue()     // 217
c.saturation() // 91 (HSL)
c.lightness()  // 60`} />

          <h3>Standalone Conversion Functions</h3>
          <CodeBlock language="typescript" code={`import {
  hexToRgb,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  rgbToHwb,
  hwbToRgb,
  rgbToCmyk,
  cmykToRgb
} from '@oxog/colorkit'

const rgb = hexToRgb('#ff0000')  // { r: 255, g: 0, b: 0 }
const hsl = rgbToHsl(rgb)        // { h: 0, s: 100, l: 50 }`} />
        </section>

        {/* Manipulation */}
        <section id="manipulation" className="doc-section">
          <h2>Color Manipulation</h2>
          <p>All manipulation methods return a new Color instance, keeping the original unchanged:</p>

          <h3>Lightness & Darkness</h3>
          <CodeBlock language="typescript" code={`const c = color('#3b82f6')

// Lighten by percentage (0-100)
c.lighten(20)   // Increase lightness by 20%
c.lighten(50)   // Increase lightness by 50%

// Darken by percentage (0-100)
c.darken(20)    // Decrease lightness by 20%
c.darken(50)    // Decrease lightness by 50%

// Brighten (RGB-based)
c.brighten(20)  // Increase brightness

// Set specific lightness
c.setLightness(75)`} />

          <h3>Saturation</h3>
          <CodeBlock language="typescript" code={`const c = color('#3b82f6')

// Increase saturation
c.saturate(20)    // More vivid

// Decrease saturation
c.desaturate(20)  // More muted

// Remove all saturation
c.grayscale()     // Convert to gray

// Set specific saturation
c.setSaturation(50)`} />

          <h3>Hue Rotation</h3>
          <CodeBlock language="typescript" code={`const c = color('#3b82f6')

// Rotate hue by degrees
c.spin(90)      // Rotate 90° clockwise
c.spin(-90)     // Rotate 90° counter-clockwise
c.spin(180)     // Get complement

// Set specific hue
c.setHue(120)   // Set to green hue`} />

          <h3>Other Operations</h3>
          <CodeBlock language="typescript" code={`const c = color('#3b82f6')

// Invert color
c.invert()

// Set alpha/opacity
c.setAlpha(0.5)
c.fade(20)      // Reduce alpha by 20%
c.opaquer(20)   // Increase alpha by 20%

// Negate (invert RGB channels)
c.negate()`} />

          <h3>Standalone Functions</h3>
          <CodeBlock language="typescript" code={`import { lighten, darken, saturate, spin, grayscale } from '@oxog/colorkit'

// All functions work with any color input
lighten('#3b82f6', 20)
darken({ r: 59, g: 130, b: 246 }, 20)
saturate('rgb(59, 130, 246)', 20)
spin('hsl(217, 91%, 60%)', 90)
grayscale('#3b82f6')`} />
        </section>

        {/* Mixing */}
        <section id="mixing" className="doc-section">
          <h2>Mixing & Blending</h2>

          <h3>Color Mixing</h3>
          <CodeBlock language="typescript" code={`import { mix, tint, shade, tone } from '@oxog/colorkit'

const red = '#ff0000'
const blue = '#0000ff'

// Mix two colors (ratio 0-1)
mix(red, blue, 0.5)   // 50% each = purple
mix(red, blue, 0.25)  // 75% red, 25% blue

// Tint = mix with white
tint(red, 50)   // 50% white mixed in

// Shade = mix with black
shade(red, 50)  // 50% black mixed in

// Tone = mix with gray
tone(red, 50)   // 50% gray mixed in`} />

          <h3>Blend Modes</h3>
          <CodeBlock language="typescript" code={`import { blend } from '@oxog/colorkit'

const base = '#3b82f6'
const overlay = '#ff0000'

// Standard blend modes
blend(base, overlay, 'multiply')
blend(base, overlay, 'screen')
blend(base, overlay, 'overlay')
blend(base, overlay, 'darken')
blend(base, overlay, 'lighten')
blend(base, overlay, 'colorDodge')
blend(base, overlay, 'colorBurn')
blend(base, overlay, 'hardLight')
blend(base, overlay, 'softLight')
blend(base, overlay, 'difference')
blend(base, overlay, 'exclusion')`} />
        </section>

        {/* Harmony */}
        <section id="harmony" className="doc-section">
          <h2>Color Harmony</h2>
          <p>Generate harmonious color schemes based on color theory:</p>

          <CodeBlock language="typescript" code={`import {
  getComplementary,
  getTriadic,
  getTetradic,
  getAnalogous,
  getSplitComplementary,
  getMonochromatic
} from '@oxog/colorkit'

const base = '#3b82f6'

// Complementary (opposite on color wheel)
getComplementary(base)
// Returns: [original, complement] (180° apart)

// Triadic (3 colors equally spaced)
getTriadic(base)
// Returns: [c1, c2, c3] (120° apart)

// Tetradic / Square (4 colors)
getTetradic(base)
// Returns: [c1, c2, c3, c4] (90° apart)

// Analogous (adjacent colors)
getAnalogous(base, { count: 5, angle: 30 })
// Returns: 5 colors, 30° apart

// Split Complementary
getSplitComplementary(base)
// Returns: [original, splitLeft, splitRight]

// Monochromatic (same hue, different lightness)
getMonochromatic(base, 5)
// Returns: 5 variations of the same hue`} />
        </section>

        {/* Palette */}
        <section id="palette" className="doc-section">
          <h2>Palette Generation</h2>

          <h3>Tailwind-style Palette</h3>
          <CodeBlock language="typescript" code={`import { generateTailwindPalette } from '@oxog/colorkit'

const palette = generateTailwindPalette('#3b82f6')
// Returns: {
//   50:  Color,  // lightest
//   100: Color,
//   200: Color,
//   300: Color,
//   400: Color,
//   500: Color,  // base color
//   600: Color,
//   700: Color,
//   800: Color,
//   900: Color,
//   950: Color   // darkest
// }

// Use in Tailwind config
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: Object.fromEntries(
          Object.entries(palette).map(([k, v]) => [k, v.toHex()])
        )
      }
    }
  }
}`} />

          <h3>Tints, Shades, and Tones</h3>
          <CodeBlock language="typescript" code={`import { generateTints, generateShades, generateTones } from '@oxog/colorkit'

// Generate 5 tints (lighter variations)
const tints = generateTints('#3b82f6', 5)

// Generate 5 shades (darker variations)
const shades = generateShades('#3b82f6', 5)

// Generate 5 tones (muted variations)
const tones = generateTones('#3b82f6', 5)`} />

          <h3>Custom Scale</h3>
          <CodeBlock language="typescript" code={`import { generateScale } from '@oxog/colorkit'

// Generate a scale between two colors
const scale = generateScale('#3b82f6', '#ef4444', 10)
// Returns 10 colors transitioning from blue to red`} />
        </section>

        {/* Accessibility */}
        <section id="accessibility" className="doc-section">
          <h2>Accessibility</h2>
          <p>ColorKit includes comprehensive WCAG accessibility tools:</p>

          <h3>Contrast Ratio</h3>
          <CodeBlock language="typescript" code={`import { getContrast, isReadable, getReadableColor } from '@oxog/colorkit'

const bg = '#3b82f6'
const text = '#ffffff'

// Get contrast ratio (1-21)
const ratio = getContrast(bg, text)  // e.g., 4.53

// Check readability (WCAG AA = 4.5:1 for normal text)
isReadable(bg, text)                   // true/false
isReadable(bg, text, { level: 'AAA' }) // AAA = 7:1

// Get a readable text color for any background
getReadableColor(bg)  // Returns black or white

// WCAG Guidelines:
// AA Normal Text:  4.5:1
// AA Large Text:   3:1
// AAA Normal Text: 7:1
// AAA Large Text:  4.5:1`} />

          <h3>Luminance</h3>
          <CodeBlock language="typescript" code={`import { getLuminance, isDark, isLight } from '@oxog/colorkit'

const c = '#3b82f6'

// Get relative luminance (0-1)
getLuminance(c)  // 0.24

// Check if color is dark or light
isDark(c)   // true (luminance < 0.5)
isLight(c)  // false`} />
        </section>

        {/* Gradients */}
        <section id="gradients" className="doc-section">
          <h2>Gradients</h2>

          <h3>Create CSS Gradients</h3>
          <CodeBlock language="typescript" code={`import { createGradient } from '@oxog/colorkit'

// Linear gradient (default)
createGradient(['#ff0000', '#0000ff'])
// "linear-gradient(90deg, #ff0000 0%, #0000ff 100%)"

// With custom direction
createGradient(['#ff0000', '#0000ff'], { direction: '45deg' })

// Multiple color stops
createGradient(['#ff0000', '#00ff00', '#0000ff'])

// With custom stops
createGradient([
  { color: '#ff0000', stop: 0 },
  { color: '#00ff00', stop: 30 },
  { color: '#0000ff', stop: 100 }
])

// Radial gradient
createGradient(['#ff0000', '#0000ff'], {
  type: 'radial',
  shape: 'circle',
  position: 'center'
})

// Conic gradient
createGradient(['#ff0000', '#00ff00', '#0000ff'], {
  type: 'conic'
})`} />

          <h3>Parse Gradients</h3>
          <CodeBlock language="typescript" code={`import { parseGradient } from '@oxog/colorkit'

const gradient = parseGradient('linear-gradient(90deg, #ff0000, #0000ff)')
// Returns: {
//   type: 'linear',
//   direction: '90deg',
//   stops: [
//     { color: Color, stop: 0 },
//     { color: Color, stop: 100 }
//   ]
// }`} />
        </section>

        {/* Utilities */}
        <section id="utilities" className="doc-section">
          <h2>Utilities</h2>

          <h3>Random Colors</h3>
          <CodeBlock language="typescript" code={`import { randomColor, randomHex, randomPalette } from '@oxog/colorkit'

// Generate random color
randomColor()

// With constraints
randomColor({
  hue: [180, 240],        // Hue range (blue-ish)
  saturation: [70, 100],  // Saturation range
  lightness: [40, 60],    // Lightness range
  luminance: 'light'      // 'light', 'dark', or 'any'
})

// Random HEX string
randomHex()  // "#a3f7c2"

// Random palette
randomPalette(5)  // 5 harmonious random colors`} />

          <h3>Color Distance</h3>
          <CodeBlock language="typescript" code={`import { colorDistance, deltaE } from '@oxog/colorkit'

// Euclidean distance in RGB space
colorDistance('#ff0000', '#00ff00')

// Delta E (perceptual difference)
deltaE('#ff0000', '#ff0100')  // Very small = similar colors`} />

          <h3>Named Colors</h3>
          <CodeBlock language="typescript" code={`import { getNamedColor, findClosestNamedColor, namedColors } from '@oxog/colorkit'

// Get color by name
getNamedColor('coral')  // Color instance

// Find closest named color
findClosestNamedColor('#ff7f50')  // 'coral'

// Get all named colors
namedColors  // Map of 140+ CSS color names`} />

          <h3>Validation</h3>
          <CodeBlock language="typescript" code={`import { isValidColor, detectFormat } from '@oxog/colorkit'

// Check if string is a valid color
isValidColor('#ff0000')  // true
isValidColor('red')      // true
isValidColor('invalid')  // false

// Detect color format
detectFormat('#ff0000')       // 'hex'
detectFormat('#ff0000ff')     // 'hex8'
detectFormat('rgb(255,0,0)')  // 'rgb'
detectFormat('hsl(0,100%,50%)')  // 'hsl'
detectFormat('red')           // 'named'`} />
        </section>

        {/* TypeScript */}
        <section id="typescript" className="doc-section">
          <h2>TypeScript</h2>
          <p>ColorKit is written in TypeScript and provides full type definitions:</p>

          <h3>Type Imports</h3>
          <CodeBlock language="typescript" code={`import type {
  RgbColor,
  RgbaColor,
  HslColor,
  HslaColor,
  HsvColor,
  HsvaColor,
  HwbColor,
  CmykColor,
  ColorInput,
  GradientOptions,
  HarmonyOptions
} from '@oxog/colorkit'

// Example usage
function processColor(input: ColorInput): RgbaColor {
  const c = color(input)
  return c.toRgb()
}

// ColorInput accepts:
// - string (hex, rgb, hsl, hsv, named)
// - RgbColor | RgbaColor
// - HslColor | HslaColor
// - HsvColor | HsvaColor
// - HwbColor
// - Color instance`} />

          <h3>Color Class</h3>
          <CodeBlock language="typescript" code={`import { Color, ColorClass } from '@oxog/colorkit'

// Color is an alias for ColorClass
const c: Color = new ColorClass(255, 0, 0)

// All methods are fully typed
c.lighten(20)  // Returns Color
c.toRgb()      // Returns RgbaColor
c.toHex()      // Returns string`} />

          <div className="doc-tip">
            <strong>Tip:</strong> Use your IDE's autocomplete to explore all available methods and their types. ColorKit provides comprehensive JSDoc comments for all public APIs.
          </div>
        </section>
      </div>
    </div>
  )
}
