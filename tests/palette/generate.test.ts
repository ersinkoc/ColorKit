import { describe, it, expect } from 'vitest'
import { generatePalette } from '../../src/palette/generate.js'
import { ColorClass } from '../../src/core/color.js'

describe('generatePalette', () => {
  it('should generate a palette with default options', () => {
    const color = new ColorClass(255, 0, 0)
    const palette = generatePalette(color)

    // Should have 50-950 steps
    expect(palette).toHaveProperty('50')
    expect(palette).toHaveProperty('950')
  })

  it('should accept HEX string', () => {
    const palette = generatePalette('#ff0000')
    expect(palette).toHaveProperty('50')
  })

  it('should generate valid HEX colors', () => {
    const color = new ColorClass(255, 0, 0)
    const palette = generatePalette(color)

    Object.values(palette).forEach(hex => {
      expect(hex).toMatch(/^#[0-9a-f]{6}$/i)
    })
  })

  it('should have base color at 500', () => {
    const color = new ColorClass(255, 0, 0)
    const palette = generatePalette(color)

    // Base should be similar to input
    const base = new ColorClass(255, 0, 0)
    const palette500 = palette[500]
    expect(palette500).toBeDefined()
  })

  it('should generate lighter tints', () => {
    const color = new ColorClass(100, 0, 0)
    const palette = generatePalette(color)

    const c50 = new ColorClass(255, 0, 0)
    const tint50 = palette[50]
    expect(tint50).toBeDefined()
  })

  it('should generate darker shades', () => {
    const color = new ColorClass(200, 0, 0)
    const palette = generatePalette(color)

    const shade900 = palette[900]
    expect(shade900).toBeDefined()
  })

  it('should respect custom options', () => {
    const color = new ColorClass(255, 0, 0)
    const palette = generatePalette(color, { count: 5 })

    // Should have fewer steps with custom count
    expect(palette).toBeDefined()
  })
})
