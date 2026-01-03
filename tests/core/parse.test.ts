import { describe, it, expect } from 'vitest'
import { parseColor, detectFormat } from '../../src/core/parse.js'
import { ColorClass } from '../../src/core/color.js'

describe('parseColor', () => {
  describe('HEX colors', () => {
    it('should parse 3-digit HEX', () => {
      const color = parseColor('#f00')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })

    it('should parse 6-digit HEX', () => {
      const color = parseColor('#ff0000')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })

    it('should parse 8-digit HEX with alpha', () => {
      const color = parseColor('#ff000080')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.alpha()).toBeCloseTo(0.5, 1)
    })

    it('should parse without # prefix', () => {
      const color = parseColor('ff0000')
      expect(color).toBeInstanceOf(ColorClass)
    })

    it('should reject invalid HEX', () => {
      expect(parseColor('#gg')).toBeNull()
      expect(parseColor('#1')).toBeNull()
    })
  })

  describe('RGB colors', () => {
    it('should parse rgb()', () => {
      const color = parseColor('rgb(255, 0, 0)')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })

    it('should parse rgba()', () => {
      const color = parseColor('rgba(255, 0, 0, 0.5)')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.alpha()).toBe(0.5)
    })

    it('should parse with percentage values', () => {
      const color = parseColor('rgb(100%, 0%, 0%)')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })

    it('should parse with slash separator', () => {
      const color = parseColor('rgb(255 0 0 / 0.5)')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.alpha()).toBe(0.5)
    })
  })

  describe('HSL colors', () => {
    it('should parse hsl()', () => {
      const color = parseColor('hsl(0, 100%, 50%)')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })

    it('should parse hsla()', () => {
      const color = parseColor('hsla(0, 100%, 50%, 0.5)')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.alpha()).toBe(0.5)
    })

    it('should handle hue wraparound', () => {
      const color = parseColor('hsl(360, 100%, 50%)')
      expect(color).toBeInstanceOf(ColorClass)
    })
  })

  describe('HSV colors', () => {
    it('should parse hsv()', () => {
      const color = parseColor('hsv(0, 100%, 100%)')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })

    it('should parse hsva()', () => {
      const color = parseColor('hsva(0, 100%, 100%, 0.5)')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.alpha()).toBe(0.5)
    })
  })

  describe('HWB colors', () => {
    it('should parse hwb()', () => {
      const color = parseColor('hwb(0, 0%, 0%)')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })

    it('should parse with alpha', () => {
      const color = parseColor('hwb(0, 0%, 0% / 0.5)')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.alpha()).toBe(0.5)
    })
  })

  describe('CMYK colors', () => {
    it('should parse cmyk()', () => {
      const color = parseColor('cmyk(0%, 100%, 100%, 0%)')
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })
  })

  describe('Named colors', () => {
    it('should parse standard named colors', () => {
      expect(parseColor('red')).toBeInstanceOf(ColorClass)
      expect(parseColor('blue')).toBeInstanceOf(ColorClass)
      expect(parseColor('green')).toBeInstanceOf(ColorClass)
    })

    it('should be case-insensitive', () => {
      expect(parseColor('RED')).toBeInstanceOf(ColorClass)
      expect(parseColor('Red')).toBeInstanceOf(ColorClass)
    })

    it('should return null for unknown names', () => {
      expect(parseColor('notacolor')).toBeNull()
    })
  })

  describe('Object input', () => {
    it('should parse RGB object', () => {
      const color = parseColor({ r: 255, g: 0, b: 0 })
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })

    it('should parse RGBA object', () => {
      const color = parseColor({ r: 255, g: 0, b: 0, a: 0.5 })
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.alpha()).toBe(0.5)
    })

    it('should parse HSL object', () => {
      const color = parseColor({ h: 0, s: 100, l: 50 })
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })

    it('should parse HSV object', () => {
      const color = parseColor({ h: 0, s: 100, v: 100 })
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })

    it('should parse CMYK object', () => {
      const color = parseColor({ c: 0, m: 100, y: 100, k: 0 })
      expect(color).toBeInstanceOf(ColorClass)
      expect(color?.toHex()).toBe('#ff0000')
    })
  })

  describe('ColorClass input', () => {
    it('should return a clone when given a ColorClass', () => {
      const original = new ColorClass(255, 0, 0, 1)
      const parsed = parseColor(original)

      expect(parsed).toBeInstanceOf(ColorClass)
      expect(parsed).not.toBe(original)
      expect(parsed?.toHex()).toBe(original.toHex())
    })
  })

  describe('Edge cases', () => {
    it('should return null for empty string', () => {
      expect(parseColor('')).toBeNull()
      expect(parseColor('   ')).toBeNull()
    })

    it('should return null for null', () => {
      expect(parseColor(null as any)).toBeNull()
    })

    it('should return null for undefined', () => {
      expect(parseColor(undefined as any)).toBeNull()
    })

    it('should trim whitespace', () => {
      const color = parseColor('  #ff0000  ')
      expect(color).toBeInstanceOf(ColorClass)
    })
  })
})

describe('detectFormat', () => {
  it('should detect HEX formats', () => {
    expect(detectFormat('#fff')).toBe('hex')
    expect(detectFormat('#ffffff')).toBe('hex')
    expect(detectFormat('#ffffffff')).toBe('hex8')
  })

  it('should detect RGB formats', () => {
    expect(detectFormat('rgb(255, 0, 0)')).toBe('rgb')
    expect(detectFormat('rgba(255, 0, 0, 0.5)')).toBe('rgba')
  })

  it('should detect HSL formats', () => {
    expect(detectFormat('hsl(0, 100%, 50%)')).toBe('hsl')
    expect(detectFormat('hsla(0, 100%, 50%, 0.5)')).toBe('hsla')
  })

  it('should detect HSV formats', () => {
    expect(detectFormat('hsv(0, 100%, 100%)')).toBe('hsv')
    expect(detectFormat('hsva(0, 100%, 100%, 0.5)')).toBe('hsva')
  })

  it('should detect HWB format', () => {
    expect(detectFormat('hwb(0, 0%, 0%)')).toBe('hwb')
  })

  it('should detect CMYK format', () => {
    expect(detectFormat('cmyk(0%, 100%, 100%, 0%)')).toBe('cmyk')
  })

  it('should detect named colors', () => {
    expect(detectFormat('red')).toBe('name')
    expect(detectFormat('blue')).toBe('name')
  })

  it('should return null for unknown formats', () => {
    expect(detectFormat('notacolor')).toBeNull()
    expect(detectFormat('')).toBeNull()
  })
})
