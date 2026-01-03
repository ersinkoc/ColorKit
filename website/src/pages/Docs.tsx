import { CodeBlock } from '../components/CodeBlock'
import './Docs.css'

export function Docs() {
  return (
    <div className="docs-page">
      <h1>Documentation</h1>

      <section className="doc-section">
        <h2>Installation</h2>
        <CodeBlock language="bash" code={`npm install @oxog/colorkit
# or
yarn add @oxog/colorkit
# or
pnpm add @oxog/colorkit`} />
      </section>

      <section className="doc-section">
        <h2>Quick Start</h2>
        <p>Create colors in multiple ways:</p>
        <CodeBlock language="typescript" code={`import { ColorClass } from '@oxog/colorkit'

// From RGB
const c1 = new ColorClass(255, 0, 0)

// From HEX
const c2 = new ColorClass('#ff0000')

// From RGB object
const c3 = new ColorClass({ r: 255, g: 0, b: 0 })

console.log(c1.toHex()) // "#ff0000"
console.log(c2.toHex()) // "#ff0000"
console.log(c3.toHex()) // "#ff0000"`} />
      </section>

      <section className="doc-section">
        <h2>Color Conversion</h2>
        <p>Convert between different color formats:</p>
        <CodeBlock language="typescript" code={`const color = new ColorClass(255, 0, 0)

color.toHex()      // "#ff0000"
color.toRgb()      // { r: 255, g: 0, b: 0, a: 1 }
color.toHsl()      // { h: 0, s: 100, l: 50, a: 1 }
color.toHsv()      // { h: 0, s: 100, v: 100, a: 1 }
color.toCmyk()     // { c: 0, m: 100, y: 100, k: 0 }`} />
      </section>

      <section className="doc-section">
        <h2>Color Manipulation</h2>
        <p>Manipulate colors with various operations:</p>
        <CodeBlock language="typescript" code={`import { lighten, darken, saturate } from '@oxog/colorkit'

const color = new ColorClass(150, 0, 0)

// Chain operations
const result = color.lighten(20).saturate(30)

// Or use standalone functions
const lighter = lighten(color, 20)
const darker = darken(color, 20)
const saturated = saturate(color, 30)`} />
      </section>

      <section className="doc-section">
        <h2>Color Mixing</h2>
        <p>Mix colors together:</p>
        <CodeBlock language="typescript" code={`import { mix, tint, shade } from '@oxog/colorkit'

const red = new ColorClass(255, 0, 0)
const blue = new ColorClass(0, 0, 255)

// Mix two colors
const purple = mix(red, blue, 0.5)

// Tint (mix with white)
const pink = tint(red, 30)

// Shade (mix with black)
const darkRed = shade(red, 30)`} />
      </section>

      <section className="doc-section">
        <h2>Color Harmony</h2>
        <p>Generate color harmonies:</p>
        <CodeBlock language="typescript" code={`import { getComplementary, getTriadic } from '@oxog/colorkit'

// Complementary (180° apart)
const [comp] = getComplementary('#ff0000')

// Triadic (120° apart)
const [c1, c2, c3] = getTriadic('#ff0000')`} />
      </section>

      <section className="doc-section">
        <h2>Palette Generation</h2>
        <p>Generate color palettes:</p>
        <CodeBlock language="typescript" code={`import { generatePalette } from '@oxog/colorkit'

const palette = generatePalette('#ff0000')
// { 50: "#ff8080", 100: "#ff6666", ..., 950: "#500000" }`} />
      </section>
    </div>
  )
}
