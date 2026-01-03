import { describe, it, expect } from 'vitest'
import { tint, shade, tone } from '../../src/mixing/tint.js'
import { ColorClass } from '../../src/core/color.js'

describe('tint', () => {
  it('should mix color with white', () => {
    const color = new ColorClass(255, 0, 0)
    const tinted = tint(color, 50)

    // Should be lighter (closer to white)
    const originalL = color.toHsl().l
    const tintedL = tinted.toHsl().l
    expect(tintedL).toBeGreaterThan(originalL)
  })

  it('should accept HEX string', () => {
    const tinted = tint('#ff0000', 50)
    expect(tinted).toBeInstanceOf(ColorClass)
  })

  it('should default to 10%', () => {
    const color = new ColorClass(128, 0, 0)
    const tinted = tint(color)
    expect(tinted).toBeInstanceOf(ColorClass)
  })

  it('should return white at 100%', () => {
    const color = new ColorClass(255, 0, 0)
    const tinted = tint(color, 100)
    expect(tinted.toHex()).toBe('#ffffff')
  })

  it('should return original at 0%', () => {
    const color = new ColorClass(255, 0, 0)
    const tinted = tint(color, 0)
    expect(tinted.toHex()).toBe(color.toHex())
  })

  it('should preserve alpha', () => {
    const color = new ColorClass(255, 0, 0, 0.5)
    const tinted = tint(color, 50)
    expect(tinted.alpha()).toBe(0.5)
  })
})

describe('shade', () => {
  it('should mix color with black', () => {
    const color = new ColorClass(255, 0, 0)
    const shaded = shade(color, 50)

    // Should be darker (closer to black)
    const originalL = color.toHsl().l
    const shadedL = shaded.toHsl().l
    expect(shadedL).toBeLessThan(originalL)
  })

  it('should accept HEX string', () => {
    const shaded = shade('#ff0000', 50)
    expect(shaded).toBeInstanceOf(ColorClass)
  })

  it('should return black at 100%', () => {
    const color = new ColorClass(255, 0, 0)
    const shaded = shade(color, 100)
    expect(shaded.toHex()).toBe('#000000')
  })

  it('should return original at 0%', () => {
    const color = new ColorClass(255, 0, 0)
    const shaded = shade(color, 0)
    expect(shaded.toHex()).toBe(color.toHex())
  })

  it('should preserve alpha', () => {
    const color = new ColorClass(255, 0, 0, 0.5)
    const shaded = shade(color, 50)
    expect(shaded.alpha()).toBe(0.5)
  })
})

describe('tone', () => {
  it('should mix color with gray', () => {
    const color = new ColorClass(255, 0, 0)
    const toned = tone(color, 50)

    // Should be less saturated
    const originalS = color.toHsl().s
    const tonedS = toned.toHsl().s
    expect(tonedS).toBeLessThan(originalS)
  })

  it('should accept HEX string', () => {
    const toned = tone('#ff0000', 50)
    expect(toned).toBeInstanceOf(ColorClass)
  })

  it('should return gray at 100%', () => {
    const color = new ColorClass(255, 0, 0)
    const toned = tone(color, 100)
    expect(toned.toHex()).toBe('#808080')
  })

  it('should return original at 0%', () => {
    const color = new ColorClass(255, 0, 0)
    const toned = tone(color, 0)
    expect(toned.toHex()).toBe(color.toHex())
  })

  it('should preserve alpha', () => {
    const color = new ColorClass(255, 0, 0, 0.5)
    const toned = tone(color, 50)
    expect(toned.alpha()).toBe(0.5)
  })
})
