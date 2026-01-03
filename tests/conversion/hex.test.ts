import { describe, it, expect } from 'vitest'
import { hexToRgb, rgbToHex, rgbToHex8 } from '../../src/conversion/hex.js'
import type { RgbColor, RgbaColor } from '../../src/types.js'

describe('hexToRgb', () => {
  it('should parse 3-digit HEX', () => {
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0, a: 1 })
    expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    expect(hexToRgb('abc')).toEqual({ r: 170, g: 187, b: 204, a: 1 })
  })

  it('should parse 6-digit HEX', () => {
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0, a: 1 })
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 })
    expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0, a: 1 })
    expect(hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255, a: 1 })
  })

  it('should parse 8-digit HEX with alpha', () => {
    expect(hexToRgb('#ffffff00')).toEqual({ r: 255, g: 255, b: 255, a: 0 })
    expect(hexToRgb('#ffffff80')).toEqual({ r: 255, g: 255, b: 255, a: 0.5 })
    expect(hexToRgb('#ffffffff')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
  })

  it('should parse 4-digit HEX with alpha', () => {
    expect(hexToRgb('#fff0')).toEqual({ r: 255, g: 255, b: 255, a: 0 })
    expect(hexToRgb('#fff8')).toEqual({ r: 255, g: 255, b: 255, a: 0.53 })
  })

  it('should handle uppercase and lowercase', () => {
    expect(hexToRgb('#ABC')).toEqual(hexToRgb('#abc'))
    expect(hexToRgb('#ABCDEF')).toEqual(hexToRgb('#abcdef'))
  })

  it('should handle without # prefix', () => {
    expect(hexToRgb('fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
    expect(hexToRgb('ffffff')).toEqual({ r: 255, g: 255, b: 255, a: 1 })
  })

  it('should throw on invalid HEX', () => {
    expect(() => hexToRgb('ggg')).toThrow()
    expect(() => hexToRgb('#gg')).toThrow()
    expect(() => hexToRgb('#1')).toThrow()
    expect(() => hexToRgb('#12')).toThrow()
    expect(() => hexToRgb('#12345')).toThrow()
    expect(() => hexToRgb('#1234567')).toThrow()
    expect(() => hexToRgb('#123456789')).toThrow()
  })
})

describe('rgbToHex', () => {
  it('should convert RGB to 6-digit HEX', () => {
    const white: RgbColor = { r: 255, g: 255, b: 255 }
    expect(rgbToHex(white)).toBe('#ffffff')

    const black: RgbColor = { r: 0, g: 0, b: 0 }
    expect(rgbToHex(black)).toBe('#000000')

    const red: RgbColor = { r: 255, g: 0, b: 0 }
    expect(rgbToHex(red)).toBe('#ff0000')
  })

  it('should handle mid-range values', () => {
    const gray: RgbColor = { r: 128, g: 128, b: 128 }
    expect(rgbToHex(gray)).toBe('#808080')
  })

  it('should pad with zeros', () => {
    const color: RgbColor = { r: 1, g: 2, b: 3 }
    expect(rgbToHex(color)).toBe('#010203')
  })
})

describe('rgbToHex8', () => {
  it('should convert RGBA to 8-digit HEX', () => {
    const white: RgbaColor = { r: 255, g: 255, b: 255, a: 1 }
    expect(rgbToHex8(white)).toBe('#ffffff')

    const whiteTransparent: RgbaColor = { r: 255, g: 255, b: 255, a: 0 }
    expect(rgbToHex8(whiteTransparent)).toBe('#ffffff00')

    const whiteHalf: RgbaColor = { r: 255, g: 255, b: 255, a: 0.5 }
    expect(rgbToHex8(whiteHalf)).toBe('#ffffff80')
  })

  it('should round alpha to nearest byte', () => {
    const color: RgbaColor = { r: 255, g: 255, b: 255, a: 0.53 }
    expect(rgbToHex8(color)).toBe('#ffffff87')
  })
})

describe('round-trip conversion', () => {
  it('should maintain data integrity', () => {
    const original = '#ff8000'
    const rgb = hexToRgb(original)
    const back = rgbToHex(rgb as RgbColor)
    expect(back).toBe(original)
  })

  it('should handle alpha in round-trip', () => {
    const original = '#ff800080'
    const rgb = hexToRgb(original)
    const back = rgbToHex8(rgb)
    expect(back).toBe(original)
  })
})
