import { ColorClass, mix, tint, shade, getComplementary, getTriadic, generatePalette, getContrast } from '@oxog/colorkit'

export const examplesData = [
  {
    id: 'color-creation',
    title: 'Color Creation',
    description: 'Create colors from different formats',
    code: `import { ColorClass } from '@oxog/colorkit'

// From RGB
const c1 = new ColorClass(255, 0, 0)

// From HEX
const c2 = new ColorClass('#ff0000')

// From HSL
const c3 = new ColorClass({ h: 0, s: 100, l: 50 })

console.log(c1.toHex()) // "#ff0000"
console.log(c2.toHex()) // "#ff0000"
console.log(c3.toHex()) // "#ff0000"`,
    result: (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ width: '50px', height: '50px', background: '#ff0000', borderRadius: '0.5rem' }} />
          <small>RGB</small>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ width: '50px', height: '50px', background: '#ff0000', borderRadius: '0.5rem' }} />
          <small>HEX</small>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ width: '50px', height: '50px', background: '#ff0000', borderRadius: '0.5rem' }} />
          <small>HSL</small>
        </div>
      </div>
    ),
  },
  {
    id: 'color-conversion',
    title: 'Color Conversion',
    description: 'Convert between color formats',
    code: `import { ColorClass } from '@oxog/colorkit'

const color = new ColorClass(255, 0, 0)

console.log(color.toHex())      // "#ff0000"
console.log(color.toRgb())      // { r: 255, g: 0, b: 0, a: 1 }
console.log(color.toHsl())      // { h: 0, s: 100, l: 50, a: 1 }
console.log(color.toHsv())      // { h: 0, s: 100, v: 100, a: 1 }
console.log(color.toCmyk())     // { c: 0, m: 100, y: 100, k: 0 }`,
    result: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--color-bg)', borderRadius: '0.25rem' }}>
          <span>HEX</span>
          <code style={{ color: 'var(--color-primary)' }}>#ff0000</code>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--color-bg)', borderRadius: '0.25rem' }}>
          <span>RGB</span>
          <code style={{ color: 'var(--color-primary)' }}>rgb(255, 0, 0)</code>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--color-bg)', borderRadius: '0.25rem' }}>
          <span>HSL</span>
          <code style={{ color: 'var(--color-primary)' }}>hsl(0, 100%, 50%)</code>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--color-bg)', borderRadius: '0.25rem' }}>
          <span>HSV</span>
          <code style={{ color: 'var(--color-primary)' }}>hsv(0, 100%, 100%)</code>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', background: 'var(--color-bg)', borderRadius: '0.25rem' }}>
          <span>CMYK</span>
          <code style={{ color: 'var(--color-primary)' }}>cmyk(0, 100, 100, 0)</code>
        </div>
      </div>
    ),
  },
  {
    id: 'color-manipulation',
    title: 'Color Manipulation',
    description: 'Lighten, darken, saturate, and more',
    code: `import { ColorClass } from '@oxog/colorkit'

const color = new ColorClass(150, 0, 0)

console.log(color.lighten(30).toHex())   // "#bb4d4d"
console.log(color.darken(30).toHex())    // "#680000"
console.log(color.saturate(30).toHex())  // "#d40000"
console.log(color.desaturate(30).toHex()) // "#8a3636"`,
    result: (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Original', color: '#960000' },
          { label: 'Lighten', color: '#bb4d4d' },
          { label: 'Darken', color: '#680000' },
          { label: 'Saturate', color: '#d40000' },
          { label: 'Desaturate', color: '#8a3636' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: item.color, borderRadius: '0.5rem', border: '1px solid var(--color-border)' }} />
            <small>{item.label}</small>
            <code style={{ fontSize: '0.75rem' }}>{item.color}</code>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'color-mixing',
    title: 'Color Mixing',
    description: 'Mix colors together',
    code: `import { mix, tint, shade } from '@oxog/colorkit'

const red = new ColorClass(255, 0, 0)
const blue = new ColorClass(0, 0, 255)

// Mix two colors
const purple = mix(red, blue, 0.5)

// Tint (mix with white)
const pink = tint(red, 30)

// Shade (mix with black)
const darkRed = shade(red, 30)`,
    result: (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Red', color: '#ff0000' },
          { label: 'Blue', color: '#0000ff' },
          { label: 'Mix (50%)', color: '#800080' },
          { label: 'Tint', color: '#ff4d4d' },
          { label: 'Shade', color: '#b30000' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '60px', height: '60px', background: item.color, borderRadius: '0.5rem', border: '1px solid var(--color-border)' }} />
            <small>{item.label}</small>
            <code style={{ fontSize: '0.75rem' }}>{item.color}</code>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'color-harmony',
    title: 'Color Harmony',
    description: 'Generate harmonious color schemes',
    code: `import { getComplementary, getTriadic } from '@oxog/colorkit'

// Complementary (opposite on color wheel)
const [complementary] = getComplementary('#ff0000')
console.log(complementary.toHex()) // "#00ffff" (cyan)

// Triadic (3 colors, 120° apart)
const [c1, c2, c3] = getTriadic('#ff0000')
console.log(c1.toHex()) // "#ff0000" (red)
console.log(c2.toHex()) // "#00ff00" (green)
console.log(c3.toHex()) // "#0000ff" (blue)`,
    result: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Complementary</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[
              { label: 'Red', color: '#ff0000' },
              { label: 'Cyan', color: '#00ffff' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', background: item.color, borderRadius: '0.5rem', border: '1px solid var(--color-border)' }} />
                <small>{item.label}</small>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>Triadic</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[
              { label: 'Red', color: '#ff0000' },
              { label: 'Green', color: '#00ff00' },
              { label: 'Blue', color: '#0000ff' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', background: item.color, borderRadius: '0.5rem', border: '1px solid var(--color-border)' }} />
                <small>{item.label}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'palette-generation',
    title: 'Palette Generation',
    description: 'Generate complete color palettes',
    code: `import { generatePalette } from '@oxog/colorkit'

const palette = generatePalette('#ff0000')
// Returns: {
//   50: "#ff8080",
//   100: "#ff6666",
//   200: "#ff4d4d",
//   300: "#ff3333",
//   400: "#ff1a1a",
//   500: "#ff0000",
//   600: "#e60000",
//   700: "#b30000",
//   800: "#800000",
//   900: "#4d0000",
//   950: "#500000"
// }`,
    result: (
      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
        {[
          { key: '50', color: '#ff8080' },
          { key: '100', color: '#ff6666' },
          { key: '200', color: '#ff4d4d' },
          { key: '300', color: '#ff3333' },
          { key: '400', color: '#ff1a1a' },
          { key: '500', color: '#ff0000' },
          { key: '600', color: '#e60000' },
          { key: '700', color: '#b30000' },
          { key: '800', color: '#800000' },
          { key: '900', color: '#4d0000' },
          { key: '950', color: '#500000' },
        ].map((item) => (
          <div key={item.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '60px', background: item.color, borderRadius: '0.25rem' }} />
            <small style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--color-text-secondary)' }}>{item.key}</small>
          </div>
        ))}
      </div>
    ),
  },
]
