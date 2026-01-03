import { describe, it, expect } from 'vitest'
import { rgbToCmyk, cmykToRgb } from '../../src/conversion/cmyk.js'
import type { RgbColor, CmykColor } from '../../src/types.js'

describe('rgbToCmyk', () => {
  it('should convert black', () => {
    const black: RgbColor = { r: 0, g: 0, b: 0 }
    expect(rgbToCmyk(black)).toEqual({ c: 0, m: 0, y: 0, k: 100, a: 1 })
  })

  it('should convert white', () => {
    const white: RgbColor = { r: 255, g: 255, b: 255 }
    expect(rgbToCmyk(white)).toEqual({ c: 0, m: 0, y: 0, k: 0, a: 1 })
  })

  it('should convert red', () => {
    const red: RgbColor = { r: 255, g: 0, b: 0 }
    const cmyk = rgbToCmyk(red)
    expect(cmyk.c).toBe(0)
    expect(cmyk.m).toBe(100)
    expect(cmyk.y).toBe(100)
    expect(cmyk.k).toBe(0)
  })

  it('should convert green', () => {
    const green: RgbColor = { r: 0, g: 255, b: 0 }
    const cmyk = rgbToCmyk(green)
    expect(cmyk.c).toBe(100)
    expect(cmyk.m).toBe(0)
    expect(cmyk.y).toBe(100)
    expect(cmyk.k).toBe(0)
  })

  it('should convert blue', () => {
    const blue: RgbColor = { r: 0, g: 0, b: 255 }
    const cmyk = rgbToCmyk(blue)
    expect(cmyk.c).toBe(100)
    expect(cmyk.m).toBe(100)
    expect(cmyk.y).toBe(0)
    expect(cmyk.k).toBe(0)
  })

  it('should convert gray', () => {
    const gray: RgbColor = { r: 128, g: 128, b: 128 }
    const cmyk = rgbToCmyk(gray)
    // Gray uses K-generation formula: C=M=Y=0, K≈50%
    expect(cmyk.c).toBeCloseTo(0, 0)
    expect(cmyk.m).toBeCloseTo(0, 0)
    expect(cmyk.y).toBeCloseTo(0, 0)
    expect(cmyk.k).toBeCloseTo(50, 0)
  })
})

describe('cmykToRgb', () => {
  it('should convert black', () => {
    const black: CmykColor = { c: 0, m: 0, y: 0, k: 100 }
    expect(cmykToRgb(black)).toEqual({ r: 0, g: 0, b: 0, a: 1 })
  })

  it('should convert white', () => {
    const white: CmykColor = { c: 0, m: 0, y: 0, k: 0 }
    expect(cmykToRgb(white)).toEqual({ r: 255, g: 255, b: 255, a: 1 })
  })

  it('should convert red', () => {
    const red: CmykColor = { c: 0, m: 100, y: 100, k: 0 }
    expect(cmykToRgb(red)).toEqual({ r: 255, g: 0, b: 0, a: 1 })
  })

  it('should convert green', () => {
    const green: CmykColor = { c: 100, m: 0, y: 100, k: 0 }
    expect(cmykToRgb(green)).toEqual({ r: 0, g: 255, b: 0, a: 1 })
  })

  it('should convert blue', () => {
    const blue: CmykColor = { c: 100, m: 100, y: 0, k: 0 }
    expect(cmykToRgb(blue)).toEqual({ r: 0, g: 0, b: 255, a: 1 })
  })
})

describe('round-trip RGB <-> CMYK', () => {
  it('should maintain data integrity', () => {
    const original: RgbColor = { r: 255, g: 128, b: 0 }
    const cmyk = rgbToCmyk(original)
    const back = cmykToRgb(cmyk)

    // CMYK has smaller gamut, so we allow some difference
    expect(back.r).toBeGreaterThan(200)
    expect(back.g).toBeGreaterThan(100)
    expect(back.b).toBeLessThan(50)
  })

  it('should handle primary colors exactly', () => {
    const colors: RgbColor[] = [
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },
    ]

    colors.forEach(color => {
      const cmyk = rgbToCmyk(color)
      const back = cmykToRgb(cmyk)
      expect(back).toEqual({ ...color, a: 1 })
    })
  })
})
