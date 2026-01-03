import { describe, it, expect } from 'vitest'
import { generateShades } from '../../src/palette/shades.js'
import { ColorClass } from '../../src/core/color.js'

describe('generateShades', () => {
  it('should generate default number of shades', () => {
    const color = new ColorClass(255, 0, 0)
    const shades = generateShades(color)

    expect(shades).toHaveLength(11) // default count
  })

  it('should generate darker colors', () => {
    const color = new ColorClass(200, 0, 0)
    const shades = generateShades(color)

    // First shade should be original
    expect(shades[0]?.toHex()).toBe(color.toHex())

    // Last shade should be darker
    const originalL = color.toHsl().l
    const lastL = shades[shades.length - 1]?.toHsl().l
    expect(lastL).toBeLessThan(originalL)
  })

  it('should accept HEX string', () => {
    const shades = generateShades('#ff0000')
    expect(shades).toHaveLength(11)
  })

  it('should accept RGB object', () => {
    const shades = generateShades({ r: 255, g: 0, b: 0 })
    expect(shades).toHaveLength(11)
  })

  it('should respect custom count', () => {
    const color = new ColorClass(255, 0, 0)
    const shades = generateShades(color, 5)

    expect(shades).toHaveLength(5)
  })

  it('should preserve alpha', () => {
    const color = new ColorClass(255, 0, 0, 0.5)
    const shades = generateShades(color)

    shades.forEach(shade => {
      expect(shade.alpha()).toBe(0.5)
    })
  })

  it('should return ColorClass instances', () => {
    const color = new ColorClass(255, 0, 0)
    const shades = generateShades(color)

    shades.forEach(shade => {
      expect(shade).toBeInstanceOf(ColorClass)
    })
  })
})
