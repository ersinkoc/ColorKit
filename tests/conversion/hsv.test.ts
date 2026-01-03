import { describe, it, expect } from 'vitest'
import { rgbToHsv, hsvToRgb, hsvToHsl, hslToHsv } from '../../src/conversion/hsv.js'
import type { RgbColor, RgbaColor, HsvaColor, HslaColor } from '../../src/types.js'

describe('rgbToHsv', () => {
  it('should convert black', () => {
    const black: RgbColor = { r: 0, g: 0, b: 0 }
    expect(rgbToHsv(black)).toEqual({ h: 0, s: 0, v: 0, a: 1 })
  })

  it('should convert white', () => {
    const white: RgbColor = { r: 255, g: 255, b: 255 }
    expect(rgbToHsv(white)).toEqual({ h: 0, s: 0, v: 100, a: 1 })
  })

  it('should convert red', () => {
    const red: RgbColor = { r: 255, g: 0, b: 0 }
    expect(rgbToHsv(red)).toEqual({ h: 0, s: 100, v: 100, a: 1 })
  })

  it('should convert green', () => {
    const green: RgbColor = { r: 0, g: 255, b: 0 }
    expect(rgbToHsv(green)).toEqual({ h: 120, s: 100, v: 100, a: 1 })
  })

  it('should convert blue', () => {
    const blue: RgbColor = { r: 0, g: 0, b: 255 }
    expect(rgbToHsv(blue)).toEqual({ h: 240, s: 100, v: 100, a: 1 })
  })

  it('should preserve alpha from RGBA', () => {
    const rgba: RgbaColor = { r: 255, g: 0, b: 0, a: 0.5 }
    expect(rgbToHsv(rgba).a).toBe(0.5)
  })
})

describe('hsvToRgb', () => {
  it('should convert black', () => {
    const black: HsvaColor = { h: 0, s: 0, v: 0, a: 1 }
    expect(hsvToRgb(black)).toEqual({ r: 0, g: 0, b: 0, a: 1 })
  })

  it('should convert white', () => {
    const white: HsvaColor = { h: 0, s: 0, v: 100, a: 1 }
    expect(hsvToRgb(white)).toEqual({ r: 255, g: 255, b: 255, a: 1 })
  })

  it('should convert red', () => {
    const red: HsvaColor = { h: 0, s: 100, v: 100, a: 1 }
    expect(hsvToRgb(red)).toEqual({ r: 255, g: 0, b: 0, a: 1 })
  })

  it('should convert green', () => {
    const green: HsvaColor = { h: 120, s: 100, v: 100, a: 1 }
    expect(hsvToRgb(green)).toEqual({ r: 0, g: 255, b: 0, a: 1 })
  })

  it('should convert blue', () => {
    const blue: HsvaColor = { h: 240, s: 100, v: 100, a: 1 }
    expect(hsvToRgb(blue)).toEqual({ r: 0, g: 0, b: 255, a: 1 })
  })

  it('should preserve alpha', () => {
    const color: HsvaColor = { h: 0, s: 100, v: 100, a: 0.5 }
    expect(hsvToRgb(color).a).toBe(0.5)
  })
})

describe('hsvToHsl', () => {
  it('should convert HSV to HSL', () => {
    const hsv: HsvaColor = { h: 0, s: 100, v: 100, a: 1 }
    const hsl = hsvToHsl(hsv)
    expect(hsl.h).toBe(0)
    expect(hsl.s).toBe(100)
    expect(hsl.l).toBe(50)
  })

  it('should handle white', () => {
    const hsv: HsvaColor = { h: 0, s: 0, v: 100, a: 1 }
    const hsl = hsvToHsl(hsv)
    expect(hsl.h).toBe(0)
    expect(hsl.s).toBe(0)
    expect(hsl.l).toBe(100)
  })

  it('should preserve alpha', () => {
    const hsv: HsvaColor = { h: 0, s: 100, v: 100, a: 0.5 }
    expect(hsvToHsl(hsv).a).toBe(0.5)
  })
})

describe('hslToHsv', () => {
  it('should convert HSL to HSV', () => {
    const hsl: HslaColor = { h: 0, s: 100, l: 50, a: 1 }
    const hsv = hslToHsv(hsl)
    expect(hsv.h).toBe(0)
    expect(hsv.s).toBe(100)
    expect(hsv.v).toBe(100)
  })

  it('should handle white', () => {
    const hsl: HslaColor = { h: 0, s: 0, l: 100, a: 1 }
    const hsv = hslToHsv(hsl)
    expect(hsv.h).toBe(0)
    expect(hsv.s).toBe(0)
    expect(hsv.v).toBe(100)
  })

  it('should preserve alpha', () => {
    const hsl: HslaColor = { h: 0, s: 100, l: 50, a: 0.5 }
    expect(hslToHsv(hsl).a).toBe(0.5)
  })
})

describe('round-trip RGB <-> HSV', () => {
  it('should maintain data integrity', () => {
    const original: RgbColor = { r: 255, g: 128, b: 0 }
    const hsv = rgbToHsv(original)
    const back = hsvToRgb(hsv)

    expect(back.r).toBeCloseTo(original.r, 0)
    expect(back.g).toBeCloseTo(original.g, 0)
    expect(back.b).toBeCloseTo(original.b, 0)
  })
})
