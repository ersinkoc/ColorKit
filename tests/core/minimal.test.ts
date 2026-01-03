import { describe, it, expect } from 'vitest'
import { MinimalColor, parseMinimalHex, rgb, hex } from '../../src/core/minimal'

describe('MinimalColor', () => {
  it('stores RGB values', () => {
    const c = new MinimalColor(255, 128, 64)
    expect(c.red).toBe(255)
    expect(c.green).toBe(128)
    expect(c.blue).toBe(64)
  })

  it('defaults alpha to 1', () => {
    const c = new MinimalColor(255, 0, 0)
    expect(c.alpha).toBe(1)
  })

  it('accepts alpha value', () => {
    const c = new MinimalColor(255, 0, 0, 0.5)
    expect(c.alpha).toBe(0.5)
  })

  it('clamps RGB values to 0-255', () => {
    const c = new MinimalColor(300, -10, 128)
    expect(c.red).toBe(255)
    expect(c.green).toBe(0)
  })

  it('clamps alpha to 0-1', () => {
    const c = new MinimalColor(255, 0, 0, 1.5)
    expect(c.alpha).toBe(1)
  })

  describe('toRgb', () => {
    it('returns RGB object', () => {
      const c = new MinimalColor(255, 128, 64, 0.5)
      const rgb = c.toRgb()
      expect(rgb).toEqual({ r: 255, g: 128, b: 64, a: 0.5 })
    })
  })

  describe('toHex', () => {
    it('converts to hex string', () => {
      const c = new MinimalColor(255, 0, 0)
      expect(c.toHex()).toBe('#ff0000')
    })

    it('pads with zeros', () => {
      const c = new MinimalColor(0, 0, 0)
      expect(c.toHex()).toBe('#000000')
    })
  })

  describe('toHex8', () => {
    it('includes alpha in hex', () => {
      const c = new MinimalColor(255, 0, 0, 1)
      expect(c.toHex8()).toBe('#ff0000ff')
    })

    it('converts alpha correctly', () => {
      const c = new MinimalColor(255, 0, 0, 0.5)
      expect(c.toHex8()).toMatch(/^#ff0000[0-9a-f]{2}$/i)
    })
  })

  describe('toString', () => {
    it('returns rgb() for opaque colors', () => {
      const c = new MinimalColor(255, 0, 0)
      expect(c.toString()).toBe('rgb(255, 0, 0)')
    })

    it('returns rgba() for transparent colors', () => {
      const c = new MinimalColor(255, 0, 0, 0.5)
      expect(c.toString()).toBe('rgba(255, 0, 0, 0.5)')
    })
  })

  describe('clone', () => {
    it('creates a copy', () => {
      const c = new MinimalColor(255, 128, 64, 0.5)
      const clone = c.clone()
      expect(clone.red).toBe(255)
      expect(clone.green).toBe(128)
      expect(clone.blue).toBe(64)
      expect(clone.alpha).toBe(0.5)
    })
  })
})

describe('parseMinimalHex', () => {
  it('parses 3-digit hex', () => {
    const c = parseMinimalHex('#f00')
    expect(c).not.toBeNull()
    expect(c!.red).toBe(255)
    expect(c!.green).toBe(0)
    expect(c!.blue).toBe(0)
  })

  it('parses 6-digit hex', () => {
    const c = parseMinimalHex('#ff0000')
    expect(c).not.toBeNull()
    expect(c!.red).toBe(255)
  })

  it('parses 8-digit hex with alpha', () => {
    const c = parseMinimalHex('#ff000080')
    expect(c).not.toBeNull()
    expect(c!.alpha).toBeCloseTo(0.5, 1)
  })

  it('parses without hash', () => {
    const c = parseMinimalHex('ff0000')
    expect(c).not.toBeNull()
    expect(c!.red).toBe(255)
  })

  it('returns null for invalid hex', () => {
    expect(parseMinimalHex('invalid')).toBeNull()
    expect(parseMinimalHex('#gg0000')).toBeNull()
    expect(parseMinimalHex('#12345')).toBeNull()
  })

  it('handles whitespace', () => {
    const c = parseMinimalHex('  #ff0000  ')
    expect(c).not.toBeNull()
  })
})

describe('rgb factory', () => {
  it('creates MinimalColor from RGB', () => {
    const c = rgb(255, 0, 0)
    expect(c.red).toBe(255)
    expect(c.alpha).toBe(1)
  })

  it('accepts alpha', () => {
    const c = rgb(255, 0, 0, 0.5)
    expect(c.alpha).toBe(0.5)
  })
})

describe('hex factory', () => {
  it('creates MinimalColor from hex', () => {
    const c = hex('#ff0000')
    expect(c.red).toBe(255)
  })

  it('throws on invalid hex', () => {
    expect(() => hex('invalid')).toThrow()
  })
})
