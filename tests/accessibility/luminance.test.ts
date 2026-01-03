import { describe, it, expect } from 'vitest'
import { getLuminance } from '../../src/accessibility/luminance.js'
import { ColorClass } from '../../src/core/color.js'

describe('getLuminance', () => {
  it('should return 0 for black', () => {
    const black = new ColorClass(0, 0, 0)
    expect(getLuminance(black)).toBe(0)
  })

  it('should return 1 for white', () => {
    const white = new ColorClass(255, 255, 255)
    expect(getLuminance(white)).toBe(1)
  })

  it('should return mid value for gray', () => {
    const gray = new ColorClass(128, 128, 128)
    const lum = getLuminance(gray)
    expect(lum).toBeGreaterThan(0.1)
    expect(lum).toBeLessThan(0.3)
  })

  it('should accept HEX string', () => {
    expect(getLuminance('#000000')).toBe(0)
    expect(getLuminance('#ffffff')).toBe(1)
  })

  it('should accept RGB object', () => {
    expect(getLuminance({ r: 0, g: 0, b: 0, a: 1 })).toBe(0)
  })

  it('should use relative luminance formula', () => {
    // Based on WCAG formula
    const red = new ColorClass(255, 0, 0)
    const lum = getLuminance(red)
    expect(lum).toBeCloseTo(0.2126, 3)
  })

  it('should handle alpha channel', () => {
    const red = new ColorClass(255, 0, 0, 0.5)
    const lum = getLuminance(red)
    // Alpha should not affect luminance calculation
    expect(lum).toBeCloseTo(0.2126, 3)
  })
})
