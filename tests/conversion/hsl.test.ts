import { describe, it, expect } from 'vitest'
import { rgbToHsl, hslToRgb } from '../../src/conversion/hsl.js'
import type { RgbColor, RgbaColor, HslaColor } from '../../src/types.js'

describe('rgbToHsl', () => {
  it('should convert black', () => {
    const black: RgbColor = { r: 0, g: 0, b: 0 }
    expect(rgbToHsl(black)).toEqual({ h: 0, s: 0, l: 0, a: 1 })
  })

  it('should convert white', () => {
    const white: RgbColor = { r: 255, g: 255, b: 255 }
    expect(rgbToHsl(white)).toEqual({ h: 0, s: 0, l: 100, a: 1 })
  })

  it('should convert red', () => {
    const red: RgbColor = { r: 255, g: 0, b: 0 }
    const hsl = rgbToHsl(red)
    expect(hsl.h).toBe(0)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
    expect(hsl.a).toBe(1)
  })

  it('should convert green', () => {
    const green: RgbColor = { r: 0, g: 255, b: 0 }
    const hsl = rgbToHsl(green)
    expect(hsl.h).toBe(120)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })

  it('should convert blue', () => {
    const blue: RgbColor = { r: 0, g: 0, b: 255 }
    const hsl = rgbToHsl(blue)
    expect(hsl.h).toBe(240)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })

  it('should convert gray', () => {
    const gray: RgbColor = { r: 128, g: 128, b: 128 }
    const hsl = rgbToHsl(gray)
    expect(hsl.s).toBe(0)
    expect(hsl.l).toBeCloseTo(50.2, 0)
  })

  it('should preserve alpha from RGBA', () => {
    const rgba: RgbaColor = { r: 255, g: 0, b: 0, a: 0.5 }
    expect(rgbToHsl(rgba).a).toBe(0.5)
  })

  it('should default alpha to 1 for RGB', () => {
    const rgb: RgbColor = { r: 255, g: 0, b: 0 }
    expect(rgbToHsl(rgb).a).toBe(1)
  })
})

describe('hslToRgb', () => {
  it('should convert black', () => {
    const black: HslaColor = { h: 0, s: 0, l: 0, a: 1 }
    expect(hslToRgb(black)).toEqual({ r: 0, g: 0, b: 0, a: 1 })
  })

  it('should convert white', () => {
    const white: HslaColor = { h: 0, s: 0, l: 100, a: 1 }
    expect(hslToRgb(white)).toEqual({ r: 255, g: 255, b: 255, a: 1 })
  })

  it('should convert red', () => {
    const red: HslaColor = { h: 0, s: 100, l: 50, a: 1 }
    expect(hslToRgb(red)).toEqual({ r: 255, g: 0, b: 0, a: 1 })
  })

  it('should convert green', () => {
    const green: HslaColor = { h: 120, s: 100, l: 50, a: 1 }
    expect(hslToRgb(green)).toEqual({ r: 0, g: 255, b: 0, a: 1 })
  })

  it('should convert blue', () => {
    const blue: HslaColor = { h: 240, s: 100, l: 50, a: 1 }
    expect(hslToRgb(blue)).toEqual({ r: 0, g: 0, b: 255, a: 1 })
  })

  it('should handle zero saturation', () => {
    const gray: HslaColor = { h: 180, s: 0, l: 50, a: 1 }
    const result = hslToRgb(gray)
    expect(result.r).toBe(result.g)
    expect(result.g).toBe(result.b)
  })

  it('should preserve alpha', () => {
    const color: HslaColor = { h: 0, s: 100, l: 50, a: 0.5 }
    expect(hslToRgb(color).a).toBe(0.5)
  })

  it('should handle hue wraparound', () => {
    const hsla: HslaColor = { h: 360, s: 100, l: 50, a: 1 }
    expect(hslToRgb(hsla)).toEqual({ r: 255, g: 0, b: 0, a: 1 })
  })
})

describe('round-trip RGB <-> HSL', () => {
  it('should maintain data integrity', () => {
    const original: RgbColor = { r: 255, g: 128, b: 0 }
    const hsl = rgbToHsl(original)
    const back = hslToRgb(hsl)

    // Allow small rounding differences
    expect(back.r).toBeCloseTo(original.r, 0)
    expect(back.g).toBeCloseTo(original.g, 0)
    expect(back.b).toBeCloseTo(original.b, 0)
  })

  it('should handle edge colors', () => {
    const colors: RgbColor[] = [
      { r: 0, g: 0, b: 0 },
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 0, b: 0 },
      { r: 0, g: 255, b: 0 },
      { r: 0, g: 0, b: 255 },
    ]

    colors.forEach(color => {
      const hsl = rgbToHsl(color)
      const back = hslToRgb(hsl)
      expect(back).toEqual({ ...color, a: 1 })
    })
  })
})
