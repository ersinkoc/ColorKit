import { describe, it, expect } from 'vitest'
import { getComplementary } from '../../src/harmony/complementary.js'
import { ColorClass } from '../../src/core/color.js'

describe('getComplementary', () => {
  it('should return complementary color', () => {
    const color = new ColorClass(255, 0, 0) // Red (hue 0)
    const complementary = getComplementary(color)

    // Complementary should be opposite on color wheel (180 degrees)
    expect(complementary).toHaveLength(1)
    expect(complementary[0]).toBeInstanceOf(ColorClass)

    const hsl = complementary[0].toHsl()
    expect(hsl.h).toBe(180) // Cyan
  })

  it('should accept HEX string', () => {
    const complementary = getComplementary('#ff0000')
    expect(complementary).toHaveLength(1)
  })

  it('should accept RGB object', () => {
    const complementary = getComplementary({ r: 255, g: 0, b: 0 })
    expect(complementary).toHaveLength(1)
  })

  it('should work with blue', () => {
    const color = new ColorClass(0, 0, 255) // Blue (hue 240)
    const complementary = getComplementary(color)

    const hsl = complementary[0].toHsl()
    expect(hsl.h).toBe(60) // Yellow
  })

  it('should preserve saturation', () => {
    const color = new ColorClass(255, 0, 0) // 100% saturated
    const complementary = getComplementary(color)

    const hsl = complementary[0].toHsl()
    expect(hsl.s).toBe(100)
  })

  it('should preserve lightness', () => {
    const color = new ColorClass(255, 0, 0) // 50% lightness
    const complementary = getComplementary(color)

    const hsl = complementary[0].toHsl()
    expect(hsl.l).toBe(50)
  })

  it('should preserve alpha', () => {
    const color = new ColorClass(255, 0, 0, 0.5)
    const complementary = getComplementary(color)

    expect(complementary[0].alpha()).toBe(0.5)
  })
})
