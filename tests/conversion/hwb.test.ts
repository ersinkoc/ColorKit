import { describe, it, expect } from 'vitest'
import { rgbToHwb, hwbToRgb } from '../../src/conversion/hwb.js'
import type { RgbColor, HwbColor } from '../../src/types.js'

describe('rgbToHwb', () => {
  it('should convert black', () => {
    const black: RgbColor = { r: 0, g: 0, b: 0 }
    expect(rgbToHwb(black)).toEqual({ h: 0, w: 0, b: 100, a: 1 })
  })

  it('should convert white', () => {
    const white: RgbColor = { r: 255, g: 255, b: 255 }
    expect(rgbToHwb(white)).toEqual({ h: 0, w: 100, b: 0, a: 1 })
  })

  it('should convert red', () => {
    const red: RgbColor = { r: 255, g: 0, b: 0 }
    const hwb = rgbToHwb(red)
    expect(hwb.h).toBe(0)
  })

  it('should preserve alpha', () => {
    const rgba = { r: 255, g: 0, b: 0, a: 0.5 }
    expect(rgbToHwb(rgba).a).toBe(0.5)
  })
})

describe('hwbToRgb', () => {
  it('should convert black', () => {
    const black: HwbColor = { h: 0, w: 0, b: 100 }
    expect(hwbToRgb(black)).toEqual({ r: 0, g: 0, b: 0, a: 1 })
  })

  it('should convert white', () => {
    const white: HwbColor = { h: 0, w: 100, b: 0 }
    expect(hwbToRgb(white)).toEqual({ r: 255, g: 255, b: 255, a: 1 })
  })

  it('should preserve alpha', () => {
    const hwb: HwbColor = { h: 0, w: 50, b: 0, a: 0.5 }
    expect(hwbToRgb(hwb).a).toBe(0.5)
  })
})

describe('round-trip RGB <-> HWB', () => {
  it('should maintain data integrity', () => {
    const original: RgbColor = { r: 255, g: 128, b: 0 }
    const hwb = rgbToHwb(original)
    const back = hwbToRgb(hwb)

    expect(back.r).toBeCloseTo(original.r, 0)
    expect(back.g).toBeCloseTo(original.g, 0)
    expect(back.b).toBeCloseTo(original.b, 0)
  })
})
