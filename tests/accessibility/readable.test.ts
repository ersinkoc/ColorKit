import { describe, it, expect } from 'vitest'
import { isReadable, getReadableColor, suggestForeground } from '../../src/accessibility/readable.js'
import { ColorClass } from '../../src/core/color.js'
import { parseColor } from '../../src/core/parse.js'

describe('isReadable', () => {
  it('should return true for black on white', () => {
    const black = new ColorClass(0, 0, 0)
    const white = new ColorClass(255, 255, 255)
    expect(isReadable(black, white, 'AA', 'normal')).toBe(true)
  })

  it('should return true for white on black', () => {
    const white = new ColorClass(255, 255, 255)
    const black = new ColorClass(0, 0, 0)
    expect(isReadable(white, black, 'AA', 'normal')).toBe(true)
  })

  it('should accept HEX strings', () => {
    expect(isReadable('#000000', '#ffffff', 'AA', 'normal')).toBe(true)
  })

  it('should check AAA standard', () => {
    const black = new ColorClass(0, 0, 0)
    const white = new ColorClass(255, 255, 255)
    expect(isReadable(black, white, 'AAA', 'normal')).toBe(true)
  })

  it('should check large text', () => {
    const black = new ColorClass(0, 0, 0)
    const gray = new ColorClass(150, 150, 150)
    // Large text has lower requirements
    expect(isReadable(black, gray, 'AA', 'large')).toBe(true)
  })
})

describe('getReadableColor', () => {
  it('should return black or white for contrast', () => {
    const color = new ColorClass(128, 128, 128)
    const readable = getReadableColor(color)
    const hex = readable.toHex()

    expect(['#000000', '#ffffff']).toContain(hex)
  })

  it('should return white for dark background', () => {
    const black = new ColorClass(0, 0, 0)
    const readable = getReadableColor(black)
    expect(readable.toHex()).toBe('#ffffff')
  })

  it('should return black for light background', () => {
    const white = new ColorClass(255, 255, 255)
    const readable = getReadableColor(white)
    expect(readable.toHex()).toBe('#000000')
  })

  it('should accept HEX string', () => {
    const readable = getReadableColor('#808080')
    expect(['#000000', '#ffffff']).toContain(readable.toHex())
  })
})

describe('suggestForeground', () => {
  it('should return black or white', () => {
    const color = new ColorClass(128, 128, 128)
    const suggested = suggestForeground(color)
    expect(['#000000', '#ffffff']).toContain(suggested)
  })

  it('should return white for dark backgrounds', () => {
    const black = new ColorClass(0, 0, 0)
    expect(suggestForeground(black)).toBe('#ffffff')
  })

  it('should return black for light backgrounds', () => {
    const white = new ColorClass(255, 255, 255)
    expect(suggestForeground(white)).toBe('#000000')
  })

  it('should accept HEX string', () => {
    const suggested = suggestForeground('#808080')
    expect(['#000000', '#ffffff']).toContain(suggested)
  })

  it('should ensure AA compliance', () => {
    // For a very dark background, white should be AA compliant
    const color = new ColorClass(30, 30, 30)
    const suggested = suggestForeground(color)
    const fg = parseColor(suggested)!

    expect(isReadable(fg, color, 'AA', 'normal')).toBe(true)
  })
})
