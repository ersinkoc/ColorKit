export const docsData = [
  {
    id: 'installation',
    title: 'Installation',
    content: `
      <p>Install ColorKit using your favorite package manager:</p>
      <pre><code class="language-bash">npm install @oxog/colorkit
# or
yarn add @oxog/colorkit
# or
pnpm add @oxog/colorkit</code></pre>
    `,
  },
  {
    id: 'quick-start',
    title: 'Quick Start',
    content: `
      <p>ColorKit is a zero-dependency color manipulation library. Here's how to get started:</p>
      <h3>Creating Colors</h3>
      <p>You can create colors in multiple ways:</p>
    `,
    code: `import { ColorClass } from '@oxog/colorkit'

// From RGB values
const color1 = new ColorClass(255, 0, 0)

// From HEX string
const color2 = new ColorClass('#ff0000')

// From RGB object
const color3 = new ColorClass({ r: 255, g: 0, b: 0 })

// From HSL
const color4 = new ColorClass({ h: 0, s: 100, l: 50 })`,
  },
  {
    id: 'color-formats',
    title: 'Color Formats',
    content: `
      <p>ColorKit supports all major color formats:</p>
      <ul>
        <li><strong>HEX</strong> - #ff0000, #f00</li>
        <li><strong>RGB</strong> - rgb(255, 0, 0), rgba(255, 0, 0, 0.5)</li>
        <li><strong>HSL</strong> - hsl(0, 100%, 50%), hsla(0, 100%, 50%, 0.5)</li>
        <li><strong>HSV</strong> - hsv(0, 100%, 100%)</li>
        <li><strong>HWB</strong> - hwb(0, 0%, 0%)</li>
        <li><strong>CMYK</strong> - cmyk(0, 100, 100, 0)</li>
        <li><strong>Named Colors</strong> - red, blue, green, etc.</li>
      </ul>
    `,
  },
  {
    id: 'conversion',
    title: 'Color Conversion',
    content: `
      <p>Easily convert between color formats:</p>
    `,
    code: `import { ColorClass } from '@oxog/colorkit'

const color = new ColorClass(255, 0, 0)

// Convert to different formats
color.toHex()      // "#ff0000"
color.toHex8()     // "#ff0000ff"
color.toRgb()      // { r: 255, g: 0, b: 0, a: 1 }
color.toRgbString()  // "rgb(255, 0, 0)"
color.toRgbaString() // "rgba(255, 0, 0, 1)"
color.toHsl()      // { h: 0, s: 100, l: 50, a: 1 }
color.toHslString()  // "hsl(0, 100%, 50%)"
color.toHsv()      // { h: 0, s: 100, v: 100, a: 1 }
color.toHwb()      // { h: 0, w: 0, b: 0, a: 1 }
color.toCmyk()     // { c: 0, m: 100, y: 100, k: 0 }`,
  },
  {
    id: 'manipulation',
    title: 'Color Manipulation',
    content: `
      <p>Manipulate colors with various operations:</p>
    `,
    code: `import { ColorClass, lighten, darken, saturate, desaturate, spin } from '@oxog/colorkit'

const color = new ColorClass(100, 0, 0)

// Chain operations for combined effects
const result = color
  .lighten(20)    // Lighten by 20%
  .saturate(30)   // Saturate by 30%
  .spin(45)       // Rotate hue by 45°

// Or use standalone functions
const lighter = lighten(color, 20)
const darker = darken(color, 20)
const saturated = saturate(color, 30)
const desaturated = desaturate(color, 30)
const rotated = spin(color, 45)`,
  },
  {
    id: 'mixing',
    title: 'Color Mixing',
    content: `
      <p>Mix colors together in various ways:</p>
    `,
    code: `import { mix, tint, shade, tone, blend } from '@oxog/colorkit'
import { ColorClass } from '@oxog/colorkit'

const red = new ColorClass(255, 0, 0)
const blue = new ColorClass(0, 0, 255)

// Mix two colors
const purple = mix(red, blue, 0.5)

// Tint (mix with white)
const pink = tint(red, 30)

// Shade (mix with black)
const darkRed = shade(red, 30)

// Tone (mix with gray)
const mutedRed = tone(red, 30)

// Blend with blend mode
const blended = blend(red, blue, 'multiply')`,
  },
  {
    id: 'harmony',
    title: 'Color Harmony',
    content: `
      <p>Generate color harmonies:</p>
    `,
    code: `import { getComplementary, getTriadic } from '@oxog/colorkit'

// Complementary color (180° apart)
const [complementary] = getComplementary('#ff0000')
// Returns cyan

// Triadic colors (120° apart)
const [color1, color2, color3] = getTriadic('#ff0000')
// Returns red, green, blue`,
  },
  {
    id: 'palettes',
    title: 'Palette Generation',
    content: `
      <p>Generate color palettes:</p>
    `,
    code: `import { generateTints, generateShades, generatePalette } from '@oxog/colorkit'

// Generate tints (lighter variations)
const tints = generateTints('#ff0000', 5)
// [original, light1, light2, light3, light4]

// Generate shades (darker variations)
const shades = generateShades('#ff0000', 5)
// [original, dark1, dark2, dark3, dark4]

// Generate full palette (Tailwind-style)
const palette = generatePalette('#ff0000')
// { 50: "#ff8080", 100: "#ff6666", ..., 950: "#500000" }`,
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    content: `
      <p>Ensure your colors meet accessibility standards:</p>
    `,
    code: `import { getContrast, getReadableColor } from '@oxog/colorkit'

// Calculate WCAG contrast ratio
const contrast = getContrast('#ffffff', '#000000')
// Returns 21 (maximum contrast)

// Get readable foreground color
const foreground = getReadableColor('#ff0000')
// Returns white (best contrast for red background)

// Check if contrast meets WCAG standards
const isAA = contrast >= 4.5  // AA standard
const isAAA = contrast >= 7    // AAA standard`,
  },
  {
    id: 'color-picker',
    title: 'Color Picker Component',
    content: `
      <p>Use the headless ColorPicker class to build your own color picker UI:</p>
    `,
    code: `import { ColorPicker, createColorPicker } from '@oxog/colorkit'

// Create picker instance
const picker = new ColorPicker({
  value: '#ff0000',
  onChange: (color) => console.log('Color changed:', color)
})

// Get current value
const color = picker.getValue()

// Set new value
picker.setValue('#00ff00')

// Subscribe to changes
const unsubscribe = picker.subscribe((color) => {
  console.log('New color:', color.toHex())
})

// Get props for your UI elements
const inputProps = picker.getInputProps()
const colorAreaProps = picker.getColorAreaProps()
const hueSliderProps = picker.getHueSliderProps()
const alphaSliderProps = picker.getAlphaSliderProps()

// Example: Use in React
function MyColorPicker() {
  return (
    <div>
      <input {...inputProps} />
      <div {...colorAreaProps} style={{ width: 200, height: 150 }} />
      <input type="range" {...hueSliderProps} />
      <input type="range" {...alphaSliderProps} />
    </div>
  )
}`,
  },
  {
    id: 'tree-shaking',
    title: 'Tree Shaking',
    content: `
      <p>ColorKit is fully tree-shakeable. Import only what you need:</p>
    `,
    code: `// Import specific functions (recommended)
import { lighten, darken } from '@oxog/colorkit'

// Import from sub-paths (even better)
import { lighten } from '@oxog/colorkit/manipulation'
import { mix } from '@oxog/colorkit/mixing'

// Your bundler will only include what you use`,
  },
  {
    id: 'typescript',
    title: 'TypeScript Support',
    content: `
      <p>ColorKit is written in TypeScript and provides excellent type safety:</p>
    `,
    code: `import type { ColorInput, RgbaColor, HslaColor } from '@oxog/colorkit'
import { ColorClass } from '@oxog/colorkit'

// Type-safe color input
function adjustColor(color: ColorInput, amount: number) {
  const c = new ColorClass(color)
  return c.lighten(amount)
}

// Type-safe conversions
const rgb: RgbaColor = { r: 255, g: 0, b: 0, a: 1 }
const hsl: HslaColor = { h: 0, s: 100, l: 50, a: 1 }

// Full autocomplete support
const color = new ColorClass(255, 0, 0)
color.toHex()   // TypeScript knows this returns string
color.toRgb()   // TypeScript knows this returns RgbaColor
color.lighten() // TypeScript shows all available methods`,
  },
]
